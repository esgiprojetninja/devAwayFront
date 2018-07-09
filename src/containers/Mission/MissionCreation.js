import { connect } from "react-redux";
import MissionCreationComponent from "../../ui/Mission/MissionCreation";
import { saveMission } from "../../actions/mission";

export const mapStateToProps = state => state;

export const mapDispatchToProps = dispatch => ({
    saveMission(mission) {
        dispatch(saveMission(mission));
    }
});

const MissionCreation = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MissionCreationComponent);

export default MissionCreation;
