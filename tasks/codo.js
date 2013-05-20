/*
 * grunt-este
 * https://github.com/este/grunt-este
 * Derived from https://github.com/gruntjs/grunt-contrib-coffee.
 * Uses https://github.com/Steida/coffee2closure module.
 *
 * Copyright (c) 2013 Daniel Steigerwald
 */

module.exports = function(grunt) {
    'use strict';

    var path = require('path');
    var codo = require('codo');
    var _ = grunt.util._;
    var consoleColor = 'cyan';

    grunt.registerMultiTask('codo', 'Generate the documentation', function() {

        var options = this.options({
            closure: true,
            private: true,
            name: 'CODO',
            title: 'API Documentattion',
            inputs: [],
            extras: [],
            readme: 'README.md',
            quiet: false,
            verbose: false,
            debug: false,
            cautious: false,
            homepage: false,
            analytics: false,
            output: './doc'
        });

        grunt.verbose.writeflags(options, 'Options');

        // dirty hack to pass only changed file
        // TODO: wait for official solution
        var files = this.files;

        var flags = Object.keys(this.flags);
        if (flags.length == 1) {
            consoleColor = 'yellow';
            files = [{
                src: [flags[0]],
                dest: flags[0].replace('.coffee', '.js')
            }];
        }

        files.forEach(function (f) {
            var validFiles = removeInvalidFiles(f);

            options.inputs.push(validFiles[0]);
        });

        codo.process(options,onDocGenerated);


    });

    var onDocGenerated = function() {
        grunt.log.success('API documentation was generated');
    };

    var removeInvalidFiles = function(files) {
        return files.src.filter(function(filepath) {
            if (!grunt.file.exists(filepath)) {
                grunt.log.warn('Source file "' + filepath + '" not found.');
                return false;
            } else {
                return true;
            }
        });
    };

};
