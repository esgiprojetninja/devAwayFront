import {
    UPDATE_CREDENTIALS,
    CHECK_GUARD_REQUEST,
    CHECK_GUARD_SUCCESS,
    CHECK_GUARD_FAILURE
} from "../actions/guard";

const initialSate = {
    data: {
        email: "",
        password: "",
        code: 0
    },
    isLoading: false,
    hasError: false,
    errorText: ""
};

const guard = (state = initialSate, action) => {
    const { payload } = action;
    switch (action.type) {
    case UPDATE_CREDENTIALS:
        return {
            ...state,
            data: {
                ...state.data,
                [payload.property]: payload.value
            }
        };
    case CHECK_GUARD_REQUEST:
        return {
            ...state,
            isLoading: true
        };
    case CHECK_GUARD_SUCCESS:
        return {
            ...state,
            isLoading: false,
            data: {
                ...state.data,
                code: payload
            }
        };
    case CHECK_GUARD_FAILURE:
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

export default guard;
