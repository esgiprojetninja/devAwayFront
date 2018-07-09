/* eslint-env jest */
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import {
    mockAPI
} from "../mock/API";

import {
    mapStateToProps,
    mapDispatchToProps
} from "../../containers/SubscribeBox";

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

describe("Container SubscribeBox", () => {
    describe("mapDispatchToProps", () => {
        it("onSubmit", async () => {
            const { store, fn } = prepare("onSubmit");
            await fn({
                userName: "jardin",
                password: "tomate",
                passwordCheck: "tomate"
            });
            const storeActions = await store.getActions();
            expect(storeActions.map(a => a.type)).toEqual([
                "USER_REQUEST",
                "SET_SNACK_MSG",
                "ADD_USER_SUCCESS"
            ]);
        });
    });
    describe("mapStateToProps", () => {
        it("dispatch user state", () => {
            expect(mapStateToProps({ user: "chibar" })).toEqual("chibar");
        });
    });
});
