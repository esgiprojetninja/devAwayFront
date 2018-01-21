/* eslint-env jest */
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
    mockAPI,
    mockAPIWithErrors
} from "../mock/API";

import mainReducer from "../../reducers/index";

import {
    FETCH_ACCOMMODATIONS_REQUEST,
    FETCH_ACCOMMODATIONS_SUCCESS,
    FETCH_ACCOMMODATIONS_FAILURE,
    fetchAccommodationsWithoutAuth
} from "../../actions/accommodation";

const mockStore = configureMockStore([thunk.withExtraArgument(mockAPI)]);

it("should fetchAccommodationsWithoutAuth", () => {
    const expectedActions = [
        { type: FETCH_ACCOMMODATIONS_REQUEST },
        {
            type: FETCH_ACCOMMODATIONS_SUCCESS,
            payload: []
        }
    ];
    const store = mockStore(mainReducer(undefined, {}));
    return store.dispatch(fetchAccommodationsWithoutAuth()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
    });
});

it("should fetchAccommodationsWithoutAuth (error)", () => {
    const expectedActions = [
        { type: FETCH_ACCOMMODATIONS_REQUEST },
        {
            type: FETCH_ACCOMMODATIONS_FAILURE,
            payload: "Naupe !"
        }
    ];
    const storeError = configureMockStore(
        [thunk.withExtraArgument(mockAPIWithErrors)]
    )(mainReducer(undefined, {}));
    return storeError.dispatch(fetchAccommodationsWithoutAuth()).then(() => {
        expect(storeError.getActions()).toEqual(expectedActions);
    });
});
