import * as types from "./types/snack";

export const displaySnackMsg = (msg, duration) => ({
    type: types.SET_SNACK_MSG,
    payload: { msg, snackDuration: duration }
});

export const removeSnackMsg = () => ({
    type: types.RM_SNACK_MSG
});
