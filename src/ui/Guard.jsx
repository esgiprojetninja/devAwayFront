import React from "react";
import * as T from "prop-types";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import { FormControl } from "material-ui/Form";
import { LinearProgress } from "material-ui/Progress";

class Guard extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(ev) {
        const { value, id } = ev.target;
        this.props.onCredentialChange(id, value);
    }

    handleSubmit(ev) {
        ev.preventDefault();
        this.props.onFormSubmit();
    }

    renderButton() {
        if (this.props.isLoading) {
            return <LinearProgress mode="query" />;
        }
        return (
            <Button
                color="primary"
                type="submit"
            >
                Get my guard code
            </Button>
        );
    }

    render() {
        const {
            classes,
            data,
            hasError,
            errorText
        } = this.props;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="email"
                            type="text"
                            placeholder="Email"
                            value={data.email}
                            onChange={this.handleChange}
                            error={hasError}
                            helperText={errorText}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            error={hasError}
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={this.handleChange}
                        />
                    </FormControl>
                    {this.renderButton()}
                </form>
                <div>
                    <p>{data.code}</p>
                </div>
            </div>
        );
    }
}

Guard.propTypes = {
    classes: T.shape({}).isRequired,
    data: T.shape({
        email: T.string
    }).isRequired,
    hasError: T.bool.isRequired,
    errorText: T.string.isRequired,
    isLoading: T.bool.isRequired,
    onCredentialChange: T.func.isRequired,
    onFormSubmit: T.func.isRequired
};

export default withStyles()(Guard);
