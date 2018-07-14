/* global window */
import React from "react";
import * as T from "prop-types";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import GuestsIcon from "@material-ui/icons/People";
import BedsIcon from "@material-ui/icons/LocalHotel";
import BathRoomsIcon from "@material-ui/icons/InvertColors";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FloorsIcon from "@material-ui/icons/ClearAll";
import Save from "@material-ui/icons/Save";
import Navbar from "../../containers/Navbar";
import CarouselImages from "../../containers/AccommodationDetailImages";
import PlaceMap from "../../containers/AccommodationDetailMap";
import AccommodationMissions from "../../containers/AccommodationMissions";
import { getAdaptedContainerWidth } from "./AccommodationsList";
import { accommodationReducerPropTypes } from "../../propTypes/accommodation.reducer.d";
import { midGrey, darkGrey } from "../../styles/theme";

const styles = {
    container: {
        margin: "auto",
        padding: "20px 0 20px 20px",
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
    iconInfoItem: {
        marginLeft: "10px",
    },
    iconInfoSVG: {
        color: darkGrey,
        fill: darkGrey,
        paddingRight: 10,
    },
    gMapContainer: {
        height: "300px"
    },
    title: {
        fontSize: "24px",
        color: darkGrey,
    },
    saveBtn: {
        position: "fixed",
        right: 10,
        bottom: 10,
    },
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
        updateAcco: T.func.isRequired,
        accommodation: accommodationReducerPropTypes.isRequired,
        user: T.shape({
            isLoggedIn: T.bool.isRequired,
            data: T.shape({
                id: T.any.isRequired
            }).isRequired
        }).isRequired
    }

    constructor() {
        super();
        this.state = {
            containerWidth: getAdaptedContainerWidth(),
            changedProperties: {},
        };
    }

    componentDidMount() {
        this.props.onInit(this.props.match.params.accoID);
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    componentDidCatch(error) {
        console.log("mais wesh", error, this);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    get isUserOwner() {
        const acco = this.accommodation;
        return this.props.user
            && this.props.user.isLoggedIn
            && acco !== null
            && acco.host
            && acco.host.id === this.props.user.data.id;
    }

    get accommodation() {
        const id = Number(this.props.match.params.accoID);
        if (Number.isNaN(id)) return null;
        return this.props.accommodation.byID.get(id) || null;
    }

    get hasMissions() {
        return this.accommodation.missions && this.accommodation.missions.length > 0;
    }

    get hasAccoChanged() {
        const acco = this.accommodation;
        if (acco === null) {
            return null;
        }
        const changedProps = Object.keys(this.state.changedProperties);
        if (changedProps.length === 0) {
            return false;
        }
        return !!changedProps.find(propName => acco[propName] !== changedProps[propName]);
    }

    updateDimensions() {
        return this.setState({
            containerWidth: getAdaptedContainerWidth()
        });
    }

    savePlace() {
        if (!this.isUserOwner || !this.hasAccoChanged) {
            return;
        }
        this.props.updateAcco({
            ...this.accommodation,
            ...this.state.changedProperties,
        });
    }

    handleChange = propName => (event) => {
        this.setState({
            changedProperties: {
                ...this.state.changedProperties,
                [propName]: event.target.value
            }
        });
    }

    renderFetchingSpinner() {
        if (!this.props.accommodation.isLoading) return null;
        return (
            <CircularProgress />
        );
    }

    renderDescription() {
        return (
            <div>
                <TextField
                    defaultValue={this.accommodation.description}
                    fullWidth
                    id="devaway-accommodation-description-input"
                    label=""
                    name="description"
                    disabled={!this.isUserOwner}
                    onChange={this.handleChange("description")}
                    InputProps={{
                        disableUnderline: !this.isUserOwner,
                    }}
                    inputProps={{ // eslint-disable-line
                        style: { color: midGrey, fontWeight: 500, fontSize: "1.175em" }
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
        );
    }

    renderIconsInfo() {
        const acco = this.accommodation;
        return (
            <div className="display-flex-row justify-start full-width">
                <div style={{ maxWidth: "140px" }} className="display-flex-row">
                    <GuestsIcon style={styles.iconInfoSVG} />
                    <TextField
                        defaultValue={!this.isUserOwner ? `${acco.nbMaxGuest} ${accordPluralToNumber(acco.nbMaxGuest, "traveler")}` : acco.nbMaxGuest}
                        type={this.isUserOwner ? "number" : "text"}
                        label={this.isUserOwner ? accordPluralToNumber(acco.nbMaxGuest, "traveler") : ""}
                        placeholder={`${acco.nbMaxGuest} ${accordPluralToNumber(acco.nbMaxGuest, "traveler")}`}
                        disabled={!this.isUserOwner}
                        onChange={this.handleChange("nbMaxGuest")}
                        name="nbMaxGuest"
                        InputProps={{
                            disableUnderline: !this.isUserOwner,
                        }}
                        inputProps={{ // eslint-disable-line
                            min: 1,
                            max: 99,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div style={{ ...styles.iconInfoItem, maxWidth: "100px" }} className="display-flex-row">
                    <BedsIcon style={styles.iconInfoSVG} />
                    <TextField
                        defaultValue={!this.isUserOwner ? `${acco.nbBedroom} ${accordPluralToNumber(acco.nbBedroom, "room")}` : acco.nbBedroom}
                        type={this.isUserOwner ? "number" : "text"}
                        label={this.isUserOwner ? accordPluralToNumber(acco.nbBedroom, "room") : ""}
                        placeholder={`${acco.nbBedroom} ${accordPluralToNumber(acco.nbBedroom, "room")}`}
                        disabled={!this.isUserOwner}
                        onChange={this.handleChange("nbBedroom")}
                        name="nbBedroom"
                        InputProps={{
                            disableUnderline: !this.isUserOwner,
                        }}
                        inputProps={{ // eslint-disable-line
                            min: 1,
                            max: 99,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div style={{ ...styles.iconInfoItem, maxWidth: "140px" }} className="display-flex-row">
                    <BathRoomsIcon style={styles.iconInfoSVG} />
                    <TextField
                        defaultValue={!this.isUserOwner ? `${acco.nbBathroom} ${accordPluralToNumber(acco.nbBathroom, "bathroom")}` : acco.nbBathroom}
                        type={this.isUserOwner ? "number" : "text"}
                        label={this.isUserOwner ? accordPluralToNumber(acco.nbBathroom, "bathroom") : ""}
                        placeholder={`${acco.nbBathroom} ${accordPluralToNumber(acco.nbBathroom, "bathroom")}`}
                        disabled={!this.isUserOwner}
                        onChange={this.handleChange("nbBathroom")}
                        name="nbBathroom"
                        InputProps={{
                            disableUnderline: !this.isUserOwner,
                        }}
                        inputProps={{ // eslint-disable-line
                            min: 0,
                            max: 99,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div style={{ ...styles.iconInfoItem, maxWidth: "100px" }} className="display-flex-row">
                    <FloorsIcon style={styles.iconInfoSVG} />
                    <TextField
                        defaultValue={!this.isUserOwner ? `${acco.floor} ${accordPluralToNumber(acco.floor, "floor")}` : acco.floor}
                        type={this.isUserOwner ? "number" : "text"}
                        label={this.isUserOwner ? accordPluralToNumber(acco.floor, "floor") : ""}
                        placeholder={`${acco.floor} ${accordPluralToNumber(acco.floor, "floor")}`}
                        disabled={!this.isUserOwner}
                        onChange={this.handleChange("floor")}
                        name="floor"
                        InputProps={{
                            disableUnderline: !this.isUserOwner,
                        }}
                        inputProps={{ // eslint-disable-line
                            min: 1,
                            max: 99,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
            </div>
        );
    }

    renderHostInfo() {
        // @TODO add address badge verification on place
        const imgUrl = this.accommodation.host.avatar ? `data:image/gif;base64, ${this.accommodation.host.avatar}` : "/img/accommodation.jpg";
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
        if (this.isUserOwner) {
            return null;
        }
        return (
            <Grid
                className="relative"
                item
                xs={12}
                sm={12}
                md={12}
                lg={this.hasMissions ? 9 : 12}
                xl={this.hasMissions ? 8 : 12}
            >
                <Typography style={{ color: midGrey, fontWeight: 500 }}>
                    Host: <span style={{ letterSpacing: "1px" }}>{this.accommodation.host.userName}</span>
                </Typography>
                <div style={style} />
            </Grid>
        );
    }

    renderPlaceDetails() {
        return (
            <Grid container className="full-width" style={styles.accommodationCard}>
                <Grid className="relative" item xs={12}>
                    <TextField
                        style={{ color: darkGrey, fontWeight: 500, fontSize: "1.875em" }}
                        defaultValue={this.accommodation.title}
                        fullWidth
                        label=""
                        name="title"
                        onChange={this.handleChange("title")}
                        disabled={!this.isUserOwner}
                        InputProps={{
                            disableUnderline: !this.isUserOwner,
                        }}
                        inputProps={{ // eslint-disable-line
                            style: styles.title
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                {this.renderHostInfo()}
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={this.hasMissions ? 8 : 12}
                    lg={this.hasMissions ? 10 : 12}
                    xl={this.hasMissions ? 10 : 12}
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
                    <PlaceMap acco={this.accommodation} isUserOwner={this.isUserOwner} />
                </Grid>
            </Grid>
        );
    }

    renderSaveBtn() {
        if (!this.isUserOwner) {
            return null;
        }
        return (
            <Button
                style={styles.saveBtn}
                color="primary"
                disabled={!this.hasAccoChanged || this.props.accommodation.isLoading}
                onClick={() => this.savePlace()}
                variant="fab"
                id="devaway-edit-acco-btn"
            >
                <Save />
            </Button>
        );
    }

    render() {
        const style = {
            ...styles.container,
            width: this.state.containerWidth
        };
        return (
            <div className="relative full-width" style={{ background: "#efefef" }}>
                <Navbar burgerColor={darkGrey} />
                <CarouselImages
                    acco={this.accommodation}
                    isUserOwner={this.isUserOwner}
                />
                <div id="#devaway-acco-place-container" style={style}>
                    {this.renderFetchingSpinner()}
                    <Grid container space={24} className="full-width">
                        <Grid
                            xs={12}
                            sm={12}
                            md={8}
                            lg={8}
                            xl={8}
                            item
                            container
                            style={styles.accommodationCard}
                        >
                            {this.accommodation && this.renderPlaceDetails()}
                        </Grid>
                        <Grid
                            xs={12}
                            sm={12}
                            md={4}
                            lg={4}
                            xl={4}
                            item
                            container
                            style={styles.accommodationCard}
                        >
                            {this.accommodation && <AccommodationMissions
                                acco={this.accommodation}
                                isUserOwner={this.isUserOwner}
                            />}
                        </Grid>
                    </Grid>
                    {this.renderSaveBtn()}
                </div>
            </div>
        );
    }
}
