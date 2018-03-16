/* eslint-env jest */
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
    mockAPI,
    mockAPIWithErrors
} from "../mock/API";

import * as profileTypes from "../../actions/types/profile";
import * as profileActions from "../../actions/profile";

const mockStore = configureMockStore([thunk.withExtraArgument(mockAPI)]);

describe("Actions profile", () => {
    it("should fetch profiles", async () => {
        const expectedActions = [
            { type: profileTypes.FETCH_PROFILES_REQUEST },
            { type: profileTypes.FETCH_PROFILES_SUCCESS, payload: [] }
        ];
        const store = mockStore();
        await store.dispatch(profileActions.fetchProfiles());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should fetch profiles (error)", async () => {
        const expectedActions = [
            { type: profileTypes.FETCH_PROFILES_REQUEST },
            { type: profileTypes.FETCH_PROFILES_FAILURE, payload: "Ooops" }
        ];
        const storeError = configureMockStore([thunk.withExtraArgument(mockAPIWithErrors)])();
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

    it("should save a profile (error)", async () => {
        const expectedActions = [
            { type: profileTypes.SAVE_PROFILE_REQUEST },
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

    it("should delete a profile (error)", async () => {
        const expectedActions = [
            { type: profileTypes.DELETE_PROFILE_REQUEST },
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

    it("should get me (error)", async () => {
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
    });
});
