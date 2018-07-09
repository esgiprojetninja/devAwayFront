import * as missionTypes from "../actions/types/mission";

const initialSate = {
    data: [],
    byID: new Map(),
    isLoading: false,
    current: {
        data: {},
        isLoading: false
    },
    hasError: false,
    errorText: ""
};

const mission = (state = initialSate, action) => {
    const { payload } = action;
    switch (action.type) {
    case missionTypes.FETCH_MISSIONS_REQUEST:
        return {
            ...state,
            isLoading: true
        };
    case missionTypes.FETCH_MISSIONS_SUCCESS:
        return {
            ...state,
            isLoading: false,
            data: payload.data,
            byID: payload.byID
        };
    case missionTypes.FETCH_MISSIONS_FAILURE:
        return {
            ...state,
            isLoading: false,
            hasError: true,
            errorText: payload
        };
    case missionTypes.SAVE_MISSION_REQUEST:
        console.log("EEEEH FDP");
        return {
            ...state,
            current: {
                ...state.current,
                isLoading: true
            }
        };
    case missionTypes.SAVE_MISSION_SUCCESS:
        return {
            ...state,
            current: {
                data: payload,
                isLoading: false
            }
        };
    case missionTypes.SAVE_MISSION_FAILURE:
        return {
            ...state,
            hasError: true,
            errorText: payload,
            current: {
                ...state.current,
                isLoading: false
            }
        };
    default:
        return state;
    }
};

export default mission;
