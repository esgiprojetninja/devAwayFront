/* eslint-env jest */
import userReducer from "../../reducers/user";
import * as userTypes from "../../actions/types/user";
import { accommodationMock } from "../mock/body/accommodation";

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
            userName: "",
            token: ""
        },
        isLoggedIn: false,
        isLoading: false,
        isGettingData: false,
        hasError: false,
        error: "",
        accommodations: {},
    };

    it("should return initialSate", () => {
        expect(userReducer(undefined, {})).toEqual(initialSate);
    });

    it("should dispatch LOGOUT", () => {
        expect(userReducer(initialSate, {
            type: userTypes.LOGOUT
        })).toEqual(initialSate);
    });

    it("should dispatch LOGIN_REQUEST", () => {
        expect(userReducer(initialSate, {
            type: userTypes.LOGIN_REQUEST
        })).toEqual({
            ...initialSate,
            isLoading: true,
            hasError: false,
            error: ""
        });
    });

    it("should dispatch LOGIN_SUCCESS", () => {
        expect(userReducer(initialSate, {
            type: userTypes.LOGIN_SUCCESS,
            payload: {
                data: {
                    id: 42,
                    userName: "dupoulay",
                    email: "chillinmyass",
                    token: "datauken"
                }
            }
        })).toEqual({
            ...initialSate,
            isLoading: false,
            isLoggedIn: true,
            isGettingData: false,
            hasError: false,
            data: {
                ...initialSate.data,
                id: 42,
                userName: "dupoulay",
                email: "chillinmyass",
                token: "datauken"
            }
        });
    });

    it("should dispatch LOGIN_FAILURE", () => {
        expect(userReducer(initialSate, {
            type: userTypes.LOGIN_FAILURE,
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
            type: userTypes.USER_REQUEST
        })).toEqual({
            ...initialSate,
            isLoading: true
        });
    });

    it("should dispatch USER_GET_ME_REQUEST", () => {
        expect(userReducer(initialSate, {
            type: userTypes.USER_GET_ME_REQUEST
        })).toEqual({
            ...initialSate,
            isLoading: true,
            isGettingData: true,
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
                updatedAt: "",
                userName: ""
            }
        };

        expect(userReducer(state, {
            type: userTypes.ADD_USER_SUCCESS,
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
                token: "",
                updatedAt: "",
                userName: ""
            }
        });
    });

    it("should dispatch ADD_USER_FAILURE", () => {
        const state = {
            ...initialSate,
            isLoading: true
        };

        expect(userReducer(state, {
            type: userTypes.ADD_USER_FAILURE,
            payload: "error, bitch"
        })).toEqual({
            ...state,
            isLoading: false,
            hasError: true,
            error: "error, bitch"
        });
    });

    it("should dispatch FETCH_USER_ACCOMMODATIONS_FAIL", () => {
        const state = {
            ...initialSate,
            isLoading: true,
            isLoggedIn: true,
        };
        expect(userReducer(state, {
            type: userTypes.FETCH_USER_ACCOMMODATIONS_FAIL,
            payload: { error: "chillinmyass" },
        })).toEqual({
            ...state,
            isLoading: false,
            hasError: true,
            error: "chillinmyass"
        });
    });

    it("should dispatch FETCH_USER_ACCOMMODATIONS_SUCCESS", () => {
        const accommodations = Array.from(new Array(4))
            .map(i => ({
                ...accommodationMock,
                id: i
            }));

        expect(userReducer(initialSate, {
            type: userTypes.FETCH_USER_ACCOMMODATIONS_SUCCESS,
            payload: { accommodations }
        })).toEqual({
            ...initialSate,
            isLoading: false,
            accommodations: accommodations.reduce(
                (stateAccos, currentAcc) =>
                    ({
                        ...stateAccos,
                        [currentAcc.id]: currentAcc
                    }),
                {}
            )
        });
    });
});
