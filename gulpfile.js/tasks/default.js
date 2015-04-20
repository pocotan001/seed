'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');
var config      = require('../config');

gulp.task('default', function() {
    if (config.env === 'production') {
        runSequence('lint', 'test', 'clean', 'build');
    }

    if (config.env === 'development') {
        runSequence('lint', 'test', 'clean', 'build', 'serve');
    }
});