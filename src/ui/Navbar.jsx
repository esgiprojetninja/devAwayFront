import * as React from "react";
import { NavLink } from "react-router-dom";
import * as T from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";

import LogBox from "../containers/LogBox";
import SubscribeBox from "../containers/SubscribeBox";

const ITEM_HEIGHT = 48;

export class NavBarComponent extends React.PureComponent {
    static propTypes = {
        burgerColor: T.string,
        getSavedState: T.func.isRequired,
        storeStateProp: T.func.isRequired,
        removeStateProp: T.func.isRequired,
        onInit: T.func.isRequired
    };

    static defaultProps = { burgerColor: "#fff" }

    constructor(props) {
        super(props);
        const defaultState = {
            open: false,
            openPlacesMenuEl: null
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

    handlePlacesMenuClick = (e) => {
        this.setState({
            openPlacesMenuEl: e.currentTarget
        });
    }
    handlePlacesMenuClose = () => {
        this.setState({
            openPlacesMenuEl: null
        });
        this.props.removeStateProp("openPlacesMenuEl");
    }

    renderPlacesMenu() {
        if (!this.props.user.isLoggedIn) return null;
        return (
            <Menu
                id="long-menu"
                anchorEl={this.state.openPlacesMenuEl}
                open={!!this.state.openPlacesMenuEl}
                onClose={this.handlePlacesMenuClose}
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
                    onClick={this.handlePlacesMenuClose}
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
                    onClick={this.handlePlacesMenuClose}
                >
                    <NavLink
                        id="accommodation-creation-link"
                        to="/place/creation"
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
            <Button
                id="menu-toggler"
                aria-label="More"
                aria-haspopup="true"
                aria-owns={this.state.openPlacesMenuEl ? "long-menu" : null}
                color="inherit"
                onClick={this.handlePlacesMenuClick}
            >
                places
            </Button>
        );
    }

    render() {
        const { classes } = this.props;
        const containerStyle = {
            height: this.state.open ? "60px" : "0"
        };
        const togglerStyle = {
            color: this.state.open ?
                NavBarComponent.defaultProps.burgerColor :
                this.props.burgerColor
        };
        return (
            <div style={containerStyle} className={classes.root}>
                <AppBar position="fixed" style={this.state.open ? { transform: "scaleY(1)" } : { transform: "scaleY(0)" }} className={classes.navStyle}>
                    <Toolbar className={classes.toolbar}>
                        <div className="full-width">
                            <NavLink
                                id="home-link-logo"
                                to="/"
                            >
                                <img
                                    className={classes.logo}
                                    alt="Devaway Logo"
                                    src={`${process.env.PUBLIC_URL}/img/logowhite.png`}
                                />
                            </NavLink>
                        </div>
                        <SubscribeBox />
                        {this.renderMenuToggler()}
                        {this.renderPlacesMenu()}
                        <LogBox />
                    </Toolbar>
                </AppBar>
                <IconButton
                    id="unlogged-toggler"
                    onClick={() => this.toggleOpen(this.state.open)}
                    style={togglerStyle}
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
        color: "#fff",
        backgroundColor: theme.palette.primary.light,
        transition: "all ease 0.2s",
        transformOrigin: "top",
    },
    toggleButton: {
        position: "fixed",
        top: theme.spacing.unit,
        right: theme.spacing.unit,
        zIndex: theme.zIndex.appBar + 1,
    },
    toolbar: {
        paddingRight: theme.spacing.unit * 6
    }
}))(NavBarComponent);
