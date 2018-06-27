import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Slider from "react-slick";
import * as T from "prop-types";
import { accommodationPropTypes } from "../../propTypes/accommodationType";
// import { lightGrey, midGrey, darkGrey } from "../../styles/theme";

const styles = theme => ({ // eslint-disable-line
    container: {
        width: "100%",
        position: "relative",
        height: "430px",
    },
    imgContainer: {
        height: "430px",
        WebkitBackgroundSize: "cover",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat no-repeat",
        backgroundPosition: "center",
        WebkitBoxShadow: "inset 0px -2px 10px -4px #fff",
        MozBoxShadow: "inset 0px -2px 10px -4px #fff",
        boxShadow: "inset 0px -2px 10px -4px #fff",
        overflow: "hidden",
    },
    img: {
        width: "100%",
        height: "auto",
        opacity: "0.7",
    }
});

const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

class AccommodationDetailImages extends React.PureComponent {
    static defaultProps = {
        acco: null,
    }

    get acco() {
        return this.props.acco || null;
    }

    renderImage(pictureObj) {
        const { classes } = this.props;
        if (this.props.isUserOwner) {
            console.log("HEY THIS PIC NEEDS TO BE CHANGEABLE");
        }
        const imgUrl = pictureObj.url || "/img/accommodation.jpg";
        return (
            <div className={classes.imgContainer} key={pictureObj.url}>
                <img className={classes.img} src={imgUrl} alt={pictureObj.id} />
            </div>
        );
    }

    render() {
        if (this.acco === null) {
            return (
                <div style={{ marginTop: "80px" }} />
            );
        }
        return (
            <Slider className={this.props.classes.container} {...sliderSettings}>
                {this.acco.pictures.map(pic => this.renderImage(pic))}
            </Slider>
        );
    }
}

AccommodationDetailImages.propTypes = {
    classes: T.shape({
        container: T.string,
        imgContainer: T.string,
    }).isRequired,
    // updatePicture: T.func.isRequired,
    acco: accommodationPropTypes,
    isUserOwner: T.bool.isRequired,
};

export default withStyles(styles)(AccommodationDetailImages);
