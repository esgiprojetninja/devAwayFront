/* eslint-env jest */
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
    mockAPI,
    mockAPIWithErrors,
    mockAPIWithServerFailure
} from "../mock/API";

import { SET_SNACK_MSG } from "../../actions/types/snack";
import * as missionTypes from "../../actions/types/mission";
import * as missionActions from "../../actions/mission";

describe("Actions mission", () => {
    let mockStore = null;

    beforeEach(() => {
        mockStore = configureMockStore([thunk.withExtraArgument(mockAPI)]);
    });

    it("should fetch missions", async () => {
        const expectedActions = [
            { type: missionTypes.FETCH_MISSIONS_REQUEST },
            { type: missionTypes.FETCH_MISSIONS_SUCCESS, payload: [] }
        ];
        const store = mockStore();
        await store.dispatch(missionActions.fetchMissions());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should fetch missions - API error", async () => {
        const expectedActions = [
            { type: missionTypes.FETCH_MISSIONS_REQUEST },
            { type: missionTypes.FETCH_MISSIONS_FAILURE, payload: "Ooops" }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)])();
        await storeError.dispatch(missionActions.fetchMissions());
        expect(storeError.getActions()).toEqual(expectedActions);
    });

    it("should fetch missions - Server failure", async () => {
        const expectedActions = [
            { type: missionTypes.FETCH_MISSIONS_REQUEST },
            {
                type: missionTypes.FETCH_MISSIONS_FAILURE,
                payload: new Error("gtfo")
            }
        ];
        mockStore = configureMockStore([thunk.withExtraArgument(mockAPIWithServerFailure)]);
        const storeError = mockStore();
        await storeError.dispatch(missionActions.fetchMissions());
        expect(storeError.getActions()).toEqual(expectedActions);
    });

    it("should save a mission", async () => {
        const expectedActions = [
            { type: missionTypes.SAVE_MISSION_REQUEST },
            {
                type: SET_SNACK_MSG,
                payload: {
                    msg: "Mission created",
                    snackDuration: undefined
                },
            },
            {
                type: missionTypes.SAVE_MISSION_SUCCESS,
                payload: {
                    mission: {
                        id: 123,
                        title: "poulay mission"
                    }
                },
            }
        ];
        const store = mockStore({
            mission: {
                current: {}
            }
        });
        await store.dispatch(missionActions.saveMission());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should save a mission - API error", async () => {
        const expectedActions = [
            { type: missionTypes.SAVE_MISSION_REQUEST },
            {
                type: SET_SNACK_MSG,
                payload: { msg: "Failed to create mission" }
            },
            { type: missionTypes.SAVE_MISSION_FAILURE, payload: "Won't save" }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)])({
            mission: {
                current: {}
            }
        });
        await storeError.dispatch(missionActions.saveMission());
        expect(storeError.getActions()).toEqual(expectedActions);
    });

    it("should save a mission - Server failure", async () => {
        const expectedActions = [
            { type: missionTypes.SAVE_MISSION_REQUEST },
            {
                type: SET_SNACK_MSG,
                payload: { msg: "Failed to create mission" }
            },
            {
                type: missionTypes.SAVE_MISSION_FAILURE,
                payload: new Error("gtfo")
            },
        ];
        mockStore = configureMockStore([thunk.withExtraArgument(mockAPIWithServerFailure)]);
        const storeError = mockStore({
            mission: {
                current: {}
            }
        });
        await storeError.dispatch(missionActions.saveMission());
        expect(storeError.getActions()).toEqual(expectedActions);
    });

    it("should delete a mission", async () => {
        const expectedActions = [
            { type: missionTypes.DELETE_MISSION_REQUEST },
            { type: missionTypes.DELETE_MISSION_SUCCESS },
            { type: missionTypes.FETCH_MISSIONS_REQUEST },
            { type: missionTypes.FETCH_MISSIONS_SUCCESS, payload: [] }
        ];
        const store = mockStore();
        await store.dispatch(missionActions.deleteMission(1000));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should delete a mission - API error", async () => {
        const expectedActions = [
            { type: missionTypes.DELETE_MISSION_REQUEST },
            { type: missionTypes.DELETE_MISSION_FAILURE, payload: "Couldn't delete" }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)])({
            mission: {
                current: {}
            }
        });
        await storeError.dispatch(missionActions.deleteMission(1000));
        expect(storeError.getActions()).toEqual(expectedActions);
    });

    it("should delete a mission - Server failure", async () => {
        const expectedActions = [
            { type: missionTypes.DELETE_MISSION_REQUEST },
            {
                type: missionTypes.DELETE_MISSION_FAILURE,
                payload: new Error("gtfo")
            }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithServerFailure)])({
            mission: {
                current: {}
            }
        });
        await storeError.dispatch(missionActions.deleteMission(1000));
        expect(storeError.getActions()).toEqual(expectedActions);
    });
});
