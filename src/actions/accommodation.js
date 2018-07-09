/* global window */
import * as types from "./types/accommodation";
import { displaySnackMsg } from "./snack";

export const setCurrentAccommodation = accommodation => ({
    type: types.SET_CURRENT_ACCOMMODATION,
    payload: accommodation
});

export const showList = () => ({
    type: types.SHOW_LIST
});

const fetchAccommodationsRequest = () => ({
    type: types.FETCH_ACCOMMODATIONS_REQUEST
});

const fetchAccommodationsSuccess = data => ({
    type: types.FETCH_ACCOMMODATIONS_SUCCESS,
    payload: data
});

export const fetchAccommodationsFailure = error => ({
    type: types.FETCH_ACCOMMODATIONS_FAILURE,
    payload: error
});

export function fetchAccommodations() {
    return (dispatch, getState, API) => {
        dispatch(fetchAccommodationsRequest());
        return API.accommodationApi.fetchAll()
            .then(
                (res) => {
                    if (res.hasError) {
                        dispatch(displaySnackMsg("Failed to fetch accomodations"));
                        return dispatch(fetchAccommodationsFailure(res.message));
                    }
                    return dispatch(fetchAccommodationsSuccess(res));
                },
                (error) => {
                    // console.log(error);
                    dispatch(displaySnackMsg("Failed to fetch accomodations"));
                    return dispatch(fetchAccommodationsFailure(error));
                }
            );
    };
}

const saveAccommodationRequest = () => ({
    type: types.SAVE_ACCOMMODATION_REQUEST
});

const saveAccommodationSuccess = accommodation => ({
    type: types.SAVE_ACCOMMODATION_SUCCESS,
    payload: { accommodation }
});

const saveAccommodationFailure = payload => ({
    type: types.SAVE_ACCOMMODATION_FAILURE,
    payload
});

export function saveAccommodation(newAccommodation = null) {
    return (dispatch, getState, API) => {
        dispatch(saveAccommodationRequest());
        const verb = newAccommodation.id ? "update" : "create";
        return API.accommodationApi.createOrUpdate(
            newAccommodation
            || getState().accommodation.current)
            .then((res) => {
                if (res.hasError || res.trace || !res.id) {
                    dispatch(displaySnackMsg(`Failed to ${verb} place`));
                    return dispatch(saveAccommodationFailure(res));
                }
                dispatch(displaySnackMsg(`Place ${verb}d`));
                dispatch(saveAccommodationSuccess(res));
                if (!newAccommodation.id) {
                    const { origin } = window.location;
                    if (window.history && window.history.replaceState) {
                        window.history.replaceState(null, "new place", `${origin}/places/${res.id}`);
                    }
                    window.location = `${origin}/places/${res.id}`;
                    return null;
                }
                return dispatch(fetchAccommodations());
            }, (err) => {
                dispatch(displaySnackMsg(`Failed to ${verb} place`));
                return dispatch(saveAccommodationFailure(err));
            });
    };
}

const deleteAccommodationRequest = () => ({
    type: types.DELETE_ACCOMMODATION_REQUEST
});

const deleteAccommodationSuccess = () => ({
    type: types.DELETE_ACCOMMODATION_SUCCESS
});

const deleteAccommodationFailure = payload => ({
    type: types.DELETE_ACCOMMODATION_FAILURE,
    payload
});

export function deleteAccommodation(id) {
    return (dispatch, getState, API) => {
        dispatch(deleteAccommodationRequest());
        return API.accommodationApi.deleteItem(id).then((res) => {
            if (res.hasError) {
                dispatch(displaySnackMsg("Accomodation deleting failed !"));
                return dispatch(deleteAccommodationFailure(res.message));
            }
            dispatch(deleteAccommodationSuccess());
            dispatch(fetchAccommodations());
            return dispatch(showList());
        }, (err) => {
            dispatch(displaySnackMsg("Accomodation deleting failed !"));
            return dispatch(deleteAccommodationFailure(err));
        });
    };
}

const fetchAccommodationSuccess = data => ({
    type: types.FETCH_ACCOMMODATION_SUCCESS,
    payload: { data }
});

export function fetchAccommodation(id) {
    return (dispatch, getState, API) => {
        dispatch(fetchAccommodationsRequest());
        return API.accommodationApi.fetchById(id)
            .then(
                (res) => {
                    if (res.hasError) {
                        dispatch(displaySnackMsg("Failed to fetch accomodation"));
                        return dispatch(fetchAccommodationsFailure(res.message));
                    }
                    return dispatch(fetchAccommodationSuccess(res));
                },
                (error) => {
                    dispatch(displaySnackMsg("Failed to fetch accomodation"));
                    return dispatch(fetchAccommodationsFailure(error.message || error));
                }
            );
    };
}

export function upsertPicture(picture) {
    return (dispatch, getState, API) => {
        dispatch(saveAccommodationRequest());
        return API.accommodationApi.upsertPicture(picture)
            .then((res) => {
                if (res.hasError) {
                    dispatch(displaySnackMsg("Picture editing failed !"));
                    return dispatch(saveAccommodationFailure(res.message));
                }
                dispatch(displaySnackMsg("Picture edited !"));
                return dispatch(fetchAccommodation(picture.accommodation_id));
            }, (err) => {
                dispatch(displaySnackMsg("Picture editing failed !"));
                return dispatch(saveAccommodationFailure(err.message));
            });
    };
}
