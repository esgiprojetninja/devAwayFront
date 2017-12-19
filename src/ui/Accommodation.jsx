import React from "react";
import * as T from "prop-types";

import { CircularProgress } from "material-ui/Progress";
import Snackbar from "material-ui/Snackbar";
import IconButton from "material-ui/IconButton";
import CloseIcon from "material-ui-icons/Close";
import Button from "material-ui/Button";

const accommodationPropTypes = T.shape({
    title: T.string,
    id: T.number
});

export default class Accommodation extends React.PureComponent {
    static propTypes = {
        data: T.arrayOf(T.number).isRequired,
        byID: T.arrayOf(accommodationPropTypes).isRequired,
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
            <ul>
                {this.props.data.map(id => (
                    <li>{this.props.byID.get(id).title} | #{this.props.byID.get(id).id}</li>
                ))}
            </ul>
        );
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
            <div>
                <h1>Accommodation</h1>
                <p>{this.props.errorText}</p>
                {this.renderAccommodationList()}
                <Button
                    onClick={this.props.onFetchAccommodationsClicked}
                >
                    Reload
                </Button>
            </div>
        );
    }
}
