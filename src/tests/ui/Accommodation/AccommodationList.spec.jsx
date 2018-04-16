/* eslint-env jest */
/* global window */
import React from "react";
import {
    shallow,
    mount
} from "enzyme";
import { CircularProgress } from "material-ui/Progress";
import mainReducer from "../../../reducers/index";
import AccommodationsList, { getAdaptedTileCols, getAdaptedContainerWidth } from "../../../ui/Accommodation/AccommodationsList.jsx";

describe("ui <AccommodationsList />", function () {
    const accos = new Map();
    const acco = {
        title: "ohmy",
        id: 1,
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
        description: "ohmy",
        createdAt: "ohmy",
        updatedAt: "ohmy",
        checkinHour: "ohmy",
        checkoutHour: "ohmy",
        mission: []
    };

    beforeEach(() => {
        jest.clearAllMocks();
        const initialState = mainReducer(undefined, {});
        this.initialProps = {
            ...initialState,
            onInit: jest.fn()
        };
    });

    it("should render with no items", () => {
        const wrapper = shallow(
            <AccommodationsList {...this.initialProps} />
        );
        expect(wrapper.text()).toBe("No accomodations !");
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

    it("should return 1 for phone screen size", () => {
        window.innerWidth = 480;
        expect(getAdaptedTileCols()).toBe(1);
    });

    it("should return 2 for tablet screen size", () => {
        window.innerWidth = 768;
        expect(getAdaptedTileCols()).toBe(2);
    });

    it("should return 3 for medium screen size", () => {
        window.innerWidth = 992;
        expect(getAdaptedTileCols()).toBe(3);
    });

    it("should return 4 for medium screen size", () => {
        window.innerWidth = 1200;
        expect(getAdaptedTileCols()).toBe(4);
    });

    it("should return 100% for tablet screen size", () => {
        window.innerWidth = 480;
        expect(getAdaptedContainerWidth()).toBe("100%");
    });

    it("should return 95% for medium screen size", () => {
        window.innerWidth = 768;
        expect(getAdaptedContainerWidth()).toBe("95%");
    });

    it("should return 90% for medium screen size", () => {
        window.innerWidth = 992;
        expect(getAdaptedContainerWidth()).toBe("90%");
    });

    it("should remove updateDimensions from the window resize event bubble", () => {
        window.removeEventListener = jest.fn();
        const wrapper = shallow(
            <AccommodationsList {...this.initialProps} />
        );
        const instance = wrapper.instance();
        wrapper.unmount();
        expect(window.removeEventListener.mock.calls[0][0]).toBe("resize");
        expect(window.removeEventListener.mock.calls[0][1].name)
            .toBe(instance.updateDimensions.bind(instance).name);
    });

    it("should show smoke icon", () => {
        const initialState = mainReducer(undefined, {});
        accos.set(acco.id, acco);
        this.initialProps = {
            ...this.initialProps,
            accommodation: {
                ...initialState.accommodation,
                data: [acco.id],
                byID: accos
            }
        };
        const wrapper = mount(
            <AccommodationsList {...this.initialProps} />
        );
        expect(wrapper.find("svg").get(1).props.className.split(" ").find(c => c === "smoke-icon")).toBe("smoke-icon");
    });

    it("should show NOsmoke icon", () => {
        const initialState = mainReducer(undefined, {});
        accos.set(acco.id, {
            ...acco,
            smokersAllowed: false
        });
        this.initialProps = {
            ...this.initialProps,
            accommodation: {
                ...initialState.accommodation,
                data: [acco.id],
                byID: accos
            }
        };
        const wrapper = mount(
            <AccommodationsList {...this.initialProps} />
        );
        expect(wrapper.find("svg").get(1).props.className.split(" ").find(c => c === "no-smoke-icon")).toBe("no-smoke-icon");
    });

    it("should show connectivity icon", () => {
        const initialState = mainReducer(undefined, {});
        accos.set(acco.id, acco);
        this.initialProps = {
            ...this.initialProps,
            accommodation: {
                ...initialState.accommodation,
                data: [acco.id],
                byID: accos
            }
        };
        const wrapper = mount(
            <AccommodationsList {...this.initialProps} />
        );
        expect(wrapper.find("svg").get(0).props.className.split(" ").find(c => c === "connectivity-icon")).toBe("connectivity-icon");
    });

    it("should show NOconnectivity icon", () => {
        const initialState = mainReducer(undefined, {});
        accos.set(acco.id, {
            ...acco,
            hasInternet: false
        });
        this.initialProps = {
            ...this.initialProps,
            accommodation: {
                ...initialState.accommodation,
                data: [acco.id],
                byID: accos
            }
        };
        const wrapper = mount(
            <AccommodationsList {...this.initialProps} />
        );
        expect(wrapper.find("svg").get(0).props.className.split(" ").find(c => c === "no-connectivity-icon")).toBe("no-connectivity-icon");
    });

    it("should show NOconnectivity icon", () => {
        window.innerWidth = 480;
        const wrapper = mount(
            <AccommodationsList {...this.initialProps} />
        );
        const instance = wrapper.instance();
        expect(instance.state.tileCols).toBe(1);
        expect(instance.state.containerWidth).toBe("100%");

        window.innerWidth = 768;

        instance.updateDimensions();

        expect(instance.state.tileCols).toBe(2);
        expect(instance.state.containerWidth).toBe("95%");
    });
});
