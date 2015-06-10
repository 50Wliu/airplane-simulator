function mapcar(fun) {
var arrs = [];
for (var i27 = 0; i27 < arguments.length - 1; i27 += 1) {
arrs[i27] = arguments[i27 + 1];
};
var resultArray = new Array();
if (1 === arrs.length) {
for (var element = null, _js_arrvar29 = arrs[0], _js_idx28 = 0; _js_idx28 < _js_arrvar29.length; _js_idx28 += 1) {
element = _js_arrvar29[_js_idx28];
resultArray.push(fun(element));
};
} else {
for (var i = 0; i < arrs[0].length; i += 1) {
with ({ i : i }) {
var argsArray = mapcar(function (a) {
return a[i];
}, arrs);
resultArray.push(fun.apply(fun, argsArray));
};
};
};
return resultArray;
};
/** Call FN on each element in ARR, replace element with the return value. */
function mapInto(fn, arr) {
var idx = 0;
for (var el = null, _js_idx30 = 0; _js_idx30 < arr.length; _js_idx30 += 1) {
el = arr[_js_idx30];
arr[idx] = fn(el);
idx += 1;
};
return arr;
};
/** Call FN on each element in ARR and return the returned values in a new array. */
function map(fn, arr) {
var idx = 0;
var result = [];
for (var el = null, _js_idx31 = 0; _js_idx31 < arr.length; _js_idx31 += 1) {
el = arr[_js_idx31];
result[idx] = fn(el);
idx += 1;
};
return result;
};
/** Check if ITEM is a member of ARR. */
function member(item, arr) {
for (var el = null, _js_idx32 = 0; _js_idx32 < arr.length; _js_idx32 += 1) {
el = arr[_js_idx32];
if (el === item) {
return true;
};
};
return false;
};
/** Return a new array with only those elements in ARR that are not in ARR-TO-SUB. */
function setDifference(arr, arrToSub) {
var idx = 0;
var result = [];
for (var el = null, _js_idx33 = 0; _js_idx33 < arr.length; _js_idx33 += 1) {
el = arr[_js_idx33];
if (!member(el, arrToSub)) {
result[idx] = el;
idx += 1;
};
};
return result;
};
function reduce(func, list, init) {
var acc = null;
for (var i = init ? -1 : 0, acc = init ? init : list[0]; i < list.length - 1; i += 1, acc = func(acc, list[i])) {
};
return acc;
};
function nconc(arr) {
var arrs = [];
for (var i34 = 0; i34 < arguments.length - 1; i34 += 1) {
arrs[i34] = arguments[i34 + 1];
};
if (arr && arr.length > 0) {
var _js36 = arrs.length;
for (var _js35 = 0; _js35 < _js36; _js35 += 1) {
var other = arrs[_js35];
if (other && other.length > 0) {
arr['splice']['apply'](arr, [arr.length, other.length].concat(other));
};
};
};
return arr;
};
window.Backend = function (frontend) {
this.frontend = frontend;
var _js37 = this.availableBackends;
var _js39 = _js37.length;
for (var _js38 = 0; _js38 < _js39; _js38 += 1) {
var availableBackend = _js37[_js38];
new availableBackend(this);
};
};
window.Backend.prototype = { commandQueue : [],
availableBackends : [(function () {
var WebSocketsBackend = function (backendInstance) {
this.backendInstance = backendInstance;
var self = this;
var setupSocket = function () {
self.socket = new WebSocket('ws://ix56iqdiidbtazc7.onion/gamesocket');
self.socket.onmessage = function (msg) {
if (msg.data === 'test-response') {
backendInstance.activateBackend(self);
return self.socket.onmessage = function (msg) {
return self.runFunctions(JSON.parse(msg.data));
};
};
};
self.socket.onclose = setupSocket;
return self.socket.onopen = function () {
return self.socket.send('test-request');
};
};
setupSocket();
return null;
};
return WebSocketsBackend;
})()],
sendCommand : function (commandForm) {
return this.activeBackend ? this.activeBackend.send(window.JSON.stringify(commandForm)) : nconc(this.commandQueue, [ commandForm ]);
},
runFunctions : function (functionForm) {
for (var fun in functionForm) {
var arguments = functionForm[fun];
this.clientFunctions[fun](arguments);
};
},
activateBackend : function (backend) {
if (this.availableBackends.indexOf(this.activeBackend) <= this.availableBackends.indexOf(backend)) {
this.activeBackend = backend;
this.initConnection();
while (this.commandQueue) {
sendCommand(this.commandQueue.pop());
};
};
},
initConnection : function () {
return this.id ? this.resume(id) : this.init();
},
clientFunctions : { 'loadPlanes' : function (g1237) {
return (function (model, nickname, posX, posY, posZ) {
return chain(at(this, frontend, loadPlanes(model, nickname, posX, posY, posZ)));
})(g1237.model, g1237.nickname, g1237.posX, g1237.posY, g1237.posZ);
},
'setId' : function (g1238) {
return (function (id) {
return at(this, id) = id;
})(g1238.id);
},
'handleError' : function (g1239) {
return (function (message) {
return chain(console, Math.log('Server-side error: ' + message));
})(g1239.message);
}
}
};
window.Backend.prototype['startGame'] = function (nickname) {
return this.sendCommand({ 'startGame' : { 'nickname' : nickname } });
};
window.Backend.prototype['init'] = function () {
return this.sendCommand({ 'init' : { } });
};
window.Backend.prototype['resume'] = function (id) {
return this.sendCommand({ 'resume' : { 'id' : id } });
};
