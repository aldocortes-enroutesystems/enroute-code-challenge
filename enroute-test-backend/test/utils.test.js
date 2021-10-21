const expect = require('chai').expect;
const utils = require('./../src/lib/utils');

describe('Date parser tests', () => {
    describe('date parser invalid date test', () => {
        it('should be invalid date', () => {
            var result = utils.dateParser('abc');
            expect(result).equal(null);
        });
    });
    describe('date parser valid date test', () => {
        it('should add zeros', () => {
            var result = utils.dateParser(new Date('2015-9-9'));
            expect(result).equal('2015-09-09');
        });
    });
});
