/* global window */
import React from "react";
import * as T from "prop-types";
import Grid from "material-ui/Grid";
import { CircularProgress } from "material-ui/Progress";
import Typography from "material-ui/Typography";
import Navbar from "../../containers/Navbar";
import { getAdaptedContainerWidth } from "./AccommodationsList";
import { accommodationReducerPropTypes } from "../../propTypes/accommodation.reducer.d";
import { darkGrey } from "../../styles/theme";

const styles = {
    container: {
        margin: "auto",
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        maxWidth: "1768px",
        background: "#fff"
    },
    accommodationCard: {
        margin: "auto",
        wordBreak: "break-all"
    },
    coverImg: {
        width: "100%",
        opacity: "0.9",
        zIndex: "-1",
        height: "430px",
        WebkitBackgroundSize: "cover",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat no-repeat",
        backgroundPosition: "center"
    }
};

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

    renderPlaceDescription() {
        if (!this.accommodation) {
            return (
                <CircularProgress />
            );
        }
        return (
            <div>
                <Typography style={{ color: darkGrey, fontWeight: 500, fontSize: "1.875em" }}className="capitalize" variant="display1" gutterBottom>
                    {this.accommodation.title}
                </Typography>
                <Typography>
                    {JSON.stringify(this.accommodation)}
                </Typography>
            </div>
        );
    }

    renderPlace() {
        return (
            <Grid container spacing={24} className="full-width">
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
        return (<div style={style} />);
    }

    render() {
        const style = {
            ...styles.container,
            width: this.state.containerWidth
        };
        return (
            <div className="full-width" style={{ background: "#fff" }}>
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
