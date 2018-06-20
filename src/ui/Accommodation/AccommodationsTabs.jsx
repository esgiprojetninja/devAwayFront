import React from "react";
import * as T from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Navbar from "../../containers/Navbar";
import AccommodationsList from "../../containers/AccommodationsList";
import AccommodationsPersonnalList from "../../containers/AccommodationsPersonnalList";

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    tabsRoot: {
        borderBottom: "none",
    },
    tabRoot: {
        textTransform: "initial",
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing.unit * 4,
        "&:hover": {
            color: theme.palette.primary.main,
            opacity: 1,
        },
        "&$tabSelected": {
            color: theme.palette.primary.main,
            fontWeight: theme.typography.fontWeightMedium,
        },
        "&:focus": {
            color: theme.palette.primary.main,
        },
    },
    tabSelected: {},
});

class AccommodationsTabs extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    renderCurrentTab() {
        switch (this.state.value) {
        case 0:
            return <AccommodationsList />;
        case 1:
            return <AccommodationsPersonnalList />;
        default:
            return <AccommodationsList />;
        }
    }

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div>
                <Navbar burgerColor="#acacac" {...this.props} />
                <div className={classes.root}>
                    <Tabs
                        id="ahokfdp"
                        value={value}
                        onChange={this.handleChange}
                        classes={{ root: classes.tabsRoot }}
                        textColor="primary"
                        centered
                    >
                        <Tab
                            id="all-places-toggler"
                            disableRipple
                            classes={{ root: classes.tabRoot }}
                            label="All"
                            value={0}
                        />
                        <Tab
                            id="user-places-toggler"
                            disableRipple
                            disabled={!this.props.user.isLoggedIn}
                            classes={{ root: classes.tabRoot }}
                            label="Yours"
                            value={1}
                        />
                    </Tabs>
                    {this.renderCurrentTab()}
                </div>
            </div>
        );
    }
}

AccommodationsTabs.propTypes = {
    classes: T.shape({}).isRequired,
    user: T.shape({
        isLoggedIn: T.bool.isRequired,
    }).isRequired,
};

export default withStyles(styles)(AccommodationsTabs);
