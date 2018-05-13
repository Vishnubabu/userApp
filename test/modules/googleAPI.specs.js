/*global describe, it */

const expect = require('unexpected');
const googleAPI = require('../../modules/googleAPI');

describe('Google API', () => {
    it('should give a list of books limit by 5', done => {
        googleAPI().then(result => {
            expect(result.length, 'to be', 5);
            done();
        }, done);
    });
});
