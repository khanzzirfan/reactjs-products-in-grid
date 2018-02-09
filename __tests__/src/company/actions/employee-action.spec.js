import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import when from "when";

import * as EmployeeActions from 'src/company/actions/employee-action.js';;

describe("src/company/actions/employee-action", () => {

    it("when employee submit initialize action is called, data is an empty array", ()=> {

        const expectedAction = {
            type: 'INITIALIZE_START',
            data: []
        };

        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);
        const store = mockStore({});
       
        store.dispatch(EmployeeActions.SubmitInitializeEmployees());
        // Test if your store dispatched the expected actions
        const actions = store.getActions()
       
        expect(actions).toEqual([expectedAction]);
    });
});