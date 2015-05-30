function juliar_core_version() {
	return "Language: \\*Juliar \\* <br>" +
	"Moto: 'Language for an artistic mind' <br>" +
	"Type: Main <br>" +
	"Version: 0.1 <br>" +
	"First Published: 4/12/2015 <br>" +
	"Creator: Andrei Makhanov <br>" +
	"Official Repository: https://github.com/juliarLang <br>" +
	"Official Website: http://juliar.elementfx.com <br>" +
	"Comment: <br>" +
	"I created this programming language for Julia hence the name of the language juliar. <br>" +
	"She has an artistic mind and thus, it's difficult for her to code in language, let alone javascript and css. <br>" +
	"This language is simple to use and people with a nonlogical mind will be able to use it quickly and easily.<br>" +
	"Juliar can be easily  integrated into other sites simply by using <juliar></juliar> tags.<br>" +
	"This language is inspired by BBCode, Python, HTML 3.2, and AngularJS.<br>" +
	"If you have an improvement to the language i.e. improved code or a new function please commit it on github <br>" +
	"and I will gladly 'pull' your request. <br>" +
	"Please consider donating, all the money will go into an upkeep of the website and improvement of the language.<br>" +
	"Licensed under GPL 3.0";
}
var juliar_core_globals = {}, juliar_core_module = [], juliar_core_history_index = 0, juliar_core_history_arr = [];

function ijuliar_injectcss() {
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = "body{font-family: Tahoma, Geneva, sans-serif;background-repeat:no-repeat;background-size:cover;}p:first-child:first-letter { float: left; color: #903; font-size: 75px; line-height: 60px; padding-top: 4px; padding-right: 8px; padding-left: 3px; }.smaller{font-size:85%}.larger{font-size:115%}.subscript{vertical-align: sub;font-size: smaller;}.superscript{vertical-align: super;font-size: smaller;}.underline{text-decoration: underline;}.bold{font-weight: bold;}.italics{font-style: italic;}.crossout{text-decoration: line-through;}.overline{text-decoration: overline;}";
    document.body.appendChild(css);
	var viewPortTag=document.createElement('meta');
	viewPortTag.name = "viewport";
	viewPortTag.content = "initial-scale=1.0, maximum-scale=1.0, user-scalable=0";
	document.getElementsByTagName('head')[0].appendChild(viewPortTag);
}

function juliar_core_import(str){
	if(str.indexOf("//") != -1){
		var http = new XMLHttpRequest();
		http.open("GET", str, !1);
		http.send();
		if(http.status!=200) return "Cannot load module from \""+str;
		var outp = http.responseText;
	}
	else{
		var http = new XMLHttpRequest();
		http.open("GET", "juliar_modules/"+str+".juliar", !1);
		http.send();
		if(http.status!=200){
			var temp;
			if((temp = str.split("/")).length > 2){
				http.open("GET", "http://github-raw-cors-proxy.herokuapp.com/"+temp.shift()+"/"+temp.shift()+"/master/"+temp.join("/")+".juliar", !1);
				http.send();
				if(http.responseText.indexOf("Not Found") == 1) return "Cannot load module \""+str+"\" Github and Local module does not exist";
				var outp =	JSON.parse(http.responseText);
			}
			else{
				return "Cannot load module \""+str+"\". NOTE: local modules are stored in juliar_modules/";
			}
		}
		else{
			var outp = http.responseText;
		}
	}
	str = str.split("/").pop().split(".")[0];
	var fileref=document.createElement("script");
	fileref.type = "text/javascript";
	fileref.textContent = outp;
	document.head.appendChild(fileref);
	var index = juliar_core_module.indexOf(str);
	-1 < index && juliar_core_module.splice(index, 1);
	juliar_core_module.unshift(str);
	var str2 = window["juliar_"+str+"_init"];
	"function" === str2 && str2();
	return "Imported Module \""+str+"\"";
}

