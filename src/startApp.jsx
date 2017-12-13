import React from "react";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { render } from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";

import MainReducer from "./reducers";
import App from "./containers/App";
import {
    fetchAccommodations
} from "./actions/accommodation";

const loggerMiddleware = createLogger();

function startApp(node) {
    const store = createStore(
        MainReducer,
        applyMiddleware(
            thunk,
            loggerMiddleware
        ),
    );

    store.dispatch(fetchAccommodations());
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
