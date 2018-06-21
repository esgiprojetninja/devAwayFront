/* eslint-env jest */
/* global window */
import React from "react";
import {
    shallow, mount
} from "enzyme";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import mainReducer from "../../../reducers/index";
import {
    mockAPI
} from "../../mock/API";
import AccommodationsTabs from "../../../ui/Accommodation/AccommodationsTabs.jsx";

const logErr = console.error; // eslint-disable-line

describe("ui <AccommodationsTabs />", function () {
    beforeEach(() => {
        jest.clearAllMocks();
        console.error = logErr; // eslint-disable-line
        window.localStorage = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            removeItem: jest.fn()
        };
        const initialState = mainReducer(undefined, {});
        this.initialProps = {
            ...initialState,
            state: {
                value: 0,
            },
            classes: {
                root: "T.string.isRequired",
            },
        };
        const mockStore = configureMockStore([thunk.withExtraArgument(mockAPI)]);
        this.store = mockStore(initialState);
    });

    it("should render with main items", () => {
        const wrapper = shallow(
            <AccommodationsTabs {...this.initialProps} />
        );
        expect(wrapper.text()).toBe("<AccommodationsTabs />");
    });

    it("should load all places tab toggler", () => {
        const wrapper = shallow(
            <AccommodationsTabs {...this.initialProps} />
        );
        expect(wrapper.closest("#all-places-toggler").length).toBe(1);
    });

    it("should load user places tab toggler", () => {
        const wrapper = shallow(
            <AccommodationsTabs {...this.initialProps} />
        );
        expect(wrapper.closest("#user-places-toggler").length).toBe(1);
    });

    it("should have user tab NOT disabled", () => {
        const props = {
            ...this.initialProps,
            user: {
                ...this.initialProps.user,
                isLoggedIn: true,
            }
        };
        console.error = () => { }; // eslint-disable-line
        const wrapper = mount(
            <Provider store={this.store} >
                <AccommodationsTabs {...props} />
            </Provider>
        );
        const toggler = wrapper.find("#user-places-toggler").filter("button");
        expect(toggler.html()).not.toContain("disabled");
    });
});
