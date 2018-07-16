/* global */
import React from "react";
import * as T from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Save from "@material-ui/icons/Save";
import Cancel from "@material-ui/icons/Cancel";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TodoIcon from "react-icons/lib/fa/question";
import LockedIcon from "react-icons/lib/fa/lock";
import BookIcon from "react-icons/lib/fa/book";
import Avatar from "@material-ui/core/Avatar";
import UserIcon from "react-icons/lib/fa/user";
import Divider from "@material-ui/core/Divider";
import Fade from "@material-ui/core/Fade";
import Slide from "@material-ui/core/Slide";
import moment from "moment";

import { midGrey, darkGrey } from "../../styles/theme";
import Navbar from "../../containers/Navbar";
import { getAccoImg } from "../../utils/accommodation";
import CarouselImages from "../../containers/AccommodationDetailImages";
import GMap from "../../containers/AccommodationDetailMap";
import Travellers from "../../containers/Mission/MissionTravellers";
import missionRules from "../../propTypes/missionRulesType";
import { getStateFromRules, DATE_FORMAT, HOUR_FORMAT } from "../../utils/mission";
import getUserImg from "../../utils/user";

const DEFAULT_CHECKIN_DATE = moment().local();
const DEFAULT_CHECKOUT_DATE = moment().local().add(1, "days");

