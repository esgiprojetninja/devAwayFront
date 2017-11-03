import React from "react";
import Router from "next/router";
import {Nav, Navbar, NavItem} from "react-bootstrap";

export default class Header extends React.Component {

    render() {
        return (
            <Navbar fluid inverse staticTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">{this.props.user ? this.props.user.displayName : ""}</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem onClick={() => Router.push("/")}>
                            Home
                        </NavItem>
                        <NavItem onClick={() => Router.push("/about")}>
                            About
                        </NavItem>
                        <NavItem onClick={() => Router.push("/auth")}>
                            Login / Signup
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
};
