/* eslint-env jest */
import profileReducer from "../../reducers/profile";
import {
    FETCH_PROFILES_REQUEST,
    FETCH_PROFILES_SUCCESS,
    FETCH_PROFILES_FAILURE,
    SAVE_PROFILE_REQUEST,
    SAVE_PROFILE_SUCCESS,
    SAVE_PROFILE_FAILURE
} from "../../actions/profile";

describe("Reducer profile", () => {
    const initialSate = {
        data: [],
        byID: new Map(),
        isLoading: false,
        current: {
            data: {},
            isLoading: false
        },
        hasError: false,
        errorText: ""
    };

    it("should return initialSate", () => {
        expect(profileReducer(undefined, {})).toEqual(initialSate);
    });

    it("should FETCH_PROFILES_REQUEST", () => {
        expect(profileReducer(initialSate, {
            type: FETCH_PROFILES_REQUEST
        })).toEqual({
            ...initialSate,
            isLoading: true
        });
    });

    it("should FETCH_PROFILES_SUCCESS", () => {
        const state = {
            ...initialSate,
            isLoading: true
        };
        const byID = new Map();
        byID.set(1, { id: 1, name: "toto" });
        expect(profileReducer(state, {
            type: FETCH_PROFILES_SUCCESS,
            payload: {
                data: [1],
                byID
            }
        })).toEqual({
            ...state,
            isLoading: false,
            data: [1],
            byID
        });
    });

    it("should FETCH_PROFILES_FAILURE", () => {
        const state = {
            ...initialSate,
            isLoading: true
        };
        expect(profileReducer(state, {
            type: FETCH_PROFILES_FAILURE,
            payload: "Sorry boss :/"
        })).toEqual({
            ...state,
            isLoading: false,
            hasError: true,
            errorText: "Sorry boss :/"
        });
    });

    it("should SAVE_PROFILE_REQUEST", () => {
        expect(profileReducer(initialSate, {
            type: SAVE_PROFILE_REQUEST
        })).toEqual({
            ...initialSate,
            current: {
                ...initialSate.current,
                isLoading: true
            }
        });
    });

    it("should SAVE_PROFILE_SUCCESS", () => {
        const state = {
            ...initialSate,
            current: {
                ...initialSate.current,
                isLoading: true
            }
        };
        expect(profileReducer(state, {
            type: SAVE_PROFILE_SUCCESS,
            payload: {
                id: 1000,
                name: "Toto"
            }
        })).toEqual({
            ...state,
            current: {
                data: {
                    id: 1000,
                    name: "Toto"
                },
                isLoading: false
            }
        });
    });

    it("should SAVE_PROFILE_FAILURE", () => {
        const state = {
            ...initialSate,
            current: {
                ...initialSate.current,
                isLoading: true
            }
        };
        expect(profileReducer(state, {
            type: SAVE_PROFILE_FAILURE,
            payload: "Won't save"
        })).toEqual({
            ...state,
            hasError: true,
            errorText: "Won't save",
            current: {
                ...state.current,
                isLoading: false
            }
        });
    });
});
