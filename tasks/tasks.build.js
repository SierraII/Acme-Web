var chalk = require("chalk");

module.exports = function(grunt){

    grunt.registerTask("default", function(){
        grunt.task.run("sync");
        grunt.task.run("javascript_lint");
    });

    // javascript linting task
    grunt.registerTask("javascript_lint", function(){

        grunt.log.writeln(chalk.magenta.bold("Checking JavaScript Code Style."));
        grunt.task.run("newer:jscs");

    });

};
