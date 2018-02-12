import * as api from 'src/services/products-api';
import _ from 'lodash';

export function sortby_selection(sortyBy){
    return dispatch => {
        dispatch({
            type: 'SORT_BY_SELECTION_CHANGED',
            sortBy: sortyBy
        });
    }
}

function Submit_GetProducts(queryParams) {
    return dispatch => {
        dispatch({
            type: 'SUBMIT_GET_PRODUCTS',
            params: queryParams
        });
    }
}


function Finish_GetProducts(queryParams, data) {
    return dispatch => {
        dispatch({
            type: 'FINISH_GET_PRODUCTS',
            params: queryParams,
            data: data
        });
    }
}

function Error_GettingProducts(error) {
    return dispatch => {
        dispatch({
            type: 'ERROR_GET_PRODUCTS',
            error
        });
    }
}

export function fetchProductsDataAPI(queryParams) {
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

function memoizedFetchProductsData(queryParams){
    return fetchProductsDataAPI(queryParams);
}

//Cache results for next time use;
var memoizedGetProducts = _.memoize(memoizedFetchProductsData, function(queryParams){
    return JSON.stringify(`page${queryParams.page}sortBy${queryParams.sortBy}`);
});

export {memoizedGetProducts as fetchProductsData};