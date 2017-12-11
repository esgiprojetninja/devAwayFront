/* global document */
import "./index.css";
import startApp from "./startApp.jsx";
import registerServiceWorker from "./registerServiceWorker";

startApp(document.getElementById("root"));
registerServiceWorker();
