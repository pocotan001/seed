'use strict';

var notify = require('gulp-notify');

/**
 * @param {Error} err
 * @param {Function} [callback]
 */
module.exports = function(err, callback) {
    notify.onError(err).apply(this, arguments);
    this.emit('end');
};
