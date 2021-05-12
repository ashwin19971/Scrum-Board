import React, { Component } from 'react';
import ScrumBoard from './components/ScrumBoard';
import './HomePage.css';

class HomePage extends Component {
  render() {
    return (
      <div>
        <div class="app-header">
          <div class="layout-row align-items-center justify-content-center">
            <h4 id="app-title" class="app-title ml-16 my-0">Scrum Board</h4>
          </div>
        </div>
        <ScrumBoard />
      </div>
    );
  }
}

export default HomePage;
