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

export const getMe = () => {
    return (dispatch, getState, API) => {
        dispatch(userRequest());
        return API.profileApi.getMe()
            .then(
                (res) => {
                    if (res && res.id && res.email && res.username) {
                        dispatch(displaySnackMsg(`Logged in as ${res.username}`));
                        const sessionUser = JSON.stringify({
                            ...res,
                            token: getState().user.data.token
                        });
                        window.localStorage.setItem("filledUser", sessionUser);
                        return dispatch(loginSuccess(res));
                    }
                    dispatch(displaySnackMsg("Log in failed"));
                    return dispatch(loginFailure(res.title || "Bad credentials"));
                }, (err) => {
                    console.error("getMe error", err);
                    dispatch(displaySnackMsg("Log in failed, see console"));
                    dispatch(logout());
                    const errMsg = typeof err === "string" ? err : "Bad credentials.";
                    return dispatch(loginFailure(errMsg));
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
                    if (res && res.code && !res.token) {
                        return dispatch(loginFailure(res.message));
                    }
                    window.localStorage.setItem("authToken", res.token);
                    dispatch(loginSuccess(res));
                    return dispatch(getMe(res.token));
                },
                error => console.log(error)
            );
    };
}

const addUserSuccess = user => ({
    type: types.ADD_USER_SUCCESS,
    payload: { user }
});

const addUserFailure = err => ({
    type: types.ADD_USER_FAILURE,
    payload: { errorText: err }
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
                    dispatch(displaySnackMsg("Account creation failure"));
                    return dispatch(addUserFailure(res));
                }, (err) => {
                    console.error("addUser error", err);
                    dispatch(displaySnackMsg("Account creation failure, see console"));
                    return dispatch(addUserFailure(err));
                }
            );
    };
};

export const loadSessionUser = () => {
    return (dispatch) => {
        return new Promise((resolve) => {
            const token = window.localStorage.getItem("authToken");
            const savedUser = window.localStorage.getItem("filledUser");
            if (token && !savedUser) {
                dispatch(getMe());
            } else if (savedUser) {
                dispatch(loginSuccess(JSON.parse(savedUser)));
            }
            resolve();
        }).then(() => {});
    };
};
