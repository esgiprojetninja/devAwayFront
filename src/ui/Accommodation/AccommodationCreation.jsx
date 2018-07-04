import React from "react";
import * as T from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Save from "@material-ui/icons/Save";

import Navbar from "../../containers/Navbar";
import AccommodationDetailMap from "../../containers/AccommodationDetailMap";
import { lightGrey } from "../../styles/theme";

const PROP_RULES = {
    title: { min: 6, max: 24 },
    description: { min: 6, max: 255 },
    address: { min: 5, max: 255 },
    propertySize: { min: 10, max: 10000, isNumber: true }
};

const styles = theme => ({
    title: {
        fontSize: "xx-large",
    },
    mapLabel: {
        marginTop: theme.spacing.unit * 4,
        color: lightGrey,
        fontSize: "larger",
    },
    labelControl: {
        fontSize: "larger",
        color: lightGrey,
    },
    container: {
        width: "100%",
        height: "calc(100vh - 70px - 60px)",
        maxWidth: 720,
        margin: "auto",
        marginTop: theme.spacing.unit,
    },
    mapContainer: {
        width: "100%",
        height: 300,
        maxWidth: 1380,
        margin: "auto",
        marginTop: theme.spacing.unit * 4,
    },
    paper: {
        margin: "auto",
        marginTop: theme.spacing.unit * 2,
        width: "95%",
        height: "auto",
        minHeight: "100%",
        padding: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 10,
    },
    saveBtn: {
        position: "fixed",
        right: theme.spacing.unit * 2,
        bottom: theme.spacing.unit * 4,
    },
    item: {
        marginTop: theme.spacing.unit * 2,
    },
    numberFormControl: {
        width: "100%",
        maxWidth: 250,
    },
});

class AccommocationCreation extends React.PureComponent {
    state = {
        title: "",
        titleError: "",
        description: "",
        descriptionError: "",
        propertySize: 10,
        propertySizeError: "",
        latitude: null,
        longitude: null,
        address: null,
        country: null,
        region: null,
        city: null,
    }

    get accommodation() {
        const {
            title,
            description,
            propertySize,
            address,
            latitude,
            longitude,
            country,
            region,
            city } = this.state;
        return {
            title,
            description,
            propertySize,
            address,
            latitude,
            longitude,
            country,
            region,
            city,
            host: this.props.user.data,
        };
    }

    get accoSavable() {
        if (this.state.titleError) {
            return false;
        }
        if (this.state.descriptionError) {
            return false;
        }
        if (this.state.propertySizeError) {
            return false;
        }
        if (this.state.latitude === null) {
            return false;
        }
        if (this.state.longitude === null) {
            return false;
        }
        if (this.state.address === null) {
            return false;
        }
        return true;
    }

    handleSave = async () => {
        await this.props.saveAccommodation(this.accommodation);
        // @TODO redirect to acco detail on success !!
    }

    handleChange(property, ev) {
        const { value } = ev.target;
        if (PROP_RULES[property]) {
            const { min, max, isNumber } = PROP_RULES[property];
            const testedValue = isNumber ? value : value.length;
            if (testedValue < min || testedValue > max) {
                this.setState({ [`${property}Error`]: `Must be between ${min} and ${max} characters long` });
            } else if (isNumber && Number.isNaN(Number(value))) {
                this.setState({ [`${property}Error`]: "Must be a number" });
            } else {
                this.setState({ [`${property}Error`]: "" });
            }
            this.setState({
                [property]: isNumber ? Number(value) : value
            });
        }
    }

    renderSaveButton() {
        if (this.props.accommodation.isLoading) {
            return null;
        }
        return (
            <Button
                className={this.props.classes.saveBtn}
                color="primary"
                disabled={!this.accoSavable}
                onClick={this.handleSave}
                variant="fab"
                id="devaway-create-acco-btn"
            >
                <Save />
            </Button>
        );
    }

