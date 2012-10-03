module.exports = function(grunt) {
    'use strict';

    grunt.registerMultiTask('jetrunner', 'Unit test server.', function() {
        var process = grunt.template.process,
            data = this.data,
            done = this.async(),
            processed = 0,
            tests, target;

        for(var test in data) {
            target = data[test];
            tests = {};

            target = grunt.utils.recurse(target, function(value) {
                value = grunt.task.directive(value);
                return typeof value === 'string' && process(value, grunt.config()) || value;
            });

            for(var t in target.tests) tests[process(t)] = process(target.tests[t]);

            // Configure and start JetRunner server and run unit tests
            require('jetfuel.test.jetrunner').run(tests, {
                server: target.server,
                runner: target.runner,
                reporter: target.reporter,
                remote: target.remote
            }, function(code) {
                done(code === 0);
            });
        }
    });

};