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
} from "../../containers/AccommodationDetailImages";
import * as accoActions from "../../actions/accommodation";


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

describe("Container AccommodationDetailImages", () => {
    describe("mapDispatchToProps", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it("updatePicture", async () => {
            const spy = jest.spyOn(accoActions, "upsertPicture");
            const { fn } = prepare("updatePicture", mainReducer(undefined, {}));
            await fn(accommodationMock, 1, "binaryimgmotherfuckeeeer");
            expect(spy).toHaveBeenCalled();
        });
    });
    describe("mapStateToProps", () => {
        it("dispatch accomodation specific state", () => {
            const state = { idchibar: "ohmyagad" };
            expect(mapStateToProps(state)).toEqual(state);
        });
    });
});
