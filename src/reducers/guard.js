import * as guardTypes from "../actions/types/guard";

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
    case guardTypes.UPDATE_CREDENTIALS:
        return {
            ...state,
            data: {
                ...state.data,
                [payload.property]: payload.value
            }
        };
    case guardTypes.CHECK_GUARD_REQUEST:
        return {
            ...state,
            isLoading: true
        };
    case guardTypes.CHECK_GUARD_SUCCESS:
        return {
            ...state,
            isLoading: false,
            data: {
                ...state.data,
                token: payload.token
            }
        };
    case guardTypes.CHECK_GUARD_FAILURE:
        return {
            ...state,
            isLoading: false,
            hasError: true,
            errorText: payload
        };
    case guardTypes.CREATE_GUARD_REQUEST:
        return {
            ...state,
            isLoading: true
        };
    case guardTypes.CREATE_GUARD_SUCCESS:
        return {
            ...state,
            isLoading: false,
            data: {
                ...state.data,
                code: payload.code
            }
        };
    case guardTypes.CREATE_GUARD_FAILURE:
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
