/* eslint-env jest */
import messageReducer from "../../reducers/message";
import * as messageTypes from "../../actions/types/message";

describe("Reducer message", () => {
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
        expect(messageReducer(undefined, {})).toEqual(initialSate);
    });

    it("should FETCH_MESSAGES_REQUEST", () => {
        expect(messageReducer(initialSate, {
            type: messageTypes.FETCH_MESSAGES_REQUEST
        })).toEqual({
            ...initialSate,
            isLoading: true
        });
    });

    it("should FETCH_MESSAGES_SUCCESS", () => {
        const state = {
            ...initialSate,
            isLoading: true
        };
        const byID = new Map();
        byID.set(1, { id: 1, name: "toto" });
        expect(messageReducer(state, {
            type: messageTypes.FETCH_MESSAGES_SUCCESS,
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

    it("should FETCH_MESSAGES_FAILURE", () => {
        const state = {
            ...initialSate,
            isLoading: true
        };
        expect(messageReducer(state, {
            type: messageTypes.FETCH_MESSAGES_FAILURE,
            payload: "Sorry boss :/"
        })).toEqual({
            ...state,
            isLoading: false,
            hasError: true,
            errorText: "Sorry boss :/"
        });
    });

    it("should SAVE_MESSAGE_REQUEST", () => {
        expect(messageReducer(initialSate, {
            type: messageTypes.SAVE_MESSAGE_REQUEST
        })).toEqual({
            ...initialSate,
            current: {
                ...initialSate.current,
                isLoading: true
            }
        });
    });

    it("should SAVE_MESSAGE_SUCCESS", () => {
        const state = {
            ...initialSate,
            current: {
                ...initialSate.current,
                isLoading: true
            }
        };
        expect(messageReducer(state, {
            type: messageTypes.SAVE_MESSAGE_SUCCESS,
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

    it("should SAVE_MESSAGE_FAILURE", () => {
        const state = {
            ...initialSate,
            current: {
                ...initialSate.current,
                isLoading: true
            }
        };
        expect(messageReducer(state, {
            type: messageTypes.SAVE_MESSAGE_FAILURE,
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
