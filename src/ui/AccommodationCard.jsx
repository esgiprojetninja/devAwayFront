import React from "react";
import * as T from "prop-types";
import GroupIcon from "@material-ui/icons/Group";
import LocalHotelIcon from "@material-ui/icons/LocalHotel";
import ScrollAnimation from "react-animate-on-scroll";
import Paper from "@material-ui/core/Paper";
import HotTubIcon from "@material-ui/icons/HotTub";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Slide from "@material-ui/core/Slide";
import PreviousIcon from "react-icons/lib/fa/arrow-left";
import NextIcon from "react-icons/lib/fa/arrow-right";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { accommodationReducerPropTypes } from "../propTypes/accommodation.reducer.d";
import { accommodationPropTypes } from "../propTypes/accommodationType";

const styles = theme => ({
    rootRaper: {
        width: "100%",
        height: "100%",
        margin: 0,
        padding: `${theme.spacing.unit * 2}px 0`,
    },
    media: {
        height: 0,
        paddingTop: "56.25%",
    },
    content: {
        padding: theme.spacing.unit * 2,
    },
    title: {
        display: "block",
        padding: theme.spacing.unit * 1.8,
        textAlign: "center",
        fontWeight: 800,
        color: theme.palette.primary.main,
        textTransform: "uppercase",
        height: 50,
        wordBreak: "break-all",
    },
    subtitle: {
        display: "block",
        padding: theme.spacing.unit * 1.8,
        textAlign: "center",
        fontWeight: 600,
        textTransform: "uppercase",
        height: 70,
        wordBreak: "break-all",
    },
    description: {
        display: "block",
        padding: theme.spacing.unit * 1.8,
        textAlign: "justify",
        fontWeight: 600,
        textTransform: "uppercase",
        overflowY: "auto",
        height: "80px",
    },
    iconContainer: {
        maxWidth: 250,
    },
    noAccosText: {
        margin: "auto",
    },
    buttonText: {
        margin: theme.spacing.unit
    },
    noAccosContainer: {
        height: "100%",
        minHeight: 200,
    },
    paginationContainer: {
        margin: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 0.5,
    },
    errorContainer: {
        minHeight: 50,
    },
});

class AccommodationCard extends React.PureComponent {
    static propTypes = {
        accommodation: accommodationReducerPropTypes.isRequired,
        onInit: T.func.isRequired,
        accoArr: T.arrayOf(accommodationPropTypes).isRequired,
        classes: T.shape({}).isRequired,
    }

    state = {
        firstAccoIndex: 0,
        accosDisplayed: 3,
        slideDirection: "up",
    };

    componentDidMount() {
        this.props.onInit();
    }

    get isLoading() {
        return this.props.accommodation.isLoading || this.props.accommodation.search.isLoading;
    }

    handlePrevious = () => {
        const { length } = this.props.accoArr;
        const { firstAccoIndex, accosDisplayed } = this.state;
        const predictionIndex = firstAccoIndex - accosDisplayed;
        if (predictionIndex < 0) {
            if (Math.abs(predictionIndex) < accosDisplayed) {
                this.setState({
                    firstAccoIndex: 0,
                    slideDirection: "right",
                });
            } else {
                this.setState({
                    firstAccoIndex: length - Math.abs(predictionIndex),
                    slideDirection: "right",
                });
            }
        } else {
            this.setState({
                firstAccoIndex: predictionIndex,
                slideDirection: "right",
            });
        }
    }

    handleNext = () => {
        const { length } = this.props.accoArr;
        const { firstAccoIndex, accosDisplayed } = this.state;
        const predictionIndex = firstAccoIndex + accosDisplayed;
        if (predictionIndex > length - 1) {
            this.setState({
                firstAccoIndex: 0,
                slideDirection: "left",
            });
        } else {
            this.setState({
                firstAccoIndex: predictionIndex,
                slideDirection: "left",
            });
        }
    }

    renderSpinner() {
        return (this.isLoading &&
            <LinearProgress id="getMeProgess" color="primary" mode="query" />
        );
    }

