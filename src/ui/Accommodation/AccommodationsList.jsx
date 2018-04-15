/* global window */
import React from "react";
import * as T from "prop-types";
import GridList, { GridListTile, GridListTileBar } from "material-ui/GridList";
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
        marginTop: "90px",
        maxWidth: "1768px"
    },
    gridList: {
        width: "100",
        height: "auto",
        margin: "auto"
    },
    gridTile: {
        width: "99%",
        height: "auto"
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
            <GridList style={styles.gridList} spacing={8} cellHeight={180} cols={this.state.tileCols}>
                {
                    accommodation.data.map((accoID) => {
                        const filledAcco = accommodation.byID.get(accoID);
                        const img = "/img/accommodation.jpg";
                        return (
                            <GridListTile key={filledAcco.id}>
                                <img src={img} alt={filledAcco.title} />
                                <GridListTileBar
                                    title={filledAcco.title}
                                    subtitle={<span>In: {filledAcco.city}</span>}
                                />
                            </GridListTile>
                        );
                    }).slice(0, 12)
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
