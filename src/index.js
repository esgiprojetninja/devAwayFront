/* global document */
import "./index.css";
import startApp from "./startApp";
import registerServiceWorker from "./registerServiceWorker";

startApp(document.getElementById("root"));
registerServiceWorker();
