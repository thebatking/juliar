# *Juliar * Alpha 7
![logo](https://cloud.githubusercontent.com/assets/11934545/9560198/1641db26-4dd6-11e5-8b7d-8aaf54ca2ea1.png)

[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/juliarLang/juliar.svg)](http://isitmaintained.com/project/juliarLang/juliar "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/juliarLang/juliar.svg)](http://isitmaintained.com/project/juliarLang/juliar "Percentage of issues still open")
[![Documentation Status](https://readthedocs.org/projects/juliarlang/badge/?version=latest)](http://juliarlang.readthedocs.org/en/latest/?badge=latest)


###### Official Repository: https://github.com/juliarLang or http://www.src.juliar.org
###### Official Website: http://www.juliar.org
###### Twitter: https://twitter.com/juliarLang or http://www.twitter.juliar.org
###### Facebook: https://www.facebook.com/juliarlang/
###### YouTube: https://www.youtube.com/channel/UCRkKqD0fnuVAJLJe9p4ZiKQ
###### Documentation: http://juliarlang.readthedocs.org/en/latest/
###### Wikipedia: https://en.wikipedia.org/wiki/Juliar

##Welcome to *JULIAR *
_Incepted On: 4/12/2015_
#####*JULIAR * was originally a "web" language (like javascript). It is now also being developed as a "desktop" language (like C#) and "serverside" (like php) language.
It's now universal, with a strong focus on Cross-platform and performance.

We are currently trying to build a Desktop compiler and add FastCGI support. If you could help us, we would really appreciate!

We are also building Juliar->ASM compiler as well as Juliar Operating System.

_The Project now has 2 versions_ : Web version and DesktopServer version. If you just want to try out the language and see why we use it, try out
the WebsiteClient version. Run JuliarServer.exe (if on windows), put the file into webfolder if you run a server, or just open index.html with 
your favorite browser and start using our interpreter.

For more serious projects, use DesktopServer version. Run it to quickly compile juliar files. If you have a server and want to use juliar
as a replacement for PHP, JAVA, or perl. In Apache, just download "mod_fcgid" and pipe the files to "Juliar-cgi.exe"
Feel free to use the Binary! If you want to compile from source, make sure you set the settings to C++11 in the compiler
as we use latest features.

DesktopServer version works with apache, nginx, lighthttpd, tomcat and many other servers. So use it!

Either way, please help support the project in any way you can. Either telling your friends, submitting bugs, or even contributing to the code itself.

####Why use *JULIAR * ?

- __Functional__ _Unlike C, C++, JAVA etc...Juliar is a functional language, which means that everything is a function!_

- __Fast__ _Multi-processing will be used to keep the code running faster._

- __Easy to Learn__ _Juliar Language is very simple to learn. Even if you don't know much programming, you will be a code hero within hours._

- __Cross Platform__ _Juliar runs on Windows, Mac, Linux, Unix, Android, iOS, and any other system you use._

- __Professional__ _Generate High Quality Website pages, Professional Articles, or Powerful Presentations._

- __LaTex Friendly__ _Juliar has a LaTex library, which allows you to generate LaTex content._

- __Sandbox__ _Juliar runs in a sandbox environment._

- __Write Once__ _No need to rewrite your code as Juliar interpreters and JIT compilers will upkeep it for you._

- __Open Source__ _All Juliar code is interpreted or compiled at run time._

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
#####Example:
![Interpreter](http://i1382.photobucket.com/albums/ah274/andreifundrei/simple_zpsvejpkyu2.png)

In order to see the available commands. One can type *commands *  between the juliar tags, and it will render all available commands.
You use *import * command to be able to import more juliar scripts (also known as modules) and therefore you will have access to more commands. Some commands will be "overwritten" when using *import *, in order to restore the function, one can use command *deport *. 

#####Example:

	*add 3 2 *
	*import funny_math *
	*add 3 2 *
	*add 5 6 *
	
Output:

	5
	32 
	56

In order to prevent override. One can *deport * i.e.

	*add 3 2 *
	*import funny_math *
	*add 3 2 *
	*deport funny_math *
	*add 5 6 *
	
Output:

	5
	32 
	11

###Author Comment

_I created this programming language for Julia hence the name of the language juliar.
She has an artistic mind and thus, it's difficult for her to code in language, let alone javascript and css.
This language is simple to use and people with a nonlogical mind will be able to use it quickly and easily.
Juliar can be easily  integrated into other sites simply by using <juliar></juliar> tags.
This language is inspired by BBCode, Python, HTML 3.2, and AngularJS.
If you have an improvement to the language i.e. improved code or a new function please commit it on github 
and I will gladly "pull" your request._