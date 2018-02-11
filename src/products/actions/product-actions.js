import * as api from 'src/services/products-api';

export function Submit_GetProducts() {
    return dispatch => {
        dispatch({
            type: 'SUBMIT_GET_PRODUCTS'
        });
    }
}


export function Finish_GetProducts(data) {
    return dispatch => {
        dispatch({
            type: 'FINISH_GET_PRODUCTS',
            data
        });
    }
}

export function Error_GettingProducts(error) {
    return dispatch => {
        dispatch({
            type: 'ERROR_GET_PRODUCTS',
            error
        });
    }
}

export function fetchProductsData() {
    return dispatch => {
        dispatch(Submit_GetProducts());
        return api.getProducts().then(response => {
            dispatch(Finish_GetProducts(response));
        })
            .catch(error => {
                dispatch(Error_GettingProducts(error));
            });
    }
}
