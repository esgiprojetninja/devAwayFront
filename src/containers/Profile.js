import { connect } from "react-redux";

import { upsertUser, getMe } from "../actions/user";

import ProfileComponent from "../ui/Profile.jsx";

let userId = null;
export const mapStateToProps = (state) => {
    userId = state.user.data.id;
    return { current: state.user };
};

export const mapDispatchToProps = dispatch => ({
    onGetMe: () => dispatch(getMe()),
    updateUser: user => dispatch(upsertUser({
        ...user,
        id: userId
    }))
});

const Profile = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileComponent);

export default Profile;
