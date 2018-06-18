/* eslint-env jest */
import React from "react";
import {
    mount
} from "enzyme";
import HomeSearchForm from "../../ui/HomeSearchForm.jsx";

describe("ui <HomeSearchForm />", () => {
    it("should render with main items", () => {
        const wrapper = mount(<HomeSearchForm />);
        expect(wrapper.find("#toDate").filter("Input").length).toBe(1);
        expect(wrapper.find("#location").filter("Input").length).toBe(1);
        expect(wrapper.find("#fromDate").filter("Input").length).toBe(1);
        expect(wrapper.find("#guests").filter("Input").length).toBe(1);
    });
});
