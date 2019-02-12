import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './styles/global.css';

import Client from './pages/Client';
import Dashboard from './pages/Dashboard';
import Splash from './pages/Splash';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Splash} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/client" component={Client} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
