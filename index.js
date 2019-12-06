// A scramble looks like a real word if the letters alternate between vowels
// and consonants (with ‘Y’ being a vowel for this purpose). However, certain combinations of vowels and
// consonants are allowed:

var OK_LETTER_COMBOS = [
    "AI", "AY", "EA", "EE", "EO", "IO", "OA", "OO", "OY", "YA",
    "YO", "YU", "BL", "BR", "CH", "CK", "CL", "CR", "DR", "FL",
    "FR", "GH", "GL", "GR", "KL", "KR", "KW", "PF", "PL", "PR",
    "SC", "SCH", "SCR", "SH", "SHR", "SK", "SL", "SM", "SN", "SP",
    "SQ", "ST", "SW", "TH", "THR", "TR", "TW", "WH", "WR"
];

// Also, all double consonants are allowed, and, no other combinations are allowed.
// For instance, SWR doesn’t look real even though both SW and WR are independently looking real.

// Not – if the word is not scrambled at all
// Poor – if the first letter or any two consecutive letters are in the correct place and the word doesn’t look real
// Hard – if none of the letters are in the correct place and the word looks real
// Fair – for all other cases

var VOWELS = ["A", "E", "I", "O", "U", "Y"];

var scrambleLooksReal = scramble => {
    for (let a = 0; a < scramble.length; a++) {
        // what's not allowed:
        // 2 sequential vowels unless they're in the ok combos
        // 3 sequential vowels
        // 3 sequential consonants unless they're in the ok combos
        if (
            (VOWELS.includes(scramble[a]) && VOWELS.includes(scramble[a + 1]) && !OK_LETTER_COMBOS.includes(scramble[a] + scramble[a + 1])) ||
            (a + 2 < scramble.length && VOWELS.includes(scramble[a]) && VOWELS.includes(scramble[a + 1]) && VOWELS.includes(scramble[a + 2])) ||
            (a + 2 < scramble.length && !VOWELS.includes(scramble[a]) && !VOWELS.includes(scramble[a + 1]) && !VOWELS.includes(scramble[a + 2]) && !OK_LETTER_COMBOS.includes(scramble[a] + scramble[a + 1] + scramble[a + 2]))
        ) {         
            return false;
        }
    }
    return true;
}

var hasEasyLetterPlacement = (scramble, word) => {
    if (word[0] === scramble[0]) {
        return true;
    }

    for (let y = 0; y < word.length - 1; y++) {
        if (word[y] === scramble[y] && word[y + 1] === scramble[y + 1]) {
            return true;
        }
    }

    return false;
}

var hasZeroCorrectLetterPlacement = (scramble, word) => {
    for (let z = 0; z < word.length; z++) {
        if (word[z] === scramble[z]) {
            return false;
        }
    }
    return true;
}

var assessWord = (scramble, word) => {
    if (word === scramble) {
        return 'not';
    } else if (hasEasyLetterPlacement(scramble, word) && !scrambleLooksReal(scramble)) {
        return 'poor';
    } else if (hasZeroCorrectLetterPlacement(scramble, word) && scrambleLooksReal(scramble)) {
        return 'hard';
    }
    return 'fair';
}

var assessWords = (wordPairs) => {
    let assessments = [];

    for (let x = 0; x < wordPairs.length; x++) {
        var [scramble, word] = wordPairs[x].split(" ");
        let assessment = assessWord(scramble, word);
        assessments.push(`${scramble} is ${assessment === 'not' ? '' : 'a '}${assessment}${assessment === 'not' ? ' a' : ''} scramble of ${word}`);
    }

    return assessments;
}

module.exports = {scrambleLooksReal, assessWords};
