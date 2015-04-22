/*
	Language: juliar
	Moto: "Web for a nonlogical mind"
	Version: 0.1
	First Published: 4/12/2015
	Creator: Andrei Makhanov
	Official Repository: https://github.com/juliarLang
	Official Website: http://s13.zifboards.com/juliar
	Comment:
	I created this programming language for Julia hence the name of the language juliar.
	She has an artistic mind and thus, it's difficult for her to code in language, let alone javascript and css.
	This language is simple to use and people with a nonlogical mind will be able to use it quickly and easily.
	Juliar can be easily  integrated into other sites simply by using <juliar></juliar> tags.
	This language is inspired by BBCode, Python, HTML 3.2, and AngularJS.
	If you have an improvement to the language i.e. improved code or a new function please commit it on github 
	and I will gladly "pull" your request.
	Please consider donating, all the money will go into an upkeep of the website and improvement of the language.
	Licensed under GPL 3.0
*/
var juliar_globals = {};

function juliar_injectcss() {
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".smaller{font-size:85%}.larger{font-size:115%}.subscript{vertical-align: sub;font-size: smaller;}.superscript{vertical-align: super;font-size: smaller;}.underline{text-decoration: underline;}.bold{font-weight: bold;}.italics{font-style: italic;}.crossout{text-decoration: line-through;}.overline{text-decoration: overline;}";
    document.body.appendChild(css);
}

function version(str) {
    return "Juliar Version 0.1. Created by Andrei Makhanov ";
}

function left(str) {
    return "<p style='text-align:left'>" + str + "</p>";
}

function right(str) {
    return "<p style='text-align:right'>" + str + "</p>";
}

function middle(str) {
    return "<p style='text-align:center'>" + str + "</p>";
}

function set(str) {
    var temp = str.split(" ").filter(function(n) {
        return n != ""
    }).shift();
    return juliar_globals[temp.slice(1)] = str.slice(++temp.length);
}

function get(str) {
    return juliar_globals[str.trim()];
}

function color(str) {
    var temp = str.split(" ").filter(function(n) {
        return n != ""
    }).shift();
    var arr = temp.slice(1).split(",");
    return "<span style='color: " + temp.slice(1) + "'> " + str.slice(temp.length) + "</span>";
}

function background(str) {
    document.body.style.backgroundColor = str;
    return "";
}

function banner(str) {
    return "<img style='width:100%;height:200px;margin:0;' src='" + str.trim() + "'/>";
}

function size(str) {
    var temp = str.split(" ").filter(function(n) {
        return n != ""
    }).shift();
    var arr = temp.slice(1).split(",");
    return "<span style='font-size: " + temp.slice(1) + "'> " + str.slice(temp.length) + "</span>";
}

function font(str) {
    var temp = str.split(" ").filter(function(n) {
        return n != ""
    }).shift();
    var arr = temp.slice(1).split(",");
    return "<span style='font-family: " + temp.slice(1) + "'> " + str.slice(temp.length) + "</span>";
}

function condition(str) {
    var temp = str.split(" ").filter(function(n) {
        return n != ""
    }).shift();
    var arr = temp.slice(1).split(",");
    str = str.slice(++temp.length);
    for (var i = 0; i < arr.length; i++) {
        if (eval(arr[i])) return str;
    }
    return "";
}

//Header & Title
function title(str) {
    return "<h1 style='text-align:center'>" + str + "</h1>";
}

function author(str) {
    return "<h2 style='text-align:center'>" + str + "</h2>";
}

function loop(str) {
    var temp = str.split(" ").filter(function(n) {
        return n != ""
    })[0].slice(1);
    str = str.slice(++temp.length);
    var output = "";
    for (var i = 0; i < temp; i++) {
        output += str;
    }
    return output;
}

function hide(str) {
    return "";
}

function picture(str) {
    return "<img src='" + str.trim() + "'/>";
}

function video(str) {
    return '<video src="' + str + '" controls="controls">Your browser does not support HTML Video</video>';
}

function music(str) {
    return '<audio src="' + str + '" controls="controls">Your browser does not support HTML Audio</audio>';
}

