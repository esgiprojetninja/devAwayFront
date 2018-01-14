import * as React from "react";
import * as T from "prop-types";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";

import LogBox from "../containers/LogBox";

class NavBar extends React.PureComponent {
    state = {
        open: false
    };

    toggleOpen(open) {
        this.setState({
            open: !open
        });
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
        backgroundColor: "#fe5858",
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
