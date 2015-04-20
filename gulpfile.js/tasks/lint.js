'use strict';

var gulp        = require('gulp');
var eslint      = require('gulp-eslint');
var handleError = require('../utils/handleError');
var config      = require('../config');

var watched = false;

gulp.task('lint', function() {
    if (!watched && config.watch) {
        gulp.watch(config.dirs.src + '/js/**/*.js', ['lint']);
        watched = true;
    }

    return gulp.src(config.dirs.src + '/js/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .on('error', handleError);
});
