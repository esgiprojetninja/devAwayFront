/* eslint-env jest */
import React from "react";
import {
    shallow, mount
} from "enzyme";
import { BrowserRouter } from "react-router-dom";
import mainReducer from "../../../reducers/index";
import AccommodationsPersonnalList from "../../../ui/Accommodation/AccommodationsPersonnalList";
import { genAccommodationsMock } from "../../mock/body/accommodation";


describe("ui <AccommodationsPersonnalList />", function () {
    beforeEach(() => {
        jest.clearAllMocks();
        const initialState = mainReducer(undefined, {});
        this.initialProps = {
            ...initialState,
            onInit: jest.fn(),
            classes: {
                root: "T.string.isRequired",
                headTitle: "T.string.isRequired",
                progressSpinner: "T.string.isRequired",
                container: "T.string.isRequired",
                accosContainer: "T.string.isRequired",
                cardMedia: "T.string.isRequired",
                controlBtn: "T.string.isRequired",
                accoDescription: "T.string.isRequired",
                accoActionIcon: "T.string.isRequired",
            },
        };
    });

    it("should render with main items", () => {
        const wrapper = shallow(
            <BrowserRouter>
                <AccommodationsPersonnalList {...this.initialProps} />
            </BrowserRouter>
        );
        expect(wrapper.isEmptyRender()).toBe(false);
    });

    it("should render with main items", () => {
        mount(
            <BrowserRouter>
                <AccommodationsPersonnalList {...this.initialProps} />
            </BrowserRouter>
        );
        expect(this.initialProps.onInit).toHaveBeenCalled();
    });

    it("should render spinner", () => {
        const props = {
            ...this.initialProps,
            user: {
                ...this.initialProps.user,
                isLoading: true,
            }
        };
        const wrapper = shallow(
            <BrowserRouter>
                <AccommodationsPersonnalList {...props} />
            </BrowserRouter>
        );
        expect(wrapper.html()).toContain("CircularProgress");
    });

    it("should NOT render spinner", () => {
        const wrapper = shallow(
            <BrowserRouter>
                <AccommodationsPersonnalList {...this.initialProps} />
            </BrowserRouter>
        );
        expect(wrapper.html()).not.toContain("CircularProgress");
    });

    it("should render accommodations", () => {
        const props = {
            ...this.initialProps,
            user: {
                ...this.initialProps.user,
                isLoading: true,
                accommodations: genAccommodationsMock(1).reduce(
                    (obj, acco) => ({
                        ...obj,
                        [acco.id]: acco
                    }),
                    {}),
            }
        };
        const wrapper = shallow(
            <BrowserRouter>
                <AccommodationsPersonnalList {...props} />
            </BrowserRouter>
        );
        expect(wrapper.html()).toContain("accoDescription");
    });

    it("should NOT render spinner", () => {
        const wrapper = mount(
            <BrowserRouter>
                <AccommodationsPersonnalList {...this.initialProps} />
            </BrowserRouter>
        );
        const redirectionBtn = wrapper.find("button");
        redirectionBtn.simulate("click");
        expect(redirectionBtn.text()).toBe("Create your very first place");
    });
});
