module.exports = function(grunt) {
    'use strict';

    var JSDOC_APP_DIR = 'app',
        MODULES = 'node_modules';

    grunt.registerMultiTask('docs', 'JSDocs for src, outputted to dest.', function() {
    	var path = require('path'),
            done = this.async(),
            jsdoc = this.data.jsdoc,
    		src = path.resolve(this.file.src),
    		dest = path.resolve(this.file.dest),
            toolkitDir = path.dirname(module.filename) + '/../' + MODULES + '/jsdoc-toolkit',
            t = path.resolve(jsdoc.template || toolkitDir + '/templates/jsdoc'),
            p = path.resolve(jsdoc.path || toolkitDir),
            cli = [
                path.resolve(toolkitDir + '/' + JSDOC_APP_DIR) + '/' + (jsdoc.app || 'run.js'),
                src,
                '-d='+dest,
                '-t='+t,
                jsdoc.includeAll ? '-a' : '',
                jsdoc.includePrivate ? '-p' : '',
                jsdoc.recurse ? '-r=' + jsdoc.recurse : '',
                jsdoc.exclude ? '-E=' + jsdoc.exclude : ''
            ].join(' ');
        try {
            require('child_process').exec(cli, { stdio: 'inherit' })
                .on('exit', function(code) {
                    grunt.log.writeln('exec: ' + cli);
                    done(code == 0)
                });

        } catch(e) {
            grunt.log.error(e);
            return false;
        }
    });

};