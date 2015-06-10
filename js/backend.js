function mapcar(fun) {
    var arrs = [];
    for (var i43 = 0; i43 < arguments.length - 1; i43 += 1) {
        arrs[i43] = arguments[i43 + 1];
    };
    var resultArray = new Array();
    if (1 === arrs.length) {
        for (var element = null, _js_arrvar45 = arrs[0], _js_idx44 = 0; _js_idx44 < _js_arrvar45.length; _js_idx44 += 1) {
            element = _js_arrvar45[_js_idx44];
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
    for (var el = null, _js_idx46 = 0; _js_idx46 < arr.length; _js_idx46 += 1) {
        el = arr[_js_idx46];
        arr[idx] = fn(el);
        idx += 1;
    };
    return arr;
};
/** Call FN on each element in ARR and return the returned values in a new array. */
function map(fn, arr) {
    var idx = 0;
    var result = [];
    for (var el = null, _js_idx47 = 0; _js_idx47 < arr.length; _js_idx47 += 1) {
        el = arr[_js_idx47];
        result[idx] = fn(el);
        idx += 1;
    };
    return result;
};
/** Check if ITEM is a member of ARR. */
function member(item, arr) {
    for (var el = null, _js_idx48 = 0; _js_idx48 < arr.length; _js_idx48 += 1) {
        el = arr[_js_idx48];
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
    for (var el = null, _js_idx49 = 0; _js_idx49 < arr.length; _js_idx49 += 1) {
        el = arr[_js_idx49];
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
    for (var i50 = 0; i50 < arguments.length - 1; i50 += 1) {
        arrs[i50] = arguments[i50 + 1];
    };
    if (arr && arr.length > 0) {
        var _js52 = arrs.length;
        for (var _js51 = 0; _js51 < _js52; _js51 += 1) {
            var other = arrs[_js51];
            if (other && other.length > 0) {
                arr['splice']['apply'](arr, [arr.length, other.length].concat(other));
            };
        };
    };
    return arr;
};
window.Backend = function (frontend) {
    this.frontend = frontend;
    var self = this;
    var setupSocket = function () {
        self.socket = new WebSocket('ws://ix56iqdiidbtazc7.onion/gamesocket');
        self.socket.onmessage = self.createMessageHandler(self);
        self.socket.onclose = function () {
            return setupSocket();
        };
        return self.socket.onopen = function () {
            if (self.id) {
                self.resume(self.id);
            } else {
                self.init();
            };
            var _js53 = self.actionQueue;
            var _js55 = _js53.length;
            for (var _js54 = 0; _js54 < _js55; _js54 += 1) {
                var action = _js53[_js54];
                self.sendCmd.action;
            };
        };
    };
    setupSocket();
    return null;
};
window.Backend.prototype = { actionQueue : [],
                          clientFunctions : {  },
                          clientFunctionPrototypes : {  },
                          sendCmd : function (cmdForm) {
    return this.socket ? this.socket.send(JSON.stringify(cmdForm)) : nconc(this.actionQueue, cmdForm);
},
                          createMessageHandler : function (self) {
    return function () {
        var args = [];
        for (var i56 = 0; i56 < arguments.length - 0; i56 += 1) {
            args[i56] = arguments[i56 + 0];
        };
        return self.runMsg.apply(self, args);
    };
},
                          runMsg : function (msg) {
    var self;
    var parsed = JSON.parse(msg.data);
    for (var clientFunction in parsed) {
        with ({ args : null,
                clientFunction : clientFunction,
                self : null
              }) {
            var args = parsed[clientFunction];
            this.clientFunctions[clientFunction].apply(this, (self = this, (function () {
                var _js57 = self.clientFunctionPrototypes[clientFunction];
                var _js59 = _js57.length;
                var collect60 = [];
                for (var _js58 = 0; _js58 < _js59; _js58 += 1) {
                    var arg = _js57[_js58];
                    collect60['push'](args[arg]);
                };
                return collect60;
            })()));
        };
    };
}
                        };
this.Backend.prototype.clientFunctionPrototypes.loadPlanes = ['model', 'nickname', 'posX', 'posY', 'posZ'];
this.Backend.prototype.clientFunctions.loadPlanes = function (model, nickname, posX, posY, posZ) {
    return this.frontend.loadPlanes(model, nickname, posX, posY, posZ);
};
this.Backend.prototype.clientFunctionPrototypes.setId = ['id'];
this.Backend.prototype.clientFunctions.setId = function (id) {
    return this.id = id;
};
window.Backend.prototype.init = function () {
    return this.sendCmd({ init : {  } });
};
window.Backend.prototype.resume = function (id) {
    return this.sendCmd({ resume : { id : id } });
};
window.Backend.prototype.startGame = function (nickname) {
    return this.sendCmd({ startGame : { nickname : nickname } });
};