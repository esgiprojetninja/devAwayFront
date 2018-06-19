/* eslint-env jest */
import React from "react";
import {
    shallow
} from "enzyme";
import mainReducer from "../../../reducers/index";
import AccommocationsTabs from "../../../ui/Accommodation/AccommodationsTabs.jsx";

describe("ui <AccommocationsTabs />", function () {
    beforeEach(() => {
        jest.clearAllMocks();
        const initialState = mainReducer(undefined, {});
        this.initialProps = {
            ...initialState,
            state: {
                value: 0,
            },
            classes: {
                root: "T.string.isRequired",
                tabsRoot: "T.string.isRequired",
                tabRoot: "T.string.isRequired",
                tabSelected: "T.string.isRequired",
            },
        };
    });

    it("should render with main items", () => {
        const wrapper = shallow(
            <AccommocationsTabs {...this.initialProps} />
        );
        expect(wrapper.text()).toBe("<AccommodationsTabs />");
    });

    it("should load all places tab toggler", () => {
        const wrapper = shallow(
            <AccommocationsTabs {...this.initialProps} />
        );
        expect(wrapper.closest("#all-places-toggler").length).toBe(1);
    });

    it("should load user places tab toggler", () => {
        const wrapper = shallow(
            <AccommocationsTabs {...this.initialProps} />
        );
        expect(wrapper.closest("#user-places-toggler").length).toBe(1);
    });
});
