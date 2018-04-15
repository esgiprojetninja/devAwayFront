import { connect } from "react-redux";
import {
    fetchAccommodations,
    setCurrentAccommodation,
    showList,
    saveAccommodation,
    deleteAccommodation
} from "../actions/accommodation";
import { loadSessionUser } from "../actions/user";

import AccommodationsListComponent from "../ui/Accommodation/AccommodationsList.jsx";

export const mapStateToProps = state => state;

export const mapDispatchToProps = dispatch => ({
    onFetchAccommodationsClicked: () => dispatch(fetchAccommodations()),
    onAccommodationDetailClicked: id => dispatch(setCurrentAccommodation(id)),
    onShowListClicked: () => dispatch(showList()),
    onSaveAccommodationClicked: () => dispatch(saveAccommodation()),
    onDeleteAccommodationClicked: id => dispatch(deleteAccommodation(id)),
    onInit() {
        dispatch(loadSessionUser());
    }
});

const AccommodationsList = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccommodationsListComponent);

export default AccommodationsList;
