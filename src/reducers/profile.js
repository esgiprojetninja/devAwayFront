import {
    FETCH_PROFILES_REQUEST,
    FETCH_PROFILES_SUCCESS,
    FETCH_PROFILES_FAILURE,
    SAVE_PROFILE_REQUEST,
    SAVE_PROFILE_SUCCESS,
    SAVE_PROFILE_FAILURE
} from "../actions/profile";

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

const profile = (state = initialSate, action) => {
    const { payload } = action;
    switch (action.type) {
    case FETCH_PROFILES_REQUEST:
        return {
            ...state,
            isLoading: true
        };
    case FETCH_PROFILES_SUCCESS:
        return {
            ...state,
            isLoading: false,
            data: payload.data,
            byID: payload.byID
        };
    case FETCH_PROFILES_FAILURE:
        return {
            ...state,
            isLoading: false,
            hasError: true,
            errorText: payload
        };
    case SAVE_PROFILE_REQUEST:
        return {
            ...state,
            current: {
                ...state.current,
                isLoading: true
            }
        };
    case SAVE_PROFILE_SUCCESS:
        return {
            ...state,
            current: {
                data: payload,
                isLoading: false
            }
        };
    case SAVE_PROFILE_FAILURE:
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

export default profile;
