import React from "react";
import * as T from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Home from "../../containers/Home";
import Navbar from "../../containers/Navbar";
import { messageReducerPropTypes } from "../../propTypes/message.reducer.d";

const styles = theme => ({
    root: {
        flex: 1,
        margin: theme.spacing.unit * 2,
    },
    container: {
        width: "100%",
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 4,
    },
});

class Discussion extends React.PureComponent {
    componentDidMount() {
        this.props.onInit(this.props.match.params.userID);
    }

    render() {
        const { classes } = this.props;
        if (!this.props.user.isLoggedIn) {
            return (
                <Home />
            );
        }
        return (
            this.props.user.isLoggedIn &&
            <div className={classes.root}>
                <Navbar />
                <Grid container spacing={24} direction="column" alignItems="space-around" justify="center" className={classes.container}>
                    <pre>{JSON.stringify(this.props.message.current)}</pre>
                </Grid>
            </div>
        );
    }
}

Discussion.propTypes = {
    match: T.shape({
        params: T.shape({
            userID: T.string.isRequired
        }).isRequired
    }).isRequired,
    classes: T.shape({
    }).isRequired,
    user: T.shape({
        data: T.shape({
            id: T.number.isRequired,
        }),
        isLoggedIn: T.bool.isRequired,
    }).isRequired,
    message: messageReducerPropTypes.isRequired,
    onInit: T.func.isRequired,
};

export default withStyles(styles)(Discussion);
