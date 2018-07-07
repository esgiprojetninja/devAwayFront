/* eslint-env jest */
import React from "react";
import {
    shallow
} from "enzyme";
import mainReducer from "../../reducers/index";
import Profile from "../../ui/Profile.jsx";

describe("ui <Profile />", function () {
    beforeEach(() => {
        const initialState = mainReducer(undefined, {}).profile;
        this.initialProps = {
            ...initialState,
            current: {
                isLoading: false,
                isLoggedIn: true,
                data: {
                    email: "email",
                    firstName: "firstName",
                    lastName: "lastName",
                    username: "username",
                    languages: "languages",
                    skills: "skills",
                    avatar: "avatar",
                },
            },
            classes: {
                container: ""
            },
            onGetMe: jest.fn(),
            updateUser: jest.fn()
        };
    });

    it("should render with main items", () => {
        const wrapper = shallow(
            <Profile {...this.initialProps} />
        ).dive();
        expect(wrapper.find("#email").filter("TextField").length).toBe(1);
        expect(this.initialProps.onGetMe).toBeCalled();
    });

    it("should render progress", () => {
        const props = {
            ...this.initialProps,
            current: {
                ...this.initialProps.current,
                isLoading: true
            }
        };
        const wrapper = shallow(<Profile {...props} />).dive();
        expect(wrapper.find("#getMeProgess").length).toBe(1);
    });

    it("should NOT render save buttons", () => {
        const props = {
            ...this.initialProps,
            current: {
                ...this.initialProps.current,
                isLoggedIn: false,
            }
        };
        const wrapper = shallow(<Profile {...props} />).dive();
        expect(wrapper.instance().renderSaveBtns()).toBeNull();
    });

    it("should call handleChange", () => {
        const wrapper = shallow(
            <Profile {...this.initialProps} />
        ).dive();
        const spy = jest.spyOn(wrapper.instance(), "handleChange");
        wrapper.find("#email").simulate("change",
            {
                target: {
                    value: "coucou",
                    id: "chibar"
                }
            }
        );
        expect(spy).toHaveBeenCalledWith(
            {
                target: {
                    value: "coucou",
                    id: "chibar"
                }
            },
            "email"
        );
    });

    it("should render clickable cancel button", () => {
        const wrapper = shallow(
            <Profile {...this.initialProps} />
        ).dive();
        wrapper.setState({ avatar: "POULAY" });
        const btn = wrapper.find("#devaway-cancel-profile-btn");
        expect(wrapper.instance().state.avatar).toBe("POULAY");
        btn.simulate("click");
        expect(wrapper.instance().state.avatar).toBe("");
    });

    it("should set state avatar", () => {
        global.FileReader = function () {
            return {
                ...this,
                readAsDataURL() {
                    this.result = "data:image/png;coucoupoulay";
                    this.onloadend();
                },
            };
        };
        const wrapper = shallow(<Profile {...this.initialProps} />).dive();
        expect(wrapper.state().avatar).toBe("");
        wrapper.instance().handleAddImg({
            preventDefault: jest.fn(),
            target: {
                files: ["osef"]
            }
        });
        expect(wrapper.state().avatar).toBe("data:image/png;coucoupoulay");
    });

    it("should NOT save new profile", () => {
        const wrapper = shallow(<Profile {...this.initialProps} />).dive();
        expect(wrapper.state().avatar).toBe("");
        wrapper.instance().handleSave();
        expect(this.initialProps.updateUser).not.toHaveBeenCalled();
    });

    it("should save new profile", () => {
        const wrapper = shallow(<Profile {...this.initialProps} />).dive();
        wrapper.setState({ avatar: "POULAY" });
        expect(wrapper.state().avatar).toBe("POULAY");
        wrapper.instance().handleSave();
        expect(this.initialProps.updateUser).toHaveBeenCalledWith({ avatar: "POULAY" });
    });
});
