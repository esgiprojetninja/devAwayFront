import {
    FETCH_ACCOMMODATIONS_REQUEST,
    FETCH_ACCOMMODATIONS_SUCCESS,
    FETCH_ACCOMMODATIONS_FAILURE,
    SET_CURRENT_ACCOMMODATION,
    SHOW_LIST,
    UPDATE_ACCOMMODATION,
    SAVE_ACCOMMODATION_REQUEST,
    SAVE_ACCOMMODATION_SUCCESS,
    SAVE_ACCOMMODATION_FAILURE
} from "../actions/types/accommodation";

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
            isLoading: true,
            hasError: false,
            errorText: ""
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
            errorText: payload
        };
    case SET_CURRENT_ACCOMMODATION:
        return {
            ...state,
            mode: "edit",
            current: state.byID.get(action.payload)
        };
    case UPDATE_ACCOMMODATION:
        return {
            ...state,
            current: {
                ...state.current,
                [payload.property]: payload.value
            }
        };
    case SHOW_LIST:
        return {
            ...state,
            mode: "list"
        };
    case SAVE_ACCOMMODATION_REQUEST:
        return {
            ...state,
            isLoading: true
        };
    case SAVE_ACCOMMODATION_SUCCESS:
        return {
            ...state,
            isLoading: false,
            hasError: false,
            errorText: "",
            data: payload.accommodation && payload.accommodation.id ?
                state.data.concat([payload.accommodation]) : state.data,
            byID: payload.accommodation && payload.accommodation ?
                state.byID.set(payload.accommodation.id, payload.accommodation) : state.byID
        };
    case SAVE_ACCOMMODATION_FAILURE:
        return {
            ...state,
            isLoading: false,
            hasError: true,
            errorText: payload
        };
    default:
        return state;
    }
};

export default accommodation;
