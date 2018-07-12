/* eslint-env jest */
import React from "react";
import {
    shallow
} from "enzyme";
import mainReducer from "../../../reducers/index";
import AccommodationMissionsComp from "../../../ui/Accommodation/AccommodationMissions.jsx";
import { accommodationMock } from "../../mock/body/accommodation";
import { genMissionsMock } from "../../mock/body/mission";

describe("ui <AccommodationMissions />", function () {
    beforeEach(() => {
        jest.clearAllMocks();
        const initialState = mainReducer(undefined, {});
        this.initialProps = {
            ...initialState,
            user: {
                ...initialState.user,
                isLoggedIn: true,
            },
            acco: {
                ...accommodationMock,
                missions: genMissionsMock(3)
            },
            isUserOwner: false,
            classes: {
                container: "T.string.isRequired",
            },
            saveAccommodation: jest.fn()
        };
    });

    it("should render with main items", () => {
        const wrapper = shallow(
            <AccommodationMissionsComp {...this.initialProps} />
        );
        const instance = wrapper.dive().instance();
        expect(instance.renderList().props.children.length).toBe(3);
        expect(instance.render()).not.toBeNull();
    });

    it("should render add mission btn", () => {
        const props = {
            ...this.initialProps,
            isUserOwner: true,
        };
        const wrapper = shallow(
            <AccommodationMissionsComp {...props} />
        ).dive();
        const instance = wrapper.instance();
        expect(instance.renderAddBtn()).not.toBeFalsy();
    });

    it("should change button label to owner", () => {
        const props = {
            ...this.initialProps,
            isUserOwner: true,
        };
        const wrapper = shallow(
            <AccommodationMissionsComp {...props} />
        ).dive();
        const instance = wrapper.instance();
        expect(instance.getMissionBtnLegend(this.initialProps.acco.missions[1])).toBe("Modify");
    });

    it("should change button label to candidate", () => {
        const props = {
            ...this.initialProps,
            isUserOwner: false,
            user: {
                ...this.initialProps.user,
                isLoggedIn: true,
                data: {
                    ...this.initialProps.user.data,
                    id: 123,
                }
            },
        };
        const mission = {
            ...this.initialProps.acco.missions[1],
            traveller: 123,
        };
        const wrapper = shallow(
            <AccommodationMissionsComp {...props} />
        ).dive();
        const instance = wrapper.instance();
        expect(instance.getMissionBtnLegend(mission)).toBe("Cancel Candidacy");
    });

    it("should change button label to visitor", () => {
        const props = {
            ...this.initialProps,
            isUserOwner: false,
            user: {
                ...this.initialProps.user,
                isLoggedIn: false,
            },
        };
        const mission = {
            ...this.initialProps.acco.missions[1],
            traveller: 123,
        };
        const wrapper = shallow(
            <AccommodationMissionsComp {...props} />
        ).dive();
        const instance = wrapper.instance();
        expect(instance.getMissionBtnLegend(mission)).toBe("See it all");
    });

    it("should not return any mission", () => {
        const props = {
            ...this.initialProps,
            isUserOwner: false,
            acco: {
                ...this.initialProps.acco,
                missions: [],
            },
        };
        const wrapper = shallow(
            <AccommodationMissionsComp {...props} />
        ).dive();
        const instance = wrapper.instance();
        expect(instance.missions).toBeNull();
    });
});
