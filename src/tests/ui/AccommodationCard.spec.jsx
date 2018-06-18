/* eslint-env jest */
import React from "react";
import {
    shallow
} from "enzyme";
import mainReducer from "../../reducers/index";
import AccommodationCard from "../../ui/AccommodationCard.jsx";
import { genAccommodationsMock } from "../mock/body/accommodation";

describe("ui <AccommodationCard />", function () {
    beforeAll(() => {
        const initialState = mainReducer(undefined, {}).accommodation;
        this.initialProps = {
            ...initialState,
            accommodations: genAccommodationsMock(),
            current: {},
            onInit: jest.fn()
        };
    });

    it("should render with main items", () => {
        const wrapper = shallow(<AccommodationCard {...this.initialProps} />);
        expect(wrapper.closest(".accommodation-card-container").length).toBe(1);
    });
});
