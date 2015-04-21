'use strict';

var gulp   = require('gulp');
var karma  = require('karma').server;
var config = require('../config');

gulp.task('test', function(done) {
    karma.start({
        configFile: process.cwd() + '/karma.conf.js',
        singleRun: !config.watch
    }, done);

    // `done` callback not being called
    // https://github.com/karma-runner/gulp-karma/issues/10
    if (config.watch) {
        done();
    }
});
