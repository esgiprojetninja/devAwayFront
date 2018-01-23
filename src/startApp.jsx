import React from "react";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { MuiThemeProvider } from "material-ui/styles";
import Reboot from "material-ui/Reboot";

import {
    defaultTheme
} from "./styles/theme.js";

import MainReducer from "./reducers";
import Home from "./containers/Home";
import Guard from "./containers/Guard";
import Profile from "./containers/Profile";
import Accommodation from "./containers/Accommodation";
import Navbar from "./containers/Navbar";
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
            <Reboot />
            <Provider store={store}>
                <div>
                    <Navbar />
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/guard" component={Guard} />
                            <Route path="/profile" component={Profile} />
                            <Route path="/accommodations" component={Accommodation} />
                        </Switch>
                    </BrowserRouter>
                </div>
            </Provider>
        </MuiThemeProvider>
        ,
        node,
    );
}

export default startApp;
