import React from "react";
import * as T from "prop-types";
import { CircularProgress } from "material-ui/Progress";
import { FormControl } from "material-ui/Form";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import TextField from "material-ui/TextField";
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle
} from "material-ui/Dialog";

export default class LogBox extends React.PureComponent {
    static propTypes = {
        isLoading: T.bool.isRequired,
        isLoggedIn: T.bool.isRequired,
        hasError: T.bool.isRequired,
        errorText: T.string.isRequired,
        onSubmit: T.func.isRequired,
        onLogoutClicked: T.func.isRequired
    };

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUsernameChange = this.handleChange.bind(this, "username");
        this.handlePasswordChange = this.handleChange.bind(this, "password");
        this.state = {
            username: "",
            password: "",
            open: false
        };
    }

    handleClickOpen = () => {
        if (!this.props.isLoggedIn) {
            this.setState({ open: true });
        }
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange(property, ev) {
        this.setState({
            [property]: ev.target.value
        });
    }

    handleSubmit(ev) {
        ev.preventDefault();
        const { username, password } = this.state;
        this.props.onSubmit({
            username,
            password
        });
        this.handleClose();
    }

    renderErrors() {
        return this.props.hasError
            ? (
                <Typography>
                    {this.props.errorText}
                </Typography>
            )
            : null;
    }

    renderLoggedBox() {
        return (
            <Button
                onClick={this.props.onLogoutClicked}
                color="contrast"
            >
                Logout
            </Button>
        );
    }

    renderLogBox() {
        return (
            <div>
                <Button className="btn-white" onClick={this.handleClickOpen}>Log in</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-logbox-title"
                >
                    <DialogTitle id="form-logbox-title">Login</DialogTitle>
                    <form
                        onSubmit={this.handleSubmit}
                    >
                        <DialogContent>
                            <FormControl>
                                <TextField
                                    error={this.props.hasError}
                                    type="text"
                                    name="username"
                                    id="username"
                                    margin="normal"
                                    onChange={this.handleUsernameChange}
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    error={this.props.hasError}
                                    type="password"
                                    name="pwd"
                                    id="pwd"
                                    margin="normal"
                                    onChange={this.handlePasswordChange}
                                />
                            </FormControl>
                            {this.renderErrors()}
                        </DialogContent>
                        <DialogActions>
                            <Button
                                type="submit"
                            >
                                Login
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    }

    render() {
        if (this.props.isLoading) {
            return <CircularProgress color="accent" />;
        }
        return this.props.isLoggedIn ? this.renderLoggedBox() : this.renderLogBox();
    }
}
