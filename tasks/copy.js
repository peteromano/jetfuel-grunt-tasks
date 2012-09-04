module.exports = function(grunt) {
    'use strict';

    var ESPRESSO_JSON = '.espresso.json';

    grunt.registerMultiTask('copy', 'Copy src files to dest directory.', function() {
        var path = require('path'),
            fs = require('fs'),
            dest = this.file.dest,
            vendor, lib;

        try {
            grunt.file.expandFiles(this.file.src).forEach(function(filepath){
              if(path.basename(filepath) != ESPRESSO_JSON) grunt.file.copy(filepath, grunt.helper('path.to_dest_path', filepath, dest));
              else {
                  vendor = (grunt.file.readJSON(filepath) || {}).vendor;
                  lib = vendor.lib;
                  for(var file in lib) {
                      grunt.file.copy(path.dirname(filepath) + '/' + file, path.dirname(grunt.helper('path.to_dest_path', filepath, dest)) + '/' + path.basename(lib[file]));
                  }
              }
            });
        } catch(e) {
            grunt.log.writeln(e);
            return false;
        }
    });

};