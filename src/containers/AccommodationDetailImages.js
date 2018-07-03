import { connect } from "react-redux";

import AccommodationDetailImagesComponent from "../ui/Accommodation/AccommodationDetailImages.jsx";
import { upsertPicture } from "../actions/accommodation";

export const mapStateToProps = state => state;

export const mapDispatchToProps = dispatch => ({ // eslint-disable-line
    async updatePicture(acco, pictureId, binaryImg) {
        const picture = {
            accommodation_id: acco.id,
            url: binaryImg,
            id: pictureId,
        };
        await dispatch(upsertPicture(picture));
    },
});

const AccommodationDetailImages = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccommodationDetailImagesComponent);

export default AccommodationDetailImages;
