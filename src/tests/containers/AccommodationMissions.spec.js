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
} from "../../containers/AccommodationMissions";

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

describe("Container AccommodationMissions", () => {
    describe("mapDispatchToProps", () => {
        it("updateAcco", async () => {
            const { store, fn } = prepare("updateAcco", mainReducer(undefined, {}));
            await fn({
                title: "title",
                description: "description",
                city: "city",
                region: "region",
                country: "country",
                address: "address",
            });
            const storeActions = await store.getActions();
            expect(storeActions.map(a => a.type)).toEqual([
                "SAVE_ACCOMMODATION_REQUEST",
                "SET_SNACK_MSG",
                "SAVE_ACCOMMODATION_SUCCESS",
            ]);
        });
    });
    describe("mapStateToProps", () => {
        it("dispatch accomodation specific state", () => {
            expect(mapStateToProps("lucettobmal")).toEqual("lucettobmal");
        });
    });
});
