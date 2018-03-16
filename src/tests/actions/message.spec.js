/* eslint-env jest */
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
    mockAPI,
    mockAPIWithErrors,
    mockAPIWithServerFailure
} from "../mock/API";

import * as messageTypes from "../../actions/types/message";
import * as messageActions from "../../actions/message";

describe("Actions message", () => {
    let mockStore = null;
    beforeEach(() => {
        jest.clearAllMocks();
        mockStore = configureMockStore([thunk.withExtraArgument(mockAPI)]);
    });

    it("should fetch messages", async () => {
        const expectedActions = [
            { type: messageTypes.FETCH_MESSAGES_REQUEST },
            { type: messageTypes.FETCH_MESSAGES_SUCCESS, payload: [] }
        ];
        const store = mockStore();
        await store.dispatch(messageActions.fetchMessages());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should fetch messages - API error", async () => {
        const expectedActions = [
            { type: messageTypes.FETCH_MESSAGES_REQUEST },
            { type: messageTypes.FETCH_MESSAGES_FAILURE, payload: "Ooops" }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)])();
        await storeError.dispatch(messageActions.fetchMessages());
        expect(storeError.getActions()).toEqual(expectedActions);
    });

    it("should fetch messages - Server failure", async () => {
        const expectedActions = [
            { type: messageTypes.FETCH_MESSAGES_REQUEST },
            {
                type: messageTypes.FETCH_MESSAGES_FAILURE,
                payload: new Error("gtfo")
            }
        ];
        mockStore = configureMockStore([thunk.withExtraArgument(mockAPIWithServerFailure)]);
        const storeError = mockStore();
        await storeError.dispatch(messageActions.fetchMessages());
        expect(storeError.getActions()).toEqual(expectedActions);
    });

    it("should savestoreError a message", async () => {
        const expectedActions = [
            { type: messageTypes.SAVE_MESSAGE_REQUEST },
            { type: messageTypes.SAVE_MESSAGE_SUCCESS }
        ];
        const store = mockStore({
            message: {
                current: {}
            }
        });
        await store.dispatch(messageActions.saveMessage());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should save a message - API error", async () => {
        const expectedActions = [
            { type: messageTypes.SAVE_MESSAGE_REQUEST },
            { type: messageTypes.SAVE_MESSAGE_FAILURE, payload: "Won't save" }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)])({
            message: {
                current: {}
            }
        });
        await storeError.dispatch(messageActions.saveMessage());
        expect(storeError.getActions()).toEqual(expectedActions);
    });

    it("should save a message - Server failure", async () => {
        const expectedActions = [
            { type: messageTypes.SAVE_MESSAGE_REQUEST },
            {
                type: messageTypes.SAVE_MESSAGE_FAILURE,
                payload: new Error("gtfo")
            }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithServerFailure)])({
            message: {
                current: {}
            }
        });
        await storeError.dispatch(messageActions.saveMessage());
        expect(storeError.getActions()).toEqual(expectedActions);
    });

    it("should delete a message", async () => {
        const expectedActions = [
            { type: messageTypes.DELETE_MESSAGE_REQUEST },
            { type: messageTypes.DELETE_MESSAGE_SUCCESS },
            { type: messageTypes.FETCH_MESSAGES_REQUEST },
            { type: messageTypes.FETCH_MESSAGES_SUCCESS, payload: [] }
        ];
        const store = mockStore();
        await store.dispatch(messageActions.deleteMessage(1000));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should delete a message - API error", async () => {
        const expectedActions = [
            { type: messageTypes.DELETE_MESSAGE_REQUEST },
            { type: messageTypes.DELETE_MESSAGE_FAILURE, payload: "Couldn't delete" }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)])();
        await storeError.dispatch(messageActions.deleteMessage(1000));
        expect(storeError.getActions()).toEqual(expectedActions);
    });

    it("should delete a message - Server failure", async () => {
        const expectedActions = [
            { type: messageTypes.DELETE_MESSAGE_REQUEST },
            {
                type: messageTypes.DELETE_MESSAGE_FAILURE,
                payload: new Error("gtfo")
            }
        ];
        mockStore = configureMockStore([thunk.withExtraArgument(mockAPIWithServerFailure)]);
        const storeError = mockStore();
        await storeError.dispatch(messageActions.deleteMessage(1000));
        expect(storeError.getActions()).toEqual(expectedActions);
    });
});
