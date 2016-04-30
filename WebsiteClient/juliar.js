/* 
	Language: Juliar
	Website: www.juliar.org
	Incepted: 4/12/2015
*/
"use strict";
//Main Controller

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Juliar = function () {
	_createClass(Juliar, [{
		key: "parser",

		//This is a main parser...It allows injection/overwrite via juliar.parser();
		value: function parser() {
			var str = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

			var currentindex = 0,
			    nextvalue = void 0,
			    lastindex = 0,
			    positions = [],
			    hil = 0; //hil = hide, ignore, loop
			while ((currentindex = str.indexOf("*", currentindex)) !== -1) {
				if (str[currentindex - 1] == "\\") ;else if (!((nextvalue = str.charCodeAt(currentindex + 1)) === 32 || nextvalue === 42 || nextvalue == 46 || nextvalue === 9 || nextvalue === 10 || nextvalue === 13)) {
					if (str.indexOf("loop", currentindex) == currentindex + 1 || str.indexOf("ignore", currentindex) == currentindex + 1 /*|| str.indexOf("hide",currentindex) == currentindex+1*/) hil = 1;
					positions.push(currentindex);
				} else {
					if ((lastindex = positions.pop()) === undefined) str = this.log("Code has an extra &#42", "error", "Position: " + currentindex++);else if (hil === 0 || positions.length === 0) {
						var oldstring = str.slice(lastindex + 1, currentindex++);
						str = str.substr(0, lastindex) + this.picker(oldstring) + str.substr(currentindex);
						currentindex = lastindex - 1;
						hil = 0;
					}
				}
				++currentindex;
			}
			if (positions.length > 0) str = this.log("Code is not properly closed", "error", "# of missing &#42 : " + positions.length);
			if (this.csscontent != "") {
				var css = document.createElement("style");
				css.type = "text/css";
				css.innerHTML = this.css;
				document.body.appendChild(css);
			}
			return str.replace(/\\\*/g, "*");
		}
		//Manages what to do with log/errors...can be overriden/injected for customization.

	}, {
		key: "log",
		value: function log() {
			var content = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
			var logType = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];

			for (var _len = arguments.length, additionalText = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
				additionalText[_key - 2] = arguments[_key];
			}

			additionalText.reduce(function (previousValue, currentValue) {
				return previousValue + "<br/>" + currentValue;
			});
			switch (logType) {
				case "warn":
					if (this.verbose > 1) console.warn(content, additionalText);
					if (this.verbose == 1) return "<juliar_warn>" + content + "</juliar_warn><br/><juliar_italics>" + additionalText + "</juliar_italics>";
					return "";
				case "info":
					if (this.verbose > 1) console.info(content, additionalText);
					if (this.verbose == 1) return "<juliar_info>" + content + "</juliar_info><br/><juliar_italics>" + additionalText + "</juliar_italics>";
					return "";
				case "error":
					if (this.verbose > 1) console.error(content, additionalText);
					if (this.verbose == 1) return "<juliar_error>" + content + "</juliar_error><br/><juliar_italics>" + additionalText + "</juliar_italics>";
					return "";
				default:
					if (this.verbose > 1) console.log(content, additionalText);
					return content + " <br/><juliar_italics>" + additionalText + "</juliar_italics>";
			}
		}
		//Main Command that interprets Juliar Commands.

	}, {
		key: "css",

		//Commands can set css code...
		set: function set(code) {
			if (this.csscontent == undefined) this.csscontent = "";
			this.csscontent += code;
		}
		//This command is used by Main Controller to get the css code and apply it.
		,
		get: function get() {
			var code = this.csscontent;
			this.csscontent = "";
			return code;
		}
	}]);

	function Juliar() {
		var verbose = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

		_classCallCheck(this, Juliar);

		this.verbose = verbose;
		this.environment = window ? window.location.protocol == 'file:' ? "local" : "web" : "server";
		///This Code Needs to be updated to new engine
		//START
		var jscode = [];
		this.index = function () {
			return jscode.length;
		};
		this.code = function (code) {
			jscode.push(code);return jscode.length;
		};
		this.getcode = function (id) {
			return Number(id) > -1 ? jscode[id] : jscode;
		};
		this.clearcode = function () {
			jscode = [];
		};

		var objects = {};
		this.setobject = function (obj, value) {
			return objects[obj] = value;
		};
		this.getobject = function (obj) {
			return objects[obj];
		};
		this.checkobject = function (obj) {
			return objects[obj] ? true : false;
		};
		this.deleteobject = function (obj) {
			if (objects[obj]) {
				objects[obj] = undefined;return true;
			}return false;
		};
		//STOP

		//Initialize Modules
		this.modules = { "main": new Juliar_main(this), "web": new Juliar_web(this), "math": new Juliar_math(this), "interpreter": new Juliar_interpreter(this) };

		this.selector("juliar"); //Change this to parse a different tag

		this.modules.interpreter.clearinterpreter();
		//Initialize CORE CSS
		var viewPortTag = document.createElement('meta');
		viewPortTag.name = "viewport";
		viewPortTag.content = "initial-scale=1.0, maximum-scale=1.0, user-scalable=0";
		document.getElementsByTagName('head')[0].appendChild(viewPortTag);
		if (this.csscontent != "") {
			var css = document.createElement("style");
			css.type = "text/css";
			css.innerHTML = this.css;
			document.body.appendChild(css);
		}
		if (this.index() != 0) {
			for (var i = 0, length = this.index(); i < length; i++) {
				var js = document.createElement("script");
				js.type = "text/javascript";
				js.innerHTML = this.getcode(i);
				document.body.appendChild(js);
			}
			this.clearcode();
		}
		var modules = Object.keys(this.modules);
		var i = modules.length;
		var temp = [];
		while (i--) {
			for (var x in this.modules[modules[i]]) {
				if (temp.indexOf(x) == -1 && typeof this.modules[modules[i]][x] === "function") {
					temp.push({ 'name': x, 'mods': i > 0 ? modules[i] : "", 'level': i });
				}
			}
		}
		temp.sort(function (a, b) {
			return a.name < b.name ? -1 : a.name == b.name ? 0 : 1;
		});
		this.commands = temp;
		document.dispatchEvent(new Event('juliar_done'));
	}
	//Tag Selectors/HTML...can be overriden to select different tags.


	_createClass(Juliar, [{
		key: "selector",
		value: function selector() {
			var type = arguments.length <= 0 || arguments[0] === undefined ? "juliar" : arguments[0];

			var juliars = document.getElementsByTagName(type);
			for (var i = 0, juliar_length = juliars.length; i < juliar_length; i++) {
				var jselector = juliars[i];
				jselector.innerHTML = this.parser(jselector.innerHTML);
			}
		}
		//Decides what to do with the snippets of code.. can be overriden/injected to change functionality.

	}, {
		key: "picker",
		value: function picker(str) {
			var temp = str.replace(/\s/g, " ").split(" ")[0];
			var length = temp.length;
			temp = temp.split("=");
			var command = temp[0];
			var args = temp[1] === undefined ? [] : str.slice(1 + command.length, length).split(",");
			var first = command[0];
			var second = command[1];
			var modifier;
			if ("hide" === command) return "";else if ("ignore" === command) return str.substr(length).replace(/\*/g, "\\\*");else if ("loop" === command) return this.parser(str.substr(length).repeat(args[0] || 2));else if (first === '<') second === "=" ? command = "lessthanorequalto" + command.slice(2) : command = "lessthan" + command.slice(1);else if (first === '>') second === "=" ? command = "greaterthanorequalto" + command.slice(2) : command = "greaterthan" + command.slice(1);else if (first === "x" && second === undefined) command = "multiply" + command.slice(1);else if ((modifier = {
				"+": "add",
				"-": "subract",
				"/": "divide",
				"^": "power",
				"!": "not",
				"&": "and",
				"|": "or",
				"$": "root",
				"%": "remainder",
				"=": "equalto"
			}[first]) != undefined) command = modifier + command.slice(1);else if (parseInt(first)) command = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"][first] + command.slice(1);
			var mods = Object.keys(this.modules);
			for (var i = 0, len = mods.length; i < len; i++) {
				if (typeof this.modules[mods[i]][command] === "function") {
					var _modules$mods$i;

					return (_modules$mods$i = this.modules[mods[i]])[command].apply(_modules$mods$i, [str.substr(length)].concat(_toConsumableArray(args)));
				}
			}
			return this.log("Unknown command '" + command + "'", "error", "Arguments: " + args, "Content: " + str.substr(length));
		}
	}]);

	return Juliar;
}();

var juliar;document.addEventListener("DOMContentLoaded", function () {
	juliar = new Juliar();
});

//HTML Controller...contains a library of many commands.

