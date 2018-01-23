import { connect } from "react-redux";
import { saveAccommodation } from "../actions/accommodation";
import AccomodationCreationComponent from "../ui/Accommodation/AccommodationCreation";

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    saveAccommodation(accommodation) {
        dispatch(saveAccommodation({
            title: accommodation.title.trim(),
            description: accommodation.description.trim(),
            type: "house",
            city: accommodation.city.trim(),
            region: accommodation.region.trim(),
            country: accommodation.country.trim(),
            address: accommodation.address.trim(),
            nbBedroom: Number(accommodation.nbBedroom),
            nbBathroom: Number(accommodation.nbBathroom),
            nbToilet: Number(accommodation.nbToilet),
            nbMaxBaby: Number(accommodation.nbMaxBaby),
            nbMaxChild: Number(accommodation.nbMaxChild),
            nbMaxGuest: Number(accommodation.nbMaxGuest),
            nbMaxAdult: Number(accommodation.nbMaxAdult),
            propertySize: Number(accommodation.propertySize),
            animalsAllowed: accommodation.animalsAllowed,
            smokersAllowed: accommodation.smokersAllowed,
            hasInternet: accommodation.hasInternet,
            floor: Number(accommodation.floor),
            minStay: Number(accommodation.minStay),
            maxStay: Number(accommodation.maxStay),
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
