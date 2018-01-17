import { connect } from "react-redux";
import {
    fetchAccommodations,
    fetchAccommodationsWithoutAuth,
    setCurrentAccommodation,
    showList,
} from "../actions/accommodation";

import AccommodationCardComponent from "../ui/AccommodationCard.jsx";

const mapStateToProps = (state) => {
    const {
        isLoading,
        current,
        hasError,
        errorText,
        data,
        byID,
    } = state.accommodation;
    return {
        accommodations: data.map(id => byID.get(id)),
        selectedAccommodations: data.map(id => ({ id, selected: false })),
        isLoading,
        current,
        hasError,
        errorText,
    };
};

const mapDispatchToProps = dispatch => ({
    onFetchAccommodations: () => dispatch(fetchAccommodationsWithoutAuth()),
    onShowListClicked: () => dispatch(showList()),
});

const AccommodationCard = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccommodationCardComponent);

export default AccommodationCard;
