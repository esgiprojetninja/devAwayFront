import { connect } from "react-redux";

import AccommodationsListComponent from "../ui/Accommodation/AccommodationsPersonnalList.jsx";
import { fetchUserAccommodations } from "../actions/user";

export const mapStateToProps = state => state;

export const mapDispatchToProps = dispatch => ({
    onInit() {
        dispatch(fetchUserAccommodations());
    }
});

const AccommodationsList = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccommodationsListComponent);

export default AccommodationsList;
