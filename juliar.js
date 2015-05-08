/*
	Language: *Juliar *
	Moto: "Language for an artistic mind"
	Type: Main
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
var juliar_core_globals = {};
var juliar_core_modules = [];

var juliar_core_history_index = 0;
var juliar_core_history_arr = [];

function ijuliar_injectcss() {
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".smaller{font-size:85%}.larger{font-size:115%}.subscript{vertical-align: sub;font-size: smaller;}.superscript{vertical-align: super;font-size: smaller;}.underline{text-decoration: underline;}.bold{font-weight: bold;}.italics{font-style: italic;}.crossout{text-decoration: line-through;}.overline{text-decoration: overline;}";
    document.body.appendChild(css);
}

function juliar_core_version(str) {
    return "Juliar Version 0.1. Created by Andrei Makhanov ";
}

function juliar_core_import(str){
	str = str.trim();
	var http = new XMLHttpRequest();
	http.open('GET', "juliar_modules/"+str+".juliar", false);
	http.send(null);
	if(http.status!=200) return "Cannot load module \""+str+"\". Make sure that module is in juliar_modules/";
	var fileref=document.createElement('script');
	fileref.type = "text/javascript";
	fileref.textContent = http.responseText;
	document.head.appendChild(fileref);
	var index = juliar_core_modules.indexOf(str);
	if (index >= 0) {
		juliar_core_modules.splice( index, 1);
	}
	juliar_core_modules.push(str);
	return "Imported Module \""+str+"\"";
}

function juliar_core_deport(str){
	var index = juliar_core_modules.indexOf(str);
	if (index >= 0) {
		juliar_core_modules.splice( index, 1 );
	}
	return "Deported Module \""+str+"\"";
}

function juliar_core_modules(str){
	return juliar_core_modules.toString();
}

function juliar_core_left(str) {
    return "<p style='text-align:left'>" + str + "</p>";
}

function juliar_core_right(str) {
    return "<p style='text-align:right'>" + str + "</p>";
}

function juliar_core_middle(str) {
    return "<p style='text-align:center'>" + str + "</p>";
}

function juliar_core_set(str) {
    var temp = str.split(" ").filter(function(n) {
        return n != ""
	}).shift();
    return juliar_core_globals[temp.slice(1)] = str.slice(++temp.length);
}

function juliar_core_get(str) {
    return juliar_core_globals[str.trim()];
}

function juliar_core_color(str) {
    var temp = str.split(" ").filter(function(n) {
        return n != "";
	}).shift();
    var arr = temp.slice(1).split(",");
    return "<span style='color: " + temp.slice(1) + "'> " + str.slice(temp.length) + "</span>";
}

function juliar_core_background(str) {
    document.body.style.backgroundColor = str;
    return "";
}

function juliar_core_banner(str) {
    return "<img style='width:100%;height:200px;margin:0;' src='" + str.trim() + "'/>";
}

function juliar_core_size(str) {
    var temp = str.split(" ").filter(function(n) {
        return n != ""
	}).shift();
    var arr = temp.slice(1).split(",");
    return "<span style='font-size: " + temp.slice(1) + "'> " + str.slice(temp.length) + "</span>";
}

function juliar_core_font(str) {
    var temp = str.split(" ").filter(function(n) {
        return n != ""
	}).shift();
    var arr = temp.slice(1).split(",");
    return "<span style='font-family: " + temp.slice(1) + "'> " + str.slice(temp.length) + "</span>";
}

function juliar_core_condition(str) {
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
function juliar_core_title(str) {
    return "<h1 style='text-align:center'>" + str + "</h1>";
}

function juliar_core_author(str) {
    return "<h2 style='text-align:center'>" + str + "</h2>";
}

function juliar_core_loop(str) {
    var temp = str.split(" ").filter(function(n) {
        return n != ""
	})[0].slice(1) | 1;
    str = str.slice(++temp.length);
    var output = "";
    for (var i = 0; i < temp; i++) {
        output += str;
	}
    return output;
}

function juliar_core_hide(str) {
    return "";
}

function juliar_core_picture(str) {
    return "<img src='" + str.trim() + "'/>";
}

function juliar_core_video(str) {
	if(str.indexOf("//www.youtube.com/watch?v=") != -1) return '<iframe width="420" height="315" src="https://www.youtube.com/embed/'+str.split('?v=')[1]+'" frameborder="0" allowfullscreen></iframe>';
	else if(str.indexOf("//youtu.be/") != -1) return '<iframe width="420" height="315" src="https://www.youtube.com/embed/'+str.split('youtu.be/')[1]+'" frameborder="0" allowfullscreen></iframe>';
    return '<video src="' + str + '" controls="controls">Your browser does not support HTML Video</video>';
}

function juliar_core_music(str) {
    return '<audio src="' + str + '" controls="controls">Your browser does not support HTML Audio</audio>';
}

function juliar_core_highlight(str) {
    var temp = str.split(" ").filter(function(n) {
        return n != ""
	}).shift();
    var arr = temp.slice(1).split(",");
    str = str.slice(temp.length);
    var index = 0;
    var output = "";
	var escaper = 0;
    for (var i = 0; i < str.length; i++) {
        if (index == arr.length) index = 0;
		if(str[i] == '<') escaper = 1;
        if(escaper == 0) output += "<span style='background-color:" + arr[index++] + "'>" + str[i] + "</span>";
		else {output += str[i];}
		if(str[i] == '>' && escaper == 1) escaper = 0;
	}
    return output;
}


function juliar_core_rainbow(str) {
    var temp = str.split(" ").filter(function(n) {
        return n != ""
	}).shift();
    var arr = temp.slice(1).split(",");
    str = str.slice(temp.length);
    var index = 0;
    var output = "";
	var escaper = 0;
    for (var i = 0; i < str.length; i++) {
        if (index == arr.length) index = 0;
		if(str[i] == '<') escaper = 1;
        if(escaper == 0) output += "<span style='color:" + arr[index++] + "'>" + str[i] + "</span>";
		else {output += str[i];}
		if(str[i] == '>' && escaper == 1) escaper = 0;
	}
    return output;
}

function juliar_core_commands(str) { //List commands
	var functions = "";     
	for( var x in window) {
		if(typeof window[x] === "function" && x.indexOf("juliar_") === 0) {
			functions += "\\*"+x.substr(7) + " \\*<br>";
		}
	}
    return functions;
}

function juliar_core_help(str) { //Opens Documentation for the commands
    return "Type \* help + command  to see help";
}


//Max,Min & Absolute

function juliar_core_randomnumber(str) {
	if(isNaN(str)) str = 100;
    return Math.floor((Math.random() * str) + 1);
}

function juliar_core_largestnumber(str) {
    return Number.MAX_SAFE_INTEGER;
}

function juliar_core_smallestnumber(str) {
    return Number.MIN_SAFE_INTEGER;
}

function juliar_core_maximum(str) {
    return Math.max.apply(Math, str.split(" "));
}

function juliar_core_minimum(str) {
    return Math.min.apply(Math, str.split(" "));
}

function juliar_core_absolute(str) {
    return str.split(" ").map(Math.abs).join(" ");
}

function juliar_core_ask(str) {
    return prompt(str, "");
}

function juliar_core_error(str) {
	alert(str);
    return "";
}

function juliar_core_pick(str) {
    var temp = str.split(" ").filter(function(n) {
        return n != ""
	});
    return temp[Math.floor(Math.random() * temp.length)];
}

function juliar_core_randomize(str) {
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
function juliar_core_javascript(str) {
    return eval(str);
}

function juliar_core_css(str) {
    return "<style>" + str + "</style>";
}

//Ajax Requests
function juliar_core_fetch(str) { //Need to test more...make it async...
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", str, false);
    xmlhttp.send();
    return xmlhttp.responseText;
}

//Effect Scripts
function juliar_core_smaller(str) {
    return "<span class='smaller'>" + str + "</span>";
}

function juliar_core_larger(str) {
    return "<span class='larger'>" + str + "</span>";
}

function juliar_core_shrink(str) {
	var output = "";
	var escaper = 0;
	var counter = 0;
    for (var i = 0; i < str.length; i++){
		if(str[i] == '<') escaper = 1;
		if(escaper == 0){ output += "<span class='smaller'>" + str[i]; counter++;}
		else{ output += str[i];}
		if(str[i] == '>' && escaper == 1) escaper = 0;
	}
    for (var i = 0; i < counter; i++) output += "</span>";
    return output;
}

function juliar_core_grow(str) {
    var output = "";
	var escaper = 0;
	var counter = 0;
    for (var i = 0; i < str.length; i++){
		if(str[i] == '<') escaper = 1;
		if(escaper == 0){ output += "<span class='larger'>" + str[i]; counter++;}
		else{ output += str[i];}
		if(str[i] == '>' && escaper == 1) escaper = 0;
	}
    for (var i = 0; i < counter; i++) output += "</span>";
    return output;
}

function juliar_core_subscript(str) {
    return "<span class='subscript'>" + str + "</span>";
}

function juliar_core_superscript(str) {
    return "<span class='superscript'>" + str + "</span>";
}

function juliar_core_overline(str) {
    return "<span class='overline'>" + str + "</span>";
}

function juliar_core_crossout(str) {
    return "<span class='crossout'>" + str + "</span>";
}

function juliar_core_underline(str) {
    return "<span class='underline'>" + str + "</span>";
}

function juliar_core_bold(str) {
    return "<span class='bold'>" + str + "</span>";
}

function juliar_core_italics(str) {
    return "<span class='italics'>" + str + "</span>";
}

//Math Functions
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function juliar_core_sin(str) {
    return Math.sin(str);
}

function juliar_core_cos(str) {
    return Math.cos(str);
}

function juliar_core_tangent(str) {
    return Math.tan(str);
}

function juliar_core_power(str) {
    var temp;
    str.split(" ").forEach(function(element) {
        if (isNumber(element)) {
            if (temp == null) {
                temp = Number(element);
			} 
			else {
                temp = Math.pow(temp, Number(element));
			}
		}
	});
    return temp;
}

function juliar_core_divide(str) {
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

function juliar_core_multiply(str) {
    var temp = 1;
    str.split(" ").forEach(function(element) {
        if (isNumber(element)) {
			temp *= Number(element);
		}
	});
	return temp;
}

function juliar_core_add(str) {
    var temp = 0;
    str.split(" ").forEach(function(element) {
        if (isNumber(element)) {
            temp += Number(element);
		}
	});
    return temp;
}

function juliar_core_subtract(str) {
    var temp = 0;
    str.split(" ").forEach(function(element) {
        if (isNumber(element)) {
            temp -= Number(element);
		}
	});
    return temp;
}

function ijuliar_pick(str) {
	var command = str.split(' ')[0].split("=")[0];
	var first = command[0];
	if (first == '+') command = "add";
	else if(first == '-') command = "subtract";
	else if(first == 'x' && command[1] == undefined) command = "multiply";
	else if(first == '/') command = "divide";
	else if(first == '^') command = "power";
	var len = juliar_core_modules.length;
	while (len--) {
		if (typeof window["juliar_"+juliar_core_modules[len]+"_"+command] === "function") {
			return window["juliar_"+juliar_core_modules[len]+"_"+command](str.substr(command.length));
		}
	}
	if (typeof window["juliar_core_"+command] === "function") {
		return window["juliar_core_"+command](str.substr(command.length));
	}
	return "Unknown command " +str;
}


function ijuliar_parse(str) {
    str = str.slice(1, -1);
	var stack = 0;
	var begin = 0;
	var last = 0;
	var m;
	var sliced;
	while ((m = str.indexOf("*", last)) != -1) {
		if(str.charAt(m-1) == "\\");
		else if (str.charAt(m + 1) == "" || str.charAt(m + 1) == " " || str.charAt(m + 1) == "*" || str.charAt(m + 1) == "\n" || str.charAt(m + 1) == "\t" || str.charAt(m + 1) == "\r") {
			if (!--stack) {
				sliced = str.slice(begin, m + 1);
				str = str.replace(sliced, ijuliar_parse(sliced));
				m = begin - 1;
			}
		}
		else {
			if (stack == 0) {
				begin = m;
			}
			stack++;
		}
		last = m + 1;
	}
	if (stack != 0) alert("juliarError 1: unbalanced brackets");
	return ijuliar_pick(str);
}

function juliar() {
	var stack = 0;
	var begin = 0;
	var last = 0;
	var m;
	var sliced;
	var juliars = document.getElementsByTagName("juliar");
	for (var juliar = juliars.length; juliar--;) {
		last = 0;
		begin = 0;
		stack = 0;
		var str = juliars[juliar].innerHTML;
		juliars[juliar].innerHTML = '<img style="display:block;margin:0 auto;" src=\'data:image/png;base64,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\'>';
		while ((m = str.indexOf("*", last)) != -1) {
			if(str.charAt(m-1) == "\\");
			else if (str.charAt(m + 1) == "" || str.charAt(m + 1) == " " || str.charAt(m + 1) == "*" || str.charAt(m + 1) == "\n" || str.charAt(m + 1) == "\t" || str.charAt(m + 1) == "\r") {
				if (!--stack) {
					sliced = str.slice(begin, m + 1);
					str = str.replace(sliced, ijuliar_parse(sliced));
					m = begin - 1;
				}
			} 
			else {
				if (stack == 0) {
					begin = m;
				}
				stack++;
			}
			last = m + 1;
		}
		if (stack != 0) alert("juliarError 1: unbalanced brackets");
		str = str.replace(/\\\*/gi, "*");
		juliars[juliar].innerHTML = str;
	}
	ijuliar_injectcss();
	console.log("Juliar Execution Completed");
	var ijuliars = document.getElementsByTagName("ijuliar");
	for (juliar = ijuliars.length; juliar--;) {
		stack = 0;
		begin = 0;
		last = 0;
		var m;
		var sliced;
		ijuliars[juliar].innerHTML = "<br><input type='text' style='width: 600px;border-top: 0;border-right: 0;border-left: 0;background: transparent;'>";
		ijuliars[juliar].onkeydown = function(e) {
			last = 0;
			begin = 0;
			stack = 0;
			if (!e) e = window.event;
			var keyCode = e.keyCode || e.which;
			if (keyCode == '13') {
				var str = this.lastChild.value;
				juliar_core_history_arr.unshift(str);
				juliar_core_history_index = 0;
				while ((m = str.indexOf("*", last)) != -1) {
					if(str.charAt(m-1) == "\\");
					else if (str.charAt(m + 1) == "" || str.charAt(m + 1) == " " || str.charAt(m + 1) == "*" || str.charAt(m + 1) == "\n" || str.charAt(m + 1) == "\t" || str.charAt(m + 1) == "\r") {
						if (!--stack) {
							sliced = str.slice(begin, m + 1);
							str = str.replace(sliced, ijuliar_parse(sliced));
							m = begin - 1;
						}
					}
					else {
						if (stack == 0) {
							begin = m;
						}
						stack++;
					}
					last = m + 1;
				}
				if (stack != 0) alert("juliarError 1: unbalanced brackets");
				var temp = document.createElement("div");
				str = str.replace(/\\\*/gi, "*");
				temp.innerHTML = str;
				this.insertBefore(temp, this.lastChild);
				this.lastChild.value = "";
				return false;
			}
			else if(keyCode == '38'){
				if(juliar_core_history_arr.length == 0) return false;
				else if(juliar_core_history_index == juliar_core_history_arr.length) juliar_core_history_index = 0;
				this.lastChild.value = juliar_core_history_arr[juliar_core_history_index++];
				console.log(juliar_core_history_index);
				return false;
			}
			else if(keyCode == '40'){
				if(juliar_core_history_arr.length == 0) return false;
				else if(juliar_core_history_index == -1) juliar_core_history_index = juliar_core_history_arr.length -1;
				this.lastChild.value = juliar_core_history_arr[juliar_core_history_index--];
				console.log(juliar_core_history_index);
				return false;
			}
		}
	}
}
window.onload = juliar;
