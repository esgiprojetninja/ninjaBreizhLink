import $ from "jquery";
import {wrapRequest} from "./apiUtils";

let _fetchAll;

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
    }
};

export default urlAPI;
