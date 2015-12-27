// ==UserScript==
// @name				Time Machine
// @id					timeflower
// @namespace			timeflower

// @description			Allows you to make change the rate and direction of time flow
// @version				0.0.1-0.0.2

// @include				https://kolanich.github.io/Time-Machine-userscript/

// @author				KOLANICH
// @copyright			KOLANICH, 2015
// @license				Unlicensed
// @contributionURL		https://github.com/KOLANICH/Time-Machine-userscript
// @contributionAmount	feel free to fork and contribute


// @grant				GM_registerMenuCommand
// @grant				GM_getResourceURL
// @run-at				document-start
// @optimize			1
// @resource			inject.js ./inject.js
//
// ==/UserScript==

/*This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>*/

"use strict";
let el=document.createElement("timeshifter-signal-element");
document.head.appendChild(el);
let s=document.createElement("SCRIPT");
s.type="application/javascript;version=1.7";
s.src=GM_getResourceURL("inject.js");
document.head.insertBefore(s, document.head.firstChild);

function setRate(rate){
	el.dispatchEvent(new CustomEvent('setRate', {detail:rate}));
}

[-10,-1,0.1,1,10,100,1000].forEach((r)=>{
	GM_registerMenuCommand(r+"x",setRate.bind(this,r));
});
//GM_registerMenuCommand("Show intervals",()=>{console.log(intervals);});