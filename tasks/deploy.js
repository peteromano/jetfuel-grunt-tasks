module.exports = function(grunt) {
    'use strict';

    grunt.registerMultiTask('deploy', 'Deploy dest directory to deploy directory.', function() {
        var dest = this.file.dest,
            data = grunt.utils._.extend(grunt.config.process('meta.deploy') || {}, this.data || {}),
            args = data.rsync.args;

        try {

            this.file.src.forEach(function(filepath){
                grunt.helper('jetfuel.rsync', filepath, dest, args);
            });

        } catch(e) {

            grunt.log.error(e);
            return false;

        }
    });

};