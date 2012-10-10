module.exports = function(grunt) {
    'use strict';

    grunt.registerMultiTask('six', 'Compile ES6 -> ES5.', function() {
        var path = require('path'),
            compile = require('six').compile,
            fs = require('fs'),
            file = grunt.file,
            helper = grunt.helper,
            src = this.file.src,
            dest = this.file.dest;

        try {
            for(var fileglob in src) {
                grunt.file.expandFiles(fileglob = src[fileglob]).forEach(function(filepath){
                  var newFile;

                  file.write(
                    newFile = helper('jetfuel.get_dest_path', fileglob, filepath, dest), 
                    compile(file.read(filepath))
                  );

                  grunt.log.writeln('File "' + newFile + '" created.');
                });
            }
        } catch(e) {
            grunt.log.error(e);
            return false;
        }
    });

};