export const FETCH_MISSIONS_REQUEST = "FETCH_MISSIONS_REQUEST";
const fetchMissionsRequest = () => ({
    type: FETCH_MISSIONS_REQUEST
});

export const FETCH_MISSIONS_SUCCESS = "FETCH_MISSIONS_SUCCESS";
const fetchMissionsSuccess = payload => ({
    type: FETCH_MISSIONS_SUCCESS,
    payload
});

export const FETCH_MISSIONS_FAILURE = "FETCH_MISSIONS_FAILURE";
const fetchMissionsFailure = payload => ({
    type: FETCH_MISSIONS_FAILURE,
    payload
});

export function fetchMissions() {
    return (dispatch, getState, API) => {
        dispatch(fetchMissionsRequest());
        return API.missionApi.fetchAll()
            .then(
                (res) => {
                    if (res.hasError) {
                        return dispatch(fetchMissionsFailure(res.message));
                    }
                    return dispatch(fetchMissionsSuccess(res));
                },
                error => console.log(error)
            );
    };
}

export const SAVE_MISSION_REQUEST = "SAVE_MISSION_REQUEST";
const saveMissionRequest = () => ({
    type: SAVE_MISSION_REQUEST
});

export const SAVE_MISSION_SUCCESS = "SAVE_MISSION_SUCCESS";
const saveMissionSuccess = () => ({
    type: SAVE_MISSION_SUCCESS
});

export const SAVE_MISSION_FAILURE = "SAVE_MISSION_FAILURE";
const saveMissionFailure = payload => ({
    type: SAVE_MISSION_FAILURE,
    payload
});

export function saveMission() {
    return (dispatch, getState, API) => {
        dispatch(saveMissionRequest());
        return API.missionApi.createOrUpdate(getState().mission.current)
            .then(
                (res) => {
                    if (res.hasError) {
                        return dispatch(saveMissionFailure(res.message));
                    }
                    return dispatch(saveMissionSuccess());
                },
                error => console.log(error)
            );
    };
}

export const DELETE_MISSION_REQUEST = "DELETE_MISSION_REQUEST";
const deleteMissionRequest = () => ({
    type: DELETE_MISSION_REQUEST
});

export const DELETE_MISSION_SUCCESS = "DELETE_MISSION_SUCCESS";
const deleteMissionSuccess = () => ({
    type: DELETE_MISSION_SUCCESS
});

export const DELETE_MISSION_FAILURE = "DELETE_MISSION_FAILURE";
const deleteMissionFailure = payload => ({
    type: DELETE_MISSION_FAILURE,
    payload
});

export function deleteMission(id) {
    return (dispatch, getState, API) => {
        dispatch(deleteMissionRequest());
        return API.missionApi.deleteItem(id).then((res) => {
            if (res.hasError) {
                return dispatch(deleteMissionFailure(res.message));
            }
            dispatch(deleteMissionSuccess());
            return dispatch(fetchMissions());
        });
    };
}
