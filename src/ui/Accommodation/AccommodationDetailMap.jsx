/* global google, clearTimeout */
import React from "react";
import * as T from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { accommodationPropTypes } from "../../propTypes/accommodationType";
import { accommodationReducerPropTypes } from "../../propTypes/accommodation.reducer.d";

const styles = theme => ({
    wrapper: {
        width: "100%",
        height: "100%",
        position: "relative",
    },
    mapContainer: {
        width: "100%",
        height: "100%",
    },
    changeAddressPopup: {
        padding: theme.spacing.unit * 2,
        width: "220px",
        height: "auto",
        position: "absolute",
        background: "#fff",
        top: 2,
        right: 10,
        opacity: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        "& > *": {
            marginTop: theme.spacing.unit,
        }
    },
    cancelAddressBtn: {
        position: "absolute",
        background: "#fff",
        top: 2,
        right: 2,
    },
});

let mapDelayedLoader = null;
const MAP_LOAD_DELAY = 3000;

class AccommodationDetailMap extends React.PureComponent {
    static defaultProps = {
        acco: null,
        zoom: 5,
        state: {
            placeSearched: null,
        },
        updateAddress: null,
    }

    state = {
        placeSearched: this.props.state.placeSearched || null
    };

    componentDidMount() {
        try {
            this.loadMap();
        } catch (e) {
            mapDelayedLoader = setTimeout(this.loadMap.bind(this), MAP_LOAD_DELAY);
        }
    }

    componentWillUnmount() {
        try {
            if (this.searchBox !== null) {
                google.maps.event.clearInstanceListeners(this.searchBox);
            }
            clearTimeout(mapDelayedLoader);
        } catch (e) {
            console.error("DetailMap error on unmount", e);
        }
    }

    onPlacesChanged = () => {
        const { map, searchBox } = this;
        const places = searchBox.getPlaces();
        if (places.length === 0) {
            return;
        }
        let markers = [];
        // Clear out the old markers.
        markers.forEach((marker) => {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();
        places.forEach((place) => {
            if (!place.geometry) {
                return;
            }
            const icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            this.searchedMarker = new google.maps.Marker({
                map,
                icon,
                title: place.name,
                position: place.geometry.location
            });
            markers.push(this.searchedMarker);

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
                this.setState({
                    placeSearched: this.props.extractAddressFromPlace(place),
                });
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    }

    get mapCenter() {
        const { latitude, longitude } = this.props.acco;
        if (typeof latitude !== "number" || typeof longitude !== "number") {
            return {
                latitude: 48,
                longitude: 48,
            };
        }
        return {
            latitude, longitude
        };
    }

    loadMap() {
        const { latitude, longitude } = this.mapCenter;
        this.map = new google.maps.Map(this.mapDom, {
            center: { lat: latitude, lng: longitude },
            zoom: this.props.zoom,
            mapTypeId: "roadmap"
        });

        this.loadHomeMarker();
        if (!this.props.isUserOwner) {
            return;
        }
        this.searchBox = new google.maps.places.SearchBox(this.searchInput);

        const { map, searchBox, searchInput } = this;

        map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchInput);
        map.addListener("bounds_changed", () => {
            searchBox.setBounds(map.getBounds());
        });
        searchBox.addListener("places_changed", this.onPlacesChanged);
    }

    map = null;
    searchedMarker = null;
    homeMarker = null;
    mapDom = null;
    searchBox = null;
    searchInput = null;

    loadHomeMarker() {
        if (this.homeMarker !== null) {
            this.homeMarker.setMap(null);
            this.homeMarker = null;
        }
        const { map } = this;
        const { acco } = this.props;
        if (typeof acco.latitude !== "number" || typeof acco.longitude !== "number") {
            return;
        }
        this.homeMarker = new google.maps.Marker({
            map,
            title: acco.address || "Current address",
            position: {
                lat: acco.latitude,
                lng: acco.longitude,
            }
        });
    }

    clearSearchedPlace() {
        this.setState({
            placeSearched: null,
        });
        if (this.searchedMarker && this.searchedMarker.setMap) {
            this.searchedMarker.setMap(null);
        }
        this.searchedMarker = null;
        const { acco } = this.props;
        const center = new google.maps.LatLng(acco.latitude, acco.longitude);
        this.map.panTo(center);
        this.searchInput.value = "";
    }

    saveNewAdress = async () => {
        if (typeof this.props.updateAddress === "function") {
            this.props.updateAddress(this.state.placeSearched);
            return;
        }
        await this.props.updateAcco({
            ...this.props.acco,
            ...this.state.placeSearched,
        });
        this.clearSearchedPlace();
        this.loadHomeMarker();
    }

    renderValidAddressPopup() {
        if (this.props.isUserOwner !== true) {
            return null;
        }
        const { classes } = this.props;
        const address = this.state.placeSearched && this.state.placeSearched.address ?
            this.state.placeSearched.address
            : this.props.acco.address;

        if (typeof address !== "string" || address.length === 0) {
            return null;
        }
        return (
            <div id="devaway-address-pop" className={classes.changeAddressPopup}>
                <Typography className="full-width text-center">
                    {
                        address
                    }
                </Typography>
                <Button
                    id="devaway-change-address-btn"
                    className="full-width margin-auto"
                    disabled={
                        this.state.placeSearched === null ||
                        this.props.accommodation.isLoading
                    }
                    onClick={this.saveNewAdress}
                    color="primary"
                    variant="contained"
                >
                    Set address
                </Button>
                <Button
                    className="full-width margin-auto"
                    aria-label="Cancel"
                    disabled={
                        this.state.placeSearched === null ||
                        this.props.accommodation.isLoading
                    }
                    onClick={this.clearSearchedPlace}
                    color="default"
                    variant="contained"
                >
                    Cancel
                </Button>
            </div>
        );
    }

    render() {
        if (
            (this.props.user.isGettingData && this.map === null)
            || (this.props.acco === null && this.props.accommodation.isLoading)
        ) {
            return null;
        }
        const { classes } = this.props;
        return (
            <div className={classes.wrapper}>
                <div ref={(m) => { this.mapDom = m; }} className={classes.mapContainer}>
                    <input ref={(inp) => { this.searchInput = inp; }} type="text" placeholder="The place's address" />
                </div>
                {this.renderValidAddressPopup()}
            </div>
        );
    }
}

AccommodationDetailMap.propTypes = {
    classes: T.shape({
        mapContainer: T.string.isRequired,
        wrapper: T.string.isRequired,
        changeAddressPopup: T.string.isRequired,
    }).isRequired,
    zoom: T.number,
    updateAcco: T.func.isRequired,
    extractAddressFromPlace: T.func.isRequired,
    updateAddress: T.func,
    accommodation: accommodationReducerPropTypes.isRequired,
    acco: accommodationPropTypes,
    isUserOwner: T.bool.isRequired,
    user: T.shape({
        isLoggedIn: T.bool.isRequired,
        isGettingData: T.bool.isRequired,
        isLoading: T.bool.isRequired,
    }).isRequired,
    state: T.shape({
        placeSearched: T.string,
    }),
};

export default withStyles(styles)(AccommodationDetailMap);
