import React from 'react';
import Router from 'next/router';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import * as types from '../server/lib/config/types';

export default class Header extends React.Component {
    renderAuthBtn() {
        const connected = this.props.user.id !== '';
        return (
            <NavItem onClick={
                () => connected ? Router.push('/logout') : Router.push('/auth')
            }>
                {connected ? 'Logout' : 'Login / Signup'}
            </NavItem>
        );
    }
    render() {
        /*eslint-disable */
        return (
            <Navbar fluid inverse staticTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">{this.props.user.name}</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem onClick={() => Router.push('/')}>
                            Home
                        </NavItem>
                        {this.renderAuthBtn()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
        /* eslint-enable */
    }
}

Header.propTypes = {
    user: types.User
};
