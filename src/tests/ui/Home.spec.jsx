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
                    snackbar: ""
                }}
                snack={{
                    snackText: "",
                    hasSnack: false,
                    snackDuration: 4000
                }}
                closeSnack={() => {}}
            />);
        expect(wrapper.find(ArticleWithMedia).length).toBe(1);
        expect(wrapper.find(HomeSearchForm).length).toBe(1);
    });
});
