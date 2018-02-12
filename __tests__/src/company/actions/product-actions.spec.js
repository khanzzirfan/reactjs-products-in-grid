import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import when from "when";

import * as ProductActions from 'src/products/actions/product-actions.js';;
import * as api from 'src/services/products-api';

describe("src/product/actions/product-action", () => {

    it("when sort by action is called, it should dispatch the correct action type", () => {

        const expectedAction = {
            type: 'SORT_BY_SELECTION_CHANGED',
            sortBy: 'size'
        };

        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);
        const store = mockStore({});

        store.dispatch(ProductActions.sortby_selection('size'));
        // Test if your store dispatched the expected actions
        const actions = store.getActions()

        expect(actions).toEqual([expectedAction]);
    });


    it("when fetch products action is called, it should dispatch the correct action type", () => {
        let queryParams = {
            limit: 15,
            sortBy: 'size',
            page: 1
        };

        const expectedAction =
            [{
                type: 'SUBMIT_GET_PRODUCTS',
                params: queryParams
            },
            {
                type: 'FINISH_GET_PRODUCTS',
                params: queryParams,
                data: [{ id: "123" }]
            }
            ];

        let stubdata = [
            {
                id: "123"
            }
        ];

        //mock dummy api;
        api.getProducts = jest.fn(c => when(stubdata));

        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);
        const store = mockStore({});

        store.dispatch(ProductActions.fetchProductsDataAPI(queryParams))
            .then(res => {
                // Test if your store dispatched the expected actions
                const actions = store.getActions()
                expect(actions).toEqual([expectedAction]);
                done();
            }).catch(err => {
                done.fail(err);
            });

    });


    it("when fetch products action is called and api errored, it should dispatch the error action type", () => {
        let queryParams = {
            limit: 15,
            sortBy: 'size',
            page: 1
        };
        var error = new Error("api unavailable");
        const expectedAction =
            [{
                type: 'SUBMIT_GET_PRODUCTS',
                params: queryParams
            },
            {
                type: 'ERROR_GET_PRODUCTS',
                error: error,
            }
            ];

        let stubdata = [
            {
                id: "123"
            }
        ];

        //mock dummy api;
        api.getProducts = jest.fn(c => when.reject(error));

        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);
        const store = mockStore({});

        store.dispatch(ProductActions.fetchProductsDataAPI(queryParams))
            .then(res => {
                // Test if your store dispatched the expected actions
                const actions = store.getActions()
                expect(actions).toEqual([expectedAction]);
                done();
            }).catch(err => {
                done.fail(err);
            });

    });

});