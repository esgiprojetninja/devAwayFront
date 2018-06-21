import React from "react";
import * as T from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";

import Navbar from "../../containers/Navbar";

const PROP_RULES = {
    title: { min: 6, max: 24 },
    description: { min: 6, max: 255 },
    city: { min: 4, max: 59 },
    region: { min: 4, max: 59 },
    country: { min: 4, max: 59 },
    address: { min: 10, max: 255 },
    nbBedroom: { min: 0, max: 10, isNumber: true },
    nbBathroom: { min: 0, max: 10, isNumber: true },
    nbToilet: { min: 0, max: 10, isNumber: true },
    nbMaxBaby: { min: 0, max: 10, isNumber: true },
    nbMaxChild: { min: 0, max: 10, isNumber: true },
    nbMaxGuest: { min: 0, max: 10, isNumber: true },
    nbMaxAdult: { min: 0, max: 10, isNumber: true },
    propertySize: { min: 10, max: 10000, isNumber: true }
};

const styles = theme => ({
    flex: {
        flex: 1,
    },
    title: {
        fontSize: "xx-large",
        margin: theme.spacing.unit
    },
});

export class AccommocationCreation extends React.PureComponent {
    static propTypes = {
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
            flex: T.any,
            title: T.any,
        }).isRequired,
        saveAccommodation: T.func.isRequired
    };

    state = {
        title: "",
        titleError: "",
        description: "",
        descriptionError: "",
        city: "",
        cityError: "",
        region: "",
        regionError: "",
        country: "",
        countryError: "",
        address: "",
        addressError: "",
        nbBedroom: 0,
        nbBedroomError: "",
        nbBathroom: 0,
        nbBathroomError: "",
        nbToilet: 0,
        nbToiletError: "",
        nbMaxBaby: 0,
        nbMaxBabyError: "",
        nbMaxChild: 0,
        nbMaxChildError: "",
        nbMaxGuest: 0,
        nbMaxGuestError: "",
        nbMaxAdult: 0,
        nbMaxAdultError: "",
        propertySize: 10,
        propertySizeError: "",
        animalsAllowed: true,
        smokersAllowed: true,
        hasInternet: true,
        floor: 0, // eslint-disable-line
        minStay: 0, // eslint-disable-line
        maxStay: 10, // eslint-disable-line
        checkinHour: new Date().toISOString(), // eslint-disable-line
        checkoutHour: new Date().toISOString(), // eslint-disable-line
        createdAt: new Date().toISOString(), // eslint-disable-line
        updatedAt: new Date().toISOString() // eslint-disable-line
    }

    handleSave = () => {
        this.props.saveAccommodation({
            ...this.state,
            host: `/api/users/${this.props.user.data.id}`,
            pictures: ""
        });
    }

    handleToggleBtn = name => (event, checked) => {
        this.setState({ [name]: checked });
    };

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
            return <CircularProgress color="primary" />;
        }
        return (
            <Button color="inherit" onClick={this.handleSave}>save</Button>
        );
    }

    renderTextProperty(propName, required = true, multi = false, rows = 1) {
        const capitalized = propName.charAt(0).toUpperCase() + propName.slice(1);
        const id = `${capitalized}-${Math.floor(Math.random() * 2000)}`;
        return (
            <FormControl fullWidth >
                <InputLabel htmlFor={id}>{this.state[`${propName}Error`].length ? this.state[`${propName}Error`] : capitalized}</InputLabel>
                <Input
                    error={!!this.state[`${propName}Error`].length}
                    id={id}
                    required={required}
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

    renderNumberProperty(propName, defaultLegend, required = true) {
        const capitalized = propName.charAt(0).toUpperCase() + propName.slice(1);
        const id = `${capitalized}-${Math.floor(Math.random() * 2000)}`;
        return (
            <FormControl fullWidth >
                <InputLabel htmlFor={id}>{this.state[`${propName}Error`].length ? this.state[`${propName}Error`] : defaultLegend}</InputLabel>
                <Input
                    error={!!this.state[`${propName}Error`].length}
                    required={required}
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
            <form action="">
                {this.renderTextProperty("title", true, true, 2)}
                {this.renderTextProperty("description", true, true, 4)}
                {this.renderTextProperty("city", true, true, 4)}
                {this.renderTextProperty("region", true, true, 4)}
                {this.renderTextProperty("country", true, true, 4)}
                {this.renderTextProperty("address", true, true, 4)}
                {this.renderNumberProperty("nbBedroom", "Bedrooms")}
                {this.renderNumberProperty("nbBathroom", "Bathrooms")}
                {this.renderNumberProperty("nbToilet", "Toilets")}
                {this.renderNumberProperty("nbMaxBaby", "Hostable babies")}
                {this.renderNumberProperty("nbMaxChild", "Hostable children")}
                {this.renderNumberProperty("nbMaxGuest", "Hostable guests")}
                {this.renderNumberProperty("nbMaxAdult", "Hostable adults")}
                {this.renderNumberProperty("propertySize", "Property size (m²)", true)}
                <FormGroup>
                    <FormLabel
                        control={
                            <Switch
                                checked={this.state.animalsAllowed}
                                onChange={this.handleToggleBtn("animalsAllowed")}
                            />}
                        label="Animals allowed"
                    />
                    <FormLabel
                        control={
                            <Switch
                                checked={this.state.smokersAllowed}
                                onChange={this.handleToggleBtn("smokersAllowed")}
                            />}
                        label="Smokers allowed"
                    />
                    <FormLabel
                        control={
                            <Switch
                                checked={this.state.hasInternet}
                                onChange={this.handleToggleBtn("hasInternet")}
                            />}
                        label="Internet access"
                    />
                </FormGroup>
            </form>
        );
    }

    render() {
        if (!this.props.user.isLoggedIn) return null;
        return (
            <div>
                <Navbar burgerColor="#acacac" />
                <Typography className={this.props.classes.title} type="title" color="inherit" component="h2">
                    Accommodation creation
                </Typography>
                {this.renderForm()}
                {this.renderSaveButton()}
            </div>
        );
    }
}
export default withStyles(styles)(AccommocationCreation);
