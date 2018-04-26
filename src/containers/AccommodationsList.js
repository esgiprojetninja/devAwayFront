import { connect } from "react-redux";
import { loadSessionUser } from "../actions/user";
import { fetchAccommodations } from "../actions/accommodation";

import AccommodationsListComponent from "../ui/Accommodation/AccommodationsList.jsx";

export const mapStateToProps = state => state;

export const mapDispatchToProps = dispatch => ({
    onInit() {
        dispatch(loadSessionUser());
        dispatch(fetchAccommodations());
    }
});

const AccommodationsList = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccommodationsListComponent);

export default AccommodationsList;
