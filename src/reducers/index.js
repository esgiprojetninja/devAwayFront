import { combineReducers } from "redux";
import user from "./user";
import accommodation from "./accommodation";

const Main = combineReducers({
    accommodation,
    user
});

export default Main;
