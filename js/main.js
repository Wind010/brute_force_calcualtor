"use strict";


function hasUpper(password) {
    "use strict";

    return (/[A-Z]/.test(password));
}

function hasLower(password) {
    "use strict";

    return (/[a-z]/.test(password));
}

function hasNumber(password) {
    "use strict";

    return (/[0-9]/.test(password));
}

function hasSymbol(password) {

    //return (/[!-\/:-@\[-`{-~]/.test(password));
    return (/[!@#$%^&*()_+=[\]{};':"\\|,.<>/?~`\-]/.test(password));
}


function calculateComplexity(password) {
    "use strict";

    var complexity = 0;

    // Can update with additional language characters, 
    // special characters (e.g., ©, ™, °),
    // and emojis 🚀
    if (hasUpper(password)) {
        complexity += 26;
    }
    if (hasLower(password)) {
        complexity += 26;
    }
    if (hasNumber(password)) {
        complexity += 10;
    }
    if (hasSymbol(password)) {
        complexity += 32;
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

    regExps.forEach(function (regexp) {
        if (regexp.test(password)) {
            complexity++;
        }
    });

    return {
        value: complexity,
        max: regExps.length * password.length
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

function updateCombinations(complexity) {
    var password = document.getElementById('password').value;
    var possibleCombinations = calculateCombinations(password);
    var possibleCombinations = Math.pow(complexity, password.length);

    document.getElementById('possibleCombos').textContent = possibleCombinations;
    document.getElementById('possibleCombosScientific').textContent = formatNumber(possibleCombinations, 100000);
    document.getElementById('complexity').textContent = complexity;
    document.getElementById('length').textContent = password.length;
    document.getElementById('average').textContent = possibleCombinations / 2;
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


$(document).ready(function () {
    $('#password').on('keyup', function () {
        let complexity = calculateComplexity($('#password').val());
        updateCombinations(complexity);
        checkPasswordStregth(complexity);
    });
});
