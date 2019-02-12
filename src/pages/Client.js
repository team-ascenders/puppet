import React, { Component } from 'react';
import PubNubReact from 'pubnub-react';
import ReactAudioPlayer from 'react-audio-player';

import '../styles/client.css';
import '../styles/global.css';

class Client extends Component {
  constructor(props) {
    super(props);
    this.pubnub = new PubNubReact({
        subscribeKey: 'sub-c-634d2abe-28df-11e9-991a-bee2ac9fced0'
    });
    this.pubnub.init(this);

    this.state = {
      url: '',
      redirect: false
    }
  }

  handleMessageReceived = (response) => {
    var message = response.message;
    
    if (message === 'gotoinvision') {
      this.setState({
        redirect: true
      })
    }
    else {
      var payload = JSON.parse(message);
      var audioUrl = payload.url;

      this.setState({ url: '' });
      this.setState({ url: audioUrl });
    }
  };

  handleError = (status) => {
    if (status.category === 'PNUnknownCategory') {
      console.log(status.errorData.message);
    }
  };

  componentWillMount() {
      this.pubnub.subscribe({
        channels: ['default'],
        withPresence: true
      });
      this.pubnub.addListener({
        status: this.handleError,
        message: this.handleMessageReceived
    });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      window.location = 'https://invis.io/3RQGIJF2H5C#/346229432_S1/';
    }
  }

  componentWillUnmount() {
      this.pubnub.unsubscribe({ channels: ['default'] });
  }

  render() {
    return (
      <div className="container">
        {this.renderRedirect()}
        <div className="hero"></div>
        <div className="speechOut"></div>
        <ReactAudioPlayer
          src={this.state.url}
          autoPlay />
      </div>
    );
  }
}

export default Client;
