export function wrapRequest(request, success, failure) {
    return new Promise((resolve, reject) => {
        request
            .then(data => resolve(success(data)))
            .then(error => reject(failure(error)));
    });
}
