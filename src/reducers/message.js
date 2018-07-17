import * as messageTypes from "../actions/types/message";

const initialSate = {
    all: {
        data: [],
        isLoading: false,
        error: "",
    },
    owner: {
        data: [],
        isLoading: false,
        error: "",
    },
    traveller: {
        data: [],
        isLoading: false,
        error: "",
    },
    current: {
        data: [],
        isLoading: false,
        error: "",
    },
    waitingForConnetion: null,
};

const message = (state = initialSate, action) => {
    const { payload } = action;
    switch (action.type) {
    case messageTypes.FETCH_DISCUSSIONS_ALL_REQUEST:
        return {
            ...state,
            all: {
                ...state.all,
                isLoading: true,
            }
        };
    case messageTypes.FETCH_DISCUSSIONS_ALL_SUCCESS:
        return {
            ...state,
            all: {
                ...state.all,
                isLoading: false,
                data: payload.discussions,
            }
        };
    case messageTypes.FETCH_DISCUSSIONS_ALL_FAILURE:
        return {
            ...state,
            all: {
                ...state.all,
                isLoading: false,
                error: payload.msg,
            }
        };
    case messageTypes.FETCH_DISCUSSIONS_OWNER_REQUEST:
        return {
            ...state,
            owner: {
                ...state.owner,
                isLoading: true,
            }
        };
    case messageTypes.FETCH_DISCUSSIONS_OWNER_SUCCESS:
        return {
            ...state,
            owner: {
                ...state.owner,
                isLoading: false,
                data: payload.discussions,
            }
        };
    case messageTypes.FETCH_DISCUSSIONS_OWNER_FAILURE:
        return {
            ...state,
            owner: {
                ...state.owner,
                isLoading: false,
                error: payload.msg,
            }
        };
    case messageTypes.FETCH_DISCUSSIONS_TRAVELLER_REQUEST:
        return {
            ...state,
            traveller: {
                ...state.traveller,
                isLoading: true,
            }
        };
    case messageTypes.FETCH_DISCUSSIONS_TRAVELLER_SUCCESS:
        return {
            ...state,
            traveller: {
                ...state.traveller,
                isLoading: false,
                data: payload.discussions,
            }
        };
    case messageTypes.FETCH_DISCUSSIONS_TRAVELLER_FAILURE:
        return {
            ...state,
            traveller: {
                ...state.traveller,
                isLoading: false,
                error: payload.msg,
            }
        };
    case messageTypes.FETCH_CURRENT_DISCUSSION_REQUEST:
        return {
            ...state,
            current: {
                ...state.current,
                isLoading: true,
            }
        };
    case messageTypes.FETCH_CURRENT_DISCUSSION_SUCCESS:
        return {
            ...state,
            current: {
                ...state.current,
                isLoading: false,
                data: payload.discussions,
            }
        };
    case messageTypes.FETCH_CURRENT_DISCUSSION_FAILURE:
        return {
            ...state,
            current: {
                ...state.current,
                isLoading: false,
                error: payload.msg,
            }
        };
    case messageTypes.SET_WAITING_FOR_CONNECTION:
        return {
            ...state,
            waitingForConnetion: payload.funcName
        };
    default:
        return state;
    }
};

export default message;
