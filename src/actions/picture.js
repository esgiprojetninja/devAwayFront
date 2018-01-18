export const FETCH_PICTURE_REQUEST = "FETCH_PICTURE_REQUEST";
const fetchPictureRequest = () => ({
    type: FETCH_PICTURE_REQUEST
});

export const FETCH_PICTURE_SUCCESS = "FETCH_PICTURE_SUCCESS";
const fetchPictureSuccess = data => ({
    type: FETCH_PICTURE_SUCCESS,
    payload: data
});

export const FETCH_PICTURE_FAILURE = "FETCH_PICTURE_FAILURE";
const fetchPictureFailure = error => ({
    type: FETCH_PICTURE_FAILURE,
    payload: error
});


export function fetchPicture(id) {
    return (dispatch, getState, API) => {
        dispatch(fetchPictureRequest());
        return API.pictureApi.fetchPicture(id)
            .then(
                (res) => {
                    if (res.hasError) {
                        return dispatch(fetchPictureFailure(res.message));
                    }
                    return dispatch(fetchPictureSuccess(res));
                },
                error => console.log(error)
            );
    };
}
