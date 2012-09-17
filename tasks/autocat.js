module.exports = function(grunt) {
    'use strict';

    grunt.registerMultiTask('autocat', 'Concatenate all "package" files.', function() {
        var dest = this.file.dest,
            filters = this.data.filters,
            banner = grunt.task.directive(this.data.banner) || '',
            separator = this.data.separator || ';',
            extension = this.data.extension || '.js',
            verbose = this.data.verbose,
            src = this.file.src;

        try {
            for(var fileglob in src) {
                grunt.file.expandDirs(fileglob = src[fileglob]).forEach(function(dirpath){
                    var newFile;

                    grunt.file.write(
                        newFile = grunt.helper('path.get_dest_path', fileglob, dirpath, dest).replace(/\/$/, extension),
                        banner + grunt.helper('concat', grunt.file.expandFiles(
                            filters.map(function(filter) { return dirpath+filter; })
                        ), { separator: separator })
                    );

                    verbose && grunt.log.writeln('File "' + newFile + '" created.');
                });
            }

        } catch(e) {

            grunt.log.writeln(e);
            return false;

        }
    });

};