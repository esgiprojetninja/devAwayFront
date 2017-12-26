import React from "react";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { render } from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";

import MainReducer from "./reducers";
import App from "./containers/App";
import API from "./api/mainApi";

function startApp(node) {
    const middlewares = [thunk.withExtraArgument(API)];
    if (process.env.NODE_ENV === "development") {
        middlewares.push(createLogger({ collapsed: true }));
    }

    const store = createStore(
        MainReducer,
        applyMiddleware(...middlewares)
    );
    render(
        <Provider store={store}>
            <BrowserRouter>
                <Route path="/" component={App} />
            </BrowserRouter>
        </Provider>
        ,
        node,
    );
}

export default startApp;
