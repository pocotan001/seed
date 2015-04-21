'use strict';

var gulp      = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var replace   = require('gulp-replace');
var filter    = require('gulp-filter');
var config    = require('../config');

var watched = false;

gulp.task('icon', function() {
    if (!watched && config.watch) {
        gulp.watch(config.dirs.src + '/svg/icon/*.svg', ['icon']);
        watched = true;
    }

    gulp.start(['icon:svg', 'icon:css']);
});

gulp.task('icon:svg', function() {
    return gulp.src(config.dirs.src + '/svg/icon/*.svg')
        .pipe(svgSprite({
            mode: {
                symbol: {
                    dest: '.',
                    sprite: 'icon.svg'
                }
            }
        }))
        .pipe(replace(/ (?:fill|stroke)=".*?"/g, ''))
        .pipe(gulp.dest(config.dirs.dest));
});

gulp.task('icon:css', function() {
    return gulp.src(config.dirs.src + '/svg/icon/*.svg')
        .pipe(svgSprite({
            mode: {
                css: {
                    dest: '.',
                    render: {
                        css: {
                            dest: 'icons.css',
                            template: 'gulpfile.js/fixtures/svg-sprite/icons.css.mustache'
                        }
                    }
                }
            }
        }))
        .pipe(filter('icons.css'))
        .pipe(gulp.dest(config.dirs.src + '/css/settings'));
});
