import { connect } from "react-redux";

import {
    fetchAccommodationsWithoutAuth
} from "../actions/accommodation";

import AccommodationsListComponent from "../ui/AccommodationsList.jsx";

const mapStateToProps = (state) => {
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

const mapDispatchToProps = dispatch => ({
    onFetchAccommodations: () => dispatch(fetchAccommodationsWithoutAuth())
});

const AccommodationsList = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccommodationsListComponent);

export default AccommodationsList;
