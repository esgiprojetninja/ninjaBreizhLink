import $ from "jquery";
import {wrapRequest} from "./apiUtils";

let _fetchAll, _addUser;

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
            data: {
                user: user
            }
        });
        return wrapRequest(
            _addUser,
            data => data,
            error => error
        );
    }
};

export default userAPI;
