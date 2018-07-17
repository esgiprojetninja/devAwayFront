import * as messageTypes from "./types/message";

const fetchOwnerMessagesRequest = () => ({
    type: messageTypes.FETCH_DISCUSSIONS_OWNER_REQUEST
});
const fetchOwnerMessagesSuccess = discussions => ({
    type: messageTypes.FETCH_DISCUSSIONS_OWNER_SUCCESS,
    payload: { discussions }
});
const fetchOwnerMessagesFailure = msg => ({
    type: messageTypes.FETCH_DISCUSSIONS_OWNER_FAILURE,
    payload: { msg }
});
export const fetchOwnerMessages = () =>
    async (dispatch, getState, API) => {
        dispatch(fetchOwnerMessagesRequest());
        try {
            const res = await API.messageApi.fetchOwnerMessages();
            if (res.hasError) {
                return dispatch(fetchOwnerMessagesFailure(res.message));
            }
            return dispatch(fetchOwnerMessagesSuccess(res));
        } catch (error) {
            return dispatch(fetchOwnerMessagesFailure(error.message));
        }
    };


const fetchTravellerMessagesRequest = () => ({
    type: messageTypes.FETCH_DISCUSSIONS_TRAVELLER_REQUEST
});

const fetchTravellerMessagesSuccess = discussions => ({
    type: messageTypes.FETCH_DISCUSSIONS_TRAVELLER_SUCCESS,
    payload: { discussions }
});

const fetchTravellerMessagesFailure = msg => ({
    type: messageTypes.FETCH_DISCUSSIONS_TRAVELLER_FAILURE,
    payload: { msg }
});
export const fetchTravellerMessages = () =>
    async (dispatch, getState, API) => {
        dispatch(fetchTravellerMessagesRequest());
        try {
            const res = await API.messageApi.fetchTravllererMessages();
            if (res.hasError) {
                return dispatch(fetchTravellerMessagesFailure(res.message));
            }
            return dispatch(fetchTravellerMessagesSuccess(res));
        } catch (error) {
            return dispatch(fetchTravellerMessagesFailure(error.message));
        }
    };


const fetchCurrentDiscussionRequest = () => ({
    type: messageTypes.FETCH_CURRENT_DISCUSSION_REQUEST
});
const fetchCurrentDiscussionSuccess = discussions => ({
    type: messageTypes.FETCH_CURRENT_DISCUSSION_SUCCESS,
    payload: { discussions }
});
const fetchCurrentDiscussionFailure = msg => ({
    type: messageTypes.FETCH_CURRENT_DISCUSSION_FAILURE,
    payload: { msg }
});
export const fetchCurrentDiscussion = userId =>
    async (dispatch, getState, API) => {
        dispatch(fetchCurrentDiscussionRequest());
        try {
            const res = await API.messageApi.fetchDiscussionMessages(userId);
            if (res.hasError) {
                return dispatch(fetchCurrentDiscussionFailure(res.message));
            }
            return dispatch(fetchCurrentDiscussionSuccess(res));
        } catch (error) {
            return dispatch(fetchCurrentDiscussionFailure(error.message));
        }
    };


const fetchAllMessagesRequest = () => ({
    type: messageTypes.FETCH_DISCUSSIONS_ALL_REQUEST
});
const fetchAllMessagesSuccess = discussions => ({
    type: messageTypes.FETCH_DISCUSSIONS_ALL_SUCCESS,
    payload: { discussions }
});
const fetchAllMessagesFailure = msg => ({
    type: messageTypes.FETCH_DISCUSSIONS_ALL_FAILURE,
    payload: { msg }
});
export const fetchAllMessages = () =>
    async (dispatch, getState, API) => {
        dispatch(fetchAllMessagesRequest());
        try {
            const res = await API.messageApi.fetchAllMessages();
            if (res.hasError) {
                return dispatch(fetchAllMessagesFailure(res.message));
            }
            return dispatch(fetchAllMessagesSuccess(res));
        } catch (error) {
            return dispatch(fetchAllMessagesFailure(error.message));
        }
    };

export const setWaitingForConnection = funcName => ({
    type: messageTypes.SET_WAITING_FOR_CONNECTION,
    payload: { funcName },
});

export const fetchCurrentIfConnected = filter =>
    async (dispatch, getState) => {
        const funcName = `fetch${filter.charAt(0).toUpperCase()}${filter.slice(1)}Messages`;
        if (getState().user.isLoggedIn) {
            switch (filter) {
            case "traveller": return (dispatch(fetchTravellerMessages()));
            case "owner": return (dispatch(fetchOwnerMessages()));
            case "all": return (dispatch(fetchAllMessages()));
            default: return (dispatch(fetchAllMessages()));
            }
        }
        return dispatch(setWaitingForConnection(funcName));
    };
