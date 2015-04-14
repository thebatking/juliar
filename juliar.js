/*
	Language: juliar
	Moto: "Web for a nonlogical mind"
	Version: 0.1
	Date: 4/12/2015
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

//External Calls
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
	console.log(str);
	console.log(str.split(" "));
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
	console.log(temp);
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
	console.log(str);
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
	}else if(str.substr(0,5) == "fetch"){
		return fetch(str.substr(6));
	}else if(str.substr(0,3) == "css"){
		return css(str.substr(4));
	}else if(str.substr(0,10) == "javascript"){
		return javascript(str.substr(11));
	}else if(str.substr(0,7) == "version"){
		return version(str.substr(8));
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
