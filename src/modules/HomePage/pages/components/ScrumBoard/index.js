import React, { Component } from "react";
import "./ScrumBoard.css";

export default class ScrumBoard extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [
        { name: 'task 1', stage: 0 },
        { name: 'task 2', stage: 0 },
      ],
      taskValue: ''
    };
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
  }

  createTask = () => {
    const { tasks, taskValue } = this.state;
    if (taskValue) {
      this.setState({
        tasks: [...tasks, { name: taskValue, stage: 0 }],
        taskValue: ''
      });
    }
  }

  handleChange = (e) => {
    this.setState({ taskValue: e.target.value });
  }

  deleteTask = (taskName) => {
    let { tasks } = this.state;
    tasks = tasks.filter(val => val.name !== taskName);
    this.setState({ tasks });
  }

  moveBackward = taskName => {
    let { tasks } = this.state;
    tasks.forEach(val => {
      if(val.name === taskName && val.stage-1 >= 0){
        val.stage -= 1;
      }
      return val;
    });
    this.setState({ tasks });
  }

  moveForward = taskName => {
    let { tasks } = this.state;
    tasks.forEach(val => {
      if(val.name === taskName && val.stage+1 < 4){
        val.stage += 1;
      }
      return val;
    });
    this.setState({ tasks });
  }


  render() {
    const { tasks, taskValue } = this.state;

    let stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      stagesTasks.push([]);
    }
    for (let task of tasks) {
      const stageId = task.stage;
      stagesTasks[stageId].push(task);
    }

    return (
      <div className="mt-20 layout-column justify-content-center align-items-center">
        <section className="mt-50 layout-row align-items-center justify-content-center">
          <input
            id="create-task-input"
            type="text"
            className="large"
            placeholder="New task name"
            data-testid="create-task-input"
            value={taskValue}
            onChange={this.handleChange}
          />
          <button
            type="submit"
            className="ml-30"
            data-testid="create-task-button"
            onClick={this.createTask}
          >Create task</button>
        </section>

        <div className="mt-50 layout-row">
          {stagesTasks.map((tasks, i) => {
            return (
              <div className="card outlined ml-20 mt-0" key={`${i}`}>
                <div className="card-text">
                  <h4>{this.stagesNames[i]}</h4>
                  <ul className="styled mt-50" data-testid={`stage-${i}`}>
                    {tasks.map((task, index) => {
                      return <li className="slide-up-fade-in" key={`${i}${index}`}>
                        <div className="li-content layout-row justify-content-between align-items-center">
                          <span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
                          <div className="icons">
                            <button className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-back`}                                 
                               disabled={task.stage === 0}
                              onClick={() => this.moveBackward(task.name)}
                               >
                              <i
                                className="material-icons"
                              >arrow_back</i>
                            </button>
                            <button className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-forward`}
                            disabled={task.stage === 3}
                              onClick={() => this.moveForward(task.name)}
                            >
                              <i
                                className="material-icons"
                              >arrow_forward</i>
                            </button>
                            <button 
                            className="icon-only danger x-small mx-2" 
                            data-testid={`${task.name.split(' ').join('-')}-delete`}
                            onClick={() => this.deleteTask(task.name)}
                            >
                              <i
                                className="material-icons"
                              >delete</i>
                            </button>
                          </div>
                        </div>
                      </li>
                    })}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}