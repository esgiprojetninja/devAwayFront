/* eslint-env jest */
/* global window */
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import {
    mockAPI,
    mockAPIWithErrors
} from "../mock/API";

import mainReducer from "../../reducers/index";
import {
    mapStateToProps,
    mapDispatchToProps
} from "../../containers/Profile";

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

const mockErrorStore = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)]);

const prepareWithError = (name, state) => {
    const store = mockErrorStore(state);
    return {
        store,
        // wrap in a promise to handle everything in the same way
        fn: (...args) =>
            Promise.resolve(mapDispatchToProps(store.dispatch)[name](...args))
    };
};

describe("Container Profile", () => {
    describe("mapDispatchToProps", () => {
        beforeEach(() => {
            jest.clearAllMocks();
            window.localStorage = {
                removeItem: jest.fn(),
                getItem: jest.fn(),
                setItem: jest.fn()
            };
            global.localStorage = {
                removeItem: jest.fn(),
                getItem: jest.fn(),
                setItem: jest.fn()
            };
        });
        it("onGetMe", () => {
            const { store, fn } = prepare("onGetMe", mainReducer(undefined, {}));
            fn().then(() => {
                expect(store.getActions().map(a => a.type)).toEqual([
                    "GET_ME_REQUEST",
                    "GET_ME_SUCCESS"
                ]);
            });
        });

        it("onGetMe (error)", () => {
            const { store, fn } = prepareWithError("onGetMe", mainReducer(undefined, {}));
            fn().then(() => {
                expect(store.getActions().map(a => a.type)).toEqual([
                    "GET_ME_REQUEST",
                    "GET_ME_FAILURE"
                ]);
            });
        });

        it("onProfileChanged", () => {
            const { store, fn } = prepare("onProfileChanged", mainReducer(undefined, {}));
            fn().then(() => {
                expect(store.getActions().map(a => a.type)).toEqual([]);
            });
        });
    });
    describe("mapStateToProps", () => {
        it("only dispatch profile state", () => {
            expect(mapStateToProps(
                {
                    profile: "coucou"
                }
            )).toEqual("coucou");
        });
    });
});
