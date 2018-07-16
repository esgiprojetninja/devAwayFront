import React from "react";
import * as T from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import Slide from "@material-ui/core/Slide";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import UserIcon from "react-icons/lib/fa/user";
import CandidacyCancelledIcon from "react-icons/lib/fa/minus";
import CandidacyProposedIcon from "react-icons/lib/fa/check";
import moment from "moment";

import getUserImg from "../../utils/user";

function getCandidacyStatusMsg(candidacy) {
    switch (candidacy.status) {
    case 0: return "Cancelled";
    case 1: return "Proposed";
    case 69: return "Booked";
    default: return "Cancelled";
    }
}

const styles = theme => ({
    container: {
        width: "100%",
        height: "100%",
        padding: "12px 0",
        margin: 0,
        color: theme.palette.primary.darkGrey
    },
    paperContainer: {
        width: "100%",
    },
    modalDivider: {
        width: "100%",
        margin: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        marginLeft: 0,
    },
    table: {
        width: "100%",
        margin: theme.spacing.unit * 2,
        marginTop: 0,
    },
    tableIcon: {
        color: theme.palette.primary.midGrey,
        fill: theme.palette.primary.midGrey,
    },
    tableIconText: {
        marginLeft: theme.spacing.unit * 2,
        color: theme.palette.primary.midGrey,
    },
    panelSummary: {
        backgroundColor: theme.palette.primary.lightGrey,
        "& > div > span > svg": {
            color: "#fff"
        }
    },
    darkText: {
        color: theme.palette.primary.darkGrey,
    },
    candidacyStatusMsg: {
        marginTop: theme.spacing.unit * 2,
    }
});

const tableIconSize = 25;

class MissionTravellers extends React.PureComponent {
    static defaultProps = {
        isUserOwner: false,
    }

    state = {
        candidacy: null,
    }

    get mission() {
        const { data } = this.props.mission.current;
        return data && !Number.isNaN(Number(data.id)) ?
            data :
            null;
    }

    get isMissionActive() {
        return this.mission && this.mission.isActive === 1;
    }

    get travellers() {
        return this.mission
            && this.mission.travellers
            && this.mission.travellers.length > 0 ?
            this.mission.travellers
            : null;
    }

    getCandidacyUnEditableStatus(candidacy) {
        if (!candidacy || !this.mission) {
            return "";
        }
        if (!this.isMissionActive) {
            return "The mission is locked and cannot be modified untill you switch it back to active";
        }
        if (this.mission.isBooked <= 0) {
            const acceptedCandidate = this.mission.travellers.find(cand => cand.status === 69);
            if (acceptedCandidate) {
                return `The mission is already taken by ${acceptedCandidate.user.userName}}`;
            }
        }
        switch (candidacy.status) {
        case 0: return "User has cancelled his own candidacy";
        case -1: return "You have refused this user already";
        case 69: return "Booked users cannot be denied access anymore";
        default: return "What do you wanna do about this candidacy ?";
        }
    }

    isCandidacyEditable(candidacy) {
        return candidacy && this.isMissionActive
            && candidacy.status === 1 && this.mission.isBooked <= 0;
    }

    handleChangePage = prop => (event, page) => {
        this.setState({
            [`${prop}Page`]: page,
        });
    }

    handleChangeRowsPerPage = prop => (event) => {
        this.setState({
            [`${prop}RowsPerPage`]: event.target.value || 1,
        });
    }

    handleOpenCandidacyModal = candidacy => () => {
        this.setState({
            candidacy
        });
    };
    handleCloseCandidacyModal = () => {
        this.setState({
            candidacy: null
        });
    };
    validateCandidacyModal = () => {
        if (!this.isCandidacyEditable(this.state.candidacy)) {
            return;
        }
        this.props.acceptCandidacy(this.state.candidacy);
        this.setState({
            candidacy: null
        });
    };

