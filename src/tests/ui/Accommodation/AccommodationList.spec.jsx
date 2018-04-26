/* eslint-env jest */
/* global window */
import React from "react";
import {
    shallow
} from "enzyme";
import { CircularProgress } from "material-ui/Progress";
import mainReducer from "../../../reducers/index";
import AccommodationsList, { getAdaptedTileCols, getAdaptedContainerWidth } from "../../../ui/Accommodation/AccommodationsList.jsx";

describe("ui <AccommodationsList />", function () {
    window.localStorage = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn()
    };
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
        accos.clear();
    });

    it("should render with no items", () => {
        const wrapper = shallow(
            <AccommodationsList {...this.initialProps} />
        );
        expect(wrapper.text()).toContain("No accomodations !");
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
        accos.set(acco.id, {
            ...acco,
            smokersAllowed: true
        });

        const state = {
            ...initialState,
            accommodation: {
                ...initialState.accommodation,
                data: [acco.id],
                byID: accos,
                isLoading: false
            }
        };

        this.initialProps = {
            ...this.initialProps,
            accommodation: {
                ...state.accommodation,
                data: [acco.id],
                byID: accos
            },
            ...state
        };
        const wrapper = shallow(
            <AccommodationsList {...this.initialProps} />
        );
        expect(JSON.stringify(wrapper.instance().renderAccommodationList().props.children[1]["0"])).not.toContain("no-smoke-icon");
        expect(JSON.stringify(wrapper.instance().renderAccommodationList().props.children[1]["0"])).toContain("smoke-icon");
    });

    it("should show NOsmoke icon", () => {
        const initialState = mainReducer(undefined, {});
        accos.set(acco.id, {
            ...acco,
            smokersAllowed: false
        });

        const state = {
            ...initialState,
            accommodation: {
                ...initialState.accommodation,
                data: [acco.id],
                byID: accos,
                isLoading: false
            }
        };

        this.initialProps = {
            ...this.initialProps,
            accommodation: {
                ...state.accommodation,
                data: [acco.id],
                byID: accos
            },
            ...state
        };
        const wrapper = shallow(
            <AccommodationsList {...this.initialProps} />
        );
        expect(JSON.stringify(wrapper.instance().renderAccommodationList().props.children[1]["0"])).toContain("no-smoke-icon");
    });

    it("should show connectivity icon", () => {
        const initialState = mainReducer(undefined, {});
        accos.set(acco.id, {
            ...acco,
            hasInternet: true
        });

        const state = {
            ...initialState,
            accommodation: {
                ...initialState.accommodation,
                data: [acco.id],
                byID: accos,
                isLoading: false
            }
        };

        this.initialProps = {
            ...this.initialProps,
            accommodation: {
                ...state.accommodation,
                data: [acco.id],
                byID: accos
            },
            ...state
        };
        const wrapper = shallow(
            <AccommodationsList {...this.initialProps} />
        );
        expect(JSON.stringify(wrapper.instance().renderAccommodationList().props.children[1]["0"])).toContain("connectivity-icon");
        expect(JSON.stringify(wrapper.instance().renderAccommodationList().props.children[1]["0"])).not.toContain("no-connectivity-icon");
    });

    it("should show NOconnectivity icon", () => {
        const initialState = mainReducer(undefined, {});
        accos.set(acco.id, {
            ...acco,
            hasInternet: false
        });

        const state = {
            ...initialState,
            accommodation: {
                ...initialState.accommodation,
                data: [acco.id],
                byID: accos,
                isLoading: false
            }
        };

        this.initialProps = {
            ...this.initialProps,
            accommodation: {
                ...state.accommodation,
                data: [acco.id],
                byID: accos
            },
            ...state
        };
        const wrapper = shallow(
            <AccommodationsList {...this.initialProps} />
        );
        expect(JSON.stringify(wrapper.instance().renderAccommodationList().props.children[1]["0"])).toContain("no-connectivity-icon");
    });

    it("should adapt state to new dimensions", () => {
        window.innerWidth = 480;
        const wrapper = shallow(
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
