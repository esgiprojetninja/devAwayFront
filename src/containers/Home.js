import { connect } from "react-redux";
import { removeSnackMsg } from "../actions/snack";
import HomeComponent from "../ui/Home.jsx";

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    closeSnack() {
        dispatch(removeSnackMsg());
    }
});

const Home = connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomeComponent);

export default Home;
