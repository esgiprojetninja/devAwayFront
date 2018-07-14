/* eslint-env jest */
/* global */
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import {
    mockAPI
} from "../../mock/API";

import mainReducer from "../../../reducers/index";
import {
    mapStateToProps,
    mapDispatchToProps
} from "../../../containers/Mission/MissionCreation";
import { getRules } from "../../../utils/mission";

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

describe("Container MissionCreation", () => {
    describe("mapDispatchToProps", () => {
        it("saveMission", async () => {
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
            const { accoArr, rules } = getRules({
                351: { title: "poulay mission", description: "poulaying the description " }
            });
            expect(mapStateToProps({
                user: {
                    accommodations: { 351: { title: "poulay mission", description: "poulaying the description " } }
                }
            })).toEqual({
                user: {
                    accommodations: {
                        351: { title: "poulay mission", description: "poulaying the description " }
                    },
                    accommodationsArr: accoArr
                },
                formRules: rules,
            });
        });
    });
});
