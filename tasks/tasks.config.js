/* -------------------------------------------------------------------- */
/*
    Config Init
    Copyright: Adrian David Smith 2017
*/
/* -------------------------------------------------------------------- */

var chalk = require("chalk");

module.exports = function(grunt){

    grunt.initConfig({

        // read config files
        pkg: grunt.file.readJSON("package.json"),

        // copy files
        sync: {
            main: {
                files: [
                    {cwd: "src/", src: ["**/*.*"], dest: "build/"}
                ],
                verbose: true,
                pretend: false,
                failOnError: true,
                ignoreInDest: "**/*.css",
                updateAndDelete: true

            }
        },

        // delete files and folders
        clean: {
            build: ["build"],
            cache: ["config/cache"]
        },

        // css minification
        cssmin: {
            app: {
                files: [{
                    expand: true,
                    cwd: "build/css",
                    src: ["*.css", "!*.min.css"],
                    dest: "build/css",
                    ext: ".css"
                }]
            }
        },

        // javascript minification and concatination
        uglify: {
            app: {
              files: [{
                  expand: true,
                  cwd: "build/app/",
                  src: "**/*.js",
                  dest: "build/app"
              }]
            }
        },

        // image minificaiton
        image: {
            options: {
                pngquant: true,
                optipng: false,
                zopflipng: true,
                advpng: true,
                jpegRecompress: false,
                jpegoptim: true,
                mozjpeg: true,
                gifsicle: true,
                svgo: true
            },
            build: {
                files: [{
                    expand: true,
                    cwd: "build/",
                    src: ["**/*.{png,jpg,gif}"],
                    dest: "build/"
                }]
            }
        },

        // javascript lint
        jscs: {
            src: "src/**/*.js",
            options: {
                config: "config/jscs.json"
            }
        },

        // cache layer
        newer: {
            options: {

                override: function(detail, include){

                    if(detail.task === "less"){
                        checkForModifiedImports(detail.path, detail.time, include);
                    }
                    else{

                        grunt.log.writeln("Task: " + chalk.yellow.bold(detail.task) + " "
                            + chalk.yellow(detail.path) + chalk.white(" was last cached at ")
                            + chalk.yellow(detail.time.toString()));

                        include(false);

                    }

                },

                cache: "config/cache/"

            }
        },

        // javascript completixy analysis
        complexity: {

            js: {

                src: "src/app/**/*.js",
                exclude: ["src/app/app.js", "src/app/config.js"],
                options: {
                    breakOnErrors: false,
                    errorsOnly: false,
                    cyclomatic: [3, 7, 12],
                    halstead: [8, 13, 20],
                    maintainability: 100,
                    hideComplexFunctions: false,
                    broadcast: false
                }

            }

        },

        // compile scss into css
        sass: {
            app: {
                files: [{
                    expand: true,
                    cwd: "./src/css",
                    src: ["**/*.scss"],
                    dest: "build/css",
                    ext: ".css"
                }]
            }
        },

        // watch for engine
        watch: {
            scripts: {
                files: ["src/**/*.*", "bower.json"],
                tasks: ["javascript_lint", "css_lint", "html_lint", "copy_src", "scss_compile", "javascript_minify", "css_minify", "image_min", "analysis", "reload_extensions"],
                options: {
                    spawn: false,
                },
            }
        }

    });

};
