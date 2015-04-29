'use strict';

var gulp    = require('gulp');
var ghPages = require('gulp-gh-pages');
var config  = require('../config');

gulp.task('ghpages', ['build', 'styleguide'], function() {
    return gulp.src(config.dirs.ghpages + '/**')
        .pipe(ghPages());
});
