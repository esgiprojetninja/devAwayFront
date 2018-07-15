/* eslint-env jest */
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import {
    mockAPI,
    mockAPIWithErrors,
} from "../mock/API";
import mainReducer from "../../reducers/index";
import {
    mapStateToProps,
    mapDispatchToProps
} from "../../containers/AccommodationDetail";

const mockStore = configureMockStore([thunk.withExtraArgument(mockAPI)]);

const prepare = (name, state, mockStr = mockStore) => {
    const store = mockStr(state);
    return {
        store,
        // wrap in a promise to handle everything in the same way
        fn: (...args) =>
            Promise.resolve(mapDispatchToProps(store.dispatch)[name](...args))
    };
};

describe("Container AccommodationDetail", () => {
    describe("mapDispatchToProps", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it("onInit - fetch success", async () => {
            const { store, fn } = prepare("onInit", mainReducer(undefined, {}));
            const res = await fn();
            expect(store.getActions().map(a => a.type)).toEqual(["FETCH_ACCOMMODATIONS_REQUEST", "FETCH_ACCOMMODATION_SUCCESS"]);
            expect(res).toBe(true);
        });
        it("onInit - fetch response error", async () => {
            const errorStore = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)]);
            const { store, fn } = prepare("onInit", mainReducer(undefined, {}), errorStore);
            const res = await fn();
            expect(store.getActions().map(a => a.type)).toEqual(["FETCH_ACCOMMODATIONS_REQUEST", "SET_SNACK_MSG", "FETCH_ACCOMMODATIONS_FAILURE"]);
            expect(res).toBe(false);
        });
        it("onInit - fetch server error", async () => {
            const errorStore = configureMockStore(
                [thunk.withExtraArgument({
                    accommodationApi: {
                        fetchById() { throw new Error("POULAY"); }
                    }
                })]
            );
            const { store, fn } = prepare("onInit", mainReducer(undefined, {}), errorStore);
            const res = await fn();
            expect(store.getActions().map(a => a.type)).toEqual(["FETCH_ACCOMMODATIONS_REQUEST", "FETCH_ACCOMMODATIONS_FAILURE"]);
            expect(res).toBe(false);
        });
    });
    describe("mapStateToProps", () => {
        it("dispatch accomodation specific state", () => {
            const state = { idchibar: "ohmyagad" };
            expect(mapStateToProps(state)).toEqual(state);
        });
    });
});
