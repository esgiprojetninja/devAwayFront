/* global */
import { connect } from "react-redux";
import MissionCreationComponent from "../../ui/Mission/MissionCreation";
import { saveMission, changeCurrentMission } from "../../actions/mission";
import { getRules } from "../../utils/mission";

export const mapStateToProps = (state) => {
    const { accoArr, rules } = getRules(state.user.accommodations);
    return {
        ...state,
        user: {
            ...state.user,
            accommodationsArr: accoArr
        },
        formRules: rules,
    };
};

export const mapDispatchToProps = dispatch => ({
    async saveMission(mission) {
        const res = await dispatch(saveMission(mission));
        return res;
    },
    changeCurrent(mission) {
        dispatch(changeCurrentMission(mission));
    }
});

const MissionCreation = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MissionCreationComponent);

export default MissionCreation;
