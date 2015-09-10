function Juliar(verbose) {
	this.verbose = verbose || 0;
	this.log = "";
	var objects = {};
	var jscode = [];
	this.modules = [];
	var csscode = "";
	this.css = function(str){csscode+=str;}
	this.getcss = function(){return css;}
	this.index = function(){return jscode.length;};
	this.code = function(code){ jscode.push(code);return jscode.length;};
	this.getcode = function(id){return Number(id) > -1? jscode[id]:jscode;}
	this.checkobject = function(obj){return objects[obj]?  true:false;};
	this.setobject = function(obj,value){return objects[obj] = value;};
	this.getobject = function(obj){return objects[obj];};
	this.deleteobject = function(obj){if(objects[obj]){objects[obj] = undefined;return true;}return false;};
}var juliar = new Juliar();

function Juliar_code(){
	var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = "body{font-family: Tahoma, Geneva, sans-serif;background-repeat:no-repeat;background-size:cover;}";
	css.innerHTML += ".smaller{font-size:85%}.larger{font-size:115%}.subscript{vertical-align: sub;font-size: smaller;}.superscript{vertical-align: super;font-size: smaller;}";
	css.innerHTML += ".underline{text-decoration: underline;}.bold{font-weight: bold;}.italics{font-style: italic;}.crossout{text-decoration: line-through;}.overline{text-decoration: overline;}";
	css.innerHTML =  ".chapter:first-child:first-letter { float: left; color: #903; font-size: 75px; line-height: 60px; padding-top: 4px; padding-right: 8px; padding-left: 3px; }";
    css.innerHTML += ".marquee{margin: 0 auto;overflow: hidden;white-space: nowrap; box-sizing: border-box;}";
	css.innerHTML += ".marquee:hover{animation-play-state: paused}@keyframes marquee{0%{ text-indent: 27.5em }100%{ text-indent: -105em }}";
	css.innerHTML += ".progress-bar{background-color: #1a1a1a;height: 25px;padding: 5px;width: 350px;margin: 50px 0;border-radius: 5px;box-shadow: 0 1px 5px #000 inset, 0 1px 0 #444;}";
	css.innerHTML += ".progress-bar span{display: inline-block;height: 100%;border-radius: 3px;box-shadow: 0 1px 0 rgba(255, 255, 255, .5) inset;transition: width .4s ease-in-out;}";
	css.innerHTML += "text-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.2) inset;";
	css.innerHTML += "transition: all 0.7s ease 0s;}input[type='text'].searchable:focus{width: 200px;}";
	
	
	css.innerHTML += juliar.getcss;
	document.body.appendChild(css);
	var viewPortTag=document.createElement('meta');
	viewPortTag.name = "viewport";
	viewPortTag.content = "initial-scale=1.0, maximum-scale=1.0, user-scalable=0";
	document.getElementsByTagName('head')[0].appendChild(viewPortTag);
	for(var i=0,j=juliar.index();i<j;i++){
		var fileref=document.createElement("script");
		fileref.type = "text/javascript";
		fileref.textContent =juliar.getcode(i);
		document.head.appendChild(fileref);
	}
}

function Juliar_pick(str) {
	var temp = str.split(' ')[0];
	var length = temp.length;
	temp = temp.split("=");
	var command = temp[0];
	var args = temp[1] === undefined ? [] : str.slice(++command.length,length).split(",");
	if(parseInt(command[0])) command =  ["zero","one","two","three","four","five","six","seven","eight","nine","ten"][first] + command.slice(1);
	for(var i = 0, len = juliar.modules.length; i < len;++i) {
		if (typeof window["juliar_"+juliar.modules[i]+"_"+command] === "function") {
			return window["juliar_"+juliar.modules[i]+"_"+command](str.substr(length).trim(),args);
		}
	}
	if (typeof window["juliar_core_"+command] === "function") {
		return window["juliar_core_"+command](str.substr(length).trim(),args);
	}
	return "Unknown command " +str;
}

function Juliar_parser(str) {
	var currentindex=0, nextvalue,lastindex, positions = [];
	while ((currentindex = str.indexOf("*", currentindex)) !== -1) {
		if(str[currentindex-1] == "\\");
		else if (!((nextvalue = str.charCodeAt(currentindex + 1)) === 32 || nextvalue === 42 || nextvalue === 9 || nextvalue === 10 || isNaN(nextvalue))) {
			positions.push(currentindex);
		}
		else{
			if ((lastindex = positions.pop()) === undefined) str = "Code has an extra &#42 at position " + currentindex++ + ". Please remove the extra &#42";
			else {
				var oldstring = str.slice(lastindex, ++currentindex);
				str = str.replace(oldstring, Juliar_pick(oldstring.slice(1, -1)));
				currentindex = lastindex;
			}
		}
		++currentindex;
	}
	if (positions.length > 0) str = "Commands are not properly closed please check to make sure all commands are properly closed!";
	return str.replace(/\\\*/g, "*");
}

