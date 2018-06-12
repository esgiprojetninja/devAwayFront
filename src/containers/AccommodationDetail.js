import { connect } from "react-redux";

import { fetchAccommodation } from "../actions/accommodation";
import AccommodationDetailComponent from "../ui/Accommodation/AccommodationDetail.jsx";
import missionApi from "../api/missionApi";

export const mapStateToProps = state => state;

export const mapDispatchToProps = dispatch => ({
    async onInit(id) {
        try {
            const res = await dispatch(fetchAccommodation(id));
            if (!res.payload || !res.payload.data || !res.payload.data.host) {
                return null;
            }
            return res;
        } catch (e) {
            console.error("onInit error:: ", e);
            return null;
        }
    },
    async applyToMission(userId, mission) {
        try {
            const res = await missionApi.applyToMission(userId, mission.id);
            console.log("I WAS DOING", res);
            return res;
        } catch (e) {
            console.error("applyToMission:: ", e);
            return null;
        }
    }
});

const AccommodationDetail = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccommodationDetailComponent);

export default AccommodationDetail;
