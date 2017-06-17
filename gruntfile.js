var chalk = require("chalk");

module.exports = function(grunt){

    /* -------------------------------------------------------------------- */
    /*
        Load Tasks And NPM Modules
    */
    /* -------------------------------------------------------------------- */

    grunt.loadTasks("tasks");
    require('load-grunt-tasks')(grunt);

};
