import { connect } from "react-redux";
import AdminComponent from "../../ui/User/Admin";
import { fetchUserById } from "../../actions/user";

export const mapStateToProps = state => state;

export const mapDispatchToProps = dispatch => ({
    onInit(userId) {
        dispatch(fetchUserById(userId));
    },
});

const Admin = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AdminComponent);

export default Admin;
