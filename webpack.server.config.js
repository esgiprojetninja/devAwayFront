const path = require("path");

module.exports = function (env) {
    return [{
        entry: {
            server: "./server/lib/server.js"
        },
        output: {
            path: path.resolve(__dirname, "server/dist"),
            filename: "server.dist.js"
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: [{
                        loader: "babel-loader",
                        options: {
                            presets: ["stage-2", "react"],
                            plugins: ["transform-object-rest-spread"]
                        }
                    }]
                }
            ]
        },
        devtool: "eval"
    }];
};
