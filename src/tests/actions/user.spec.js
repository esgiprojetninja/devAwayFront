/* eslint-env jest */
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as userActionTypes from "../../actions/types/user";
import * as userActions from "../../actions/user";

import mockAPI from "../mock/API";

const mockStore = configureMockStore([thunk.withExtraArgument(mockAPI)]);

describe("Actions user", () => {
    global.localStorage = {
        removeItem: jest.fn(),
        setItem: jest.fn()
    };

    it("should logout", () => {
        const expextedAction = {
            type: userActionTypes.LOGOUT,
            payload: {}
        };
        expect(userActions.logout()).toEqual(expextedAction);
    });

    it("should logout", () => {
        const expextedActions = [
            { type: userActionTypes.LOGIN_REQUEST },
            { type: userActionTypes.LOGIN_SUCCESS, payload: { token: "prout" } }
        ];
        const store = mockStore();
        return store.dispatch(userActions.login({
            username: "toto",
            password: "secret"
        })).then(() => {
            expect(store.getActions()).toEqual(expextedActions);
        });
    });
});
