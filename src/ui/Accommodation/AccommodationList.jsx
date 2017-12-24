import React from "react";
import * as T from "prop-types";

import List, { ListItem, ListItemText, ListItemSecondaryAction } from "material-ui/List";
import IconButton from "material-ui/IconButton";
import SettingsIcon from "material-ui-icons/Settings";

import {
    accommodationPropTypes
} from "../../propTypes/accommodationType";
import {
    boxes
} from "../../styles/theme";

export default class AccommodationList extends React.PureComponent {
    static propTypes = {
        accommodations: T.arrayOf(accommodationPropTypes).isRequired,
        onAccommodationDetailClicked: T.func.isRequired
    }

    constructor(props) {
        super(props);
        this.handleItemClicked = this.handleItemClicked.bind(this);
    }

    handleItemClicked(id) {
        this.props.onAccommodationDetailClicked(id);
    }

    renderListItems() {
        return this.props.accommodations.map(a => (
            <ListItem
                key={a.id}
            >
                <ListItemText
                    key={a.id}
                    primary={`${a.title} | #${a.id}`}
                />
                <ListItemSecondaryAction>
                    <IconButton
                        aria-label="Delete"
                        data-accommodation={a.id}
                        onClick={() => this.handleItemClicked(a.id)}
                    >
                        <SettingsIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        ));
    }

    render() {
        return (
            <List style={boxes.scrollBox(40, "vh")}>
                {this.renderListItems()}
            </List>
        );
    }
}
