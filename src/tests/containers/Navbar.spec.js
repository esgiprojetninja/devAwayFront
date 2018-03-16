/* eslint-env jest */
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import {
    mockAPI
} from "../mock/API";

import {
    mapStateToProps,
    mapDispatchToProps
} from "../../containers/Navbar";

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

describe("Container Navbar", () => {
    describe("mapDispatchToProps", () => {
        it("gtfo", async () => {
            const { store, fn } = prepare("gtfo");
            await fn();
            const storeActions = await store.getActions();
            expect(storeActions.map(a => a.type)).toEqual([]);
        });
    });
    describe("mapStateToProps", () => {
        it("dispatch whole state", () => {
            expect(mapStateToProps("chibar")).toEqual("chibar");
        });
    });
});
