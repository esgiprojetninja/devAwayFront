/* eslint-env jest */
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as userActionTypes from "../../actions/types/user";
import * as userActions from "../../actions/user";

const mockStore = configureMockStore([thunk]);

describe("Actions user", () => {
    global.localStorage = {
        removeItem: jest.fn()
    };

    beforeAll(() => {
        process.env.REACT_APP_API_URL = "workaway.api";
    });

    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    it("should logout", () => {
        const expextedAction = {
            type: userActionTypes.LOGOUT,
            payload: {}
        };
        expect(userActions.logout()).toEqual(expextedAction);
    });

    it("should logout", () => {
        console.log(`http://${process.env.REACT_APP_API_URL}/api/login_check`);
        fetchMock.mock(
            `http://${process.env.REACT_APP_API_URL}/api/login_check`,
            {
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: "prout"
                })
            },
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    _username: "toto",
                    _password: "prout"
                })
            }
        );
        const expextedActions = [
            { type: userActionTypes.LOGIN_REQUEST },
            { type: userActionTypes.LOGIN_SUCCESS, payload: { token: "prout" } }
        ];
        const store = mockStore();
        return store.dispatch(userActions.login({
            username: "toto",
            password: "secret"
        })).then(() => {
            console.log(fetchMock.calls());
            expect(store.getActions()).toEqual(expextedActions);
        });
    });
});
