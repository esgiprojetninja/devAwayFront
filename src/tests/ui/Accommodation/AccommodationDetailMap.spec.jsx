/* eslint-env jest */
/* global */
import React from "react";
import {
    shallow, mount
} from "enzyme";
import mainReducer from "../../../reducers/index";
import AccommodationDetailMap from "../../../ui/Accommodation/AccommodationDetailMap.jsx";
import { accommodationMock } from "../../mock/body/accommodation";
import mapMockFn, { getNewSizeSpy, getNewPointSpy } from "../../mock/googleMap";

describe("ui <AccommodationDetailMap />", function () {
    const accos = new Map();
    let acco = null;

    beforeEach(() => {
        acco = accommodationMock;
        jest.clearAllMocks();
        global.google = mapMockFn(jest);
        const initialState = mainReducer(undefined, {});
        this.initialProps = {
            ...initialState,
            acco,
            isUserOwner: false,
            updateAcco: jest.fn(() => ({})),
            extractAddressFromPlace: jest.fn(() => ({ poulay: "poulay" })),
            classes: {
                mapContainer: "T.string.isRequired",
                wrapper: "T.string.isRequired",
                changeAddressPopup: "T.string.isRequired",
            },
            state: {
                placeSearched: null
            },
        };
        accos.clear();
    });

    it("should render main component", () => {
        const wrapper = shallow(
            <AccommodationDetailMap {...this.initialProps} />
        );
        expect(wrapper.text()).toBe("<AccommodationDetailMap />");
    });

    it("should NOT render main component - user connecting", () => {
        const props = {
            ...this.initialProps,
            user: {
                isLoading: true,
                isLoggedIn: false,
            },
        };
        const wrapper = shallow(
            <AccommodationDetailMap {...props} />
        );
        expect(wrapper.html()).toBe("");
    });

    it("should NOT render main component - fetching acco", () => {
        const props = {
            ...this.initialProps,
            acco: null,
            accommodation: {
                ...this.initialProps.accommodation,
                isLoading: true,
            },
        };
        const wrapper = shallow(
            <AccommodationDetailMap {...props} />
        );
        expect(wrapper.html()).toBe("");
    });

    it("should render address dom", () => {
        const props = {
            ...this.initialProps,
            isUserOwner: true,
        };
        const wrapper = mount(
            <AccommodationDetailMap {...props} />
        );
        expect(wrapper.find("#devaway-address-pop").length).toBe(1);
    });

    it("should NOT call update acco and clean searched place - empty state", () => {
        const props = {
            ...this.initialProps,
            isUserOwner: true,
        };
        const wrapper = mount(
            <AccommodationDetailMap {...props} />
        );
        const btn = wrapper.find("#devaway-change-address-btn").filter("button");
        btn.simulate("click");
        expect(this.initialProps.updateAcco).not.toHaveBeenCalled();
    });

    it("should NOT call update acco and clean searched place - loading acco", () => {
        const props = {
            ...this.initialProps,
            isUserOwner: true,
            accommodation: {
                ...this.initialProps.accommodation,
                isLoading: true,
            },
        };
        const wrapper = mount(
            <AccommodationDetailMap {...props} />
        );
        const btn = wrapper.find("#devaway-change-address-btn").filter("button");
        btn.simulate("click");
        expect(this.initialProps.updateAcco).not.toHaveBeenCalled();
    });

    it("should call update acco and clean searched place", () => {
        const props = {
            ...this.initialProps,
            isUserOwner: true,
            state: {
                placeSearched: "COUCOU",
            },
        };
        const wrapper = mount(
            <AccommodationDetailMap {...props} />
        );
        const btn = wrapper.find("#devaway-change-address-btn").filter("button");
        btn.simulate("click");
        expect(this.initialProps.updateAcco).toHaveBeenCalled();
    });

    it("should not render address dom", () => {
        const props = {
            ...this.initialProps,
            isUserOwner: false,
        };
        const wrapper = mount(
            <AccommodationDetailMap {...props} />
        );
        expect(wrapper.find("#devaway-address-pop").length).toBe(0);
    });

    it("should load home marker", () => {
        const wrapper = shallow(
            <AccommodationDetailMap {...this.initialProps} />
        );
        const instance = wrapper.dive().instance();
        instance.homeMarker = new global.google.maps.Marker();
        const spy = jest.spyOn(instance.homeMarker, "setMap");
        instance.loadHomeMarker();
        expect(spy).toHaveBeenCalled();
    });

    it("should load map", () => {
        const props = {
            ...this.initialProps,
            isUserOwner: true,
        };
        const wrapper = shallow(
            <AccommodationDetailMap {...props} />
        );
        const instance = wrapper.dive().instance();
        instance.loadMap();

        expect(instance.map.addListener).toHaveBeenCalled();
        expect(instance.searchBox.addListener).toHaveBeenCalled();
    });

    it("should change placeSearched state", () => {
        const props = {
            ...this.initialProps,
            isUserOwner: true,
        };
        const wrapper = shallow(
            <AccommodationDetailMap {...props} />
        );
        const instance = wrapper.dive().instance();
        instance.loadMap();

        instance.searchBox.getPlaces = () => [{
            geometry: {
                location: {
                },
                viewport: {
                },
            },
            icon: {},
            name: "poulay man jépété you know like"
        }];
        expect(instance.state.placeSearched).toBeNull();
        instance.onPlacesChanged();
        expect(instance.state.placeSearched).toEqual(this.initialProps.extractAddressFromPlace());
        expect(instance.map.fitBounds).toHaveBeenCalled();
    });

    it("should change NOT placeSearched state", () => {
        const props = {
            ...this.initialProps,
            isUserOwner: true,
        };
        const wrapper = shallow(
            <AccommodationDetailMap {...props} />
        );
        const instance = wrapper.dive().instance();
        instance.loadMap();

        instance.searchBox.getPlaces = () => [{
            geometry: {
                location: {
                },
            },
            icon: {},
            name: "poulay man jépété you know like"
        }];
        expect(instance.state.placeSearched).toBeNull();
        instance.onPlacesChanged();
        expect(instance.state.placeSearched).toBeNull();
        expect(instance.map.fitBounds).toHaveBeenCalled();
    });

    it("should change NOT placeSearched state without geometry", () => {
        const props = {
            ...this.initialProps,
            isUserOwner: true,
        };
        const wrapper = shallow(
            <AccommodationDetailMap {...props} />
        );
        const instance = wrapper.dive().instance();
        instance.loadMap();

        instance.searchBox.getPlaces = () => [{
            icon: {},
            name: "poulay man jépété you know like"
        }];
        expect(instance.state.placeSearched).toBeNull();
        instance.onPlacesChanged();
        expect(instance.state.placeSearched).toBeNull();
        expect(getNewSizeSpy(jest)).not.toHaveBeenCalled();
        expect(getNewPointSpy(jest)).not.toHaveBeenCalled();
        expect(instance.map.fitBounds).toHaveBeenCalled();
    });

    it("should change NOT placeSearched state without any places matched", () => {
        const props = {
            ...this.initialProps,
            isUserOwner: true,
        };
        const wrapper = shallow(
            <AccommodationDetailMap {...props} />
        );
        const instance = wrapper.dive().instance();
        instance.loadMap();

        instance.searchBox.getPlaces = () => [];
        expect(instance.state.placeSearched).toBeNull();
        instance.onPlacesChanged();
        expect(instance.state.placeSearched).toBeNull();
        expect(getNewSizeSpy(jest)).not.toHaveBeenCalled();
        expect(getNewPointSpy(jest)).not.toHaveBeenCalled();
        expect(instance.map.fitBounds).not.toHaveBeenCalled();
    });

    it("should reset searched place", () => {
        const props = {
            ...this.initialProps,
        };
        const wrapper = shallow(
            <AccommodationDetailMap {...props} />
        );
        const instance = wrapper.dive().instance();

        instance.setState({
            placeSearched: "COUCOU",
        });
        instance.searchedMarker = new global.google.maps.Marker();
        instance.map = new global.google.maps.Map();
        instance.searchInput = {
            value: "POULAY"
        };

        instance.clearSearchedPlace();

        expect(instance.state.placeSearched).toBeNull();
        expect(instance.searchedMarker).toBeNull();
        expect(instance.searchInput.value).toBe("");
    });

    it("should relaunch loadMap after a first fail", () => {
        const props = {
            ...this.initialProps,
            isUserOwner: true,
        };
        const wrapper = shallow(
            <AccommodationDetailMap {...props} />
        );
        const { setTimeout } = global;
        global.setTimeout = jest.fn((...args) => {
            if (typeof args[0] === "function") {
                try {
                    args[0]();
                } catch (e) {
                    // nothing to do here
                }
            }
        });
        const instance = wrapper.dive().instance();

        instance.loadMap = jest.fn(() => {
            throw new Error("poulay");
        });
        instance.componentDidMount();

        expect(global.setTimeout).toHaveBeenCalled();
        expect(instance.loadMap.mock.calls.length).toBe(2);
        global.setTimeout = setTimeout;
    });

    it("should clear async listeners on component unmount", () => {
        const wrapper = shallow(
            <AccommodationDetailMap {...this.initialProps} />
        );

        const coucouObjRef = { poulayman: "poulay" };
        const { clearTimeout } = global;
        global.clearTimeout = jest.fn();

        const intance = wrapper.dive().instance();

        intance.searchBox = coucouObjRef;

        const googleEventClearSpy = jest.spyOn(global.google.maps.event, "clearInstanceListeners");

        intance.componentWillUnmount();

        expect(googleEventClearSpy).toHaveBeenCalledWith(coucouObjRef);
        expect(global.clearTimeout).toHaveBeenCalled();
        global.clearTimeout = clearTimeout;
    });
});
