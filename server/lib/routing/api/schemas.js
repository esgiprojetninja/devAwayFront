const {buildSchema} = require("graphql");

const User = buildSchema(`
    type Query {
        id: String
        name: String
    }
`);

/* global module */
module.exports = {
    User
};

