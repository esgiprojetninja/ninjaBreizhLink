import React from "react";
import T from "prop-types";
import {
    MenuItem,
    Nav,
    Navbar,
    NavDropdown,
    NavItem
} from "react-bootstrap";

import UserList from "../container/UserList";
import UrlComponent from "./UrlComponent.jsx";

export default class BreizhLinkAppComponent extends React.PureComponent {
    render() {
        return (
            <div>
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">Breizh Link</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} href="#">Link</NavItem>
                            <NavItem eventKey={2} href="#">Link</NavItem>
                            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                                <MenuItem eventKey={3.1}>Action</MenuItem>
                                <MenuItem eventKey={3.2}>Another action</MenuItem>
                                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={3.3}>Separated link</MenuItem>
                            </NavDropdown>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={1} href="#">Link Right</NavItem>
                            <NavItem eventKey={2} href="#">Link Right</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                  </Navbar>
                {this.renderView()}
            </div>
        );
    }

    renderView() {
        const {id} = this.props.view;
        switch(id) {
            case "url":
                return <UrlComponent />;
            case "user":
                return <UserList />;
            default:
                return <h1>OOPS !</h1>;
        }
    }
}

BreizhLinkAppComponent.propTypes = {
    view: T.shape({
        id: T.string.isRequired
    }).isRequired
};
