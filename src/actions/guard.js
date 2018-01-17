export const UPDATE_CREDENTIALS = "UPDATE_CREDENTIALS";
export const updateCredentials = (property, value) => ({
    type: UPDATE_CREDENTIALS,
    payload: {
        property,
        value
    }
});

export const CHECK_GUARD_REQUEST = "CHECK_GUARD_REQUEST";
const checkGuardRequest = () => ({
    type: CHECK_GUARD_REQUEST
});

export const CHECK_GUARD_SUCCESS = "CHECK_GUARD_SUCCESS";
const checkGuardSuccess = payload => ({
    type: CHECK_GUARD_SUCCESS,
    payload
});

export const CHECK_GUARD_FAILURE = "CHECK_GUARD_FAILURE";
const checkGuardFailure = payload => ({
    type: CHECK_GUARD_FAILURE,
    payload
});

export function checkGuard() {
    return (dispatch, getState, API) => {
        dispatch(checkGuardRequest());
        const { email, password } = getState().guard.data;
        return API.guardApi.checkGuard({ email, password })
            .then(
                (res) => {
                    if (res.hasError) {
                        return dispatch(checkGuardFailure(res.message));
                    }
                    return dispatch(checkGuardSuccess(res));
                },
                error => console.log(error)
            );
    };
}
