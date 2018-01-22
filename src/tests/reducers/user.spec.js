/* eslint-env jest */
import userReducer from "../../reducers/user";
import {
    USER_REQUEST,
    ADD_USER_SUCCESS,
    ADD_USER_FAILURE
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
            username: ""
        },
        isLoggedIn: false,
        isLoading: false,
        hasError: false,
        errorText: ""
    };

    it("should return initialSate", () => {
        expect(userReducer(undefined, {})).toEqual(initialSate);
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
            payload: { errorText: "error, bitch" }
        })).toEqual({
            ...state,
            isLoading: false,
            hasError: true,
            errorText: "error, bitch"
        });
    });
});
