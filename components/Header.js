import React from "react";
import Router from "next/router";
import * as types from "../app/types";
import {Nav, Navbar, NavItem} from "react-bootstrap";

export default class Header extends React.Component {

    render() {
        return (
            <Navbar fluid inverse staticTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">{this.props.user.id ? this.props.user.displayName : ""}</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem onClick={() => Router.push("/")}>
                            Home
                        </NavItem>
                        {this.renderAuthBtn()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }

    renderAuthBtn() {
        const connected = this.props.user.id;
        return (
            <NavItem onClick={
                () => connected ? Router.push("/logout") : Router.push("/auth")
            }>
                {connected ? "Logout" : "Login / Signup"}
            </NavItem>
        );
    }
};

Header.propTypes = {
    user: types.User
};
