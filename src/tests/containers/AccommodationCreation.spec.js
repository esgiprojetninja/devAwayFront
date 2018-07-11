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
} from "../../containers/AccommodationCreation";

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

describe("Container AccommodationCreation", () => {
    describe("mapDispatchToProps", () => {
        it("saveAccommodation", async () => {
            const { store, fn } = prepare("saveAccommodation", mainReducer(undefined, {}));
            await fn({
                title: "",
                description: "",
                city: "",
                region: "",
                country: "",
                address: "",
                checkinHour: "",
                checkoutHour: "",
                createdAt: "",
                host: ""
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
