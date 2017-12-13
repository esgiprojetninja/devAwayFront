import { connect } from "react-redux";
import {
    login
} from "../actions/user";
import LogBoxComponent from "../ui/LogBox.jsx";

const mapStateToProps = state => (state.user);

const mapDispatchToProps = dispatch => ({
    onSubmit: (data) => {
        dispatch(login(data));
    }
});

const LogBox = connect(
    mapStateToProps,
    mapDispatchToProps,
)(LogBoxComponent);

export default LogBox;
