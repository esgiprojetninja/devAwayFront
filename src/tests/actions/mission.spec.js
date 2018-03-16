/* eslint-env jest */
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
    mockAPI,
    mockAPIWithErrors
} from "../mock/API";

import * as missionTypes from "../../actions/types/mission";
import * as missionActions from "../../actions/mission";

const mockStore = configureMockStore([thunk.withExtraArgument(mockAPI)]);

describe("Actions mission", () => {
    it("should fetch missions", () => {
        const expectedActions = [
            { type: missionTypes.FETCH_MISSIONS_REQUEST },
            { type: missionTypes.FETCH_MISSIONS_SUCCESS, payload: [] }
        ];
        const store = mockStore();
        return store.dispatch(missionActions.fetchMissions()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("should fetch missions (error)", () => {
        const expectedActions = [
            { type: missionTypes.FETCH_MISSIONS_REQUEST },
            { type: missionTypes.FETCH_MISSIONS_FAILURE, payload: "Ooops" }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)])();
        return storeError.dispatch(missionActions.fetchMissions()).then(() => {
            expect(storeError.getActions()).toEqual(expectedActions);
        });
    });

    it("should savestoreError a mission", () => {
        const expectedActions = [
            { type: missionTypes.SAVE_MISSION_REQUEST },
            { type: missionTypes.SAVE_MISSION_SUCCESS }
        ];
        const store = mockStore({
            mission: {
                current: {}
            }
        });
        return store.dispatch(missionActions.saveMission()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("should save a mission (error)", () => {
        const expectedActions = [
            { type: missionTypes.SAVE_MISSION_REQUEST },
            { type: missionTypes.SAVE_MISSION_FAILURE, payload: "Won't save" }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)])({
            mission: {
                current: {}
            }
        });
        return storeError.dispatch(missionActions.saveMission()).then(() => {
            expect(storeError.getActions()).toEqual(expectedActions);
        });
    });

    it("should delete a mission", () => {
        const expectedActions = [
            { type: missionTypes.DELETE_MISSION_REQUEST },
            { type: missionTypes.DELETE_MISSION_SUCCESS },
            { type: missionTypes.FETCH_MISSIONS_REQUEST },
            { type: missionTypes.FETCH_MISSIONS_SUCCESS, payload: [] }
        ];
        const store = mockStore();
        return store.dispatch(missionActions.deleteMission(1000)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("should delete a mission (error)", () => {
        const expectedActions = [
            { type: missionTypes.DELETE_MISSION_REQUEST },
            { type: missionTypes.DELETE_MISSION_FAILURE, payload: "Couldn't delete" }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)])({
            mission: {
                current: {}
            }
        });
        return storeError.dispatch(missionActions.deleteMission(1000)).then(() => {
            expect(storeError.getActions()).toEqual(expectedActions);
        });
    });
});
