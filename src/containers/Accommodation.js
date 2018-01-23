import { connect } from "react-redux";
import {
    fetchAccommodations,
    setCurrentAccommodation,
    showList,
    updateAccommodation,
    saveAccommodation,
    deleteAccommodation
} from "../actions/accommodation";
import { loadSessionUser } from "../actions/user";

import AccommodationComponent from "../ui/Accommodation/Accommodation.jsx";

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
        ...state,
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
    onDeleteAccommodationClicked: id => dispatch(deleteAccommodation(id)),
    onInit() {
        dispatch(loadSessionUser());
    }
});

const Accommodation = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccommodationComponent);

export default Accommodation;
