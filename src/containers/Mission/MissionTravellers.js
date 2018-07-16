/* global */
import { connect } from "react-redux";
import MissionTravellersComponent from "../../ui/Mission/MissionTravellers";

export const mapStateToProps = state => state;

export const mapDispatchToProps = () => ({
    validateCandidacy(candidacy) {
        console.log("AH WAY candidacy", candidacy);
    }
});

const MissionTravellers = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MissionTravellersComponent);

export default MissionTravellers;
