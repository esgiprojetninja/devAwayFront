/* eslint-env jest */
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
    mockAPI,
    mockAPIWithErrors,
    mockAPIWithServerFailure
} from "../mock/API";

import mainReducer from "../../reducers/index";
import {
    UPDATE_CREDENTIALS,
    updateCredentials,
    CHECK_GUARD_REQUEST,
    CHECK_GUARD_SUCCESS,
    CHECK_GUARD_FAILURE,
    checkGuard,
    CREATE_GUARD_REQUEST,
    CREATE_GUARD_SUCCESS,
    CREATE_GUARD_FAILURE,
    createGuard
} from "../../actions/guard";

const mockStore = configureMockStore([thunk.withExtraArgument(mockAPI)]);

describe("Actions guard", () => {
    it("should update credentials", () => {
        const expectedActions = [{
            type: UPDATE_CREDENTIALS,
            payload: {
                property: "email",
                value: "toto@toto.toto"
            }
        }];
        const store = mockStore();
        store.dispatch(updateCredentials("email", "toto@toto.toto"));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should checkGuard", async () => {
        const expectedActions = [
            { type: CHECK_GUARD_REQUEST },
            {
                type: CHECK_GUARD_SUCCESS,
                payload: { token: "prout" }
            }
        ];
        const store = mockStore(mainReducer(undefined, {}));
        await store.dispatch(checkGuard());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should checkGuard - API error", async () => {
        const expectedActions = [
            { type: CHECK_GUARD_REQUEST },
            {
                type: CHECK_GUARD_FAILURE,
                payload: "Auth error"
            }
        ];
        const storeError = configureMockStore(
            [thunk.withExtraArgument(mockAPIWithErrors)]
        )(mainReducer(undefined, {}));
        await storeError.dispatch(checkGuard());
        expect(storeError.getActions()).toEqual(expectedActions);
    });

    it("should checkGuard - Server failure", async () => {
        const expectedActions = [
            { type: CHECK_GUARD_REQUEST },
            {
                type: CHECK_GUARD_FAILURE,
                payload: new Error("gtfo")
            }
        ];
        const storeError = configureMockStore(
            [thunk.withExtraArgument(mockAPIWithServerFailure)]
        )(mainReducer(undefined, {}));
        await storeError.dispatch(checkGuard())
        expect(storeError.getActions()).toEqual(expectedActions);
    });

    it("should createGuard", async () => {
        const expectedActions = [
            { type: CREATE_GUARD_REQUEST },
            {
                type: CREATE_GUARD_SUCCESS,
                payload: {
                    code: 123456
                }
            }
        ];
        const store = mockStore(mainReducer(undefined, {}));
        await store.dispatch(createGuard())
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("should createGuard - API error", async () => {
        const expectedActions = [
            { type: CREATE_GUARD_REQUEST },
            {
                type: CREATE_GUARD_FAILURE,
                payload: "Yoops"
            }
        ];
        const storeError = configureMockStore(
            [thunk.withExtraArgument(mockAPIWithErrors)]
        )(mainReducer(undefined, {}));
        await storeError.dispatch(createGuard());
        expect(storeError.getActions()).toEqual(expectedActions);
    });

    it("should createGuard - Server failure", async () => {
        const expectedActions = [
            { type: CREATE_GUARD_REQUEST },
            {
                type: CREATE_GUARD_FAILURE,
                payload: new Error("gtfo")
            }
        ];
        const storeError = configureMockStore(
            [thunk.withExtraArgument(mockAPIWithServerFailure)]
        )(mainReducer(undefined, {}));
        await storeError.dispatch(createGuard());
        expect(storeError.getActions()).toEqual(expectedActions);
    });
});
