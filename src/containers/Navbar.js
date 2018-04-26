/* global window */

import { connect } from "react-redux";

import NavbarComponent from "../ui/Navbar";

export const navbarKeyStoragePrefix = "navbarKeyStoragePrefix";

export const mapStateToProps = state => state;

export const mapDispatchToProps = () => ({
    getSavedState(state) {
        return Object.keys(state).reduce((finalState, stateKey) => {
            return {
                ...finalState,
                [stateKey]: window.localStorage.getItem(`${navbarKeyStoragePrefix}${stateKey}`, state[state]) || state[stateKey]
            };
        }, {});
    },
    storeStateProp(stateKey, val) {
        window.localStorage.setItem(`${navbarKeyStoragePrefix}${stateKey}`, val);
    },
    removeStateProp(stateKey) {
        window.localStorage.removeItem(`${navbarKeyStoragePrefix}${stateKey}`);
    }
});

const Navbar = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NavbarComponent);

export default Navbar;
