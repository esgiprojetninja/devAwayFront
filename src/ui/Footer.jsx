import * as React from "react";
import * as T from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import "animate.css/animate.min.css";
import Grid from "@material-ui/core/Grid";

export class Footer extends React.PureComponent {
    static propTypes = {
        classes: T.shape({
            footer: T.string.isRequired,
            footerList: T.string.isRequired,
            footerListItem: T.string.isRequired,
        }).isRequired,
    };

    render() {
        return (
            <footer className={this.props.classes.footer}>
                <Grid container direction="row" alignItems="center" justify="flex-start">
                    <Grid item xs={12} md={6}>
                        <Typography
                            type="subheading"
                        >
                            <span className="d-block"> d e v a w a y © provides you the best accommodations </span>
                            <span className="d-block"> with a sharing human experience. </span>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container direction="row" alignItems="center" justify="flex-end">
                            <Typography
                                type="subheading"
                            >
                                <span className="d-block"> Public Cloud by <a href="https://github.com/esgiprojetninja/workaway" rel="noopener noreferrer" target="_blank">ESGI Ninja</a></span>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <ul className={this.props.classes.footerList}>
                            <li className={this.props.classes.footerListItem}>
                                <a href="/#devaway-places">Places</a>
                            </li>
                            <li className={this.props.classes.footerListItem}>
                                <a href="/#">Contact us</a>
                            </li>
                            <li className={this.props.classes.footerListItem}>
                                <a href="/#">Cookies policy</a>
                            </li>
                            <li className={this.props.classes.footerListItem}>
                                <a href="/#">Legal terms</a>
                            </li>
                        </ul>
                    </Grid>
                </Grid>
            </footer>
        );
    }
}

export default withStyles(theme => ({
    footer: {
        margin: "auto",
        width: "100%",
        maxWidth: 1200,
        backgroundColor: theme.palette.background.contentFrame,
        padding: "50px"
    },
    footerList: {
        listStyleType: "none",
        display: "inline-flex",
        margin: "15px auto",
        padding: 0
    },
    footerListItem: {
        marginLeft: 0,
        marginRight: "10px"
    },
}))(Footer);
