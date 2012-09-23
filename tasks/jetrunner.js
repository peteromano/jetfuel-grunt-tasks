module.exports = function(grunt) {
    'use strict';

    grunt.registerMultiTask('jetrunner', 'Unit test server.', function() {
        require('jetfuel.test.jetrunner').server('start');
    });

};