function backgroundrainbow(str) {
    var temp = str.split(" ").filter(function(n) {
        return n != ""
    }).shift();
    var arr = temp.slice(1).split(",");
    str = str.slice(temp.length);
    var index = 0;
    output = "";
    for (var i = 0; i < str.length; i++) {
        if (index == arr.length) index = 0;
        output += "<span style='background-color:" + arr[index++] + "'>" + str[i] + "</span>";
    }
    return output;
}


function rainbow(str) {
    var temp = str.split(" ").filter(function(n) {
        return n != ""
    }).shift();
    var arr = temp.slice(1).split(",");
    str = str.slice(temp.length);
    var index = 0;
    output = "";
    for (var i = 0; i < str.length; i++) {
        if (index == arr.length) index = 0;
        output += "<span style='color:" + arr[index++] + "'>" + str[i] + "</span>";
    }
    return output;
}

function commands(str) { //List commands
    return "[commands,help,pick,randomize]";
}

function help(str) { //Opens Documentation for the commands
    return "Type help + command  to see help";
}


//Max,Min & Absolute

function randomnumber(str) {
    return Math.floor((Math.random() * 100) + 1);
}

function largestnumber(str) {
    return Number.MAX_SAFE_INTEGER;
}

function smallestnumber(str) {
    return Number.MIN_SAFE_INTEGER;
}

function maximum(str) {
    return Math.max.apply(Math, str.split(" "));
}

function minimum(str) {
    return Math.min.apply(Math, str.split(" "));
}

function absolute(str) {
    return str.split(" ").map(Math.abs).join(" ");
}

function ask(str) {
    return prompt(str, "");
}

function error(str) {
    return "<script>alert('" + str + "')</script>";
}

function pick(str) {
    var temp = str.split(" ").filter(function(n) {
        return n != ""
    });
    return temp[Math.floor(Math.random() * temp.length)];
}

function randomize(str) {
    var arr = str.split(" ").filter(function(n) {
        return n != ""
    });
    var currentIndex = arr.length,
        temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
    }
    return arr.join(' ');
}

//Calls
function javascript(str) {
    return eval(str);
}

function css(str) {
    return "<style>" + str + "</style>";
}

//Ajax Requests
function fetch(str) { //Need to test more...make it async...
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", str, false);
    xmlhttp.send();
    return xmlhttp.responseText;
}

//Effect Scripts
function smaller(str) {
    return "<span class='smaller'>" + str + "</span>";
}

function larger(str) {
    return "<span class='larger'>" + str + "</span>";
}

function shrink(str) {
    var output = "";
    for (var i = 0; i < str.length; i++) output += "<span class='smaller'>" + str[i];
    for (var i = 0; i < str.length; i++) output += "</span>";
    return output;
}

function grow(str) {
    var output = "";
    for (var i = 0; i < str.length; i++) output += "<span class='larger'>" + str[i];
    for (var i = 0; i < str.length; i++) output += "</span>";
    return output;
}

function subscript(str) {
    return "<span class='subscript'>" + str + "</span>";
}

function superscript(str) {
    return "<span class='superscript'>" + str + "</span>";
}

function overline(str) {
    return "<span class='overline'>" + str + "</span>";
}

function crossout(str) {
    return "<span class='crossout'>" + str + "</span>";
}

function underline(str) {
    return "<span class='underline'>" + str + "</span>";
}

function bold(str) {
    return "<span class='bold'>" + str + "</span>";
}

function italics(str) {
    return "<span class='italics'>" + str + "</span>";
}

//Math Functions
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function sin(str) {
    return Math.sin(str);
}

function cos(str) {
    return Math.cos(str);
}

function tangent(str) {
    return Math.tan(str);
}


function divide(str) {
    var temp;
    str.split(" ").forEach(function(element) {
        if (isNumber(element)) {
            if (temp == null) {
                temp = Number(element);
            } else {
                temp /= Number(element);
            }
        }
    });
    return temp;
}

function multiply(str) {
    var temp = 1;
    str.split(" ").forEach(function(element) {
        if (isNumber(element)) {
            temp *= Number(element);
        }
    });
    return temp;
}

