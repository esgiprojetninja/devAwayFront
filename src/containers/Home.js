import { connect } from "react-redux";
import HomeComponent from "../ui/Home.jsx";

const mapStateToProps = state => state;

const mapDispatchToProps = (): {} => ({});

const Home = connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomeComponent);

export default Home;
