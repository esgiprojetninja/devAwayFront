import React from "react";
import * as T from "prop-types";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import Input, { InputLabel } from "material-ui/Input";
import { FormControl } from "material-ui/Form";
import TextField from "material-ui/TextField";
import Select from "material-ui/Select";
import { MenuItem } from "material-ui/Menu";
import Icon from "material-ui/Icon";
import moment from "moment";
import Grid from "material-ui/Grid";

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
                                <TextField
                                    id="location"
                                    className={classes.textFieldLocation}
                                    margin="normal"
                                />
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={3} md={3}>
                        <div className="vertical-align">
                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="fromDate"
                                    label="From"
                                    type="date"
                                    defaultValue={this.state.startDate.format()}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={3} md={3}>
                        <div className="vertical-align">
                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="toDate"
                                    label="To"
                                    type="date"
                                    defaultValue={this.state.endDate.format()}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
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
                                raised
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
