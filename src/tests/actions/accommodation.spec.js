/* eslint-env jest */
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
    mockAPI,
    mockAPIWithErrors
} from "../mock/API";

import mainReducer from "../../reducers/index";

import * as accoTypes from "../../actions/types/accommodation";
import { SET_SNACK_MSG } from "../../actions/types/snack";

import * as accoActions from "../../actions/accommodation";

const mockStore = configureMockStore([thunk.withExtraArgument(mockAPI)]);

describe("Actions Accommodations", () => {
    it("should fetchAccommodationsWithoutAuth", () => {
        const expectedActions = [
            { type: accoTypes.FETCH_ACCOMMODATIONS_REQUEST },
            {
                type: accoTypes.FETCH_ACCOMMODATIONS_SUCCESS,
                payload: []
            }
        ];
        const store = mockStore(mainReducer(undefined, {}));
        return store.dispatch(accoActions.fetchAccommodationsWithoutAuth()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("should fetchAccommodationsWithoutAuth (error)", () => {
        const expectedActions = [
            { type: accoTypes.FETCH_ACCOMMODATIONS_REQUEST },
            {
                type: accoTypes.FETCH_ACCOMMODATIONS_FAILURE,
                payload: "Naupe !"
            }
        ];
        const storeError = configureMockStore(
            [thunk.withExtraArgument(mockAPIWithErrors)]
        )(mainReducer(undefined, {}));
        return storeError.dispatch(accoActions.fetchAccommodationsWithoutAuth()).then(() => {
            expect(storeError.getActions()).toEqual(expectedActions);
        });
    });

    it("should updateAccommodation", () => {
        const expectedActions = {
            type: accoTypes.UPDATE_ACCOMMODATION,
            payload: {
                property: "coucou",
                value: "coucou"
            }
        };
        return expect(accoActions.updateAccommodation("coucou", "coucou")).toEqual(expectedActions);
    });

    it("should setCurrentAccommodation", () => {
        const expectedActions = {
            type: accoTypes.SET_CURRENT_ACCOMMODATION,
            payload: "coucou"
        };
        return expect(accoActions.setCurrentAccommodation("coucou")).toEqual(expectedActions);
    });

    it("should showList", () => {
        const expectedActions = {
            type: accoTypes.SHOW_LIST
        };
        return expect(accoActions.showList()).toEqual(expectedActions);
    });

    it("should fetchAccommodations", () => {
        const expectedActions = [
            { type: accoTypes.FETCH_ACCOMMODATIONS_REQUEST },
            {
                type: accoTypes.FETCH_ACCOMMODATIONS_SUCCESS,
                payload: []
            }
        ];
        const store = mockStore(mainReducer(undefined, {}));
        return store.dispatch(accoActions.fetchAccommodations()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("should saveAccommodation", () => {
        const expectedActions = [
            { type: accoTypes.SAVE_ACCOMMODATION_REQUEST },
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
        const store = mockStore(mainReducer(undefined, {}));
        return store.dispatch(accoActions.saveAccommodation()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("should deleteAccommodation", () => {
        const expectedActions = [
            { type: accoTypes.DELETE_ACCOMMODATION_REQUEST },
            { type: accoTypes.DELETE_ACCOMMODATION_SUCCESS },
            { type: accoTypes.FETCH_ACCOMMODATIONS_REQUEST },
            {
                type: accoTypes.SHOW_LIST
            },
            {
                type: accoTypes.FETCH_ACCOMMODATIONS_SUCCESS,
                payload: []
            }
        ];
        const store = mockStore(mainReducer(undefined, {}));
        return store.dispatch(accoActions.deleteAccommodation()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
