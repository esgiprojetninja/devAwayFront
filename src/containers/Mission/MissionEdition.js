/* global */
import { connect } from "react-redux";
import MissionEditionComponent from "../../ui/Mission/MissionEdition";
import { saveMission, changeCurrentMission, fetchMission, toggleMissionCandidacy, updatePicture } from "../../actions/mission";
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
            }).catch();
        });
    },
    async saveMission(mission) {
        const res = await dispatch(saveMission(mission));
        return res;
    },
    async toggleIsActive() {
        const { mission } = refState;
        const res = await dispatch(saveMission({
            ...mission.current.data,
            isActive: mission.current.data.isActive === 1 ? 0 : 1
        }));
        return res;
    },
    changeCurrent(mission) {
        dispatch(changeCurrentMission(mission));
    },
    toggleMissionCandidacy(apply = true, data) {
        dispatch(toggleMissionCandidacy(apply, null, data));
    },
    updatePicture(missionId, pictureId, imgData) {
        const picture = {
            mission_id: missionId,
            url: imgData,
            id: pictureId,
        };
        dispatch(updatePicture(picture));
    },
});

const MissionEdition = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MissionEditionComponent);

export default MissionEdition;
