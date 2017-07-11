import {connect} from "react-redux";
import {getMe, logout} from "../actions/userActions";
import {changeView} from "../actions/viewActions";
import BreizhLinkAppComponent from "../ui/BreizhLinkAppComponent.jsx";


const mapStateToProps = (state) => {
    return {
        view: state.view,
        user: state.user.currentUser.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        switchView: (view) => {
            dispatch(changeView(view));
        },
        getMe: () => {
            dispatch(getMe());
        },
        logout: () => {
            dispatch(logout());
        }
    };
};

const BreizhLinkApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(BreizhLinkAppComponent);

export default BreizhLinkApp;
