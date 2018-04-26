/* global window */
import React from "react";
import * as T from "prop-types";
import { CircularProgress } from "material-ui/Progress";
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

    renderCard() {
        const id = Number(this.props.match.params.accoID);
        if (Number.isNaN(id)) return null;
        const acco = this.props.accommodation.byID.get(id) || null;
        return (
            <div className="full-width">
                <div className="full-width" style={styles.accommodationCard}>{JSON.stringify(acco)}</div>
            </div>
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
