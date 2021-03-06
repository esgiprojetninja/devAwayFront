/* eslint-env jest */
/* global */
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { getRules } from "../../../utils/mission";

import {
    mockAPI
} from "../../mock/API";

import mainReducer from "../../../reducers/index";
import {
    mapStateToProps,
    mapDispatchToProps
} from "../../../containers/Mission/MissionEdition";

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

describe("Container MissionEdition", () => {
    describe("mapDispatchToProps", () => {
        beforeEach(() => {
            global.setTimeout = r => r();
            global.clearInterval = jest.fn();
            global.setInterval = (func) => {
                func(9999);
            };
        });
        it("onInit without delay - user logged in", async () => {
            mapStateToProps({
                user: {
                    accommodations: {},
                    isLoggedIn: true,
                    isGettingData: false,
                    isLoading: false,
                }
            });
            const { store, fn } = prepare("onInit", mainReducer(undefined, {}));
            await fn(123);
            const storeActions = await store.getActions();
            expect(storeActions.map(a => a.type)).toEqual([
                "FETCH_MISSION_REQUEST", "FETCH_MISSION_SUCCESS"
            ]);
        });
        it("onInit with delay - user loggin in", async () => {
            mapStateToProps({
                user: {
                    accommodations: {},
                    isLoggedIn: false,
                    isGettingData: true,
                    isLoading: true,
                }
            });
            const { store, fn } = prepare("onInit", mainReducer(undefined, {}));
            await fn(123);
            const storeActions = await store.getActions();
            expect(storeActions.map(a => a.type)).toEqual([
                "FETCH_MISSION_REQUEST", "FETCH_MISSION_SUCCESS"
            ]);
        });
        it("onInit with delay - user logged in in the mean time", async () => {
            mapStateToProps({
                user: {
                    accommodations: {},
                    isLoggedIn: false,
                    isGettingData: true,
                    isLoading: true,
                }
            });
            const { store, fn } = prepare("onInit", mainReducer(undefined, {}));
            global.setInterval = (func) => {
                mapStateToProps({
                    user: {
                        accommodations: {},
                        isLoggedIn: true,
                        isGettingData: false,
                        isLoading: false,
                    }
                });
                func();
            };
            await fn(123);
            const storeActions = await store.getActions();
            expect(storeActions.map(a => a.type)).toEqual([
                "FETCH_MISSION_REQUEST", "FETCH_MISSION_SUCCESS"
            ]);
        });
        it("saveMission", async () => {
            mapStateToProps({
                user: {
                    accommodations: {},
                    isLoggedIn: true,
                    isGettingData: false,
                    isLoading: false,
                }
            });
            const { store, fn } = prepare("saveMission", mainReducer(undefined, {}));
            await fn({
                title: "",
                description: "",
            });
            const storeActions = await store.getActions();
            expect(storeActions.map(a => a.type)).toEqual([
                "SAVE_MISSION_REQUEST", "SET_SNACK_MSG", "SAVE_MISSION_SUCCESS"
            ]);
        });
        it("changeCurrent", async () => {
            mapStateToProps({
                user: {
                    accommodations: {},
                    isLoggedIn: true,
                    isGettingData: false,
                    isLoading: false,
                }
            });
            const { store, fn } = prepare("changeCurrent", mainReducer(undefined, {}));
            await fn({
                title: "8778 erf",
                description: "ef efze",
            });
            const storeActions = await store.getActions();
            expect(storeActions.map(a => a.type)).toEqual([
                "EDIT_CURRENT_MISSION"
            ]);
        });
    });
    describe("mapStateToProps", () => {
        beforeEach(() => {
            global.jestmoment = () => ({
                local: () => ({
                    add: () => "poulaymoment"
                })
            });
        });
        it("dispatch accomodation specific state", () => {
            const { accoArr, rules } = getRules({});
            expect(mapStateToProps({
                user: {
                    accommodations: {},
                }
            })).toEqual({
                user: {
                    accommodations: {},
                    accommodationsArr: accoArr,
                },
                formRules: rules
            });
        });
    });
});
