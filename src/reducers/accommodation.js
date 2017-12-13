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
    errorText: ""
};

function sortNumber(a, b) {
    return a - b;
}

const accommodation = (state = initialSate, action) => {
    const data = [];
    const byID = new Map();
    switch (action) {
    case FETCH_ACCOMMODATIONS_REQUEST:
        return {
            ...state,
            isLoading: true
        };
    case FETCH_ACCOMMODATIONS_SUCCESS:
        action.payload.forEach((item) => {
            data.push(Number(item.id));
            byID.set(item.id, item);
        });
        return {
            ...state,
            data: data.sort(sortNumber),
            byID,
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
