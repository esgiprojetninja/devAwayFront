/* eslint-env jest */
import React from "react";
import {
    shallow
} from "enzyme";
import mainReducer from "../../../reducers/index";
import AccommocationCreationComp from "../../../ui/Accommodation/AccommodationCreation.jsx";

describe("ui <AccommocationCreation />", function () {
    beforeEach(() => {
        jest.clearAllMocks();
        const initialState = mainReducer(undefined, {});
        this.initialProps = {
            ...initialState,
            user: {
                ...initialState.user,
                isLoggedIn: true
            },
            classes: {
                title: "T.string.isRequired",
                container: "T.string.isRequired",
                paper: "T.string.isRequired",
                item: "T.string.isRequired",
                mapContainer: "T.string.isRequired",
                saveBtn: "T.string.isRequired",
                numberFormControl: "T.string.isRequired",
                mapLabel: "T.string.isRequired",
                labelControl: "T.string.isRequired",
            },
            saveAccommodation: jest.fn()
        };
    });

    it("should render with main items", () => {
        const wrapper = shallow(
            <AccommocationCreationComp {...this.initialProps} />
        );
        const instance = wrapper.dive().instance();
        expect(instance.render()).not.toBeNull();
    });

    it("should not render content - !loggedIn", () => {
        const props = {
            ...this.initialProps,
            user: {
                ...this.initialProps.user,
                isLoggedIn: false
            }
        };
        const wrapper = shallow(
            <AccommocationCreationComp {...props} />
        );
        const instance = wrapper.dive().instance();
        expect(instance.renderContent()).toBeNull();
    });

    it("should NOT render save button", () => {
        const props = {
            ...this.initialProps,
            accommodation: {
                ...this.initialProps.accommodation,
                isLoading: true
            }
        };
        const wrapper = shallow(
            <AccommocationCreationComp {...props} />
        );
        const instance = wrapper.dive().instance();
        expect(instance.renderSaveButton()).toBeNull();
    });

    it("should render save button", () => {
        const props = {
            ...this.initialProps,
            accommodation: {
                ...this.initialProps.accommodation,
                isLoading: false
            }
        };
        const wrapper = shallow(
            <AccommocationCreationComp {...props} />
        );
        const instance = wrapper.dive().instance();
        expect(instance.renderSaveButton()).not.toBeNull();
    });

    it("should render spinner", () => {
        const props = {
            ...this.initialProps,
            accommodation: {
                ...this.initialProps.accommodation,
                isLoading: true
            }
        };
        const wrapper = shallow(
            <AccommocationCreationComp {...props} />
        );
        const instance = wrapper.dive().instance();
        expect(instance.renderSpinner()).not.toBeNull();
    });

    it("should NOT render spinner", () => {
        const props = {
            ...this.initialProps,
            accommodation: {
                ...this.initialProps.accommodation,
                isLoading: false
            }
        };
        const wrapper = shallow(
            <AccommocationCreationComp {...props} />
        );
        const instance = wrapper.dive().instance();
        expect(instance.renderSpinner()).toBeNull();
    });
});
