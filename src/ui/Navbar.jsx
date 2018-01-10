import * as React from "react";
import * as T from "prop-types";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";

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
            classes.dropDown
        ];
        navbarClasses.push(this.state.open ? classes.dropDown_in : classes.dropDown_out);
        return (
            <div className={classes.root}>
                <AppBar position="fixed" className={navbarClasses.join(" ")}>
                    <Toolbar>
                        <Typography type="title" color="inherit" className={classes.flex}>
                            Dev away
                        </Typography>
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
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    dropDown: {
        transition: "all ease 0.2s",
        transformOrigin: "top"
    },
    dropDown_in: {
        transform: "scaleY(1)"
    },
    dropDown_out: {
        transform: "scaleY(0)"
    },
    toggleButton: {
        position: "fixed",
        top: "10px",
        right: "10px",
        zIndex: theme.zIndex.appBar + 1
    }
}))(NavBar);
