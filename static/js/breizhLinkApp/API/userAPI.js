import $ from "jquery";
import {wrapRequest} from "./apiUtils";

let _fetchAll, _addUser, _login, _logout, _getMe;

const baseUrl = "http://localhost:8080/";

const userAPI = {
    fetchAll() {
        _fetchAll = $.ajax({
            url: baseUrl + "user/all/"
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
            url: baseUrl + "user/add/",
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
            url: baseUrl + "user/login/",
            data: user
        });
        return wrapRequest(
            _login,
            data => data,
            error => error
        );
    },
    logout() {
        _logout = $.ajax({
            method: "GET",
            url: baseUrl + "user/logout"
        });
        return wrapRequest(
            _logout,
            data => data,
            error => error
        );
    },
    getMe() {
        _getMe = $.ajax({
            method: "GET",
            url: baseUrl + "user/me"
        });
        return wrapRequest(
            _getMe,
            data => data,
            error => error
        );
    }
};

export default userAPI;
