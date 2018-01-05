export const UPDATE_ACCOMMODATION = "UPDATE_ACCOMMODATION";
export const updateAccommodation = (property, value) => ({
    type: UPDATE_ACCOMMODATION,
    payload: {
        property,
        value
    }
});

export const SET_CURRENT_ACCOMMODATION = "SET_CURRENT_ACCOMMODATION";
export const setCurrentAccommodation = accommodation => ({
    type: SET_CURRENT_ACCOMMODATION,
    payload: accommodation
});

export const SHOW_LIST = "SHOW_LIST";
export const showList = () => ({
    type: SHOW_LIST
});

export const FETCH_ACCOMMODATIONS_REQUEST = "FETCH_ACCOMMODATIONS_REQUEST";
const fetchAccommodationsRequest = () => ({
    type: FETCH_ACCOMMODATIONS_REQUEST
});

export const FETCH_ACCOMMODATIONS_SUCCESS = "FETCH_ACCOMMODATIONS_SUCCESS";
const fetchAccommodationsSuccess = data => ({
    type: FETCH_ACCOMMODATIONS_SUCCESS,
    payload: data
});

export const FETCH_ACCOMMODATIONS_FAILURE = "FETCH_ACCOMMODATIONS_FAILURE";
const fetchAccommodationsFailure = error => ({
    type: FETCH_ACCOMMODATIONS_FAILURE,
    payload: error
});

export function fetchAccommodations() {
    return (dispatch, getState, API) => {
        dispatch(fetchAccommodationsRequest());
        return API.accommodationApi.fetchAll()
            .then(
                (res) => {
                    if (res.hasError) {
                        return dispatch(fetchAccommodationsFailure(res.message));
                    }
                    return dispatch(fetchAccommodationsSuccess(res));
                },
                error => console.log(error)
            );
    };
}

export const SAVE_ACCOMMODATION_REQUEST = "FETCH_ACCOMMODATION_REQUEST";
const saveAccommodationRequest = () => ({
    type: SAVE_ACCOMMODATION_REQUEST
});

export const SAVE_ACCOMMODATION_SUCCESS = "FETCH_ACCOMMODATION_SUCCESS";
const saveAccommodationSuccess = () => ({
    type: SAVE_ACCOMMODATION_SUCCESS
});

export const SAVE_ACCOMMODATION_FAILURE = "FETCH_ACCOMMODATION_FAILURE";
const saveAccommodationFailure = payload => ({
    type: SAVE_ACCOMMODATION_FAILURE,
    payload
});

export function saveAccommodation() {
    return (dispatch, getState, API) => {
        dispatch(saveAccommodationRequest());
        return API.accommodationApi.createOrUpdate(getState().accommodation.current).then((res) => {
            if (res.hasError) {
                return dispatch(saveAccommodationFailure(res.message));
            }
            dispatch(saveAccommodationSuccess());
            return dispatch(fetchAccommodations());
        });
    };
}

export const DELETE_ACCOMMODATION_REQUEST = "DELETE_ACCOMMODATION_REQUEST";
const deleteAccommodationRequest = () => ({
    type: DELETE_ACCOMMODATION_REQUEST
});

export const DELETE_ACCOMMODATION_SUCCESS = "DELETE_ACCOMMODATION_SUCCESS";
const deleteAccommodationSuccess = () => ({
    type: DELETE_ACCOMMODATION_SUCCESS
});

export const DELETE_ACCOMMODATION_FAILURE = "DELETE_ACCOMMODATION_FAILURE";
const deleteAccommodationFailure = payload => ({
    type: payload
});

export function deleteAccommodation(id) {
    return (dispatch, getState, API) => {
        dispatch(deleteAccommodationRequest());
        return API.accommodationApi.deleteItem(id).then((res) => {
            if (res.hasError) {
                return dispatch(deleteAccommodationFailure(res.message));
            }
            dispatch(deleteAccommodationSuccess());
            (dispatch(fetchAccommodations()));
            return dispatch(showList());
        });
    };
}
