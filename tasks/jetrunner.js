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

            target.tests = undefined;
            delete target.test;

            // Configure and start JetRunner server and run unit tests
            require('jetrunner').run(tests, target, function(code) {
                done(code === 0);
            });
        }
    });

};