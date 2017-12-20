import React from "react";
import * as T from "prop-types";
import { CircularProgress } from "material-ui/Progress";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import TextField from "material-ui/TextField";
import {
    User
} from "../propTypes/userType";

export default class LogBox extends React.PureComponent {
    static propTypes = {
        data: User.isRequired,
        isLoading: T.bool.isRequired,
        hasError: T.bool.isRequired,
        errorText: T.string.isRequired,
        onSubmit: T.func.isRequired
    };

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUsernameChange = this.handleChange.bind(this, "username");
        this.handlePasswordChange = this.handleChange.bind(this, "password");
        this.state = {
            username: "",
            password: ""
        };
    }

    handleChange(property, ev) {
        this.setState({
            [property]: ev.target.value
        });
    }

    handleSubmit(ev) {
        ev.preventDefault();
        const { username, password } = this.state;
        this.props.onSubmit({
            username,
            password
        });
    }

    renderErrors() {
        return this.props.hasError
            ? (
                <Typography>
                    {this.props.errorText}
                </Typography>
            )
            : null;
    }

    renderLoggedBox() {
        return (
            <Typography>
                {this.props.data.username}
            </Typography>
        );
    }

    renderLogBox() {
        return (
            <form
                onSubmit={this.handleSubmit}
            >
                <CardContent>
                    <TextField
                        error={this.props.hasError}
                        type="text"
                        name="username"
                        id="username"
                        onChange={this.handleUsernameChange}
                    />
                    <TextField
                        error={this.props.hasError}
                        type="password"
                        name="pwd"
                        id="pwd"
                        onChange={this.handlePasswordChange}
                    />
                    {this.renderErrors()}
                </CardContent>
                <CardActions>
                    <Button
                        type="submit"
                    >
                        Login
                    </Button>
                </CardActions>
            </form>
        );
    }

    renderBox() {
        if (this.props.isLoading) {
            return <CircularProgress />;
        }
        return this.props.data.id ? this.renderLoggedBox() : this.renderLogBox();
    }

    render() {
        return (
            <Card>
                {this.renderBox()}
            </Card>
        );
    }
}
