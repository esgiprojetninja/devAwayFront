import React from "react";
import * as T from "prop-types";
import GroupIcon from "@material-ui/icons/Group";
import LocalHotelIcon from "@material-ui/icons/LocalHotel";
import HotTubIcon from "@material-ui/icons/HotTub";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { accommodationPropTypes } from "../propTypes/accommodationType";

const styles = theme => ({
    card: {
        width: "100%",
        padding: theme.spacing.unit * 1.2,
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
        maxWidth: 250
    },
});

class AccommodationCard extends React.PureComponent {
    static propTypes = {
        accommodations: T.arrayOf(accommodationPropTypes),
        onInit: T.func.isRequired,
        classes: T.shape({}).isRequired,
    }

    static defaultProps = {
        accommodations: []
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        if (!this.props.accommodations.length) {
            this.props.onInit();
        }
    }

    renderListItems() {
        const { classes } = this.props;
        const iconContainer = `${classes.iconContainer} display-flex-row full-width space-around margin-auto`;
        return this.props.accommodations
            .map(allAccommodations => allAccommodations)
            .slice(0, 3)
            .map((a) => {
                const imgUrl = a.pictures.length > 0 ? a.pictures[0].url : `${process.env.PUBLIC_URL}/img/accommodation.jpg`;
                return (
                    <Grid className="margin-auto accommodation-card-container" item xs={12} sm={6} md={4} key={a.id}>
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
                    </Grid>);
            });
    }

    render() {
        return (
            <Grid container className="accommodation-card-container">
                {this.renderListItems()}
            </Grid>
        );
    }
}

export default withStyles(styles)(AccommodationCard);
