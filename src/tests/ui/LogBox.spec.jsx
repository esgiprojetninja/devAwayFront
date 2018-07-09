/* eslint-env jest */
import React from "react";
import {
    mount,
    shallow
} from "enzyme";
import LogBox from "../../ui/LogBox.jsx";

describe("ui <LogBox />", function () {
    beforeEach(() => {
        global.localStorage = {
            getItem: jest.fn()
        };
        this.defaultProps = {
            data: {
                id: 0,
                email: "",
                lastName: "",
                firstName: "",
                languages: "",
                skills: "",
                createdAt: "",
                updatedAt: "",
                avatar: "",
                userName: ""
            },
            isLoading: false,
            isLoggedIn: false,
            hasError: false,
            errorText: "",
            onSubmit: jest.fn(),
            onLogoutClicked: jest.fn()
        };
        this.wrapper = shallow(<LogBox
            data={this.defaultProps.data}
            isLoading={this.defaultProps.isLoading}
            isLoggedIn={this.defaultProps.isLoggedIn}
            hasError={this.defaultProps.hasError}
            errorText={this.defaultProps.errorText}
            onSubmit={this.defaultProps.onSubmit}
            onLogoutClicked={this.defaultProps.onLogoutClicked}
        />).dive();
    });

    afterEach(() => {
        this.wrapper.unmount();
    });

    it("should render a login button", () => {
        expect(this.wrapper.find("#devaway-logbox-toggler").length).toBe(1);
    });

    it("should open dialog", () => {
        expect(this.wrapper.find("#devaway-logbox-dialog").props().open).toBe(false);
        this.wrapper.find("#devaway-logbox-toggler").simulate("click");
        expect(this.wrapper.find("#devaway-logbox-dialog").props().open).toBe(true);
    });

    it("should render a spinner", () => {
        const wrapper = mount(<LogBox
            data={this.defaultProps.data}
            isLoading
            isLoggedIn={this.defaultProps.isLoggedIn}
            hasError={this.defaultProps.hasError}
            errorText={this.defaultProps.errorText}
            onSubmit={this.defaultProps.onSubmit}
            onLogoutClicked={this.defaultProps.onLogoutClicked}
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
        const wrapper = shallow(<LogBox
            data={this.defaultProps.data}
            isLoading
            isLoggedIn
            hasError={this.defaultProps.hasError}
            errorText={this.defaultProps.errorText}
            onSubmit={this.defaultProps.onSubmit}
            onLogoutClicked={this.defaultProps.onLogoutClicked}
        />).dive();
        wrapper.instance().handleClickOpen();
        expect(wrapper.state("open")).toBe(false);
    });

    it("should handleChange", () => {
        this.wrapper.instance().handleChange("userName", { target: { value: "Toto" } });
        expect(this.wrapper.state("userName")).toEqual("Toto");
    });

    it("should handleSubmit", () => {
        const mockSubmit = jest.fn();
        const mockEv = {
            preventDefault: jest.fn()
        };
        const wrapper = shallow(<LogBox
            data={this.defaultProps.data}
            isLoading={this.defaultProps.isLoading}
            isLoggedIn={this.defaultProps.isLoggedIn}
            hasError={this.defaultProps.hasError}
            errorText={this.defaultProps.errorText}
            onSubmit={mockSubmit}
            onLogoutClicked={this.defaultProps.onLogoutClicked}
        />).dive();
        wrapper.instance().handleChange("userName", { target: { value: "Toto" } });
        wrapper.instance().handleChange("password", { target: { value: "Secret" } });
        wrapper.instance().handleSubmit(mockEv);
        expect(mockEv.preventDefault).toBeCalled();
        expect(mockSubmit).toBeCalledWith({
            userName: "Toto",
            password: "Secret"
        });
    });

    it("should renderLoggedBox", () => {
        const wrapper = shallow(<LogBox
            data={{
                ...this.defaultProps.data,
                userName: "Apu"
            }}
            isLoading={this.defaultProps.isLoading}
            isLoggedIn
            hasError={this.defaultProps.hasError}
            errorText={this.defaultProps.errorText}
            onSubmit={this.defaultProps.onSubmit}
            onLogoutClicked={this.defaultProps.onLogoutClicked}
        />).dive();
        expect(wrapper.contains("Apu")).toBe(true);
    });

    it("should render open user menu", () => {
        const props = {
            ...this.defaultProps,
            data: {
                ...this.defaultProps.data,
                userName: "poulayname"
            },
            isLoading: false,
            isLoggedIn: true,
            hasError: false,
            errorText: "",
        };
        const wrapper = shallow(
            <LogBox {...props} />
        ).dive();
        const userMenuToggler = wrapper.find("#user-menu-toggler").first();
        userMenuToggler.simulate("click", {
            currentTarget: "poulayman"
        });
        wrapper.instance().setState({ poulay: "man" });
        expect(wrapper.state().anchorEl).toBe("poulayman");
    });

    it("should render logout btn", () => {
        const props = {
            ...this.defaultProps,
            data: {
                ...this.defaultProps.data,
                userName: "poulayname"
            },
            isLoading: false,
            isLoggedIn: true,
            hasError: false,
            errorText: "",
        };
        const wrapper = shallow(
            <LogBox {...props} />
        ).dive();
        const userMenuToggler = wrapper.find("#user-menu-toggler").first();
        userMenuToggler.simulate("click", {
            currentTarget: userMenuToggler.html()
        });
        wrapper.instance().setState({ poulay: "man" });

        const logoutBtn = wrapper.find("#devaway-user-logout-btn").first();
        expect(logoutBtn.length).toBe(1);
    });

    it("should logout", () => {
        const props = {
            ...this.defaultProps,
            data: {
                ...this.defaultProps.data,
                userName: "poulayname"
            },
            isLoading: false,
            isLoggedIn: true,
            hasError: false,
            errorText: "",
        };
        const wrapper = shallow(
            <LogBox {...props} />
        ).dive();
        const userMenuToggler = wrapper.find("#user-menu-toggler").first();
        userMenuToggler.simulate("click", {
            currentTarget: userMenuToggler.html()
        });
        wrapper.instance().setState({ poulay: "man" });

        const logoutBtn = wrapper.find("#devaway-user-logout-btn").first();
        const spy = jest.spyOn(wrapper.instance(), "handleClickOpen");
        logoutBtn.simulate("click");
        expect(this.defaultProps.onLogoutClicked).toHaveBeenCalled();
        expect(spy).toHaveBeenCalled();
    });

    it("should render user's avatar without prefixing it", () => {
        const props = {
            ...this.defaultProps,
            data: {
                ...this.defaultProps.data,
                userName: "poulayname",
                avatar: "ohmygadpoulayman"
            },
            isLoading: false,
            isLoggedIn: true,
            hasError: false,
            errorText: "",
        };
        const wrapper = shallow(
            <LogBox {...props} />
        ).dive();
        const userMenuToggler = wrapper.find("#devaway-toolbar-user-avatar");
        expect(userMenuToggler.prop("src")).toBe("data:image/jpeg;base64,ohmygadpoulayman");
    });

    it("should render user's avatar", () => {
        const props = {
            ...this.defaultProps,
            data: {
                ...this.defaultProps.data,
                userName: "poulayname",
                avatar: "data:image/ohmygadpoulayman"
            },
            isLoading: false,
            isLoggedIn: true,
            hasError: false,
            errorText: "",
        };
        const wrapper = shallow(
            <LogBox {...props} />
        ).dive();
        const userMenuToggler = wrapper.find("#devaway-toolbar-user-avatar");
        expect(userMenuToggler.prop("src")).toBe("data:image/ohmygadpoulayman");
    });

    it("should clear anchorEl", () => {
        const instance = this.wrapper.instance();
        instance.setState({ anchorEl: "poulay" });
        expect(instance.state.anchorEl).toBe("poulay");
        instance.handleUserMenuClose();
        expect(instance.state.anchorEl).toBeNull();
    });
});
