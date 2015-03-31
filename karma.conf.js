'use strict';

var istanbul = require('browserify-istanbul');
var isparta = require('isparta');

module.exports = function(config) {
    config.set({
        frameworks: ['browserify', 'mocha'],

        files: [
            'src/js/**/*.js',
            'test/**/*.js'
        ],

        preprocessors: {
            'src/js/**/*.js': 'browserify',
            'test/**/*.js': 'browserify'
        },

        browserify: {
            transform: ['babelify', istanbul({ instrumenter: isparta }), 'espowerify']
        },

        browsers: ['Chrome'],

        reporters: ['dots', 'coverage'],

        autoWatch: true,

        coverageReporter: {
            type: 'text'
        }
    });
};
