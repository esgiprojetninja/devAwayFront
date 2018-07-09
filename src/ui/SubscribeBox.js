import React from "react";
import * as T from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import FormControl from "@material-ui/core/FormControl";

const passwordInputProps = {
    type: "password"
};

const styles = theme => ({ // eslint-disable-line
});

const initialState = {
    email: "",
    password: "",
    passwordCheck: "",
    userName: "",
    open: false
};

export class SubscribeBox extends React.PureComponent {
    static propTypes = {
        isLoggedIn: T.bool.isRequired,
        isLoading: T.bool.isRequired,
        hasError: T.shape({
            email: T.bool.isRequired,
            userName: T.bool.isRequired,
            password: T.bool.isRequired,
            passwordCheck: T.bool.isRequired
        }).isRequired,
        errorText: T.shape({
            email: T.string.isRequired,
            userName: T.string.isRequired,
            password: T.string.isRequired,
            passwordCheck: T.string.isRequired
        }).isRequired,
        onSubmit: T.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        };

        this.handleEmailChange = this.handleChange.bind(this, "email");
        this.handlePasswordChange = this.handleChange.bind(this, "password");
        this.handlePasswordCheckChange = this.handleChange.bind(this, "passwordCheck");
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.onClose();
        const {
            email,
            userName,
            password,
            passwordCheck
        } = this.state;
        this.props.onSubmit({
            email, userName, password, passwordCheck
        });
        this.setState(initialState);
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
        case "userName": {
            const hasErr = !(value.length >= 5 || value.length > 20);
            this.props.hasError.userName = hasErr;
            this.props.errorText.userName = hasErr ? "Username must be between 5 & 15 characters long" : "";
            return;
        }
        case "password": {
            const hasErr = value.length < 6 || value.length > 20;
            this.props.hasError.password = hasErr;
            this.props.errorText.password = hasErr ? "Password must be between 6 & 20 characters long" : "";
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
                <InputLabel htmlFor="devaway-subscribe-pwd-check">{this.props.hasError.passwordCheck ? this.props.errorText.passwordCheck : "Repeat password"}</InputLabel>
                <Input
                    error={this.props.hasError.passwordCheck}
                    required
                    id="devaway-subscribe-pwd-check"
                    type="password"
                    inputProps={passwordInputProps}
                    name="passwordCheck"
                    margin="dense"
                    onChange={this.handlePasswordCheckChange}
                />
            </FormControl>
        );
    }

    renderPasswordField() {
        return (
            <FormControl>
                <InputLabel htmlFor="devaway-subscribe-pwd">{this.props.hasError.password ? this.props.errorText.password : "Password"}</InputLabel>
                <Input
                    error={this.props.hasError.password}
                    required
                    id="devaway-subscribe-pwd"
                    type="password"
                    inputProps={passwordInputProps}
                    name="password"
                    margin="dense"
                    onChange={this.handlePasswordChange}
                />
            </FormControl>
        );
    }

    renderUserNameField() {
        return (
            <FormControl>
                <InputLabel htmlFor="devaway-subscribe-name">{this.props.hasError.userName ? this.props.errorText.userName : "User name"}</InputLabel>
                <Input
                    error={this.props.hasError.userName}
                    required
                    id="devaway-subscribe-name"
                    type="text"
                    name="userName"
                    multiline
                    rows="2"
                    margin="dense"
                    onChange={(ev) => {
                        this.handleChange("userName", ev);
                    }}
                />
            </FormControl>
        );
    }

    renderEmailField() {
        return (
            <FormControl>
                <InputLabel htmlFor="devaway-subscribe-email">{this.props.hasError.email ? this.props.errorText.email : "Email"}</InputLabel>
                <Input
                    error={this.props.hasError.email}
                    required
                    id="devaway-subscribe-email"
                    label={this.props.hasError.email ? this.props.errorText.email : "Email"}
                    type="email"
                    name="email"
                    multiline
                    fullWidth
                    rows="2"
                    margin="dense"
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
        if (this.props.isLoading) {
            return <CircularProgress color="primary" />;
        }
        return (
            <div>
                <Button
                    onClick={this.toggleBtnHandler}
                    color="inherit"
                >
                Inscription
                </Button>
                {this.renderDialog()}
            </div>
        );
    }
}

export default withStyles(styles)(SubscribeBox);
