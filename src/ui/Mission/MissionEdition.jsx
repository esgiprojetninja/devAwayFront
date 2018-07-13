/* global */
import React from "react";
import * as T from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Save from "@material-ui/icons/Save";
import Cancel from "@material-ui/icons/Cancel";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import { darkGrey } from "../../styles/theme";
import Navbar from "../../containers/Navbar";
import CarouselImages from "../../containers/AccommodationDetailImages";

const styles = theme => ({
    saveBtn: {
        position: "fixed",
        right: theme.spacing.unit * 2,
        bottom: theme.spacing.unit * 4,
    },
    cancelBtn: {
        position: "fixed",
        right: theme.spacing.unit * 2,
        bottom: theme.spacing.unit * 12,
    },
});

class MissionEdition extends React.PureComponent {
    async componentDidMount() {
        await this.props.onInit(this.props.match.params.missionID);
        this.resetState(this.props.mission.current.data);
    }

    get isUserOwner() {
        const { mission } = this;
        return this.props.user
            && this.props.user.isLoggedIn
            && mission
            && mission.accommodation
            && mission.accommodation.host
            && mission.accommodation.host.id === this.props.user.data.id;
    }

    get mission() {
        const id = Number(this.props.match.params.missionID);
        if (Number.isNaN(id)) return null;
        const { data } = this.props.mission.current;
        return data && !Number.isNaN(Number(data.id)) ?
            data :
            null;
    }

    get isLoading() {
        return this.props.user.isLoading
            || this.props.user.isGettingData
            || this.props.mission.current.isLoading;
    }

    resetState(mission = this.state.oldMission) {
        const { data } = this.props.mission.current;
        this.setState({
            oldMission: JSON.parse(JSON.stringify(mission)),
            ...Object.keys(data).reduce((finalObj, missionKey) => ({
                ...finalObj,
                [missionKey]: data[missionKey],
                [`${missionKey}CanBeEmpty`]: data[missionKey] === null || data[missionKey] === undefined || data[missionKey] === "",
                [`${missionKey}Error`]: "",
            }), {})
        });
    }

    handleSave = () => {
        if (this.isLoading || !this.isMissionValid) {
            return;
        }
        this.props.saveMission(this.mission);
    }

    renderSaveBtns() {
        if (!this.isUserOwner) {
            return null;
        }
        if (this.isLoading) {
            return null;
        }
        return (
            <div>
                <Button
                    className={this.props.classes.cancelBtn}
                    aria-label="Cancel"
                    disabled={!this.isMissionValid || this.isLoading}
                    onClick={this.resetState}
                    color="default"
                    variant="fab"
                    id="devaway-cancel-edition-mission-btn"
                >
                    <Cancel />
                </Button>
                <Button
                    className={this.props.classes.saveBtn}
                    aria-label="Save"
                    color="primary"
                    disabled={!this.isMissionValid || this.isLoading}
                    onClick={this.handleSave}
                    variant="fab"
                    id="devaway-edit-mission-btn"
                >
                    <Save />
                </Button>
            </div>
        );
    }

    renderSpinner() {
        return (
            this.isLoading &&
            <div id="devaway-mission-edition-spinner-container" style={{ marginTop: 20 }} className="display-flex-row full-width">
                <CircularProgress color="primary" />
            </div>
        );
    }

    render() {
        return (
            <div className="full-width" style={{ background: "#efefef" }}>
                <Navbar burgerColor={darkGrey} />
                <CarouselImages
                    acco={this.mission}
                    isUserOwner={this.isUserOwner}
                    changePictureListener={(mission, pictureId, imgData) => {
                        console.log("HEY POULAYMAN", mission, imgData);
                    }}
                />
                {this.renderSpinner()}
                <Grid container space={24} className="full-width">
                    <Grid xs={12} item container>
                        {this.mission && <div>{JSON.stringify(this.mission)}</div>}
                    </Grid>
                </Grid>
                {this.renderSaveBtns()}
            </div>
        );
    }
}
MissionEdition.propTypes = {
    match: T.shape({
        params: T.shape({
            missionID: T.string.isRequired
        }).isRequired
    }).isRequired,
    user: T.shape({
        isLoggedIn: T.bool.isRequired,
        isLoading: T.bool.isRequired,
        isGettingData: T.bool.isRequired,
        accommodations: T.shape({}).isRequired,
        data: T.shape({
            id: T.number
        }),
    }).isRequired,
    mission: T.shape({
        current: T.shape({
            data: T.shape({}).isRequired,
            isLoading: T.bool.isRequired,
        }).isRequired,
    }).isRequired,
    classes: T.shape({
        saveBtn: T.string.isRequired,
        cancelBtn: T.string.isRequired,
    }).isRequired,
    saveMission: T.func.isRequired,
    // changeCurrent: T.func.isRequired,
    onInit: T.func.isRequired,
};

export default withStyles(styles)(MissionEdition);
