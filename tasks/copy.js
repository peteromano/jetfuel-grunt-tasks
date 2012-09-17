module.exports = function(grunt) {
    'use strict';

    var ESPRESSO_JSON = '.espresso.json';

    grunt.registerMultiTask('copy', 'Copy src files to dest directory.', function() {
        var path = require('path'),
            fs = require('fs'),
            src = this.file.src,
            dest = this.file.dest,
            vendor, lib;

        try {
            for(var fileglob in src) {
                grunt.file.expandFiles(fileglob = src[fileglob]).forEach(function(filepath){
                  if(path.basename(filepath) != ESPRESSO_JSON) grunt.file.copy(filepath, grunt.helper('path.get_dest_path', fileglob, filepath, dest));
                  else {
                      vendor = (grunt.file.readJSON(filepath) || {}).vendor;
                      lib = vendor.lib;
                      for(var file in lib) {
                          grunt.file.copy(path.dirname(filepath) + '/' + lib[file], path.dirname(filepath.replace(/^([^/]*)/, dest)) + '/' + path.basename(file));
                      }
                  }
                });
            }
        } catch(e) {
            grunt.log.writeln(e);
            return false;
        }
    });

};