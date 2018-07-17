import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import * as T from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Footer from "./Footer";

const styles = theme => ({
    container: {
        width: "100%",
        height: "calc(100vh - 70px - 120px)",
        maxWidth: 720,
        margin: "auto",
        marginTop: theme.spacing.unit,
    },
    paper: {
        margin: "auto",
        marginTop: theme.spacing.unit * 2,
        width: "95%",
        height: "auto",
        minHeight: "100%",
        padding: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 10,
    },
    title: {
        fontSize: "xx-large",
    },
});

class NoUserComp extends React.PureComponent {
    render() {
        return (
            <Grid id="devaway-mission-creation-unlogged-container" container spacing={24} className={this.props.classes.container}>
                <Paper className={this.props.classes.paper} elevation={1}>
                    <div className="full-width display-flex-row">
                        <Typography className={this.props.classes.title} type="title" color="inherit" component="h2">
                            You need to log in before using our services
                        </Typography>
                    </div>
                    <div style={{ marginTop: 40 }} className="full-width display-flex-row">
                        <NavLink
                            to="/places"
                        >
                            <Button color="primary" variant="contained">
                                Check out the places we have !
                            </Button>
                        </NavLink>
                    </div>
                </Paper>
                <Footer />
            </Grid>
        );
    }
}
NoUserComp.propTypes = {
    classes: T.shape({
        container: T.string.isRequired,
        paper: T.string.isRequired,
        title: T.string.isRequired,
    }).isRequired,
};

export default withStyles(styles)(withRouter(NoUserComp));
