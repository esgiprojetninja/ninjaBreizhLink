import {connect} from "react-redux";

import {
    changeNewUrlValue,
    createUrl
} from "../actions/urlActions";

import UrlFormComponent from "../ui/UrlFormComponent.jsx";

const mapStateToProps = (state) => {
    return {
        newUrl: state.url.newUrl
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        newUrlChanged: (newValue) => {
            dispatch(changeNewUrlValue(newValue));
        },
        newUrlSubmitted: (url) => {
            dispatch(createUrl(url));
        }
    };
};

const UrlForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(UrlFormComponent);

export default UrlForm;