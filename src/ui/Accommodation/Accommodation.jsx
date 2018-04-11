import React from "react";
import * as T from "prop-types";
import { CircularProgress } from "material-ui/Progress";
import { accommodationReducerPropTypes } from "../../propTypes/accommodation.reducer.d";

export default class Accommodation extends React.PureComponent {
    static propTypes = {
        isLoading: T.bool.isRequired,
        onInit: T.func.isRequired,
        accommodation: accommodationReducerPropTypes.isRequired
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
        const { accommodation } = this.props;
        return (
            <ul>
                {
                    accommodation.data.map((accoID) => {
                        const filledAcco = accommodation.byID.get(accoID);
                        return (
                            <li>{JSON.stringify(filledAcco)}</li>
                        );
                    })
                }
            </ul>
        );
    }

    render() {
        return (
            <div>
                <h2>Accommodations</h2>
                { this.renderAccommodationList() }
            </div>
        );
    }
}
