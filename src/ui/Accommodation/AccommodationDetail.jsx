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

    renderSpinner() {
        if (!this.props.accommodation.isLoading) return null;
        return (
            <CircularProgress />
        );
    }

    renderPlace() {
        if (!this.accommodation) return null;
        return (
            <div className="full-width">
                <div className="full-width" style={styles.accommodationCard}>{JSON.stringify(this.accommodation)}</div>
            </div>
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
                <Navbar burgerColor="#acacac" />
                {this.renderImg()}
                <div style={style}>
                    {this.renderSpinner()}
                    {this.renderPlace()}
                </div>
            </div>
        );
    }
}
