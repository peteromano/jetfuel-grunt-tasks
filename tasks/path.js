module.exports = function(grunt) {
    'use strict';

    var STRIP_GLOB = /(?:(\w*)(?:\/\*)+.*)/;

    grunt.registerHelper('path.get_dest_path', function(fileglob, filepath, dest) {
        return filepath.replace(fileglob.replace(/^\.\//, '').replace(STRIP_GLOB, '$1'), dest);
    });
};