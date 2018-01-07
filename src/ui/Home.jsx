import * as React from "react";
import * as T from "prop-types";
import Reboot from "material-ui/Reboot";
import { createMuiTheme, MuiThemeProvider, withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";

import Navbar from "./Navbar.jsx";

const defaultTheme = createMuiTheme();

const Home = (props) => {
    const { classes } = props;
    return (
        <MuiThemeProvider theme={defaultTheme}>
            <div>
                <Reboot />
                <Navbar />
                <div className={classes.backgroundImg}>
                    <Typography
                        align="center"
                        type="display2"
                        className={classes.root}
                    >
                        Dev Away
                    </Typography>
                </div>
            </div>
        </MuiThemeProvider>
    );
};

Home.propTypes = {
    classes: T.shape({
        root: T.string
    }).isRequired
};

export default withStyles(theme => ({
    root: {
        color: theme.palette.common.white
    },
    backgroundImg: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50vw",
        background: `url('${process.env.PUBLIC_URL}/img/home-background.png') center`,
        backgroundSize: "cover"
    }
}))(Home);
