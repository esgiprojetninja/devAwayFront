import React from "react";
import House from "react-icons/lib/fa/home";
import Building from "react-icons/lib/fa/building";
import { accommodationPropTypes } from "../../propTypes/accommodationType.js";
import { defaultTheme } from "../../styles/theme";

const styles = {
    markerAppearance: {
        color: defaultTheme.palette.primary.light,
        fill: defaultTheme.palette.primary.light,
        height: "70px",
        width: "70px"
    }
};

export default class AccommodationMarker extends React.PureComponent {
    static propTypes = {
        accommodation: accommodationPropTypes.isRequired
    }

    render() {
        const acco = this.props.accommodation;
        switch (acco.type) {
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
