/* eslint-env jest */
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import mainReducer from "../../reducers/index";

import {
    mockAPI,
    mockAPIWithErrors,
    mockAPIWithServerFailure
} from "../mock/API";

import { SET_SNACK_MSG } from "../../actions/types/snack";
import * as accoTypes from "../../actions/types/accommodation";
import * as accoActions from "../../actions/accommodation";


describe("Actions user", () => {
    let mockStore = null;
    beforeEach(() => {
        jest.clearAllMocks();
        mockStore = configureMockStore([thunk.withExtraArgument(mockAPI)]);
        global.localStorage = {
            removeItem: jest.fn(),
            getItem: jest.fn(),
            setItem: jest.fn()
        };
    });

    it("should set current accomodation", () => {
        const expextedAction = {
            type: accoTypes.SET_CURRENT_ACCOMMODATION,
            payload: "coucou"
        };
        expect(accoActions.setCurrentAccommodation("coucou")).toEqual(expextedAction);
    });

    it("should show list", () => {
        const expextedAction = {
            type: accoTypes.SHOW_LIST
        };
        expect(accoActions.showList()).toEqual(expextedAction);
    });

    it("should fetch all accommodations", async () => {
        const expectedActions = [
            { type: accoTypes.FETCH_ACCOMMODATIONS_REQUEST },
            {
                type: accoTypes.FETCH_ACCOMMODATIONS_SUCCESS,
                payload: []
            }
        ];
        const store = mockStore();
        await store.dispatch(accoActions.fetchAccommodations());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should NOT fetch all accommodations with API error", async () => {
        const expectedActions = [
            { type: accoTypes.FETCH_ACCOMMODATIONS_REQUEST },
            {
                type: SET_SNACK_MSG,
                payload: {
                    msg: "Failed to fetch accomodations",
                    snackDuration: undefined
                }
            },
            {
                type: accoTypes.FETCH_ACCOMMODATIONS_FAILURE,
                payload: "Not gonna happen bruh"
            }
        ];
        mockStore = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)]);
        const store = mockStore();
        await store.dispatch(accoActions.fetchAccommodations());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should NOT fetch all accommodations with server failure", async () => {
        const expectedActions = [
            { type: accoTypes.FETCH_ACCOMMODATIONS_REQUEST },
            {
                type: SET_SNACK_MSG,
                payload: {
                    msg: "Failed to fetch accomodations",
                    snackDuration: undefined
                }
            },
            {
                type: accoTypes.FETCH_ACCOMMODATIONS_FAILURE,
                payload: new Error({
                    code: 500,
                    message: "gtfo"
                })
            }
        ];
        mockStore = configureMockStore([thunk.withExtraArgument(mockAPIWithServerFailure)]);
        const store = mockStore();
        await store.dispatch(accoActions.fetchAccommodations());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should save a new accommodation", async () => {
        const expectedActions = [
            {
                type: accoTypes.SAVE_ACCOMMODATION_REQUEST
            },
            {
                type: SET_SNACK_MSG,
                payload: {
                    msg: "Accomodation created !",
                    snackDuration: undefined
                }
            },
            {
                type: accoTypes.SAVE_ACCOMMODATION_SUCCESS,
                payload: {
                    accommodation: {
                        id: 5,
                        title: "los singos"
                    }
                }
            },
            { type: accoTypes.FETCH_ACCOMMODATIONS_REQUEST },
            {
                type: accoTypes.FETCH_ACCOMMODATIONS_SUCCESS,
                payload: []
            }
        ];
        const store = mockStore();
        await store.dispatch(accoActions.saveAccommodation("chibar"));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should update the current accommodation", async () => {
        const expectedActions = [
            {
                type: accoTypes.SAVE_ACCOMMODATION_REQUEST
            },
            {
                type: SET_SNACK_MSG,
                payload: {
                    msg: "Accomodation created !",
                    snackDuration: undefined
                }
            },
            {
                type: accoTypes.SAVE_ACCOMMODATION_SUCCESS,
                payload: {
                    accommodation: {
                        id: 5,
                        title: "los singos"
                    }
                }
            },
            { type: accoTypes.FETCH_ACCOMMODATIONS_REQUEST },
            {
                type: accoTypes.FETCH_ACCOMMODATIONS_SUCCESS,
                payload: []
            }
        ];
        // mainReducer
        const store = mockStore(mainReducer(undefined, {}));
        await store.dispatch(accoActions.saveAccommodation());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should NOT save a new accommodation with API error", async () => {
        const expectedActions = [
            {
                type: accoTypes.SAVE_ACCOMMODATION_REQUEST
            },
            {
                type: SET_SNACK_MSG,
                payload: {
                    msg: "Accomodation creation failed !",
                    snackDuration: undefined
                }
            },
            {
                type: accoTypes.SAVE_ACCOMMODATION_FAILURE,
                payload: {
                    hasError: true,
                    message: "Hey hey, my my"
                }
            }
        ];
        mockStore = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)]);
        const store = mockStore();
        await store.dispatch(accoActions.saveAccommodation("chibar"));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should NOT save a new accommodation with server failure", async () => {
        const expectedActions = [
            {
                type: accoTypes.SAVE_ACCOMMODATION_REQUEST
            },
            {
                type: SET_SNACK_MSG,
                payload: {
                    msg: "Accomodation creation failed !",
                    snackDuration: undefined
                }
            },
            {
                type: accoTypes.SAVE_ACCOMMODATION_FAILURE,
                payload: new Error("gtfo")
            }
        ];
        mockStore = configureMockStore([thunk.withExtraArgument(mockAPIWithServerFailure)]);
        const store = mockStore();
        await store.dispatch(accoActions.saveAccommodation("chibar"));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should delete an accommodation", async () => {
        const expectedActions = [
            {
                type: accoTypes.DELETE_ACCOMMODATION_REQUEST
            },
            {
                type: accoTypes.DELETE_ACCOMMODATION_SUCCESS
            },
            { type: accoTypes.FETCH_ACCOMMODATIONS_REQUEST },
            {
                type: accoTypes.SHOW_LIST
            },
            {
                type: accoTypes.FETCH_ACCOMMODATIONS_SUCCESS,
                payload: []
            }
        ];
        const store = mockStore();
        await store.dispatch(accoActions.deleteAccommodation("chibar"));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should NOT delete an accommodation with API error", async () => {
        const expectedActions = [
            {
                type: accoTypes.DELETE_ACCOMMODATION_REQUEST
            },
            {
                type: SET_SNACK_MSG,
                payload: {
                    msg: "Accomodation deleting failed !",
                    snackDuration: undefined
                }
            },
            {
                type: accoTypes.DELETE_ACCOMMODATION_FAILURE,
                payload: "Couldn't delete"
            }
        ];
        mockStore = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)]);
        const store = mockStore();
        await store.dispatch(accoActions.deleteAccommodation("chibar"));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should NOT delete an accommodation with server failure", async () => {
        const expectedActions = [
            {
                type: accoTypes.DELETE_ACCOMMODATION_REQUEST
            },
            {
                type: SET_SNACK_MSG,
                payload: {
                    msg: "Accomodation deleting failed !",
                    snackDuration: undefined
                }
            },
            {
                type: accoTypes.DELETE_ACCOMMODATION_FAILURE,
                payload: new Error("gtfo")
            }
        ];
        mockStore = configureMockStore([thunk.withExtraArgument(mockAPIWithServerFailure)]);
        const store = mockStore();
        await store.dispatch(accoActions.deleteAccommodation("chibar"));
        expect(store.getActions()).toEqual(expectedActions);
    });
});
