/* eslint-env jest */
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as userActionTypes from "../../actions/types/user";
import * as userActions from "../../actions/user";

import { mockAPI } from "../mock/API";
import { createUser, basicUser } from "../mock/body/user";

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

    it("should login", () => {
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

    it("should create a user", () => {
        const expectedAction = [
            { type: userActionTypes.USER_REQUEST },
            {
                type: userActionTypes.ADD_USER_SUCCESS,
                payload: { user: basicUser }
            }
        ];
        const store = mockStore();
        return store.dispatch(userActions.addUser(createUser)).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

    it("should empty snackbar msg", () => {
        const expectedAction = { type: userActionTypes.NOTICE_USER_SNACK };
        expect(userActions.noticeSnack()).toEqual(expectedAction);
    });
});
