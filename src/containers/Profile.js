import { connect } from "react-redux";

import {
    getMe
} from "../actions/profile";

import ProfileComponent from "../ui/Profile.jsx";

export const mapStateToProps = state => ({ current: state.user });

export const mapDispatchToProps = dispatch => ({
    onGetMe: () => dispatch(getMe()),
    onProfileChanged: () => {} // @TODO
});

const Profile = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileComponent);

export default Profile;
