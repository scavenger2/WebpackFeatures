const path = require('path');
const webpack = require('webpack');
const webpackMerge=require("webpack-merge");
const webpackBaseConfig=require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

var prodConfig = {
	mode: "development",
	output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    devtool: "source-map",// devtool: need to be separated-file & uglify-supported
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        'loader': MiniCssExtractPlugin.loader,
                        'options': {
                            'publicPath': '../'
                        }
                    },
                    'css-loader'
                ]
            }
        ]
    },
	plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_DEV': JSON.stringify('production')
        }),
        new MiniCssExtractPlugin({
            "filename": "[name].css",
            "chunkFilename": "[id].css"
        }),
        new webpack.HashedModuleIdsPlugin(),
		// HTML-Webpack-Plugin for generating PRODUCTION page
        new HtmlWebpackPlugin({
            "title": "Production Page"
        })
		// Hashed-Module-Ids-Plugin (seems not enabled under Production-Mode)
		// Flag-Dependency-Usage-Plugin
		// Flag-Included-Chunks-Plugin
		// Module-Concatenation-Plugin
		// No-Emit-On-Error-Plugin
		// Occurency-Order-Plugin
		// Side-Effects-Flag-Plugin
		// Uglify-JS-Plugin
	],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
};

module.exports = webpackMerge(webpackBaseConfig, prodConfig);
