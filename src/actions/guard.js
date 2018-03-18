import * as types from "./types/guard";

export const updateCredentials = (property, value) => ({
    type: types.UPDATE_CREDENTIALS,
    payload: {
        property,
        value
    }
});

const checkGuardRequest = () => ({
    type: types.CHECK_GUARD_REQUEST
});

const checkGuardSuccess = payload => ({
    type: types.CHECK_GUARD_SUCCESS,
    payload
});

const checkGuardFailure = payload => ({
    type: types.CHECK_GUARD_FAILURE,
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
                error => dispatch(checkGuardFailure(error))
            );
    };
}

const createGuardRequest = () => ({
    type: types.CREATE_GUARD_REQUEST
});

const createGuardSuccess = payload => ({
    type: types.CREATE_GUARD_SUCCESS,
    payload
});

const createGuardFailure = payload => ({
    type: types.CREATE_GUARD_FAILURE,
    payload
});

export const createGuard = () =>
    (dispatch, getState, API) => {
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
                error => dispatch(createGuardFailure(error))
            );
    };

