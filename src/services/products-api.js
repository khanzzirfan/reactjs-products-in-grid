import _ from 'lodash';

/** dummy mock api call to fetch data*/
export function getProducts(queryParams) {
    let Url = 'http://localhost:3000/products?';

    if(_.isFinite(queryParams.page)){
        Url = Url + `_page=${queryParams.page}&`;
    }

    if(_.isFinite(queryParams.limit)){
        Url = Url + `_limit=${queryParams.limit}&`;
    }

    if(_.includes(['size', 'id', 'price'], queryParams.sortBy)){
        Url = Url + `_size=${queryParams.sortBy}`;
    }

    return httpGet(Url)
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
