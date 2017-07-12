import React from "react";
import T from "prop-types";
import {
    Button,
    Col,
    ControlLabel,
    FormControl,
    FormGroup,
    HelpBlock,
    Panel,
    Row
} from "react-bootstrap";

const FieldGroup = ({id, label, help, ...props}) => {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
};

FieldGroup.propTypes = {
    id: T.string.isRequired,
    label: T.string.isRequired,
    help: T.string
};

export default class LogBoxComponent extends React.PureComponent {

    handleNewUserChanged(e) {
        const newValue = {...this.props.newUser};
        newValue[e.target.id] = e.target.value;
        this.props.onNewUserChanged(newValue);
    }

    handlecurrentChanged(e) {
        const newValue = {...this.props.currentUser.user};
        newValue[e.target.id] = e.target.value;
        this.props.onCurrentUserChanged(newValue);
    }

    handelSubscribeSubmit(e) {
        e.preventDefault();
        this.props.onSubscribeSubmit(this.props.newUser);
    }

    handleLoginSubmit(e) {
        e.preventDefault();
        this.props.onLoginSubmit(this.props.currentUser.user);
    }

    render() {
        return(
            <Row>
                {this.renderLogin()}
                {this.renderSubscribe()}
            </Row>
        );
    }

    renderLogin() {
        return (
            <Col
                sm={4}
                smOffset={2}
            >
                <Panel
                    header={<h3>Login</h3>}
                >
                    <form onSubmit={this.handleLoginSubmit.bind(this)}>
                        <FieldGroup
                            id="email"
                            type="email"
                            label="Email"
                            placeholder="Email..."
                            onChange={this.handlecurrentChanged.bind(this)}
                        />
                        <FieldGroup
                            id="password"
                            type="password"
                            label="Password"
                            placeholder="Password..."
                            onChange={this.handlecurrentChanged.bind(this)}
                        />
                        <Button bsStyle="primary" type="submit">Save</Button>
                    </form>
                </Panel>
            </Col>
        );
    }

    renderSubscribe() {
        return (
            <Col
                sm={4}
            >
                <Panel
                    header={<h3>Subscribe</h3>}
                >
                    <form
                        onSubmit={this.handelSubscribeSubmit.bind(this)}
                    >
                        <FieldGroup
                            id="login"
                            type="text"
                            label="Login"
                            placeholder="Login..."
                            onChange={this.handleNewUserChanged.bind(this)}
                        />
                        <FieldGroup
                            id="email"
                            type="email"
                            label="Email"
                            placeholder="Email..."
                            onChange={this.handleNewUserChanged.bind(this)}
                        />
                        <FieldGroup
                            id="password"
                            type="password"
                            label="Password"
                            placeholder="Password..."
                            onChange={this.handleNewUserChanged.bind(this)}
                        />
                        <FieldGroup
                            id="passwordConfirm"
                            type="password"
                            label="Confirm password"
                            placeholder="Confirm password..."
                            onChange={this.handleNewUserChanged.bind(this)}
                        />
                        <Button bsStyle="primary" type="submit">Save</Button>
                    </form>
                </Panel>
            </Col>
        );
    }
}

LogBoxComponent.propTypes = {
    newUser: T.shape({
        login: T.string.isRequired,
        email: T.string.isRequired,
        password: T.string.isRequired
    }).isRequired,
    currentUser: T.shape({
        user: T.shape({
            login: T.string.isRequired,
            email: T.string.isRequired,
            password: T.string.isRequired,
            id: T.number.isRequired
        }).isRequired,
        error: T.string.isRequired,
        loading: T.bool.isRequired
    }).isRequired,
    onNewUserChanged: T.func.isRequired,
    onSubscribeSubmit: T.func.isRequired,
    onCurrentUserChanged: T.func.isRequired,
    onLoginSubmit: T.func.isRequired
};
