import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Slider from "react-slick";
import * as T from "prop-types";
import AddImgIcon from "react-icons/lib/fa/file-image-o";
import { accommodationPropTypes } from "../../propTypes/accommodationType";
// import { lightGrey, midGrey, darkGrey } from "../../styles/theme";

const styles = theme => ({ // eslint-disable-line
    container: {
        width: "100%",
        position: "relative",
        height: "430px",
        overflow: "hidden",
    },
    imgContainer: {
        height: "430px",
        WebkitBoxShadow: "inset 0px -2px 10px -4px #fff",
        MozBoxShadow: "inset 0px -2px 10px -4px #fff",
        boxShadow: "inset 0px -2px 10px -4px #fff",
        overflow: "hidden",
    },
    noImgContainer: {
        height: "430px",
        WebkitBoxShadow: "inset 0px -2px 10px -4px #fff",
        MozBoxShadow: "inset 0px -2px 10px -4px #fff",
        boxShadow: "inset 0px -2px 10px -4px #fff",
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyItems: "center",
        flexDirection: "row",
    },
    img: {
        width: "100%",
        height: "auto",
        opacity: "0.7",
    }
});

const MAX_PICTURES = 7;
const ADD_IMAGE_WARN = "HEY_POULAYMAN";

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

    handleAddImg = () => {
        console.log("adding image");
    }

    renderAddImage(i) {
        const { classes } = this.props;
        return (
            <div key={`${ADD_IMAGE_WARN}-${i}`} onClick={this.handleAddImg} className={classes.noImgContainer}>
                <AddImgIcon />
            </div>
        );
    }

    renderImage(pictureObj) {
        const { classes } = this.props;
        if (this.props.isUserOwner) {
            // @TODO make image changeable
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
                {
                    this.acco.pictures.length >= MAX_PICTURES ?
                        this.acco.pictures.map(pic => this.renderImage(pic))
                        : this.acco.pictures.concat(Array.from(
                            new Array(MAX_PICTURES - this.acco.pictures.length))
                            .map(() => ADD_IMAGE_WARN)
                        ).map((pic, i) => {
                            if (pic === ADD_IMAGE_WARN) {
                                return this.renderAddImage(i);
                            }
                            return this.renderImage(pic);
                        })
                }
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
