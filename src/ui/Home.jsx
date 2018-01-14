import * as React from "react";
import * as T from "prop-types";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";

import HomeSearchForm from "./HomeSearchForm.jsx";
import ArticleWithMedia from "./ArticleWithMedia.jsx";

const Home = (props) => {
    const { classes } = props;
    const title = "Our Service";
    const lead = "Stay in distinctive private homes in over 180 destinations";
    const article = "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...";
    return (
        <div>
            <div className={classes.backgroundImg}>
                <div>
                    <img
                        className={classes.homeLogo}
                        alt="Devaway Logo"
                        src={`${process.env.PUBLIC_URL}/img/logo.png`}
                    />
                    <img
                        className={classes.homeTitle}
                        alt="Devaway Title"
                        src={`${process.env.PUBLIC_URL}/img/devawaytitle.png`}
                    />
                    <hr className="small-hr"/>
                    <span className="home-pl">Use our skills to share a human</span>
                    <span className="home-pl">experience, it's a win-win</span>
                </div>
            </div>
            <HomeSearchForm />
            <ArticleWithMedia
                title={title}
                lead={lead}
                article1={article}
                article2={article}
                article3={article}
                article4={article}
            />
            <div className={classes.brandRibon}>
                <img
                    alt="Devaway Logo"
                    src={`${process.env.PUBLIC_URL}/img/logo.png`}
                />
            </div>
            <div className={classes.whiteContent}>
                <Typography type="display2">
                    Soon...
                </Typography>
            </div>
            <footer className={classes.footer}>
                <Typography
                    type="subheading"
                >
                    Devaway ©
                </Typography>
                <ul className={classes.footerList}>
                    <li className={classes.footerListItem}>
                        <a href="/#">Accommodations</a>
                    </li>
                    <li className={classes.footerListItem}>
                        <a href="/#">Contact us</a>
                    </li>
                    <li className={classes.footerListItem}>
                        <a href="/#">Cookies policy</a>
                    </li>
                    <li className={classes.footerListItem}>
                        <a href="/#">Legal terms</a>
                    </li>
                </ul>
            </footer>
        </div>
    );
};

Home.propTypes = {
    classes: T.shape({
        root: T.string,
        brandRibon: T.string,
        backgroundImg: T.string
    }).isRequired
};

export default withStyles(theme => ({
    root: {
        color: theme.palette.common.white
    },
    brandRibon: {
        backgroundColor: theme.palette.background.contentFrame,
        padding: theme.spacing.unit * 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    backgroundImg: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        background: `url('${process.env.PUBLIC_URL}/img/home-background.png') center`,
        backgroundSize: "cover"
    },
    homeLogo: {
        maxHeight: "9vh",
        marginRight: "15px"
    },
    homeTitle: {
        maxHeight: "9vh"
    },
    whiteContent: {
        padding: theme.spacing.unit * 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    footer: {
        backgroundColor: theme.palette.background.contentFrame,
        padding: theme.spacing.unit * 2
    },
    footerList: {
        listStyleType: "none",
        display: "inline-flex"
    },
    footerListItem: {
        margin: theme.spacing.unit
    }
}))(Home);
