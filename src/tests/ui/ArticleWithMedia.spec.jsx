/* eslint-env jest */
import React from "react";
import {
    mount
} from "enzyme";
import ArticleWithMedia from "../../ui/ArticleWithMedia.jsx";

describe("ui <ArticleWithMedia />", () => {
    it("should render with main items", () => {
        const title = "My title";
        const lead = "My Lead";
        const article1 = "My article 1";
        const article2 = "My article 2";
        const article3 = "My article 3";
        const article4 = "My article 4";
        const wrapper = mount(<ArticleWithMedia
            title={title}
            lead={lead}
            article1={article1}
            article2={article2}
            article3={article3}
            article4={article4}
        />);
        expect(wrapper.props().title).toEqual(title);
        expect(wrapper.props().lead).toEqual(lead);
        expect(wrapper.props().article1).toEqual(article1);
        expect(wrapper.props().article2).toEqual(article2);
        expect(wrapper.props().article3).toEqual(article3);
        expect(wrapper.props().article4).toEqual(article4);
    });
});
