import * as accoTypes from "../actions/types/accommodation";

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
    case accoTypes.FETCH_ACCOMMODATIONS_REQUEST:
        return {
            ...state,
            isLoading: true,
            hasError: false,
            errorText: ""
        };
    case accoTypes.FETCH_ACCOMMODATIONS_SUCCESS:
        return {
            ...state,
            data: payload.data,
            byID: payload.byID,
            isLoading: false
        };
    case accoTypes.FETCH_ACCOMMODATIONS_FAILURE:
        return {
            ...state,
            isLoading: false,
            hasError: true,
            errorText: payload
        };
    case accoTypes.SET_CURRENT_ACCOMMODATION:
        return {
            ...state,
            mode: "edit",
            current: state.byID.get(action.payload)
        };
    case accoTypes.UPDATE_ACCOMMODATION:
        return {
            ...state,
            current: {
                ...state.current,
                [payload.property]: payload.value
            }
        };
    case accoTypes.SHOW_LIST:
        return {
            ...state,
            mode: "list"
        };
    case accoTypes.SAVE_ACCOMMODATION_REQUEST:
        return {
            ...state,
            isLoading: true
        };
    case accoTypes.SAVE_ACCOMMODATION_SUCCESS:
        return {
            ...state,
            isLoading: false,
            hasError: false,
            errorText: "",
            data: payload.accommodation && payload.accommodation.id ?
                state.data.concat([payload.accommodation]) : state.data,
            byID: payload.accommodation && payload.accommodation.id ?
                state.byID.set(payload.accommodation.id, payload.accommodation) : state.byID
        };
    case accoTypes.SAVE_ACCOMMODATION_FAILURE:
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
