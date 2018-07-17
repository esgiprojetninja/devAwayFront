/* eslint-env jest */
/* global window, process */
import React from "react";
import {
    shallow
} from "enzyme";
import mainReducer from "../../../reducers/index";
import AccommodationDetail, { accordPluralToNumber } from "../../../ui/Accommodation/AccommodationDetail.jsx";
import { accommodationMock } from "../../mock/body/accommodation";
import { basicUser } from "../../mock/body/user";

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
        expect(wrapper.text()).toBe("<Connect(withRouter(WithStyles(NavBarComponent))) /><Connect(WithStyles(AccommodationDetailImages)) /><WithStyles(Card) />");
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
        expect(wrapper.text()).toBe("<Connect(withRouter(WithStyles(NavBarComponent))) /><Connect(WithStyles(AccommodationDetailImages)) /><WithStyles(Card) />");
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

    it("should render the save btn", () => {
        const props = {
            ...this.initialProps,
            accommodation: {
                ...this.initialProps.accommodation,
                byID: new Map().set(acco.id, acco),
            },
            user: {
                ...this.initialProps.user,
                isLoggedIn: true,
                data: basicUser
            },
        };
        const wrapper = shallow(
            <AccommodationDetail {...props} />
        );
        const instance = wrapper.instance();
        const btn = instance.renderSaveBtn();
        expect(btn).not.toBeNull();
        expect(btn.props.variant).toBe("fab");
        expect(btn.props.disabled).toBe(true);
    });

    it("should save the new acco", () => {
        const props = {
            ...this.initialProps,
            accommodation: {
                ...this.initialProps.accommodation,
                byID: new Map().set(acco.id, acco),
            },
            user: {
                ...this.initialProps.user,
                isLoggedIn: true,
                data: basicUser
            },
        };
        const wrapper = shallow(
            <AccommodationDetail {...props} />
        );
        const instance = wrapper.instance();
        instance.setState({
            changedProperties: {
                title: "coucou new title"
            }
        });
        const btn = instance.renderSaveBtn();
        expect(btn.props.disabled).toBe(false);

        wrapper.update();

        const domBtn = wrapper.find("#devaway-edit-acco-btn");

        instance.savePlace = jest.fn();
        domBtn.simulate("click");
        expect(instance.savePlace).toHaveBeenCalled();
    });

    it("should change description", () => {
        const props = {
            ...this.initialProps,
            accommodation: {
                ...this.initialProps.accommodation,
                byID: new Map().set(acco.id, acco),
            },
            user: {
                ...this.initialProps.user,
                isLoggedIn: true,
                data: basicUser
            },
        };
        const wrapper = shallow(
            <AccommodationDetail {...props} />
        );
        const instance = wrapper.instance();
        const input = wrapper.find("#devaway-accommodation-description-input");

        input.simulate("change", { target: { value: "NEW DESCRIPTION MOFO" } });
        expect(instance.state.changedProperties.description).toBe("NEW DESCRIPTION MOFO");
    });

    it("should NOT save place - user is not owner", () => {
        const props = {
            ...this.initialProps,
            accommodation: {
                ...this.initialProps.accommodation,
                byID: new Map().set(acco.id, acco),
            },
            user: {
                ...this.initialProps.user,
                isLoggedIn: true,
                data: {
                    ...basicUser,
                    id: 23456789
                }
            },
        };
        const wrapper = shallow(
            <AccommodationDetail {...props} />
        );
        const instance = wrapper.instance();
        expect(instance.savePlace()).toBe(undefined);
    });

    it("should NOT save place - acco not changed", () => {
        const props = {
            ...this.initialProps,
            accommodation: {
                ...this.initialProps.accommodation,
                byID: new Map().set(acco.id, acco),
            },
            user: {
                ...this.initialProps.user,
                isLoggedIn: true,
                data: basicUser,
            },
        };
        const wrapper = shallow(
            <AccommodationDetail {...props} />
        );
        const instance = wrapper.instance();
        instance.setState({ changedProperties: {} });

        expect(instance.savePlace()).toBe(undefined);
    });

    it("should save place", () => {
        const props = {
            ...this.initialProps,
            accommodation: {
                ...this.initialProps.accommodation,
                byID: new Map().set(acco.id, acco),
            },
            user: {
                ...this.initialProps.user,
                isLoggedIn: true,
                data: basicUser,
            },
        };
        const wrapper = shallow(
            <AccommodationDetail {...props} />
        );
        const instance = wrapper.instance();
        instance.setState({ changedProperties: { description: "POULAYMAN" } });

        expect(instance.savePlace()).toBe(undefined);
        expect(this.initialProps.updateAcco).toHaveBeenCalledWith({
            ...acco,
            description: "POULAYMAN",
        });
    });
});
