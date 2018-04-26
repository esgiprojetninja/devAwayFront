/* eslint-env jest */
/* global window */
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import {
    mockAPI
} from "../mock/API";

import {
    mapStateToProps,
    mapDispatchToProps,
    navbarKeyStoragePrefix
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
    window.localStorage = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("mapDispatchToProps", () => {
        it("getSavedState", async () => {
            const { store, fn } = prepare("getSavedState");
            const storedState = await fn({ open: 1, chibawde: "ohmygad" });
            const storeActions = await store.getActions();
            expect(storeActions.map(a => a.type)).toEqual([]);
            expect(storedState).toEqual({ open: 1, chibawde: "ohmygad" });
        });

        it("storeStateProp", async () => {
            const { store, fn } = prepare("storeStateProp");
            await fn("open", 1);
            const storeActions = await store.getActions();
            expect(storeActions.map(a => a.type)).toEqual([]);
            expect(window.localStorage.setItem).toHaveBeenCalledWith(`${navbarKeyStoragePrefix}open`, 1);
        });

        it("removeStateProp", async () => {
            const { store, fn } = prepare("removeStateProp");
            await fn("open");
            const storeActions = await store.getActions();
            expect(storeActions.map(a => a.type)).toEqual([]);
            expect(window.localStorage.removeItem).toHaveBeenCalledWith(`${navbarKeyStoragePrefix}open`);
        });
    });

    describe("mapStateToProps", () => {
        it("dispatch whole state", () => {
            expect(mapStateToProps("chibar")).toEqual("chibar");
        });
    });
});
