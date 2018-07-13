/* global */
import { connect } from "react-redux";
import MissionEditionComponent from "../../ui/Mission/MissionEdition";
import { saveMission, changeCurrentMission, fetchMission } from "../../actions/mission";

let storedState = null;
const MAX_DELAY = 1000;
const REPEAT_DELAY = 100;

export const mapStateToProps = (state) => {
    storedState = state;
    return state;
};

export const mapDispatchToProps = dispatch => ({
    async onInit(missionId) {
        return new Promise((finalRes) => {
            let currentDelay = 0;
            const bePatient = storedState.user.isLoggedIn ?
                Promise.resolve()
                : new Promise(resolve => global.setTimeout(resolve, 200));
            bePatient.then(() => {
                const inter = storedState.user.isGettingData || storedState.user.isLoading ?
                    new Promise((resolve) => {
                        let listener = null;
                        listener = global.setInterval((mockRepeatDelay = REPEAT_DELAY) => {
                            currentDelay += mockRepeatDelay;
                            if ((!storedState.isGettingData && !storedState.user.isLoading)
                                || currentDelay >= MAX_DELAY) {
                                global.clearInterval(listener);
                                resolve();
                            }
                        }, REPEAT_DELAY);
                    })
                    : Promise.resolve();
                inter.then(() => {
                    dispatch(fetchMission(missionId));
                    finalRes();
                });
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
