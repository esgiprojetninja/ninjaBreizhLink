import {connect} from "react-redux";

import {
    changeNewUser,
    addNewUser,
    login,
    changeCurrentUser
} from "../actions/userActions";

import LogBoxComponent from "../ui/LogBoxComponent.jsx";

const mapStateToProps = (state) => {
    return {
        newUser: state.user.newUser,
        currentUser: state.user.currentUser
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onNewUserChanged: (user) => {
            dispatch(changeNewUser(user));
        },
        onSubscribeSubmit: (user) => {
            dispatch(addNewUser(user));
        },
        onCurrentUserChanged: (user) => {
            dispatch(changeCurrentUser(user));
        },
        onLoginSubmit: (user) => {
            dispatch(login(user));
        }
    };
};

const LogBox = connect(
    mapStateToProps,
    mapDispatchToProps
)(LogBoxComponent);

export default LogBox;
