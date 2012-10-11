module.exports = function(grunt) {
    'use strict';

    grunt.registerMultiTask('jetrunner', 'Unit test server.', function() {
        var process = grunt.template.process,
            data = this.data,
            done = this.async(),
            tests, target;

        for(var test in data) {
            target = data[test];
            tests = {};

            target = grunt.utils.recurse(target, function(value) {
                value = grunt.task.directive(value);
                return typeof value === 'string' && process(value, grunt.config()) || value;
            });

            for(var t in target.tests) tests[process(t)] = process(target.tests[t]);

            target.stdio = target.stdio || 'pipe';

            target.tests = undefined;
            delete target.tests;

            require('jetrunner')
                .on('phantom:stdout', grunt.log.write.bind(grunt.log))
                .on('phantom:stderr', grunt.log.error.bind(grunt.log))
                .run(tests, target, function(code) { done(code === 0); });
        }
    });

};