function add(str) {
    var temp = 0;
    str.split(" ").forEach(function(element) {
        if (isNumber(element)) {
            temp += Number(element);
        }
    });
    return temp;
}

function subtract(str) {
    var temp = 0;
    str.split(" ").forEach(function(element) {
        if (isNumber(element)) {
            temp -= Number(element);
        }
    });
    return temp;
}

function juliar_pick(str) {
    switch (str[0]) {
        case 'a':
            if (str.substr(0, 8) == "absolute") return absolute(str.substr(9));
            else if (str.substr(0, 3) == "add") return add(str.substr(4));
            else if (str.substr(0, 3) == "ask") return ask(str.substr(4));
            else if (str.substr(0, 6) == "author") return author(str.substr(7));
            break;
        case 'b':
            if (str.substr(0, 10) == "background") return background(str.substr(10));
            else if (str.substr(0, 17) == "backgroundrainbow") return backgroundrainbow(str.substr(17));
            else if (str.substr(0, 6) == "banner") return banner(str.substr(6));
            else if (str.substr(0, 4) == "bold") return bold(str.substr(5));
            break;
        case 'c':
            if (str.substr(0, 5) == "color") return color(str.substr(5));
            else if (str.substr(0, 8) == "commands") return commands(str.substr(9));
            else if (str.substr(0, 9) == "condition") return condition(str.substr(9));
            else if (str.substr(0, 8) == "crossout") return crossout(str.substr(9));
            else if (str.substr(0, 3) == "css") return css(str.substr(4));
            break;
        case 'd':
            if (str.substr(0, 6) == "divide") return divide(str.substr(7));
            break;
        case 'e':
            if (str.substr(0, 5) == "error") return error(str.substr(6));
            break;
        case 'f':
            if (str.substr(0, 5) == "fetch") return fetch(str.substr(6));
            else if (str.substr(0, 4) == "font") return font(str.substr(4));
            break;
        case 'g':
            if (str.substr(0, 3) == "get") return get(str.substr(4));
            else if (str.substr(0, 4) == "grow") return grow(str.substr(5));
            break;
        case 'h':
            if (str.substr(0, 4) == "hide") return comment(str.substr(5));
            break;
        case 'i':
            if (str.substr(0, 7) == "italics") return italics(str.substr(8));
            break;
        case 'j':
            if (str.substr(0, 10) == "javascript") return javascript(str.substr(11));
            break;
        case 'k':
            break;
        case 'l':
            if (str.substr(0, 6) == "larger") return larger(str.substr(7));
            else if (str.substr(0, 13) == "largestnumber") return largestnumber(str.substr(14));
            else if (str.substr(0, 4) == "left") return left(str.substr(5));
            else if (str.substr(0, 4) == "loop") return loop(str.substr(4));
            break;
        case 'm':
            if (str.substr(0, 7) == "maximum") return maximum(str.substr(8));
            else if (str.substr(0, 6) == "middle") return middle(str.substr(7));
            else if (str.substr(0, 7) == "minimum") return minimum(str.substr(8));
            else if (str.substr(0, 8) == "multiply") return multiply(str.substr(9));
            else if (str.substr(0, 5) == "music") return music(str.substr(5));
            break;
        case 'n':
            break;
        case 'o':
            if (str.substr(0, 8) == "overline") return overline(str.substr(9));
            break;
        case 'p':
            if (str.substr(0, 4) == "pick") return pick(str.substr(5));
            else if (str.substr(0, 7) == "picture") return picture(str.substr(7));
            break;
        case 'q':
            break;
        case 'r':
            if (str.substr(0, 7) == "rainbow") return rainbow(str.substr(7));
            else if (str.substr(0, 9) == "randomize") return randomize(str.substr(10));
            else if (str.substr(0, 12) == "randomnumber") return randomnumber(str.substr(12));
            else if (str.substr(0, 5) == "right") return right(str.substr(6));
            break;
        case 's':
            if (str.substr(0, 3) == "set") return set(str.substr(3));
            else if (str.substr(0, 6) == "shrink") return shrink(str.substr(7));
            else if (str.substr(0, 4) == "size") return size(str.substr(4));
            else if (str.substr(0, 7) == "smaller") return smaller(str.substr(8));
            else if (str.substr(0, 14) == "smallestnumber") return smallestnumber(str.substr(15));
            else if (str.substr(0, 9) == "subscript") return subscript(str.substr(10))
            else if (str.substr(0, 8) == "subtract") return subtract(str.substr(9));
            else if (str.substr(0, 11) == "superscript") return superscript(str.substr(12));
            break;
        case 't':
            if (str.substr(0, 5) == "title") return title(str.substr(6));
            break;
        case 'u':
            if (str.substr(0, 9) == "underline") return underline(str.substr(10));
            break;
        case 'v':
            if (str.substr(0, 7) == "version") return version(str.substr(8));
            else if (str.substr(0, 5) == "video") return video(str.substr(5));
            break;
        case 'w':
            break;
        case 'x':
            break;
        case 'y':
            break;
        case 'z':
            break;
        default:
            break;
    }
}

