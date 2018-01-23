import { connect } from "react-redux";
import {
    fetchAccommodationsWithoutAuth,
    setCurrentAccommodation,
    showList,
    updateAccommodation,
    saveAccommodation,
    deleteAccommodation
} from "../actions/accommodation";

import AccommodationIdDetailsComponent from "../ui/AccommodationIdDetails.jsx";

const mapStateToProps = (state) => {
    const {
        isLoading,
        current,
        hasError,
        errorText,
        data,
        byID,
        mode
    } = state.accommodation;
    return {
        accommodations: data.map(id => byID.get(id)),
        selectedAccommodations: data.map(id => ({ id, selected: false })),
        isLoading,
        current,
        hasError,
        errorText,
        mode
    };
};

const mapDispatchToProps = dispatch => ({
    onFetchAccommodations: () => dispatch(fetchAccommodationsWithoutAuth()),
    onAccommodationDetailClicked: id => dispatch(setCurrentAccommodation(id)),
    onShowListClicked: () => dispatch(showList()),
    onAccommodationChanged: (property, value) => dispatch(updateAccommodation(property, value)),
    onSaveAccommodationClicked: () => dispatch(saveAccommodation()),
    onDeleteAccommodationClicked: id => dispatch(deleteAccommodation(id))
});

const AccommodationIdDetails = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccommodationIdDetailsComponent);

export default AccommodationIdDetails;
