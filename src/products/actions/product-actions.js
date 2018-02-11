import * as api from 'src/services/products-api';

export function Submit_GetProducts(queryParams) {
    return dispatch => {
        dispatch({
            type: 'SUBMIT_GET_PRODUCTS',
            params: queryParams
        });
    }
}


export function Finish_GetProducts(queryParams, data) {
    return dispatch => {
        dispatch({
            type: 'FINISH_GET_PRODUCTS',
            params: queryParams,
            data: data
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

export function fetchProductsData(queryParams) {
    return dispatch => {
        dispatch(Submit_GetProducts(queryParams));
        return api.getProducts(queryParams).then(response => {
            dispatch(Finish_GetProducts(queryParams, response));
        })
            .catch(error => {
                dispatch(Error_GettingProducts(error));
            });
    }
}
