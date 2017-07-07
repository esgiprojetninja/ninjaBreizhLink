import React from "react";
import T from "prop-types";
import {
    Panel,
    Table
} from "react-bootstrap";

export default class UserListComponent extends React.PureComponent {

    componentDidMount() {
        this.props.onGetUserClicked();
    }

    render() {
        if (this.props.loading) {
            return <p>Loading...</p>;
        }
        return (
            <Panel header={<h3>User list</h3>}>
                <Table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Login</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderUsers()}
                    </tbody>
                </Table>
                <button
                    type="button"
                    onClick={this.props.onGetUserClicked}
                >
                    Get users
                </button>
            </Panel>
        );
    }

    renderUsers() {
        return this.props.users.map(u => (
            <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.login}</td>
                <td>{u.email}</td>
            </tr>
        ));
    }
}

UserListComponent.propTypes = {
    users: T.array,
    loading: T.bool,
    onGetUserClicked: T.func
};
