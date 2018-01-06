/* eslint-env jest */
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
    mockAPI,
    mockAPIWithErrors
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

const mockStore = configureMockStore([thunk.withExtraArgument(mockAPI)]);

describe("Actions message", () => {
    it("should fetch messages", () => {
        const expectedActions = [
            { type: FETCH_MESSAGES_REQUEST },
            { type: FETCH_MESSAGES_SUCCESS, payload: [] }
        ];
        const store = mockStore();
        return store.dispatch(fetchMessages()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("should fetch messages (error)", () => {
        const expectedActions = [
            { type: FETCH_MESSAGES_REQUEST },
            { type: FETCH_MESSAGES_FAILURE, payload: "Ooops" }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)])();
        return storeError.dispatch(fetchMessages()).then(() => {
            expect(storeError.getActions()).toEqual(expectedActions);
        });
    });

    it("should savestoreError a message", () => {
        const expectedActions = [
            { type: SAVE_MESSAGE_REQUEST },
            { type: SAVE_MESSAGE_SUCCESS }
        ];
        const store = mockStore({
            message: {
                current: {}
            }
        });
        return store.dispatch(saveMessage()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("should save a message (error)", () => {
        const expectedActions = [
            { type: SAVE_MESSAGE_REQUEST },
            { type: SAVE_MESSAGE_FAILURE, payload: "Won't save" }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)])({
            message: {
                current: {}
            }
        });
        return storeError.dispatch(saveMessage()).then(() => {
            expect(storeError.getActions()).toEqual(expectedActions);
        });
    });

    it("should delete a message", () => {
        const expectedActions = [
            { type: DELETE_MESSAGE_REQUEST },
            { type: DELETE_MESSAGE_SUCCESS },
            { type: FETCH_MESSAGES_REQUEST },
            { type: FETCH_MESSAGES_SUCCESS, payload: [] }
        ];
        const store = mockStore();
        return store.dispatch(deleteMessage(1000)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("should delete a message (error)", () => {
        const expectedActions = [
            { type: DELETE_MESSAGE_REQUEST },
            { type: DELETE_MESSAGE_FAILURE, payload: "Couldn't delete" }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)])({
            message: {
                current: {}
            }
        });
        return storeError.dispatch(deleteMessage(1000)).then(() => {
            expect(storeError.getActions()).toEqual(expectedActions);
        });
    });
});
