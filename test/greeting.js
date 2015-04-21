'use strict';

// it doesn't seem to work with `import`
// import assert from 'power-assert';
let assert = require('power-assert');

import greeting from '../src/js/greeting';

describe('Greeting', () => {

    it('should be just OK', () => {
        assert(true);
    });

    it('should say something', () => {
        assert(!!greeting());
    });

});
