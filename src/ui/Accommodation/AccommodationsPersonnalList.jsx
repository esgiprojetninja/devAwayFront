import React from "react";
import * as T from "prop-types";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
    root: {
        flexGrow: 1,
        minHeight: "calc(100vh - 70px - 48px)",
        backgroundColor: theme.palette.background.paper,
    },
});

class AccommodationsPersonnalList extends React.PureComponent {
    static propTypes = {
        onInit: T.func.isRequired,
    }

    componentDidMount() {
        this.props.onInit();
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                HEY MY ACCOMMODATIONS !
            </div>
        );
    }
}
AccommodationsPersonnalList.propTypes = {
    classes: T.shape({}).isRequired,
    // eslint-disable-next-line react/no-typos
    // user: User.isRequired,
};

export default withStyles(styles)(AccommodationsPersonnalList);
