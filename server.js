/* global process */
const express = require("express");
const next  = require("next");
const passport = require("./app/auth/passportConfig");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

const dev = process.env.NODE_ENV !== "production";
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    const globalData = {};

    function isLoggedIn(req, res, next) {
        if (req.user) {
            console.log(`Authenticated as ${req.user.displayName}`);
            globalData.user = req.user;
        }
        return next();
    }


    server.use(express.static("public"));
    server.use(cookieParser());
    server.use(expressSession({ secret: 'keyboard cat' }));
    server.use(passport.initialize());
    server.use(passport.session());
    server.use(isLoggedIn);

    server.get("/auth/google",
        passport.authenticate("google", {scope: ["https://www.googleapis.com/auth/plus.login"]}));

    server.get("/auth/google/callback",
        passport.authenticate("google", {failureRedirect: "/login", successRedirect: "/"}),
        function (req, res) {
            res.redirect("/");
        });

    server.get("/auth/facebook", passport.authenticate("facebook"));

    server.get("/auth/facebook/callback",
        passport.authenticate("facebook", {successRedirect: "/",
            failureRedirect: "/login"}));

    server.get("/api/me", (req, res) => {
        const user = globalData.user ? globalData.user : {
            displayName: "Not connected"
        };
        res.setHeader("Content-Type", "application/json");
        res.send(user);
    });

    server.get("*", (req, res) => {
        return handle(req, res);
    });

    server.listen(3000, (err) => {
        if (err) {
            throw err;
        }
        console.log("> Ready on http://127.0.0.1:3000");
    });
}).catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
});
