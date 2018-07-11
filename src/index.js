/* global document */
import "./index.css";
import startApp from "./startApp.jsx";
import registerServiceWorker from "./registerServiceWorker";

const G_KEY = process.env.REACT_APP_GOOGLE_MAP_KEY;

const gScript = document.createElement("script");
gScript.setAttribute("src", `https://maps.googleapis.com/maps/api/js?key=${G_KEY}&libraries=places`);
gScript.onload = () => {
    startApp(document.getElementById("root"));
    registerServiceWorker();
    document.body.removeChild(gScript);
};
document.body.appendChild(gScript);
gScript.onfail = () => {
    // @TODO pass on a "no-map" variable
    console.log("POULAYMAN");
    startApp(document.getElementById("root"));
    registerServiceWorker();
    document.body.removeChild(gScript);
};
