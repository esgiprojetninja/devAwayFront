import {
    FETCH_MISSIONS_REQUEST,
    FETCH_MISSIONS_SUCCESS,
    FETCH_MISSIONS_FAILURE,
    SAVE_MISSION_REQUEST,
    SAVE_MISSION_SUCCESS,
    SAVE_MISSION_FAILURE
} from "../actions/mission";

const initialSate = {
    data: [],
    byID: new Map(),
    isLoading: false,
    current: {
        data: {},
        isLoading: false
    },
    hasError: false,
    errorText: ""
};

const mission = (state = initialSate, action) => {
    const { payload } = action;
    switch (action.type) {
    case FETCH_MISSIONS_REQUEST:
        return {
            ...state,
            isLoading: true
        };
    case FETCH_MISSIONS_SUCCESS:
        return {
            ...state,
            isLoading: false,
            data: payload.data,
            byID: payload.byID
        };
    case FETCH_MISSIONS_FAILURE:
        return {
            ...state,
            isLoading: false,
            hasError: true,
            errorText: payload
        };
    case SAVE_MISSION_REQUEST:
        return {
            ...state,
            current: {
                ...state.current,
                isLoading: true
            }
        };
    case SAVE_MISSION_SUCCESS:
        return {
            ...state,
            current: {
                data: payload,
                isLoading: false
            }
        };
    case SAVE_MISSION_FAILURE:
        return {
            ...state,
            hasError: true,
            errorText: payload,
            current: {
                ...state.current,
                isLoading: false
            }
        };
    default:
        return state;
    }
};

export default mission;
