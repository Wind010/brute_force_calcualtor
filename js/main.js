"use strict";

const LETTER_CARDINALITY = 26;
const DIGIT_CARDINALITY = 10;
const SYMBOL_CARDINALITY = 32;
const POSSIBLITY_SPACE = LETTER_CARDINALITY*2 + DIGIT_CARDINALITY + SYMBOL_CARDINALITY;


function hasUppercase(password) {
    "use strict";

    return (/[A-Z]/.test(password));
}

function hasLowercase(password) {
    "use strict";

    return (/[a-z]/.test(password));
}

function hasDigit(password) {
    "use strict";

    return (/[0-9]/.test(password));
}

function hasSymbol(password) {
    //return (/[!-\/:-@\[-`{-~]/.test(password));
    return (/[!@#$%^&*()_+=[\]{};':"\\|,.<>/?~`\-]/.test(password));
}


function calculateComplexity(password) {
    var complexity = 0;

    // Can update with additional language characters, 
    // special characters (e.g., ©, ™, °),
    // and emojis 🚀
    if (hasUppercase(password)) {
        complexity += LETTER_CARDINALITY;
    }
    if (hasLowercase(password)) {
        complexity += LETTER_CARDINALITY;
    }
    if (hasDigit(password)) {
        complexity += DIGIT_CARDINALITY;
    }
    if (hasSymbol(password)) {
        complexity += SYMBOL_CARDINALITY;
    }

    return complexity;
}



function calculateComplexitySimple(password) {
    var complexity = 0;

    var regExps = [
        /[a-z]/,
        /[A-Z]/,
        /[0-9]/,
        /.{8}/,
        /.{16}/,
        /[!-//:-@[-`{-ÿ]/
    ];

    regExps.forEach((regexp) => {
        if (regexp.test(password)) {
            complexity++;
        }
    });

    return {
        value: complexity,
        max: regExps.length * password.length
    };
}


function calculateComplexityUpdated(password) {
    const lengthWeight = 2;
    const characterSetWeight = 4;
    let complexity = password.length * lengthWeight;

    const characterSetSize = (hasLowercase(password) ? 1 : 0) +
                             (hasUppercase(password) ? 1 : 0) +
                             (hasDigit(password) ? 1 : 0) +
                             (hasSymbol(password) ? 1 : 0);

    complexity += characterSetSize * characterSetWeight;

    return {
        value: complexity,
        max: POSSIBLITY_SPACE
    };
}


function checkPasswordStregth(complexity) {
    var progress = $('#passwordComplexity');
    progress.val(complexity.value);
    progress.attr('max', complexity.max);
};

function calculateCombinations(str) {
    // Compute the number of combinations using the formula C(n, r) = n! / (r! * (n-r)!)
    var n = str.length;
    var numCombinations = 0;

    // Calculate combinations for different lengths from 1 to n (optional)
    for (var r = 1; r <= n; r++) {
        numCombinations += factorial(n) / (factorial(r) * factorial(n - r));
    }

    return numCombinations;
}


function calculateComplexityWithCount(str) {
    let complexity = 0;
    let lowerLetterCount = 0; 
    let upperLetterCount = 0; 
    let digitCount = 0;
    let symbolCount = 0;

    for (let i = 0; i < str.length; i++) {
        if (hasLowercase(str[i])) {
            lowerLetterCount++;
        }
        if (hasUppercase(str[i])) {
            upperLetterCount++;
        }
        if (hasDigit(str[i])) {
            digitCount++;
        }
        if (hasSymbol(str[i])) {
            symbolCount++;
        }
    }

    if (lowerLetterCount) {
        complexity += LETTER_CARDINALITY;
    }
    if (upperLetterCount) {
        complexity += LETTER_CARDINALITY;
    }
    if (digitCount) {
        complexity += DIGIT_CARDINALITY;
    }
    if (symbolCount) {
        complexity += SYMBOL_CARDINALITY;
    }

    return {
        lower: lowerLetterCount,
        upper: upperLetterCount,
        digit: digitCount,
        symbol: symbolCount,
        complexity: complexity
    };
}

function updateCombinations(passwordDetails) {
    const secondsPerDay = 86400;
    const daysPerYear = 365;  // approx
    var password = document.getElementById('password').value;
    //var possibleCombinations = calculateCombinations(password);
    var possibleCombinations = Math.pow(passwordDetails.complexity, password.length);

    var guesesPerSecond = document.getElementById('guessesPerSecond').value;

    document.getElementById('possibleCombos').textContent = possibleCombinations;
    document.getElementById('possibleCombosScientific').textContent = formatNumber(possibleCombinations, 1000);

    document.getElementById('possibleSetCombination').textContent = Math.pow(2, password.length);
    document.getElementById('possibleSetCombinationRepeat').textContent = 
        Math.pow((new Set(password).size + password.length - 1), password.length);

    document.getElementById('complexity').textContent = passwordDetails.complexity;
    document.getElementById('length').textContent = password.length;

    document.getElementById('lowerLetters').textContent = passwordDetails.lower;
    document.getElementById('upperLetters').textContent = passwordDetails.upper;
    document.getElementById('digits').textContent = passwordDetails.digit;
    document.getElementById('symbols').textContent = passwordDetails.symbol;

    document.getElementById('maxInSeconds').textContent = formatNumber(possibleCombinations / guesesPerSecond);
    document.getElementById('averageInSeconds').textContent = formatNumber(possibleCombinations / guesesPerSecond) / 2;
    document.getElementById('maxInDays').textContent = 
        formatNumber(possibleCombinations / (guesesPerSecond * secondsPerDay));
    document.getElementById('averageInDays').textContent = 
        formatNumber(possibleCombinations / (guesesPerSecond * secondsPerDay)) / 2;
    document.getElementById('maxInYears').textContent = 
        formatNumber(possibleCombinations / (guesesPerSecond * secondsPerDay * daysPerYear));
    document.getElementById('averageInYears').textContent = 
        formatNumber(possibleCombinations / (guesesPerSecond * secondsPerDay * daysPerYear)) / 2;
}


function factorial(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * factorial(num - 1);
    }
}

function formatNumber(num, threshold) {
    if (Math.abs(num) >= threshold) {
        // Convert the number to scientific notation with 2 decimal places
        return num.toExponential(2);
    }
    return num.toString();
}


function changeTheme(selectedOption) {
    $('link[rel="stylesheet"]').each(function() {
        var href = $(this).attr('href');
        if (href.startsWith('css')) {
            $(this).attr('href', `css/${selectedOption}`);
        }
    });
}


function updateStatistics()
{
    let password = $('#password').val();
    //let complexity = calculateComplexity(password);
    let complexity = calculateComplexityWithCount(password);
    updateCombinations(complexity);

    // TODO:  Base the progress bar on selected guesses per second.
    var complexity2 = calculateComplexityUpdated(password)
    checkPasswordStregth(complexity2);
}


$(document).ready(function () {
    $('#reset').on('click', function () {
        $('#password').val('')
    });

    $('#password, #guessesPerSecond').on('keyup', function () {
        updateStatistics();
    });

    $(document).on('change', '#select-hash', function() {
        var selectedValue = $(this).val();
        $('#guessesPerSecond').val(selectedValue);
        updateStatistics();
    });

    $('#select-theme').change(function() {
        var selectedOption = $(this).val();
        console.log("Selected option: " + selectedOption);
        changeTheme(selectedOption);
    });
});
