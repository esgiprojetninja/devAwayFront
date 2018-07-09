import { connect } from "react-redux";
import {
    upsertUser
} from "../actions/user";
import SubscribeBoxComponent from "../ui/SubscribeBox";

export const mapStateToProps = state => state.user;

export const mapDispatchToProps = dispatch => ({
    onSubmit: (data) => {
        dispatch(upsertUser({
            email: data.email,
            userName: data.userName,
            password: data.password,
            c_password: data.passwordCheck,
        }));
    },
    hasError: {
        email: false,
        userName: false,
        password: false,
        passwordCheck: false
    },
    errorText: {
        email: "",
        userName: "",
        password: "",
        passwordCheck: ""
    }
});

const Subscribe = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SubscribeBoxComponent);

export default Subscribe;
