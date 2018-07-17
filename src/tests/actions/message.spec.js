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

    it("should fetch owner discussions", async () => {
        const expectedActions = [
            { type: messageTypes.FETCH_DISCUSSIONS_OWNER_REQUEST },
            {
                type: messageTypes.FETCH_DISCUSSIONS_OWNER_SUCCESS,
                payload: { discussions: ["POULAY"] },
            }
        ];
        const store = mockStore();
        await store.dispatch(messageActions.fetchOwnerMessages());
        expect(store.getActions()).toEqual(expectedActions);
    });
    it("should fetch owner discussions - API error", async () => {
        const expectedActions = [
            { type: messageTypes.FETCH_DISCUSSIONS_OWNER_REQUEST },
            {
                type: messageTypes.FETCH_DISCUSSIONS_OWNER_FAILURE,
                payload: { msg: "Ooops" }
            }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)])();
        await storeError.dispatch(messageActions.fetchOwnerMessages());
        expect(storeError.getActions()).toEqual(expectedActions);
    });
    it("should fetch owner discussions - Server failure", async () => {
        const expectedActions = [
            { type: messageTypes.FETCH_DISCUSSIONS_OWNER_REQUEST },
            {
                type: messageTypes.FETCH_DISCUSSIONS_OWNER_FAILURE,
                payload: { msg: "gtfo" }
            }
        ];
        mockStore = configureMockStore([thunk.withExtraArgument(mockAPIWithServerFailure)]);
        const storeError = mockStore();
        await storeError.dispatch(messageActions.fetchOwnerMessages());
        expect(storeError.getActions()).toEqual(expectedActions);
    });


    it("should fetch traveller discussions", async () => {
        const expectedActions = [
            { type: messageTypes.FETCH_DISCUSSIONS_TRAVELLER_REQUEST },
            {
                type: messageTypes.FETCH_DISCUSSIONS_TRAVELLER_SUCCESS,
                payload: { discussions: ["POULAY"] },
            }
        ];
        const store = mockStore();
        await store.dispatch(messageActions.fetchTravellerMessages());
        expect(store.getActions()).toEqual(expectedActions);
    });
    it("should fetch traveller discussions - API error", async () => {
        const expectedActions = [
            { type: messageTypes.FETCH_DISCUSSIONS_TRAVELLER_REQUEST },
            {
                type: messageTypes.FETCH_DISCUSSIONS_TRAVELLER_FAILURE,
                payload: { msg: "Ooops" }
            }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)])();
        await storeError.dispatch(messageActions.fetchTravellerMessages());
        expect(storeError.getActions()).toEqual(expectedActions);
    });
    it("should fetch traveller discussions - Server failure", async () => {
        const expectedActions = [
            { type: messageTypes.FETCH_DISCUSSIONS_TRAVELLER_REQUEST },
            {
                type: messageTypes.FETCH_DISCUSSIONS_TRAVELLER_FAILURE,
                payload: { msg: "gtfo" }
            }
        ];
        mockStore = configureMockStore([thunk.withExtraArgument(mockAPIWithServerFailure)]);
        const storeError = mockStore();
        await storeError.dispatch(messageActions.fetchTravellerMessages());
        expect(storeError.getActions()).toEqual(expectedActions);
    });


    it("should fetch current discussions", async () => {
        const expectedActions = [
            { type: messageTypes.FETCH_CURRENT_DISCUSSION_REQUEST },
            {
                type: messageTypes.FETCH_CURRENT_DISCUSSION_SUCCESS,
                payload: { discussions: ["POULAY"] },
            }
        ];
        const store = mockStore();
        await store.dispatch(messageActions.fetchDiscussion());
        expect(store.getActions()).toEqual(expectedActions);
    });
    it("should fetch current discussions - API error", async () => {
        const expectedActions = [
            { type: messageTypes.FETCH_CURRENT_DISCUSSION_REQUEST },
            {
                type: messageTypes.FETCH_CURRENT_DISCUSSION_FAILURE,
                payload: { msg: "Ooops" }
            }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)])();
        await storeError.dispatch(messageActions.fetchDiscussion());
        expect(storeError.getActions()).toEqual(expectedActions);
    });
    it("should fetch current discussions - Server failure", async () => {
        const expectedActions = [
            { type: messageTypes.FETCH_CURRENT_DISCUSSION_REQUEST },
            {
                type: messageTypes.FETCH_CURRENT_DISCUSSION_FAILURE,
                payload: { msg: "gtfo" }
            }
        ];
        mockStore = configureMockStore([thunk.withExtraArgument(mockAPIWithServerFailure)]);
        const storeError = mockStore();
        await storeError.dispatch(messageActions.fetchDiscussion());
        expect(storeError.getActions()).toEqual(expectedActions);
    });


    it("should toggle waitingForConnection", async () => {
        const expectedActions = [
            { type: messageTypes.TOGGLE_WAITING_FOR_CONNECTION },
        ];
        const store = mockStore();
        await store.dispatch(messageActions.toggleWaitingForConnection());
        expect(store.getActions()).toEqual(expectedActions);
    });
});