function juliar_core_deport(a) {
	var b = juliar_core_module.indexOf(a);
	return -1 < b ? (juliar_core_module.splice(b, 1), 'Deported Module "' + a + '"') : 'Module "' + a + '" does not exists';
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

function juliar_core_modules(){
	return juliar_core_module.toString();
}

function juliar_core_plusminus(){
	return "&plusmn;";
}

function juliar_core_submit(str,args){
	var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", str || "");
	for(var i=0, length = args.length; i<length;++i){
		var hiddenField = document.createElement("input");
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", args[i]);
		hiddenField.setAttribute("value", juliar_core_globals(args[i]));
		form.appendChild(hiddenField);  
	}
    document.body.appendChild(form);
    form.submit();
	return "";
}

function juliar_core_sticky(str,args){
	args[0] = args[0]  || "initial";
	args[1] = args[1]  || "initial";
	var x = args[0] < 0 ? "bottom:" : "top:";
	var y = args[1] < 0 ? "right:" : "left:";
	return "<span style='position:fixed;"+x+args[0]+";"+y+args[1]+"'>"+str+"</span>";
}

function juliar_core_columns(str,args){
	var temp = 100/(args[0] || 1);
	return "<div style='float:left;width:"+temp+"%'>"+str+"</div>";
}

function juliar_core_spoiler(str,args){
	var temp = args[0] || "black";
	var front = args[1] || "black";
	var back = args[2] || "white";
	return "<style>.juliar_spoiler_"+temp+"{ background-color:"+temp+";color:"+temp+"}.juliar_spoiler_"+temp+":hover{background-color:"+front+";color:"+back+"}</style><span class='juliar_spoiler_"+temp+"'>"+str+"</span>";
}

/*
	function juliar_core_figure(str){
	
	}
	
	function juliar_core_reference(str){
	
}*/

function juliar_core_socket(str,args){
	var temp = args[0] || null;
	var Socket = new WebSocket("wss://"+str);
	juliar_core_globals["juliar_core_socket_"+temp] = Socket;
	return "Socket Created";
}

function juliar_core_socketset(str,args){
	var temp = args[0] || null;
	juliar_core_globals["juliar_core_socket_"+temp].send(str);
	return "Sent "+str;
}

function juliar_core_socketget(str,args){
	var rand = Math.floor(Math.random() * 100000);
	juliar_core_globals["juliar_core_socket_"+str].onmessage = function (event) {
		document.getElementsByTagName("juliar_core_sockets_"+rand)[0].innerHTML = event.data;
	};
	return "<juliar_core_sockets_"+rand+"></juliar_core_sockets_"+rand+">";
}

/*function juliar_core_list(str){
	var temp = Math.floor(Math.random() * 100000);
	var temp3 = "<script>var temp2 = document.createElement('li');var temp = document.getElementsByTagName('juliar_core_list_"+temp+"')[0];temp2.innerHTML = temp.innerHTML";
	temp3 += "if(temp.parentNode.nodeName != 'ol'){var temp3 =document.createElement('ol'); temp.parentNode.appendChild(temp3);temp3.appendChild(temp2);} "
	temp3 += "else{temp.parentNode.insertBefore(temp2, temp);}";
	temp3 += "temp.parentNode.removeChild(temp);</script>";
	return "<juliar_core_list_"+temp+"></juliar_core_list_"+temp+">";
}*/

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

/*function juliar_core_getmatrix(str){ //NOT READY YET!
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
}*/
function juliar_core_bullet(str){
	return "<ul><li>" + str + "</li></ul>";
}

function juliar_core_story(str){
	return "<p>"+ str +"</p>";
}

function juliar_core_newspaper(str,args){
	var st = args[0] || 2;
	var style = "-webkit-column-count: "+st+";-moz-column-count: "+st+";column-count: "+st+";";
	style += "-webkit-column-gap: 40px;-moz-column-gap: 40px;column-gap: 40px;";
	style += "-webkit-column-rule: 1px solid lightblue;-moz-column-rule: 1px solid lightblue;column-rule: 1px solid lightblue;";
	return "<div style='"+style+"'>"+ str +"</div>";
}

function juliar_core_left(str) {
    return "<div style='text-align:left'>" + str + "</div>";
}

function juliar_core_right(str) {
    return "<div style='text-align:right'>" + str + "</div>";
}

function juliar_core_middle(str) {
    return "<div style='text-align:center'>" + str + "</div>";
}

function juliar_core_trash(){
	return juliar_core_globals.null || juliar_core_globals.undefined;
}

function juliar_core_input(str,args){
	return "<input onblur='juliar_core_dynamicset(this.value,\""+args[0]+"\")' type='text' value='"+str+"' style='width: 600px;border-top: 0;border-right: 0;border-left: 0;background: transparent;border-color:rgba(0,0,0,0.3)'>";
}

function juliar_core_dynamicset(str,args){
	var temp = args[0] || null;
	var h2s = document.getElementsByTagName("juliar_dynamic_"+temp);
	for(var h = 0, length = h2s.length; h < length; h++ ) {
		h2s[h].innerHTML = str;
	} 
	return "<juliar_dynamic_"+temp+">"+(juliar_core_globals[temp] = str)+"</juliar_dynamic_"+temp+">";
}

function juliar_core_dynamicget(str){
	return "<juliar_dynamic_"+str+">"+juliar_core_globals[str]+"</juliar_dynamic_"+str+">";
}

function juliar_core_dynamicfetch(str){
	var randomj = "juliar_dynamicfetch_"+Math.random();
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			document.getElementById(randomj).innerHTML=xmlhttp.responseText;
		}
	};
	xmlhttp.open("GET",str,true);
	xmlhttp.send();
    return "<span id='"+randomj+"'></span>";
}


