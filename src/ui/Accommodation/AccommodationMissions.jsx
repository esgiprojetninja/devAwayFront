/* global clearTimeout */
import React from "react";
import { NavLink } from "react-router-dom";
import * as T from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Tooltip from "@material-ui/core/Tooltip";
import InactiveIcon from "react-icons/lib/fa/lock";
import ActiveIcon from "react-icons/lib/fa/plus";
import UnbookedIcon from "react-icons/lib/fa/paper-plane";
import BookedIcon from "react-icons/lib/fa/close";
import { accommodationPropTypes } from "../../propTypes/accommodationType";
import { DATE_FORMAT, HOUR_FORMAT } from "../../utils/mission";

const styles = theme => ({
    container: {
        width: "100%",
        paddingRight: theme.spacing.unit,
        paddingLeft: theme.spacing.unit,
    },
    listContainer: {
        width: "100%",
        marginTop: theme.spacing.unit * 4
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: "33.33%",
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        color: theme.palette.primary.midGrey,
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
    },
});

const formatMissionDates = mission => `From ${moment(mission.checkinDate, `${DATE_FORMAT} ${HOUR_FORMAT}`).format("MMMM Do YYYY")} to ${moment(mission.checkoutDate, `${DATE_FORMAT} ${HOUR_FORMAT}`).format("MMMM Do YYYY")}`;

class AccommodationMissions extends React.PureComponent {
    static defaultProps = {
        acco: null,
    }

    state = {
        expanded: null,
    };


    get missions() {
        const { acco } = this.props;
        return acco && acco.missions && acco.missions.length > 0 ?
            acco.missions
            : null;
    }

    getMissionBtnLegend(mission) {
        if (this.props.isUserOwner) {
            return "Modify";
        }
        const { user } = this.props;
        if (user.isLoggedIn && user.data.id === mission.traveller && true) {
            // @TODO adapt check when traveler becomes travelerS in back
            // AND when one user can see if he's a candidate already
            return "Cancel Candidacy";
        }
        return "See it all";
    }

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : null,
        });
    };

    renderBookedStatus(mission) {
        const { classes } = this.props;
        if (mission.isBooked) {
            return (
                <Tooltip title="Mission taken">
                    <BookedIcon className={classes.icon} size={25} />
                </Tooltip>
            );
        }
        return (
            <Tooltip title="Mission available">
                <UnbookedIcon className={classes.icon} size={25} />
            </Tooltip>
        );
    }

    renderActiveStatus(mission) {
        const { classes } = this.props;
        if (mission.isActive) {
            return (
                <Tooltip title="Mission inactive">
                    <InactiveIcon className={classes.icon} size={25} />
                </Tooltip>
            );
        }
        return (
            <Tooltip title="Mission active">
                <ActiveIcon className={classes.icon} size={25} />
            </Tooltip>
        );
    }

    renderMission(mission) {
        const { classes } = this.props;
        const { expanded } = this.state;
        return (
            <ExpansionPanel
                key={mission.id}
                expanded={expanded === mission.id}
                onChange={this.handleChange(mission.id)}
            >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>
                        {this.renderBookedStatus(mission)}
                        {mission.title}
                    </Typography>
                    <Typography className={classes.secondaryHeading}>
                        {formatMissionDates(mission)}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container alignItems="center">
                        <Grid item>
                            {this.renderBookedStatus(mission)}
                            {this.renderActiveStatus(mission)}
                        </Grid>
                        <Grid item>
                            <Typography>{mission.description}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container justify="flex-end">
                        <NavLink
                            to={`/missions/${mission.id}`}
                        >
                            <Button color="default" variant="contained">{this.getMissionBtnLegend(mission)}</Button>
                        </NavLink>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }

    renderAddBtn() {
        return (this.props.isUserOwner &&
            <NavLink
                to="/mission/creation"
            >
                <Button
                    onClick={this.handleAddMission}
                    color="default"
                    variant="contained"
                >
                    Add a mission <AddIcon />
                </Button>
            </NavLink>
        );
    }

    renderList() {
        const { classes } = this.props;
        return (
            <div className={classes.listContainer}>
                {this.missions.map(m => this.renderMission(m))}
            </div>
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                {this.props.isUserOwner && this.renderAddBtn()}
                {this.missions && this.renderList()}
            </div>
        );
    }
}

AccommodationMissions.propTypes = {
    classes: T.shape({
        container: T.string.isRequired,
    }).isRequired,
    acco: accommodationPropTypes,
    isUserOwner: T.bool.isRequired,
    user: T.shape({
        isLoggedIn: T.bool.isRequired,
        data: T.shape({
            id: T.number.isRequired,
        }).isRequired,
    }).isRequired,
};

export default withStyles(styles)(AccommodationMissions);
