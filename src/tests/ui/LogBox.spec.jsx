/* eslint-env jest */
import React from "react";
import {
    mount
} from "enzyme";
import LogBox from "../../ui/LogBox.jsx";

describe("ui <LogBox />", () => {
    const defaultProps = {
        data: {
            id: 0,
            email: "",
            lastName: "",
            firstName: "",
            languages: "",
            skills: "",
            createdAt: "",
            updateAt: "",
            username: ""
        },
        isLoading: false,
        isLoggedIn: false,
        hasError: false,
        errorText: "",
        onSubmit: jest.fn(),
        onLogoutClicked: jest.fn()
    };

    global.localStorage = {
        getItem: jest.fn()
    };

    it("should render a login button", () => {
        const wrapper = mount(<LogBox
            data={defaultProps.data}
            isLoading={defaultProps.isLoading}
            isLoggedIn={defaultProps.isLoggedIn}
            hasError={defaultProps.hasError}
            errorText={defaultProps.errorText}
            onSubmit={defaultProps.onSubmit}
            onLogoutClicked={defaultProps.onLogoutClicked}
        />);
        expect(wrapper.find("Button").length).toBe(1);
    });

    it("should open dialog", () => {
        const wrapper = mount(<LogBox
            data={defaultProps.data}
            isLoading={defaultProps.isLoading}
            isLoggedIn={defaultProps.isLoggedIn}
            hasError={defaultProps.hasError}
            errorText={defaultProps.errorText}
            onSubmit={defaultProps.onSubmit}
            onLogoutClicked={defaultProps.onLogoutClicked}
        />);
        expect(wrapper.find("Dialog").props().open).toBe(false);
        wrapper.find("Button").simulate("click");
        expect(wrapper.find("Dialog").props().open).toBe(true);
    });

    it("should render a spinner", () => {
        const wrapper = mount(<LogBox
            data={defaultProps.data}
            isLoading
            isLoggedIn={defaultProps.isLoggedIn}
            hasError={defaultProps.hasError}
            errorText={defaultProps.errorText}
            onSubmit={defaultProps.onSubmit}
            onLogoutClicked={defaultProps.onLogoutClicked}
        />);
        expect(wrapper.find("CircularProgress").length).toBe(1);
    });
});
