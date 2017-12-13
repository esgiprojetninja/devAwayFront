import * as types from "./types/user";

export const logout = () => ({
    payload: {},
    type: types.LOGOUT,
});

export const login = (res: {}) => ({
    payload: res,
    type: types.LOGIN,
});
