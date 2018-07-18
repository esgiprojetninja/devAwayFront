import React from "react";
import * as T from "prop-types";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import UserIcon from "react-icons/lib/fa/user";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";

import UnloggedComp from "../NoUserComp";
import FooterComp from "../Footer";
import Navbar from "../../containers/Navbar";
import getUserImg from "../../utils/user";
import { darkGrey } from "../../styles/theme";
import { DATE_FORMAT, HOUR_FORMAT } from "../../utils/mission";

class UserDetail extends React.PureComponent {
    componentWillReceiveProps(props) {
        if (!this.props.user.isLoggedIn && props.user.isLoggedIn) {
            this.props.onInit(this.props.match.params.userID);
        }
    }

    get isLoading() {
        return this.props.user.isLoading || this.props.user.isGettingData;
    }

    renderCardAvatar() {
        const { classes } = this.props;
        const imgUrl = getUserImg(this.props.user.fetchedUser.avatar);
        if (!imgUrl) {
            return (<UserIcon size={55} className={classes.contactIcon} />);
        }
        return (
            <Avatar className={classes.contactIcon} src={imgUrl} />
        );
    }

    renderContactCard() {
        const { classes } = this.props;
        const user = this.props.user.fetchedUser;
        return (user &&
            <Grid style={{ minHeight: "85vh" }} container spacing={24} direction="column" alignItems="center" justify="center">
                <Grid item>
                    <Paper className={classes.userPaper}>
                        <Grid container alignItems="center" justify="center">
                            {this.renderCardAvatar()}
                        </Grid>
                        <Grid container alignItems="center" justify="center">
                            <Typography className={classes.contactUserName} variant="subheading" color="inherit" component="p">{user.userName}</Typography>
                        </Grid>
                        {user.created_at &&
                        <Grid container alignItems="center" justify="center">
                            <Typography className={classes.contactUserName} variant="subheading" color="inherit" component="p">{moment(user.created_at, `${DATE_FORMAT}, ${HOUR_FORMAT}:ss`).format("MMMM Do YYYY")}</Typography>
                        </Grid>}
                    </Paper>
                </Grid>
            </Grid>
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Navbar burgerColor={darkGrey} />
                {this.isLoading &&
                    <LinearProgress color="primary" mode="query" />}
                {this.props.user.isLoggedIn && this.renderContactCard()}
                {!this.props.user.isLoggedIn && <UnloggedComp />}
                <div style={{ marginTop: 150 }}>
                    <FooterComp />
                </div>
            </div>
        );
    }
}

UserDetail.propTypes = {
    match: T.shape({
        params: T.shape({
            userID: T.string.isRequired
        }).isRequired
    }).isRequired,
    onInit: T.func.isRequired,
    user: T.shape({
        isLoggedIn: T.bool.isRequired,
        isLoading: T.bool.isRequired,
        isGettingData: T.bool.isRequired,
        fetchedUser: T.shape({
            userName: T.string.isRequired,
            avatar: T.string.isRequired,
        }),
    }).isRequired,
    classes: T.shape().isRequired,
};

export default withStyles(theme => ({
    root: {
        flex: 1,
        margin: theme.spacing.unit * 2,
    },
    contactIcon: {
        color: theme.palette.primary.midGrey,
        width: 315,
        height: 315,
    },
    contactUserName: {
        margin: theme.spacing.unit * 4,
        marginBottom: 0,
        color: theme.palette.primary.midGrey,
    },
    userPaper: {
        margin: theme.spacing.unit * 4,
        padding: theme.spacing.unit * 4,
    },
}))(UserDetail);
