import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { SentimentSatisfied, SentimentDissatisfied, SentimentVeryDissatisfied } from '@material-ui/icons';
import Fab from '@material-ui/core/Fab';

import '../styles/splash.css';
import '../styles/global.css';

class Splash extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <h1>Hi Alice, what is your mood?</h1>
            <Fab
              className="startButton"
              component={Link}
              to="/client"
              color="primary">
              <SentimentSatisfied />
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
        <div className="container">
          <Link
            to="/dashboard">
            Dashboard ➡️
          </Link>
        </div>
      </div>
    );
  }
}

export default Splash;
