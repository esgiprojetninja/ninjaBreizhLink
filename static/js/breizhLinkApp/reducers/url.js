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
        default:
            return state;
    }
};

export default url;
