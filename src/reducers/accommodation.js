import {
    FETCH_ACCOMMODATIONS_REQUEST,
    FETCH_ACCOMMODATIONS_SUCCESS,
    FETCH_ACCOMMODATIONS_FAILURE
} from "../actions/accommodation";

const initialSate = {
    data: [],
    byID: new Map(),
    isLoading: false,
    current: {
        data: {},
        isLoading: false
    },
    hasError: false,
    errorText: "",
    mode: "list"
};

const accommodation = (state = initialSate, action) => {
    const { payload } = action;
    switch (action.type) {
    case FETCH_ACCOMMODATIONS_REQUEST:
        return {
            ...state,
            isLoading: true
        };
    case FETCH_ACCOMMODATIONS_SUCCESS:
        return {
            ...state,
            data: payload.data,
            byID: payload.byID,
            isLoading: false
        };
    case FETCH_ACCOMMODATIONS_FAILURE:
        return {
            ...state,
            isLoading: false,
            hasError: true,
            errorText: action.payload
        };
    default:
        return state;
    }
};

export default accommodation;
