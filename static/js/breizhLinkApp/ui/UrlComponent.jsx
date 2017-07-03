import React from "react";
import {
    Col
} from "react-bootstrap";
import UrlList from "../container/UrlList";
import UrlFormComponent from "./UrlFormComponent.jsx";

export default class UrlComponent extends React.PureComponent {
    render() {
        return (
            <Col sm={10} smOffset={1}>
                <UrlFormComponent />
                <UrlList />
            </Col>
        );
    }
}
