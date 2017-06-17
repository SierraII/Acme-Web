var chalk = require("chalk");

module.exports = function(grunt){

    grunt.registerTask("default", function(){
        grunt.task.run("concurrent");
    });

    grunt.registerTask("build", function(){

        require("time-grunt")(grunt);

        // lint
        grunt.task.run("javascript_lint");
        grunt.task.run("css_lint");

        // bower install
        grunt.task.run("bower");

        // copy src to build
        grunt.task.run("copy_src");
        grunt.task.run("scss_compile");

        // minification
        grunt.task.run("javascript_minify");
        grunt.task.run("css_minify");

    });

    // javascript minification task
    grunt.registerTask("javascript_minify", function(){

        grunt.log.writeln(chalk.magenta.bold("Executing JavaScript Minification And Concatination Process."));
        grunt.task.run("newer:uglify");

    });

    // javascript linting task
    grunt.registerTask("javascript_lint", function(){

        grunt.log.writeln(chalk.magenta.bold("Checking JavaScript Code Style."));
        grunt.task.run("newer:jscs");

    });

    // css linting task
   grunt.registerTask("css_lint", function(){

       grunt.log.writeln(chalk.magenta.bold("Checking CSS Code Style."));
       grunt.task.run("newer:csslint");

   });

   // bower install task
   grunt.registerTask("bower", function(){

       grunt.log.writeln(chalk.magenta.bold("Executing Bower Process."));
       require("child_process").execSync("bower install", { stdio : [0, 1, 2, 3] });

   });

   // copy src task
    grunt.registerTask("copy_src", function(){

        grunt.log.writeln(chalk.magenta.bold("Executing Copying Process."));
        grunt.task.run("sync");

    });

    // css minification task
    grunt.registerTask("css_minify", function(){

        grunt.log.writeln(chalk.magenta.bold("Executing CSS Minification Process."));
        grunt.task.run("newer:cssmin");

    });

    // css minification task
    grunt.registerTask("scss_compile", function(){

        grunt.log.writeln(chalk.magenta.bold("Executing SCSS Compilation Process."));
        grunt.task.run("newer:sass");

    });

};
