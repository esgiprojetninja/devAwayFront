/* global */
import * as missionTypes from "./types/mission";
import { displaySnackMsg } from "./snack";

const fetchMissionsRequest = () => ({
    type: missionTypes.FETCH_MISSIONS_REQUEST
});

const fetchMissionsSuccess = payload => ({
    type: missionTypes.FETCH_MISSIONS_SUCCESS,
    payload
});

const fetchMissionsFailure = payload => ({
    type: missionTypes.FETCH_MISSIONS_FAILURE,
    payload
});

export const fetchMissions = () =>
    (dispatch, getState, API) => {
        dispatch(fetchMissionsRequest());
        return API.missionApi.fetchAll()
            .then(
                (res) => {
                    if (res.hasError) {
                        return dispatch(fetchMissionsFailure(res.message));
                    }
                    return dispatch(fetchMissionsSuccess(res));
                },
                error => dispatch(fetchMissionsFailure(error))
            );
    };

const saveMissionRequest = () => ({
    type: missionTypes.SAVE_MISSION_REQUEST
});

const saveMissionSuccess = mission => ({
    type: missionTypes.SAVE_MISSION_SUCCESS,
    payload: { mission },
});

const saveMissionFailure = payload => ({
    type: missionTypes.SAVE_MISSION_FAILURE,
    payload
});

export const saveMission = newMission =>
    async (dispatch, getState, API) => {
        const mission = newMission || getState().mission.current.data;
        dispatch(saveMissionRequest());
        const verb = mission && mission.id ? "update" : "create";
        try {
            const res = await API.missionApi.createOrUpdate(mission);
            if (res.hasError || !res.id || !res.title) {
                dispatch(displaySnackMsg(`Failed to ${verb} mission`));
                return dispatch(saveMissionFailure(res.message));
            }
            dispatch(displaySnackMsg(`Mission ${verb}d`));
            return dispatch(saveMissionSuccess(res));
        } catch (error) {
            dispatch(displaySnackMsg(`Failed to ${verb} mission`));
            return dispatch(saveMissionFailure(error));
        }
    };

const deleteMissionRequest = () => ({
    type: missionTypes.DELETE_MISSION_REQUEST
});

const deleteMissionSuccess = () => ({
    type: missionTypes.DELETE_MISSION_SUCCESS
});

const deleteMissionFailure = payload => ({
    type: missionTypes.DELETE_MISSION_FAILURE,
    payload
});

export const deleteMission = id =>
    (dispatch, getState, API) => {
        dispatch(deleteMissionRequest());
        return API.missionApi.deleteItem(id).then((res) => {
            if (res.hasError) {
                return dispatch(deleteMissionFailure(res.message));
            }
            dispatch(deleteMissionSuccess());
            return dispatch(fetchMissions());
        }, err => dispatch(deleteMissionFailure(err)));
    };

export const changeCurrentMission = mission => ({
    type: missionTypes.EDIT_CURRENT_MISSION,
    payload: { mission },
});

const fetchMissionRequest = () => ({
    type: missionTypes.FETCH_MISSION_REQUEST
});

const fetchMissionSuccess = mission => ({
    type: missionTypes.FETCH_MISSION_SUCCESS,
    payload: { mission }
});

const fetchMissionFailure = msg => ({
    type: missionTypes.FETCH_MISSION_FAILURE,
    payload: { msg }
});

export const fetchMission = id =>
    async (dispatch, getState, API) => {
        dispatch(fetchMissionRequest());
        try {
            const res = await API.missionApi.fetchById(id);
            if (res.hasError) {
                dispatch(displaySnackMsg("Failed to retrieve mission"));
                return dispatch(fetchMissionFailure(res.message));
            }
            return dispatch(fetchMissionSuccess(res));
        } catch (error) {
            dispatch(displaySnackMsg("Failed to retrieve mission"));
            return dispatch(fetchMissionFailure(error.message));
        }
    };
