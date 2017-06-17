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
                    cwd: "build/",
                    src: ["*.css", "!*.min.css"],
                    dest: "build/",
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

                src: "src/**/*.js",
                exclude: ["src/app.js", "src/config.js"],
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
                    cwd: "./src",
                    src: ["**/*.scss"],
                    dest: "build/",
                    ext: ".css"
                }]
            }
        },

        // watch for engine
        watch: {
            scripts: {
                files: ["src/**/*.*", "bower.json"],
                tasks: ["javascript_lint", "css_lint", "copy_src", "scss_compile", "javascript_minify", "css_minify", "analysis"],
                options: {
                    spawn: false,
                },
            }
        },

        csslint: {

            lax: {

                options: {
                    import: false
                },
                src: ["src/**/*.css"]

            }

        }

    });

};
