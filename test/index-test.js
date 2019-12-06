global.expect = require('expect');
var {wordLooksReal, assessWords} = require('../index.js');

describe('word scramble score', function() {
    describe('wordLooksReal', () => {
        it('passes given words', () => {
            expect(wordLooksReal('MAPS')).toEqual(true);
            // expect(wordLooksReal('RIONY')).toEqual();
            // expect(wordLooksReal('ONYRI')).toEqual();
            expect(wordLooksReal('IRONY')).toEqual(true);
            // expect(wordLooksReal('INOYR')).toEqual();
            expect(wordLooksReal('IOYRN')).toEqual(false);
        })
    })

    describe('assessWords', function() {
        it('passes other edge cases', () => {
            expect(true).toEqual(true);
        })

        it('passes all given tests', () => {
            let input1 = ['MAPS SPAM', 'RIONY IRONY', 'ONYRI IRONY', 'IRONY IRONY', 'INOYR IRONY', 'IOYRN IRONY',];
            let expected = [
                'MAPS is a fair scramble of SPAM',
                'RIONY is a fair scramble of IRONY',
                'ONYRI is a hard scramble of IRONY',
                'IRONY is not a scramble of IRONY',
                'INOYR is a fair scramble of IRONY',
                'IOYRN is a poor scramble of IRONY',
            ];

            expect(assessWords(input1)).toEqual(expected);
        })
    })
  
  })