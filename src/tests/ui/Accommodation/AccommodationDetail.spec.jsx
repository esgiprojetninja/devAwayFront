/* eslint-env jest */
/* global window, process */
import React from "react";
import {
    shallow
} from "enzyme";
import mainReducer from "../../../reducers/index";
import AccommodationDetail, { accordPluralToNumber } from "../../../ui/Accommodation/AccommodationDetail.jsx";
import { accommodationMock } from "../../mock/body/accommodation";

describe("ui <AccommodationDetail />", function () {
    window.localStorage = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn()
    };
    process.env.REACT_APP_GOOGLE_MAP_KEY = "COUCOU_KEY";
    window.removeEventListener = jest.fn();
    window.addEventListener = jest.fn();
    const accos = new Map();
    let accoID = null;
    let acco = null;

    beforeEach(() => {
        acco = accommodationMock;
        accoID = accommodationMock.id;
        window.innerWidth = 1920;
        jest.clearAllMocks();
        const initialState = mainReducer(undefined, {});
        this.initialProps = {
            ...initialState,
            onInit: jest.fn(),
            applyToMission: jest.fn(),
            updateAcco: jest.fn(),
            match: {
                params: {
                    accoID: `${accoID}`
                }
            }
        };
        accos.clear();
    });

    it("should add a 's' character to a word", () => {
        expect(accordPluralToNumber(2, "ye")).toBe("yes");
    });

    it("should render only navbar with no matched accommodation", () => {
        const wrapper = shallow(
            <AccommodationDetail {...this.initialProps} />
        );
        expect(wrapper.text()).toBe("<Connect(WithStyles(NavBarComponent)) /><Connect(WithStyles(AccommodationDetailImages)) />");
    });

    it("should render navbar and accommodation container", () => {
        const initialState = mainReducer(undefined, {});
        const map = new Map();
        map.set(acco.id, acco);
        const state = {
            ...initialState,
            accommodation: {
                ...initialState.accommodation,
                data: [acco.id],
                byID: map,
                isLoading: false
            }
        };

        this.initialProps = {
            ...this.initialProps,
            accommodation: {
                ...state.accommodation,
                data: [acco.id],
                byID: map
            },
            ...state
        };

        const wrapper = shallow(
            <AccommodationDetail {...this.initialProps} />
        );
        expect(wrapper.text()).toBe("<Connect(WithStyles(NavBarComponent)) /><Connect(WithStyles(AccommodationDetailImages)) /><WithStyles(Grid) />");
    });

    it("should call onInit after component mount", () => {
        shallow(
            <AccommodationDetail {...this.initialProps} />
        );
        expect(this.initialProps.onInit).toHaveBeenCalled();
    });

    it("should add a 'resize' event listener to window after component mount", () => {
        shallow(
            <AccommodationDetail {...this.initialProps} />
        );
        expect(window.addEventListener.mock.calls[0][0]).toBe("resize");
    });

    it("should add a 'resize' event listener to window after component was destroyed", () => {
        const wrapper = shallow(
            <AccommodationDetail {...this.initialProps} />
        );
        wrapper.unmount();
        expect(window.removeEventListener.mock.calls[0][0]).toBe("resize");
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
            <AccommodationDetail {...props} />
        );
        expect(wrapper.instance().renderFetchingSpinner()).not.toBeNull();
    });

    it("should adapt state to new dimensions", () => {
        window.innerWidth = 480;
        const wrapper = shallow(
            <AccommodationDetail {...this.initialProps} />
        );
        const instance = wrapper.instance();
        expect(instance.state.containerWidth).toBe("100%");

        window.innerWidth = 768;

        instance.updateDimensions();

        expect(instance.state.containerWidth).toBe("95%");
    });

    it("should return null on accommodation property access", () => {
        this.initialProps = {
            ...this.initialProps,
            match: {
                params: {
                    accoID: "POULAY"
                }
            }
        };
        const wrapper = shallow(
            <AccommodationDetail {...this.initialProps} />
        );
        expect(wrapper.instance().accommodation).toBeNull();
    });

    it("should return FALSE on hasMissions property", () => {
        const initialState = mainReducer(undefined, {});
        const map = new Map();
        const missionsAcco = {
            ...acco,
            missions: []
        };
        map.set(missionsAcco.id, missionsAcco);
        const state = {
            ...initialState,
            accommodation: {
                ...initialState.accommodation,
                data: [acco.id],
                byID: map,
                isLoading: false
            }
        };

        this.initialProps = {
            ...this.initialProps,
            accommodation: {
                ...state.accommodation,
                data: [acco.id],
                byID: map
            },
            ...state
        };
        const wrapper = shallow(
            <AccommodationDetail {...this.initialProps} />
        );
        expect(wrapper.instance().hasMissions).toBe(false);
    });

    it("should return TRUE on hasMissions property", () => {
        const initialState = mainReducer(undefined, {});
        const map = new Map();
        const missionsAcco = {
            ...acco,
            missions: [{
                id: "poulay",
                title: "poulay",
                description: "poulay"
            }]
        };
        map.set(missionsAcco.id, missionsAcco);
        const state = {
            ...initialState,
            accommodation: {
                ...initialState.accommodation,
                data: [acco.id],
                byID: map,
                isLoading: false
            }
        };

        this.initialProps = {
            ...this.initialProps,
            accommodation: {
                ...state.accommodation,
                data: [acco.id],
                byID: map
            },
            ...state
        };
        const wrapper = shallow(
            <AccommodationDetail {...this.initialProps} />
        );
        expect(wrapper.instance().hasMissions).toBe(true);
    });

    it("should render the accommodation's description", () => {
        const initialState = mainReducer(undefined, {});
        const map = new Map();
        map.set(acco.id, acco);
        const state = {
            ...initialState,
            accommodation: {
                ...initialState.accommodation,
                data: [acco.id],
                byID: map,
                isLoading: false
            }
        };

        this.initialProps = {
            ...this.initialProps,
            accommodation: {
                ...state.accommodation,
                data: [acco.id],
                byID: map
            },
            ...state
        };

        const wrapper = shallow(
            <AccommodationDetail {...this.initialProps} />
        );
        expect(wrapper.instance().renderDescription().props.children.props.defaultValue).toBe("coucou description");
    });

    it("should render a mission button", () => {
        const initialState = mainReducer(undefined, {});
        const map = new Map();
        map.set(acco.id, acco);
        const state = {
            ...initialState,
            accommodation: {
                ...initialState.accommodation,
                data: [acco.id],
                byID: map,
                isLoading: false
            },
            user: {
                ...initialState.user,
                isLoggedIn: true
            }
        };

        this.initialProps = {
            ...this.initialProps,
            accommodation: {
                ...state.accommodation,
                data: [acco.id],
                byID: map
            },
            user: {
                ...initialState.user,
                isLoggedIn: true
            },
            ...state
        };

        const wrapper = shallow(
            <AccommodationDetail {...this.initialProps} />
        );
        expect(JSON.stringify(wrapper.instance().renderMission({
            id: "poulay",
            title: "poulay",
            description: "poulay"
        }).props)).toContain("devaway-apply-btn");
    });

    it("should trigger applyToMission on mission button clicked", () => {
        const initialState = mainReducer(undefined, {});
        const map = new Map();
        const missionsAcco = {
            ...acco,
            missions: [{
                id: "poulay",
                title: "poulay",
                description: "poulay"
            }]
        };
        map.set(missionsAcco.id, missionsAcco);
        const state = {
            ...initialState,
            accommodation: {
                ...initialState.accommodation,
                data: [missionsAcco.id],
                byID: map,
                isLoading: false
            },
            user: {
                ...initialState.user,
                isLoggedIn: true
            }
        };

        this.initialProps = {
            ...this.initialProps,
            accommodation: {
                ...state.accommodation,
                data: [missionsAcco.id],
                byID: map
            },
            user: {
                ...initialState.user,
                isLoggedIn: true
            },
            ...state
        };

        const wrapper = shallow(
            <AccommodationDetail {...this.initialProps} />
        );
        const appyBtn = wrapper.find(".devaway-apply-btn");
        appyBtn.simulate("click");
        expect(this.initialProps.applyToMission).toHaveBeenCalled();
    });

    it("should NOT render a mission button", () => {
        const initialState = mainReducer(undefined, {});
        const map = new Map();
        map.set(acco.id, acco);
        const state = {
            ...initialState,
            accommodation: {
                ...initialState.accommodation,
                data: [acco.id],
                byID: map,
                isLoading: false
            },
            user: {
                ...initialState.user,
                isLoggedIn: false
            }
        };

        this.initialProps = {
            ...this.initialProps,
            accommodation: {
                ...state.accommodation,
                data: [acco.id],
                byID: map
            },
            user: {
                ...initialState.user,
                isLoggedIn: false
            },
            ...state
        };

        const wrapper = shallow(
            <AccommodationDetail {...this.initialProps} />
        );
        expect(JSON.stringify(wrapper.instance().renderMission({
            id: "poulay",
            title: "poulay",
            description: "poulay"
        }).props)).not.toContain("devaway-apply-btn");
    });

    it("should NOT render a place", () => {
        const wrapper = shallow(
            <AccommodationDetail {...this.initialProps} />
        );
        expect(wrapper.instance().renderPlace()).toBeNull();
    });

    it("should render a place with no missions", () => {
        const initialState = mainReducer(undefined, {});
        const map = new Map();
        const missionsAcco = {
            ...acco,
            missions: []
        };
        map.set(missionsAcco.id, missionsAcco);
        const state = {
            ...initialState,
            accommodation: {
                ...initialState.accommodation,
                data: [missionsAcco.id],
                byID: map,
                isLoading: false
            }
        };

        this.initialProps = {
            ...this.initialProps,
            accommodation: {
                ...state.accommodation,
                data: [missionsAcco.id],
                byID: map
            },
            ...state
        };
        const wrapper = shallow(
            <AccommodationDetail {...this.initialProps} />
        );
        expect(JSON.stringify(wrapper.instance().renderPlace().props.children)).toContain("There are no missions linked to this place yet !");
    });

    it("should render a place with missions", () => {
        const initialState = mainReducer(undefined, {});
        const map = new Map();
        const missionsAcco = {
            ...acco,
            missions: [{
                id: "poulay",
                title: "poulay",
                description: "poulay"
            }]
        };
        map.set(missionsAcco.id, missionsAcco);
        const state = {
            ...initialState,
            accommodation: {
                ...initialState.accommodation,
                data: [missionsAcco.id],
                byID: map,
                isLoading: false
            }
        };

        this.initialProps = {
            ...this.initialProps,
            accommodation: {
                ...state.accommodation,
                data: [missionsAcco.id],
                byID: map
            },
            ...state
        };
        const wrapper = shallow(
            <AccommodationDetail {...this.initialProps} />
        );
        expect(JSON.stringify(wrapper.instance().renderPlace().props.children)).toContain("devaway-missions-container");
    });
});
