'use strict';

var gulp        = require('gulp');
var browserify  = require('browserify');
var watchify    = require('watchify');
var source      = require('vinyl-source-stream');
var assign      = require('object-assign');
var handleError = require('../utils/handleError');
var config      = require('../config');

/**
 * @param {Object} bundler
 * @return {Stream}
 */
function bundle(bundler) {
    bundler.transform('babelify');

    if (config.env === 'production') {
        bundler.plugin('minifyify', {
            map: false,
            uglify: { compress: { drop_console: true } }
        });
    }

    return bundler.bundle()
        .on('error', handleError)
        .pipe(source('app.js'))
        .pipe(gulp.dest(config.dirs.dest));
}

gulp.task('js', function() {
    var bundler;
    var options = {
        standalone: config.name,
        entries: './' + config.dirs.src + '/js/index.js',
        debug: config.env === 'development'
    };

    if (config.watch) {
        options = assign({}, watchify.args, options);
        bundler = watchify(browserify(options));
        bundler.on('update', bundle.bind(this, bundler));
        bundler.on('log', console.log);
    } else {
        bundler = browserify(options);
    }

    return bundle(bundler);
});
