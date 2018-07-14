/* global */
import React from "react";
import * as T from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Save from "@material-ui/icons/Save";
import Cancel from "@material-ui/icons/Cancel";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import TodoIcon from "react-icons/lib/fa/question";
import InactiveIcon from "react-icons/lib/fa/lock";
import ActiveIcon from "react-icons/lib/fa/plus";
import UnbookedIcon from "react-icons/lib/fa/paper-plane";
import Avatar from "@material-ui/core/Avatar";
import UserIcon from "react-icons/lib/fa/user";
import moment from "moment";

import { midGrey, darkGrey } from "../../styles/theme";
import Navbar from "../../containers/Navbar";
import { getAccoImg } from "../../utils/accommodation";
import CarouselImages from "../../containers/AccommodationDetailImages";
import GMap from "../../containers/AccommodationDetailMap";
import missionRules from "../../propTypes/missionRulesType";
import { getStateFromRules, DATE_FORMAT, HOUR_FORMAT } from "../../utils/mission";
import getUserImg from "../../utils/user";

const styles = theme => ({
    container: {
        width: "100%",
        maxWidth: 1200,
        margin: "auto",
        overflow: "hidden",
    },
    mapContainer: {
        height: 300,
        maxWidth: 1200,
        margin: theme.spacing.unit * 4,
    },
    activeContainer: {
        height: 15,
    },
    title: {
        maxWidth: 400,
        margin: theme.spacing.unit * 4,
        textDecoration: "underline",
    },
    description: {
        margin: theme.spacing.unit * 4,
    },
    saveBtn: {
        position: "fixed",
        right: theme.spacing.unit * 2,
        bottom: theme.spacing.unit * 4,
    },
    cancelBtn: {
        position: "fixed",
        right: theme.spacing.unit * 2,
        bottom: theme.spacing.unit * 12,
    },
    accommodationText: {
        margin: theme.spacing.unit * 4,
        fontSize: "large",
        fontStyle: "italic",
    },
    selectFormControl: {
        margin: theme.spacing.unit * 4,
    },
    dateField: {
        margin: theme.spacing.unit * 4,
    },
    avatar: {
        margin: theme.spacing.unit * 4,
        transition: "transform .2s ease-in-out",
        cursor: "pointer",
        "&:hover": {
            transform: "rotateZ(9deg)",
        }
    },
    icon: {
        color: theme.palette.primary.midGrey,
        margin: theme.spacing.unit * 4,
    },
});

class MissionEdition extends React.PureComponent {
    state = {
        ...getStateFromRules(this.props.formRules),
        checkinDate: "",
        checkinDateHour: "",
        checkoutDate: "",
        checkoutDateHour: "",
    };

    componentDidMount() {
        this.props.onInit(this.props.match.params.missionID);
    }

    get isUserOwner() {
        const { mission } = this;
        return this.props.user
            && this.props.user.isLoggedIn
            && mission
            && mission.accommodation
            && mission.accommodation.host
            && mission.accommodation.host.id === this.props.user.data.id;
    }

    get mission() {
        const id = Number(this.props.match.params.missionID);
        if (Number.isNaN(id)) return null;
        const { data } = this.props.mission.current;
        return data && !Number.isNaN(Number(data.id)) ?
            data :
            null;
    }

    get currentAccommodationId() {
        return this.state.accommodation_id ?
            this.state.accommodation_id
            : this.props.mission.current.data.accommodation_id;
    }

    get isLoading() {
        return this.props.user.isLoading
            || this.props.user.isGettingData
            || this.props.mission.current.isLoading;
    }

    get hasMissionChanged() {
        const { title, description, accommodation_id } = this.state; // eslint-disable-line
        const mission = this.props.mission.current.data;
        if (title && title.trim() !== mission.title) {
            return true;
        }
        if (description && description.trim() !== mission.description) {
            return true;
        }
        if (accommodation_id && Number(accommodation_id) !== Number(mission.accommodation_id)) { // eslint-disable-line
            return true;
        }
        const oldMomentCheckinDate = moment(mission.checkinDate, `${DATE_FORMAT} ${HOUR_FORMAT}`);
        const newMomentCheckinDate = this.getSnapshotedDate("in");
        if (newMomentCheckinDate.unix() !== oldMomentCheckinDate.unix()) {
            return true;
        }
        const oldMomentCheckoutDate = moment(mission.checkoutDate, `${DATE_FORMAT} ${HOUR_FORMAT}`);
        const newMomentCheckoutDate = this.getSnapshotedDate("out");
        if (newMomentCheckoutDate.unix() !== oldMomentCheckoutDate.unix()) {
            return true;
        }
        return false;
    }

