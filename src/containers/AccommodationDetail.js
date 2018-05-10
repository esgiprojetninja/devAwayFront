import { connect } from "react-redux";

import { fetchAccommodation } from "../actions/accommodation";
import AccommodationDetailComponent from "../ui/Accommodation/AccommodationDetail.jsx";
import userApi from "../api/userApi";

export const mapStateToProps = state => state;

export const mapDispatchToProps = dispatch => ({
    async onInit(id) {
        const res = await dispatch(fetchAccommodation(id));
        if (res.payload && res.payload.data && res.payload.data.host) {
            // @TODO adapt to API when it's finally f* fixed
            const userId = res.payload.data.host.split("/");
            try {
                const host = await userApi.getUser(userId[userId.length - 1]);
                console.log("YEAH HOST", host);
                return host;
            } catch (e) {
                console.error("OH MY GAD", e);
                return null;
            }
        }
    }
});

const AccommodationDetail = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccommodationDetailComponent);

export default AccommodationDetail;
