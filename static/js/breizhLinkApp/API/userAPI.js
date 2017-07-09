import $ from "jquery";
import {wrapRequest} from "./apiUtils";

let _fetchAll, _addUser, _login;

const userAPI = {
    fetchAll() {
        _fetchAll = $.ajax({
            url: "http://localhost:8080/user/all/"
        });
        return wrapRequest(
            _fetchAll,
            data => data,
            error => error
        );
    },
    addUser(user) {
        _addUser = $.ajax({
            method: "POST",
            url: "http://localhost:8080/user/add/",
            data: user
        });
        return wrapRequest(
            _addUser,
            data => data,
            error => error
        );
    },
    login(user) {
        _login = $.ajax({
            method: "POST",
            url: "http://localhost:8080/user/login/",
            data: user
        });
        return wrapRequest(
            _login,
            data => data,
            error => error
        );
    }
};

export default userAPI;
