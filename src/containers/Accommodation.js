import { connect } from "react-redux";
import {
    fetchAccommodations
} from "../actions/accommodation";

import AccommodationComponent from "../ui/Accommodation.jsx";

const mapStateToProps = state => (state.accommodation);

const mapDispatchToProps = dispatch => ({
    onFetchAccommodationsClicked: () => dispatch(fetchAccommodations())
});

const Accommodation = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccommodationComponent);

export default Accommodation;
