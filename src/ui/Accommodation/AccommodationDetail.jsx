/* global window */
import React from "react";
import * as T from "prop-types";
import Grid from "material-ui/Grid";
import { CircularProgress } from "material-ui/Progress";
import Typography from "material-ui/Typography";
import GuestsIcon from "material-ui-icons/People";
import BedsIcon from "material-ui-icons/LocalHotel";
import BathRoomsIcon from "material-ui-icons/InvertColors";
import FloorsIcon from "material-ui-icons/ClearAll";
import Navbar from "../../containers/Navbar";
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
        color: midGrey
    },
    accommodationCard: {
        margin: "auto",
        wordBreak: "break-all"
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
    }
};

export const accordPluralToNumber = (number, word) => number <= 1 ? word : `${word}s`;

export default class AccommodationDetail extends React.PureComponent {
    static propTypes = {
        match: T.shape({
            params: T.shape({
                accoID: T.string.isRequired
            }).isRequired
        }).isRequired,
        onInit: T.func.isRequired,
        accommodation: accommodationReducerPropTypes.isRequired
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

    renderIconsInfo() {
        const acco = this.accommodation;
        return (
            <div className="display-flex-row justify-start full-width">
                <div className="display-flex-row">
                    <GuestsIcon style={styles.iconInfoSVG}/>
                    <span style={styles.iconInfoItemText}>
                        {acco.nbMaxGuest} {accordPluralToNumber(acco.nbMaxGuest, "traveler")}
                    </span>
                </div>
                <div style={styles.iconInfoItem} className="display-flex-row">
                    <BedsIcon style={styles.iconInfoSVG}/>
                    <span style={{ marginLeft: "6px"}}>
                        {acco.nbBedroom} {accordPluralToNumber(acco.nbBedroom, "room")}
                    </span>
                </div>
                <div style={styles.iconInfoItem}  className="display-flex-row">
                    <BathRoomsIcon style={styles.iconInfoSVG}/>
                    <span style={styles.iconInfoItemText}>
                        {acco.nbBathroom} {accordPluralToNumber(acco.nbBathroom, "bathroom")}
                    </span>
                </div>
                <div style={styles.iconInfoItem}  className="display-flex-row">
                    <FloorsIcon style={styles.iconInfoSVG}/>
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

    renderPlaceDescription() {
        if (!this.accommodation) {
            return (
                <CircularProgress />
            );
        }
        return (
            <Grid className="full-width" container>
                <Grid className="relative" item xs={12}>
                    <Typography style={{ color: darkGrey, fontWeight: 500, fontSize: "1.875em" }} className="capitalize" variant="display1">
                        {this.accommodation.title}
                    </Typography>
                </Grid>
                <Grid className="relative" item xs={12} sm={12} md={12} lg={9} xl={8}>
                    {this.renderHostInfo()}
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
                    {this.renderIconsInfo()}
                </Grid>
            </Grid>
        );
    }

    renderPlace() {
        return (
            <Grid container spacing={24} xs={12} sm={12} md={10} lg={8} xl={6}>
                <Grid xs={12} sm={12} md={8} lg={9} xl={10} item className="full-width" style={styles.accommodationCard}>{this.renderPlaceDescription()}</Grid>
                <Grid xs={12} sm={12} md={4} lg={3} xl={2} item className="full-width" style={styles.accommodationCard}>MISSIONS</Grid>
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
