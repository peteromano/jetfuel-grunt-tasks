module.exports = function(grunt) {
    'use strict';

    grunt.registerMultiTask('jetrunner', 'Unit test server.', function() {
        var data = require('underscore').extend(grunt.config('meta.jetrunner') || {}, this.data || {});

        require('jetfuel.test.jetrunner')

            // Configure and start JetRunner server
            .server('start', {
                src: data.src,
                test: data.test,
                vendor: data.vendor,
                runner: data.runner,
                server: data.server
            })

            // Enumerate and run tests from filenames in test directory
            .test([], {
                async: data.async,
                remote: data.remote,
                soda: data.soda
            });
    });

};