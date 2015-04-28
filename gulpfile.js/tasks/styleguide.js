'use strict';

var gulp       = require('gulp');
var styleguide = require('sc5-styleguide');
var config     = require('../config');

var watched = false;

gulp.task('styleguide', function() {
    if (!watched && config.watch) {
        gulp.watch(config.dirs.dest + '/app.css', ['styleguide']);
        watched = true;
    }

    gulp.start(['styleguide:generate', 'styleguide:applystyles', 'styleguide:copy']);
});

gulp.task('styleguide:generate', function() {
    return gulp.src(config.dirs.src + '/css/**/*.css')
        .pipe(styleguide.generate({
            title: 'Seed Style Guide',
            overviewPath: 'README.md',
            extraHead: '<link rel="stylesheet" href="/sg.css"><script src="/app.js"></script>',
            commonClass: 'sg-common',
            rootPath: '.',
            disableEncapsulation: true,
            disableHtml5Mode: true
        }))
        .pipe(gulp.dest(config.dirs.doc + '/styleguide'));
});

gulp.task('styleguide:applystyles', function() {
    return gulp.src(config.dirs.dest + '/app.css')
        .pipe(styleguide.applyStyles())
        .pipe(gulp.dest(config.dirs.doc + '/styleguide'));
});

gulp.task('styleguide:copy', function() {
    return gulp.src([
        'gulpfile.js/fixtures/styleguide/sg.css',
        config.dirs.dest + '/app.js'
    ])
        .pipe(gulp.dest(config.dirs.doc + '/styleguide'));
});
