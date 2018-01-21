import { connect } from "react-redux";
import {
    addUser
} from "../actions/user";
import SubscribeBoxComponent from "../ui/SubscribeBox";

const mapStateToProps = state => state.user;

const mapDispatchToProps = dispatch => ({
    onSubmit: (data) => {
        dispatch(addUser(data));
    },
    hasError: {
        email: false,
        username: false,
        password: false,
        passwordCheck: false
    },
    errorText: {
        email: "",
        username: "",
        password: "",
        passwordCheck: ""
    }
});

const Subscribe = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SubscribeBoxComponent);

export default Subscribe;
