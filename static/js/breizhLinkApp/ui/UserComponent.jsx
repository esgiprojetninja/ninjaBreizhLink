import React from "react";
import UserList from "../container/UserList";
import LogBox from "../container/LogBox";

export default class UserListComponent extends React.PureComponent {
    render() {
        return (
            <div>
                <LogBox />
                <UserList />
            </div>
        );
    }
}
