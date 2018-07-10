import { connect } from "react-redux";
import moment from "moment";
import MissionCreationComponent from "../../ui/Mission/MissionCreation";
import { saveMission, changeCurrentMission } from "../../actions/mission";

export const mapStateToProps = (state) => {
    const accoArr = Object.keys(state.user.accommodations)
        .filter(id => id !== null && id !== undefined && !Number.isNaN(Number(id)))
        .map(id => ({
            label: state.user.accommodations[id].title,
            id: Number(id)
        }));
    return {
        ...state,
        user: {
            ...state.user,
            accommodationsArr: accoArr
        },
        formRules: {
            title: { min: 6, max: 24 },
            description: { min: 6, max: 255 },
            checkinDate: { min: moment().local().add(1, "hours"), isDate: true },
            stayTime: { min: 1, max: (1000 * 60 * 60 * 24 * 365 * 10) }, // max 10 years
            stayTimeUnit: {
                values: [
                    { label: "hours", value: 0 },
                    { label: "days", value: 1 },
                    { label: "weeks", value: 2 },
                    { label: "months", value: 3 },
                ],
                isSelect: true
            },
            accommodation: {
                values: accoArr.map(acco => ({
                    ...acco,
                    value: acco.id })),
                isSelect: true,
            },
        },
    };
};

export const mapDispatchToProps = dispatch => ({
    saveMission(mission) {
        dispatch(saveMission(mission));
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
