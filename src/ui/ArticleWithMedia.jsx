import React from "react";
import * as T from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";
import Hidden from "@material-ui/core/Hidden";

const ArticleWithMedia = (props) => {
    const {
        classes,
        title,
        lead,
        article1,
        article2,
        article3,
        article4
    } = props;
    return (
        <Grid className={classes.containerWrapper}>
            <Grid container className={classes.container}>
                <div className="full-width">
                    <Typography
                        type="headline"
                        align="center"
                        className={classes.sectionTitle}
                    >
                        {title}
                    </Typography>
                    <hr className="hr medium-hr black" />
                </div>
                <ScrollAnimation animateIn="fadeInRight">
                    <Grid container className={classes.sectionContainer}>
                        <Hidden only={["xs", "sm"]}>
                            <Grid
                                item
                                md={4}
                                className={classes.sectionImg}
                            />
                        </Hidden>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={8}
                            className={classes.articleTextContainer}
                        >
                            <div>
                                <Typography
                                    type="subheading"
                                    align="center"
                                    className={classes.lead}
                                >
                                    {lead}
                                </Typography>
                                <Grid
                                    container
                                    className={classes.articleBox}
                                >
                                    <Grid item xs={6} sm={6} className={classes.articleWrapper}>
                                        <hr className="hr xsmall-hr black" />
                                        <Typography
                                            className={classes.article}
                                            type="body2"
                                        >
                                            {article1}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={6} className={classes.articleWrapper}>
                                        <hr className="hr xsmall-hr black" />
                                        <Typography
                                            className={classes.article}
                                            type="body2"
                                        >
                                            {article2}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={6} className={classes.articleWrapper}>
                                        <hr className="hr xsmall-hr black" />
                                        <Typography
                                            className={classes.article}
                                            type="body2"
                                        >
                                            {article3}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={6} className={classes.articleWrapper}>
                                        <hr className="hr xsmall-hr black" />
                                        <Typography
                                            className={classes.article}
                                            type="body2"
                                        >
                                            {article4}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </ScrollAnimation>
            </Grid>
        </Grid>
    );
};

ArticleWithMedia.propTypes = {
    classes: T.shape({
        container: T.string,
        img: T.string
    }).isRequired,
    title: T.string.isRequired,
    lead: T.string.isRequired,
    article1: T.string,
    article2: T.string,
    article3: T.string,
    article4: T.string
};

ArticleWithMedia.defaultProps = {
    article1: "",
    article2: "",
    article3: "",
    article4: ""
};

export default withStyles(theme => ({
    containerWrapper: {
        margin: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "70px 0"
    },
    container: {
        width: "80%"
    },
    img: {
        width: "100%",
        padding: theme.spacing.unit
    },
    articleWrapper: {
        padding: "8px 25px 8px 8px !important"
    },
    title: {
        marginBottom: theme.spacing.unit * 4
    },
    articleTextContainer: {
        padding: "0 25px 0 40px !important"
    },
    sectionImg: {
        background: `url('${process.env.PUBLIC_URL}/img/people-working.jpg') center`,
        backgroundSize: "cover",
        minHeight: "500px"
    },
    sectionContainer: {
        marginTop: "35px"
    },
    sectionTitle: {
        textTransform: "uppercase",
        fontSize: "25px",
        letterSpacing: "2px",
    },
    lead: {
        marginBottom: theme.spacing.unit * 3,
        fontSize: "25px",
        textAlign: "justify"
    },
    articleBox: {
        paddingLeft: "0"
    },
    article: {
        margin: "0",
        textAlign: "justify"
    }
}))(ArticleWithMedia);
