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

export const CREATE_GUARD_REQUEST = "CREATE_GUARD_REQUEST";
const createGuardRequest = () => ({
    type: CREATE_GUARD_REQUEST
});

export const CREATE_GUARD_SUCCESS = "CREATE_GUARD_SUCCESS";
const createGuardSuccess = payload => ({
    type: CREATE_GUARD_SUCCESS,
    payload
});

export const CREATE_GUARD_FAILURE = "CREATE_GUARD_FAILURE";
const createGuardFailure = payload => ({
    type: CREATE_GUARD_FAILURE,
    payload
});

export function createGuard() {
    return (dispatch, getState, API) => {
        dispatch(createGuardRequest());
        const { email, password } = getState().guard.data;
        return API.guardApi.createGuard({ email, password })
            .then(
                (res) => {
                    if (res.hasError) {
                        return dispatch(createGuardFailure(res.message));
                    }
                    return dispatch(createGuardSuccess(res));
                },
                error => console.log(error)
            );
    };
}
