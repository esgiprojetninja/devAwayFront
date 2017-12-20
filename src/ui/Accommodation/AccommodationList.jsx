import React from "react";
import * as T from "prop-types";

import List, { ListItem, ListItemText, ListItemSecondaryAction } from "material-ui/List";
import SettingsIcon from "material-ui-icons/Settings";
import IconButton from "material-ui/IconButton";

import {
    accommodationPropTypes
} from "../../propTypes/accommodationType";
import {
    boxes
} from "../../styles/theme";

export default class AccommodationList extends React.PureComponent {
    static propTypes = {
        accommodations: T.arrayOf(accommodationPropTypes).isRequired
    }

    renderListItems() {
        return this.props.accommodations.map(a => (
            <ListItem key={a.id}>
                <ListItemText
                    key={a.id}
                    primary={`${a.title} | #${a.id}`}
                />
                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete">
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
