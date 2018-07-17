import { connect } from "react-redux";
import UserDetailComponent from "../../ui/User/UserDetail";
import { cleanFetchedUser, fetchUserById } from "../../actions/user";

export const mapStateToProps = state => ({
    user: state.user,
});

export const mapDispatchToProps = dispatch => ({
    onInit(userId) {
        dispatch(fetchUserById(userId));
    },
    onLeave() {
        dispatch(cleanFetchedUser());
    },
});

const UserDetail = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserDetailComponent);

export default UserDetail;
