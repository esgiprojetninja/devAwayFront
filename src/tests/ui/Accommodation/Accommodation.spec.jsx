/* eslint-env jest */
import React from "react";
import {
    shallow
} from "enzyme";
import { CircularProgress } from "material-ui/Progress";
import mainReducer from "../../../reducers/index";
import Accommodation from "../../../ui/Accommodation/Accommodation.jsx";

describe("ui <Accommodation />", function () {
    beforeEach(() => {
        jest.clearAllMocks();
        const accos = new Array(10).map((v, i) => ({
            title: `title${i}`,
            id: i,
            city: `city${i}`,
            region: `region${i}`,
            country: `country${i}`,
            hasInternet: i % 2 === 0,
            description: `description${i}`
        }));
        const initialState = mainReducer(undefined, {});
        this.initialProps = {
            ...initialState,
            accommodations: accos,
            isLoading: false,
            current: {
                data: accos[0],
                isLoading: false
            },
            hasError: false,
            errorText: "",
            mode: "list",
            onFetchAccommodationsClicked: jest.fn(),
            onAccommodationDetailClicked: jest.fn(),
            onShowListClicked: jest.fn(),
            onAccommodationChanged: jest.fn(),
            onSaveAccommodationClicked: jest.fn(),
            onDeleteAccommodationClicked: jest.fn(),
            onInit: jest.fn()
        };
    });

    it("should render with main items", () => {
        const wrapper = shallow(
            <Accommodation {...this.initialProps} />
        );
        expect(wrapper.find("ul").length).toBe(1);
    });

    it("should trigger onInit on mount", () => {
        shallow(
            <Accommodation {...this.initialProps} />
        );
        expect(this.initialProps.onInit).toHaveBeenCalled();
    });

    it("should render spinner - renderAccommodationList", () => {
        const props = {
            ...this.initialProps,
            isLoading: true
        };
        const wrapper = shallow(
            <Accommodation {...props} />
        );
        expect(
            wrapper.instance().renderAccommodationList().type.options.name
        ).toBe(CircularProgress.options.name);
    });
});
