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

const userGetMeRequest = () => ({
    type: types.USER_GET_ME_REQUEST
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
    return async (dispatch, getState, API) => {
        const state = getState();
        if (state && state.user && state.user.isGettingData) {
            return;
        }
        dispatch(userGetMeRequest());
        try {
            const res = await API.profileApi.getMe();
            if (res && res.id && res.email && res.username) {
                dispatch(displaySnackMsg(`Logged in as ${res.username}`));
                const sessionUser = JSON.stringify({
                    ...res,
                    token
                });
                window.localStorage.setItem("filledUser", sessionUser);
                dispatch(loginSuccess(res));
                return;
            }
            dispatch(displaySnackMsg("Login failed"));
            dispatch(logout());
            dispatch(loginFailure(res.message));
        } catch (err) {
            // console.error("getMe error", err);
            dispatch(displaySnackMsg("Login failed"));
            dispatch(logout());
            dispatch(loginFailure(err));
        }
    };
};

export function login(credentials) {
    return (dispatch, getState, API) => {
        dispatch(loginRequest());
        return API.userApi.login(credentials)
            .then(
                (res) => {
                    if (!res || !res.success || !res.success.token) {
                        dispatch(displaySnackMsg("Failed to login"));
                        return dispatch(loginFailure(res.message));
                    }
                    window.localStorage.setItem("authToken", res.success.token);
                    dispatch(loginSuccess(res.success));
                    return dispatch(getMe(res.success.token));
                },
                (error) => {
                    // console.log("login error:: ", error);
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

export const upsertUser = (user) => {
    return async (dispatch, getState, API) => {
        let verb = user.id || user.id === 0 ?
            "edit"
            : "create";
        dispatch(userRequest());
        try {
            const res = await API.userApi.upsertUser(user);
            if (res && res.email && res.username) {
                verb = `${verb}ed`.replace("ee", "e");
                dispatch(displaySnackMsg(`User ${verb}`));
                return user.id ?
                    dispatch(loginSuccess(res))
                    : dispatch(addUserSuccess(res));
            }
            dispatch(displaySnackMsg(`Couldn't ${verb} user`));
            return dispatch(addUserFailure(res.message || `Couldn't ${verb} user`));
        } catch (e) {
            dispatch(displaySnackMsg(`Couldn't ${verb} user`));
            return dispatch(addUserFailure(e.message));
        }
    };
};

export const loadSessionUser = () =>
    (dispatch, getState) => {
        const token = window.localStorage.getItem("authToken");
        if (token && (!getState().user || !getState().user.isLoggedIn)) {
            dispatch(getMe(token));
        }
    };

const fetchUserAccommodationsFail = error => ({
    type: types.FETCH_USER_ACCOMMODATIONS_FAIL,
    payload: { error }
});

const fetchUserAccommodationsSuccess = accommodations => ({
    type: types.FETCH_USER_ACCOMMODATIONS_SUCCESS,
    payload: { accommodations }
});

export const fetchUserAccommodations = userId =>
    async (dispatch, getState, API) => {
        dispatch(userRequest());
        const id = userId || getState().user.data.id;
        try {
            const res = await API.userApi.getAccommodations(id);
            if (res.hasError || !Array.isArray(res)) {
                dispatch(displaySnackMsg("Could not fetch user accommodations"));
                return dispatch(fetchUserAccommodationsFail(res.message || "Error while fetching user places"));
            }
            return dispatch(fetchUserAccommodationsSuccess(res));
        } catch (e) {
            dispatch(displaySnackMsg("Failed to fetch user accommodations"));
            return dispatch(fetchUserAccommodationsFail(e.message));
        }
    };