    renderSearchError() {
        const { classes } = this.props;
        const { error } = this.props.accommodation.search;
        return (error && typeof error === "string" && error.length > 0 &&
            <Grid container alignItems="center" justify="center" className={classes.errorContainer}>
                <Typography className={classes.noAccosText} variant="subheading" color="primary" component="p">{error}</Typography>
            </Grid>
        );
    }

    renderNoAccommodations() {
        const { classes } = this.props;
        const msg = this.isLoading ?
            "Loading..."
            : "Could find any place";
        return (
            <Grid container alignItems="center" justify="center" className={classes.noAccosContainer}>
                <Typography className={classes.noAccosText} variant="headline" color="primary" component="h3">{msg}</Typography>
            </Grid>
        );
    }

    renderListItems() {
        const { classes } = this.props;
        const { firstAccoIndex, accosDisplayed } = this.state;
        const iconContainer = `${classes.iconContainer} display-flex-row full-width space-around margin-auto`;

        return this.props.accoArr
            .slice(firstAccoIndex, (firstAccoIndex + accosDisplayed))
            .map((a) => {
                const imgUrl = a.pictures.length > 0 ? a.pictures[0].url : `${process.env.PUBLIC_URL}/img/accommodation.jpg`;
                return (
                    <Grid item xs={12} sm={6} md={4} key={a.id}>
                        <ScrollAnimation animateIn="fadeIn">
                            <Slide in direction={this.state.slideDirection}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.media}
                                        image={imgUrl}
                                        title={a.title}
                                    />
                                    <CardContent className={classes.content}>
                                        <Typography className={classes.title} gutterBottom variant="headline" component="h2">{a.title}</Typography>
                                        <div className={classes.subtitle}>
                                            <span className="d-block">{a.country}</span>
                                            <span className="d-block">{a.city}</span>
                                        </div>
                                        <Typography className={classes.description} component="p">{a.description}</Typography>
                                        <div className={iconContainer}>
                                            <div className="display-flex-row">
                                                <GroupIcon />
                                                <span>{a.nbMaxGuest}</span>
                                            </div>
                                            <div className="card-icon-wrapper">
                                                <LocalHotelIcon />
                                                <span>{a.nbBedroom}</span>
                                            </div>
                                            <div className="card-icon-wrapper">
                                                <HotTubIcon />
                                                <span>{a.nbBathroom}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Slide>
                        </ScrollAnimation>
                    </Grid>);
            });
    }

    renderPagination() {
        const { classes } = this.props;
        return (
            <Grid className={classes.paginationContainer} container alignItems="center" justify="space-between" spacing={24}>
                <Grid item>
                    <Button onClick={this.handlePrevious} size="large" color="primary">
                        <PreviousIcon /> <span className={classes.buttonText}>Previous</span>
                    </Button>
                </Grid>
                <Grid item>
                    <Button onClick={this.handleNext} size="large" color="primary">
                        <span className={classes.buttonText}>Next</span> <NextIcon />
                    </Button>
                </Grid>
            </Grid>
        );
    }

    render() {
        const { accosDisplayed } = this.state;
        const { classes } = this.props;
        const accommodations = this.props.accoArr;
        return (
            <Grid container className="accommodation-card-container">
                <Paper className={classes.rootRaper} >
                    {this.renderSpinner()}
                    {this.renderSearchError()}
                    {accommodations && accommodations.length > 0 &&
                    <Grid container alignItems="center" justify="center" spacing={16}>
                        {this.renderListItems()}
                    </Grid>}
                    {accommodations && accommodations.length > accosDisplayed &&
                    <Grid container alignItems="center" justify="center" spacing={16}>
                        {this.renderPagination()}
                    </Grid>}
                    {(!accommodations || accommodations.length === 0) &&
                    <Grid container item xs={12}>
                        {this.renderNoAccommodations()}
                    </Grid>}
                </Paper>
            </Grid>
        );
    }
}

export default withStyles(styles)(AccommodationCard);
