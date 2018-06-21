import React from "react";
import * as T from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

class Guard extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            data,
            hasError,
            errorText
        } = this.props;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    {this.renderButton()}

                </form>
                <div>
                    {hasError &&
                        <Typography color="error" >{errorText}</Typography>
                    }
                    <p>{data.code}</p>
                </div>
            </div>
        );
    }
}

Guard.propTypes = {
    data: T.shape({
        email: T.string
    }).isRequired,
    hasError: T.bool.isRequired,
    errorText: T.string.isRequired,
    isLoading: T.bool.isRequired,
    onFormSubmit: T.func.isRequired
};

export default withStyles()(Guard);
