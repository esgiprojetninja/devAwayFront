export const FETCH_PROFILES_REQUEST = "FETCH_PROFILES_REQUEST";
const fetchProfilesRequest = () => ({
    type: FETCH_PROFILES_REQUEST
});

export const FETCH_PROFILES_SUCCESS = "FETCH_PROFILES_SUCCESS";
const fetchProfilesSuccess = payload => ({
    type: FETCH_PROFILES_SUCCESS,
    payload
});

export const FETCH_PROFILES_FAILURE = "FETCH_PROFILES_FAILURE";
const fetchProfilesFailure = payload => ({
    type: FETCH_PROFILES_FAILURE,
    payload
});

export function fetchProfiles() {
    return (dispatch, getState, API) => {
        dispatch(fetchProfilesRequest());
        return API.profileApi.fetchAll()
            .then(
                (res) => {
                    if (res.hasError) {
                        return dispatch(fetchProfilesFailure(res.message));
                    }
                    return dispatch(fetchProfilesSuccess(res));
                },
                error => console.log(error)
            );
    };
}

export const SAVE_PROFILE_REQUEST = "SAVE_PROFILE_REQUEST";
const saveProfileRequest = () => ({
    type: SAVE_PROFILE_REQUEST
});

export const SAVE_PROFILE_SUCCESS = "SAVE_PROFILE_SUCCESS";
const saveProfileSuccess = () => ({
    type: SAVE_PROFILE_SUCCESS
});

export const SAVE_PROFILE_FAILURE = "SAVE_PROFILE_FAILURE";
const saveProfileFailure = payload => ({
    type: SAVE_PROFILE_FAILURE,
    payload
});

export function saveProfile() {
    return (dispatch, getState, API) => {
        dispatch(saveProfileRequest());
        return API.profileApi.createOrUpdate(getState().profile.current)
            .then(
                (res) => {
                    if (res.hasError) {
                        return dispatch(saveProfileFailure(res.message));
                    }
                    return dispatch(saveProfileSuccess());
                },
                error => console.log(error)
            );
    };
}

export const DELETE_PROFILE_REQUEST = "DELETE_PROFILE_REQUEST";
const deleteProfileRequest = () => ({
    type: DELETE_PROFILE_REQUEST
});

export const DELETE_PROFILE_SUCCESS = "DELETE_PROFILE_SUCCESS";
const deleteProfileSuccess = () => ({
    type: DELETE_PROFILE_SUCCESS
});

export const DELETE_PROFILE_FAILURE = "DELETE_PROFILE_FAILURE";
const deleteProfileFailure = payload => ({
    type: DELETE_PROFILE_FAILURE,
    payload
});

export function deleteProfile(id) {
    return (dispatch, getState, API) => {
        dispatch(deleteProfileRequest());
        return API.profileApi.deleteItem(id).then((res) => {
            if (res.hasError) {
                return dispatch(deleteProfileFailure(res.message));
            }
            dispatch(deleteProfileSuccess());
            return dispatch(fetchProfiles());
        });
    };
}
