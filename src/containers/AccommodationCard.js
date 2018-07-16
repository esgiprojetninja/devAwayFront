import { connect } from "react-redux";

import {
    fetchAccommodations
} from "../actions/accommodation";

import AccommodationCardComponent from "../ui/AccommodationCard.jsx";

export const mapStateToProps = state => ({ accommodation: state.accommodation });

export const mapDispatchToProps = dispatch => ({
    onInit() {
        dispatch(fetchAccommodations());
    }
});

const AccommodationCard = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccommodationCardComponent);

export default AccommodationCard;
