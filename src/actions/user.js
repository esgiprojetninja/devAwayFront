/* global window */
import * as types from "./types/user";
import { displaySnackMsg } from "./snack";

export const logout = () => {
    window.localStorage.removeItem("authToken");
    window.localStorage.removeItem("filledUser");
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
    payload: { data }
});

const loginFailure = error => ({
    type: types.LOGIN_FAILURE,
    payload: error
});

export const getMe = (token) => {
    return (dispatch, getState, API) => {
        dispatch(userRequest());
        return API.profileApi.getMe()
            .then(
                (res) => {
                    if (res && res.id && res.email && res.username) {
                        dispatch(displaySnackMsg(`Logged in as ${res.username}`));
                        const sessionUser = JSON.stringify({
                            ...res,
                            token
                        });
                        window.localStorage.setItem("filledUser", sessionUser);
                        return dispatch(loginSuccess(res));
                    }
                    dispatch(displaySnackMsg("Login failed"));
                    dispatch(logout());
                    return dispatch(loginFailure(res.message));
                }, (err) => {
                    // console.error("getMe error", err);
                    dispatch(displaySnackMsg("Login failed"));
                    dispatch(logout());
                    return dispatch(loginFailure(err));
                }
            );
    };
};

export function login(credentials) {
    return (dispatch, getState, API) => {
        dispatch(loginRequest());
        return API.userApi.login(credentials)
            .then(
                (res) => {
                    if (res && !res.token) {
                        return dispatch(loginFailure(res.message));
                    }
                    window.localStorage.setItem("authToken", res.token);
                    dispatch(loginSuccess(res));
                    return dispatch(getMe(res.token));
                },
                (error) => {
                    // console.log(error);
                    dispatch(displaySnackMsg("Failed to login"));
                    window.localStorage.removeItem("authToken");
                    return dispatch(loginFailure(error));
                }
            );
    };
}

const addUserSuccess = user => ({
    type: types.ADD_USER_SUCCESS,
    payload: { user }
});

const addUserFailure = err => ({
    type: types.ADD_USER_FAILURE,
    payload: err
});

export const addUser = (user) => {
    return (dispatch, getState, API) => {
        dispatch(userRequest());
        return API.userApi.addUser(user)
            .then(
                (res) => {
                    if (res && res.id && res.email && res.username) {
                        dispatch(displaySnackMsg(`Account created with ${res.username}`));
                        return dispatch(addUserSuccess(res));
                    }
                    dispatch(displaySnackMsg("Uncomplete user info"));
                    return dispatch(addUserFailure(res));
                }, (err) => {
                    // console.error("addUser error", err);
                    dispatch(displaySnackMsg("Account creation failure"));
                    return dispatch(addUserFailure(err));
                }
            );
    };
};

export const loadSessionUser = () =>
    (dispatch, getState) => {
        const token = window.localStorage.getItem("authToken");
        if (token && (!getState().user || !getState().user.isLoggedIn)) {
            dispatch(getMe(token));
        }
    };
