import { connect } from "react-redux";
import { saveAccommodation } from "../actions/accommodation";
import AccomodationCreationComponent from "../ui/Accommodation/AccommodationCreation";

export const mapStateToProps = state => state;

export const mapDispatchToProps = dispatch => ({
    saveAccommodation(accommodation) {
        dispatch(saveAccommodation(accommodation));
    }
});

const AccommodationCreation = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccomodationCreationComponent);

export default AccommodationCreation;
