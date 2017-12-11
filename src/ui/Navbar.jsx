// @flow
import * as React from "react";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";

import {
    StylesType,
} from "../decls/flowTypes";

type PropsType = {
    classes: StylesType
};


const styles = (): StylesType => ({
    root: {
        width: "100%",
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});

function NavBar(props: PropsType): React.Element<StylesType> {
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

export default withStyles(styles)(NavBar);
