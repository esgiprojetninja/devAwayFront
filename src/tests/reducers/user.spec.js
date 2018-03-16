/* eslint-env jest */
import userReducer from "../../reducers/user";
import {
    USER_REQUEST,
    ADD_USER_SUCCESS,
    ADD_USER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_SUCCESS
} from "../../actions/types/user";

describe("Reducer USER", () => {
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
        error: ""
    };

    it("should return initialSate", () => {
        expect(userReducer(undefined, {})).toEqual(initialSate);
    });

    it("should dispatch LOGIN_REQUEST", () => {
        expect(userReducer(initialSate, {
            type: LOGIN_REQUEST
        })).toEqual({
            ...initialSate,
            isLoading: true,
            hasError: false,
            error: ""
        });
    });

    it("should dispatch LOGIN_SUCCESS", () => {
        expect(userReducer(initialSate, {
            type: LOGIN_SUCCESS,
            payload: {
                data: {
                    id: 42,
                    username: "dupoulay",
                    email: "chillinmyass",
                    token: "datauken"
                }
            }
        })).toEqual({
            ...initialSate,
            isLoading: false,
            isLoggedIn: true,
            hasError: false,
            data: {
                ...initialSate.data,
                id: 42,
                username: "dupoulay",
                email: "chillinmyass",
                token: "datauken"
            }
        });
    });


    it("should dispatch LOGIN_FAILURE", () => {
        expect(userReducer(initialSate, {
            type: LOGIN_FAILURE,
            payload: "chillinmyass"
        })).toEqual({
            ...initialSate,
            isLoading: false,
            isLoggedIn: false,
            hasError: true,
            error: "chillinmyass"
        });
    });


    it("should dispatch USER_REQUEST", () => {
        expect(userReducer(initialSate, {
            type: USER_REQUEST
        })).toEqual({
            ...initialSate,
            isLoading: true
        });
    });

    it("should dispatch ADD_USER_SUCCESS", () => {
        const state = {
            ...initialSate,
            isLoading: false
        };

        const payload = {
            user: {
                id: 0,
                email: "",
                lastName: "",
                firstName: "",
                languages: "",
                skills: "",
                createdAt: "",
                updateAt: "",
                username: ""
            }
        };

        expect(userReducer(state, {
            type: ADD_USER_SUCCESS,
            payload
        })).toEqual({
            ...state,
            isLoading: false,
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
            }
        });
    });

    it("should dispatch ADD_USER_FAILURE", () => {
        const state = {
            ...initialSate,
            isLoading: true
        };

        expect(userReducer(state, {
            type: ADD_USER_FAILURE,
            payload: "error, bitch"
        })).toEqual({
            ...state,
            isLoading: false,
            hasError: true,
            error: "error, bitch"
        });
    });
});
