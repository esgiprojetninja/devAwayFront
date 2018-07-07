import { connect } from "react-redux";

import AccommodationMissionsComponent from "../ui/Accommodation/AccommodationMissions";
import { saveAccommodation } from "../actions/accommodation";

export const mapStateToProps = state => state;

export const mapDispatchToProps = dispatch => ({
    async updateAcco(acco) {
        const res = await dispatch(saveAccommodation(acco));
        return res;
    },
});

const AccommodationMissions = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccommodationMissionsComponent);

export default AccommodationMissions;
