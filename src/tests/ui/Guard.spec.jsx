/* eslint-env jest */
import React from "react";
import {
    mount
} from "enzyme";
import mainReducer from "../../reducers/index";
import Guard from "../../ui/Guard.jsx";

describe("ui <Guard />", function () {
    beforeEach(() => {
        const initialState = mainReducer(undefined, {}).guard;
        this.initialProps = {
            ...initialState,
            onCredentialChange: jest.fn(),
            onFormSubmit: jest.fn()
        };
    });

    it("should render with main items", () => {
        const wrapper = mount(<Guard {...this.initialProps} />);
        expect(wrapper.find("Button").length).toBe(1);
        wrapper.unmount();
    });

    it("should render loader", () => {
        this.initialProps.isLoading = true;
        const wrapper = mount(<Guard {...this.initialProps} />);
        expect(wrapper.find("LinearProgress").length).toBe(1);
    });

    it("should handleSubmit", () => {
        const wrapper = mount(<Guard {...this.initialProps} />);
        wrapper.find("form").simulate("submit");
        expect(this.initialProps.onFormSubmit).toBeCalled();
    });
});
