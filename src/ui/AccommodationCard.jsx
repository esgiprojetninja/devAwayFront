import React from "react";
import * as T from "prop-types";
import GroupIcon from "material-ui-icons/Group";
import LocalHotelIcon from "material-ui-icons/LocalHotel";
import HotTubIcon from "material-ui-icons/HotTub";
import Grid from "material-ui/Grid";

import {
    accommodationPropTypes
} from "../propTypes/accommodationType";

export default class AccommodationCard extends React.PureComponent {
    static propTypes = {
        accommodations: T.arrayOf(accommodationPropTypes).isRequired,
        onInit: T.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        if (!this.props.accommodations.length) {
            this.props.onInit();
        }
    }

    renderListItems() {
        return this.props.accommodations
            .map(allAccommodations => allAccommodations)
            .slice(0, 3)
            .map(a => (
                <Grid item xs={12} sm={6} md={4} key={a.id}>
                    <div
                        className="accommodation-card"
                    >
                        <div className="card-wrapper">
                            <div className="card-img">
                                <img
                                    alt={`${a.city} accommodation`}
                                    src={`${process.env.PUBLIC_URL}/img/accommodation.jpg`}
                                />
                            </div>
                            <div className="card-body">
                                <div className="card-title">
                                    {a.title}
                                </div>
                                <div className="card-subtitle">
                                    <span className="d-block">{a.country}</span>
                                    <span className="d-block">{a.city}</span>
                                </div>
                                <div className="card-description">
                                    {a.description}
                                </div>
                                <div className="card-icon-container">
                                    <div className="card-icon-wrapper">
                                        <GroupIcon className="card-icon" />
                                        <span className="card-icon-value">{a.nbMaxGuest}</span>
                                    </div>
                                    <div className="card-icon-wrapper">
                                        <LocalHotelIcon className="card-icon" />
                                        <span className="card-icon-value">{a.nbBedroom}</span>
                                    </div>
                                    <div className="card-icon-wrapper">
                                        <HotTubIcon className="card-icon" />
                                        <span className="card-icon-value">{a.nbBathroom}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
            ));
    }

    render() {
        return (
            <Grid container className="accommodation-card-container">
                {this.renderListItems()}
            </Grid>
        );
    }
}
