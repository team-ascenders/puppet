import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Send } from '@material-ui/icons';

import '../styles/dashboard.css';
import '../styles/global.css';
import InputTextField from './InputTextField';

class InputSection extends Component {
    getText = () => {
        var text = '';
        var data = this.props.data;

        for (var idx = 0; idx < data.length; idx ++) {
            var token = data[idx];

            if (token === '%input%') {
                var input = this.refs[String(idx)];

                text += input.getText();
            } else {
                text += token;
            }

            text += ' ';
        }

        return text;
    }

    viewsForData(data) {
        var views = [];

        for (var idx = 0; idx < data.length; idx ++) {
            var token = data[idx];

            if (token === '%input%') {
                views.push(
                    <div className="input"
                        key={idx}>
                        <InputTextField
                            ref={String(idx)} />
                    </div>
                );
            }
            else if (token === '%longform%') {
                views.push(
                    <InputTextField
                        longform
                        ref={String(idx)}
                        key={idx} />
                );
            }
            else {
                views.push(
                    <h4
                        id={String(idx)}
                        key={idx}>
                        {token}
                    </h4>
                );
            }
        }

        return views;
    }

    handleClick = () => {
        var text = this.getText();
        this.props.onSend(text);
    }

    render() {
        return (
            <div className="row">
                <div className="section">
                    { this.viewsForData(this.props.data) }
                </div>
                {this.props.onSend == null ? null : (
                    <div className="buttons">
                        <IconButton
                            className="iconButton"
                            color="primary"
                            variant="contained"
                            onClick={this.handleClick}>
                            <Send />
                        </IconButton>
                    </div>
                )}
            </div>
        );
    }
}

export default InputSection;
