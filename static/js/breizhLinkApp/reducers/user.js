import * as types from "../actions/userActionTypes";

const user = (state = {}, action) => {
    switch (action.type) {
        case types.REQUEST_ALL_USERS:
            return {
                ...state,
                loading: action.loading
            };
        case types.RECEIVE_ALL_USERS:
            return {
                ...state,
                users: action.users,
                loading: action.loading
            };
        case types.RECEIVE_ERROR:
            return {
                ...state,
                loading: action.loading
            };
        case types.CHANGE_NEW_USER:
            return {
                ...state,
                newUser: action.newValue
            };
        default:
            return state;
    }
};

export default user;
