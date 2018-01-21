import React from "react";
import * as T from "prop-types";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle
} from "material-ui/Dialog";
import { FormControl } from "material-ui/Form";

export default class SubscribeBox extends React.PureComponent {
    static propTypes = {
        isLoggedIn: T.bool.isRequired,
        hasError: T.shape({
            email: T.bool.isRequired,
            username: T.bool.isRequired,
            password: T.bool.isRequired,
            passwordCheck: T.bool.isRequired
        }).isRequired,
        errorText: T.shape({
            email: T.string.isRequired,
            username: T.string.isRequired,
            password: T.string.isRequired,
            passwordCheck: T.string.isRequired
        }).isRequired,
        onSubmit: T.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            passwordCheck: "",
            username: "",
            open: false
        };

        this.handleEmailChange = this.handleChange.bind(this, "email");
        this.handlePasswordChange = this.handleChange.bind(this, "password");
        this.handlePasswordCheckChange = this.handleChange.bind(this, "passwordCheck");
        this.handleUsernameChange = this.handleChange.bind(this, "username");
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {
            email,
            username,
            password,
            passwordCheck
        } = this.state;
        this.props.onSubmit({
            email, username, password, passwordCheck
        });
    }

    onClose = () => {
        this.setState({ open: false });
    };

    toggleBtnHandler = () => {
        this.setState({
            open: !this.state.open
        });
    }

    handleChange(property, ev) {
        console.log("coucou fdp", property, ev.target.value);
        let { value } = ev.target;
        value = value.trim();
        this.setState({
            [property]: value
        });
        switch (property) {
        case "email": {
            const hasErr = !(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(value));
            this.props.hasError.email = hasErr;
            this.props.errorText.email = hasErr ? "Wrong email format" : "";
            return;
        }
        case "username": {
            const hasErr = !(value.length >= 5 && value.length <= 15);
            this.props.hasError.username = hasErr;
            this.props.errorText.username = hasErr ? "Username must be between 5 & 15 characters long" : "";
            return;
        }
        case "password": {
            const hasErr = !(value.length >= 5 && value.length <= 50);
            this.props.hasError.password = hasErr;
            this.props.errorText.password = hasErr ? "Password must be between 5 & 50 characters long" : "";
            return;
        }
        case "passwordCheck": {
            const hasErr = !(this.state.password === value);
            this.props.hasError.passwordCheck = hasErr;
            this.props.errorText.passwordCheck = hasErr ? "Passwords don't match" : "";
            break;
        }
        default: break;
        }
    }

    renderPasswordCheckField() {
        return (
            <FormControl>
                <TextField
                    error={this.props.hasError.passwordCheck}
                    label={this.props.hasError.passwordCheck ? this.props.errorText.passwordCheck : "Repeat password"}
                    type="password"
                    name="passwordCheck"
                    margin="normal"
                    onChange={this.handlePasswordCheckChange}
                />
            </FormControl>
        );
    }

    renderPasswordField() {
        return (
            <FormControl>
                <TextField
                    error={this.props.hasError.password}
                    label={this.props.hasError.password ? this.props.errorText.password : "Password"}
                    type="password"
                    name="password"
                    margin="normal"
                    onChange={this.handlePasswordChange}
                />
            </FormControl>
        );
    }

    renderUserNameField() {
        return (
            <FormControl>
                <TextField
                    error={this.props.hasError.username}
                    label={this.props.hasError.username ? this.props.errorText.username : "User name"}
                    type="text"
                    name="userName"
                    margin="normal"
                    onChange={this.handleUserNameChange}
                />
            </FormControl>
        );
    }

    renderEmailField() {
        return (
            <FormControl>
                <TextField
                    error={this.props.hasError.email}
                    label={this.props.hasError.email ? this.props.errorText.email : "Email"}
                    type="email"
                    name="email"
                    margin="normal"
                    onChange={this.handleEmailChange}
                />
            </FormControl>
        );
    }

    renderDialogContent() {
        return (
            <DialogContent>
                {this.renderEmailField()}
                {this.renderUserNameField()}
                {this.renderPasswordField()}
                {this.renderPasswordCheckField()}
            </DialogContent>
        );
    }

    renderDialog() {
        return (
            <Dialog
                open={this.state.open}
                onClose={this.onClose}
                aria-labelledby="form-inscription-title"
            >
                <DialogTitle id="form-inscription-title">Inscription</DialogTitle>
                <form
                    onSubmit={this.onSubmit}
                >
                    {this.renderDialogContent()}
                    <DialogActions>
                        <Button
                            type="submit"
                        >
                            Send
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }

    render() {
        if (this.props.isLoggedIn) {
            return null;
        }
        return (
            <div>
                <Button
                    onClick={this.toggleBtnHandler}
                    color="contrast"
                >
                Inscription
                </Button>
                {this.renderDialog()}
            </div>
        );
    }
}
