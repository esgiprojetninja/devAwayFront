import React from "react";
import * as T from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import UserIcon from "react-icons/lib/fa/user";
import Icon from "react-icons/lib/fa/envelope";

import getUserImg from "../../utils/user";

const styles = theme => ({
    root: {
        flex: 1,
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
    },
    tableIcon: {
        color: theme.palette.primary.midGrey,
        fill: theme.palette.primary.midGrey,
    },
    tableIconText: {
        margin: theme.spacing.unit * 2,
        color: theme.palette.primary.midGrey,
    },
    modalDivider: {
        width: "100%",
        margin: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        marginLeft: 0,
    },
    modalTextInput: {
        width: 400,
        maxWidth: "100%",
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

class MissionOwnerTravellers extends React.PureComponent {
    state = {
        open: false,
        msgToHost: "",
        msgToHostError: "",
    }

    get mission() {
        const { data } = this.props.mission.current;
        return data && !Number.isNaN(Number(data.id)) ?
            data :
            null;
    }

    get userIsBookedTraveller() {
        const { mission } = this;
        const { user } = this.props;
        if (mission && mission.travellers && mission.isBooked === 1) {
            const accepted = mission.travellers
                .find(candidacy => candidacy.user.id === user.data.id && candidacy.status === 69);
            return Boolean(accepted);
        }
        return false;
    }

    get userCandidacy() {
        const { user, mission } = this.props;
        if (!mission.current.data.travellers) {
            return false;
        }
        return mission.current.data.travellers
            .find(candidacy => candidacy.user.id === user.data.id);
    }

    get isCandidacyActive() {
        return this.userCandidacy && this.userCandidacy.status > 0;
    }

    handleSendMsg = () => {
        if (this.state.msgToHost.length === 0
            || this.state.msgToHostError.length > 0
            || this.props.message.current.isLoading) return;
        const { msgToHost } = this.state;
        this.props.sendMsg(msgToHost, this.mission.accommodation.host.id);
        this.setState({
            open: null
        });
    }

    handleChangeMsg = (event) => {
        const { value } = event.target;
        this.setState({
            msgToHost: value,
            msgToHostError: value.length < 10 || value.length > 255 ?
                "Message has to be at least 10 characters long and less than 255"
                : ""
        });
    }

    openModal = () => {
        this.setState({
            open: true,
        });
    }

    renderCandidacyHost() {
        if (!this.mission
            || !this.mission.accommodation
            || !this.mission.accommodation.host) return null;

        const { classes } = this.props;
        const imgUrl = getUserImg(this.mission.accommodation.host.avatar);
        return (
            <Grid container direction="row-reverse" spacing={24} alignItems="center" justify="flex-start">
                {!imgUrl && <UserIcon size={35} className={classes.tableIcon} />}
                {imgUrl && <Avatar src={imgUrl} />}
                <Typography className={classes.tableIconText} variant="subheading" color="inherit" component="p">
                    {this.mission.accommodation.host.userName}
                </Typography>
            </Grid>
        );
    }

    renderOwnerMessageModal() {
        const { open } = this.state;
        const { classes } = this.props;
        return (
            <Dialog
                open={Boolean(open)}
                onClose={this.handleCloseMessageCandidacyModal}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle>
                    <Grid container alignItems="center" justify="center">
                        <Grid item xs={6}>
                            <Typography className={classes.tableIcon} variant="headline" color="inherit" component="h3">
                                Message
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            {this.renderCandidacyHost()}
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <Divider inset className={classes.modalDivider} />
                    {this.props.message.current.isLoading &&
                        <LinearProgress color="primary" mode="query" />}
                    <DialogContentText color="default">
                        <Grid container spacin={24}>
                            <TextField
                                id="candidacy-message-from-candidate"
                                label={this.state.msgToHostError.length > 0 ?
                                    this.state.msgToHostError : "Your message"
                                }
                                error={this.state.msgToHostError.length > 0}
                                multiline
                                className={classes.modalTextInput}
                                rows={4}
                                min="10"
                                max="255"
                                value={this.state.msgToHost}
                                onChange={this.handleChangeMsg}
                                margin="normal"
                            />
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCloseMessageCandidacyModal} color="default">
                        Cancel
                    </Button>
                    <Button
                        disabled={this.state.msgToHost.length === 0
                            || this.state.msgToHostError.length > 0
                            || this.props.message.current.isLoading
                        }
                        onClick={this.handleSendMsg}
                        color="primary"
                        autoFocus
                    >
                        Send Message
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                {this.renderOwnerMessageModal()}
                <Grid container alignItems="center" justify="center">
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.openModal}>
                        Send the host a message
                        <Icon className={classes.rightIcon}>send</Icon>
                    </Button>
                </Grid>
            </div>
        );
    }
}

MissionOwnerTravellers.propTypes = {
    mission: T.shape({
        current: T.shape({
            data: T.shape({
                accommodation_id: T.number,
                accommodation: T.shape({
                    title: T.string,
                    address: T.string,
                    pictures: T.arrayOf(T.shape({})),
                    isActive: T.number,
                    isBooked: T.number,
                    host: T.shape({
                        userName: T.string.isRequired,
                    }),
                }),
                travellers: T.array,
                isActive: T.number,
            }).isRequired,
            isLoading: T.bool.isRequired,
        }).isRequired,
    }).isRequired,
    user: T.shape({
        data: T.shape({
            id: T.number,
        }),
    }).isRequired,
    message: T.shape({
        current: T.shape({
            isLoading: T.bool.isRequired,
        }).isRequired,
    }).isRequired,
    classes: T.shape({
    }).isRequired,
    sendMsg: T.func.isRequired,
};

export default withStyles(styles)(MissionOwnerTravellers);