function Juliar_interpreter() {
	var ijuliars = document.getElementsByTagName("ijuliar"),len = ijuliars.length;
	if(len != 0){ juliar.history = [];juliar.historyindex = 0;}
	while(len--){
		var jselector = ijuliars[len];
		jselector.innerHTML = "<br><input type='text' style='width: 600px;border-top: 0;border-right: 0;border-left: 0;background: transparent;border-color:rgba(0,0,0,0.3);'>";
		jselector.addEventListener("keydown", Juliar_keydown);
	}
}

function Juliar_keydown(e) {
	var keyCode = e.keyCode;
	var target = e.target;
	if (keyCode === 13) {
		var str = target.value;
		juliar.history.unshift(str);
		juliar.historyindex = 0;
		var temp = document.createElement("div");
		temp.innerHTML = Juliar_parser(str);
		target.parentNode.insertBefore(temp, target);
		target.value = "";
		var event = new Event('juliar_done');
		document.dispatchEvent(event);
	}
	else if (keyCode === 38) {
		if (juliar.history.length !== 0) {
			if (juliar.historyindex === juliar.history.length) {
				juliar.historyindex = 0;
			}
			target.value = juliar.history[juliar.historyindex];
			juliar.historyindex += 1;
		}
	}
	else if (keyCode === 40) {
		if (juliar.history.length !== 0) {
			if (juliar.historyindex === -1) {
				juliar.historyindex = juliar.history.length - 1;
			}
			target.value = juliar.history[juliar.historyindex];
			juliar.historyindex -= 1;
		}
	}
}

function juliar_core_init(){
	var juliars = document.getElementsByTagName("juliar");
	for (var i = 0, juliar = juliars.length; i < juliar; i++) {
		var jselector = juliars[i];
		jselector.innerHTML = Juliar_parser(jselector.innerHTML);
	}
	Juliar_code();
	Juliar_interpreter();
	document.dispatchEvent(new Event('juliar_done'));
}

//Main Core
function juliar_core_version(){
	return "Language *Juliar* version alpha 2. Running on " + navigator.userAgent;
}

function juliar_core_help(str) { //Opens Documentation for the commands
	if(str.replace(/ /g,'')) return "Type \\*help  'command name' \\* to see help";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "http://www.juliar.elementfx.com/juliar/help?q="+str, !1);
	xmlhttp.send();
	if(xmlhttp.status!=200) return "No Such Command Exists. Please Check Spelling";
	return xmlhttp.responseText;
}

function juliar_core_loop(str,args) {
	var temp = args[0] || 1;
	var output = str;
	for(var i=1; i<temp; ++i){
		output += " "+str+" ";
	}
	return output;
}

function juliar_core_evaluate(str){
	return eval(str);
}

function juliar_core_condition(str,args) { //OR conditional....May need to modify later...
	if(args[0] === undefined) return str;
	for (var i = 0, length = args.length; i < length; ++i) {
		if (eval(args[i])) return str;
	}
	return "";
}

