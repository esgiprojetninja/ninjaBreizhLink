import React from "react";
import T from "prop-types";
import LogBox from "../container/LogBox";

export default class UserComponent extends React.PureComponent {
    render() {
        return (
            <div>
                {this.renderLogBox()}
            </div>
        );
    }

    renderLogBox() {
        return this.props.logbox ? <LogBox /> : null;
    }
}

UserComponent.propTypes = {
    logbox: T.bool.isRequired
};
