module.exports = function( grunt ) {

    // Create a new multi task.
    grunt.registerMultiTask( 'compass', 'This triggers the `compass compile` command.', function() {

        // Tell grunt this task is asynchronous.
        var done = this.async(),
            exec = require('child_process').exec,
            command = "compass compile",
            src = undefined,
            dest = undefined,
            images = this.data.images,
            fonts = this.data.fonts,
            outputstyle = this.data.outputstyle,
            linecomments = this.data.linecomments,
            forcecompile = this.data.forcecompile,
            debugsass = this.data.debugsass,
            relativeassets = this.data.relativeassets,
            config = this.data.config,
            libRequire = this.data.require,
            compass;

        if ( this.data.src !== undefined ) {
            src = grunt.template.process(this.data.src);
        }

        if ( this.data.dest !== undefined ) {
            dest = grunt.template.process(this.data.dest);
        }

        if ( src !== undefined && dest !== undefined ) {
            command += ' --sass-dir="' + src + '" --css-dir="' + dest + '"';
        }

        if ( images !== undefined ) {
            command += ' --images-dir="' + images + '"';
        }

        if ( fonts !== undefined ) {
            command += ' --fonts-dir="' + fonts + '"';
        }

        if ( debugsass !== undefined ) {
            if ( debugsass === true ) {
                command += ' --debug-info';
            }
        }

        if ( relativeassets !== undefined ) {
            if ( relativeassets === true ) {
                command += ' --relative-assets';
            }
        }

        if ( outputstyle !== undefined ) {
            command += ' --output-style ' + outputstyle;
        }

        if ( linecomments === false ) {
            command += ' --no-line-comments';
        }

        if ( libRequire !== undefined ) {
            command += ' --require '+ libRequire;
        }

        if ( forcecompile === true ) {
            command += ' --force';
        }

        if ( config !== undefined ) {
            command += ' --config="' + config + '"';
        }

        grunt.log.writeln('exec: ' + command);

        compass = exec( command, { stdio: 'pipe' }) .on('exit', function(code) { done(code === 0); });

        compass.stdout.on('data', function(data) {
            grunt.log.write(data)
        });

        compass.stderr.on('data', function(data) {
            grunt.log.error(data)
        });
    });
};
