module.exports = function(grunt) {
    'use strict';

    var JETFUEL_JSON = '.jetfuel.json';

    grunt.registerMultiTask('copy', 'Copy src files to dest directory.', function() {
        var path = require('path'),
            fs = require('fs'),
            src = this.file.src,
            dest = this.file.dest,
            vendor, lib;

        try {
            for(var fileglob in src) {
                grunt.file.expandFiles(fileglob = src[fileglob]).forEach(function(filepath){
                  var newFile;

                  if(path.basename(filepath) != JETFUEL_JSON) grunt.file.copy(filepath, newFile = grunt.helper('jetfuel.get_dest_path', fileglob, filepath, dest));
                  else {
                      vendor = (grunt.file.readJSON(filepath) || {}).vendor;
                      lib = vendor.lib;
                      for(var file in lib) {
                          grunt.file.copy(path.dirname(filepath) + '/' + lib[file], newFile = path.dirname(filepath.replace(/^([^/]*)/, dest)) + '/' + path.basename(file));
                      }
                  }

                    grunt.log.writeln('File "' + newFile + '" created.');
                });
            }
        } catch(e) {
            grunt.log.error(e);
            return false;
        }
    });

};