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
        updateAt: "",
        username: ""
    },
    isLoggedIn: false,
    isLoading: false,
    hasError: false,
    errorText: ""
};

const userReducer = (state = initialSate, action) => {
    const { payload } = action;
    switch (action.type) {
    case types.LOGOUT:
        return initialSate;
    case types.LOGIN_REQUEST:
        return {
            ...state,
            isLoading: true
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
    default:
        return state;
    }
};

export default userReducer;
