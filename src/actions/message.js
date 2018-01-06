export const FETCH_MESSAGES_REQUEST = "FETCH_MESSAGES_REQUEST";
const fetchMessagesRequest = () => ({
    type: FETCH_MESSAGES_REQUEST
});

export const FETCH_MESSAGES_SUCCESS = "FETCH_MESSAGES_SUCCESS";
const fetchMessagesSuccess = payload => ({
    type: FETCH_MESSAGES_SUCCESS,
    payload
});

export const FETCH_MESSAGES_FAILURE = "FETCH_MESSAGES_FAILURE";
const fetchMessagesFailure = payload => ({
    type: FETCH_MESSAGES_FAILURE,
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
                error => console.log(error)
            );
    };
}

export const SAVE_MESSAGE_REQUEST = "SAVE_MESSAGE_REQUEST";
const saveMessageRequest = () => ({
    type: SAVE_MESSAGE_REQUEST
});

export const SAVE_MESSAGE_SUCCESS = "SAVE_MESSAGE_SUCCESS";
const saveMessageSuccess = () => ({
    type: SAVE_MESSAGE_SUCCESS
});

export const SAVE_MESSAGE_FAILURE = "SAVE_MESSAGE_FAILURE";
const saveMessageFailure = payload => ({
    type: SAVE_MESSAGE_FAILURE,
    payload
});

export function saveMessage() {
    return (dispatch, getState, API) => {
        dispatch(saveMessageRequest());
        return API.messageApi.createOrUpdate(getState().message.current)
            .then(
                (res) => {
                    if (res.hasError) {
                        return dispatch(saveMessageFailure(res.message));
                    }
                    return dispatch(saveMessageSuccess());
                },
                error => console.log(error)
            );
    };
}

export const DELETE_MESSAGE_REQUEST = "DELETE_MESSAGE_REQUEST";
const deleteMessageRequest = () => ({
    type: DELETE_MESSAGE_REQUEST
});

export const DELETE_MESSAGE_SUCCESS = "DELETE_MESSAGE_SUCCESS";
const deleteMessageSuccess = () => ({
    type: DELETE_MESSAGE_SUCCESS
});

export const DELETE_MESSAGE_FAILURE = "DELETE_MESSAGE_FAILURE";
const deleteMessageFailure = payload => ({
    type: DELETE_MESSAGE_FAILURE,
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
        });
    };
}
