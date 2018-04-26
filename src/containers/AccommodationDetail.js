import { connect } from "react-redux";

import { fetchAccommodation } from "../actions/accommodation";
import AccommodationDetailComponent from "../ui/Accommodation/AccommodationDetail.jsx";

export const mapStateToProps = state => state;

export const mapDispatchToProps = dispatch => ({
    onInit(id) {
        return dispatch(fetchAccommodation(id));
    }
});

const AccommodationDetail = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccommodationDetailComponent);

export default AccommodationDetail;
