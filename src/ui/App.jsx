import * as React from "react";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";

import Navbar from "./Navbar.jsx";
import LogBox from "../containers/LogBox";
import Accommodation from "../containers/Accommodation";

import {
    paper
} from "../styles/theme.js";

const App = () => (
    <div>
        <Navbar />
        <Grid container>
            <Grid item xs={12} sm={6}>
                <Paper style={paper.paperBox}>
                    <LogBox />
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Paper style={paper.paperBox}>
                    <Accommodation />
                </Paper>
            </Grid>
        </Grid>
    </div>
);

export default App;
