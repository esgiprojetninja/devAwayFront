/* eslint-env jest */
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
    mockAPI,
    mockAPIWithErrors
} from "../mock/API";

import {
    FETCH_PROFILES_REQUEST,
    FETCH_PROFILES_SUCCESS,
    FETCH_PROFILES_FAILURE,
    fetchProfiles,
    SAVE_PROFILE_REQUEST,
    SAVE_PROFILE_SUCCESS,
    SAVE_PROFILE_FAILURE,
    saveProfile,
    DELETE_PROFILE_REQUEST,
    DELETE_PROFILE_SUCCESS,
    DELETE_PROFILE_FAILURE,
    deleteProfile,
    GET_ME_REQUEST,
    GET_ME_SUCCESS,
    GET_ME_FAILURE,
    getMe
} from "../../actions/profile";

const mockStore = configureMockStore([thunk.withExtraArgument(mockAPI)]);

describe("Actions profile", () => {
    it("should fetch profiles", () => {
        const expectedActions = [
            { type: FETCH_PROFILES_REQUEST },
            { type: FETCH_PROFILES_SUCCESS, payload: [] }
        ];
        const store = mockStore();
        return store.dispatch(fetchProfiles()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("should fetch profiles (error)", () => {
        const expectedActions = [
            { type: FETCH_PROFILES_REQUEST },
            { type: FETCH_PROFILES_FAILURE, payload: "Ooops" }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)])();
        return storeError.dispatch(fetchProfiles()).then(() => {
            expect(storeError.getActions()).toEqual(expectedActions);
        });
    });

    it("should savestoreError a profile", () => {
        const expectedActions = [
            { type: SAVE_PROFILE_REQUEST },
            { type: SAVE_PROFILE_SUCCESS }
        ];
        const store = mockStore({
            profile: {
                current: {}
            }
        });
        return store.dispatch(saveProfile()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("should save a profile (error)", () => {
        const expectedActions = [
            { type: SAVE_PROFILE_REQUEST },
            { type: SAVE_PROFILE_FAILURE, payload: "Won't save" }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)])({
            profile: {
                current: {}
            }
        });
        return storeError.dispatch(saveProfile()).then(() => {
            expect(storeError.getActions()).toEqual(expectedActions);
        });
    });

    it("should delete a profile", () => {
        const expectedActions = [
            { type: DELETE_PROFILE_REQUEST },
            { type: DELETE_PROFILE_SUCCESS },
            { type: FETCH_PROFILES_REQUEST },
            { type: FETCH_PROFILES_SUCCESS, payload: [] }
        ];
        const store = mockStore();
        return store.dispatch(deleteProfile(1000)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("should delete a profile (error)", () => {
        const expectedActions = [
            { type: DELETE_PROFILE_REQUEST },
            { type: DELETE_PROFILE_FAILURE, payload: "Couldn't delete" }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)])({
            profile: {
                current: {}
            }
        });
        return storeError.dispatch(deleteProfile(1000)).then(() => {
            expect(storeError.getActions()).toEqual(expectedActions);
        });
    });

    it("should get me", () => {
        const expectedActions = [
            { type: GET_ME_REQUEST },
            { type: GET_ME_SUCCESS, payload: { some: "user" } }
        ];
        const store = mockStore();
        return store.dispatch(getMe()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("should get me (error)", () => {
        const expectedActions = [
            { type: GET_ME_REQUEST },
            {
                type: GET_ME_FAILURE,
                payload: "Who are you ?"
            }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)])({
            profile: {
                current: {}
            }
        });
        return storeError.dispatch(getMe()).then(() => {
            expect(storeError.getActions()).toEqual(expectedActions);
        });
    });
});
