/* eslint-env jest */
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as userActionTypes from "../../actions/types/user";
import * as userActions from "../../actions/user";
import { SET_SNACK_MSG } from "../../actions/types/snack";
import { mockAPI } from "../mock/API";
import { createUser, basicUser } from "../mock/body/user";

const mockStore = configureMockStore([thunk.withExtraArgument(mockAPI)]);

describe("Actions user", () => {
    global.localStorage = {
        removeItem: jest.fn(),
        getItem: jest.fn(),
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
            {
                type: userActionTypes.LOGIN_SUCCESS,
                payload: {
                    data: { token: "prout" }
                }
            },
            { type: userActionTypes.USER_REQUEST },
            {
                type: SET_SNACK_MSG,
                payload: {
                    msg: "Logged in as azy",
                    snackDuration: undefined
                }
            },
            {
                type: userActionTypes.LOGIN_SUCCESS,
                payload: {
                    data: {
                        some: "user",
                        id: 1,
                        email: "coucou",
                        username: "azy"
                    }
                }
            }
        ];
        const store = mockStore();
        return store.dispatch(userActions.login({
            username: "azy",
            password: "secret"
        })).then(() => {
            expect(store.getActions()).toEqual(expextedActions);
        });
    });

    it("should create a user", () => {
        const expectedAction = [
            { type: userActionTypes.USER_REQUEST },
            {
                type: SET_SNACK_MSG,
                payload: {
                    msg: `Account created with ${createUser.username}`,
                    snackDuration: undefined
                }
            },
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

    it("should NOT load user session", () => {
        const store = mockStore();
        return store.dispatch(userActions.loadSessionUser())
            .then(() => {
                expect(store.getActions()).toEqual([]);
            });
    });


    it("should get user profile", () => {
        const expectedAction = [
            { type: userActionTypes.USER_REQUEST },
            {
                type: SET_SNACK_MSG,
                payload: {
                    msg: "Logged in as azy",
                    snackDuration: undefined
                }
            },
            {
                type: userActionTypes.LOGIN_SUCCESS,
                payload: {
                    data: {
                        some: "user",
                        id: 1,
                        email: "coucou",
                        username: "azy"
                    }
                }
            }
        ];
        const store = mockStore();
        return store.dispatch(userActions.getMe()).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });
});
