/* global window */
import React from "react";
import * as T from "prop-types";
import GridList, { GridListTile, GridListTileBar } from "material-ui/GridList";
import Subheader from "material-ui/List/ListSubheader";
import Connectivity from "material-ui-icons/NetworkWifi";
import NoConnectivity from "material-ui-icons/WifiLock";
import NoSmoke from "material-ui-icons/SmokeFree";
import Smoke from "material-ui-icons/SmokingRooms";
import Typography from "material-ui/Typography";
import { CircularProgress } from "material-ui/Progress";
import { accommodationReducerPropTypes } from "../../propTypes/accommodation.reducer.d";

const getAdaptedTileCols = () => {
    if (window.innerWidth <= 480) {
        return 1;
    } else if (window.innerWidth <= 768) {
        return 2;
    } else if (window.innerWidth <= 992) {
        return 3;
    }
    return 4;
};

const getAdaptedContainerWidth = () => {
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
        backgroundColor: "#fff",
        margin: "auto",
        marginTop: "70px",
        maxWidth: "1768px"
    },
    gridList: {
        width: "100",
        height: "auto",
        margin: "auto"
    },
    gridListTitle: {
        width: "100",
        fontSize: "xx-large",
        margin: "0 0",
        paddingLeft: 0,
        color: "rgba(8, 8, 8, 0.65)"
    },
    gridTileBar: {
        background: "#fff",
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

    renderAccommodationList() {
        if (this.props.accommodation.isLoading) {
            return (
                <CircularProgress />
            );
        }
        const { accommodation } = this.props;
        return (
            <GridList
                style={styles.gridList}
                spacing={12}
                cellHeight={220}
                cols={this.state.tileCols}
            >
                <GridListTile key="Subheader" cols={4} style={{ height: "auto" }}>
                    <Subheader style={styles.gridListTitle} component="div">Accommodations</Subheader>
                </GridListTile>
                {
                    accommodation.data.map((accoID) => {
                        const filledAcco = accommodation.byID.get(accoID);
                        const img = "/img/accommodation.jpg"; // @TODO: Replace by the picture property when API fixed
                        return (
                            <GridListTile classes={styles.GridListTile} key={filledAcco.id}>
                                <img src={img} alt={filledAcco.title} />
                                <div style={styles.gridCustomDiv}>
                                    {filledAcco.hasInternet ?
                                        <Connectivity style={styles.icon} /> :
                                        <NoConnectivity style={styles.icon} />
                                    }
                                    {filledAcco.smokersAllowed ?
                                        <Smoke style={styles.icon} /> :
                                        <NoSmoke style={styles.icon} />
                                    }
                                    <p style={styles.descP}>{`${filledAcco.propertySize}`.charAt(0)} rooms</p>
                                </div>
                                <GridListTileBar
                                    style={styles.gridTileBar}
                                    title={
                                        <Typography
                                            style={{
                                                fontSize: "13px",
                                                fontWeight: "700"
                                            }}
                                            color="rgba(8,8,8,.75)"
                                        >
                                            {filledAcco.title}
                                        </Typography>
                                    }
                                    subtitle={
                                        <Typography
                                            style={{
                                                fontSize: "13px"
                                            }}
                                            color="rgba(8,8,8,.60)"
                                        >
                                            {filledAcco.city} - {filledAcco.country}
                                        </Typography>
                                    }
                                />
                            </GridListTile>
                        );
                    }).slice(0, 12) // @TODO: Adapt to eventual server pagination
                }
            </GridList>
        );
    }

    render() {
        const style = {
            ...styles.root,
            width: this.state.containerWidth
        };
        return (
            <div style={style}>
                { this.renderAccommodationList() }
            </div>
        );
    }
}