function juliar_core_code(str){
	return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function juliar_core_hide() {
	return "";
}

function juliar_core_deport(a) {
	var b = juliar.modules.indexOf(a);
	return -1 < b ? (juliar.modules.splice(b, 1), 'Deported Module "' + a + '"') : 'Module "' + a + '" does not exists';
}

function juliar_core_download(str){
	if(str.indexOf("//") === -1){
		var temp = str.split("/");
		str = "http://github-raw-cors-proxy.herokuapp.com/"+temp.shift()+"/"+temp.shift()+"/master/"+temp.join("/")+".juliar";
	}
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", str, !1);
	xmlhttp.send();
	if(xmlhttp.status!=200) return "Cannot download the module. Make sure you provide correct link";
	if(xmlhttp.responseText.indexOf("Not Found") == 1) return "Cannot download module from GitHub. Make sure that the file exists";
	var fileref=document.createElement("a");
	fileref.download = str.split("/").pop();
	fileref.href = 'data:text/plain;base64,'+btoa(JSON.parse(xmlhttp.responseText));
	document.body.appendChild(fileref);
	fileref.click();
	return "";
}

function juliar_core_import(str,args){
	var repo = args[0] || true;
	var http = new XMLHttpRequest();
	str.indexOf("//") != -1 ? http.open("GET", str, !1): http.open("GET", "juliar_modules/"+str+".juliar", !1);
	http.send();
	if(http.status!=200){
        if(!(repo) == true) return "Cannot load module from \""+str;
        var http = new XMLHttpRequest();
		var temp = temp = str.split("/");
        http.open("GET", "http://github-raw-cors-proxy.herokuapp.com/"+temp.shift()+"/"+temp.shift()+"/master/"+temp.join("/")+".juliar", !1);
        http.send();
        if(http.responseText.indexOf("Not Found") == 1 || http2.status!=200) return "Cannot load module \""+str+"\" Github and Local module does not exist";
		console.log(http.responseText)
	}
	var outp = http.responseText;
	str = str.split("/").pop().split(".")[0];
	var fileref=document.createElement("script");
	fileref.type = "text/javascript";
	fileref.textContent = outp;
	document.head.appendChild(fileref);
	var index = juliar.modules.indexOf(str);
	-1 < index && juliar.modules.splice(index, 1);
	juliar.modules.unshift(str);
	var str2 = window["juliar_"+str+"_init"];
	"function" === str2 && str2();
	return "Imported Module: "+str;
}

function juliar_core_commands() { //List commands
	var functions = "";     
	for( var x in window) {
		if(typeof window[x] === "function" && x.indexOf("juliar_") === 0) {
			functions += "\\*"+x.split("_").pop() + " \\*";
			if(x.indexOf("juliar_core_") == -1) functions += " >> IMPORTED from "+x.split("_")[1];
			functions += "<br>";
		}
	}
	return functions;
}

function juliar_core_modules(){
	return juliar.modules.toString();
}

function juliar_core_javascript(str) {
	if(str.split(" ")[0].indexOf(".js") !== -1){ 
		var fileref=document.createElement("script");
		fileref.src = str;
		document.head.appendChild(fileref);
		return "";
	}
	juliar.code(str);
	return "";
}

//Redirection
function juliar_core_link(str,args){
	args[0] = args[0] || str;
	var temp = !(args[1]) == true ? "_blank" : "_self";
	return "<a href='"+str+"' target='"+temp+"'>"+args[0]+"</a>";
}

function juliar_core_mail(str,args){
	args[0] = args[0] || str;
	return "<a href='mailto:"+str+"'>"+args[0]+"</a>";
}

function juliar_core_store(str,args) {
	localStorage.setItem(args[0], str);
	return str;
}

function juliar_core_restore(str) {
	return localStorage.getItem(str);
}
//

//Symbol Stuff
function juliar_core_symbol(str){
	switch(str){
		case "plusminus": return "&plusmn;";
		case "leftright": return "&harr;";
		case "up": return "&uarr;";
		case "down": return "&darr;";
		case "left": return "&larr;";
		case "right": return "&rarr;";
		case "doubleleftright": return "&hArr;";
		case "doubleup": return "&uArr;";
		case "doubledown": return "&dArr;";
		case "doubleleft": return "&lArr;";
		case "doubleright": return "&rArr;";
		default: return "unknown";
	}
}
//

//3D Stuff
function juliar_core_threed(str){
	return "<span style='text-shadow: -0.06em 0 red,  0.06em 0 cyan;'>"+str+"</span>";
}
//

//DOM Stuff
function juliar_core_submit(str,args){
	var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", str || "");
	for(var i=0, length = args.length; i<length;++i){
		var hiddenField = document.createElement("input");
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", args[i]);
		hiddenField.setAttribute("value", juliar.getobject(args[i]));
		form.appendChild(hiddenField);  
	}
    document.body.appendChild(form);
    form.submit();
	return "";
}
function juliar_core_columns(str,args){
	var temp = 100/(args[0] || 1);
	return "<div style='float:left;width:"+temp+"%'>"+str+"</div>";
}

function juliar_core_sticky(str,args){
	args[0] = args[0]  || "initial";
	args[1] = args[1]  || "initial";
	var x = args[0] < 0 ? "bottom:" : "top:";
	var y = args[1] < 0 ? "right:" : "left:";
	return "<span style='position:fixed;"+x+args[0]+";"+y+args[1]+"'>"+str+"</span>";
}

function juliar_core_spoiler(str,args){
	var temp = args[0] || "black";
	var front = args[1] || "black";
	var back = args[2] || "white";
	juliar.addcss('.juliar_spoiler_"+temp+"{ background-color:"+temp+";color:"+temp+"}.juliar_spoiler_"+temp+":hover{background-color:"+front+";color:"+back+"}');
	return "<span class='juliar_spoiler_"+temp+"'>"+str+"</span>";
}

function juliar_core_bullet(str){
	return "<ul><li>" + str + "</li></ul>";
}

function juliar_core_visibility(str,args){
	var temp = args[0] || 40;
	return "<span style='opacity: "+temp/100+";filter: alpha(opacity="+temp+");'>"+str+"</span>";
}

function juliar_core_color(str,args) {
	var temp = args[0] || 'inherit';
	return "<span style='color: " + temp + "'> " + str + "</span>";
}

function juliar_core_ask(str,args) {
	var temp = args[0] || "";
	juliar.code('prompt(str, temp);');
	return "";
}

function juliar_core_error(str) {
	juliar.code("alert(str)");
	return "";
}
function juliar_core_background(str) {
	if(str.indexOf("//") != -1) juliar.code(document.body.style.backgroundImage = "url("+str+")");
	else{ 
		var temp = str.split(" ");
		temp.length == 2 ? juliar.code('document.body.style.background = "linear-gradient( to left top, '+temp[1]+', '+temp[0]+')";') : juliar.code("document.body.style.background = '"+temp[0]+"';");
	}
	return "";
}
function juliar_core_list(str,args){
	var temp  = args[0] || "decimal";
	var category = juliar.index();
	temp = {"decimal":1,"lowercase":'a',"uppercase":'A',"roman":'i',"uppercaseroman":'I'}[temp] || 1;
	var list = "var listcat= document.getElementsByTagName(\"juliar_list_"+category+"\")[0];var temp = document.createElement(\"li\");temp.innerHTML = \""+str+"\";if(listcat.previousElementSibling.nodeName != \"OL\"){";
	list += "temp2 = document.createElement(\"OL\");temp2.type = \""+temp+"\";listcat.parentNode.insertBefore(temp2, listcat);temp2.appendChild(temp);}";
	list += "else{listcat.previousElementSibling.appendChild(temp);}";
	list += "listcat.parentNode.removeChild(listcat);"
	juliar.code(list);
	return "<juliar_list_"+category+"></juliar_list_"+category+">";
}
function juliar_core_button(str,args){
	var str = str || "#";
	var name = args[0] || "Submit";
	var color = args[1] || 'green';
	juliar.css('.juliar_button_'+color+'{background-color:'+color+';color:white;}')
	return "<a href='"+str+"' class='juliar_button_"+color+"'>"+name+"</a>";
}

//


//History Manipulation
function juliar_core_history(){
	return window.history.length;
}

function juliar_core_statehistory(){
	return window.state;
}

function juliar_core_sethistory(str,args){
	var temp = args[0] || null;
	history.pushState(temp, null, str);
}

function juliar_core_gethistory(str){
	return IsNumeric(str) ? window.history.go(str) : window.history.go(juliar_core_globals(str));
}

function juliar_core_replacehistory(str){
	var temp = args[0] || null;
	history.replaceState(temp, null, str);
}

//

//Array Manipulation
function juliar_core_pick(str,args) {
	var temp = str.split(" ").filter(function(n) {
		return n !== "";
	});
	var temp2;
	if((temp2 = args[0]) == undefined)  return temp[Math.random() * temp.length |0];
	var output = "";
	for(var i=0;i<temp2;++i){
		output += temp[Math.random() * temp.length |0] + " ";
	}
	return output;
}

function juliar_core_randomize(str) {
	var arr = str.split(" ").filter(function(n) {
		return n !== "";
	});
	var currentIndex = arr.length,
	temporaryValue, randomIndex;
	while (0 !== currentIndex) {
		randomIndex = Math.random() * currentIndex |0;
		currentIndex -= 1;
		temporaryValue = arr[currentIndex];
		arr[currentIndex] = arr[randomIndex];
		arr[randomIndex] = temporaryValue;
	}
	return arr.join(' ');
}

//


//Text Effects
function juliar_core_left(str) {
	return "<div style='text-align:left'>" + str + "</div>";
}

function juliar_core_right(str) {
	return "<div style='text-align:right'>" + str + "</div>";
}

function juliar_core_middle(str) {
	return "<div style='text-align:center'>" + str + "</div>";
}
function juliar_core_bold(str) {
	return "<span class='bold'>" + str + "</span>";
}
function juliar_core_italics(str) {
	return "<span class='italics'>" + str + "</span>";
}
function juliar_core_crossout(str) {
	return "<span class='crossout'>" + str + "</span>";
}
function juliar_core_overline(str) {
	return "<span class='overline'>" + str + "</span>";
}
function juliar_core_subscript(str) {
	return "<span class='subscript'>" + str + "</span>";
}

function juliar_core_superscript(str) {
	return "<span class='superscript'>" + str + "</span>";
}
function juliar_core_underline(str) {
	return "<span class='underline'>" + str + "</span>";
}
function juliar_core_uppercase(str){
	return "<span style='text-transform: uppercase;'>"+str+"</span>";
}

function juliar_core_lowercase(str){
	return "<span style='text-transform: lowercase;'>"+str+"</span>";
}

function juliar_core_capitalize(str){
	return "<span style='text-transform: capitalize;'>"+str+"</span>";
}
function juliar_core_blur(str,args){
	var temp = args[0] || 'black';
	return "<span style='text-shadow: 0 0 3px "+temp+";color: transparent;'>"+str+"</span>";
}
function juliar_core_smaller(str) {
	return "<span class='smaller'>" + str + "</span>";
}

function juliar_core_larger(str) {
	return "<span class='larger'>" + str + "</span>";
}

function juliar_core_shrink(str) {
	var output = "", escaper = 0, counter = 0;
	for (var i = 0, length = str.length; i < length; ++i){
		if(str[i] == '<') escaper = 1;
		if(escaper === 0){ output += "<span class='smaller'>" + str[i]; counter++;}
		else{ output += str[i];}
		if(str[i] == '>') escaper = 0;
	}
	for (i = 0; i < counter; i++) output += "</span>";
	return output;
}

function juliar_core_grow(str) {
	var output = "", escaper = 0, counter = 0;
	for (var i = 0, length = str.length; i < length; ++i){
		if(str[i] == '<') escaper = 1;
		if(escaper === 0){ output += "<span class='larger'>" + str[i]; counter++;}
		else{ output += str[i];}
		if(str[i] == '>') escaper = 0;
	}
	for (i = 0; i < counter; i++) output += "</span>";
	return output;
}

function juliar_core_highlight(str,args) {
	var index = 0;
	var output = "";
	var escaper = 0;
	args[0] = args[0] || "orange";
	for(var i=0, length = str.length; i<length;++i){
		if(index == args.length) index = 0;
		if(str[i] == '<') escaper = 1;
		if(str[i] == "\\" && str[i+1] == "*"){ output +="<span style='background-color:" + args[index++] + "'>\\*</span>";++i;}
		else if(escaper === 0) output += "<span style='background-color:" + args[index++] + "'>" + str[i] + "</span>";
		else {output += str[i];}
		if(str[i] == '>') escaper = 0;
	}
	return output;  
}

function juliar_core_rainbow(str,args) { 
	var index = 0;
	var output = "";
	var escaper = 0;
	args[0] = args[0] || "orange";
	for(var i=0, length = str.length; i<length;++i){
		if(index == args.length) index = 0;
		if(str[i] == '<') escaper = 1;
		if(str[i] == "\\" && str[i+1] == "*"){ output +="<span style='color:" + args[index++] + "'>\\*</span>";++i;}
		else if(escaper === 0) output += "<span style='color:" + args[index++] + "'>" + str[i] + "</span>";
		else {output += str[i];}
		if(str[i] == '>') escaper = 0;
	}
	return output;  
}

function juliar_core_size(str,args) { 
	var temp = args[0] || 'inherit';
	return "<span style='font-size: " + temp + "'> " + str + "</span>";
}

function juliar_core_font(str,args) { //May needtomodify to prevent scripts... DEFINITELY NEEDS MODIFYING
	var temp = args[0] || 'inherit';
	WebFontConfig = {
		google: { families: [ temp.split(/(?=[A-Z])/).join(" ")+'::latin' ] }
	};
	var wf = document.createElement('script');
	wf.src = '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
	return "<span style=\"font-family: '" + temp.split(/(?=[A-Z])/).join(" ") + "'\"> " + str + "</span>";
}

function juliar_core_rotate(str,args){
	var temp = args[0] || 350;
	args[0] = args[0]  || "inherit";
	args[1] = args[1]  || "inherit";
	var x = args[0] < 0 ? "bottom:" : "top:";
	var y = args[1] < 0 ? "right:" : "left:";
	return "<div style='transform: rotate("+temp+"deg);position:relative;"+x+args[0]+";"+y+args[1]+"'>" + str + "</div>";
}

function juliar_core_reflect(str,args){
	var temp = args[0] || "X";
	return "<div style='transform: scale"+temp.toUpperCase()+"(-1);'>" + str + "</div>";
}

function juliar_core_border(str,args){
	var color = args[0] || "black";
	var size = args[1] || 1;
	var style = args[2] || "solid";
	return "<span style='border: "+size+"px "+style+" "+color+"'>"+str+"</span>";
}

function juliar_core_outline(str,args){
	var temp = args[0] || 'orange';
	return "<span style='text-shadow:-1px -1px 0 "+temp+",1px -1px 0 "+temp+",-1px 1px 0 "+temp+",1px 1px 0 "+temp+"'>"+str+"</span>";
}

function juliar_core_blink(str,args){
	var rate = args[0] || 500;
	var temp = juliar.index();
	juliar.code(
	'var f = document.getElementsByTagName("juliar_blink_'+temp+'")[0];'+
	'setInterval(function() {'+
	'f.style.visibility = (f.style.visibility == "hidden" ? "" : "hidden");'+
	'}, '+rate+');');
	return "<juliar_blink_"+temp+">"+str+"</juliar_blink_"+temp+">";
}

//


//Date & Time
function juliar_core_date(){
	var now = new Date();
	return ("0"+(now.getMonth()+1)).slice(-2)+"/"+("0"+now.getDate()).slice(-2)+"/"+now.getFullYear();
}
function juliar_core_time(){
	var now = new Date();
	return ("0"+now.getHours()).slice(-2)+ ":" + ("0"+now.getMinutes()).slice(-2) + ":" + ("0"+now.getSeconds()).slice(-2);
}
//

//News Related
function juliar_core_newsbanner(str,args){
	var temp = args[0] || 50;
	return "<div class='marquee' style='animation: marquee "+temp+"s linear infinite;'>"+str+"</div>";
}
function juliar_core_newspaper(str,args){
	var st = args[0] || 2;
	var style = "-webkit-column-count: "+st+";-moz-column-count: "+st+";column-count: "+st+";";
	style += "-webkit-column-gap: 40px;-moz-column-gap: 40px;column-gap: 40px;";
	style += "-webkit-column-rule: 1px solid lightblue;-moz-column-rule: 1px solid lightblue;column-rule: 1px solid lightblue;";
	return "<div style='"+style+"'>"+ str +"</div>";
}
function juliar_core_chapter(str){
	return "<p class='chapter'>"+ str +"</p>";
}

function juliar_core_picture(str,args) { 
	var width = args[0] || "100%";
	var height = args[1] || "auto";
	return "<img style='max-width: 100%;width:"+width+";height:"+height+";margin:0 auto;' src='" + str + "'/>";
}
//

//Media
var juliar_core_pdf = juliar_core_flash = juliar_core_java = function(str,args){
	var width = args[0] || 420;
	var height = args[1] || 315;
	return "<object width='"+width+"' height='"+height+"' data='"+str+"'></object>"
}

function juliar_core_video(str,args) {
	var width = args[0] || 420;
	var height = args[1] || 315;
	var autoplay = args[2] || 0;
	if(str.indexOf("//www.youtube.com/watch?v=") != -1) return '<iframe width='+width+' height='+height+' src="//www.youtube.com/embed/'+str.split('?v=')[1]+'?autoplay='+{true:1,false:0}[!!JSON.parse(autoplay)]+'&t='+(args[3] || 0)+'" frameborder="0" allowfullscreen></iframe>';
	else if(str.indexOf("//youtu.be/") != -1) return '<iframe width='+width+' height='+height+' src="//www.youtube.com/embed/'+str.split('youtu.be/')[1]+'?autoplay='+{true:1,false:0}[!!JSON.parse(autoplay)]+'&t='+(args[3] || 0)+'" frameborder="0" allowfullscreen></iframe>';
	else if(str.indexOf("//vimeo.com/") != -1) return '<iframe width='+width+' height='+height+' src="//player.vimeo.com/video/'+str.split("/").pop()+'?autoplay='+{true:1,false:0}[!!JSON.parse(autoplay)]+'#t='+(args[3] || 0)+'" frameborder="0" allowfullscreen></iframe>';
	else if(str.indexOf("//www.twitch.tv/") != -1) return '<iframe width='+width+' height='+height+' src="//www.twitch.tv/'+str.split("/").pop()+'/embed" frameborder="0"></iframe>';
	return '<video src="' + str + '" controls="controls">Your browser does not support HTML Video</video>';
}

function juliar_core_music(str) { 
	return '<audio src="' + str + '" controls="controls">Your browser does not support HTML Audio</audio>';
}
//

//Max,Min & Absolute
function juliar_core_randomnumber(str) {
	return (Math.random() * (parseInt(str) || 100)) + 1 |0;
}


function juliar_core_largestnumber() {
	return Number.MAX_SAFE_INTEGER;
}

function juliar_core_smallestnumber() {
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
//

//Header & Title
function juliar_core_banner(str){
	var width = args[0] || "100%";
	var height = args[1] || "200";
	return "<img style='max-width: 100%;width:"+width+";height:"+height+";' src='" + str + "'/>";
}
function juliar_core_title(str) {
	return "<h1 style='text-align:center'>" + str + "</h1>";
}

function juliar_core_author(str) {
	return "<h2 style='text-align:center'>" + str + "</h2>";
}
//

//Sockets
function juliar_core_socket(str,args){
	var temp = args[0] || null;
	var Socket = new WebSocket("wss://"+str);
	juliar.setobject("juliar_core_socket_"+temp, Socket);
	return "Socket Created";
}

function juliar_core_setsocket(str,args){
	var temp = args[0] || null;
	juliar.getobject("juliar_core_socket_"+temp).send(str);
	return "Sent "+str;
}

function juliar_core_getsocket(str,args){
	var rand = juliar.index();
	juliar.code('juliar_core_globals["juliar_core_socket_'+str+'"].onmessage = function (event) {'+
	'document.getElementsByTagName("juliar_core_sockets_'+rand+')[0].innerHTML = event.data;'+
	'};');
	return "<juliar_core_sockets_"+rand+"></juliar_core_sockets_"+rand+">";
}
//

//Variables and Dynamics
function juliar_core_set(str,args) {
	return juliar.setobject(args[0],str);
}

function juliar_core_get(str) {
	return juliar.getobject(str);
}

function juliar_core_fetch(str) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", str, false);
	xmlhttp.send();
	return xmlhttp.responseText;
}

function juliar_core_dynamicset(str,args){
	var temp = args[0] || null;
	juliar.code("var h2s = document.getElementsByTagName('juliar_dynamic_"+temp+"');"+
	"for(var h = 0, length = h2s.length; h < length; h++ ) {h2s[h].innerHTML = str; }");
	juliar.setobject(temp,str);
	return "<juliar_dynamic_"+temp+">"+str+"</juliar_dynamic_"+temp+">";
}

function juliar_core_dynamicget(str){
	return "<juliar_dynamic_"+str+">"+juliar.getobject(str)+"</juliar_dynamic_"+str+">";
}

function juliar_core_dynamicfetch(str){
	var randomj = "juliar_dynamicfetch_"+juliar.index();
	var xmlhttp = new XMLHttpRequest();
	juliar.code('xmlhttp.onreadystatechange=function(){if (xmlhttp.readyState==4 && xmlhttp.status==200){document.getElementById('+randomj+').innerHTML=xmlhttp.responseText;}};)'+
	'xmlhttp.open("GET",str,true);xmlhttp.send();');
	return "<span id='"+randomj+"'></span>";
}

function juliar_core_dynamicinput(str,args){
	return "<input onblur='juliar_core_dynamicset(this.value,\""+args[0]+"\")' type='text' value='"+str+"' style='width: 600px;border-top: 0;border-right: 0;border-left: 0;background: transparent;border-color:rgba(0,0,0,0.3)'>";
}
//

//Math Functions
function juliar_core_e(str) {
	return Math.exp(Number(str) || 1);
}
function juliar_core_pi() {
	return '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089';
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
		Number(element)&&(temp=null==temp?Number(element):Math.pow(temp, element));
	});
	return temp;
}

