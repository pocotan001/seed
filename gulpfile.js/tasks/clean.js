'use strict';

var gulp   = require('gulp');
var del    = require('del');
var config = require('../config');

gulp.task('clean', function (done) {
    del([
        config.dirs.dest + '/app.css',
        config.dirs.dest + '/app.js',
        config.dirs.dest + '/icon.svg',
        config.dirs.ghpages
    ], done);
});
