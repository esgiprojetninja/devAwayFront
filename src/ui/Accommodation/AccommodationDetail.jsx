import React from "react";
import * as T from "prop-types";

export default class AccommodationDetail extends React.PureComponent {
    static propTypes = {
        match: T.shape({
            params: T.shape({
                accoID: T.string.isRequired
            }).isRequired
        }).isRequired
    }

    render() {
        return (
            <div>
                CHIBAR FDP: {this.props.match.params.accoID}
            </div>
        );
    }
}
