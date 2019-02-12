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
      url: ''
    }
  }

  handleMessageReceived = (message) => {
    var payload = JSON.parse(message.message);
    var audioUrl = payload.url;

    this.setState({ url: '' });
    this.setState({ url: audioUrl });
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

  componentWillUnmount() {
      this.pubnub.unsubscribe({ channels: ['default'] });
  }
  render() {
    return (
      <div className="container">
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
