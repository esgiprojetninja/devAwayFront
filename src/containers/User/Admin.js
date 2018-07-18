import { connect } from "react-redux";
import AdminComponent from "../../ui/User/Admin";
import { fetchAccommodations, deleteAccommodation } from "../../actions/accommodation";

export const mapStateToProps = state => state;

export const mapDispatchToProps = dispatch => ({
    onInit(userId) {
        dispatch(fetchAccommodations(userId));
    },
    deleteAcco(userId) {
        dispatch(deleteAccommodation(userId));
    },
});

const Admin = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AdminComponent);

export default Admin;
