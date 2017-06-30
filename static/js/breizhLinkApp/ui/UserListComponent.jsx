import React from "react";
import T from "prop-types";

export default class UserListComponent extends React.PureComponent {

    render() {
        console.log(this.props);
        if (this.props.loading) {
            return <p>Loading...</p>;
        }
        return (
            <div>
                <table>
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
                </table>
                <button
                    type="button"
                    onClick={this.props.onGetUserClicked}
                >
                    Get users
                </button>
            </div>
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
