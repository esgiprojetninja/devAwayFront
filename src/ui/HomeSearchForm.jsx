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
                <FormControl className={classes.formControl}>
                    <TextField
                        id="location"
                        label="Location"
                        className={classes.textField}
                        margin="normal"
                    />
                </FormControl>
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
                <FormControl className={classes.formControl}>
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
                <Button
                    className={classes.button}
                    raised
                    color="primary"
                    type="submit"
                >
                    Search
                    <Icon className={classes.rightIcon}>search</Icon>
                </Button>
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
        padding: theme.spacing.unit,
        backgroundColor: theme.palette.background.contentFrame,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    formControl: {
        margin: `0 ${theme.spacing.unit}px`
    },
    rightIcon: {
        marginLeft: theme.spacing.unit
    }
}))(HomeSearchForm);
