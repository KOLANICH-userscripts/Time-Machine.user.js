JS powered Time Machine [![Unlicensed work](https://raw.githubusercontent.com/unlicense/unlicense.org/master/static/favicon.png)](http://unlicense.org/)
=======================

Some  JS games care tied to real time. It is especially annoing if the game runs in turns and the time was made only to annoy the players, the source of such games are often obfuscated.

Here is a userscript which can help. It exploits JS flexibility and hooks some browser-provided objects to make the web application get maliciously altered time. Of course it can be easily detected, but I have never seen such kind of detections in the wild.

The script may work instable because there is a race between the scripts in webpage and the injected script.

How to use
------------
You can test it [here](https://kolanich.github.io/Time-Machine-userscript/)
To enable it on another website use GM settings
To set the rate time flows use script menu.