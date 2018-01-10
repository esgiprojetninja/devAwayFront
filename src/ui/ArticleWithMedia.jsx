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
        <div className={classes.container}>
            <Typography
                type="headline"
                align="center"
            >
                {title}
            </Typography>
            <hr
                className={classes.title}
            />
            <Grid container>
                <Grid item sm={4}>
                    <img
                        alt="people working"
                        src={`${process.env.PUBLIC_URL}/img/people-working.jpg`}
                        className={classes.img}
                    />
                </Grid>
                <Grid
                    item
                    sm={8}
                >
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
                        <Grid item sm={6}>
                            <Typography
                                className={classes.article}
                                type="body2"
                            >
                                {article1}
                            </Typography>
                        </Grid>
                        <Grid item sm={6}>
                            <Typography
                                className={classes.article}
                                type="body2"
                            >
                                {article2}
                            </Typography>
                        </Grid>
                        <Grid item sm={6}>
                            <Typography
                                className={classes.article}
                                type="body2"
                            >
                                {article3}
                            </Typography>
                        </Grid>
                        <Grid item sm={6}>
                            <Typography
                                className={classes.article}
                                type="body2"
                            >
                                {article4}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
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
    container: {
        margin: theme.spacing.unit * 2
    },
    img: {
        width: "100%",
        padding: theme.spacing.unit
    },
    title: {
        marginBottom: theme.spacing.unit * 4
    },
    lead: {
        marginBottom: theme.spacing.unit * 3
    },
    articleBox: {
        paddingLeft: theme.spacing.unit * 2
    },
    article: {
        margin: theme.spacing.unit
    }
}))(ArticleWithMedia);
