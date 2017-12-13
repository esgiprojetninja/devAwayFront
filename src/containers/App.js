import { connect } from "react-redux";
import AppComponent from "../ui/App";

const mapStateToProps = state => state;

const mapDispatchToProps = (): {} => ({});

const App = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppComponent);

export default App;
