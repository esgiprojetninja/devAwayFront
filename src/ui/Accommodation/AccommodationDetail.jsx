/* global window */
import React from "react";
import * as T from "prop-types";
import Grid from "material-ui/Grid";
import { CircularProgress } from "material-ui/Progress";
import Typography from "material-ui/Typography";
import Navbar from "../../containers/Navbar";
import { getAdaptedContainerWidth } from "./AccommodationsList";
import { accommodationReducerPropTypes } from "../../propTypes/accommodation.reducer.d";

const styles = {
    container: {
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: "80px",
        maxWidth: "1768px"
    },
    accommodationCard: {
        margin: "auto",
        wordBreak: "break-all"
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

    updateDimensions() {
        return this.setState({
            containerWidth: getAdaptedContainerWidth()
        });
    }

    renderSpinner() {
        if (!this.props.accommodation.isLoading) return null;
        return (
            <CircularProgress />
        );
    }

    renderPlaceDescription() {
        const id = Number(this.props.match.params.accoID);
        if (Number.isNaN(id)) return null;
        const acco = this.props.accommodation.byID.get(id) || null;
        if (!acco) {
            return (
                <CircularProgress />
            );
        }
        return (
            <div>
                <Typography className="display2" variant="headline" gutterBottom>
                    {acco.title}
                </Typography>
            </div>
        );
    }

    renderCard() {
        const id = Number(this.props.match.params.accoID);
        if (Number.isNaN(id)) return null;
        const acco = this.props.accommodation.byID.get(id) || null;
        return (
            <Grid container spacing={24} className="full-width">
                <Grid xs={12} sm={12} md={8} lg={9} xl={10} item className="full-width" style={styles.accommodationCard}>{this.renderPlaceDescription(acco)}</Grid>
                <Grid xs={12} sm={12} md={4} lg={3} xl={2} item className="full-width" style={styles.accommodationCard}>MISSIONS</Grid>
            </Grid>
        );
    }

    render() {
        const style = {
            ...styles.container,
            width: this.state.containerWidth
        };
        return (
            <div>
                <Navbar burgerColor="#acacac" />
                <div style={style}>
                    {this.renderSpinner()}
                    {this.renderCard()}
                </div>
            </div>
        );
    }
}
