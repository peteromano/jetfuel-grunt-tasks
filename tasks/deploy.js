module.exports = function(grunt) {
    'use strict';

    grunt.registerMultiTask('deploy', 'Deploy dest directory to deploy directory.', function() {
        var dest = this.file.dest,
            args = this.data.rsync && this.data.rsync.args,
            done = this.async();

        this.file.src.forEach(function(filepath){
            grunt.helper('jetfuel.rsync', filepath, dest, args, done);
        });
    });

};