import React from "react";
import * as T from "prop-types";

import Card, { CardActions, CardContent } from "material-ui/Card";
import { CircularProgress } from "material-ui/Progress";
import List, { ListItem, ListItemText, ListItemSecondaryAction } from "material-ui/List";
import Snackbar from "material-ui/Snackbar";
import IconButton from "material-ui/IconButton";
import CloseIcon from "material-ui-icons/Close";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import SettingsIcon from "material-ui-icons/Settings";

import {
    boxes
} from "../styles/theme";

const accommodationShape = {
    title: T.string,
    id: T.number,
    city: T.string,
    region: T.string,
    country: T.string,
    hasInternet: T.bool,
    description: T.string
};
const accommodationPropTypes = T.shape(accommodationShape);

export default class Accommodation extends React.PureComponent {
    static propTypes = {
        accommodations: T.arrayOf(accommodationPropTypes).isRequired,
        isLoading: T.bool.isRequired,
        current: T.shape({
            data: accommodationPropTypes,
            isLoading: T.bool
        }).isRequired,
        hasError: T.bool.isRequired,
        errorText: T.string.isRequired,
        onFetchAccommodationsClicked: T.func.isRequired
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

    renderAccommodationList() {
        if (this.props.isLoading) {
            return (
                <CircularProgress />
            );
        }
        return (
            <List style={boxes.scrollBox(40, "vh")}>
                {this.renderListItems()}
            </List>
        );
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
            <Card>
                <CardContent>
                    <Typography type="headline" component="h3">Accommodation</Typography>
                    <Typography component="p">{this.props.errorText}</Typography>
                    {this.renderAccommodationList()}
                </CardContent>
                <CardActions>
                    <Button
                        onClick={this.props.onFetchAccommodationsClicked}
                    >
                        Reload
                    </Button>
                </CardActions>
            </Card>
        );
    }
}
