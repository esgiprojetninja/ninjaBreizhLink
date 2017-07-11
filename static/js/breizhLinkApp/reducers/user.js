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
        case types.CHANGE_CURRENT_USER:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    user: action.user
                }
            };
        case types.REQUEST_LOGIN:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    loading: action.loading
                }
            };
        case types.LOGIN_ERROR:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    loading: action.loading,
                    error: action.error
                }
            };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    loading: action.loading,
                    error: "",
                    user: action.user
                }
            };
        case types.RECEIVE_ME:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    loading: false,
                    error: "",
                    user: action.user
                }
            };
        default:
            return state;
    }
};

export default user;
