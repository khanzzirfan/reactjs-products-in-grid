
/** dummy mock api call to fetch data*/
export function getProducts() {
    return httpGet('http://localhost:3000/products')
        .then(function (response) {
            return JSON.parse(response);
        }).catch(error => {
            throw error;
        });
}









function httpGet(url) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.timeout = 5000;
        xhr.onreadystatechange = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.response)
                } else {
                    reject(xhr.status)
                }
            }
        }
        xhr.ontimeout = function () {
            reject('timeout')
        }
        xhr.open('get', url, true)
        xhr.send();
    })
}
