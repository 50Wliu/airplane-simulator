function mapcar(fun) {
var arrs = [];
for (var i1 = 0; i1 < arguments.length - 1; i1 += 1) {
arrs[i1] = arguments[i1 + 1];
};
var resultArray = new Array();
if (1 === arrs.length) {
for (var element = null, _js_arrvar3 = arrs[0], _js_idx2 = 0; _js_idx2 < _js_arrvar3.length; _js_idx2 += 1) {
element = _js_arrvar3[_js_idx2];
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
for (var el = null, _js_idx4 = 0; _js_idx4 < arr.length; _js_idx4 += 1) {
el = arr[_js_idx4];
arr[idx] = fn(el);
idx += 1;
};
return arr;
};
/** Call FN on each element in ARR and return the returned values in a new array. */
function map(fn, arr) {
var idx = 0;
var result = [];
for (var el = null, _js_idx5 = 0; _js_idx5 < arr.length; _js_idx5 += 1) {
el = arr[_js_idx5];
result[idx] = fn(el);
idx += 1;
};
return result;
};
/** Check if ITEM is a member of ARR. */
function member(item, arr) {
for (var el = null, _js_idx6 = 0; _js_idx6 < arr.length; _js_idx6 += 1) {
el = arr[_js_idx6];
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
for (var el = null, _js_idx7 = 0; _js_idx7 < arr.length; _js_idx7 += 1) {
el = arr[_js_idx7];
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
for (var i8 = 0; i8 < arguments.length - 1; i8 += 1) {
arrs[i8] = arguments[i8 + 1];
};
if (arr && arr.length > 0) {
var _js10 = arrs.length;
for (var _js9 = 0; _js9 < _js10; _js9 += 1) {
var other = arrs[_js9];
if (other && other.length > 0) {
arr['splice']['apply'](arr, [arr.length, other.length].concat(other));
};
};
};
return arr;
};
window.Backend = function (frontend) {
this.frontend = frontend;
var _js11 = this.availableBackends;
var _js13 = _js11.length;
for (var _js12 = 0; _js12 < _js13; _js12 += 1) {
var availableBackend = _js11[_js12];
new availableBackend(this);
};
};
window.Backend.prototype = { commandQueue : [],
availableBackends : [(function () {
var WebSocketsBackend = function (backendInstance) {
this.backendInstance = backendInstance;
var self = this;
var setupSocket = function () {
self.socket = new WebSocket('ws://test-airplane.rhcloud.com:8443/gamesocket');
self.socket.onmessage = function (msg) {
if (msg.data === 'test-response') {
backendInstance.activateBackend(self);
return self.socket.onmessage = function (msg) {
return backendInstance.runFunctions(JSON.parse(msg.data));
};
};
};
self.socket.onclose = function () {
backendInstance.deactivateBackend();
return setupSocket();
};
return self.socket.onopen = function () {
return self.socket.send('test-request');
};
};
setupSocket();
return null;
};
WebSocketsBackend.prototype = { send : function (msg) {
return this.socket.send(msg);
} };
return WebSocketsBackend;
})()],
sendCommand : function (commandForm) {
if (this.activeBackend) {
var commandFormString = JSON.stringify(commandForm);
return this.activeBackend.send(commandFormString);
} else {
return nconc(this.commandQueue, [commandForm]);
};
},
runFunctions : function (functionForm) {
for (var fun in functionForm) {
var arguments = functionForm[fun];
this.clientFunctions[fun](this, arguments);
};
},
activateBackend : function (backend) {
if (this.availableBackends.indexOf(this.activeBackend) <= this.availableBackends.indexOf(backend)) {
this.activeBackend = backend;
this.initConnection();
while (this.commandQueue.length !== 0) {
this.sendCommand(this.commandQueue.pop());
};
};
},
deactivateBackend : function () {
return this.activeBackend = null;
},
initConnection : function () {
return this.id ? this.resume(this.id) : this.init();
},
clientFunctions : { 'loadPlanes' : function (g1068, g1069) {
return (function (id, nickname, model, posX, posY, posZ) {
return this.frontend.loadPlanes(id, nickname, model, posX, posY, posZ);
}).call(g1068, g1069.id, g1069.nickname, g1069.model, g1069.posX, g1069.posY, g1069.posZ);
},
'dropPlayer' : function (g1070, g1071) {
return (function (id) {
return this.frontend.dropPlayer(id);
}).call(g1070, g1071.id);
},
'setPlaneProperties' : function (g1072, g1073) {
return (function (id, time, acceleration, velocity, position) {
return this.frontend.setPlaneProperties(id, time, acceleration, velocity, position);
}).call(g1072, g1073.id, g1073.time, g1073.acceleration, g1073.velocity, g1073.position);
},
'setId' : function (g1074, g1075) {
return (function (id) {
return this.id = id;
}).call(g1074, g1075.id);
},
'handleError' : function (g1076, g1077) {
return (function (message) {
return console.log('Server-side error: ' + message);
}).call(g1076, g1077.message);
}
}
};
window.Backend.prototype['joinGame'] = function (nickname) {
return this.sendCommand({ 'joinGame' : { 'nickname' : nickname } });
};
window.Backend.prototype['disconnect'] = function () {
return this.sendCommand({ 'disconnect' : { } });
};
window.Backend.prototype['moveEvent'] = function (angle) {
return this.sendCommand({ 'moveEvent' : { 'angle' : angle } });
};
window.Backend.prototype['init'] = function () {
return this.sendCommand({ 'init' : { } });
};
window.Backend.prototype['resume'] = function (id) {
return this.sendCommand({ 'resume' : { 'id' : id } });
};