var Juliar_web = function Juliar_web(juliar) {
	_classCallCheck(this, Juliar_web);

	//Simple Fun Message
	console.log("%c Welcome %cto %cJ%cu%cl%ci%ca%cr", "color: black; font-style: italic; font-size: 40px", "color: blue; font-style: italic; font-size: 40px", "color: #0093DD; font-style: italic; font-size: 40px", "color: #E77817; font-style: italic; font-size: 40px", "color: #DA251D; font-style: italic; font-size: 40px", "color: #00923F; font-style: italic; font-size: 40px", "color: #28166F; font-style: italic; font-size: 40px", "color: #DD137B; font-style: italic; font-size: 40px");
	//
	var css = ""; //we're storing as local variable for speed up...much faster than adding to struct directly...
	//Every Juliar Class must be prefixed with juliar_ to prevent style overwrite...
	css += "juliar{font-family: Tahoma, Geneva, sans-serif;background-repeat:no-repeat;background-size:cover;}"; //Tahoma is default font because it looks amazing
	css += "juliar li>a{color:#557FBB;text-decoration:none}juliar li>a:visited{color:#557FBB}juliar li>a:link{color:#557FBB}juliar li>a:hover{color:grey}"; //links are beautifully styled
	css += ".juliar_center{text-align:center;}.juliar_left{text-align:left}.juliar_right{text-align:right}.juliar_middle{display:block;margin-left:auto;margin-right:auto;}";
	//center only aligns text, while middle aligns content;
	css += ".juliar_subscript{vertical-align: sub;font-size: smaller;}.juliar_superscript{vertical-align: super;font-size: smaller;}";
	//Subscript and superscript text
	css += ".juliar_underline{text-decoration: underline;}.juliar_bold{font-weight: bold;}.juliar_italics{font-style: italic;}.juliar_crossout{text-decoration: line-through;}.juliar_overline{text-decoration: overline;}";
	css += ".juliar_capitalize{text-transform: capitalize;}";
	//Different text decorations
	css += ".juliat_chapter:first-child:first-letter { float: left; color: #903; font-size: 75px; line-height: 60px; padding-top: 4px; padding-right: 8px; padding-left: 3px; }";
	//Useful for starting chapters
	css += ".juliar_marquee{margin: 0 auto;overflow: hidden;white-space: nowrap; box-sizing: border-box;}";
	css += ".juliar_marquee:hover{animation-play-state: paused}@keyframes marquee{0%{ text-indent: 100% }100%{ text-indent: -25% }}";
	//Creates a marquee method using animations instead of using browser's built in.
	css += ".juliar_progress-bar{background-color: #1a1a1a;height: 25px;padding: 5px;width: 350px;margin: 50px 0;border-radius: 5px;box-shadow: 0 1px 5px #000 inset, 0 1px 0 #444;}";
	css += ".juliar_progress-bar span{display: inline-block;height: 100%;border-radius: 3px;box-shadow: 0 1px 0 rgba(255, 255, 255, .5) inset;transition: width .4s ease-in-out;}";
	css += "@keyframes fadein {from { opacity: 0;bottom:-100px;position:relative; }to   { opacity: 1;bottom:0px;position:relative;}}";
	css += "@keyframes blink {0%{opacity: 1;}50%{opacity: 0;}100%{opacity: 1;}}";
	//Fade in and Blink animation : only works in some browsers.

	css += ".juliar_error{color:red}"; //Sets Juliar Error Color To RED!
	css += "juliar_menu li,juliar_menu ul{list-style:none;margin:0 0 -2px;padding:0;background-color:#333;}" + "juliar_menu ul{text-align:left;position:relative;z-index:597;text-transform:uppercase}juliar_menu ul li{float:left;min-height:1px;vertical-align:middle}" + "juliar_menu ul li.hover,juliar_menu ul li:hover{position:relative;z-index:599;cursor:default}juliar_menu ul ul{visibility:hidden;position:absolute;" + "top:100%;z-index:598;width:100%;bottom:0;left:0;margin-top:0;border-top:4px solid #1b9bff;text-transform:none;min-width:190px}" + "juliar_menu ul ul li{float:none;font-weight:400;position:relative}juliar_menu,juliar_menu a{background:#333;font-size:14px;font-weight:700}" + "juliar_menu ul ul ul{top:0;left:auto;right:-99.5%;border-top:0 none}juliar_menu ul li:hover>ul{visibility:visible}" + "juliar_menu a{display:block;line-height:1em;text-decoration:none;color:#CBCBCB;padding:0 15px;margin-right:0}" + "juliar_menu{padding:0;margin:0;border:0;border-bottom:4px solid #1b9bff}juliar_menu>ul{display:inline-block}" + "juliar_menu ul:after,juliar_menu:after{content:&#39;&#39;;display:block;clear:both}" + "juliar_menu ul ul a{color:#FFF;border:1px solid #0082e7;border-top:0 none;line-height:150%;padding:16px 20px}" + "juliar_menu>ul>li>a{line-height:48px;color:white}juliar_menu>ul>li>a:visited{color:white}juliar_menu>ul>li>a:link{color:white}juliar_menu ul ul li:first-child>a{border-top:1px solid #0082e7}" + "juliar_menu ul ul li:hover>a{background:#35a6ff}juliar_menu ul ul li:last-child>a{border-radius:0 0 3px 3px;box-shadow:0 1px 0 #1b9bff}" + "juliar_menu ul ul li:last-child:hover>a{border-radius:0 0 0 3px}juliar_menu ul ul li.has-sub>a:after{content:&#39;+&#39;;position:absolute;top:50%;right:15px;margin-top:-8px}" + "juliar_menu ul li.active>a,juliar_menu ul li:hover>a{background:#1b9bff;color:#FFF}juliar_menu ul li.has-sub>a:after{content:&#39;+&#39;;margin-left:5px}" + "juliar_menu ul li.last ul{left:auto;right:0}juliar_menu ul li.last ul ul{left:auto;right:99.5%}";
	css += "juliar_menu>ul{margin-top:-8px;margin-left:-8px;}";
	//Creates a menu that is useful
	css += ".juliar_footer{background-color:#333;padding:15px;text-align:center;color:white;}"; //Creates a footer
	css += ".juliar_block{display:block;box-shadow:0 1px 6px rgba(0,0,0,.12);background-color:white;margin: 24px 20px;padding: 10px;animation: fadein 2s;}";
	//Creates a block that is one of the most fundamental structures
	css += "juliar_error{color:red;}juliar_warn{color:#E77817}juliar_info{color:#0093DD}"; //Tags so that they can be removed easily...may come useful in the future
	css += ".juliar_bold{font-weight:bold}.juliar_italics{font-style:italic}.juliar_underline{text-decoration: underline}.juliar_overline{text-decoration: overline}.juliar_crossout{text-decoration: line-through}";
	css += ".juliar_smaller{font-size:95%}.juliar_larger{font-size:105%}";
	juliar.css = css;

	this.code = function (str) {
		return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}; //ported
	this.javascript = function (script) {
		//ported
		if (script.split(" ")[0].indexOf(".js") !== -1) {
			var fileref = document.createElement("script");
			fileref.src = script;
			document.head.appendChild(fileref);
			return "";
		}
		juliar.code(script);
		return "";
	};
	this.threed = function (output) {
		var spread = arguments.length <= 1 || arguments[1] === undefined ? "0.06em" : arguments[1];

		return "<span style='text-shadow: -" + spread + " 0 red,  " + spread + " 0 cyan;'>" + output + "</span>";
	};
	this.symbol = function (nameOfSymbol) {
		//ported
		switch (nameOfSymbol) {
			case "sigma":
				return "&Sigma;";
			case "delta":
				return "&Delta;";
			case "integral":
				return "&#8747;";
			case "plusminus":
				return "&plusmn;";
			case "leftright":
				return "&harr;";
			case "up":
				return "&uarr;";
			case "down":
				return "&darr;";
			case "left":
				return "&larr;";
			case "right":
				return "&rarr;";
			case "doubleleftright":
				return "&hArr;";
			case "doubleup":
				return "&uArr;";
			case "doubledown":
				return "&dArr;";
			case "doubleleft":
				return "&lArr;";
			case "doubleright":
				return "&rArr;";
			default:
				return "unknown";
		}
	};
	this.visibility = function (output) {
		var visibilityLevel = arguments.length <= 1 || arguments[1] === undefined ? 40 : arguments[1];
		return "<div style='opacity: " + visibilityLevel / 100 + "'>" + output + "</div>";
	};
	this.backgroundcolor = function (output) {
		var color = arguments.length <= 1 || arguments[1] === undefined ? "#428bca" : arguments[1];
		return "<span style=\"background-color:" + color + "\">" + output + "</span>";
	};

	this.notice = function (content) {
		var bgcolor = arguments.length <= 1 || arguments[1] === undefined ? "#428bca" : arguments[1];
		var color = arguments.length <= 2 || arguments[2] === undefined ? "white" : arguments[2];
		var fontsize = arguments.length <= 3 || arguments[3] === undefined ? "16px" : arguments[3];
		var padding = arguments.length <= 4 || arguments[4] === undefined ? "5px" : arguments[4];
		return "<div style='background-color:" + bgcolor + ";color:" + color + ";font-size:" + fontsize + ";padding:" + padding + ";'>" + content + "</div>";
	};
	this.ask = function (questionToAsk) {
		var defaultAnswer = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];
		return prompt(questionToAsk, defaultAnswer);
	};
	this.error = function (alertContent) {
		alert(alertContent);return "<span class=\"juliar_error\">Error invoked: " + alertContent + "</span>";
	};
	////
	//Experimental
	this.newwindow = function () {
		var url = arguments.length <= 0 || arguments[0] === undefined ? "http://www.juliar.org" : arguments[0];
		window.open(url, "newWindow");return "Opened " + url + " in new window!";
	};
	this.warnonclose = function () {
		var WarnOnClose = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
		var warn = arguments.length <= 1 || arguments[1] === undefined ? WarnOnClose : arguments[1];

		if (JSON.parse(warn) != false) {
			window.onbeforeunload = function (e) {
				var e = e || window.event;
				if (e) e.returnValue = 'Are you sure?';
				return 'Are you sure?';
			};
			return "Browser will warn on close!";
		}
		window.onbeforeunload = "";
		return "Browser will normally close!";
	};
	this.urlparameters = function (nameOfUrlParameter) {
		return new RegExp('[\\?&]' + nameOfUrlParameter + '=([^&#]*)').exec(window.location.href)[1];
	};
	this.backbutton = function () {
		var message = arguments.length <= 0 || arguments[0] === undefined ? "Go Back" : arguments[0];
		return "<a href=\"javascript:history.back(1)\">" + message + "</a>";
	};

	this.block = function (blockContent) {
		var width = arguments.length <= 1 || arguments[1] === undefined ? "inherit" : arguments[1];
		return "<div class=\"juliar_block\" style='width:" + width + "'>" + blockContent + "</div>";
	};

	this.section = function (content) {
		var width = arguments.length <= 1 || arguments[1] === undefined ? "auto" : arguments[1];
		var height = arguments.length <= 2 || arguments[2] === undefined ? "auto" : arguments[2];
		var marginx = arguments.length <= 3 || arguments[3] === undefined ? "0" : arguments[3];
		var marginy = arguments.length <= 4 || arguments[4] === undefined ? "auto" : arguments[4];
		var backcolor = arguments.length <= 5 || arguments[5] === undefined ? "transparent" : arguments[5];
		return "<section style='width:" + width + ";height:" + height + ";margin: " + marginx + " $marginy};background-color:" + backcolor + "'>" + content + "</section>";
	};
	this.columns = function (content) {
		var numberOfColumns = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
		var blockStyle = arguments.length <= 2 || arguments[2] === undefined ? "table-cell" : arguments[2];

		if (blockStyle == 1) blockStyle = "inline-block";
		return "<div style='vertical-align:top;display:" + blockStyle + ";width:" + ~ ~100 / numberOfColumns + "%;box-shadow: 1px 0px 1px #888888'>" + content + "</div>";
	};
	this.float = function (content) {
		var alignment = arguments.length <= 1 || arguments[1] === undefined ? "right" : arguments[1];
		return "<span style='float:${alignment};'>${content}</span>";
	};
	this.sticky = function (content) {
		var yPosition = arguments.length <= 1 || arguments[1] === undefined ? "initial" : arguments[1];
		var xPosition = arguments.length <= 2 || arguments[2] === undefined ? "initial" : arguments[2];

		var x = args[0] < 0 ? "bottom:" : "top:";
		var y = args[1] < 0 ? "right:" : "left:";
		return "<span style='position:fixed;" + (x + xPosition) + ";" + (y + yPosition) + "'>" + content + "</span>";
	};
	this.padding = function (content) {
		var size = arguments.length <= 1 || arguments[1] === undefined ? "5px" : arguments[1];
		var paddingType = arguments.length <= 2 || arguments[2] === undefined ? "all" : arguments[2];

		switch (paddingType) {
			case "all":
				return "<div style='padding:" + size + "'>" + content + "</div>";
			case "top":
				return "<div style='padding-top:" + size + "'>" + content + "</div>";
			case "bottom":
				return "<div style='padding-bottom:" + size + "'>" + content + "</div>";
			case "left":
				return "<div style='padding-left:" + size + "'>" + content + "</div>";
			case "right":
				return "<div style='padding-right:" + size + "'>" + content + "</div>";
			case "sides":
				return "<div style='padding-left:" + size + ";padding-right:" + size + "'>" + content + "</div>";
			case "vertical":
				return "<div style='padding-left:" + size + "\";padding-right:" + size + "'>" + content + "</div>";
			default:
				return "<div style='padding:" + size + "'>" + content + "</div>";
		}
	};
	this.globalbackground = function (str) {
		//ported similar
		str = str.trim();
		if (str.indexOf(".") != -1 || str.indexOf("/") != -1) juliar.code("document.body.style.backgroundImage = \"url(" + str.replace(/\s/g, "") + ")\"");else {
			var temp = str.split(" ");
			temp.length == 2 ? juliar.code("document.body.style.background = \"linear-gradient( to left top, " + temp[1] + ", " + temp[0] + ") fixed\"") : juliar.code("document.body.style.background = '" + temp[0] + "'");
		}
		return "Background Changed using the following attribute <em>'" + str + "'</em>";
	};
	this.background = function (str, args) {
		var style;
		args[0] = args[0] || "red";
		if (args[0].indexOf(".") != -1 || args[0].indexOf("/") != -1) style = "background-image: url(" + args[0].replace(/\s/g, "") + ")";else {
			style = args.length == 2 ? "background: linear-gradient( to left top, " + args[1] + ", " + args[0] + ") fixed" : "background:" + args[0];
		}
		return "<div style='" + style + "'>" + str + "</div>";
	};
	this.list = function (content) {
		var type = arguments.length <= 1 || arguments[1] === undefined ? "decimal" : arguments[1];

		var category = juliar.index();
		temp = { "decimal": 1, "lowercase": 'a', "uppercase": 'A', "roman": 'i', "uppercaseroman": 'I' }[type] || 1;
		var list = "var listcat= document.getElementsByTagName(\"juliar_list_" + category + "\")[0];var temp = document.createElement(\"li\");temp.innerHTML = \"" + str + "\";if(listcat.previousElementSibling.nodeName != \"OL\"){";
		list += "temp2 = document.createElement(\"OL\");temp2.type = \"" + temp + "\";listcat.parentNode.insertBefore(temp2, listcat);temp2.appendChild(temp);}";
		list += "else{listcat.previousElementSibling.appendChild(temp);}";
		list += "listcat.parentNode.removeChild(listcat);";
		juliar.code(list);
		return "<juliar_list_" + category + "></juliar_list_" + category + ">";
	};
	//Text Effects
	this.left = function (content) {
		return "<div class='juliar_left'>" + content + "</div>";
	};
	this.right = function (content) {
		return "<div class='juliar_right'>" + content + "</div>";
	};
	this.center = function (content) {
		return "<div class='juliar_center'>" + content + "</div>";
	};
	this.middle = function (content) {
		return "<div class='jular_middle'>" + content + "</div>";
	};
	this.bold = function (content) {
		return "<span class='juliar_bold'>" + content + "</span>";
	};
	this.italics = function (content) {
		return "<span class='juliar_italics'>" + content + "</span>";
	};
	this.crossout = function (content) {
		return "<span class='juliar_crossout'>" + content + "</span>";
	};
	this.overline = function (content) {
		return "<span class='juliar_overline'>" + content + "</span>";
	};
	this.subscript = function (content) {
		return "<span class='juliar_subscript'>" + content + "</span>";
	};
	this.superscript = function (content) {
		return "<span class='juliar_superscript'>" + content + "</span>";
	};
	this.underline = function (content) {
		return "<span class='juliar_underline'>" + content + "</span>";
	};
	this.uppercase = function (content) {
		return "<span style='text-transform: uppercase;'>" + content + "</span>";
	};
	this.lowercase = function (content) {
		return "<span style='text-transform: lowercase;'>" + content + "</span>";
	};
	this.alternatecase = function (content) {
		var index = 0;
		var output = "";
		var escaper = 0;
		for (var i = 0, length = content.length; i < length; ++i) {
			if (content[i] == '<') escaper = 1;else if (escaper === 0) {
				if (content.charCodeAt(i) >= 65 && content.charCodeAt(i) <= 90) {
					output += content[i].toLowerCase();
				} else {
					output += content[i].toUpperCase();
				}
			} else {
				output += content[i];
			}
			if (content[i] == '>') escaper = 0;
		}
		return output;
	};
	this.link = function (str) {
		for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
			args[_key2 - 1] = arguments[_key2];
		}

		str = str.trim() || args[0];
		args[0] = args[0] || str;
		var temp = !args[1] == true ? "_blank" : "_self";
		return "<a href='" + args[0] + "' target='" + temp + "'>" + str + "</a>";
	};
	this.mail = function (str, args) {
		str = str || args[0];args[0] = args[0] || str;return "<a href='mailto:" + args[0] + "'>" + str + "</a>";
	};
	this.button = function () {
		var url = arguments.length <= 0 || arguments[0] === undefined ? "#" : arguments[0];
		var buttonName = arguments.length <= 1 || arguments[1] === undefined ? "Submit" : arguments[1];
		var color = arguments.length <= 2 || arguments[2] === undefined ? "SteelBlue" : arguments[2];

		juliar.css('.juliar_button_${color}{background-color:${color};color:white;text-decoration: none;padding: 10px 15px;}');
		return "<a href='${url}' class='juliar_button_${color}'>${buttonName}</a>";
	};
	this.spoiler = function (content) {
		var initialColor = arguments.length <= 1 || arguments[1] === undefined ? "black" : arguments[1];
		var color = arguments.length <= 2 || arguments[2] === undefined ? "black" : arguments[2];
		var backgroundColor = arguments.length <= 3 || arguments[3] === undefined ? "white" : arguments[3];

		juliar.css('.juliar_spoiler_${initialColor}{ background-color:${initialColor};color:${initialColor}.juliar_spoiler_${initialColor}:hover{background-color:${color};color:${backgroundColor}}');
		return "<span class='juliar_spoiler_${initialColor}'>${content}</span>";
	};
	this.bullet = function (str) {
		var category = juliar.index();
		var list = "var listcat= document.getElementsByTagName(\"juliar_bullet_" + category + "\")[0];var temp = document.createElement(\"li\");temp.style.marginLeft=\"-20px\";temp.innerHTML = \"" + str + "\";if(listcat.previousElementSibling.nodeName != \"UL\"){";
		list += "temp2 = document.createElement(\"UL\");listcat.parentNode.insertBefore(temp2, listcat);temp2.appendChild(temp);}";
		list += "else{listcat.previousElementSibling.appendChild(temp);}";
		list += "listcat.parentNode.removeChild(listcat);";
		juliar.code(list);
		return "<juliar_bullet_" + category + "></juliar_bullet_" + category + ">";
	};

	this.color = function (content) {
		var temp = (arguments.length <= 1 ? undefined : arguments[1]) || 'inherit';
		if (arguments.length - 1 < 2) return "<span style='color: " + temp + "'> ${content}</span>";
		var output = "";
		var words = content.split(" ");
		var index = 0;
		var escaper = 0;
		var found = 0;
		for (var i = 0, length = words.length; i < length; i++) {
			if (index == arguments.length - 1) index = 0;
			if (words[i].indexOf("<") != -1) {
				escaper = 1;
			}
			if (escaper == 0) output += "<span style='color: " + (arguments.length <= index++ + 1 ? undefined : arguments[index++ + 1]) + "'> " + words[i] + " </span>";else {
				output += " " + words[i];
			}
			if (words[i].indexOf(">") != -1) {
				var left = words[i].split("<").length;
				var right = words[i].split(">").length;
				if (left > right) escaper = 1;
				if (right > left) escaper = 0;
			}
		}
		return output;
	};
	//Media
	this.pdf = this.flash = this.java = function (content) {
		var width = arguments.length <= 1 || arguments[1] === undefined ? 420 : arguments[1];
		var height = arguments.length <= 2 || arguments[2] === undefined ? 315 : arguments[2];
		return juliar.environment == "local" ? "This command cannot run in a local environment" : "<object width='" + width + "' height='" + height + "' data='" + content + "'></object>";
	};
	this.video = function (content) {
		var width = arguments.length <= 1 || arguments[1] === undefined ? 420 : arguments[1];
		var height = arguments.length <= 2 || arguments[2] === undefined ? 315 : arguments[2];
		var autoplay = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

		if (juliar.environment === "local") return "This command cannot run in a local environment";else if (content.indexOf("//www.youtube.com/watch?v=") != -1) return '<iframe width=' + width + ' height=' + height + ' src="//www.youtube.com/embed/' + content.split('?v=')[1] + '?autoplay=' + { true: 1, false: 0 }[!!JSON.parse(autoplay)] + '&t=' + (args[3] || 0) + '" frameborder="0" allowfullscreen></iframe>';else if (content.indexOf("//youtu.be/") != -1) return '<iframe width=' + width + ' height=' + height + ' src="//www.youtube.com/embed/' + content.split('youtu.be/')[1] + '?autoplay=' + { true: 1, false: 0 }[!!JSON.parse(autoplay)] + '&t=' + (args[3] || 0) + '" frameborder="0" allowfullscreen></iframe>';else if (content.indexOf("//vimeo.com/") != -1) return '<iframe width=' + width + ' height=' + height + ' src="//player.vimeo.com/video/' + content.split("/").pop() + '?autoplay=' + { true: 1, false: 0 }[!!JSON.parse(autoplay)] + '#t=' + (args[3] || 0) + '" frameborder="0" allowfullscreen></iframe>';else if (content.indexOf("//www.twitch.tv/") != -1) return '<iframe width=' + width + ' height=' + height + ' src="//www.twitch.tv/' + content.split("/").pop() + '/embed" frameborder="0"></iframe>';
		return '<video src="' + content + '" controls="controls">Your browser does not support HTML Video</video>';
	};
	//Need to FIx help...
	this.help = function (str) {
		if (str == "") return "<julair_error>Type \\*help  'command name' \\* to see help for the command</juliar_error>";
		var found = juliar.gethelp(str.trim());
		if (found !== undefined) return found;
		return "<juliar_error>Help could not be found for '" + str + "' </juliar_error>";
	};

	this.menu = function (content) {
		var name = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
		var name = args[0] || null;return "<juliar_menu name=\"${name}\"><ul>${content}</ul></juliar_menu>";
	};
	this.menuitem = function () {
		var name = arguments.length <= 0 || arguments[0] === undefined ? "&nbsp" : arguments[0];
		var url = arguments.length <= 1 || arguments[1] === undefined ? "#" : arguments[1];
		var type = arguments.length <= 2 || arguments[2] === undefined ? "0" : arguments[2];
		var picture = arguments.length <= 3 || arguments[3] === undefined ? "" : arguments[3];

		if (picture) picture = "style=\"background: url(${picture}) no-repeat center center;padding-left:40px;background-size:100%;\"";
		var position = 0;
		if ((position = name.indexOf("<li>")) == -1) {
			switch (type) {
				case "0":
					return '<li><a href="${url}" ${picture}>${name}</a></li>';
				case "1":
					return '<li><a target="_blank" href="${url} ${picture} ">${name}</a></li>';
				default:
					juliar.setobject(args[0], name);
					return '<li><a href="#" ${picture}>${name}</a></li>';
			};
		}
		return '<li><a href="#">${name.slice(0,position)} + </a><ul>${name.slice(position)}</ul></li>';
	};

	this.capitalize = function (content) {
		return "<span class='juliar_capitalize'>" + content + "</span>";
	}; //ported-similar
	this.blur = function (content) {
		var color = arguments.length <= 1 || arguments[1] === undefined ? "black" : arguments[1];

		return "<span style='text-shadow: 0 0 3px " + color + ";color: transparent;'>" + content + "</span>";
	};
	this.smaller = function (content) {
		return "<span class=\"juliar_smaller\">" + content + "</span>";
	};
	this.larger = function (content) {
		return "<span class=\"juliar_larger\">" + content + "</span>";
	};
	this.shrink = function (content) {
		var output = "",
		    escaper = 0,
		    counter = 0;
		for (var i = 0, length = content.length; i < length; ++i) {
			if (content[i] == '<') escaper = 1;
			if (escaper === 0) {
				output += "<span class=\"juliar_smaller\">" + content[i];counter++;
			} else {
				output += content[i];
			}
			if (content[i] == '>') escaper = 0;
		}
		for (i = 0; i < counter; i++) {
			output += "</span>";
		}return output;
	};
	this.grow = function (content) {
		var output = "",
		    escaper = 0,
		    counter = 0;
		for (var i = 0, length = content.length; i < length; ++i) {
			if (content[i] == '<') escaper = 1;
			if (escaper === 0) {
				output += "<span class=\"juliar_larger\">" + content[i];counter++;
			} else {
				output += content[i];
			}
			if (content[i] == '>') escaper = 0;
		}
		for (i = 0; i < counter; i++) {
			output += "</span>";
		}return output;
	};
	this.highlight = function (str) {
		for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
			args[_key3 - 1] = arguments[_key3];
		}

		var index = 0;
		var output = "";
		var escaper = 0;
		args[0] = args[0] || "orange";
		for (var i = 0, length = str.length; i < length; ++i) {
			if (index == args.length) index = 0;
			if (str[i] == '<') escaper = 1;
			if (str[i] == "\\" && str[i + 1] == "*") {
				output += "<span style='background-color:" + args[index++] + "'>\\*</span>";++i;
			} else if (escaper === 0) output += "<span style='background-color:" + args[index++] + "'>" + str[i] + "</span>";else {
				output += str[i];
			}
			if (str[i] == '>') escaper = 0;
		}
		return output;
	};
	this.rainbow = function (str, args) {
		var index = 0;
		var output = "";
		var escaper = 0;
		args[0] = args[0] || "orange";
		for (var i = 0, length = str.length; i < length; ++i) {
			if (index == args.length) index = 0;
			if (str[i] == '<') escaper = 1;
			if (str[i] == "\\" && str[i + 1] == "*") {
				output += "<span style='color:" + args[index++] + "'>\\*</span>";++i;
			} else if (escaper === 0) output += "<span style='color:" + args[index++] + "'>" + str[i] + "</span>";else {
				output += str[i];
			}
			if (str[i] == '>') escaper = 0;
		}
		return output;
	};
	this.size = function (content) {
		var size = arguments.length <= 1 || arguments[1] === undefined ? "inherit" : arguments[1];

		return "<span style='font-size: ${size}'> ${content}</span>";
	};
	this.reflect = function (content) {
		var scale = arguments.length <= 1 || arguments[1] === undefined ? "X" : arguments[1];
		return "<div style='transform: scale " + scale + " (-1);'>" + content + "</div>";
	};
	this.reverse = function (str) {
		for (var i = str.length, o = ''; i > 0; o += str[--i]) {}return o;
	};
	this.border = function (content) {
		var color = arguments.length <= 1 || arguments[1] === undefined ? "black" : arguments[1];
		var size = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
		var style = arguments.length <= 3 || arguments[3] === undefined ? "solid" : arguments[3];
		return "<span style='border: " + size + "px " + style + " " + color + "'>" + content + "</span>";
	};
	this.outline = function (str, args) {
		var temp = args[0] || 'orange';
		return "<span style='text-shadow:-1px -1px 0 " + temp + ",1px -1px 0 " + temp + ",-1px 1px 0 " + temp + ",1px 1px 0 " + temp + "'>" + str + "</span>";
	};
	this.blink = function (content) {
		var sec = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];
		var steps = arguments.length <= 2 || arguments[2] === undefined ? 4 : arguments[2];
		return "<juliar_blink style='animation: blink " + sec + "s steps(" + steps + ") infinite;'>" + content + "</juliar_blink>";
	};
	this.font = function (str, args) {
		//May needtomodify to prevent scripts... DEFINITELY NEEDS MODIFYING
		var temp = args[0] || 'inherit';
		WebFontConfig = {
			google: { families: [temp.split(/(?=[A-Z])/).join(" ") + '::latin'] }
		};
		var wf = document.createElement('script');
		wf.src = '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
		wf.type = 'text/javascript';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(wf, s);
		return "<span style=\"font-family: '" + temp.split(/(?=[A-Z])/).join(" ") + "'\"> " + str + "</span>";
	};
	this.rotate = function (content) {
		var degress = arguments.length <= 1 || arguments[1] === undefined ? 350 : arguments[1];
		var xPosition = arguments.length <= 2 || arguments[2] === undefined ? "inherit" : arguments[2];
		var yPosition = arguments.length <= 3 || arguments[3] === undefined ? "inherit" : arguments[3];

		var y = yPosition < 0 ? "bottom:" : "top:";
		var x = xPosition < 0 ? "right:" : "left:";
		return "<div style='transform: rotate(" + degrees + "deg);position:relative;" + x + xPosition + ";" + y + yPosition + "'>${content}</div>";
	};

	//Date & Time
	this.completedate = function () {
		var now = new Date();
		var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var year = now.getYear();
		var date = (now.getDate() < 10 ? "0" : "") + now.getDate();
		return days[now.getDay()] + ", " + months[now.getMonth()] + " " + date + ", " + (year < 1000 ? year + 1900 : year);
	};
	this.date = function () {
		//ported-similar
		var now = new Date();
		return ("0" + (now.getMonth() + 1)).slice(-2) + "/" + ("0" + now.getDate()).slice(-2) + "/" + now.getFullYear();
	};
	this.time = function () {
		//ported-similar
		var now = new Date();
		return ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2);
	};
	this.timezone = function () {
		var d = new Date().getTimezoneOffset() / 60;
		return d > 0 ? "GMT-" + d : 'GMT+'.Math.abs(d);
	};
	//
	//News Related
	this.newsbanner = function (str) {
		var speed = arguments.length <= 1 || arguments[1] === undefined ? 15 : arguments[1];
		return "<div class='marquee' style='animation: marquee " + temp + "s linear infinite;'>" + str + "</div>";
	};

	this.newspaper = function (content) {
		var style = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];

		var st = "-webkit-column-count: " + st + ";-moz-column-count: " + st + ";column-count: " + st + ";";
		st += "-webkit-column-gap: 40px;-moz-column-gap: 40px;column-gap: 40px;";
		st += "-webkit-column-rule: 1px solid lightblue;-moz-column-rule: 1px solid lightblue;column-rule: 1px solid lightblue;";
		return "<div style='" + st + "'>" + content + "</div>";
	};
	this.chapter = function (name) {
		return "<p class='chapter'>" + name + "</p>";
	};
	this.picture = function (content) {
		var width = arguments.length <= 1 || arguments[1] === undefined ? "100%" : arguments[1];
		var height = arguments.length <= 2 || arguments[2] === undefined ? "auto" : arguments[2];
		return "<img style='max-width: 100%;width:" + width + ";height:" + height + ";margin:0 auto;' src='" + content + "'/>";
	};
	//
	this.music = function (str) {
		return "<audio src=\"" + str + "\" controls=\"controls\">Your browser does not support HTML Audio</audio>";
	};
	//
	//Header & Title
	this.killframes = function () {
		if (top.location != location) top.location.href = document.location.href;
	};
	this.favicon = function (str) {
		juliar.code("var favicon = document.createElement('link');" + "favicon.rel = 'shortcut icon';" + "favicon.href = '" + str + "';" + "document.getElementsByTagName('head')[0].appendChild(favicon)");
		return "Favicon changed to '" + str + "' ";
	};
	this.pagetitle = function (str) {
		juliar.code("document.title = \"" + str + "\"");
		return "Pagetitle changed to '" + str + "' ";
	};
	this.header = function (str) {
		return "<span class=\"header\">" + str + "</span>";
	};
	this.footer = function (str) {
		return "<span class=\"footer\">" + str + "</span>";
	};
	this.banner = function (str) {
		var width = args[0] || "100%";
		var height = args[1] || "200px";
		return "<img style='max-width: 100%;width:" + width + ";height:" + height + ";' src='" + str + "'/>";
	};
	this.subtitle = function (str) {
		return "<h2 style='color:#557FBB'>" + str + "</h2>";
	}; //ported
	this.title = function (str) {
		return "<h1 style='text-align:center'>" + str + "</h1>";
	}; //ported
	this.decimalcount = function (str) {
		var match = ('' + str).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
		if (!match) {
			return 0;
		}
		return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
	};
	this.author = function (str) {
		return "<h2 style='text-align:center'>" + str + "</h2>";
	}; //ported
	//Sockets
	this.socket = function (str, args) {
		var temp = args[0] || null;
		var Socket = new WebSocket("wss://" + str);
		juliar.setobject("juliar_core_socket_" + temp, Socket);
		return "Socket Created";
	};
	this.setsocket = function (str, args) {
		var temp = args[0] || null;
		juliar.getobject("juliar_core_socket_" + temp).send(str);
		return "Sent " + str;
	};
	this.getsocket = function (str) {
		var rand = juliar.index();
		juliar.code('juliar_core_globals["juliar_core_socket_' + str + '"].onmessage = function (event) {' + 'document.getElementsByTagName("juliar_core_sockets_' + rand + ')[0].innerHTML = event.data;' + '};');
		return "<juliar_core_sockets_" + rand + "></juliar_core_sockets_" + rand + ">";
	};
	//
};

