# *Juliar * Alpha 2
![logo](https://cloud.githubusercontent.com/assets/11934545/9560198/1641db26-4dd6-11e5-8b7d-8aaf54ca2ea1.png)

###### Official Repository: https://github.com/juliarLang
###### Official Website: http://juliar.elementfx.com or http://juliar.tk

##Welcome to *JULIAR *
###JULIAR is a brand new "web" language written in pure javascript. Its simplicity makes it easy for

Why use *JULIAR * ?

-Recursive -> Fast Computation

-Workers(coming soon) -> Built in workers will be used to improve the script.

-Easy to Learn -> Juliar Language is very simple to learn. Even if you don't know much programming, you will be coding like a pro in an hour.

-Simple  -> Made for a mind of a designer, not a programmer

-Cross Platform -> Since juliar is built on top of javascript. Any computer that can run a web browser, can run juliar. Build once use it everywhere.

-Professional -> Don't let the simple syntax fool you, juliar is built to be a professional language.

-Generate High Quality Website pages, Professional Articles, or Powerful Presentations

-If you are a LaTex nerd, Juliar libraries will allow you to generate content as well as on LaTex.

-Easily Integrates with the current website-> No need to worry about the current code not working. Juliar is designed to be safe with many libraries.

-Write Once, use it all the time -> Once you write the code in Juliar, you don't need to worry about updating the code in the future. Juliar will always stay updated, so don't even think about it. Just keep on writing in Juliar.

-Interpreter INCLUDED! Makes it easier to test code on the fly or create computations.

###Other Info
First Published: 4/12/2015

Creator: Andrei Makhanov

Other Contributors: Julia Romanova

	I created this programming language for Julia hence the name of the language juliar.
	She has an artistic mind and thus, it's difficult for her to code in language, let alone javascript and css.
	This language is simple to use and people with a nonlogical mind will be able to use it quickly and easily.
	Juliar can be easily  integrated into other sites simply by using <juliar></juliar> tags.
	This language is inspired by BBCode, Python, HTML 3.2, and AngularJS.
	If you have an improvement to the language i.e. improved code or a new function please commit it on github 
	and I will gladly "pull" your request.
	Please consider donating, all the money will go into an upkeep of the website and improvement of the language.
	Licensed under GPL 3.0
	
##Getting Started
In order to start coding in this language all you need to do is copy the js file into a web directory and then do:

	<script src="/path/to/julia"></script>
	<juliar></juliar>

and that's it! You can now write juliar code between 

	<juliar>
	
and

        </juliar>
        
I've also included an interpreter that can be rendered using 

	<ijuliar></ijuliar>
	
NOTE: You can initiate as many interpreters as you want.
Interpreters are very useful in testing out code.

The class that controls the *Juliar * language is

	function Juliar(verbose) {
	    this.verbose = verbose || 0;
	        var objects = {};
	        var jscode = [];
	        this.modules = [];
	        var csscode = "";
	        this.css = function(str){csscode+=str;}
	        this.getcss = function(){return css;}
	        this.index = function(){return jscode.length;};
	        this.code = function(code){ jscode.push(code);return jscode.length;};
	        this.checkobject = function(obj){return objects.obj?  true:false;};
	        this.setobject = function(obj,value){return objects.obj = value;};
	        this.getobject = function(obj){return objects.obj};
	        this.deleteobject = function(obj){if(objects.obj){objects.obj = undefined;return true;}return false;};
	}var juliar = new Juliar();

In order to see the available commands. One can type *commands *  between the juliar tags, and it will render all available commands. NOTE: When you use *import * command you will be able to import more juliar scripts (also known as modules) and therefore you will have access to more commands. Some commands will be "overwritten" when using *import *, in order to restore the function, one can use command *deport *. 

For example
	*add 3 2 *
	*import funny_math *
	*add 3 2 *
	*add 5 6 *
**Output:  5 32 56**

In order to prevent override. One can *deport * i.e.
	*add 3 2 *
	*import funny_math *
	*add 3 2 *
	*deport funny_math *
	*add 5 6 *
**Output: 5 32 11**

Please check out the sample __index.html__ to get an idea of how to use this language.

Due to timing restraints, I would greatly appreciate any help I can get in order to make this language perfect. Please visit 
 http://juliar.elementfx.com and post that you want to join the team. Thanks for reading this! Again, let's make this language great!
 
 The math section of the code was inspired by polish notation as it allows to perform operations without need of parenthesis.
 
In the future, I plan to use webworkers in order to run the recursive function, please help achieve that if you know how!
 
 Please consider donating via paypal: http://juliar.elementfx.com
 
 OR
 
 <a href='https://pledgie.com/campaigns/28839'><img alt='Click here to lend your support to: Juliar Programming Language: &quot;Web for a nonlogical mind&quot; and make a donation at pledgie.com !' src='https://pledgie.com/campaigns/28839.png?skin_name=chrome' border='0' ></a>
