import {
    GET_ALL_USERS
} from "./userActionTypes";

const users = [
    {
        id: 1,
        email: "toto@tata.to",
        login: "toto"
    },
    {
        id: 2,
        email: "toto@tata.to",
        login: "toto"
    }
];

export const getAllUsers = () => {
    return {
        type: GET_ALL_USERS,
        users: users,
        lodaing: false
    };
};
