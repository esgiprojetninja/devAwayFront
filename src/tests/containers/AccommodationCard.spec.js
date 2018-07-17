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
} from "../../containers/AccommodationCard";

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

describe("Container AccommodationCard", () => {
    describe("mapDispatchToProps", () => {
        it("onInit", async () => {
            const { store, fn } = prepare("onInit", mainReducer(undefined, {}));
            await fn();
            expect(store.getActions().map(a => a.type)).toEqual([
                "FETCH_ACCOMMODATIONS_REQUEST",
                "FETCH_ACCOMMODATIONS_SUCCESS"
            ]);
        });
    });
    describe("mapStateToProps", () => {
        it("dispatch accomodation specific state", () => {
            const fakeAcco = { id: 123, updated_at: "2018-12-12 01:01:01" };
            const accommodation = {
                isLoading: false,
                current: "chibar",
                hasError: false,
                errorText: "chibar",
                data: [123],
                byID: new Map()
                    .set(123, fakeAcco),
                search: {
                    all: []
                }
            };
            expect(mapStateToProps({ accommodation })).toEqual({
                accommodation,
                accoArr: [fakeAcco]
            });
        });
    });
});
