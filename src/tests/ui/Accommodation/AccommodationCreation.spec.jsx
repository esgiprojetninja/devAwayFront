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

    it("should render with main items", () => {
        const wrapper = shallow(
            <AccommocationCreation {...this.initialProps} />
        );
        expect(wrapper.instance().render()).not.toBeNull();
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
});
