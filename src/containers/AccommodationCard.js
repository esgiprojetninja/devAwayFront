import { connect } from "react-redux";

import {
    fetchAccommodationsWithoutAuth
} from "../actions/accommodation";

import AccommodationCardComponent from "../ui/AccommodationCard.jsx";

const mapStateToProps = (state) => {
    const {
        isLoading,
        hasError,
        errorText,
        data,
        byID,
    } = state.accommodation;
    return {
        accommodations: data.map(id => byID.get(id)),
        isLoading,
        hasError,
        errorText,
    };
};

const mapDispatchToProps = dispatch => ({
    onFetchAccommodations: () => dispatch(fetchAccommodationsWithoutAuth())
});

const AccommodationCard = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccommodationCardComponent);

export default AccommodationCard;
