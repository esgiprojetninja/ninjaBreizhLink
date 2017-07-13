import $ from "jquery";
import {wrapRequest} from "./apiUtils";

let _fetchAll, _addUrl, _myUrls;

const baseUrl = "http://localhost:8080/url/";

const urlAPI = {
    fetchAll() {
        _fetchAll = $.ajax({
            url: baseUrl + "all/"
        });
        return wrapRequest(
            _fetchAll,
            data => data,
            error => error
        );
    },
    addUrl(url) {
        const fromDateTime = url.fromDateTime.format("YYYY-MM-DD HH:mm");
        const toDateTime = url.toDateTime.format("YYYY-MM-DD HH:mm");
        _addUrl = $.ajax({
            method: "POST",
            url: baseUrl + "add/",
            data: {
                password: url.password.length > 0 ? url.password : null,
                longUrl: url.value,
                usePwd: url.usePwd ? 1 : 0,
                useDate: url.useDate ? 1 : 0,
                fd: fromDateTime,
                td: toDateTime
            }
        });
        return wrapRequest(
            _addUrl,
            data => data,
            error => error
        );
    },
    myUrls() {
        _myUrls = $.ajax({
            method: "GET",
            url: baseUrl + "my-urls"
        });
        return wrapRequest(
            _myUrls,
            data => data,
            error => error
        );
    }
};

export default urlAPI;
