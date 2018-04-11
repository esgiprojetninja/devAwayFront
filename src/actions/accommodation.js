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

const fetchAccommodationsFailure = error => ({
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
        return API.accommodationApi.createOrUpdate(
            newAccommodation
            || getState().accommodation.current)
            .then((res) => {
                if (res.hasError || res.trace) {
                    dispatch(displaySnackMsg("Accomodation creation failed !"));
                    return dispatch(saveAccommodationFailure(res));
                }
                dispatch(displaySnackMsg("Accomodation created !"));
                dispatch(saveAccommodationSuccess(res));
                return dispatch(fetchAccommodations());
            }, (err) => {
                dispatch(displaySnackMsg("Accomodation creation failed !"));
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
