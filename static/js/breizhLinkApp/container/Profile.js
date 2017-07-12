import {connect} from "react-redux";

import ProfileComponent from "../ui/ProfileComponent.jsx";

import {
    getMyUrls
} from "../actions/userActions";

const mapStateToProps = state => {
    return {
        user: state.user.currentUser.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMyUrls: () => {
            dispatch(getMyUrls());
        }
    };
};

const Profile = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileComponent);

export default Profile;
