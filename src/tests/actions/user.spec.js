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
    beforeEach(() => {
        jest.clearAllMocks();
        global.localStorage = {
            removeItem: jest.fn(),
            getItem: jest.fn(),
            setItem: jest.fn()
        };
    });

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

    it("should NOT login without all credentials data", () => {
        const expextedActions = [
            { type: userActionTypes.LOGIN_REQUEST },
            {
                type: userActionTypes.LOGIN_FAILURE,
                payload: "Bad credentials"
            }
        ];
        const store = mockStore();
        return store.dispatch(userActions.login({
            username: "azy"
        })).then(() => {
            expect(store.getActions()).toEqual(expextedActions);
        });
    });

    it("should NOT login without credentials", () => {
        const expextedActions = [
            { type: userActionTypes.LOGIN_REQUEST },
            {
                type: SET_SNACK_MSG,
                payload: {
                    msg: "Failed to login",
                    snackDuration: undefined
                }
            },
            {
                type: userActionTypes.LOGIN_FAILURE,
                payload: new Error("gtfo")
            }
        ];
        const store = mockStore();
        return store.dispatch(userActions.login()).then(() => {
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

    it("should NOT create a user with uncomplete response", () => {
        const expectedAction = [
            { type: userActionTypes.USER_REQUEST },
            {
                type: SET_SNACK_MSG,
                payload: {
                    msg: "Uncomplete user info",
                    snackDuration: undefined
                }
            },
            {
                type: userActionTypes.ADD_USER_FAILURE,
                payload: {
                    errorText: "gtfo"
                }
            }
        ];
        const store = mockStore();
        return store.dispatch(userActions.addUser({ username: "chibar" })).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

    it("should NOT create a user with error on serverside", () => {
        const expectedAction = [
            { type: userActionTypes.USER_REQUEST },
            {
                type: SET_SNACK_MSG,
                payload: {
                    msg: "Account creation failure",
                    snackDuration: undefined
                }
            },
            {
                type: userActionTypes.ADD_USER_FAILURE,
                payload: { errorText: new Error("gtfo") }
            }
        ];
        const store = mockStore();
        return store.dispatch(userActions.addUser()).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

    it("should NOT load user session", () => {
        const expextedActions = [];
        const store = mockStore();
        store.dispatch(userActions.loadSessionUser());
        return expect(store.getActions()).toEqual(expextedActions);
    });

    it("should load only token session", () => {
        const expectedActions = [
            { type: userActionTypes.USER_REQUEST },
            {
                type: SET_SNACK_MSG,
                payload: {
                    msg: "Logged in as azy",
                    snackDuration: undefined
                }
            }
        ];
        global.localStorage = {
            removeItem: jest.fn(),
            getItem(prop) {
                return (prop === "authToken") ? "coucou" : null;
            },
            setItem: jest.fn()
        };
        const store = mockStore();
        store.dispatch(userActions.loadSessionUser());
        let callNumber = 1;
        store.subscribe(() => {
            switch (callNumber) {
            case 1:
                expect(store.getActions()).toEqual(expectedActions);
                break;
            case 2:
                expect(store.getActions()).toEqual(expectedActions.concat([{
                    type: userActionTypes.LOGIN_SUCCESS,
                    payload: {
                        data: {
                            some: "user",
                            id: 1,
                            email: "coucou",
                            username: "azy"
                        }
                    }
                }]));
                break;
            default: break;
            }
            callNumber += 1;
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
        return store.dispatch(userActions.getMe("coucouToken")).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

    it("should NOT get whole user profile", () => {
        const expectedAction = [
            { type: userActionTypes.USER_REQUEST },
            {
                type: SET_SNACK_MSG,
                payload: {
                    msg: "Log in failed",
                    snackDuration: undefined
                }
            },
            {
                payload: {},
                type: userActionTypes.LOGOUT
            },
            {
                payload: "Fucked up token",
                type: userActionTypes.LOGIN_FAILURE
            }
        ];
        const store = mockStore();
        return store.dispatch(userActions.getMe("fail")).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

    it("should NOT get user profile", () => {
        const expectedAction = [
            { type: userActionTypes.USER_REQUEST },
            {
                type: SET_SNACK_MSG,
                payload: {
                    msg: "Log in failed",
                    snackDuration: undefined
                }
            },
            {
                payload: {},
                type: userActionTypes.LOGOUT
            },
            {
                payload: "Could not load profile data",
                type: userActionTypes.LOGIN_FAILURE
            }
        ];
        const store = mockStore();
        return store.dispatch(userActions.getMe("error")).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });
});
