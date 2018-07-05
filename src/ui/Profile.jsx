import React from "react";
import * as T from "prop-types";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

import Guard from "../containers/Guard";
import Navbar from "../containers/Navbar";

export class Profile extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.props.onGetMe();
    }

    handleChange(ev) {
        const { value, id } = ev.target;
        this.props.onProfileChanged(id, value);
    }
    handleAddImg = (e) => {
        e.preventDefault();
        const reader = new global.FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            if (reader.result.indexOf("data:image/") > -1) {
                // @TODO call pic updater
                console.log("POULAAAY", reader.result);
            }
        };
        reader.readAsDataURL(file);
    }

    renderUserImage() {
        const imgUrl = this.props.current.data.avatar;
        const { classes } = this.props;
        return (
            <div className="full-width display-flex-row">
                <div className={classes.imgWrapper}>
                    {
                        imgUrl && <Avatar
                            alt="Adelle Charles"
                            src={`data:image/jpeg;base64,${imgUrl}`}
                            className={classes.avatar}
                        />
                    }
                    <input
                        type="file"
                        name="profile-picture"
                        accept="image/*"
                        className={classes.inputImgEdit}
                        onChange={this.handleAddImg}
                    />
                </div>
            </div>
        );
    }

    renderProfile() {
        const { classes } = this.props;
        return (
            <div>
                <TextField
                    id="email"
                    label="Email"
                    type="email"
                    className={classes.textField}
                    value={this.props.current.data.email}
                    onChange={this.handleChange}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    id="firstName"
                    label="First Name"
                    className={classes.textField}
                    value={this.props.current.data.firstName}
                    onChange={this.handleChange}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    id="lastName"
                    label="Last Name"
                    className={classes.textField}
                    value={this.props.current.data.lastName}
                    onChange={this.handleChange}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    id="userName"
                    label="User Name"
                    className={classes.textField}
                    value={this.props.current.data.username}
                    onChange={this.handleChange}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    id="languages"
                    label="Languages"
                    className={classes.textField}
                    value={this.props.current.data.languages}
                    onChange={this.handleChange}
                    margin="normal"
                    helperText="Languages separated with a coma"
                    fullWidth
                    multiline
                />
                <TextField
                    id="skills"
                    label="Skills"
                    className={classes.textField}
                    value={this.props.current.data.skills}
                    onChange={this.handleChange}
                    margin="normal"
                    helperText="Skills separated with a coma"
                    fullWidth
                    multiline
                />
            </div>
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Navbar />
                <Grid container spacing={24} className={classes.container}>
                    <Grid item xs={12}>
                        <Typography color="inherit" component="h2" variant="headline">
                            Your informations
                        </Typography>
                    </Grid>

                    {this.renderUserImage()}

                    <Grid item xs={12}>
                        <Paper className={classes.paper} >
                            {this.props.current.isLoading &&
                                <LinearProgress id="getMeProgess" color="primary" mode="query" />
                            }
                            {this.props.current.isLoggedIn && this.renderProfile()}
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Guard />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Profile.propTypes = {
    onGetMe: T.func.isRequired,
    onProfileChanged: T.func.isRequired,
    current: T.shape({
        isLoading: T.bool.isRequired,
        isLoggedIn: T.bool.isRequired,
        data: T.shape({
            email: T.string,
            firstName: T.string,
            lastName: T.string,
            username: T.string,
            languages: T.string,
            skills: T.string,
            avatar: T.string,
        })
    }).isRequired,
    classes: T.shape().isRequired
};

export default withStyles(theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        margin: theme.spacing.unit * 2,
        overflow: "hidden",
    },
    imgWrapper: {
        margin: "auto",
        width: 90,
        height: 90,
        overflow: "hidden",
        borderRadius: "100%",
        position: "relative",
        cursor: "pointer",
        "&:hover > *": {
            transform: "rotate(5deg)"
        },
    },
    avatar: {
        width: "100%",
        height: "100%",
        transition: "transform .2s ease-in-out",
    },
    inputImgEdit: {
        width: "105%",
        height: "105%",
        position: "absolute",
        cursor: "pointer",
        opacity: 0,
        top: 0,
        left: 0,
    },
    container: {
        width: "100%",
        maxWidth: "720px",
        margin: "auto",
    },
    paper: {
        padding: theme.spacing.unit * 2
    }
}))(Profile);
