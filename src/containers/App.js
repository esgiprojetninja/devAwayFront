// @flow flow-disable
import { connect } from "react-redux";
import AppComponent from "../ui/App";
import type { StateType } from "../reducers";

export type AppStateType = StateType;

export type AppPropsType = {};

const mapStateToProps = (state: StateType): AppStateType => state;

const mapDispatchToProps = (dispatch): AppPropsType => ({ // eslint-disable-line
});

const App = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppComponent);

export default App;
