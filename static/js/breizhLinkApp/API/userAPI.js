import $ from "jquery";
import {wrapRequest} from "./apiUtils";

let _fetchAll;

const userAPI = {
    fetAll() {
        _fetchAll = $.ajax({
            url: "http://localhost:8080/user/all/"
        });
        return wrapRequest(
            _fetchAll,
            data => data,
            error => error
        );
    }
};

export default userAPI;
