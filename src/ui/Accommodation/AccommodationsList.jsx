/* global window */
import React from "react";
import * as T from "prop-types";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { NavLink } from "react-router-dom";
import ListSubheader from "@material-ui/core/ListSubheader";
import Connectivity from "@material-ui/icons/NetworkWifi";
import NoConnectivity from "@material-ui/icons/WifiLock";
import NoSmoke from "@material-ui/icons/SmokeFree";
import Smoke from "@material-ui/icons/SmokingRooms";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { accommodationReducerPropTypes } from "../../propTypes/accommodation.reducer.d";
import { getAccoImg } from "../../utils/accommodation";

export const getAdaptedTileCols = () => {
    if (window.innerWidth <= 480) {
        return 1;
    } else if (window.innerWidth <= 768) {
        return 2;
    } else if (window.innerWidth <= 992) {
        return 3;
    }
    return 4;
};

export const getAdaptedContainerWidth = () => {
    if (window.innerWidth <= 480) {
        return "100%";
    } else if (window.innerWidth <= 768) {
        return "95%";
    }
    return "90%";
};

const styles = {
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        backgroundColor: "inherit",
        margin: "auto",
        maxWidth: "1768px"
    },
    gridList: {
        width: "100",
        height: "auto",
        margin: "auto",
        overflow: "hidden"
    },
    gridListTitle: {
        width: "100",
        fontSize: "xx-large",
        margin: "0 0",
        paddingLeft: 0,
        color: "rgba(8, 8, 8, 0.65)"
    },
    gridTileBar: {
        background: "#fafafa",
        textAlign: "left",
        width: "100%",
        paddingTop: "5px",
        display: "flex",
        alignItems: "start"
    },
    gridCustomDiv: {
        position: "absolute",
        top: "0",
        right: "0",
        height: "70%",
        width: "50%",
        maxWidth: "60px",
        background: "rgba(8, 8, 8, .6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
        padding: "10px 0"
    },
    icon: {
        height: "22px",
        width: "22px",
        fill: "#fff"
    },
    descP: {
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        width: "98%",
        color: "#fff"
    }
};


export default class AccommodationsList extends React.PureComponent {
    static propTypes = {
        onInit: T.func.isRequired,
        accommodation: accommodationReducerPropTypes.isRequired
    }

    constructor() {
        super();
        this.state = {
            tileCols: getAdaptedTileCols(),
            containerWidth: getAdaptedContainerWidth()
        };
    }

    componentDidMount() {
        this.props.onInit();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    updateDimensions() {
        return this.setState({
            tileCols: getAdaptedTileCols(),
            containerWidth: getAdaptedContainerWidth()
        });
    }

    renderSpinner() {
        if (this.props.accommodation.isLoading) {
            return (
                <CircularProgress />
            );
        }
        return null;
    }

    renderAccommodationList() {
        const { accommodation } = this.props;
        if (!this.props.accommodation.data.length) {
            return (
                <p style={{ textAlign: "center", width: "100%" }}>No accomodations !</p>
            );
        }
        return (
            <GridList
                style={styles.gridList}
                spacing={12}
                cellHeight={220}
                cols={this.state.tileCols}
            >
                <GridListTile cols={4} style={{ height: "auto" }}>
                    <ListSubheader style={styles.gridListTitle} component="div">All places</ListSubheader>
                </GridListTile>
                {
                    accommodation.data.map((accoID) => {
                        const filledAcco = accommodation.byID.get(accoID);
                        const basicStyle = {
                            transition: "transform .2s ease-in-out, box-shadow .2s ease-in-out",
                            cursor: "pointer"
                        };
                        const accoStyle = (this.state.hoveredTile === filledAcco.id) ? {
                            ...basicStyle,
                            transform: "scale(1.1, 1.1)",
                            WebkitBoxShadow: "12px 13px 69px -17px rgba(255, 255, 255, 0.75)",
                            MozBoxShadow: "12px 13px 69px -17px rgba(255, 255, 255, 0.75)",
                            boxShadow: "12px 13px 69px -17px rgba(255, 255, 255, 0.75)",
                            zIndex: "10"
                        } : basicStyle;
                        return (
                            <GridListTile
                                style={accoStyle}
                                key={filledAcco.id}
                                onMouseEnter={() => this.setState({ hoveredTile: filledAcco.id })}
                                onMouseLeave={() => this.setState({ hoveredTile: null })}
                            >
                                <NavLink
                                    to={`/places/${filledAcco.id}`}
                                >
                                    <img style={{ width: "100%", height: "auto" }} src={getAccoImg(filledAcco)} alt={filledAcco.title} />
                                    <div style={styles.gridCustomDiv}>
                                        {filledAcco.hasInternet ?
                                            <Connectivity className="connectivity-icon" style={styles.icon} /> :
                                            <NoConnectivity className="no-connectivity-icon" style={styles.icon} />
                                        }
                                        {filledAcco.smokersAllowed ?
                                            <Smoke className="smoke-icon" style={styles.icon} /> :
                                            <NoSmoke className="no-smoke-icon" style={styles.icon} />
                                        }
                                        <p style={styles.descP}>{`${filledAcco.propertySize}`.charAt(0)} rooms</p>
                                    </div>
                                    <GridListTileBar
                                        style={styles.gridTileBar}
                                        title={
                                            <Typography
                                                style={{
                                                    fontSize: "13px",
                                                    fontWeight: "700",
                                                    color: "rgba(8,8,8,.75)"
                                                }}
                                            >
                                                {filledAcco.title}
                                            </Typography>
                                        }
                                        subtitle={
                                            <Typography
                                                style={{
                                                    fontSize: "13px",
                                                    color: "rgba(8,8,8,.60)"
                                                }}
                                            >
                                                {filledAcco.city} - {filledAcco.country}
                                            </Typography>
                                        }
                                    />
                                </NavLink>
                            </GridListTile>
                        );
                    })
                }
            </GridList>
        );
    }

    render() {
        const listStyle = {
            ...styles.root,
            width: this.state.containerWidth
        };
        return (
            <div style={listStyle}>
                {this.renderSpinner()}
                {this.renderAccommodationList()}
            </div>
        );
    }
}
