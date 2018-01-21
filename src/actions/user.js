/* global window */
import * as types from "./types/user";
import objectsHaveSameKeys from "../utils/object";

export const logout = () => {
    window.localStorage.removeItem("authToken");
    return {
        payload: {},
        type: types.LOGOUT
    };
};

const userRequest = () => ({
    type: types.USER_REQUEST
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
    return (dispatch, getState, API) => {
        dispatch(loginRequest());
        return API.userApi.login(credentials)
            .then(
                (res) => {
                    if (res.code) {
                        return dispatch(loginFailure(res.message));
                    }
                    window.localStorage.setItem("authToken", res.token);
                    return dispatch(loginSuccess(res));
                },
                error => console.log(error)
            );
    };
}

const addUserSuccess = user => ({
    type: types.ADD_USER_SUCCESS,
    payload: user
});

const addUserFailure = err => ({
    type: types.ADD_USER_FAILURE,
    payload: err
});

export function addUser(user) {
    return (dispatch, getState, API) => {
        dispatch(userRequest());
        return API.userApi.addUser(user)
            .then(
                (res) => {
                    if (objectsHaveSameKeys({ ...res, password: "" }, user)) {
                        return dispatch(addUserSuccess(res));
                    }
                    return dispatch(addUserFailure(res));
                }, (err) => {
                    console.error("addUser error", err);
                    return dispatch(addUserFailure(err));
                }
            );
    };
}
