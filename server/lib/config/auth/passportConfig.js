const env = require("../../../../.env.js");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

passport.use(new GoogleStrategy({
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
function (accessToken, refreshToken, profile, done) {
    // User.findOrCreate({googleId: profile.id}, function (err, user) {
    //     return done(err, user);
    // });
    return profile.displayName ? done(null, profile) : done("Couldn't authenticate");
}));

passport.use(new FacebookStrategy({
    clientID: env.FACEBOOK_APP_ID,
    clientSecret: env.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback"
},
function (accessToken, refreshToken, profile, done) {
    // User.findOrCreate({facebookId: profile.id}, function(err, user) {
    //   if (err) { return done(err); }
    //   done(null, user);
    // });
    return profile.displayName ? done(null, profile) : done("Couldn't authenticate");
}
));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

/* global module */
module.exports = passport;
