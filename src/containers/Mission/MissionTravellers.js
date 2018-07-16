/* global */
import { connect } from "react-redux";
import MissionTravellersComponent from "../../ui/Mission/MissionTravellers";
import { acceptCandidate } from "../../actions/mission";

export const mapStateToProps = state => state;

export const mapDispatchToProps = dispatch => ({
    acceptCandidacy(candidacy) {
        dispatch(acceptCandidate(candidacy, true));
    },
    refuseCandidacy(candidacy) {
        dispatch(acceptCandidate(candidacy, false));
    },
});

const MissionTravellers = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MissionTravellersComponent);

export default MissionTravellers;
