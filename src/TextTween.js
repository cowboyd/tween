/**********************************************************************
TERMS OF USE - EASING EQUATIONS
Open source under the BSD License.
Copyright (c) 2001 Robert Penner
JavaScript version copyright (C) 2006 by Philippe Maegerman
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

   * Redistributions of source code must retain the above copyright
notice, this list of conditions and the following disclaimer.
   * Redistributions in binary form must reproduce the above
copyright notice, this list of conditions and the following disclaimer
in the documentation and/or other materials provided with the
distribution.
   * Neither the name of the author nor the names of contributors may
be used to endorse or promote products derived from this software
without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*****************************************/

//TextTween.prototype = new Tween();
//TextTween.prototype.constructor = Tween;
//TextTween.superclass = Tween.prototype;

function TextTween(obj,property,txt,func,duration){
	this.targetObject = obj;
	this.targetProperty = property;
	this.txt = txt;
	if (func!=null && func!='') {
		this.func = func;
	}
	this.init(new Object(),'x',func,0,txt.length,duration);
}
//cowboyd@thefrontside.net
OpacityTween.prototype = new Tween();
OpacityTween.prototype.constructor = Tween;
OpacityTween.superclass = Tween.prototype;

var o = TextTween.prototype;
o.targetObject = {};
o.targetProperty = {};
o.fromColor = '';
o.toColor = '';
o.currentColor = '';
o.onMotionChanged = function(evt){
	var v = evt.target._pos;
	this.targetObject[this.targetProperty] = this.txt.substr(0,v);
}
