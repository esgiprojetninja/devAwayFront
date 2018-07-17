import React from "react";
import * as T from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

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
    filtersContainer: {},
    messagesContainer: {
        margin: "auto",
        marginTop: theme.spacing.unit * 4,
        maxWidth: 1200,
    },
    noMessagesContainer: {
        marginTop: theme.spacing.unit * 4,
        marginBottom: theme.spacing.unit * 4,
    },
    messagesPaper: {
        width: "100%",
    },
});

class MessageList extends React.PureComponent {
    state = {
        filter: "all",
    }

    componentDidMount() {
        const { filter } = this.state;
        this.props.onInit(filter);
    }

    getFilterIsLoading(filter) {
        const { message } = this.props;
        return message[filter] && message[filter].isLoading;
    }

    handleChangeFilter = filter => () => {
        this.setState({
            filter
        });
        if (this.getFilterIsLoading(filter)) return;
        this.props[`${filter}Fetch`]();
    }

    renderFilters() {
        const { filter } = this.state;
        const { classes } = this.props;
        return (
            <Grid container spacing={16} alignItems="center" justify="center" className={classes.filtersContainer}>
                <Grid item>
                    <Button variant={filter === "all" ? "contained" : "outlined"} onClick={this.handleChangeFilter("all")} size="large" color="primary">
                        All messages
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant={filter === "owner" ? "contained" : "outlined"} onClick={this.handleChangeFilter("owner")} size="large" color="primary">
                        Candidates
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant={filter === "traveller" ? "contained" : "outlined"} onClick={this.handleChangeFilter("traveller")} size="large" color="primary">
                        Your applications
                    </Button>
                </Grid>
            </Grid>
        );
    }

    renderMessagesContainer() {
        const { filter } = this.state;
        const { classes } = this.props;
        const currentData = this.props[filter] ? this.props[filter].all : [];
        const isLoading = this.getFilterIsLoading(filter);
        return (
            <Grid container direction="row" alignItems="flex-start" justify="flex-start" className={classes.messagesContainer}>
                {currentData.length === 0 &&
                <Grid container direction="row" alignItems="center" justify="center" className={classes.noMessagesContainer}>
                    <Typography component="h3" variant="headline" color="primary">
                        You have no messages here yet
                    </Typography>
                </Grid>
                }
                <Paper className={classes.messagesPaper} >
                    {isLoading &&
                        <LinearProgress id="getMeProgess" color="primary" mode="query" />}
                </Paper>
            </Grid>
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Navbar />
                <Grid container spacing={24} direction="column" alignItems="center" justify="center" className={classes.container}>
                    {this.renderFilters()}
                    {this.renderMessagesContainer()}
                </Grid>
            </div>
        );
    }
}

MessageList.propTypes = {
    classes: T.shape({
    }).isRequired,
    message: messageReducerPropTypes.isRequired,
    onInit: T.func.isRequired,
    allFetch: T.func.isRequired, // eslint-disable-line
    ownerFetch: T.func.isRequired, // eslint-disable-line
    travellerFetch: T.func.isRequired, // eslint-disable-line
};

export default withStyles(styles)(MessageList);
