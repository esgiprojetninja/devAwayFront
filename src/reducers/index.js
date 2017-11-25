// @flow
import { combineReducers } from "redux";
import user from "./user";
import type { UserStateType } from "./user";

export type StateType = {
    user: UserStateType
};

const Main = combineReducers({
    user,
});

export default Main;
