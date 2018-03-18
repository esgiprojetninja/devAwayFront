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
        const fakeAcco = {
            id: 2,
            city: "tomate",
            title: "jardin",
            country: "public",
            description: "sheitan",
            nbMaxGuest: 7,
            nbBedroom: 7,
            nbBathroom: 7
        };
        this.initialProps = {
            ...initialState,
            accommodations: [
                { ...fakeAcco },
                {
                    ...fakeAcco,
                    id: 3
                },
                {
                    ...fakeAcco,
                    id: 4
                }
            ],
            current: {},
            mode: "list",
            onInit: jest.fn()
        };
    });

    it("should render with main items", () => {
        const wrapper = shallow(<AccommodationCard {...this.initialProps} />);
        expect(wrapper.find(".accommodation-card-container").length).toBe(1);
    });

    it("should not render with main items thus calling onInit prop", () => {
        const coucouProps = {
            ...this.initialState,
            accommodations: [],
            current: {},
            mode: "list",
            onInit: jest.fn()
        };
        const wrapper = shallow(<AccommodationCard {...coucouProps} />);
        expect(wrapper.find(".accommodation-card-container").length).toBe(1);
        expect(coucouProps.onInit).toHaveBeenCalled();
    });
});
