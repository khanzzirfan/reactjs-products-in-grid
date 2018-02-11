const initialState = {
    isLoading: false,
    isError: false,
    data: []
};

const ProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SUBMIT_GET_PRODUCTS':
            return {
                isLoading: true,
                isError: false,
                data: []
            }
        case 'FINISH_GET_PRODUCTS':
            return {
                isLoading: false,
                isError: false,
                data: action.data
            }
        case 'ERROR_GET_PRODUCTS':
            return {
                isLoading: false,
                isError: true,
                data: []
            }
        default:
            return state
    }
}

export default ProductsReducer;
