// @flow flow-disable
import { connect } from "react-redux";
import AppComponent from "../ui/App";
import type { StateType } from "../reducers";
import type { User } from "../decls/flowTypes";

export type AppStateType = StateType;

export type AppPropsType = {
    user: User
};

const mapStateToProps = (state: StateType): AppStateType => state;

const mapDispatchToProps = (): {} => ({});

const App = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppComponent);

export default App;