var Juliar_math = function Juliar_math(juliar) {
	_classCallCheck(this, Juliar_math);

	this.isPrime = function () {
		for (var _len4 = arguments.length, numbersToCheck = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
			numbersToCheck[_key4] = arguments[_key4];
		}

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = numbersToCheck[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var value = _step.value;

				for (var c = 2; c <= Math.sqrt(value); ++c) {
					if (value % c === 0) return false;
				}
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		return true;
	};
	this.primeList = function () {
		var highnumber = Math.max.apply(Math, arguments);

		return Array.apply(0, Array(highnumber)).map(function (x, y) {
			return y;
		}).filter(function (i) {
			return i > 1 && Array.apply(0, Array(1 + ~ ~Math.sqrt(i))).every(function (x, y) {
				return y < 2 || i % y !== 0;
			});
		});
	};
	this.factorial = function () {
		for (var _len5 = arguments.length, numbers = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
			numbers[_key5] = arguments[_key5];
		}

		var list = "";
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = numbers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var value = _step2.value;

				list += [].concat(_toConsumableArray(Array.apply(0, Array(value)).reduce(function (x, y, z) {
					return x + x * z;
				}, 1)));
			}
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}

		return list;
	};
	this.fibonacci = function () {
		var highnumber = Math.max.apply(Math, arguments);
		return Array.apply(0, Array(highnumber)).reduce(function (x, y, z) {
			return x.concat(z < 2 ? z : x[z - 1] + x[z - 2]);
		}, []);
	};
	//Math Functions
	//constants
	this.e = function (str) {
		return Math.exp(Number(str) || 1);
	};
	this.log = function (str, args) {
		if (!args[0]) return Math.log(Number(str) || 1);
		return Math.log(Number(str) || 1) / Math.log(Number(args[0]) || 10);
	};
	this.pi = function () {
		return '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089';
	};
	this.pythagoras = function () {
		return '1.4142135623730951';
	};
	this.aperys = function () {
		return '1.2020569';
	};
	this.goldenratio = function () {
		return '1.618033988749895';
	};
	this.mascheroni = function () {
		return '0.57721';
	};
	this.conways = function () {
		return '1.30357';
	};
	this.khinchins = function () {
		return '2.6854520010';
	};
	this.kinkelin = function () {
		return '1.2824271291';
	};
	this.gravity = function (str, args) {
		str = args[0] || str.trim().toLowerCase();
		switch (str) {
			case "sun":
				return 274;
			case "jupiter":
				return 24.92;
			case "nepture":
				return 11.15;
			case "saturn":
				return 10.44;
			case "uranus":
			case "venus":
				return 8.87;
			case moon:
				return 1.622;
			case "mars":
				return 3.71;
			case "mercury":
				return 3.7;
			case "pluto":
				return 0.58;
			case "earth":
			default:
				return 9.798;
		}
	};
	this.gravitational = function () {
		return 6.674e-11;
	};
	this.epsilon = function (str) {
		switch (str) {
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
	};
	//trig
	this.sine = this.sin = function (str, args) {
		return args[0] == "degrees" || args[0] == "360" || args[0] ? Math.sin(str * Math.PI / 180) : Math.sin(str);
	};
	this.cosine = this.cos = function (str, args) {
		return args[0] == "degrees" || args[0] == "360" || args[0] ? Math.cos(str * Math.PI / 180) : Math.cos(str);
	};
	this.tangent = this.tan = function (str, args) {
		return args[0] == "degrees" || args[0] == "360" || args[0] ? Math.tan(str * Math.PI / 180) : Math.tan(str);
	};
	this.secant = function (str, args) {
		return args[0] == "degrees" || args[0] == "360" || args[0] ? 1 / Math.cos(str * Math.PI / 180) : 1 / Math.cos(str);
	};
	this.cosecant = function (str, args) {
		return args[0] == "degrees" || args[0] == "360" || args[0] ? 1 / Math.sin(str * Math.PI / 180) : 1 / Math.sin(str);
	};
	this.cotangent = this.cot = function (str, args) {
		return args[0] == "degrees" || args[0] == "360" || args[0] ? 1 / Math.tan(str * Math.PI / 180) : 1 / Math.tan(str);
	};
	this.asin = this.arcsin = function (str, args) {
		return args[0] == "degrees" || args[0] == "360" || args[0] ? Math.asin(str) * 180 / Math.PI : Math.asin(str);
	};
	this.acos = this.arccos = function (str, args) {
		return args[0] == "degrees" || args[0] == "360" || args[0] ? Math.acos(str) * 180 / Math.PI : Math.acos(str);
	};
	this.atan = this.arctangent = function (str, args) {
		return args[0] == "degrees" || args[0] == "360" || args[0] ? Math.atan(str) * 180 / Math.PI : Math.atan(str);
	};
	this.arcsec = this.arcsecant = function (str, args) {
		return args[0] == "degrees" || args[0] == "360" || args[0] ? Math.acos(1 / str) * 180 / Math.PI : Math.acos(1 / str);
	};
	this.arccsc = this.arccosecant = function (str, args) {
		return args[0] == "degrees" || args[0] == "360" || args[0] ? Math.asin(1 / str) * 180 / Math.PI : Math.asin(1 / str);
	};
	this.arccot = this.arccotangent = function (str, args) {
		return args[0] == "degrees" || args[0] == "360" || args[0] ? Math.atan(1 / str) * 180 / Math.PI : Math.atan(1 / str);
	};
	//Hyperbola Functions
	this.cosh = function (str, args) {
		return args[0] == "degrees" || args[0] == "360" || args[0] ? Math.cosh(str * Math.PI / 180) : Math.cosh(str);
	};
	this.sinh = function (str, args) {
		return args[0] == "degrees" || args[0] == "360" || args[0] ? Math.sinh(str * Math.PI / 180) : Math.sinh(str);
	};
	this.tanh = function (str, args) {
		return args[0] == "degrees" || args[0] == "360" || args[0] ? Math.tanh(str * Math.PI / 180) : Math.tanh(str);
	};
	this.coth = function (str, args) {
		return args[0] == "degrees" || args[0] == "360" || args[0] ? 1 / Math.tanh(str * Math.PI / 180) : 1 / Math.tanh(str);
	};
	this.sech = function (str, args) {
		return args[0] == "degrees" || args[0] == "360" || args[0] ? 1 / Math.cosh(str * Math.PI / 180) : 1 / Math.cosh(str);
	};
	this.csch = function (str, args) {
		return args[0] == "degrees" || args[0] == "360" || args[0] ? 1 / Math.sinh(str * Math.PI / 180) : 1 / Math.sinh(str);
	};
	this.asinh = function (str, args) {
		return args[0] == "degrees" || args[0] == "360" || args[0] ? Math.asinh(str) * 180 / Math.PI : Math.asinh(str);
	};
	this.acosh = function (str, args) {
		return args[0] == "degrees" || args[0] == "360" || args[0] ? Math.acosh(str) * 180 / Math.PI : Math.acosh(str);
	};
	this.atanh = function (str, args) {
		return args[0] == "degrees" || args[0] == "360" || args[0] ? Math.atanh(str) * 180 / Math.PI : Math.atanh(str);
	};
	this.asech = function (str, args) {
		return args[0] == "degrees" || args[0] == "360" || args[0] ? Math.acosh(1 / str) * 180 / Math.PI : Math.acosh(1 / str);
	};
	this.acsch = function (str, args) {
		return args[0] == "degrees" || args[0] == "360" || args[0] ? Math.asinh(1 / str) * 180 / Math.PI : Math.asinh(1 / str);
	};
	this.acotanh = function (str, args) {
		return args[0] == "degrees" || args[0] == "360" || args[0] ? Math.atanh(1 / str) * 180 / Math.PI : Math.atanh(1 / str);
	};
	this.toDegrees = function (str) {
		return str * 180 / Math.PI;
	};
	this.toRadians = function (str) {
		return str * Math.PI / 180;
	};
	this.temperature = function (str, args) {
		var num = Number(str.trim()) || null;
		var unit = args[0] || 'K';
		var cto = args[1] || 'C';
		switch (unit) {
			case "F":
				return cto == 'C' ? (num - 32) * 5 / 9 : cto == 'K' ? (num + 459.67) * 5 / 9 : num;
			case "C":
				return cto == 'K' ? num + 273.15 : cto == 'F' ? num * 9 / 5 + 32 : num;
			case "K":
				return cto == 'C' ? num - 273.15 : cto == 'F' ? num * 9 / 5 - 459.67 : num;
			default:
				return "<span class=\"juliar_error\">Cannot convert temperature</span>";
		}
	};
};

