$(document).ready(function () {
    let alphabet = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0");
    let letter_count = 0;
    let el = $("#loading");
    let word = el.html().trim();
    let finished = false;

    el.html("");
    for (var i = 0; i < word.length; i++) {
        el.append("<span loaded>" + word.charAt(i) + "</span>");
    }

    setTimeout(write, 75);
    incrementer = setTimeout(inc, 1000);

    function write() {
        for (var i = letter_count; i < word.length; i++) {
            var c = Math.floor(Math.random() * 36);
            $("span[loaded]")[i].innerHTML = alphabet[c];
        }
        if (!finished) {
            setTimeout(write, 75);
        }
    }

    function inc() {
        $("span[loaded]")[letter_count].innerHTML = word[letter_count];
        $("span[loaded]:eq(" + letter_count + ")").addClass("glow");
        letter_count++;
        if (letter_count >= word.length) {
            finished = true;
            setTimeout(reset, 1500);
        } else {
            setTimeout(inc, 1000);
        }
    }

    function reset() {
        letter_count = 0;
        finished = false;
        setTimeout(inc, 1000);
        setTimeout(write, 75);
        $("span[loaded]").removeClass("glow");
    }
});