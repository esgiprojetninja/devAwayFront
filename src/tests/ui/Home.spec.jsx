/* eslint-env jest */
import React from "react";
import {
    shallow
} from "enzyme";
import ArticleWithMedia from "../../ui/ArticleWithMedia.jsx";
import HomeSearchForm from "../../ui/HomeSearchForm.jsx";

import { Home } from "../../ui/Home.jsx";

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
                    snackbar: "",
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
                snack={{
                    snackText: "",
                    hasSnack: false,
                    snackDuration: 4000
                }}
                closeSnack={() => {}}
                onInit={() => {}}
            />);
        expect(wrapper.find(ArticleWithMedia).length).toBe(1);
        expect(wrapper.find(HomeSearchForm).length).toBe(1);
    });
});
