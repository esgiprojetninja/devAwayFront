/* eslint-env jest */
import React from "react";
import {
    shallow
} from "enzyme";
import mainReducer from "../../reducers/index";
import { Profile } from "../../ui/Profile.jsx";

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
            onProfileChanged: jest.fn()
        };
    });

    it("should render wirth main items", () => {
        const wrapper = shallow(
            <Profile {...this.initialProps} />
        );
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
        const wrapper = shallow(<Profile {...props} />);
        expect(wrapper.find("#getMeProgess").length).toBe(1);
    });

    it("should call handleChange", () => {
        const wrapper = shallow(
            <Profile {...this.initialProps} />
        );
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
});