function juliar_core_divide(str) {
	var temp;
	str.split(" ").forEach(function(element) {
		Number(element)&&(temp=null==temp?Number(element):temp/Number(element));
	});
	return temp;
}

function juliar_core_multiply(str) {
	var temp = 1;
	str.split(" ").forEach(function(element) {
		Number(element) && (temp *= element);
	});
	return temp;
}

function juliar_core_add(str) {
	var temp = 0;
	str.split(" ").forEach(function(element) {
		Number(element) && (temp += Number(element));
	});
	return temp;
}
function juliar_core_subtract(str) {
	var temp;
	str.split(" ").forEach(function(element) {
		Number(element)&&(temp=null==temp?Number(element):temp-Number(element));
	});
	return temp;
}
////

function juliar_core_trash(){
	return juliar.getobject('null') || juliar.getobject('undefined');
}


document.addEventListener("DOMContentLoaded", juliar_core_init);




///////////////////////////////////////////////////////////////////NOT YET CONVERTED//////////////////////////////////

/*
	function juliar_core_splitwork(str){
	if(window.Worker) {
	var temp = Math.random() * 1000000 |0;
	var w = new Worker("juliar.js");
	w.postMessage(str);
	w.onmessage = function(event) {
	document.getElementsByTagName("juliar_worker_"+temp)[0] = event.data;
	W.terminate();
	};
	return "<juliar_worker_"+temp+"></juliar_worker_"+temp+">";
	}
	return str;
	
	self.addEventListener('message', function(e) {
	self.postMessage(ijuliar_parser(e.data));
	self.close();
	}, false);
	
	}
	
	function juliar_core_figure(str,args){
	var temp = args[0] || null;
	var val = juliar_core_globals["juliar_core_counter_"+str] ?  ++juliar_core_globals["juliar_core_counter_"+str] : juliar_core_globals["juliar_core_counter_"+str] = 1;
	juliar_core_globals[temp] = val;
	return val;
	}
	
	function juliar_core_reference(str){
	return "<span class='superscript'>" + juliar_core_globals[str] + "</span>";
}*/

