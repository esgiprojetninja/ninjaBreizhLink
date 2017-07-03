import React from "react";
import {
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    Button
} from "react-bootstrap";

export default class UrlFormComponent extends React.PureComponent {
    render() {
        return(
            <form action="">
                <FormGroup>
                    <ControlLabel>Url to sborten</ControlLabel>
                    <FormControl
                        type="test"
                        placeholder="Url"
                    />
                    <HelpBlock>Please enter a valid url</HelpBlock>
                </FormGroup>
                <Button bsStyle="success">Shorten</Button>
            </form>
        );
    }
}
