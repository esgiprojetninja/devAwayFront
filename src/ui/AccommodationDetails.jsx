import React from "react";
import * as T from "prop-types";

import Card, { CardActions, CardContent } from "material-ui/Card";
import { CircularProgress } from "material-ui/Progress";
import Snackbar from "material-ui/Snackbar";
import IconButton from "material-ui/IconButton";
import CloseIcon from "material-ui-icons/Close";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";

import {
    accommodationPropTypes
} from "../propTypes/accommodationType";

export default class AccommodationDetails extends React.PureComponent {
    static propTypes = {
        accommodations: T.arrayOf(accommodationPropTypes).isRequired,
        isLoading: T.bool.isRequired,
        current: T.shape({
            data: accommodationPropTypes,
            isLoading: T.bool
        }).isRequired,
        hasError: T.bool.isRequired,
        errorText: T.string.isRequired,
        mode: T.oneOf(["list", "edit"]).isRequired,
        onFetchAccommodationsClicked: T.func.isRequired,
        onAccommodationDetailClicked: T.func.isRequired,
        onShowListClicked: T.func.isRequired,
        onAccommodationChanged: T.func.isRequired,
        onSaveAccommodationClicked: T.func.isRequired,
        onDeleteAccommodationClicked: T.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            snackOpen: this.props.hasError
        };
    }

    handleRequestClose() {
        this.setState({
            snackOpen: false
        });
    }

    renderCurrentProp() {
        const { data, isLoading } = this.props.current;
        if (isLoading) {
            return (
                <CircularProgress />
            );
        }
        return (
            <div>
                <p>{data.title} | #{data.id}</p>
            </div>
        );
    }

    render() {
        return (
            <div>test</div>
        );
    }
}
