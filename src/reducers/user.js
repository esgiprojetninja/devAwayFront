import * as types from "../actions/types/user";


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
        username: ""
    },
    isLoggedIn: false,
    isLoading: false,
    hasError: false,
    errorText: "",
    snackText: ""
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
            isLoading: false
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
            data: payload.user,
            snackText: `Successfully subscribed as ${payload.user.username}`
        };
    case types.ADD_USER_FAILURE:
        return {
            ...state,
            isLoading: false,
            hasError: true,
            snackText: "",
            errorText: payload.errorText
        };
    case types.NOTICE_USER_SNACK:
        return {
            ...state,
            snackText: ""
        };
    default:
        return state;
    }
};

export default userReducer;
