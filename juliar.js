/*
	Language: juliar
	Moto: "Web for a nonlogical mind"
	Version: 0.1
	Updated: 4/14/2015
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

function juliar_injectcss(){
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = ".smaller{font-size:80%}.larger{font-size:120%}.subscript{vertical-align: sub;font-size: smaller;}.superscript{vertical-align: super;font-size: smaller;}.underline{text-decoration: underline;}.bold{font-weight: bold;}.italics{font-style: italic;}.crossout{text-decoration: line-through;}.overline{text-decoration: overline;}";
	document.body.appendChild(css);
}
function version(str){
	return "version 0.1";
}

function loop(str){
	var temp = str.split(" ").filter(function(n){ return n != "" })[0].slice(1);
	str = str.slice(++temp.length);
	var output = "";
	for(var i=0; i<temp; i++){
		output += str;
	}
	return output;
}

function picture(str){
	return "<img src='"+str.trim()+"'/>";
}

function backgroundrainbow(str){
	var temp = str.split(" ").filter(function(n){ return n != "" }).shift();
	var arr = temp.slice(1).split(",");
	str = str.slice(temp.length);
	var index= 0;
	output = "";
	for(var i=0;i<str.length;i++){
		console.log(index + "1");
		if(index == arr.length) index = 0;
		output += "<span style='background-color:"+arr[index++]+"'>"+str[i]+"</span>";
	}
	return output;	
}


function rainbow(str){
	var temp = str.split(" ").filter(function(n){ return n != "" }).shift();
	var arr = temp.slice(1).split(",");
	str = str.slice(temp.length);
	var index= 0;
	output = "";
	for(var i=0;i<str.length;i++){
		console.log(index + "1");
		if(index == arr.length) index = 0;
		output += "<span style='color:"+arr[index++]+"'>"+str[i]+"</span>";
	}
	return output;
}

function commands(str){ //List commands
	return "[commands,help,pick,randomize]";
}

function help(str){ //Opens Documentation for the commands
	return "Type help + command  to see help";
}


//Max,Min & Absolute

function largestnumber(str){
	return Number.MAX_SAFE_INTEGER;
}

function smallestnumber(str){
	return Number.MIN_SAFE_INTEGER;
}

function maximum(str){
	return Math.max.apply(Math, str.split(" "));
}

function minimum(str){
	return Math.min.apply(Math, str.split(" "));
}

function absolute(str){
	return str.split(" ").map(Math.abs).join(" ");
}

function ask(str){
	return prompt(str,"");
}

function error(str){
	return "<script>alert('" + str + "')</script>";
}

function pick(str){
	var temp = str.split(" ").filter(function(n){ return n != "" }); 
	return temp[Math.floor(Math.random() * temp.length)];
}

function randomize(str){
	var arr = str.split(" ").filter(function(n){ return n != "" }); 
	var currentIndex = arr.length, temporaryValue, randomIndex ;
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
function javascript(str){
	return eval(str);
}

function css(str){
	return "<style>" + str + "</style>";
}

//Ajax Requests
function fetch(str){   //Need to test more...make it async...
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET",str,false);
	xmlhttp.send();
	return xmlhttp.responseText;
}

//Effect Scripts
function smaller(str){
	return "<span class='smaller'>"+str+"</span>";
}
function larger(str){
	return "<span class='larger'>"+str+"</span>";
}

function shrink(str){
	var output = "";
	for(var i=0; i<str.length;i++) output += "<span class='smaller'>"+str[i];
	for(var i=0; i<str.length;i++) output += "</span>";
	return output;	
}
function grow(str){
	var output = "";
	for(var i=0; i<str.length;i++) output += "<span class='larger'>"+str[i];
	for(var i=0; i<str.length;i++) output += "</span>";
	return output;
}

function subscript(str){
	return "<span class='subscript'>"+str+"</span>";
}
function superscript(str){
	return "<span class='superscript'>"+str+"</span>";
}
function overline(str){
	return "<span class='overline'>"+str+"</span>";
}
function crossout(str){
	return "<span class='crossout'>"+str+"</span>";
}

function underline(str){
	return "<span class='underline'>"+str+"</span>";
}

function bold(str){
	return "<span class='bold'>"+str+"</span>";
}

function italics(str){
	return "<span class='italics'>"+str+"</span>";
}

//Math Functions
function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

function sin(str){
	return Math.sin(str);
}
function cos(str){
	return Math.cos(str);
}

function tangent(str){
	return Math.tan(str);
}


function divide(str){
	var temp;
	str.split(" ").forEach(function(element){
		if(isNumber(element)){
			if(temp == null){
				temp = Number(element);
				console.log(temp);
				}else{
				console.log(temp);
				temp /= Number(element);
			}
		}
	});
	return temp;
}

function multiply(str){
	var temp = 1;
	str.split(" ").forEach(function(element){
		if(isNumber(element)){
			temp *= Number(element);
		}
	});
	return temp;
}

function add(str){
	var temp = 0;
	str.split(" ").forEach(function(element){
		if(isNumber(element)){
			temp += Number(element);
		}
	});
	return temp;
}

function subtract(str){
	var temp = 0;
	str.split(" ").forEach(function(element){
		if(isNumber(element)){
			temp -= Number(element);
		}
	});
	return temp;
}

function juliar_pick(str){
	if(str.substr(0,3) == "add"){
		return add(str.substr(4));
	}
	else if(str.substr(0,8) == "subtract"){
		return subtract(str.substr(9));
	}
	else if(str.substr(0,8) == "multiply"){
		return multiply(str.substr(9));	
	}
	else if(str.substr(0,6) == "divide"){
		return divide(str.substr(7));	
	}
	else if(str.substr(0,4) == "bold"){
		return bold(str.substr(5));	
	}
	else if(str.substr(0,7) == "italics"){
		return italics(str.substr(8));	
	}
	else if(str.substr(0,9) == "underline"){
		return underline(str.substr(10));	
	}
	else if(str.substr(0,8) == "overline"){
		return overline(str.substr(9));	
	}
	else if(str.substr(0,8) == "crossout"){
		return crossout(str.substr(9));	
	}
	else if(str.substr(0,9) == "subscript"){
		return subscript(str.substr(10));	
	}
	else if(str.substr(0,11) == "superscript"){
		return superscript(str.substr(12));	
	}
	else if(str.substr(0,6) == "larger"){
		return larger(str.substr(7));	
	}
	else if(str.substr(0,7) == "smaller"){
		return smaller(str.substr(8));	
	}
	else if(str.substr(0,6) == "shrink"){
		return shrink(str.substr(7));	
	}
	else if(str.substr(0,4) == "grow"){
		return grow(str.substr(5));	
	}
	else if(str.substr(0,4) == "loop"){
		return loop(str.substr(4));
	}
	else if(str.substr(0,7) == "rainbow"){
		return rainbow(str.substr(7));
	}
	else if(str.substr(0,17) == "backgroundrainbow"){
		return backgroundrainbow(str.substr(17));
	}
	else if(str.substr(0,7) == "picture"){
		return picture(str.substr(7));
	}
	else if(str.substr(0,5) == "fetch"){
		return fetch(str.substr(6));
	}
	else if(str.substr(0,3) == "css"){
		return css(str.substr(4));
	}
	else if(str.substr(0,10) == "javascript"){
		return javascript(str.substr(11));
	}
	else if(str.substr(0,7) == "version"){
		return version(str.substr(8));
	}
	else if(str.substr(0,4) == "pick"){
		return pick(str.substr(5));
	}
	else if(str.substr(0,9) == "randomize"){
		return randomize(str.substr(10));
	}
	else if(str.substr(0,8) == "commands"){
		return commands(str.substr(9));
	}
	else if(str.substr(0,13) == "largestnumber"){
		return largestnumber(str.substr(14));
	}
	else if(str.substr(0,14) == "smallestnumber"){
		return smallestnumber(str.substr(15));
	}
	else if(str.substr(0,7) == "maximum"){
		return maximum(str.substr(8));
	}
	else if(str.substr(0,7) == "minimum"){
		return minimum(str.substr(8));
	}
	else if(str.substr(0,8) == "absolute"){
		return absolute(str.substr(9));
	}
	else if(str.substr(0,5) == "error"){
		return error(str.substr(6));
	}
	else if(str.substr(0,3) == "ask"){
		return ask(str.substr(4));
	}
}

function juliar_parse(str){
	str = str.slice(1,-1);
	var stack = 0;
	var begin = 0;
	var last = 0;
	var m;
	var sliced;
	while((m = str.indexOf("*",last)) != -1){
		if(str.charAt(m+1) == "" || str.charAt(m+1) == " " || str.charAt(m+1) == "*"){
			if(!--stack){
				sliced = str.slice(begin,m+1);
				str = str.replace(sliced,juliar_parse(sliced));
				m = begin-1;
			}
		}
		else{
			if(stack == 0){
				begin = m;
			}
			stack++;
		}
		last = m+1;
	}
	if(stack != 0 ) alert("juliarError 1: unbalanced brackets");
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
		while((m = str.indexOf("*",last))!= -1){
			if(str.charAt(m+1) == "" || str.charAt(m+1) == " " || str.charAt(m+1) == "*"){
				if(!--stack){
					sliced = str.slice(begin,m+1);
					str = str.replace(sliced,juliar_parse(sliced));
					m = begin-1;
				}
			}
			else{
				if(stack == 0){
					begin = m;
				}
				stack++;
			}
			last = m+1;
		}
		if(stack != 0 ) alert("juliarError 1: unbalanced brackets");
		juliars[juliar].innerHTML = str;
	}
	juliar_injectcss();
	console.log("done");
	var ijuliars = document.getElementsByTagName("ijuliar");
	for (juliar = ijuliars.length; juliar--;) {
		var stack = 0;
		var begin = 0;
		var last;
		var m;
		var sliced;
		ijuliars[juliar].innerHTML = "<br> > <input type='text' style='width: 50%;border-top: 0;border-right: 0;border-left: 0;background: transparent;'>";
		ijuliars[juliar].onkeypress = function(e){
			last = 0;
			begin = 0;
			stack = 0;
			if (!e) e = window.event;
			var keyCode = e.keyCode || e.which;
			if (keyCode == '13'){
				var str = this.lastChild.value;
				while((m = str.indexOf("*",last))!= -1){
					if(str.charAt(m+1) == "" || str.charAt(m+1) == " " || str.charAt(m+1) == "*"){
						if(!--stack){
							sliced = str.slice(begin,m+1);
							str = str.replace(sliced,juliar_parse(sliced));
							m = begin-1;
						}
					}
					else{
						if(stack == 0){
							begin = m;
						}
						stack++;
					}
					last = m+1;
				}
				if(stack != 0 ) alert("juliarError 1: unbalanced brackets");
				var temp = document.createElement("div");
				temp.innerHTML = str;
				this.insertBefore(temp, this.lastChild);
				this.lastChild.value = "";
				return false;
			}
		}
	}
}window.onload = juliar;
