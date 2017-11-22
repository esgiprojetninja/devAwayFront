/* global process */
const express = require("express");
const next  = require("next");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const graphqlHTTP =  require("express-graphql");
var {buildSchema} = require('graphql');

const passport = require("./config/auth/passportConfig");
const apiRoutes = require("./routing/api/api");
const authRoutes = require("./routing/auth/auth");

const dev = process.env.NODE_ENV !== "production";
const app = next({dev});
const handle = app.getRequestHandler();

// Express-graphql tuto | TODO: move this away

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
    type Query {
        hello: String
    }
`);

// The root provides a resolver function for each API endpoint
var root = {
    hello: () => {
        return "Hello world!";
    }
};

app.prepare().then(() => {
    const server = express();

    server.use("/graphql", graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true
    }));

    const globalData = {};

    function isLoggedIn(req, res, next) {
        if (req.user) {
            globalData.user = req.user;
        }
        return next();
    }


    server.use(express.static("public"));
    server.use(cookieParser());
    server.use(expressSession({secret: "keyboard cat"}));
    server.use(passport.initialize());
    server.use(passport.session());
    server.use(isLoggedIn);

    // Passport
    authRoutes(server, globalData);

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
