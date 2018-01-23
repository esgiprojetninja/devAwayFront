import React from "react";
import * as T from "prop-types";
import Button from "material-ui/Button";
import Checkbox from "material-ui/Checkbox";
import { FormGroup, FormControlLabel } from "material-ui/Form";
import TextField from "material-ui/TextField";
import {
    accommodationPropTypes
} from "../../propTypes/accommodationType";

export default class AccommodationDetail extends React.PureComponent {
    static propTypes = {
        accommodation: accommodationPropTypes.isRequired,
        onAccommodationChanged: T.func.isRequired,
        onSaveAccommodationClicked: T.func.isRequired,
        onDeleteAccommodationClicked: T.func.isRequired
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(ev) {
        ev.preventDefault();
        this.props.onSaveAccommodationClicked();
    }

    handleChange(ev) {
        const t = ev.target;
        this.props.onAccommodationChanged(
            t.name,
            t.type === "checkbox" ? t.checked : t.value
        );
    }

    render() {
        const { accommodation } = this.props;
        return (
            <form onSubmit={this.handleSubmit}>
                <TextField
                    id="title"
                    name="title"
                    label="Title"
                    value={accommodation.title}
                    onChange={this.handleChange}
                    margin="normal"
                />
                <TextField
                    id="city"
                    name="city"
                    label="City"
                    value={accommodation.city}
                    onChange={this.handleChange}
                    margin="normal"
                />
                <TextField
                    id="region"
                    name="region"
                    label="Region"
                    value={accommodation.region}
                    onChange={this.handleChange}
                    margin="normal"
                />
                <TextField
                    id="country"
                    name="country"
                    label="Country"
                    value={accommodation.country}
                    onChange={this.handleChange}
                    margin="normal"
                />
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                id="hasInternet"
                                name="hasInternet"
                                checked={accommodation.hasInternet}
                                onChange={this.handleChange}
                            />
                        }
                        label="Has internet"
                        margin="normal"
                    />
                </FormGroup>
                <TextField
                    id="description"
                    name="description"
                    label="Description"
                    value={accommodation.description}
                    onChange={this.handleChange}
                    margin="normal"
                />
                <FormGroup>
                    <Button
                        color="primary"
                        type="submit"
                    >
                        Save
                    </Button>
                    <Button
                        color="accent"
                        onClick={() => this.props.onDeleteAccommodationClicked(accommodation.id)}
                    >
                    <h4>Delete</h4>
                    <h4>Delete</h4>
                    <h4>Delete</h4>
                    <br>
                    <br>
                    <h4>Delete</h4>
                    <h4>Delete</h4>
                    </Button>
                </FormGroup>
            </form>
        );
    }
}
