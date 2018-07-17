import React from "react";
import { NavLink } from "react-router-dom";
import * as T from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControl from "@material-ui/core/FormControl";
import Card from "@material-ui/core/Card";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Icon from "@material-ui/core/Icon";
import SigninIcon from "react-icons/lib/fa/sign-in";
import UserIcon from "react-icons/lib/fa/user";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { User } from "../propTypes/userType";

const styles = theme => ({
    loginSendBtn: {
        margin: "auto",
        marginLeft: "6px"
    },
    loginDialogTitle: {
        color: theme.palette.primary.dark
    },
    loginDialogTitleSeparator: {
        margin: "auto",
        width: "100%",
        height: "1px",
        display: "block",
        backgroundColor: theme.palette.primary.dark
    },
    userMenuCard: {
        width: "100%",
        height: 155,
        margin: 0,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    userMenuCardTitle: {
        width: "100%",
        margin: theme.spacing.unit,
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        color: theme.palette.primary.light,
    },
});

class LogBox extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUsernameChange = this.handleChange.bind(this, "userName");
        this.handlePasswordChange = this.handleChange.bind(this, "password");
        this.state = {
            userName: "",
            password: "",
            noticedError: false,
            open: false,
            anchorEl: null,
        };
    }

    get classes() {
        return this.props.classes;
    }

    handleUserMenuClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleUserMenuClose = () => {
        this.setState({ anchorEl: null });
    };

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
        const { userName, password } = this.state;
        this.props.onSubmit({
            userName,
            password
        });
        this.handleClose();
    }

    renderAvatar() {
        const img = this.props.data.avatar || null;
        if (img) {
            return (<Avatar
                id="devaway-toolbar-user-avatar"
                alt="Adelle Charles"
                src={img.includes("data:image/") ? img : `data:image/jpeg;base64,${img}`}
                style={{ width: 40, height: 40 }}
            />);
        }
        return (
            <UserIcon size={20} style={{ color: "#fff", fill: "#fff" }} />
        );
    }

    renderLoggedBox() {
        const { anchorEl } = this.state;
        return (
            <div>
                <IconButton
                    id="user-menu-toggler"
                    style={{ position: "relative", marginRight: 10 }}
                    aria-label="User menu"
                    aria-owns={anchorEl ? "user-menu" : null}
                    aria-haspopup="true"
                    onClick={this.handleUserMenuClick}
                >
                    {this.renderAvatar()}
                </IconButton>
                <Menu
                    id="user-menu"
                    anchorEl={anchorEl}
                    open={!!anchorEl}
                    onClose={this.handleUserMenuClose}
                >
                    <Card className={this.classes.userMenuCard}>
                        <Typography variant="headline" className={this.classes.userMenuCardTitle} color="inherit">
                            Hey, {this.props.data.userName}
                        </Typography>
                        <MenuItem onClick={this.handleClickOpen}>
                            <NavLink
                                id="user-account-link"
                                to="/profile"
                            >My account
                            </NavLink>
                        </MenuItem>
                        <MenuItem>
                            <Button
                                id="devaway-user-logout-btn"
                                className="full-width"
                                color="primary"
                                variant="contained"
                                onClick={() => {
                                    this.handleClickOpen();
                                    this.props.onLogoutClicked();
                                }}
                            >Logout
                            </Button>
                        </MenuItem>
                    </Card>
                </Menu>
            </div>
        );
    }

    renderLogBox() {
        return (
            <div>
                <Button id="devaway-logbox-toggler" size="small" className="btn-white" onClick={this.handleClickOpen}><SigninIcon size={30} /></Button>
                <Dialog
                    id="devaway-logbox-dialog"
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-logbox-title"
                >
                    <DialogTitle id="form-logbox-title">
                        <span className={this.classes.loginDialogTitle}>Login</span>
                    </DialogTitle>
                    <div className={this.classes.loginDialogTitleSeparator} />
                    <form
                        onSubmit={this.handleSubmit}
                    >
                        <DialogContent>
                            <FormControl>
                                <InputLabel htmlFor="userName">Username</InputLabel>
                                <Input
                                    error={this.props.hasError && !this.state.noticedError}
                                    type="text"
                                    name="userName"
                                    id="userName"
                                    onChange={this.handleUsernameChange}
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel htmlFor="pwd">Password</InputLabel>
                                <Input
                                    error={this.props.hasError && !this.state.noticedError}
                                    type="password"
                                    label="Password"
                                    name="pwd"
                                    id="pwd"
                                    onChange={this.handlePasswordChange}
                                />
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                type="submit"
                                variant="raised"
                                className={this.classes.loginDialogTitle}
                            >
                                Log in
                                <Icon className={this.classes.loginSendBtn} >send</Icon>
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    }

    render() {
        if (this.props.isLoading) {
            return <CircularProgress color="primary" />;
        }
        if (this.props.isLoggedIn) {
            return this.renderLoggedBox();
        }
        return this.renderLogBox();
    }
}
LogBox.propTypes = {
    isLoading: T.bool.isRequired,
    isLoggedIn: T.bool.isRequired,
    hasError: T.bool.isRequired,
    onSubmit: T.func.isRequired,
    onLogoutClicked: T.func.isRequired,
    data: User.isRequired,
    classes: T.shape({}).isRequired,
};

export default withStyles(styles)(LogBox);
