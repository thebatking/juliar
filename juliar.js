function Juliar(verbose) {
	//VERBOSE-DEBUG MODES
    this.verbose = verbose || 0;
	this.log = "";
	//
	//CSS Utilizer
	var csscode = "";
	this.css = function(str){csscode+=str;}
	//HELP/Autofill utilizer
	var help = {};
	this.sethelp = function(obj){
		
	}
	this.gethelp = function(name){return help[name];}
	
	/*NOT TESTED */
	var objects = {};
	var jscode = [];
	this.index = function(){return jscode.length;}; //KEEPS IT UNIQUE
	this.code = function(code){ jscode.push(code);return jscode.length;};
	this.getcode = function(id){return Number(id) > -1? jscode[id]:jscode;}
	this.clearcode = function(){jscode = [];return "";}
	this.setobject = function(obj,value){return objects[obj] = value;};
	this.getobject = function(obj){return objects[obj];};
	this.checkobject = function(obj){return objects[obj]?  true:false;};
	this.deleteobject = function(obj){if(objects[obj]){objects[obj] = undefined;return true;}return false;};
	//END OF NOT TESTED
	
	//Initialize CORE CSS
	var viewPortTag=document.createElement('meta');
	viewPortTag.name = "viewport";
	viewPortTag.content = "initial-scale=1.0, maximum-scale=1.0, user-scalable=0";
	document.getElementsByTagName('head')[0].appendChild(viewPortTag);
	//
	
	this.parser = function(str){
		var currentindex=0, nextvalue,lastindex, positions = [];
		while ((currentindex = str.indexOf("*", currentindex)) !== -1) {
			if(str[currentindex-1] == "\\");
			else if (!((nextvalue = str.charCodeAt(currentindex + 1)) === 32 || nextvalue === 42 || nextvalue === 9 || nextvalue === 10 || isNaN(nextvalue))) {
				positions.push(currentindex);
			}
			else{
				if ((lastindex = positions.pop()) === undefined) str = "<span class='juliar_error'>Code has an extra &#42 </span><br/><em>Position: " + currentindex++ + "</em>";
				else {
					var oldstring = str.slice(lastindex, ++currentindex);
					str = str.replace(oldstring, pick(oldstring.slice(1, -1),this));
					currentindex = lastindex;
				}
			}
			++currentindex;
		}
		if (positions.length > 0) str = "<span class='juliar_error'>Code is not properly closed </span><br/><em># of Extra &#42 : "+positions.length+"</em>";
		var css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML = csscode;
		csscode = "";
		document.body.appendChild(css);
		for(var i=0,j=jscode.length;i<j;i++){
			var fileref=document.createElement("script");
			fileref.type = "text/javascript";
			fileref.textContent = this.getcode(i);
			document.head.appendChild(fileref);
		}
		return str.replace(/\\\*/g, "*");
	}
	
	function pick(str,juliar){
		var temp = str.split(' ')[0];
        var length = temp.length;
        temp = temp.split("=");
        var command = temp[0];
        var args = temp[1] === undefined ? [] : str.slice(++command.length,length).split(",");
		var first = command[0];
		if (first == '+'){ command = "add" + command.slice(1);}
		else if(first == '-'){ command = "subtract" + command.slice(1);}
		else if(first == 'x' && command[1] === undefined) command = "multiply" + command.slice(1);
		else if(first == '/') command = "divide" + command.slice(1);
		else if(first == '^') command = "power" + command.slice(1);
        else if(parseInt(first)) command =  ["zero","one","two","three","four","five","six","seven","eight","nine"][command[0]] + command.slice(1);
		
		var mods = Object.keys(juliar.modules);
        for(var i = 0, len = mods.length; i < len;i++) {
			if (typeof juliar.modules[mods[i]][command] === "function") {
				return juliar.modules[mods[i]][command](str.substr(length).trim(),args);
			}
		}
        return "<span class='juliar_error'>Unknown command '" +command + "' </span><br/><em>Arguments: " + args + " </em><br/><em>Content: "+str.substr(length).trim()+" </em>";
		
	}
	//MODULES
	this.modules = {"main": new Juliar_main(this),"interpreter": new Juliar_interpreter(this)};
	//
	var juliars = document.getElementsByTagName("juliar");
	for (var i = 0, juliar_length = juliars.length; i < juliar_length; i++) {
		var jselector = juliars[i];
		jselector.innerHTML = this.parser(jselector.innerHTML);
	}
	this.modules.interpreter.reset();
	document.dispatchEvent(new Event('juliar_done'));   
}var juliar; document.addEventListener("DOMContentLoaded", function(){ juliar = new Juliar();});


