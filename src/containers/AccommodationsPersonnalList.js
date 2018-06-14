import { connect } from "react-redux";

import AccommodationsListComponent from "../ui/Accommodation/AccommodationsPersonnalList.jsx";

export const mapStateToProps = state => state;

export const mapDispatchToProps = () => ({
    onInit() {
        console.log("Inited personnal accos component");
    }
});

const AccommodationsList = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccommodationsListComponent);

export default AccommodationsList;
