/* global window */

import { connect } from "react-redux";
import { loadSessionUser } from "../actions/user";
import NavbarComponent from "../ui/Navbar";
import { removeSnackMsg } from "../actions/snack";


export const navbarKeyStoragePrefix = "navbarKeyStoragePrefix";

export const mapStateToProps = state => state;

export const mapDispatchToProps = dispatch => ({
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
    },
    async onInit() {
        return dispatch(loadSessionUser());
    },
    closeSnack() {
        dispatch(removeSnackMsg());
    },
});

const Navbar = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NavbarComponent);

export default Navbar;
