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

    gulp.start(['styleguide:generate', 'styleguide:apply-styles']);
});

gulp.task('styleguide:generate', function() {
    return gulp.src(config.dirs.src + '/css/**/*.css')
        .pipe(styleguide.generate({
            title: 'Seed Style Guide',
            extraHead: '<link rel="stylesheet" href="/fixtures/styleguide/sg.css">',
            overviewPath: 'README.md',
            commonClass: 'sg-common',
            rootPath: '.',
            appRoot: '/styleguide',
            disableEncapsulation: true,
            disableHtml5Mode: true,
            filesConfig: [{
                name: config.name,
                files: ['/dist/app.js']
            }]
        }))
        .pipe(gulp.dest(config.dirs.styleguide));
});

gulp.task('styleguide:apply-styles', function() {
    return gulp.src(config.dirs.dest + '/app.css')
        .pipe(styleguide.applyStyles())
        .pipe(gulp.dest(config.dirs.styleguide));
});
