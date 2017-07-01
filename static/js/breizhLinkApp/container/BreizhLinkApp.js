import {connect} from "react-redux";

import BreizhLinkAppComponent from "../ui/BreizhLinkAppComponent.jsx";


const mapStateToProps = (state) => {
    return {
        view: state.view
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

const BreizhLinkApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(BreizhLinkAppComponent);

export default BreizhLinkApp;
