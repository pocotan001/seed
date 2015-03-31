'use strict';

import assert from 'power-assert';
import greeting from '../src/js/greeting';

describe('Greeting', () => {

    it('should be just OK', () => {
        assert(true);
    });

    it('should say something', () => {
        assert(!!greeting());
    });

});
