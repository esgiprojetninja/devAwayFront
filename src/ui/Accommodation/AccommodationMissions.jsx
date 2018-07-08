/* global clearTimeout */
import React from "react";
import { NavLink } from "react-router-dom";
import * as T from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { accommodationPropTypes } from "../../propTypes/accommodationType";

const styles = theme => ({
    container: {
        width: "100%",
        height: "100%",
        paddingRight: theme.spacing.unit,
        paddingLeft: theme.spacing.unit,
    },
});

class AccommodationMissions extends React.PureComponent {
    static defaultProps = {
        acco: null,
    }

    componentDidMount() {
    }

    get missions() {
        const { acco } = this.props;
        return acco && acco.missions && acco.missions.length > 0 ?
            acco.missions
            : null;
    }

    getMissionBtnLegent(mission) {
        if (this.isUserOwner) {
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

    renderMission(mission) {
        return (
            <div key={mission.id}>
                <Typography className="full-width text-center">
                    {mission.title}
                </Typography>
                <Typography className="full-width text-justify">
                    {mission.description}
                </Typography>
                {this.isUserOwner &&
                    <NavLink
                        to={`/missions/${mission.id}`}
                    >
                        <Button color="primary" variant="raised">{this.getMissionBtnLegent(mission)}</Button>
                    </NavLink>
                }
            </div>
        );
    }

    renderAddBtn() {
        return (!this.missions && this.props.isUserOwner &&
            <NavLink
                to="/mission/creation"
            >
                <Button
                    id="devaway-add-mission-btn"
                    className="full-width margin-auto"
                    onClick={this.handleAddMission}
                    color="default"
                    variant="contained"
                >
                    Add mission <AddIcon />
                </Button>
            </NavLink>
        );
    }

    renderList() {
        return (
            <div className="full-width full-height display-flex-column">
                {this.missions.map(m => this.renderMission(m))}
            </div>
        );
    }

    render() {
        return (
            <div className={this.props.classes.container}>
                {this.missions && this.renderList()}
                {!this.missions && this.props.isUserOwner && (
                    <div className="full-width full-height display-flex-column">
                        {this.renderAddBtn()}
                    </div>
                )}
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
