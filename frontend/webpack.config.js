var HtmlWebpackPlugin = require("html-webpack-plugin");
//var fs = require('fs');

module.exports = {
    mode: "development",
    entry: {
        app: ["babel-polyfill", "./src/index.jsx"]
    },
    output: {
        filename: "[name].[hash].bundle.js",
        chunkFilename: "[name].[hash].chunk.js",
        path: __dirname + "/dist/",
        publicPath: "/"
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    // style-loader
                    { loader: "react-hot-loader/webpack" },
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react"
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(gif|png|jpe?g|svg|webp)$/i,
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
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "fonts/"
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
        hot: true,
        host: "localhost",
        port: 3000
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: "https://api.athenscovid19.com",
            networkId: 4,
            //OLD contractAddress: "0x6cf31252ab0557c4e5a1a535d013ed09350745af"
            contractAddress: "0xEe147CE90122688cB698Bb2F4F60756F698AD2Da"
            //apiUrl: "http://127.0.0.1:8000",
            //networkId: 4447,
            //contractAddress: "0xCfEB869F69431e42cdB54A4F4f105C19C080A601"
        })
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
                vendor: {
                    name: "vendor",
                    chunks: "all",
                    test: /node_modules/,
                    priority: 20
                },
                common: {
                    name: "common",
                    minChunks: 2,
                    chunks: "async",
                    priority: 10,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        }
    }
};
