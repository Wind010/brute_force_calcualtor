const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"
    , "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
    , "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
    , "!", "@", "#", "$", "%", "^", "&", "*", "_", "-", "."];


function animate(id, writeTimeout = 75, incrementTimeout = 1000, resetTimeout = 1500, loop = true) {
    let el = $(id);
    if (el.length == 0) {return;}
    $(el).addClass("unlit");

    let word = el.html().trim();
    let letter_count = 0;
    let finished = false;

    el.html("");
    for (var i = 0; i < word.length; i++) {
        el.append("<span loaded>" + word.charAt(i) + "</span>");
    }

    setTimeout(write, writeTimeout);
    incrementer = setTimeout(inc, 1000);

    function write() {
        for (var i = letter_count; i < word.length; i++) {
            var c = Math.floor(Math.random() * alphabet.length);
            $("span[loaded]")[i].innerHTML = alphabet[c];
        }
        if (!finished) {
            setTimeout(write, writeTimeout);
        }
    }

    function inc() {
        $("span[loaded]")[letter_count].innerHTML = word[letter_count];
        $("span[loaded]:eq(" + letter_count + ")").addClass("glow");
        letter_count++;
        if (letter_count >= word.length) {
            finished = true;
            if (loop) {
                setTimeout(reset, resetTimeout);
            }
        } else {
            setTimeout(inc, incrementTimeout);
        }
    }

    function reset() {
        letter_count = 0;
        finished = false;
        setTimeout(inc, incrementTimeout);
        setTimeout(write, writeTimeout);
        $("span[loaded]").removeClass("glow");
    }
}


$(document).ready(function () {
    var ids = ["#loading"];
    ids.forEach((id) => {
        animate(id, loop=false);
        //animate(id, 50, 50, 500);
    });
});