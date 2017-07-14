import {
    CHANGE_NEW_USER,
    REQUEST_ALL_USERS,
    REQUEST_LOGIN,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    RECEIVE_ALL_USERS,
    RECEIVE_ERROR,
    CHANGE_CURRENT_USER,
    RECEIVE_ME,
    REQUEST_URLS,
    RECEIVE_URLS
} from "./userActionTypes";
import {changeView} from "./viewActions";
import userAPI from "../API/userAPI";
import urlAPI from "../API/urlAPI";


const requestAllUsers = () => {
    return {
        type: REQUEST_ALL_USERS,
        loading: true
    };
};

const receiveAllUsers = (users) => {
    return {
        type: RECEIVE_ALL_USERS,
        users: users,
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

export const changeNewUser = (newValue) => {
    return {
        type: CHANGE_NEW_USER,
        newValue
    };
};

export function fetchAllUsers() {
    return function (dispatch) {
        dispatch(requestAllUsers());
        return userAPI.fetchAll().then(
                (data) => dispatch(receiveAllUsers(data)),
                (reason) => dispatch(receiveError(reason))
            );
    };
}

export function addNewUser(user) {
    return function (dispatch) {
        // TODO dispatch loading
        return userAPI.addUser(user).then(
            (data) => dispatch(changeView("profile")),
            (reason) => dispatch(receiveError(reason))
        );
    };
}

export const changeCurrentUser = (user) => {
    return {
        type: CHANGE_CURRENT_USER,
        user
    };
};

const requestLogin = () => {
    return {
        type: REQUEST_LOGIN,
        loading: true
    };
};

const loginSuccess = user => {
    return {
        type: LOGIN_SUCCESS,
        loading: false,
        user: user
    };
};

const loginError = reason => {
    return {
        type: LOGIN_ERROR,
        loading: false,
        error: reason
    };
};

export function login(user) {
    return function (dispatch) {
        dispatch(requestLogin());
        return userAPI.login(user).then(
            data => dispatch(loginSuccess(data)),
            reason => dispatch(loginError(reason))
        );
    };
}


const receiveMe = (user) => {
    return {
        type: RECEIVE_ME,
        loading: false,
        user
    };
};

export function getMe() {
    return function (dispatch) {
        dispatch(requestLogin());
        return userAPI.getMe().then(
            data => dispatch(receiveMe(data)),
            reason => dispatch(receiveError(reason))
        );
    };
}

export function logout() {
    return function (dispatch) {
        dispatch(requestLogin());
        return userAPI.logout().then(
            data => dispatch(receiveMe(data)),
            reason => dispatch(receiveError(reason))
        );
    };
}

const requestUrls = () => {
    return {
        type: REQUEST_URLS,
        loading: true
    };
};

const receiveUrls = (urls) => {
    return {
        type: RECEIVE_URLS,
        loading: false,
        urls
    };
};

export function getMyUrls() {
    return function (dispatch) {
        dispatch(requestUrls());
        return urlAPI.myUrls().then(
            data => dispatch(receiveUrls(data)),
            reason => dispatch(receiveError(reason))
        );
    };
}
