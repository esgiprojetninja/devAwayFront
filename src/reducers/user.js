import * as types from "../actions/types/user";

const initialSate = {
    authenticated: false,
};

const userReducer = (state = initialSate, action) => {
    switch (action.type) {
    case types.LOGOUT:
        return initialSate;
    default:
        return state;
    }
};

export default userReducer;
