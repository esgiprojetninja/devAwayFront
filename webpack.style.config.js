const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function (env) {
    return [{
        // Style part
        entry: {
            tui: "./static/sass/main.scss"
        },
        output: {
            path: path.resolve(__dirname, "public/css"),
            filename: "tui.css"
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: ["css-loader", "sass-loader"]
                    })
                },
                {
                    test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                    loader: "url-loader",
                    options: {
                        includePaths: [path.resolve(__dirname, "public/font")]
                    }
                }
            ]
        },
        resolve: {
            alias: {
                fonts: path.resolve(__dirname, "public/font")
            }
        },
        devtool: "source-map",
        plugins: [
            new ExtractTextPlugin({
                filename: "styles.css"
            })
        ]
    }];
};
