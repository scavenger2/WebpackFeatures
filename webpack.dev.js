const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");

var config = {
	mode: "development",
	output: {
		path: path.resolve(__dirname, 'dev'),
        publicPath: '/',
		filename: '[name].js'
	},
	devtool: 'inline-source-map',
    devServer: {
        contentBase: "./dev",
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
	plugins: [
		// Source-Map-Dev-Tool-Plugin for using Source-Map in DEV, could replace 'devtool' option above
		// HTML-Webpack-Plugin for generating DEV page
        new HtmlWebpackPlugin({
            "title": "Development Page"
        }),
        // Hot Module Replacement(HMR)
        new webpack.HotModuleReplacementPlugin()
		// Named-Modules-Plugin
		// Named-Chunks-Plugin
		// ES-Lint
	],
    optimization: {
        namedModules: true
    }
}

module.exports = config;
