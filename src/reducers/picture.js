import {
    FETCH_PICTURE_REQUEST,
    FETCH_PICTURE_SUCCESS,
    FETCH_PICTURE_FAILURE,
} from "../actions/picture";

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

const picture = (state = initialSate, action) => {
    const { payload } = action;
    switch (action.type) {
    case FETCH_PICTURE_REQUEST:
        return {
            ...state,
            isLoading: true,
            hasError: false,
            errorText: ""
        };
    case FETCH_PICTURE_SUCCESS:
        return {
            ...state,
            data: payload.data,
            byID: payload.byID,
            isLoading: false
        };
    case FETCH_PICTURE_FAILURE:
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

export default picture;
