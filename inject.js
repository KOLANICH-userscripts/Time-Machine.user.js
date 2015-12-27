"use strict";
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
{
	let config={
		timeouts:true,
		date:true,
		perfNow:true,
		reqAnimFrame:true
	};
	
	let el=document.getElementsByTagName("timeshifter-signal-element")[0];
	let rate=1;
	function delayForTO(to){
		let delay=Math.abs(Math.round(to/rate));
		return delay;
	}
	let intervals={};
	if(config.timeouts){
		let setIntervalB=setInterval;
		let clearIntervalB=clearInterval;
		let setTimeoutB=setTimeout;
		
		setTimeout=function(...args){
			args[1]=delayForTO(args[1]);
			return setTimeoutB(...args);
		};

		setInterval=function(...args){
			let to=args[1];
			args[1]=delayForTO(to);
			let id=setIntervalB(...args);
			args[1]=to;
			intervals[id]=args;
		};

		clearInterval=function(id){
			clearIntervalB(id);
			delete intervals[id];
		};
	}

	function setRate(newRate){
		rate=newRate;
		//console.info("setting rate to "+newRate);
		if(config.timeouts){
			for(let id in intervals){
				let args=intervals[id];
				clearInterval(id);
				setInterval(...args);
			}
		}
	}
	
	function interpolateTime(base,now){
		return base+(now-base)*rate;
	}
	
	if(config.date){
		let DateB=Date;
		Date=function(...args){
			//console.count("new Date");
			if(!args.length){
				return new DateB(Date.now());
			}
			return new DateB(...args);
		};
		Date.prototype=Object.create(DateB);
		let startDate=DateB.now();
		Date.now=function now(){
			//console.count("Date.now");
			return Math.round(interpolateTime(startDate,DateB.now()));
		};
	}
	
	let perfNowB=performance.now.bind(performance);
	let perfNowBase=perfNowB();
	if(config.perfNow){
		performance.now=function now(){
			//console.count("performance.now");
			return interpolateTime(perfNowBase,perfNowB());
		};
	}
	if(config.reqAnimFrame){
		let reqAnimFrameB=requestAnimationFrame;
		requestAnimationFrame=function(...args){
			let f=args[0];
			args[0]=(function(f, ...args){
				args[0]=interpolateTime(perfNowBase,args[0]);
				f(...args);
			}).bind(this,f);
			reqAnimFrameB(...args);
		};
	}
	el.addEventListener("setRate",(e)=>{console.info("setting rate to "+e.detail);setRate(e.detail);},true);
	
}