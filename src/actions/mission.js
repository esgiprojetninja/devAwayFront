/* global */
import * as missionTypes from "./types/mission";
import { displaySnackMsg } from "./snack";
import user from "../utils/user";

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


export const updatePicture = pictureObj =>
    async (dispatch, getState, API) => {
        const verb = pictureObj.id ? "update" : "create";
        dispatch(fetchMissionRequest());
        try {
            const res = await API.missionApi.upsertPicture(pictureObj);
            if (res.hasError) {
                dispatch(displaySnackMsg(`Failed to ${verb} picture`));
                return dispatch(fetchMissionFailure(res.message));
            }
            dispatch(displaySnackMsg(`${verb.charAt(0).toUpperCase() + verb.slice(1)}d picture`));
            return dispatch(fetchMissionSuccess(res));
        } catch (error) {
            dispatch(displaySnackMsg(`Failed to ${verb} picture`));
            return dispatch(fetchMissionFailure(error.message));
        }
    };


const toggleMissionCandidacyRequest = missionId => ({
    type: missionTypes.TOGGLE_APPLY_MISSION_REQUEST,
    payload: { missionId }
});

const toggleMissionCandidacySuccess = (mission, replaceCurrent) => ({
    type: missionTypes.TOGGLE_APPLY_MISSION_SUCCESS,
    payload: { mission, replaceCurrent }
});

const toggleMissionCandidacyFail = msg => ({
    type: missionTypes.TOGGLE_APPLY_MISSION_FAILURE,
    payload: { msg }
});

export const toggleMissionCandidacy = (apply = true, missionId, data) =>
    async (dispatch, getState, API) => {
        const id = missionId || getState().mission.current.data.id;
        dispatch(toggleMissionCandidacyRequest(id));
        let verb = apply ? "add" : "cancel";
        try {
            const res = await API.missionApi[`${verb}Candidacy`](id, data);
            verb = verb.replace("cancel", "cancell");
            if (res.hasError) {
                dispatch(displaySnackMsg(`Your candidacy couldn't be ${verb}ed`));
                return dispatch(toggleMissionCandidacyFail(res.message));
            }
            const missionIsCurrent = res.id === getState().mission.current.data.id;
            dispatch(displaySnackMsg(`Your candidacy was ${verb}ed`));
            return dispatch(toggleMissionCandidacySuccess(res, missionIsCurrent));
        } catch (error) {
            verb = verb.replace("cancel", "cancell");
            dispatch(displaySnackMsg(`Your candidacy couldn't be ${verb}ed`));
            return dispatch(toggleMissionCandidacyFail(error.message));
        }
    };

export const acceptCandidate = (candidacy, accept = false) =>
    async (dispatch, getState, API) => {
        const mission = getState().mission.current.data;
        dispatch(toggleMissionCandidacyRequest(mission.id));
        let verb = accept ? "accept" : "refuse";
        try {
            const res = await API.missionApi[`${verb}Candidacy`](mission.id, candidacy.user.id);
            verb = `${verb}ed`.replace("ee", "e");
            if (res.hasError) {
                dispatch(displaySnackMsg(`The candidacy couldn't be ${verb}ed on ${mission.title}`));
                return dispatch(toggleMissionCandidacyFail(res.message));
            }
            const missionIsCurrent = res.id === getState().mission.current.data.id;
            dispatch(displaySnackMsg(`The candidacy was ${verb} on ${mission.title}`));
            return dispatch(toggleMissionCandidacySuccess(res, missionIsCurrent));
        } catch (error) {
            dispatch(displaySnackMsg(`The candidacy couldn't be ${verb}ed`));
            return dispatch(toggleMissionCandidacyFail(error.message));
        }
    };