var Juliar_main = function Juliar_main(juliar) {
	_classCallCheck(this, Juliar_main);

	this.version = function () {
		if (juliar.environment == "web" || juliar.environment == "local" || juliar.environment == "server") {
			return "Language \\*Juliar \\* version Alpha 7. Running on " + navigator.userAgent;
		}
	};
	this.repeat = function (whatToRepeat) {
		var numberOfRepeats = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];
		return whatToRepeat.repeat(numberOfRepeats);
	};
	this.evaluate = function (operation) {
		return eval(operation);
	};
	this.condition = function (output, condition) {
		if (condition === undefined) return output;
		for (var i = 0, length = condition.length; i < length; ++i) {
			if (eval(condition[i])) return output;
		}
		return "";
	};
	this.or = function (condition) {
		var temp = condition.split(" ");
		for (var i = 0, length = temp.length; i < length; ++i) {
			if (JSON.parse(temp[i]) != false) return true;
		}
		return false;
	};
	this.not = function (condition) {
		return condition.split(" ").every(function (el) {
			return JSON.parse(el) == false;
		});
	};
	this.and = function (condition) {
		//AND conditional to be used with condition
		return condition.split(" ").every(function (el) {
			return JSON.parse(el) != false;
		});
	};
	this.lessthan = function (condition) {
		var out = condition.split(" ");
		var element = out.shift();
		return out.every(function (el) {
			return element < el;
		});
	};
	this.lessthanorequalto = function (condition) {
		var out = condition.split(" ");
		var element = out.shift();
		return out.every(function (el) {
			return element <= el;
		});
	};
	this.greaterthan = function (condition) {
		var out = condition.split(" ");
		var element = out.shift();
		return out.every(function (el) {
			return element > el;
		});
	};
	this.greaterthanorequalto = function (condition) {
		var out = condition.split(" ");
		var element = out.shift();
		return out.every(function (el) {
			return element >= el;
		});
	};
	this.equalto = function (condition) {
		var out = condition.split(" ");
		var element = out.shift();
		return out.every(function (el) {
			return element == el;
		});
	};
	//REPO IS STILL NOT FUNCTIONING NEEDS LOTS OF WORK!!!
	var repolink = "http://juliar.elementfx.com/repo/?juliar=&package=";
	this.repo = function (optionalRepo) {
		if (optionalRepo.trim() == "") return repolink;
		repolink = optionalRepo;
		return "The repo has been now set to " + repolink;
	};
	this.checkrepo = function () {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", repolink, !1);
		return (xmlhttp.status = 200) ? "The repo <juliar_bold>" + repolink + "</juliar_bold> has a pulse" : juliar.log("This repo does not appear to be active! Try changing repo via \\*repo \\*", "error");
	};
	this.update = function () {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", repolink + "&versions=" + Object.keys(juliar.modules).toString(), !1);
		return xmlhttp.status == 200 ? xmlhttp.responseText : juliar.log("Could not get the updates! Make sure that the repo is active by typing \\*checkrepo \\*", "error");
	};
	this.download = function (moduleName) {
		var name = moduleName.split("/").pop();
		if (window.location.protocol == 'file:') return "This command cannot run in a local environment";else if (moduleName.indexOf("//") === -1) {
			var temp = moduleName.split("/");
			moduleName = repolink + name;
		}
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", moduleName, !1);
		xmlhttp.send();
		if (xmlhttp.status != 200) return juliar.log("Cannot download the module. Make sure that you spell the package name correctly.", "error");
		var fileref = document.createElement("a");
		fileref.download = name + ".juliar";
		fileref.href = 'data:text/plain;base64,' + btoa(xmlhttp.responseText);
		document.body.appendChild(fileref);
		fileref.click();
		fileref.parentNode.removeChild(fileref);
		return "Downloading '" + name + "' from <a href='" + moduleName + "'>" + moduleName + "</a>";
	};
	function countcommands() {
		var modules = Object.keys(juliar.modules);
		var i = modules.length;
		var temp = [];
		while (i--) {
			for (var x in juliar.modules[modules[i]]) {
				if (temp.indexOf(x) == -1 && typeof juliar.modules[modules[i]][x] === "function") {
					temp.push({ 'name': x, 'mods': i > 2 ? modules[i] : "", 'level': i });
				}
			}
		}
		temp.sort(function (a, b) {
			return a.name < b.name ? -1 : a.name == b.name ? 0 : 1;
		});
		juliar.commands = temp;
	}
	this.deport = function (a) {
		return juliar.modules[a] === undefined ? juliar.log("Module \"" + a + "\" does not exists", "error") : (delete juliar.modules[a], countcommands(), document.dispatchEvent(new Event('deleted ' + a)), 'Deported Module "' + a + '"');
	};
	this.import = function (str) {
		var alias = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
		var repo = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

		if ((str = str.trim()) === "") return juliar.log("You Did not specify what to import! Cannot Continue to Import");
		var ext = str.slice((str.lastIndexOf(".") - 1 >>> 0) + 2) || "juliar";
		var name = str.trim().split("/").pop();
		if (ext == "juliar" && eval("typeof Juliar_" + name) == "function") {
			//cache
			delete juliar.modules[name];
			alias ? juliar.modules[alias] = eval("new Juliar_" + name) : juliar.modules[name] = eval("new Juliar_" + name);
			countcommands();
			return "Successfully imported module '" + name + "' from cache";
		} else if (window.location.protocol == 'file:') {
			var fileref = document.createElement("input");
			fileref.type = "file";
			fileref.onchange = function (evt) {
				f = evt.target.files[0];
				var reader = new FileReader();
				reader.onload = function (e) {
					var contents = e.target.result;
					var index = f.name.lastIndexOf(".");
					var name = f.name.slice(0, index);
					if (f.name.slice(index) == ".juliar") {
						eval(contents);
						alias ? juliar.modules[alias] = eval("new Juliar_" + name) : juliar.modules[name] = eval("new Juliar_" + name);
						countcommands();
					} else if (f.name.slice(index) == ".jss") {
						var css = document.createElement("style");
						css.type = "text/css";
						css.innerHTML = juliar.parser(contents);
						document.body.appendChild(css);
					} else if (f.name.slice(index) == ".j") {
						var div = document.createElement("juliar");
						div.innerHTML = juliar.parser(contents);
						document.body.appendChild(div);
					} else {
						alert("This file type is currently not supported");
					}
				};
				reader.readAsText(f);
				fileref.parentNode.removeChild(fileref);
			};
			document.body.appendChild(fileref);
			fileref.click();
			return "Let's try to import " + ("<juliar_bold>'" + str + "'</juliar_bold>" || "the file") + " locally...";
		} else {
			if (ext == "juliar") {
				var http = new XMLHttpRequest();
				str.indexOf("//") != -1 ? http.open("GET", str, !1) : http.open("GET", "modules/" + str + ".juliar", !1);
				http.send();
				if (http.status != 200 || http.responseText.indexOf("Juliar_" + name) == -1) {
					if (repo == false) return juliar.log("Failed to Load the module '" + name + "'", "error");
					http = new XMLHttpRequest();
					http.open("GET", repolink + name, !1);
					http.send();
					if (http.status != 200) return juliar.log("Failed to Load the module '" + name + "' from Juliar repo", "error");
				}
				var fileref = document.createElement("script");
				fileref.type = "text/javascript";
				fileref.textContent = http.responseText;
				document.head.appendChild(fileref);
				alias ? juliar.modules[alias] = eval("new Juliar_" + name) : juliar.modules[name] = eval("new Juliar_" + name);
				countcommands();
				return "Successfully imported module '" + name + "'";
			} else if (ext == "jss") {
				var http = new XMLHttpRequest();
				str.indexOf("//") != -1 ? http.open("GET", str, !1) : http.open("GET", "modules/" + str + ".jss", !1);
				http.send();
				if (http.status != 200) return juliar.log("Failed to Load JSS '" + name + "'", "error");
				var css = document.createElement("style");
				css.type = "text/css";
				css.innerHTML = juliar.parser(http.responseText);
				document.body.appendChild(css);
				return "Successfully loaded JSS '" + name + "'";
			} else if (ext == "j") {
				var http = new XMLHttpRequest();
				str.indexOf("//") != -1 ? http.open("GET", str, !1) : http.open("GET", "modules/" + str + ".jss", !1);
				http.send();
				if (http.status != 200) return juliar.log("Failed to Load Juliar File '" + name + "'", "error");
				var div = document.createElement("div");
				div.innerHTML = juliar.parser(http.responseText);
				document.body.appendChild(div);
				return "Successfully loaded Juliar File '" + name + "'";
			}
		}
	};
	this.commands = function (str) {
		for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
			args[_key6 - 1] = arguments[_key6];
		}

		//List commands
		var command = str.trim() || false;
		var names = [];
		var keys = Object.keys(juliar.modules);
		for (var i = 0; i < args.length; i++) {
			if (Number(args[i])) {
				names.push(keys[args[i]]);
			} else if (keys.indexOf(args[i]) != -1) {
				names.push(args[i]);
			}
		}
		var list = juliar.commands;
		var y = list.length;
		var functions = "";
		for (i = 0; i < y; i++) {
			if (!command && names.length == 0 || command && list[i].name.indexOf(command) == 0 || names.indexOf(list[i].mods) != -1) {
				functions += "<span class=\"commandlist\"> \\*" + list[i].name + " " + "\\* </span>";
				if (list[i].mods != "" && list[i].level > 3) functions += "<span class=\"juliar_italics\">>> IMPORTED from <span class=\"juliar_bold\">" + list[i].mods + "</span><juliar_error> level: " + list[i].level + "</juliar_error></span>";
				functions += "<br/>";
			}
		}

		return functions;
	};
	this.count = function (items) {
		return items.split(",").length > 1 ? items.split(",").length : items.split(" ").length;
	};
	this.modules = function () {
		return Object.keys(juliar.modules);
	};
	//Redirection
	this.store = function (itemToStore) {
		for (var _len7 = arguments.length, nameOfItems = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
			nameOfItems[_key7 - 1] = arguments[_key7];
		}

		var _iteratorNormalCompletion3 = true;
		var _didIteratorError3 = false;
		var _iteratorError3 = undefined;

		try {
			for (var _iterator3 = nameOfItems[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
				var storageName = _step3.value;
				localStorage.setItem(storageName.trim(), itemToStore);
			}
		} catch (err) {
			_didIteratorError3 = true;
			_iteratorError3 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion3 && _iterator3.return) {
					_iterator3.return();
				}
			} finally {
				if (_didIteratorError3) {
					throw _iteratorError3;
				}
			}
		}

		return itemToStore;
	};
	this.restore = function (itemToRestore) {
		return localStorage.getItem(itemToRestore.trim());
	};
	this.newline = function () {
		var howManyTimes = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
		return window ? "<br>".repeat(howManyTimes) : "\r\n".repeat(howManyTimes);
	};
	//History Manipulation
	this.history = function () {
		return window.history.length;
	};
	this.statehistory = function () {
		return history.state;
	};
	this.sethistory = function (content) {
		var state = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

		history.pushState(state, null, content);
	};
	this.gethistory = function (historyToGet) {
		return IsNumeric(historyToGet) ? window.history.go(historyToGet) : window.history.go(juliar_core_globals(historyToGet));
	};
	this.replacehistory = function (contentOfHistory) {
		var historyToBeReplacedWith = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
		return history.replaceState(historyToBeReplacedWith, null, contentOfHistory);
	};
	//
	this.trash = function () {
		return juliar.getobject('null') || juliar.getobject('undefined');
	};
	this.root = function (str, args) {
		var root = args[0] || 2;
		var y = Math.pow(Math.abs(str), 1 / root);
		if (root % 2) return str < 0 ? -y : y;
		return str < 0 ? y + "i" : y;
	};
	this.power = function (str) {
		var temp;
		str.split(" ").forEach(function (element) {
			Number(element) && (temp = null == temp ? Number(element) : Math.pow(temp, element));
		});
		return temp;
	};
	this.divide = function (str) {
		var temp;
		str.split(" ").forEach(function (element) {
			Number(element) && (temp = null == temp ? Number(element) : temp / Number(element));
		});
		return temp;
	};
	this.remainder = function (str) {
		var temp;
		str.split(" ").forEach(function (element) {
			Number(element) && (temp = null == temp ? Number(element) : (temp % Number(element) + Number(element)) % Number(element));
		});
		return temp;
	};
	this.multiply = function (str) {
		var temp = 1;
		str.split(" ").forEach(function (element) {
			Number(element) && (temp *= element);
		});
		return temp;
	};
	this.add = function (str) {
		var temp = 0;
		str.split(" ").forEach(function (element) {
			Number(element) && (temp += Number(element));
		});
		return temp;
	};
	this.subtract = function (str) {
		var temp;
		str.split(" ").forEach(function (element) {
			Number(element) && (temp = null == temp ? Number(element) : temp - Number(element));
		});
		return temp;
	};
	//Array Manipulation
	this.pick = function (listToPickFrom, numberOfElementsToPick) {
		var picktype = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

		var pickings = [];
		var pickstore = "";
		var temp = listToPickFrom.split(" ").filter(function (n) {
			return n !== "";
		});
		if (numberOfElementsToPick == undefined) return temp[Math.random() * temp.length | 0];
		if (JSON.parse(picktype) == false && temp.length < numberOfElementsToPick) return juliar.log("Not enough elements to pick from", "error");
		var output = "";
		for (var i = 0; i < numberOfElementsToPick; ++i) {
			if (JSON.parse(picktype) == false) {
				while (pickings.indexOf(pickstore = temp[Math.random() * temp.length | 0]) != -1) {}
				output += pickstore + " ";
				pickings.push(pickstore);
			} else {
				output += temp[Math.random() * temp.length | 0] + " ";
			}
		}
		return output;
	};
	this.randomize = function (listToRandomize) {
		var arr = listToRandomize.split(" ").filter(function (n) {
			return n !== "";
		});
		var currentIndex = arr.length,
		    temporaryValue,
		    randomIndex;
		while (0 !== currentIndex) {
			randomIndex = Math.random() * currentIndex | 0;
			currentIndex -= 1;
			temporaryValue = arr[currentIndex];
			arr[currentIndex] = arr[randomIndex];
			arr[randomIndex] = temporaryValue;
		}
		return arr.join(' ');
	};
	function gcdcalc(a, b) {
		while (b > 0) {
			var temp = b;
			b = a % b; // % is remainder
			a = temp;
		}
		return a;
	}
	this.gcd = function (str) {
		var input = str.trim().split(" ");
		var result = input[0];
		for (var i = 1; i < input.length; i++) {
			result = gcdcalc(result, input[i]);
		}return result;
	};
	function lcmcalc(a, b) {
		return a * (b / gcdcalc(a, b));
	}
	this.lcm = function (str) {
		var input = str.trim().split(" ");
		var result = input[0];
		for (var i = 1; i < input.length; i++) {
			result = lcmcalc(result, input[i]);
		}return result;
	};
	//Variables and Dynamics
	this.set = function (str, args) {
		return juliar.setobject(args[0], str);
	};
	this.get = function (str) {
		return juliar.getobject(str.trim());
	};
	this.fetch = function (str) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", str, false);
		xmlhttp.send();
		return xmlhttp.responseText;
	};
	this.dynamicset = function (str, args) {
		var temp = args[0] || null;
		juliar.code("var h2s = document.getElementsByTagName('juliar_dynamic_" + temp + "');" + "for(var h = 0, length = h2s.length; h < length; h++ ) {h2s[h].innerHTML = '" + str + "';}");
		juliar.setobject(temp, str);
		return "<juliar_dynamic_" + temp + ">" + str + "</juliar_dynamic_" + temp + ">";
	};
	this.dynamicget = function (str) {
		return "<juliar_dynamic_" + str + ">" + juliar.getobject(str.trim()) + "</juliar_dynamic_" + str + ">";
	};
	this.dynammicfetch = function (str) {
		var randomj = "juliar_dynamicfetch_" + juliar.index();
		var xmlhttp = new XMLHttpRequest();
		juliar.code('xmlhttp.onreadystatechange=function(){if (xmlhttp.readyState==4 && xmlhttp.status==200){document.getElementById(' + randomj + ').innerHTML=xmlhttp.responseText;}};)' + 'xmlhttp.open("GET",str,true);xmlhttp.send();');
		return "<span id='" + randomj + "'></span>";
	};
	this.dynamicinput = function (str, args) {
		return "<input onblur='juliar_core_dynamicset(this.value,\"" + args[0] + "\")' type='text' value='" + str + "' style='width: 600px;border-top: 0;border-right: 0;border-left: 0;background: transparent;border-color:rgba(0,0,0,0.3)'>";
	};
	//Max,Min & Absolute
	this.randomnumber = function () {
		var content = arguments.length <= 0 || arguments[0] === undefined ? 100 : arguments[0];
		var numbersToGet = arguments[1];

		var temp = Math.random() * (parseInt(content) || 100) + 1 | 0;
		while (--numbersToGet) {
			temp += "	 " + ~ ~(Math.random() * (parseInt(content) || 100) + 1);
		}
		return temp;
	};
	this.removewhitespace = this.rw = function (str) {
		return str.replace(/\s/g, '');
	};
	this.convertwhitespace = this.cw = function (str) {
		return str.replace(/\s/g, "&nbsp;").trim();
	};
	this.largenumber = function () {
		return Number.MAX_VALUE;
	};
	this.smallnumber = function () {
		return Number.MIN_VALUE;
	};
	this.maximum = function (str) {
		return Math.max.apply(Math, str.split(" "));
	};
	this.minimum = function (str) {
		return Math.min.apply(Math, str.split(" "));
	};
	this.absolute = function (str) {
		return str.split(" ").map(Math.abs).join(" ");
	};
	//
};

