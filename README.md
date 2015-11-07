# *Juliar * Alpha 3
![logo](https://cloud.githubusercontent.com/assets/11934545/9560198/1641db26-4dd6-11e5-8b7d-8aaf54ca2ea1.png)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/juliarLang/juliar.svg)](http://isitmaintained.com/project/juliarLang/juliar "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/juliarLang/juliar.svg)](http://isitmaintained.com/project/juliarLang/juliar "Percentage of issues still open")
[![Documentation Status](https://readthedocs.org/projects/juliar/badge/?version=latest)](http://juliar.readthedocs.org/en/latest/?badge=latest)


###### Official Repository: https://github.com/juliarLang
###### Official Website: http://juliar.elementfx.com or http://juliar.tk
###### Twitter: https://twitter.com/juliarLang
###### Documentation: http://juliar.readthedocs.org/en/latest/

##Welcome to *JULIAR *
###JULIAR was originally a new "web" language written in pure javascript. It is now becoming a "desktop" language as well as we're building new Juliar ->ASM compilers, as well as Juliar suite.

Why use *JULIAR * ?

- Functional -> Unlike C, C++, JAVA etc...Juliar is a functional language, which means that everything is a function!

- Workers(coming soon) -> Multi-processing will be used to keep the code running faster.

- Easy to Learn -> Juliar Language is very simple to learn. Even if you don't know much programming, you will be a code hero within hours.

- Cross Platform -> Juliar runs on Windows, Mac, Linux, Unix, Android, iOS, and any other system you use.

- Professional -> Generate High Quality Website pages, Professional Articles, or Powerful Presentations.

- LaTex Friendly -> Juliar has a LaTex library, which allows you to generate LaTex content.

- Integratable -> No need to worry about the current code not working. Juliar is designed to be safe with many libraries.

- Write Once, use it all the time -> No need to rewrite your code as Juliar interpreters and JIT compilers will upkeep it for you.

- Open Source -> All Juliar code is interpreted or compiled at run time.

##Getting Started
In order to start coding in Juliar. All you need to do is open index.html.
If you want to integrate it into your own current project, add the following:

	<script src="/path/to/juliar.js"></script>
	<juliar></juliar>

and that's it! You can now write juliar code between 

	<juliar>
	
and

    </juliar>

I've also included an interpreter that can be rendered using 

	<ijuliar></ijuliar>
	
NOTE: You can initiate as many interpreters as you want.
Interpreters are very useful in testing out code.



In order to see the available commands. One can type *commands *  between the juliar tags, and it will render all available commands.
You use *import * command to be able to import more juliar scripts (also known as modules) and therefore you will have access to more commands. Some commands will be "overwritten" when using *import *, in order to restore the function, one can use command *deport *. 

For example

	*add 3 2 *
	*import funny_math *
	*add 3 2 *
	*add 5 6 *
	
`Output:`

	5
	32 
	56

In order to prevent override. One can *deport * i.e.

	*add 3 2 *
	*import funny_math *
	*add 3 2 *
	*deport funny_math *
	*add 5 6 *
	
`Output:`

	5
	32 
	11

###Other Info
First Published: 4/12/2015
	I created this programming language for Julia hence the name of the language juliar.
	She has an artistic mind and thus, it's difficult for her to code in language, let alone javascript and css.
	This language is simple to use and people with a nonlogical mind will be able to use it quickly and easily.
	Juliar can be easily  integrated into other sites simply by using <juliar></juliar> tags.
	This language is inspired by BBCode, Python, HTML 3.2, and AngularJS.
	If you have an improvement to the language i.e. improved code or a new function please commit it on github 
	and I will gladly "pull" your request.
	Please consider donating. All the money will go into an upkeep of the website and the improvement of the language.
	Licensed under GPL 3.0
	-AndreiM
	