const styles = theme => ({
    container: {
        width: "100%",
        maxWidth: 1200,
        margin: "auto",
        marginTop: theme.spacing.unit * 2,
        overflow: "hidden",
        position: "relative",
    },
    hostInfoContainer: {
        maxWidth: 150,
        top: 0,
        right: theme.spacing.unit * 2,
        position: "absolute",
    },
    carouselContainer: {
        marginTop: theme.spacing.unit * 4,
    },
    mapContainer: {
        height: 300,
        maxWidth: 1200,
        margin: theme.spacing.unit * 4,
    },
    inactiveWarningContainer: {
        margin: theme.spacing.unit * 4,
        marginTop: theme.spacing.unit * 6,
        textAlign: "justify",
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
    applyBtn: {
        zIndex: 2,
        position: "fixed",
        right: theme.spacing.unit * 2,
        bottom: theme.spacing.unit * 2,
    },
    cancelBtn: {
        position: "fixed",
        right: theme.spacing.unit * 2,
        bottom: theme.spacing.unit * 12,
    },
    accommodationText: {
        margin: theme.spacing.unit,
        fontSize: "large",
    },
    ownerInactiveWarningContainer: {
        background: theme.palette.primary.lightGrey,
        borderRadius: "2%",
        boxShadow: "1px 3px 21px 0px #aeaeae",
    },
    ownerInactiveWarning: {
        margin: theme.spacing.unit * 4,
        color: "#fff",
        fontWeight: 700,
    },
    connectedBookedUserLabelContainer: {
        background: theme.palette.primary.light,
        borderRadius: "2%",
        boxShadow: "1px 3px 21px 0px #aeaeae",
    },
    selectFormControl: {
        margin: theme.spacing.unit * 4,
    },
    applyDateField: {
        margin: theme.spacing.unit,
    },
    dateField: {
        margin: theme.spacing.unit * 4,
    },
    avatar: {
        margin: theme.spacing.unit * 4,
        marginRight: 0,
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
    headDivider: {
        width: "100%",
        margin: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit,
        marginLeft: 0,
        marginRight: 0,
        padding: 0,
        background: theme.palette.primary.light,
        height: 5
    },
    modalDivider: {
        width: "100%",
        margin: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit,
        marginLeft: 0,
    },
    bookedIcon: {
        color: theme.palette.primary.midGrey,
        position: "absolute",
        top: theme.spacing.unit * 3,
        right: theme.spacing.unit * 3,
    },
    noMissionContainer: {
        height: "100%",
        minHeight: "80vh",
        width: "100%",
    },
    cardSubHeader: {
        "& > div > span:first-of-type": {
            color: theme.palette.primary.darkGrey,
        },
    },
});

class MissionEdition extends React.PureComponent {
    state = {
        ...getStateFromRules(this.props.formRules),
        checkinDate: "",
        checkinDateHour: "",
        checkoutDate: "",
        checkoutDateHour: "",
        openApplyModal: false,
        checkinApplyDate: "",
        checkoutApplyDate: "",
        checkinApplyDateError: "",
        checkoutApplyDateError: "",
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
        const { title, description, accommodation_id, isActive } = this.state; // eslint-disable-line
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
        if ((isActive === 0 || isActive === 1) && isActive !== mission.isActive) {
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

    get userCandidacy() {
        const { user, mission } = this.props;
        if (!mission.current.data.travellers) {
            return false;
        }
        return mission.current.data.travellers
            .find(candidacy => candidacy.user.id === user.data.id);
    }

    get isUserRefused() {
        return this.userCandidacy && this.userCandidacy.status === -1; 
    }

    get userNotInTravellers() {
        return !this.userCandidacy;
    }

    get userIsBookedTraveller() {
        const { mission } = this;
        const { user } = this.props;
        if (mission && mission.travellers && mission.isBooked === 1) {
            const accepted = mission.travellers
                .find(candidacy => candidacy.user.id === user.data.id && candidacy.status === 69);
            return Boolean(accepted);
        }
        return false;
    }


    get canChangeCandidacy() {
        return !this.isLoading && this.mission
        && ((this.mission.isActive === 1 && this.mission.isBooked === 0)
            || this.userIsBookedTraveller);
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
        if (this.props.mission.current.data.isActive === 0) {
            return;
        }
        const inDate = this.getSnapshotedDate("in");
        const outDate = this.getSnapshotedDate("out");
        this.props.saveMission({
            ...this.mission,
            title: this.state.title.trim() || this.mission.title.trim(),
            description: this.state.description.trim() || this.mission.description.trim(),
            isActive: this.state.isActive === 0 || this.state.isActive === 1 ?
                this.state.isActive
                : this.mission.isActive,
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
        if (!this.props.mission.current.data.isActive) {
            return;
        }
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

    handleApplyToggle = () => {
        const { user, mission } = this.props;
        this.setState({
            openApplyModal: false,
        });
        if (!user.isLoggedIn || this.isUserOwner || mission.current.isLoading
            || this.checkoutApplyDateError || this.checkinApplyDateError) {
            return;
        }
        if ((mission.isBooked === 1 || mission.isActive === 0) && !this.userIsBookedTraveller) {
            return;
        }
        let { checkinApplyDate, checkoutApplyDate } = this.state;
        checkinApplyDate = checkinApplyDate || DEFAULT_CHECKIN_DATE;
        checkoutApplyDate = checkoutApplyDate || DEFAULT_CHECKOUT_DATE;
        const apply = this.userNotInTravellers
            || (this.userCandidacy && this.userCandidacy.status === 0);
        this.props.toggleMissionCandidacy(apply, {
            fromDate: checkinApplyDate.unix() < checkoutApplyDate.unix() ?
                checkinApplyDate.format(`${DATE_FORMAT}, ${HOUR_FORMAT}`)
                : checkoutApplyDate.format(`${DATE_FORMAT}, ${HOUR_FORMAT}`),
            toDate: checkinApplyDate.unix() < checkoutApplyDate.unix() ?
                checkoutApplyDate.format(`${DATE_FORMAT}, ${HOUR_FORMAT}`)
                : checkinApplyDate.format(`${DATE_FORMAT}, ${HOUR_FORMAT}`)
        });
    }

    handlePictureChange = (mission, pictureId, imgData) => {
        if (this.props.mission.current.isLoading) {
            return;
        }
        this.props.updatePicture(mission.id, pictureId, imgData);
    }

    handleOpenApplyModal = () => {
        this.setState({
            openApplyModal: true,
        });
    }

    handleCloseApplyModal = () => {
        this.setState({
            openApplyModal: false,
        });
    }

    toggleIsActive = () => {
        const mission = this.props.mission.current.data;
        if (!mission || !this.isUserOwner) {
            return;
        }
        this.props.toggleIsActive();
    }

    renderSelectProperty(propName, stringChoices, defaultValue) {
        const hasError = this.isUserOwner && this.state[`${propName}Error`].length > 0;
        return (
            this.isUserOwner &&
            <FormControl className={this.props.classes.selectFormControl}>
                <InputLabel htmlFor={`select-multiple-${propName}`}>{hasError ? this.state[`${propName}Error`] : ""}</InputLabel>
                <Select
                    disabled={!this.isUserOwner || this.props.mission.current.data.isActive === 0}
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
                disabled={!this.isUserOwner || this.props.mission.current.data.isActive === 0}
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

    renderInactiveControl() {
        const { classes } = this.props;
        const mission = this.props.mission.current.data;
        if (!this.isUserOwner || !mission) {
            return null;
        }
        const isActive = this.state.isActive === 0 || this.state.isActive === 1 ?
            Boolean(this.state.isActive)
            : Boolean(this.mission.isActive);
        return (
            <Fade in mountOnEnter unmountOnExit>
                <Grid container alignItems="center" className={classes.inactiveWarningContainer}>
                    <Grid item xs={3}>
                        <FormControlLabel
                            disabled={this.props.mission.current.isLoading}
                            control={
                                <Switch
                                    checked={isActive}
                                    onChange={this.toggleIsActive}
                                    color="primary"
                                />}
                            label={mission.isActive ? "Switched to active" : "Switched to inactive"}
                        />
                    </Grid>
                    <Grid item xs={9}>
                        {isActive && mission.isBooked <= 0 &&
                        <Typography variant="headline" color="textSecondary">
                            This mission is visible, travellers can apply for it
                        </Typography>}
                    </Grid>
                </Grid>
            </Fade>
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
                    disabled={!this.isUserOwner || this.props.mission.current.data.isActive === 0}
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
                    disabled={!this.isUserOwner || this.props.mission.current.data.isActive === 0}
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
                    disabled={!this.isUserOwner || this.props.mission.current.data.isActive === 0}
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
                    disabled={!this.isUserOwner || this.props.mission.current.data.isActive === 0}
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

    renderHostInfo(direction = "row") {
        const { mission } = this;
        if (!mission || !mission.accommodation || !mission.accommodation.host) {
            return null;
        }
        const { classes } = this.props;
        const imgUrl = getUserImg(mission.accommodation.host.avatar);
        if (!imgUrl) {
            return (
                <Grid className={classes.hostInfoContainer} container direction={direction} justify="flex-start">
                    <Grid item>
                        <UserIcon size={25} className={this.props.classes.icon} />
                    </Grid>
                    <Grid item>
                        <Typography className="full-height full-width display-flex-row" style={{ color: midGrey, paddingRight: "4px", display: "flex" }} variant="body2" color="inherit" component="p">
                            {mission.accommodation.host.userName}
                        </Typography>
                    </Grid>
                </Grid>
            );
        }
        return (
            <Grid className={classes.hostInfoContainer} container justify="flex-start">
                <Grid item>
                    <Avatar
                        className={this.props.classes.avatar}
                        alt={mission.accommodation.host.userName}
                        src={imgUrl}
                    />
                </Grid>
                <Grid item>
                    <Typography style={{ color: midGrey, paddingRight: "4px" }} variant="body2" color="inherit">
                        {mission.accommodation.host.userName}
                    </Typography>
                </Grid>
            </Grid>
        );
    }

    renderInactiveLabel() {
        const { classes } = this.props;
        const showInactiveLabel = this.mission && this.mission.isActive <= 0;
        const collapseStyle = {
            transition: ".2s transform ease-in-out",
            transform: showInactiveLabel ? "initial" : "scale(0, 0)",
            height: "100%",
            width: "100%",
        };
        const gridStyle = {
            ...collapseStyle,
            height: "auto",
        };
        return (
            <Grid style={gridStyle} item xs={12}>
                <Slide in={showInactiveLabel} mountOnEnter unmountOnExit>
                    <Fade in={showInactiveLabel}>
                        <Grid direction="row" className={classes.ownerInactiveWarningContainer} container alignItems="center" justify="center">
                            <div style={collapseStyle}>
                                <Grid direction="row" container alignItems="center" justify="center">
                                    <LockedIcon style={{ color: "#fff" }} size={25} />
                                    <Typography className={classes.ownerInactiveWarning} variant="headline" color="primary" component="h3">
                                        This mission has been set to inactive,
                                        it&#39;s
                                        informations and travellers are now freezed
                                    </Typography>
                                </Grid>
                            </div>
                        </Grid>
                    </Fade>
                </Slide>
            </Grid>
        );
    }

    renderBookedLabel() {
        const { classes } = this.props;
        const showBookedLabel = this.props.mission.current.data.isBooked > 0;
        const containerClass = this.userIsBookedTraveller ?
            classes.connectedBookedUserLabelContainer : classes.ownerInactiveWarningContainer;
        return (
            <Grid item xs={12}>
                {showBookedLabel &&
                <Slide in mountOnEnter unmountOnExit>
                    <Fade in mountOnEnter unmountOnExit>
                        <Grid direction="row" className={containerClass} container alignItems="center" justify="center">
                            <Grid direction="row" container alignItems="center" justify="center">
                                <BookIcon style={{ color: "#fff" }} size={25} />
                                {!this.userIsBookedTraveller &&
                                <Typography className={classes.ownerInactiveWarning} variant="headline" color="primary" component="h3">
                                    This mission has been booked
                                        by {this.mission.travellers
                                        .find(cand => cand.status === 69)
                                        .user.userName}
                                </Typography>}
                                {this.userIsBookedTraveller &&
                                <Typography className={classes.ownerInactiveWarning} variant="headline" color="primary" component="h3">
                                    You are booked for this mission
                                </Typography>}
                            </Grid>
                        </Grid>
                    </Fade>
                </Slide>}
            </Grid>
        );
    }

    renderMissionDetails() {
        const { classes } = this.props;
        return (
            this.mission &&
            <Slide direction="right" in mountOnEnter unmountOnExit>
                <Fade in mountOnEnter unmountOnExit>
                    <Grid className="relative" container alignItems="center" justify="flex-start">
                        {this.renderInactiveControl()}
                        {this.renderInactiveLabel()}
                        {this.renderBookedLabel()}
                        {this.isUserOwner &&
                        <Grid container item direction="row" align="flex-start" xs={12} md={6}>
                            {this.renderTextField("title", this.mission.title, { color: darkGrey, fontWeight: 500, fontSize: "1.875em" })}
                        </Grid>}
                        {this.isUserOwner &&
                        <Grid item container xs={12} md={6} justify="flex-start">
                            {this.renderStartDateFields()}
                            {this.renderEndDateFields()}
                        </Grid>}
                        <Grid item container xs={6}>
                            <div className="display-flex-row full-width justify-start">
                                {this.renderPlaceAvatar()}
                                {this.mission && this.mission.title && !this.isUserOwner &&
                                    <NavLink
                                        to={`/places/${this.mission.accommodation_id}`}
                                    >
                                        <Typography className={classes.accommodationText} type="paragraph" color="inherit">{this.mission.title}
                                        </Typography>
                                    </NavLink>
                                }
                                {this.currentAccommodationId && this.isUserOwner && this.renderSelectProperty("accommodation_id", this.props.formRules.accommodation_id.values, this.currentAccommodationId)}
                            </div>
                        </Grid>
                        <Grid className={classes.mapContainer} item xs={12}>
                            {this.mission &&
                                <GMap
                                    acco={this.mission}
                                    isUserOwner={false}
                                />
                            }
                        </Grid>
                        <div className="display-flex-row full-width justify-start">
                            {this.mission && this.mission.address &&
                                <Typography className={classes.selectFormControl} type="paragraph" color="inherit" variant="caption">{this.mission.address}
                                </Typography>
                            }
                        </div>
                        <Grid item xs={12}>
                            {this.renderTextField("description", this.mission.description, { color: midGrey, fontSize: "1.275em" }, { rowsMax: 4 })}
                        </Grid>
                    </Grid>
                </Fade>
            </Slide>
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
                    id="#mission-edition-cancel-btn"
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

    renderApplyModal() {
        const { canChangeCandidacy } = this;
        const { user, classes } = this.props;
        const style = {
            color: midGrey,
        };
        const candidacy = this.userCandidacy;
        const checkinDateCandidacy = !this.userCandidacy ? DEFAULT_CHECKIN_DATE : moment(this.userCandidacy.fromDate, `${DATE_FORMAT} ${HOUR_FORMAT}`).local();
        const checkoutDateCandidacy = !this.userCandidacy ? DEFAULT_CHECKOUT_DATE : moment(this.userCandidacy.toDate, `${DATE_FORMAT} ${HOUR_FORMAT}`).local();
        const acco = this.props.mission.current.data.accommodation;

        let contentText = "Applying will allow you to communicate with your potential host";
        if (this.isUserRefused) {
            contentText = `Your candidacy was refused ${moment(candidacy.updated_at, `${DATE_FORMAT}, ${HOUR_FORMAT}:SS`).fromNow()}`;
        } else if (candidacy && candidacy.status > 0) {
            contentText = "Removing your candidacy will prevent you from communicating with the host";
        }
        return (this.mission &&
            <Dialog
                open={this.state.openApplyModal && user.isLoggedIn && !this.isUserOwner}
                onClose={this.handleCloseApplyModal}
                aria-labelledby="form-apply-dialog-title"
            >
                <DialogTitle id="form-apply-dialog-title">{this.isUserRefused ? "Your denied Candidacy" : "Your Candidacy"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{contentText}</DialogContentText>
                    <Divider inset className={classes.modalDivider} />
                    <Grid container direction="row" align="flex-start">
                        <Grid item xs={6}>
                            <TextField
                                className={classes.applyDateField}
                                style={style}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                id="checkin-checkindate-apply-input"
                                disabled={!canChangeCandidacy || this.isUserRefused}
                                InputProps={{
                                    disableUnderline: true,
                                    style: {
                                        ...style,
                                        maxWidth: 150
                                    }
                                }}
                                value={this.state.checkinApplyDate ?
                                    this.state.checkinApplyDate.format(DATE_FORMAT)
                                    : checkinDateCandidacy.format(DATE_FORMAT)}
                                error={this.state.checkinApplyDateError.length > 0}
                                label={this.state.checkinApplyDateError ? this.state.checkinApplyDateError : "From"}
                                name="checkinDateApply"
                                min={moment().local().format(DATE_FORMAT)}
                                onChange={(ev) => {
                                    if (!canChangeCandidacy || this.isUserRefused) {
                                        return;
                                    }
                                    const { value } = ev.target;
                                    const formatted = moment(value, DATE_FORMAT).local();
                                    const minDate = moment().local();
                                    this.setState({ checkinApplyDate: formatted, checkinApplyDateError: "" });
                                    if (minDate.unix() > formatted.unix()) {
                                        this.setState({ checkinApplyDateError: "Your candidacy can't be backdated" });
                                    }
                                }}
                                fullWidth
                                margin="normal"
                                type="date"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                className={classes.applyDateField}
                                style={style}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                id="checkout-checkoutdate-apply-input"
                                disabled={!canChangeCandidacy || this.isUserRefused}
                                InputProps={{
                                    disableUnderline: !this.isUserOwner,
                                    style: {
                                        ...style,
                                        maxWidth: 150
                                    }
                                }}
                                value={this.state.checkoutApplyDate ?
                                    this.state.checkoutApplyDate.format(DATE_FORMAT)
                                    : checkoutDateCandidacy.format(DATE_FORMAT)}
                                error={this.state.checkoutApplyDateError.length > 0}
                                label={this.state.checkoutApplyDateError ? this.state.checkoutApplyDateError : "To"}
                                name="checkoutDateApply"
                                min={moment().format(DATE_FORMAT)}
                                onChange={(ev) => {
                                    if (!canChangeCandidacy || this.isUserRefused) {
                                        return;
                                    }
                                    const { value } = ev.target;
                                    const formatted = moment(value, DATE_FORMAT).local();
                                    const minDate = moment().add(1, "day").local();
                                    this.setState({ checkoutApplyDate: formatted, checkoutApplyDateError: "" });
                                    if (minDate.unix() > formatted.unix()) {
                                        this.setState({ checkoutApplyDateError: "You can't apply for less than a day" });
                                    }
                                }}
                                fullWidth
                                margin="normal"
                                type="date"
                            />
                        </Grid>
                    </Grid>
                    {!canChangeCandidacy &&
                    <Grid container>
                        <Typography type="paragraph" color="primary" variant="subheading">
                            The mission has been locked {acco && acco.host ? `by ${acco.host.userName}` : ""}
                        </Typography>
                    </Grid>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCloseApplyModal} color="default">
                        Close
                    </Button>
                    {canChangeCandidacy &&
                    <Button
                        disabled={this.state.checkoutApplyDateError.length > 0
                            || this.state.checkinApplyDateError.length > 0
                            || !canChangeCandidacy
                            || this.isUserRefused
                        }
                        onClick={this.handleApplyToggle}
                        color="primary"
                    >
                        {!candidacy || candidacy.status <= 0 ? "Apply" : "Cancel Candidacy"}
                    </Button>}
                </DialogActions>
            </Dialog>
        );
    }

    renderApplyBtn() {
        const { user, classes, mission } = this.props;
        const candidacy = this.userCandidacy;
        let message = "Submit your candidacy";
        if (this.isUserRefused) {
            message = "Your candidacy was refused";
        } else if (candidacy && candidacy.status > 0) {
            message = "Change your candidacy";
        }
        if (user.isLoggedIn && !this.isUserOwner && !mission.current.isLoading) {
            return (this.canChangeCandidacy &&
                <Button
                    id="#mission-apply-toggle-modal-btn"
                    className={classes.applyBtn}
                    aria-label={candidacy && candidacy.status > 0 ?
                        "Removing your candidacy will prevent you from communicating with the host"
                        : "Applying will allow you to communicate with your potential host"
                    }
                    disabled={(mission.current.data.isActive === 0 && !this.userIsBookedTraveller)}
                    color="default"
                    onClick={this.handleOpenApplyModal}
                    variant="raised"
                >
                    {message}
                </Button>
            );
        }
        return null;
    }

    renderNoMissionDetail() {
        const { classes } = this.props;
        return (
            !this.mission &&
            <Slide direction="left" in mountOnEnter unmountOnExit>
                <Fade in mountOnEnter unmountOnExit>
                    <Grid container alignItems="center" justify="center" className={classes.noMissionContainer}>
                        <Grid item>
                            <Typography variant="headline" component="h2" color="primary">
                                This mission does not exist anymore
                            </Typography>
                        </Grid>
                    </Grid>
                </Fade>
            </Slide>
        );
    }

    render() {
        const suheader = this.mission ?
            `${moment(this.mission.checkinDate).format("MMMM Do YYYY")}  --->  ${moment(this.mission.checkoutDate).format("MMMM Do YYYY")}`
            : "";
        const { classes } = this.props;
        const canEditImages = this.isUserOwner && this.mission.isActive > 0;
        return (
            <div className="full-width">
                <Navbar replaceLogoWithSpinner={this.isLoading} burgerColor={darkGrey} />
                <Card className={this.props.classes.container}>
                    {<CardHeader
                        className={classes.cardSubHeader}
                        title={`Mission ${this.isUserOwner ? "edition" : "detail"}`}
                        subheader={suheader}
                    />}
                    <Divider inset className={classes.headDivider} />
                    <Grid className={classes.carouselContainer} container alignItems="center" justify="center">
                        {this.mission &&
                        <Slide in mountOnEnter unmountOnExit>
                            <CarouselImages
                                acco={this.mission}
                                isUserOwner={canEditImages}
                                changePictureListener={this.handlePictureChange}
                            />
                        </Slide>}
                    </Grid>
                    {this.renderMissionDetails()}
                    {!this.mission && this.renderNoMissionDetail()}
                    <Grid container>
                        <Travellers mission={this.mission} isUserOwner={this.isUserOwner} />
                    </Grid>
                    {this.mission
                        && this.mission.accommodation && this.mission.accommodation.host &&
                        this.renderHostInfo("row-reverse")
                    }
                </Card>
                {this.isUserOwner && this.props.mission.current.data.isActive > 0 &&
                    this.renderSaveBtns()}
                {this.renderApplyModal()}
                {this.renderApplyBtn()}
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
            id: T.number,
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
                    host: T.shape({
                        userName: T.string.isRequired,
                    }),
                }),
                isBooked: T.number,
                travellers: T.array,
                isActive: T.number,
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
        bookedIcon: T.string.isRequired,
    }).isRequired,
    formRules: missionRules.isRequired,
    saveMission: T.func.isRequired,
    changeCurrent: T.func.isRequired,
    onInit: T.func.isRequired,
    toggleMissionCandidacy: T.func.isRequired,
    updatePicture: T.func.isRequired,
    toggleIsActive: T.func.isRequired,
};

export default withStyles(styles)(MissionEdition);
