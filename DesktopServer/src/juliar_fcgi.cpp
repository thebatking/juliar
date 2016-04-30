#include <iostream>
#include <stdio.h>
#include "fcgio.h"

using namespace std;

#ifndef lint
	static const char rcsid[] = "$Id: echo.c,v 1.5 1999/07/28 00:29:37 roberts Exp $";
#endif /* not lint */

#include "fcgi_config.h"

#include <stdlib.h>

#ifdef HAVE_UNISTD_H
	#include <unistd.h>
#endif

#ifdef _WIN32
	#include <process.h>
	#else
	extern char **environ;
#endif

#ifdef _WIN32
	#define GETPID _getpid
	#else
	#define GETPID getpid
#endif

#include "fcgi_stdio.h"


static void PrintEnv(char *label, char **envp)
{
    printf("%s:<br>\n<pre>\n", label);
    for ( ; *envp != NULL; envp++) {
        printf("%s\n", *envp);
	}
    printf("</pre><p>\n");
}

int main ()
{
    char **initialEnv = environ;
    int count = 0;
	
    while (FCGI_Accept() >= 0) {
        char *contentLength = getenv("CONTENT_LENGTH");
        int len;
		
		printf("Content-type: text/html\r\n"
	    "\r\n"
	    "<title>FastCGI echo</title>"
	    "<h1>FastCGI echo</h1>\n"
		"Request number %d,  Process ID: %d<p>\n", ++count, GETPID());
		
        if (contentLength != NULL) {
            len = strtol(contentLength, NULL, 10);
		}
        else {
            len = 0;
		}
		
        if (len <= 0) {
			printf("No data from standard input.<p>\n");
		}
        else {
            int i, ch;
			
			printf("Standard input:<br>\n<pre>\n");
            for (i = 0; i < len; i++) {
                if ((ch = getchar()) < 0) {
                    printf("Error: Not enough bytes received on standard input<p>\n");
                    break;
				}
                putchar(ch);
			}
            printf("\n</pre><p>\n");
		}
		
        PrintEnv("Request environment", environ);
        PrintEnv("Initial environment", initialEnv);
	} /* while */
	
    return 0;
}
