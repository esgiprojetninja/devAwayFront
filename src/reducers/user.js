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
            data: payload,
            isLoading: false
        };
    case types.LOGIN_FAILURE:
        return {
            ...state,
            error: payload,
            isLoading: false,
            hasError: true
        };
    default:
        return state;
    }
};

export default userReducer;
