module.exports = function(grunt) {
    'use strict';

    grunt.registerMultiTask('concatenate', 'Concatenate files.', function() {
        var files = grunt.file.expandFiles(this.file.src);

        // Concat specified files.
        var src = grunt.helper('concat', files, {separator: this.data.separator});
        grunt.file.write(this.file.dest, src);

        // Fail task if errors were logged.
        if (this.errorCount) { return false; }

        // Otherwise, print a success message.
        grunt.log.writeln('File "' + this.file.dest + '" created.');
    });

};