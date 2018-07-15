import { connect } from "react-redux";

import { fetchAccommodation, fetchAccommodationsFailure, saveAccommodation } from "../actions/accommodation";
import AccommodationDetailComponent from "../ui/Accommodation/AccommodationDetail.jsx";

export const mapStateToProps = state => state;

export const mapDispatchToProps = dispatch => ({
    async onInit(id) {
        try {
            const res = await dispatch(fetchAccommodation(id));
            if (!res.payload || !res.payload.data || !res.payload.data.host) {
                return false;
            }
            return true;
        } catch (e) {
            dispatch(fetchAccommodationsFailure());
            return false;
        }
    },
    async updateAcco(newAccommodation) {
        await dispatch(saveAccommodation(newAccommodation));
    }
});

const AccommodationDetail = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccommodationDetailComponent);

export default AccommodationDetail;
