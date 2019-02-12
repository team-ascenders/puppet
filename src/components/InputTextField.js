import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

import '../styles/dashboard.css';
import '../styles/global.css';

class InputTextField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        }
    }

    getText = () => {
        return this.state.text;
    }

    handleChanged = (event) => {
        this.setState({
            text: event.target.value
        });
    }

    render() {
        return (
            <TextField
                multiline={this.props.longform}
                fullWidth={this.props.longform}
                onChange={this.handleChanged}
                label="text" />
        );
    }
}

export default InputTextField;
