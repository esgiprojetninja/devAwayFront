/* eslint-env jest */
import guardReducer from "../../reducers/guard";
import {
    UPDATE_CREDENTIALS,
    CHECK_GUARD_REQUEST,
    CHECK_GUARD_SUCCESS,
    CHECK_GUARD_FAILURE
} from "../../actions/guard";

describe("Reducer guard", () => {
    const initialSate = {
        data: {},
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
                type: UPDATE_CREDENTIALS,
                payload: { property: "email", value: "toto@toto.toto" }
            }
        )).toEqual({
            ...initialSate,
            data: {
                email: "toto@toto.toto"
            }
        });
    });

    it("should CHECK_GUARD_REQUEST", () => {
        expect(guardReducer(
            undefined,
            { type: CHECK_GUARD_REQUEST }
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
                type: CHECK_GUARD_SUCCESS,
                payload: 123456
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

    it("should CHECK_GUARD_FAILURE", () => {
        expect(guardReducer(
            {
                ...initialSate,
                isLoading: true
            },
            {
                type: CHECK_GUARD_FAILURE,
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
