import * as types from "./types/user";

import {
    login as ApiLogin
} from "../api/userApi";

export const logout = () => ({
    payload: {},
    type: types.LOGOUT
});

const loginRequest = () => ({
    type: types.LOGIN_REQUEST
});

const loginSuccess = data => ({
    type: types.LOGIN_SUCCESS,
    payload: data
});

const loginFailure = error => ({
    type: types.LOGIN_FAILURE,
    payload: error
});

export function login(credentials) {
    return (dispatch) => {
        dispatch(loginRequest());
        return ApiLogin(credentials)
            .then(
                (res) => {
                    if (res.code !== 200) {
                        return dispatch(loginFailure(res.message));
                    }
                    return dispatch(loginSuccess(res.json()));
                },
                error => console.log(error)
            );
    };
}
