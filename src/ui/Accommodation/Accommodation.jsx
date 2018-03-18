import React from "react";
import * as T from "prop-types";

import Card, { CardActions, CardContent } from "material-ui/Card";
import { CircularProgress } from "material-ui/Progress";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";

import {
    accommodationPropTypes
} from "../../propTypes/accommodationType";
import AccommodationList from "./AccommodationList.jsx";
import AccommodationDetail from "./AccommodationDetail.jsx";

export default class Accommodation extends React.PureComponent {
    static propTypes = {
        accommodations: T.arrayOf(accommodationPropTypes).isRequired,
        isLoading: T.bool.isRequired,
        current: T.shape({
            data: accommodationPropTypes,
            isLoading: T.bool
        }).isRequired,
        errorText: T.string.isRequired,
        mode: T.oneOf(["list", "edit"]).isRequired,
        onFetchAccommodationsClicked: T.func.isRequired,
        onAccommodationDetailClicked: T.func.isRequired,
        onShowListClicked: T.func.isRequired,
        onAccommodationChanged: T.func.isRequired,
        onSaveAccommodationClicked: T.func.isRequired,
        onDeleteAccommodationClicked: T.func.isRequired,
        onInit: T.func.isRequired
    }

    componentDidMount() {
        this.props.onInit();
    }

    renderAccommodationList() {
        if (this.props.isLoading) {
            return (
                <CircularProgress />
            );
        }
        if (this.props.mode === "list") {
            return (
                <AccommodationList
                    accommodations={this.props.accommodations}
                    onAccommodationDetailClicked={this.props.onAccommodationDetailClicked}
                />
            );
        }
        if (this.props.mode === "edit") {
            return (
                <AccommodationDetail
                    accommodation={this.props.current}
                    onAccommodationChanged={this.props.onAccommodationChanged}
                    onSaveAccommodationClicked={this.props.onSaveAccommodationClicked}
                    onDeleteAccommodationClicked={this.props.onDeleteAccommodationClicked}
                />
            );
        }
        return null;
    }

    renderShowListButton() {
        return this.props.mode !== "list"
            ? (
                <Button
                    onClick={this.props.onShowListClicked}
                >
                    Show list
                </Button>
            )
            : null;
    }

    render() {
        return (
            <Card>
                <CardContent>
                    <Typography type="headline" component="h3">Accommodation</Typography>
                    <Typography component="p">{this.props.errorText}</Typography>
                    {this.renderAccommodationList()}
                </CardContent>
                <CardActions>
                    <Button
                        id="reload-accos-btn"
                        onClick={this.props.onFetchAccommodationsClicked}
                    >
                        Reload
                    </Button>
                    {this.renderShowListButton()}
                </CardActions>
            </Card>
        );
    }
}
