import * as React from "react";
import * as T from "prop-types";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";


const styles = () => ({
    root: {
        width: "100%"
    },
    flex: {
        flex: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    }
});

function NavBar(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography type="title" color="inherit" className={classes.flex}>
                        A Job Away
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

NavBar.propTypes = {
    classes: T.shape({
        root: T.string,
        flex: T.string,
        menuButton: T.string
    }).isRequired
};

export default withStyles(styles)(NavBar);
