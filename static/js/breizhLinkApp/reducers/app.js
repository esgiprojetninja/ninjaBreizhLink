import {combineReducers} from "redux";
import url from "./url";
import user from "./user";
import view from "./view";

const app = combineReducers({
    url,
    user,
    view
});

export default app;
