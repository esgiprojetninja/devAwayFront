/* eslint-env jest */
/* global Date */
import React from "react";
import {
    shallow, mount
} from "enzyme";
import mainReducer from "../../../reducers/index";
import AccommodationDetailImages from "../../../ui/Accommodation/AccommodationDetailImages.jsx";
import { accommodationMock } from "../../mock/body/accommodation";

describe("ui <AccommodationDetailImages />", function () {
    const accos = new Map();
    let acco = null;

    beforeEach(() => {
        acco = accommodationMock;
        jest.clearAllMocks();
        const initialState = mainReducer(undefined, {});
        this.initialProps = {
            ...initialState,
            acco,
            isUserOwner: false,
            updatePicture: jest.fn(),
            classes: {
                container: "T.string.isRequired",
                imgContainer: "T.string.isRequired",
                img: "T.string.isRequired",
                addImgIcon: "T.string.isRequired",
                dotImgWrapper: "T.string.isRequired",
            },
        };
        accos.clear();
    });

    it("should mount main component", () => {
        const wrapper = shallow(
            <AccommodationDetailImages {...this.initialProps} />
        );
        expect(wrapper.text()).toBe("<AccommodationDetailImages />");
    });

    it("should only return an empty div", () => {
        const wrapper = shallow(
            <AccommodationDetailImages {...{
                ...this.initialProps,
                acco: null,
            }}
            />
        );
        expect(wrapper.html()).toBe('<div style="margin-top:80px"></div>');
    });

    it("should render visitor image in carousel", () => {
        const wrapper = shallow(
            <AccommodationDetailImages {...this.initialProps} />
        );
        expect(wrapper.html()).toMatch(/AccommodationDetailImages-imgContainer-/);
        expect(wrapper.html()).toMatch(/AccommodationDetailImages-img-/);
    });

    it("should render an input img editor", () => {
        const wrapper = shallow(
            <AccommodationDetailImages {...{
                ...this.initialProps,
                isUserOwner: true,
            }}
            />
        );
        expect(wrapper.html()).toMatch(/AccommodationDetailImages-editPictureContainer-/);
    });

    it("should render NOT render an add image", () => {
        const wrapper = shallow(
            <AccommodationDetailImages {...this.initialProps} />
        );
        expect(wrapper.html()).not.toMatch(/AccommodationDetailImages-noImgContainer-/);
    });

    it("should render an input img editor", () => {
        const wrapper = shallow(
            <AccommodationDetailImages {...{
                ...this.initialProps,
                isUserOwner: true,
            }}
            />
        );
        expect(wrapper.html()).toMatch(/AccommodationDetailImages-noImgContainer-/);
    });

    it("should render 7 carousel dots", () => {
        const wrapper = shallow(
            <AccommodationDetailImages {...{
                ...this.initialProps,
                acco: {
                    ...acco,
                    pictures: Array.from(new Array(7)).map(() => acco.pictures[0])
                },
            }}
            />
        );
        expect(wrapper.html().match(/AccommodationDetailImages-dotImgWrapper-/g).length).toBe(7);
    });

    it("should call updatePicture", () => {
        global.FileReader = function () {
            return {
                ...this,
                readAsDataURL() {
                    this.result = "data:image/png;coucoupoulay";
                    this.onloadend();
                },
            };
        };
        const wrapper = mount(
            <AccommodationDetailImages {...{
                ...this.initialProps,
                isUserOwner: true,
            }}
            />
        );
        const fileInput = wrapper.find("input[name='placePictureUpload']").first();
        fileInput.simulate("change",
            {
                preventDefault: jest.fn(),
                target: {
                    files: ["poulay"]
                }
            },
            0
        );
        expect(this.initialProps.updatePicture.mock.calls[0][0]).toEqual(this.initialProps.acco);
        expect(this.initialProps.updatePicture.mock.calls[0][1])
            .toBe(this.initialProps.acco.pictures[0].id);
        expect(this.initialProps.updatePicture.mock.calls[0][2])
            .toBe("data:image/png;coucoupoulay");
    });

    it("should call updatePicture with creation intention", () => {
        global.FileReader = function () {
            return {
                ...this,
                readAsDataURL() {
                    this.result = "data:image/png;coucoupoulay";
                    this.onloadend();
                },
            };
        };
        const wrapper = mount(
            <AccommodationDetailImages {...{
                ...this.initialProps,
                isUserOwner: true,
            }}
            />
        );
        const fileInput = wrapper.find("input").at(2);
        fileInput.simulate("change",
            {
                preventDefault: jest.fn(),
                target: {
                    files: ["poulay"]
                }
            },
            1
        );
        expect(this.initialProps.updatePicture.mock.calls[0][0]).toEqual(this.initialProps.acco);
        expect(this.initialProps.updatePicture.mock.calls[0][1]).toBeNull();
        expect(this.initialProps.updatePicture.mock.calls[0][2]).toBe("data:image/png;coucoupoulay");
    });
});