    get isMissionValid() {
        return !Object.keys(this.state)
            .filter(propName => propName.includes("Error"))
            .find(propName => this.state[propName].length > 0);
    }

    getSnapshotedDate(prop = "in" || "out") {
        const mission = this.props.mission.current.data;
        const oldMomentCheckDate = moment(mission[`check${prop}Date`], `${DATE_FORMAT} ${HOUR_FORMAT}`);

        const curDate = this.state[`check${prop}Date`];
        const curDateHour = this.state[`check${prop}DateHour`];
        if (curDate) {
            const newDate = `${curDate} ${curDateHour || oldMomentCheckDate.format(HOUR_FORMAT)}`;
            return moment(newDate);
        }
        return oldMomentCheckDate;
    }

    handleSave = () => {
        if (this.isLoading || !this.isMissionValid || !this.hasMissionChanged) {
            return;
        }
        const inDate = this.getSnapshotedDate("in");
        const outDate = this.getSnapshotedDate("out");
        this.props.saveMission({
            ...this.mission,
            title: this.state.title.trim() || this.mission.title.trim(),
            description: this.state.description.trim() || this.mission.description.trim(),
            checkinDate: inDate.unix() > outDate.unix() ?
                outDate.format(`${DATE_FORMAT} ${HOUR_FORMAT}`)
                : inDate.format(`${DATE_FORMAT} ${HOUR_FORMAT}`),
            checkoutDate: inDate.unix() > outDate.unix() ?
                inDate.format(`${DATE_FORMAT} ${HOUR_FORMAT}`)
                : outDate.format(`${DATE_FORMAT} ${HOUR_FORMAT}`),
        });
    }

