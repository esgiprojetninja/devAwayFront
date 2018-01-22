import * as types from "../actions/types/snack";

const initialSate = {
    hasSnack: false,
    snackText: "",
    snackQueue: [],
    snackDuration: 4000
};

const snackReducer = (state = initialSate, action) => {
    const { payload } = action;
    switch (action.type) {
    case types.SET_SNACK_MSG:
        return {
            ...state,
            snackQueue: state.hasSnack ? state.snackQueue.concat([{
                snackText: payload.msg,
                snackDuration: payload.snackDuration || initialSate.snackDuration
            }]) : [],
            hasSnack: true,
            snackText: state.hasSnack ? state.snackText : payload.msg,
            snackDuration: state.hasSnack ?
                state.snackDuration :
                payload.snackDuration || initialSate.snackDuration
        };
    case types.RM_SNACK_MSG:
        return {
            ...state,
            snackQueue: state.snackQueue.length === 0 ?
                [] :
                state.snackQueue
                    .filter(nextSnack => nextSnack.snackText !== state.snackQueue[0].snackText),
            hasSnack: !!(state.snackQueue.length),
            snackText: state.snackQueue.length !== 0 ? state.snackQueue[0].snackText : "",
            snackDuration: state.snackQueue.length !== 0 ?
                state.snackQueue[0].snackDuration : initialSate.snackDuration
        };
    default:
        return state;
    }
};

export default snackReducer;
