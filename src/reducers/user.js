// @flow
import * as types from "../actions/types/user";
import type { ActionType } from "../actions";

export type UserStateType = {
    authenticated: boolean
};

const initialSate: UserStateType = {
    authenticated: false,
};

const userReducer = (state: UserStateType = initialSate, action: ActionType): UserStateType => {
    const { payload } = action;
    switch (action.type) {
    case types.LOGOUT:
        return initialSate;
    case types.LOGIN:
        return {
            ...state,
            ...payload,
        };
    default:
        return state;
    }
};

export default userReducer;
