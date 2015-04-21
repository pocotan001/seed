'use strict';

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var config      = require('../config');

var watchFiles = [
    config.dirs.dest + '/app.css',
    config.dirs.dest + '/app.js',
    config.dirs.dest + '/icon.svg'
];

gulp.task('serve', function(done) {
    browserSync.init({
        server: { baseDir: config.dirs.dest },
        open: 'ui',
        files: config.watch && watchFiles
    }, done);
});

gulp.task('serve:tunnel', function(done) {
    browserSync.init({
        server: { baseDir: config.dirs.dest },
        tunnel: true,
        open: 'tunnel',
        ghostMode: false,
        notify: false
    }, done);
});
