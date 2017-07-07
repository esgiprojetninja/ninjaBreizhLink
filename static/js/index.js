import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import thunkMiddleware from "redux-thunk";
import {createLogger} from "redux-logger";
import {createStore, applyMiddleware} from "redux";
import app from "./breizhLinkApp/reducers/app";
import BreizhLinkApp from "./breizhLinkApp/container/BreizhLinkApp";

const loggerMiddleware = createLogger();

const initialState = {
    user: {
        users: [],
        loading: false,
        error: ""
    },
    view: "url",
    url: {
        urls: [],
        newUrl: {
            value: "",
            password: "",
            usePwd: false
        }
    }
};

let store = createStore(
    app,
    initialState,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

ReactDOM.render(
    <Provider store={store}>
        <BreizhLinkApp />
    </Provider>,
    document.getElementById("app")
);
