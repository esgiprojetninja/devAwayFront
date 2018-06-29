import { connect } from "react-redux";

import AccommodationDetailImagesComponent from "../ui/Accommodation/AccommodationDetailImages.jsx";
// import { saveAccommodation } from "../actions/accommodation";
// import missionApi from "../api/missionApi";

export const mapStateToProps = state => state;

export const mapDispatchToProps = dispatch => ({ // eslint-disable-line
    async updatePicture(acco, pictureIndex, binaryImg) {
        // await dispatch(saveAccommodation(img));
        console.log("POULAAAY", acco, pictureIndex, binaryImg);
    },
});

const AccommodationDetailImages = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccommodationDetailImagesComponent);

export default AccommodationDetailImages;
