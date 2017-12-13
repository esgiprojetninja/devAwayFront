import * as React from "react";

import Navbar from "./Navbar.jsx";
import LogBox from "../containers/LogBox";
import Accommodation from "../containers/Accommodation";

const App = () => (
    <div>
        <Navbar />
        <LogBox />
        <Accommodation />
    </div>
);

export default App;
