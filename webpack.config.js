const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, "target"),
        filename: "scripts.bundle.js"
    },

    module: {
        rules: [
            {
                test: /\.jsx$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css-loader')
            },
            {
                test: /.*node_modules.*\.(svg|gif|png|eot|ttf|woff|woff2)$/,
                loader: "file-loader",
                options: {
                    name: "lib/[path][name].[ext]",
                    context: "node_modules"
                }
            }
        ]
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },

    plugins: [
        new ExtractTextPlugin("styles.bundle.css")
    ]
};
