import React from "react";
import * as T from "prop-types";

import Card, { CardActions, CardContent, CardTitle, CardText, CardMedia } from "material-ui/Card";
import { CircularProgress } from "material-ui/Progress";
import Snackbar from "material-ui/Snackbar";
import IconButton from "material-ui/IconButton";
import CloseIcon from "material-ui-icons/Close";
import Button from "material-ui/Button";
import GroupIcon from 'material-ui-icons/Group';
import LocalHotelIcon from 'material-ui-icons/LocalHotel';
import HotTubIcon from 'material-ui-icons/HotTub';
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";

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
        onFetchPicture: T.func.isRequired
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
        console.log('this', this);
    }

    handleRequestClose() {
        this.setState({
            snackOpen: false
        });
    }

    renderListItems() {
        return this.props.accommodations
            .map(allAccommodations => allAccommodations)
            .filter((filteredAccommodations, i) => i < 3)
            .map(a => (
                <Grid item xs={12} sm={4}>
                    <div
                        key={a.id}
                        className="accommodation-card"
                    >
                        <div className="card-img">
                            <img
                                alt={a.city + " accommodation"}
                                src={`${process.env.PUBLIC_URL}/img/accommodation.jpg`}
                            />
                        </div>
                        <div className="card-body">
                            <div className="card-title">
                                {a.title}
                            </div>
                            <div className="card-subtitle">
                                {a.country} {a.city}
                            </div>
                            <div className="card-description">
                                {a.description}
                            </div>
                            <div className="card-icon-container">
                                <div className="card-icon-wrapper">
                                    <GroupIcon className="card-icon"/>
                                    <span className="card-icon-value">{a.nbMaxGuest}</span>
                                </div>
                                <div className="card-icon-wrapper">
                                    <LocalHotelIcon className="card-icon"/>
                                    <span className="card-icon-value">{a.nbBedroom}</span>
                                </div>
                                <div className="card-icon-wrapper">
                                    <HotTubIcon className="card-icon"/>
                                    <span className="card-icon-value">{a.nbBathroom}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
            )
        );
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
            <Grid container sm="11" className="accommodation-card-container">
                {this.renderListItems()}
            </Grid>
        );
    }
}
