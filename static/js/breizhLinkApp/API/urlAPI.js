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
        _addUrl = $.ajax({
            method: "POST",
            url: baseUrl + "add/",
            data: {
                url: {
                    ...url,
                    longUrl: url.value,
                    password: url.password.length > 0 ? url.password : null,
                    usePwd: url.usePwd,
                    fromDate: url.fromDate.format(),
                    toDate: url.toDate.format()
                },
                fd: url.fromDate.format("YYYY-MM-DDTHH:mm"),
                td: url.toDate.format("YYYY-MM-DDTHH:mm")
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