var Juliar_interpreter = function Juliar_interpreter(juliar) {
	_classCallCheck(this, Juliar_interpreter);

	var css = ".juliar-console{width:99%;background-color: white;font-size:21px;color:#aaa;position:relative;margin-left:12px;}";
	css += ".juliar-console input{font-size:21px;width:100%;margin: 0px;padding:0px;box-shadow: none;}";
	css += ".juliar-console .background{color:#93969b;background-color:white;outline: 0px;position:absolute;left:0px;border: 0px transparent;}";
	css += ".juliar-console .foreground{position:relative;background-color:transparent;outline: 0px;border: 0px;color:#3498db;}";
	css += ".juliar-console .bar{cursor:help;line-height:25px;left:-12px;font-size:21px;color:#93969b;position:absolute;background-color:white;padding-bottom:2px;}";
	css += "ijuliar{display:inline-block;width:100%;}";
	css += "ijuliar .realblock{box-shadow:0 1px 6px rgba(0,0,0,.12);background-color:white;margin: 24px 20px;padding: 10px;animation: fadein 2s;}";
	css += "@keyframes fadein {from { opacity: 0;bottom:-100px;position:relative; }to   { opacity: 1;bottom:0px;position:relative;}}";
	css += "ijuliar .commandused{font-style: italic;color:#1abc9c;display:inline;}";
	css += "ijuliar .commandused:hover{border-bottom: 1px dotted #b6adad;cursor:pointer;padding-bottom:2px;}";
	css += "ijuliar .commandlist:hover{border-bottom: 1px dotted #b6adad;cursor:pointer;padding-bottom:2px;}";
	css += "ijuliar .time{float:right;color:#D2D5DA;font-style:italic;font-size: 12px;margin-right:5px;}";
	css += "ijuliar .realblock:hover .juliar_close_btn{display:block;}";
	css += "ijuliar .realblock:hover .juliar_min_btn{display:block;}";
	css += "ijuliar .juliar_close_btn{float:right;font-size:14px;cursor:pointer;color:#9b9da2;display:none;padding: 0px 20px}";
	css += "ijuliar .juliar_close_btn:hover{background-color:#40454f;color:white;}";
	css += "ijuliar .juliar_min_btn{float:right;font-size:14px;cursor:pointer;color:#9b9da2;display:none;padding: 0px 20px}";
	css += "ijuliar .juliar_min_btn:hover{background-color:#40454f;color:white;}";
	css += "ijuliar .jcontent{transition: opacity 0.5s linear;opacity: 1;height:auto}";

	css += "ijuliar .dropdown-content {z-index:5;display: none;position: absolute;background-color: #f9f9f9; min-width: 160px;";
	css += "box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);}";
	css += "ijuliar .dropdown-content a {color: black;padding: 12px 16px;text-decoration: none;display: block;}";
	css += "ijuliar .dropdown-content a:hover {background-color: #f1f1f1}";
	css += "ijuliar .show {display:block;}";
	juliar.css = css;

	var generate_list_commands = function generate_list_commands() {
		var empt = "";
		for (var i = 0; i < juliar.history.length; i++) {
			empt += "<a href='#' class='commandsel'>" + juliar.history[i] + "</a>";
		}
		return empt;
	};

	var filter_commands = function filter_commands(func) {
		var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
		var ARGUMENT_NAMES = /([^\s,]+)/g;
		var fnStr = func.toString().replace(STRIP_COMMENTS, '');
		var temp;
		if ((temp = fnStr.indexOf("=>")) != -1) {
			var result = fnStr.slice(0, temp).match(ARGUMENT_NAMES);
			if (result[0].indexOf("(") == 0) {
				result[0] = result[0].slice(1);
			}
			if (result[result.length - 1].lastIndexOf(")") == result[result.length - 1].length - 1) {
				result[result.length - 1] = result[result.length - 1].slice(0, -1);
			}
		} else {
			var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
		}
		if (result === null) return "";
		if (result.length < 2) return " " + result[0];
		var tempres = result.shift();
		return "=(" + result.join('') + ") " + tempres;
	};

	this.clearinterpreter = function () {
		var ijuliars = document.getElementsByTagName("ijuliar"),
		    len = ijuliars.length;
		if (len != 0) {
			juliar.history = [];juliar.historyindex = 0;juliar.historytemp = "";
		}
		while (len--) {
			var jselector = ijuliars[len];
			jselector.innerHTML = '<div class="juliar-console"><div class="bar">></div><div class="dropdown-content"></div><input class="background"><input class="foreground" placeholder="Enter *Juliar * command here..."></div>';
			jselector.addEventListener("keyup", keyUp);
			jselector.addEventListener("click", function (e) {
				var classname = e.target.className;
				switch (classname) {
					case "bar":
						var el = e.target.parentNode.getElementsByClassName("dropdown-content")[0];
						el.innerHTML = generate_list_commands();
						el.classList.toggle("show");
						break;
					case "commandsel":
						var el = e.target.parentNode.parentNode.parentNode.getElementsByClassName("foreground")[0];
						el.value = e.target.innerHTML;
						e.target.parentNode.classList.remove("show");
						break;
					case "commandused":
						var el = e.target.parentNode.parentNode.getElementsByClassName("foreground")[0];
						el.value = e.target.innerHTML;el.focus();break;
					case "juliar_close_btn":
						e.target.parentNode.parentNode.removeChild(e.target.parentNode);
						break;
					case "juliar_min_btn":
						var el = e.target.parentNode.getElementsByClassName("jcontent")[0];
						if (el.style.opacity == 1) {
							el.style.opacity = 0;el.style.height = 0;
						} else {
							el.style.opacity = 1;el.style.height = "auto";
						}
						break;
					case "commandlist":
						var el = e.target.parentNode.parentNode.parentNode.getElementsByClassName("foreground")[0];
						el.value = e.target.innerHTML;el.focus();
						break;
				}
			});
		}
		if (sessionStorage.getItem("juliar_interpreter_history")) {
			juliar.history = sessionStorage.getItem("juliar_interpreter_history").split("*!!!!*");
		}
	};
	this.deleteinterpreter = function () {
		var x = document.activeElement.parentNode.parentNode;
		x.parentNode.removeChild(x);
		return "";
	};
	this.downloadcommands = function (str, args) {
		var type = args[0] || 1;
		type = JSON.parse(type);
		var name = str.trim() || "output";
		var a = document.activeElement.parentNode.parentNode.getElementsByClassName("commandused");
		var content = type == 1 ? "<script src='juliar.js'>\r\n<juliar>\r\n" : "";
		for (var i = 0; i < a.length; ++i) {
			content += a[i].innerHTML + "\r\n";
		}
		content += type == 1 ? "</juliar>" : "";
		var fileref = document.createElement("a");
		fileref.download = type == 1 ? name + ".html" : name + ".j";
		fileref.href = 'data:text/plain;base64,' + btoa(content);
		document.body.appendChild(fileref);
		fileref.click();
		fileref.parentNode.removeChild(fileref);
		return "Downloading content from interpreter";
	};
	function find(key, array) {
		for (var i = 0; i < array.length; i++) {
			if (array[i].name.indexOf(key) == 0) {
				return [array[i].name, array[i].mods];
			}
		}
		return "";
	};

	var keyUp = function keyUp(e) {
		var keyCode = e.keyCode;
		var target = e.target;
		var inp = String.fromCharCode(keyCode);
		if (keyCode === 13 && target.value != "") {
			juliar.historytemp = "";
			juliar.clearcode();
			var str = target.value;
			juliar.history.unshift(str);
			juliar.historyindex = 0;
			var temp = document.createElement("div");
			temp.className = "realblock";
			var now = new Date();
			temp.innerHTML = "<span class='juliar_close_btn'> &#10006;</span><span class='juliar_min_btn'> &boxminus; </span>" + "<span class='time'>" + ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2) + "</span>" + "<div class='commandused'>" + str + "</div><hr><div class='jcontent' style='opacity:1'>" + juliar.parser(str) + "</div>";
			target.parentElement.parentNode.insertBefore(temp, target.parentElement);
			target.value = "";
			target.parentNode.getElementsByClassName("background")[0].value = "";
			target.scrollIntoView(true);

			for (var i = 0, j = juliar.index(); i < j; i++) {
				var fileref = document.createElement("script");
				fileref.type = "text/javascript";
				fileref.textContent = juliar.getcode(i);
				document.head.appendChild(fileref);
			}
			if (sessionStorage.getItem("juliar_interpreter_history")) {
				sessionStorage.setItem("juliar_interpreter_history", str + "*!!!!*" + sessionStorage.getItem("juliar_interpreter_history"));
			} else {
				sessionStorage.setItem("juliar_interpreter_history", str);
			}
			document.dispatchEvent(new Event('juliar_done'));
		} else if (keyCode === 38) {
			if (juliar.history.length !== 0) {
				++juliar.historyindex;
				if (juliar.historyindex > juliar.history.length) {
					target.value = juliar.historytemp;
					juliar.historyindex = 0;
				} else {
					target.value = juliar.history[juliar.historyindex - 1];
				}
				target.parentNode.getElementsByClassName("background")[0].value = "";
			}
		} else if (keyCode === 40) {
			if (juliar.history.length !== 0) {
				--juliar.historyindex;
				if (juliar.historyindex < 0) {
					juliar.historyindex = juliar.history.length;
					target.value = juliar.history[juliar.historyindex - 1];
				} else if (juliar.historyindex == 0) {
					target.value = juliar.historytemp;
				} else {
					target.value = juliar.history[juliar.historyindex - 1];
				}
				target.parentNode.getElementsByClassName("background")[0].value = "";
			}
		} else if (keyCode == 39) {
			var val = target.value;
			juliar.historytemp = target.value;
			juliar.historyindex = 0;

			var currentindex = 0,
			    positions = [];
			var temppos = [];
			while ((currentindex = val.indexOf("*", currentindex)) !== -1) {
				if (val[currentindex - 1] == "\\") ;else if (!((nextvalue = val.charCodeAt(currentindex + 1)) === 32 || nextvalue === 42 || nextvalue === 9 || nextvalue === 10 || isNaN(nextvalue))) {
					positions.push(currentindex);
				} else {
					if ((lastindex = positions.pop()) === undefined) temppos.push(currentindex);;
				}
				++currentindex;
			}
			var founditem = find(val.slice(val.lastIndexOf("*") + 1), juliar.commands);
			var foundunit = founditem[0];
			if (val.length > 1 && val.length > val.lastIndexOf("*") + 1 && foundunit != "" && val.slice(val.lastIndexOf("*")).length < 1 + foundunit.length) target.value = val.slice(0, val.lastIndexOf("*") + 1) + foundunit;else if (temppos.length > 0) {
				var position;
				while (position = temppos.pop()) {
					target.value = target.value.slice(0, position) + target.value.slice(position + 1);
				}
			} else if (positions.length > 0) {
				var countdown = positions.length;
				while (countdown--) {
					target.value += " *";
				}
			}
			target.parentNode.getElementsByClassName("background")[0].value = "";
		} else {
			var val = target.value;
			juliar.historytemp = target.value;
			juliar.historyindex = 0;
			if (val.length > 1 && val != "" && val.length != val.lastIndexOf("*") + 1) {
				var founditem = find(val.slice(val.lastIndexOf("*") + 1), juliar.commands);
				var foundcomm = founditem[0];
				if (foundcomm) {
					target.parentNode.getElementsByClassName("background")[0].value = target.value.slice(0, val.lastIndexOf("*") + 1) + foundcomm;
				} else {
					target.parentNode.getElementsByClassName("background")[0].value = target.value;
				}
				if (foundcomm != undefined) {
					target.parentNode.getElementsByClassName("background")[0].value += filter_commands(eval("juliar.modules." + (founditem[1] || "main") + "." + foundcomm + ".toString()"));
				}
				var currentindex = 0,
				    nextvalue,
				    lastindex = 0,
				    positions = [],
				    tempstr;
				var negcount = 0;
				while ((currentindex = val.indexOf("*", currentindex)) !== -1) {
					if (val[currentindex - 1] == "\\") ;else if (!((nextvalue = val.charCodeAt(currentindex + 1)) === 32 || nextvalue === 42 || nextvalue === 9 || nextvalue === 10 || isNaN(nextvalue))) {
						positions.push(currentindex);
					} else {
						if ((lastindex = positions.pop()) === undefined) negcount++;
					}
					++currentindex;
				}
				if (negcount) {
					target.parentNode.getElementsByClassName("background")[0].value += " <<ERROR: There are " + negcount + " misplaced *";
				} else if (positions.length > 0) {
					countdown = positions.length;
					tempstr = "";
					while (countdown--) {
						tempstr += " *";
					}target.parentNode.getElementsByClassName("background")[0].value += tempstr;
				}
			} else {
				target.parentNode.getElementsByClassName("background")[0].value = "";
			}
		}
	};
};