import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { Close } from '@material-ui/icons';
import axios from 'axios';

import InputSection from '../components/InputSection';
import '../styles/dashboard.css';
import '../styles/global.css';
import InputBuilder from '../components/InputBuilder';

const defaultSections = [
  ["Hi","%input%","how's your day so far?"],
  ["What would you like to talk about in particular?"],
  ["What's in your orbit?"]
]

const apiUrl = "https://puppet-230708.appspot.com"

class Dashboard extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      sections: defaultSections,
      modalOpen: false,
      voice: 'en-US-Wavenet-D'
    }
  }

  sendText = (text) => {
    axios
      .post(apiUrl + '/broadcast', {
        text: text,
        voice: this.state.voice,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // TODO: Implement these
  import() {
  }

  export() {
  }

  openModal = () => {
    this.setState({modalOpen: true});
  }

  closeModal = () => {
    this.setState({modalOpen: false});
  }

  saveSection = () => {
    var sections = this.state.sections;
    var newSection = this.builder.getSections();

    sections.push(newSection);

    this.setState({ sections: sections });
    this.closeModal();
  }

  render() {
    return (
      <div className="container">
        <Modal 
          className="modal-container"
          open={this.state.modalOpen}>
          <Paper className="paper-modal">
              <div className="header">
                <IconButton
                  onClick={this.closeModal}
                  className="iconButton"
                  variant="contained"
                  color="primary">
                  <Close />
                </IconButton>
              </div>

              <InputBuilder
                ref={(builder) => {
                  this.builder = builder
                }} />

              <div className="modal-footer">
                <Button 
                  onClick={this.saveSection}
                  className="footer-button"
                  variant="contained" 
                  color="primary">
                  Save
                </Button>
              </div>
          </Paper>
        </Modal>
        <Paper className="paper-container">
          { this.state.sections.map((section, idx) => (
              <InputSection
                data={section}
                key={idx}
                onSend={this.sendText} />
            ))}
            <InputSection
                data={['%input%']}
                onSend={this.sendText} />
            <div className="footer">
              <Button 
                disabled
                onClick={this.import}
                className="footer-button"
                variant="contained" 
                color="primary">
                Import
              </Button>
              <Button 
                disabled
                onClick={this.export}
                className="footer-button"
                variant="contained" 
                color="primary">
                Export
              </Button>
              <Button 
                onClick={this.openModal}
                className="footer-button"
                variant="contained" 
                color="primary">
                Add New...
              </Button>
            </div>
        </Paper>
      </div>
    );
  }
}

export default Dashboard;
