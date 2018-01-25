import React from "react";
import * as T from "prop-types";

import Card, { CardActions, CardContent } from "material-ui/Card";
import { CircularProgress } from "material-ui/Progress";
import Snackbar from "material-ui/Snackbar";
import IconButton from "material-ui/IconButton";
import CloseIcon from "material-ui-icons/Close";
import GroupIcon from "material-ui-icons/Group";
import TextField from "material-ui/TextField";
import LocalHotelIcon from "material-ui-icons/LocalHotel";
import HotTubIcon from "material-ui-icons/HotTub";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import Hidden from 'material-ui/Hidden';
import Grid from "material-ui/Grid";
import GoogleMapReact from 'google-map-react';

import {
    accommodationPropTypes
} from "../propTypes/accommodationType";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class AccommodationIdDetails extends React.PureComponent {
    static propTypes = {
        accommodations: T.arrayOf(accommodationPropTypes).isRequired,
        isLoading: T.bool.isRequired,
        hasError: T.bool.isRequired,
        errorText: T.string.isRequired,
        onFetchAccommodations: T.func.isRequired
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

    componentDidMount() {
        if(this.props.accommodations.length === 0) {
            this.props.onFetchAccommodations();
            console.log('this', this);
        }
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
        return this.props.accommodations
            .map(allAccommodations => allAccommodations)
            .filter((filteredAccommodations, i) => i < 1)
            .map(a => (
                <div key={a.id}>
                    <div className="details-bg">
                        <img
                            alt={a.city + " accommodation"}
                            src={`${process.env.PUBLIC_URL}/img/accommodation.jpg`}
                            style={{backgroundSize: "cover", width: "100%"}}
                        />
                    </div>
                    <Grid container className="accommodation-details">
                        <Grid item xs={12} sm={8} md={8}>
                            <div className="d-block details-title">
                                {a.title}
                            </div>
                            <div className="d-block details-city">
                                {a.city}, {a.country}
                            </div>
                            <hr className="hr details-hr"/>
                            <div className="d-block details-user">
                                Proposé par <a href="/">Romain</a>
                            </div>
                            <div className="d-block">
                                <div className="card-icon-container details-icon-container">
                                    <div className="card-icon-wrapper details-icon-wrapper">
                                        <GroupIcon className="card-icon details-icon"/>
                                        <span className="card-icon-value details-value">{a.nbMaxGuest}</span>
                                    </div>
                                    <div className="card-icon-wrapper details-icon-wrapper">
                                        <LocalHotelIcon className="card-icon details-icon"/>
                                        <span className="card-icon-value details-value">{a.nbBedroom}</span>
                                    </div>
                                    <div className="card-icon-wrapper details-icon-wrapper">
                                        <HotTubIcon className="card-icon details-icon"/>
                                        <span className="card-icon-value details-value">{a.nbBathroom}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="d-block details-address">
                                {a.address}
                            </div>
                            <div className="d-block details-description">
                                {a.description}
                            </div>
                            <div className="d-block map-height">
                                <GoogleMapReact
                                    defaultCenter={{lat: a.latitude, lng: a.longitude}}
                                    defaultZoom={11}
                                    >
                                </GoogleMapReact>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4}>
                            <div className="card-img details-img" style={{width: "100%"}}>
                                <img
                                    alt={a.city + " accommodation"}
                                    src={`${process.env.PUBLIC_URL}/img/accommodation.jpg`}
                                    style={{backgroundSize: "cover", width: "100%"}}
                                />
                            </div>
                            <div className="vertical-align details-datewrapper">
                                <div className="details-date">
                                    <TextField
                                        id="fromDate"
                                        label="From"
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="toDate"
                                        label="To"
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="details-btnwrapper">
                                <Button
                                    className="details-btn btn-red"
                                    raised
                                    type="submit"
                                >
                                    Postuler
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            )
        );
    }
}
