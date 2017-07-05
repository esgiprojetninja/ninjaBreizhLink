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

    handleChange(e) {
        this.props.newUrlChanged(e.target.value);
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
                        name="longurl"
                        value={this.props.newUrl}
                        onChange={this.handleChange.bind(this)}
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
    newUrl: T.string.isRequired
};
