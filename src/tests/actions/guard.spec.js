/* eslint-env jest */
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
    mockAPI,
    mockAPIWithErrors,
    mockAPIWithServerFailure
} from "../mock/API";

import mainReducer from "../../reducers/index";
import * as guardTypes from "../../actions/types/guard";
import * as guardActions from "../../actions/guard";

const mockStore = configureMockStore([thunk.withExtraArgument(mockAPI)]);

describe("Actions guard", () => {
    it("should update credentials", () => {
        const expectedActions = [{
            type: guardTypes.UPDATE_CREDENTIALS,
            payload: {
                property: "email",
                value: "toto@toto.toto"
            }
        }];
        const store = mockStore();
        store.dispatch(guardActions.updateCredentials("email", "toto@toto.toto"));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should checkGuard", async () => {
        const expectedActions = [
            { type: guardTypes.CHECK_GUARD_REQUEST },
            {
                type: guardTypes.CHECK_GUARD_SUCCESS,
                payload: { token: "prout" }
            }
        ];
        const store = mockStore(mainReducer(undefined, {}));
        await store.dispatch(guardActions.checkGuard());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should checkGuard - API error", async () => {
        const expectedActions = [
            { type: guardTypes.CHECK_GUARD_REQUEST },
            {
                type: guardTypes.CHECK_GUARD_FAILURE,
                payload: "Auth error"
            }
        ];
        const storeError = configureMockStore(
            [thunk.withExtraArgument(mockAPIWithErrors)]
        )(mainReducer(undefined, {}));
        await storeError.dispatch(guardActions.checkGuard());
        expect(storeError.getActions()).toEqual(expectedActions);
    });

    it("should checkGuard - Server failure", async () => {
        const expectedActions = [
            { type: guardTypes.CHECK_GUARD_REQUEST },
            {
                type: guardTypes.CHECK_GUARD_FAILURE,
                payload: new Error("gtfo")
            }
        ];
        const storeError = configureMockStore(
            [thunk.withExtraArgument(mockAPIWithServerFailure)]
        )(mainReducer(undefined, {}));
        await storeError.dispatch(guardActions.checkGuard());
        expect(storeError.getActions()).toEqual(expectedActions);
    });

    it("should createGuard", async () => {
        const expectedActions = [
            { type: guardTypes.CREATE_GUARD_REQUEST },
            {
                type: guardTypes.CREATE_GUARD_SUCCESS,
                payload: {
                    code: 123456
                }
            }
        ];
        const store = mockStore(mainReducer(undefined, {}));
        await store.dispatch(guardActions.createGuard());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should createGuard - API error", async () => {
        const expectedActions = [
            { type: guardTypes.CREATE_GUARD_REQUEST },
            {
                type: guardTypes.CREATE_GUARD_FAILURE,
                payload: "Yoops"
            }
        ];
        const storeError = configureMockStore(
            [thunk.withExtraArgument(mockAPIWithErrors)]
        )(mainReducer(undefined, {}));
        await storeError.dispatch(guardActions.createGuard());
        expect(storeError.getActions()).toEqual(expectedActions);
    });

    it("should createGuard - Server failure", async () => {
        const expectedActions = [
            { type: guardTypes.CREATE_GUARD_REQUEST },
            {
                type: guardTypes.CREATE_GUARD_FAILURE,
                payload: new Error("gtfo")
            }
        ];
        const storeError = configureMockStore(
            [thunk.withExtraArgument(mockAPIWithServerFailure)]
        )(mainReducer(undefined, {}));
        await storeError.dispatch(guardActions.createGuard());
        expect(storeError.getActions()).toEqual(expectedActions);
    });
});
