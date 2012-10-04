module.exports = function(grunt) {
    'use strict';

    var GRUNT_FILE      = 'grunt.js',
        JETFUEL_FILE    = 'jetfuel.json',
        STRIP_GLOB      = /(?:(\w*)(?:\/\*)+.*)/;

    var d = [];

    /**
     * Clean directories.
     *
     * If `GRUNT_FILE` file is not found in any of `dirpath`'s parent directories, abort task.
     *
     * TODO This is to guard against deleteing folders outside of the grunt project, but it's still not
     *      an ideal security precaution
    */
    grunt.registerHelper('jetfuel.rmdir', function(dirpath) {
        if(!grunt.file.findup(dirpath, GRUNT_FILE) && !grunt.file.findup(dirpath, JETFUEL_FILE)) throw Error('Directory "' + dirpath + '" is outside the grunt project.');
        else {
            require('fs-extra').removeSync(dirpath);
            grunt.log.writeln('Directory "' + dirpath + '" deleted.');
        }
    });

    grunt.registerHelper('jetfuel.rsync', function(src, dest, args) {
        var done = grunt.task.current.async(),
            cmd = ['rsync', args || '', src, dest].join(' ');

        require('child_process').exec(cmd, { stdio: 'inherit' })
            .on('exit', function(code) {
                grunt.log.writeln('exec: ' + cmd);
                done(code == 0);
            });
    });

    grunt.registerHelper('jetfuel.closure', function(input, args, callback) {
        var output;

        require('closure-compiler').compile(input, args || grunt.config('closure'), function(error, stdout) {
            (output = stdout) && callback && callback(error, stdout);
        });

        /*options = options || {};
        args = args || {};

        var	cli = ['java', '-jar', options.compilerPath || 'node_modules/closure-compiler/lib/vendor/compiler.jar'];

        Object.keys(args).forEach(function(key) {
            cli.push("--" + key + ' ' + args[key]);
        });

        cli.push('--js_code ' + input);

        grunt.log.writeln(cli.join(' '));

        require('child_process').exec(cli.join(' '));*/

        return output;
    });

    grunt.registerHelper('jetfuel.uglify', function(input, args, callback) {
        var output = grunt.helper('uglify', input, args || grunt.config('uglify') || {});
        callback && callback(undefined, output);
        return output;
    });

    grunt.registerHelper('jetfuel.get_dest_path', function(fileglob, filepath, dest) {
        return filepath.replace(fileglob.replace(/^\.\//, '').replace(STRIP_GLOB, '$1'), dest);
    });

    grunt.registerHelper('jetfuel.pushd', function(directory) {
        d.push(require('path').resolve(process.cwd()));
        process.chdir(directory);
        return ''+d;
    });

    grunt.registerHelper('jetfuel.popd', function() {
        var dir = d.pop();
        process.chdir(dir);
        return dir;
    });

};