import React from "react";
import * as T from "prop-types";
import { withStyles } from "material-ui/styles";
import Tabs from "material-ui/Tabs";
import Tab from "material-ui/Tabs/Tab";
import Navbar from "../../containers/Navbar";
import { User } from "../../propTypes/userType";
import AccommodationsList from "../../containers/AccommodationsList";

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
});

class AccommodationsTabs extends React.Component {
    state = {
        value: 0,
    };

    get currentTabComponent() {
        switch (this.state.value) {
        case 0:
            return <AccommodationsList />;

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
                            label="Mine"
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
    // eslint-disable-next-line react/no-typos
    user: User.isRequired,
};

export default withStyles(styles)(AccommodationsTabs);
