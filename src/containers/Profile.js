import { connect } from "react-redux";

import {
    getMe
} from "../actions/profile";

import ProfileComponent from "../ui/Profile.jsx";

export const mapStateToProps = state => state.profile;

export const mapDispatchToProps = dispatch => ({
    onGetMe: () => dispatch(getMe()),
    onProfileChanged: () => {} // TODO
});

const Guard = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileComponent);

export default Guard;
