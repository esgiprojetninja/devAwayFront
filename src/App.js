import React from "react";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { render } from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";

import MainReducer from "./reducers";
import App from "./containers/App";

const devawayApp = {
    startApp() {
        const store = createStore(
            MainReducer,
            applyMiddleware(thunk),
        );

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Route path="/" component={App} />
                </BrowserRouter>
            </Provider>
            ,
            document.getElementById("root"), // eslint-disable-line
        );
    },
};

export default devawayApp;
