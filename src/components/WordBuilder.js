import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { AddBox, TextFields } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';

import InputTextField from './InputTextField';
import '../styles/dashboard.css';
import '../styles/global.css';

class WordBuilder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numWords: 1
        }
    }
    viewsForData() {
        var views = [];

        for (var idx = 0; idx < this.state.numWords; idx ++) {
          views.push(
            <div className="input"
                key={idx}>
                <InputTextField
                    ref={String(idx)} />
            </div>);
        }

        return views;
    }

    addField = () => {
      this.setState({ numWords: this.state.numWords + 1});
    }

    getWords() {
        var section = []

        for (var idx = 0; idx < this.state.numWords; idx ++) {
          var text = this.refs[String(idx)].getText();
          if (text !== '') {
            section.push(text);
          }
        }

        return section;
    }

    render() {
        return (
            <div className="row">
                <div className="wordsection">
                    { this.viewsForData() }
                </div>
                <div className="buttons">
                    <IconButton
                        onClick={this.addField}
                        className="iconButton"
                        variant="contained"
                        color="primary">
                        <TextFields />
                    </IconButton>
                </div>
            </div>
        );
    }
}

export default WordBuilder;
