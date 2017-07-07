import {connect} from "react-redux";

import {changeView} from "../actions/viewActions";
import BreizhLinkAppComponent from "../ui/BreizhLinkAppComponent.jsx";


const mapStateToProps = (state) => {
    return {
        view: state.view
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        switchView: (view) => {
            dispatch(changeView(view));
        }
    };
};

const BreizhLinkApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(BreizhLinkAppComponent);

export default BreizhLinkApp;
