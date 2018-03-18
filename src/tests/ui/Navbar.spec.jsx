/* eslint-env jest */
import React from "react";
import {
    shallow
} from "enzyme";
import configureMockStore from "redux-mock-store";
import mainReducer from "../../reducers/index";
import StyledNav, { NavBarComponent } from "../../ui/Navbar.jsx";

describe("ui <NavBar />", () => {
    const initialState = mainReducer(undefined, {});
    const initialProps = {
        ...initialState,
        state: {
            open: false,
            openUserMenuEl: null
        },
        store: {
            ...configureMockStore()(),
            ...initialState
        },
        classes: {
            root: {
                width: "100%"
            },
            flex: {
                flex: 1
            },
            logo: {
                display: "flex",
                maxHeight: "25px"
            },
            menuButton: {
                marginLeft: -12,
                marginRight: 20
            },
            dropDown: {
                transition: "all ease 0.2s",
                transformOrigin: "top"
            },
            navStyle: {
                backgroundColor: "#fe5858"
            },
            dropDown_in: {
                transform: "scaleY(1)"
            },
            dropDown_out: {
                transform: "scaleY(0)"
            },
            toggleButton: {
                position: "fixed",
                top: 1,
                right: 1,
                zIndex: 1
            },
            toolbar: {
                paddingRight: 1
            }
        }
    };
    let wrapper = null;
    beforeEach(() => {
        jest.clearAllMocks();
        wrapper = shallow(<NavBarComponent {...initialProps} />);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it("should render with main items", () => {
        expect(wrapper.text()).toContain("WithStyles(AppBar)");
        expect(wrapper.text()).toContain("WithStyles(IconButton)");
    });

    it("should render user menu toggler", () => {
        const props = {
            ...initialProps,
            user: {
                ...initialProps.user,
                isLoggedIn: true
            }
        };
        wrapper = shallow(<NavBarComponent {...props} />);
        expect(wrapper.instance().renderMenuToggler()).not.toBeNull();
    });

    it("should toggle open the navbar", () => {
        expect(wrapper.instance().state.open).toBe(false);
        const toggler = wrapper.find("#unlogged-toggler");
        toggler.simulate("click");
        expect(wrapper.instance().state.open).toBe(true);
    });

    it("should set element menu", () => {
        const props = {
            ...initialProps,
            user: {
                ...initialProps.user,
                isLoggedIn: true
            }
        };
        wrapper = shallow(<NavBarComponent {...props} />);
        wrapper.setState({ open: false });
        wrapper.setState({ openUserMenuEl: null });
        const toggler = wrapper.find("#menu-toggler");
        toggler.simulate("click", {
            currentTarget: "coucou"
        });
        expect(wrapper.instance().state.openUserMenuEl).toBe("coucou");
    });

    it("should reset element menu", () => {
        const props = {
            ...initialProps,
            user: {
                ...initialProps.user,
                isLoggedIn: true
            }
        };
        wrapper = shallow(<NavBarComponent {...props} />);
        wrapper.setState({ open: false });
        wrapper.setState({ openUserMenuEl: "coucou" });

        const toggler = wrapper.find("#long-menu");
        expect(wrapper.instance().state.openUserMenuEl).not.toBeNull();
        toggler.simulate("close");
        expect(wrapper.instance().state.openUserMenuEl).toBeNull();
    });

    it("should render style navbar", () => {
        const props = {
            ...initialProps,
            classes: {
                root: "100%",
                flex: "egerg",
                logo: "reger",
                menuButton: "gthrth",
                dropDown: "ezfze",
                navStyle: "ezfzef",
                dropDown_in: "fgze",
                dropDown_out: "ezfze",
                toggleButton: "fedz",
                toolbar: "ezdfze"
            }
        };

        wrapper = shallow(<StyledNav {...props} />);
        expect(wrapper.text()).toBe("<NavBarComponent />");
    });
});
