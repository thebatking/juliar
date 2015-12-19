===========
Get Started
===========

About Commands
--------------
.. note: Each Command must begin with *nameofcommand and must end with * . In order to use * without it being an opening or closing of the command use \ i.e. \*.
	Usually each command requires an input i.e. *+ 2 2 * where 2 2 is the input. Most of the commands also allow "Optional" arguments (although some imported libraries
	may make arguments required). The optional arguments are denoted with = after the command i.e. *block=500px hello * where 500px is the first command. You can pass in
	as many commands as you desire...NOTE you are not allowed to have spaces in the arguments. In order to have spaces, you must use *cw * or *convertwhitespace * i.e.
	*mail=Andrei M andreim@123.com * will display `Andrei` and will try to mail to `M andreim@123.com` This is not the result that we want. Therefore,
	We can use *mail=*cw Andrei M * andreim@123.com * to fix this.

List of Commands
----------------

``*block *``
~~~~~~~~~~~~~
Description:``Takes in the content, and puts the text inside a block(box) ``
Input:``Content of what to put into the block``
Arguments:``width`` (optional)

Example(s):
``*block=500px hello *``
Return:
``block content``