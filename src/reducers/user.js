import * as types from "../actions/types/user";
import { remapAccoProps } from "../parsers/entityParsers";

const initialSate = {
    data: {
        id: 0,
        email: "",
        lastName: "",
        firstName: "",
        languages: "",
        skills: "",
        createdAt: "",
        updatedAt: "",
        username: "",
        token: ""
    },
    isLoggedIn: false,
    isLoading: false,
    hasError: false,
    error: "",
    accommodations: {},
};

const userReducer = (state = initialSate, action) => {
    const { payload } = action;
    switch (action.type) {
    case types.USER_REQUEST:
        return {
            ...state,
            isLoading: true
        };
    case types.LOGOUT:
        return {
            ...state,
            data: initialSate.data,
            isLoading: false,
            isLoggedIn: false
        };
    case types.LOGIN_REQUEST:
        return {
            ...state,
            isLoading: true,
            hasError: false,
            error: ""
        };
    case types.LOGIN_SUCCESS:
        return {
            ...state,
            isLoggedIn: true,
            data: {
                ...state.data,
                ...payload.data
            },
            isLoading: false
        };
    case types.LOGIN_FAILURE:
        return {
            ...state,
            isLoggedIn: false,
            error: payload,
            isLoading: false,
            hasError: true
        };
    case types.ADD_USER_SUCCESS:
        return {
            ...state,
            isLoading: false,
            isLoggedIn: false,
            hasError: false,
            data: {
                ...state.data,
                ...payload.user
            },
        };
    case types.ADD_USER_FAILURE:
        return {
            ...state,
            isLoading: false,
            hasError: true,
            error: payload
        };
    case types.FETCH_USER_ACCOMMODATIONS_FAIL:
        return {
            ...state,
            isLoading: false,
            hasError: true,
            error: payload.error,
        };
    case types.FETCH_USER_ACCOMMODATIONS_SUCCESS:
        return {
            ...state,
            isLoading: false,
            accommodations: payload.accommodations.reduce(
                (stateAccos, currentAcc) =>
                    ({
                        ...stateAccos,
                        [currentAcc.id]: remapAccoProps(currentAcc)
                    }),
                state.accommodations
            )
        };
    default:
        return state;
    }
};

export default userReducer;
