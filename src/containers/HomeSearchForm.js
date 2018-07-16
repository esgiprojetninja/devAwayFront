import { connect } from "react-redux";
import moment from "moment";
import { searchAccommodations } from "../actions/accommodation";
import HomeSearchComponent from "../ui/HomeSearchForm";
import openMapApi from "../api/openmapApi";

export const mapStateToProps = state => state.accommodation.search;

export const mapDispatchToProps = dispatch => ({
    async searchPlaces(params) {
        try {
            let queryParams = {
                ...params,
            };
            if (params.location) {
                const res = await openMapApi.search(params.location);
                console.log("ah", res);
                if (res.address) {
                    queryParams = {
                        ...queryParams,
                        ...res.address,
                    };
                }
            }
            console.log("coucou params", queryParams);
            return dispatch(searchAccommodations(queryParams, moment().local().format()));
        } catch (error) {
            console.warn("couldn't hit openmap api", error);
            return dispatch(searchAccommodations(params, moment().local().format()));
        }
    }
});

const HomeSearch = connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomeSearchComponent);

export default HomeSearch;
