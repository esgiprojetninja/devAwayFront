import { connect } from "react-redux";
import { saveAccommodation } from "../actions/accommodation";
import AccomodationCreationComponent from "../ui/Accommodation/AccommodationCreation";

export const mapStateToProps = state => state;

export const mapDispatchToProps = dispatch => ({
    saveAccommodation(accommodation) {
        dispatch(saveAccommodation({
            title: accommodation.title.trim(),
            description: accommodation.description.trim(),
            type: "house",
            city: accommodation.city.trim(),
            region: accommodation.region.trim(),
            country: accommodation.country.trim(),
            address: accommodation.address.trim(),
            nbBedroom: accommodation.nbBedroom,
            nbBathroom: accommodation.nbBathroom,
            nbToilet: accommodation.nbToilet,
            nbMaxBaby: accommodation.nbMaxBaby,
            nbMaxChild: accommodation.nbMaxChild,
            nbMaxGuest: accommodation.nbMaxGuest,
            nbMaxAdult: accommodation.nbMaxAdult,
            propertySize: accommodation.propertySize,
            animalsAllowed: accommodation.animalsAllowed,
            smokersAllowed: accommodation.smokersAllowed,
            hasInternet: accommodation.hasInternet,
            floor: accommodation.floor,
            minStay: accommodation.minStay,
            maxStay: accommodation.maxStay,
            checkinHour: accommodation.checkinHour.trim(),
            checkoutHour: accommodation.checkoutHour.trim(),
            createdAt: accommodation.createdAt.trim(),
            host: accommodation.host.trim(),
            pictures: null,
            latitude: null,
            longitude: null
        }));
    }
});

const AccommodationCreation = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccomodationCreationComponent);

export default AccommodationCreation;
