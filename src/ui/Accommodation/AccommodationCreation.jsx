import React from "react";
import * as T from "prop-types";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import Dialog, { DialogContent } from "material-ui/Dialog";
import Switch from "material-ui/Switch";
import Divider from "material-ui/Divider";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import CloseIcon from "material-ui-icons/Close";
import Slide from "material-ui/transitions/Slide";
import { MenuItem } from "material-ui/Menu";
import { FormControlLabel, FormGroup, FormControl } from "material-ui/Form";


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
            isLoggedIn: T.bool.isRequired
        }).isRequired,
        classes: T.shape({
            appBar: T.string.isRequired,
            flex: T.string.isRequired
        }).isRequired,
        saveAccommodation: T.func.isRequired
    };

    constructor(props) {
        super(props);

        this.handleTitleChange = this.handleChange.bind(this, "title");
        this.handleDescripionChange = this.handleChange.bind(this, "description");
        this.handleCityChange = this.handleChange.bind(this, "city");
        this.handleRegionChange = this.handleChange.bind(this, "region");
        this.handleCountryChange = this.handleChange.bind(this, "country");
        this.handleAddressChange = this.handleChange.bind(this, "address");
        this.handleNbBedroomChange = this.handleChange.bind(this, "nbBedroom");
        this.handleNbBathroomChange = this.handleChange.bind(this, "nbBathroom");
        this.handleNbToiletChange = this.handleChange.bind(this, "nbToilet");
        this.handleNbMaxBabyChange = this.handleChange.bind(this, "nbMaxBaby");
        this.handleNbMaxChildChange = this.handleChange.bind(this, "nbMaxChild");
        this.handleNbMaxGuestChange = this.handleChange.bind(this, "nbMaxGuest");
        this.handleNbMaxAdultChange = this.handleChange.bind(this, "nbMaxAdult");
        this.handlePropertySizeChange = this.handleChange.bind(this, "propertySize");
    }

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
        this.props.saveAccommodation(this.state);
        // this.handleClose();
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    handleToggleBtn = name => (event, checked) => {
        this.setState({ [name]: checked });
    };

    handleChange(property, ev) {
        let { value } = ev.target;
        value = value.trim();
        this.setState({
            [property]: value
        });
        switch (property) {
        case "title": {
            if (value.length < 6 || value.length > 24) {
                this.setState({ titleError: "Must be between 6 and 24 characters long" });
            } else {
                this.setState({ titleError: "" });
            }
            break;
        }
        case "description": {
            if (value.length < 6 || value.length > 255) {
                this.setState({ descriptionError: "Must be between 6 and 255 characters long" });
            } else {
                this.setState({ descriptionError: "" });
            }
            break;
        }
        case "city": {
            if (value.length < 4 || value.length > 59) {
                this.setState({ cityError: "Must be between 4 and 59 characters long" });
            } else {
                this.setState({ cityError: "" });
            }
            break;
        }
        case "region": {
            if (value.length < 4 || value.length > 59) {
                this.setState({ regionError: "Must be between 4 and 59 characters long" });
            } else {
                this.setState({ regionError: "" });
            }
            break;
        }
        case "country": {
            if (value.length < 4 || value.length > 59) {
                this.setState({ countryError: "Must be between 4 and 59 characters long" });
            } else {
                this.setState({ countryError: "" });
            }
            break;
        }
        case "address": {
            if (value.length < 10 || value.length > 255) {
                this.setState({ addressError: "Must be between 10 and 255 characters long" });
            } else {
                this.setState({ addressError: "" });
            }
            break;
        }
        case "nbBedroom": {
            if (value < 0 || value > 25) {
                this.setState({ nbBedroomError: "Must be between 0 and 25" });
            } else {
                this.setState({ nbBedroomError: "" });
            }
            break;
        }
        case "nbBathroom": {
            if (value < 0 || value > 10) {
                this.setState({ nbBathroomError: "Must be between 0 and 10" });
            } else {
                this.setState({ nbBathroomError: "" });
            }
            break;
        }
        case "nbToilet": {
            if (value < 0 || value > 10) {
                this.setState({ nbBathroomError: "Must be between 0 and 10" });
            } else {
                this.setState({ nbBathroomError: "" });
            }
            break;
        }
        case "nbMaxBaby": {
            if (value < 0 || value > 10) {
                this.setState({ nbMaxBabyError: "Must be between 0 and 10" });
            } else {
                this.setState({ nbMaxBabyError: "" });
            }
            break;
        }
        case "nbMaxChild": {
            if (value < 0 || value > 10) {
                this.setState({ nbMaxChildError: "Must be between 0 and 10" });
            } else {
                this.setState({ nbMaxChildError: "" });
            }
            break;
        }
        case "nbMaxGuest": {
            if (value < 0 || value > 10) {
                this.setState({ nbMaxGuestError: "Must be between 0 and 10" });
            } else {
                this.setState({ nbMaxGuestError: "" });
            }
            break;
        }
        case "nbMaxAdult": {
            if (value < 0 || value > 10) {
                this.setState({ nbMaxAdultError: "Must be between 0 and 10" });
            } else {
                this.setState({ nbMaxAdultError: "" });
            }
            break;
        }
        case "propertySize": {
            if (value < 10 || value > 10000) {
                this.setState({ propertySizeError: "Must be between 10 and 10000 m²" });
            } else {
                this.setState({ propertySizeError: "" });
            }
            break;
        }
        default: break;
        }
    }

    renderAppBar() {
        const { classes } = this.props;
        return (
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                        <CloseIcon />
                    </IconButton>
                    <Typography type="title" color="inherit" className={classes.flex}>
                        Accommodation creation
                    </Typography>
                    <Button color="inherit" onClick={this.handleSave}>
                        save
                    </Button>
                </Toolbar>
            </AppBar>
        );
    }

    renderPropertySize() {
        return (
            <FormControl fullWidth >
                <TextField
                    error={!!this.state.propertySizeError.length}
                    required
                    fullWidth
                    label={this.state.propertySizeError.length ? this.state.propertySizeError : "Property size"}
                    type="number"
                    name="propertySize"
                    value={this.state.propertySize}
                    margin="normal"
                    max="10000"
                    min="10"
                    onChange={this.handlePropertySizeChange}
                />
            </FormControl>
        );
    }

    renderNbMaxAdult() {
        return (
            <FormControl fullWidth >
                <TextField
                    error={!!this.state.nbMaxAdultError.length}
                    required
                    fullWidth
                    label={this.state.nbMaxAdultError.length ? this.state.nbMaxAdultError : "Maximum adults"}
                    type="number"
                    name="nbMaxAdult"
                    value={this.state.nbMaxAdult}
                    margin="normal"
                    max="10"
                    min="0"
                    onChange={this.handleNbMaxAdultChange}
                />
            </FormControl>
        );
    }

    renderNbMaxGuests() {
        return (
            <FormControl fullWidth >
                <TextField
                    error={!!this.state.nbMaxGuestError.length}
                    required
                    fullWidth
                    label={this.state.nbMaxGuestError.length ? this.state.nbMaxGuestError : "Maximum guests"}
                    type="number"
                    name="nbMaxGuest"
                    value={this.state.nbMaxGuest}
                    margin="normal"
                    max="10"
                    min="0"
                    onChange={this.handleNbMaxGuestChange}
                />
            </FormControl>
        );
    }

    renderNbMaxChild() {
        return (
            <FormControl fullWidth >
                <TextField
                    error={!!this.state.nbMaxChildError.length}
                    required
                    fullWidth
                    label={this.state.nbMaxChildError.length ? this.state.nbMaxChildError : "Maximum children"}
                    type="number"
                    name="nbMaxChild"
                    value={this.state.nbMaxChild}
                    margin="normal"
                    max="10"
                    min="0"
                    onChange={this.handleNbMaxChildChange}
                />
            </FormControl>
        );
    }

    renderNbMaxBaby() {
        return (
            <FormControl fullWidth >
                <TextField
                    error={!!this.state.nbMaxBabyError.length}
                    required
                    fullWidth
                    label={this.state.nbMaxBabyError.length ? this.state.nbMaxBabyError : "Maximum babies allowed"}
                    type="number"
                    name="nbMaxBaby"
                    value={this.state.nbMaxBaby}
                    margin="normal"
                    max="10"
                    min="0"
                    onChange={this.handleNbMaxBabyChange}
                />
            </FormControl>
        );
    }

    renderNbToilet() {
        return (
            <FormControl fullWidth >
                <TextField
                    error={!!this.state.nbToiletError.length}
                    required
                    fullWidth
                    label={this.state.nbToiletError.length ? this.state.nbToiletError : "Toilets"}
                    type="number"
                    name="nbToilet"
                    value={this.state.nbToilet}
                    margin="normal"
                    max="10"
                    min="0"
                    onChange={this.handleNbToiletChange}
                />
            </FormControl>
        );
    }

    renderNbBathroom() {
        return (
            <FormControl fullWidth >
                <TextField
                    error={!!this.state.nbBathroomError.length}
                    required
                    fullWidth
                    label={this.state.nbBathroomError.length ? this.state.nbBathroomError : "Bathrooms"}
                    type="number"
                    name="nbBathroom"
                    value={this.state.nbBathroom}
                    margin="normal"
                    max="10"
                    min="0"
                    onChange={this.handleNbBathroomChange}
                />
            </FormControl>
        );
    }

    renderNbBedroom() {
        return (
            <FormControl fullWidth >
                <TextField
                    error={!!this.state.nbBedroomError.length}
                    required
                    fullWidth
                    label={this.state.nbBedroomError.length ? this.state.nbBedroomError : "Bedrooms"}
                    type="number"
                    name="nbBedroom"
                    value={this.state.nbBedroom}
                    margin="normal"
                    max="10"
                    min="0"
                    onChange={this.handleNbBedroomChange}
                />
            </FormControl>
        );
    }

    renderAddress() {
        return (
            <FormControl fullWidth >
                <TextField
                    error={!!this.state.addressError.length}
                    required
                    fullWidth
                    label={this.state.addressError.length ? this.state.addressError : "Address"}
                    type="text"
                    name="address"
                    value={this.state.address}
                    multiline
                    rows="4"
                    margin="normal"
                    onChange={this.handleAddressChange}
                />
            </FormControl>
        );
    }

    renderCountry() {
        return (
            <FormControl fullWidth >
                <TextField
                    error={!!this.state.countryError.length}
                    required
                    fullWidth
                    label={this.state.countryError.length ? this.state.countryError : "Country"}
                    type="text"
                    name="country"
                    value={this.state.country}
                    multiline
                    rows="4"
                    margin="normal"
                    onChange={this.handleCountryChange}
                />
            </FormControl>
        );
    }

    renderRegion() {
        return (
            <FormControl fullWidth >
                <TextField
                    error={!!this.state.regionError.length}
                    required
                    fullWidth
                    label={this.state.regionError.length ? this.state.regionError : "Region"}
                    type="text"
                    name="region"
                    value={this.state.region}
                    multiline
                    rows="4"
                    margin="normal"
                    onChange={this.handleRegionChange}
                />
            </FormControl>
        );
    }

    renderCity() {
        return (
            <FormControl fullWidth >
                <TextField
                    error={!!this.state.cityError.length}
                    required
                    fullWidth
                    label={this.state.cityError.length ? this.state.cityError : "City"}
                    type="text"
                    name="city"
                    value={this.state.city}
                    multiline
                    rows="4"
                    margin="normal"
                    onChange={this.handleCityChange}
                />
            </FormControl>
        );
    }

    renderDescription() {
        return (
            <FormControl fullWidth >
                <TextField
                    error={!!this.state.descriptionError.length}
                    required
                    fullWidth
                    label={this.state.descriptionError.length ? this.state.descriptionError : "Description"}
                    type="text"
                    name="description"
                    value={this.state.description}
                    multiline
                    rows="4"
                    margin="normal"
                    onChange={this.handleDescripionChange}
                />
            </FormControl>
        );
    }

    renderTitle() {
        return (
            <FormControl fullWidth >
                <TextField
                    error={!!this.state.titleError.length}
                    required
                    fullWidth
                    label={this.state.titleError.length ? this.state.titleError : "Title"}
                    type="text"
                    name="title"
                    value={this.state.title}
                    multiline
                    rows="2"
                    margin="normal"
                    onChange={this.handleTitleChange}
                />
            </FormControl>
        );
    }

    renderForm() {
        return (
            <div>
                {this.renderTitle()}
                <Divider />
                {this.renderDescription()}
                <Divider />
                {this.renderCity()}
                <Divider />
                {this.renderRegion()}
                <Divider />
                {this.renderCountry()}
                <Divider />
                {this.renderAddress()}
                <Divider />
                {this.renderNbBedroom()}
                <Divider />
                {this.renderNbBathroom()}
                <Divider />
                {this.renderNbToilet()}
                <Divider />
                {this.renderNbMaxBaby()}
                <Divider />
                {this.renderNbMaxChild()}
                <Divider />
                {this.renderNbMaxGuests()}
                <Divider />
                {this.renderNbMaxAdult()}
                <Divider />
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
        console.log("fdp", this.state);
        return (
            <div>
                <MenuItem
                    key="/createAccomodation"
                    selected={false}
                    onClick={this.handleClickOpen}
                > Create Accommodation
                </MenuItem>
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    transition={Transition}
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
