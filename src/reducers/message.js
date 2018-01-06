import {
    FETCH_MESSAGES_REQUEST,
    FETCH_MESSAGES_SUCCESS,
    FETCH_MESSAGES_FAILURE,
    SAVE_MESSAGE_REQUEST,
    SAVE_MESSAGE_SUCCESS,
    SAVE_MESSAGE_FAILURE
} from "../actions/message";

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

const message = (state = initialSate, action) => {
    const { payload } = action;
    switch (action.type) {
    case FETCH_MESSAGES_REQUEST:
        return {
            ...state,
            isLoading: true
        };
    case FETCH_MESSAGES_SUCCESS:
        return {
            ...state,
            isLoading: false,
            data: payload.data,
            byID: payload.byID
        };
    case FETCH_MESSAGES_FAILURE:
        return {
            ...state,
            isLoading: false,
            hasError: true,
            errorText: payload
        };
    case SAVE_MESSAGE_REQUEST:
        return {
            ...state,
            current: {
                ...state.current,
                isLoading: true
            }
        };
    case SAVE_MESSAGE_SUCCESS:
        return {
            ...state,
            current: {
                data: payload,
                isLoading: false
            }
        };
    case SAVE_MESSAGE_FAILURE:
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

export default message;
