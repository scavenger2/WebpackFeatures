var webpackCommonConfig = require('./webpack.common.js');
webpackCommonConfig['mode']='development';
module.exports = function(config){
    config.set({
        basePath: "./test/unitTest",
        files: [
            "./webpack.test.js",
            "./**/*.spec.js"
        ],
        exclude: [],
        frameworks: ["jasmine"], 
        preprocessors: {
            'webpack.test.js': ['webpack', 'sourcemap']
        },

        colors: true,

        autoWatch: true,

        port: 4000,
        urlRoot: "/karma",

        reporters: ['kjhtml'],

        webpack: webpackCommonConfig
    });
}
