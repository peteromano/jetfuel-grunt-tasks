/*
 * grunt
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt/blob/master/LICENSE-MIT
 */
var NAME = 'jetfuel',
    TMP = './tmp';

// Basic template description.
exports.description = '';

// Template-specific notes to be displayed before question prompts.
exports.notes = '';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {
    var child = require('child_process'),
        exec = child.exec;

    child.spawn('npm', ['install', NAME, '--force'], { stdio: 'inherit' })
        .on('exit', function(code) {
            require('fs').renameSync(NAME, TMP);

            exec('cp -rf ' + TMP + '/* .', { stdio: 'inherit' })
                .on('exit', function(code) {
                    exec('rm -rf ' + TMP, { stdio: 'inherit' })
                        .on('exit', function(code) {
                            done();
                        });
                });
        });

};