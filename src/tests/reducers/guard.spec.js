/* eslint-env jest */
import guardReducer from "../../reducers/guard";
import * as guardTypes from "../../actions/types/guard";

describe("Reducer guard", () => {
    const initialSate = {
        data: {
            email: "",
            password: "",
            code: 0
        },
        isLoading: false,
        hasError: false,
        errorText: ""
    };

    it("should return initialSate", () => {
        expect(guardReducer(undefined, {})).toEqual(initialSate);
    });

    it("should UPDATE_CREDENTIALS", () => {
        expect(guardReducer(
            undefined,
            {
                type: guardTypes.UPDATE_CREDENTIALS,
                payload: { property: "email", value: "toto@toto.toto" }
            }
        )).toEqual({
            ...initialSate,
            data: {
                ...initialSate.data,
                email: "toto@toto.toto"
            }
        });
    });

    it("should CHECK_GUARD_REQUEST", () => {
        expect(guardReducer(
            undefined,
            { type: guardTypes.CHECK_GUARD_REQUEST }
        )).toEqual({
            ...initialSate,
            isLoading: true
        });
    });

    it("should CHECK_GUARD_SUCCESS", () => {
        expect(guardReducer(
            {
                ...initialSate,
                isLoading: true
            },
            {
                type: guardTypes.CHECK_GUARD_SUCCESS,
                payload: { token: "toto" }
            }
        )).toEqual({
            ...initialSate,
            isLoading: false,
            data: {
                ...initialSate.data,
                token: "toto"
            }
        });
    });

    it("should CHECK_GUARD_FAILURE", () => {
        expect(guardReducer(
            {
                ...initialSate,
                isLoading: true
            },
            {
                type: guardTypes.CHECK_GUARD_FAILURE,
                payload: "Oops"
            }
        )).toEqual({
            ...initialSate,
            isLoading: false,
            hasError: true,
            errorText: "Oops"
        });
    });

    it("should CREATE_GUARD_REQUEST", () => {
        expect(guardReducer(
            undefined,
            { type: guardTypes.CREATE_GUARD_REQUEST }
        )).toEqual({
            ...initialSate,
            isLoading: true
        });
    });

    it("should CREATE_GUARD_SUCCESS", () => {
        expect(guardReducer(
            {
                ...initialSate,
                isLoading: true
            },
            {
                type: guardTypes.CREATE_GUARD_SUCCESS,
                payload: { code: 123456 }
            }
        )).toEqual({
            ...initialSate,
            isLoading: false,
            data: {
                ...initialSate.data,
                code: 123456
            }
        });
    });

    it("should CREATE_GUARD_FAILURE", () => {
        expect(guardReducer(
            {
                ...initialSate,
                isLoading: true
            },
            {
                type: guardTypes.CREATE_GUARD_FAILURE,
                payload: "Oops"
            }
        )).toEqual({
            ...initialSate,
            isLoading: false,
            hasError: true,
            errorText: "Oops"
        });
    });
});
