/* eslint-env jest */
import React from "react";
import {
    mount,
    shallow
} from "enzyme";
import LogBox from "../../ui/LogBox.jsx";

describe("ui <LogBox />", function () {
    const defaultProps = {
        data: {
            id: 0,
            email: "",
            lastName: "",
            firstName: "",
            languages: "",
            skills: "",
            createdAt: "",
            updatedAt: "",
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

    beforeEach(() => {
        this.wrapper = mount(<LogBox
            data={defaultProps.data}
            isLoading={defaultProps.isLoading}
            isLoggedIn={defaultProps.isLoggedIn}
            hasError={defaultProps.hasError}
            errorText={defaultProps.errorText}
            onSubmit={defaultProps.onSubmit}
            onLogoutClicked={defaultProps.onLogoutClicked}
        />);
    });

    afterEach(() => {
        this.wrapper.unmount();
    });

    it("should render a login button", () => {
        expect(this.wrapper.find("Button").length).toBe(1);
    });

    it("should open dialog", () => {
        expect(this.wrapper.find("Dialog").props().open).toBe(false);
        this.wrapper.find("Button").simulate("click");
        expect(this.wrapper.find("Dialog").props().open).toBe(true);
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

    it("should handleClickOpen & handleClose", () => {
        this.wrapper.instance().handleClickOpen();
        expect(this.wrapper.state("open")).toBe(true);
        this.wrapper.instance().handleClose();
        expect(this.wrapper.state("open")).toBe(false);
    });

    it("shouldn't open", () => {
        const wrapper = mount(<LogBox
            data={defaultProps.data}
            isLoading
            isLoggedIn
            hasError={defaultProps.hasError}
            errorText={defaultProps.errorText}
            onSubmit={defaultProps.onSubmit}
            onLogoutClicked={defaultProps.onLogoutClicked}
        />);
        wrapper.instance().handleClickOpen();
        expect(wrapper.state("open")).toBe(false);
    });

    it("should handleChange", () => {
        this.wrapper.instance().handleChange("username", { target: { value: "Toto" } });
        expect(this.wrapper.state("username")).toEqual("Toto");
    });

    it("should render errors", () => {
        const wrapper = mount(<LogBox
            data={defaultProps.data}
            isLoading={defaultProps.isLoading}
            isLoggedIn={defaultProps.isLoggedIn}
            hasError
            errorText="Oops"
            onSubmit={defaultProps.onSubmit}
            onLogoutClicked={defaultProps.onLogoutClicked}
        />);
        expect(wrapper.instance().renderErrors()).not.toBe(null);
    });

    it("should handleSubmit", () => {
        const mockSubmit = jest.fn();
        const mockEv = {
            preventDefault: jest.fn()
        };
        const wrapper = mount(<LogBox
            data={defaultProps.data}
            isLoading={defaultProps.isLoading}
            isLoggedIn={defaultProps.isLoggedIn}
            hasError={defaultProps.hasError}
            errorText={defaultProps.errorText}
            onSubmit={mockSubmit}
            onLogoutClicked={defaultProps.onLogoutClicked}
        />);
        wrapper.instance().handleChange("username", { target: { value: "Toto" } });
        wrapper.instance().handleChange("password", { target: { value: "Secret" } });
        wrapper.instance().handleSubmit(mockEv);
        expect(mockEv.preventDefault).toBeCalled();
        expect(mockSubmit).toBeCalledWith({
            username: "Toto",
            password: "Secret"
        });
    });

    it("should renderLoggedBox", () => {
        const wrapper = shallow(<LogBox
            data={{
                ...defaultProps.data,
                username: "Apu"
            }}
            isLoading={defaultProps.isLoading}
            isLoggedIn
            hasError={defaultProps.hasError}
            errorText={defaultProps.errorText}
            onSubmit={defaultProps.onSubmit}
            onLogoutClicked={defaultProps.onLogoutClicked}
        />);
        expect(wrapper.contains("Apu")).toBe(true);
    });

    it("should render logout button", () => {
        const wrapper = mount(<LogBox
            data={defaultProps.data}
            isLoading={defaultProps.isLoading}
            isLoggedIn={!""}
            hasError={defaultProps.hasError}
            errorText={defaultProps.errorText}
            onSubmit={defaultProps.onSubmit}
            onLogoutClicked={defaultProps.onLogoutClicked}
        />);
        expect(wrapper.contains("Logout")).toBe(true);
    });
});
