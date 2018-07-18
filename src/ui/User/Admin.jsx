import React from "react";
import * as T from "prop-types";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TablePagination from "@material-ui/core/TablePagination";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";

import Home from "../../containers/Home";
import NavBar from "../../containers/Navbar";
import FooterComp from "../../ui/Footer";
import { darkGrey } from "../../styles/theme";
import { accommodationReducerPropTypes } from "../../propTypes/accommodation.reducer.d";
import { DATE_FORMAT, HOUR_FORMAT } from "../../utils/mission";
import { getAccoImg } from "../../utils/accommodation";

const isAdmin = (props) => {
    const { user } = props;
    return user.isLoggedIn
        && user.data
        && user.data.roles
        && user.data.roles === 1;
};

const cutString = (string, num = 30) => {
    if (string.length < 30) return string;
    return `${string.slice(0, num)}...`;
};

class UserDetail extends React.PureComponent {
    state = {
        rowsPerPage: 5,
        page: 0,
    }

    componentDidMount() {
        if (isAdmin(this.props)) {
            this.props.onInit();
        }
    }

    componentWillReceiveProps(props) {
        if (isAdmin(props) && !isAdmin(this.props)) {
            this.props.onInit();
        }
    }

    get accommodations() {
        const { accommodation } = this.props;
        if (!accommodation.data || !accommodation.data.length) return [];
        return accommodation.data.map(accoId => accommodation.byID.get(accoId));
    }

    get isLoading() {
        return this.props.user.isLoading
            || this.props.accommodation.isLoading;
    }

    handleAccoDete = accoId => () => {
        if (this.props.accommodation.isLoading) return;
        this.props.deleteAcco(accoId);
    }

    handleChangePage = () => (event, page) => {
        this.setState({
            page,
        });
    }

    handleChangeRowsPerPage = () => (event) => {
        this.setState({
            rowsPerPage: event.target.value || 1,
        });
    }

    renderRow(acco) {
        const { classes } = this.props;
        return (
            <TableRow key={acco.id}>
                <TableCell numeric>{acco.id}</TableCell>
                <TableCell numeric>
                    <Avatar
                        className={classes.placeAvatar}
                        src={getAccoImg(acco)}
                    />
                </TableCell>
                <TableCell numeric>{acco.user_id}</TableCell>
                <TableCell>{cutString(acco.title)}</TableCell>
                <TableCell>{cutString(acco.description || "Ungiven")}</TableCell>
                <TableCell>{cutString(acco.address || "Ungiven", 10)}</TableCell>
                <TableCell>{cutString(acco.city || "Ungiven")}</TableCell>
                <TableCell>{cutString(acco.country || "Ungiven")}</TableCell>
                <TableCell>{moment(acco.created_at, `${DATE_FORMAT} ${HOUR_FORMAT}:ss`).format("MMMM Do YYYY")}</TableCell>
                <TableCell>{moment(acco.updated_at, `${DATE_FORMAT} ${HOUR_FORMAT}:ss`).format("MMMM Do YYYY")}</TableCell>
                <TableCell numeric>
                    <div>
                        <IconButton
                            color="primary"
                            aria-haspopup="true"
                            disabled={this.props.accommodation.isLoading}
                            onClick={this.handleAccoDete(acco.id)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </TableCell>
            </TableRow>
        );
    }

    renderPlacesTable() {
        const { classes } = this.props;
        const { accommodations } = this;
        const { page, rowsPerPage } = this.state;
        return (
            <Paper className={classes.paper}>
                <div>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell numeric>ID</TableCell>
                                <TableCell>DefaultPicture</TableCell>
                                <TableCell numeric>User_ID</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>City</TableCell>
                                <TableCell>Country</TableCell>
                                <TableCell>Creation</TableCell>
                                <TableCell>Last update</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {accommodations
                                .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                                .map(acco => this.renderRow(acco))}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    component="div"
                    count={accommodations.length}
                    rowsPerPage={this.state.rowsPerPage || 5}
                    page={this.state.page || 0}
                    backIconButtonProps={{
                        "aria-label": "Previous Page",
                    }}
                    nextIconButtonProps={{
                        "aria-label": "Next Page",
                    }}
                    onChangePage={this.handleChangePage()}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage()}
                />
            </Paper>
        );
    }

    render() {
        if (!isAdmin(this.props)) {
            return (<Home />);
        }
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <NavBar burgerColor={darkGrey} />
                {this.isLoading &&
                    <LinearProgress color="primary" mode="query" />}
                <Grid className={classes.container} container direction="column" alignItems="center" justify="center">
                    <Typography variant="headline" className={classes.title} color="inherit">
                        Hello dear wised administrator
                    </Typography>
                    {this.renderPlacesTable()}
                </Grid>
                <div style={{ marginTop: 150 }}>
                    <FooterComp />
                </div>
            </div>
        );
    }
}

UserDetail.propTypes = {
    accommodation: accommodationReducerPropTypes.isRequired,
    onInit: T.func.isRequired,
    deleteAcco: T.func.isRequired,
    user: T.shape({
        isLoggedIn: T.bool.isRequired,
        isLoading: T.bool.isRequired,
        isGettingData: T.bool.isRequired,
        fetchedUser: T.shape({
            userName: T.string.isRequired,
            avatar: T.string.isRequired,
        }),
    }).isRequired,
    classes: T.shape().isRequired,
};

export default withStyles(theme => ({
    root: {
        flex: 1,
        margin: theme.spacing.unit * 2,
    },
    title: {
        color: theme.palette.primary.darkGrey,
        margin: theme.spacing.unit * 2,
    },
    paper: {
        margin: theme.spacing.unit * 2,
        width: "100%",
        overflowX: "auto",
    },
    container: {
        width: "100%",
        maxWidth: 1480,
        margin: "auto",
    },
    palceAvatar: {
        width: 40,
        height: 40
    },
}))(UserDetail);
