/* eslint-env jest */
import React from "react";
import {
    shallow
} from "enzyme";
import mainReducer from "../../../reducers/index";
import MissionEdition from "../../../ui/Mission/MissionEdition.jsx";
import { genAccommodationsMock } from "../../mock/body/accommodation";
import { basicUser } from "../../mock/body/user";
import { getRules } from "../../../utils/mission";

describe("ui <MissionEdition />", function () {
    beforeEach(() => {
        global.localStorage = {
            getItem: () => { },
            setItem: () => { },
            deleteItem: () => { },
        };
        jest.clearAllMocks();
        const initialState = mainReducer(undefined, {});
        const accommodations = genAccommodationsMock(3).reduce((finalObj, acco) => ({
            ...finalObj,
            [acco.id]: acco,
        }), {});
        const { accoArr, rules } = getRules(accommodations);
        this.initialProps = {
            ...initialState,
            match: {
                params: {
                    missionID: "123"
                }
            },
            user: {
                ...initialState.user,
                isLoggedIn: true,
                isLoading: false,
                isGettingData: false,
                accommodations,
                accommodationsArr: accoArr,
                data: {
                    ...initialState.user.data,
                    ...basicUser,
                },
            },
            classes: {
                container: "T.string.isRequired",
                mapContainer: "T.string.isRequired",
                avatar: "T.string.isRequired",
                activeContainer: "T.string.isRequired",
                title: "T.string.isRequired",
                saveBtn: "T.string.isRequired",
                cancelBtn: "T.string.isRequired",
                accommodationText: "T.string.isRequired",
                icon: "T.string.isRequired",
                selectFormControl: "T.string.isRequired",
                dateField: "T.string.isRequired",
                bookedIcon: "T.string.isRequired",
            },
            mission: {
                ...initialState.mission,
                current: {
                    ...initialState.mission.current,
                    data: {
                        id: 123,
                        title: "mission title",
                        description: "mission description",
                        checkinDate: "2000-01-01 12:12",
                        checkoutDate: "2000-07-07 12:12",
                        travellers: [],
                    }
                }
            },
            formRules: rules,
            saveMission: jest.fn(),
            changeCurrent: jest.fn(),
            onInit: jest.fn(),
            toggleMissionCandidacy: jest.fn(),
        };
    });
    it("should render with main items", () => {
        const wrapper = shallow(
            <MissionEdition {...this.initialProps} />
        );
        const instance = wrapper.dive().instance();
        expect(instance.render()).not.toBeNull();
    });
});
