/* eslint-env jest */
import React from "react";
import House from "react-icons/lib/fa/home";
import Building from "react-icons/lib/fa/building";
import {
    shallow
} from "enzyme";
import AccommodationMarker from "../../../ui/Accommodation/AccommodationMarker.jsx";

describe("ui <AccommodationMarker />", function () {
    const acco = {
        title: "ohmy",
        id: 123,
        longitude: 1,
        latitude: 1,
        nbBedroom: 1,
        nbBathroom: 1,
        nbToilet: 1,
        nbMaxBaby: 1,
        nbMaxChild: 1,
        nbMaxGuest: 1,
        nbMaxAdult: 1,
        propertySize: 1,
        floor: 1,
        minStay: 1,
        maxStay: 1,
        city: "ohmy",
        region: "ohmy",
        address: "ohmy",
        country: "ohmy",
        type: "ohmy",
        pictures: "ohmy",
        host: "ohmy",
        animalsAllowed: true,
        smokersAllowed: true,
        hasInternet: true,
        description: "ohmyifgozjregizojgioredescription",
        createdAt: "ohmy",
        updatedAt: "ohmy",
        checkinHour: "ohmy",
        checkoutHour: "ohmy",
        mission: []
    };

    beforeEach(() => {
        this.initialProps = {
            accommodation: acco
        };
        jest.clearAllMocks();
    });

    it("should render default SVG - Home", () => {
        const wrapper = shallow(
            <AccommodationMarker {...this.initialProps} />
        );
        expect(wrapper.find(House.name)).toHaveLength(1);
    });

    it("should render default SVG - Building", () => {
        this.initialProps = {
            accommodation: {
                ...acco,
                type: "appartment"
            }
        };
        const wrapper = shallow(
            <AccommodationMarker {...this.initialProps} />
        );
        expect(wrapper.find(Building.name)).toHaveLength(1);
    });

    it("should return null on accommodation prop access", () => {
        this.initialProps = {
            nope: "poulay"
        };
        const wrapper = shallow(
            <AccommodationMarker {...this.initialProps} />
        );
        expect(wrapper.instance().acco).toBeNull();
    });
});
