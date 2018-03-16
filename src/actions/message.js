import * as messageTypes from "./types/message";

const fetchMessagesRequest = () => ({
    type: messageTypes.FETCH_MESSAGES_REQUEST
});

const fetchMessagesSuccess = payload => ({
    type: messageTypes.FETCH_MESSAGES_SUCCESS,
    payload
});

const fetchMessagesFailure = payload => ({
    type: messageTypes.FETCH_MESSAGES_FAILURE,
    payload
});

export function fetchMessages() {
    return (dispatch, getState, API) => {
        dispatch(fetchMessagesRequest());
        return API.messageApi.fetchAll()
            .then(
                (res) => {
                    if (res.hasError) {
                        return dispatch(fetchMessagesFailure(res.message));
                    }
                    return dispatch(fetchMessagesSuccess(res));
                },
                error => dispatch(fetchMessagesFailure(error))
            );
    };
}

const saveMessageRequest = () => ({
    type: messageTypes.SAVE_MESSAGE_REQUEST
});

const saveMessageSuccess = () => ({
    type: messageTypes.SAVE_MESSAGE_SUCCESS
});

const saveMessageFailure = payload => ({
    type: messageTypes.SAVE_MESSAGE_FAILURE,
    payload
});

export const saveMessage = () =>
    (dispatch, getState, API) => {
        dispatch(saveMessageRequest());
        return API.messageApi.createOrUpdate(getState().message.current)
            .then(
                (res) => {
                    if (res.hasError) {
                        return dispatch(saveMessageFailure(res.message));
                    }
                    return dispatch(saveMessageSuccess());
                },
                error => dispatch(saveMessageFailure(error))
            );
    };

const deleteMessageRequest = () => ({
    type: messageTypes.DELETE_MESSAGE_REQUEST
});

const deleteMessageSuccess = () => ({
    type: messageTypes.DELETE_MESSAGE_SUCCESS
});

const deleteMessageFailure = payload => ({
    type: messageTypes.DELETE_MESSAGE_FAILURE,
    payload
});

export function deleteMessage(id) {
    return (dispatch, getState, API) => {
        dispatch(deleteMessageRequest());
        return API.messageApi.deleteItem(id).then((res) => {
            if (res.hasError) {
                return dispatch(deleteMessageFailure(res.message));
            }
            dispatch(deleteMessageSuccess());
            return dispatch(fetchMessages());
        }, err => dispatch(deleteMessageFailure(err)));
    };
}
