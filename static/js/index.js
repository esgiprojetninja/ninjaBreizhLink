import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";
import app from "./breizhLinkApp/reducers/app";
import BreizhLinkApp from "./breizhLinkApp/BreizhLinkApp.jsx";

const initialState = {
    user: {
        users: [],
        loading: false
    }
};

let store = createStore(app, initialState);

ReactDOM.render(
    <Provider store={store}>
        <BreizhLinkApp />
    </Provider>,
    document.getElementById("app")
);
