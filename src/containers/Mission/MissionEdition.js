/* global */
import { connect } from "react-redux";
import MissionEditionComponent from "../../ui/Mission/MissionEdition";
import { saveMission, changeCurrentMission, fetchMission } from "../../actions/mission";
import { getRules } from "../../utils/mission";

let refState = null;
const MAX_DELAY = 1000;
const REPEAT_DELAY = 100;

export const mapStateToProps = (state) => {
    refState = state;
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
    async onInit(missionId) {
        return new Promise((finalRes) => {
            let currentDelay = 0;
            const bePatient = refState.user.isLoggedIn ?
                Promise.resolve()
                : new Promise(resolve => global.setTimeout(resolve, 200));
            bePatient.then(() => {
                return refState.user.isGettingData || refState.user.isLoading ?
                    new Promise((resolve) => {
                        let listener = null;
                        listener = global.setInterval((mockRepeatDelay = REPEAT_DELAY) => {
                            currentDelay += mockRepeatDelay;
                            if ((!refState.isGettingData && !refState.user.isLoading)
                                || currentDelay >= MAX_DELAY) {
                                global.clearInterval(listener);
                                resolve();
                            }
                        }, REPEAT_DELAY);
                    })
                    : Promise.resolve();
            }).then(() => {
                dispatch(fetchMission(missionId));
                finalRes("poulay");
            });
        });
    },
    async saveMission(mission) {
        const res = await dispatch(saveMission(mission));
        return res;
    },
    changeCurrent(mission) {
        dispatch(changeCurrentMission(mission));
    }
});

const MissionEdition = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MissionEditionComponent);

export default MissionEdition;
