import {
    REQUEST_ALL_URLS,
    RECEIVE_ALL_URLS,
    RECEIVE_ERROR
} from "./urlActionTypes";
import urlAPI from "../API/urlAPI";


const requestAllUrls = () => {
    return {
        type: REQUEST_ALL_URLS,
        loading: true
    };
};

const receiveAllUrls = (urls) => {
    return {
        type: RECEIVE_ALL_URLS,
        urls: urls,
        loading: false
    };
};

const receiveError = (error) => {
    return {
        type: RECEIVE_ERROR,
        loading: false,
        error: error
    };
};

export function fetchAllUrls(users) {
    return function (dispatch) {
        dispatch(requestAllUrls());
        return urlAPI.fetchAll().then(
                (data) => dispatch(receiveAllUrls(data)),
                (reason) => dispatch(receiveError(reason))
            );
    };
}
