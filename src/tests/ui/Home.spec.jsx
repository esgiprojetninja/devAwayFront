/* eslint-env jest */
import React from "react";
import {
    mount
} from "enzyme";
import Reboot from "material-ui/Reboot";
import Navbar from "../../ui/Navbar.jsx";
import ArticleWithMedia from "../../ui/ArticleWithMedia.jsx";
import HomeSearchForm from "../../ui/HomeSearchForm.jsx";

import Home from "../../ui/Home.jsx";

describe("ui <Home />", () => {
    it("should render with main items", () => {
        const wrapper = mount(<Home />);
        expect(wrapper.find(Navbar).length).toBe(1);
        expect(wrapper.find(Reboot).length).toBe(1);
        expect(wrapper.find(ArticleWithMedia).length).toBe(1);
        expect(wrapper.find(HomeSearchForm).length).toBe(1);
    });
});
