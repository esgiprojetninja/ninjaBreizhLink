import * as types from "../actions/userActionTypes";

const user = (state = {}, action) => {
    switch (action.type) {
        case types.GET_ALL_USERS:
            return {
                ...state,
                users: action.users,
                loading: action.loading
            };
        break;
        default:
            return state;
    }
}

export default user;
