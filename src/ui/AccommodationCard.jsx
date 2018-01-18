import React from "react";
import * as T from "prop-types";

import Card, { CardActions, CardContent, CardTitle, CardText, CardMedia } from "material-ui/Card";
import { CircularProgress } from "material-ui/Progress";
import Snackbar from "material-ui/Snackbar";
import IconButton from "material-ui/IconButton";
import CloseIcon from "material-ui-icons/Close";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";

import {
    accommodationPropTypes
} from "../propTypes/accommodationType";

export default class AccommodationCard extends React.PureComponent {
    static propTypes = {
        accommodations: T.arrayOf(accommodationPropTypes).isRequired,
        isLoading: T.bool.isRequired,
        hasError: T.bool.isRequired,
        errorText: T.string.isRequired,
        onFetchAccommodations: T.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            snackOpen: this.props.hasError
        };
    }

    componentDidMount() {
        if(this.props.accommodations.length == 0) {
            this.props.onFetchAccommodations();
        }
    }

    handleRequestClose() {
        this.setState({
            snackOpen: false
        });
    }

    renderListItems() {
        return this.props.accommodations.map(a => (
            <div
                key={a.id}
            >
                {a.title}
            </div>
        ));
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

    render() {
        return (
            <Card>
                <CardContent>
                    <Typography type="headline" component="h3">Accommodation</Typography>
                    <Typography component="p">{this.props.errorText}</Typography>
                    {this.renderListItems()}
                </CardContent>
            </Card>
        );
    }
}
