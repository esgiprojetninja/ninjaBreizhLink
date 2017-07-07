import {connect} from "react-redux";

import {
    changeNewUser,
    addNewUser
} from "../actions/userActions";

import LogBoxComponent from "../ui/LogBoxComponent.jsx";

const mapStateToProps = (state) => {
    return {
        newUser: state.user.newUser
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onNewUserChanged: (user) => {
            dispatch(changeNewUser(user));
        },
        onSubscribeSubmit: (user) => {
            dispatch(addNewUser(user));
        }
    };
};

const LogBox = connect(
    mapStateToProps,
    mapDispatchToProps
)(LogBoxComponent);

export default LogBox;