function Juliar_main(juliar){
	var css = "body{font-family: Tahoma, Geneva, sans-serif;background-repeat:no-repeat;background-size:cover;}";
	css += ".center{text-align:center;}.left{text-align:left}.right{text-align:right}.middle{display:block;margin-left:auto;margin-right:auto;}";
	css += ".smaller{font-size:95%}.larger{font-size:105%}.subscript{vertical-align: sub;font-size: smaller;}.superscript{vertical-align: super;font-size: smaller;}";
	css += ".underline{text-decoration: underline;}.bold{font-weight: bold;}.italics{font-style: italic;}.crossout{text-decoration: line-through;}.overline{text-decoration: overline;}";
	css += ".chapter:first-child:first-letter { float: left; color: #903; font-size: 75px; line-height: 60px; padding-top: 4px; padding-right: 8px; padding-left: 3px; }";
	css += ".marquee{margin: 0 auto;overflow: hidden;white-space: nowrap; box-sizing: border-box;}";
	css += ".marquee:hover{animation-play-state: paused}@keyframes marquee{0%{ text-indent: 27.5em }100%{ text-indent: -105em }}";
	css += ".progress-bar{background-color: #1a1a1a;height: 25px;padding: 5px;width: 350px;margin: 50px 0;border-radius: 5px;box-shadow: 0 1px 5px #000 inset, 0 1px 0 #444;}";
	css += ".progress-bar span{display: inline-block;height: 100%;border-radius: 3px;box-shadow: 0 1px 0 rgba(255, 255, 255, .5) inset;transition: width .4s ease-in-out;}";
	css += "text-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.2) inset";
	css += "transition: all 0.7s ease 0s;}input[type='text'].searchable:focus{width: 200px;}";
	css += ".juliar_error{color:red}";
	css += ".juliar_block{display:block;box-shadow:0 1px 6px rgba(0,0,0,.12);background-color:white;margin: 24px 20px;padding: 10px;animation: fadein 2s;}";
	css += "@keyframes fadein {from { opacity: 0;bottom:-100px;position:relative; }to   { opacity: 1;bottom:0px;position:relative;}}";
	juliar.css(css);
	
	this.block = function(str){
		return "<span class='juliar_block'>"+str+"</span>";
	}
	
	this.version = function(){
		return "Language \\*Juliar \\* version Alpha 3. Running on " + navigator.userAgent;
	}
	this.help = function(str){
		if(str == "") return "<span class='juliar_error'>Type \\*help  'command name' \\* to see help for the command</span>";
		var found = juliar.gethelp(str.trim());
		if(found !== undefined) return found;
		return "<span class='juliar_error'>Help could not be found for '"+str+"' </span>";	
	}
	this.loop = function(str,args) {
		var temp = args[0] || 1;
		var output = str;
		for(var i=1; i<temp; ++i){
			output += " "+str+" ";
		}
		return output;
	}
	this.evaluate = function(str){
		return eval(str);
	}
	this.condition = function(str,args) { //OR conditional....May need to modify later...
		if(args[0] === undefined) return str;
		for (var i = 0, length = args.length; i < length; ++i) {
			if (eval(args[i])) return str;
		}
		return "";
	}
	this.code = function(str){
		return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
	}
	this.hide = function() {
		return "";
	}
	/*this.deport = function(a) {
		var b = juliar.modules.indexOf(a);
		return -1 < b ? (juliar.modules.splice(b, 1), 'Deported Module "' + a + '"') : 'Module "' + a + '" does not exists';
	}*/
	/*this.download = function(str){
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
	}*/
	this.import = function(str,args){
		if(window.location.protocol == 'file:'){
			var fileref=document.createElement("input");
			fileref.type = "file";
			fileref.onchange = function(evt)
			{
				f = evt.target.files[0];
				alert("Changed!");
				var reader = new FileReader();
				reader.onload = function(e){
					var contents = e.target.result;
					var ext = f.name.split('.').pop();
					console.log(f.name);
					console.log(contents);
				}
				reader.readAsText(f);
			}
			document.body.appendChild(fileref);
			fileref.click();
			return "Import Locally is not currently supported";
		}
		else{
			var repo = args[0] || true;
			var http = new XMLHttpRequest();
			str.indexOf("//") != -1 ? http.open("GET", str, !1): http.open("GET", "modules/"+str+".juliar", !1);
			http.send();
		}
	}
	/*this.import = function(str,args){
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
	}*/
	this.commands = function() { //List commands
		var modules = Object.keys(juliar.modules);
		var functions = "";
		for(var i=0,length = modules.length;i<length;i++){
			functions += " >> IMPORTED from "+modules[i]+"<br/>";
			for( var x in juliar.modules[modules[i]]) {
				if(typeof juliar.modules[modules[i]][x] === "function") {
					functions += " "+x + " ";
					functions += "<br>";
				}
			}
		}
		return functions;
	}
	this.modules = function(){
		return Object.keys(juliar.modules);
	}
	this.javascript = function(str) {
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
	this.link = function(str,args){
		args[0] = args[0] || str;
		var temp = !(args[1]) == true ? "_blank" : "_self";
		return "<a href='"+str+"' target='"+temp+"'>"+args[0]+"</a>";
	}
	this.mail = function(str,args){
		args[0] = args[0] || str;
		return "<a href='mailto:"+str+"'>"+args[0]+"</a>";
	}
	this.store = function(str,args) {
		localStorage.setItem(args[0], str);
		return str;
	}
	this.restore = function(str) {
		return localStorage.getItem(str);
	}
	//
	//Symbol Stuff
	this.symbol = function(str){
		switch(str){
			case "sigma": return "&Sigma;";
			case "delta": return "&Delta;";
			case "integral": return "";
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
	this.threed = function(str){
		return "<span style='text-shadow: -0.06em 0 red,  0.06em 0 cyan;'>"+str+"</span>";
	}
	//
	//DOM Stuff
	/*this.submit = function(str,args){
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
	}*/
	this.columns = function(str,args){
		var temp = 100/(args[0] || 1);
		return "<div style='float:left;width:"+temp+"%'>"+str+"</div>";
	}
	this.float = function(str,args){
		args[0] = args[0] || "right";
		return "<span style='float:"+args[0]+";'>"+str+"</span>";
	}
	this.sticky = function(str,args){
		args[0] = args[0]  || "initial";
		args[1] = args[1]  || "initial";
		var x = args[0] < 0 ? "bottom:" : "top:";
		var y = args[1] < 0 ? "right:" : "left:";
		return "<span style='position:fixed;"+x+args[0]+";"+y+args[1]+"'>"+str+"</span>";
	}
	this.spoiler = function(str,args){
		var temp = args[0] || "black";
		var front = args[1] || "black";
		var back = args[2] || "white";
		juliar.css('.juliar_spoiler_'+temp+'{ background-color:'+temp+';color:'+temp+'}.juliar_spoiler_'+temp+':hover{background-color:'+front+';color:'+back+'}');
		return "<span class='juliar_spoiler_"+temp+"'>"+str+"</span>";
	}
	this.bullet = function(str){
		return "<ul><li>" + str + "</li></ul>";
	}
	this.visibility = function(str,args){
		var temp = args[0] || 40;
		return "<span style='opacity: "+temp/100+";filter: alpha(opacity="+temp+");'>"+str+"</span>";
	}
	this.color = function(str,args) {
		var temp = args[0] || 'inherit';
		if(args.length < 2) return "<span style='color: " + temp + "'> " + str + "</span>";
		var output = "";
		var words = str.split(" ");
		var index = 0;
		var escaper = 0;
		var found = 0;
		for(var i=0,length = words.length;i<length;i++){
			if(index==args.length) index = 0;
			if(words[i].indexOf("<") != -1){escaper = 1;}
			if(escaper == 0) output += "<span style='color: " + args[index++] + "'> "+words[i]+" </span>";
			else{output+= " "+words[i];}
			if(words[i].indexOf(">") != -1){
				var left = words[i].split("<").length;
				var right = words[i].split(">").length; 
				if(left > right) escaper = 1;
				if(right > left) escaper = 0;
			}
		}
		return output;
	}
	this.ask = function(str,args) {
		var temp = args[0] || "";
		juliar.code('prompt("'+str+'", "'+temp+'");');
		return "";
	}
	this.error = function(str) {
		juliar.code('alert("'+str+'")');
		return "";
	}
	this.background = function(str) {
		if(str.indexOf("//") != -1) juliar.code(document.body.style.backgroundImage = "url("+str+")");
		else{ 
			var temp = str.split(" ");
			temp.length == 2 ? juliar.code('document.body.style.background = "linear-gradient( to left top, '+temp[1]+', '+temp[0]+')";') : juliar.code("document.body.style.background = '"+temp[0]+"';");
		}
		return "";
	}
	this.list = function(str,args){
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
	this.button = function(str,args){
		var str = str || "#";
		var name = args[0] || "Submit";
		var color = args[1] || 'SteelBlue';
		juliar.css('.juliar_button_'+color+'{background-color:'+color+';color:white;text-decoration: none;padding: 10px 15px;}')
		return "<a href='"+str+"' class='juliar_button_"+color+"'>"+name+"</a>";
	}
	//
	//History Manipulation
	this.history = function(){
		return window.history.length;
	}
	this.statehistory = function(){
		return window.state;
	}
	this.sethistory = function(str,args){
		var temp = args[0] || null;
		history.pushState(temp, null, str);
	}
	this.gethistory = function(str){
		return IsNumeric(str) ? window.history.go(str) : window.history.go(juliar_core_globals(str));
	}
	this.replacehistory = function(str){
		var temp = args[0] || null;
		history.replaceState(temp, null, str);
	}
	//
	//Array Manipulation
	this.pick = function(str,args) {
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
	this.randomize = function(str) {
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
	this.left = function(str) {
		return "<div class='left'>" + str + "</div>";
	}
	this.right = function(str) {
		return "<div class='right'>" + str + "</div>";
	}
	this.center = function(str) {
		return "<div class='center'>" + str + "</div>";
	}
	this.middle = function(str) {
		return "<div class='middle'>" + str + "</div>";
	}
	this.bold = function(str) {
		return "<span class='bold'>" + str + "</span>";
	}
	this.italics = function(str) {
		return "<span class='italics'>" + str + "</span>";
	}
	this.crossout = function(str) {
		return "<span class='crossout'>" + str + "</span>";
	}
	this.overline = function(str) {
		return "<span class='overline'>" + str + "</span>";
	}
	this.subscript = function(str) {
		return "<span class='subscript'>" + str + "</span>";
	}
	this.superscript = function(str) {
		return "<span class='superscript'>" + str + "</span>";
	}
	this.underline = function(str) {
		return "<span class='underline'>" + str + "</span>";
	}
	this.uppercase = function(str){
		return "<span style='text-transform: uppercase;'>"+str+"</span>";
	}
	this.lowercase = function(str){
		return "<span style='text-transform: lowercase;'>"+str+"</span>";
	}
	this.capitalize = function(str){
		return "<span style='text-transform: capitalize;'>"+str+"</span>";
	}
	this.blur = function(str,args){
		var temp = args[0] || 'black';
		return "<span style='text-shadow: 0 0 3px "+temp+";color: transparent;'>"+str+"</span>";
	}
	this.smaller = function(str) {
		return "<span class='smaller'>" + str + "</span>";
	}
	this.larger = function(str) {
		return "<span class='larger'>" + str + "</span>";
	}
	this.shrink = function(str) {
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
	this.grow = function(str) {
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
	this.highlight = function(str,args) {
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
	this.rainbow = function(str,args) { 
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
	this.size = function(str,args) { 
		var temp = args[0] || 'inherit';
		return "<span style='font-size: " + temp + "'> " + str + "</span>";
	}
	this.font = function(str,args) { //May needtomodify to prevent scripts... DEFINITELY NEEDS MODIFYING
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
	this.rotate = function(str,args){
		var temp = args[0] || 350;
		args[0] = args[0]  || "inherit";
		args[1] = args[1]  || "inherit";
		var x = args[0] < 0 ? "bottom:" : "top:";
		var y = args[1] < 0 ? "right:" : "left:";
		return "<div style='transform: rotate("+temp+"deg);position:relative;"+x+args[0]+";"+y+args[1]+"'>" + str + "</div>";
	}
	this.reflect = function(str,args){
		var temp = args[0] || "X";
		return "<div style='transform: scale"+temp.toUpperCase()+"(-1);'>" + str + "</div>";
	}
	this.border = function(str,args){
		var color = args[0] || "black";
		var size = args[1] || 1;
		var style = args[2] || "solid";
		return "<span style='border: "+size+"px "+style+" "+color+"'>"+str+"</span>";
	}
	this.outline = function(str,args){
		var temp = args[0] || 'orange';
		return "<span style='text-shadow:-1px -1px 0 "+temp+",1px -1px 0 "+temp+",-1px 1px 0 "+temp+",1px 1px 0 "+temp+"'>"+str+"</span>";
	}
	this.blink = function(str,args){
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
	this.date = function(){
		var now = new Date();
		return ("0"+(now.getMonth()+1)).slice(-2)+"/"+("0"+now.getDate()).slice(-2)+"/"+now.getFullYear();
	}
	this.time = function(){
		var now = new Date();
		return ("0"+now.getHours()).slice(-2)+ ":" + ("0"+now.getMinutes()).slice(-2) + ":" + ("0"+now.getSeconds()).slice(-2);
	}
	//
	//News Related
	this.newsbanner = function(str,args){
		var temp = args[0] || 50;
		return "<div class='marquee' style='animation: marquee "+temp+"s linear infinite;'>"+str+"</div>";
	}
	this.newspaper = function(str,args){
		var st = args[0] || 2;
		var style = "-webkit-column-count: "+st+";-moz-column-count: "+st+";column-count: "+st+";";
		style += "-webkit-column-gap: 40px;-moz-column-gap: 40px;column-gap: 40px;";
		style += "-webkit-column-rule: 1px solid lightblue;-moz-column-rule: 1px solid lightblue;column-rule: 1px solid lightblue;";
		return "<div style='"+style+"'>"+ str +"</div>";
	}
	this.chapter = function(str){
		return "<p class='chapter'>"+ str +"</p>";
	}
	this.picture = function(str,args) { 
		var width = args[0] || "100%";
		var height = args[1] || "auto";
		return "<img style='max-width: 100%;width:"+width+";height:"+height+";margin:0 auto;' src='" + str + "'/>";
	}
	//
	//Media
	this.pdf = this.flash = this.java = function(str,args){
		var width = args[0] || 420;
		var height = args[1] || 315;
		return "<object width='"+width+"' height='"+height+"' data='"+str+"'></object>"
	}
	this.video = function(str,args) {
		var width = args[0] || 420;
		var height = args[1] || 315;
		var autoplay = args[2] || 0;
		if(str.indexOf("//www.youtube.com/watch?v=") != -1) return '<iframe width='+width+' height='+height+' src="//www.youtube.com/embed/'+str.split('?v=')[1]+'?autoplay='+{true:1,false:0}[!!JSON.parse(autoplay)]+'&t='+(args[3] || 0)+'" frameborder="0" allowfullscreen></iframe>';
		else if(str.indexOf("//youtu.be/") != -1) return '<iframe width='+width+' height='+height+' src="//www.youtube.com/embed/'+str.split('youtu.be/')[1]+'?autoplay='+{true:1,false:0}[!!JSON.parse(autoplay)]+'&t='+(args[3] || 0)+'" frameborder="0" allowfullscreen></iframe>';
		else if(str.indexOf("//vimeo.com/") != -1) return '<iframe width='+width+' height='+height+' src="//player.vimeo.com/video/'+str.split("/").pop()+'?autoplay='+{true:1,false:0}[!!JSON.parse(autoplay)]+'#t='+(args[3] || 0)+'" frameborder="0" allowfullscreen></iframe>';
		else if(str.indexOf("//www.twitch.tv/") != -1) return '<iframe width='+width+' height='+height+' src="//www.twitch.tv/'+str.split("/").pop()+'/embed" frameborder="0"></iframe>';
		return '<video src="' + str + '" controls="controls">Your browser does not support HTML Video</video>';
	}
	this.music = function(str) { 
		return '<audio src="' + str + '" controls="controls">Your browser does not support HTML Audio</audio>';
	}
	//
	//Max,Min & Absolute
	this.randomnumber = function(str) {
		return (Math.random() * (parseInt(str) || 100)) + 1 |0;
	}
	this.largestnumber = function() {
		return Number.MAX_SAFE_INTEGER;
	}
	this.smallestnumber = function() {
		return Number.MIN_SAFE_INTEGER;
	}
	this.maximum = function(str) {
		return Math.max.apply(Math, str.split(" "));
	}
	this.minimum = function(str) {
		return Math.min.apply(Math, str.split(" "));
	}
	this.absolute = function(str) {
		return str.split(" ").map(Math.abs).join(" ");
	}
	//
	//Header & Title
	this.banner = function(str){
		var width = args[0] || "100%";
		var height = args[1] || "200";
		return "<img style='max-width: 100%;width:"+width+";height:"+height+";' src='" + str + "'/>";
	}
	this.title = function(str) {
		return "<h1 style='text-align:center'>" + str + "</h1>";
	}
	
	this.author = function(str) {
		return "<h2 style='text-align:center'>" + str + "</h2>";
	}
	//
	//Sockets
	this.socket = function(str,args){
		var temp = args[0] || null;
		var Socket = new WebSocket("wss://"+str);
		juliar.setobject("juliar_core_socket_"+temp, Socket);
		return "Socket Created";
	}
	this.setsocket = function(str,args){
		var temp = args[0] || null;
		juliar.getobject("juliar_core_socket_"+temp).send(str);
		return "Sent "+str;
	}
	this.getsocket = function(str,args){
		var rand = juliar.index();
		juliar.code('juliar_core_globals["juliar_core_socket_'+str+'"].onmessage = function (event) {'+
		'document.getElementsByTagName("juliar_core_sockets_'+rand+')[0].innerHTML = event.data;'+
		'};');
		return "<juliar_core_sockets_"+rand+"></juliar_core_sockets_"+rand+">";
	}
	//
	//Variables and Dynamics
	this.set = function(str,args) {
		return juliar.setobject(args[0],str);
	}	
	this.get = function(str) {
		return juliar.getobject(str);
	}
	this.fetch = function(str) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", str, false);
		xmlhttp.send();
		return xmlhttp.responseText;
	}
	this.dynamicset = function(str,args){
		var temp = args[0] || null;
		juliar.code("var h2s = document.getElementsByTagName('juliar_dynamic_"+temp+"');"+
		"for(var h = 0, length = h2s.length; h < length; h++ ) {h2s[h].innerHTML = str; }");
		juliar.setobject(temp,str);
		return "<juliar_dynamic_"+temp+">"+str+"</juliar_dynamic_"+temp+">";
	}
	this.dynamicget = function(str){
		return "<juliar_dynamic_"+str+">"+juliar.getobject(str)+"</juliar_dynamic_"+str+">";
	}
	this.dynammicfetch = function(str){
		var randomj = "juliar_dynamicfetch_"+juliar.index();
		var xmlhttp = new XMLHttpRequest();
		juliar.code('xmlhttp.onreadystatechange=function(){if (xmlhttp.readyState==4 && xmlhttp.status==200){document.getElementById('+randomj+').innerHTML=xmlhttp.responseText;}};)'+
		'xmlhttp.open("GET",str,true);xmlhttp.send();');
		return "<span id='"+randomj+"'></span>";
	}
	this.dynamicinput = function(str,args){
		return "<input onblur='juliar_core_dynamicset(this.value,\""+args[0]+"\")' type='text' value='"+str+"' style='width: 600px;border-top: 0;border-right: 0;border-left: 0;background: transparent;border-color:rgba(0,0,0,0.3)'>";
	}
	//
	//Math Functions
	//constants
	this.e = function(str) {
		return Math.exp(Number(str) || 1);
	}
	this.pi = function() {
		return '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089';
	}
	this.pythagoras = function(){
		return '1.4142135623730951';
	}
	this.aperys = function(){
		return '1.2020569';
	}
	this.goldenratio = function(){
		return '1.618033988749895';
	}
	this.mascheroni = function(){
		return '0.57721';
	}
	this.conways = function(){
		return '1.30357';
	}
	this.khinchins = function(){
		return '2.6854520010';
	}
	this.kinkelin = function(){
		return '1.2824271291';
	}
	this.epsilon = function(str){
		switch(str){
		case "Vacuum":
		return 1;
		case "Air":
		return "1.00058986";
		case "Methanol":
		return "30";
		case "Water":
		return "80";
		default:
			return 1;
		}
	}
	//trig
	this.sine = this.sin = function(str) {
		return Math.sin(str);
	}
	this.cosine = this.cos = function(str) {
		return Math.cos(str);
	}
	this.tangent = this.tan = function(str) {
		return Math.tan(str);
	}
	this.secant = this.sin = function(str) {
		return 1/Math.cos(str);
	}
	this.cosecant = this.cos = function(str) {
		return 1/Math.sin(str);
	}
	this.cotangent = this.cot = function(str) {
		return 1/Math.tan(str);
	}
	this.asin = this.arcsin = function(str) {
		return Math.asin(str);
	}
	this.acos = this.arccos = function(str) {
		return Math.acos(str);
	}
	this.atan = this.arctangent = function(str) {
		return Math.atan(str);
	}
	this.arcsec = this.arcsecant = function(str) {
		return Math.acos(1/str);
	}
	this.arccsc = this.arccosecant = function(str) {
		return Math.asin(1/str);
	}
	this.arccot = this.arccotangent = function(str) {
		return Math.pi/2-Math.atan(str);
	}
	//Hyperbola Functions
	this.cosh = function(str){
		return Math.cosh(str);
	}
	this.sinh = function(str){
		return Math.sinh(str);
	}
	this.tanh = function(str){
		return Math.tanh(str);
	}
	this.coth = function(str){
		return 1/Math.tanh(str);
	}
	this.sech = function(str){
		return 1/Math.cosh(str);
	}
	this.csch = function(str){
		return 1/Math.sinh(str);
	}
	//
	this.root = function(str,args){
		var root = args[0] || 2;
		var y = Math.pow(Math.abs(str), 1/root);
		if(root%2)return str < 0 ? -y : y;
		return str < 0 ? y+"i" : y;
	}
	this.power = function(str) {
		var temp;
		str.split(" ").forEach(function(element) {
			Number(element)&&(temp=null==temp?Number(element):Math.pow(temp, element));
		});
		return temp;
	}
	this.divide = function(str) {
	var temp;
	str.split(" ").forEach(function(element) {
		Number(element)&&(temp=null==temp?Number(element):temp/Number(element));
	});
	return temp;
	}
	this.multiply = function(str) {
		var temp = 1;
		str.split(" ").forEach(function(element) {
			Number(element) && (temp *= element);
		});
		return temp;
	}
	this.add = function(str) {
		var temp = 0;
		str.split(" ").forEach(function(element) {
			Number(element) && (temp += Number(element));
		});
		return temp;
	}
	this.subtract = function(str) {
		var temp;
		str.split(" ").forEach(function(element) {
			Number(element)&&(temp=null==temp?Number(element):temp-Number(element));
		});
		return temp;
	}
	////
	this.trash = function(){
		return juliar.getobject('null') || juliar.getobject('undefined');
	}
}


function Juliar_interpreter(juliar){
	var css = ".juliar-console{width:99%;background-color: white;font-size:21px;color:#aaa;position:relative;margin-left:14px;}";
	css += ".juliar-console input{font-size:21px;width:100%;margin: 0px;padding:0px;box-shadow: none;}";
	css += ".juliar-console .background{background-color:white;outline: 0px;position:absolute;top:0px;left:0px;border: 0px transparent;}";
	css += ".juliar-console .foreground{position:relative;background-color:transparent;outline: 0px;border: 0px;color:#3498db;}";
	css += ".juliar-console .bar{line-height:21px;left:-14px;font-size:21px;color:#93969b;position:absolute;background-color:white;padding-bottom:3px;}";
	css += "ijuliar{display:inline-block;width:100%;}";
	css += "ijuliar .realblock{box-shadow:0 1px 6px rgba(0,0,0,.12);background-color:white;margin: 24px 20px;padding: 10px;animation: fadein 2s;}";
	css += "@keyframes fadein {from { opacity: 0;bottom:-100px;position:relative; }to   { opacity: 1;bottom:0px;position:relative;}}";
	css += "ijuliar .commandused{font-style: italic;color:#1abc9c;display:inline;}";
	css += "ijuliar .commandused:hover{border-bottom: 1px dotted #b6adad;cursor:pointer;padding-bottom:2px;}";
	css += "ijuliar .time{float:right;color:#D2D5DA;font-style:italic;font-size: 12px;margin-right:5px;}";
	css += "ijuliar .realblock:hover .juliar_close_btn{display:block;}";
	css += "ijuliar .juliar_close_btn{float:right;font-size:14px;cursor:pointer;color:#9b9da2;display:none;padding: 0px 20px}";
	css += "ijuliar .juliar_close_btn:hover{background-color:#40454f;color:white;}";
	juliar.css(css);
	
	this.reset = function(){
		var ijuliars = document.getElementsByTagName("ijuliar"),len = ijuliars.length;
		if(len != 0){ juliar.history = [];juliar.historyindex = 0;}
		while(len--){
			var jselector = ijuliars[len];
			
			jselector.innerHTML = '<div class="juliar-console"><div class="bar">></div><input class="background"><input class="foreground" placeholder="Enter *Juliar * command here..."></div>';
			jselector.addEventListener("keydown", juliar.modules.interpreter.keydown);
		}
	}
	this.keydown = function(e) {
	var keyCode = e.keyCode;
	var target = e.target;
	if (keyCode === 13 && target.value != "") {
	juliar.clearcode();
	var str = target.value;
	juliar.history.unshift(str);
	juliar.historyindex = 0;
	var temp = document.createElement("div");
	temp.className = "realblock";
	var now = new Date();
	temp.innerHTML = "<span onclick='(function(element){element.parentNode.removeChild(element);})(this.parentNode)' class='juliar_close_btn'> &#10006; </span>"+
	"<span class='time'>"+("0"+now.getHours()).slice(-2)+ ":" + ("0"+now.getMinutes()).slice(-2) + ":" + ("0"+now.getSeconds()).slice(-2)+"</span>"+
	"<div class='commandused' onclick='(function(element){element.parentNode.parentNode.getElementsByClassName(\"foreground\")[0].value = element.innerHTML;})(this)'>"+str+"</div><hr>"+juliar.parser(str);
	target.parentElement.parentNode.insertBefore(temp, target.parentElement);
	target.value = "";
	target.scrollIntoView(true);
	
	for(var i=0,j=juliar.index();i<j;i++){
	var fileref=document.createElement("script");
	fileref.type = "text/javascript";
	fileref.textContent =juliar.getcode(i);
	document.head.appendChild(fileref);
	}
	document.dispatchEvent(new Event('juliar_done'));
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
	}	