import { connect } from "react-redux";
import AccommodationsTabsComponent from "../ui/Accommodation/AccommodationsTabs.jsx";

export const mapStateToProps = state => state;

export const mapDispatchToProps = () => ({
    toto() {
        return "poulay";
    }
});

const AccommodationsList = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccommodationsTabsComponent);

export default AccommodationsList;
