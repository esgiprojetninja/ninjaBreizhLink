import {connect} from "react-redux";
import {fetchAllUrls} from "../actions/urlActions";

import UrlListComponent from "../ui/UrlListComponent.jsx";

const mapStateToProps = state => {
    return state.url;
};

const mapDispatchToProps = dispatch => {
    return {
        refreshList: () => {
            dispatch(fetchAllUrls());
        }
    };
};

const UrlList = connect(
    mapStateToProps,
    mapDispatchToProps
)(UrlListComponent);

export default UrlList;
