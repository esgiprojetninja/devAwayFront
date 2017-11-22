function apiRoutes(server, globalData) {
    server.get("/api/me", (req, res) => {
        const user = globalData.user ? globalData.user : {};
        res.setHeader("Content-Type", "application/json");
        res.send(user);
    });
}

/* global module */
module.exports = apiRoutes;
