const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

var config = {
	target: "web",
    entry: ["@babel/polyfill", "./src/app.js"],
	output: {
		chunkFilename: '[name].[chunkhash].js' //for dynamic-loading
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
                exclude: [path.resolve(__dirname, 'node_modules')],
                // use: ['babel-loader'],
                use: {
                    loader: "babel-loader",
                    options: {
                        "presets": [
                            [
                                "@babel/preset-env",
                                {
                                    "modules": false,
                                    "useBuiltIns": "entry",
                                    "debug": true
                                }
                            ],
                            "@babel/preset-react"
                        ],
                        "plugins": [
                            "@babel/plugin-syntax-dynamic-import",
                            "@babel/plugin-transform-regenerator",
                            "react-hot-loader/babel",
                            [
                                "@babel/plugin-proposal-decorators",
                                { "legacy": true }
                            ]
                        ]
                    }
                }
		    },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            },
            {
                test: /\.(csv|tsv)$/,
                use: ['csv-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
			{
				test: /\.map/,
				use: ['source-map-loader']
			}
		],
        //sideEffects: [
        //    "*.css"
        //]
	},
	plugins: [
        new CleanWebpackPlugin(["dist"]),
        new ManifestPlugin() // for extracting an asset manifest file for easy consumption
		// Chunk-Manifest-Plugin for Long-Term-Caching
	],
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
};

module.exports = config;
