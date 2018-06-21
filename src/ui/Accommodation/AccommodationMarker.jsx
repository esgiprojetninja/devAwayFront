import React from "react";
import House from "react-icons/lib/fa/home";
import Building from "react-icons/lib/fa/building";
import { accommodationPropTypes } from "../../propTypes/accommodationType.js";
import { darkGrey } from "../../styles/theme";

const styles = {
    markerAppearance: {
        color: darkGrey,
        fill: darkGrey,
        height: "70px",
        width: "70px"
    }
};

export default class AccommodationMarker extends React.PureComponent {
    static propTypes = {
        accommodation: accommodationPropTypes
    }
    static defaultProps = {
        accommodation: null
    }

    get acco() {
        return this.props.accommodation ? this.props.accommodation : null;
    }

    render() {
        if (!this.acco) return null;
        switch (this.acco.type) {
        case "appartment":
            return (
                <Building
                    style={styles.markerAppearance}
                />
            );
        default:
            return (
                <House
                    style={styles.markerAppearance}
                />
            );
        }
    }
}
