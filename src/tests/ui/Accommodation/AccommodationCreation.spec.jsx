/* eslint-env jest */
import React from "react";
import {
    shallow
} from "enzyme";
import mainReducer from "../../../reducers/index";
import { AccommocationCreation } from "../../../ui/Accommodation/AccommodationCreation.jsx";

describe("ui <AccommocationCreation />", function () {
    beforeEach(() => {
        jest.clearAllMocks();
        const accommodation = {
            title: "title",
            id: 1,
            city: "city",
            region: "region",
            country: "country",
            hasInternet: true,
            isLoading: false,
            description: "description"
        };
        const initialState = mainReducer(undefined, {});
        this.initialProps = {
            ...initialState,
            user: {
                ...initialState.user,
                isLoggedIn: true
            },
            accommodation,
            classes: {
                appBar: "T.string.isRequired",
                flex: "T.string.isRequired"
            },
            saveAccommodation: jest.fn()
        };
    });

    it("should render wirth main items", () => {
        const wrapper = shallow(
            <AccommocationCreation {...this.initialProps} />
        );
        expect(wrapper.text()).toContain("WithStyles(MenuItem)");
        expect(wrapper.text()).toContain("WithStyles(Dialog)");
    });

    it("should not render - !loggedIn", () => {
        const props = {
            ...this.initialProps,
            user: {
                ...this.initialProps.user,
                isLoggedIn: false
            }
        };
        const wrapper = shallow(
            <AccommocationCreation {...props} />
        );
        expect(wrapper.instance().render()).toBeNull();
    });

    it("should prevent keyCode 9 to bubble up", () => {
        const wrapper = shallow(
            <AccommocationCreation {...this.initialProps} />
        );
        const event = {
            keyCode: 9,
            stopPropagation: jest.fn()
        };
        wrapper.find("#acco-creation-dialog").simulate("keydown", event);
        expect(event.stopPropagation).toHaveBeenCalled();
    });
});