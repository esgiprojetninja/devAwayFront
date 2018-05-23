/* global window */
import React from "react";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import { render } from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { MuiThemeProvider } from "material-ui/styles";
import Reboot from "material-ui/Reboot";

import {
    defaultTheme
} from "./styles/theme.js";

import MainReducer from "./reducers";
import API from "./api/mainApi";
import routes from "./routes";


const RouteWithSubRoutes = route => (
    <Route
        exact={route.exact || false}
        path={route.path}
        render={props => (<route.component {...props} routes={route.routes} />)}
    />
);

function startApp(node) {
    const middlewares = [thunk.withExtraArgument(API)];
    let composeEnhancers = compose;
    if (process.env.NODE_ENV === "development") {
        middlewares.push(createLogger({ collapsed: true }));
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line
    }

    const store = createStore(
        MainReducer,
        composeEnhancers(applyMiddleware(...middlewares)),
    );

    const supportsHistory = "pushState" in window.history;

    render(
        <MuiThemeProvider theme={defaultTheme}>
            <Reboot />
            <BrowserRouter basename={routes[0].path} forceRefresh={!supportsHistory} >
                <Provider store={store}>
                    <div className="full-width">
                        {routes.map(route => (<RouteWithSubRoutes key={`${Date.now()}+${route.path}`} {...route} />))}
                    </div>
                </Provider>
            </BrowserRouter>
        </MuiThemeProvider>
        ,
        node,
    );
}

export default startApp;
