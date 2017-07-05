import React from "react";
import T from "prop-types";
import {
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    Button
} from "react-bootstrap";

export default class UrlFormComponent extends React.PureComponent {

    handleValueChange(e) {
        this.props.newUrlChanged({
            ...this.props.newUrl,
            value: e.target.value
        });
    }

    handlePasswordChange(e) {
        this.props.newUrlChanged({
            ...this.props.newUrl,
            password: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.newUrlSubmitted(this.props.newUrl);
    }

    render() {
        return(
            <form
                onSubmit={this.handleSubmit.bind(this)}
            >
                <FormGroup>
                    <ControlLabel>Url to shorten</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Url"
                        value={this.props.newUrl.value}
                        onChange={this.handleValueChange.bind(this)}
                    />
                    <HelpBlock>Please enter a valid url</HelpBlock>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Add a password ?</ControlLabel>
                    <FormControl
                        type="password"
                        placeholder="Password"
                        value={this.props.newUrl.password}
                        onChange={this.handlePasswordChange.bind(this)}
                    />
                    <HelpBlock>Please enter a valid url</HelpBlock>
                </FormGroup>
                <Button bsStyle="success" type="submit">Shorten</Button>
            </form>
        );
    }
}

UrlFormComponent.propTypes = {
    newUrlChanged: T.func.isRequired,
    newUrlSubmitted: T.func.isRequired,
    newUrl: T.object.isRequired
};
