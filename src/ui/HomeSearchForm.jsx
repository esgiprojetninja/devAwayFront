import React from "react";
import * as T from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Icon from "@material-ui/core/Icon";
import moment from "moment";
import Grid from "@material-ui/core/Grid";

class HomeSearchForm extends React.PureComponent {
    state = {
        startDate: moment(),
        endDate: moment(),
        nbGuests: 1
    }

    render() {
        const { classes } = this.props;
        return (
            <form className={classes.container}>
                <Grid container className={classes.gridContainer}>
                    <Grid item xs={12} sm={3} md={3}>
                        <div className="vertical-align">
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="location">Location</InputLabel>
                                <Input
                                    id="location"
                                    className={classes.textFieldLocation}
                                    type="text"
                                />
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={3} md={3}>
                        <div className="vertical-align">
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="fromDate">From</InputLabel>
                                <Input
                                    id="fromDate"
                                    type="date"
                                    defaultValue={this.state.startDate.format()}
                                    className={classes.textField}
                                />
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={3} md={3}>
                        <div className="vertical-align">
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="toDate">To</InputLabel>
                                <Input
                                    id="toDate"
                                    type="date"
                                    defaultValue={this.state.endDate.format()}
                                    className={classes.textField}
                                />
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={3} md={1}>
                        <div className="vertical-align">
                            <FormControl className={`${classes.formControl}${classes.formControlGuests}`}>
                                <InputLabel htmlFor="guests">Guests</InputLabel>
                                <Select
                                    value={this.state.nbGuests}
                                    input={<Input name="guests" id="guests" />}
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                        <div className="vertical-align">
                            <Button
                                className={classes.button}
                                raised="true"
                                type="submit"
                            >
                                Search
                                <Icon className={classes.rightIcon}>search</Icon>
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

HomeSearchForm.propTypes = {
    classes: T.shape({
        container: T.string,
        formControl: T.string,
        rightIcon: T.string
    }).isRequired
};

export default withStyles(theme => ({
    container: {
        padding: "30px 20px",
        backgroundColor: theme.palette.background.contentFrame,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    gridContainer: {
        width: "80%"
    },
    formControlGuests: {
        marginRight: "20px"
    },
    button: {
        marginLeft: "15px",
        backgroundColor: "#fe5858",
        color: "#ffffff"
    },
    formControl: {
        margin: `0 ${theme.spacing.unit}px`
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
        color: "#ffffff"
    },
    textFieldLocation: {
        marginBottom: "0"
    }
}))(HomeSearchForm);
