var HtmlWebpackPlugin = require("html-webpack-plugin");
//var fs = require('fs');

module.exports = {
    mode: "development",
    entry: ["babel-polyfill", "./src/index.jsx"],
    resolve: {
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    "file-loader",
                    {
                        loader: "image-webpack-loader",
                        options: {
                            bypassOnDebug: true, // webpack@1.x
                            disable: true // webpack@2.x and newer
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],
    devServer: {
        historyApiFallback: true,
        //http2: true,
        //https: {
        //    key: fs.readFileSync('./keys/server.key'),
        //    cert: fs.readFileSync('./keys/server.crt'),
        //    ca: fs.readFileSync('./keys/server.pem'),
        //}
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: "http://127.0.0.1:8000",
            networkId: 4447,
            contractAddress: "0xCfEB869F69431e42cdB54A4F4f105C19C080A601"
        })
    }
};
