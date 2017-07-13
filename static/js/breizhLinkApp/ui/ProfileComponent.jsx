import React from "react";
import T from "prop-types";
import {
    Button,
    Col,
    Panel,
    Row,
    Table
} from "react-bootstrap";
import moment from "moment/src/moment";

export default class ProfileComponent extends React.PureComponent {

    componentDidMount() {
        this.props.fetchMyUrls();
    }

    render() {
        const {login, email, id} = this.props.user;
        return (
            <Row>
                <Col sm={4} smOffset={2}>
                    <Panel header="My informations">
                        <Table>
                            <tbody>
                                <tr>
                                    <td>Id</td>
                                    <td>{id}</td>
                                </tr>
                                <tr>
                                    <td>Login</td>
                                    <td>{login}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{email}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Panel>
                </Col>
                <Col sm={8} smOffset={2}>
                    <Panel header="My urls">
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Long url</th>
                                    <th>Short Url</th>
                                    <th>Password</th>
                                    <th>From datetime</th>
                                    <th>To datetime</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderUrls()}
                            </tbody>
                        </Table>
                        <Button
                            onClick={this.props.fetchMyUrls}
                        >
                            Refresh list
                        </Button>
                    </Panel>
                </Col>
            </Row>
        );
    }

    renderUrls() {
        return this.props.user.urls.map(u => {
            return (
                <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.longUrl}</td>
                    <td>
                        <a href={"http://b.li:8080/url/" + u.shortUrl} target="blank">{u.shortUrl}</a>
                    </td>
                    <td>{u.usePwd ? "Yes" : "No"}</td>
                    <td>{u.useDate ? this.renderDateTime(u.fromDateTime) : "ND"}</td>
                    <td>{u.useDate ? this.renderDateTime(u.toDateTime) : "ND"}</td>
                </tr>
            );
        });
    }

    renderDateTime(d) {
        return d.dayOfMonth + " - " + d.monthOfYear + " - " + d.year;
    }
}

ProfileComponent.propTypes = {
    user: T.shape({
        login: T.string.isRequired,
        email: T.string.isRequired,
        id: T.number.isRequired,
        urls: T.array.isRequired
    }).isRequired,
    fetchMyUrls: T.func.isRequired
};
