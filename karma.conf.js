'use strict';

module.exports = function(config) {
    config.set({
        frameworks: ['mocha', 'browserify'],
        files: [
            // 'src/**/*.js',
            'test/**/*.js'
        ],
        preprocessors: {
            'test/**/*.js': 'browserify'
        },
        browserify: {
            debug: true,
            files: ['test/**/*.js'],
            transform: ['babelify', 'espowerify']
        },
        reporters: ['dots'],
        autoWatch: true,
        browsers: ['Chrome']
    });
};
