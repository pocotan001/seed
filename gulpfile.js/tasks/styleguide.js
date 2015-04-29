'use strict';

var gulp        = require('gulp');
var styleguide  = require('sc5-styleguide');
var runSequence = require('run-sequence');
var config      = require('../config');

var watched = false;

gulp.task('styleguide', function(done) {
    if (!watched && config.watch) {
        gulp.watch(config.dirs.dest + '/app.css', ['styleguide']);
        watched = true;
    }

    runSequence('styleguide:generate', ['styleguide:css', 'styleguide:copy'], done);
});

gulp.task('styleguide:generate', function() {
    return gulp.src(config.dirs.src + '/css/**/*.css')
        .pipe(styleguide.generate({
            title: 'Seed Style Guide',
            overviewPath: 'README.md',
            extraHead: '<link rel="stylesheet" href="sg.css"><script src="app.js"></script>',
            commonClass: 'sg-common',
            rootPath: '.',
            appRoot: '/' + config.name + '/styleguide',
            disableEncapsulation: true,
            disableHtml5Mode: true
        }))
        .pipe(gulp.dest(config.dirs.ghpages + '/styleguide'));
});

gulp.task('styleguide:css', function() {
    return gulp.src(config.dirs.dest + '/app.css')
        .pipe(styleguide.applyStyles())
        .pipe(gulp.dest(config.dirs.ghpages + '/styleguide'));
});

gulp.task('styleguide:copy', function() {
    return gulp.src([
        'gulpfile.js/fixtures/styleguide/sg.css',
        config.dirs.dest + '/app.js',
        config.dirs.dest + '/icon.svg'
    ])
        .pipe(gulp.dest(config.dirs.ghpages + '/styleguide'));
});
