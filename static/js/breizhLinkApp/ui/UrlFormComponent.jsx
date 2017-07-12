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
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


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

    handleNewUrlChanged(e) {
        const changedNewUrl = {...this.props.newUrl};
        changedNewUrl[e.target.id] = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        this.props.newUrlChanged(changedNewUrl);
    }

    fromDateChanged(date) {
        this.props.newUrlChanged({
            ...this.props.newUrl,
            fromDate: date
        });
    }

    toDateChanged(date) {
        this.props.newUrlChanged({
            ...this.props.newUrl,
            toDate: date
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.newUrlSubmitted(this.props.newUrl);
    }

    render() {
        return(
            <div>
                {this.renderForm()}
                {this.renderLastShortUrl()}
            </div>
        );
    }

    renderForm() {
        return (
            <form
                onSubmit={this.handleSubmit.bind(this)}
            >
                <FormGroup>
                    <ControlLabel>Url to shorten</ControlLabel>
                    <FormControl
                        id="value"
                        type="text"
                        placeholder="Url"
                        value={this.props.newUrl.value}
                        onChange={this.handleValueChange.bind(this)}
                    />
                    <HelpBlock>Please enter a valid url</HelpBlock>
                </FormGroup>
                <FormGroup>
                    <Checkbox
                        id="usePwd"
                        onChange={this.handleUsePwdChange.bind(this)}
                        value={this.props.newUrl.usePwd}
                    >
                        Protect whit a password ?
                    </Checkbox>
                </FormGroup>
                {this.renderPasswordInput()}
                <FormGroup>
                    <Checkbox
                        id="useDate"
                        onChange={this.handleNewUrlChanged.bind(this)}
                        value={this.props.newUrl.useDate}
                    >
                        Define a validity period ?
                    </Checkbox>
                </FormGroup>
                {this.renderDateRange()}
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
                        id="password"
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

    renderLastShortUrl() {
        return (
            <p>Your short url: <a href={"http://b.li:8080/url/" + this.props.lastShortUrl}>{this.props.lastShortUrl}</a></p>
        );
    }

    renderDateRange() {
        if (this.props.newUrl.useDate) {
            return (
                <div>
                    <DatePicker
                        id="fromDate"
                        selected={this.props.newUrl.fromDate}
                        onChange={this.fromDateChanged.bind(this)}
                        placeholder="From date"
                    />
                    <DatePicker
                        id="toDate"
                        selected={this.props.newUrl.toDate}
                        onChange={this.toDateChanged.bind(this)}
                        placeholder="To date"
                    />
                </div>
            );
        }
    }
}

UrlFormComponent.propTypes = {
    newUrlChanged: T.func.isRequired,
    newUrlSubmitted: T.func.isRequired,
    newUrl: T.object.isRequired,
    lastShortUrl: T.string.isRequired
};
