import $ from "jquery";
import {wrapRequest} from "./apiUtils";

let _fetchAll, _addUrl;

const urlAPI = {
    fetchAll() {
        _fetchAll = $.ajax({
            url: "http://localhost:8080/url/all/"
        });
        return wrapRequest(
            _fetchAll,
            data => data,
            error => error
        );
    },
    addUrl(url) {
        _addUrl = $.ajax({
            method: "POST",
            url: "http://localhost:8080/url/add",
            data: {
                longUrl: url.value,
                password: url.password.length > 0 ? url.password : null,
                usePwd: url.usePwd
            }
        });
        return wrapRequest(
            _addUrl,
            data => data,
            error => error
        );
    }
};

export default urlAPI;
