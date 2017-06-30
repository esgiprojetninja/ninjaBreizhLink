import $ from "jquery";

let _fetAll;

function wrapRequest(request, success, failure) {
    return new Promise((resolve, reject) => {
        request
            .then(data => resolve(success(data)))
            .then(error => reject(failure(error)));
    });
}

const userAPI = {
    fetAll() {
        _fetAll = $.ajax({
            url: "http://localhost:8080/user/all/"
        });
        return wrapRequest(
            _fetAll,
            data => data,
            error => error
        );
    }
};

export default userAPI;
