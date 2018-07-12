/* eslint-env jest */
/* global window */
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as userActionTypes from "../../actions/types/user";
import * as userActions from "../../actions/user";
import { SET_SNACK_MSG } from "../../actions/types/snack";
import { basicUser } from "../mock/body/user";
import {
    mockAPI,
    mockAPIWithErrors,
    mockAPIWithServerFailure
} from "../mock/API";

import { accommodationMock } from "../mock/body/accommodation";

describe("Actions user", () => {
    let mockStore = null;
    beforeEach(() => {
        jest.clearAllMocks();
        window.localStorage = {
            removeItem: jest.fn(),
            getItem: jest.fn(),
            setItem: jest.fn()
        };
        global.localStorage = {
            removeItem: jest.fn(),
            getItem: jest.fn(),
            setItem: jest.fn()
        };
        mockStore = configureMockStore([thunk.withExtraArgument(mockAPI)]);
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
            { type: userActionTypes.USER_GET_ME_REQUEST },
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
                        userName: "azy"
                    }
                }
            },
            { type: userActionTypes.USER_REQUEST },
        ];
        const store = mockStore();
        return store.dispatch(userActions.login({
            userName: "azy",
            password: "secret"
        })).then(() => {
            expect(store.getActions()).toEqual(expextedActions);
        });
    });

    it("should NOT login with API error", () => {
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
                payload: "No sir, you are not comin in"
            }
        ];
        mockStore = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)]);
        const store = mockStore();
        return store.dispatch(userActions.login({
            userName: "azy"
        })).then(() => {
            expect(store.getActions()).toEqual(expextedActions);
        });
    });

    it("should NOT login with server failure", () => {
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
                payload: new Error({
                    code: 500,
                    message: "gtfo"
                })
            }
        ];
        mockStore = configureMockStore([thunk.withExtraArgument(mockAPIWithServerFailure)]);
        const store = mockStore();
        return store.dispatch(userActions.login()).then(() => {
            expect(store.getActions()).toEqual(expextedActions);
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
            { type: userActionTypes.USER_GET_ME_REQUEST },
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
                            userName: "azy"
                        }
                    }
                }]));
                break;
            default: break;
            }
            callNumber += 1;
        });
    });

    it("should get user profile", async () => {
        const expectedActions = [
            { type: userActionTypes.USER_GET_ME_REQUEST },
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
                        userName: "azy"
                    }
                }
            },
            { type: userActionTypes.USER_REQUEST },
        ];
        const store = mockStore();
        await store.dispatch(userActions.getMe("coucouToken"));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should get user profile - already fetching profile", async () => {
        const expectedActions = [
        ];
        const store = mockStore({
            user: {
                isGettingData: true,
            }
        });
        await store.dispatch(userActions.getMe("coucouToken"));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should NOT get whole user profile", () => {
        const expectedAction = [
            { type: userActionTypes.USER_GET_ME_REQUEST },
            {
                type: SET_SNACK_MSG,
                payload: {
                    msg: "Login failed",
                    snackDuration: undefined
                }
            },
            {
                payload: {},
                type: userActionTypes.LOGOUT
            },
            {
                payload: "Who are you ?",
                type: userActionTypes.LOGIN_FAILURE
            }
        ];
        mockStore = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)]);
        const store = mockStore();
        return store.dispatch(userActions.getMe("fail")).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

    it("should NOT get user profile", () => {
        const expectedAction = [
            { type: userActionTypes.USER_GET_ME_REQUEST },
            {
                type: SET_SNACK_MSG,
                payload: {
                    msg: "Login failed",
                    snackDuration: undefined
                }
            },
            {
                payload: {},
                type: userActionTypes.LOGOUT
            },
            {
                payload: new Error("gtfo"),
                type: userActionTypes.LOGIN_FAILURE
            }
        ];
        mockStore = configureMockStore([thunk.withExtraArgument(mockAPIWithServerFailure)]);
        const store = mockStore();
        return store.dispatch(userActions.getMe()).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

    it("should get user accommodations", async () => {
        const expectedActions = [
            {
                type: userActionTypes.USER_REQUEST,
            },
            {
                payload: {
                    accommodations: Array.from(new Array(1)).map((a, i) => ({
                        ...accommodationMock,
                        id: i
                    })) },
                type: userActionTypes.FETCH_USER_ACCOMMODATIONS_SUCCESS
            },
        ];
        const store = mockStore();
        await store.dispatch(userActions.fetchUserAccommodations(123));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should NOT get user accommodations with API error", async () => {
        const expectedActions = [
            {
                type: userActionTypes.USER_REQUEST,
            },
            {
                type: SET_SNACK_MSG,
                payload: {
                    msg: "Could not fetch user accommodations",
                    snackDuration: undefined
                },
            },
            {
                payload: { error: "Error while fetching user places" },
                type: userActionTypes.FETCH_USER_ACCOMMODATIONS_FAIL
            },
        ];
        mockStore = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)]);
        const store = mockStore();
        await store.dispatch(userActions.fetchUserAccommodations(123));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should NOT get user accommodations with server failure", async () => {
        const expectedActions = [
            {
                type: userActionTypes.USER_REQUEST,
            },
            {
                type: SET_SNACK_MSG,
                payload: {
                    msg: "Failed to fetch user accommodations",
                    snackDuration: undefined
                },
            },
            {
                payload: { error: "gtfo" },
                type: userActionTypes.FETCH_USER_ACCOMMODATIONS_FAIL
            },
        ];
        mockStore = configureMockStore([thunk.withExtraArgument(mockAPIWithServerFailure)]);
        const store = mockStore();
        await store.dispatch(userActions.fetchUserAccommodations(123));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should upsert user", async () => {
        const expectedActions = [
            {
                type: userActionTypes.USER_REQUEST,
            },
            {
                type: SET_SNACK_MSG,
                payload: {
                    msg: "User created",
                    snackDuration: undefined
                },
            },
            {
                type: userActionTypes.ADD_USER_SUCCESS,
                payload: {
                    user: basicUser
                }
            }
        ];
        const store = mockStore();
        await store.dispatch(userActions.upsertUser({ poulay: "man" }));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should NOT upsert user with API error", async () => {
        const expectedActions = [
            {
                type: userActionTypes.USER_REQUEST,
            },
            {
                type: SET_SNACK_MSG,
                payload: {
                    msg: "Couldn't edit user",
                    snackDuration: undefined
                },
            },
            {
                type: userActionTypes.ADD_USER_FAILURE,
                payload: "POULAY ERROR",
            }
        ];
        mockStore = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)]);
        const store = mockStore();
        await store.dispatch(userActions.upsertUser({ id: 123, poulay: "man" }));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should NOT get user accommodations with server failure", async () => {
        const expectedActions = [
            {
                type: userActionTypes.USER_REQUEST,
            },
            {
                type: SET_SNACK_MSG,
                payload: {
                    msg: "Couldn't edit user",
                    snackDuration: undefined
                },
            },
            {
                type: userActionTypes.ADD_USER_FAILURE,
                payload: "gtfo",
            }
        ];
        mockStore = configureMockStore([thunk.withExtraArgument(mockAPIWithServerFailure)]);
        const store = mockStore();
        await store.dispatch(userActions.upsertUser({ id: 123, poulay: "man" }));
        expect(store.getActions()).toEqual(expectedActions);
    });
});
