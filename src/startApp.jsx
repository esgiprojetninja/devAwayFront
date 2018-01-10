import React from "react";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { render } from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { MuiThemeProvider } from "material-ui/styles";

import {
    defaultTheme
} from "./styles/theme.js";

import MainReducer from "./reducers";
import Home from "./containers/Home";
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
        <MuiThemeProvider theme={defaultTheme}>
            <Provider store={store}>
                <BrowserRouter>
                    <Route path="/" component={Home} />
                </BrowserRouter>
            </Provider>
        </MuiThemeProvider>
        ,
        node,
    );
}

export default startApp;
