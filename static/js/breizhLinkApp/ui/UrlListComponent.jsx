import React from "react";
import T from "prop-types";
import {
    Table,
    Button
} from "react-bootstrap";

export default class UrlListComponent extends React.PureComponent {

    componentDidMount() {
        this.props.refreshList();
    }

    render() {
        return (
            <div>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Long url</th>
                            <th>Short Url</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderUrls()}
                    </tbody>
                </Table>
                <Button
                    bsStyle="primary"
                    onClick={this.props.refreshList}
                >Refresh list</Button>
            </div>
        );
    }

    renderUrls() {
        return this.props.urls.map(u => (
            <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.longUrl}</td>
                <td><a href={"http://b.li:8080/url/" + u.shortUrl} target="blank">{u.shortUrl}</a></td>
                <td>{u.password}</td>
            </tr>
        ));
    }
}

UrlListComponent.propTypes = {
    urls: T.array.isRequired,
    refreshList: T.func.isRequired
};
