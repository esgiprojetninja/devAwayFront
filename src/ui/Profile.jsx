import React from "react";
import * as T from "prop-types";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import { LinearProgress } from "material-ui/Progress";
import TextField from "material-ui/TextField";
import { withStyles } from "material-ui/styles";

import Guard from "../containers/Guard";

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

    renderProfile() {
        const { classes } = this.props;
        return (
            <form action="">
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
            </form>
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <Grid container>
                    <Grid item sm>
                        <Paper>
                            {this.props.current.isLoading &&
                                <LinearProgress id="getMeProgess" color="accent" mode="query" />
                            }
                            {!this.props.current.isLoading && this.renderProfile()}
                        </Paper>
                    </Grid>
                    <Grid item sm>
                        <Paper>
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
        data: T.shape({
            email: T.string,
            firstName: T.string,
            lastName: T.string,
            username: T.string,
            languages: T.string,
            skills: T.string
        })
    }).isRequired,
    classes: T.shape().isRequired
};

export default withStyles(theme => ({
    container: {
        marginTop: theme.spacing.unit * 10,
        margin: theme.spacing.unit * 2
    }
}))(Profile);
