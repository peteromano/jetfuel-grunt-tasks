module.exports = function(grunt) {
    'use strict';

    grunt.registerMultiTask('jetrunner', 'Unit test server.', function() {
        var data = this.data;

        require('jetfuel.test.jetrunner')

            // Configure and start Express server
            .server('start', {
                src: data.src,
                test: data.test,
                vendor: data.vendor,
                runner: data.runner,
                server: data.server,
                soda: data.soda
            })

            // Enumerate and run tests asynchronously from filenames in test directory
            .test([]);
    });

};