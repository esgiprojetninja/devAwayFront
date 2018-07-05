import { connect } from "react-redux";
import {
    upsertUser
} from "../actions/user";
import SubscribeBoxComponent from "../ui/SubscribeBox";

export const mapStateToProps = state => state.user;

export const mapDispatchToProps = dispatch => ({
    onSubmit: (data) => {
        const d = new Date().toISOString();
        dispatch(upsertUser({
            roles: 1,
            email: data.email,
            username: data.username,
            password: data.password,
            confirm_password: data.passwordCheck,
            lastName: "",
            firstName: "",
            languages: "en",
            skills: "",
            createdAt: d,
            updatedAt: d
        }));
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
