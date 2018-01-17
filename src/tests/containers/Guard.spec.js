/* eslint-env jest */
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import { mockAPI } from "../mock/API";

import mainReducer from "../../reducers/index";
import {
    mapStateToProps,
    mapDispatchToProps
} from "../../containers/Guard";

const mockStore = configureMockStore([thunk.withExtraArgument(mockAPI)]);

function prepare(name, state) {
    const store = mockStore(state);
    return {
        store,
        // wrap in a promise to handle everything in the same way
        fn: (...args) =>
            Promise.resolve(mapDispatchToProps(store.dispatch)[name](...args))
    };
}

describe("Container Guard", () => {
    describe("mapDispatchToProps", () => {
        it("onCredentialChange", () => {
            const { store, fn } = prepare("onCredentialChange", mainReducer(undefined, {}));
            fn().then(() => {
                expect(store.getActions().map(a => a.type)).toEqual([
                    "UPDATE_CREDENTIALS"
                ]);
            });
        });

        it("onFormSubmit", () => {
            const { store, fn } = prepare("onFormSubmit", mainReducer(undefined, {}));
            fn().then(() => {
                expect(store.getActions().map(a => a.type)).toEqual([
                    "CHECK_GUARD_REQUEST",
                    "CHECK_GUARD_SUCCESS"
                ]);
            });
        });
    });

    describe("mapStateToProps", () => {
        it("mapStateToProps", () => {
            expect(mapStateToProps({
                guard: {
                    some: "reducer"
                }
            })).toEqual({
                some: "reducer"
            });
        });
    });
});
