import { connect } from "react-redux";

import { fetchAccommodation, fetchAccommodationsFailure } from "../actions/accommodation";
import AccommodationDetailComponent from "../ui/Accommodation/AccommodationDetail.jsx";
import missionApi from "../api/missionApi";

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
    async applyToMission(userId, mission) {
        try {
            await missionApi.applyToMission(userId, mission.id);
            // const res = await missionApi.applyToMission(userId, mission.id);
            // console.log("I WAS DOING", res);
            return true;
        } catch (e) {
            // console.error("applyToMission:: ", e);
            return false;
        }
    }
});

const AccommodationDetail = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccommodationDetailComponent);

export default AccommodationDetail;
