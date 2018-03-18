/* eslint-env jest */
import React from "react";
import {
    mount,
    shallow
} from "enzyme";
import { SubscribeBox } from "../../ui/SubscribeBox";

describe("ui <SubscribeBox />", function () {
    const defaultProps = {
        isLoggedIn: false,
        isLoading: false,
        hasError: {
            email: false,
            username: false,
            password: false,
            passwordCheck: false
        },
        errorText: {
            email: "",
            username: "",
            password: "",
            passwordCheck: ""
        },
        onSubmit: () => {}
    };

    beforeEach(() => {
        this.wrapper = mount(<SubscribeBox
            isLoading={defaultProps.isLoading}
            isLoggedIn={defaultProps.isLoggedIn}
            hasError={defaultProps.hasError}
            errorText={defaultProps.errorText}
            onSubmit={defaultProps.onSubmit}
        />);
    });

    afterEach(() => {
        this.wrapper.unmount();
    });

    it("should render an inscription button", () => {
        expect(this.wrapper.find("Button").length).toBe(1);
    });

    it("should open dialog", () => {
        expect(this.wrapper.find("Dialog").props().open).toBe(false);
        this.wrapper.find("Button").simulate("click");
        expect(this.wrapper.find("Dialog").props().open).toBe(true);
    });

    it("should render a spinner", () => {
        const wrapper = mount(<SubscribeBox
            isLoading={!defaultProps.isLoading}
            isLoggedIn={defaultProps.isLoggedIn}
            hasError={defaultProps.hasError}
            errorText={defaultProps.errorText}
            onSubmit={defaultProps.onSubmit}
        />);
        expect(wrapper.find("CircularProgress").length).toBe(1);
    });

    it("should handleClickOpen & handleClose", () => {
        this.wrapper.instance().toggleBtnHandler();
        expect(this.wrapper.state("open")).toBe(true);
        this.wrapper.instance().toggleBtnHandler();
        expect(this.wrapper.state("open")).toBe(false);
    });

    it("should toggle open", () => {
        const wrapper = mount(<SubscribeBox
            isLoading={defaultProps.isLoading}
            isLoggedIn={defaultProps.isLoggedIn}
            hasError={defaultProps.hasError}
            errorText={defaultProps.errorText}
            onSubmit={defaultProps.onSubmit}
        />);
        const toggledOpen = wrapper.state("open");
        wrapper.instance().toggleBtnHandler();
        expect(wrapper.state("open")).toBe(!toggledOpen);
    });

    it("should handleChange", () => {
        this.wrapper.instance().handleChange("username", { target: { value: "Toto" } });
        expect(this.wrapper.state("username")).toEqual("Toto");
    });

    it("should render errors", () => {
        const wrapper = mount(<SubscribeBox
            isLoading={defaultProps.isLoading}
            isLoggedIn={defaultProps.isLoggedIn}
            hasError={{
                email: true,
                username: true,
                password: true,
                passwordCheck: true
            }}
            errorText={{
                email: "goderror",
                username: "goderror",
                password: "goderror",
                passwordCheck: "goderror"
            }}
            onSubmit={defaultProps.onSubmit}
        />);
        expect(JSON.stringify(wrapper.instance().renderPasswordField())).toContain("goderror");
    });

    it("should handleSubmit", () => {
        const mockSubmit = jest.fn();
        const mockEv = {
            preventDefault: jest.fn()
        };
        const wrapper = mount(<SubscribeBox
            isLoading={defaultProps.isLoading}
            isLoggedIn={defaultProps.isLoggedIn}
            hasError={defaultProps.hasError}
            errorText={defaultProps.errorText}
            onSubmit={mockSubmit}
        />);
        wrapper.instance().handleChange("chibar", { target: { value: "Toto" } });
        wrapper.instance().handleChange("username", { target: { value: "Toto" } });
        wrapper.instance().handleChange("password", { target: { value: "Secret" } });
        wrapper.instance().handleChange("passwordCheck", { target: { value: "Secret" } });
        wrapper.instance().handleChange("email", { target: { value: "myemail@email.zu" } });
        wrapper.instance().onSubmit(mockEv);
        expect(mockEv.preventDefault).toBeCalled();
        expect(mockSubmit).toBeCalledWith({
            email: "myemail@email.zu",
            username: "Toto",
            password: "Secret",
            passwordCheck: "Secret"
        });
    });

    it("should NOT render", () => {
        const wrapper = shallow(<SubscribeBox
            isLoading={defaultProps.isLoading}
            isLoggedIn={!defaultProps.isLoggedIn}
            hasError={defaultProps.hasError}
            errorText={defaultProps.errorText}
            onSubmit={defaultProps.onSubmit}
        />);
        expect(wrapper.instance().render()).toBe(null);
    });
});
