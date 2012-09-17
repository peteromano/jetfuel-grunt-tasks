module.exports = function(grunt) {
    'use strict';

  grunt.registerMultiTask('automin', 'Minify all files.', function() {
        var src = this.file.src,
            banner = grunt.task.directive(this.data.banner) || '',
            dest = this.file.dest,
            data = this.data,
			helper = data.helper,
			args = data.args,
            extension = data.extension || '.min.js',
            replace = data.replace || '.js',
            verbose = data.verbose,
            task = this,
            errorCount;

        try {

            for(var fileglob in src) {
                grunt.file.expandFiles(fileglob = src[fileglob]).forEach(function(filepath) {
                    var newFile;

                    grunt.helper(helper, grunt.file.read(filepath), args, function(error, output) {
                        grunt.file.write(
                            newFile = grunt.helper('path.get_dest_path', fileglob, filepath, dest).replace(replace, extension),
                            banner + output
                        );

                        errorCount |= task.errorCount;

                        verbose && grunt.log.writeln('File "' + newFile + '" created.');
                    });
                });
            }

        } catch(e) {

            grunt.log.writeln(e);
            return false;

        }

        if (errorCount) return false;
    });

};