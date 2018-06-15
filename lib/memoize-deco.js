
// source ./RootModule.js
(function(){
	
	var _src_memoize_fn = {};

// source ./ModuleSimplified.js
var _src_memoize_fn;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
function memoizeFn(fn) {
    var _cache = {}, _args = [];
    var Wrapper = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var id = fn_argsId(args, _args);
        return _cache.hasOwnProperty(id)
            ? (_cache[id])
            : (_cache[id] = fn.apply(this, args));
    };
    Wrapper.clearArgs = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var id = fn_argsId(args, _args);
        _cache[id] = null;
    };
    Wrapper.clearAll = function () {
        _cache = {};
    };
    return Wrapper;
}
exports.memoizeFn = memoizeFn;
;
function memoizeCb(fn) {
    var _cache = {}, _cacheCbs = {}, _args = [];
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var callback = args.pop();
        var id = fn_argsId(args, _args);
        if (_cache[id]) {
            callback.apply(this, _cache[id]);
            return;
        }
        if (_cacheCbs[id]) {
            _cacheCbs[id].push(callback);
            return;
        }
        _cacheCbs[id] = [callback];
        args.push(fn_resolveDelegate(_cache, _cacheCbs, id));
        fn.apply(this, args);
    };
}
exports.memoizeCb = memoizeCb;
;
// === private
function fn_resolveDelegate(cache, cbs, id) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        cache[id] = args;
        for (var i = 0, x, imax = cbs[id].length; i < imax; i++) {
            x = cbs[id][i];
            x.apply(this, args);
        }
        cbs[i] = null;
        cache = null;
        cbs = null;
    };
}
function fn_argsId(args, cache) {
    if (args.length === 0)
        return 0;
    var imax = cache.length, i = -1;
    while (++i < imax) {
        if (args_match(cache[i], args))
            return i + 1;
    }
    cache.push(args);
    return cache.length;
}
;
function args_match(a, b) {
    if (a.length !== b.length)
        return false;
    var imax = a.length, i = 0;
    for (; i < imax; i++) {
        if (a[i] !== b[i])
            return false;
    }
    return true;
}
//# sourceMappingURL=memoize-deco.js.map
//# sourceMappingURL=memoize-fn.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_memoize_fn) && isObject(module.exports)) {
		Object.assign(_src_memoize_fn, module.exports);
		return;
	}
	_src_memoize_fn = module.exports;
}());
// end:source ./ModuleSimplified.js

"use strict";
exports.__esModule = true;
var memoize_fn_1 = _src_memoize_fn;
exports.memoizeFn = memoize_fn_1.memoizeFn;
function memoize(target, propertyKey, descriptor) {
    var viaProperty = descriptor == null;
    var fn = memoize_fn_1.memoizeFn(viaProperty ? target[propertyKey] : descriptor.value);
    if (viaProperty) {
        target[propertyKey] = fn;
        return;
    }
    descriptor.value = fn;
    return descriptor;
}
exports.memoize = memoize;
//# sourceMappingURL=memoize-deco.js.map
//# sourceMappingURL=memoize-deco.ts.map

}());
// end:source ./RootModule.js
