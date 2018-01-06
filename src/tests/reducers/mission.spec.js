/* eslint-env jest */
import missionReducer from "../../reducers/mission";
import {
    FETCH_MISSIONS_REQUEST,
    FETCH_MISSIONS_SUCCESS,
    FETCH_MISSIONS_FAILURE,
    SAVE_MISSION_REQUEST,
    SAVE_MISSION_SUCCESS,
    SAVE_MISSION_FAILURE
} from "../../actions/mission";

describe("Reducer mission", () => {
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
        expect(missionReducer(undefined, {})).toEqual(initialSate);
    });

    it("should FETCH_MISSIONS_REQUEST", () => {
        expect(missionReducer(initialSate, {
            type: FETCH_MISSIONS_REQUEST
        })).toEqual({
            ...initialSate,
            isLoading: true
        });
    });

    it("should FETCH_MISSIONS_SUCCESS", () => {
        const state = {
            ...initialSate,
            isLoading: true
        };
        const byID = new Map();
        byID.set(1, { id: 1, name: "toto" });
        expect(missionReducer(state, {
            type: FETCH_MISSIONS_SUCCESS,
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

    it("should FETCH_MISSIONS_FAILURE", () => {
        const state = {
            ...initialSate,
            isLoading: true
        };
        expect(missionReducer(state, {
            type: FETCH_MISSIONS_FAILURE,
            payload: "Sorry boss :/"
        })).toEqual({
            ...state,
            isLoading: false,
            hasError: true,
            errorText: "Sorry boss :/"
        });
    });

    it("should SAVE_MISSION_REQUEST", () => {
        expect(missionReducer(initialSate, {
            type: SAVE_MISSION_REQUEST
        })).toEqual({
            ...initialSate,
            current: {
                ...initialSate.current,
                isLoading: true
            }
        });
    });

    it("should SAVE_MISSION_SUCCESS", () => {
        const state = {
            ...initialSate,
            current: {
                ...initialSate.current,
                isLoading: true
            }
        };
        expect(missionReducer(state, {
            type: SAVE_MISSION_SUCCESS,
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

    it("should SAVE_MISSION_FAILURE", () => {
        const state = {
            ...initialSate,
            current: {
                ...initialSate.current,
                isLoading: true
            }
        };
        expect(missionReducer(state, {
            type: SAVE_MISSION_FAILURE,
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
