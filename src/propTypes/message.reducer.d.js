import * as T from "prop-types";

export const messagesObj = {
    data: T.arrayOf(T.any).isRequired,
    isLoading: T.bool.isRequired,
    error: T.string.isRequired,
};

export const messageReducerShape = {
    all: T.shape(messagesObj).isRequired,
    owner: T.shape(messagesObj).isRequired,
    traveller: T.shape(messagesObj).isRequired,
    current: T.shape(messagesObj).isRequired,
    waitingForConnetion: T.string,
};

export const messageReducerPropTypes = T.shape(messageReducerShape);
