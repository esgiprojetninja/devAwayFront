import { connect } from "react-redux";
import moment from "moment";

import {
    fetchAccommodations
} from "../actions/accommodation";
import { DATE_FORMAT, HOUR_FORMAT } from "../utils/mission";

import AccommodationCardComponent from "../ui/AccommodationCard.jsx";

export const mapStateToProps = (state) => {
    const { accommodation } = state;
    let accoArr = [];
    if (accommodation.search.all.length > 0) {
        if (accommodation.data.length > 0) {
            const { lastSearchDate } = accommodation.search;
            if (lastSearchDate &&
                moment().local().unix() - lastSearchDate.unix() > 1000 * 60 * 10) {
                accoArr = accommodation.data.map(accoId => accommodation.byID.get(accoId));
            } else {
                accoArr = accommodation.search.all;
            }
        } else {
            accoArr = accommodation.search.all;
        }
    } else {
        accoArr = accommodation.data.map(accoId => accommodation.byID.get(accoId));
    }
    return {
        accommodation: state.accommodation,
        accoArr: accoArr.sort((a, b) => {
            const aTs = moment(a.updated_at, `${DATE_FORMAT}, ${HOUR_FORMAT}:ss`).unix();
            const bTs = moment(b.updated_at, `${DATE_FORMAT}, ${HOUR_FORMAT}:ss`).unix();
            return aTs < bTs;
        })
    };
};

export const mapDispatchToProps = dispatch => ({
    onInit() {
        dispatch(fetchAccommodations());
    }
});

const AccommodationCard = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccommodationCardComponent);

export default AccommodationCard;
