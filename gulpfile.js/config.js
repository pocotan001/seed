'use strict';

var pkg  = require('../package.json');
var argv = require('minimist')(process.argv.slice(2));

module.exports = {
    name: pkg.name.replace('-', ''),
    dirs: pkg.directories,
    env: process.env.NODE_ENV || (argv.p || argv.production ? 'production' : 'development'),
    watch: !!(argv.w || argv.watch)
};
