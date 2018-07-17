/* global */
import { connect } from "react-redux";
import MissionOwnerTravellersComponent from "../../ui/Mission/MissionOwnerTravellers";
import { acceptCandidate } from "../../actions/mission";
import { sendMessage } from "../../actions/message";

export const mapStateToProps = state => state;

export const mapDispatchToProps = dispatch => ({
    acceptCandidacy(candidacy) {
        dispatch(acceptCandidate(candidacy, true));
    },
    refuseCandidacy(candidacy) {
        dispatch(acceptCandidate(candidacy, false));
    },
    sendMsg(candidacy, msg) {
        dispatch(sendMessage(msg, candidacy.user.id));
    },
});

const MissionOwnerTravellers = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MissionOwnerTravellersComponent);

export default MissionOwnerTravellers;