    handleChange = (property, ev) => {
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
                [property]: isNumber || isSelect ? Number(value) : value
            });
            if (this.missionValid) {
                this.props.changeCurrent(this.mission);
            }
        }
    }

    renderSelectProperty(propName, stringChoices, defaultValue) {
        const hasError = this.isUserOwner && this.state[`${propName}Error`].length > 0;
        return (
            this.isUserOwner &&
            <FormControl className={this.props.classes.selectFormControl}>
                <InputLabel htmlFor={`select-multiple-${propName}`}>{hasError ? this.state[`${propName}Error`] : ""}</InputLabel>
                <Select
                    disabled={!this.isUserOwner}
                    id={`select-multiple-${propName}`}
                    value={this.state[propName] || defaultValue}
                    onChange={(e) => {
                        this.handleChange(propName, e);
                    }}
                    inputProps={{
                        name: propName,
                        id: `select-multiple-${propName}-input`,
                    }}
                >
                    {stringChoices.map(prop => (
                        <MenuItem
                            key={prop.label}
                            value={prop.value}
                            style={{
                                fontWeight: this.state[propName] === Number(prop.value) ? 600 : 400,
                            }}
                        >
                            {prop.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }

    renderTextField(propName, defaultValue, inputStyle = {}, multi = false) {
        const hasError = this.isUserOwner && this.state[`${propName}Error`].length > 0;
        return (
            <TextField
                error={hasError}
                className={this.props.classes[propName]}
                value={this.state[propName] || defaultValue}
                fullWidth
                label={hasError ? this.state[`${propName}Error`] : ""}
                name={propName}
                onChange={(ev) => {
                    this.handleChange(propName, ev);
                }}
                disabled={!this.isUserOwner}
                InputProps={{
                    disableUnderline: !this.isUserOwner,
                    style: inputStyle
                }}
                InputLabelProps={{
                    shrink: true,
                }}
                multi={`${!!multi.toString()}`}
                rowsMax={multi.rowsMax}
            />
        );
    }

    renderBookedStatus() {
        if (!this.mission || !this.mission.isBooked) {
            return null;
        }
        return (
            <UnbookedIcon className={this.props.classes.icon} size={15} />
        );
    }

    renderActiveStatus() {
        if (!this.mission || !this.mission.isActive) {
            return (
                <InactiveIcon className={this.props.classes.icon} size={15} />
            );
        }
        return (
            <ActiveIcon className={this.props.classes.icon} size={15} />
        );
    }

    renderPlaceAvatar() {
        const id = this.currentAccommodationId;
        if (!id || !this.props.mission.current.data.accommodation) {
            return (
                <NavLink
                    to={`/places/${id}`}
                >
                    <TodoIcon size={30} className={this.props.classes.avatar} />
                </NavLink>
            );
        }
        return (
            <NavLink
                to={`/places/${id}`}
            >
                <Avatar
                    className={this.props.classes.avatar}
                    alt="place"
                    src={getAccoImg(this.props.mission.current.data.accommodation)}
                />
            </NavLink>
        );
    }

    renderStartDateFields() {
        const hasError = this.isUserOwner && this.state.checkinDateError.length > 0;
        const style = {
            color: midGrey,
        };
        return (
            <Grid item container xs={12}>
                <TextField
                    className={this.props.classes.dateField}
                    style={style}
                    error={this.state.checkinDateError.length > 0}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    id="checkin-date-edit-input"
                    disabled={!this.isUserOwner}
                    InputProps={{
                        disableUnderline: !this.isUserOwner,
                        style: {
                            ...style,
                            maxWidth: 150
                        }
                    }}
                    value={this.state.checkinDate ||
                        moment(this.mission.checkinDate).format(DATE_FORMAT)}
                    label={hasError ? this.state.checkinDateError : "From"}
                    name="checkinDate"
                    min={this.props.formRules.checkinDate.min.format(DATE_FORMAT)}
                    onChange={(ev) => {
                        if (!this.isUserOwner) {
                            return;
                        }
                        const { value } = ev.target;
                        const formatted = moment(value, DATE_FORMAT).local();
                        const minDate = this.props.formRules.checkinDate.min;
                        this.setState({ checkinDate: value, checkinDateError: "" });
                        if (value !== minDate.format(DATE_FORMAT)
                            && minDate.unix() > formatted.unix()) {
                            this.setState({ checkinDateError: "Mission has to be starting at least an hour from now" });
                        } else if (this.missionValid) {
                            this.props.changeCurrent(this.mission);
                        }
                    }}
                    margin="normal"
                    type={this.isUserOwner ? "date" : "text"}
                />
                <TextField
                    className={this.props.classes.dateField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    id="checkin-time-edit-input"
                    disabled={!this.isUserOwner}
                    InputProps={{
                        disableUnderline: !this.isUserOwner,
                        style: {
                            ...style,
                        }
                    }}
                    value={this.state.checkinDateHour ||
                        moment(this.mission.checkinDate).format(HOUR_FORMAT)}
                    label={this.state.checkinDateError.length > 0 ? this.state.checkinDateError : "_"}
                    name="checkinDateHour"
                    onChange={(ev) => {
                        if (!this.isUserOwner) {
                            return;
                        }
                        const { value } = ev.target;
                        this.setState({ checkinDateHour: value });
                    }}
                    margin="normal"
                    type={this.isUserOwner ? "time" : "text"}
                />
            </Grid>
        );
    }

    renderEndDateFields() {
        const hasError = this.isUserOwner && this.state.checkoutDateError.length > 0;
        const style = {
            color: midGrey,
        };
        return (
            <Grid item container xs={12}>
                <TextField
                    className={this.props.classes.dateField}
                    style={style}
                    error={this.state.checkoutDateError.length > 0}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    id="checkout-date-edit-input"
                    disabled={!this.isUserOwner}
                    InputProps={{
                        disableUnderline: !this.isUserOwner,
                        style: {
                            ...style,
                            maxWidth: 150
                        }
                    }}
                    value={this.state.checkoutDate
                        || moment(this.mission.checkoutDate).format(DATE_FORMAT)}
                    label={hasError ? this.state.checkoutDateError : "To"}
                    name="checkoutDate"
                    min={this.props.formRules.checkoutDate.min.format(DATE_FORMAT)}
                    onChange={(ev) => {
                        if (!this.isUserOwner) {
                            return;
                        }
                        const { value } = ev.target;
                        const formatted = moment(value, DATE_FORMAT).local();
                        const minDate = this.props.formRules.checkoutDate.min;
                        this.setState({ checkoutDate: value, checkoutDateError: "" });
                        if (value !== minDate.format(DATE_FORMAT)
                            && minDate.unix() > formatted.unix()) {
                            this.setState({ checkoutDateError: "Mission has to be starting at least an hour from now" });
                        } else if (this.missionValid) {
                            this.props.changeCurrent(this.mission);
                        }
                    }}
                    margin="normal"
                    type={this.isUserOwner ? "date" : "text"}
                />
                <TextField
                    className={this.props.classes.dateField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    id="checkout-time-edit-input"
                    disabled={!this.isUserOwner}
                    InputProps={{
                        disableUnderline: !this.isUserOwner,
                        style: {
                            ...style,
                        }
                    }}
                    value={
                        this.state.checkoutDateHour
                            || moment(this.mission.checkoutDate).format(HOUR_FORMAT)}
                    label={this.state.checkoutDateError.length > 0 ? this.state.checkoutDateError : "_"}
                    name="checkoutDateHour"
                    onChange={(ev) => {
                        if (!this.isUserOwner) {
                            return;
                        }
                        const { value } = ev.target;
                        this.setState({ checkoutDateHour: value });
                    }}
                    margin="normal"
                    type={this.isUserOwner ? "time" : "text"}
                />
            </Grid>
        );
    }

    renderHostInfo() {
        const { mission } = this;
        if (this.isUserOwner || !mission || !mission.accommodation || !mission.accommodation.host) {
            return null;
        }
        const imgUrl = getUserImg(mission.accommodation.host.avatar);
        if (!imgUrl) {
            return (
                <Grid style={{ maxHeight: "50px" }} xs={6} container item justify="flex-end">
                    <Grid item>
                        <Typography className="full-height full-width display-flex-row" style={{ color: midGrey, paddingRight: "4px", display: "flex" }} variant="body2" color="inherit" component="p">
                            {mission.accommodation.host.userName}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <UserIcon size={25} className={this.props.classes.icon} />
                    </Grid>
                </Grid>
            );
        }
        return (
            <Grid xs={12} container item justify="flex-end">
                <Grid item>
                    <Typography style={{ color: midGrey, paddingRight: "4px" }} variant="body2" color="inherit">
                        {mission.accommodation.host.userName}
                    </Typography>
                </Grid>
                <Grid item>
                    <Avatar
                        className={this.props.classes.avatar}
                        alt={mission.accommodation.host.userName}
                        src={imgUrl}
                    />
                </Grid>
            </Grid>
        );
    }

    renderMissionDetails() {
        const currentAcco = this.props.mission.current.data.accommodation;
        return (
            this.mission &&
            <Grid container>
                <Grid container item direction="row" align="flex-start" xs={12}>
                    <Grid item xs={12}>
                        <div className="display-flex-row justify-start">
                            {this.renderActiveStatus()}
                            {this.renderBookedStatus()}
                        </div>
                        {this.isUserOwner && this.renderTextField("title", this.mission.title, { color: darkGrey, fontWeight: 500, fontSize: "1.875em" })}
                    </Grid>
                </Grid>
                {this.isUserOwner &&
                <Grid item container xs={12} justify="flex-start">
                    {this.renderStartDateFields()}
                    {this.renderEndDateFields()}
                </Grid>}
                <Grid item container xs={6}>
                    <div className="display-flex-row">
                        {this.renderPlaceAvatar()}
                        {currentAcco && currentAcco.title && !this.isUserOwner &&
                            <NavLink
                                to={`/places/${this.mission.accommodation_id}`}
                            >
                                <Typography className={this.props.classes.accommodationText} type="paragraph" color="inherit">{currentAcco.title}
                                </Typography>
                            </NavLink>
                        }
                        {this.currentAccommodationId && this.isUserOwner && this.renderSelectProperty("accommodation_id", this.props.formRules.accommodation_id.values, this.currentAccommodationId)}
                    </div>
                </Grid>
                {this.renderHostInfo()}
                <Grid className={this.props.classes.mapContainer} item xs={12}>
                    {currentAcco &&
                        <GMap
                            acco={currentAcco}
                            isUserOwner={false}
                        />
                    }
                </Grid>
                <div className="display-flex-row full-width justify-start">
                    {currentAcco && currentAcco.address &&
                        <Typography className={this.props.classes.selectFormControl} type="paragraph" color="inherit" variant="caption">{currentAcco.address}
                        </Typography>
                    }
                </div>
                <Grid item xs={12}>
                    {this.renderTextField("description", this.mission.description, { color: midGrey, fontSize: "1.275em" }, { rowsMax: 4 })}
                </Grid>
            </Grid>
        );
    }

    renderSaveBtns() {
        if (!this.isUserOwner) {
            return null;
        }
        if (this.isLoading) {
            return null;
        }
        return (
            <div>
                <Button
                    className={this.props.classes.cancelBtn}
                    aria-label="Cancel"
                    disabled={!this.hasMissionChanged || this.isLoading}
                    onClick={() => {
                        const mission = this.props.mission.current.data;
                        this.setState({
                            ...mission,
                            checkinDate: moment(mission.checkinDate, `${DATE_FORMAT} ${HOUR_FORMAT}`).format(DATE_FORMAT),
                            checkinDateHour: moment(mission.checkinDate, `${DATE_FORMAT} ${HOUR_FORMAT}`).format(HOUR_FORMAT),
                            checkoutDate: moment(mission.checkoutDate, `${DATE_FORMAT} ${HOUR_FORMAT}`).format(DATE_FORMAT),
                            checkoutDateHour: moment(mission.checkoutDate, `${DATE_FORMAT} ${HOUR_FORMAT}`).format(HOUR_FORMAT),
                        });
                    }}
                    color="default"
                    variant="fab"
                    id="devaway-cancel-edition-mission-btn"
                >
                    <Cancel />
                </Button>
                <Button
                    className={this.props.classes.saveBtn}
                    aria-label="Save"
                    color="primary"
                    disabled={!this.isMissionValid || !this.hasMissionChanged || this.isLoading}
                    onClick={this.handleSave}
                    variant="fab"
                    id="devaway-edit-mission-btn"
                >
                    <Save />
                </Button>
            </div>
        );
    }

    renderSpinner() {
        return (
            this.isLoading &&
            <div id="devaway-mission-edition-spinner-container" style={{ marginTop: 20 }} className="display-flex-row full-width">
                <CircularProgress color="primary" />
            </div>
        );
    }

    render() {
        const suheader = this.mission ?
            `${moment(this.mission.checkinDate).format("MMMM Do YYYY")}  --->  ${moment(this.mission.checkoutDate).format("MMMM Do YYYY")}`
            : "";
        return (
            <div className="full-width">
                <Navbar burgerColor={darkGrey} />
                <CarouselImages
                    acco={this.mission}
                    isUserOwner={this.isUserOwner}
                    changePictureListener={(mission, pictureId, imgData) => {
                        // @TODO update picture
                        console.log("HEY POULAYMAN", mission, imgData);
                    }}
                />
                <Card className={this.props.classes.container}>
                    {this.renderSpinner()}
                    {!this.isUserOwner && <CardHeader
                        title={`Mission ${this.isUserOwner ? "edition" : "detail"}`}
                        subheader={suheader}
                    />}
                    {this.renderMissionDetails()}
                </Card>
                {this.renderSaveBtns()}
            </div>
        );
    }
}
MissionEdition.propTypes = {
    match: T.shape({
        params: T.shape({
            missionID: T.string.isRequired
        }).isRequired
    }).isRequired,
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
            data: T.shape({
                accommodation_id: T.number,
                accommodation: T.shape({
                    title: T.string,
                    address: T.string,
                    pictures: T.arrayOf(T.shape({})),
                    isActive: T.number,
                    isBooked: T.number,
                })
            }).isRequired,
            isLoading: T.bool.isRequired,
        }).isRequired,
    }).isRequired,
    classes: T.shape({
        container: T.string.isRequired,
        mapContainer: T.string.isRequired,
        avatar: T.string.isRequired,
        activeContainer: T.string.isRequired,
        title: T.string.isRequired,
        saveBtn: T.string.isRequired,
        cancelBtn: T.string.isRequired,
        accommodationText: T.string.isRequired,
        icon: T.string.isRequired,
        selectFormControl: T.string.isRequired,
        dateField: T.string.isRequired,
    }).isRequired,
    formRules: missionRules.isRequired,
    saveMission: T.func.isRequired,
    changeCurrent: T.func.isRequired,
    onInit: T.func.isRequired,
};

export default withStyles(styles)(MissionEdition);
