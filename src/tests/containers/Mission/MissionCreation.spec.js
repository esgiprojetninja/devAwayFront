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
            expect(mapStateToProps({
                user: {
                    accommodations: { 351: { title: "poulay mission", description: "poulaying the description " } }
                }
            })).toEqual({
                user: {
                    accommodations: {
                        351: { title: "poulay mission", description: "poulaying the description " }
                    },
                    accommodationsArr: [{
                        label: "poulay mission", id: 351
                    }]
                },
                formRules: {
                    title: { min: 6, max: 24 },
                    description: { min: 6, max: 255 },
                    checkinDate: { min: "poulaymoment", isDate: true },
                    stayTime: { min: 1, max: (1000 * 60 * 60 * 24 * 365 * 10) }, // max 10 years
                    stayTimeUnit: {
                        values: [
                            { label: "hours", value: 0 },
                            { label: "days", value: 1 },
                            { label: "weeks", value: 2 },
                            { label: "months", value: 3 },
                        ],
                        isSelect: true
                    },
                    accommodation_id: {
                        values: [{
                            label: "poulay mission", id: 351
                        }].map(acco => ({
                            ...acco,
                            value: acco.id
                        })),
                        isSelect: true,
                    },
                },
            });
        });
    });
});
