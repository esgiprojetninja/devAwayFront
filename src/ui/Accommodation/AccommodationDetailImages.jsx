import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Slider from "react-slick";
import * as T from "prop-types";
import AddImgIcon from "react-icons/lib/go/plus";
import { accommodationPropTypes } from "../../propTypes/accommodationType";
import { darkGrey } from "../../styles/theme";

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
    },
    noImgWrapper: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyItems: "center",
        flexDirection: "row",
    },
    addImgIcon: {
        margin: "auto",
        border: `1px solid ${darkGrey}`,
        borderRadius: "100%",
        color: darkGrey,
        fill: darkGrey,
        transition: "fill, color, background .2s ease-in-out",
        cursor: "pointer",
        "&:hover": {
            color: "#fff",
            fill: "#fff",
            backgroundColor: darkGrey,
        },
    },
    img: {
        width: "100%",
        height: "auto",
        opacity: "0.7",
    },
    dotImgWrapper: {
        width: "50px",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyItems: "center",
        flexDirection: "row",
        cursor: "pointer",
    },
});

const MAX_PICTURES = 7;
const ADD_IMAGE_WARN = "HEY_POULAYMAN";

const SLIDER_SETTINGS = {
    dots: true,
    infinite: true,
    arrows: true,
    autoplay: false,
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

    get sliderSettings() {
        const style = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            backgroundColor: "rgba(255, 255, 255, .7)",
            height: "60px",
            paddingBottom: "20px",
        };
        return {
            ...SLIDER_SETTINGS,
            appendDots: (dots) => {
                return (
                    <div style={style}>
                        {dots.map((dot, index) => this.renderDot(dot, index))}
                    </div>
                );
            }
        };
    }
    slider = null;

    handleAddImg = () => {
        console.log("adding image");
    }

    renderDot(dot, index) {
        if (this.acco && this.acco.pictures[index] && this.acco.pictures[index].url) {
            return (
                <div
                    onClick={() => {
                        this.slider.slickGoTo(index);
                    }}
                    onKeyPress={() => {
                        this.slider.slickGoTo(index);
                    }}
                    role="button"
                    key={index}
                    tabIndex={0}
                    className={this.props.classes.dotImgWrapper}
                >
                    <img className={this.props.classes.img} src={this.acco.pictures[index].url} alt="dot" />
                </div>
            );
        } else if (this.acco && !this.acco.pictures[index]) {
            // retourner add Image
        }
        return dot;
    }

    renderAddImage(i) {
        if (!this.props.isUserOwner) {
            return null;
        }
        const { classes } = this.props;
        return (
            <div key={`${ADD_IMAGE_WARN}-${i}`} className={classes.noImgContainer}>
                <div className={classes.noImgWrapper}>
                    <AddImgIcon
                        size={40}
                        className={classes.addImgIcon}
                        onClick={this.handleAddImg}
                    />
                </div>
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
            <Slider
                ref={(sl) => { this.slider = sl; }}
                className={this.props.classes.container}
                {...this.sliderSettings}
            >
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
        img: T.string,
        dotImgWrapper: T.string,
    }).isRequired,
    // updatePicture: T.func.isRequired,
    acco: accommodationPropTypes,
    isUserOwner: T.bool.isRequired,
};

export default withStyles(styles)(AccommodationDetailImages);
