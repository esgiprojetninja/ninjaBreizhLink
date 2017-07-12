import React from "react";
import T from "prop-types";
import UserList from "../container/UserList";
import LogBox from "../container/LogBox";

export default class UserComponent extends React.PureComponent {
    render() {
        return (
            <div>
                {this.renderLogBox()}
                <UserList />
            </div>
        );
    }

    renderLogBox() {
        console.log(this.props.logbox);
        return this.props.logbox ? <LogBox /> : null;
    }
}

UserComponent.propTypes = {
    logbox: T.bool.isRequired
};
