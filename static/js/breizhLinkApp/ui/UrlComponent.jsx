import React from "react";
import {
    Col
} from "react-bootstrap";
import UrlForm from "../container/UrlForm";

export default class UrlComponent extends React.PureComponent {
    render() {
        return (
            <Col sm={10} smOffset={1}>
                <UrlForm />
            </Col>
        );
    }
}
