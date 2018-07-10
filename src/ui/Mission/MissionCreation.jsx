import React from "react";
import { withRouter, NavLink } from "react-router-dom";
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
import Avatar from "@material-ui/core/Avatar";
import TodoIcon from "react-icons/lib/fa/question";
import moment from "moment";

import Navbar from "../../containers/Navbar";
import { getAccoImg } from "../../utils/accommodation";
import { SAVE_MISSION_SUCCESS } from "../../actions/types/mission";

const DATE_FORMAT = "YYYY-MM-DD";
const HOUR_FORMAT = "HH:mm";

const styles = theme => ({
    container: {
        width: "100%",
        height: "calc(100vh - 70px - 120px)",
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
        height: "100%",
    },
    dateFormControl: {
        width: "100%",
    },
    saveBtn: {
        position: "fixed",
        right: theme.spacing.unit * 2,
        bottom: theme.spacing.unit * 4,
    },
    placeAvatar: {
        margin: theme.spacing.unit * 2,
    },
    errorLabel: {
        color: "red",
    },
});

class MissionCreation extends React.PureComponent {
    state = {
        title: "",
        titleError: "",
        description: "",
        descriptionError: "",
        checkinDate: this.props.formRules.checkinDate.min.format(DATE_FORMAT),
        checkinDateHour: this.props.formRules.checkinDate.min.format(HOUR_FORMAT),
        checkinDateError: "",
        stayTime: this.props.formRules.stayTime.min,
        stayTimeError: "",
        stayTimeUnit: this.props.formRules.stayTimeUnit.values[2].value,
        stayTimeUnitError: "",
        accommodation_id: "",
        accommodation_idError: "",
    }

    componentDidMount() {
        this.autoAssignAcco();
    }

    componentWillReceiveProps(props) {
        this.autoAssignAcco(props);
    }

    get mission() {
        const { title, description, checkinDate, checkinDateHour, accommodation_id } = this.state; // eslint-disable-line
        const momentStartDate = moment(`${checkinDate}_${checkinDateHour}`, `${DATE_FORMAT}_${HOUR_FORMAT}`);
        return {
            title,
            description,
            accommodation_id,
            checkinDate: momentStartDate.local().toISOString(),
            checkoutDate: momentStartDate
                .add(Number(this.state.stayTime), this.state.stayTimeUnit)
                .local().toISOString(),
        };
    }

    get missionValid() {
        if (this.state.titleError || !this.state.title) {
            return false;
        }
        if (this.state.descriptionError || !this.state.description) {
            return false;
        }
        if (this.state.checkinDateError || !this.state.checkinDate) {
            return false;
        }
        if (this.state.stayTimeError || !this.state.stayTime) {
            return false;
        }
        if (this.state.stayTimeUnitError || !this.state.stayTimeUnit) {
            return false;
        }
        if (this.state.accommodation_idError || !this.state.accommodation_id) {
            return false;
        }
        return true;
    }

    get isLoading() {
        return this.props.accommodation.isLoading
            || this.props.user.isLoading
            || this.props.mission.current.isLoading;
    }

    getInputLabelClass(propName) {
        if (this.state[`${propName}Error`].length > 0) {
            return this.props.classes.errorLabel;
        }
        return null;
    }

    autoAssignAcco(props = this.props) {
        if (!this.state.accommodation_id && props.formRules.accommodation_id.values.length > 0) {
            this.setState({ accommodation_id: props.formRules.accommodation_id.values[0].value });
        }
    }

    handleSave = async () => {
        if (this.isLoading || !this.missionValid) {
            return;
        }
        const res = await this.props.saveMission(this.mission);
        if (res.type && res.type === SAVE_MISSION_SUCCESS) {
            if (res.payload && res.payload.mission && res.payload.mission.id) {
                this.props.history.replace(`/missions/${res.payload.mission.id}`);
            }
        } else {
            this.props.history.replace("/places");
        }
    }

    handleChange(property, ev) {
        const { value } = ev.target;
        if (this.props.formRules[property]) {
            const { min, max, isNumber, isSelect } = this.props.formRules[property]; // eslint-disable-line
            const testedValue = isNumber || isSelect ? value : value.length;
            if (testedValue < min || testedValue > max) {
                this.setState({ [`${property}Error`]: `Must be between ${min} and ${max} characters long` });
            } else if (isNumber && Number.isNaN(Number(value))) {
                this.setState({ [`${property}Error`]: "Must be a number" });
            } else if (isSelect
                && !this.props.formRules[property].values
                    .map(obj => obj.value)
                    .includes(testedValue)
            ) {
                this.setState({ [`${property}Error`]: "Unknown value" });
            } else {
                this.setState({ [`${property}Error`]: "" });
            }
            this.setState({
                [property]: isNumber ? Number(value) : value
            });
            if (this.missionValid) {
                this.props.changeCurrent(this.mission);
            }
        }
    }

