/* eslint-env jest */
import snackReducer from "../../reducers/snack";
import {
    RM_SNACK_MSG,
    SET_SNACK_MSG
} from "../../actions/types/snack";

describe("Reducer SNACK", () => {
    const initialSate = {
        hasSnack: false,
        snackText: "",
        snackQueue: [],
        snackDuration: 4000
    };

    it("should return initialSate", () => {
        expect(snackReducer(undefined, {})).toEqual(initialSate);
    });

    it("should dispatch SET_SNACK_MSG", () => {
        const payload = {
            msg: "coucou",
            snackDuration: 3000
        };
        expect(snackReducer(initialSate, {
            type: SET_SNACK_MSG,
            payload
        })).toEqual({
            ...initialSate,
            snackText: "coucou",
            hasSnack: true,
            snackDuration: 3000
        });
    });

    it("should dispatch SET_SNACK_MSG with default snackDuration", () => {
        const payload = {
            msg: "coucou"
        };
        expect(snackReducer(initialSate, {
            type: SET_SNACK_MSG,
            payload
        })).toEqual({
            ...initialSate,
            snackText: "coucou",
            hasSnack: true,
            snackDuration: initialSate.snackDuration
        });
    });

    it("should dispatch an additionnal SET_SNACK_MSG", () => {
        const payload = {
            msg: "coucou 2",
            snackDuration: 9000
        };
        const state = {
            snackQueue: [],
            snackText: "coucou",
            hasSnack: true,
            snackDuration: 3000
        };
        expect(snackReducer(state, {
            type: SET_SNACK_MSG,
            payload

        })).toEqual({
            snackText: "coucou",
            hasSnack: true,
            snackQueue: [{
                snackText: payload.msg,
                snackDuration: payload.snackDuration
            }],
            snackDuration: 3000
        });
    });

    it("should dispatch an additionnal SET_SNACK_MSG with default snackDuration in queue", () => {
        const payload = {
            msg: "coucou 2"
        };
        const state = {
            snackQueue: [],
            snackText: "coucou",
            hasSnack: true,
            snackDuration: 3000
        };
        expect(snackReducer(state, {
            type: SET_SNACK_MSG,
            payload

        })).toEqual({
            snackText: "coucou",
            hasSnack: true,
            snackQueue: [{
                snackText: payload.msg,
                snackDuration: initialSate.snackDuration
            }],
            snackDuration: 3000
        });
    });

    it("should dispatch RM_SNACK_MSG, reseting the state", () => {
        expect(snackReducer({
            snackText: "coucou",
            hasSnack: true,
            snackDuration: 3000,
            snackQueue: []
        }, {
            type: RM_SNACK_MSG
        })).toEqual({
            hasSnack: false,
            snackText: "",
            snackQueue: [],
            snackDuration: 4000
        });
    });

    it("should dispatch RM_SNACK_MSG, deleting the displayed snack", () => {
        const payload = {
            msg: "coucou 2",
            snackDuration: 9000
        };
        const state = {
            ...initialSate,
            snackText: "coucou",
            hasSnack: true,
            snackQueue: [{
                snackText: payload.msg,
                snackDuration: payload.snackDuration
            }],
            snackDuration: 3000
        };
        expect(snackReducer(state, {
            type: RM_SNACK_MSG
        })).toEqual({
            ...state,
            snackQueue: [],
            hasSnack: true,
            snackText: payload.msg,
            snackDuration: payload.snackDuration
        });
    });
});
