'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', ['build:css', 'build:js']);

gulp.task('build:css', function (done) {
    runSequence('icon', 'css', 'styleguide', done);
});

gulp.task('build:js', ['js']);
