import * as React from "react";
import * as T from "prop-types";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";

import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";
import HomeSearchForm from "./HomeSearchForm.jsx";
import ArticleWithMedia from "./ArticleWithMedia.jsx";
import AccommodationCard from "../containers/AccommodationCard.js";

export const Home = (props) => {
    const { classes } = props;
    const titleService = "Our Service";
    const lead = "Stay in distinctive private homes in over 180 destinations - with an unprecedented level of service.";
    const article = "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...";
    return (
        <div id="home-container">
            <div className={classes.backgroundImg}>
                <div>
                    <ScrollAnimation animateIn="fadeIn">
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
                        <hr className="hr small-hr"/>
                        <div className={classes.homePlWrapper}>
                            <span className="home-pl">Use our skills to share a human</span>
                            <span className="home-pl">experience, it's a win-win</span>
                        </div>
                    </ScrollAnimation>
                </div>
            </div>
            <HomeSearchForm />
            <ArticleWithMedia
                title={titleService}
                lead={lead}
                article1={article}
                article2={article}
                article3={article}
                article4={article}
            />
            <div className={classes.brandRibon}>
                <ScrollAnimation className="vertical-align" animateIn="fadeInLeft">
                    <div className="vertical-align">
                        <img
                            className={classes.brandRibonImg + " " + classes.brandRibonEsgiImg}
                            alt="Esgi Logo"
                            src={`${process.env.PUBLIC_URL}/img/esgilogo.png`}
                        />
                        <img
                            className={classes.brandRibonImg + " " + classes.brandRibonImgLogo}
                            alt="Devaway Logo"
                            src={`${process.env.PUBLIC_URL}/img/logo.png`}
                        />
                        <img
                            className={classes.brandRibonImg}
                            alt="Devaway title"
                            src={`${process.env.PUBLIC_URL}/img/devawaytitleblack.png`}
                        />
                    </div>
                </ScrollAnimation>
            </div>
            <div className={classes.subSection + " " + classes.subSectionDestination}>
                <div className="d-block">
                    <Typography
                        type="headline"
                        align="center"
                        className={classes.sectionTitle}
                    >
                        Destinations
                    </Typography>
                    <hr className={"hr medium-hr black " + classes.subSectionHr } />
                </div>
                <div className={classes.destinationWrapper}>
                    <img alt="Destinations" className={classes.destinationsImg} src={`${process.env.PUBLIC_URL}/img/SoonDestinations.png`}/>
                </div>
            </div>
            <div className={classes.subSection}>
                <div className="d-block">
                    <Typography
                        type="headline"
                        align="center"
                        className={classes.sectionTitle}
                    >
                        Accommodations
                    </Typography>
                    <hr className={"hr medium-hr black " + classes.subSectionHr } />
                </div>
                <div className="vertical-align">
                    <AccommodationCard/>
                </div>
            </div>
            <footer className={classes.footer}>
                <Typography
                    type="subheading"
                >
                    <span className="d-block"> d e v a w a y © provides you the best accommodations </span>
                    <span className="d-block"> with a sharing human experience. </span>
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
                <Typography
                    type="subheading"
                >
                    <span className="d-block"> Public Cloud by <a href="https://github.com/esgiprojetninja/workaway" rel="noopener noreferrer" target="_blank">ESGI Ninja</a></span>
                </Typography>
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
    brandRibonImg: {
        maxHeight: "7vh"
    },
    brandRibonImgLogo: {
        marginRight: "15px"
    },
    sectionTitle: {
        textTransform: "uppercase",
        fontSize: "25px",
        letterSpacing: "2px"
    },
    subSection: {
        textAlign: "center",
        padding: "25px",
        backgroundColor: "white"
    },
    destinationWrapper: {
        padding: "25px",
        overflow: "hidden",
        width: "100%"
    },
    destinationsImg: {
        opacity: 0.5,
        backgroundSize: "cover",
        width: "100%"
    },
    subSectionDestination: {
        paddingTop: "50px",
        overflow: "hidden"
    },
    subSectionHr: {
        marginBottom: "40px"
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
    brandRibonEsgiImg: {
        maxHeight: "13vh",
        marginRight: "5vw"
    },
    homePlWrapper: {
        marginTop: "23px"
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
        padding: "50px"
    },
    footerList: {
        listStyleType: "none",
        display: "inline-flex",
        margin: "15px 0",
        padding: 0
    },
    footerListItem: {
        marginLeft: 0,
        marginRight: "10px"
    }
}))(Home);