    renderTextProperty(propName, multi = false, rows = 1, defaultLegend) {
        const capitalized = propName.charAt(0).toUpperCase() + propName.slice(1);
        const id = `${capitalized}-${Math.floor(Math.random() * 2000)}`;
        return (
            <TextField
                error={this.state[`${propName}Error`].length > 0}
                InputLabelProps={{
                    shrink: true,
                }}
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
                error={this.state[`${propName}Error`].length > 0}
                InputLabelProps={{
                    shrink: true,
                }}
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

    renderSelectProperty(propName, stringChoices, defaultLegend) {
        const capitalized = propName.charAt(0).toUpperCase() + propName.slice(1);
        const id = `${capitalized}-${Math.floor(Math.random() * 2000)}`;
        return (
            <FormControl className={this.props.classes.numberFormControl}>
                <InputLabel className={this.getInputLabelClass(propName)} htmlFor="select-multiple-stay-unit">{this.state[`${propName}Error`].length > 0 ? this.state[`${propName}Error`] : `${defaultLegend || capitalized} (*)`}</InputLabel>
                <Select
                    id={id}
                    value={this.state[propName]}
                    onChange={(e) => {
                        this.handleChange(propName, e);
                    }}
                    inputProps={{
                        name: propName,
                        id: `select-multiple-stay-unit-${propName}]`,
                    }}
                >
                    {stringChoices.map(prop => (
                        <MenuItem
                            key={prop.label}
                            value={prop.value}
                            style={{
                                fontWeight: this.state[propName] === prop.value ? 600 : 400,
                            }}
                        >
                            {prop.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }

    renderPlaceAvatar() {
        const id = this.state.accommodation_id;
        if (!id || !this.props.user.accommodations[id]) {
            return (
                <TodoIcon size={30} className={this.props.classes.placeAvatar} />
            );
        }
        const imgUrl = getAccoImg(this.props.user.accommodations[id]);
        return (
            <Avatar
                className={this.props.classes.placeAvatar}
                alt="place"
                src={imgUrl.includes("data:image/") || imgUrl.length < 50 ?
                    imgUrl : `data:image/jpeg;base64,${imgUrl}`
                }
            />
        );
    }

    renderCheckinDate() {
        return (
            <Grid container spacing={24}>
                <Grid item xs={6}>
                    <TextField
                        error={this.state.checkinDateError.length > 0}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        className={this.props.classes.dateFormControl}
                        value={this.state.checkinDate}
                        label={this.state.checkinDateError.length > 0 ? this.state.checkinDateError : "Mission start date"}
                        name="checkinDate"
                        min={this.props.formRules.checkinDate.min.format(DATE_FORMAT)}
                        onChange={(ev) => {
                            const { value } = ev.target;
                            const formatted = moment(value, DATE_FORMAT).local();
                            const minDate = this.props.formRules.checkinDate.min;
                            this.setState({ checkinDate: value, checkinDateError: "" });
                            if (value !== minDate.format(DATE_FORMAT)
                                && minDate.unix() > formatted.unix()) {
                                return this.setState({ checkinDateError: "Mission has to be starting at least an hour from now" });
                            } else if (this.missionValid) {
                                return this.props.changeCurrent(this.mission);
                            }
                            return null;
                        }}
                        margin="normal"
                        type="date"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        className={this.props.classes.numberFormControl}
                        value={this.state.checkinDateHour}
                        label={this.state.checkinDateError.length > 0 ? "  " : "time (*)"}
                        name="checkinDateHour"
                        onChange={(ev) => {
                            const { value } = ev.target;
                            this.setState({ checkinDateHour: value });
                            if (this.missionValid) {
                                this.props.changeCurrent(this.mission);
                            }
                        }}
                        margin="normal"
                        type="time"
                    />
                </Grid>
            </Grid>
        );
    }

    renderForm() {
        return (
            <Grid container spacing={24}>
                <Grid container item className={this.props.classes.item} xs={12}>
                    <Grid item xs={10}>{this.renderSelectProperty("accommodation_id", this.props.formRules.accommodation_id.values, "Mission location")}</Grid>
                    <Grid item>{this.renderPlaceAvatar()}</Grid>
                </Grid>
                <Grid item className={this.props.classes.item} xs={12}>
                    {this.renderCheckinDate()}
                </Grid>
                <Grid item className={this.props.classes.item} xs={12}>
                    {this.renderTextProperty("title", false)}
                </Grid>
                <Grid item className={this.props.classes.item} xs={12}>
                    {this.renderTextProperty("description", true, 4)}
                </Grid>
                <Grid item className={this.props.classes.item} xs={12}>
                    {this.renderNumberProperty("stayTime", "Minimum stay")}
                    {this.renderSelectProperty("stayTimeUnit", this.props.formRules.stayTimeUnit.values, "Unit")}
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
                disabled={!this.missionValid || this.isLoading}
                onClick={this.handleSave}
                variant="fab"
                id="devaway-create-acco-btn"
            >
                <Save />
            </Button>
        );
    }

    renderNoUser() {
        return (
            <Grid container spacing={24} className={this.props.classes.container}>
                <Paper className={this.props.classes.paper} elevation={1}>
                    <div className="full-width display-flex-row">
                        <Typography className={this.props.classes.title} type="title" color="inherit" component="h2">
                            You need to log in before using our services
                        </Typography>
                    </div>
                    <div style={{ marginTop: 40 }} className="full-width display-flex-row">
                        <NavLink
                            to="/places"
                        >
                            <Button color="primary" variant="contained">
                                Check out the places we have !
                            </Button>
                        </NavLink>
                    </div>
                </Paper>
            </Grid>
        );
    }

    renderNoUserAcco() {
        return (
            <Grid container spacing={24} className={this.props.classes.container}>
                <Paper className={this.props.classes.paper} elevation={1}>
                    <div className="full-width display-flex-row">
                        <Typography className={this.props.classes.title} type="title" color="inherit" component="h2">
                            You have no place to link this mission to
                        </Typography>
                    </div>
                    <div style={{ marginTop: 40 }} className="full-width display-flex-row">
                        <NavLink
                            to="/place/creation"
                        >
                            <Button color="primary" variant="contained">
                                Create your first place
                            </Button>
                        </NavLink>
                    </div>
                </Paper>
            </Grid>
        );
    }

    renderContent() {
        if (!this.props.user.isLoggedIn) {
            return this.renderNoUser();
        }
        if (!Object.keys(this.props.user.accommodations).length) {
            return this.renderNoUserAcco();
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
        if (this.isLoading) {
            return (
                <div style={{ marginTop: 20 }} className="display-flex-row full-width">
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
                {this.renderSpinner()}
                {this.renderContent()}
            </div>
        );
    }
}
MissionCreation.propTypes = {
    user: T.shape({
        isLoggedIn: T.bool.isRequired,
        isLoading: T.bool.isRequired,
        isGettingData: T.bool.isRequired,
        accommodations: T.shape({}).isRequired,
        accommodationsArr: T.arrayOf(T.shape({
            label: T.string.isRequired,
            id: T.number.isRequired,
        })).isRequired,
        data: T.shape({
            id: T.number
        }),
    }).isRequired,
    mission: T.shape({
        current: T.shape({
            isLoading: T.bool.isRequired,
        }).isRequired,
    }).isRequired,
    accommodation: T.shape({
        isLoading: T.bool.isRequired
    }).isRequired,
    history: T.shape({
        replace: T.func.isRequired,
    }).isRequired,
    classes: T.shape({
        container: T.string.isRequired,
        paper: T.string.isRequired,
        title: T.string.isRequired,
        labelControl: T.string.isRequired,
        item: T.string.isRequired,
        numberFormControl: T.string.isRequired,
        dateFormControl: T.string.isRequired,
        saveBtn: T.string.isRequired,
        placeAvatar: T.string.isRequired,
        errorLabel: T.string.isRequired,
    }).isRequired,
    formRules: T.shape({
        title: T.shape({
            min: T.number.isRequired,
            max: T.number.isRequired,
        }).isRequired,
        description: T.shape({
            min: T.number.isRequired,
            max: T.number.isRequired,
        }).isRequired,
        checkinDate: T.shape({
            min: T.shape({ format: T.func.isRequired }).isRequired,
            isDate: T.bool.isRequired,
        }).isRequired,
        stayTime: T.shape({
            min: T.number.isRequired,
            max: T.number.isRequired,
        }).isRequired,
        stayTimeUnit: T.shape({
            values: T.arrayOf(T.shape({
                label: T.string.isRequired,
                value: T.number.isRequired,
            })).isRequired,
            isSelect: T.bool.isRequired,
        }).isRequired,
        accommodation_id: T.shape({
            values: T.arrayOf(T.shape({
                label: T.string.isRequired,
                value: T.number.isRequired,
            })).isRequired,
            isSelect: T.bool.isRequired,
        }).isRequired,
    }).isRequired,
    saveMission: T.func.isRequired,
    changeCurrent: T.func.isRequired,
};

export default withStyles(styles)(withRouter(MissionCreation));
