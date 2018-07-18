import React from "react";
import * as T from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import UserIcon from "react-icons/lib/fa/user";
import moment from "moment";

import Home from "../../containers/Home";
import Footer from "../../ui/Footer";
import Navbar from "../../containers/Navbar";
import { messageReducerPropTypes } from "../../propTypes/message.reducer.d";
import getUserImg from "../../utils/user";
import { DATE_FORMAT, HOUR_FORMAT } from "../../utils/mission";

const styles = theme => ({
    root: {
        flex: 1,
        margin: theme.spacing.unit * 2,
    },
    container: {
        minHeight: "70vh",
        width: "100%",
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 4,
    },
    filtersContainer: {},
    messagesContainer: {
        margin: "auto",
        marginTop: theme.spacing.unit * 4,
        height: 125,
        maxWidth: 1200,
    },
    msgContainer: {
        margin: theme.spacing.unit * 2,
    },
    noMessagesContainer: {
        marginTop: theme.spacing.unit * 4,
        marginBottom: theme.spacing.unit * 4,
    },
    messagesSubContainer: {
        width: "100%",
    },
    linkContainer: {
        width: "100%",
    },
    messagesPaper: {
        width: "100%",
    },
    defaultUserIcon: {
        color: theme.palette.primary.midGrey,
    },
    destinatedUser: {
        color: theme.palette.primary.darkGrey,
    },
    contentPreview: {
        color: theme.palette.primary.lightGrey,
        textAlign: "left",
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

    getDiscussionInterlocutorId(discussion) {
        const { from, to } = discussion;
        return this.props.user.data.id === to.id ?
            from.id : to.id;
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
                        Unreached hosts
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant={filter === "traveller" ? "contained" : "outlined"} onClick={this.handleChangeFilter("traveller")} size="large" color="primary">
                        Unreached candidates
                    </Button>
                </Grid>
            </Grid>
        );
    }

    renderUserAvatar(discussion) {
        const otherUser = discussion.from;
        const { classes } = this.props;
        const imgUrl = getUserImg(otherUser.avatar);
        if (!imgUrl) {
            return (<UserIcon size={35} className={classes.defaultUserIcon} />);
        }
        return (
            <Avatar src={imgUrl} />
        );
    }

    renderUserName(discussion) {
        const receiver = discussion.to;
        const { classes } = this.props;
        const head = receiver.id === this.props.user.data.id ?
            "To you"
            : `To ${receiver.userName}`;
        return (
            <Grid direction="column" alignItems="flex-start" justify="center" container>
                <Grid item>
                    <Typography className={classes.destinatedUser} variant="headline" color="inherit" component="p">{head}</Typography>
                </Grid>
                <Grid item>
                    <Typography className={classes.destinatedUser} variant="subheading" color="inherit" component="p">{moment(discussion.created_at, `${DATE_FORMAT}, ${HOUR_FORMAT}:ss`).format("YYYY/MM/DD")}</Typography>
                </Grid>
            </Grid>
        );
    }

    renderContentPreview(discussion) {
        const { classes } = this.props;
        const msg = discussion.content.length > 50 ?
            discussion.content.slice(0, 50).padEnd(54, "...")
            : discussion.content;
        return (
            <Grid alignItems="center" justify="flex-start" container>
                <Grid item>
                    <Typography className={classes.contentPreview} variant="subheading" color="inherit" component="p">{msg}</Typography>
                </Grid>
            </Grid>
        );
    }

    renderDiscussionPreview(discussion) {
        const { classes } = this.props;
        return (discussion && discussion.from && discussion.to &&
            <NavLink
                key={discussion.id}
                className={classes.linkContainer}
                to={`/messages/${this.getDiscussionInterlocutorId(discussion)}`}
            >
                <Grid container xs={12} item direction="row" alignItems="center" justify="flex-start" className={classes.msgContainer} spacing={24}>
                    <Grid item xs={2}>
                        {this.renderUserAvatar(discussion)}
                    </Grid>
                    <Grid item xs={3}>
                        {this.renderUserName(discussion)}
                    </Grid>
                    <Grid item xs={7}>
                        {this.renderContentPreview(discussion)}
                    </Grid>
                </Grid>
            </NavLink>
        );
    }

    renderMessagesContainer() {
        const { filter } = this.state;
        const { classes } = this.props;
        const currentData = this.props.message[filter] && this.props.message[filter].data ?
            this.props.message[filter].data : [];
        const isLoading = this.getFilterIsLoading(filter);
        return (
            <Grid container direction="row" alignItems="flex-start" justify="flex-start" className={classes.messagesContainer}>
                <Paper className={classes.messagesPaper} >
                    {isLoading &&
                        <LinearProgress id="getMeProgess" color="primary" mode="query" />}
                    {
                        <Grid spacing={24} container direction="column" alignItems="flex-start" justify="flex-start" className={classes.messagesSubContainer}>
                            {currentData
                                .map(discussion => this.renderDiscussionPreview(discussion))}
                        </Grid>
                    }
                </Paper>
                {currentData.length === 0 &&
                    <Grid container direction="row" alignItems="center" justify="center" className={classes.noMessagesContainer}>
                        <Typography component="h3" variant="headline" color="primary">
                            First reach out through your candidacies or properties
                        </Typography>
                    </Grid>
                }
            </Grid>
        );
    }

    render() {
        const { classes } = this.props;
        if (!this.props.isLoggedIn) {
            return (
                <Home />
            );
        }
        return (
            this.props.isLoggedIn &&
            <div className={classes.root}>
                <Navbar />
                <Grid container spacing={24} direction="column" alignItems="center" justify="center" className={classes.container}>
                    {this.renderFilters()}
                    {this.renderMessagesContainer()}
                </Grid>
                <Footer />
            </div>
        );
    }
}

MessageList.propTypes = {
    classes: T.shape({
    }).isRequired,
    user: T.shape({
        data: T.shape({
            id: T.number.isRequired,
        })
    }).isRequired,
    message: messageReducerPropTypes.isRequired,
    onInit: T.func.isRequired,
    allFetch: T.func.isRequired, // eslint-disable-line
    ownerFetch: T.func.isRequired, // eslint-disable-line
    travellerFetch: T.func.isRequired, // eslint-disable-line
    isLoggedIn: T.bool.isRequired,
};

export default withStyles(styles)(MessageList);
