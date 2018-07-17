/* eslint-env jest */
import accommodationReducer from "../../reducers/accommodation";
import * as accoTypes from "../../actions/types/accommodation";

describe("Reducer ACCOMMODATION", function () {
    beforeEach(() => {
        this.initialSate = {
            data: [],
            byID: new Map(),
            isLoading: false,
            hasError: false,
            errorText: "",
            search: {
                all: [],
                hasPrevious: false,
                hasNext: false,
                isLoading: false,
                error: "",
                lastSearchDate: null,
            }
        };
    });

    it("should return initialSate", () => {
        expect(accommodationReducer(undefined, {})).toEqual(this.initialSate);
    });

    it("should dispatch FETCH_ACCOMMODATIONS_REQUEST", () => {
        expect(accommodationReducer(this.initialSate, {
            type: accoTypes.FETCH_ACCOMMODATIONS_REQUEST
        })).toEqual({
            ...this.initialSate,
            isLoading: true,
            hasError: false,
            errorText: ""
        });
    });

    it("should dispatch FETCH_ACCOMMODATIONS_SUCCESS", () => {
        expect(accommodationReducer(this.initialSate, {
            type: accoTypes.FETCH_ACCOMMODATIONS_SUCCESS,
            payload: {
                data: "coucou",
                byID: new Map(),
            }
        })).toEqual({
            ...this.initialSate,
            data: "coucou",
            byID: new Map(),
            isLoading: false
        });
    });

    it("should dispatch FETCH_ACCOMMODATION_SUCCESS", () => {
        const acco = {
            id: 123,
            poulay: "poulay"
        };
        expect(accommodationReducer(this.initialSate, {
            type: accoTypes.FETCH_ACCOMMODATION_SUCCESS,
            payload: {
                data: { id: acco.id }
            }
        })).toEqual({
            ...this.initialSate,
            data: [acco.id],
            byID: this.initialSate.byID.set(acco.id, acco),
            isLoading: false
        });
    });

    it("should dispatch FETCH_ACCOMMODATION_SUCCESS without replacing data array", () => {
        this.initialSate = {
            ...this.initialSate,
            data: [123, "poulayID"]
        };
        const acco = {
            id: 123,
            poulay: "poulay"
        };
        expect(accommodationReducer(this.initialSate, {
            type: accoTypes.FETCH_ACCOMMODATION_SUCCESS,
            payload: {
                data: { id: acco.id }
            }
        })).toEqual({
            ...this.initialSate,
            byID: this.initialSate.byID.set(acco.id, acco),
            isLoading: false
        });
    });

    it("should dispatch FETCH_ACCOMMODATIONS_FAILURE", () => {
        expect(accommodationReducer(this.initialSate, {
            type: accoTypes.FETCH_ACCOMMODATIONS_FAILURE,
            payload: "error msg"
        })).toEqual({
            ...this.initialSate,
            hasError: true,
            errorText: "error msg",
            isLoading: false
        });
    });

    it("should dispatch SAVE_ACCOMMODATION_REQUEST", () => {
        expect(accommodationReducer(this.initialSate, {
            type: accoTypes.SAVE_ACCOMMODATION_REQUEST
        })).toEqual({
            ...this.initialSate,
            isLoading: true
        });
    });

    it("should dispatch SAVE_ACCOMMODATION_SUCCESS", () => {
        expect(accommodationReducer(this.initialSate, {
            type: accoTypes.SAVE_ACCOMMODATION_SUCCESS,
            payload: { accommodation: { id: "coucou", shwantz: "cannette" } }

        })).toEqual({
            ...this.initialSate,
            data: ["coucou"],
            byID: new Map().set("coucou", { id: "coucou", pictures: [], shwantz: "cannette" })
        });
    });

    it("should dispatch SAVE_ACCOMMODATION_SUCCESS while leaving data & byID unchanged", () => {
        expect(accommodationReducer(this.initialSate, {
            type: accoTypes.SAVE_ACCOMMODATION_SUCCESS,
            payload: { accommodation: { shwantz: "cannette" } }

        })).toEqual({
            ...this.initialSate
        });
    });

    it("should dispatch SAVE_ACCOMMODATION_FAILURE", () => {
        expect(accommodationReducer(this.initialSate, {
            type: accoTypes.SAVE_ACCOMMODATION_FAILURE,
            payload: "groussaics"

        })).toEqual({
            ...this.initialSate,
            hasError: true,
            errorText: "groussaics"
        });
    });

    it("should dispatch SEARCH_ACCOMMODATIONS_REQUEST", () => {
        expect(accommodationReducer(this.initialSate, {
            type: accoTypes.SEARCH_ACCOMMODATIONS_REQUEST,
        })).toEqual({
            ...this.initialSate,
            search: {
                ...this.initialSate.search,
                isLoading: true,
            }
        });
    });

    it("should dispatch SEARCH_ACCOMMODATIONS_FAILURE", () => {
        expect(accommodationReducer(this.initialSate, {
            type: accoTypes.SEARCH_ACCOMMODATIONS_FAILURE,
            payload: { msg: "coucou error" },
        })).toEqual({
            ...this.initialSate,
            search: {
                ...this.initialSate.search,
                isLoading: false,
                error: "coucou error",
            }
        });
    });

    it("should dispatch SEARCH_ACCOMMODATIONS_SUCCESS", () => {
        expect(accommodationReducer(this.initialSate, {
            type: accoTypes.SEARCH_ACCOMMODATIONS_SUCCESS,
            payload: { accommodations: [1, 2, 3], searchDate: "POULAY" },
        })).toEqual({
            ...this.initialSate,
            search: {
                ...this.initialSate.search,
                isLoading: false,
                all: [1, 2, 3],
                lastSearchDate: "POULAY",
            }
        });
    });
});
