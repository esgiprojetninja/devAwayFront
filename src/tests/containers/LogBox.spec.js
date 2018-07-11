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
} from "../../containers/LogBox";

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

describe("Container LogBox", () => {
    describe("mapDispatchToProps", () => {
        it("onSubmit", async () => {
            global.localStorage = {
                removeItem: jest.fn(),
                setItem: jest.fn()
            };
            const { store, fn } = prepare("onSubmit");
            await fn({ userName: "jardin", password: "tomate" });
            const storeActions = await store.getActions();
            expect(storeActions.map(a => a.type)).toEqual([
                "LOGIN_REQUEST",
                "LOGIN_SUCCESS",
                "USER_GET_ME_REQUEST",
                "SET_SNACK_MSG",
                "LOGIN_SUCCESS",
                "USER_REQUEST",
            ]);
        });

        it("onLogoutClicked", async () => {
            global.localStorage = {
                removeItem: jest.fn(),
                setItem: jest.fn()
            };
            const { store, fn } = prepare("onLogoutClicked", mainReducer(undefined, {}));
            await fn();
            const storeActions = await store.getActions();
            expect(storeActions.map(a => a.type)).toEqual(["LOGOUT"]);
        });
    });
    describe("mapStateToProps", () => {
        it("dispatch user state", () => {
            global.localStorage = {
                removeItem: jest.fn(),
                setItem: jest.fn()
            };
            expect(mapStateToProps({ user: "chibar" })).toEqual("chibar");
        });
    });
});
