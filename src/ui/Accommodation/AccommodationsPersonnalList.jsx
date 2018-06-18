import React from "react";
import * as T from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

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
    progressSpinner: {
        position: "absolute",
        top: 10,
        left: "calc(50% - 20px)",
    },
    accosContainer: {
        width: "100%",
        height: "100%",
        minHeight: "calc(100vh - 70px - 48px)",
    },
    acco: {
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
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="P">C</Avatar>
                                    }
                                    action={
                                        <IconButton>
                                            <RemoveIcon />
                                        </IconButton>
                                    }
                                    title={acco.title}
                                    subheader={acco.createdAt} // @TODO add moment to handle dates
                                />
                                <CardMedia
                                    image={getAccoImg(acco)}
                                    title="Place picture"
                                />
                                <CardContent>
                                    <Typography component="p">
                                        {acco.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            );
        }
        return (
            <Button
                size="large"
                id="create-first-accommodation"
                color="primary"
                className="margin-auto"
                onClick={() => {
                    console.log("POP THE MENU !");
                }}
            >
                <AddIcon />
                Create your very first place
            </Button>
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
