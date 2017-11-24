/* global process */
const express = require("express");
const next  = require("next");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

const env = require("../../.env");
const apiRoutes = require("./routing/api/api");

const dev = process.env.NODE_ENV !== "production";
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    const globalData = {env};

    server.use(express.static("public"));
    server.use(cookieParser());
    server.use(expressSession({secret: "keyboard cat"}));

    // API
    apiRoutes(server, globalData);

    server.get("*", (req, res) => {
        return handle(req, res);
    });

    server.listen(3000, "0.0.0.0", (err) => {
        if (err) {
            throw err;
        }
        console.log("> Ready on http://127.0.0.1:3000");
    });

}).catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
});
