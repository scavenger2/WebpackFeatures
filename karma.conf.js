var webpackCommonConfig = require('./webpack.common.js');
webpackCommonConfig['mode']='development';
delete webpackCommonConfig["output"];
delete webpackCommonConfig["optimization"];
webpackCommonConfig['devtool']="inline-source-map";
module.exports = function(config){
    config.set({
        basePath: "./test",
        files: [
            "./webpack.test.js"
        ],
        exclude: [],
        frameworks: ["jasmine"], 
        preprocessors: {
            './webpack.test.js': ['webpack', 'sourcemap']
        },

        colors: true,

        client: {
            clearContext: false
        },

        autoWatch: true,

        port: 4000,
        urlRoot: "/karma",

        reporters: ['kjhtml'],

        webpack: webpackCommonConfig
    });
}
