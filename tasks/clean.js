module.exports = function(grunt) {
    'use strict';

    grunt.registerMultiTask('clean', 'Clean dest directory.', function() {

        try {

            grunt.file.expandDirs(this.file.src).reverse().forEach(function(dirpath){
                grunt.helper('jetfuel.rmdir', dirpath);
            });

        } catch(e) {

            grunt.log.error(e);
            return false;

        }
    });

};