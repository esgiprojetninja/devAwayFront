import React from "react";
import * as T from "prop-types";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";

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
            <Grid item sm={8} className={classes.container}>
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
                <Grid container className={classes.sectionContainer}>
                    <Grid
                        item
                        sm={4}
                        className={classes.sectionImg}
                    >
                    </Grid>
                    <Grid
                        item
                        sm={8}
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
                                <Grid item sm={6} className={classes.articleWrapper}>
                                    <hr className="hr xsmall-hr black"/>
                                    <Typography
                                        className={classes.article}
                                        type="body2"
                                    >
                                        {article1}
                                    </Typography>
                                </Grid>
                                <Grid item sm={6} className={classes.articleWrapper}>
                                    <hr className="hr xsmall-hr black"/>
                                    <Typography
                                        className={classes.article}
                                        type="body2"
                                    >
                                        {article2}
                                    </Typography>
                                </Grid>
                                <Grid item sm={6} className={classes.articleWrapper}>
                                    <hr className="hr xsmall-hr black"/>
                                    <Typography
                                        className={classes.article}
                                        type="body2"
                                    >
                                        {article3}
                                    </Typography>
                                </Grid>
                                <Grid item sm={6} className={classes.articleWrapper}>
                                    <hr className="hr xsmall-hr black"/>
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
        padding: "50px 0"
    },
    container: {
        overflow: "hidden"
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
    articleTextContainer: {
        padding: "0 25px 0 40px !important"
    },
    sectionImg: {
        background: `url('${process.env.PUBLIC_URL}/img/people-working.jpg') center`,
        backgroundSize: "cover"
    },
    sectionContainer: {
        minHeight: "75vh",
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
