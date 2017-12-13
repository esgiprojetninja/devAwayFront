import * as types from "../actions/types/user";


const initialSate = {
    authenticated: false
};

const userReducer = (state = initialSate, action) => {
    const { payload } = action;
    switch (action.type) {
    case types.LOGOUT:
        return initialSate;
    case types.LOGIN_REQUEST:
        return {
            ...state,
            ...payload
        };
    default:
        return state;
    }
};

export default userReducer;
