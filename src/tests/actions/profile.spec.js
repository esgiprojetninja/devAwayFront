/* eslint-env jest */
/* global window */
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
    mockAPI,
    mockAPIWithErrors,
    mockAPIWithServerFailure
} from "../mock/API";

import { SET_SNACK_MSG } from "../../actions/types/snack";
import * as profileTypes from "../../actions/types/profile";
import * as profileActions from "../../actions/profile";

describe("Actions profile", () => {
    let mockStore = null;

    beforeEach(() => {
        mockStore = configureMockStore([thunk.withExtraArgument(mockAPI)]);
        window.localStorage = {
            removeItem: jest.fn()
        };
        global.localStorage = {
            removeItem: jest.fn()
        };
    });

    it("should fetch profiles", async () => {
        const expectedActions = [
            { type: profileTypes.FETCH_PROFILES_REQUEST },
            { type: profileTypes.FETCH_PROFILES_SUCCESS, payload: [] }
        ];
        const store = mockStore();
        await store.dispatch(profileActions.fetchProfiles());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should fetch profiles - API error", async () => {
        const expectedActions = [
            { type: profileTypes.FETCH_PROFILES_REQUEST },
            {
                type: SET_SNACK_MSG,
                payload: {
                    msg: "Failed to refresh profile data",
                    snackDuration: undefined
                }
            },
            { type: profileTypes.FETCH_PROFILES_FAILURE, payload: "Ooops" }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)])();
        await storeError.dispatch(profileActions.fetchProfiles());
        expect(storeError.getActions()).toEqual(expectedActions);
    });

    it("should fetch profiles - Server failure", async () => {
        const expectedActions = [
            { type: profileTypes.FETCH_PROFILES_REQUEST },
            {
                type: SET_SNACK_MSG,
                payload: {
                    msg: "Failed to refresh profile data",
                    snackDuration: undefined
                }
            },
            {
                type: profileTypes.FETCH_PROFILES_FAILURE,
                payload: new Error("gtfo")
            }
        ];
        mockStore = configureMockStore([thunk.withExtraArgument(mockAPIWithServerFailure)]);
        const storeError = mockStore();
        await storeError.dispatch(profileActions.fetchProfiles());
        expect(storeError.getActions()).toEqual(expectedActions);
    });

    it("should savestoreError a profile", async () => {
        const expectedActions = [
            { type: profileTypes.SAVE_PROFILE_REQUEST },
            { type: profileTypes.SAVE_PROFILE_SUCCESS }
        ];
        const store = mockStore({
            profile: {
                current: {}
            }
        });
        await store.dispatch(profileActions.saveProfile());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should save a profile - API error", async () => {
        const expectedActions = [
            { type: profileTypes.SAVE_PROFILE_REQUEST },
            {
                type: SET_SNACK_MSG,
                payload: {
                    msg: "Failed to save profile",
                    snackDuration: undefined
                }
            },
            { type: profileTypes.SAVE_PROFILE_FAILURE, payload: "Won't save" }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)])({
            profile: {
                current: {}
            }
        });
        await storeError.dispatch(profileActions.saveProfile());
        expect(storeError.getActions()).toEqual(expectedActions);
    });

    it("should save a profile - Server failure", async () => {
        const expectedActions = [
            { type: profileTypes.SAVE_PROFILE_REQUEST },
            {
                type: SET_SNACK_MSG,
                payload: {
                    msg: "Failed to save profile",
                    snackDuration: undefined
                }
            },
            {
                type: profileTypes.SAVE_PROFILE_FAILURE,
                payload: new Error("gtfo")
            }
        ];
        const store = configureMockStore([thunk.withExtraArgument(mockAPIWithServerFailure)])({
            profile: {
                current: {}
            }
        });
        await store.dispatch(profileActions.saveProfile());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should delete a profile", async () => {
        const expectedActions = [
            { type: profileTypes.DELETE_PROFILE_REQUEST },
            { type: profileTypes.DELETE_PROFILE_SUCCESS },
            { type: profileTypes.FETCH_PROFILES_REQUEST },
            { type: profileTypes.FETCH_PROFILES_SUCCESS, payload: [] }
        ];
        const store = mockStore();
        await store.dispatch(profileActions.deleteProfile(1000));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should delete a profile - API error", async () => {
        const expectedActions = [
            { type: profileTypes.DELETE_PROFILE_REQUEST },
            {
                type: SET_SNACK_MSG,
                payload: {
                    msg: "Failed to delete profile",
                    snackDuration: undefined
                }
            },
            { type: profileTypes.DELETE_PROFILE_FAILURE, payload: "Couldn't delete" }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)])({
            profile: {
                current: {}
            }
        });
        await storeError.dispatch(profileActions.deleteProfile(1000));
        expect(storeError.getActions()).toEqual(expectedActions);
    });

    it("should delete a profile - Server failure", async () => {
        const expectedActions = [
            { type: profileTypes.DELETE_PROFILE_REQUEST },
            {
                type: SET_SNACK_MSG,
                payload: {
                    msg: "Failed to delete profile",
                    snackDuration: undefined
                }
            },
            {
                type: profileTypes.DELETE_PROFILE_FAILURE,
                payload: new Error("gtfo")
            }
        ];
        const store = configureMockStore([thunk.withExtraArgument(mockAPIWithServerFailure)])({
            profile: {
                current: {}
            }
        });
        await store.dispatch(profileActions.deleteProfile(1000));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should get me", async () => {
        const expectedActions = [
            { type: profileTypes.GET_ME_REQUEST },
            {
                type: profileTypes.GET_ME_SUCCESS,
                payload: {
                    some: "user",
                    id: 1,
                    email: "coucou",
                    username: "azy"
                }
            }
        ];
        const store = mockStore();
        await store.dispatch(profileActions.getMe());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should get me - API error", async () => {
        const expectedActions = [
            { type: profileTypes.GET_ME_REQUEST },
            {
                type: profileTypes.GET_ME_FAILURE,
                payload: "Who are you ?"
            }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)])({
            profile: {
                current: {}
            }
        });
        await storeError.dispatch(profileActions.getMe());
        expect(storeError.getActions()).toEqual(expectedActions);
        expect(global.localStorage.removeItem).toHaveBeenCalled();
    });

    it("should get me - Server failure", async () => {
        const expectedActions = [
            { type: profileTypes.GET_ME_REQUEST },
            {
                type: profileTypes.GET_ME_FAILURE,
                payload: new Error("gtfo")
            }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithServerFailure)])({
            profile: {
                current: {}
            }
        });
        await storeError.dispatch(profileActions.getMe());
        expect(storeError.getActions()).toEqual(expectedActions);
        expect(global.localStorage.removeItem).toHaveBeenCalled();
    });
});
