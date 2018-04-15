/* eslint-env jest */
import React from "react";
import {
    shallow,
    mount
} from "enzyme";
import { CircularProgress } from "material-ui/Progress";
import mainReducer from "../../../reducers/index";
import AccommodationsList from "../../../ui/Accommodation/AccommodationsList.jsx";

describe("ui <AccommodationsList />", function () {
    beforeEach(() => {
        jest.clearAllMocks();
        const initialState = mainReducer(undefined, {});
        this.initialProps = {
            ...initialState,
            onInit: jest.fn()
        };
    });

    it("should render with main items", () => {
        const wrapper = mount(
            <AccommodationsList {...this.initialProps} />
        );
        expect(wrapper.find("GridList").length).toBe(1);
    });

    it("should trigger onInit on mount", () => {
        shallow(
            <AccommodationsList {...this.initialProps} />
        );
        expect(this.initialProps.onInit).toHaveBeenCalled();
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
            <AccommodationsList {...props} />
        );
        expect(
            wrapper.instance().renderAccommodationList().type.options.name
        ).toBe(CircularProgress.options.name);
    });
});
