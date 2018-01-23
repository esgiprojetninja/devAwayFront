import { connect } from "react-redux";
import {
    fetchAccommodations,
    setCurrentAccommodation,
    showList,
    updateAccommodation,
    saveAccommodation,
    deleteAccommodation
} from "../actions/accommodation";

import AccommodationDetailsComponent from "../ui/AccommodationDetails.jsx";

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
    onFetchAccommodationsClicked: () => dispatch(fetchAccommodations()),
    onAccommodationDetailClicked: id => dispatch(setCurrentAccommodation(id)),
    onShowListClicked: () => dispatch(showList()),
    onAccommodationChanged: (property, value) => dispatch(updateAccommodation(property, value)),
    onSaveAccommodationClicked: () => dispatch(saveAccommodation()),
    onDeleteAccommodationClicked: id => dispatch(deleteAccommodation(id))
});

const AccommodationDetails = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccommodationDetailsComponent);

export default AccommodationDetails;
