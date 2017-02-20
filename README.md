[JS powered Time Machine](https://github.com/KOLANICH/Time-Machine-userscript) [![Unlicensed work](https://raw.githubusercontent.com/unlicense/unlicense.org/master/static/favicon.png)](http://unlicense.org/)
=======================

[![Join the chat at https://gitter.im/Time-Machine-userscript/Lobby](https://badges.gitter.im/Time-Machine-userscript/Lobby.svg)](https://gitter.im/Time-Machine-userscript/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Some  JS games care tied to real time. It is especially annoing if the game runs in turns and the time was made only to annoy the players, the source of such games are often obfuscated.

Here is a userscript which can help. It exploits JS flexibility and hooks some browser-provided objects to make the web application get maliciously altered time. Of course it can be easily detected, but I have never seen such kind of detections in the wild.

The script may work instable because there is a race between the scripts in webpage and the injected script.

How to use
------------
Install the userscript [>>>FROM HERE<<<](https://github.com/KOLANICH/Time-Machine-userscript/raw/gh-pages/TimeMachine.user.js).

**DON'T USE THE GREEN "INSTALL" BUTTON IN GREASYFORK INTERFACE UNTILL [THIS BUG](https://github.com/JasonBarnabe/greasyfork/issues/400) GOT FIXED.**

You can test it [here](https://kolanich.github.io/Time-Machine-userscript/).

To enable it on another website use GM userscript settings

To set the rate time flows use ```User Script Commands``` menu.

Versioning is such: the first version is the version of user.js (the GM part responsible for early injection and GUI), the second is the version of inject.js (the injected part responsible for hooking).