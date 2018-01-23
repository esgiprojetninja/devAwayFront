import React from "react";
import * as T from "prop-types";
import GroupIcon from "material-ui-icons/Group";
import LocalHotelIcon from "material-ui-icons/LocalHotel";
import HotTubIcon from "material-ui-icons/HotTub";
import Grid from "material-ui/Grid";
import {Link} from "react-router-dom";

import {
    accommodationPropTypes
} from "../propTypes/accommodationType";

export default class AccommodationsList extends React.PureComponent {
    static propTypes = {
        accommodations: T.arrayOf(accommodationPropTypes).isRequired,
        isLoading: T.bool.isRequired,
        hasError: T.bool.isRequired,
        errorText: T.string.isRequired,
        onFetchAccommodations: T.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        if(this.props.accommodations.length === 0) {
            this.props.onFetchAccommodations();
        }
    }

    renderListItems() {
        return this.props.accommodations
            .map(a => (
                <Grid item xs={12} sm={6} md={4} key={a.id}>
                    <div
                        className="accommodation-card"
                    >
                        <div className="card-wrapper">
                            <div className="card-img">
                                <img
                                    alt={a.city + " accommodation"}
                                    src={`${process.env.PUBLIC_URL}/img/accommodation.jpg`}
                                />
                            </div>
                            <div className="card-body">
                                <div className="card-title">
                                    {a.title}, <span className="color-black">{a.country}</span>
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
                                <div className="d-block text-center">
                                    <Link to={'/accommodations/' + a.id}>See more</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
            )
        );
    }

    render() {
        return (
            <Grid container className="accommodation-card-container accommodation-list-container">
                {this.renderListItems()}
            </Grid>
        );
    }
}
