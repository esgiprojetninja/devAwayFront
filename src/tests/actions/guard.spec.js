/* eslint-env jest */
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
    mockAPI,
    mockAPIWithErrors
} from "../mock/API";

import mainReducer from "../../reducers/index";
import {
    UPDATE_CREDENTIALS,
    updateCredentials,
    CHECK_GUARD_REQUEST,
    CHECK_GUARD_SUCCESS,
    CHECK_GUARD_FAILURE,
    checkGuard
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

    it("should checkGuard", () => {
        const expectedActions = [
            { type: CHECK_GUARD_REQUEST },
            {
                type: CHECK_GUARD_SUCCESS,
                payload: 123456
            }
        ];
        const store = mockStore(mainReducer(undefined, {}));
        return store.dispatch(checkGuard()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("should checkGuard (error)", () => {
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
        return storeError.dispatch(checkGuard()).then(() => {
            expect(storeError.getActions()).toEqual(expectedActions);
        });
    });
});