////////////////////////////////////////////////////////////////NOT YET FINISHED/////////////////////////////////////

/*function juliar_core_graph(str,args){
	var canvas = document.createElement('canvas');
	canvas.id     = "CursorLayer";
	canvas.width  = 500;
	canvas.height = 768;
	canvas.style.zIndex   = 8;
	canvas.style.position = "absolute";
	canvas.style.border   = "1px solid";
	document.body.appendChild(canvas);
	return "";
}*/

/*function juliar_core_setmatrix(str,args){ //NOT READY YET!
	var temp = str.split("|");
	var arr = [];
	for(var i=1, length = temp.length; i<length; i+=2){
	arr.push(temp[i].split(" ").filter(function(e){return e != "";}));
	}
	juliar_core_globals[args[0]] = arr;
	return "";
}*/

/*
	function juliar_core_getmatrix(str){ //NOT READY YET!
	var temp = juliar_core_globals[str];
	var output = "<p style='width:88px;'><span style='float:left;font-size:260px;line-height:230px;'>[</span>";
	//output += "<span style='float:right;font-size:110px;line-height:80px;'>]</span>";
	output += "<div style='padding-top:20px;font-size:20px;line-height:20px;word-spacing:20px'>";
	output += "1<br>";
	output += "1<br>";
	output += "1<br>";
	output += "1<br>";
	output += "1<br>";
	output += "1<br>";
	output += "1<br>";
	output += "1<br>";
	output += "1<br>";
	output += "1<br>";
	output += "1<br>";
	output += "</div>";
	output += "</p>";
	return output;
	}
*/

