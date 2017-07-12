import * as types from "../actions/urlActionTypes";

const url = (state = {}, action) => {
    switch (action.type) {
        case types.REQUEST_ALL_URLS:
            return {
                ...state,
                loading: action.loading
            };
        case types.RECEIVE_ALL_URLS:
            return {
                ...state,
                urls: action.urls,
                loading: action.loading
            };
        case types.RECEIVE_ERROR:
            return {
                ...state,
                loading: action.loading
            };
        case types.CHANGE_NEW_URL_VALUE:
            return {
                ...state,
                newUrl: action.newValue
            };
        case types.REQUEST_CREATE_URL:
            return {
                ...state,
                loading: action.loading
            };
        case types.RECEIVE_LAST_SHORT_URL:
            return {
                ...state,
                loading: action.loading,
                lastShortUrl: action.lastShortUrl
            };
        default:
            return state;
    }
};

export default url;
