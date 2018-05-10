import { connect } from "react-redux";

import { fetchAccommodation } from "../actions/accommodation";
import AccommodationDetailComponent from "../ui/Accommodation/AccommodationDetail.jsx";
import userApi from "../api/userApi";
import missionApi from "../api/missionApi";

export const mapStateToProps = state => state;

export const mapDispatchToProps = (dispatch, getState) => ({
    async onInit(id) {
        try {
            const res = await dispatch(fetchAccommodation(id));
            if (!res.payload || !res.payload.data || !res.payload.data.host) {
                return null;
            }
            // @TODO adapt to API when it's finally f* fixed
            const userId = res.payload.data.host.split("/");
            const host = await userApi.getUser(userId[userId.length - 1]);
            console.log("YEAH HOST", host);
            return host;
        } catch (e) {
            console.error("onInit error:: ", e);
            return null;
        }
    },
    async applyToMission(userId, mission) {
        try {
            const res = await missionApi.applyToMission(userId, mission.id);
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
