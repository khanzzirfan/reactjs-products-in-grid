import _ from 'lodash';

const initialState = {
    isLoading: false,
    isError: false,
    sortBy: "id",
    hasMore: true,
    page: 0,
    limit: 15,
    data: []
};

const ProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SUBMIT_GET_PRODUCTS':
            return {
                ...state,
                isLoading: true,
                isError: false,
                page: action.params.page,
                sortBy: action.params.sortBy,
                limit: action.params.limit
            }
        case 'FINISH_GET_PRODUCTS':
            debugger;
            let moreProducts;
            if (_.isEmpty(state.data)) {
                moreProducts = action.data;
            }
            else {
                moreProducts = state.data.concat(action.data);
            }

            return {
                ...state,
                isLoading: false,
                isError: false,
                page: action.params.page,
                sortBy: action.params.sortBy,
                limit: action.params.limit,
                hasMore: !(state.data.length > 0 && action.data.length < 14),
                data: moreProducts
            }
        case 'ERROR_GET_PRODUCTS':
            return {
                ...state,
                isLoading: false,
                isError: true,
                data: []
            }
        default:
            return state
    }
}

export default ProductsReducer;
