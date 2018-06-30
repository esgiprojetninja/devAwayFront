/* eslint-env jest */
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import {
    mockAPI,
} from "../mock/API";
import { accommodationMock } from "../mock/body/accommodation";
import mainReducer from "../../reducers/index";
import {
    mapStateToProps,
    mapDispatchToProps
} from "../../containers/AccommodationDetailMap";

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

describe("Container AccommodationDetailMap", () => {
    describe("mapDispatchToProps", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it("updateAcco", async () => {
            const { store, fn } = prepare("updateAcco", mainReducer(undefined, {}));
            await fn(accommodationMock);
            expect(store.getActions().map(a => a.type)).toEqual(["SAVE_ACCOMMODATION_REQUEST", "SET_SNACK_MSG", "SAVE_ACCOMMODATION_SUCCESS", "FETCH_ACCOMMODATIONS_REQUEST", "FETCH_ACCOMMODATIONS_SUCCESS"]);
        });
        it("extractAddressFromPlace", async () => {
            const { fn } = prepare("extractAddressFromPlace", mainReducer(undefined, {}));
            const res = await fn({
                formatted_address: "complete address mofoz",
                geometry: {
                    location: {
                        lat: () => 44,
                        lng: () => 40,
                    }
                },
                address_components: [
                    {
                        long_name: "TheCountry",
                        types: ["country"]
                    },
                    {
                        long_name: "TheCity",
                        types: ["locality"]
                    },
                    {
                        long_name: "regionMofo",
                        types: ["uhnuh"]
                    },
                ]
            });
            expect(res).toEqual({
                address: "complete address mofoz",
                latitude: 44,
                longitude: 40,
                country: "TheCountry",
                city: "TheCity",
                region: null,
            });
        });
    });
    describe("mapStateToProps", () => {
        it("dispatch accomodation specific state", () => {
            const state = { idchibar: "ohmyagad" };
            expect(mapStateToProps(state)).toEqual(state);
        });
    });
});