    renderTextProperty(propName, multi = false, rows = 1) {
        const capitalized = propName.charAt(0).toUpperCase() + propName.slice(1);
        const id = `${capitalized}-${Math.floor(Math.random() * 2000)}`;
        return (
            <FormControl fullWidth >
                <InputLabel className={this.props.classes.labelControl} htmlFor={id}>{this.state[`${propName}Error`].length ? this.state[`${propName}Error`] : `${capitalized} (*)`}</InputLabel>
                <Input
                    error={!!this.state[`${propName}Error`].length}
                    id={id}
                    required
                    fullWidth
                    type="text"
                    name={propName}
                    value={this.state[propName]}
                    multiline={multi}
                    rows={rows}
                    onChange={(ev) => {
                        this.handleChange(propName, ev);
                    }}
                />
            </FormControl>
        );
    }

    renderNumberProperty(propName, defaultLegend) {
        const capitalized = propName.charAt(0).toUpperCase() + propName.slice(1);
        const id = `${capitalized}-${Math.floor(Math.random() * 2000)}`;
        return (
            <FormControl className={this.props.classes.numberFormControl}>
                <InputLabel className={this.props.classes.labelControl} htmlFor={id}>{this.state[`${propName}Error`].length ? this.state[`${propName}Error`] : `${defaultLegend} (*)`}</InputLabel>
                <Input
                    error={!!this.state[`${propName}Error`].length}
                    required
                    fullWidth
                    type="number"
                    name={propName}
                    value={this.state[propName]}
                    max={PROP_RULES[propName].max}
                    min={PROP_RULES[propName].min}
                    onChange={(ev) => {
                        this.handleChange(propName, ev);
                    }}
                />
            </FormControl>
        );
    }

    renderForm() {
        return (
            <Grid container spacing={24}>
                <Grid item className={this.props.classes.item} xs={12}>
                    {this.renderTextProperty("title", true, 2)}
                </Grid>
                <Grid item className={this.props.classes.item} xs={12}>
                    {this.renderTextProperty("description", true, 4)}
                </Grid>
                <Grid item className={this.props.classes.item} xs={12}>
                    {this.renderNumberProperty("propertySize", "Property size (m²)", true)}
                </Grid>
            </Grid>
        );
    }

    renderContent() {
        if (!this.props.user.isLoggedIn) {
            return null;
        }
        return (
            <Grid container spacing={24} className={this.props.classes.container}>
                <Paper className={this.props.classes.paper} elevation={1}>
                    <Grid item className={this.props.classes.item} xs={12}>
                        <Typography className={this.props.classes.title} type="title" color="inherit" component="h2">
                            Describe your place
                        </Typography>
                    </Grid>
                    <Grid item className={this.props.classes.item} xs={12}>
                        {this.renderForm()}
                    </Grid>
                    <Grid className={this.props.classes.mapContainer} item xs={12}>
                        <Grid item xs={12}>
                            <Typography className={this.props.classes.mapLabel} variant="subheading" color="inherit" component="p">
                                Address (*)
                            </Typography>
                        </Grid>
                        <AccommodationDetailMap
                            acco={this.accommodation}
                            isUserOwner
                            zoom={8}
                            updateAddress={(addressObj) => {
                                this.setState(addressObj);
                            }}
                        />
                    </Grid>
                </Paper>
                {this.renderSaveButton()}
            </Grid>
        );
    }

    renderSpinner() {
        if (this.props.accommodation.isLoading) {
            return (
                <div className="display-flex-row full-screen position-fixed modal-bg align-absolute-top">
                    <CircularProgress color="primary" />
                </div>
            );
        }
        return null;
    }

    render() {
        return (
            <div>
                <Navbar burgerColor="#acacac" />
                {this.renderContent()}
                {this.renderSpinner()}
            </div>
        );
    }
}
AccommocationCreation.propTypes = {
    user: T.shape({
        isLoggedIn: T.bool.isRequired,
        data: T.shape({
            id: T.number
        }),
    }).isRequired,
    accommodation: T.shape({
        isLoading: T.bool.isRequired
    }).isRequired,
    classes: T.shape({
        title: T.string.isRequired,
        container: T.string.isRequired,
        paper: T.string.isRequired,
        item: T.string.isRequired,
        mapContainer: T.string.isRequired,
        saveBtn: T.string.isRequired,
        numberFormControl: T.string.isRequired,
        mapLabel: T.string.isRequired,
        labelControl: T.string.isRequired,
    }).isRequired,
    saveAccommodation: T.func.isRequired
};

export default withStyles(styles)(AccommocationCreation);