function juliar_parse(str) {
    str = str.slice(1, -1);
    var stack = 0;
    var begin = 0;
    var last = 0;
    var m;
    var sliced;
    while ((m = str.indexOf("*", last)) != -1) {
        if (str.charAt(m + 1) == "" || str.charAt(m + 1) == " " || str.charAt(m + 1) == "*" || str.charAt(m + 1) == "\n") {
            if (!--stack) {
                sliced = str.slice(begin, m + 1);
                str = str.replace(sliced, juliar_parse(sliced));
                m = begin - 1;
            }
        } else {
            if (stack == 0) {
                begin = m;
            }
            stack++;
        }
        last = m + 1;
    }
    if (stack != 0) alert("juliarError 1: unbalanced brackets");
    return juliar_pick(str);
}

function juliar() {
    var stack = 0;
    var begin = 0;
    var last = 0;
    var m;
    var sliced;
    var juliars = document.getElementsByTagName("juliar");
    for (var juliar = juliars.length; juliar--;) {
        var str = juliars[juliar].innerHTML;
        while ((m = str.indexOf("*", last)) != -1) {
            if (str.charAt(m + 1) == "" || str.charAt(m + 1) == " " || str.charAt(m + 1) == "*" || str.charAt(m + 1) == "\n") {
                if (!--stack) {
                    sliced = str.slice(begin, m + 1);
                    str = str.replace(sliced, juliar_parse(sliced));
                    m = begin - 1;
                }
            } else {
                if (stack == 0) {
                    begin = m;
                }
                stack++;
            }
            last = m + 1;
        }
        if (stack != 0) alert("juliarError 1: unbalanced brackets");
        juliars[juliar].innerHTML = str;
    }
    juliar_injectcss();
    console.log("Juliar Execution Completed");
    var ijuliars = document.getElementsByTagName("ijuliar");
    for (juliar = ijuliars.length; juliar--;) {
        var stack = 0;
        var begin = 0;
        var last;
        var m;
        var sliced;
        ijuliars[juliar].innerHTML = "<br> > <input type='text' style='width: 50%;border-top: 0;border-right: 0;border-left: 0;background: transparent;'>";
        ijuliars[juliar].onkeypress = function(e) {
            last = 0;
            begin = 0;
            stack = 0;
            if (!e) e = window.event;
            var keyCode = e.keyCode || e.which;
            if (keyCode == '13') {
                var str = this.lastChild.value;
                while ((m = str.indexOf("*", last)) != -1) {
                    if (str.charAt(m + 1) == "" || str.charAt(m + 1) == " " || str.charAt(m + 1) == "*" || str.charAt(m + 1) == "\n") {
                        if (!--stack) {
                            sliced = str.slice(begin, m + 1);
                            str = str.replace(sliced, juliar_parse(sliced));
                            m = begin - 1;
                        }
                    } else {
                        if (stack == 0) {
                            begin = m;
                        }
                        stack++;
                    }
                    last = m + 1;
                }
                if (stack != 0) alert("juliarError 1: unbalanced brackets");
                var temp = document.createElement("div");
                temp.innerHTML = str;
                this.insertBefore(temp, this.lastChild);
                this.lastChild.value = "";
                return false;
            }
        }
    }
}
window.onload = juliar;
