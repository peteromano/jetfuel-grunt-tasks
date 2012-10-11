module.exports = function(grunt) {
    'use strict';

    grunt.registerTask('install', 'Run JetFuel install.', function() {
        require('child_process').spawn('jetfuel', ['bower', 'install'], { stdio: 'inherit' })
            .on('exit', this.async());
    });

};