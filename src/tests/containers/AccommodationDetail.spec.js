/* eslint-env jest */
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import {
    mockAPI
} from "../mock/API";

import mainReducer from "../../reducers/index";
import {
    mapStateToProps,
    mapDispatchToProps
} from "../../containers/AccommodationDetail";

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

describe("Container AccommodationDetail", () => {
    describe("mapDispatchToProps", () => {
        it("onInit", async () => {
            const { store, fn } = prepare("onInit", mainReducer(undefined, {}));
            await fn();
            expect(store.getActions().map(a => a.type)).toEqual(["FETCH_ACCOMMODATIONS_REQUEST", "FETCH_ACCOMMODATION_SUCCESS"]);
        });
        it("applyToMission", async () => {
            const { store, fn } = prepare("applyToMission", mainReducer(undefined, {}));
            await fn("coucou", { id: "coucou" });
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
