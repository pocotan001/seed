'use strict';

import assert from 'power-assert';
import sinon from 'sinon';

import App from '../src/js/app';

describe('App', () => {
    it('is a App', () => {
        let app = new App();

        assert(app instanceof App);
    });
});
