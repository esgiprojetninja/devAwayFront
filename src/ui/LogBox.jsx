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
import Icon from "material-ui/Icon";
import { User } from "../propTypes/userType";
import { defaultTheme } from "../styles/theme";

const styles = {
    loginSendBtn: {
        margin: "auto",
        marginLeft: "6px"
    },
    loginDialog: {
        title: {
            color: defaultTheme.palette.primary.dark
        },
        titleSeparator: {
            margin: "auto",
            width: "100%",
            height: "1px",
            display: "block",
            backgroundColor: defaultTheme.palette.primary.dark
        }
    }
};

export default class LogBox extends React.PureComponent {
    static propTypes = {
        isLoading: T.bool.isRequired,
        isLoggedIn: T.bool.isRequired,
        hasError: T.bool.isRequired,
        error: T.string,
        onSubmit: T.func.isRequired,
        onLogoutClicked: T.func.isRequired,
        data: User.isRequired
    };

    static defaultProps = { error: "" }

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUsernameChange = this.handleChange.bind(this, "username");
        this.handlePasswordChange = this.handleChange.bind(this, "password");
        this.state = {
            username: "",
            password: "",
            noticedError: false,
            open: false
        };
    }

    handleClickOpen = () => {
        if (!this.props.isLoggedIn) {
            this.setState({ open: true });
        }
    };

    handleClose = () => {
        this.setState({ open: false, noticedError: false });
    };

    handleChange(property, ev) {
        this.setState({
            [property]: ev.target.value,
            noticedError: true
        });
    }

    handleSubmit(ev) {
        ev.preventDefault();
        this.setState({ noticedError: false });
        const { username, password } = this.state;
        this.props.onSubmit({
            username,
            password
        });
        this.handleClose();
    }

    renderErrors() {
        return this.props.hasError && !this.state.noticedError
            ? (
                <Typography>
                    {this.props.error}
                </Typography>
            )
            : null;
    }

    renderName() {
        return (
            <Typography color="inherit">
                {this.props.data.username},
            </Typography>
        );
    }

    renderLoggedBox() {
        return (
            <div style={{
                display: "flex",
                alignItems: "center",
                alignContent: "center"
            }}
            >
                {this.renderName()}
                <Button
                    onClick={this.props.onLogoutClicked}
                >
                    Logout
                </Button>
            </div>
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
                    <DialogTitle id="form-logbox-title">
                        <span style={styles.loginDialog.title}>Login</span>
                    </DialogTitle>
                    <div style={styles.loginDialog.titleSeparator} />
                    <form
                        onSubmit={this.handleSubmit}
                    >
                        <DialogContent>
                            <FormControl>
                                <TextField
                                    error={this.props.hasError && !this.state.noticedError}
                                    type="text"
                                    label="Username"
                                    name="username"
                                    id="username"
                                    margin="normal"
                                    onChange={this.handleUsernameChange}
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    error={this.props.hasError && !this.state.noticedError}
                                    type="password"
                                    label="Password"
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
                                variant="raised"
                                style={styles.loginDialog.title}
                            >
                                Log in
                                <Icon style={styles.loginSendBtn} >send</Icon>
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
        if (this.props.isLoggedIn) {
            return this.renderLoggedBox();
        }
        return this.renderLogBox();
    }
}
