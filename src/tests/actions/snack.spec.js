/* eslint-env jest */
import * as snackActionTypes from "../../actions/types/snack";
import * as snackActions from "../../actions/snack";

describe("Actions snack", () => {
    it("should add a snack", () => {
        const expextedAction = {
            type: snackActionTypes.SET_SNACK_MSG,
            payload: {
                msg: "coucouMsg",
                snackDuration: undefined
            }
        };
        expect(snackActions.displaySnackMsg("coucouMsg")).toEqual(expextedAction);
    });

    it("should remove a snack", () => {
        const expextedAction = {
            type: snackActionTypes.RM_SNACK_MSG
        };
        expect(snackActions.removeSnackMsg()).toEqual(expextedAction);
    });
});
