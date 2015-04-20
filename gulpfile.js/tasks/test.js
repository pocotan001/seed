'use strict';

var gulp   = require('gulp');
var karma  = require('karma');
var config = require('../config');

gulp.task('test', function(done) {
    karma.server.start({
        configFile: process.cwd() + '/karma.conf.js',
        singleRun: !config.watch
    }, done);
});
