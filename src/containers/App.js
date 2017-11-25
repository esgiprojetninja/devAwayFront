import { connect } from "react-redux";
import AppComponent from "../ui/App";

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({ // eslint-disable-line
});

const App = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppComponent);

export default App;
