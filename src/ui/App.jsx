// @flow
import * as React from "react";
import type { AppStateType, AppPropsType } from "../containers/App";

import Navbar from "./Navbar.jsx";

export default class App extends React.PureComponent<AppPropsType, AppStateType> {
    render(): React.Element<*> {
        return (
            <div>
                <Navbar />
                <div>{JSON.stringify(this.props.user)}</div>
            </div>
        );
    }
}
