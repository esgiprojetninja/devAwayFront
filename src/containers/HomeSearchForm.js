import { connect } from "react-redux";
import moment from "moment";
import { searchAccommodations } from "../actions/accommodation";
import HomeSearchComponent from "../ui/HomeSearchForm";

export const mapStateToProps = state => state.accommodation.search;

export const mapDispatchToProps = dispatch => ({
    searchPlaces(params) {
        return dispatch(searchAccommodations(params, moment().local().format()));
    }
});

const HomeSearch = connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomeSearchComponent);

export default HomeSearch;
