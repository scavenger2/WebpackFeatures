var path = require('path');
var webpackCommonConfig = require('./webpack.common.js');
webpackCommonConfig['mode']='development';
delete webpackCommonConfig["output"];
delete webpackCommonConfig["optimization"];
webpackCommonConfig['devtool']="inline-source-map";
var srcMatcher=webpackCommonConfig['module']['rules'][0];
webpackCommonConfig['module']['rules'].push({
    test: srcMatcher['test'],
    include: path.resolve('src'),
    exclude: srcMatcher['exclude'],
    use: {
        loader: 'istanbul-instrumenter-loader',
        options: {
            esModules: true
        }
    },
    enforce: 'post'
});
module.exports = function(config){
    config.set({
        basePath: "./test",
        files: [
            "./webpack.test.js",
            "./source.test.js"
        ],
        exclude: [],
        frameworks: ["jasmine"], 
        preprocessors: {
            './webpack.test.js': ['webpack', 'sourcemap'],
            './source.test.js': ['coverage', 'webpack']
        },

        colors: true,

        client: {
            clearContext: false
        },

        autoWatch: true,

        port: 4000,
        urlRoot: "/karma",

        reporters: ['kjhtml', 'coverage-istanbul'],

        webpack: webpackCommonConfig,

        coverageIstanbulReporter: {
            reports: ['html'],
            dir: path.join(__dirname, 'coverage'),
            fixWebpackSourcePaths: true,
            skipFilesWithNoCoverage: true
        }
    });
}