function juliar_core_set(str,args) {
	return juliar_core_globals[args[0]] = str;
}

function juliar_core_get(str) {
    return juliar_core_globals[str];
}

function juliar_core_store(str,args) {
    localStorage.setItem(args[0], str);
	return str;
}

function juliar_core_restore(str) {
    return localStorage.getItem(str);
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

function juliar_core_blur(str,args){
	var temp = args[0] || 'black';
	return "<span style='text-shadow: 0 0 3px "+temp+";color: transparent;'>"+str+"</span>";
}

function juliar_core_visibility(str,args){
	var temp = args[0] || 40;
	return "<span style='opacity: "+temp/100+";filter: alpha(opacity="+temp+");'>"+str+"</span>";
}

function juliar_core_color(str,args) {
	var temp = args[0] || 'inherit';
	return "<span style='color: " + temp + "'> " + str + "</span>";
}

function juliar_core_background(str) {
	if(str.indexOf("//") != -1) document.body.style.backgroundImage = "url("+str+")";
	else{ 
		var temp = str.split(" ");
		document.body.style.background = temp[0];
		if(temp.length === 2) document.body.style.background = "linear-gradient( to left top, "+temp[1]+", "+temp[0]+")";
	}
    return "";
}

function juliar_core_arrow(str,args){
	return args[0] == undefined? "&rarr;" : {leftright:"&harr;",up:"&uarr;",down:"&darr;",left:"&larr;",right:"&rarr;"}[args[0].toString()];
}

function juliar_core_doublearrow(str,args){
	return args[0] == undefined? "&rArr;" : {leftright:"&hArr;",up:"&uArr;",down:"&dArr;",left:"&lArr;",right:"&rArr;"}[args[0].toString()];
}

function juliar_core_size(str,args) { 
	var temp = args[0] || 'inherit';
	return "<span style='font-size: " + temp + "'> " + str + "</span>";
}

function juliar_core_font(str,args) {
	var temp = args[0] || 'inherit';
	return "<span style='font-family: " + temp + "'> " + str + "</span>";
}

function juliar_core_condition(str,args) {
	if(args[0] === undefined) return str;
    for (var i = 0, length = args.length; i < length; ++i) {
		if (eval(args[i])) return str;
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

function juliar_core_loop(str,args) {
	var temp = args[0] || 1;
	var output = str;
	for(var i=1; i<temp; ++i){
		output += " "+str+" ";
	}
	return output;
}

function juliar_core_hide() {
    return "";
}

function juliar_core_picture(str,args) { 
    var width = args[0] || "100%";
    var height = args[1] || "auto";
    return "<img style='max-width: 100%;width:"+width+";height:"+height+";margin:0 auto;' src='" + str + "'/>";
}

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

function juliar_core_help(str) { //Opens Documentation for the commands
    return "Type \\* help + command  to see help";
}



//Max,Min & Absolute
function juliar_core_randomnumber(str) {
	return Math.floor((Math.random() * (parseInt(str) || 100)) + 1);
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

function juliar_core_ask(str,args) {
	var temp = args[0] || "";
	return prompt(str, temp);
}

function juliar_core_error(str) {
	alert(str);
	return "";
}

function juliar_core_pick(str,args) {
	var temp = str.split(" ").filter(function(n) {
		return n !== "";
	});
	var temp2;
	if((temp2 = args[0]) == undefined)  return temp[Math.floor(Math.random() * temp.length)];
	var output = "";
	for(var i=0;i<temp2;++i){
		output += temp[Math.floor(Math.random() * temp.length)] + " ";
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
	if(str.split(" ")[0].indexOf(".js") !== -1){
		var fileref=document.createElement("script");
		fileref.src = str;
		document.head.appendChild(fileref);
		return "";
	}
	var fileref=document.createElement("script");
	fileref.type = "text/javascript";
	fileref.textContent = str;
	document.head.appendChild(fileref);
	return "";
}

function juliar_core_css(str) {
	if(str.split(" ")[0].indexOf(".css") === -1) return "<style>" + str + "</style>";
	var fileref=document.createElement("link");
	fileref.rel = "stylesheet";
	fileref.href = str;
	document.head.appendChild(fileref);
	return "";
}

function juliar_core_fetch(str) {
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
function juliar_core_e(str) {
	var temp = Number(str) || 1;
	return Math.exp(temp);
}
function juliar_core_pi() {
	return Math.PI;
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

function juliar_core_plusplus(str){
	str.split(" ").forEach(function(element) {
		++juliar_core_globals[element];
	});
	return "";
}

function juliar_core_minusminus(str){
	str.split(" ").forEach(function(element) {
		--juliar_core_globals[element];
	});
	return "";
}

function juliar_core_subtract(str) {
	var temp;
	str.split(" ").forEach(function(element) {
		Number(element)&&(temp=null==temp?Number(element):temp-Number(element));
	});
	return temp;
}

function ijuliar_pick(str) {
	var temp = str.split(' ')[0];
	var length = temp.length;
	temp = temp.split("=");
	var command = temp[0];
	var args = temp[1] === undefined ? [] : str.slice(++command.length,length).split(",");
	var first = command[0];
	if (first == '+'){ command[1] == '+'? command = "plusplus" : command = "add";}
	else if(first == '-'){ command[1] == '-'? command = "minusminus" : command = "subtract";}
	else if(first == 'x' && command[1] === undefined) command = "multiply";
	else if(first == '/') command = "divide";
	else if(first == '^') command = "power";
	else if(parseInt(first)) return ["zero","one","two","three","four","five","six","seven","eight","nine","ten"][first];
	for(var i = 0, len = juliar_core_module.length; i < len;++i) {
		if (typeof window["juliar_"+juliar_core_module[i]+"_"+command] === "function") {
			return window["juliar_"+juliar_core_module[i]+"_"+command](str.substr(length).trim(),args);
		}
	}
	if (typeof window["juliar_core_"+command] === "function") {
		return window["juliar_core_"+command](str.substr(length).trim(),args);
	}
	return "Unknown command " +str;
}

function ijuliar_parser(str) {
	var currentindex, nextvalue,lastindex, positions = [];
	while ((currentindex = str.indexOf("*", currentindex)) !== -1) {
		if(str[currentindex-1] == "\\");
		else if (((nextvalue = str.charCodeAt(currentindex + 1)) > 47 && nextvalue < 58) || nextvalue === 43 || nextvalue === 45 || nextvalue === 47 || nextvalue === 94 || (nextvalue > 64 && nextvalue < 91) || (nextvalue > 96 && nextvalue < 123)) {
			positions.push(currentindex);
		}
		else{
			if ((lastindex = positions.pop()) === undefined) {
				str = "Code has an extra &#42 at position " + currentindex++ + ". Please remove the extra &#42";
			}
			else {
				var oldstring = str.slice(lastindex, ++currentindex);
				str = str.replace(oldstring, ijuliar_pick(oldstring.slice(1, -1)));
				currentindex = lastindex;
			}
		}
		++currentindex;
	}
	if (positions.length > 0) str = "Commands are not properly closed please check to make sure all commands are properly closed!";
	return str.replace(/\\\*/g, "*");
}

function ijuliar_keydown(e) {
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
	var event = new Event('juliar_done');
	document.dispatchEvent(event);
}

function ijuliar_init(){
	var juliars = document.getElementsByTagName("juliar");
	for (var i = 0, juliar = juliars.length; i < juliar; i++) {
		var jselector = juliars[i];
		jselector.innerHTML = ijuliar_parser(jselector.innerHTML);
	}
	ijuliar_injectcss();
	ijuliar_interpreter();
	var event = new Event('juliar_done');
	document.dispatchEvent(event);
}

document.addEventListener("DOMContentLoaded", ijuliar_init);
