// testing
// start Webpack-Dev-Server, it requires
//     1. to serve multiple sites from different folders
//     2. Hot-Module-Replacement

const path={};
const gulp=require("gulp");
const gutil=require("gulp-util");

// generate JS-DOC
const jsdoc=require("gulp-jsdoc3");
gulp.task("jsdoc", function(callback){
});

// start Webpack-Dev-Server
const webpack=require("webpack");
const webpackMerge=require("webpack-merge");
const webpackDevServer=require("webpack-dev-server");
const DEV_SERVER_PORT=3000;
gulp.task("webpack-dev-server", function(callback){
    new webpackDevServer(
            webpack(
                webpackMerge(
                    require("./webpack.common.js"), //Base Config, 
                    require("./webpack.dev.js") //Dev Config
                )
            )
        ).listen(
            DEV_SERVER_PORT,
            "localhost",
            function(err){
                if(err) throw new gutil.PluginError("Chrome-Plugin-Error", err);
                gutil.log(
                        "CHROME_PLUGIN_DEV_SERVER",
                        "http://localhost:"+DEV_SERVER_PORT+"/CHROME_PLUGIN/index.html"
                );
            }
        )
});
