import * as missionTypes from "../actions/types/mission";
import { remapAccoProps } from "../parsers/entityParsers";

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
                data: {
                    ...payload.mission,
                    accommodation: payload.mission.accommodation
                        && payload.mission.accommodation.id ?
                        remapAccoProps(payload.mission.accommodation)
                        : payload.mission.accommodation
                },
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
    case missionTypes.EDIT_CURRENT_MISSION:
        return {
            ...state,
            current: {
                data: payload.mission,
                isLoading: false
            }
        };
    case missionTypes.FETCH_MISSION_REQUEST:
        return {
            ...state,
            current: {
                ...state.current,
                isLoading: true
            }
        };
    case missionTypes.FETCH_MISSION_SUCCESS:
        return {
            ...state,
            current: {
                ...state.current,
                data: {
                    ...payload.mission,
                    accommodation: payload.mission.accommodation &&
                        payload.mission.accommodation.id ?
                        remapAccoProps(payload.mission.accommodation)
                        : payload.mission.accommodation
                },
                isLoading: false
            }
        };
    case missionTypes.FETCH_MISSION_FAILURE:
        return {
            ...state,
            current: {
                ...state.current,
                data: {},
                isLoading: false
            }
        };
    case missionTypes.TOGGLE_APPLY_MISSION_REQUEST:
        return {
            ...state,
            isLoading: payload.missionId !== state.current.data.id,
            current: {
                ...state.current,
                isLoading: payload.missionId === state.current.data.id,
            }
        };
    case missionTypes.TOGGLE_APPLY_MISSION_FAILURE:
        return {
            ...state,
            isLoading: false,
            current: {
                ...state.current,
                isLoading: false,
            }
        };
    case missionTypes.TOGGLE_APPLY_MISSION_SUCCESS:
        return {
            ...state,
            isLoading: false,
            byID: state.byID.set(payload.mission.id, payload.mission),
            current: {
                ...state.current,
                data: payload.replaceCurrent ? payload.mission : state.current.data,
                isLoading: false,
            }
        };
    default:
        return state;
    }
};

export default mission;
