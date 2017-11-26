// @flow
import React from "react";
import type { AppStateType, AppPropsType } from "../containers/App";

class App extends React.PureComponent<AppPropsType, AppStateType> {
    render(): React$Element<*> {
        return (
            <div>{JSON.stringify(this.props.user)}</div>
        );
    }
}
export default App;
