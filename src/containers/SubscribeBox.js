import { connect } from "react-redux";
import {
    addUser
} from "../actions/user";
import SubscribeBoxComponent from "../ui/SubscribeBox";

const mapStateToProps = state => state.user;

const mapDispatchToProps = dispatch => ({
    onSubmit: (data) => {
        const d = new Date().toISOString();
        dispatch(addUser({
            roles: [
                "ROLE_USER"
            ],
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
