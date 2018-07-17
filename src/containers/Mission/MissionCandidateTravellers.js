/* global */
import { connect } from "react-redux";
import MissionCandidateTravellersComponent from "../../ui/Mission/MissionCandidateTravellers";
import { sendMessage } from "../../actions/message";

export const mapStateToProps = state => state;

export const mapDispatchToProps = dispatch => ({
    sendMsg(msg, userId) {
        dispatch(sendMessage(msg, userId));
    },
});

const MissionCandidateTravellers = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MissionCandidateTravellersComponent);

export default MissionCandidateTravellers;
