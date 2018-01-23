import { connect } from "react-redux";
import { saveAccommodation } from "../actions/accommodation";
import AccomodationCreationComponent from "../ui/Accommodation/AccommodationCreation";

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    saveAccommodation(accommodation) {
        dispatch(saveAccommodation({
            title: accommodation.title,
            description: accommodation.description,
            city: accommodation.city,
            region: accommodation.region,
            country: accommodation.country,
            address: accommodation.address,
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
            checkinHour: accommodation.checkinHour,
            checkoutHour: accommodation.checkoutHour,
            createdAt: accommodation.createdAt,
            updatedAt: accommodation.updatedAt
        }));
    }
});

const AccommodationCreation = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccomodationCreationComponent);

export default AccommodationCreation;
