import React from "react";
import T from "prop-types";
import {
    MenuItem,
    Nav,
    Navbar,
    NavDropdown,
    NavItem
} from "react-bootstrap";

import UserComponent from "./UserComponent.jsx";
import UrlComponent from "./UrlComponent.jsx";

import Profile from "../container/Profile";

export default class BreizhLinkAppComponent extends React.PureComponent {

    componentDidMount() {
        this.props.getMe();
    }

    handleSwitchView(view) {
        this.props.switchView(view);
    }

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
                            <NavItem
                                eventKey={1}
                                onClick={this.handleSwitchView.bind(this, "url")}
                            >
                                Urls
                            </NavItem>
                            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                                <MenuItem eventKey={3.1}>Action</MenuItem>
                                <MenuItem eventKey={3.2}>Another action</MenuItem>
                                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={3.3}>Separated link</MenuItem>
                            </NavDropdown>
                        </Nav>
                        {this.renderUserNavbarPart()}
                    </Navbar.Collapse>
                  </Navbar>
                {this.renderView()}
            </div>
        );
    }

    renderView() {
        switch(this.props.view) {
            case "url":
                return <UrlComponent />;
            case "user":
                return <UserComponent logbox={this.props.user.id === 0} />;
            case "profile":
                return <Profile />;
            default:
                return <h1>OOPS !</h1>;
        }
    }

    renderUserNavbarPart() {
        if(this.props.user.id !== 0) {
            return (
                <Nav pullRight>
                    <NavItem
                        eventKey={1}
                        onClick={this.handleSwitchView.bind(this, "profile")}
                    >
                        {this.props.user.login}
                    </NavItem>
                    <NavItem eventKey={1} onClick={this.props.logout}>Logout</NavItem>
                </Nav>
            );
        }
        return (
            <Nav pullRight>
                <NavItem
                    eventKey={1}
                    onClick={this.handleSwitchView.bind(this, "user")}
                >
                    Connect
                </NavItem>
            </Nav>
        );
    }
}

BreizhLinkAppComponent.propTypes = {
    user: T.shape({
        email: T.string.isRequired,
        login: T.string.isRequired,
        id: T.number.isRequired
    }).isRequired,
    view: T.string.isRequired,
    switchView: T.func.isRequired,
    getMe: T.func.isRequired,
    logout: T.func.isRequired
};
