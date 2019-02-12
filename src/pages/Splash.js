import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { SentimentVerySatisfied, SentimentDissatisfied, SentimentVeryDissatisfied } from '@material-ui/icons';
import Fab from '@material-ui/core/Fab';

import '../styles/splash.css';
import '../styles/global.css';

class Splash extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <h1>Hi, what is your mood?</h1>
          <div className="fab-container">
            <Fab
              className="startButton"
              component={Link}
              to="/client"
              color="primary">
              <SentimentVerySatisfied />
            </Fab>
            <Fab
              className="startButton"
              component={Link}
              to="/client"
              color="primary">
              <SentimentDissatisfied />
            </Fab>
            <Fab
              className="startButton"
              component={Link}
              to="/client"
              color="primary">
              <SentimentVeryDissatisfied />
            </Fab>
          </div>
        </div>
        <div className="container">
          <Link
            to="/dashboard">
            Dashboard <span role="img" aria-label="arrow">➡️</span>
          </Link>
        </div>
      </div>
    );
  }
}

export default Splash;
