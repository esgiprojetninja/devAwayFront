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


const fetchDiscussionRequest = () => ({
    type: messageTypes.FETCH_CURRENT_DISCUSSION_REQUEST
});

const fetchDiscussionSuccess = discussions => ({
    type: messageTypes.FETCH_CURRENT_DISCUSSION_SUCCESS,
    payload: { discussions }
});

const fetchDiscussionFailure = msg => ({
    type: messageTypes.FETCH_CURRENT_DISCUSSION_FAILURE,
    payload: { msg }
});

export const fetchDiscussion = userId =>
    async (dispatch, getState, API) => {
        dispatch(fetchDiscussionRequest());
        try {
            const res = await API.messageApi.fetchDiscussionMessages(userId);
            if (res.hasError) {
                return dispatch(fetchDiscussionFailure(res.message));
            }
            return dispatch(fetchDiscussionSuccess(res));
        } catch (error) {
            return dispatch(fetchDiscussionFailure(error.message));
        }
    };
