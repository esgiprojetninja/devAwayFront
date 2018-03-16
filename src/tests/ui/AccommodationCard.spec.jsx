/* eslint-env jest */
import React from "react";
import {
    shallow
} from "enzyme";
import mainReducer from "../../reducers/index";
import AccommodationCard from "../../ui/AccommodationCard.jsx";

describe("ui <AccommodationCard />", function () {
    beforeAll(() => {
        const initialState = mainReducer(undefined, {}).accommodation;
        this.initialProps = {
            ...initialState,
            accommodations: [],
            current: {},
            mode: "list",
            onInit: jest.fn()
        };
    });

    it("should render with main items", () => {
        const wrapper = shallow(<AccommodationCard {...this.initialProps} />);
        expect(wrapper.find(".accommodation-card-container").length).toBe(1);
    });
});
