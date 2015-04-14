# juliar

Official Repository: https://github.com/juliarLang
Official Website: http://s13.zifboards.com/juliar
JULIAR a brand new web language written in DOM that makes it easier for an artistic mind to design :)

Latest update: 4/13/2015
First Published: 4/12/2015
Creator: Andrei Makhanov
Other Contributors: Julia Romanova
Comment:
	I created this programming language for my girlfriend Julia Romanova hence the name of the language juliar.
	She has an artistic mind and thus, it's difficult for her to code in language, let alone javascript and css.
	This language is simple to use and people with a nonlogical mind will be able to use it quickly and easily.
	Juliar can be easily  integrated into other sites simply by using <juliar></juliar> tags.
	This language is inspired by BBCode, Python, HTML 3.2, and AngularJS.
	If you have an improvement to the language i.e. improved code or a new function please commit it on github 
	and I will gladly "pull" your request.
	Please consider donating, all the money will go into an upkeep of the website and improvement of the language.
	Licensed under GPL 3.0
	
In order to start coding in this language all you need to do is copy the js file into a web directory and then do:

<script src="/path/to/julia"></script>
<juliar></juliar>

and that's it! You can now write juliar code between <juliar> and </juliar>.
I've also included an interpreter that can be accessed by using <ijuliar></ijuliar>. You can initiate as many interpreters as you want. Interpreters are useful in testing out code.

The math section of the code was inspired by polish notation as it allows to perform operations without need of parenthesis.

In the future, I plan to use webworkers in order to run the recursive function, please help achieve that if you know how!

Due to timing restraints, I would greatly appreciate any help I can get in order to make this language perfect. Please visit 
 http://s13.zifboards.com/juliar and post that you want to join the team. Thanks for reading this! Again, let's make this language great!
 
 Please donate at:
 
 <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----
">
<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
</form>

