import * as React from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import * as T from "prop-types";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import { withStyles } from "material-ui/styles";
import IconButton from "material-ui/IconButton";
import Menu, { MenuItem } from "material-ui/Menu";
import MenuIcon from "material-ui-icons/Menu";
import MoreVertIcon from "material-ui-icons/MoreVert";

import LogBox from "../containers/LogBox";
import SubscribeBox from "../containers/SubscribeBox";
import AccommodationCreation from "../containers/AccommodationCreation";

const ITEM_HEIGHT = 48;

export class NavBar extends React.PureComponent {
    state = {
        open: false,
        openUserMenuEl: null
    };

    toggleOpen(open) {
        this.setState({
            open: !open
        });
    }

    handleUserMenuClick = (ev) => {
        this.setState({
            openUserMenuEl: ev.currentTarget
        });
    }
    handleUserMenuClose = () => {
        this.setState({
            openUserMenuEl: null
        });
    }

    renderUserMenu() {
        if (!this.props.user.isLoggedIn) return null;
        return (
            <Router>
                <Menu
                    id="long-menu"
                    anchorEl={this.state.openUserMenuEl}
                    open={!!this.state.openUserMenuEl}
                    onClose={this.handleUserMenuClose}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: 200
                        }
                    }}
                >
                    <MenuItem
                        key="/accommodations"
                        selected={false}
                        onClick={this.handleUserMenuClose}
                    >
                        <NavLink
                            to="/accommodations"
                            onClick={() => {
                                this.context.router.push("/accommodations");
                            }}
                        >
                            Accommodations
                        </NavLink>
                    </MenuItem>
                    <AccommodationCreation />
                </Menu>
            </Router>
        );
    }

    renderMenuToggler() {
        if (!this.props.user.isLoggedIn) return null;
        return (
            <IconButton
                aria-label="More"
                aria-haspopup="true"
                aria-owns={this.state.openUserMenuEl ? "long-menu" : null}
                color="inherit"
                onClick={this.handleUserMenuClick}
            >
                <MoreVertIcon />
            </IconButton>
        );
    }

    render() {
        const { classes } = this.props;
        const navbarClasses = [
            classes.navStyle,
            classes.dropDown
        ];
        navbarClasses.push(this.state.open ? classes.dropDown_in : classes.dropDown_out);
        return (
            <div className={classes.root}>
                <AppBar position="fixed" className={navbarClasses.join(" ")}>
                    <Toolbar className={classes.toolbar}>
                        <div className="full-width">
                            <img
                                className={classes.logo}
                                alt="Devaway Logo"
                                src={`${process.env.PUBLIC_URL}/img/logowhite.png`}
                            />
                        </div>
                        <SubscribeBox />
                        {this.renderMenuToggler()}
                        {this.renderUserMenu()}
                        <LogBox />
                    </Toolbar>
                </AppBar>
                <IconButton
                    onClick={() => this.toggleOpen(this.state.open)}
                    color="contrast"
                    aria-label="Menu"
                    className={classes.toggleButton}
                >
                    <MenuIcon />
                </IconButton>
            </div>
        );
    }
}

NavBar.propTypes = {
    classes: T.shape({
        root: T.string,
        flex: T.string,
        menuButton: T.string
    }).isRequired,
    user: T.shape({
        isLoggedIn: T.bool.isRequired
    }).isRequired
};

export default withStyles(theme => ({
    root: {
        width: "100%"
    },
    flex: {
        flex: 1
    },
    logo: {
        display: "flex",
        maxHeight: "25px"
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    dropDown: {
        transition: "all ease 0.2s",
        transformOrigin: "top"
    },
    navStyle: {
        backgroundColor: "#fe5858"
    },
    dropDown_in: {
        transform: "scaleY(1)"
    },
    dropDown_out: {
        transform: "scaleY(0)"
    },
    toggleButton: {
        position: "fixed",
        top: theme.spacing.unit,
        right: theme.spacing.unit,
        zIndex: theme.zIndex.appBar + 1
    },
    toolbar: {
        paddingRight: theme.spacing.unit * 6
    }
}))(NavBar);

