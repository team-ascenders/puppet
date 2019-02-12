import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { AddBox, TextFields } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';

import InputTextField from './InputTextField';
import '../styles/dashboard.css';
import '../styles/global.css';

class InputBuilder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            protoSections: ['text']
        }
    }
    viewsForData() {
        var views = [];

        for (var idx = 0; idx < this.state.protoSections.length; idx ++) {
            var token = this.state.protoSections[idx];

            if (token === 'text') {
                views.push(
                    <div className="input"
                        key={idx}>
                        <InputTextField
                            ref={String(idx)} />
                    </div>);
            } else {
                views.push(
                    <TextField
                        disabled
                        key={idx}
                        label="wildcard"
                        variant="outlined"
                        margin="normal" />
                );
            }
        }

        return views;
    }

    addField = () => {
        var newSections = this.state.protoSections;

        newSections.push('text');

        this.setState({ protoSections: newSections });
    }

    addLabel = () => {
        var newSections = this.state.protoSections;

        newSections.push('%input%');

        this.setState({ protoSections: newSections });
    }

    getSections() {
        var section = []

        for (var idx = 0; idx < this.state.protoSections.length; idx ++) {
            var token = this.state.protoSections[idx];

            if (token === 'text') {
                section.push(this.refs[String(idx)].getText());
            } else {
                section.push(token);
            }
        }

        return section;
    }

    render() {
        return (
            <div className="row">
                <div className="section">
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
                    <IconButton
                        onClick={this.addLabel}
                        className="iconButton"
                        variant="contained"
                        color="primary">
                        <AddBox />
                    </IconButton>
                </div>
            </div>
        );
    }
}

export default InputBuilder;
