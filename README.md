ACME Web
======
Bank System

## Overview:
I have created a Grunt file to build and package this application as an extra. The build process currently only points to the 
src folder as a dev environment. It compiles, lints and builds all Javascript and SCSS files into the src folder and the build folder. Bower is used for dependancy management and I used Jquery and Bootstrap for this project.

I ran into issues with the light Flask server I wrote for handling server-side requests where after syncing the index.py into a build fodler, 
the server would not reflect the changes until the server was restarted, so I stuck with having the local server point to the src folder and not the final build folder. 

## Notes
I assumed that the purpose of this project was to test my Javascript abilities more than my architectural abilities. I did not recieve the .jar file that would have 
done the server side data and request handling so I created a very light-weight Flask environment in Python to handle the requests. The server-side is far from perfect but allowed me to focus 
purely on my front-end skills.

I have included a setup.sh script that contains all of the setup scripts needed to get the local environment up and running. If there are any issues, please don't hesitate to ask any questions. 

Python and Node.js needs to be installed.

## Improvements
There are a number of ways this project can be improved. Currently there is very little structure and there is no templating. 
It would be ideal to have incorporated Jinja or another template level language and have one main template any and all other pages could extend off of. 
  
There is also room for improvement for creating API modules for stand along API calls to the server. Currently, there are various AJAX requests 
that are used all over the place and having a module that pusposely handles the API requests for project wide calls would be ideal.  

## Screenshots

<img src="https://github.com/SierraII/Acme-Web/blob/master/screenshots/1.png" alt=""/>
<img src="https://github.com/SierraII/Acme-Web/blob/master/screenshots/2.png" alt=""/>
