'use strict';

var gulp        = require('gulp');
var cssnext     = require('gulp-cssnext');
var rename      = require('gulp-rename');
var handleError = require('../utils/handleError');
var config      = require('../config');

var watched = false;

gulp.task('css', function() {
    if (!watched && config.watch) {
        gulp.watch(config.dirs.src + '/css/**/*.css', ['css']);
        watched = true;
    }

    return gulp.src(config.dirs.src + '/css/index.css')
        .pipe(cssnext({
            compress: config.env === 'production',
            sourcemap: config.env === 'development'
        }))
        .on('error', handleError)
        .pipe(rename('app.css'))
        .pipe(gulp.dest(config.dirs.dest));
});
