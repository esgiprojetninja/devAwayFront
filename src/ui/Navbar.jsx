import * as React from "react";
import { NavLink } from "react-router-dom";
import * as T from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import LogBox from "../containers/LogBox";
import SubscribeBox from "../containers/SubscribeBox";

const ITEM_HEIGHT = 48;

export class NavBarComponent extends React.PureComponent {
    static propTypes = {
        // burgerColor: T.string,
        getSavedState: T.func.isRequired,
        storeStateProp: T.func.isRequired,
        removeStateProp: T.func.isRequired,
        onInit: T.func.isRequired
    };

    // static defaultProps = { burgerColor: "contrast" }

    constructor(props) {
        super(props);
        const defaultState = {
            open: false,
            openUserMenuEl: null
        };
        this.state = {
            ...defaultState,
            ...props.getSavedState(defaultState)
        };
    }

    componentDidMount() {
        this.props.onInit();
    }

    toggleOpen(open) {
        this.setState({
            open: !open
        });
        this.props.storeStateProp("open", open ? "" : 1);
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
        this.props.removeStateProp("openUserMenuEl");
    }

    renderUserMenu() {
        if (!this.props.user.isLoggedIn) return null;
        return (
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
                    key="/geszuihgvhui"
                    selected={false}
                    onClick={this.handleUserMenuClose}
                >
                    <NavLink
                        id="accommodation-link"
                        to="/accommodations"
                    >
                        All places
                    </NavLink>
                </MenuItem>
                <MenuItem
                    key="/poulafefzee"
                    selected={false}
                    onClick={this.handleUserMenuClose}
                >
                    <NavLink
                        id="accommodation-creation-link"
                        to="/accommodations/create"
                    >
                        New place
                    </NavLink>
                </MenuItem>
            </Menu>
        );
    }

    renderMenuToggler() {
        if (!this.props.user.isLoggedIn) return null;
        return (
            <IconButton
                id="menu-toggler"
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
        // const burgerColor = this.state.open ?
        //     NavBarComponent.defaultProps.burgerColor :
        //     this.props.burgerColor;
        const containerStyle = {
            height: this.state.open ? "70px" : "0"
        };
        return (
            <div style={containerStyle} className={classes.root}>
                <AppBar position="fixed" style={this.state.open ? { transform: "scaleY(1)" } : { transform: "scaleY(0)" }} className={classes.navStyle}>
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
                    id="unlogged-toggler"
                    onClick={() => this.toggleOpen(this.state.open)}
                    // color={burgerColor}
                    color="primary"
                    aria-label="Menu"
                    className={classes.toggleButton}
                >
                    <MenuIcon />
                </IconButton>
            </div>
        );
    }
}

NavBarComponent.propTypes = {
    classes: T.shape({
        root: T.any,
        flex: T.any,
        menuButton: T.any
    }).isRequired,
    user: T.shape({
        isLoggedIn: T.bool.isRequired
    }).isRequired
};

export default withStyles(theme => ({
    root: {
        width: "100%",
        transition: "height .2s ease-in-out"
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
    navStyle: {
        backgroundColor: theme.palette.primary.light,
        transition: "all ease 0.2s",
        transformOrigin: "top",
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
}))(NavBarComponent);
