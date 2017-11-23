const {User} = require("./schemas");
const graphqlHTTP =  require("express-graphql");



function apiRoutes(server, globalData) {
    server.get("/api/me", (req, res) => {
        const user = globalData.user ? globalData.user : {};
        res.setHeader("Content-Type", "application/json");
        res.send(user);
    });
    server.use("/api/qraphql", graphqlHTTP({
        schema: User,
        rootValue: {
            name: () => {
                return globalData.user ? globalData.user.displayName : "";
            },
            id: () => {
                return globalData.user ? globalData.user.id : "";
            }
        },
        graphiql: true
    }));
}

/* global module */
module.exports = apiRoutes;
