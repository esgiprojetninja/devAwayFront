import { connect } from "react-redux";
import { saveAccommodation } from "../actions/accommodation";
import AccomodationCreationComponent from "../ui/Accommodation/AccommodationCreation";

export const mapStateToProps = state => state;

export const mapDispatchToProps = dispatch => ({
    saveAccommodation(accommodation) {
        const unemptyAcco = Object.keys(accommodation)
            .filter(prop => accommodation[prop] !== null && accommodation !== undefined)
            .reduce((finalObj, prop) => ({
                ...finalObj,
                [prop]: accommodation[prop]
            }), {});
        dispatch(saveAccommodation(unemptyAcco));
    }
});

const AccommodationCreation = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccomodationCreationComponent);

export default AccommodationCreation;
