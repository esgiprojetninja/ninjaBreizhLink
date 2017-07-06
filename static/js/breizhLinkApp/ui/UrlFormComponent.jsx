import React from "react";
import T from "prop-types";
import {
    Button,
    Checkbox,
    ControlLabel,
    FormControl,
    FormGroup,
    HelpBlock
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

    handleUsePwdChange(e) {
        this.props.newUrlChanged({
            ...this.props.newUrl,
            usePwd: e.target.checked
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
                    <Checkbox
                        onChange={this.handleUsePwdChange.bind(this)}
                        value={this.props.newUrl.usePwd}
                    >
                        Protect whit a password ?
                    </Checkbox>
                </FormGroup>
                {this.renderPasswordInput()}
                <Button bsStyle="success" type="submit">Shorten</Button>
            </form>
        );
    }

    renderPasswordInput() {
        if (this.props.newUrl.usePwd) {
            return (
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
            );
        }
    }
}

UrlFormComponent.propTypes = {
    newUrlChanged: T.func.isRequired,
    newUrlSubmitted: T.func.isRequired,
    newUrl: T.object.isRequired
};
