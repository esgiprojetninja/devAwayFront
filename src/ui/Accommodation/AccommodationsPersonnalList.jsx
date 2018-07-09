import React from "react";
import * as T from "prop-types";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import EditIcon from "react-icons/lib/fa/edit";

import { midGrey } from "../../styles/theme";
import { getAccoImg } from "../../utils/accommodation";

const styles = theme => ({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 70px - 48px)",
        height: "100%",
        width: "100%",
        maxWidth: "100%",
        backgroundColor: theme.palette.background.paper,
        position: "relative",
    },
    headTitle: {
        display: "block",
        width: "100%",
        fontSize: "xx-large",
        fontWeight: 500,
        color: midGrey,
        marginLeft: 5,
    },
    progressSpinner: {
        position: "absolute",
        top: 10,
        left: "calc(50% - 20px)",
    },
    container: {
        width: "93%",
    },
    accosContainer: {
        width: "calc(100% - 20px)",
        padding: "0 10px",
        height: "100%",
        minHeight: "calc(100vh - 70px - 48px)",
    },
    cardMedia: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
    controlBtn: {
        margin: theme.spacing.unit,
    },
    accoDescription: {
        height: 50,
        wordBreak: "normal",
        wordWrap: "break-word",
    },
    accoActionIcon: {
        marginLeft: theme.spacing.unit,
    },
});

class AccommodationsPersonnalList extends React.PureComponent {
    static propTypes = {
        onInit: T.func.isRequired,
    }

    componentDidMount() {
        this.props.onInit();
    }

    get classes() {
        return this.props.classes;
    }

    get accomodations() {
        return Object.keys(this.props.user.accommodations)
            .map(accoID => this.props.user.accommodations[accoID]);
    }

    renderSpinner() {
        if (this.props.user.isLoading) {
            return (
                <CircularProgress size={40} className={this.classes.progressSpinner} />
            );
        }
        return null;
    }

    renderAccommodations() {
        const accos = this.accomodations;
        if (accos.length > 0) {
            return (
                <div className={this.classes.container}>
                    <Typography className={this.classes.headTitle} gutterBottom variant="headline" component="h1">
                        Your places
                    </Typography>
                    <Grid container className={this.classes.accosContainer} spacing={24}>
                        {accos.map(acco => (
                            <Grid
                                key={`${acco.createdAt}-${Math.floor(Math.random() * 1000)}`}
                                item
                                className={this.classes.acco}
                                xs={12}
                                sm={12}
                                md={6}
                                lg={5}
                                xl={4}
                            >
                                <Card className="full-width">
                                    <CardMedia
                                        className={this.classes.cardMedia}
                                        image={getAccoImg(acco)}
                                        title="Place picture"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="headline" component="h2">
                                            {acco.title}
                                        </Typography>
                                        <Typography className={this.classes.accoDescription} component="p">
                                            {acco.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <NavLink
                                            to={`/places/${acco.id}`}
                                        >
                                            <Button variant="contained" color="default" className={this.classes.controlBtn}>
                                                Administrate
                                                <EditIcon className={this.classes.accoActionIcon} />
                                            </Button>
                                        </NavLink>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            );
        }
        return (
            <NavLink
                to="/place/creation"
            >
                <Button
                    size="large"
                    id="create-first-accommodation"
                    color="primary"
                    className="margin-auto"
                >
                    <AddIcon />
                    Create your very first place
                </Button>
            </NavLink>
        );
    }

    render() {
        return (
            <div className={this.classes.root}>
                {this.renderSpinner()}
                {this.renderAccommodations()}
            </div>
        );
    }
}
AccommodationsPersonnalList.propTypes = {
    classes: T.shape({}).isRequired,
    // eslint-disable-next-line react/no-typos
    user: T.shape({
        isLoading: T.bool.isRequired,
        accommodations: T.shape({}).isRequired,
    }).isRequired,
};

export default withStyles(styles)(AccommodationsPersonnalList);
