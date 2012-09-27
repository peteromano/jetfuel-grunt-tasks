module.exports = function(grunt) {
    'use strict';

    grunt.registerMultiTask('jetrunner', 'Unit test server.', function() {
        var d = this.data, data;

        for(var test in d) {
            data = d[test];

            data = grunt.utils.recurse(data, function(value) {
                value = grunt.task.directive(value);
                return typeof value === 'string' && grunt.template.process(value, grunt.config()) || value;
            });

            require('jetfuel.test.jetrunner')

                // Configure and start JetRunner server
                .server('start', data.server)

                // Run unit tests
                .run(grunt.file.expandFiles(data.test), data.src, {
                    runner: data.runner,
                    reporter: data.reporter,
                    remote: data.remote
                });

        }
    });

};