import { connect } from "react-redux";
import MissionCreationComponent from "../../ui/Mission/MissionCreation";

export const mapStateToProps = state => state;

export const mapDispatchToProps = () => ({
    saveMission() {
        return "poulay";
    }
});

const MissionCreation = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MissionCreationComponent);

export default MissionCreation;
