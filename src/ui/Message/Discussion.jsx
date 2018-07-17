import React from "react";
import * as T from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import UserIcon from "react-icons/lib/fa/user";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

import Home from "../../containers/Home";
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
        width: "100%",
        maxWidth: 1200,
        margin: "auto",
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 4,
    },
    userPaperContainer: {
        margin: "auto",
    },
    userPaper: {
        margin: theme.spacing.unit * 4,
        padding: theme.spacing.unit * 4,
    },
    msgPaper: {
        padding: theme.spacing.unit * 2,
        margin: theme.spacing.unit * 4,
        width: "100%",
    },
    msgDate: {
        color: theme.palette.primary.lightGrey,
    },
    msgContent: {
        color: theme.palette.primary.midGrey,
    },
    contactIcon: {
        color: theme.palette.primary.midGrey,
        width: 315,
        height: 315,
    },
    smallAvatar: {
        color: theme.palette.primary.midGrey,
        width: 50,
        height: 50,
    },
    contactUserName: {
        margin: theme.spacing.unit * 4,
        marginBottom: 0,
        color: theme.palette.primary.midGrey,
    },
});

class Discussion extends React.PureComponent {
    componentDidMount() {
        this.props.onInit(this.props.match.params.userID);
    }

    get contactUser() {
        const { data } = this.props.message.current;
        const currentUserId = this.props.user.data.id;
        if (data.users && data.users.length && currentUserId) {
            return data.users.find(usr => usr.id !== currentUserId);
        }
        return null;
    }

    renderCardAvatar() {
        const { classes } = this.props;
        const imgUrl = getUserImg(this.contactUser.avatar);
        if (!imgUrl) {
            return (<UserIcon size={55} className={classes.contactIcon} />);
        }
        return (
            <Avatar className={classes.contactIcon} src={imgUrl} />
        );
    }

    renderContactCard() {
        const { classes } = this.props;
        const user = this.contactUser;
        return (user &&
            <Grid container spacing={24} direction="row" alignItems="center" justify="center">
                <Grid item className={classes.userPaperContainer}>
                    <Paper className={classes.userPaper}>
                        <Grid container alignItems="center" justify="center">
                            {this.renderCardAvatar()}
                        </Grid>
                        <Grid container alignItems="center" justify="center">
                            <Typography className={classes.contactUserName} variant="subheading" color="inherit" component="p">{user.userName}</Typography>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        );
    }

    renderPaperMsg(msg, user = this.props.user.data) {
        const { classes } = this.props;
        const imgUrl = getUserImg(user.avatar);
        return (
            <Paper className={classes.msgPaper}>
                <Grid container direction="row" alignItems="center" justify="flex-start" spacing={24}>
                    <Grid className="full-height" item xs={2}>
                        {imgUrl &&
                        <Avatar className={classes.smallAvatar} src={imgUrl} />
                        }
                        {!imgUrl &&
                        <UserIcon className={classes.smallAvatar} size={50} />
                        }
                    </Grid>
                    <Grid className="full-height" item xs={10}>
                        <Grid container direction="column" alignItems="center" justify="flex-start">
                            <Grid className="full-width" item xs={12}>
                                <Grid container alignItems="center" justify="flex-start">
                                    <Typography className={classes.msgContent} variant="subheading" color="inherit" component="p">{msg.content}</Typography>
                                </Grid>
                            </Grid>
                            <Grid className="full-width" item xs={12}>
                                <Grid container alignItems="center" justify="flex-end">
                                    <Typography className={classes.msgDate} variant="subheading" color="inherit" component="p">{moment(msg.created_at, `${DATE_FORMAT}, ${HOUR_FORMAT}:ss`).fromNow()}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    }

    renderMessage(msg) {
        const { contactUser } = this;
        return (
            <Grid container direction="row" justify={contactUser.id === msg.from ? "flex-end" : "flex-start"} alignItems="center">
                <Grid item xs={10} md={7} lg={6}>
                    {contactUser.id === msg.from && this.renderPaperMsg(msg, contactUser)}
                    {contactUser.id === msg.to && this.renderPaperMsg(msg)}
                </Grid>
            </Grid>
        );
    }

    renderMessages() {
        const { messages } = this.props.message.current.data;
        return (messages && messages.length &&
            <Grid className="margin-auto" container spacing={24}>
                {messages.map(msg => this.renderMessage(msg))}
            </Grid>
        );
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
                <Grid container spacing={24} direction="row" alignItems="center" justify="center" className={classes.container}>
                    {this.renderContactCard()}
                    {this.renderMessages()}
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
            avatar: T.string.isRequired,
        }),
        isLoggedIn: T.bool.isRequired,
    }).isRequired,
    message: messageReducerPropTypes.isRequired,
    onInit: T.func.isRequired,
};

export default withStyles(styles)(Discussion);
