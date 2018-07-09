import React from "react";
import { withRouter } from "react-router-dom";
import * as T from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Save from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import moment from "moment";

import Navbar from "../../containers/Navbar";

const PROP_RULES = {
    name: { min: 6, max: 24 },
    description: { min: 6, max: 255 },
    checkinDate: { min: moment().local().add(1, "hours").unix(), isNumber: true },
    stayTime: { min: 1, max: (1000 * 60 * 60 * 24 * 365 * 10) }, // min 10 years
    stayTimeUnit: { values: ["hours", "days", "weeks", "months"], isSelect: true },
};

const styles = theme => ({
    container: {
        width: "100%",
        height: "calc(100vh - 70px - 60px)",
        maxWidth: 720,
        margin: "auto",
        marginTop: theme.spacing.unit,
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
    title: {
        fontSize: "xx-large",
    },
    labelControl: {
        fontSize: "larger",
        color: theme.palette.primary.lightGrey,
    },
    item: {
        marginTop: theme.spacing.unit * 2,
    },
    numberFormControl: {
        width: "100%",
        maxWidth: 150,
    },
    saveBtn: {
        position: "fixed",
        right: theme.spacing.unit * 2,
        bottom: theme.spacing.unit * 4,
    },
    chips: {
        display: "flex",
        flexWrap: "wrap",
    },
    chip: {
        margin: theme.spacing.unit / 4,
    },
});

class MissionCreation extends React.PureComponent {
    constructor(props) {
        super(props);
        const { user } = props;
        if (!user.isLoggedIn && !user.isLoading && !user.isGettingData) {
            // this.props.history.replace("/home");
        }
    }

    state = {
        name: "",
        nameError: "",
        description: "",
        descriptionError: "",
        checkinDate: PROP_RULES.checkinDate.min,
        checkinDateError: "",
        checkoutDate: moment().local().add(7, "days"),
        checkoutDateError: "",
        stayTime: PROP_RULES.stayTime.min,
        stayTimeError: "",
        stayTimeUnit: PROP_RULES.stayTimeUnit.values[1],
        stayTimeUnitError: "",
        accommodation: null,
    }

    get missionValid() {
        if (this.state.nameError || !this.state.name) {
            return false;
        }
        if (this.state.descriptionError || !this.state.description) {
            return false;
        }
        if (this.state.checkinDateError || !this.state.checkinDate) {
            return false;
        }
        if (this.state.checkoutDateError || !this.state.checkoutDate) {
            return false;
        }
        return true;
    }

    get tsStay() {
        const defaultTs = moment().local().add(7, "days").unix() - moment().local().add(1, "hours").unix();
        if (!this.state.checkinDate || this.state.checkinDateError) {
            return defaultTs;
        }
        switch (this.state.stayTimeUnit) {
        case "hours":
            return this.state.checkinDate.add(this.state.stayTime, "hours").unix();
        case "days":
            return this.state.checkinDate.add(this.state.stayTime, "days").unix();
        case "weeks":
            return this.state.checkinDate.add(this.state.stayTime, "weeks").unix();
        case "months":
            return this.state.checkinDate.add(this.state.stayTime, "months").unix();
        default: return defaultTs;
        }
    }

    handleSave = async () => {
        await this.props.saveMission(this.accommodation);
        // @TODO redirect to mission detail on success !! (poping this page from history)
    }

    handleChange(property, ev) {
        const { value } = ev.target;
        if (PROP_RULES[property]) {
            const { min, max, isNumber, isSelect } = PROP_RULES[property];
            const testedValue = isNumber || isSelect ? value : value.length;
            if (testedValue < min || testedValue > max) {
                this.setState({ [`${property}Error`]: `Must be between ${min} and ${max} characters long` });
            } else if (isNumber && Number.isNaN(Number(value))) {
                this.setState({ [`${property}Error`]: "Must be a number" });
            } else if (isSelect && testedValue in PROP_RULES[property].values) {
                this.setState({ [`${property}Error`]: "Unknown value" });
            } else {
                this.setState({ [`${property}Error`]: "" });
            }
            this.setState({
                [property]: isNumber ? Number(value) : value
            });
        }
    }

    renderTextProperty(propName, multi = false, rows = 1, defaultLegend) {
        const capitalized = propName.charAt(0).toUpperCase() + propName.slice(1);
        const id = `${capitalized}-${Math.floor(Math.random() * 2000)}`;
        return (
            <TextField
                id={id}
                value={this.state[propName]}
                fullWidth
                label={this.state[`${propName}Error`].length > 0 ? this.state[`${propName}Error`] : `${defaultLegend || capitalized} (*)`}
                name={propName}
                onChange={(ev) => {
                    this.handleChange(propName, ev);
                }}
                margin="normal"
                multiline={multi}
                rowsMax={rows}
            />
        );
    }

    renderNumberProperty(propName, defaultLegend) {
        const capitalized = propName.charAt(0).toUpperCase() + propName.slice(1);
        const id = `${capitalized}-${Math.floor(Math.random() * 2000)}`;
        return (
            <TextField
                className={this.props.classes.numberFormControl}
                id={id}
                value={this.state[propName]}
                fullWidth
                label={this.state[`${propName}Error`].length > 0 ? this.state[`${propName}Error`] : `${defaultLegend || capitalized} (*)`}
                name={propName}
                onChange={(ev) => {
                    this.handleChange(propName, ev);
                }}
                margin="normal"
                type="number"
            />
        );
    }

    renderSelectProperty(propName, defaultLegend) {
        const capitalized = propName.charAt(0).toUpperCase() + propName.slice(1);
        const id = `${capitalized}-${Math.floor(Math.random() * 2000)}`;
        return (
            <FormControl className={this.props.classes.numberFormControl}>
                <InputLabel htmlFor="select-multiple-stay-unit">{this.state[`${propName}Error`].length > 0 ? this.state[`${propName}Error`] : `${defaultLegend || capitalized} (*)`}</InputLabel>
                <Select
                    id={id}
                    value={this.state[propName]}
                    onChange={this.handleChange}
                    inputProps={{
                        name: propName,
                        id: "select-multiple-stay-unit",
                    }}
                >
                    {PROP_RULES[propName].values.map(prop => (
                        <MenuItem
                            key={prop}
                            value={prop}
                            style={{
                                fontWeight: this.state[propName] === prop ? 400 : 700,
                            }}
                        >
                            {prop}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }

    renderForm() {
        return (
            <Grid container spacing={24}>
                <Grid item className={this.props.classes.item} xs={12}>
                    {this.renderTextProperty("name", false)}
                </Grid>
                <Grid item className={this.props.classes.item} xs={12}>
                    {this.renderTextProperty("description", true, 4)}
                </Grid>
                <Grid item className={this.props.classes.item} xs={12}>
                    {this.renderNumberProperty("stayTime", "Minimum stay")}
                    {this.renderSelectProperty("stayTimeUnit")}
                </Grid>
            </Grid>
        );
    }

    renderSaveButton() {
        if (this.props.accommodation.isLoading) {
            return null;
        }
        return (
            <Button
                className={this.props.classes.saveBtn}
                color="primary"
                disabled={!this.missionValid}
                onClick={this.handleSave}
                variant="fab"
                id="devaway-create-acco-btn"
            >
                <Save />
            </Button>
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
                            Mission&#39;s basic informations
                        </Typography>
                    </Grid>
                    <Grid item className={this.props.classes.item} xs={12}>
                        {this.renderForm()}
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
MissionCreation.propTypes = {
    user: T.shape({
        isLoggedIn: T.bool.isRequired,
        isLoading: T.bool.isRequired,
        isGettingData: T.bool.isRequired,
        data: T.shape({
            id: T.number
        }),
    }).isRequired,
    accommodation: T.shape({
        isLoading: T.bool.isRequired
    }).isRequired,
    // history: T.shape({
    //     replace: T.func.isRequired,
    // }).isRequired,
    classes: T.shape({
        container: T.string.isRequired,
        paper: T.string.isRequired,
        title: T.string.isRequired,
        labelControl: T.string.isRequired,
        item: T.string.isRequired,
        numberFormControl: T.string.isRequired,
        saveBtn: T.string.isRequired,
        chips: T.string.isRequired,
        chip: T.string.isRequired,
    }).isRequired,
    saveMission: T.func.isRequired,
};

export default withStyles(styles)(withRouter(MissionCreation));
