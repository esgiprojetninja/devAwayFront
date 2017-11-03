export default function apiRoutes(server, globalData) {
    server.get("/api/me", (req, res) => {
        const user = globalData.user ? globalData.user : {
            displayName: "Not connected"
        };
        res.setHeader("Content-Type", "application/json");
        res.send(user);
    });
}