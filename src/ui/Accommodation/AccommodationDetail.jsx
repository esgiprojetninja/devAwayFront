/* global window */
import React from "react";
import * as T from "prop-types";
import Grid from "material-ui/Grid";
import { CircularProgress } from "material-ui/Progress";
import Typography from "material-ui/Typography";
import GuestsIcon from "material-ui-icons/People";
import BedsIcon from "material-ui-icons/LocalHotel";
import BathRoomsIcon from "material-ui-icons/InvertColors";
import GMap from "google-map-react";
import Button from "material-ui/Button";
import FloorsIcon from "material-ui-icons/ClearAll";
import Navbar from "../../containers/Navbar";
import Marker from "./AccommodationMarker";
import { getAdaptedContainerWidth } from "./AccommodationsList";
import { accommodationReducerPropTypes } from "../../propTypes/accommodation.reducer.d";
import { midGrey, darkGrey } from "../../styles/theme";

const styles = {
    container: {
        margin: "auto",
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        maxWidth: "1768px",
        background: "#fff",
        color: midGrey,
        paddingBottom: "50px"
    },
    accommodationCard: {
        margin: "0",
        overflowY: "auto",
        wordBreak: "break-all",
        height: "100%",
        maxHeight: "70vh"
    },
    missionCard: {
        padding: "16px 12px",
        borderBottom: `2px solid ${midGrey}`
    },
    coverImg: {
        width: "100%",
        position: "relative",
        height: "430px",
        WebkitBackgroundSize: "cover",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat no-repeat",
        backgroundPosition: "center",
        WebkitBoxShadow: "inset 0px -2px 10px -4px #fff",
        MozBoxShadow: "inset 0px -2px 10px -4px #fff",
        boxShadow: "inset 0px -2px 10px -4px #fff"
    },
    coverImgOpacifier: {
        width: "100%",
        height: "100%",
        position: "absolute",
        background: "#fff",
        opacity: "0.15",
        top: "0",
        left: "0"
    },
    iconInfoItem: {
        marginLeft: "10px"
    },
    iconInfoSVG: {
        color: darkGrey,
        fill: darkGrey
    },
    iconInfoItemText: {
        marginLeft: "6px"
    },
    gMapContainer: {
        height: "300px"
    }
};

export const accordPluralToNumber = (number, word) => {
    return number <= 1 ? word : `${word}s`;
};

export default class AccommodationDetail extends React.PureComponent {
    static propTypes = {
        match: T.shape({
            params: T.shape({
                accoID: T.string.isRequired
            }).isRequired
        }).isRequired,
        onInit: T.func.isRequired,
        applyToMission: T.func.isRequired,
        accommodation: accommodationReducerPropTypes.isRequired,
        user: T.shape({
            isLoggedIn: T.bool.isRequired
        }).isRequired
    }

    constructor() {
        super();
        this.state = {
            containerWidth: getAdaptedContainerWidth()
        };
    }

