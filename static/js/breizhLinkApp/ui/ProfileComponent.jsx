import React from "react";
import T from "prop-types";
import {
    Button,
    Col,
    Modal,
    Panel,
    Row,
    Table
} from "react-bootstrap";
import moment from "moment/src/moment";

import ChartComponent from "./ChartComponent.jsx";


export default class ProfileComponent extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            urlVisits: []
        };
    }

    componentDidMount() {
        this.props.fetchMyUrls();
        this.props.fetchMe();
    }

    openModal(urlVisits) {
        this.setState({
            showModal: true,
            urlVisits
        });
    }

    closeModal() {
        this.setState({showModal: false});
    }

    displayUrlStats(urlVisits) {
        this.openModal(urlVisits);
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
                                    <th>Captcha</th>
                                    <th>From datetime</th>
                                    <th>To datetime</th>
                                    <th>Action</th>
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
                <Modal
                    show={this.state.showModal}
                    onHide={this.closeModal.bind(this)}
                >
                    <Modal.Body>
                        {this.renderChart()}
                    </Modal.Body>
                </Modal>
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
                    <td>{u.useReCAPTCHA ? "Yes" : "No"}</td>
                    <td>{u.useDate ? this.renderDateTime(u.fromDateTime) : "ND"}</td>
                    <td>{u.useDate ? this.renderDateTime(u.toDateTime) : "ND"}</td>
                    <td>
                        <Button
                            key={u.id}
                            bsStyle="success"
                            onClick={this.displayUrlStats.bind(this, u.urlVisits)}
                        >
                            Stats
                        </Button>
                    </td>
                </tr>
            );
        });
    }

    renderDateTime(d) {
        return d.dayOfMonth + " - " + d.monthOfYear + " - " + d.year;
    }

    renderChart() {
        const cleanedData = [];
        const dates = this.state.urlVisits.map(uv => uv.date);
        dates.forEach(date => {
            let exist = false;
            cleanedData.forEach(item => {
                if (moment(date).format("DD:MM:YYYY") === item[0]) {
                    exist = true;
                    item[1]++;
                }
            });
            if (!exist) {
                cleanedData.push([
                    moment(date).format("DD:MM:YYYY"),
                    1
                ]);
            }
        });
        const options = {
            chart: {
                type: "line"
            },
            title: {
                text: "Nombre d\'amis au fil du mois"
            },
            xAxis: {
                type: "datetime"
            },
            yAxis: {
                title: {
                    text: ""
                }
            },
            series: [{
                type: "line",
                data: cleanedData
            }]
        };
        return <ChartComponent options={options} />;
    }
}

ProfileComponent.propTypes = {
    user: T.shape({
        login: T.string.isRequired,
        email: T.string.isRequired,
        id: T.number.isRequired,
        urls: T.array.isRequired
    }).isRequired,
    fetchMyUrls: T.func.isRequired,
    fetchMe: T.func.isRequired
};
