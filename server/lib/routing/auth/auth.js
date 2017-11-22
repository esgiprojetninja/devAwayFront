const passport = require("../../config/auth/passportConfig");

function authRoutes(server, globalData) {

    server.get("/auth/google",
        passport.authenticate("google", {scope: ["https://www.googleapis.com/auth/plus.login"]}));
    server.get(
        "/auth/google/callback",
        passport.authenticate("google", {failureRedirect: "/login"}),
        function (req, res) {
            res.redirect("/");
        }
    );

    server.get("/auth/facebook", passport.authenticate("facebook"));
    server.get("/auth/facebook/callback",
        passport.authenticate("facebook", {successRedirect: "/",
            failureRedirect: "/login"}));

    server.get("/logout", function (req, res) {
        globalData.user = {};
        req.logout();
        res.redirect("/");
    });
}

/* global module */
module.exports = authRoutes;
