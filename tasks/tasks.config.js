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
                ignoreInDest: "**/*.scss",
                updateAndDelete: true

            }
        },

        exec: {
            echo_something: 'export FLASK_APP=./src/index.py && export FLASK_DEBUG=1 && python -m flask run'
        },

        concurrent: {
            engine: {
                tasks: ["exec", "open", "watch"],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        open : {
            dev : {
              path: "http://127.0.0.1:5000/",
              app: "Google Chrome"
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
                config: "config/jscs.json",
                excludeFiles: ["src/static/lib/**/*.js"]
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

        // compile scss into css
        sass: {
            app: {
                files: [{
                    expand: true,
                    cwd: "./src/",
                    src: ["**/*.scss"],
                    dest: "src/",
                    ext: ".css"
                }],
                options: {
                    sourcemap: "none"
                }
            }
        },

        // watch for engine
        watch: {
            scripts: {
                files: ["src/**/*.*", "bower.json"],
                tasks: ["javascript_lint", "copy_src", "scss_compile", "javascript_minify", "css_minify"],
                options: {
                    spawn: false,
                },
            }
        }

    });

};
