import { connect } from "react-redux";
import AccommodationComponent from "../ui/Accommodation.jsx";

const mapStateToProps = state => (state.accommodation);

const mapDispatchToProps = () => ({});

const Accommodation = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccommodationComponent);

export default Accommodation;
