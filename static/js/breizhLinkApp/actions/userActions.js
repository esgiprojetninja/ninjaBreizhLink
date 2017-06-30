import {
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

export function fetchAllUsers(users) {
    return function (dispatch) {
        dispatch(requestAllUsers());
        console.log(userAPI.fetAll());
        return userAPI.fetAll().then(
                (data) => dispatch(receiveAllUsers(data)),
                (reason) => dispatch(receiveError(reason))
            );
    };
}
