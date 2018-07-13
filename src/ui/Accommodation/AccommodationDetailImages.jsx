/* global */
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Slider from "react-slick";
import * as T from "prop-types";
import AddImgIcon from "react-icons/lib/go/plus";
import EditImgIcon from "react-icons/lib/go/pencil";
import { lightGrey, darkGrey } from "../../styles/theme";
import { getImgUrl } from "../../utils/image";

const addImgStyle = {
    margin: "auto",
    width: "100%",
    height: "100%",
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
};

const styles = theme => ({
    container: {
        width: "100%",
        position: "relative",
        height: "430px",
        overflow: "hidden",
        borderBottom: `2px solid ${lightGrey}`
    },
    imgContainer: {
        height: "430px",
        position: "relative",
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
        ...addImgStyle,
        border: `1px solid ${theme.palette.primary.main}`,
        background: theme.palette.primary.main,
        color: "#fff",
        fill: "#fff",
        height: "32px",
        width: "20px",
        padding: "0 5px",
        marginLeft: theme.spacing.unit
    },
    editImgIcon: {
        ...addImgStyle,
        maxHeight: 30,
        maxWidth: 30,
        color: theme.palette.primary.main,
        fill: theme.palette.primary.main,
    },
    img: {
        width: "100%",
        height: "auto",
        opacity: "0.7",
    },
    dotImgWrapper: {
        width: "40px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyItems: "center",
        flexDirection: "row",
        cursor: "pointer",
        position: "relative",
        "&:hover > svg": {
            boxShadow: `-1px 1px 4px 0px ${theme.palette.primary.main}`,
        },
    },
    addImgWrapper: {
        width: "60px",
        height: "60px",
        margin: "auto",
        position: "relative",
        "&:hover > svg": {
            boxShadow: `-1px 1px 4px 0px ${theme.palette.primary.main}`,
        },
    },
    inputPicture: {
        opacity: 0,
        width: "100%",
        height: "100%",
        zIndex: 2,
        top: 0,
        left: 0,
        position: "absolute",
        cursor: "pointer",
    },
    editPictureContainer: {
        position: "absolute",
        top: 6,
        right: 4,
        height: 50,
        width: 50,
        background: "#fff",
        display: "flex",
        cursor: "pointer",
        transition: "box-shadow .2s ease-in-out",
        zIndex: 1,
        borderRadius: "100%",
        boxShadow: `-1px 1px 1px 0px ${theme.palette.primary.main}`,
        "&:hover": {
            boxShadow: `-1px 1px 4px 0px ${theme.palette.primary.main}`,
        }
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
        changePictureListener: null,
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
            backgroundColor: "#fff",
            height: "60px",
            paddingBottom: "20px",
        };
        return {
            ...SLIDER_SETTINGS,
            appendDots: (dots) => {
                return (
                    <div style={style}>
                        {dots.map((dot, index) => this.renderDot(index))}
                    </div>
                );
            }
        };
    }

    slider = null;

    handleAddImg = (e, pictureId) => {
        e.preventDefault();
        const reader = new global.FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            if (reader.result.indexOf("data:image/") > -1) {
                if (!this.props.changePictureListener) {
                    return this.props.updatePicture(this.acco, pictureId, reader.result);
                }
                return this.props.changePictureListener(this.acco, pictureId, reader.result);
            }
            return null;
        };
        reader.readAsDataURL(file);
    }

    renderDot(index) {
        const { classes } = this.props;
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
                    className={classes.dotImgWrapper}
                >
                    <img className={classes.img} src={getImgUrl(this.acco.pictures[index])} alt="dot" />
                </div>
            );
        }
        return (
            <div key={index} className={classes.dotImgWrapper}>
                <AddImgIcon
                    size={25}
                    className={classes.addImgIcon}
                />
                <input
                    type="file"
                    name="placePictureEdit"
                    accept="image/*"
                    className={classes.inputPicture}
                    onChange={e => this.handleAddImg(e, null)}
                />
            </div>
        );
    }

    renderAddImage(i) {
        if (!this.props.isUserOwner) {
            return null;
        }
        const { classes } = this.props;
        return (
            <div key={`${ADD_IMAGE_WARN}-${i}`} className={classes.noImgContainer}>
                <div className={classes.noImgWrapper}>
                    <div className={classes.addImgWrapper} >
                        <AddImgIcon
                            size={40}
                            className={classes.addImgIcon}
                        />
                        <input
                            type="file"
                            name="placePictureAdd"
                            accept="image/*"
                            className={classes.inputPicture}
                            onChange={e => this.handleAddImg(e, null)}
                        />
                    </div>
                </div>
            </div>
        );
    }

    renderImage(pictureObj) {
        const { classes } = this.props;
        const imgUrl = getImgUrl(pictureObj);
        return (
            <div className={classes.imgContainer} key={pictureObj.url}>
                {
                    this.props.isUserOwner ?
                        <div className={classes.editPictureContainer}>
                            <EditImgIcon
                                size={25}
                                className={classes.editImgIcon}
                            />
                            <input
                                type="file"
                                name="placePictureUpload"
                                accept="image/*"
                                className={classes.inputPicture}
                                onChange={e => this.handleAddImg(e, pictureObj.id)}
                            />
                        </div>
                        : null
                }
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
                    this.acco.pictures.length + 1 >= MAX_PICTURES ?
                        this.acco.pictures.map(pic => this.renderImage(pic))
                        : this.acco.pictures.concat([ADD_IMAGE_WARN]).map((pic, i) => {
                            if (pic === ADD_IMAGE_WARN) {
                                return this.renderAddImage(i);
                            }
                            return this.renderImage(pic, i);
                        })
                }
            </Slider>
        );
    }
}

AccommodationDetailImages.propTypes = {
    classes: T.shape({
        container: T.string.isRequired,
        imgContainer: T.string.isRequired,
        img: T.string.isRequired,
        addImgIcon: T.string.isRequired,
        dotImgWrapper: T.string.isRequired,
    }).isRequired,
    updatePicture: T.func.isRequired,
    changePictureListener: T.func,
    acco: T.shape({
        pictures: T.arrayOf(T.shape({
            url: T.string.isRequired,
        })).isRequired,
    }),
    isUserOwner: T.bool.isRequired,
};

export default withStyles(styles)(AccommodationDetailImages);
