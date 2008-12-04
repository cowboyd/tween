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
function Delegate() {}
Delegate.create = function (o, f) {
	var a = new Array() ;
	var l = arguments.length ;
	for(var i = 2 ; i < l ; i++) a[i - 2] = arguments[i] ;
	return function() {
		var aP = [].concat(arguments, a) ;
		f.apply(o, aP);
	}
}
function Parallel(){
	this.children = new Array();
	this.numChildren = 0;
	this._listeners = new Array();
	this.addListener(this);
}
var s = Parallel.prototype;
s.endObject = new Object();
s.addChild = function(tween){
	this.children.push(tween)
	this.numChildren++;
}
s.start = function(){
	this.play();
	this.broadcastMessage('onMotionStarted', {target:this, type:'onMotionStarted'});
}
s.play = function(){
	for(var u = 0; u < this.numChildren; u++){
		if(u==(this.numChildren-1)){
			this.endObject = new Object();
			this.endObject.onMotionFinished = Delegate.create(this, this.end);
			this.children[u].addListener(this.endObject);
		}
		this.children[u].start();
	}
}

s.end = function(){
	this.children[this.numChildren-1].removeListener(this.endObject);
	this.broadcastMessage('onMotionFinished', {target:this, type:'onMotionFinished'});
}
s.stop = function(){
	this.enumAction('stop');
	this.broadcastMessage('onMotionStopped', {target:this, type:'onMotionStopped'});
	}
s.rewind = function(){
	this.enumAction('rewind');
	}
s.fforward = function(){
	this.enumAction('fforward');
	}
s.resume = function(){
	this.enumAction('resume');
	this.broadcastMessage('onMotionResumed', {target:this, type:'onMotionResumed'});
	}
s.yoyo = function(){
	this.enumAction('yoyo');
	}


s.enumAction = function(action){
	for(var u = 0; u < this.numChildren; u++){
		this.children[u][action]();
	}
}

s.addListener = function(o){
	this.removeListener (o);
	return this._listeners.push(o);

}
s.removeListener = function(o){
	var a = this._listeners;	
	var i = a.length;
	while (i--) {
		if (a[i] == o) {
			a.splice (i, 1);
			return true;
		}
	}
	return false;
}
s.broadcastMessage = function(){
	var arr = new Array();
	for(var i = 0; i < arguments.length; i++){
		arr.push(arguments[i])
	}
	var e = arr.shift();
	var a = this._listeners;
	var l = a.length;
	for (var i=0; i<l; i++){
		if(a[i][e])
		a[i][e].apply(a[i], arr);
	}
}