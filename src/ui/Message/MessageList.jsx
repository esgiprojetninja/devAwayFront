import React from "react";
import * as T from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import LinearProgress from "@material-ui/core/LinearProgress";
// import Grid from "@material-ui/core/Grid";

import Navbar from "../../containers/Navbar";

const styles = theme => ({
    root: {
        flex: 1,
        margin: theme.spacing.unit * 2
    }
});

class MessageList extends React.PureComponent {
    componentDidMount() {
        this.props.onInit();
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Navbar />
                COUCOU
            </div>
        );
    }
}

MessageList.propTypes = {
    classes: T.shape({
    }).isRequired,
    // messages: T.shape({
    // }).isRequired,
    onInit: T.func.isRequired,
};

export default withStyles(styles)(MessageList);
