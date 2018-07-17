import * as T from "prop-types";

export const messagesObj = {
    data: T.shape({
        messages: T.arrayOf(T.shape({
            id: T.number.isRequired,
            from: T.number.isRequired,
            to: T.number.isRequired,
            content: T.string.isRequired,
            created_at: T.string.isRequired,
            updated_at: T.string.isRequired,
        })),
        users: T.arrayOf(T.shape({
            id: T.number.isRequired,
            isActive: T.number.isRequired,
            avatar: T.string.isRequired,
            userName: T.string.isRequired,
        })),
    }).isRequired,
    potentialUsers: T.arrayOf(T.any),
    isLoading: T.bool.isRequired,
    error: T.string.isRequired,
};

export const messageReducerShape = {
    all: T.shape(messagesObj).isRequired,
    owner: T.shape(messagesObj).isRequired,
    traveller: T.shape(messagesObj).isRequired,
    current: T.shape({
        ...messagesObj,
        newMsg: T.string.isRequired,
    }).isRequired,
    waitingForConnetion: T.string,
};

export const messageReducerPropTypes = T.shape(messageReducerShape);
