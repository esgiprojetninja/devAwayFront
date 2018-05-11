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
} from "../../containers/Home";

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

describe("Container Home", () => {
    describe("mapDispatchToProps", () => {
        it("closeSnack", async () => {
            const { store, fn } = prepare("closeSnack", mainReducer(undefined, {}));
            await fn();
            expect(store.getActions().map(a => a.type)).toEqual(["RM_SNACK_MSG"]);
        });
    });
    describe("mapStateToProps", () => {
        it("dispatch whole state", () => {
            expect(mapStateToProps("chibar")).toEqual("chibar");
        });
    });
});
