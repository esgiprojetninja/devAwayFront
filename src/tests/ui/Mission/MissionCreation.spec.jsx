/* eslint-env jest */
import React from "react";
import {
    shallow, mount
} from "enzyme";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import moment from "moment";
import mainReducer from "../../../reducers/index";
import {
    mockAPI
} from "../../mock/API";
import MissionCreation from "../../../ui/Mission/MissionCreation.jsx";
import { genAccommodationsMock } from "../../mock/body/accommodation";
import { SAVE_MISSION_SUCCESS } from "../../../actions/types/mission";

describe("ui <MissionCreation />", function () {
    const logErr = console.error; // eslint-disable-line
    beforeEach(() => {
        global.localStorage = {
            getItem: () => {},
            setItem: () => {},
            deleteItem: () => {},
        };
        jest.clearAllMocks();
        const initialState = mainReducer(undefined, {});
        this.initialProps = {
            ...initialState,
            user: {
                ...initialState.user,
                isLoggedIn: true,
                isLoading: false,
                isGettingData: false,
                accommodations: genAccommodationsMock(3).reduce((finalObj, acco) => ({
                    ...finalObj,
                    [acco.id]: acco,
                }), {}),
                accommodationsArr: genAccommodationsMock(3).map(acco => ({
                    label: acco.title,
                    id: acco.id,
                })),
                data: {
                    ...initialState.user.data,
                    id: 1234
                },
            },
            history: {
                replace: jest.fn(),
            },
            classes: {
                container: "T.string.isRequired",
                paper: "T.string.isRequired",
                title: "T.string.isRequired",
                labelControl: "T.string.isRequired",
                item: "T.string.isRequired",
                numberFormControl: "T.string.isRequired",
                dateFormControl: "T.string.isRequired",
                saveBtn: "T.string.isRequired",
                placeAvatar: "T.string.isRequired",
                errorLabel: "T.string.isRequired",
            },
            formRules: {
                title: { min: 6, max: 24 },
                description: { min: 6, max: 255 },
                checkinDate: { min: moment().local().add(1, "hours"), isDate: true },
                stayTime: { min: 1, max: (1000 * 60 * 60 * 24 * 365 * 10) }, // max 10 years
                stayTimeUnit: {
                    values: [
                        { label: "hours", value: 0 },
                        { label: "days", value: 1 },
                        { label: "weeks", value: 2 },
                        { label: "months", value: 3 },
                    ],
                    isSelect: true
                },
                accommodation_id: {
                    values: genAccommodationsMock(3).map(acco => ({
                        label: acco.title,
                        id: acco.id,
                    })).map(acco => ({
                        ...acco,
                        value: acco.id
                    })),
                    isSelect: true,
                },
            },
            saveMission: jest.fn(() => {
                return Promise.resolve({
                    type: SAVE_MISSION_SUCCESS,
                    payload: {
                        mission: {
                            id: 1234567890
                        }
                    }
                });
            }),
            changeCurrent: jest.fn(),
        };
        const mockStore = configureMockStore([thunk.withExtraArgument(mockAPI)]);
        this.store = mockStore(initialState);
        console.error = jest.fn(); // eslint-disable-line
    });
    afterEach(() => {
        console.error = logErr; // eslint-disable-line
    });
    it("should render with main items", () => {
        const wrapper = shallow(
            <BrowserRouter>
                <MissionCreation {...this.initialProps} />
            </BrowserRouter>
        );
        const instance = wrapper.dive().dive().instance();
        expect(instance.render()).not.toBeNull();
    });
    it("should render spinner - current mission loading", () => {
        const props = {
            ...this.initialProps,
            mission: {
                ...this.initialProps.mission,
                current: {
                    ...this.initialProps.mission.current,
                    isLoading: true,
                }
            },
        };
        const wrapper = mount(
            <BrowserRouter>
                <Provider store={this.store} >
                    <MissionCreation {...props} />
                </Provider>
            </BrowserRouter>
        );
        expect(wrapper.find("#devaway-mission-creation-spinner-container").length).toBe(1);
    });
    it("should render spinner - acco loading", () => {
        const props = {
            ...this.initialProps,
            accommodation: {
                ...this.initialProps.accommodation,
                isLoading: true,
            },
        };
        const wrapper = mount(
            <BrowserRouter>
                <Provider store={this.store} >
                    <MissionCreation {...props} />
                </Provider>
            </BrowserRouter>
        );
        expect(wrapper.find("#devaway-mission-creation-spinner-container").length).toBe(1);
    });
    it("should render spinner - user loading", () => {
        const props = {
            ...this.initialProps,
            user: {
                ...this.initialProps.user,
                isLoading: true,
            },
        };
        const wrapper = mount(
            <BrowserRouter>
                <Provider store={this.store} >
                    <MissionCreation {...props} />
                </Provider>
            </BrowserRouter>
        );
        expect(wrapper.find("#devaway-mission-creation-spinner-container").length).toBe(1);
    });
    it("should NOT render spinner", () => {
        const props = {
            ...this.initialProps,
            user: {
                ...this.initialProps.user,
                isLoading: false,
            },
            accommodation: {
                ...this.initialProps.accommodation,
                isLoading: false,
            },
            mission: {
                ...this.initialProps.mission,
                current: {
                    ...this.initialProps.mission.current,
                    isLoading: false,
                }
            },
        };
        const wrapper = mount(
            <BrowserRouter>
                <Provider store={this.store} >
                    <MissionCreation {...props} />
                </Provider>
            </BrowserRouter>
        );
        expect(wrapper.find("#devaway-mission-creation-spinner-container").length).toBe(0);
    });
    it("should render unlogged user", () => {
        const props = {
            ...this.initialProps,
            user: {
                ...this.initialProps.user,
                isLoggedIn: false,
            },
        };
        const wrapper = mount(
            <BrowserRouter>
                <Provider store={this.store} >
                    <MissionCreation {...props} />
                </Provider>
            </BrowserRouter>
        );
        expect(wrapper.find("#devaway-mission-creation-unlogged-container").length).toBeTruthy();
    });
    it("should render no acco message", () => {
        const props = {
            ...this.initialProps,
            user: {
                ...this.initialProps.user,
                accommodations: {},
            },
        };
        const wrapper = mount(
            <BrowserRouter>
                <Provider store={this.store} >
                    <MissionCreation {...props} />
                </Provider>
            </BrowserRouter>
        );
        expect(wrapper.find("#devaway-mission-creation-no-acco-container").length).toBeTruthy();
    });
    it("should change state checkinDateHour", () => {
        const wrapper = mount(
            <BrowserRouter>
                <Provider store={this.store} >
                    <MissionCreation.WrappedComponent {...this.initialProps} />
                </Provider>
            </BrowserRouter>
        );
        const input = wrapper.find("input[name='checkinDateHour']");
        input.simulate("change", {
            target: {
                value: "08:59"
            }
        });
        expect(wrapper.html()).toContain("08:59");
    });
    it("should change state checkinDate", () => {
        const wrapper = mount(
            <BrowserRouter>
                <Provider store={this.store} >
                    <MissionCreation.WrappedComponent {...this.initialProps} />
                </Provider>
            </BrowserRouter>
        );
        const input = wrapper.find("input[name='checkinDate']");
        input.simulate("change", {
            target: {
                value: "1999-06-06"
            }
        });
        expect(wrapper.html()).toContain("1999-06-06");
    });
    it("should change state title", () => {
        const wrapper = mount(
            <BrowserRouter>
                <Provider store={this.store} >
                    <MissionCreation.WrappedComponent {...this.initialProps} />
                </Provider>
            </BrowserRouter>
        );
        const input = wrapper.find("input[name='title']");
        input.simulate("change", {
            target: {
                value: "OHMYGADTHISISACHIBAR"
            }
        });
        expect(wrapper.html()).toContain("OHMYGADTHISISACHIBAR");
    });
    it("should change state description", () => {
        const wrapper = mount(
            <BrowserRouter>
                <Provider store={this.store} >
                    <MissionCreation.WrappedComponent {...this.initialProps} />
                </Provider>
            </BrowserRouter>
        );
        const input = wrapper.find("textarea[name='description']");
        input.simulate("change", {
            target: {
                value: "OHMYGADTHISISACHIBAR"
            }
        });
        expect(wrapper.html()).toContain("OHMYGADTHISISACHIBAR");
    });
    it("should change state stayTime", () => {
        const wrapper = mount(
            <BrowserRouter>
                <Provider store={this.store} >
                    <MissionCreation.WrappedComponent {...this.initialProps} />
                </Provider>
            </BrowserRouter>
        );
        const input = wrapper.find("input[type='number']");
        input.simulate("change", {
            target: {
                value: 12456789
            }
        });
        expect(wrapper.html()).toContain(12456789);
    });
    it("should change state stayTimeUnit", () => {
        const wrapper = mount(
            <BrowserRouter>
                <Provider store={this.store} >
                    <MissionCreation.WrappedComponent {...this.initialProps} />
                </Provider>
            </BrowserRouter>
        );
        const div = wrapper.find("div[role='button'][aria-haspopup='true']").at(1);
        div.simulate("click");
        expect(div.text()).toBe("weeks");
        const monthsItem = wrapper.find("ul[role='listbox'] li").at(3);
        expect(monthsItem.text()).toBe("months");
        monthsItem.simulate("click");
        expect(div.text()).toBe("months");
    });
    it("should change save mission and change page", () => {
        const wrapper = mount(
            <BrowserRouter history={this.initialProps.history}>
                <Provider store={this.store} >
                    <MissionCreation.WrappedComponent {...this.initialProps} />
                </Provider>
            </BrowserRouter>
        );
        const titleInput = wrapper.find("input[name='title']");
        titleInput.simulate("change", {
            target: {
                value: "OHMYGADTHISISACHIBAR"
            }
        });
        const descriptionInput = wrapper.find("textarea[name='description']");
        descriptionInput.simulate("change", {
            target: {
                value: "OHMYGADTHISISACHIBAR"
            }
        });
        const checkinHour = wrapper.find("input[name='checkinDateHour']");
        checkinHour.simulate("change", {
            target: {
                value: "08:59"
            }
        });
        const checkinDate = wrapper.find("input[name='checkinDate']");
        checkinDate.simulate("change", {
            target: {
                value: moment().add(1, "months").format("YYYY-MM-DD")
            }
        });
        const div = wrapper.find("div[role='button'][aria-haspopup='true']").at(0);
        div.simulate("click");
        const item = wrapper.find("ul[role='listbox'] li").at(1);
        item.simulate("click");

        const saveBtn = wrapper.find("#devaway-create-acco-mission-btn").at(0);
        saveBtn.simulate("click");
        expect(this.initialProps.saveMission).toHaveBeenCalled();
    });
    it("should edit current state mission", () => {
        const wrapper = mount(
            <BrowserRouter history={this.initialProps.history}>
                <Provider store={this.store} >
                    <MissionCreation.WrappedComponent {...this.initialProps} />
                </Provider>
            </BrowserRouter>
        );
        const titleInput = wrapper.find("input[name='title']");
        titleInput.simulate("change", {
            target: {
                value: "OHMYGADTHISISACHIBAR"
            }
        });
        const descriptionInput = wrapper.find("textarea[name='description']");
        descriptionInput.simulate("change", {
            target: {
                value: "OHMYGADTHISISACHIBAR"
            }
        });
        const checkinHour = wrapper.find("input[name='checkinDateHour']");
        checkinHour.simulate("change", {
            target: {
                value: "08:59"
            }
        });
        const checkinDate = wrapper.find("input[name='checkinDate']");
        checkinDate.simulate("change", {
            target: {
                value: moment().add(1, "months").format("YYYY-MM-DD")
            }
        });
        const div = wrapper.find("div[role='button'][aria-haspopup='true']").at(0);
        div.simulate("click");
        const item = wrapper.find("ul[role='listbox'] li").at(1);
        item.simulate("click");

        checkinDate.simulate("change", {
            target: {
                value: moment().add(3, "months").format("YYYY-MM-DD")
            }
        });

        expect(this.initialProps.changeCurrent).toHaveBeenCalled();
    });
    it("should edit current state mission through handlechange method", () => {
        const wrapper = mount(
            <BrowserRouter history={this.initialProps.history}>
                <Provider store={this.store} >
                    <MissionCreation.WrappedComponent {...this.initialProps} />
                </Provider>
            </BrowserRouter>
        );
        const titleInput = wrapper.find("input[name='title']");
        titleInput.simulate("change", {
            target: {
                value: "OHMYGADTHISISACHIBAR"
            }
        });
        const descriptionInput = wrapper.find("textarea[name='description']");
        descriptionInput.simulate("change", {
            target: {
                value: "OHMYGADTHISISACHIBAR"
            }
        });
        const checkinHour = wrapper.find("input[name='checkinDateHour']");
        checkinHour.simulate("change", {
            target: {
                value: "08:59"
            }
        });
        const checkinDate = wrapper.find("input[name='checkinDate']");
        checkinDate.simulate("change", {
            target: {
                value: moment().add(1, "months").format("YYYY-MM-DD")
            }
        });
        const div = wrapper.find("div[role='button'][aria-haspopup='true']").at(0);
        div.simulate("click");
        const item = wrapper.find("ul[role='listbox'] li").at(1);
        item.simulate("click");

        descriptionInput.simulate("change", {
            target: {
                value: "ezfer gre gre grge"
            }
        });

        expect(this.initialProps.changeCurrent).toHaveBeenCalled();
    });
});
