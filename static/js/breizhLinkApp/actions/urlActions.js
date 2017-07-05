import {
    REQUEST_ALL_URLS,
    RECEIVE_ALL_URLS,
    RECEIVE_ERROR,
    CHANGE_NEW_URL_VALUE,
    REQUEST_CREATE_URL
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

const requestCreateUrl = () => {
    return {
        type: REQUEST_CREATE_URL,
        loading: true
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

export const createUrl = (url) => {
    return function (dispatch) {
        dispatch(requestCreateUrl());
        return urlAPI.addUrl(url).then(
            () => dispatch(fetchAllUrls()),
            (reason) => dispatch(receiveError(reason))
        );
    };
};


export const changeNewUrlValue = (newValue) => {
    return {
        type: CHANGE_NEW_URL_VALUE,
        newValue
    };
};
