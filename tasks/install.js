module.exports = function(grunt) {
    'use strict';

    grunt.registerMultiTask('install', 'Run JetFuel install.', function() {
        require('child_process').exec('jetfuel', ['bower', 'install', 'jquery'], { stdio: 'inherit' })
            .on('exit', this.async());
    });

};