/* eslint-env jest */
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
    mockAPI,
    mockAPIWithErrors,
    mockAPIWithServerFailure
} from "../mock/API";

import {
    FETCH_MESSAGES_REQUEST,
    FETCH_MESSAGES_SUCCESS,
    FETCH_MESSAGES_FAILURE,
    fetchMessages,
    SAVE_MESSAGE_REQUEST,
    SAVE_MESSAGE_SUCCESS,
    SAVE_MESSAGE_FAILURE,
    saveMessage,
    DELETE_MESSAGE_REQUEST,
    DELETE_MESSAGE_SUCCESS,
    DELETE_MESSAGE_FAILURE,
    deleteMessage
} from "../../actions/message";

describe("Actions message", () => {
    let mockStore = null;
    beforeEach(() => {
        jest.clearAllMocks();
        mockStore = configureMockStore([thunk.withExtraArgument(mockAPI)]);
    });

    it("should fetch messages", async () => {
        const expectedActions = [
            { type: FETCH_MESSAGES_REQUEST },
            { type: FETCH_MESSAGES_SUCCESS, payload: [] }
        ];
        const store = mockStore();
        await store.dispatch(fetchMessages());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should fetch messages - API error", async () => {
        const expectedActions = [
            { type: FETCH_MESSAGES_REQUEST },
            { type: FETCH_MESSAGES_FAILURE, payload: "Ooops" }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)])();
        await storeError.dispatch(fetchMessages());
        expect(storeError.getActions()).toEqual(expectedActions);
    });

    it("should fetch messages - Server failure", async () => {
        const expectedActions = [
            { type: FETCH_MESSAGES_REQUEST },
            {
                type: FETCH_MESSAGES_FAILURE,
                payload: new Error("gtfo")
            }
        ];
        mockStore = configureMockStore([thunk.withExtraArgument(mockAPIWithServerFailure)]);
        const storeError = mockStore();
        await storeError.dispatch(fetchMessages());
        expect(storeError.getActions()).toEqual(expectedActions);
    });

    it("should savestoreError a message", async () => {
        const expectedActions = [
            { type: SAVE_MESSAGE_REQUEST },
            { type: SAVE_MESSAGE_SUCCESS }
        ];
        const store = mockStore({
            message: {
                current: {}
            }
        });
        await store.dispatch(saveMessage());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should save a message - API error", async () => {
        const expectedActions = [
            { type: SAVE_MESSAGE_REQUEST },
            { type: SAVE_MESSAGE_FAILURE, payload: "Won't save" }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)])({
            message: {
                current: {}
            }
        });
        await storeError.dispatch(saveMessage());
        expect(storeError.getActions()).toEqual(expectedActions);
    });

    it("should save a message - Server failure", async () => {
        const expectedActions = [
            { type: SAVE_MESSAGE_REQUEST },
            {
                type: SAVE_MESSAGE_FAILURE,
                payload: new Error("gtfo")
            }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithServerFailure)])({
            message: {
                current: {}
            }
        });
        await storeError.dispatch(saveMessage());
        expect(storeError.getActions()).toEqual(expectedActions);
    });

    it("should delete a message", async () => {
        const expectedActions = [
            { type: DELETE_MESSAGE_REQUEST },
            { type: DELETE_MESSAGE_SUCCESS },
            { type: FETCH_MESSAGES_REQUEST },
            { type: FETCH_MESSAGES_SUCCESS, payload: [] }
        ];
        const store = mockStore();
        await store.dispatch(deleteMessage(1000));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should delete a message - API error", async () => {
        const expectedActions = [
            { type: DELETE_MESSAGE_REQUEST },
            { type: DELETE_MESSAGE_FAILURE, payload: "Couldn't delete" }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)])();
        await storeError.dispatch(deleteMessage(1000));
        expect(storeError.getActions()).toEqual(expectedActions);
    });

    it("should delete a message - Server failure", async () => {
        const expectedActions = [
            { type: DELETE_MESSAGE_REQUEST },
            {
                type: DELETE_MESSAGE_FAILURE,
                payload: new Error("gtfo")
            }
        ];
        mockStore = configureMockStore([thunk.withExtraArgument(mockAPIWithServerFailure)]);
        const storeError = mockStore();
        await storeError.dispatch(deleteMessage(1000));
        expect(storeError.getActions()).toEqual(expectedActions);
    });
});
