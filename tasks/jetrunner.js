module.exports = function(grunt) {
    'use strict';

    grunt.registerMultiTask('jetrunner', 'Unit test server.', function() {
        this.requiresConfig('meta.jetrunner');

        var data = grunt.utils._.extend(grunt.config.process('meta.jetrunner') || {}, this.data || {});

        require('jetfuel.test.jetrunner')

            // Configure and start JetRunner server
            .server('start', data.server)

            // Run unit tests
            .run(grunt.file.expandFiles(data.test), {
                runner: data.runner,
                remote: data.remote,
                soda: data.soda
            });
    });

};