    componentDidMount() {
        this.props.onInit(this.props.match.params.accoID);
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    get accommodation() {
        const id = Number(this.props.match.params.accoID);
        if (Number.isNaN(id)) return null;
        return this.props.accommodation.byID.get(id) || null;
    }

    get hasMissions() {
        return true || (this.accommodation.missions && this.accommodation.missions.length);
    }

    updateDimensions() {
        return this.setState({
            containerWidth: getAdaptedContainerWidth()
        });
    }

    renderFetchingSpinner() {
        if (!this.props.accommodation.isLoading) return null;
        return (
            <CircularProgress />
        );
    }

    renderMap() {
        const acco = this.accommodation;
        return (
            <GMap
                bootstrapURLKeys={{
                    key: process.env.REACT_APP_GOOGLE_MAP_KEY,
                    language: "en"
                }}
                center={{
                    lat: acco.latitude,
                    lng: acco.longitude
                }}
                zoom={8}
            >
                <Marker
                    accommodation={acco}
                    lat={acco.latitude}
                    lng={acco.longitude}
                />
            </GMap>
        );
    }

    renderDescription() {
        return (
            <div>
                <Typography style={{ color: midGrey, fontWeight: 500 }}>
                    {this.accommodation.description}
                </Typography>
            </div>
        );
    }

    renderIconsInfo() {
        const acco = this.accommodation;
        return (
            <div className="display-flex-row justify-start full-width">
                <div className="display-flex-row">
                    <GuestsIcon style={styles.iconInfoSVG} />
                    <span style={styles.iconInfoItemText}>
                        {acco.nbMaxGuest} {accordPluralToNumber(acco.nbMaxGuest, "traveler")}
                    </span>
                </div>
                <div style={styles.iconInfoItem} className="display-flex-row">
                    <BedsIcon style={styles.iconInfoSVG} />
                    <span style={{ marginLeft: "6px" }}>
                        {acco.nbBedroom} {accordPluralToNumber(acco.nbBedroom, "room")}
                    </span>
                </div>
                <div style={styles.iconInfoItem} className="display-flex-row">
                    <BathRoomsIcon style={styles.iconInfoSVG} />
                    <span style={styles.iconInfoItemText}>
                        {acco.nbBathroom} {accordPluralToNumber(acco.nbBathroom, "bathroom")}
                    </span>
                </div>
                <div style={styles.iconInfoItem} className="display-flex-row">
                    <FloorsIcon style={styles.iconInfoSVG} />
                    <span style={styles.iconInfoItemText}>
                        {acco.floor} {accordPluralToNumber(acco.floor, "floor")}
                    </span>
                </div>
            </div>
        );
    }

    renderHostInfo() {
        // @TODO add address badge verification on host
        const imgUrl = "/img/accommodation.jpg"; // @TODO: Replace by the picture property when API fixed
        const style = {
            ...styles.coverImg,
            backgroundImage: `url("${imgUrl}")`,
            height: "50px",
            width: "50px",
            position: "absolute",
            top: "-17px",
            right: "10px",
            borderRadius: "100%"
        };
        return (
            <div>
                <Typography style={{ color: midGrey, fontWeight: 500 }}>
                    {/* @TODO: replace by real host when API fixed */}
                    Host: <span style={{ letterSpacing: "1px" }}>{this.accommodation.host}</span>
                </Typography>
                <div style={style} />
            </div>
        );
    }

    renderPlaceDetails() {
        return (
            <Grid container className="full-width" style={styles.accommodationCard}>
                <Grid className="relative" item xs={12}>
                    <Typography style={{ color: darkGrey, fontWeight: 500, fontSize: "1.875em" }} className="capitalize" variant="display1">
                        {this.accommodation.title}
                    </Typography>
                </Grid>
                <Grid
                    className="relative"
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={this.hasMissions ? 9 : 12}
                    xl={this.hasMissions ? 8 : 12}
                >
                    {this.renderHostInfo()}
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={this.hasMissions ? 6 : 12}
                    lg={this.hasMissions ? 8 : 12}
                    xl={this.hasMissions ? 8 : 12}
                >
                    {this.renderIconsInfo()}
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={this.hasMissions ? 9 : 12}
                    xl={this.hasMissions ? 8 : 12}
                >
                    {this.renderDescription()}
                </Grid>
                <Grid
                    style={styles.gMapContainer}
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={this.hasMissions ? 9 : 12}
                    xl={this.hasMissions ? 8 : 12}
                >
                    {this.renderMap()}
                </Grid>
            </Grid>
        );
    }

    renderMission(mission) {
        return (
            <div style={styles.missionCard} className="full-width">
                <Typography className="full-width text-center" style={{ color: darkGrey, fontWeight: 500, fontSize: "1.6em" }}>
                    {mission.title}
                </Typography>
                <Typography className="full-width text-justify" style={{ color: midGrey, fontSize: "1.2em" }}>
                    {mission.description}
                </Typography>
                {this.props.user.isLoggedIn ?
                    <Button
                        className="full-width margin-auto"
                        style={{ maxWidth: "200px" }}
                        onClick={() => this.props.applyToMission(mission)}
                        color="primary"
                    >
                        Apply
                    </Button>
                    : null
                }
            </div>
        );
    }


    renderPlace() {
        if (!this.accommodation) return null;
        if (!this.hasMissions) {
            return (
                <Grid container spacing={24} xs={12} sm={12} md={10} lg={8} xl={6}>
                    {this.renderPlaceDetails()}
                    <Typography style={{ color: midGrey, fontWeight: 500 }}>
                        There are no missions linked to this place yet !
                    </Typography>
                </Grid>
            );
        }
        return (
            <Grid container spacing={24} xs={12} sm={12} md={10} lg={8} xl={6}>
                <Grid xs={12} sm={12} md={8} lg={9} xl={10} item container className="full-width" style={styles.accommodationCard}>
                    {this.renderPlaceDetails()}
                </Grid>
                <Grid xs={12} sm={12} md={4} lg={3} xl={2} item container className="full-width" style={styles.accommodationCard}>
                    {
                        Array.from(Array(5)).map((i, m) => {
                            const mission = {
                                nbPersons: Math.round(Math.random() * 10),
                                id: `MissionID-${m}`,
                                title: `Mission ${m}`,
                                description: `description of the sheitan you KNOOW ${m}`,
                                checkInDate: new Date().toISOString(),
                                checkoutDate: new Date(Date.now() + (1000 * 3600 * 24 * 15)),
                                isBooked: m % 2 === 0,
                                isActive: m % 2 === 0
                            };
                            return this.renderMission(mission);
                        })
                    }
                </Grid>
            </Grid>
        );
    }

    renderImg() {
        if (!this.accommodation) {
            return (
                <div style={{ marginTop: "80px" }} />
            );
        }
        const imgUrl = "/img/accommodation.jpg"; // @TODO: Replace by the picture property when API fixed
        const style = {
            ...styles.coverImg,
            backgroundImage: `url("${imgUrl}")`
        };
        return (
            <div style={style}>
                <div style={styles.coverImgOpacifier} />
            </div>
        );
    }

    render() {
        const style = {
            ...styles.container,
            width: this.state.containerWidth
        };
        return (
            <div className="relative full-width" style={{ background: "#fff" }}>
                <Navbar burgerColor={darkGrey} />
                {this.renderImg()}
                <div style={style}>
                    {this.renderFetchingSpinner()}
                    {this.renderPlace()}
                </div>
            </div>
        );
    }
}
