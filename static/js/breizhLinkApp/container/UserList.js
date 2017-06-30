import {connect} from "react-redux";
import {getAllUsers} from "../actions/userActions";

import UserListComponent from "../ui/UserListComponent.jsx";

const mapStateToProps = state => {
    return state.user;

};

const mapDispatchToProps = dispatch => {
    return {
        onGetUserClicked: () => {
            dispatch(getAllUsers());
        }
    };
};

const UserList = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserListComponent);

export default UserList;
