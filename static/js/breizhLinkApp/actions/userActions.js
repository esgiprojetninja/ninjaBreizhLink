import {
    CHANGE_NEW_USER,
    REQUEST_ALL_USERS,
    RECEIVE_ALL_USERS,
    RECEIVE_ERROR
} from "./userActionTypes";
import userAPI from "../API/userAPI";


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
            (data) => dispatch(fetchAllUsers()),
            (reason) => dispatch(receiveError(reason))
        );
    };
}
