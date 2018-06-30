import { connect } from "react-redux";

import AccommodationDetailMapComponent from "../ui/Accommodation/AccommodationDetailMap.jsx";
import { saveAccommodation } from "../actions/accommodation";

export const mapStateToProps = state => state;

export const mapDispatchToProps = dispatch => ({
    async updateAcco(acco) {
        const res = await dispatch(saveAccommodation(acco));
        return res;
    },
    extractAddressFromPlace(place) {
        const location = {
            address: place.formatted_address,
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng(),
        };
        const findAddressComp = (stringSearched, propName) => {
            const comp = place.address_components.find(
                compo => compo.types.indexOf(stringSearched) > -1);
            location[propName] = comp ? comp.long_name : null;
        };
        findAddressComp("country", "country");
        findAddressComp("locality", "city");
        findAddressComp("administrative_area_level_1", "region");
        return location;
    },
});

const AccommodationDetailMap = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccommodationDetailMapComponent);

export default AccommodationDetailMap;
