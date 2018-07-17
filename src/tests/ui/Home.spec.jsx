/* eslint-env jest */
import React from "react";
import {
    shallow
} from "enzyme";
import ArticleWithMedia from "../../ui/ArticleWithMedia";
import HomeSearchForm from "../../containers/HomeSearchForm";

import HomeWithStyles, { Home } from "../../ui/Home";

describe("ui <Home />", () => {
    global.localStorage = {
        getItem: jest.fn()
    };

    it("should render with main items", () => {
        const wrapper = shallow(
            <Home
                classes={{
                    root: "",
                    brandRibon: "",
                    backgroundImg: "",
                    footer: "",
                    footerList: "",
                    footerListItem: "",
                    homeLogo: "",
                    brandRibonImg: "",
                    brandRibonEsgiImg: "",
                    brandRibonImgLogo: "",
                    subSection: "",
                    subSectionDestination: "",
                    sectionTitle: "",
                    subSectionHr: "",
                    homeTitle: "",
                    homePlWrapper: "",
                    destinationWrapper: "",
                    destinationsImg: ""
                }}
                onInit={() => {}}
                accommodation={{
                    isLoading: false,
                    search: {
                        isLoading: false,
                    }
                }}
                user={{
                    isLoading: false,
                }}
            />);
        expect(wrapper.find(ArticleWithMedia).length).toBe(1);
        expect(wrapper.find(HomeSearchForm).length).toBe(1);
    });

    it("should render with M-UI styles", () => {
        const wrapper = shallow(
            <HomeWithStyles
                onInit={() => { }}
                accommodation={{
                    isLoading: false,
                    search: {
                        isLoading: false,
                    }
                }}
                user={{
                    isLoading: false,
                }}
            />);
        expect(wrapper.text()).toMatch(/Home/);
    });
});