/*
	function juliar_core_loadingbar(str,args){
	var color1 = args[0] || "orange";
	var color2 = args[1] || "orange";
	var background = args[2] || "black";
	var temp = isFinite(String(str)) ? "<span style='width: "+str+"%;background-color: orange;color:black;text-align:center'>"+str+"%</span>" : 
	"<juliar_dynamic_"+str+">"+juliar_core_globals[str]+"</juliar_dynamic_"+str+">";
	return "<div class='progress-bar'>"+temp+"</div>";
	}
	
	function juliar_core_search(str){
	return "<input class='searchable' name='q' type='text' size='40' placeholder='Search...' />";
}*/

/*function juliar_core_table(str){}
	function juliar_core_slider(str){}
	function juliar_core_tab(str){}
	function juliar_core_theme(str){}
	function juliar_core_menu(str){}
	function juliar_core_slideshow(str){}
*/

/*
	
	function juliar_core_plusplus(str){
	str.split(" ").forEach(function(element) {
	juliar.getObject(element);
	});
	return "";
	}
	
	function juliar_core_minusminus(str){
	str.split(" ").forEach(function(element) {
	--juliar_core_globals[element];
	});
	return "";
}*/

/*function ijuliar_pick(str) {
	var temp = str.split(' ')[0];
	var length = temp.length;
	temp = temp.split("=");
	var command = temp[0];
	var args = temp[1] === undefined ? [] : str.slice(++command.length,length).split(",");
	var first = command[0];
	if (first == '+'){ command[1] == '+'? command = "plusplus" : command = "add" + command.slice(1);}
	else if(first == '-'){ command[1] == '-'? command = "minusminus" : command = "subtract" + command.slice(1);}
	else if(first == 'x' && command[1] === undefined) command = "multiply" + command.slice(1);
	else if(first == '/') command = "divide" + command.slice(1);
	else if(first == '^') command = "power" + command.slice(1);
	else if(parseInt(first)) command =  ["zero","one","two","three","four","five","six","seven","eight","nine","ten"][first] + command.slice(1);
	for(var i = 0, len = juliar_core_module.length; i < len;++i) {
	if (typeof window["juliar_"+juliar_core_module[i]+"_"+command] === "function") {
	return window["juliar_"+juliar_core_module[i]+"_"+command](str.substr(length).trim(),args);
	}
	}
	if (typeof window["juliar_core_"+command] === "function") {
	return window["juliar_core_"+command](str.substr(length).trim(),args);
	}
	return "Unknown command " +str;
}*/

