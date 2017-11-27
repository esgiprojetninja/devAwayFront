// @flow
import type { ActionType } from "./index";
import * as types from "./types/user";

export const logout = (): ActionType => ({
    payload: {},
    type: types.LOGOUT,
});

export const login = (res: {}): ActionType => ({
    payload: res,
    type: types.LOGIN,
});
