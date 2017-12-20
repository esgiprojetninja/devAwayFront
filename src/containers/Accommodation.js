import { connect } from "react-redux";
import {
    fetchAccommodations
} from "../actions/accommodation";

import AccommodationComponent from "../ui/Accommodation.jsx";

const mapStateToProps = (state) => {
    const {
        isLoading,
        current,
        hasError,
        errorText,
        data,
        byID
    } = state.accommodation;
    return {
        accommodations: data.map(id => byID.get(id)),
        isLoading,
        current,
        hasError,
        errorText
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
