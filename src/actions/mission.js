import * as missionTypes from "./types/mission";

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

const saveMissionSuccess = () => ({
    type: missionTypes.SAVE_MISSION_SUCCESS
});

const saveMissionFailure = payload => ({
    type: missionTypes.SAVE_MISSION_FAILURE,
    payload
});

export const saveMission = () =>
    (dispatch, getState, API) => {
        dispatch(saveMissionRequest());
        return API.missionApi.createOrUpdate(getState().mission.current)
            .then(
                (res) => {
                    if (res.hasError) {
                        return dispatch(saveMissionFailure(res.message));
                    }
                    return dispatch(saveMissionSuccess());
                },
                error => dispatch(saveMissionFailure(error))
            );
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
