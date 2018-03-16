import { connect } from "react-redux";

import {
    fetchAccommodations
} from "../actions/accommodation";

import AccommodationCardComponent from "../ui/AccommodationCard.jsx";

export const mapStateToProps = (state) => {
    const {
        isLoading,
        hasError,
        errorText,
        data,
        byID
    } = state.accommodation;
    return {
        accommodations: data.map(id => byID.get(id)),
        isLoading,
        hasError,
        errorText
    };
};

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
