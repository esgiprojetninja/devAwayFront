import { connect } from "react-redux";
import {
    fetchAccommodations
} from "../actions/accommodation";

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
        accommodations: data.map(id => byID.get(id)),
        isLoading,
        current,
        hasError,
        errorText,
        mode
    };
};

const mapDispatchToProps = dispatch => ({
    onFetchAccommodationsClicked: () => dispatch(fetchAccommodations())
});

const Accommodation = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccommodationComponent);

export default Accommodation;