    renderOwnerAcceptCandidacyModal() {
        const { candidacy } = this.state;
        const { classes } = this.props;
        return (
            <Dialog
                open={Boolean(candidacy)}
                onClose={this.handleCloseCandidacyModal}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle>
                    <Grid container>
                        <Grid item xs={3}>
                            <Typography className={classes.tableIcon} variant="headline" color="inherit" component="h3">
                                Candidacy
                            </Typography>
                        </Grid>
                        {candidacy &&
                            this.renderCandidacyUser(candidacy, 9, "flex-end")
                        }
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <Divider inset className={classes.modalDivider} />
                    <DialogContentText color="primary">
                        <Grid container>
                            <Typography className={classes.darkText} variant="subheading" color="inherit" component="p">
                                From {candidacy && moment(candidacy.fromDate).local().format("MMMM Do YYYY")}
                                To {candidacy && moment(candidacy.toDate).local().format("MMMM Do YYYY")}
                            </Typography>
                        </Grid>
                        {this.isCandidacyEditable(candidacy) &&
                        <Grid container>
                            Be aware that after you accept this candidacy,
                            you will not be able to accept another unless
                            {candidacy ? ` ${candidacy.user.userName}` : "the user" } cancels his by himself
                        </Grid>}
                        {!this.isCandidacyEditable(candidacy) &&
                        <Grid container>
                            <Typography className={classes.candidacyStatusMsg} variant="subheading" color="primary" component="p">
                                This candidacy cannot be modified,&nbsp;
                                {this.getCandidacyUnEditableStatus(candidacy)}
                            </Typography>
                        </Grid>}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCloseCandidacyModal} color="default">
                        Cancel
                    </Button>
                    <Button disabled={!this.isCandidacyEditable(candidacy) || this.props.mission.current.isLoading} onClick={this.validateCandidacyModal} color="primary" autoFocus>
                        Validate
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    renderOwnerViewListHeader() {
        const { classes } = this.props;
        return (
            <TableRow className={classes.ownerRow}>
                <TableCell>User</TableCell>
                <TableCell>Cancidacy Status</TableCell>
                <TableCell>Starting</TableCell>
                <TableCell>Ending</TableCell>
                {this.mission.isBooked === 0 &&
                    this.mission.isActive === 1 && !this.mission.isLoading &&
                    <TableCell>Actions</TableCell>}
            </TableRow>
        );
    }

    renderCandidacyStatusIcon(candidacy) {
        const { classes } = this.props;
        return (
            <div>
                {
                    candidacy.status === 0 &&
                    <CandidacyCancelledIcon size={tableIconSize} className={classes.tableIcon} />
                }
                {
                    candidacy.status === 1 &&
                    <CandidacyProposedIcon size={tableIconSize} className={classes.tableIcon} />
                }
            </div>
        );
    }

    renderCandidacyUser(candidacy, item = 12, justify = "flex-start") {
        const { classes } = this.props;
        const imgUrl = getUserImg(candidacy.user.avatar);
        return (
            <Grid container item xs={item} alignItems="center" justify={justify}>
                {!imgUrl && <UserIcon size={tableIconSize} className={classes.tableIcon} />}
                {imgUrl && <Avatar src={imgUrl} />}
                <Typography className={classes.tableIconText} variant="subheading" color="inherit" component="p">
                    {candidacy.user.userName}
                </Typography>
            </Grid>
        );
    }

    renderOwnerViewListItem(candidacy) {
        const { classes } = this.props;
        return (
            <TableRow className={classes.ownerRow} key={candidacy.id}>
                <TableCell component="div">
                    {this.renderCandidacyUser(candidacy)}
                </TableCell>
                <TableCell component="div">
                    <Grid container alignItems="center" justify="flex-start">
                        {this.renderCandidacyStatusIcon(candidacy)}
                        <Typography className={classes.tableIconText} variant="subheading" color="inherit" component="p">
                            {getCandidacyStatusMsg(candidacy)}
                        </Typography>
                    </Grid>
                </TableCell>
                <TableCell>{moment(candidacy.fromDate).local().format("MMMM Do YYYY")}</TableCell>
                <TableCell>{moment(candidacy.toDate).local().format("MMMM Do YYYY")}</TableCell>
                {this.mission.isBooked === 0 &&
                    this.mission.isActive === 1 && !this.mission.isLoading &&
                    <TableCell padding="dense">
                        <Button
                            aria-label="Accept candidacy"
                            color={candidacy.status === 1 ? "primary" : "default"}
                            onClick={this.handleOpenCandidacyModal(candidacy)}
                        >
                            Manage Candidacy
                        </Button>
                    </TableCell>}
            </TableRow>
        );
    }

    renderOwnerViewList() {
        const { classes } = this.props;
        return (
            <div>
                <Table className={classes.table}>
                    <TableHead>
                        {this.renderOwnerViewListHeader()}
                    </TableHead>
                    <TableBody>
                        {this.travellers.map(candidacy => this.renderOwnerViewListItem(candidacy))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={this.travellers.length}
                    rowsPerPage={this.state.ownerRowsPerPage || 5}
                    page={this.state.ownerPage || 0}
                    backIconButtonProps={{
                        "aria-label": "Previous Page",
                    }}
                    nextIconButtonProps={{
                        "aria-label": "Next Page",
                    }}
                    onChangePage={this.handleChangePage("owner")}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage("owner")}
                />
            </div>
        );
    }

    renderOwnerView() {
        const { classes } = this.props;
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary
                    className={classes.panelSummary}
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography style={{ color: "#fff" }} variant="headline" component="p" color="inherit">Consult candidates list</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Paper className={classes.paperContainer}>
                        {this.travellers && this.renderOwnerViewList()}
                    </Paper>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <Slide direction="left" in mountOnEnter unmountOnExit>
                <Fade in mountOnEnter unmountOnExit>
                    <div className={classes.container}>
                        {this.props.isUserOwner &&
                            this.renderOwnerView()
                        }
                    </div>
                </Fade>
            </Slide>
        );
    }
}

MissionTravellers.propTypes = {
    isUserOwner: T.bool,
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
    classes: T.shape({
    }).isRequired,
    acceptCandidacy: T.func.isRequired,
    refuseCandidacy: T.func.isRequired,
};

export default withStyles(styles)(MissionTravellers);
