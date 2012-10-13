module.exports = function(grunt) {
    'use strict';

    grunt.registerTask('vendor', 'Run JetFuel upgrade.', function() {
        process.jetfuel && require('child_process').spawn(process.jetfuel.env.EXEC, ['upgrade'], { stdio: 'inherit' })
            .on('exit', this.async());
    });

};