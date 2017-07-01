import {combineReducers} from "redux";
import user from "./user";
import view from "./view";

const app = combineReducers({
    user,
    view
});

export default app;
