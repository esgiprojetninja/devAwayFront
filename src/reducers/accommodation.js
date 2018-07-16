import * as accoTypes from "../actions/types/accommodation";
import { remapAccoPropsInMap, remapAccoProps } from "../parsers/entityParsers";

const initialSate = {
    data: [],
    byID: new Map(),
    isLoading: false,
    hasError: false,
    errorText: "",
    search: {
        all: [],
        hasPrevious: false,
        hasNext: false,
        isLoading: false,
        error: "",
        lastSearchDate: null,
    }
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
    case accoTypes.FETCH_ACCOMMODATION_SUCCESS:
        return {
            ...state,
            data: state.data.find(accoId => accoId === payload.data.id) ?
                state.data :
                state.data.concat(payload.data.id),
            byID: state.byID.set(payload.data.id, remapAccoProps(payload.data)),
            isLoading: false
        };
    case accoTypes.FETCH_ACCOMMODATIONS_SUCCESS:
        return {
            ...state,
            data: payload.data,
            byID: remapAccoPropsInMap(payload.byID),
            isLoading: false
        };
    case accoTypes.FETCH_ACCOMMODATIONS_FAILURE:
        return {
            ...state,
            isLoading: false,
            hasError: true,
            errorText: payload
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
                state.data.concat([payload.accommodation.id]) : state.data,
            byID: payload.accommodation && payload.accommodation.id ?
                state.byID.set(payload.accommodation.id, remapAccoProps({
                    ...state.byID.get(payload.accommodation.id),
                    ...payload.accommodation,
                })
                ) : state.byID
        };
    case accoTypes.SAVE_ACCOMMODATION_FAILURE:
        return {
            ...state,
            isLoading: false,
            hasError: true,
            errorText: payload
        };
    case accoTypes.SEARCH_ACCOMMODATIONS_REQUEST:
        return {
            ...state,
            search: {
                ...state.search,
                error: "",
                isLoading: true,
            }
        };
    case accoTypes.SEARCH_ACCOMMODATIONS_FAILURE:
        return {
            ...state,
            search: {
                ...state.search,
                isLoading: false,
                error: payload.msg,
            }
        };
    case accoTypes.SEARCH_ACCOMMODATIONS_SUCCESS:
        return {
            ...state,
            search: {
                ...state.search,
                isLoading: false,
                error: "",
                all: payload.accommodations,
                lastSearchDate: payload.searchDate,
            }
        };
    default:
        return state;
    }
};

export default accommodation;
