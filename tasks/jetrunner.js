module.exports = function(grunt) {
    'use strict';

    grunt.registerMultiTask('jetrunner', 'Unit test server.', function() {
        var process = grunt.template.process,
            data = this.data,
            tests, target;

        for(var test in data) {
            target = data[test];
            tests = {};

            target = grunt.utils.recurse(target, function(value) {
                value = grunt.task.directive(value);
                return typeof value === 'string' && process(value, grunt.config()) || value;
            });

            for(var t in target.tests) tests[process(t)] = process(target.tests[t]);

            require('jetfuel.test.jetrunner')

                // Configure and start JetRunner server
                .server('start', target.server)

                // Run unit tests
                .run(tests, {
                    runner: target.runner,
                    reporter: target.reporter,
                    remote: target.remote
                });

        }
    });

};