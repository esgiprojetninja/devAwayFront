import { connect } from "react-redux";

import { getMe } from "../actions/profile";
import { upsertUser } from "../actions/user";

import ProfileComponent from "../ui/Profile.jsx";

export const mapStateToProps = state => ({ current: state.user });

export const mapDispatchToProps = dispatch => ({
    onGetMe: () => dispatch(getMe()),
    updateUser: user => dispatch(upsertUser(user))
});

const Profile = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileComponent);

export default Profile;
