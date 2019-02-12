import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import IconButton from '@material-ui/core/IconButton';
import { Close } from '@material-ui/icons';
import axios from 'axios';
import PubNubReact from 'pubnub-react';

import InputSection from '../components/InputSection';
import '../styles/dashboard.css';
import '../styles/global.css';
import InputBuilder from '../components/InputBuilder';

const defaultSections = [
  ["Hi","%input%","how's your day so far?"],
  ["What would you like to talk about in particular?"],
  ["What's going on today?"],
  ["Can you tell me more about that?"],
]

const apiUrl = "https://puppet-230708.appspot.com"

class Dashboard extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      customSections: [],
      modalOpen: false,
      voice: 'en-US-Wavenet-E'
    }

    this.pubnub = new PubNubReact({
      publishKey: 'pub-c-35c0a342-eb63-440b-b688-89d8ced6f499',
      subscribeKey: 'sub-c-634d2abe-28df-11e9-991a-bee2ac9fced0'
    });
    this.pubnub.init(this);
  }

  sendText = (text) => {
    axios
      .post(apiUrl + '/broadcast', {
        text: text,
        voice: this.state.voice,
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleFileImport = (event) => {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    var fileReader = new FileReader( );
    fileReader.onload = (event) => {
      var newSections = JSON.parse(event.target.result);
      var sections = this.state.customSections;

      this.setState({ customSections: sections.concat(newSections) });
    };
    fileReader.readAsText( file );
  }

  import = () => {
    this.upload.click();
  }

  export = () => {
    var jsonData = JSON.stringify(this.state.customSections);
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonData);
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "puppet-responses.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  openModal = () => {
    this.setState({modalOpen: true});
  }

  closeModal = () => {
    this.setState({modalOpen: false});
  }

  saveSection = () => {
    var sections = this.state.customSections;
    var newSection = this.builder.getSections();

    sections.push(newSection);

    this.setState({ customSections: sections });
    this.closeModal();
  }

  handleChangeVoice = event => {
    this.setState({ voice: event.target.value });
  };

  kickToInvision = () => {
    this.pubnub.publish({
      message: 'gotoinvision',
      channel: 'default'
    },
    function(status, response) {
      if (status.error) {
        console.log(status);
      }
      else { console.log(response); }
    });
  };

  render() {
    const sections = defaultSections.concat(this.state.customSections);
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
            <div className="body">
              <div className="inputs">
                <div className="scrollable">
                { sections.map((section, idx) => (
                  <InputSection
                    data={section}
                    key={idx}
                    onSend={this.sendText} />
                ))}
                </div>
                <InputSection
                    data={['%longform%']}
                    onSend={this.sendText} />
              </div>
              <div className="voice-box">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Voice</FormLabel>
                  <RadioGroup
                    name="gender1"
                    value={this.state.voice}
                    onChange={this.handleChangeVoice}>
                    <FormControlLabel value="en-US-Wavenet-A" control={<Radio />} label="Wavenet A (Male)"/>
                    <FormControlLabel value="en-US-Wavenet-B" control={<Radio />} label="Wavenet B (Male)" />
                    <FormControlLabel value="en-US-Wavenet-D" control={<Radio />} label="Wavenet D (Male)" />
                    <FormControlLabel value="en-US-Wavenet-C" control={<Radio />} label="Wavenet C (Female)" />
                    <FormControlLabel value="en-US-Wavenet-E" control={<Radio />} label="Wavenet E (Female)" />
                    <FormControlLabel value="en-US-Wavenet-F" control={<Radio />} label="Wavenet F (Female)" />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
            <div className="footer">
              <input
                type="file"
                ref={(ref) => this.upload = ref}
                style={{display: 'none'}}
                onChange={this.handleFileImport} />
              <Button
                onClick={this.import}
                className="footer-button"
                variant="contained" 
                color="primary">
                Import
              </Button>
              <Button
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
              <Button
                onClick={this.kickToInvision}
                className="footer-button"
                variant="contained" 
                color="primary">
                Go To Invision
              </Button>
            </div>
        </Paper>
      </div>
    );
  }
}

export default Dashboard;
