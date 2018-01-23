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
        hasError: T.bool.isRequired,
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

    constructor(props) {
        super(props);
        this.state = {
            snackOpen: this.props.hasError
        };
    }

    componentDidMount() {
        this.props.onInit();
    }

    handleRequestClose() {
        this.setState({
            snackOpen: false
        });
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

    renderError() {
        if (this.props.hasError) {
            return (
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                    }}
                    open={this.state.snackOpen}
                    autoHideDuration={6000}
                    onRequestClose={this.handleRequestClose}
                    SnackbarContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    message={<span id="message-id">Note archived</span>}
                    action={[
                        <Button key="undo" color="accent" dense onClick={this.handleRequestClose}>
                            UNDO
                        </Button>,
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.handleRequestClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    ]}
                />
            );
        }
        return null;
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
        console.log("coucou accom", this.props);
        return (
            <Card>
                <CardContent>
                    <Typography type="headline" component="h3">Accommodation</Typography>
                    <Typography component="p">{this.props.errorText}</Typography>
                    {this.renderAccommodationList()}
                </CardContent>
                <CardActions>
                    <Button
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
