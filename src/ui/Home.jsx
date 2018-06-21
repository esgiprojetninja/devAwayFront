import * as React from "react";
import * as T from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Snackbar from "@material-ui/core/Snackbar";
import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";
import HomeSearchForm from "./HomeSearchForm.jsx";
import ArticleWithMedia from "./ArticleWithMedia.jsx";
import AccommodationCard from "../containers/AccommodationCard.js";
import Navbar from "../containers/Navbar";

const titleService = "Our Service";
const lead = "Stay in distinctive private homes in over 180 destinations - with an unprecedented level of service.";
const article = "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...";

export class Home extends React.PureComponent {
    static propTypes = {
        classes: T.shape({
            root: T.string,
            brandRibon: T.string,
            backgroundImg: T.string,
            snackbar: T.string.isRequired,
            footer: T.string.isRequired,
            footerList: T.string.isRequired,
            footerListItem: T.string.isRequired,
            homeLogo: T.string.isRequired,
            brandRibonImg: T.string.isRequired,
            brandRibonEsgiImg: T.string.isRequired,
            brandRibonImgLogo: T.string.isRequired,
            subSection: T.string.isRequired,
            subSectionDestination: T.string.isRequired,
            sectionTitle: T.string.isRequired,
            subSectionHr: T.string.isRequired,
            homeTitle: T.string.isRequired,
            homePlWrapper: T.string.isRequired,
            destinationWrapper: T.string.isRequired,
            destinationsImg: T.string.isRequired
        }).isRequired,
        snack: T.shape({
            snackText: T.string.isRequired,
            hasSnack: T.bool.isRequired,
            snackDuration: T.number.isRequired
        }).isRequired,
        closeSnack: T.func.isRequired
    };

    renderFirstBlock() {
        return (
            <div className={this.props.classes.backgroundImg}>
                <div>
                    <ScrollAnimation animateIn="fadeIn">
                        <img
                            className={this.props.classes.homeLogo}
                            alt="Devaway Logo"
                            src={`${process.env.PUBLIC_URL}/img/logo.png`}
                        />
                        <img
                            className={this.props.classes.homeTitle}
                            alt="Devaway Title"
                            src={`${process.env.PUBLIC_URL}/img/devawaytitle.png`}
                        />
                        <hr className="hr small-hr" />
                        <div className={this.props.classes.homePlWrapper}>
                            <span className="home-pl">Use our skills to share a human</span>
                            <span className="home-pl">experience, it&apos;s a win-win</span>
                        </div>
                    </ScrollAnimation>
                </div>
            </div>
        );
    }

    renderBrandRibon() {
        return (
            <div className={this.props.classes.brandRibon}>
                <ScrollAnimation className="vertical-align" animateIn="fadeInLeft">
                    <div className="vertical-align">
                        <img
                            className={`${this.props.classes.brandRibonImg}   ${this.props.classes.brandRibonEsgiImg}`}
                            alt="Esgi Logo"
                            src={`${process.env.PUBLIC_URL}/img/esgilogo.png`}
                        />
                        <img
                            className={`${this.props.classes.brandRibonImg}  ${this.props.classes.brandRibonImgLogo}`}
                            alt="Devaway Logo"
                            src={`${process.env.PUBLIC_URL}/img/logo.png`}
                        />
                        <img
                            className={this.props.classes.brandRibonImg}
                            alt="Devaway title"
                            src={`${process.env.PUBLIC_URL}/img/devawaytitleblack.png`}
                        />
                    </div>
                </ScrollAnimation>
            </div>
        );
    }

    renderDestinations() {
        return (
            <div className={`${this.props.classes.subSection}  ${this.props.classes.subSectionDestination}`}>
                <div className="d-block">
                    <Typography
                        type="headline"
                        align="center"
                        className={this.props.classes.sectionTitle}
                    >
                        Destinations
                    </Typography>
                    <hr className={`hr medium-hr black  ${this.props.classes.subSectionHr}`} />
                </div>
                <div className={this.props.classes.destinationWrapper}>
                    <img alt="Destinations" className={this.props.classes.destinationsImg} src={`${process.env.PUBLIC_URL}/img/SoonDestinations.png`} />
                </div>
            </div>
        );
    }

    renderAccomodations() {
        return (
            <div className={this.props.classes.subSection}>
                <div className="d-block">
                    <Typography
                        type="headline"
                        align="center"
                        className={this.props.classes.sectionTitle}
                    >
                        Accommodations
                    </Typography>
                    <hr className={`hr medium-hr black  ${this.props.classes.subSectionHr}`} />
                </div>
                <div className="vertical-align">
                    <AccommodationCard />
                </div>
            </div>
        );
    }

    renderFooter() {
        return (
            <footer className={this.props.classes.footer}>
                <Typography
                    type="subheading"
                >
                    <span className="d-block"> d e v a w a y © provides you the best accommodations </span>
                    <span className="d-block"> with a sharing human experience. </span>
                </Typography>
                <ul className={this.props.classes.footerList}>
                    <li className={this.props.classes.footerListItem}>
                        <a href="/#">Accommodations</a>
                    </li>
                    <li className={this.props.classes.footerListItem}>
                        <a href="/#">Contact us</a>
                    </li>
                    <li className={this.props.classes.footerListItem}>
                        <a href="/#">Cookies policy</a>
                    </li>
                    <li className={this.props.classes.footerListItem}>
                        <a href="/#">Legal terms</a>
                    </li>
                </ul>
                <Typography
                    type="subheading"
                >
                    <span className="d-block"> Public Cloud by <a href="https://github.com/esgiprojetninja/workaway" rel="noopener noreferrer" target="_blank">ESGI Ninja</a></span>
                </Typography>
            </footer>
        );
    }

    renderSnackbar() {
        return (
            <Snackbar
                message={this.props.snack.snackText}
                autoHideDuration={this.props.snack.snackDuration}
                open={this.props.snack.hasSnack}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                style={{
                    left: "calc(50%)"
                }}
                className={this.props.classes.snackbar}
                onClose={this.props.closeSnack}
                action={[
                    <Button key="undo" color="primary" onClick={this.props.closeSnack}>
                        OK
                    </Button>,
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="primary"
                        onClick={this.props.closeSnack}
                    >
                        <CloseIcon />
                    </IconButton>
                ]}
            />
        );
    }


    render() {
        return (
            <div>
                <Navbar />
                <div id="home-container">
                    {this.renderFirstBlock()}
                    <HomeSearchForm />
                    <ArticleWithMedia
                        title={titleService}
                        lead={lead}
                        article1={article}
                        article2={article}
                        article3={article}
                        article4={article}
                    />
                    {this.renderBrandRibon()}
                    {this.renderDestinations()}
                    {this.renderAccomodations()}
                    {this.renderFooter()}
                    {this.renderSnackbar()}
                </div>
            </div>
        );
    }
}

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
    destinationsImg: {
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
    },
    snackbar: {
        margin: theme.spacing.unit,
        width: "300px",
        left: "calc(50% - 150px)"
    }
}))(Home);
