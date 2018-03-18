import React from "react";
import * as T from "prop-types";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import Dialog, { DialogContent } from "material-ui/Dialog";
import Switch from "material-ui/Switch";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import { CircularProgress } from "material-ui/Progress";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import CloseIcon from "material-ui-icons/Close";
import Slide from "material-ui/transitions/Slide";
import { MenuItem } from "material-ui/Menu";
import { FormControlLabel, FormGroup, FormControl } from "material-ui/Form";

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

const styles = theme => ({ // eslint-disable-line
    appBar: {
        position: "relative"
    },
    flex: {
        flex: 1
    }
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

export class AccommocationCreation extends React.PureComponent {
    static propTypes = {
        user: T.shape({
            isLoggedIn: T.bool.isRequired,
            isLoading: T.bool.isRequired,
            data: T.shape({
                id: T.number.isRequired
            })
        }).isRequired,
        accommodation: T.shape({
            isLoading: T.bool.isRequired
        }).isRequired,
        classes: T.shape({
            appBar: T.string.isRequired,
            flex: T.string.isRequired
        }).isRequired,
        saveAccommodation: T.func.isRequired
    };

    state = {
        open: false,
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

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleSave = () => {
        this.props.saveAccommodation({
            ...this.state,
            host: `/api/users/${this.props.user.data.id}`,
            pictures: ""
        });
        this.handleClose();
    }

    handleClose = () => {
        this.setState({ open: false });
    };

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

    renderCancelButton() {
        if (this.props.accommodation.isLoading) {
            return <CircularProgress color="accent" />;
        }
        return (
            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
            </IconButton>
        );
    }

    renderSaveButton() {
        if (this.props.accommodation.isLoading) {
            return <CircularProgress color="accent" />;
        }
        return (
            <Button color="inherit" onClick={this.handleSave}>
                save
            </Button>
        );
    }

    renderAppBar() {
        const { classes } = this.props;
        return (
            <AppBar className={classes.appBar}>
                <Toolbar>
                    {this.renderCancelButton()}
                    <Typography type="title" color="inherit" className={classes.flex}>
                        Accommodation creation
                    </Typography>
                    {this.renderSaveButton()}
                </Toolbar>
            </AppBar>
        );
    }

    renderTextProperty(propName, required = true, multi = false, rows = 1) {
        const capitalized = propName.charAt(0).toUpperCase() + propName.slice(1);
        return (
            <FormControl fullWidth >
                <TextField
                    error={!!this.state[`${propName}Error`].length}
                    required={required}
                    fullWidth
                    label={this.state[`${propName}Error`].length ? this.state[`${propName}Error`] : capitalized}
                    type="text"
                    name={propName}
                    value={this.state[propName]}
                    multiline={multi}
                    rows={rows}
                    margin="normal"
                    onChange={(ev) => {
                        this.handleChange(propName, ev);
                    }}
                />
            </FormControl>
        );
    }

    renderNumberProperty(propName, defaultLegend, required = true) {
        return (
            <FormControl fullWidth >
                <TextField
                    error={!!this.state[`${propName}Error`].length}
                    required={required}
                    fullWidth
                    label={this.state[`${propName}Error`].length ? this.state[`${propName}Error`] : defaultLegend}
                    type="number"
                    name={propName}
                    value={this.state[propName]}
                    margin="normal"
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
            <div>
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
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.animalsAllowed}
                                onChange={this.handleToggleBtn("animalsAllowed")}
                            />}
                        label="Animals allowed"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.smokersAllowed}
                                onChange={this.handleToggleBtn("smokersAllowed")}
                            />}
                        label="Smokers allowed"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.hasInternet}
                                onChange={this.handleToggleBtn("hasInternet")}
                            />}
                        label="Internet access"
                    />
                </FormGroup>
            </div>
        );
    }

    render() {
        if (!this.props.user.isLoggedIn) return null;
        return (
            <div>
                <MenuItem
                    key="/createAccomodation"
                    selected={false}
                    onClick={this.handleClickOpen}
                > Create Accommodation
                </MenuItem>
                <Dialog
                    id="acco-creation-dialog"
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    transition={Transition}
                    disableEscapeKeyDown
                    disableBackdropClick
                    onKeyDown={(event) => {
                        if (event.keyCode === 9) {
                            event.stopPropagation();
                        }
                    }}
                >
                    {this.renderAppBar()}
                    <DialogContent>
                        {this.renderForm()}
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}
export default withStyles(styles)(AccommocationCreation);
