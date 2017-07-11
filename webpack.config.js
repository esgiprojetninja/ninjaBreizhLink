const path = require("path");

module.exports = {
    entry: {
        app: "./static/js/index.js"
    },
    output: {
        path: path.resolve(__dirname, "src/main/resources/public/js/"),
        filename: "[name].dist.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [{
                    loader: "babel-loader",
                        options: {
                            presets: ["es2015", "react"],
                            plugins: ["transform-object-rest-spread"]
                        }
                }]
            }
        ]
    },
    devtool: "source-map"
};
