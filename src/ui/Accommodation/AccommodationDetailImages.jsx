import React from "react";
// import * as T from "prop-types";
import { accommodationPropTypes } from "../../propTypes/accommodationType";
// import { lightGrey, midGrey, darkGrey } from "../../styles/theme";

const styles = {
    coverImg: {
        width: "100%",
        position: "relative",
        height: "430px",
        WebkitBackgroundSize: "cover",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat no-repeat",
        backgroundPosition: "center",
        WebkitBoxShadow: "inset 0px -2px 10px -4px #fff",
        MozBoxShadow: "inset 0px -2px 10px -4px #fff",
        boxShadow: "inset 0px -2px 10px -4px #fff"
    },
};

export default class AccommodationDetailImages extends React.PureComponent {
    static propTypes = {
        // updatePicture: T.func.isRequired,
        acco: accommodationPropTypes.isRequired,
    }

    get acco() {
        return this.props.acco || null;
    }

    render() {
        if (!this.acco) {
            return (
                <div style={{ marginTop: "80px" }} />
            );
        }
        const imgUrl = this.acco.pictures.length > 0 ? this.acco.pictures[0].url : "/img/accommodation.jpg";
        const style = {
            ...styles.coverImg,
            backgroundImage: `url("${imgUrl}")`
        };
        return (
            <div style={style}>
                <div style={styles.coverImgOpacifier} />
            </div>
        );
    }
}
