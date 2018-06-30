/* global google */
import React from "react";
import * as T from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { accommodationPropTypes } from "../../propTypes/accommodationType";
import { accommodationReducerPropTypes } from "../../propTypes/accommodation.reducer.d";

const styles = theme => ({ // eslint-disable-line
    mapContainer: {
        width: "100%",
        height: "100%",
    }
});

class AccommodationDetailMap extends React.PureComponent {
    static defaultProps = {
        acco: null,
    }

    componentDidMount() {
        try {
            this.map = new google.maps.Map(this.mapDom, {
                center: { lat: this.props.acco.latitude, lng: this.props.acco.longitude },
                zoom: 13,
                mapTypeId: "roadmap"
            });
            if (!this.props.isUserOwner) {
                return;
            }
            this.searchBox = new google.maps.places.SearchBox(this.searchInput);

            const { map, searchBox, searchInput } = this;

            this.loadHomeMarker();

            map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchInput);
            map.addListener("bounds_changed", () => {
                searchBox.setBounds(map.getBounds());
            });
            searchBox.addListener("places_changed", this.onPlacesChanged);
        } catch (e) {
            console.warn("Couldn't load map", e);
        }
    }

    componentWillUnmount() {
        // https://developers.google.com/maps/documentation/javascript/events#removing
        google.maps.event.clearInstanceListeners(this.searchBox);
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
                console.log("Returned place contains no geometry");
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
            markers.push(new google.maps.Marker({
                map,
                icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
                console.log("HEY POULAY", place, this.props.extractAddressFromPlace(place));
            } else {
                bounds.extend(place.geometry.location);
                console.log("FONGALAKWAKI", place);
            }
        });
        map.fitBounds(bounds);
    }

    loadHomeMarker() {
        const { map } = this;
        const { acco } = this.props;
        this.homeMarker = new google.maps.Marker({
            map,
            title: acco.address || "Current address",
            position: {
                lat: acco.latitude,
                lng: acco.longitude,
            }
        });
    }

    map = null;
    homeMarker = null;
    mapDom = null;
    searchBox = null;
    searchInput = null;

    render() {
        if (
            (this.props.user.isLoading && !this.props.user.isLoggedIn && this.map === null)
            || (this.props.acco === null && this.props.accommodation.isLoading)
        ) {
            return null;
        }
        return (
            <div ref={(m) => { this.mapDom = m; }} className={this.props.classes.mapContainer}>
                <input ref={(inp) => { this.searchInput = inp; }} type="text" placeholder="The place's address" />
            </div>
        );
    }
}

AccommodationDetailMap.propTypes = {
    classes: T.shape({
        mapContainer: T.string.isRequired,
    }).isRequired,
    // updateAcco: T.func.isRequired,
    extractAddressFromPlace: T.func.isRequired,
    accommodation: accommodationReducerPropTypes.isRequired,
    acco: accommodationPropTypes,
    isUserOwner: T.bool.isRequired,
    user: T.shape({
        isLoggedIn: T.bool.isRequired,
        isLoading: T.bool.isRequired,
    }).isRequired
};

export default withStyles(styles)(AccommodationDetailMap);