/*function ijuliar_keydown(e) {
	var keyCode = e.keyCode;
	var target = e.target;
	if (keyCode === 13) {
	var str = target.value;
	juliar_core_history_arr.unshift(str);
	juliar_core_history_index = 0;
	var temp = document.createElement("div");
	temp.innerHTML = ijuliar_parser(str);
	target.parentNode.insertBefore(temp, target);
	target.value = "";
	var event = new Event('juliar_done');
	document.dispatchEvent(event);
	}
	else if (keyCode === 38) {
	if (juliar_core_history_arr.length !== 0) {
	if (juliar_core_history_index === juliar_core_history_arr.length) {
	juliar_core_history_index = 0;
	}
	target.value = juliar_core_history_arr[juliar_core_history_index];
	juliar_core_history_index += 1;
	}
	}
	else if (keyCode === 40) {
	if (juliar_core_history_arr.length !== 0) {
	if (juliar_core_history_index === -1) {
	juliar_core_history_index = juliar_core_history_arr.length - 1;
	}
	target.value = juliar_core_history_arr[juliar_core_history_index];
	juliar_core_history_index -= 1;
	}
	}
	}
	
	function ijuliar_interpreter() {
	var ijuliars = document.getElementsByTagName("ijuliar");
	for (var i = 0, juliar = ijuliars.length; i < juliar; i++) {
	var jselector = ijuliars[i];
	jselector.innerHTML = "<br><input type='text' style='width: 600px;border-top: 0;border-right: 0;border-left: 0;background: transparent;border-color:rgba(0,0,0,0.3);'>";
	jselector.addEventListener("keydown", ijuliar_keydown);
	}
}*/									
