/* eslint-env jest */
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
    mockAPI,
    mockAPIWithErrors
} from "../mock/API";

import {
    FETCH_MISSIONS_REQUEST,
    FETCH_MISSIONS_SUCCESS,
    FETCH_MISSIONS_FAILURE,
    fetchMissions,
    SAVE_MISSION_REQUEST,
    SAVE_MISSION_SUCCESS,
    SAVE_MISSION_FAILURE,
    saveMission,
    DELETE_MISSION_REQUEST,
    DELETE_MISSION_SUCCESS,
    DELETE_MISSION_FAILURE,
    deleteMission
} from "../../actions/mission";

const mockStore = configureMockStore([thunk.withExtraArgument(mockAPI)]);

describe("Actions mission", () => {
    it("should fetch missions", () => {
        const expectedActions = [
            { type: FETCH_MISSIONS_REQUEST },
            { type: FETCH_MISSIONS_SUCCESS, payload: [] }
        ];
        const store = mockStore();
        return store.dispatch(fetchMissions()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("should fetch missions (error)", () => {
        const expectedActions = [
            { type: FETCH_MISSIONS_REQUEST },
            { type: FETCH_MISSIONS_FAILURE, payload: "Ooops" }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)])();
        return storeError.dispatch(fetchMissions()).then(() => {
            expect(storeError.getActions()).toEqual(expectedActions);
        });
    });

    it("should savestoreError a mission", () => {
        const expectedActions = [
            { type: SAVE_MISSION_REQUEST },
            { type: SAVE_MISSION_SUCCESS }
        ];
        const store = mockStore({
            mission: {
                current: {}
            }
        });
        return store.dispatch(saveMission()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("should save a mission (error)", () => {
        const expectedActions = [
            { type: SAVE_MISSION_REQUEST },
            { type: SAVE_MISSION_FAILURE, payload: "Won't save" }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)])({
            mission: {
                current: {}
            }
        });
        return storeError.dispatch(saveMission()).then(() => {
            expect(storeError.getActions()).toEqual(expectedActions);
        });
    });

    it("should delete a mission", () => {
        const expectedActions = [
            { type: DELETE_MISSION_REQUEST },
            { type: DELETE_MISSION_SUCCESS },
            { type: FETCH_MISSIONS_REQUEST },
            { type: FETCH_MISSIONS_SUCCESS, payload: [] }
        ];
        const store = mockStore();
        return store.dispatch(deleteMission(1000)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("should delete a mission (error)", () => {
        const expectedActions = [
            { type: DELETE_MISSION_REQUEST },
            { type: DELETE_MISSION_FAILURE, payload: "Couldn't delete" }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)])({
            mission: {
                current: {}
            }
        });
        return storeError.dispatch(deleteMission(1000)).then(() => {
            expect(storeError.getActions()).toEqual(expectedActions);
        });
    });
});
