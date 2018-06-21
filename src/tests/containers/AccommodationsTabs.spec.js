/* eslint-env jest */
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import {
    mockAPI
} from "../mock/API";

import {
    mapStateToProps,
    mapDispatchToProps
} from "../../containers/AccommodationsTabs";

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

describe("Container AccommodationsTabs", () => {
    describe("mapDispatchToProps", async () => {
        const { fn } = prepare("toto");
        const res = await fn();
        expect(res).toEqual("poulay");
    });
    describe("mapStateToProps", () => {
        it("dispatch user state", () => {
            expect(mapStateToProps({ user: "chibar" })).toEqual({ user: "chibar" });
        });
    });
});
