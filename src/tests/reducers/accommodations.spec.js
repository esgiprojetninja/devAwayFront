/* eslint-env jest */
import accommodationReducer from "../../reducers/accommodation";
import * as accoTypes from "../../actions/types/accommodation";

describe("Reducer ACCOMMODATION", () => {
    const initialSate = {
        data: [],
        byID: new Map(),
        isLoading: false,
        hasError: false,
        errorText: ""
    };

    it("should return initialSate", () => {
        expect(accommodationReducer(undefined, {})).toEqual(initialSate);
    });

    it("should dispatch FETCH_ACCOMMODATIONS_REQUEST", () => {
        expect(accommodationReducer(initialSate, {
            type: accoTypes.FETCH_ACCOMMODATIONS_REQUEST
        })).toEqual({
            ...initialSate,
            isLoading: true,
            hasError: false,
            errorText: ""
        });
    });

    it("should dispatch FETCH_ACCOMMODATIONS_SUCCESS", () => {
        expect(accommodationReducer(initialSate, {
            type: accoTypes.FETCH_ACCOMMODATIONS_SUCCESS,
            payload: {
                data: "coucou",
                byID: "coucou"
            }
        })).toEqual({
            ...initialSate,
            data: "coucou",
            byID: "coucou",
            isLoading: false
        });
    });

    it("should dispatch FETCH_ACCOMMODATIONS_FAILURE", () => {
        expect(accommodationReducer(initialSate, {
            type: accoTypes.FETCH_ACCOMMODATIONS_FAILURE,
            payload: "error msg"
        })).toEqual({
            ...initialSate,
            hasError: true,
            errorText: "error msg",
            isLoading: false
        });
    });

    it("should dispatch SAVE_ACCOMMODATION_REQUEST", () => {
        expect(accommodationReducer(initialSate, {
            type: accoTypes.SAVE_ACCOMMODATION_REQUEST

        })).toEqual({
            ...initialSate,
            isLoading: true
        });
    });

    it("should dispatch SAVE_ACCOMMODATION_SUCCESS", () => {
        expect(accommodationReducer(initialSate, {
            type: accoTypes.SAVE_ACCOMMODATION_SUCCESS,
            payload: { accommodation: { id: "coucou", shwantz: "cannette" } }

        })).toEqual({
            ...initialSate,
            data: [{ id: "coucou", shwantz: "cannette" }],
            byID: new Map().set("coucou", { id: "coucou", shwantz: "cannette" })
        });
    });

    it("should dispatch SAVE_ACCOMMODATION_SUCCESS while leaving data & byID unchanged", () => {
        expect(accommodationReducer(initialSate, {
            type: accoTypes.SAVE_ACCOMMODATION_SUCCESS,
            payload: { accommodation: { shwantz: "cannette" } }

        })).toEqual({
            ...initialSate
        });
    });

    it("should dispatch SAVE_ACCOMMODATION_FAILURE", () => {
        expect(accommodationReducer(initialSate, {
            type: accoTypes.SAVE_ACCOMMODATION_FAILURE,
            payload: "groussaics"

        })).toEqual({
            ...initialSate,
            hasError: true,
            errorText: "groussaics"
        });
    });
});
