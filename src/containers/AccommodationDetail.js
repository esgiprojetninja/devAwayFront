import { connect } from "react-redux";

import AccommodationDetailComponent from "../ui/Accommodation/AccommodationDetail.jsx";

export const mapStateToProps = state => state;

export const mapDispatchToProps = () => ({
});

const AccommodationDetail = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccommodationDetailComponent);

export default AccommodationDetail;
