/* eslint-env jest */
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import {
    mockAPI,
    mockAPIWithErrors
} from "../mock/API";

import mainReducer from "../../reducers/index";
import {
    mapStateToProps,
    mapDispatchToProps
} from "../../containers/AccommodationsList";

const mockStore = configureMockStore([thunk.withExtraArgument(mockAPI)]);

const prepare = (name, state) => {
    const store = mockStore(state);
    return {
        store,
        // wrap in a promise to handle everything in the same way
        fn: (...args) =>
            Promise.resolve(mapDispatchToProps(store.dispatch)[name](...args))
    };
};

const mockErrorStore = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)]);

const prepareWithError = (name, state) => {
    const store = mockErrorStore(state);
    return {
        store,
        // wrap in a promise to handle everything in the same way
        fn: (...args) =>
            Promise.resolve(mapDispatchToProps(store.dispatch)[name](...args))
    };
};

describe("Container Accommodation", () => {
    describe("mapDispatchToProps", () => {
        it("onFetchAccommodationsClicked", async () => {
            const { store, fn } = prepare("onFetchAccommodationsClicked", mainReducer(undefined, {}));
            await fn();
            expect(store.getActions().map(a => a.type)).toEqual([
                "FETCH_ACCOMMODATIONS_REQUEST",
                "FETCH_ACCOMMODATIONS_SUCCESS"
            ]);
        });

        it("onFetchAccommodationsClicked - API error", async () => {
            const { store, fn } = prepareWithError("onFetchAccommodationsClicked", mainReducer(undefined, {}));
            await fn();
            expect(store.getActions().map(a => a.type)).toEqual([
                "FETCH_ACCOMMODATIONS_REQUEST",
                "SET_SNACK_MSG",
                "FETCH_ACCOMMODATIONS_FAILURE"
            ]);
        });

        it("onAccommodationDetailClicked", async () => {
            const { store, fn } = prepare("onAccommodationDetailClicked", mainReducer(undefined, {}));
            await fn();
            expect(store.getActions().map(a => a.type)).toEqual([
                "SET_CURRENT_ACCOMMODATION"
            ]);
        });

        it("onShowListClicked", async () => {
            const { store, fn } = prepare("onShowListClicked", mainReducer(undefined, {}));
            await fn();
            expect(store.getActions().map(a => a.type)).toEqual([
                "SHOW_LIST"
            ]);
        });

        it("onSaveAccommodationClicked", async () => {
            const { store, fn } = prepare("onSaveAccommodationClicked", mainReducer(undefined, {}));
            await fn();
            expect(store.getActions().map(a => a.type)).toEqual([
                "FETCH_ACCOMMODATION_REQUEST",
                "SET_SNACK_MSG",
                "FETCH_ACCOMMODATION_SUCCESS",
                "FETCH_ACCOMMODATIONS_REQUEST",
                "FETCH_ACCOMMODATIONS_SUCCESS"
            ]);
        });

        it("onDeleteAccommodationClicked", async () => {
            const { store, fn } = prepare("onDeleteAccommodationClicked", mainReducer(undefined, {}));
            await fn();
            expect(store.getActions().map(a => a.type)).toEqual([
                "DELETE_ACCOMMODATION_REQUEST",
                "DELETE_ACCOMMODATION_SUCCESS",
                "FETCH_ACCOMMODATIONS_REQUEST",
                "SHOW_LIST",
                "FETCH_ACCOMMODATIONS_SUCCESS"
            ]);
        });

        it("onInit", async () => {
            global.localStorage = {
                getItem: jest.fn()
            };
            const { store, fn } = prepare("onInit", mainReducer(undefined, {}));
            await fn();
            expect(store.getActions().map(a => a.type)).toEqual([]);
        });
    });
    describe("mapStateToProps", () => {
        it("dispatch accomodation specific state", () => {
            const state = { idchibar: "ohmyagad" };
            expect(mapStateToProps(state)).toEqual(state);
        });
    });
});
