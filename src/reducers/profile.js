import * as profileTypes from "../actions/types/profile";

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
    case profileTypes.FETCH_PROFILES_REQUEST:
        return {
            ...state,
            isLoading: true
        };
    case profileTypes.FETCH_PROFILES_SUCCESS:
        return {
            ...state,
            isLoading: false,
            data: payload.data,
            byID: payload.byID
        };
    case profileTypes.FETCH_PROFILES_FAILURE:
        return {
            ...state,
            isLoading: false,
            hasError: true,
            errorText: payload
        };
    case profileTypes.SAVE_PROFILE_REQUEST:
        return {
            ...state,
            current: {
                ...state.current,
                isLoading: true
            }
        };
    case profileTypes.SAVE_PROFILE_SUCCESS:
        return {
            ...state,
            current: {
                data: payload,
                isLoading: false
            }
        };
    case profileTypes.SAVE_PROFILE_FAILURE:
        return {
            ...state,
            hasError: true,
            errorText: payload,
            current: {
                ...state.current,
                isLoading: false
            }
        };
    case profileTypes.GET_ME_REQUEST:
        return {
            ...state,
            current: {
                ...state.current,
                isLoading: true
            }
        };
    case profileTypes.GET_ME_SUCCESS:
        return {
            ...state,
            current: {
                ...state.current,
                isLoading: false,
                data: payload
            }
        };
    case profileTypes.GET_ME_FAILURE:
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
