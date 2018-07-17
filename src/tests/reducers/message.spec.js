/* eslint-env jest */
import messageReducer from "../../reducers/message";
import * as messageTypes from "../../actions/types/message";

describe("Reducer message", () => {
    const initialSate = {
        owner: {
            data: [],
            isLoading: false,
            error: "",
        },
        traveller: {
            data: [],
            isLoading: false,
            error: "",
        },
        current: {
            data: [],
            isLoading: false,
            error: "",
        },
        waitingForConnetion: false,
    };

    it("should return initialSate", () => {
        expect(messageReducer(undefined, {})).toEqual(initialSate);
    });

    it("should FETCH_DISCUSSIONS_OWNER_REQUEST", () => {
        expect(messageReducer(initialSate, {
            type: messageTypes.FETCH_DISCUSSIONS_OWNER_REQUEST
        })).toEqual({
            ...initialSate,
            owner: {
                ...initialSate.owner,
                isLoading: true,
            }
        });
    });

    it("should FETCH_DISCUSSIONS_OWNER_SUCCESS", () => {
        expect(messageReducer(initialSate, {
            type: messageTypes.FETCH_DISCUSSIONS_OWNER_SUCCESS,
            payload: { discussions: "POULAY" }
        })).toEqual({
            ...initialSate,
            owner: {
                ...initialSate.owner,
                isLoading: false,
                data: "POULAY"
            }
        });
    });

    it("should FETCH_DISCUSSIONS_OWNER_FAILURE", () => {
        expect(messageReducer(initialSate, {
            type: messageTypes.FETCH_DISCUSSIONS_OWNER_FAILURE,
            payload: { msg: "POULAY" }
        })).toEqual({
            ...initialSate,
            owner: {
                ...initialSate.owner,
                isLoading: false,
                error: "POULAY"
            }
        });
    });

    it("should FETCH_DISCUSSIONS_TRAVELLER_REQUEST", () => {
        expect(messageReducer(initialSate, {
            type: messageTypes.FETCH_DISCUSSIONS_TRAVELLER_REQUEST
        })).toEqual({
            ...initialSate,
            traveller: {
                ...initialSate.traveller,
                isLoading: true,
            }
        });
    });

    it("should FETCH_DISCUSSIONS_TRAVELLER_SUCCESS", () => {
        expect(messageReducer(initialSate, {
            type: messageTypes.FETCH_DISCUSSIONS_TRAVELLER_SUCCESS,
            payload: { discussions: "POULAY" }
        })).toEqual({
            ...initialSate,
            traveller: {
                ...initialSate.traveller,
                isLoading: false,
                data: "POULAY"
            }
        });
    });

    it("should FETCH_DISCUSSIONS_TRAVELLER_FAILURE", () => {
        expect(messageReducer(initialSate, {
            type: messageTypes.FETCH_DISCUSSIONS_TRAVELLER_FAILURE,
            payload: { msg: "POULAY" }
        })).toEqual({
            ...initialSate,
            traveller: {
                ...initialSate.traveller,
                isLoading: false,
                error: "POULAY"
            }
        });
    });

    it("should FETCH_CURRENT_DISCUSSION_REQUEST", () => {
        expect(messageReducer(initialSate, {
            type: messageTypes.FETCH_CURRENT_DISCUSSION_REQUEST
        })).toEqual({
            ...initialSate,
            current: {
                ...initialSate.current,
                isLoading: true,
            }
        });
    });

    it("should FETCH_CURRENT_DISCUSSION_SUCCESS", () => {
        expect(messageReducer(initialSate, {
            type: messageTypes.FETCH_CURRENT_DISCUSSION_SUCCESS,
            payload: { discussions: "POULAY" }
        })).toEqual({
            ...initialSate,
            current: {
                ...initialSate.current,
                isLoading: false,
                data: "POULAY"
            }
        });
    });

    it("should FETCH_CURRENT_DISCUSSION_FAILURE", () => {
        expect(messageReducer(initialSate, {
            type: messageTypes.FETCH_CURRENT_DISCUSSION_FAILURE,
            payload: { msg: "POULAY" }
        })).toEqual({
            ...initialSate,
            current: {
                ...initialSate.current,
                isLoading: false,
                error: "POULAY"
            }
        });
    });

    it("should TOGGLE_WAITING_FOR_CONNECTION", () => {
        expect(messageReducer(initialSate, {
            type: messageTypes.TOGGLE_WAITING_FOR_CONNECTION,
        })).toEqual({
            ...initialSate,
            waitingForConnetion: true,
        });
    });
});
