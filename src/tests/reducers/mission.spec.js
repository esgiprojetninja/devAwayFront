/* eslint-env jest */
import missionReducer from "../../reducers/mission";
import * as missionTypes from "../../actions/types/mission";

describe("Reducer mission", () => {
    let initialSate = null;
    beforeEach(() => {
        initialSate = {
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
    });

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
                mission: {
                    id: 1000,
                    name: "Toto"
                }
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

    it("should EDIT_CURRENT_MISSION", () => {
        expect(missionReducer(initialSate, {
            type: missionTypes.EDIT_CURRENT_MISSION,
            payload: { mission: "POULAY" }
        })).toEqual({
            ...initialSate,
            current: {
                data: "POULAY",
                isLoading: false
            }
        });
    });

    it("should FETCH_MISSION_REQUEST", () => {
        expect(missionReducer(initialSate, {
            type: missionTypes.FETCH_MISSION_REQUEST,
        })).toEqual({
            ...initialSate,
            current: {
                ...initialSate.current,
                isLoading: true
            }
        });
    });

    it("should FETCH_MISSION_SUCCESS", () => {
        expect(missionReducer(initialSate, {
            type: missionTypes.FETCH_MISSION_SUCCESS,
            payload: {
                mission: {
                    poulay: "man",
                }
            }
        })).toEqual({
            ...initialSate,
            current: {
                data: {
                    poulay: "man",
                },
                isLoading: false
            }
        });
    });

    it("should FETCH_MISSION_FAILURE", () => {
        expect(missionReducer(initialSate, {
            type: missionTypes.FETCH_MISSION_FAILURE,
        })).toEqual({
            ...initialSate,
            current: {
                data: {},
                isLoading: false
            }
        });
    });

    it("should TOGGLE_APPLY_MISSION_FAILURE", () => {
        expect(missionReducer(initialSate, {
            type: missionTypes.TOGGLE_APPLY_MISSION_FAILURE,
            payload: { missionId: 123 }
        })).toEqual({
            ...initialSate,
            isLoading: false,
        });
    });

    it("should TOGGLE_APPLY_MISSION_REQUEST - not current", () => {
        expect(missionReducer(initialSate, {
            type: missionTypes.TOGGLE_APPLY_MISSION_REQUEST,
            payload: { missionId: 123 }
        })).toEqual({
            ...initialSate,
            isLoading: true,
        });
    });

    it("should TOGGLE_APPLY_MISSION_REQUEST - ONLY current", () => {
        const state = {
            ...initialSate,
            current: {
                ...initialSate.current,
                data: {
                    ...initialSate.current.data,
                    id: 123
                },
            },
        };
        expect(missionReducer(state, {
            type: missionTypes.TOGGLE_APPLY_MISSION_REQUEST,
            payload: { missionId: 123 }
        })).toEqual({
            ...state,
            isLoading: false,
            current: {
                ...state.current,
                data: {
                    ...state.current.data,
                    id: 123,
                },
                isLoading: true,
            },
        });
    });

    it("should TOGGLE_APPLY_MISSION_SUCCESS - not current", () => {
        const mission = { id: 123, poulay: "man" };
        expect(missionReducer(initialSate, {
            type: missionTypes.TOGGLE_APPLY_MISSION_SUCCESS,
            payload: { mission, replaceCurrent: false }
        })).toEqual({
            ...initialSate,
            byID: initialSate.byID.set(123, mission),
            isLoading: false,
        });
    });

    it("should TOGGLE_APPLY_MISSION_SUCCESS - ONLY current", () => {
        const mission = { id: 123, poulay: "man" };
        const state = {
            ...initialSate,
            current: {
                ...initialSate.current,
                data: {
                    ...initialSate.current.data,
                    id: 123
                },
            },
        };
        expect(missionReducer(state, {
            type: missionTypes.TOGGLE_APPLY_MISSION_SUCCESS,
            payload: { mission, replaceCurrent: true }
        })).toEqual({
            ...state,
            isLoading: false,
            current: {
                ...state.current,
                data: mission,
                isLoading: false,
            },
        });
    });
});
