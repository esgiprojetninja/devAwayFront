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

    get currentTabComponent() {
        switch (this.state.value) {
        case 0:
            return <AccommodationsList />;
        case 1:
            return <AccommodationsPersonnalList />;
        default:
            return <AccommodationsList />;
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div>
                <Navbar burgerColor="#acacac" />
                <div className={classes.root}>
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        classes={{ root: classes.tabsRoot }}
                        textColor="primary"
                        centered
                    >
                        <Tab
                            disableRipple
                            classes={{ root: classes.tabRoot }}
                            label="All"
                        />
                        <Tab
                            disableRipple
                            disabled={!this.props.user.isLoggedIn}
                            classes={{ root: classes.tabRoot }}
                            label="Yours"
                        />
                    </Tabs>
                    {this.currentTabComponent}
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
