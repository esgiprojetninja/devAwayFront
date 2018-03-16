import { connect } from "react-redux";
import { removeSnackMsg } from "../actions/snack";
import { loadSessionUser } from "../actions/user";
import HomeComponent from "../ui/Home.jsx";

export const mapStateToProps = state => state;

export const mapDispatchToProps = dispatch => ({
    closeSnack() {
        dispatch(removeSnackMsg());
    },
    onInit() {
        dispatch(loadSessionUser());
    }
});

const Home = connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomeComponent);

export default Home;
