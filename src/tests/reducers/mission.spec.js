/* eslint-env jest */
import missionReducer from "../../reducers/mission";
import * as missionTypes from "../../actions/types/mission";

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
            type: missionTypes.FETCH_MISSIONS_REQUEST
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
            type: missionTypes.FETCH_MISSIONS_SUCCESS,
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
            type: missionTypes.FETCH_MISSIONS_FAILURE,
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
            type: missionTypes.SAVE_MISSION_REQUEST
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
            type: missionTypes.SAVE_MISSION_SUCCESS,
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
            type: missionTypes.SAVE_MISSION_FAILURE,
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
