/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 147);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(18);
var hide = __webpack_require__(11);
var redefine = __webpack_require__(12);
var ctx = __webpack_require__(19);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(48)('wks');
var uid = __webpack_require__(34);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(21);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1);
var IE8_DOM_DEFINE = __webpack_require__(98);
var toPrimitive = __webpack_require__(23);
var dP = Object.defineProperty;

exports.f = __webpack_require__(7) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(24);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8);
var createDesc = __webpack_require__(33);
module.exports = __webpack_require__(7) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var hide = __webpack_require__(11);
var has = __webpack_require__(14);
var SRC = __webpack_require__(34)('src');
var $toString = __webpack_require__(151);
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(18).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var fails = __webpack_require__(3);
var defined = __webpack_require__(24);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(49);
var defined = __webpack_require__(24);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(50);
var createDesc = __webpack_require__(33);
var toIObject = __webpack_require__(15);
var toPrimitive = __webpack_require__(23);
var has = __webpack_require__(14);
var IE8_DOM_DEFINE = __webpack_require__(98);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(7) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(14);
var toObject = __webpack_require__(9);
var IE_PROTO = __webpack_require__(71)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(10);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(3);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(0);
var core = __webpack_require__(18);
var fails = __webpack_require__(3);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(19);
var IObject = __webpack_require__(49);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(6);
var asc = __webpack_require__(87);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__(7)) {
  var LIBRARY = __webpack_require__(30);
  var global = __webpack_require__(2);
  var fails = __webpack_require__(3);
  var $export = __webpack_require__(0);
  var $typed = __webpack_require__(64);
  var $buffer = __webpack_require__(95);
  var ctx = __webpack_require__(19);
  var anInstance = __webpack_require__(40);
  var propertyDesc = __webpack_require__(33);
  var hide = __webpack_require__(11);
  var redefineAll = __webpack_require__(42);
  var toInteger = __webpack_require__(21);
  var toLength = __webpack_require__(6);
  var toIndex = __webpack_require__(126);
  var toAbsoluteIndex = __webpack_require__(36);
  var toPrimitive = __webpack_require__(23);
  var has = __webpack_require__(14);
  var classof = __webpack_require__(45);
  var isObject = __webpack_require__(4);
  var toObject = __webpack_require__(9);
  var isArrayIter = __webpack_require__(84);
  var create = __webpack_require__(37);
  var getPrototypeOf = __webpack_require__(17);
  var gOPN = __webpack_require__(38).f;
  var getIterFn = __webpack_require__(86);
  var uid = __webpack_require__(34);
  var wks = __webpack_require__(5);
  var createArrayMethod = __webpack_require__(26);
  var createArrayIncludes = __webpack_require__(54);
  var speciesConstructor = __webpack_require__(52);
  var ArrayIterators = __webpack_require__(89);
  var Iterators = __webpack_require__(47);
  var $iterDetect = __webpack_require__(59);
  var setSpecies = __webpack_require__(39);
  var arrayFill = __webpack_require__(88);
  var arrayCopyWithin = __webpack_require__(115);
  var $DP = __webpack_require__(8);
  var $GOPD = __webpack_require__(16);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(121);
var $export = __webpack_require__(0);
var shared = __webpack_require__(48)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(124))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(34)('meta');
var isObject = __webpack_require__(4);
var has = __webpack_require__(14);
var setDesc = __webpack_require__(8).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(3)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(5)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(11)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 34 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(100);
var enumBugKeys = __webpack_require__(72);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(21);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(1);
var dPs = __webpack_require__(101);
var enumBugKeys = __webpack_require__(72);
var IE_PROTO = __webpack_require__(71)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(69)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(73).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(100);
var hiddenKeys = __webpack_require__(72).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var dP = __webpack_require__(8);
var DESCRIPTORS = __webpack_require__(7);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(19);
var call = __webpack_require__(113);
var isArrayIter = __webpack_require__(84);
var anObject = __webpack_require__(1);
var toLength = __webpack_require__(6);
var getIterFn = __webpack_require__(86);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(12);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(8).f;
var has = __webpack_require__(14);
var TAG = __webpack_require__(5)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(20);
var TAG = __webpack_require__(5)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var defined = __webpack_require__(24);
var fails = __webpack_require__(3);
var spaces = __webpack_require__(75);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(18);
var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(30) ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(20);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 50 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(1);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(10);
var SPECIES = __webpack_require__(5)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 53 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(15);
var toLength = __webpack_require__(6);
var toAbsoluteIndex = __webpack_require__(36);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 55 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(20);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(21);
var defined = __webpack_require__(24);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(4);
var cof = __webpack_require__(20);
var MATCH = __webpack_require__(5)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(5)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__(45);
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(117);
var redefine = __webpack_require__(12);
var hide = __webpack_require__(11);
var fails = __webpack_require__(3);
var defined = __webpack_require__(24);
var wks = __webpack_require__(5);
var regexpExec = __webpack_require__(90);

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(12);
var redefineAll = __webpack_require__(42);
var meta = __webpack_require__(31);
var forOf = __webpack_require__(41);
var anInstance = __webpack_require__(40);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var $iterDetect = __webpack_require__(59);
var setToStringTag = __webpack_require__(44);
var inheritIfRequired = __webpack_require__(76);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var hide = __webpack_require__(11);
var uid = __webpack_require__(34);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(30) || !__webpack_require__(3)(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete __webpack_require__(2)[K];
});


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(10);
var ctx = __webpack_require__(19);
var forOf = __webpack_require__(41);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(18);
var LIBRARY = __webpack_require__(30);
var wksExt = __webpack_require__(99);
var defineProperty = __webpack_require__(8).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(48)('keys');
var uid = __webpack_require__(34);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 72 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(19)(Function.call, __webpack_require__(16).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var setPrototypeOf = __webpack_require__(74).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(21);
var defined = __webpack_require__(24);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),
/* 78 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),
/* 79 */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(30);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(12);
var hide = __webpack_require__(11);
var Iterators = __webpack_require__(47);
var $iterCreate = __webpack_require__(81);
var setToStringTag = __webpack_require__(44);
var getPrototypeOf = __webpack_require__(17);
var ITERATOR = __webpack_require__(5)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(37);
var descriptor = __webpack_require__(33);
var setToStringTag = __webpack_require__(44);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(11)(IteratorPrototype, __webpack_require__(5)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(58);
var defined = __webpack_require__(24);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(5)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(47);
var ITERATOR = __webpack_require__(5)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(8);
var createDesc = __webpack_require__(33);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(45);
var ITERATOR = __webpack_require__(5)('iterator');
var Iterators = __webpack_require__(47);
module.exports = __webpack_require__(18).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(240);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(36);
var toLength = __webpack_require__(6);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(32);
var step = __webpack_require__(116);
var Iterators = __webpack_require__(47);
var toIObject = __webpack_require__(15);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(80)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__(51);

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__(57)(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(19);
var invoke = __webpack_require__(106);
var html = __webpack_require__(73);
var cel = __webpack_require__(69);
var global = __webpack_require__(2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(20)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var macrotask = __webpack_require__(92).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(20)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(10);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var DESCRIPTORS = __webpack_require__(7);
var LIBRARY = __webpack_require__(30);
var $typed = __webpack_require__(64);
var hide = __webpack_require__(11);
var redefineAll = __webpack_require__(42);
var fails = __webpack_require__(3);
var anInstance = __webpack_require__(40);
var toInteger = __webpack_require__(21);
var toLength = __webpack_require__(6);
var toIndex = __webpack_require__(126);
var gOPN = __webpack_require__(38).f;
var dP = __webpack_require__(8).f;
var arrayFill = __webpack_require__(88);
var setToStringTag = __webpack_require__(44);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (process.env.NODE_ENV === 'production') {
  module.exports = __webpack_require__(354);
} else {
  module.exports = __webpack_require__(355);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(27)))

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(7) && !__webpack_require__(3)(function () {
  return Object.defineProperty(__webpack_require__(69)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(5);


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(14);
var toIObject = __webpack_require__(15);
var arrayIndexOf = __webpack_require__(54)(false);
var IE_PROTO = __webpack_require__(71)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8);
var anObject = __webpack_require__(1);
var getKeys = __webpack_require__(35);

module.exports = __webpack_require__(7) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(15);
var gOPN = __webpack_require__(38).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(35);
var gOPS = __webpack_require__(55);
var pIE = __webpack_require__(50);
var toObject = __webpack_require__(9);
var IObject = __webpack_require__(49);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(3)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 104 */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(10);
var isObject = __webpack_require__(4);
var invoke = __webpack_require__(106);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),
/* 106 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(2).parseInt;
var $trim = __webpack_require__(46).trim;
var ws = __webpack_require__(75);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(2).parseFloat;
var $trim = __webpack_require__(46).trim;

module.exports = 1 / $parseFloat(__webpack_require__(75) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(20);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(4);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 111 */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(78);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(1);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(10);
var toObject = __webpack_require__(9);
var IObject = __webpack_require__(49);
var toLength = __webpack_require__(6);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(36);
var toLength = __webpack_require__(6);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),
/* 116 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__(90);
__webpack_require__(0)({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(7) && /./g.flags != 'g') __webpack_require__(8).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(51)
});


/***/ }),
/* 119 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var newPromiseCapability = __webpack_require__(94);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(122);
var validate = __webpack_require__(43);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(63)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(8).f;
var create = __webpack_require__(37);
var redefineAll = __webpack_require__(42);
var ctx = __webpack_require__(19);
var anInstance = __webpack_require__(40);
var forOf = __webpack_require__(41);
var $iterDefine = __webpack_require__(80);
var step = __webpack_require__(116);
var setSpecies = __webpack_require__(39);
var DESCRIPTORS = __webpack_require__(7);
var fastKey = __webpack_require__(31).fastKey;
var validate = __webpack_require__(43);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(122);
var validate = __webpack_require__(43);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(63)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var each = __webpack_require__(26)(0);
var redefine = __webpack_require__(12);
var meta = __webpack_require__(31);
var assign = __webpack_require__(103);
var weak = __webpack_require__(125);
var isObject = __webpack_require__(4);
var validate = __webpack_require__(43);
var NATIVE_WEAK_MAP = __webpack_require__(43);
var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(63)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(42);
var getWeak = __webpack_require__(31).getWeak;
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var anInstance = __webpack_require__(40);
var forOf = __webpack_require__(41);
var createArrayMethod = __webpack_require__(26);
var $has = __webpack_require__(14);
var validate = __webpack_require__(43);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(21);
var toLength = __webpack_require__(6);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(38);
var gOPS = __webpack_require__(55);
var anObject = __webpack_require__(1);
var Reflect = __webpack_require__(2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = __webpack_require__(56);
var isObject = __webpack_require__(4);
var toLength = __webpack_require__(6);
var ctx = __webpack_require__(19);
var IS_CONCAT_SPREADABLE = __webpack_require__(5)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(6);
var repeat = __webpack_require__(77);
var defined = __webpack_require__(24);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(35);
var toIObject = __webpack_require__(15);
var isEnum = __webpack_require__(50).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(45);
var from = __webpack_require__(132);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(41);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 133 */
/***/ (function(module, exports) {

// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = undefined;
var _jsxFileName = "/Users/atrzeciak/Code/flowitup/src/root.jsx";

var _quip = __webpack_require__(351);

var _quip2 = _interopRequireDefault(_quip);

var _AppContainer = __webpack_require__(352);

var _AppContainer2 = _interopRequireDefault(_AppContainer);

var _redux = __webpack_require__(139);

var _reducers = __webpack_require__(391);

var _reducers2 = _interopRequireDefault(_reducers);

var _reactRedux = __webpack_require__(135);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = exports.store = (0, _redux.createStore)(_reducers2.default);

_quip2.default.apps.initialize({
  initializationCallback: function initializationCallback(rootNode) {
    ReactDOM.render(React.createElement(
      _reactRedux.Provider,
      { store: store, __source: {
          fileName: _jsxFileName,
          lineNumber: 14
        },
        __self: this
      },
      React.createElement(_AppContainer2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        },
        __self: this
      })
    ), rootNode);
  }
});

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.connect = exports.Provider = undefined;

var _Provider = __webpack_require__(353);

var _Provider2 = _interopRequireDefault(_Provider);

var _connect = __webpack_require__(360);

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.Provider = _Provider2["default"];
exports.connect = _connect2["default"];

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var ReactIs = __webpack_require__(96);

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(356)(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(359)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(27)))

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _propTypes = __webpack_require__(136);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports["default"] = _propTypes2["default"].shape({
  subscribe: _propTypes2["default"].func.isRequired,
  dispatch: _propTypes2["default"].func.isRequired,
  getState: _propTypes2["default"].func.isRequired
});

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__combineReducers__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__compose__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_warning__ = __webpack_require__(143);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createStore", function() { return __WEBPACK_IMPORTED_MODULE_0__createStore__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "combineReducers", function() { return __WEBPACK_IMPORTED_MODULE_1__combineReducers__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "bindActionCreators", function() { return __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "applyMiddleware", function() { return __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "compose", function() { return __WEBPACK_IMPORTED_MODULE_4__compose__["a"]; });







/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  Object(__WEBPACK_IMPORTED_MODULE_5__utils_warning__["a" /* default */])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(27)))

/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionTypes; });
/* harmony export (immutable) */ __webpack_exports__["b"] = createStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable__ = __webpack_require__(371);



/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = {
  INIT: '@@redux/INIT'

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
};function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__["a" /* default */])(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[__WEBPACK_IMPORTED_MODULE_1_symbol_observable__["a" /* default */]] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[__WEBPACK_IMPORTED_MODULE_1_symbol_observable__["a" /* default */]] = observable, _ref2;
}

/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getPrototype_js__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__ = __webpack_require__(370);




/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!Object(__WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__["a" /* default */])(value) || Object(__WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__["a" /* default */])(value) != objectTag) {
    return false;
  }
  var proto = Object(__WEBPACK_IMPORTED_MODULE_1__getPrototype_js__["a" /* default */])(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

/* harmony default export */ __webpack_exports__["a"] = (isPlainObject);


/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root_js__ = __webpack_require__(364);


/** Built-in value references. */
var Symbol = __WEBPACK_IMPORTED_MODULE_0__root_js__["a" /* default */].Symbol;

/* harmony default export */ __webpack_exports__["a"] = (Symbol);


/***/ }),
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(379);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 146 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"root":"App__root","modal":"App__modal","modalTitle":"App__modalTitle","modalBodyContainer":"App__modalBodyContainer","modalBodySurface":"App__modalBodySurface","modalFooter":"App__modalFooter","canvas":"App__canvas","node-icon1":"App__node-icon1","node-icon2":"App__node-icon2","slds-canvas-builder_node":"App__slds-canvas-builder_node","slds-canvas-builder_node--selected":"App__slds-canvas-builder_node--selected","slds-canvas-builder_node-background-svg":"App__slds-canvas-builder_node-background-svg","slds-canvas-builder_node-dragging":"App__slds-canvas-builder_node-dragging","slds-canvas-builder_connector":"App__slds-canvas-builder_connector","slds-canvas-builder_surface-brush":"App__slds-canvas-builder_surface-brush","slds-canvas-builder_endpoint":"App__slds-canvas-builder_endpoint","slds-canvas-builder_endpoint--hovered":"App__slds-canvas-builder_endpoint--hovered","slds-canvas-builder_endpoint--empty":"App__slds-canvas-builder_endpoint--empty","slds-canvas-builder_connector--dragging":"App__slds-canvas-builder_connector--dragging"};

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(148);
__webpack_require__(350);
module.exports = __webpack_require__(134);


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(149);

__webpack_require__(346);

__webpack_require__(347);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(53)))

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(150);
__webpack_require__(153);
__webpack_require__(154);
__webpack_require__(155);
__webpack_require__(156);
__webpack_require__(157);
__webpack_require__(158);
__webpack_require__(159);
__webpack_require__(160);
__webpack_require__(161);
__webpack_require__(162);
__webpack_require__(163);
__webpack_require__(164);
__webpack_require__(165);
__webpack_require__(166);
__webpack_require__(167);
__webpack_require__(168);
__webpack_require__(169);
__webpack_require__(170);
__webpack_require__(171);
__webpack_require__(172);
__webpack_require__(173);
__webpack_require__(174);
__webpack_require__(175);
__webpack_require__(176);
__webpack_require__(177);
__webpack_require__(178);
__webpack_require__(179);
__webpack_require__(180);
__webpack_require__(181);
__webpack_require__(182);
__webpack_require__(183);
__webpack_require__(184);
__webpack_require__(185);
__webpack_require__(186);
__webpack_require__(187);
__webpack_require__(188);
__webpack_require__(189);
__webpack_require__(190);
__webpack_require__(191);
__webpack_require__(192);
__webpack_require__(193);
__webpack_require__(194);
__webpack_require__(195);
__webpack_require__(196);
__webpack_require__(197);
__webpack_require__(198);
__webpack_require__(199);
__webpack_require__(200);
__webpack_require__(201);
__webpack_require__(202);
__webpack_require__(203);
__webpack_require__(204);
__webpack_require__(205);
__webpack_require__(206);
__webpack_require__(207);
__webpack_require__(208);
__webpack_require__(209);
__webpack_require__(210);
__webpack_require__(211);
__webpack_require__(212);
__webpack_require__(213);
__webpack_require__(214);
__webpack_require__(215);
__webpack_require__(216);
__webpack_require__(217);
__webpack_require__(218);
__webpack_require__(219);
__webpack_require__(220);
__webpack_require__(221);
__webpack_require__(222);
__webpack_require__(223);
__webpack_require__(224);
__webpack_require__(225);
__webpack_require__(226);
__webpack_require__(227);
__webpack_require__(228);
__webpack_require__(230);
__webpack_require__(231);
__webpack_require__(233);
__webpack_require__(234);
__webpack_require__(235);
__webpack_require__(236);
__webpack_require__(237);
__webpack_require__(238);
__webpack_require__(239);
__webpack_require__(241);
__webpack_require__(242);
__webpack_require__(243);
__webpack_require__(244);
__webpack_require__(245);
__webpack_require__(246);
__webpack_require__(247);
__webpack_require__(248);
__webpack_require__(249);
__webpack_require__(250);
__webpack_require__(251);
__webpack_require__(252);
__webpack_require__(253);
__webpack_require__(89);
__webpack_require__(254);
__webpack_require__(117);
__webpack_require__(255);
__webpack_require__(118);
__webpack_require__(256);
__webpack_require__(257);
__webpack_require__(258);
__webpack_require__(259);
__webpack_require__(260);
__webpack_require__(121);
__webpack_require__(123);
__webpack_require__(124);
__webpack_require__(261);
__webpack_require__(262);
__webpack_require__(263);
__webpack_require__(264);
__webpack_require__(265);
__webpack_require__(266);
__webpack_require__(267);
__webpack_require__(268);
__webpack_require__(269);
__webpack_require__(270);
__webpack_require__(271);
__webpack_require__(272);
__webpack_require__(273);
__webpack_require__(274);
__webpack_require__(275);
__webpack_require__(276);
__webpack_require__(277);
__webpack_require__(278);
__webpack_require__(279);
__webpack_require__(280);
__webpack_require__(281);
__webpack_require__(282);
__webpack_require__(283);
__webpack_require__(284);
__webpack_require__(285);
__webpack_require__(286);
__webpack_require__(287);
__webpack_require__(288);
__webpack_require__(289);
__webpack_require__(290);
__webpack_require__(291);
__webpack_require__(292);
__webpack_require__(293);
__webpack_require__(294);
__webpack_require__(295);
__webpack_require__(296);
__webpack_require__(297);
__webpack_require__(298);
__webpack_require__(299);
__webpack_require__(300);
__webpack_require__(301);
__webpack_require__(302);
__webpack_require__(303);
__webpack_require__(304);
__webpack_require__(305);
__webpack_require__(306);
__webpack_require__(307);
__webpack_require__(308);
__webpack_require__(309);
__webpack_require__(310);
__webpack_require__(311);
__webpack_require__(312);
__webpack_require__(313);
__webpack_require__(314);
__webpack_require__(315);
__webpack_require__(316);
__webpack_require__(317);
__webpack_require__(318);
__webpack_require__(319);
__webpack_require__(320);
__webpack_require__(321);
__webpack_require__(322);
__webpack_require__(323);
__webpack_require__(324);
__webpack_require__(325);
__webpack_require__(326);
__webpack_require__(327);
__webpack_require__(328);
__webpack_require__(329);
__webpack_require__(330);
__webpack_require__(331);
__webpack_require__(332);
__webpack_require__(333);
__webpack_require__(334);
__webpack_require__(335);
__webpack_require__(336);
__webpack_require__(337);
__webpack_require__(338);
__webpack_require__(339);
__webpack_require__(340);
__webpack_require__(341);
__webpack_require__(342);
__webpack_require__(343);
__webpack_require__(344);
__webpack_require__(345);
module.exports = __webpack_require__(18);


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(14);
var DESCRIPTORS = __webpack_require__(7);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(12);
var META = __webpack_require__(31).KEY;
var $fails = __webpack_require__(3);
var shared = __webpack_require__(48);
var setToStringTag = __webpack_require__(44);
var uid = __webpack_require__(34);
var wks = __webpack_require__(5);
var wksExt = __webpack_require__(99);
var wksDefine = __webpack_require__(70);
var enumKeys = __webpack_require__(152);
var isArray = __webpack_require__(56);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var toIObject = __webpack_require__(15);
var toPrimitive = __webpack_require__(23);
var createDesc = __webpack_require__(33);
var _create = __webpack_require__(37);
var gOPNExt = __webpack_require__(102);
var $GOPD = __webpack_require__(16);
var $DP = __webpack_require__(8);
var $keys = __webpack_require__(35);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(38).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(50).f = $propertyIsEnumerable;
  __webpack_require__(55).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(30)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(11)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(48)('native-function-to-string', Function.toString);


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(35);
var gOPS = __webpack_require__(55);
var pIE = __webpack_require__(50);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(37) });


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(7), 'Object', { defineProperty: __webpack_require__(8).f });


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(7), 'Object', { defineProperties: __webpack_require__(101) });


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(15);
var $getOwnPropertyDescriptor = __webpack_require__(16).f;

__webpack_require__(25)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(9);
var $getPrototypeOf = __webpack_require__(17);

__webpack_require__(25)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(9);
var $keys = __webpack_require__(35);

__webpack_require__(25)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(25)('getOwnPropertyNames', function () {
  return __webpack_require__(102).f;
});


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(31).onFreeze;

__webpack_require__(25)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(31).onFreeze;

__webpack_require__(25)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(31).onFreeze;

__webpack_require__(25)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(103) });


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { is: __webpack_require__(104) });


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(74).set });


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(45);
var test = {};
test[__webpack_require__(5)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(12)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(0);

$export($export.P, 'Function', { bind: __webpack_require__(105) });


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(7) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(4);
var getPrototypeOf = __webpack_require__(17);
var HAS_INSTANCE = __webpack_require__(5)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(8).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(107);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(108);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var has = __webpack_require__(14);
var cof = __webpack_require__(20);
var inheritIfRequired = __webpack_require__(76);
var toPrimitive = __webpack_require__(23);
var fails = __webpack_require__(3);
var gOPN = __webpack_require__(38).f;
var gOPD = __webpack_require__(16).f;
var dP = __webpack_require__(8).f;
var $trim = __webpack_require__(46).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(37)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(7) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(12)(global, NUMBER, $Number);
}


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toInteger = __webpack_require__(21);
var aNumberValue = __webpack_require__(109);
var repeat = __webpack_require__(77);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(3)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $fails = __webpack_require__(3);
var aNumberValue = __webpack_require__(109);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(0);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(0);
var _isFinite = __webpack_require__(2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', { isInteger: __webpack_require__(110) });


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(0);
var isInteger = __webpack_require__(110);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(108);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(107);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(0);
var log1p = __webpack_require__(111);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(0);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(0);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(0);
var sign = __webpack_require__(78);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(0);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(0);
var $expm1 = __webpack_require__(79);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { fround: __webpack_require__(112) });


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(0);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(0);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { log1p: __webpack_require__(111) });


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { sign: __webpack_require__(78) });


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(79);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(79);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toAbsoluteIndex = __webpack_require__(36);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(15);
var toLength = __webpack_require__(6);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(46)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(57)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(80)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $at = __webpack_require__(57)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(6);
var context = __webpack_require__(82);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(83)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(0);
var context = __webpack_require__(82);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(83)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(77)
});


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(6);
var context = __webpack_require__(82);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(83)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(13)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(13)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(13)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(13)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(13)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(13)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(13)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(13)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(13)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(13)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(13)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(13)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(13)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(0);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(23);

$export($export.P + $export.F * __webpack_require__(3)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(0);
var toISOString = __webpack_require__(229);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(3);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(12)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(5)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(11)(proto, TO_PRIMITIVE, __webpack_require__(232));


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(23);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(0);

$export($export.S, 'Array', { isArray: __webpack_require__(56) });


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(19);
var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var call = __webpack_require__(113);
var isArrayIter = __webpack_require__(84);
var toLength = __webpack_require__(6);
var createProperty = __webpack_require__(85);
var getIterFn = __webpack_require__(86);

$export($export.S + $export.F * !__webpack_require__(59)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var createProperty = __webpack_require__(85);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(3)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(0);
var toIObject = __webpack_require__(15);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(49) != Object || !__webpack_require__(22)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var html = __webpack_require__(73);
var cof = __webpack_require__(20);
var toAbsoluteIndex = __webpack_require__(36);
var toLength = __webpack_require__(6);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(3)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var aFunction = __webpack_require__(10);
var toObject = __webpack_require__(9);
var fails = __webpack_require__(3);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(22)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $forEach = __webpack_require__(26)(0);
var STRICT = __webpack_require__(22)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var isArray = __webpack_require__(56);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $map = __webpack_require__(26)(1);

$export($export.P + $export.F * !__webpack_require__(22)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $filter = __webpack_require__(26)(2);

$export($export.P + $export.F * !__webpack_require__(22)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $some = __webpack_require__(26)(3);

$export($export.P + $export.F * !__webpack_require__(22)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $every = __webpack_require__(26)(4);

$export($export.P + $export.F * !__webpack_require__(22)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(114);

$export($export.P + $export.F * !__webpack_require__(22)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(114);

$export($export.P + $export.F * !__webpack_require__(22)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $indexOf = __webpack_require__(54)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(22)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(15);
var toInteger = __webpack_require__(21);
var toLength = __webpack_require__(6);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(22)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(115) });

__webpack_require__(32)('copyWithin');


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { fill: __webpack_require__(88) });

__webpack_require__(32)('fill');


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(26)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(32)(KEY);


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(26)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(32)(KEY);


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(39)('Array');


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var inheritIfRequired = __webpack_require__(76);
var dP = __webpack_require__(8).f;
var gOPN = __webpack_require__(38).f;
var isRegExp = __webpack_require__(58);
var $flags = __webpack_require__(51);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(7) && (!CORRECT_NEW || __webpack_require__(3)(function () {
  re2[__webpack_require__(5)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(12)(global, 'RegExp', $RegExp);
}

__webpack_require__(39)('RegExp');


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(118);
var anObject = __webpack_require__(1);
var $flags = __webpack_require__(51);
var DESCRIPTORS = __webpack_require__(7);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(12)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(3)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(1);
var toLength = __webpack_require__(6);
var advanceStringIndex = __webpack_require__(91);
var regExpExec = __webpack_require__(60);

// @@match logic
__webpack_require__(61)('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(1);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(6);
var toInteger = __webpack_require__(21);
var advanceStringIndex = __webpack_require__(91);
var regExpExec = __webpack_require__(60);
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__(61)('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(1);
var sameValue = __webpack_require__(104);
var regExpExec = __webpack_require__(60);

// @@search logic
__webpack_require__(61)('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[SEARCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative($search, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isRegExp = __webpack_require__(58);
var anObject = __webpack_require__(1);
var speciesConstructor = __webpack_require__(52);
var advanceStringIndex = __webpack_require__(91);
var toLength = __webpack_require__(6);
var callRegExpExec = __webpack_require__(60);
var regexpExec = __webpack_require__(90);
var fails = __webpack_require__(3);
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });

// @@split logic
__webpack_require__(61)('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(30);
var global = __webpack_require__(2);
var ctx = __webpack_require__(19);
var classof = __webpack_require__(45);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var aFunction = __webpack_require__(10);
var anInstance = __webpack_require__(40);
var forOf = __webpack_require__(41);
var speciesConstructor = __webpack_require__(52);
var task = __webpack_require__(92).set;
var microtask = __webpack_require__(93)();
var newPromiseCapabilityModule = __webpack_require__(94);
var perform = __webpack_require__(119);
var userAgent = __webpack_require__(62);
var promiseResolve = __webpack_require__(120);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(5)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(42)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(44)($Promise, PROMISE);
__webpack_require__(39)(PROMISE);
Wrapper = __webpack_require__(18)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(59)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(125);
var validate = __webpack_require__(43);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(63)(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $typed = __webpack_require__(64);
var buffer = __webpack_require__(95);
var anObject = __webpack_require__(1);
var toAbsoluteIndex = __webpack_require__(36);
var toLength = __webpack_require__(6);
var isObject = __webpack_require__(4);
var ArrayBuffer = __webpack_require__(2).ArrayBuffer;
var speciesConstructor = __webpack_require__(52);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(3)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var fin = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(fin - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < fin) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(39)(ARRAY_BUFFER);


/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
$export($export.G + $export.W + $export.F * !__webpack_require__(64).ABV, {
  DataView: __webpack_require__(95).DataView
});


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(10);
var anObject = __webpack_require__(1);
var rApply = (__webpack_require__(2).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(3)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(0);
var create = __webpack_require__(37);
var aFunction = __webpack_require__(10);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var bind = __webpack_require__(105);
var rConstruct = (__webpack_require__(2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(8);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(23);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(3)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(0);
var gOPD = __webpack_require__(16).f;
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(81)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(16);
var getPrototypeOf = __webpack_require__(17);
var has = __webpack_require__(14);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(16);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(0);
var getProto = __webpack_require__(17);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(127) });


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(8);
var gOPD = __webpack_require__(16);
var getPrototypeOf = __webpack_require__(17);
var has = __webpack_require__(14);
var $export = __webpack_require__(0);
var createDesc = __webpack_require__(33);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = gOPD.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      dP.f(receiver, propertyKey, existingDescriptor);
    } else dP.f(receiver, propertyKey, createDesc(0, V));
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(0);
var setProto = __webpack_require__(74);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(0);
var $includes = __webpack_require__(54)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(32)('includes');


/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(128);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(6);
var aFunction = __webpack_require__(10);
var arraySpeciesCreate = __webpack_require__(87);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(32)('flatMap');


/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(128);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(6);
var toInteger = __webpack_require__(21);
var arraySpeciesCreate = __webpack_require__(87);

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(32)('flatten');


/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(0);
var $at = __webpack_require__(57)(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(129);
var userAgent = __webpack_require__(62);

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(129);
var userAgent = __webpack_require__(62);

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(46)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');


/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(46)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');


/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export = __webpack_require__(0);
var defined = __webpack_require__(24);
var toLength = __webpack_require__(6);
var isRegExp = __webpack_require__(58);
var getFlags = __webpack_require__(51);
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

__webpack_require__(81)($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});


/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(70)('asyncIterator');


/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(70)('observable');


/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(0);
var ownKeys = __webpack_require__(127);
var toIObject = __webpack_require__(15);
var gOPD = __webpack_require__(16);
var createProperty = __webpack_require__(85);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $values = __webpack_require__(130)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $entries = __webpack_require__(130)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var aFunction = __webpack_require__(10);
var $defineProperty = __webpack_require__(8);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(7) && $export($export.P + __webpack_require__(65), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var aFunction = __webpack_require__(10);
var $defineProperty = __webpack_require__(8);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(7) && $export($export.P + __webpack_require__(65), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(23);
var getPrototypeOf = __webpack_require__(17);
var getOwnPropertyDescriptor = __webpack_require__(16).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(7) && $export($export.P + __webpack_require__(65), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(23);
var getPrototypeOf = __webpack_require__(17);
var getOwnPropertyDescriptor = __webpack_require__(16).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(7) && $export($export.P + __webpack_require__(65), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(131)('Map') });


/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(131)('Set') });


/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(66)('Map');


/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(66)('Set');


/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(66)('WeakMap');


/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(66)('WeakSet');


/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(67)('Map');


/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(67)('Set');


/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(67)('WeakMap');


/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(67)('WeakSet');


/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.G, { global: __webpack_require__(2) });


/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.S, 'System', { global: __webpack_require__(2) });


/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(0);
var cof = __webpack_require__(20);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});


/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});


/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });


/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});


/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var scale = __webpack_require__(133);
var fround = __webpack_require__(112);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});


/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});


/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});


/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});


/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });


/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});


/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { scale: __webpack_require__(133) });


/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});


/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

// http://jfbastien.github.io/papers/Math.signbit.html
var $export = __webpack_require__(0);

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });


/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(0);
var core = __webpack_require__(18);
var global = __webpack_require__(2);
var speciesConstructor = __webpack_require__(52);
var promiseResolve = __webpack_require__(120);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(0);
var newPromiseCapability = __webpack_require__(94);
var perform = __webpack_require__(119);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(29);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(29);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(29);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(17);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(123);
var from = __webpack_require__(132);
var metadata = __webpack_require__(29);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(17);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(29);
var anObject = __webpack_require__(1);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(29);
var anObject = __webpack_require__(1);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(29);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(17);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(29);
var anObject = __webpack_require__(1);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__(29);
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(10);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = __webpack_require__(0);
var microtask = __webpack_require__(93)();
var process = __webpack_require__(2).process;
var isNode = __webpack_require__(20)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});


/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export = __webpack_require__(0);
var global = __webpack_require__(2);
var core = __webpack_require__(18);
var microtask = __webpack_require__(93)();
var OBSERVABLE = __webpack_require__(5)('observable');
var aFunction = __webpack_require__(10);
var anObject = __webpack_require__(1);
var anInstance = __webpack_require__(40);
var redefineAll = __webpack_require__(42);
var hide = __webpack_require__(11);
var forOf = __webpack_require__(41);
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

__webpack_require__(39)('Observable');


/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var userAgent = __webpack_require__(62);
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $task = __webpack_require__(92);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(89);
var getKeys = __webpack_require__(35);
var redefine = __webpack_require__(12);
var global = __webpack_require__(2);
var hide = __webpack_require__(11);
var Iterators = __webpack_require__(47);
var wks = __webpack_require__(5);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 346 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(348);
module.exports = __webpack_require__(18).RegExp.escape;


/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(0);
var $re = __webpack_require__(349)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });


/***/ }),
/* 349 */
/***/ (function(module, exports) {

module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};


/***/ }),
/* 350 */
/***/ (function(module, exports) {

// Copyright 2018 Quip

// Shims for backwards-compatibility without bumping the min API version.
(function(global) {
    if (!("window" in global)) {
        return
    }
    var exports = module.exports = {};

    // For quiptext, introduced in 0.1.044
    var translationShim = function(text, placeholders) {
        if (text[text.length - 1] == "]" && text.lastIndexOf(" [") != -1) {
            // Remove translation comments
            text = text.substr(0, text.lastIndexOf(" ["));
        }
        var replaceAll = function(str, substr, replacement) {
            return str.replace(
                new RegExp(
                    substr.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), "g"),
                replacement);
        }
        var localeReplace = function(text, placeholders) {
            for (var key in placeholders) {
                text = replaceAll(text, "%(" + key + ")s", placeholders[key]);
            }
            return text;
        };
        var reactLocaleReplace = function(text, placeholders) {
            var start;
            var expanded = [text];
            for (var key in placeholders) {
                start = expanded;
                expanded = [];
                for (var i = 0; i < start.length; i++) {
                    if (typeof start[i] == "string") {
                        var keyStr = "%(" + key + ")s";
                        var parts = start[i].split(keyStr);
                        var replaced = [];
                        for (var j = 0; j < parts.length - 1; j++) {
                            replaced.push(parts[j]);
                            replaced.push(placeholders[key]);
                        }
                        replaced.push(parts[parts.length - 1]);
                        replaced = replaced.filter(function (str) {
                            return str != "";
                        });
                        expanded.push.apply(expanded, replaced)
                    } else {
                        expanded.push(start[i]);
                    }
                }
            }
            return expanded;
        }
        if (placeholders) {
            var hasReactElements = false;
            for (var key in placeholders) {
                var val = placeholders[key];
                if (typeof val !== "string" && React.isValidElement(val)) {
                    hasReactElements = true;
                    break;
                }
            }
            return (hasReactElements ?
                reactLocaleReplace(text, placeholders) :
                localeReplace(text, placeholders));
        }
        return text;
    }

    // Shims
    if (!window["quiptext"]) {
        window.quiptext = translationShim;
    }

    // Translated color label, until API implements these by default.
    var COLORS_TO_LABEL = {
        "RED": quiptext("Red"),
        "ORANGE": quiptext("Orange"),
        "YELLOW": quiptext("Yellow"),
        "GREEN": quiptext("Green"),
        "BLUE": quiptext("Blue"),
        "VIOLET": quiptext("Violet"),
    };

    exports.localizedColorLabel = function(colorKey)  {
        // Manually localize the color labels until the Quip Client API
        // translates its own strings as well.
        if (colorKey in COLORS_TO_LABEL) {
            return COLORS_TO_LABEL[colorKey];
        }
        return colorKey.charAt(0).toUpperCase() + colorKey.slice(1).toLowerCase()
    }
})(self);


/***/ }),
/* 351 */
/***/ (function(module, exports) {

module.exports = quip;

/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(135);

var _App = __webpack_require__(388);

var _App2 = _interopRequireDefault(_App);

var _Actions = __webpack_require__(396);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return Object.assign({}, state);
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    addConnector: function addConnector(connector) {
      dispatch({
        type: _Actions.ADD_CONNECTOR,
        connector: connector
      });
    },
    addNode: function addNode(node) {
      dispatch({
        type: _Actions.ADD_NODE,
        node: node
      });
    },
    updateNode: function updateNode(node) {
      dispatch({
        type: _Actions.UPDATE_NODE_VALUES,
        node: node
      });
    }
  };
};

var AppContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_App2.default);

exports.default = AppContainer;

/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

exports.__esModule = true;
exports["default"] = undefined;

var _react = __webpack_require__(68);

var _propTypes = __webpack_require__(136);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _storeShape = __webpack_require__(137);

var _storeShape2 = _interopRequireDefault(_storeShape);

var _warning = __webpack_require__(138);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var didWarnAboutReceivingStore = false;
function warnAboutReceivingStore() {
  if (didWarnAboutReceivingStore) {
    return;
  }
  didWarnAboutReceivingStore = true;

  (0, _warning2["default"])('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/reactjs/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
}

var Provider = function (_Component) {
  _inherits(Provider, _Component);

  Provider.prototype.getChildContext = function getChildContext() {
    return { store: this.store };
  };

  function Provider(props, context) {
    _classCallCheck(this, Provider);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    _this.store = props.store;
    return _this;
  }

  Provider.prototype.render = function render() {
    return _react.Children.only(this.props.children);
  };

  return Provider;
}(_react.Component);

exports["default"] = Provider;


if (process.env.NODE_ENV !== 'production') {
  Provider.prototype.componentWillReceiveProps = function (nextProps) {
    var store = this.store;
    var nextStore = nextProps.store;


    if (store !== nextStore) {
      warnAboutReceivingStore();
    }
  };
}

Provider.propTypes = {
  store: _storeShape2["default"].isRequired,
  children: _propTypes2["default"].element.isRequired
};
Provider.childContextTypes = {
  store: _storeShape2["default"].isRequired
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(27)))

/***/ }),
/* 354 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.8.6
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

Object.defineProperty(exports,"__esModule",{value:!0});
var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?Symbol.for("react.memo"):
60115,r=b?Symbol.for("react.lazy"):60116;function t(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case h:return a;default:return u}}case r:case q:case d:return u}}}function v(a){return t(a)===m}exports.typeOf=t;exports.AsyncMode=l;exports.ConcurrentMode=m;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=n;
exports.Fragment=e;exports.Lazy=r;exports.Memo=q;exports.Portal=d;exports.Profiler=g;exports.StrictMode=f;exports.Suspense=p;exports.isValidElementType=function(a){return"string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||"object"===typeof a&&null!==a&&(a.$$typeof===r||a.$$typeof===q||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n)};exports.isAsyncMode=function(a){return v(a)||t(a)===l};exports.isConcurrentMode=v;exports.isContextConsumer=function(a){return t(a)===k};
exports.isContextProvider=function(a){return t(a)===h};exports.isElement=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return t(a)===n};exports.isFragment=function(a){return t(a)===e};exports.isLazy=function(a){return t(a)===r};exports.isMemo=function(a){return t(a)===q};exports.isPortal=function(a){return t(a)===d};exports.isProfiler=function(a){return t(a)===g};exports.isStrictMode=function(a){return t(a)===f};
exports.isSuspense=function(a){return t(a)===p};


/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/** @license React v16.8.6
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (process.env.NODE_ENV !== "production") {
  (function() {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;

var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' ||
  // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
}

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var lowPriorityWarning$1 = lowPriorityWarning;

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;
    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;
          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;
              default:
                return $$typeof;
            }
        }
      case REACT_LAZY_TYPE:
      case REACT_MEMO_TYPE:
      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
}

// AsyncMode is deprecated along with isAsyncMode
var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;

var hasWarnedAboutDeprecatedIsAsyncMode = false;

// AsyncMode should be deprecated
function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true;
      lowPriorityWarning$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }
  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.typeOf = typeOf;
exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isValidElementType = isValidElementType;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
  })();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(27)))

/***/ }),
/* 356 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(96);
var assign = __webpack_require__(357);

var ReactPropTypesSecret = __webpack_require__(97);
var checkPropTypes = __webpack_require__(358);

var has = Function.call.bind(Object.prototype.hasOwnProperty);
var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (process.env.NODE_ENV !== 'production') {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(27)))

/***/ }),
/* 357 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret = __webpack_require__(97);
  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (process.env.NODE_ENV !== 'production') {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(27)))

/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(97);

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 360 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports["default"] = connect;

var _react = __webpack_require__(68);

var _storeShape = __webpack_require__(137);

var _storeShape2 = _interopRequireDefault(_storeShape);

var _shallowEqual = __webpack_require__(361);

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _wrapActionCreators = __webpack_require__(362);

var _wrapActionCreators2 = _interopRequireDefault(_wrapActionCreators);

var _warning = __webpack_require__(138);

var _warning2 = _interopRequireDefault(_warning);

var _isPlainObject = __webpack_require__(377);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _hoistNonReactStatics = __webpack_require__(386);

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _invariant = __webpack_require__(387);

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultMapStateToProps = function defaultMapStateToProps(state) {
  return {};
}; // eslint-disable-line no-unused-vars
var defaultMapDispatchToProps = function defaultMapDispatchToProps(dispatch) {
  return { dispatch: dispatch };
};
var defaultMergeProps = function defaultMergeProps(stateProps, dispatchProps, parentProps) {
  return _extends({}, parentProps, stateProps, dispatchProps);
};

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

var errorObject = { value: null };
function tryCatch(fn, ctx) {
  try {
    return fn.apply(ctx);
  } catch (e) {
    errorObject.value = e;
    return errorObject;
  }
}

// Helps track hot reloading.
var nextVersion = 0;

function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var shouldSubscribe = Boolean(mapStateToProps);
  var mapState = mapStateToProps || defaultMapStateToProps;

  var mapDispatch = void 0;
  if (typeof mapDispatchToProps === 'function') {
    mapDispatch = mapDispatchToProps;
  } else if (!mapDispatchToProps) {
    mapDispatch = defaultMapDispatchToProps;
  } else {
    mapDispatch = (0, _wrapActionCreators2["default"])(mapDispatchToProps);
  }

  var finalMergeProps = mergeProps || defaultMergeProps;
  var _options$pure = options.pure,
      pure = _options$pure === undefined ? true : _options$pure,
      _options$withRef = options.withRef,
      withRef = _options$withRef === undefined ? false : _options$withRef;

  var checkMergedEquals = pure && finalMergeProps !== defaultMergeProps;

  // Helps track hot reloading.
  var version = nextVersion++;

  return function wrapWithConnect(WrappedComponent) {
    var connectDisplayName = 'Connect(' + getDisplayName(WrappedComponent) + ')';

    function checkStateShape(props, methodName) {
      if (!(0, _isPlainObject2["default"])(props)) {
        (0, _warning2["default"])(methodName + '() in ' + connectDisplayName + ' must return a plain object. ' + ('Instead received ' + props + '.'));
      }
    }

    function computeMergedProps(stateProps, dispatchProps, parentProps) {
      var mergedProps = finalMergeProps(stateProps, dispatchProps, parentProps);
      if (process.env.NODE_ENV !== 'production') {
        checkStateShape(mergedProps, 'mergeProps');
      }
      return mergedProps;
    }

    var Connect = function (_Component) {
      _inherits(Connect, _Component);

      Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
        return !pure || this.haveOwnPropsChanged || this.hasStoreStateChanged;
      };

      function Connect(props, context) {
        _classCallCheck(this, Connect);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        _this.version = version;
        _this.store = props.store || context.store;

        (0, _invariant2["default"])(_this.store, 'Could not find "store" in either the context or ' + ('props of "' + connectDisplayName + '". ') + 'Either wrap the root component in a <Provider>, ' + ('or explicitly pass "store" as a prop to "' + connectDisplayName + '".'));

        var storeState = _this.store.getState();
        _this.state = { storeState: storeState };
        _this.clearCache();
        return _this;
      }

      Connect.prototype.computeStateProps = function computeStateProps(store, props) {
        if (!this.finalMapStateToProps) {
          return this.configureFinalMapState(store, props);
        }

        var state = store.getState();
        var stateProps = this.doStatePropsDependOnOwnProps ? this.finalMapStateToProps(state, props) : this.finalMapStateToProps(state);

        if (process.env.NODE_ENV !== 'production') {
          checkStateShape(stateProps, 'mapStateToProps');
        }
        return stateProps;
      };

      Connect.prototype.configureFinalMapState = function configureFinalMapState(store, props) {
        var mappedState = mapState(store.getState(), props);
        var isFactory = typeof mappedState === 'function';

        this.finalMapStateToProps = isFactory ? mappedState : mapState;
        this.doStatePropsDependOnOwnProps = this.finalMapStateToProps.length !== 1;

        if (isFactory) {
          return this.computeStateProps(store, props);
        }

        if (process.env.NODE_ENV !== 'production') {
          checkStateShape(mappedState, 'mapStateToProps');
        }
        return mappedState;
      };

      Connect.prototype.computeDispatchProps = function computeDispatchProps(store, props) {
        if (!this.finalMapDispatchToProps) {
          return this.configureFinalMapDispatch(store, props);
        }

        var dispatch = store.dispatch;

        var dispatchProps = this.doDispatchPropsDependOnOwnProps ? this.finalMapDispatchToProps(dispatch, props) : this.finalMapDispatchToProps(dispatch);

        if (process.env.NODE_ENV !== 'production') {
          checkStateShape(dispatchProps, 'mapDispatchToProps');
        }
        return dispatchProps;
      };

      Connect.prototype.configureFinalMapDispatch = function configureFinalMapDispatch(store, props) {
        var mappedDispatch = mapDispatch(store.dispatch, props);
        var isFactory = typeof mappedDispatch === 'function';

        this.finalMapDispatchToProps = isFactory ? mappedDispatch : mapDispatch;
        this.doDispatchPropsDependOnOwnProps = this.finalMapDispatchToProps.length !== 1;

        if (isFactory) {
          return this.computeDispatchProps(store, props);
        }

        if (process.env.NODE_ENV !== 'production') {
          checkStateShape(mappedDispatch, 'mapDispatchToProps');
        }
        return mappedDispatch;
      };

      Connect.prototype.updateStatePropsIfNeeded = function updateStatePropsIfNeeded() {
        var nextStateProps = this.computeStateProps(this.store, this.props);
        if (this.stateProps && (0, _shallowEqual2["default"])(nextStateProps, this.stateProps)) {
          return false;
        }

        this.stateProps = nextStateProps;
        return true;
      };

      Connect.prototype.updateDispatchPropsIfNeeded = function updateDispatchPropsIfNeeded() {
        var nextDispatchProps = this.computeDispatchProps(this.store, this.props);
        if (this.dispatchProps && (0, _shallowEqual2["default"])(nextDispatchProps, this.dispatchProps)) {
          return false;
        }

        this.dispatchProps = nextDispatchProps;
        return true;
      };

      Connect.prototype.updateMergedPropsIfNeeded = function updateMergedPropsIfNeeded() {
        var nextMergedProps = computeMergedProps(this.stateProps, this.dispatchProps, this.props);
        if (this.mergedProps && checkMergedEquals && (0, _shallowEqual2["default"])(nextMergedProps, this.mergedProps)) {
          return false;
        }

        this.mergedProps = nextMergedProps;
        return true;
      };

      Connect.prototype.isSubscribed = function isSubscribed() {
        return typeof this.unsubscribe === 'function';
      };

      Connect.prototype.trySubscribe = function trySubscribe() {
        if (shouldSubscribe && !this.unsubscribe) {
          this.unsubscribe = this.store.subscribe(this.handleChange.bind(this));
          this.handleChange();
        }
      };

      Connect.prototype.tryUnsubscribe = function tryUnsubscribe() {
        if (this.unsubscribe) {
          this.unsubscribe();
          this.unsubscribe = null;
        }
      };

      Connect.prototype.componentDidMount = function componentDidMount() {
        this.trySubscribe();
      };

      Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (!pure || !(0, _shallowEqual2["default"])(nextProps, this.props)) {
          this.haveOwnPropsChanged = true;
        }
      };

      Connect.prototype.componentWillUnmount = function componentWillUnmount() {
        this.tryUnsubscribe();
        this.clearCache();
      };

      Connect.prototype.clearCache = function clearCache() {
        this.dispatchProps = null;
        this.stateProps = null;
        this.mergedProps = null;
        this.haveOwnPropsChanged = true;
        this.hasStoreStateChanged = true;
        this.haveStatePropsBeenPrecalculated = false;
        this.statePropsPrecalculationError = null;
        this.renderedElement = null;
        this.finalMapDispatchToProps = null;
        this.finalMapStateToProps = null;
      };

      Connect.prototype.handleChange = function handleChange() {
        if (!this.unsubscribe) {
          return;
        }

        var storeState = this.store.getState();
        var prevStoreState = this.state.storeState;
        if (pure && prevStoreState === storeState) {
          return;
        }

        if (pure && !this.doStatePropsDependOnOwnProps) {
          var haveStatePropsChanged = tryCatch(this.updateStatePropsIfNeeded, this);
          if (!haveStatePropsChanged) {
            return;
          }
          if (haveStatePropsChanged === errorObject) {
            this.statePropsPrecalculationError = errorObject.value;
          }
          this.haveStatePropsBeenPrecalculated = true;
        }

        this.hasStoreStateChanged = true;
        this.setState({ storeState: storeState });
      };

      Connect.prototype.getWrappedInstance = function getWrappedInstance() {
        (0, _invariant2["default"])(withRef, 'To access the wrapped instance, you need to specify ' + '{ withRef: true } as the fourth argument of the connect() call.');

        return this.refs.wrappedInstance;
      };

      Connect.prototype.render = function render() {
        var haveOwnPropsChanged = this.haveOwnPropsChanged,
            hasStoreStateChanged = this.hasStoreStateChanged,
            haveStatePropsBeenPrecalculated = this.haveStatePropsBeenPrecalculated,
            statePropsPrecalculationError = this.statePropsPrecalculationError,
            renderedElement = this.renderedElement;


        this.haveOwnPropsChanged = false;
        this.hasStoreStateChanged = false;
        this.haveStatePropsBeenPrecalculated = false;
        this.statePropsPrecalculationError = null;

        if (statePropsPrecalculationError) {
          throw statePropsPrecalculationError;
        }

        var shouldUpdateStateProps = true;
        var shouldUpdateDispatchProps = true;
        if (pure && renderedElement) {
          shouldUpdateStateProps = hasStoreStateChanged || haveOwnPropsChanged && this.doStatePropsDependOnOwnProps;
          shouldUpdateDispatchProps = haveOwnPropsChanged && this.doDispatchPropsDependOnOwnProps;
        }

        var haveStatePropsChanged = false;
        var haveDispatchPropsChanged = false;
        if (haveStatePropsBeenPrecalculated) {
          haveStatePropsChanged = true;
        } else if (shouldUpdateStateProps) {
          haveStatePropsChanged = this.updateStatePropsIfNeeded();
        }
        if (shouldUpdateDispatchProps) {
          haveDispatchPropsChanged = this.updateDispatchPropsIfNeeded();
        }

        var haveMergedPropsChanged = true;
        if (haveStatePropsChanged || haveDispatchPropsChanged || haveOwnPropsChanged) {
          haveMergedPropsChanged = this.updateMergedPropsIfNeeded();
        } else {
          haveMergedPropsChanged = false;
        }

        if (!haveMergedPropsChanged && renderedElement) {
          return renderedElement;
        }

        if (withRef) {
          this.renderedElement = (0, _react.createElement)(WrappedComponent, _extends({}, this.mergedProps, {
            ref: 'wrappedInstance'
          }));
        } else {
          this.renderedElement = (0, _react.createElement)(WrappedComponent, this.mergedProps);
        }

        return this.renderedElement;
      };

      return Connect;
    }(_react.Component);

    Connect.displayName = connectDisplayName;
    Connect.WrappedComponent = WrappedComponent;
    Connect.contextTypes = {
      store: _storeShape2["default"]
    };
    Connect.propTypes = {
      store: _storeShape2["default"]
    };

    if (process.env.NODE_ENV !== 'production') {
      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
        if (this.version === version) {
          return;
        }

        // We are hot reloading!
        this.version = version;
        this.trySubscribe();
        this.clearCache();
      };
    }

    return (0, _hoistNonReactStatics2["default"])(Connect, WrappedComponent);
  };
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(27)))

/***/ }),
/* 361 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = shallowEqual;
function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var hasOwn = Object.prototype.hasOwnProperty;
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

/***/ }),
/* 362 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = wrapActionCreators;

var _redux = __webpack_require__(139);

function wrapActionCreators(actionCreators) {
  return function (dispatch) {
    return (0, _redux.bindActionCreators)(actionCreators, dispatch);
  };
}

/***/ }),
/* 363 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getRawTag_js__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objectToString_js__ = __webpack_require__(367);




/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? Object(__WEBPACK_IMPORTED_MODULE_1__getRawTag_js__["a" /* default */])(value)
    : Object(__WEBPACK_IMPORTED_MODULE_2__objectToString_js__["a" /* default */])(value);
}

/* harmony default export */ __webpack_exports__["a"] = (baseGetTag);


/***/ }),
/* 364 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__ = __webpack_require__(365);


/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__["a" /* default */] || freeSelf || Function('return this')();

/* harmony default export */ __webpack_exports__["a"] = (root);


/***/ }),
/* 365 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/* harmony default export */ __webpack_exports__["a"] = (freeGlobal);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(53)))

/***/ }),
/* 366 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(142);


/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/* harmony default export */ __webpack_exports__["a"] = (getRawTag);


/***/ }),
/* 367 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/* harmony default export */ __webpack_exports__["a"] = (objectToString);


/***/ }),
/* 368 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__overArg_js__ = __webpack_require__(369);


/** Built-in value references. */
var getPrototype = Object(__WEBPACK_IMPORTED_MODULE_0__overArg_js__["a" /* default */])(Object.getPrototypeOf, Object);

/* harmony default export */ __webpack_exports__["a"] = (getPrototype);


/***/ }),
/* 369 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/* harmony default export */ __webpack_exports__["a"] = (overArg);


/***/ }),
/* 370 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/* harmony default export */ __webpack_exports__["a"] = (isObjectLike);


/***/ }),
/* 371 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ponyfill_js__ = __webpack_require__(373);
/* global window */


var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = Object(__WEBPACK_IMPORTED_MODULE_0__ponyfill_js__["a" /* default */])(root);
/* harmony default export */ __webpack_exports__["a"] = (result);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(53), __webpack_require__(372)(module)))

/***/ }),
/* 372 */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if(!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true,
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 373 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};


/***/ }),
/* 374 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (immutable) */ __webpack_exports__["a"] = combineReducers;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_warning__ = __webpack_require__(143);




function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!Object(__WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__["a" /* default */])(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  var unexpectedKeyCache = void 0;
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError = void 0;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(27)))

/***/ }),
/* 375 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = bindActionCreators;
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

/***/ }),
/* 376 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = applyMiddleware;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__compose__ = __webpack_require__(144);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = __WEBPACK_IMPORTED_MODULE_0__compose__["a" /* default */].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/***/ }),
/* 377 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(378),
    getPrototype = __webpack_require__(383),
    isObjectLike = __webpack_require__(385);

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;


/***/ }),
/* 378 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(145),
    getRawTag = __webpack_require__(381),
    objectToString = __webpack_require__(382);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 379 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(380);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 380 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(53)))

/***/ }),
/* 381 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(145);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 382 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 383 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(384);

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),
/* 384 */
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),
/* 385 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 386 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var ReactIs = __webpack_require__(96);
var REACT_STATICS = {
    childContextTypes: true,
    contextType: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromError: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
};

var FORWARD_REF_STATICS = {
    '$$typeof': true,
    render: true,
    defaultProps: true,
    displayName: true,
    propTypes: true
};

var MEMO_STATICS = {
    '$$typeof': true,
    compare: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
    type: true
};

var TYPE_STATICS = {};
TYPE_STATICS[ReactIs.ForwardRef] = FORWARD_REF_STATICS;

function getStatics(component) {
    if (ReactIs.isMemo(component)) {
        return MEMO_STATICS;
    }
    return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;

function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') {
        // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        var targetStatics = getStatics(targetComponent);
        var sourceStatics = getStatics(sourceComponent);

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try {
                    // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ }),
/* 387 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(27)))

/***/ }),
/* 388 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = "/Users/atrzeciak/Code/flowitup/src/Components/App/App.jsx";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(68);

var _react2 = _interopRequireDefault(_react);

var _App = __webpack_require__(146);

var _App2 = _interopRequireDefault(_App);

var _Modal = __webpack_require__(389);

var _Modal2 = _interopRequireDefault(_Modal);

var _CanvasBuilder = __webpack_require__(390);

var _CanvasBuilder2 = _interopRequireDefault(_CanvasBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NODE_ID = 0;

var createNode = function createNode(nodeId) {
  return {
    anchors: [{ id: "top", location: "Top" }, { id: "left", location: "Left" }, { id: "right", location: "Right" }, { id: "bottom", location: "Bottom" }],
    height: 64,
    id: nodeId,
    label: "",
    left: 0,
    nodeShape: "SQUARE",
    nodeColor: "orange",
    top: 0,
    width: 64
  };
};

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.handleModalClose = function () {
      return _this.setState({ nodeForModal: null });
    };

    _this.handleModalSave = function (data) {
      _this.props.updateNode(data);
      _this.setState({ nodeForModal: null });
    };

    _this.canvas = function (element) {
      _this.canvas = element;
    };

    _this.state = {
      nodeForModal: null
    };
    return _this;
  }

  _createClass(App, [{
    key: "_addHandlersToConfig",
    value: function _addHandlersToConfig(config) {
      var _this2 = this;

      config.nodeEvents.onClick = function (nodeForModal) {
        return _this2.setState({ nodeForModal: nodeForModal });
      };
      config.connectorEvents.onConnectorAdd = function (sourceNodeId, targetNodeId, sourceAnchorId, targetAnchorId) {
        _this2.props.addConnector({
          sourceNodeId: sourceNodeId,
          targetNodeId: targetNodeId,
          sourceAnchorId: sourceAnchorId,
          targetAnchorId: targetAnchorId
        });
      };
      return config;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _props = this.props,
          addNode = _props.addNode,
          config = _props.config,
          connectors = _props.connectors,
          nodes = _props.nodes;

      this._canvasBuilder = _CanvasBuilder2.default.default.createInstance(this.canvas);
      this._canvasBuilder.update(nodes, connectors, this._addHandlersToConfig(config));

      quip.apps.updateToolbar({
        menuCommands: [{
          handler: function handler() {
            return addNode(createNode("Node-ID-\"" + ++NODE_ID));
          },
          id: "addAssignment",
          label: "Add Assignment"
        }],
        toolbarCommandIds: ["addAssignment"]
      });
    }
  }, {
    key: "render",
    value: function render() {
      var nodeForModal = this.state.nodeForModal;
      var canvas = _App2.default.canvas,
          root = _App2.default.root;
      var _props2 = this.props,
          config = _props2.config,
          connectors = _props2.connectors,
          nodes = _props2.nodes,
          variables = _props2.variables;

      if (this._canvasBuilder) {
        this._canvasBuilder.update(nodes, connectors, this._addHandlersToConfig(config));
      }

      return _react2.default.createElement(
        "div",
        { className: root, __source: {
            fileName: _jsxFileName,
            lineNumber: 96
          },
          __self: this
        },
        nodeForModal ? _react2.default.createElement(_Modal2.default, {
          data: {
            id: nodeForModal.id,
            label: nodeForModal.label,
            variableName: variables[nodeForModal.id] && variables[nodeForModal.id].name,
            variableValue: variables[nodeForModal.id] && variables[nodeForModal.id].value
          },
          handleModalClose: this.handleModalClose,
          handleModalSave: this.handleModalSave,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 98
          },
          __self: this
        }) : null,
        _react2.default.createElement("div", { ref: this.canvas, className: canvas, __source: {
            fileName: _jsxFileName,
            lineNumber: 111
          },
          __self: this
        })
      );
    }
  }]);

  return App;
}(_react2.default.Component);

exports.default = App;

/***/ }),
/* 389 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = "/Users/atrzeciak/Code/flowitup/src/Components/Modal/Modal.jsx";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(68);

var _react2 = _interopRequireDefault(_react);

var _App = __webpack_require__(146);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlowModal = function (_React$Component) {
  _inherits(FlowModal, _React$Component);

  function FlowModal(_ref) {
    var _ref$data = _ref.data,
        id = _ref$data.id,
        label = _ref$data.label,
        variableName = _ref$data.variableName,
        variableValue = _ref$data.variableValue;

    _classCallCheck(this, FlowModal);

    var _this = _possibleConstructorReturn(this, (FlowModal.__proto__ || Object.getPrototypeOf(FlowModal)).call(this, { data: { id: id, label: label, variableName: variableName, variableValue: variableValue } }));

    _this.state = {
      id: id,
      label: label,
      variableName: variableName,
      variableValue: variableValue
    };
    return _this;
  }

  _createClass(FlowModal, [{
    key: "updateValue",
    value: function updateValue(key, value) {
      this.setState(_defineProperty({}, key, value));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          handleModalClose = _props.handleModalClose,
          handleModalSave = _props.handleModalSave;
      var _state = this.state,
          id = _state.id,
          label = _state.label,
          variableName = _state.variableName,
          variableValue = _state.variableValue;
      var modal = _App2.default.modal,
          modalBodyContainer = _App2.default.modalBodyContainer,
          modalBodySurface = _App2.default.modalBodySurface,
          modalFooter = _App2.default.modalFooter,
          modalTitle = _App2.default.modalTitle;

      return _react2.default.createElement(
        "div",
        { className: modal, __source: {
            fileName: _jsxFileName,
            lineNumber: 32
          },
          __self: this
        },
        _react2.default.createElement(
          "div",
          { className: modalTitle, __source: {
              fileName: _jsxFileName,
              lineNumber: 33
            },
            __self: this
          },
          "Edit Node"
        ),
        _react2.default.createElement(
          "div",
          { className: modalBodyContainer, __source: {
              fileName: _jsxFileName,
              lineNumber: 34
            },
            __self: this
          },
          _react2.default.createElement(
            "div",
            { className: modalBodySurface, __source: {
                fileName: _jsxFileName,
                lineNumber: 35
              },
              __self: this
            },
            _react2.default.createElement(
              "div",
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 36
                },
                __self: this
              },
              "Node Name"
            ),
            _react2.default.createElement(
              "form",
              {
                onChange: function onChange(_ref2) {
                  var value = _ref2.target.value;
                  return _this2.updateValue("label", value);
                },
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 37
                },
                __self: this
              },
              _react2.default.createElement("input", { type: "text", value: label, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 42
                },
                __self: this
              })
            ),
            _react2.default.createElement("br", {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 44
              },
              __self: this
            }),
            _react2.default.createElement(
              "form",
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 45
                },
                __self: this
              },
              _react2.default.createElement(
                "label",
                {
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 46
                  },
                  __self: this
                },
                "Variable Name:",
                _react2.default.createElement("input", {
                  onChange: function onChange(_ref3) {
                    var value = _ref3.target.value;
                    return _this2.updateValue("variableName", value);
                  },
                  type: "text",
                  value: variableName,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 48
                  },
                  __self: this
                })
              ),
              _react2.default.createElement(
                "label",
                {
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 56
                  },
                  __self: this
                },
                "Variable Value:",
                _react2.default.createElement("input", {
                  onChange: function onChange(_ref4) {
                    var value = _ref4.target.value;
                    return _this2.updateValue("variableValue", value);
                  },
                  type: "text",
                  value: variableValue,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 58
                  },
                  __self: this
                })
              )
            )
          )
        ),
        _react2.default.createElement(
          "div",
          { className: modalFooter, __source: {
              fileName: _jsxFileName,
              lineNumber: 69
            },
            __self: this
          },
          _react2.default.createElement(
            "button",
            { onClick: handleModalClose, __source: {
                fileName: _jsxFileName,
                lineNumber: 70
              },
              __self: this
            },
            "Close"
          ),
          _react2.default.createElement(
            "button",
            {
              onClick: function onClick() {
                return handleModalSave({
                  id: id,
                  label: label,
                  variableName: variableName,
                  variableValue: variableValue
                });
              },
              __source: {
                fileName: _jsxFileName,
                lineNumber: 71
              },
              __self: this
            },
            "Save"
          )
        )
      );
    }
  }]);

  return FlowModal;
}(_react2.default.Component);

exports.default = FlowModal;

/***/ }),
/* 390 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
  var c = {};var b = { defaultNodeClassName: "", defaultClassPrefix: "canvas-builder", defaultDragMode: "INSTANCE", defaultSnapToGrid: [1, 1], defaultConnectorWidth: 2, canvasPadding: 64, minNodeSize: 64, nodeClassSuffix: "_node", nodeSelectedSuffix: "_node--selected", nodeBackgroundSvgSuffix: "_node-background-svg", nodeLabelSuffix: "_node-label", nodeIconSvgSuffix: "_node-icon-svg", nodeDragSuffix: "_node-dragging", connectorClassSuffix: "_connector", endpointClassSuffix: "_endpoint", emptyEndpointClassSuffix: "_endpoint--empty", endpointHoveredSuffix: "_endpoint--hovered", connectorDraggingSuffix: "_connector--dragging", surfaceBrushSuffix: "_surface-brush" };var r = new Set(["classPrefix", "connectorStrokeWidth", "connectorHoverStrokeWidth"]),
      l = { clone: function clone(e) {
      return { classPrefix: e.classPrefix, dragRules: e.dragRules, dragMode: e.dragMode, snapToGrid: [].concat(e.snapToGrid), nodeEvents: e.nodeEvents, connectorEvents: e.connectorEvents, surfaceDragMode: e.surfaceDragMode, surfaceBrushKeyToggle: e.surfaceBrushKeyToggle, surfacePanKeyToggle: e.surfacePanKeyToggle, connectorHoverStrokeWidth: e.connectorHoverStrokeWidth, connectorStrokeWidth: e.connectorStrokeWidth };
    }, isReflowProperty: function isReflowProperty(e) {
      return r.has(e);
    }, getDefaultConfig: function getDefaultConfig() {
      return { classPrefix: b.defaultClassPrefix, dragRules: [], dragMode: b.defaultDragMode, snapToGrid: b.defaultSnapToGrid, nodeEvents: null, connectorEvents: null, surfaceDragMode: null, surfaceBrushKeyToggle: null, surfacePanKeyToggle: null, connectorStrokeWidth: b.defaultConnectorWidth, connectorHoverStrokeWidth: b.defaultConnectorWidth };
    } };var g = { getConnectorId: function getConnectorId(e) {
      return encodeURI(e.sourceNodeId) + "||" + encodeURI(e.targetNodeId);
    }, clone: function clone(e) {
      return { sourceNodeId: e.sourceNodeId, sourceAnchorId: e.sourceAnchorId, targetNodeId: e.targetNodeId, targetAnchorId: e.targetAnchorId, className: e.className, label: e.label, strokeWidth: e.strokeWidth, hoverStrokeWidth: e.hoverStrokeWidth, type: e.type };
    }, equals: function equals(e, t) {
      return e.sourceNodeId === t.sourceNodeId && e.targetNodeId === t.targetNodeId && e.sourceAnchorId === t.sourceAnchorId && e.targetAnchorId === t.targetAnchorId && e.className === t.className && e.label === t.label && e.strokeWidth === t.strokeWidth && e.hoverStrokeWidth === t.hoverStrokeWidth && e.type === t.type;
    } };var h = { getNodeDeltas: function getNodeDeltas(e, t) {
      var n = new Set(),
          d = { newEntries: [], updatedEntries: [], deletedEntries: [] };return t.forEach(function (t) {
        var a = e.getNodeInstance(t.id);a && !a.areNodesEqual(t) && d.updatedEntries.push({ oldValue: a.getNode(), newValue: t }), a || d.newEntries.push(t), n.add(t.id);
      }), e.forEachNodeInstance(function (e, t) {
        n.has(t) || d.deletedEntries.push(e.getNode());
      }), d;
    }, getConnectorDeltas: function getConnectorDeltas(e, t, n) {
      var d = new Set(),
          a = { newEntries: [], updatedEntries: [], deletedEntries: [] },
          r = n.updatedEntries.reduce(function (e, t) {
        var n = t.oldValue;return e.add(n.id);
      }, new Set()),
          o = n.newEntries.reduce(function (e, t) {
        return e.add(t.id);
      }, new Set()),
          u = n.deletedEntries.reduce(function (e, t) {
        return e.add(t.id);
      }, new Set());return t.forEach(function (t) {
        var s = g.getConnectorId(t),
            i = e.getConnectorInstance(s);if (r.has(t.sourceNodeId) || r.has(t.targetNodeId) || i && !i.areConnectorsEqual(t)) {
          a.updatedEntries.push({ oldValue: i && i.getConnector(), newValue: t });var c = t.sourceNodeId;r.has(c) || o.has(c) || u.has(c) || n.updatedEntries.push({ oldValue: e.getNodeInstance(c).getNode(), newValue: e.getNodeInstance(c).getNode() });var l = t.targetNodeId;r.has(l) || o.has(l) || u.has(l) || n.updatedEntries.push({ oldValue: e.getNodeInstance(l).getNode(), newValue: e.getNodeInstance(l).getNode() });
        }i || a.newEntries.push(t), d.add(s);
      }), e.forEachConnectorInstance(function (e, t) {
        d.has(t) || a.deletedEntries.push(e.getConnector());
      }), a;
    }, getConfigDeltas: function getConfigDeltas(e, t) {
      var n = new Map(),
          d = new Set();return Object.keys(t).forEach(function (a) {
        void 0 !== e[a] && e[a] !== t[a] && n.set(a, { oldValue: e[a], newValue: t[a] }), e[a] || n.set(a, { oldValue: null, newValue: t[a] }), d.add(a);
      }), n;
    } };function p(t) {
    return (p = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
      return typeof t === "undefined" ? "undefined" : _typeof(t);
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t === "undefined" ? "undefined" : _typeof(t);
    })(t);
  }var n = new Set(["LEFT", "RIGHT", "TOP", "BOTTOM"]),
      f = { _compareLocations: function _compareLocations(t, o) {
      if (!t && o || t && !o) return !1;if (!t && !o) return !0;if (p(t) !== p(o)) return !1;if ("string" == typeof t && "string" == typeof o) return t === o;var e = t,
          n = o;return e.isContinuous && n.isContinuous || e.leftPercent === n.leftPercent && e.topPercent === n.topPercent;
    }, _compareStyles: function _compareStyles(t, o) {
      return t === o;
    }, getEndpointUuid: function getEndpointUuid(t, o) {
      return t.id + "||" + o;
    }, getAnchorIdFromUuid: function getAnchorIdFromUuid(t, o) {
      return o.slice(t.id.length + 2);
    }, getPlumbAnchor: function getPlumbAnchor(t) {
      if ("string" == typeof t.location) {
        var o = t.location;return n.has(t.location.toUpperCase()) ? o.charAt(0).toUpperCase() + o.slice(1).toLowerCase() : "Left";
      }var e = t.location;if (!e.isContinuous) return [e.leftPercent, e.topPercent];
    }, clone: function clone(t) {
      return { id: t.id, location: t.location, style: t.style };
    }, equals: function equals(t, o) {
      return !(!t && o || t && !o) && (!t && !o || this._compareLocations(t.location, o.location) && this._compareStyles(t.style, o.style));
    } };var j = { compareAnchors: function compareAnchors(e, t) {
      return !(!e && t || e && !t) && (!e && !t || e.length === t.length && e.every(function (e, o) {
        return f.equals(e, t[o]);
      }));
    }, cloneNode: function cloneNode(e) {
      return { id: e.id, width: e.width, height: e.height, top: e.top, left: e.left, label: e.label, description: e.description, className: e.className, iconPath: e.iconPath, iconCategory: e.iconCategory, iconName: e.iconName, iconClassName: e.iconClassName, nodeColor: e.nodeColor, nodeShape: e.nodeShape, isSelected: e.isSelected, data: e.data, anchors: e.anchors && e.anchors.map(function (e) {
          return f.clone(e);
        }), renderStrategy: e.renderStrategy, events: e.events };
    }, equals: function equals(e, t) {
      return e.id === t.id && e.width === t.width && e.height === t.height && e.top === t.top && e.left === t.left && e.label === t.label && e.description === t.description && e.className === t.className && e.iconPath === t.iconPath && e.iconCategory === t.iconCategory && e.iconName === t.iconName && e.iconClassName === t.iconClassName && e.nodeColor === t.nodeColor && e.nodeShape === t.nodeShape && e.data === t.data && e.isSelected === t.isSelected && this.compareAnchors(e.anchors, t.anchors) && e.renderStrategy == t.renderStrategy && e.events === t.events;
    } };var d = function () {
    function e(e) {
      this.updateNode(e);
    }return e.prototype.getNode = function () {
      return this._originalNode;
    }, e.prototype.getId = function () {
      return this._originalNode.id;
    }, e.prototype.updateNode = function (e) {
      this._originalNode = j.cloneNode(e);var t = new Map();(this._originalNode.anchors || []).forEach(function (e) {
        t.set(e.id, e);
      }), this._renderedLeft = this._originalNode.left || 0, this._renderedTop = this._originalNode.top || 0, this._renderedWidth = this._originalNode.width || b.minNodeSize, this._renderedHeight = this._originalNode.height || b.minNodeSize, this._anchorMap = t;
    }, e.prototype.areNodesEqual = function (e) {
      return j.equals(this._originalNode, e);
    }, e.prototype.getAnchorMap = function () {
      return this._anchorMap;
    }, e.prototype.getBounds = function () {
      return { left: this._renderedLeft, top: this._renderedTop, width: this._renderedWidth, height: this._renderedHeight };
    }, e.prototype.getElement = function () {
      return this._element;
    }, e.prototype.getLabelElement = function () {
      return this._labelElement;
    }, e.prototype.getSvgBackgroundElement = function () {
      return this._svgBackgroundElement;
    }, e.prototype.getSvgIconElement = function () {
      return this._svgIconElement;
    }, e.prototype.updateRenderedElements = function (e, t, o, i) {
      this._element = e, this._labelElement = t, this._svgBackgroundElement = o, this._svgIconElement = i;
    }, e;
  }();var i = function () {
    function o(o, t, n) {
      this.updateConnector(o, t, n), this._id = g.getConnectorId(o);
    }return o.prototype.getConnector = function () {
      return this._originalConnector;
    }, o.prototype.updateConnector = function (o, t, n) {
      this._originalConnector = g.clone(o), this._plumbAnchorConfig = this._getPlumbAnchorConfig(t, n);
    }, o.prototype.getId = function () {
      return this._id;
    }, o.prototype.getSourceNodeId = function () {
      return this._originalConnector.sourceNodeId;
    }, o.prototype.getTargetNodeId = function () {
      return this._originalConnector.targetNodeId;
    }, o.prototype.areConnectorsEqual = function (o) {
      return g.equals(this._originalConnector, o);
    }, o.prototype.updateRenderedConnector = function (o) {
      this._plumbConnection = o;
    }, o.prototype.getPlumbConnection = function () {
      return this._plumbConnection;
    }, o.prototype.getPlumbAnchorConfig = function () {
      return this._plumbAnchorConfig;
    }, o.prototype._getPlumbAnchorConfig = function (o, t) {
      var n = void 0,
          r = void 0,
          e = ["Continuous", "Continuous"],
          i = this._originalConnector;if (i.sourceAnchorId && o) {
        var c = o.getAnchorMap().get(i.sourceAnchorId);n = c && f.getPlumbAnchor(c);
      }if (i.targetAnchorId && t) {
        var u = t.getAnchorMap().get(i.targetAnchorId);r = u && f.getPlumbAnchor(u);
      }return n && r && (e = [n, r]), e;
    }, o;
  }();var k = {};(function () {
    void 0 === Math.sgn && (Math.sgn = function (t) {
      return 0 == t ? 0 : t > 0 ? 1 : -1;
    });var t = function t(_t, e) {
      return { x: _t.x - e.x, y: _t.y - e.y };
    },
        e = function e(t, _e) {
      return t.x * _e.x + t.y * _e.y;
    },
        n = function n(t) {
      return Math.sqrt(t.x * t.x + t.y * t.y);
    },
        i = function i(t, e) {
      return { x: t.x * e, y: t.y * e };
    },
        s = Math.pow(2, -65),
        o = function o(e, i) {
      for (var s = [], o = r(e, i), l = i.length - 1, u = a(o, 2 * l - 1, s, 0), c = t(e, i[0]), d = n(c), p = 0, f = 0; f < u; f++) {
        c = t(e, h(i, l, s[f], null, null));var g = n(c);g < d && (d = g, p = s[f]);
      }return c = t(e, i[l]), (g = n(c)) < d && (d = g, p = 1), { location: p, distance: d };
    },
        r = function r(n, s) {
      for (var o = s.length - 1, r = 2 * o - 1, a = [], l = [], u = [], c = [], h = [[1, .6, .3, .1], [.4, .6, .6, .4], [.1, .3, .6, 1]], d = 0; d <= o; d++) {
        a[d] = t(s[d], n);
      }for (d = 0; d <= o - 1; d++) {
        l[d] = t(s[d + 1], s[d]), l[d] = i(l[d], 3);
      }for (var p = 0; p <= o - 1; p++) {
        for (var f = 0; f <= o; f++) {
          u[p] || (u[p] = []), u[p][f] = e(l[p], a[f]);
        }
      }for (d = 0; d <= r; d++) {
        c[d] || (c[d] = []), c[d].y = 0, c[d].x = parseFloat(d) / r;
      }for (var g = o, m = o - 1, v = 0; v <= g + m; v++) {
        var b = Math.max(0, v - m),
            y = Math.min(v, g);for (d = b; d <= y; d++) {
          j = v - d, c[d + j].y += u[j][d] * h[j][d];
        }
      }return c;
    },
        a = function a(t, e, n, i) {
      var s,
          o,
          r = [],
          d = [],
          p = [],
          f = [];switch (l(t, e)) {case 0:
          return 0;case 1:
          if (i >= 64) return n[0] = (t[0].x + t[e].x) / 2, 1;if (u(t, e)) return n[0] = c(t, e), 1;}h(t, e, .5, r, d), s = a(r, e, p, i + 1), o = a(d, e, f, i + 1);for (var g = 0; g < s; g++) {
        n[g] = p[g];
      }for (g = 0; g < o; g++) {
        n[g + s] = f[g];
      }return s + o;
    },
        l = function l(t, e) {
      var n,
          i,
          s = 0;n = i = Math.sgn(t[0].y);for (var o = 1; o <= e; o++) {
        (n = Math.sgn(t[o].y)) != i && s++, i = n;
      }return s;
    },
        u = function u(t, e) {
      var n, i, o, r, a, l, u, c;r = t[0].y - t[e].y, a = t[e].x - t[0].x, l = t[0].x * t[e].y - t[e].x * t[0].y;for (var h = max_distance_below = 0, d = 1; d < e; d++) {
        var p = r * t[d].x + a * t[d].y + l;p > h ? h = p : p < max_distance_below && (max_distance_below = p);
      }return 0, 1, 0, n = (1 * (l - h) - 0 * (c = a)) * (1 / (0 * c - 1 * (u = r))), u = r, c = a, i = (1 * (l - max_distance_below) - 0 * c) * (1 / (0 * c - 1 * u)), o = Math.min(n, i), Math.max(n, i) - o < s ? 1 : 0;
    },
        c = function c(t, e) {
      var n = t[e].x - t[0].x,
          i = t[e].y - t[0].y,
          s = t[0].x - 0;return 0 + 1 * ((n * (t[0].y - 0) - i * s) * (1 / (0 * n - 1 * i)));
    },
        h = function h(t, e, n, i, s) {
      for (var o = [[]], r = 0; r <= e; r++) {
        o[0][r] = t[r];
      }for (var a = 1; a <= e; a++) {
        for (r = 0; r <= e - a; r++) {
          o[a] || (o[a] = []), o[a][r] || (o[a][r] = {}), o[a][r].x = (1 - n) * o[a - 1][r].x + n * o[a - 1][r + 1].x, o[a][r].y = (1 - n) * o[a - 1][r].y + n * o[a - 1][r + 1].y;
        }
      }if (null != i) for (r = 0; r <= e; r++) {
        i[r] = o[r][0];
      }if (null != s) for (r = 0; r <= e; r++) {
        s[r] = o[e - r][r];
      }return o[e][0];
    },
        d = {},
        p = function p(t, e) {
      for (var n = function (t) {
        var e = d[t];if (!e) {
          var n = function n(t) {
            return function (e) {
              return t;
            };
          },
              i = function i() {
            return function (t) {
              return t;
            };
          },
              s = function s() {
            return function (t) {
              return 1 - t;
            };
          },
              o = function o(t) {
            return function (e) {
              for (var n = 1, i = 0; i < t.length; i++) {
                n *= t[i](e);
              }return n;
            };
          };(e = []).push(new function () {
            return function (e) {
              return Math.pow(e, t);
            };
          }());for (var r = 1; r < t; r++) {
            for (var a = [new n(t)], l = 0; l < t - r; l++) {
              a.push(new i());
            }for (l = 0; l < r; l++) {
              a.push(new s());
            }e.push(new o(a));
          }e.push(new function () {
            return function (e) {
              return Math.pow(1 - e, t);
            };
          }()), d[t] = e;
        }return e;
      }(t.length - 1), i = 0, s = 0, o = 0; o < t.length; o++) {
        i += t[o].x * n[o](e), s += t[o].y * n[o](e);
      }return { x: i, y: s };
    },
        f = function f(t, e) {
      return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
    },
        g = function g(t) {
      return t[0].x == t[1].x && t[0].y == t[1].y;
    },
        m = function m(t, e, n) {
      if (g(t)) return { point: t[0], location: e };for (var i = p(t, e), s = 0, o = e, r = n > 0 ? 1 : -1, a = null; s < Math.abs(n);) {
        a = p(t, o += .005 * r), s += f(a, i), i = a;
      }return { point: a, location: o };
    },
        v = function v(t, e) {
      var n = p(t, e),
          i = p(t.slice(0, t.length - 1), e),
          s = i.y - n.y,
          o = i.x - n.x;return 0 == s ? 1 / 0 : Math.atan(s / o);
    },
        b = this.jsBezier = { distanceFromCurve: o, gradientAtPoint: v, gradientAtPointAlongCurveFrom: function gradientAtPointAlongCurveFrom(t, e, n) {
        var i = m(t, e, n);return i.location > 1 && (i.location = 1), i.location < 0 && (i.location = 0), v(t, i.location);
      }, nearestPointOnCurve: function nearestPointOnCurve(t, e) {
        var n = o(t, e);return { point: h(e, e.length - 1, n.location, null, null), location: n.location };
      }, pointOnCurve: p, pointAlongCurveFrom: function pointAlongCurveFrom(t, e, n) {
        return m(t, e, n).point;
      }, perpendicularToCurveAt: function perpendicularToCurveAt(t, e, n, i) {
        var s = m(t, e, i = null == i ? 0 : i),
            o = v(t, s.location),
            r = Math.atan(-1 / o),
            a = n / 2 * Math.sin(r),
            l = n / 2 * Math.cos(r);return [{ x: s.point.x + l, y: s.point.y + a }, { x: s.point.x - l, y: s.point.y - a }];
      }, locationAlongCurveFrom: function locationAlongCurveFrom(t, e, n) {
        return m(t, e, n).location;
      }, getLength: function getLength(t) {
        if (g(t)) return 0;for (var e = p(t, 0), n = 0, i = 0, s = null; i < 1;) {
          s = p(t, i += .005), n += f(s, e), e = s;
        }return n;
      }, version: "0.9.0" };if (void 0 !== k) {
      var y = b;k.jsBezier = y;
    }
  }).call("undefined" != typeof window ? window : k), function () {
    var t = this.Biltong = { version: "0.4.0" };if (void 0 !== k) {
      var e = t;k.Biltong = e;
    }var n = function n(t) {
      return "[object Array]" === Object.prototype.toString.call(t);
    },
        i = function i(t, e, _i) {
      return _i(t = n(t) ? t : [t.x, t.y], e = n(e) ? e : [e.x, e.y]);
    },
        s = t.gradient = function (t, e) {
      return i(t, e, function (t, e) {
        return e[0] == t[0] ? e[1] > t[1] ? 1 / 0 : -1 / 0 : e[1] == t[1] ? e[0] > t[0] ? 0 : -0 : (e[1] - t[1]) / (e[0] - t[0]);
      });
    },
        o = (t.normal = function (t, e) {
      return -1 / s(t, e);
    }, t.lineLength = function (t, e) {
      return i(t, e, function (t, e) {
        return Math.sqrt(Math.pow(e[1] - t[1], 2) + Math.pow(e[0] - t[0], 2));
      });
    }, t.quadrant = function (t, e) {
      return i(t, e, function (t, e) {
        return e[0] > t[0] ? e[1] > t[1] ? 2 : 1 : e[0] == t[0] ? e[1] > t[1] ? 2 : 1 : e[1] > t[1] ? 3 : 4;
      });
    }),
        r = (t.theta = function (t, e) {
      return i(t, e, function (t, e) {
        var n = s(t, e),
            i = Math.atan(n),
            r = o(t, e);return 4 != r && 3 != r || (i += Math.PI), i < 0 && (i += 2 * Math.PI), i;
      });
    }, t.intersects = function (t, e) {
      var n = t.x,
          i = t.x + t.w,
          s = t.y,
          o = t.y + t.h,
          r = e.x,
          a = e.x + e.w,
          l = e.y,
          u = e.y + e.h;return n <= r && r <= i && s <= l && l <= o || n <= a && a <= i && s <= l && l <= o || n <= r && r <= i && s <= u && u <= o || n <= a && r <= i && s <= u && u <= o || r <= n && n <= a && l <= s && s <= u || r <= i && i <= a && l <= s && s <= u || r <= n && n <= a && l <= o && o <= u || r <= i && n <= a && l <= o && o <= u;
    }, t.encloses = function (t, e, n) {
      var i = t.x,
          s = t.x + t.w,
          o = t.y,
          r = t.y + t.h,
          a = e.x,
          l = e.x + e.w,
          u = e.y,
          c = e.y + e.h,
          h = function h(t, e, i, s) {
        return n ? t <= e && i >= s : t < e && i > s;
      };return h(i, a, s, l) && h(o, u, r, c);
    }, [null, [1, -1], [1, 1], [-1, 1], [-1, -1]]),
        a = [null, [-1, -1], [-1, 1], [1, 1], [1, -1]];t.pointOnLine = function (t, e, n) {
      var i = s(t, e),
          l = o(t, e),
          u = n > 0 ? r[l] : a[l],
          c = Math.atan(i),
          h = Math.abs(n * Math.sin(c)) * u[1],
          d = Math.abs(n * Math.cos(c)) * u[0];return { x: t.x + d, y: t.y + h };
    }, t.perpendicularLineTo = function (t, e, n) {
      var i = s(t, e),
          o = Math.atan(-1 / i),
          r = n / 2 * Math.sin(o),
          a = n / 2 * Math.cos(o);return [{ x: e.x + a, y: e.y + r }, { x: e.x - a, y: e.y - r }];
    };
  }.call("undefined" != typeof window ? window : k), function () {
    var t = navigator.userAgent.toLowerCase().indexOf("android") > -1,
        e = function e(t, _e2, n) {
      for (var i = (n = n || t.parentNode).querySelectorAll(_e2), s = 0; s < i.length; s++) {
        if (i[s] === t) return !0;
      }return !1;
    },
        n = function n(t) {
      return "string" == typeof t || t.constructor === String ? document.getElementById(t) : t;
    },
        i = function i(t) {
      return t.srcElement || t.target;
    },
        s = function s(t, e, n, i) {
      if (i) {
        if (void 0 !== t.path && t.path.indexOf) return { path: t.path, end: t.path.indexOf(n) };var s = { path: [], end: -1 },
            o = function o(t) {
          s.path.push(t), t === n ? s.end = s.path.length - 1 : null != t.parentNode && o(t.parentNode);
        };return o(e), s;
      }return { path: [e], end: 1 };
    },
        o = function o(t, e) {
      for (var n = 0, i = t.length; n < i && t[n] != e; n++) {}n < t.length && t.splice(n, 1);
    },
        r = 1,
        a = function a(t, e, n) {
      var i = r++;return t.__ta = t.__ta || {}, t.__ta[e] = t.__ta[e] || {}, t.__ta[e][i] = n, n.__tauid = i, i;
    },
        l = function l(t, n, o, r) {
      if (null == t) return o;var a = t.split(","),
          l = function l(r) {
        l.__tauid = o.__tauid;var u = i(r),
            c = u,
            h = s(r, u, n, null != t);if (-1 != h.end) for (var d = 0; d < h.end; d++) {
          c = h.path[d];for (var p = 0; p < a.length; p++) {
            e(c, a[p], n) && o.apply(c, arguments);
          }
        }
      };return u(o, r, l), l;
    },
        u = function u(t, e, n) {
      t.__taExtra = t.__taExtra || [], t.__taExtra.push([e, n]);
    },
        c = function c(t, e, n, i) {
      if (g && v[e]) {
        var s = l(i, t, n, v[e]);j(t, v[e], s, n);
      }"focus" === e && null == t.getAttribute("tabindex") && t.setAttribute("tabindex", "1"), j(t, e, l(i, t, n, e), n);
    },
        h = { tap: { touches: 1, taps: 1 }, dbltap: { touches: 1, taps: 2 }, contextmenu: { touches: 2, taps: 1 } },
        d = function d(t, n) {
      return function (r, a, l, u) {
        if ("contextmenu" == a && m) c(r, a, l, u);else {
          if (null == r.__taTapHandler) {
            var d = r.__taTapHandler = { tap: [], dbltap: [], contextmenu: [], down: !1, taps: 0, downSelectors: [] },
                p = function p() {
              d.down = !1;
            },
                f = function f() {
              d.taps = 0;
            };c(r, "mousedown", function (o) {
              for (var a = i(o), l = s(o, a, r, null != u), c = !1, h = 0; h < l.end; h++) {
                if (c) return;a = l.path[h];for (var g = 0; g < d.downSelectors.length; g++) {
                  if (null == d.downSelectors[g] || e(a, d.downSelectors[g], r)) {
                    d.down = !0, setTimeout(p, t), setTimeout(f, n), c = !0;break;
                  }
                }
              }
            }), c(r, "mouseup", function (t) {
              if (d.down) {
                var n,
                    o,
                    a = i(t);d.taps++;var l = E(t);for (var u in h) {
                  if (h.hasOwnProperty(u)) {
                    var c = h[u];if (c.touches === l && (1 === c.taps || c.taps === d.taps)) for (var p = 0; p < d[u].length; p++) {
                      o = s(t, a, r, null != d[u][p][1]);for (var f = 0; f < o.end; f++) {
                        if (n = o.path[f], null == d[u][p][1] || e(n, d[u][p][1], r)) {
                          d[u][p][0].apply(n, [t]);break;
                        }
                      }
                    }
                  }
                }
              }
            });
          }r.__taTapHandler.downSelectors.push(u), r.__taTapHandler[a].push([l, u]), l.__taUnstore = function () {
            o(r.__taTapHandler[a], l);
          };
        }
      };
    },
        p = function p(t, e, n, i) {
      for (var s in n.__tamee[t]) {
        n.__tamee[t].hasOwnProperty(s) && n.__tamee[t][s].apply(i, [e]);
      }
    },
        f = function f() {
      var t = [];return function (n, s, o, r) {
        if (!n.__tamee) {
          n.__tamee = { over: !1, mouseenter: [], mouseexit: [] };var u = function u(s) {
            var o = i(s);(null == r && o == n && !n.__tamee.over || e(o, r, n) && (null == o.__tamee || !o.__tamee.over)) && (p("mouseenter", s, n, o), o.__tamee = o.__tamee || {}, o.__tamee.over = !0, t.push(o));
          },
              c = function c(s) {
            for (var o = i(s), r = 0; r < t.length; r++) {
              o != t[r] || e(s.relatedTarget || s.toElement, "*", o) || (o.__tamee.over = !1, t.splice(r, 1), p("mouseexit", s, n, o));
            }
          };j(n, "mouseover", l(r, n, u, "mouseover"), u), j(n, "mouseout", l(r, n, c, "mouseout"), c);
        }o.__taUnstore = function () {
          delete n.__tamee[s][o.__tauid];
        }, a(n, s, o), n.__tamee[s][o.__tauid] = o;
      };
    },
        g = "ontouchstart" in document.documentElement,
        m = "onmousedown" in document.documentElement,
        v = { mousedown: "touchstart", mouseup: "touchend", mousemove: "touchmove" },
        b = function () {
      var t = -1;if ("Microsoft Internet Explorer" == navigator.appName) {
        var e = navigator.userAgent;null != new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})").exec(e) && (t = parseFloat(RegExp.$1));
      }return t;
    }(),
        y = b > -1 && b < 9,
        P = function P(t, e) {
      if (null == t) return [0, 0];var n = C(t),
          i = x(n, 0);return [i[e + "X"], i[e + "Y"]];
    },
        _ = function _(t) {
      return null == t ? [0, 0] : y ? [t.clientX + document.documentElement.scrollLeft, t.clientY + document.documentElement.scrollTop] : P(t, "page");
    },
        x = function x(t, e) {
      return t.item ? t.item(e) : t[e];
    },
        C = function C(t) {
      return t.touches && t.touches.length > 0 ? t.touches : t.changedTouches && t.changedTouches.length > 0 ? t.changedTouches : t.targetTouches && t.targetTouches.length > 0 ? t.targetTouches : [t];
    },
        E = function E(t) {
      return C(t).length;
    },
        j = function j(t, e, n, i) {
      if (a(t, e, n), i.__tauid = n.__tauid, t.addEventListener) t.addEventListener(e, n, !1);else if (t.attachEvent) {
        var s = e + n.__tauid;t["e" + s] = n, t[s] = function () {
          t["e" + s] && t["e" + s](window.event);
        }, t.attachEvent("on" + e, t[s]);
      }
    },
        S = function S(t, e, i) {
      null != i && D(t, function () {
        var s = n(this);if (function (t, e, n) {
          if (t.__ta && t.__ta[e] && delete t.__ta[e][n.__tauid], n.__taExtra) {
            for (var i = 0; i < n.__taExtra.length; i++) {
              S(t, n.__taExtra[i][0], n.__taExtra[i][1]);
            }n.__taExtra.length = 0;
          }n.__taUnstore && n.__taUnstore();
        }(s, e, i), null != i.__tauid) if (s.removeEventListener) s.removeEventListener(e, i, !1), g && v[e] && s.removeEventListener(v[e], i, !1);else if (this.detachEvent) {
          var o = e + i.__tauid;s[o] && s.detachEvent("on" + e, s[o]), s[o] = null, s["e" + o] = null;
        }i.__taTouchProxy && S(t, i.__taTouchProxy[1], i.__taTouchProxy[0]);
      });
    },
        D = function D(t, e) {
      if (null != t) {
        t = "undefined" != typeof Window && "unknown" != typeof t.top && t == t.top ? [t] : "string" != typeof t && null == t.tagName && null != t.length ? t : "string" == typeof t ? document.querySelectorAll(t) : [t];for (var n = 0; n < t.length; n++) {
          e.apply(t[n]);
        }
      }
    };if (this.Mottle = function (e) {
      var s = (e = e || {}).clickThreshold || 250,
          r = e.dblClickThreshold || 450,
          a = new f(),
          l = new d(s, r),
          u = e.smartClicks,
          h = function h(t, e, s, r) {
        null != s && D(t, function () {
          var t = n(this);u && "click" === e ? function (t, e, n, s) {
            null == t.__taSmartClicks && (c(t, "mousedown", function (e) {
              t.__tad = _(e);
            }, s), c(t, "mouseup", function (e) {
              t.__tau = _(e);
            }, s), c(t, "click", function (e) {
              if (t.__tad && t.__tau && t.__tad[0] === t.__tau[0] && t.__tad[1] === t.__tau[1]) for (var n = 0; n < t.__taSmartClicks.length; n++) {
                t.__taSmartClicks[n].apply(i(e), [e]);
              }
            }, s), t.__taSmartClicks = []);t.__taSmartClicks.push(n), n.__taUnstore = function () {
              o(t.__taSmartClicks, n);
            };
          }(t, 0, s, r) : "tap" === e || "dbltap" === e || "contextmenu" === e ? l(t, e, s, r) : "mouseenter" === e || "mouseexit" == e ? a(t, e, s, r) : c(t, e, s, r);
        });
      };this.remove = function (t) {
        return D(t, function () {
          var t = n(this);if (t.__ta) for (var e in t.__ta) {
            if (t.__ta.hasOwnProperty(e)) for (var i in t.__ta[e]) {
              t.__ta[e].hasOwnProperty(i) && S(t, e, t.__ta[e][i]);
            }
          }t.parentNode && t.parentNode.removeChild(t);
        }), this;
      }, this.on = function (t, e, n, i) {
        var s = arguments[0],
            o = 4 == arguments.length ? arguments[2] : null,
            r = arguments[1],
            a = arguments[arguments.length - 1];return h(s, r, a, o), this;
      }, this.off = function (t, e, n) {
        return S(t, e, n), this;
      }, this.trigger = function (e, i, s, o) {
        var r = m && ("undefined" == typeof MouseEvent || null == s || s.constructor === MouseEvent),
            a = g && !m && v[i] ? v[i] : i,
            l = !(g && !m && v[i]),
            u = _(s),
            c = P(s, "screen"),
            h = function (t) {
          return P(t, "client");
        }(s);return D(e, function () {
          var e,
              d = n(this);s = s || { screenX: c[0], screenY: c[1], clientX: h[0], clientY: h[1] };var p = function p(t) {
            o && (t.payload = o);
          },
              f = { TouchEvent: function TouchEvent(t) {
              var e = document.createTouch(window, d, 0, u[0], u[1], c[0], c[1], h[0], h[1], 0, 0, 0, 0),
                  n = document.createTouchList(e),
                  i = document.createTouchList(e),
                  s = document.createTouchList(e);t.initTouchEvent(a, !0, !0, window, null, c[0], c[1], h[0], h[1], !1, !1, !1, !1, n, i, s, 1, 0);
            }, MouseEvents: function MouseEvents(e) {
              if (e.initMouseEvent(a, !0, !0, window, 0, c[0], c[1], h[0], h[1], !1, !1, !1, !1, 1, d), t) {
                var n = document.createTouch(window, d, 0, u[0], u[1], c[0], c[1], h[0], h[1], 0, 0, 0, 0);e.touches = e.targetTouches = e.changedTouches = document.createTouchList(n);
              }
            } };if (document.createEvent) {
            var m = !l && !r && g && v[i] && !t ? "TouchEvent" : "MouseEvents";e = document.createEvent(m), f[m](e), p(e), d.dispatchEvent(e);
          } else document.createEventObject && ((e = document.createEventObject()).eventType = e.eventName = a, e.screenX = c[0], e.screenY = c[1], e.clientX = h[0], e.clientY = h[1], p(e), d.fireEvent("on" + a, e));
        }), this;
      };
    }, this.Mottle.consume = function (t, e) {
      t.stopPropagation ? t.stopPropagation() : t.returnValue = !1, !e && t.preventDefault && t.preventDefault();
    }, this.Mottle.pageLocation = _, this.Mottle.setForceTouchEvents = function (t) {
      g = t;
    }, this.Mottle.setForceMouseEvents = function (t) {
      m = t;
    }, this.Mottle.version = "0.8.0", void 0 !== k) {
      var w = this.Mottle;k.Mottle = w;
    }
  }.call("undefined" == typeof window ? k : window), function () {
    var t = function t(_t2, e, n) {
      return -1 === _t2.indexOf(e) && (n ? _t2.unshift(e) : _t2.push(e), !0);
    },
        e = function e(t, _e3) {
      var n = t.indexOf(_e3);-1 != n && t.splice(n, 1);
    },
        n = function n(t) {
      return null != t && ("string" == typeof t || t.constructor == String);
    },
        i = function i(t, e, n) {
      for (var i = (n = n || t.parentNode).querySelectorAll(e), s = 0; s < i.length; s++) {
        if (i[s] === t) return !0;
      }return !1;
    },
        s = function () {
      var t = -1;if ("Microsoft Internet Explorer" == navigator.appName) {
        var e = navigator.userAgent;null != new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})").exec(e) && (t = parseFloat(RegExp.$1));
      }return t;
    }(),
        o = s > -1 && s < 9,
        r = 9 == s,
        a = function a(t) {
      if (o) return [t.clientX + document.documentElement.scrollLeft, t.clientY + document.documentElement.scrollTop];var e = u(t),
          n = l(e, 0);return r ? [n.pageX || n.clientX, n.pageY || n.clientY] : [n.pageX, n.pageY];
    },
        l = function l(t, e) {
      return t.item ? t.item(e) : t[e];
    },
        u = function u(t) {
      return t.touches && t.touches.length > 0 ? t.touches : t.changedTouches && t.changedTouches.length > 0 ? t.changedTouches : t.targetTouches && t.targetTouches.length > 0 ? t.targetTouches : [t];
    },
        c = { draggable: "katavorio-draggable", droppable: "katavorio-droppable", drag: "katavorio-drag", selected: "katavorio-drag-selected", active: "katavorio-drag-active", hover: "katavorio-drag-hover", noSelect: "katavorio-drag-no-select", ghostProxy: "katavorio-ghost-proxy" },
        h = ["stop", "start", "drag", "drop", "over", "out", "beforeStart"],
        d = function d() {},
        p = function p() {
      return !0;
    },
        f = function f(t, e, n) {
      for (var i = 0; i < t.length; i++) {
        t[i] != n && e(t[i]);
      }
    },
        g = function g(t, e, n, i) {
      f(t, function (t) {
        t.setActive(e), e && t.updatePosition(), n && t.setHover(i, e);
      });
    },
        m = function m(t, e) {
      if (null != t) {
        t = n(t) || null != t.tagName || null == t.length ? [t] : t;for (var i = 0; i < t.length; i++) {
          e.apply(t[i], [t[i]]);
        }
      }
    },
        v = function v(t) {
      t.stopPropagation ? (t.stopPropagation(), t.preventDefault()) : t.returnValue = !1;
    },
        b = function b(t, e, n, i) {
      this.params = e || {}, this.el = t, this.params.addClass(this.el, this._class), this.uuid = C();var s = !0;return this.setEnabled = function (t) {
        s = t;
      }, this.isEnabled = function () {
        return s;
      }, this.toggleEnabled = function () {
        s = !s;
      }, this.setScope = function (t) {
        this.scopes = t ? t.split(/\s+/) : [i];
      }, this.addScope = function (t) {
        var e = {};for (var n in m(this.scopes, function (t) {
          e[t] = !0;
        }), m(t ? t.split(/\s+/) : [], function (t) {
          e[t] = !0;
        }), this.scopes = [], e) {
          this.scopes.push(n);
        }
      }, this.removeScope = function (t) {
        var e = {};for (var n in m(this.scopes, function (t) {
          e[t] = !0;
        }), m(t ? t.split(/\s+/) : [], function (t) {
          delete e[t];
        }), this.scopes = [], e) {
          this.scopes.push(n);
        }
      }, this.toggleScope = function (t) {
        var e = {};for (var n in m(this.scopes, function (t) {
          e[t] = !0;
        }), m(t ? t.split(/\s+/) : [], function (t) {
          e[t] ? delete e[t] : e[t] = !0;
        }), this.scopes = [], e) {
          this.scopes.push(n);
        }
      }, this.setScope(e.scope), this.k = e.katavorio, e.katavorio;
    },
        y = function y() {
      return !0;
    },
        P = function P() {
      return !1;
    },
        _ = function _(t, e, s, o) {
      this._class = s.draggable;var r = b.apply(this, arguments);this.rightButtonCanDrag = this.params.rightButtonCanDrag;var l,
          u = [0, 0],
          h = null,
          d = null,
          f = [0, 0],
          m = !1,
          _ = !1 !== this.params.consumeStartEvent,
          x = this.el,
          j = this.params.clone,
          S = (this.params.scroll, !1 !== e.multipleDrop),
          D = !1,
          w = !0 === e.ghostProxy ? y : e.ghostProxy && "function" == typeof e.ghostProxy ? e.ghostProxy : P,
          I = e.snapThreshold,
          A = function A(t, e, n, i, s) {
        var o = e * Math.floor(t[0] / e),
            r = o + e,
            a = Math.abs(t[0] - o) <= i ? o : Math.abs(r - t[0]) <= i ? r : t[0],
            l = n * Math.floor(t[1] / n),
            u = l + n;return [a, Math.abs(t[1] - l) <= s ? l : Math.abs(u - t[1]) <= s ? u : t[1]];
      };this.posses = [], this.posseRoles = {}, this.toGrid = function (t) {
        if (null == this.params.grid) return t;var e = this.params.grid ? this.params.grid[0] / 2 : I || 5,
            n = this.params.grid ? this.params.grid[1] / 2 : I || 5;return A(t, this.params.grid[0], this.params.grid[1], e, n);
      }, this.snap = function (t, e) {
        if (null != x) {
          t = t || (this.params.grid ? this.params.grid[0] : 10), e = e || (this.params.grid ? this.params.grid[1] : 10);var n = this.params.getPosition(x),
              i = this.params.grid ? this.params.grid[0] / 2 : I,
              s = this.params.grid ? this.params.grid[1] / 2 : I;this.params.setPosition(x, A(n, t, e, i, s));
        }
      }, this.setUseGhostProxy = function (t) {
        w = t ? y : P;
      };var k,
          O = function O(t) {
        return !1 === e.allowNegative ? [Math.max(0, t[0]), Math.max(0, t[1])] : t;
      },
          T = function (t) {
        l = "function" == typeof t ? t : t ? function (t) {
          return O([Math.max(0, Math.min(F.w - this.size[0], t[0])), Math.max(0, Math.min(F.h - this.size[1], t[1]))]);
        }.bind(this) : function (t) {
          return O(t);
        };
      }.bind(this);T("function" == typeof this.params.constrain ? this.params.constrain : this.params.constrain || this.params.containment), this.setConstrain = function (t) {
        T(t);
      }, this.setRevert = function (t) {
        k = t;
      };var M = {},
          L = this.setFilter = function (e, s) {
        if (e) {
          var o = "function" == typeof (r = e) ? (r._katavorioId = C(), r._katavorioId) : r;M[o] = [function (s) {
            var o,
                r = s.srcElement || s.target;return n(e) ? o = i(r, e, t) : "function" == typeof e && (o = e(s, t)), o;
          }, !1 !== s];
        }var r;
      };this.addFilter = L, this.removeFilter = function (t) {
        var e = "function" == typeof t ? t._katavorioId : t;delete M[e];
      };this.clearAllFilters = function () {
        M = {};
      }, this.canDrag = this.params.canDrag || p;var F,
          G = [],
          X = [];this.downListener = function (t) {
        var e, n, o, l, c, d, p, f, g, m;if ((this.rightButtonCanDrag || 3 !== t.which && 2 !== t.button) && this.isEnabled() && this.canDrag()) if (function (t) {
          for (var e in M) {
            var n = M[e],
                i = n[0](t);if (n[1] && (i = !i), !i) return !1;
          }return !0;
        }(t) && function (t, e, n) {
          var s = t.srcElement || t.target;return !i(s, n.getInputFilterSelector(), e);
        }(t, this.el, this.k)) {
          if (j) {
            (x = this.el.cloneNode(!0)).setAttribute("id", null), x.style.position = "absolute";var b = (e = this.el, n = e.getBoundingClientRect(), o = document.body, l = document.documentElement, c = window.pageYOffset || l.scrollTop || o.scrollTop, d = window.pageXOffset || l.scrollLeft || o.scrollLeft, p = l.clientTop || o.clientTop || 0, f = l.clientLeft || o.clientLeft || 0, g = n.top + c - p, m = n.left + d - f, { top: Math.round(g), left: Math.round(m) });x.style.left = b.left + "px", x.style.top = b.top + "px", document.body.appendChild(x);
          } else x = this.el;_ && v(t), u = a(t), this.params.bind(document, "mousemove", this.moveListener), this.params.bind(document, "mouseup", this.upListener), r.markSelection(this), r.markPosses(this), this.params.addClass(document.body, s.noSelect), B("beforeStart", { el: this.el, pos: h, e: t, drag: this });
        } else this.params.consumeFilteredEvents && v(t);
      }.bind(this), this.moveListener = function (t) {
        if (u) {
          if (!m) if (!1 !== B("start", { el: this.el, pos: h, e: t, drag: this })) {
            if (!u) return;this.mark(!0), m = !0;
          } else this.abort();if (u) {
            X.length = 0;var e = a(t),
                n = e[0] - u[0],
                i = e[1] - u[1],
                s = this.params.ignoreZoom ? 1 : r.getZoom();n /= s, i /= s, this.moveBy(n, i, t), r.updateSelection(n, i, this), r.updatePosses(n, i, this);
          }
        }
      }.bind(this), this.upListener = function (t) {
        u && (u = null, this.params.unbind(document, "mousemove", this.moveListener), this.params.unbind(document, "mouseup", this.upListener), this.params.removeClass(document.body, s.noSelect), this.unmark(t), r.unmarkSelection(this, t), r.unmarkPosses(this, t), this.stop(t), r.notifySelectionDragStop(this, t), r.notifyPosseDragStop(this, t), m = !1, j && (x && x.parentNode && x.parentNode.removeChild(x), x = null), X.length = 0, k && !0 === k(this.el, this.params.getPosition(this.el)) && (this.params.setPosition(this.el, h), B("revert", this.el)));
      }.bind(this), this.getFilters = function () {
        return M;
      }, this.abort = function () {
        null != u && this.upListener();
      }, this.getDragElement = function () {
        return x || this.el;
      };var U = { start: [], drag: [], stop: [], over: [], out: [], beforeStart: [], revert: [] };e.events.start && U.start.push(e.events.start), e.events.beforeStart && U.beforeStart.push(e.events.beforeStart), e.events.stop && U.stop.push(e.events.stop), e.events.drag && U.drag.push(e.events.drag), e.events.revert && U.revert.push(e.events.revert), this.on = function (t, e) {
        U[t] && U[t].push(e);
      }, this.off = function (t, e) {
        if (U[t]) {
          for (var n = [], i = 0; i < U[t].length; i++) {
            U[t][i] !== e && n.push(U[t][i]);
          }U[t] = n;
        }
      };var N,
          B = function B(t, e) {
        var n = null;if (U[t]) for (var i = 0; i < U[t].length; i++) {
          try {
            var s = U[t][i](e);null != s && (n = s);
          } catch (o) {}
        }return n;
      };this.notifyStart = function (t) {
        B("start", { el: this.el, pos: this.params.getPosition(x), e: t, drag: this });
      }, this.stop = function (t, e) {
        if (e || m) {
          var n = [],
              i = r.getSelection(),
              s = this.params.getPosition(x);if (i.length > 1) for (var o = 0; o < i.length; o++) {
            var a = this.params.getPosition(i[o].el);n.push([i[o].el, { left: a[0], top: a[1] }, i[o]]);
          } else n.push([x, { left: s[0], top: s[1] }, this]);B("stop", { el: x, pos: N || s, finalPos: s, e: t, drag: this, selection: n });
        }
      }, this.mark = function (t) {
        var e;h = this.params.getPosition(x), d = this.params.getPosition(x, !0), f = [d[0] - h[0], d[1] - h[1]], this.size = this.params.getSize(x), G = r.getMatchingDroppables(this), g(G, !0, !1, this), this.params.addClass(x, this.params.dragClass || s.drag), e = this.params.getConstrainingRectangle ? this.params.getConstrainingRectangle(x) : this.params.getSize(x.parentNode), F = { w: e[0], h: e[1] }, t && r.notifySelectionDragStart(this);
      }, this.unmark = function (t, n) {
        if (g(G, !1, !0, this), D && w(this.el) ? (N = [x.offsetLeft, x.offsetTop], this.el.parentNode.removeChild(x), x = this.el) : N = null, this.params.removeClass(x, this.params.dragClass || s.drag), G.length = 0, D = !1, !n) {
          X.length > 0 && N && e.setPosition(this.el, N), X.sort(E);for (var i = 0; i < X.length; i++) {
            if (!0 === X[i].drop(this, t)) break;
          }
        }
      }, this.moveBy = function (t, n, i) {
        X.length = 0;var s = this.toGrid([h[0] + t, h[1] + n]),
            o = l(s, x);if (w(this.el)) if (s[0] != o[0] || s[1] != o[1]) {
          if (!D) {
            var r = this.el.cloneNode(!0);e.addClass(r, c.ghostProxy), this.el.parentNode.appendChild(r), x = r, D = !0;
          }o = s;
        } else D && (this.el.parentNode.removeChild(x), x = this.el, D = !1);var a = { x: o[0], y: o[1], w: this.size[0], h: this.size[1] },
            u = { x: a.x + f[0], y: a.y + f[1], w: a.w, h: a.h },
            d = null;this.params.setPosition(x, o);for (var p = 0; p < G.length; p++) {
          var g = { x: G[p].pagePosition[0], y: G[p].pagePosition[1], w: G[p].size[0], h: G[p].size[1] };this.params.intersects(u, g) && (S || null == d || d == G[p].el) && G[p].canDrop(this) ? (d || (d = G[p].el), X.push(G[p]), G[p].setHover(this, !0, i)) : G[p].isHover() && G[p].setHover(this, !1, i);
        }B("drag", { el: this.el, pos: o, e: i, drag: this });
      }, this.destroy = function () {
        this.params.unbind(this.el, "mousedown", this.downListener), this.params.unbind(document, "mousemove", this.moveListener), this.params.unbind(document, "mouseup", this.upListener), this.downListener = null, this.upListener = null, this.moveListener = null;
      }, this.params.bind(this.el, "mousedown", this.downListener), this.params.handle ? L(this.params.handle, !1) : L(this.params.filter, this.params.filterExclude);
    },
        x = function x(t, e, n, i) {
      this._class = n.droppable, this.params = e || {}, this.rank = e.rank || 0, this._activeClass = this.params.activeClass || n.active, this._hoverClass = this.params.hoverClass || n.hover, b.apply(this, arguments);var s = !1;this.allowLoopback = !1 !== this.params.allowLoopback, this.setActive = function (t) {
        this.params[t ? "addClass" : "removeClass"](this.el, this._activeClass);
      }, this.updatePosition = function () {
        this.position = this.params.getPosition(this.el), this.pagePosition = this.params.getPosition(this.el, !0), this.size = this.params.getSize(this.el);
      }, this.canDrop = this.params.canDrop || function (t) {
        return !0;
      }, this.isHover = function () {
        return s;
      }, this.setHover = function (t, e, n) {
        (e || null == this.el._katavorioDragHover || this.el._katavorioDragHover == t.el._katavorio) && (this.params[e ? "addClass" : "removeClass"](this.el, this._hoverClass), this.el._katavorioDragHover = e ? t.el._katavorio : null, s !== e && this.params.events[e ? "over" : "out"]({ el: this.el, e: n, drag: t, drop: this }), s = e);
      }, this.drop = function (t, e) {
        return this.params.events.drop({ drag: t, e: e, drop: this });
      }, this.destroy = function () {
        this._class = null, this._activeClass = null, this._hoverClass = null, s = null;
      };
    },
        C = function C() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t) {
        var e = 16 * Math.random() | 0;return ("x" == t ? e : 3 & e | 8).toString(16);
      });
    },
        E = function E(t, e) {
      return t.rank < e.rank ? 1 : t.rank > e.rank ? -1 : 0;
    },
        j = function j(t) {
      return null == t ? null : null == (t = "string" == typeof t || t.constructor == String ? document.getElementById(t) : t) ? null : (t._katavorio = t._katavorio || C(), t);
    };if (this.Katavorio = function (i) {
      var s = [],
          o = {};this._dragsByScope = {}, this._dropsByScope = {};var r = 1,
          a = function a(t, e) {
        m(t, function (t) {
          for (var n = 0; n < t.scopes.length; n++) {
            e[t.scopes[n]] = e[t.scopes[n]] || [], e[t.scopes[n]].push(t);
          }
        });
      },
          l = function l(t, e) {
        var n = 0;return m(t, function (t) {
          for (var s = 0; s < t.scopes.length; s++) {
            if (e[t.scopes[s]]) {
              var o = i.indexOf(e[t.scopes[s]], t);-1 != o && (e[t.scopes[s]].splice(o, 1), n++);
            }
          }
        }), n > 0;
      },
          u = (this.getMatchingDroppables = function (t) {
        for (var e = [], n = {}, i = 0; i < t.scopes.length; i++) {
          var s = this._dropsByScope[t.scopes[i]];if (s) for (var o = 0; o < s.length; o++) {
            !s[o].canDrop(t) || n[s[o].uuid] || !s[o].allowLoopback && s[o].el === t.el || (n[s[o].uuid] = !0, e.push(s[o]));
          }
        }return e.sort(E), e;
      }, function (t) {
        t = t || {};var e,
            n = { events: {} };for (e in i) {
          n[e] = i[e];
        }for (e in t) {
          n[e] = t[e];
        }for (e = 0; e < h.length; e++) {
          n.events[h[e]] = t[h[e]] || d;
        }return n.katavorio = this, n;
      }.bind(this)),
          p = function (t, e) {
        for (var n = 0; n < h.length; n++) {
          e[h[n]] && t.on(h[n], e[h[n]]);
        }
      }.bind(this),
          g = {},
          v = i.css || {},
          b = i.scope || "katavorio-drag-scope";for (var y in c) {
        g[y] = c[y];
      }for (var y in v) {
        g[y] = v[y];
      }var P = i.inputFilterSelector || "input,textarea,select,button,option";this.getInputFilterSelector = function () {
        return P;
      }, this.setInputFilterSelector = function (t) {
        return P = t, this;
      }, this.draggable = function (t, e) {
        var n = [];return m(t, function (t) {
          if (null != (t = j(t))) if (null == t._katavorioDrag) {
            var s = u(e);t._katavorioDrag = new _(t, s, g, b), a(t._katavorioDrag, this._dragsByScope), n.push(t._katavorioDrag), i.addClass(t, g.draggable);
          } else p(t._katavorioDrag, e);
        }.bind(this)), n;
      }, this.droppable = function (t, e) {
        var n = [];return m(t, function (t) {
          if (null != (t = j(t))) {
            var s = new x(t, u(e), g, b);t._katavorioDrop = t._katavorioDrop || [], t._katavorioDrop.push(s), a(s, this._dropsByScope), n.push(s), i.addClass(t, g.droppable);
          }
        }.bind(this)), n;
      }, this.select = function (t) {
        return m(t, function () {
          var t = j(this);t && t._katavorioDrag && (o[t._katavorio] || (s.push(t._katavorioDrag), o[t._katavorio] = [t, s.length - 1], i.addClass(t, g.selected)));
        }), this;
      }, this.deselect = function (t) {
        return m(t, function () {
          var t = j(this);if (t && t._katavorio && o[t._katavorio]) {
            for (var e = [], n = 0; n < s.length; n++) {
              s[n].el !== t && e.push(s[n]);
            }s = e, delete o[t._katavorio], i.removeClass(t, g.selected);
          }
        }), this;
      }, this.deselectAll = function () {
        for (var t in o) {
          var e = o[t];i.removeClass(e[0], g.selected);
        }s.length = 0, o = {};
      }, this.markSelection = function (t) {
        f(s, function (t) {
          t.mark();
        }, t);
      }, this.markPosses = function (t) {
        t.posses && m(t.posses, function (e) {
          t.posseRoles[e] && w[e] && f(w[e].members, function (t) {
            t.mark();
          }, t);
        });
      }, this.unmarkSelection = function (t, e) {
        f(s, function (t) {
          t.unmark(e);
        }, t);
      }, this.unmarkPosses = function (t, e) {
        t.posses && m(t.posses, function (n) {
          t.posseRoles[n] && w[n] && f(w[n].members, function (t) {
            t.unmark(e, !0);
          }, t);
        });
      }, this.getSelection = function () {
        return s.slice(0);
      }, this.updateSelection = function (t, e, n) {
        f(s, function (n) {
          n.moveBy(t, e);
        }, n);
      };var C = function C(t, e) {
        e.posses && m(e.posses, function (n) {
          e.posseRoles[n] && w[n] && f(w[n].members, function (e) {
            t(e);
          }, e);
        });
      };this.updatePosses = function (t, e, n) {
        C(function (n) {
          n.moveBy(t, e);
        }, n);
      }, this.notifyPosseDragStop = function (t, e) {
        C(function (t) {
          t.stop(e, !0);
        }, t);
      }, this.notifySelectionDragStop = function (t, e) {
        f(s, function (t) {
          t.stop(e, !0);
        }, t);
      }, this.notifySelectionDragStart = function (t, e) {
        f(s, function (t) {
          t.notifyStart(e);
        }, t);
      }, this.setZoom = function (t) {
        r = t;
      }, this.getZoom = function () {
        return r;
      };var S = function S(t, e, n, i) {
        m(t, function (t) {
          l(t, n), t[i](e), a(t, n);
        });
      };m(["set", "add", "remove", "toggle"], function (t) {
        this[t + "Scope"] = function (e, n) {
          S(e._katavorioDrag, n, this._dragsByScope, t + "Scope"), S(e._katavorioDrop, n, this._dropsByScope, t + "Scope");
        }.bind(this), this[t + "DragScope"] = function (e, n) {
          S(e.constructor === _ ? e : e._katavorioDrag, n, this._dragsByScope, t + "Scope");
        }.bind(this), this[t + "DropScope"] = function (e, n) {
          S(e.constructor === x ? e : e._katavorioDrop, n, this._dropsByScope, t + "Scope");
        }.bind(this);
      }.bind(this)), this.snapToGrid = function (t, e) {
        for (var n in this._dragsByScope) {
          f(this._dragsByScope[n], function (n) {
            n.snap(t, e);
          });
        }
      }, this.getDragsForScope = function (t) {
        return this._dragsByScope[t];
      }, this.getDropsForScope = function (t) {
        return this._dropsByScope[t];
      };var D = function D(t, e, n) {
        if ((t = j(t))[e]) {
          var i = s.indexOf(t[e]);i >= 0 && s.splice(i, 1), l(t[e], n) && m(t[e], function (t) {
            t.destroy();
          }), delete t[e];
        }
      };this.elementRemoved = function (t) {
        this.destroyDraggable(t), this.destroyDroppable(t);
      }, this.destroyDraggable = function (t) {
        D(t, "_katavorioDrag", this._dragsByScope);
      }, this.destroyDroppable = function (t) {
        D(t, "_katavorioDrop", this._dropsByScope);
      }, this.reset = function () {
        this._dragsByScope = {}, this._dropsByScope = {}, s = [], o = {}, w = {};
      };var w = {},
          I = function I(e, i, s) {
        var o,
            r = n(i) ? i : i.id,
            a = !!n(i) || !1 !== i.active,
            l = w[r] || (o = { name: r, members: [] }, w[r] = o, o);return m(e, function (e) {
          if (e._katavorioDrag) {
            if (s && null != e._katavorioDrag.posseRoles[l.name]) return;t(l.members, e._katavorioDrag), t(e._katavorioDrag.posses, l.name), e._katavorioDrag.posseRoles[l.name] = a;
          }
        }), l;
      };this.addToPosse = function (t, e) {
        for (var n = [], i = 1; i < arguments.length; i++) {
          n.push(I(t, arguments[i]));
        }return 1 == n.length ? n[0] : n;
      }, this.setPosse = function (t, e) {
        for (var n = [], i = 1; i < arguments.length; i++) {
          n.push(I(t, arguments[i], !0).name);
        }return m(t, function (t) {
          if (t._katavorioDrag) {
            var e = function (t, e) {
              for (var n = [], i = 0; i < t.length; i++) {
                -1 == e.indexOf(t[i]) && n.push(t[i]);
              }return n;
            }(t._katavorioDrag.posses, n);Array.prototype.push.apply([], t._katavorioDrag.posses);for (var i = 0; i < e.length; i++) {
              this.removeFromPosse(t, e[i]);
            }
          }
        }.bind(this)), 1 == n.length ? n[0] : n;
      }, this.removeFromPosse = function (t, n) {
        if (arguments.length < 2) throw new TypeError("No posse id provided for remove operation");for (var i = 1; i < arguments.length; i++) {
          n = arguments[i], m(t, function (t) {
            if (t._katavorioDrag && t._katavorioDrag.posses) {
              var i = t._katavorioDrag;m(n, function (t) {
                e(w[t].members, i), e(i.posses, t), delete i.posseRoles[t];
              });
            }
          });
        }
      }, this.removeFromAllPosses = function (t) {
        m(t, function (t) {
          if (t._katavorioDrag && t._katavorioDrag.posses) {
            var n = t._katavorioDrag;m(n.posses, function (t) {
              e(w[t].members, n);
            }), n.posses.length = 0, n.posseRoles = {};
          }
        });
      }, this.setPosseState = function (t, e, n) {
        var i = w[e];i && m(t, function (t) {
          t._katavorioDrag && t._katavorioDrag.posses && (t._katavorioDrag.posseRoles[i.name] = n);
        });
      };
    }, this.Katavorio.version = "0.19.3", void 0 !== k) {
      var S = this.Katavorio;k.Katavorio = S;
    }
  }.call("undefined" != typeof window ? window : k), function () {
    var t = function t(_t3) {
      return "[object Array]" === Object.prototype.toString.call(_t3);
    },
        e = function e(t) {
      return "string" == typeof t;
    },
        n = function n(t) {
      return "boolean" == typeof t;
    },
        i = function i(t) {
      return null != t && "[object Object]" === Object.prototype.toString.call(t);
    },
        s = function s(t) {
      return "[object Date]" === Object.prototype.toString.call(t);
    },
        o = function o(t) {
      return "[object Function]" === Object.prototype.toString.call(t);
    },
        r = this;if (r.jsPlumbUtil = { isArray: t, isString: e, isBoolean: n, isNull: function isNull(t) {
        return null == t;
      }, isObject: i, isDate: s, isFunction: o, isEmpty: function isEmpty(t) {
        for (var e in t) {
          if (t.hasOwnProperty(e)) return !1;
        }return !0;
      }, isNumber: function isNumber(t) {
        return "[object Number]" === Object.prototype.toString.call(t);
      }, clone: function clone(r) {
        if (e(r)) return "" + r;if (n(r)) return !!r;if (s(r)) return new Date(r.getTime());if (o(r)) return r;if (t(r)) {
          for (var a = [], l = 0; l < r.length; l++) {
            a.push(this.clone(r[l]));
          }return a;
        }if (i(r)) {
          var u = {};for (var c in r) {
            u[c] = this.clone(r[c]);
          }return u;
        }return r;
      }, merge: function merge(s, o, r) {
        var a,
            l,
            u = {};for (r = r || [], l = 0; l < r.length; l++) {
          u[r[l]] = !0;
        }var c = this.clone(s);for (l in o) {
          if (null == c[l]) c[l] = o[l];else if (e(o[l]) || n(o[l])) u[l] ? ((a = []).push.apply(a, t(c[l]) ? c[l] : [c[l]]), a.push.apply(a, t(o[l]) ? o[l] : [o[l]]), c[l] = a) : c[l] = o[l];else if (t(o[l])) a = [], t(c[l]) && a.push.apply(a, c[l]), a.push.apply(a, o[l]), c[l] = a;else if (i(o[l])) for (var h in i(c[l]) || (c[l] = {}), o[l]) {
            c[l][h] = o[l][h];
          }
        }return c;
      }, replace: function replace(t, e, n) {
        if (null != t) {
          var i = t;return e.replace(/([^\.])+/g, function (t, e, s, o) {
            var r = t.match(/([^\[0-9]+){1}(\[)([0-9+])/),
                a = function a() {
              return i[r[1]] || (i[r[1]] = [], i[r[1]]);
            };if (s + t.length >= o.length) r ? a()[r[3]] = n : i[t] = n;else if (r) {
              var l = a();i = l[r[3]] || (l[r[3]] = {}, l[r[3]]);
            } else i = i[t] || (i[t] = {}, i[t]);
          }), t;
        }
      }, functionChain: function functionChain(t, e, n) {
        for (var i = 0; i < n.length; i++) {
          var s = n[i][0][n[i][1]].apply(n[i][0], n[i][2]);if (s === e) return s;
        }return t;
      }, populate: function populate(n, s, r) {
        var a = function a(n) {
          if (null != n) {
            if (e(n)) return function (t) {
              var e = t.match(/(\${.*?})/g);if (null != e) for (var n = 0; n < e.length; n++) {
                var i = s[e[n].substring(2, e[n].length - 1)] || "";null != i && (t = t.replace(e[n], i));
              }return t;
            }(n);if (!o(n) || null != r && 0 !== (n.name || "").indexOf(r)) {
              if (t(n)) {
                for (var l = [], u = 0; u < n.length; u++) {
                  l.push(a(n[u]));
                }return l;
              }if (i(n)) {
                var c = {};for (var h in n) {
                  c[h] = a(n[h]);
                }return c;
              }return n;
            }return n(s);
          }
        };return a(n);
      }, findWithFunction: function findWithFunction(t, e) {
        if (t) for (var n = 0; n < t.length; n++) {
          if (e(t[n])) return n;
        }return -1;
      }, removeWithFunction: function removeWithFunction(t, e) {
        var n = r.jsPlumbUtil.findWithFunction(t, e);return n > -1 && t.splice(n, 1), -1 !== n;
      }, remove: function remove(t, e) {
        var n = t.indexOf(e);return n > -1 && t.splice(n, 1), -1 !== n;
      }, addWithFunction: function addWithFunction(t, e, n) {
        -1 === r.jsPlumbUtil.findWithFunction(t, n) && t.push(e);
      }, addToList: function addToList(t, e, n, i) {
        var s = t[e];return null == s && (s = [], t[e] = s), s[i ? "unshift" : "push"](n), s;
      }, suggest: function suggest(t, e, n) {
        return -1 === t.indexOf(e) && (n ? t.unshift(e) : t.push(e), !0);
      }, extend: function extend(e, n, i) {
        var s;for (n = t(n) ? n : [n], s = 0; s < n.length; s++) {
          for (var o in n[s].prototype) {
            n[s].prototype.hasOwnProperty(o) && (e.prototype[o] = n[s].prototype[o]);
          }
        }var r = function r(t, e) {
          return function () {
            for (s = 0; s < n.length; s++) {
              n[s].prototype[t] && n[s].prototype[t].apply(this, arguments);
            }return e.apply(this, arguments);
          };
        },
            a = function a(t) {
          for (var n in t) {
            e.prototype[n] = r(n, t[n]);
          }
        };if (arguments.length > 2) for (s = 2; s < arguments.length; s++) {
          a(arguments[s]);
        }return e;
      }, uuid: function uuid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t) {
          var e = 16 * Math.random() | 0;return ("x" === t ? e : 3 & e | 8).toString(16);
        });
      }, logEnabled: !0, log: function log() {
        if (r.jsPlumbUtil.logEnabled && "undefined" != typeof console) try {
          var t = arguments[arguments.length - 1];console.log(t);
        } catch (e) {}
      }, wrap: function wrap(t, e, n) {
        return function () {
          var i = null;try {
            null != e && (i = e.apply(this, arguments));
          } catch (s) {
            r.jsPlumbUtil.log("jsPlumb function failed : " + s);
          }if (null != t && (null == n || i !== n)) try {
            i = t.apply(this, arguments);
          } catch (s) {
            r.jsPlumbUtil.log("wrapped function failed : " + s);
          }return i;
        };
      } }, r.jsPlumbUtil.EventGenerator = function () {
      var t = {},
          e = !1,
          n = !1,
          i = { ready: !0 },
          s = [];this.bind = function (e, n, i) {
        var s = function s(e) {
          r.jsPlumbUtil.addToList(t, e, n, i), n.__jsPlumb = n.__jsPlumb || {}, n.__jsPlumb[r.jsPlumbUtil.uuid()] = e;
        };if ("string" == typeof e) s(e);else if (null != e.length) for (var o = 0; o < e.length; o++) {
          s(e[o]);
        }return this;
      }, this.fire = function (a, l, u) {
        if (n) s.unshift(arguments);else {
          if (n = !0, !e && t[a]) {
            var c = t[a].length,
                h = 0,
                d = !1,
                p = null;if (!this.shouldFireEvent || this.shouldFireEvent(a, l, u)) for (; !d && h < c && !1 !== p;) {
              if (i[a]) t[a][h].apply(this, [l, u]);else try {
                p = t[a][h].apply(this, [l, u]);
              } catch (f) {
                r.jsPlumbUtil.log("jsPlumb: fire failed for event " + a + " : " + f);
              }h++, null != t && null != t[a] || (d = !0);
            }
          }n = !1, o();
        }return this;
      };var o = function () {
        var t = s.pop();t && this.fire.apply(this, t);
      }.bind(this);this.unbind = function (e, n) {
        if (0 === arguments.length) t = {};else if (1 === arguments.length) {
          if ("string" == typeof e) delete t[e];else if (e.__jsPlumb) {
            var i;for (var s in e.__jsPlumb) {
              i = e.__jsPlumb[s], r.jsPlumbUtil.remove(t[i] || [], e);
            }
          }
        } else 2 === arguments.length && r.jsPlumbUtil.remove(t[e] || [], n);return this;
      }, this.getListener = function (e) {
        return t[e];
      }, this.setSuspendEvents = function (t) {
        e = t;
      }, this.isSuspendEvents = function () {
        return e;
      }, this.silently = function (t) {
        this.setSuspendEvents(!0);try {
          t();
        } catch (e) {
          r.jsPlumbUtil.log("Cannot execute silent function " + e);
        }this.setSuspendEvents(!1);
      }, this.cleanupListeners = function () {
        for (var e in t) {
          t[e] = null;
        }
      };
    }, r.jsPlumbUtil.EventGenerator.prototype = { cleanup: function cleanup() {
        this.cleanupListeners();
      } }, void 0 !== k) {
      var a = r.jsPlumbUtil;k.jsPlumbUtil = a;
    }
  }.call("undefined" != typeof window ? window : k), function () {
    this.jsPlumbUtil.matchesSelector = function (t, e, n) {
      for (var i = (n = n || t.parentNode).querySelectorAll(e), s = 0; s < i.length; s++) {
        if (i[s] === t) return !0;
      }return !1;
    }, this.jsPlumbUtil.consume = function (t, e) {
      t.stopPropagation ? t.stopPropagation() : t.returnValue = !1, !e && t.preventDefault && t.preventDefault();
    }, this.jsPlumbUtil.sizeElement = function (t, e, n, i, s) {
      t && (t.style.height = s + "px", t.height = s, t.style.width = i + "px", t.width = i, t.style.left = e + "px", t.style.top = n + "px");
    };
  }.call("undefined" != typeof window ? window : k), function () {
    var t,
        e = this,
        n = [],
        i = e.jsPlumbUtil,
        s = function s() {
      return "" + new Date().getTime();
    },
        o = function o(t) {
      if (t._jsPlumb.paintStyle && t._jsPlumb.hoverPaintStyle) {
        var e = {};g.extend(e, t._jsPlumb.paintStyle), g.extend(e, t._jsPlumb.hoverPaintStyle), delete t._jsPlumb.hoverPaintStyle, e.gradient && t._jsPlumb.paintStyle.fill && delete e.gradient, t._jsPlumb.hoverPaintStyle = e;
      }
    },
        r = ["tap", "dbltap", "click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "contextmenu"],
        a = function a(t) {
      return null == t ? null : t.split(" ");
    },
        l = function l(t, e, n) {
      for (var i in e) {
        t[i] = n;
      }
    },
        u = function u(t, e) {
      e = i.isArray(e) || null != e.length && !i.isString(e) ? e : [e];for (var n = 0; n < e.length; n++) {
        try {
          t.apply(e[n], [e[n]]);
        } catch (s) {
          i.log(".each iteration failed : " + s);
        }
      }
    },
        c = function c(t, e, n) {
      if (t.getDefaultType) {
        var s = t.getTypeDescriptor(),
            o = {},
            r = t.getDefaultType(),
            a = i.merge({}, r);l(o, r, "__default");for (var u = 0, c = t._jsPlumb.types.length; u < c; u++) {
          var h = t._jsPlumb.types[u];if ("__default" !== h) {
            var d = t._jsPlumb.instance.getType(h, s);null != d && (a = i.merge(a, d, ["cssClass"]), l(o, d, h));
          }
        }e && (a = i.populate(a, e, "_")), t.applyType(a, n, o), n || t.repaint();
      }
    },
        h = e.jsPlumbUIComponent = function (t) {
      i.EventGenerator.apply(this, arguments);var e = arguments,
          n = this.idPrefix + new Date().getTime();this._jsPlumb = { instance: t._jsPlumb, parameters: t.parameters || {}, paintStyle: null, hoverPaintStyle: null, paintStyleInUse: null, hover: !1, beforeDetach: t.beforeDetach, beforeDrop: t.beforeDrop, overlayPlacements: [], hoverClass: t.hoverClass || t._jsPlumb.Defaults.HoverClass, types: [], typeCache: {} }, this.cacheTypeItem = function (t, e, n) {
        this._jsPlumb.typeCache[n] = this._jsPlumb.typeCache[n] || {}, this._jsPlumb.typeCache[n][t] = e;
      }, this.getCachedTypeItem = function (t, e) {
        return this._jsPlumb.typeCache[e] ? this._jsPlumb.typeCache[e][t] : null;
      }, this.getId = function () {
        return n;
      };var s = t.overlays || [],
          o = {};if (this.defaultOverlayKeys) {
        for (var r = 0; r < this.defaultOverlayKeys.length; r++) {
          Array.prototype.push.apply(s, this._jsPlumb.instance.Defaults[this.defaultOverlayKeys[r]] || []);
        }for (r = 0; r < s.length; r++) {
          var a = g.convertToFullOverlaySpec(s[r]);o[a[1].id] = a;
        }
      }var l = { overlays: o, parameters: t.parameters || {}, scope: t.scope || this._jsPlumb.instance.getDefaultScope() };if (this.getDefaultType = function () {
        return l;
      }, this.appendToDefaultType = function (t) {
        for (var e in t) {
          l[e] = t[e];
        }
      }, t.events) for (var u in t.events) {
        this.bind(u, t.events[u]);
      }this.clone = function () {
        var t = Object.create(this.constructor.prototype);return this.constructor.apply(t, e), t;
      }.bind(this), this.isDetachAllowed = function (t) {
        var e = !0;if (this._jsPlumb.beforeDetach) try {
          e = this._jsPlumb.beforeDetach(t);
        } catch (n) {
          i.log("jsPlumb: beforeDetach callback failed", n);
        }return e;
      }, this.isDropAllowed = function (t, e, n, s, o, r, a) {
        var l = this._jsPlumb.instance.checkCondition("beforeDrop", { sourceId: t, targetId: e, scope: n, connection: s, dropEndpoint: o, source: r, target: a });if (this._jsPlumb.beforeDrop) try {
          l = this._jsPlumb.beforeDrop({ sourceId: t, targetId: e, scope: n, connection: s, dropEndpoint: o, source: r, target: a });
        } catch (u) {
          i.log("jsPlumb: beforeDrop callback failed", u);
        }return l;
      };var c = [];this.setListenerComponent = function (t) {
        for (var e = 0; e < c.length; e++) {
          c[e][3] = t;
        }
      };
    },
        d = function d(t, e) {
      var n = t._jsPlumb.types[e],
          i = t._jsPlumb.instance.getType(n, t.getTypeDescriptor());null != i && i.cssClass && t.canvas && t._jsPlumb.instance.removeClass(t.canvas, i.cssClass);
    };i.extend(e.jsPlumbUIComponent, i.EventGenerator, { getParameter: function getParameter(t) {
        return this._jsPlumb.parameters[t];
      }, setParameter: function setParameter(t, e) {
        this._jsPlumb.parameters[t] = e;
      }, getParameters: function getParameters() {
        return this._jsPlumb.parameters;
      }, setParameters: function setParameters(t) {
        this._jsPlumb.parameters = t;
      }, getClass: function getClass() {
        return g.getClass(this.canvas);
      }, hasClass: function hasClass(t) {
        return g.hasClass(this.canvas, t);
      }, addClass: function addClass(t) {
        g.addClass(this.canvas, t);
      }, removeClass: function removeClass(t) {
        g.removeClass(this.canvas, t);
      }, updateClasses: function updateClasses(t, e) {
        g.updateClasses(this.canvas, t, e);
      }, setType: function setType(t, e, n) {
        this.clearTypes(), this._jsPlumb.types = a(t) || [], c(this, e, n);
      }, getType: function getType() {
        return this._jsPlumb.types;
      }, reapplyTypes: function reapplyTypes(t, e) {
        c(this, t, e);
      }, hasType: function hasType(t) {
        return -1 !== this._jsPlumb.types.indexOf(t);
      }, addType: function addType(t, e, n) {
        var i = a(t),
            s = !1;if (null != i) {
          for (var o = 0, r = i.length; o < r; o++) {
            this.hasType(i[o]) || (this._jsPlumb.types.push(i[o]), s = !0);
          }s && c(this, e, n);
        }
      }, removeType: function removeType(t, e, n) {
        var i = a(t),
            s = !1,
            o = function (t) {
          var e = this._jsPlumb.types.indexOf(t);return -1 !== e && (d(this, e), this._jsPlumb.types.splice(e, 1), !0);
        }.bind(this);if (null != i) {
          for (var r = 0, l = i.length; r < l; r++) {
            s = o(i[r]) || s;
          }s && c(this, e, n);
        }
      }, clearTypes: function clearTypes(t, e) {
        for (var n = this._jsPlumb.types.length, i = 0; i < n; i++) {
          d(this, 0), this._jsPlumb.types.splice(0, 1);
        }c(this, t, e);
      }, toggleType: function toggleType(t, e, n) {
        var i = a(t);if (null != i) {
          for (var s = 0, o = i.length; s < o; s++) {
            var r = this._jsPlumb.types.indexOf(i[s]);-1 !== r ? (d(this, r), this._jsPlumb.types.splice(r, 1)) : this._jsPlumb.types.push(i[s]);
          }c(this, e, n);
        }
      }, applyType: function applyType(t, e) {
        if (this.setPaintStyle(t.paintStyle, e), this.setHoverPaintStyle(t.hoverPaintStyle, e), t.parameters) for (var n in t.parameters) {
          this.setParameter(n, t.parameters[n]);
        }this._jsPlumb.paintStyleInUse = this.getPaintStyle();
      }, setPaintStyle: function setPaintStyle(t, e) {
        this._jsPlumb.paintStyle = t, this._jsPlumb.paintStyleInUse = this._jsPlumb.paintStyle, o(this), e || this.repaint();
      }, getPaintStyle: function getPaintStyle() {
        return this._jsPlumb.paintStyle;
      }, setHoverPaintStyle: function setHoverPaintStyle(t, e) {
        this._jsPlumb.hoverPaintStyle = t, o(this), e || this.repaint();
      }, getHoverPaintStyle: function getHoverPaintStyle() {
        return this._jsPlumb.hoverPaintStyle;
      }, destroy: function destroy(t) {
        (t || null == this.typeId) && (this.cleanupListeners(), this.clone = null, this._jsPlumb = null);
      }, isHover: function isHover() {
        return this._jsPlumb.hover;
      }, setHover: function setHover(t, e, n) {
        if (this._jsPlumb && !this._jsPlumb.instance.currentlyDragging && !this._jsPlumb.instance.isHoverSuspended()) {
          this._jsPlumb.hover = t;var i = t ? "addClass" : "removeClass";null != this.canvas && (null != this._jsPlumb.instance.hoverClass && this._jsPlumb.instance[i](this.canvas, this._jsPlumb.instance.hoverClass), null != this._jsPlumb.hoverClass && this._jsPlumb.instance[i](this.canvas, this._jsPlumb.hoverClass)), null != this._jsPlumb.hoverPaintStyle && (this._jsPlumb.paintStyleInUse = t ? this._jsPlumb.hoverPaintStyle : this._jsPlumb.paintStyle, this._jsPlumb.instance.isSuspendDrawing() || (n = n || s(), this.repaint({ timestamp: n, recalc: !1 }))), this.getAttachedElements && !e && function (t, e, n, i) {
            var s = t.getAttachedElements();if (s) for (var o = 0, r = s.length; o < r; o++) {
              i && i === s[o] || s[o].setHover(e, !0, n);
            }
          }(this, t, s(), this);
        }
      } });var p = 0,
        f = e.jsPlumbInstance = function (o) {
      this.version = "2.5.7", o && g.extend(this.Defaults, o), this.logEnabled = this.Defaults.LogEnabled, this._connectionTypes = {}, this._endpointTypes = {}, i.EventGenerator.apply(this);var a = this,
          l = function () {
        var t = p + 1;return p++, t;
      }(),
          c = a.bind,
          d = {},
          f = 1,
          m = function m(t) {
        if (null == t) return null;if (3 === t.nodeType || 8 === t.nodeType) return { el: t, text: !0 };var e = a.getElement(t);return { el: e, id: i.isString(t) && null == e ? t : W(e) };
      };for (var v in this.getInstanceIndex = function () {
        return l;
      }, this.setZoom = function (t, e) {
        return f = t, a.fire("zoom", f), e && a.repaintEverything(), !0;
      }, this.getZoom = function () {
        return f;
      }, this.Defaults) {
        d[v] = this.Defaults[v];
      }var b,
          y = [];this.unbindContainer = function () {
        if (null != b && y.length > 0) for (var t = 0; t < y.length; t++) {
          a.off(b, y[t][0], y[t][1]);
        }
      }, this.setContainer = function (t) {
        this.unbindContainer(), t = this.getElement(t), this.select().each(function (e) {
          e.moveParent(t);
        }), this.selectEndpoints().each(function (e) {
          e.moveParent(t);
        });var e = b;b = t, y.length = 0;for (var n = { endpointclick: "endpointClick", endpointdblclick: "endpointDblClick" }, i = function i(t, e, _i2) {
          var s = e.srcElement || e.target,
              o = (s && s.parentNode ? s.parentNode._jsPlumb : null) || (s ? s._jsPlumb : null) || (s && s.parentNode && s.parentNode.parentNode ? s.parentNode.parentNode._jsPlumb : null);if (o) {
            o.fire(t, o, e);var r = _i2 && n[_i2 + t] || t;a.fire(r, o.component || o, e);
          }
        }, s = function s(t, e, n) {
          y.push([t, n]), a.on(b, t, e, n);
        }, o = function o(t) {
          s(t, ".jtk-connector", function (e) {
            i(t, e);
          }), s(t, ".jtk-endpoint", function (e) {
            i(t, e, "endpoint");
          }), s(t, ".jtk-overlay", function (e) {
            i(t, e);
          });
        }, l = 0; l < r.length; l++) {
          o(r[l]);
        }for (var u in j) {
          var c = j[u].el;c.parentNode === e && (e.removeChild(c), b.appendChild(c));
        }
      }, this.getContainer = function () {
        return b;
      }, this.bind = function (t, e) {
        "ready" === t && _ ? e() : c.apply(a, [t, e]);
      }, a.importDefaults = function (t) {
        for (var e in t) {
          a.Defaults[e] = t[e];
        }return t.Container && a.setContainer(t.Container), a;
      }, a.restoreDefaults = function () {
        return a.Defaults = g.extend({}, d), a;
      };var P = null,
          _ = !1,
          x = [],
          C = {},
          E = {},
          j = {},
          S = {},
          D = {},
          w = {},
          I = !1,
          A = [],
          k = !1,
          O = null,
          T = this.Defaults.Scope,
          M = 1,
          L = function L() {
        return "" + M++;
      },
          F = function (t, e) {
        b ? b.appendChild(t) : e ? this.getElement(e).appendChild(t) : this.appendToRoot(t);
      }.bind(this),
          G = function G(t, e, n, i) {
        if (!k) {
          var o,
              r = W(t),
              l = a.getDragManager();l && (o = l.getElementsForDraggable(r)), null == n && (n = s());var u = lt({ elId: r, offset: e, recalc: !1, timestamp: n });if (o && u && u.o) for (var c in o) {
            lt({ elId: o[c].id, offset: { left: u.o.left + o[c].offset.left, top: u.o.top + o[c].offset.top }, recalc: !1, timestamp: n });
          }if (a.anchorManager.redraw(r, e, n, null, i), o) for (var h in o) {
            a.anchorManager.redraw(o[h].id, e, n, o[h].offset, i, !0);
          }
        }
      },
          X = function X(t) {
        return E[t];
      },
          U = function (t, e) {
        var n = g.extend({}, t);if (e && g.extend(n, e), n.source && (n.source.endpoint ? n.sourceEndpoint = n.source : n.source = a.getElement(n.source)), n.target && (n.target.endpoint ? n.targetEndpoint = n.target : n.target = a.getElement(n.target)), t.uuids && (n.sourceEndpoint = X(t.uuids[0]), n.targetEndpoint = X(t.uuids[1])), n.sourceEndpoint && n.sourceEndpoint.isFull()) i.log(a, "could not add connection; source endpoint is full");else if (n.targetEndpoint && n.targetEndpoint.isFull()) i.log(a, "could not add connection; target endpoint is full");else {
          if (!n.type && n.sourceEndpoint && (n.type = n.sourceEndpoint.connectionType), n.sourceEndpoint && n.sourceEndpoint.connectorOverlays) {
            n.overlays = n.overlays || [];for (var s = 0, o = n.sourceEndpoint.connectorOverlays.length; s < o; s++) {
              n.overlays.push(n.sourceEndpoint.connectorOverlays[s]);
            }
          }n.sourceEndpoint && n.sourceEndpoint.scope && (n.scope = n.sourceEndpoint.scope), !n["pointer-events"] && n.sourceEndpoint && n.sourceEndpoint.connectorPointerEvents && (n["pointer-events"] = n.sourceEndpoint.connectorPointerEvents);var r = function r(t, e, i) {
            return a.addEndpoint(t, function (t, e) {
              var n = g.extend({}, t);for (var i in e) {
                e[i] && (n[i] = e[i]);
              }return n;
            }(e, { anchor: n.anchors ? n.anchors[i] : n.anchor, endpoint: n.endpoints ? n.endpoints[i] : n.endpoint, paintStyle: n.endpointStyles ? n.endpointStyles[i] : n.endpointStyle, hoverPaintStyle: n.endpointHoverStyles ? n.endpointHoverStyles[i] : n.endpointHoverStyle }));
          },
              l = function l(t, e, i, s) {
            if (n[t] && !n[t].endpoint && !n[t + "Endpoint"] && !n.newConnection) {
              var o = i[W(n[t])];if (o = o ? o[s] : null) {
                if (!o.enabled) return !1;var a = null != o.endpoint && o.endpoint._jsPlumb ? o.endpoint : r(n[t], o.def, e);if (a.isFull()) return !1;n[t + "Endpoint"] = a, !n.scope && o.def.scope && (n.scope = o.def.scope), o.uniqueEndpoint ? o.endpoint ? a.finalEndpoint = o.endpoint : (o.endpoint = a, a.setDeleteOnEmpty(!1)) : a.setDeleteOnEmpty(!0);
              }
            }
          };if (!1 !== l("source", 0, this.sourceEndpointDefinitions, n.type || "default") && !1 !== l("target", 1, this.targetEndpointDefinitions, n.type || "default")) return n.sourceEndpoint && n.targetEndpoint && (function (t, e) {
            for (var n = t.scope.split(/\s/), i = e.scope.split(/\s/), s = 0; s < n.length; s++) {
              for (var o = 0; o < i.length; o++) {
                if (i[o] === n[s]) return !0;
              }
            }return !1;
          }(n.sourceEndpoint, n.targetEndpoint) || (n = null)), n;
        }
      }.bind(a),
          N = function N(t) {
        var e = a.Defaults.ConnectionType || a.getDefaultConnectionType();t._jsPlumb = a, t.newConnection = N, t.newEndpoint = R, t.endpointsByUUID = E, t.endpointsByElement = C, t.finaliseConnection = B, t.id = "con_" + L();var n = new e(t);return n.isDetachable() && (n.endpoints[0].initDraggable("_jsPlumbSource"), n.endpoints[1].initDraggable("_jsPlumbTarget")), n;
      },
          B = a.finaliseConnection = function (t, e, n, i) {
        if (e = e || {}, t.suspendedEndpoint || x.push(t), t.pending = null, t.endpoints[0].isTemporarySource = !1, !1 !== i && a.anchorManager.newConnection(t), G(t.source), !e.doNotFireConnectionEvent && !1 !== e.fireEvent) {
          var s = { connection: t, source: t.source, target: t.target, sourceId: t.sourceId, targetId: t.targetId, sourceEndpoint: t.endpoints[0], targetEndpoint: t.endpoints[1] };a.fire("connection", s, n);
        }
      },
          R = function R(t, e) {
        var n = a.Defaults.EndpointType || g.Endpoint,
            i = g.extend({}, t);i._jsPlumb = a, i.newConnection = N, i.newEndpoint = R, i.endpointsByUUID = E, i.endpointsByElement = C, i.fireDetachEvent = V, i.elementId = e || W(i.source);var s = new n(i);return s.id = "ep_" + L(), at(i.elementId, i.source), g.headless || a.getDragManager().endpointAdded(i.source, e), s;
      },
          Y = function Y(t, e, n) {
        var i = C[t];if (i && i.length) for (var s = 0, o = i.length; s < o; s++) {
          for (var r = 0, a = i[s].connections.length; r < a; r++) {
            if (e(i[s].connections[r])) return;
          }n && n(i[s]);
        }
      },
          H = function H(t, e, n) {
        e = "block" === e;var i = null;n && (i = function i(t) {
          t.setVisible(e, !0, !0);
        });var s = m(t);Y(s.id, function (t) {
          if (e && n) {
            var i = t.sourceId === s.id ? 1 : 0;t.endpoints[i].isVisible() && t.setVisible(!0);
          } else t.setVisible(e);
        }, i);
      },
          W = function W(t, e, n) {
        if (i.isString(t)) return t;if (null == t) return null;var s = a.getAttribute(t, "id");return s && "undefined" !== s || (2 === arguments.length && void 0 !== arguments[1] ? s = e : (1 === arguments.length || 3 === arguments.length && !arguments[2]) && (s = "jsPlumb_" + l + "_" + L()), n || a.setAttribute(t, "id", s)), s;
      };this.setConnectionBeingDragged = function (t) {
        I = t;
      }, this.isConnectionBeingDragged = function () {
        return I;
      }, this.getManagedElements = function () {
        return j;
      }, this.connectorClass = "jtk-connector", this.connectorOutlineClass = "jtk-connector-outline", this.editableConnectorClass = "jtk-connector-editable", this.connectedClass = "jtk-connected", this.hoverClass = "jtk-hover", this.endpointClass = "jtk-endpoint", this.endpointConnectedClass = "jtk-endpoint-connected", this.endpointFullClass = "jtk-endpoint-full", this.endpointDropAllowedClass = "jtk-endpoint-drop-allowed", this.endpointDropForbiddenClass = "jtk-endpoint-drop-forbidden", this.overlayClass = "jtk-overlay", this.draggingClass = "jtk-dragging", this.elementDraggingClass = "jtk-element-dragging", this.sourceElementDraggingClass = "jtk-source-element-dragging", this.targetElementDraggingClass = "jtk-target-element-dragging", this.endpointAnchorClassPrefix = "jtk-endpoint-anchor", this.hoverSourceClass = "jtk-source-hover", this.hoverTargetClass = "jtk-target-hover", this.dragSelectClass = "jtk-drag-select", this.Anchors = {}, this.Connectors = { svg: {} }, this.Endpoints = { svg: {} }, this.Overlays = { svg: {} }, this.ConnectorRenderers = {}, this.SVG = "svg", this.addEndpoint = function (t, e, n) {
        n = n || {};var s = g.extend({}, n);g.extend(s, e), s.endpoint = s.endpoint || a.Defaults.Endpoint, s.paintStyle = s.paintStyle || a.Defaults.EndpointStyle;for (var o = [], r = i.isArray(t) || null != t.length && !i.isString(t) ? t : [t], l = 0, u = r.length; l < u; l++) {
          s.source = a.getElement(r[l]), rt(s.source);var c = W(s.source),
              h = R(s, c),
              d = at(c, s.source).info.o;i.addToList(C, c, h), k || h.paint({ anchorLoc: h.anchor.compute({ xy: [d.left, d.top], wh: A[c], element: h, timestamp: O }), timestamp: O }), o.push(h);
        }return 1 === o.length ? o[0] : o;
      }, this.addEndpoints = function (t, e, n) {
        for (var s = [], o = 0, r = e.length; o < r; o++) {
          var l = a.addEndpoint(t, e[o], n);i.isArray(l) ? Array.prototype.push.apply(s, l) : s.push(l);
        }return s;
      }, this.animate = function (t, e, n) {
        if (!this.animationSupported) return !1;n = n || {};var s = a.getElement(t),
            o = W(s),
            r = g.animEvents.step,
            l = g.animEvents.complete;n[r] = i.wrap(n[r], function () {
          a.revalidate(o);
        }), n[l] = i.wrap(n[l], function () {
          a.revalidate(o);
        }), a.doAnimate(s, e, n);
      }, this.checkCondition = function (t, e) {
        var n = a.getListener(t),
            s = !0;if (n && n.length > 0) {
          var o = Array.prototype.slice.call(arguments, 1);try {
            for (var r = 0, l = n.length; r < l; r++) {
              s = s && n[r].apply(n[r], o);
            }
          } catch (u) {
            i.log(a, "cannot check condition [" + t + "]" + u);
          }
        }return s;
      }, this.connect = function (t, e) {
        var n,
            s = U(t, e);if (s) {
          if (null == s.source && null == s.sourceEndpoint) return void i.log("Cannot establish connection - source does not exist");if (null == s.target && null == s.targetEndpoint) return void i.log("Cannot establish connection - target does not exist");rt(s.source), n = N(s), B(n, s);
        }return n;
      };var $ = [{ el: "source", elId: "sourceId", epDefs: "sourceEndpointDefinitions" }, { el: "target", elId: "targetId", epDefs: "targetEndpointDefinitions" }],
          z = function (t, e, n, i) {
        var s,
            o,
            r,
            a = $[n],
            l = t[a.elId],
            u = (t[a.el], t.endpoints[n]),
            c = { index: n, originalSourceId: 0 === n ? l : t.sourceId, newSourceId: t.sourceId, originalTargetId: 1 === n ? l : t.targetId, newTargetId: t.targetId, connection: t };if (e.constructor === g.Endpoint) (s = e).addConnection(t), e = s.element;else if (o = W(e), r = this[a.epDefs][o], o === t[a.elId]) s = null;else if (r) for (var h in r) {
          if (!r[h].enabled) return;s = null != r[h].endpoint && r[h].endpoint._jsPlumb ? r[h].endpoint : this.addEndpoint(e, r[h].def), r[h].uniqueEndpoint && (r[h].endpoint = s), s.addConnection(t);
        } else s = t.makeEndpoint(0 === n, e, o);return null != s && (u.detachFromConnection(t), t.endpoints[n] = s, t[a.el] = s.element, t[a.elId] = s.elementId, c[0 === n ? "newSourceId" : "newTargetId"] = s.elementId, q(c), i || t.repaint()), c.element = e, c;
      }.bind(this);this.setSource = function (t, e, n) {
        var i = z(t, e, 0, n);this.anchorManager.sourceChanged(i.originalSourceId, i.newSourceId, t, i.el);
      }, this.setTarget = function (t, e, n) {
        var i = z(t, e, 1, n);this.anchorManager.updateOtherEndpoint(i.originalSourceId, i.originalTargetId, i.newTargetId, t);
      }, this.deleteEndpoint = function (t, e, n) {
        var i = "string" == typeof t ? E[t] : t;return i && a.deleteObject({ endpoint: i, dontUpdateHover: e, deleteAttachedObjects: n }), a;
      }, this.deleteEveryEndpoint = function () {
        var t = a.setSuspendDrawing(!0);for (var e in C) {
          var n = C[e];if (n && n.length) for (var i = 0, s = n.length; i < s; i++) {
            a.deleteEndpoint(n[i], !0);
          }
        }C = {}, j = {}, E = {}, S = {}, D = {}, a.anchorManager.reset();var o = a.getDragManager();return o && o.reset(), t || a.setSuspendDrawing(!1), a;
      };var V = function V(t, e, n) {
        var i = a.Defaults.ConnectionType || a.getDefaultConnectionType(),
            s = t.constructor === i ? { connection: t, source: t.source, target: t.target, sourceId: t.sourceId, targetId: t.targetId, sourceEndpoint: t.endpoints[0], targetEndpoint: t.endpoints[1] } : t;e && a.fire("connectionDetached", s, n), a.fire("internal.connectionDetached", s, n), a.anchorManager.connectionDetached(s);
      },
          q = a.fireMoveEvent = function (t, e) {
        a.fire("connectionMoved", t, e);
      };this.unregisterEndpoint = function (t) {
        for (var e in t._jsPlumb.uuid && (E[t._jsPlumb.uuid] = null), a.anchorManager.deleteEndpoint(t), C) {
          var n = C[e];if (n) {
            for (var i = [], s = 0, o = n.length; s < o; s++) {
              n[s] !== t && i.push(n[s]);
            }C[e] = i;
          }C[e].length < 1 && delete C[e];
        }
      };this.deleteConnection = function (t, e) {
        return !(null == t || !(e = e || {}).force && !i.functionChain(!0, !1, [[t.endpoints[0], "isDetachAllowed", [t]], [t.endpoints[1], "isDetachAllowed", [t]], [t, "isDetachAllowed", [t]], [a, "checkCondition", ["beforeDetach", t]]])) && (t.setHover(!1), V(t, !t.pending && !1 !== e.fireEvent, e.originalEvent), t.endpoints[0].detachFromConnection(t), t.endpoints[1].detachFromConnection(t), i.removeWithFunction(x, function (e) {
          return t.id === e.id;
        }), t.cleanup(), t.destroy(), !0);
      }, this.deleteEveryConnection = function (t) {
        t = t || {};var e = x.length,
            n = 0;return a.batch(function () {
          for (var i = 0; i < e; i++) {
            n += a.deleteConnection(x[0], t) ? 1 : 0;
          }
        }), n;
      }, this.deleteConnectionsForElement = function (t, e) {
        e = e || {}, t = a.getElement(t);var n = W(t),
            i = C[n];if (i && i.length) for (var s = 0, o = i.length; s < o; s++) {
          i[s].deleteEveryConnection(e);
        }return a;
      }, this.deleteObject = function (t) {
        var e = { endpoints: {}, connections: {}, endpointCount: 0, connectionCount: 0 },
            n = !1 !== t.deleteAttachedObjects,
            s = function s(n) {
          null != n && null == e.connections[n.id] && (t.dontUpdateHover || null == n._jsPlumb || n.setHover(!1), e.connections[n.id] = n, e.connectionCount++);
        };for (var o in t.connection ? s(t.connection) : function (i) {
          if (null != i && null == e.endpoints[i.id] && (t.dontUpdateHover || null == i._jsPlumb || i.setHover(!1), e.endpoints[i.id] = i, e.endpointCount++, n)) for (var o = 0; o < i.connections.length; o++) {
            var r = i.connections[o];s(r);
          }
        }(t.endpoint), e.connections) {
          var r = e.connections[o];if (r._jsPlumb) {
            i.removeWithFunction(x, function (t) {
              return r.id === t.id;
            }), V(r, !1 !== t.fireEvent && !r.pending, t.originalEvent);var l = null == t.deleteAttachedObjects ? null : !t.deleteAttachedObjects;r.endpoints[0].detachFromConnection(r, null, l), r.endpoints[1].detachFromConnection(r, null, l), r.cleanup(!0), r.destroy(!0);
          }
        }for (var u in e.endpoints) {
          var c = e.endpoints[u];c._jsPlumb && (a.unregisterEndpoint(c), c.cleanup(!0), c.destroy(!0));
        }return e;
      }, this.draggable = function (t, e) {
        var n;return u(function (t) {
          (n = m(t)).el && function (t, e, n, s, o) {
            if (!g.headless && null != e && e && g.isDragSupported(t, a)) {
              var r = n || a.Defaults.DragOptions;if (r = g.extend({}, r), g.isAlreadyDraggable(t, a)) n.force && a.initDraggable(t, r);else {
                var l = g.dragEvents.drag,
                    u = g.dragEvents.stop,
                    c = g.dragEvents.start,
                    h = !1;at(s, t), r[c] = i.wrap(r[c], function () {
                  if (a.setHoverSuspended(!0), a.select({ source: t }).addClass(a.elementDraggingClass + " " + a.sourceElementDraggingClass, !0), a.select({ target: t }).addClass(a.elementDraggingClass + " " + a.targetElementDraggingClass, !0), a.setConnectionBeingDragged(!0), r.canDrag) return n.canDrag();
                }, !1), r[l] = i.wrap(r[l], function () {
                  var e = a.getUIPosition(arguments, a.getZoom());null != e && (G(t, e, null, !0), h && a.addClass(t, "jtk-dragged"), h = !0);
                }), r[u] = i.wrap(r[u], function () {
                  for (var t, e, n = arguments[0].selection, i = 0; i < n.length; i++) {
                    null != (e = n[i])[1] && (t = a.getUIPosition([{ el: e[2].el, pos: [e[1].left, e[1].top] }]), G(e[2].el, t)), a.removeClass(e[0], "jtk-dragged"), a.select({ source: e[2].el }).removeClass(a.elementDraggingClass + " " + a.sourceElementDraggingClass, !0), a.select({ target: e[2].el }).removeClass(a.elementDraggingClass + " " + a.targetElementDraggingClass, !0), a.getDragManager().dragEnded(e[2].el);
                  }h = !1, a.setHoverSuspended(!1), a.setConnectionBeingDragged(!1);
                });var d = W(t);w[d] = !0;var p = w[d];r.disabled = null != p && !p, a.initDraggable(t, r), a.getDragManager().register(t), o && a.fire("elementDraggable", { el: t, options: r });
              }
            }
          }(n.el, !0, e, n.id, !0);
        }, t), a;
      }, this.droppable = function (t, e) {
        var n;return (e = e || {}).allowLoopback = !1, u(function (t) {
          (n = m(t)).el && a.initDroppable(n.el, e);
        }, t), a;
      };var J = function J(t, e, n) {
        return function () {
          return function (t, e, n, i) {
            for (var s = 0, o = t.length; s < o; s++) {
              t[s][e].apply(t[s], n);
            }return i(t);
          }(t, e, arguments, n);
        };
      },
          Z = function Z(t, e) {
        return function () {
          return function (t, e, n) {
            for (var i = [], s = 0, o = t.length; s < o; s++) {
              i.push([t[s][e].apply(t[s], n), t[s]]);
            }return i;
          }(t, e, arguments);
        };
      },
          K = function K(t, e) {
        var n = [];if (t) if ("string" == typeof t) {
          if ("*" === t) return t;n.push(t);
        } else if (e) n = t;else if (t.length) for (var i = 0, s = t.length; i < s; i++) {
          n.push(m(t[i]).id);
        } else n.push(m(t).id);return n;
      },
          Q = function Q(t, e, n) {
        return "*" === t || (t.length > 0 ? -1 !== t.indexOf(e) : !n);
      };this.getConnections = function (t, e) {
        t ? t.constructor === String && (t = { scope: t }) : t = {};for (var n = t.scope || a.getDefaultScope(), i = K(n, !0), s = K(t.source), o = K(t.target), r = !e && i.length > 1 ? {} : [], l = function l(t, n) {
          if (!e && i.length > 1) {
            var s = r[t];null == s && (s = r[t] = []), s.push(n);
          } else r.push(n);
        }, u = 0, c = x.length; u < c; u++) {
          var h = x[u],
              d = h.proxies && h.proxies[0] ? h.proxies[0].originalEp.elementId : h.sourceId,
              p = h.proxies && h.proxies[1] ? h.proxies[1].originalEp.elementId : h.targetId;Q(i, h.scope) && Q(s, d) && Q(o, p) && l(h.scope, h);
        }return r;
      };var tt = function tt(t, e) {
        return function (n) {
          for (var i = 0, s = t.length; i < s; i++) {
            n(t[i]);
          }return e(t);
        };
      },
          et = function et(t) {
        return function (e) {
          return t[e];
        };
      },
          nt = function nt(t, e) {
        var n,
            i,
            s = { length: t.length, each: tt(t, e), get: et(t) },
            o = ["setHover", "removeAllOverlays", "setLabel", "addClass", "addOverlay", "removeOverlay", "removeOverlays", "showOverlay", "hideOverlay", "showOverlays", "hideOverlays", "setPaintStyle", "setHoverPaintStyle", "setSuspendEvents", "setParameter", "setParameters", "setVisible", "repaint", "addType", "toggleType", "removeType", "removeClass", "setType", "bind", "unbind"],
            r = ["getLabel", "getOverlay", "isHover", "getParameter", "getParameters", "getPaintStyle", "getHoverPaintStyle", "isVisible", "hasType", "getType", "isSuspendEvents"];for (n = 0, i = o.length; n < i; n++) {
          s[o[n]] = J(t, o[n], e);
        }for (n = 0, i = r.length; n < i; n++) {
          s[r[n]] = Z(t, r[n]);
        }return s;
      },
          it = function it(t) {
        var e = nt(t, it);return g.extend(e, { setDetachable: J(t, "setDetachable", it), setReattach: J(t, "setReattach", it), setConnector: J(t, "setConnector", it), delete: function _delete() {
            for (var e = 0, n = t.length; e < n; e++) {
              a.deleteConnection(t[e]);
            }
          }, isDetachable: Z(t, "isDetachable"), isReattach: Z(t, "isReattach") });
      },
          st = function st(t) {
        var e = nt(t, st);return g.extend(e, { setEnabled: J(t, "setEnabled", st), setAnchor: J(t, "setAnchor", st), isEnabled: Z(t, "isEnabled"), deleteEveryConnection: function deleteEveryConnection() {
            for (var e = 0, n = t.length; e < n; e++) {
              t[e].deleteEveryConnection();
            }
          }, delete: function _delete() {
            for (var e = 0, n = t.length; e < n; e++) {
              a.deleteEndpoint(t[e]);
            }
          } });
      };this.select = function (t) {
        return (t = t || {}).scope = t.scope || "*", it(t.connections || a.getConnections(t, !0));
      }, this.selectEndpoints = function (t) {
        (t = t || {}).scope = t.scope || "*";var e = !t.element && !t.source && !t.target,
            n = e ? "*" : K(t.element),
            i = e ? "*" : K(t.source),
            s = e ? "*" : K(t.target),
            o = K(t.scope, !0),
            r = [];for (var a in C) {
          var l = Q(n, a, !0),
              u = Q(i, a, !0),
              c = "*" !== i,
              h = Q(s, a, !0),
              d = "*" !== s;if (l || u || h) t: for (var p = 0, f = C[a].length; p < f; p++) {
            var g = C[a][p];if (Q(o, g.scope, !0)) {
              var m = c && i.length > 0 && !g.isSource,
                  v = d && s.length > 0 && !g.isTarget;if (m || v) continue t;r.push(g);
            }
          }
        }return st(r);
      }, this.getAllConnections = function () {
        return x;
      }, this.getDefaultScope = function () {
        return T;
      }, this.getEndpoint = X, this.getEndpoints = function (t) {
        return C[m(t).id] || [];
      }, this.getDefaultEndpointType = function () {
        return g.Endpoint;
      }, this.getDefaultConnectionType = function () {
        return g.Connection;
      }, this.getId = W, this.appendElement = F;var ot = !1;this.isHoverSuspended = function () {
        return ot;
      }, this.setHoverSuspended = function (t) {
        ot = t;
      }, this.hide = function (t, e) {
        return H(t, "none", e), a;
      }, this.idstamp = L, this.connectorsInitialized = !1, this.registerConnectorType = function (t, e) {
        n.push([t, e]);
      };var rt = function rt(t) {
        if (!b && t) {
          var e = a.getElement(t);e.offsetParent && a.setContainer(e.offsetParent);
        }
      },
          at = a.manage = function (t, e, n) {
        return j[t] || (j[t] = { el: e, endpoints: [], connections: [] }, j[t].info = lt({ elId: t, timestamp: O }), n || a.fire("manageElement", { id: t, info: j[t].info, el: e })), j[t];
      },
          lt = this.updateOffset = function (t) {
        var e,
            n = t.timestamp,
            i = t.recalc,
            s = t.offset,
            o = t.elId;return k && !n && (n = O), !i && n && n === D[o] ? { o: t.offset || S[o], s: A[o] } : (i || !s && null == S[o] ? null != (e = j[o] ? j[o].el : null) && (A[o] = a.getSize(e), S[o] = a.getOffset(e), D[o] = n) : (S[o] = s || S[o], null == A[o] && null != (e = j[o].el) && (A[o] = a.getSize(e)), D[o] = n), S[o] && !S[o].right && (S[o].right = S[o].left + A[o][0], S[o].bottom = S[o].top + A[o][1], S[o].width = A[o][0], S[o].height = A[o][1], S[o].centerx = S[o].left + S[o].width / 2, S[o].centery = S[o].top + S[o].height / 2), { o: S[o], s: A[o] });
      };this.init = function () {
        t = e.jsPlumb.getRenderModes();var s = function s(t, n, _s) {
          e.jsPlumb.Connectors[t][n] = function () {
            _s.apply(this, arguments), e.jsPlumb.ConnectorRenderers[t].apply(this, arguments);
          }, i.extend(e.jsPlumb.Connectors[t][n], [_s, e.jsPlumb.ConnectorRenderers[t]]);
        };if (!e.jsPlumb.connectorsInitialized) {
          for (var o = 0; o < n.length; o++) {
            for (var r = 0; r < t.length; r++) {
              s(t[r], n[o][1], n[o][0]);
            }
          }e.jsPlumb.connectorsInitialized = !0;
        }_ || (a.Defaults.Container && a.setContainer(a.Defaults.Container), a.anchorManager = new e.jsPlumb.AnchorManager({ jsPlumbInstance: a }), _ = !0, a.fire("ready", a));
      }.bind(this), this.log = P, this.jsPlumbUIComponent = h, this.makeAnchor = function () {
        var t,
            n = function n(t, _n) {
          if (e.jsPlumb.Anchors[t]) return new e.jsPlumb.Anchors[t](_n);if (!a.Defaults.DoNotThrowErrors) throw { msg: "jsPlumb: unknown anchor type '" + t + "'" };
        };if (0 === arguments.length) return null;var s = arguments[0],
            o = arguments[1],
            r = (arguments[2], null);if (s.compute && s.getOrientation) return s;if ("string" == typeof s) r = n(arguments[0], { elementId: o, jsPlumbInstance: a });else if (i.isArray(s)) if (i.isArray(s[0]) || i.isString(s[0])) 2 === s.length && i.isObject(s[1]) ? i.isString(s[0]) ? (t = e.jsPlumb.extend({ elementId: o, jsPlumbInstance: a }, s[1]), r = n(s[0], t)) : (t = e.jsPlumb.extend({ elementId: o, jsPlumbInstance: a, anchors: s[0] }, s[1]), r = new e.jsPlumb.DynamicAnchor(t)) : r = new g.DynamicAnchor({ anchors: s, selector: null, elementId: o, jsPlumbInstance: a });else {
          var l = { x: s[0], y: s[1], orientation: s.length >= 4 ? [s[2], s[3]] : [0, 0], offsets: s.length >= 6 ? [s[4], s[5]] : [0, 0], elementId: o, jsPlumbInstance: a, cssClass: 7 === s.length ? s[6] : null };(r = new e.jsPlumb.Anchor(l)).clone = function () {
            return new e.jsPlumb.Anchor(l);
          };
        }return r.id || (r.id = "anchor_" + L()), r;
      }, this.makeAnchors = function (t, n, s) {
        for (var o = [], r = 0, l = t.length; r < l; r++) {
          "string" == typeof t[r] ? o.push(e.jsPlumb.Anchors[t[r]]({ elementId: n, jsPlumbInstance: s })) : i.isArray(t[r]) && o.push(a.makeAnchor(t[r], n, s));
        }return o;
      }, this.makeDynamicAnchor = function (t, n) {
        return new e.jsPlumb.DynamicAnchor({ anchors: t, selector: n, elementId: null, jsPlumbInstance: a });
      }, this.targetEndpointDefinitions = {}, this.sourceEndpointDefinitions = {};var ut = function ut(t, n, s, o, r) {
        var l = new h(n),
            u = n._jsPlumb.EndpointDropHandler({ jsPlumb: a, enabled: function enabled() {
            return t.def.enabled;
          }, isFull: function isFull() {
            var e = a.select({ target: t.id }).length;return t.def.maxConnections > 0 && e >= t.def.maxConnections;
          }, element: t.el, elementId: t.id, isSource: o, isTarget: r, addClass: function addClass(e) {
            a.addClass(t.el, e);
          }, removeClass: function removeClass(e) {
            a.removeClass(t.el, e);
          }, onDrop: function onDrop(t) {
            t.endpoints[0].anchor.locked = !1;
          }, isDropAllowed: function isDropAllowed() {
            return l.isDropAllowed.apply(l, arguments);
          }, isRedrop: function isRedrop(e) {
            return null != e.suspendedElement && null != e.suspendedEndpoint && e.suspendedEndpoint.element === t.el;
          }, getEndpoint: function getEndpoint(i) {
            var s = t.def.endpoint;if (null == s || null == s._jsPlumb) {
              var o = a.deriveEndpointAndAnchorSpec(i.getType().join(" "), !0),
                  r = o.endpoints ? e.jsPlumb.extend(n, { endpoint: t.def.def.endpoint || o.endpoints[1] }) : n;o.anchors && (r = e.jsPlumb.extend(r, { anchor: t.def.def.anchor || o.anchors[1] })), (s = a.addEndpoint(t.el, r))._mtNew = !0;
            }if (n.uniqueEndpoint && (t.def.endpoint = s), s.setDeleteOnEmpty(!0), i.isDetachable() && s.initDraggable(), null != s.anchor.positionFinder) {
              var l = a.getUIPosition(arguments, a.getZoom()),
                  u = a.getOffset(t.el),
                  c = a.getSize(t.el),
                  h = null == l ? [0, 0] : s.anchor.positionFinder(l, u, c, s.anchor.constructorParams);s.anchor.x = h[0], s.anchor.y = h[1];
            }return s;
          }, maybeCleanup: function maybeCleanup(t) {
            t._mtNew && 0 === t.connections.length ? a.deleteObject({ endpoint: t }) : delete t._mtNew;
          } }),
            c = e.jsPlumb.dragEvents.drop;return s.scope = s.scope || n.scope || a.Defaults.Scope, s[c] = i.wrap(s[c], u, !0), r && (s[e.jsPlumb.dragEvents.over] = function () {
          return !0;
        }), !1 === n.allowLoopback && (s.canDrop = function (e) {
          return e.getDragElement()._jsPlumbRelatedElement !== t.el;
        }), a.initDroppable(t.el, s, "internal"), u;
      };this.makeTarget = function (t, n, i) {
        var s = e.jsPlumb.extend({ _jsPlumb: this }, i);e.jsPlumb.extend(s, n);for (var o = s.maxConnections || -1, r = function (t) {
          var n = m(t),
              i = n.id,
              r = e.jsPlumb.extend({}, s.dropOptions || {}),
              l = s.connectionType || "default";this.targetEndpointDefinitions[i] = this.targetEndpointDefinitions[i] || {}, rt(i), n.el._isJsPlumbGroup && null == r.rank && (r.rank = -1);var u = { def: e.jsPlumb.extend({}, s), uniqueEndpoint: s.uniqueEndpoint, maxConnections: o, enabled: !0 };s.createEndpoint && (u.uniqueEndpoint = !0, u.endpoint = a.addEndpoint(t, u.def), u.endpoint.setDeleteOnEmpty(!1)), n.def = u, this.targetEndpointDefinitions[i][l] = u, ut(n, s, r, !0 === s.isSource, !0), n.el._katavorioDrop[n.el._katavorioDrop.length - 1].targetDef = u;
        }.bind(this), l = t.length && t.constructor !== String ? t : [t], u = 0, c = l.length; u < c; u++) {
          r(l[u]);
        }return this;
      }, this.unmakeTarget = function (t, e) {
        var n = m(t);return a.destroyDroppable(n.el, "internal"), e || delete this.targetEndpointDefinitions[n.id], this;
      }, this.makeSource = function (t, n, s) {
        var o = e.jsPlumb.extend({ _jsPlumb: this }, s);e.jsPlumb.extend(o, n);var r = o.connectionType || "default",
            l = a.deriveEndpointAndAnchorSpec(r);o.endpoint = o.endpoint || l.endpoints[0], o.anchor = o.anchor || l.anchors[0];for (var u = o.maxConnections || -1, c = o.onMaxConnections, h = function (n) {
          var s = n.id,
              l = this.getElement(n.el);this.sourceEndpointDefinitions[s] = this.sourceEndpointDefinitions[s] || {}, rt(s);var h = { def: e.jsPlumb.extend({}, o), uniqueEndpoint: o.uniqueEndpoint, maxConnections: u, enabled: !0 };o.createEndpoint && (h.uniqueEndpoint = !0, h.endpoint = a.addEndpoint(t, h.def), h.endpoint.setDeleteOnEmpty(!1)), this.sourceEndpointDefinitions[s][r] = h, n.def = h;var d = e.jsPlumb.dragEvents.stop,
              p = e.jsPlumb.dragEvents.drag,
              g = e.jsPlumb.extend({}, o.dragOptions || {}),
              m = g.drag,
              v = g.stop,
              b = null,
              y = !1;g.scope = g.scope || o.scope, g[p] = i.wrap(g[p], function () {
            m && m.apply(this, arguments), y = !1;
          }), g[d] = i.wrap(g[d], function () {
            if (v && v.apply(this, arguments), this.currentlyDragging = !1, null != b._jsPlumb) {
              var t = o.anchor || this.Defaults.Anchor,
                  e = b.anchor,
                  n = b.connections[0],
                  i = this.makeAnchor(t, s, this),
                  r = b.element;if (null != i.positionFinder) {
                var l = a.getOffset(r),
                    u = this.getSize(r),
                    c = { left: l.left + e.x * u[0], top: l.top + e.y * u[1] },
                    h = i.positionFinder(c, l, u, i.constructorParams);i.x = h[0], i.y = h[1];
              }b.setAnchor(i, !0), b.repaint(), this.repaint(b.elementId), null != n && this.repaint(n.targetId);
            }
          }.bind(this));var P = function (t) {
            if (3 !== t.which && 2 !== t.button) {
              var h = this.sourceEndpointDefinitions[s][r];if (h.enabled) {
                if (s = this.getId(this.getElement(n.el)), o.filter) if (!1 === (i.isString(o.filter) ? function (t, e, n, i, s) {
                  for (var o = t.target || t.srcElement, r = !1, a = i.getSelector(e, n), l = 0; l < a.length; l++) {
                    if (a[l] === o) {
                      r = !0;break;
                    }
                  }return s ? !r : r;
                }(t, n.el, o.filter, this, o.filterExclude) : o.filter(t, n.el))) return;var d = this.select({ source: s }).length;if (h.maxConnections >= 0 && d >= h.maxConnections) return c && c({ element: n.el, maxConnections: u }, t), !1;var p = e.jsPlumb.getPositionOnElement(t, l, f),
                    m = {};e.jsPlumb.extend(m, o), m.isTemporarySource = !0, m.anchor = [p[0], p[1], 0, 0], m.dragOptions = g, h.def.scope && (m.scope = h.def.scope), b = this.addEndpoint(s, m), y = !0, b.setDeleteOnEmpty(!0), h.uniqueEndpoint && (h.endpoint ? b.finalEndpoint = h.endpoint : (h.endpoint = b, b.setDeleteOnEmpty(!1)));var v = function v() {
                  a.off(b.canvas, "mouseup", v), a.off(n.el, "mouseup", v), y && (y = !1, a.deleteEndpoint(b));
                };a.on(b.canvas, "mouseup", v), a.on(n.el, "mouseup", v);var P = {};if (h.def.extract) for (var _ in h.def.extract) {
                  var x = (t.srcElement || t.target).getAttribute(_);x && (P[h.def.extract[_]] = x);
                }a.trigger(b.canvas, "mousedown", t, P), i.consume(t);
              }
            }
          }.bind(this);this.on(n.el, "mousedown", P), h.trigger = P, o.filter && (i.isString(o.filter) || i.isFunction(o.filter)) && a.setDragFilter(n.el, o.filter);var _ = e.jsPlumb.extend({}, o.dropOptions || {});ut(n, o, _, !0, !0 === o.isTarget);
        }.bind(this), d = t.length && t.constructor !== String ? t : [t], p = 0, g = d.length; p < g; p++) {
          h(m(d[p]));
        }return this;
      }, this.unmakeSource = function (t, e, n) {
        var i = m(t);a.destroyDroppable(i.el, "internal");var s = this.sourceEndpointDefinitions[i.id];if (s) for (var o in s) {
          if (null == e || e === o) {
            var r = s[o].trigger;r && a.off(i.el, "mousedown", r), n || delete this.sourceEndpointDefinitions[i.id][o];
          }
        }return this;
      }, this.unmakeEverySource = function () {
        for (var t in this.sourceEndpointDefinitions) {
          a.unmakeSource(t, null, !0);
        }return this.sourceEndpointDefinitions = {}, this;
      };var ct = function (t, e, n) {
        e = i.isArray(e) ? e : [e];var s = W(t);n = n || "default";for (var o = 0; o < e.length; o++) {
          var r = this[e[o]][s];if (r && r[n]) return r[n].def.scope || this.Defaults.Scope;
        }
      }.bind(this),
          ht = function (t, e, n, s) {
        n = i.isArray(n) ? n : [n];var o = W(t);s = s || "default";for (var r = 0; r < n.length; r++) {
          var a = this[n[r]][o];a && a[s] && (a[s].def.scope = e);
        }
      }.bind(this);this.getScope = function (t, e) {
        return ct(t, ["sourceEndpointDefinitions", "targetEndpointDefinitions"]);
      }, this.getSourceScope = function (t) {
        return ct(t, "sourceEndpointDefinitions");
      }, this.getTargetScope = function (t) {
        return ct(t, "targetEndpointDefinitions");
      }, this.setScope = function (t, e, n) {
        this.setSourceScope(t, e, n), this.setTargetScope(t, e, n);
      }, this.setSourceScope = function (t, e, n) {
        ht(t, e, "sourceEndpointDefinitions", n), this.setDragScope(t, e);
      }, this.setTargetScope = function (t, e, n) {
        ht(t, e, "targetEndpointDefinitions", n), this.setDropScope(t, e);
      }, this.unmakeEveryTarget = function () {
        for (var t in this.targetEndpointDefinitions) {
          a.unmakeTarget(t, !0);
        }return this.targetEndpointDefinitions = {}, this;
      };var dt = function (t, e, n, s, o) {
        var r,
            l,
            u,
            c = "source" === t ? this.sourceEndpointDefinitions : this.targetEndpointDefinitions;if (o = o || "default", e.length && !i.isString(e)) {
          r = [];for (var h = 0, d = e.length; h < d; h++) {
            c[(l = m(e[h])).id] && c[l.id][o] && (r[h] = c[l.id][o].enabled, u = s ? !r[h] : n, c[l.id][o].enabled = u, a[u ? "removeClass" : "addClass"](l.el, "jtk-" + t + "-disabled"));
          }
        } else {
          var p = (l = m(e)).id;c[p] && c[p][o] && (r = c[p][o].enabled, u = s ? !r : n, c[p][o].enabled = u, a[u ? "removeClass" : "addClass"](l.el, "jtk-" + t + "-disabled"));
        }return r;
      }.bind(this),
          pt = function (t, e) {
        return i.isString(t) || !t.length ? e.apply(this, [t]) : t.length ? e.apply(this, [t[0]]) : void 0;
      }.bind(this);this.toggleSourceEnabled = function (t, e) {
        return dt("source", t, null, !0, e), this.isSourceEnabled(t, e);
      }, this.setSourceEnabled = function (t, e, n) {
        return dt("source", t, e, null, n);
      }, this.isSource = function (t, e) {
        return e = e || "default", pt(t, function (t) {
          var n = this.sourceEndpointDefinitions[m(t).id];return null != n && null != n[e];
        }.bind(this));
      }, this.isSourceEnabled = function (t, e) {
        return e = e || "default", pt(t, function (t) {
          var n = this.sourceEndpointDefinitions[m(t).id];return n && n[e] && !0 === n[e].enabled;
        }.bind(this));
      }, this.toggleTargetEnabled = function (t, e) {
        return dt("target", t, null, !0, e), this.isTargetEnabled(t, e);
      }, this.isTarget = function (t, e) {
        return e = e || "default", pt(t, function (t) {
          var n = this.targetEndpointDefinitions[m(t).id];return null != n && null != n[e];
        }.bind(this));
      }, this.isTargetEnabled = function (t, e) {
        return e = e || "default", pt(t, function (t) {
          var n = this.targetEndpointDefinitions[m(t).id];return n && n[e] && !0 === n[e].enabled;
        }.bind(this));
      }, this.setTargetEnabled = function (t, e, n) {
        return dt("target", t, e, null, n);
      }, this.ready = function (t) {
        a.bind("ready", t);
      };var ft = function ft(t, e) {
        if ("object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && t.length) for (var n = 0, i = t.length; n < i; n++) {
          e(t[n]);
        } else e(t);return a;
      };this.repaint = function (t, e, n) {
        return ft(t, function (t) {
          G(t, e, n);
        });
      }, this.revalidate = function (t, e, n) {
        return ft(t, function (t) {
          var i = n ? t : a.getId(t);a.updateOffset({ elId: i, recalc: !0, timestamp: e });var s = a.getDragManager();s && s.updateOffsets(i), a.repaint(t);
        });
      }, this.repaintEverything = function () {
        var t,
            e = s();for (t in C) {
          a.updateOffset({ elId: t, recalc: !0, timestamp: e });
        }for (t in C) {
          G(t, null, e);
        }return this;
      }, this.removeAllEndpoints = function (t, e, n) {
        n = n || [];var i = function i(t) {
          var s,
              o,
              r = m(t),
              l = C[r.id];if (l) for (n.push(r), s = 0, o = l.length; s < o; s++) {
            a.deleteEndpoint(l[s], !1);
          }if (delete C[r.id], e && r.el && 3 !== r.el.nodeType && 8 !== r.el.nodeType) for (s = 0, o = r.el.childNodes.length; s < o; s++) {
            i(r.el.childNodes[s]);
          }
        };return i(t), this;
      };var gt = function gt(t, e) {
        a.removeAllEndpoints(t.id, !0, e);for (var n = a.getDragManager(), i = function i(t) {
          n && n.elementRemoved(t.id), a.anchorManager.clearFor(t.id), a.anchorManager.removeFloatingConnection(t.id), a.isSource(t.el) && a.unmakeSource(t.el), a.isTarget(t.el) && a.unmakeTarget(t.el), a.destroyDraggable(t.el), a.destroyDroppable(t.el), delete a.floatingConnections[t.id], delete j[t.id], delete S[t.id], t.el && (a.removeElement(t.el), t.el._jsPlumb = null);
        }, s = 1; s < e.length; s++) {
          i(e[s]);
        }i(t);
      };this.remove = function (t, e) {
        var n = m(t),
            i = [];return n.text ? n.el.parentNode.removeChild(n.el) : n.id && a.batch(function () {
          gt(n, i);
        }, !1 === e), a;
      }, this.empty = function (t, e) {
        var n = [],
            i = function i(t, e) {
          var s = m(t);if (s.text) s.el.parentNode.removeChild(s.el);else if (s.el) {
            for (; s.el.childNodes.length > 0;) {
              i(s.el.childNodes[0]);
            }e || gt(s, n);
          }
        };return a.batch(function () {
          i(t, !0);
        }, !1 === e), a;
      }, this.reset = function () {
        a.silently(function () {
          ot = !1, a.removeAllGroups(), a.removeGroupManager(), a.deleteEveryEndpoint(), a.unbind(), this.targetEndpointDefinitions = {}, this.sourceEndpointDefinitions = {}, x.length = 0, this.doReset && this.doReset();
        }.bind(this));
      };var mt = function mt(t) {
        t.canvas && t.canvas.parentNode && t.canvas.parentNode.removeChild(t.canvas), t.cleanup(), t.destroy();
      };this.clear = function () {
        a.select().each(mt), a.selectEndpoints().each(mt), C = {}, E = {};
      }, this.setDefaultScope = function (t) {
        return T = t, a;
      }, this.setDraggable = function (t, e) {
        return g.each(t, function (t) {
          a.isDragSupported(t) && (w[a.getAttribute(t, "id")] = e, a.setElementDraggable(t, e));
        });
      }, this.deriveEndpointAndAnchorSpec = function (t, e) {
        for (var n = ((e ? "" : "default ") + t).split(/[\s]/), i = null, s = null, o = null, r = null, l = 0; l < n.length; l++) {
          var u = a.getType(n[l], "connection");u && (u.endpoints && (i = u.endpoints), u.endpoint && (s = u.endpoint), u.anchors && (r = u.anchors), u.anchor && (o = u.anchor));
        }return { endpoints: i || [s, s], anchors: r || [o, o] };
      }, this.setId = function (t, e, n) {
        var s;i.isString(t) ? s = t : (t = this.getElement(t), s = this.getId(t));var o = this.getConnections({ source: s, scope: "*" }, !0),
            r = this.getConnections({ target: s, scope: "*" }, !0);e = "" + e, n ? t = this.getElement(e) : (t = this.getElement(s), this.setAttribute(t, "id", e)), C[e] = C[s] || [];for (var a = 0, l = C[e].length; a < l; a++) {
          C[e][a].setElementId(e), C[e][a].setReferenceElement(t);
        }delete C[s], this.sourceEndpointDefinitions[e] = this.sourceEndpointDefinitions[s], delete this.sourceEndpointDefinitions[s], this.targetEndpointDefinitions[e] = this.targetEndpointDefinitions[s], delete this.targetEndpointDefinitions[s], this.anchorManager.changeId(s, e);var u = this.getDragManager();u && u.changeId(s, e), j[e] = j[s], delete j[s];var c = function c(n, i, s) {
          for (var o = 0, r = n.length; o < r; o++) {
            n[o].endpoints[i].setElementId(e), n[o].endpoints[i].setReferenceElement(t), n[o][s + "Id"] = e, n[o][s] = t;
          }
        };c(o, 0, "source"), c(r, 1, "target"), this.repaint(e);
      }, this.setDebugLog = function (t) {
        P = t;
      }, this.setSuspendDrawing = function (t, e) {
        var n = k;return k = t, O = t ? new Date().getTime() : null, e && this.repaintEverything(), n;
      }, this.isSuspendDrawing = function () {
        return k;
      }, this.getSuspendedAt = function () {
        return O;
      }, this.batch = function (t, e) {
        var n = this.isSuspendDrawing();n || this.setSuspendDrawing(!0);try {
          t();
        } catch (s) {
          i.log("Function run while suspended failed", s);
        }n || this.setSuspendDrawing(!1, !e);
      }, this.doWhileSuspended = this.batch, this.getCachedData = function (t) {
        var e = S[t];return e ? { o: e, s: A[t] } : lt({ elId: t });
      }, this.timestamp = s, this.show = function (t, e) {
        return H(t, "block", e), a;
      }, this.toggleVisible = function (t, e) {
        var n = null;e && (n = function n(t) {
          var e = t.isVisible();t.setVisible(!e);
        }), Y(t, function (t) {
          var e = t.isVisible();t.setVisible(!e);
        }, n);
      }, this.toggleDraggable = function (t) {
        var e;return g.each(t, function (t) {
          var n = a.getAttribute(t, "id");return e = !(e = null != w[n] && w[n]), w[n] = e, a.setDraggable(t, e), e;
        }.bind(this)), e;
      }, this.addListener = this.bind;
    };i.extend(e.jsPlumbInstance, i.EventGenerator, { setAttribute: function setAttribute(t, e, n) {
        this.setAttribute(t, e, n);
      }, getAttribute: function getAttribute(t, n) {
        return this.getAttribute(e.jsPlumb.getElement(t), n);
      }, convertToFullOverlaySpec: function convertToFullOverlaySpec(t) {
        return i.isString(t) && (t = [t, {}]), t[1].id = t[1].id || i.uuid(), t;
      }, registerConnectionType: function registerConnectionType(t, n) {
        if (this._connectionTypes[t] = e.jsPlumb.extend({}, n), n.overlays) {
          for (var i = {}, s = 0; s < n.overlays.length; s++) {
            var o = this.convertToFullOverlaySpec(n.overlays[s]);i[o[1].id] = o;
          }this._connectionTypes[t].overlays = i;
        }
      }, registerConnectionTypes: function registerConnectionTypes(t) {
        for (var e in t) {
          this.registerConnectionType(e, t[e]);
        }
      }, registerEndpointType: function registerEndpointType(t, n) {
        if (this._endpointTypes[t] = e.jsPlumb.extend({}, n), n.overlays) {
          for (var i = {}, s = 0; s < n.overlays.length; s++) {
            var o = this.convertToFullOverlaySpec(n.overlays[s]);i[o[1].id] = o;
          }this._endpointTypes[t].overlays = i;
        }
      }, registerEndpointTypes: function registerEndpointTypes(t) {
        for (var e in t) {
          this.registerEndpointType(e, t[e]);
        }
      }, getType: function getType(t, e) {
        return "connection" === e ? this._connectionTypes[t] : this._endpointTypes[t];
      }, setIdChanged: function setIdChanged(t, e) {
        this.setId(t, e, !0);
      }, setParent: function setParent(t, e) {
        var n = this.getElement(t),
            i = this.getId(n),
            s = this.getElement(e),
            o = this.getId(s),
            r = this.getDragManager();n.parentNode.removeChild(n), s.appendChild(n), r && r.setParent(n, i, s, o);
      }, extend: function extend(t, e, n) {
        var i;if (n) for (i = 0; i < n.length; i++) {
          t[n[i]] = e[n[i]];
        } else for (i in e) {
          t[i] = e[i];
        }return t;
      }, floatingConnections: {}, getFloatingAnchorIndex: function getFloatingAnchorIndex(t) {
        return t.endpoints[0].isFloating() ? 0 : t.endpoints[1].isFloating() ? 1 : -1;
      } }), f.prototype.Defaults = { Anchor: "Bottom", Anchors: [null, null], ConnectionsDetachable: !0, ConnectionOverlays: [], Connector: "Bezier", Container: null, DoNotThrowErrors: !1, DragOptions: {}, DropOptions: {}, Endpoint: "Dot", EndpointOverlays: [], Endpoints: [null, null], EndpointStyle: { fill: "#456" }, EndpointStyles: [null, null], EndpointHoverStyle: null, EndpointHoverStyles: [null, null], HoverPaintStyle: null, LabelStyle: { color: "black" }, LogEnabled: !1, Overlays: [], MaxConnections: 1, PaintStyle: { "stroke-width": 4, stroke: "#456" }, ReattachConnections: !1, RenderMode: "svg", Scope: "jsPlumb_DefaultScope" };var g = new f();if (e.jsPlumb = g, g.getInstance = function (t, e) {
      var n = new f(t);if (e) for (var i in e) {
        n[i] = e[i];
      }return n.init(), n;
    }, g.each = function (t, e) {
      if (null != t) if ("string" == typeof t) e(g.getElement(t));else if (null != t.length) for (var n = 0; n < t.length; n++) {
        e(g.getElement(t[n]));
      } else e(t);
    }, void 0 !== k) {
      var m = g;k.jsPlumb = m;
    }
  }.call("undefined" != typeof window ? window : k), function () {
    var t = this.jsPlumbUtil,
        e = function e(t, _e4) {
      if (null == _e4) return [0, 0];var n = r(_e4),
          i = o(n, 0);return [i[t + "X"], i[t + "Y"]];
    },
        n = e.bind(this, "page"),
        i = e.bind(this, "screen"),
        s = e.bind(this, "client"),
        o = function o(t, e) {
      return t.item ? t.item(e) : t[e];
    },
        r = function r(t) {
      return t.touches && t.touches.length > 0 ? t.touches : t.changedTouches && t.changedTouches.length > 0 ? t.changedTouches : t.targetTouches && t.targetTouches.length > 0 ? t.targetTouches : [t];
    },
        a = function a(t) {
      var e = {},
          n = [],
          i = {},
          s = {},
          o = {};this.register = function (r) {
        var a = t.getId(r),
            l = t.getOffset(r);e[a] || (e[a] = r, n.push(r), i[a] = {});var u = function u(e) {
          if (e) for (var n = 0; n < e.childNodes.length; n++) {
            if (3 !== e.childNodes[n].nodeType && 8 !== e.childNodes[n].nodeType) {
              var r = jsPlumb.getElement(e.childNodes[n]),
                  c = t.getId(e.childNodes[n], null, !0);if (c && s[c] && s[c] > 0) {
                var h = t.getOffset(r);i[a][c] = { id: c, offset: { left: h.left - l.left, top: h.top - l.top } }, o[c] = a;
              }u(e.childNodes[n]);
            }
          }
        };u(r);
      }, this.updateOffsets = function (e, n) {
        if (null != e) {
          n = n || {};var s = jsPlumb.getElement(e),
              r = t.getId(s),
              a = i[r],
              l = t.getOffset(s);if (a) for (var u in a) {
            if (a.hasOwnProperty(u)) {
              var c = jsPlumb.getElement(u),
                  h = n[u] || t.getOffset(c);if (null == c.offsetParent && null != i[r][u]) continue;i[r][u] = { id: u, offset: { left: h.left - l.left, top: h.top - l.top } }, o[u] = r;
            }
          }
        }
      }, this.endpointAdded = function (n, r) {
        r = r || t.getId(n);var a = document.body,
            l = n.parentNode;for (s[r] = s[r] ? s[r] + 1 : 1; null != l && l !== a;) {
          var u = t.getId(l, null, !0);if (u && e[u]) {
            var c = t.getOffset(l);if (null == i[u][r]) {
              var h = t.getOffset(n);i[u][r] = { id: r, offset: { left: h.left - c.left, top: h.top - c.top } }, o[r] = u;
            }break;
          }l = l.parentNode;
        }
      }, this.endpointDeleted = function (t) {
        if (s[t.elementId] && (s[t.elementId]--, s[t.elementId] <= 0)) for (var e in i) {
          i.hasOwnProperty(e) && i[e] && (delete i[e][t.elementId], delete o[t.elementId]);
        }
      }, this.changeId = function (t, e) {
        i[e] = i[t], i[t] = {}, o[e] = o[t], o[t] = null;
      }, this.getElementsForDraggable = function (t) {
        return i[t];
      }, this.elementRemoved = function (t) {
        var e = o[t];e && (delete i[e][t], delete o[t]);
      }, this.reset = function () {
        e = {}, n = [], i = {}, s = {};
      }, this.dragEnded = function (e) {
        if (null != e.offsetParent) {
          var n = t.getId(e),
              i = o[n];i && this.updateOffsets(i);
        }
      }, this.setParent = function (e, n, s, r, a) {
        var l = o[n];i[r] || (i[r] = {});var u = t.getOffset(s),
            c = a || t.getOffset(e);l && i[l] && delete i[l][n], i[r][n] = { id: n, offset: { left: c.left - u.left, top: c.top - u.top } }, o[n] = r;
      }, this.clearParent = function (t, e) {
        var n = o[e];n && (delete i[n][e], delete o[e]);
      }, this.revalidateParent = function (e, n, i) {
        var s = o[n];if (s) {
          var r = {};r[n] = i, this.updateOffsets(s, r), t.revalidate(s);
        }
      }, this.getDragAncestor = function (e) {
        var n = jsPlumb.getElement(e),
            i = t.getId(n),
            s = o[i];return s ? jsPlumb.getElement(s) : null;
      };
    },
        l = function l(t, e, n) {
      var i;e = null == (i = e) ? null : i.replace(/^\s\s*/, "").replace(/\s\s*$/, ""), void 0 !== t.className.baseVal ? t.className.baseVal = e : t.className = e;try {
        for (var s = t.classList; s.length > 0;) {
          s.remove(s.item(0));
        }for (var o = 0; o < n.length; o++) {
          n[o] && s.add(n[o]);
        }
      } catch (r) {
        console.log("JSPLUMB: cannot set class list", r);
      }
    },
        u = function u(t) {
      return void 0 === t.className.baseVal ? t.className : t.className.baseVal;
    },
        c = function c(e, n, i) {
      n = null == n ? [] : t.isArray(n) ? n : n.split(/\s+/), i = null == i ? [] : t.isArray(i) ? i : i.split(/\s+/);var s = u(e).split(/\s+/),
          o = function o(t, e) {
        for (var n = 0; n < e.length; n++) {
          if (t) -1 === s.indexOf(e[n]) && s.push(e[n]);else {
            var i = s.indexOf(e[n]);-1 !== i && s.splice(i, 1);
          }
        }
      };o(!0, n), o(!1, i), l(e, s.join(" "), s);
    };this.jsPlumb.extend(this.jsPlumbInstance.prototype, { headless: !1, pageLocation: n, screenLocation: i, clientLocation: s, getDragManager: function getDragManager() {
        return null == this.dragManager && (this.dragManager = new a(this)), this.dragManager;
      }, recalculateOffsets: function recalculateOffsets(t) {
        this.getDragManager().updateOffsets(t);
      }, createElement: function createElement(t, e, n, i) {
        return this.createElementNS(null, t, e, n, i);
      }, createElementNS: function createElementNS(t, e, n, i, s) {
        var o,
            r = null == t ? document.createElement(e) : document.createElementNS(t, e);for (o in n = n || {}) {
          r.style[o] = n[o];
        }for (o in i && (r.className = i), s = s || {}) {
          r.setAttribute(o, "" + s[o]);
        }return r;
      }, getAttribute: function getAttribute(t, e) {
        return null != t.getAttribute ? t.getAttribute(e) : null;
      }, setAttribute: function setAttribute(t, e, n) {
        null != t.setAttribute && t.setAttribute(e, n);
      }, setAttributes: function setAttributes(t, e) {
        for (var n in e) {
          e.hasOwnProperty(n) && t.setAttribute(n, e[n]);
        }
      }, appendToRoot: function appendToRoot(t) {
        document.body.appendChild(t);
      }, getRenderModes: function getRenderModes() {
        return ["svg"];
      }, getClass: u, addClass: function addClass(t, e) {
        jsPlumb.each(t, function (t) {
          c(t, e);
        });
      }, hasClass: function hasClass(t, e) {
        return (t = jsPlumb.getElement(t)).classList ? t.classList.contains(e) : -1 !== u(t).indexOf(e);
      }, removeClass: function removeClass(t, e) {
        jsPlumb.each(t, function (t) {
          c(t, null, e);
        });
      }, updateClasses: function updateClasses(t, e, n) {
        jsPlumb.each(t, function (t) {
          c(t, e, n);
        });
      }, setClass: function setClass(t, e) {
        null != e && jsPlumb.each(t, function (t) {
          l(t, e, e.split(/\s+/));
        });
      }, setPosition: function setPosition(t, e) {
        t.style.left = e.left + "px", t.style.top = e.top + "px";
      }, getPosition: function getPosition(t) {
        var e = function e(_e5) {
          var n = t.style[_e5];return n ? n.substring(0, n.length - 2) : 0;
        };return { left: e("left"), top: e("top") };
      }, getStyle: function getStyle(t, e) {
        return void 0 !== window.getComputedStyle ? getComputedStyle(t, null).getPropertyValue(e) : t.currentStyle[e];
      }, getSelector: function getSelector(t, e) {
        return 1 === arguments.length ? null != t.nodeType ? t : document.querySelectorAll(t) : t.querySelectorAll(e);
      }, getOffset: function getOffset(t, e, n) {
        t = jsPlumb.getElement(t), n = n || this.getContainer();for (var i = { left: t.offsetLeft, top: t.offsetTop }, s = e || null != n && t !== n && t.offsetParent !== n ? t.offsetParent : null, o = function (t) {
          null != t && t !== document.body && (t.scrollTop > 0 || t.scrollLeft > 0) && (i.left -= t.scrollLeft, i.top -= t.scrollTop);
        }.bind(this); null != s;) {
          i.left += s.offsetLeft, i.top += s.offsetTop, o(s), s = e ? s.offsetParent : s.offsetParent === n ? null : s.offsetParent;
        }if (null != n && !e && (n.scrollTop > 0 || n.scrollLeft > 0)) {
          var r = null != t.offsetParent ? this.getStyle(t.offsetParent, "position") : "static",
              a = this.getStyle(t, "position");"absolute" !== a && "fixed" !== a && "absolute" !== r && "fixed" !== r && (i.left -= n.scrollLeft, i.top -= n.scrollTop);
        }return i;
      }, getPositionOnElement: function getPositionOnElement(t, e, n) {
        var i = void 0 !== e.getBoundingClientRect ? e.getBoundingClientRect() : { left: 0, top: 0, width: 0, height: 0 },
            s = document.body,
            o = document.documentElement,
            r = window.pageYOffset || o.scrollTop || s.scrollTop,
            a = window.pageXOffset || o.scrollLeft || s.scrollLeft,
            l = o.clientTop || s.clientTop || 0,
            u = o.clientLeft || s.clientLeft || 0,
            c = i.top + r - l + 0 * n,
            h = i.left + a - u + 0 * n,
            d = jsPlumb.pageLocation(t),
            p = i.width || e.offsetWidth * n,
            f = i.height || e.offsetHeight * n;return [(d[0] - h) / p, (d[1] - c) / f];
      }, getAbsolutePosition: function getAbsolutePosition(t) {
        var e = function e(_e6) {
          var n = t.style[_e6];if (n) return parseFloat(n.substring(0, n.length - 2));
        };return [e("left"), e("top")];
      }, setAbsolutePosition: function setAbsolutePosition(t, e, n, i) {
        n ? this.animate(t, { left: "+=" + (e[0] - n[0]), top: "+=" + (e[1] - n[1]) }, i) : (t.style.left = e[0] + "px", t.style.top = e[1] + "px");
      }, getSize: function getSize(t) {
        return [t.offsetWidth, t.offsetHeight];
      }, getWidth: function getWidth(t) {
        return t.offsetWidth;
      }, getHeight: function getHeight(t) {
        return t.offsetHeight;
      }, getRenderMode: function getRenderMode() {
        return "svg";
      } });
  }.call("undefined" != typeof window ? window : k), function () {
    var t = this,
        e = t.jsPlumb,
        n = t.jsPlumbUtil;e.OverlayCapableJsPlumbUIComponent = function (e) {
      t.jsPlumbUIComponent.apply(this, arguments), this._jsPlumb.overlays = {}, this._jsPlumb.overlayPositions = {}, e.label && (this.getDefaultType().overlays.__label = ["Label", { label: e.label, location: e.labelLocation || this.defaultLabelLocation || .5, labelStyle: e.labelStyle || this._jsPlumb.instance.Defaults.LabelStyle, id: "__label" }]), this.setListenerComponent = function (t) {
        if (this._jsPlumb) for (var e in this._jsPlumb.overlays) {
          this._jsPlumb.overlays[e].setListenerComponent(t);
        }
      };
    }, e.OverlayCapableJsPlumbUIComponent.applyType = function (t, e) {
      if (e.overlays) {
        var n,
            i = {};for (n in e.overlays) {
          var s = t._jsPlumb.overlays[e.overlays[n][1].id];if (s) s.updateFrom(e.overlays[n][1]), i[e.overlays[n][1].id] = !0;else {
            var o = t.getCachedTypeItem("overlay", e.overlays[n][1].id);null != o ? (o.reattach(t._jsPlumb.instance, t), o.setVisible(!0), o.updateFrom(e.overlays[n][1]), t._jsPlumb.overlays[o.id] = o) : o = t.addOverlay(e.overlays[n], !0), i[o.id] = !0;
          }
        }for (n in t._jsPlumb.overlays) {
          null == i[t._jsPlumb.overlays[n].id] && t.removeOverlay(t._jsPlumb.overlays[n].id, !0);
        }
      }
    }, n.extend(e.OverlayCapableJsPlumbUIComponent, t.jsPlumbUIComponent, { setHover: function setHover(t, e) {
        if (this._jsPlumb && !this._jsPlumb.instance.isConnectionBeingDragged()) for (var n in this._jsPlumb.overlays) {
          this._jsPlumb.overlays[n][t ? "addClass" : "removeClass"](this._jsPlumb.instance.hoverClass);
        }
      }, addOverlay: function addOverlay(t, i) {
        var s = function (t, i) {
          var s = null;if (n.isArray(i)) {
            var o = i[0],
                r = e.extend({ component: t, _jsPlumb: t._jsPlumb.instance }, i[1]);3 === i.length && e.extend(r, i[2]), s = new e.Overlays[t._jsPlumb.instance.getRenderMode()][o](r);
          } else s = i.constructor === String ? new e.Overlays[t._jsPlumb.instance.getRenderMode()][i]({ component: t, _jsPlumb: t._jsPlumb.instance }) : i;return s.id = s.id || n.uuid(), t.cacheTypeItem("overlay", s, s.id), t._jsPlumb.overlays[s.id] = s, s;
        }(this, t);return i || this.repaint(), s;
      }, getOverlay: function getOverlay(t) {
        return this._jsPlumb.overlays[t];
      }, getOverlays: function getOverlays() {
        return this._jsPlumb.overlays;
      }, hideOverlay: function hideOverlay(t) {
        var e = this.getOverlay(t);e && e.hide();
      }, hideOverlays: function hideOverlays() {
        for (var t in this._jsPlumb.overlays) {
          this._jsPlumb.overlays[t].hide();
        }
      }, showOverlay: function showOverlay(t) {
        var e = this.getOverlay(t);e && e.show();
      }, showOverlays: function showOverlays() {
        for (var t in this._jsPlumb.overlays) {
          this._jsPlumb.overlays[t].show();
        }
      }, removeAllOverlays: function removeAllOverlays(t) {
        for (var e in this._jsPlumb.overlays) {
          this._jsPlumb.overlays[e].cleanup && this._jsPlumb.overlays[e].cleanup();
        }this._jsPlumb.overlays = {}, this._jsPlumb.overlayPositions = null, t || this.repaint();
      }, removeOverlay: function removeOverlay(t, e) {
        var n = this._jsPlumb.overlays[t];n && (n.setVisible(!1), !e && n.cleanup && n.cleanup(), delete this._jsPlumb.overlays[t], this._jsPlumb.overlayPositions && delete this._jsPlumb.overlayPositions[t]);
      }, removeOverlays: function removeOverlays() {
        for (var t = 0, e = arguments.length; t < e; t++) {
          this.removeOverlay(arguments[t]);
        }
      }, moveParent: function moveParent(t) {
        if (this.bgCanvas && (this.bgCanvas.parentNode.removeChild(this.bgCanvas), t.appendChild(this.bgCanvas)), this.canvas && this.canvas.parentNode) for (var e in this.canvas.parentNode.removeChild(this.canvas), t.appendChild(this.canvas), this._jsPlumb.overlays) {
          if (this._jsPlumb.overlays[e].isAppendedAtTopLevel) {
            var n = this._jsPlumb.overlays[e].getElement();n.parentNode.removeChild(n), t.appendChild(n);
          }
        }
      }, getLabel: function getLabel() {
        var t = this.getOverlay("__label");return null != t ? t.getLabel() : null;
      }, getLabelOverlay: function getLabelOverlay() {
        return this.getOverlay("__label");
      }, setLabel: function setLabel(t) {
        var n = this.getOverlay("__label");n ? t.constructor === String || t.constructor === Function ? n.setLabel(t) : (t.label && n.setLabel(t.label), t.location && n.setLocation(t.location)) : (n = function (t, n) {
          var i = { cssClass: n.cssClass, labelStyle: t.labelStyle, id: "__label", component: t, _jsPlumb: t._jsPlumb.instance },
              s = e.extend(i, n);return new e.Overlays[t._jsPlumb.instance.getRenderMode()].Label(s);
        }(this, t.constructor === String || t.constructor === Function ? { label: t } : t), this._jsPlumb.overlays.__label = n);this._jsPlumb.instance.isSuspendDrawing() || this.repaint();
      }, cleanup: function cleanup(t) {
        for (var e in this._jsPlumb.overlays) {
          this._jsPlumb.overlays[e].cleanup(t), this._jsPlumb.overlays[e].destroy(t);
        }t && (this._jsPlumb.overlays = {}, this._jsPlumb.overlayPositions = null);
      }, setVisible: function setVisible(t) {
        this[t ? "showOverlays" : "hideOverlays"]();
      }, setAbsoluteOverlayPosition: function setAbsoluteOverlayPosition(t, e) {
        this._jsPlumb.overlayPositions[t.id] = e;
      }, getAbsoluteOverlayPosition: function getAbsoluteOverlayPosition(t) {
        return this._jsPlumb.overlayPositions ? this._jsPlumb.overlayPositions[t.id] : null;
      }, _clazzManip: function _clazzManip(t, e, n) {
        if (!n) for (var i in this._jsPlumb.overlays) {
          this._jsPlumb.overlays[i][t + "Class"](e);
        }
      }, addClass: function addClass(t, e) {
        this._clazzManip("add", t, e);
      }, removeClass: function removeClass(t, e) {
        this._clazzManip("remove", t, e);
      } });
  }.call("undefined" != typeof window ? window : k), function () {
    var t = this.jsPlumb,
        e = this.jsPlumbUtil,
        n = ["connectorStyle", "connectorHoverStyle", "connectorOverlays", "connector", "connectionType", "connectorClass", "connectorHoverClass"];t.Endpoint = function (i) {
      var s = i._jsPlumb,
          o = i.newConnection,
          r = i.newEndpoint;this.idPrefix = "_jsplumb_e_", this.defaultLabelLocation = [.5, .5], this.defaultOverlayKeys = ["Overlays", "EndpointOverlays"], t.OverlayCapableJsPlumbUIComponent.apply(this, arguments), this.appendToDefaultType({ connectionType: i.connectionType, maxConnections: null == i.maxConnections ? this._jsPlumb.instance.Defaults.MaxConnections : i.maxConnections, paintStyle: i.endpointStyle || i.paintStyle || i.style || this._jsPlumb.instance.Defaults.EndpointStyle || t.Defaults.EndpointStyle, hoverPaintStyle: i.endpointHoverStyle || i.hoverPaintStyle || this._jsPlumb.instance.Defaults.EndpointHoverStyle || t.Defaults.EndpointHoverStyle, connectorStyle: i.connectorStyle, connectorHoverStyle: i.connectorHoverStyle, connectorClass: i.connectorClass, connectorHoverClass: i.connectorHoverClass, connectorOverlays: i.connectorOverlays, connector: i.connector, connectorTooltip: i.connectorTooltip }), this._jsPlumb.enabled = !(!1 === i.enabled), this._jsPlumb.visible = !0, this.element = t.getElement(i.source), this._jsPlumb.uuid = i.uuid, this._jsPlumb.floatingEndpoint = null;this._jsPlumb.uuid && (i.endpointsByUUID[this._jsPlumb.uuid] = this), this.elementId = i.elementId, this.dragProxy = i.dragProxy, this._jsPlumb.connectionCost = i.connectionCost, this._jsPlumb.connectionsDirected = i.connectionsDirected, this._jsPlumb.currentAnchorClass = "", this._jsPlumb.events = {};var a = !0 === i.deleteOnEmpty;this.setDeleteOnEmpty = function (t) {
        a = t;
      };var l = function () {
        var e = s.endpointAnchorClassPrefix + "-" + this._jsPlumb.currentAnchorClass;this._jsPlumb.currentAnchorClass = this.anchor.getCssClass();var n = s.endpointAnchorClassPrefix + (this._jsPlumb.currentAnchorClass ? "-" + this._jsPlumb.currentAnchorClass : "");this.removeClass(e), this.addClass(n), t.updateClasses(this.element, n, e);
      }.bind(this);this.prepareAnchor = function (t) {
        var e = this._jsPlumb.instance.makeAnchor(t, this.elementId, s);return e.bind("anchorChanged", function (t) {
          this.fire("anchorChanged", { endpoint: this, anchor: t }), l();
        }.bind(this)), e;
      }, this.setPreparedAnchor = function (t, e) {
        return this._jsPlumb.instance.continuousAnchorFactory.clear(this.elementId), this.anchor = t, l(), e || this._jsPlumb.instance.repaint(this.elementId), this;
      }, this.setAnchor = function (t, e) {
        var n = this.prepareAnchor(t);return this.setPreparedAnchor(n, e), this;
      };var u = function (t) {
        if (this.connections.length > 0) for (var e = 0; e < this.connections.length; e++) {
          this.connections[e].setHover(t, !1);
        } else this.setHover(t);
      }.bind(this);this.bind("mouseover", function () {
        u(!0);
      }), this.bind("mouseout", function () {
        u(!1);
      }), i._transient || this._jsPlumb.instance.anchorManager.add(this, this.elementId), this.prepareEndpoint = function (n, o) {
        var r,
            a = function a(e, n) {
          var i = s.getRenderMode();if (t.Endpoints[i][e]) return new t.Endpoints[i][e](n);if (!s.Defaults.DoNotThrowErrors) throw { msg: "jsPlumb: unknown endpoint type '" + e + "'" };
        },
            l = { _jsPlumb: this._jsPlumb.instance, cssClass: i.cssClass, container: i.container, tooltip: i.tooltip, connectorTooltip: i.connectorTooltip, endpoint: this };return e.isString(n) ? r = a(n, l) : e.isArray(n) ? (l = e.merge(n[1], l), r = a(n[0], l)) : r = n.clone(), r.clone = function () {
          return e.isString(n) ? a(n, l) : e.isArray(n) ? (l = e.merge(n[1], l), a(n[0], l)) : void 0;
        }.bind(this), r.typeId = o, r;
      }, this.setEndpoint = function (t, e) {
        var n = this.prepareEndpoint(t);this.setPreparedEndpoint(n, !0);
      }, this.setPreparedEndpoint = function (t, e) {
        null != this.endpoint && (this.endpoint.cleanup(), this.endpoint.destroy()), this.endpoint = t, this.type = this.endpoint.type, this.canvas = this.endpoint.canvas;
      }, t.extend(this, i, n), this.isSource = i.isSource || !1, this.isTemporarySource = i.isTemporarySource || !1, this.isTarget = i.isTarget || !1, this.connections = i.connections || [], this.connectorPointerEvents = i["connector-pointer-events"], this.scope = i.scope || s.getDefaultScope(), this.timestamp = null, this.reattachConnections = i.reattach || s.Defaults.ReattachConnections, this.connectionsDetachable = s.Defaults.ConnectionsDetachable, !1 !== i.connectionsDetachable && !1 !== i.detachable || (this.connectionsDetachable = !1), this.dragAllowedWhenFull = !1 !== i.dragAllowedWhenFull, i.onMaxConnections && this.bind("maxConnections", i.onMaxConnections), this.addConnection = function (t) {
        this.connections.push(t), this[(this.connections.length > 0 ? "add" : "remove") + "Class"](s.endpointConnectedClass), this[(this.isFull() ? "add" : "remove") + "Class"](s.endpointFullClass);
      }, this.detachFromConnection = function (t, e, n) {
        (e = null == e ? this.connections.indexOf(t) : e) >= 0 && (this.connections.splice(e, 1), this[(this.connections.length > 0 ? "add" : "remove") + "Class"](s.endpointConnectedClass), this[(this.isFull() ? "add" : "remove") + "Class"](s.endpointFullClass)), !n && a && 0 === this.connections.length && s.deleteObject({ endpoint: this, fireEvent: !1, deleteAttachedObjects: !0 !== n });
      }, this.deleteEveryConnection = function (t) {
        for (var e = this.connections.length, n = 0; n < e; n++) {
          s.deleteConnection(this.connections[0], t);
        }
      }, this.detachFrom = function (t, e, n) {
        for (var i = [], o = 0; o < this.connections.length; o++) {
          this.connections[o].endpoints[1] !== t && this.connections[o].endpoints[0] !== t || i.push(this.connections[o]);
        }for (var r = 0, a = i.length; r < a; r++) {
          s.deleteConnection(i[0]);
        }return this;
      }, this.getElement = function () {
        return this.element;
      }, this.setElement = function (n) {
        var o = this._jsPlumb.instance.getId(n),
            r = this.elementId;return e.removeWithFunction(i.endpointsByElement[this.elementId], function (t) {
          return t.id === this.id;
        }.bind(this)), this.element = t.getElement(n), this.elementId = s.getId(this.element), s.anchorManager.rehomeEndpoint(this, r, this.element), s.dragManager.endpointAdded(this.element), e.addToList(i.endpointsByElement, o, this), this;
      }, this.makeInPlaceCopy = function () {
        var t = this.anchor.getCurrentLocation({ element: this }),
            e = this.anchor.getOrientation(this),
            n = this.anchor.getCssClass(),
            s = { bind: function bind() {}, compute: function compute() {
            return [t[0], t[1]];
          }, getCurrentLocation: function getCurrentLocation() {
            return [t[0], t[1]];
          }, getOrientation: function getOrientation() {
            return e;
          }, getCssClass: function getCssClass() {
            return n;
          } };return r({ dropOptions: i.dropOptions, anchor: s, source: this.element, paintStyle: this.getPaintStyle(), endpoint: i.hideOnDrag ? "Blank" : this.endpoint, _transient: !0, scope: this.scope, reference: this });
      }, this.connectorSelector = function () {
        var t = this.connections[0];return t || (this.connections.length < this._jsPlumb.maxConnections || -1 === this._jsPlumb.maxConnections ? null : t);
      }, this.setStyle = this.setPaintStyle, this.paint = function (t) {
        var e = (t = t || {}).timestamp,
            n = !(!1 === t.recalc);if (!e || this.timestamp !== e) {
          var i = s.updateOffset({ elId: this.elementId, timestamp: e }),
              o = t.offset ? t.offset.o : i.o;if (null != o) {
            var r = t.anchorPoint,
                a = t.connectorPaintStyle;if (null == r) {
              var l = t.dimensions || i.s,
                  u = { xy: [o.left, o.top], wh: l, element: this, timestamp: e };if (n && this.anchor.isDynamic && this.connections.length > 0) {
                var c = function (t, e) {
                  var n = 0;if (null != e) for (var i = 0; i < t.connections.length; i++) {
                    if (t.connections[i].sourceId === e || t.connections[i].targetId === e) {
                      n = i;break;
                    }
                  }return t.connections[n];
                }(this, t.elementWithPrecedence),
                    h = c.endpoints[0] === this ? 1 : 0,
                    d = 0 === h ? c.sourceId : c.targetId,
                    p = s.getCachedData(d),
                    f = p.o,
                    g = p.s;u.index = 0 === h ? 1 : 0, u.connection = c, u.txy = [f.left, f.top], u.twh = g, u.tElement = c.endpoints[h];
              }r = this.anchor.compute(u);
            }for (var m in this.endpoint.compute(r, this.anchor.getOrientation(this), this._jsPlumb.paintStyleInUse, a || this.paintStyleInUse), this.endpoint.paint(this._jsPlumb.paintStyleInUse, this.anchor), this.timestamp = e, this._jsPlumb.overlays) {
              if (this._jsPlumb.overlays.hasOwnProperty(m)) {
                var v = this._jsPlumb.overlays[m];v.isVisible() && (this._jsPlumb.overlayPlacements[m] = v.draw(this.endpoint, this._jsPlumb.paintStyleInUse), v.paint(this._jsPlumb.overlayPlacements[m]));
              }
            }
          }
        }
      }, this.getTypeDescriptor = function () {
        return "endpoint";
      }, this.isVisible = function () {
        return this._jsPlumb.visible;
      }, this.repaint = this.paint;var c = !1;this.initDraggable = function () {
        if (!c && t.isDragSupported(this.element)) {
          var n,
              a = { id: null, element: null },
              l = null,
              u = !1,
              h = null,
              d = function (t, e, n) {
            var i = !1;return { drag: function drag() {
                if (i) return i = !1, !0;if (e.element) {
                  var s = n.getUIPosition(arguments, n.getZoom());null != s && n.setPosition(e.element, s), n.repaint(e.element, s), t.paint({ anchorPoint: t.anchor.getCurrentLocation({ element: t }) });
                }
              }, stopDrag: function stopDrag() {
                i = !0;
              } };
          }(this, a, s),
              p = i.dragOptions || {},
              f = t.dragEvents.start,
              g = t.dragEvents.stop,
              m = t.dragEvents.drag,
              v = t.dragEvents.beforeStart,
              b = function (c) {
            l = this.connectorSelector();var p = !0;this.isEnabled() || (p = !1), null != l || this.isSource || this.isTemporarySource || (p = !1), !this.isSource || !this.isFull() || null != l && this.dragAllowedWhenFull || (p = !1), null == l || l.isDetachable(this) || (p = !1);var f = s.checkCondition(null == l ? "beforeDrag" : "beforeStartDetach", { endpoint: this, source: this.element, sourceId: this.elementId, connection: l });if (!1 === f ? p = !1 : "object" == (typeof f === "undefined" ? "undefined" : _typeof(f)) ? t.extend(f, n || {}) : f = n || {}, !1 === p) return s.stopDrag && s.stopDrag(this.canvas), d.stopDrag(), !1;for (var g = 0; g < this.connections.length; g++) {
              this.connections[g].setHover(!1);
            }this.addClass("endpointDrag"), s.setConnectionBeingDragged(!0), l && !this.isFull() && this.isSource && (l = null), s.updateOffset({ elId: this.elementId });var m = this._jsPlumb.instance.getOffset(this.canvas),
                v = this.canvas,
                b = this._jsPlumb.instance.getSize(this.canvas);!function (t, e, n, i) {
              var s = e.createElement("div", { position: "absolute" });e.appendElement(s);var o = e.getId(s);e.setPosition(s, n), s.style.width = i[0] + "px", s.style.height = i[1] + "px", e.manage(o, s, !0), t.id = o, t.element = s;
            }(a, s, m, b), s.setAttributes(this.canvas, { dragId: a.id, elId: this.elementId });var y = this.dragProxy || this.endpoint;if (null == this.dragProxy && null != this.connectionType) {
              var P = this._jsPlumb.instance.deriveEndpointAndAnchorSpec(this.connectionType);P.endpoints[1] && (y = P.endpoints[1]);
            }var _ = this._jsPlumb.instance.makeAnchor("Center");_.isFloating = !0, this._jsPlumb.floatingEndpoint = function (e, n, i, s, o, r, a, l) {
              return a({ paintStyle: e, endpoint: i, anchor: new t.FloatingAnchor({ reference: n, referenceCanvas: s, jsPlumbInstance: r }), source: o, scope: l });
            }(this.getPaintStyle(), _, y, this.canvas, a.element, s, r, this.scope);var x = this._jsPlumb.floatingEndpoint.anchor;if (null == l) this.setHover(!1, !1), (l = o({ sourceEndpoint: this, targetEndpoint: this._jsPlumb.floatingEndpoint, source: this.element, target: a.element, anchors: [this.anchor, this._jsPlumb.floatingEndpoint.anchor], paintStyle: i.connectorStyle, hoverPaintStyle: i.connectorHoverStyle, connector: i.connector, overlays: i.connectorOverlays, type: this.connectionType, cssClass: this.connectorClass, hoverClass: this.connectorHoverClass, scope: i.scope, data: f })).pending = !0, l.addClass(s.draggingClass), this._jsPlumb.floatingEndpoint.addClass(s.draggingClass), this._jsPlumb.floatingEndpoint.anchor = x, s.fire("connectionDrag", l), s.anchorManager.newConnection(l);else {
              u = !0, l.setHover(!1);var C = l.endpoints[0].id === this.id ? 0 : 1;this.detachFromConnection(l, null, !0);var E = s.getDragScope(v);s.setAttribute(this.canvas, "originalScope", E), s.fire("connectionDrag", l), 0 === C ? (h = [l.source, l.sourceId, v, E], s.anchorManager.sourceChanged(l.endpoints[C].elementId, a.id, l, a.element)) : (h = [l.target, l.targetId, v, E], l.target = a.element, l.targetId = a.id, s.anchorManager.updateOtherEndpoint(l.sourceId, l.endpoints[C].elementId, l.targetId, l)), l.suspendedEndpoint = l.endpoints[C], l.suspendedElement = l.endpoints[C].getElement(), l.suspendedElementId = l.endpoints[C].elementId, l.suspendedElementType = 0 === C ? "source" : "target", l.suspendedEndpoint.setHover(!1), this._jsPlumb.floatingEndpoint.referenceEndpoint = l.suspendedEndpoint, l.endpoints[C] = this._jsPlumb.floatingEndpoint, l.addClass(s.draggingClass), this._jsPlumb.floatingEndpoint.addClass(s.draggingClass);
            }s.floatingConnections[a.id] = l, e.addToList(i.endpointsByElement, a.id, this._jsPlumb.floatingEndpoint), s.currentlyDragging = !0;
          }.bind(this),
              y = function () {
            if (s.setConnectionBeingDragged(!1), l && null != l.endpoints) {
              var t = s.getDropEvent(arguments),
                  e = s.getFloatingAnchorIndex(l);if (l.endpoints[0 === e ? 1 : 0].anchor.locked = !1, l.removeClass(s.draggingClass), this._jsPlumb && (l.deleteConnectionNow || l.endpoints[e] === this._jsPlumb.floatingEndpoint) && u && l.suspendedEndpoint) {
                0 === e ? (l.floatingElement = l.source, l.floatingId = l.sourceId, l.floatingEndpoint = l.endpoints[0], l.floatingIndex = 0, l.source = h[0], l.sourceId = h[1]) : (l.floatingElement = l.target, l.floatingId = l.targetId, l.floatingEndpoint = l.endpoints[1], l.floatingIndex = 1, l.target = h[0], l.targetId = h[1]);var n = this._jsPlumb.floatingEndpoint;s.setDragScope(h[2], h[3]), l.endpoints[e] = l.suspendedEndpoint, l.isReattach() || l._forceReattach || l._forceDetach || !s.deleteConnection(l, { originalEvent: t }) ? (l.setHover(!1), l._forceDetach = null, l._forceReattach = null, this._jsPlumb.floatingEndpoint.detachFromConnection(l), l.suspendedEndpoint.addConnection(l), 1 === e ? s.anchorManager.updateOtherEndpoint(l.sourceId, l.floatingId, l.targetId, l) : s.anchorManager.sourceChanged(l.floatingId, l.sourceId, l, l.source), s.repaint(h[1])) : s.deleteObject({ endpoint: n });
              }this.deleteAfterDragStop ? s.deleteObject({ endpoint: this }) : this._jsPlumb && this.paint({ recalc: !1 }), s.fire("connectionDragStop", l, t), l.pending && s.fire("connectionAborted", l, t), s.currentlyDragging = !1, l.suspendedElement = null, l.suspendedEndpoint = null, l = null;
            }a && a.element && s.remove(a.element, !1, !1), this._jsPlumb && (this.canvas.style.visibility = "visible", this.anchor.locked = !1, this._jsPlumb.floatingEndpoint = null);
          }.bind(this);(p = t.extend({}, p)).scope = this.scope || p.scope, p[v] = e.wrap(p[v], function (t) {
            n = t.e.payload || {};
          }, !1), p[f] = e.wrap(p[f], b, !1), p[m] = e.wrap(p[m], d.drag), p[g] = e.wrap(p[g], y), p.multipleDrop = !1, p.canDrag = function () {
            return this.isSource || this.isTemporarySource || this.connections.length > 0;
          }.bind(this), s.initDraggable(this.canvas, p, "internal"), this.canvas._jsPlumbRelatedElement = this.element, c = !0;
        }
      };var h = i.endpoint || this._jsPlumb.instance.Defaults.Endpoint || t.Defaults.Endpoint;this.setEndpoint(h, !0);var d = i.anchor ? i.anchor : i.anchors ? i.anchors : s.Defaults.Anchor || "Top";this.setAnchor(d, !0);var p = ["default", i.type || ""].join(" ");this.addType(p, i.data, !0), this.canvas = this.endpoint.canvas, this.canvas._jsPlumb = this, this.initDraggable();var f = function (n, o, r, a) {
        if (t.isDropSupported(this.element)) {
          var l = i.dropOptions || s.Defaults.DropOptions || t.Defaults.DropOptions;(l = t.extend({}, l)).scope = l.scope || this.scope;var u = t.dragEvents.drop,
              c = t.dragEvents.over,
              h = t.dragEvents.out,
              d = this,
              p = s.EndpointDropHandler({ getEndpoint: function getEndpoint() {
              return d;
            }, jsPlumb: s, enabled: function enabled() {
              return null == r || r.isEnabled();
            }, isFull: function isFull() {
              return r.isFull();
            }, element: this.element, elementId: this.elementId, isSource: this.isSource, isTarget: this.isTarget, addClass: function addClass(t) {
              d.addClass(t);
            }, removeClass: function removeClass(t) {
              d.removeClass(t);
            }, isDropAllowed: function isDropAllowed() {
              return d.isDropAllowed.apply(d, arguments);
            }, reference: a, isRedrop: function isRedrop(t, e) {
              return t.suspendedEndpoint && e.reference && t.suspendedEndpoint.id === e.reference.id;
            } });l[u] = e.wrap(l[u], p, !0), l[c] = e.wrap(l[c], function () {
            var e = t.getDragObject(arguments),
                n = s.getAttribute(t.getElement(e), "dragId"),
                i = s.floatingConnections[n];if (null != i) {
              var o = s.getFloatingAnchorIndex(i);if (this.isTarget && 0 !== o || i.suspendedEndpoint && this.referenceEndpoint && this.referenceEndpoint.id === i.suspendedEndpoint.id) {
                var r = s.checkCondition("checkDropAllowed", { sourceEndpoint: i.endpoints[o], targetEndpoint: this, connection: i });this[(r ? "add" : "remove") + "Class"](s.endpointDropAllowedClass), this[(r ? "remove" : "add") + "Class"](s.endpointDropForbiddenClass), i.endpoints[o].anchor.over(this.anchor, this);
              }
            }
          }.bind(this)), l[h] = e.wrap(l[h], function () {
            var e = t.getDragObject(arguments),
                n = null == e ? null : s.getAttribute(t.getElement(e), "dragId"),
                i = n ? s.floatingConnections[n] : null;if (null != i) {
              var o = s.getFloatingAnchorIndex(i);(this.isTarget && 0 !== o || i.suspendedEndpoint && this.referenceEndpoint && this.referenceEndpoint.id === i.suspendedEndpoint.id) && (this.removeClass(s.endpointDropAllowedClass), this.removeClass(s.endpointDropForbiddenClass), i.endpoints[o].anchor.out());
            }
          }.bind(this)), s.initDroppable(n, l, "internal", o);
        }
      }.bind(this);return this.anchor.isFloating || f(this.canvas, !(i._transient || this.anchor.isFloating), this, i.reference), this;
    }, e.extend(t.Endpoint, t.OverlayCapableJsPlumbUIComponent, { setVisible: function setVisible(t, e, n) {
        if (this._jsPlumb.visible = t, this.canvas && (this.canvas.style.display = t ? "block" : "none"), this[t ? "showOverlays" : "hideOverlays"](), !e) for (var i = 0; i < this.connections.length; i++) {
          if (this.connections[i].setVisible(t), !n) {
            var s = this === this.connections[i].endpoints[0] ? 1 : 0;1 === this.connections[i].endpoints[s].connections.length && this.connections[i].endpoints[s].setVisible(t, !0, !0);
          }
        }
      }, getAttachedElements: function getAttachedElements() {
        return this.connections;
      }, applyType: function applyType(e, i) {
        this.setPaintStyle(e.endpointStyle || e.paintStyle, i), this.setHoverPaintStyle(e.endpointHoverStyle || e.hoverPaintStyle, i), null != e.maxConnections && (this._jsPlumb.maxConnections = e.maxConnections), e.scope && (this.scope = e.scope), t.extend(this, e, n), null != e.cssClass && this.canvas && this._jsPlumb.instance.addClass(this.canvas, e.cssClass), t.OverlayCapableJsPlumbUIComponent.applyType(this, e);
      }, isEnabled: function isEnabled() {
        return this._jsPlumb.enabled;
      }, setEnabled: function setEnabled(t) {
        this._jsPlumb.enabled = t;
      }, cleanup: function cleanup() {
        var e = this._jsPlumb.instance.endpointAnchorClassPrefix + (this._jsPlumb.currentAnchorClass ? "-" + this._jsPlumb.currentAnchorClass : "");t.removeClass(this.element, e), this.anchor = null, this.endpoint.cleanup(!0), this.endpoint.destroy(), this.endpoint = null, this._jsPlumb.instance.destroyDraggable(this.canvas, "internal"), this._jsPlumb.instance.destroyDroppable(this.canvas, "internal");
      }, setHover: function setHover(t) {
        this.endpoint && this._jsPlumb && !this._jsPlumb.instance.isConnectionBeingDragged() && this.endpoint.setHover(t);
      }, isFull: function isFull() {
        return 0 === this._jsPlumb.maxConnections || !(this.isFloating() || this._jsPlumb.maxConnections < 0 || this.connections.length < this._jsPlumb.maxConnections);
      }, isFloating: function isFloating() {
        return null != this.anchor && this.anchor.isFloating;
      }, isConnectedTo: function isConnectedTo(t) {
        var e = !1;if (t) for (var n = 0; n < this.connections.length; n++) {
          if (this.connections[n].endpoints[1] === t || this.connections[n].endpoints[0] === t) {
            e = !0;break;
          }
        }return e;
      }, getConnectionCost: function getConnectionCost() {
        return this._jsPlumb.connectionCost;
      }, setConnectionCost: function setConnectionCost(t) {
        this._jsPlumb.connectionCost = t;
      }, areConnectionsDirected: function areConnectionsDirected() {
        return this._jsPlumb.connectionsDirected;
      }, setConnectionsDirected: function setConnectionsDirected(t) {
        this._jsPlumb.connectionsDirected = t;
      }, setElementId: function setElementId(t) {
        this.elementId = t, this.anchor.elementId = t;
      }, setReferenceElement: function setReferenceElement(e) {
        this.element = t.getElement(e);
      }, setDragAllowedWhenFull: function setDragAllowedWhenFull(t) {
        this.dragAllowedWhenFull = t;
      }, equals: function equals(t) {
        return this.anchor.equals(t.anchor);
      }, getUuid: function getUuid() {
        return this._jsPlumb.uuid;
      }, computeAnchor: function computeAnchor(t) {
        return this.anchor.compute(t);
      } }), this.jsPlumbInstance.prototype.EndpointDropHandler = function (t) {
      return function (n) {
        var i = t.jsPlumb;t.removeClass(i.endpointDropAllowedClass), t.removeClass(i.endpointDropForbiddenClass);var s = i.getDropEvent(arguments),
            o = i.getDragObject(arguments),
            r = i.getAttribute(o, "dragId"),
            a = (i.getAttribute(o, "elId"), i.getAttribute(o, "originalScope")),
            l = i.floatingConnections[r];if (null != l) {
          var u = null != l.suspendedEndpoint;if (!u || null != l.suspendedEndpoint._jsPlumb) {
            var c = t.getEndpoint(l);if (null != c) {
              if (t.isRedrop(l, t)) return l._forceReattach = !0, l.setHover(!1), void (t.maybeCleanup && t.maybeCleanup(c));var h = i.getFloatingAnchorIndex(l);if (0 === h && !t.isSource || 1 === h && !t.isTarget) t.maybeCleanup && t.maybeCleanup(c);else {
                t.onDrop && t.onDrop(l), a && i.setDragScope(o, a);var d = t.isFull(n);if (d && c.fire("maxConnections", { endpoint: this, connection: l, maxConnections: c._jsPlumb.maxConnections }, s), !d && t.enabled()) {
                  var p = !0;0 === h ? (l.floatingElement = l.source, l.floatingId = l.sourceId, l.floatingEndpoint = l.endpoints[0], l.floatingIndex = 0, l.source = t.element, l.sourceId = t.elementId) : (l.floatingElement = l.target, l.floatingId = l.targetId, l.floatingEndpoint = l.endpoints[1], l.floatingIndex = 1, l.target = t.element, l.targetId = t.elementId), u && l.suspendedEndpoint.id !== c.id && (l.isDetachAllowed(l) && l.endpoints[h].isDetachAllowed(l) && l.suspendedEndpoint.isDetachAllowed(l) && i.checkCondition("beforeDetach", l) || (p = !1));var f = function (n) {
                    l.endpoints[h].detachFromConnection(l), l.suspendedEndpoint && l.suspendedEndpoint.detachFromConnection(l), l.endpoints[h] = c, c.addConnection(l);var o = c.getParameters();for (var r in o) {
                      l.setParameter(r, o[r]);
                    }if (u) {
                      var a = l.suspendedEndpoint.elementId;i.fireMoveEvent({ index: h, originalSourceId: 0 === h ? a : l.sourceId, newSourceId: 0 === h ? c.elementId : l.sourceId, originalTargetId: 1 === h ? a : l.targetId, newTargetId: 1 === h ? c.elementId : l.targetId, originalSourceEndpoint: 0 === h ? l.suspendedEndpoint : l.endpoints[0], newSourceEndpoint: 0 === h ? c : l.endpoints[0], originalTargetEndpoint: 1 === h ? l.suspendedEndpoint : l.endpoints[1], newTargetEndpoint: 1 === h ? c : l.endpoints[1], connection: l }, s);
                    } else o.draggable && i.initDraggable(this.element, t.dragOptions, "internal", i);(1 === h ? i.anchorManager.updateOtherEndpoint(l.sourceId, l.floatingId, l.targetId, l) : i.anchorManager.sourceChanged(l.floatingId, l.sourceId, l, l.source), l.endpoints[0].finalEndpoint) && (l.endpoints[0].detachFromConnection(l), l.endpoints[0] = l.endpoints[0].finalEndpoint, l.endpoints[0].addConnection(l));e.isObject(n) && l.mergeData(n), i.finaliseConnection(l, null, s, !1), l.setHover(!1);
                  }.bind(this);if (p = p && t.isDropAllowed(l.sourceId, l.targetId, l.scope, l, c)) return f(p), !0;l.suspendedEndpoint && (l.endpoints[h] = l.suspendedEndpoint, l.setHover(!1), l._forceDetach = !0, 0 === h ? (l.source = l.suspendedEndpoint.element, l.sourceId = l.suspendedEndpoint.elementId) : (l.target = l.suspendedEndpoint.element, l.targetId = l.suspendedEndpoint.elementId), l.suspendedEndpoint.addConnection(l), 1 === h ? i.anchorManager.updateOtherEndpoint(l.sourceId, l.floatingId, l.targetId, l) : i.anchorManager.sourceChanged(l.floatingId, l.sourceId, l, l.source), i.repaint(l.sourceId), l._forceDetach = !1);
                }t.maybeCleanup && t.maybeCleanup(c), i.currentlyDragging = !1;
              }
            }
          }
        }
      };
    };
  }.call("undefined" != typeof window ? window : k), function () {
    var t = this,
        e = t.jsPlumb,
        n = t.jsPlumbUtil,
        i = function i(t, n, _i3, s, o) {
      if (!t.Defaults.DoNotThrowErrors && null == e.Connectors[n][_i3]) throw { msg: "jsPlumb: unknown connector type '" + _i3 + "'" };return new e.Connectors[n][_i3](s, o);
    },
        s = function s(t, e, n) {
      return t ? n.makeAnchor(t, e, n) : null;
    },
        o = function o(t, e, i, s) {
      null != e && (e._jsPlumbConnections = e._jsPlumbConnections || {}, s ? delete e._jsPlumbConnections[t.id] : e._jsPlumbConnections[t.id] = !0, n.isEmpty(e._jsPlumbConnections) ? i.removeClass(e, i.connectedClass) : i.addClass(e, i.connectedClass));
    };e.Connection = function (t) {
      var i = t.newEndpoint;this.id = t.id, this.connector = null, this.idPrefix = "_jsplumb_c_", this.defaultLabelLocation = .5, this.defaultOverlayKeys = ["Overlays", "ConnectionOverlays"], this.previousConnection = t.previousConnection, this.source = e.getElement(t.source), this.target = e.getElement(t.target), t.sourceEndpoint && (this.source = t.sourceEndpoint.getElement()), t.targetEndpoint && (this.target = t.targetEndpoint.getElement()), e.OverlayCapableJsPlumbUIComponent.apply(this, arguments), this.sourceId = this._jsPlumb.instance.getId(this.source), this.targetId = this._jsPlumb.instance.getId(this.target), this.scope = t.scope, this.endpoints = [], this.endpointStyles = [];var s = this._jsPlumb.instance;s.manage(this.sourceId, this.source), s.manage(this.targetId, this.target), this._jsPlumb.visible = !0, this._jsPlumb.editable = !0 === t.editable, this._jsPlumb.params = { cssClass: t.cssClass, container: t.container, "pointer-events": t["pointer-events"], editorParams: t.editorParams, overlays: t.overlays }, this._jsPlumb.lastPaintedAt = null, this.bind("mouseover", function () {
        this.setHover(!0);
      }.bind(this)), this.bind("mouseout", function () {
        this.setHover(!1);
      }.bind(this)), this.editableRequested = !1 !== t.editable, this.setEditable = function (t) {
        return !!this.connector && this.connector.setEditable(t);
      }, this.isEditable = function () {
        return !!this.connector && this.connector.isEditable();
      }, this.isEditing = function () {
        return !!this.connector && this.connector.isEditing();
      }, this.makeEndpoint = function (e, n, o, r) {
        return o = o || this._jsPlumb.instance.getId(n), this.prepareEndpoint(s, i, this, r, e ? 0 : 1, t, n, o);
      }, t.type && (t.endpoints = t.endpoints || this._jsPlumb.instance.deriveEndpointAndAnchorSpec(t.type).endpoints);var o = this.makeEndpoint(!0, this.source, this.sourceId, t.sourceEndpoint),
          r = this.makeEndpoint(!1, this.target, this.targetId, t.targetEndpoint);o && n.addToList(t.endpointsByElement, this.sourceId, o), r && n.addToList(t.endpointsByElement, this.targetId, r), this.scope || (this.scope = this.endpoints[0].scope), null != t.deleteEndpointsOnEmpty && (this.endpoints[0].setDeleteOnEmpty(t.deleteEndpointsOnEmpty), this.endpoints[1].setDeleteOnEmpty(t.deleteEndpointsOnEmpty));var a = s.Defaults.ConnectionsDetachable;!1 === t.detachable && (a = !1), !1 === this.endpoints[0].connectionsDetachable && (a = !1), !1 === this.endpoints[1].connectionsDetachable && (a = !1);var l = t.reattach || this.endpoints[0].reattachConnections || this.endpoints[1].reattachConnections || s.Defaults.ReattachConnections;this.appendToDefaultType({ detachable: a, reattach: l, paintStyle: this.endpoints[0].connectorStyle || this.endpoints[1].connectorStyle || t.paintStyle || s.Defaults.PaintStyle || e.Defaults.PaintStyle, hoverPaintStyle: this.endpoints[0].connectorHoverStyle || this.endpoints[1].connectorHoverStyle || t.hoverPaintStyle || s.Defaults.HoverPaintStyle || e.Defaults.HoverPaintStyle });var u = s.getSuspendedAt();if (!s.isSuspendDrawing()) {
        var c = s.getCachedData(this.sourceId),
            h = c.o,
            d = c.s,
            p = s.getCachedData(this.targetId),
            f = p.o,
            g = p.s,
            m = u || s.timestamp(),
            v = this.endpoints[0].anchor.compute({ xy: [h.left, h.top], wh: d, element: this.endpoints[0], elementId: this.endpoints[0].elementId, txy: [f.left, f.top], twh: g, tElement: this.endpoints[1], timestamp: m });this.endpoints[0].paint({ anchorLoc: v, timestamp: m }), v = this.endpoints[1].anchor.compute({ xy: [f.left, f.top], wh: g, element: this.endpoints[1], elementId: this.endpoints[1].elementId, txy: [h.left, h.top], twh: d, tElement: this.endpoints[0], timestamp: m }), this.endpoints[1].paint({ anchorLoc: v, timestamp: m });
      }this.getTypeDescriptor = function () {
        return "connection";
      }, this.getAttachedElements = function () {
        return this.endpoints;
      }, this.isDetachable = function () {
        return !0 === this._jsPlumb.detachable;
      }, this.setDetachable = function (t) {
        this._jsPlumb.detachable = !0 === t;
      }, this.isReattach = function () {
        return !0 === this._jsPlumb.reattach || !0 === this.endpoints[0].reattachConnections || !0 === this.endpoints[1].reattachConnections;
      }, this.setReattach = function (t) {
        this._jsPlumb.reattach = !0 === t;
      }, this._jsPlumb.cost = t.cost || this.endpoints[0].getConnectionCost(), this._jsPlumb.directed = t.directed, null == t.directed && (this._jsPlumb.directed = this.endpoints[0].areConnectionsDirected());var b = e.extend({}, this.endpoints[1].getParameters());e.extend(b, this.endpoints[0].getParameters()), e.extend(b, this.getParameters()), this.setParameters(b), this.setConnector(this.endpoints[0].connector || this.endpoints[1].connector || t.connector || s.Defaults.Connector || e.Defaults.Connector, !0), t.geometry && this.connector.setGeometry(t.geometry);var y = null != t.data && n.isObject(t.data) ? t.data : {};this.getData = function () {
        return y;
      }, this.setData = function (t) {
        y = t || {};
      }, this.mergeData = function (t) {
        y = e.extend(y, t);
      };var P = ["default", this.endpoints[0].connectionType, this.endpoints[1].connectionType, t.type].join(" ");/[^\s]/.test(P) && this.addType(P, t.data, !0), this.updateConnectedClass();
    }, n.extend(e.Connection, e.OverlayCapableJsPlumbUIComponent, { applyType: function applyType(t, n, i) {
        var s = null;null != t.connector && (null == (s = this.getCachedTypeItem("connector", i.connector)) && (s = this.prepareConnector(t.connector, i.connector), this.cacheTypeItem("connector", s, i.connector)), this.setPreparedConnector(s)), null != t.detachable && this.setDetachable(t.detachable), null != t.reattach && this.setReattach(t.reattach), t.scope && (this.scope = t.scope), null != t.cssClass && this.canvas && this._jsPlumb.instance.addClass(this.canvas, t.cssClass);var o = null;t.anchor ? null == (o = this.getCachedTypeItem("anchors", i.anchor)) && (o = [this._jsPlumb.instance.makeAnchor(t.anchor), this._jsPlumb.instance.makeAnchor(t.anchor)], this.cacheTypeItem("anchors", o, i.anchor)) : t.anchors && null == (o = this.getCachedTypeItem("anchors", i.anchors)) && (o = [this._jsPlumb.instance.makeAnchor(t.anchors[0]), this._jsPlumb.instance.makeAnchor(t.anchors[1])], this.cacheTypeItem("anchors", o, i.anchors)), null != o && (this.endpoints[0].anchor = o[0], this.endpoints[1].anchor = o[1], this.endpoints[1].anchor.isDynamic && this._jsPlumb.instance.repaint(this.endpoints[1].elementId)), e.OverlayCapableJsPlumbUIComponent.applyType(this, t);
      }, addClass: function addClass(t, e) {
        e && (this.endpoints[0].addClass(t), this.endpoints[1].addClass(t), this.suspendedEndpoint && this.suspendedEndpoint.addClass(t)), this.connector && this.connector.addClass(t);
      }, removeClass: function removeClass(t, e) {
        e && (this.endpoints[0].removeClass(t), this.endpoints[1].removeClass(t), this.suspendedEndpoint && this.suspendedEndpoint.removeClass(t)), this.connector && this.connector.removeClass(t);
      }, isVisible: function isVisible() {
        return this._jsPlumb.visible;
      }, setVisible: function setVisible(t) {
        this._jsPlumb.visible = t, this.connector && this.connector.setVisible(t), this.repaint();
      }, cleanup: function cleanup() {
        this.updateConnectedClass(!0), this.endpoints = null, this.source = null, this.target = null, null != this.connector && (this.connector.cleanup(!0), this.connector.destroy(!0)), this.connector = null;
      }, updateConnectedClass: function updateConnectedClass(t) {
        this._jsPlumb && (o(this, this.source, this._jsPlumb.instance, t), o(this, this.target, this._jsPlumb.instance, t));
      }, setHover: function setHover(e) {
        this.connector && this._jsPlumb && !this._jsPlumb.instance.isConnectionBeingDragged() && (this.connector.setHover(e), t.jsPlumb[e ? "addClass" : "removeClass"](this.source, this._jsPlumb.instance.hoverSourceClass), t.jsPlumb[e ? "addClass" : "removeClass"](this.target, this._jsPlumb.instance.hoverTargetClass));
      }, getUuids: function getUuids() {
        return [this.endpoints[0].getUuid(), this.endpoints[1].getUuid()];
      }, getCost: function getCost() {
        return this._jsPlumb ? this._jsPlumb.cost : -1 / 0;
      }, setCost: function setCost(t) {
        this._jsPlumb.cost = t;
      }, isDirected: function isDirected() {
        return !0 === this._jsPlumb.directed;
      }, getConnector: function getConnector() {
        return this.connector;
      }, getGeometry: function getGeometry() {
        return this.connector ? this.connector.getGeometry() : null;
      }, setGeometry: function setGeometry(t) {
        this.connector && this.connector.setGeometry(t);
      }, prepareConnector: function prepareConnector(t, e) {
        var s,
            o = { _jsPlumb: this._jsPlumb.instance, cssClass: (this._jsPlumb.params.cssClass || "") + (this.isEditable() ? this._jsPlumb.instance.editableConnectorClass : ""), container: this._jsPlumb.params.container, "pointer-events": this._jsPlumb.params["pointer-events"], editable: this.editableRequested },
            r = this._jsPlumb.instance.getRenderMode();return n.isString(t) ? s = i(this._jsPlumb.instance, r, t, o, this) : n.isArray(t) && (s = 1 === t.length ? i(this._jsPlumb.instance, r, t[0], o, this) : i(this._jsPlumb.instance, r, t[0], n.merge(t[1], o), this)), null != e && (s.typeId = e), s;
      }, setPreparedConnector: function setPreparedConnector(t, e, n, i) {
        var s,
            o = "";if (null != this.connector && (o = (s = this.connector).getClass(), this.connector.cleanup(), this.connector.destroy()), this.connector = t, i && this.cacheTypeItem("connector", t, i), this.canvas = this.connector.canvas, this.bgCanvas = this.connector.bgCanvas, this.addClass(o), this.canvas && (this.canvas._jsPlumb = this), this.bgCanvas && (this.bgCanvas._jsPlumb = this), null != s) for (var r = this.getOverlays(), a = 0; a < r.length; a++) {
          r[a].transfer && r[a].transfer(this.connector);
        }n || this.setListenerComponent(this.connector), e || this.repaint();
      }, setConnector: function setConnector(t, e, n, i) {
        var s = this.prepareConnector(t, i);this.setPreparedConnector(s, e, n, i);
      }, paint: function paint(t) {
        if (!this._jsPlumb.instance.isSuspendDrawing() && this._jsPlumb.visible) {
          var e = (t = t || {}).timestamp,
              n = this.targetId,
              i = this.sourceId;if (null == e || e !== this._jsPlumb.lastPaintedAt) {
            var s = this._jsPlumb.instance.updateOffset({ elId: i }).o,
                o = this._jsPlumb.instance.updateOffset({ elId: n }).o,
                r = this.endpoints[0],
                a = this.endpoints[1],
                l = r.anchor.getCurrentLocation({ xy: [s.left, s.top], wh: [s.width, s.height], element: r, timestamp: e }),
                u = a.anchor.getCurrentLocation({ xy: [o.left, o.top], wh: [o.width, o.height], element: a, timestamp: e });this.connector.resetBounds(), this.connector.compute({ sourcePos: l, targetPos: u, sourceEndpoint: this.endpoints[0], targetEndpoint: this.endpoints[1], "stroke-width": this._jsPlumb.paintStyleInUse.strokeWidth, sourceInfo: s, targetInfo: o });var c = { minX: 1 / 0, minY: 1 / 0, maxX: -1 / 0, maxY: -1 / 0 };for (var h in this._jsPlumb.overlays) {
              if (this._jsPlumb.overlays.hasOwnProperty(h)) {
                var d = this._jsPlumb.overlays[h];d.isVisible() && (this._jsPlumb.overlayPlacements[h] = d.draw(this.connector, this._jsPlumb.paintStyleInUse, this.getAbsoluteOverlayPosition(d)), c.minX = Math.min(c.minX, this._jsPlumb.overlayPlacements[h].minX), c.maxX = Math.max(c.maxX, this._jsPlumb.overlayPlacements[h].maxX), c.minY = Math.min(c.minY, this._jsPlumb.overlayPlacements[h].minY), c.maxY = Math.max(c.maxY, this._jsPlumb.overlayPlacements[h].maxY));
              }
            }var p = parseFloat(this._jsPlumb.paintStyleInUse.strokeWidth || 1) / 2,
                f = parseFloat(this._jsPlumb.paintStyleInUse.strokeWidth || 0),
                g = { xmin: Math.min(this.connector.bounds.minX - (p + f), c.minX), ymin: Math.min(this.connector.bounds.minY - (p + f), c.minY), xmax: Math.max(this.connector.bounds.maxX + (p + f), c.maxX), ymax: Math.max(this.connector.bounds.maxY + (p + f), c.maxY) };for (var m in this.connector.paint(this._jsPlumb.paintStyleInUse, null, g), this._jsPlumb.overlays) {
              if (this._jsPlumb.overlays.hasOwnProperty(m)) {
                var v = this._jsPlumb.overlays[m];v.isVisible() && v.paint(this._jsPlumb.overlayPlacements[m], g);
              }
            }
          }this._jsPlumb.lastPaintedAt = e;
        }
      }, repaint: function repaint(t) {
        t = t || {}, this.paint({ elId: this.sourceId, recalc: !(!1 === t.recalc), timestamp: t.timestamp });
      }, prepareEndpoint: function prepareEndpoint(t, n, i, o, r, a, l, u) {
        var c;if (o) i.endpoints[r] = o, o.addConnection(i);else {
          a.endpoints || (a.endpoints = [null, null]);var h = a.endpoints[r] || a.endpoint || t.Defaults.Endpoints[r] || e.Defaults.Endpoints[r] || t.Defaults.Endpoint || e.Defaults.Endpoint;a.endpointStyles || (a.endpointStyles = [null, null]), a.endpointHoverStyles || (a.endpointHoverStyles = [null, null]);var d = a.endpointStyles[r] || a.endpointStyle || t.Defaults.EndpointStyles[r] || e.Defaults.EndpointStyles[r] || t.Defaults.EndpointStyle || e.Defaults.EndpointStyle;null == d.fill && null != a.paintStyle && (d.fill = a.paintStyle.stroke), null == d.outlineStroke && null != a.paintStyle && (d.outlineStroke = a.paintStyle.outlineStroke), null == d.outlineWidth && null != a.paintStyle && (d.outlineWidth = a.paintStyle.outlineWidth);var p = a.endpointHoverStyles[r] || a.endpointHoverStyle || t.Defaults.EndpointHoverStyles[r] || e.Defaults.EndpointHoverStyles[r] || t.Defaults.EndpointHoverStyle || e.Defaults.EndpointHoverStyle;null != a.hoverPaintStyle && (null == p && (p = {}), null == p.fill && (p.fill = a.hoverPaintStyle.stroke));var f = a.anchors ? a.anchors[r] : a.anchor ? a.anchor : s(t.Defaults.Anchors[r], u, t) || s(e.Defaults.Anchors[r], u, t) || s(t.Defaults.Anchor, u, t) || s(e.Defaults.Anchor, u, t);c = n({ paintStyle: d, hoverPaintStyle: p, endpoint: h, connections: [i], uuid: a.uuids ? a.uuids[r] : null, anchor: f, source: l, scope: a.scope, reattach: a.reattach || t.Defaults.ReattachConnections, detachable: a.detachable || t.Defaults.ConnectionsDetachable }), null == o && c.setDeleteOnEmpty(!0), i.endpoints[r] = c, !1 === a.drawEndpoints && c.setVisible(!1, !0, !0);
        }return c;
      } });
  }.call("undefined" != typeof window ? window : k), function () {
    var t = this.jsPlumbUtil,
        e = this.jsPlumb;e.AnchorManager = function (n) {
      var i = {},
          s = {},
          o = {},
          r = {},
          a = "identity",
          l = ["left", "top", "right", "bottom"],
          u = {},
          c = this,
          h = {},
          d = n.jsPlumbInstance,
          p = {},
          f = function f(t, e, n, i, s, o) {
        if (t === e) return { orientation: a, a: ["top", "top"] };var r = Math.atan2(i.centery - n.centery, i.centerx - n.centerx),
            u = Math.atan2(n.centery - i.centery, n.centerx - i.centerx),
            c = [],
            h = {};!function (t, e) {
          for (var n = 0; n < t.length; n++) {
            h[t[n]] = { left: [e[n].left, e[n].centery], right: [e[n].right, e[n].centery], top: [e[n].centerx, e[n].top], bottom: [e[n].centerx, e[n].bottom] };
          }
        }(["source", "target"], [n, i]);for (var d = 0; d < l.length; d++) {
          for (var p = 0; p < l.length; p++) {
            c.push({ source: l[d], target: l[p], dist: Biltong.lineLength(h.source[l[d]], h.target[l[p]]) });
          }
        }c.sort(function (t, e) {
          return t.dist < e.dist ? -1 : t.dist > e.dist ? 1 : 0;
        });for (var f = c[0].source, g = c[0].target, m = 0; m < c.length && (f = !s.isContinuous || s.isEdgeSupported(c[m].source) ? c[m].source : null, g = !o.isContinuous || o.isEdgeSupported(c[m].target) ? c[m].target : null, null == f || null == g); m++) {}return { a: [f, g], theta: r, theta2: u };
      },
          g = function g(t) {
        return function (e, n) {
          return !1 === (t ? e[0][0] < n[0][0] : e[0][0] > n[0][0]) ? -1 : 1;
        };
      },
          m = { top: function top(t, e) {
          return t[0] > e[0] ? 1 : -1;
        }, right: g(!0), bottom: g(!0), left: function left(t, e) {
          return (t[0][0] < 0 ? -Math.PI - t[0][0] : Math.PI - t[0][0]) > (e[0][0] < 0 ? -Math.PI - e[0][0] : Math.PI - e[0][0]) ? 1 : -1;
        } },
          v = function v(t, e) {
        var n = d.getCachedData(t),
            i = n.s,
            o = n.o,
            a = function a(e, n, i, o, _a, l, u) {
          if (o.length > 0) for (var c = function (t, e, n, i, s, o, r) {
            for (var a = [], l = e[s ? 0 : 1] / (i.length + 1), u = 0; u < i.length; u++) {
              var c = (u + 1) * l,
                  h = o * e[s ? 1 : 0];r && (c = e[s ? 0 : 1] - c);var d = s ? c : h,
                  p = n[0] + d,
                  f = d / e[0],
                  g = s ? h : c,
                  m = n[1] + g,
                  v = g / e[1];a.push([p, m, f, v, i[u][1], i[u][2]]);
            }return a;
          }(0, n, i, (v = m[e], o.sort(v)), _a, l, "right" === e || "top" === e), h = function h(t, e) {
            s[t.id] = [e[0], e[1], e[2], e[3]], r[t.id] = u;
          }, d = 0; d < c.length; d++) {
            var p = c[d][4],
                f = p.endpoints[0].elementId === t,
                g = p.endpoints[1].elementId === t;f && h(p.endpoints[0], c[d]), g && h(p.endpoints[1], c[d]);
          }var v;
        };a("bottom", i, [o.left, o.top], e.bottom, !0, 1, [0, 1]), a("top", i, [o.left, o.top], e.top, !0, 0, [0, -1]), a("left", i, [o.left, o.top], e.left, !1, 0, [-1, 0]), a("right", i, [o.left, o.top], e.right, !1, 1, [1, 0]);
      };this.reset = function () {
        i = {}, u = {}, h = {};
      }, this.addFloatingConnection = function (t, e) {
        p[t] = e;
      }, this.removeFloatingConnection = function (t) {
        delete p[t];
      }, this.newConnection = function (n) {
        var i = n.sourceId,
            s = n.targetId,
            o = n.endpoints,
            r = !0,
            a = function a(_a2, l, c, h, d) {
          i === s && c.isContinuous && (n._jsPlumb.instance.removeElement(o[1].canvas), r = !1), t.addToList(u, h, [d, l, c.constructor === e.DynamicAnchor]);
        };a(0, o[0], o[0].anchor, s, n), r && a(0, o[1], o[1].anchor, i, n);
      };var b = function b(e) {
        !function (e, n) {
          if (e) {
            var i = function i(t) {
              return t[4] === n;
            };t.removeWithFunction(e.top, i), t.removeWithFunction(e.left, i), t.removeWithFunction(e.bottom, i), t.removeWithFunction(e.right, i);
          }
        }(h[e.elementId], e.id);
      };this.connectionDetached = function (e, n) {
        var i = e.connection || e,
            s = e.sourceId,
            o = e.targetId,
            r = i.endpoints,
            a = function a(e, n, i, s, o) {
          t.removeWithFunction(u[s], function (t) {
            return t[0].id === o.id;
          });
        };a(0, r[1], r[1].anchor, s, i), a(0, r[0], r[0].anchor, o, i), i.floatingId && (a(i.floatingIndex, i.floatingEndpoint, i.floatingEndpoint.anchor, i.floatingId, i), b(i.floatingEndpoint)), b(i.endpoints[0]), b(i.endpoints[1]), n || (c.redraw(i.sourceId), i.targetId !== i.sourceId && c.redraw(i.targetId));
      }, this.add = function (e, n) {
        t.addToList(i, n, e);
      }, this.changeId = function (t, e) {
        u[e] = u[t], i[e] = i[t], delete u[t], delete i[t];
      }, this.getConnectionsFor = function (t) {
        return u[t] || [];
      }, this.getEndpointsFor = function (t) {
        return i[t] || [];
      }, this.deleteEndpoint = function (e) {
        t.removeWithFunction(i[e.elementId], function (t) {
          return t.id === e.id;
        }), b(e);
      }, this.clearFor = function (t) {
        delete i[t], i[t] = [];
      };var y = function y(e, i, s, o, r, a, l, u, c, h, d, p) {
        var f,
            g,
            m = -1,
            v = o.endpoints[l],
            b = v.id,
            y = [1, 0][l],
            P = [[i, s], o, r, a, b],
            _ = e[c],
            x = v._continuousAnchorEdge ? e[v._continuousAnchorEdge] : null;if (x) {
          var C = t.findWithFunction(x, function (t) {
            return t[4] === b;
          });if (-1 !== C) for (x.splice(C, 1), f = 0; f < x.length; f++) {
            g = x[f][1], t.addWithFunction(d, g, function (t) {
              return t.id === g.id;
            }), t.addWithFunction(p, x[f][1].endpoints[l], function (t) {
              return t.id === g.endpoints[l].id;
            }), t.addWithFunction(p, x[f][1].endpoints[y], function (t) {
              return t.id === g.endpoints[y].id;
            });
          }
        }for (f = 0; f < _.length; f++) {
          g = _[f][1], 1 === n.idx && _[f][3] === a && -1 === m && (m = f), t.addWithFunction(d, g, function (t) {
            return t.id === g.id;
          }), t.addWithFunction(p, _[f][1].endpoints[l], function (t) {
            return t.id === g.endpoints[l].id;
          }), t.addWithFunction(p, _[f][1].endpoints[y], function (t) {
            return t.id === g.endpoints[y].id;
          });
        }var E = u ? -1 !== m ? m : 0 : _.length;_.splice(E, 0, P), v._continuousAnchorEdge = c;
      };this.updateOtherEndpoint = function (n, i, s, o) {
        var r = t.findWithFunction(u[n], function (t) {
          return t[0].id === o.id;
        }),
            a = t.findWithFunction(u[i], function (t) {
          return t[0].id === o.id;
        });-1 !== r && (u[n][r][0] = o, u[n][r][1] = o.endpoints[1], u[n][r][2] = o.endpoints[1].anchor.constructor === e.DynamicAnchor), a > -1 && (u[i].splice(a, 1), t.addToList(u, s, [o, o.endpoints[0], o.endpoints[0].anchor.constructor === e.DynamicAnchor])), o.updateConnectedClass();
      }, this.sourceChanged = function (n, i, s, o) {
        if (n !== i) {
          s.sourceId = i, s.source = o, t.removeWithFunction(u[n], function (t) {
            return t[0].id === s.id;
          });var r = t.findWithFunction(u[s.targetId], function (t) {
            return t[0].id === s.id;
          });r > -1 && (u[s.targetId][r][0] = s, u[s.targetId][r][1] = s.endpoints[0], u[s.targetId][r][2] = s.endpoints[0].anchor.constructor === e.DynamicAnchor), t.addToList(u, i, [s, s.endpoints[1], s.endpoints[1].anchor.constructor === e.DynamicAnchor]), s.endpoints[1].anchor.isContinuous && (s.source === s.target ? s._jsPlumb.instance.removeElement(s.endpoints[1].canvas) : null == s.endpoints[1].canvas.parentNode && s._jsPlumb.instance.appendElement(s.endpoints[1].canvas)), s.updateConnectedClass();
        }
      }, this.rehomeEndpoint = function (t, e, n) {
        var s = i[e] || [],
            o = d.getId(n);if (o !== e) {
          var r = s.indexOf(t);if (r > -1) {
            var a = s.splice(r, 1)[0];c.add(a, o);
          }
        }for (var l = 0; l < t.connections.length; l++) {
          t.connections[l].sourceId === e ? c.sourceChanged(e, t.elementId, t.connections[l], t.element) : t.connections[l].targetId === e && (t.connections[l].targetId = t.elementId, t.connections[l].target = t.element, c.updateOtherEndpoint(t.connections[l].sourceId, e, t.elementId, t.connections[l]));
        }
      }, this.redraw = function (n, s, o, r, a, l) {
        if (!d.isSuspendDrawing()) {
          var c = i[n] || [],
              g = u[n] || [],
              m = [],
              b = [],
              P = [];o = o || d.timestamp(), r = r || { left: 0, top: 0 }, s && (s = { left: s.left + r.left, top: s.top + r.top });for (var _ = d.updateOffset({ elId: n, offset: s, recalc: !1, timestamp: o }), x = {}, C = 0; C < g.length; C++) {
            var E = g[C][0],
                j = E.sourceId,
                S = E.targetId,
                D = E.endpoints[0].anchor.isContinuous,
                w = E.endpoints[1].anchor.isContinuous;if (D || w) {
              var I = j + "_" + S,
                  A = x[I],
                  k = E.sourceId === n ? 1 : 0;D && !h[j] && (h[j] = { top: [], right: [], bottom: [], left: [] }), w && !h[S] && (h[S] = { top: [], right: [], bottom: [], left: [] }), n !== S && d.updateOffset({ elId: S, timestamp: o }), n !== j && d.updateOffset({ elId: j, timestamp: o });var O = d.getCachedData(S),
                  T = d.getCachedData(j);S === j && (D || w) ? (y(h[j], -Math.PI / 2, 0, E, !1, S, 0, !1, "top", 0, m, b), y(h[S], -Math.PI / 2, 0, E, !1, j, 1, !1, "top", 0, m, b)) : (A || (A = f(j, S, T.o, O.o, E.endpoints[0].anchor, E.endpoints[1].anchor), x[I] = A), D && y(h[j], A.theta, 0, E, !1, S, 0, !1, A.a[0], 0, m, b), w && y(h[S], A.theta2, -1, E, !0, j, 1, !0, A.a[1], 0, m, b)), D && t.addWithFunction(P, j, function (t) {
                return t === j;
              }), w && t.addWithFunction(P, S, function (t) {
                return t === S;
              }), t.addWithFunction(m, E, function (t) {
                return t.id === E.id;
              }), (D && 0 === k || w && 1 === k) && t.addWithFunction(b, E.endpoints[k], function (t) {
                return t.id === E.endpoints[k].id;
              });
            }
          }for (C = 0; C < c.length; C++) {
            0 === c[C].connections.length && c[C].anchor.isContinuous && (h[n] || (h[n] = { top: [], right: [], bottom: [], left: [] }), y(h[n], -Math.PI / 2, 0, { endpoints: [c[C], c[C]], paint: function paint() {} }, !1, n, 0, !1, c[C].anchor.getDefaultFace(), 0, m, b), t.addWithFunction(P, n, function (t) {
              return t === n;
            }));
          }for (C = 0; C < P.length; C++) {
            v(P[C], h[P[C]]);
          }for (C = 0; C < c.length; C++) {
            c[C].paint({ timestamp: o, offset: _, dimensions: _.s, recalc: !0 !== l });
          }for (C = 0; C < b.length; C++) {
            var M = d.getCachedData(b[C].elementId);b[C].paint({ timestamp: o, offset: M, dimensions: M.s });
          }for (C = 0; C < g.length; C++) {
            var L = g[C][1];if (L.anchor.constructor === e.DynamicAnchor) {
              L.paint({ elementWithPrecedence: n, timestamp: o }), t.addWithFunction(m, g[C][0], function (t) {
                return t.id === g[C][0].id;
              });for (var F = 0; F < L.connections.length; F++) {
                L.connections[F] !== g[C][0] && t.addWithFunction(m, L.connections[F], function (t) {
                  return t.id === L.connections[F].id;
                });
              }
            } else L.anchor.constructor === e.Anchor && t.addWithFunction(m, g[C][0], function (t) {
              return t.id === g[C][0].id;
            });
          }var G = p[n];for (G && G.paint({ timestamp: o, recalc: !1, elId: n }), C = 0; C < m.length; C++) {
            m[C].paint({ elId: n, timestamp: o, recalc: !1, clearEdits: a });
          }
        }
      };var P = function P(e) {
        t.EventGenerator.apply(this), this.type = "Continuous", this.isDynamic = !0, this.isContinuous = !0;for (var n = e.faces || ["top", "right", "bottom", "left"], i = !(!1 === e.clockwise), a = {}, l = { top: "bottom", right: "left", left: "right", bottom: "top" }, u = { top: "right", right: "bottom", left: "top", bottom: "left" }, c = { top: "left", right: "top", left: "bottom", bottom: "right" }, h = i ? u : c, d = i ? c : u, p = e.cssClass || "", f = 0; f < n.length; f++) {
          a[n[f]] = !0;
        }this.getDefaultFace = function () {
          return 0 === n.length ? "top" : n[0];
        }, this.verifyEdge = function (t) {
          return a[t] ? t : a[l[t]] ? l[t] : a[h[t]] ? h[t] : a[d[t]] ? d[t] : t;
        }, this.isEdgeSupported = function (t) {
          return !0 === a[t];
        }, this.compute = function (t) {
          return o[t.element.id] || s[t.element.id] || [0, 0];
        }, this.getCurrentLocation = function (t) {
          return o[t.element.id] || s[t.element.id] || [0, 0];
        }, this.getOrientation = function (t) {
          return r[t.id] || [0, 0];
        }, this.clearUserDefinedLocation = function () {
          delete o[e.elementId];
        }, this.setUserDefinedLocation = function (t) {
          o[e.elementId] = t;
        }, this.getCssClass = function () {
          return p;
        };
      };d.continuousAnchorFactory = { get: function get(t) {
          return new P(t);
        }, clear: function clear(t) {
          delete o[t], delete s[t];
        } };
    }, e.Anchor = function (e) {
      this.x = e.x || 0, this.y = e.y || 0, this.elementId = e.elementId, this.cssClass = e.cssClass || "", this.userDefinedLocation = null, this.orientation = e.orientation || [0, 0], this.lastReturnValue = null, this.offsets = e.offsets || [0, 0], this.timestamp = null, t.EventGenerator.apply(this), this.compute = function (t) {
        var e = t.xy,
            n = t.wh,
            i = t.timestamp;return t.clearUserDefinedLocation && (this.userDefinedLocation = null), i && i === this.timestamp ? this.lastReturnValue : (null != this.userDefinedLocation ? this.lastReturnValue = this.userDefinedLocation : this.lastReturnValue = [e[0] + this.x * n[0] + this.offsets[0], e[1] + this.y * n[1] + this.offsets[1]], this.timestamp = i, this.lastReturnValue);
      }, this.getCurrentLocation = function (t) {
        return t = t || {}, null == this.lastReturnValue || null != t.timestamp && this.timestamp !== t.timestamp ? this.compute(t) : this.lastReturnValue;
      };
    }, t.extend(e.Anchor, t.EventGenerator, { equals: function equals(t) {
        if (!t) return !1;var e = t.getOrientation(),
            n = this.getOrientation();return this.x === t.x && this.y === t.y && this.offsets[0] === t.offsets[0] && this.offsets[1] === t.offsets[1] && n[0] === e[0] && n[1] === e[1];
      }, getUserDefinedLocation: function getUserDefinedLocation() {
        return this.userDefinedLocation;
      }, setUserDefinedLocation: function setUserDefinedLocation(t) {
        this.userDefinedLocation = t;
      }, clearUserDefinedLocation: function clearUserDefinedLocation() {
        this.userDefinedLocation = null;
      }, getOrientation: function getOrientation() {
        return this.orientation;
      }, getCssClass: function getCssClass() {
        return this.cssClass;
      } }), e.FloatingAnchor = function (t) {
      e.Anchor.apply(this, arguments);var n = t.reference,
          i = t.referenceCanvas,
          s = e.getSize(i),
          o = null,
          r = null;this.orientation = null, this.x = 0, this.y = 0, this.isFloating = !0, this.compute = function (t) {
        var e = t.xy,
            n = [e[0] + s[0] / 2, e[1] + s[1] / 2];return r = n, n;
      }, this.getOrientation = function (t) {
        if (o) return o;var e = n.getOrientation(t);return [0 * Math.abs(e[0]) * -1, 0 * Math.abs(e[1]) * -1];
      }, this.over = function (t, e) {
        o = t.getOrientation(e);
      }, this.out = function () {
        o = null;
      }, this.getCurrentLocation = function (t) {
        return null == r ? this.compute(t) : r;
      };
    }, t.extend(e.FloatingAnchor, e.Anchor);e.DynamicAnchor = function (t) {
      e.Anchor.apply(this, arguments), this.isDynamic = !0, this.anchors = [], this.elementId = t.elementId, this.jsPlumbInstance = t.jsPlumbInstance;for (var n = 0; n < t.anchors.length; n++) {
        this.anchors[n] = (i = t.anchors[n], s = this.jsPlumbInstance, o = this.elementId, i.constructor === e.Anchor ? i : s.makeAnchor(i, o, s));
      }var i, s, o;this.getAnchors = function () {
        return this.anchors;
      }, this.locked = !1;var r = this.anchors.length > 0 ? this.anchors[0] : null,
          a = r,
          l = this,
          u = function u(t, e, n, i, s) {
        var o = i[0] + t.x * s[0],
            r = i[1] + t.y * s[1],
            a = i[0] + s[0] / 2,
            l = i[1] + s[1] / 2;return Math.sqrt(Math.pow(e - o, 2) + Math.pow(n - r, 2)) + Math.sqrt(Math.pow(a - o, 2) + Math.pow(l - r, 2));
      },
          c = t.selector || function (t, e, n, i, s) {
        for (var o = n[0] + i[0] / 2, r = n[1] + i[1] / 2, a = -1, l = 1 / 0, c = 0; c < s.length; c++) {
          var h = u(s[c], o, r, t, e);h < l && (a = c + 0, l = h);
        }return s[a];
      };this.compute = function (t) {
        var e = t.xy,
            n = t.wh,
            i = t.txy,
            s = t.twh;this.timestamp = t.timestamp;var o = l.getUserDefinedLocation();return null != o ? o : this.locked || null == i || null == s ? r.compute(t) : (t.timestamp = null, r = c(e, n, i, s, this.anchors), this.x = r.x, this.y = r.y, r !== a && this.fire("anchorChanged", r), a = r, r.compute(t));
      }, this.getCurrentLocation = function (t) {
        return this.getUserDefinedLocation() || (null != r ? r.getCurrentLocation(t) : null);
      }, this.getOrientation = function (t) {
        return null != r ? r.getOrientation(t) : [0, 0];
      }, this.over = function (t, e) {
        null != r && r.over(t, e);
      }, this.out = function () {
        null != r && r.out();
      }, this.getCssClass = function () {
        return r && r.getCssClass() || "";
      };
    }, t.extend(e.DynamicAnchor, e.Anchor);var n = function n(t, _n2, i, s, o, r) {
      e.Anchors[o] = function (e) {
        var a = e.jsPlumbInstance.makeAnchor([t, _n2, i, s, 0, 0], e.elementId, e.jsPlumbInstance);return a.type = o, r && r(a, e), a;
      };
    };n(.5, 0, 0, -1, "TopCenter"), n(.5, 1, 0, 1, "BottomCenter"), n(0, .5, -1, 0, "LeftMiddle"), n(1, .5, 1, 0, "RightMiddle"), n(.5, 0, 0, -1, "Top"), n(.5, 1, 0, 1, "Bottom"), n(0, .5, -1, 0, "Left"), n(1, .5, 1, 0, "Right"), n(.5, .5, 0, 0, "Center"), n(1, 0, 0, -1, "TopRight"), n(1, 1, 0, 1, "BottomRight"), n(0, 0, 0, -1, "TopLeft"), n(0, 1, 0, 1, "BottomLeft"), e.Defaults.DynamicAnchors = function (t) {
      return t.jsPlumbInstance.makeAnchors(["TopCenter", "RightMiddle", "BottomCenter", "LeftMiddle"], t.elementId, t.jsPlumbInstance);
    }, e.Anchors.AutoDefault = function (t) {
      var n = t.jsPlumbInstance.makeDynamicAnchor(e.Defaults.DynamicAnchors(t));return n.type = "AutoDefault", n;
    };var i = function i(t, n) {
      e.Anchors[t] = function (e) {
        var i = e.jsPlumbInstance.makeAnchor(["Continuous", { faces: n }], e.elementId, e.jsPlumbInstance);return i.type = t, i;
      };
    };e.Anchors.Continuous = function (t) {
      return t.jsPlumbInstance.continuousAnchorFactory.get(t);
    }, i("ContinuousLeft", ["left"]), i("ContinuousTop", ["top"]), i("ContinuousBottom", ["bottom"]), i("ContinuousRight", ["right"]), n(0, 0, 0, 0, "Assign", function (t, e) {
      var n = e.position || "Fixed";t.positionFinder = n.constructor === String ? e.jsPlumbInstance.AnchorPositionFinders[n] : n, t.constructorParams = e;
    }), this.jsPlumbInstance.prototype.AnchorPositionFinders = { Fixed: function Fixed(t, e, n) {
        return [(t.left - e.left) / n[0], (t.top - e.top) / n[1]];
      }, Grid: function Grid(t, e, n, i) {
        var s = t.left - e.left,
            o = t.top - e.top,
            r = n[0] / i.grid[0],
            a = n[1] / i.grid[1],
            l = Math.floor(s / r),
            u = Math.floor(o / a);return [(l * r + r / 2) / n[0], (u * a + a / 2) / n[1]];
      } }, e.Anchors.Perimeter = function (t) {
      var e = (t = t || {}).anchorCount || 60,
          n = t.shape;if (!n) throw new Error("no shape supplied to Perimeter Anchor type");var i = function i() {
        for (var t = 2 * Math.PI / e, n = 0, i = [], s = 0; s < e; s++) {
          var o = .5 + .5 * Math.sin(n),
              r = .5 + .5 * Math.cos(n);i.push([o, r, 0, 0]), n += t;
        }return i;
      },
          s = function s(t) {
        for (var n = e / t.length, i = [], s = function s(t, _s2, o, r, a) {
          for (var l = (o - t) / (n = e * a), u = (r - _s2) / n, c = 0; c < n; c++) {
            i.push([t + l * c, _s2 + u * c, 0, 0]);
          }
        }, o = 0; o < t.length; o++) {
          s.apply(null, t[o]);
        }return i;
      },
          o = function o(t) {
        for (var e = [], n = 0; n < t.length; n++) {
          e.push([t[n][0], t[n][1], t[n][2], t[n][3], 1 / t.length]);
        }return s(e);
      },
          r = function r() {
        return o([[0, 0, 1, 0], [1, 0, 1, 1], [1, 1, 0, 1], [0, 1, 0, 0]]);
      },
          a = { Circle: i, Ellipse: i, Diamond: function Diamond() {
          return o([[.5, 0, 1, .5], [1, .5, .5, 1], [.5, 1, 0, .5], [0, .5, .5, 0]]);
        }, Rectangle: r, Square: r, Triangle: function Triangle() {
          return o([[.5, 0, 1, 1], [1, 1, 0, 1], [0, 1, .5, 0]]);
        }, Path: function Path(t) {
          for (var e = t.points, n = [], i = 0, o = 0; o < e.length - 1; o++) {
            var r = Math.sqrt(Math.pow(e[o][2] - e[o][0]) + Math.pow(e[o][3] - e[o][1]));i += r, n.push([e[o][0], e[o][1], e[o + 1][0], e[o + 1][1], r]);
          }for (var a = 0; a < n.length; a++) {
            n[a][4] = n[a][4] / i;
          }return s(n);
        } };if (!a[n]) throw new Error("Shape [" + n + "] is unknown by Perimeter Anchor type");var l = a[n](t);t.rotation && (l = function (t, e) {
        for (var n = [], i = e / 180 * Math.PI, s = 0; s < t.length; s++) {
          var o = t[s][0] - .5,
              r = t[s][1] - .5;n.push([o * Math.cos(i) - r * Math.sin(i) + .5, o * Math.sin(i) + r * Math.cos(i) + .5, t[s][2], t[s][3]]);
        }return n;
      }(l, t.rotation));var u = t.jsPlumbInstance.makeDynamicAnchor(l);return u.type = "Perimeter", u;
    };
  }.call("undefined" != typeof window ? window : k), function () {
    var t = this,
        e = t.jsPlumb,
        n = t.jsPlumbUtil,
        i = t.Biltong;e.Segments = { AbstractSegment: function AbstractSegment(t) {
        this.params = t, this.findClosestPointOnPath = function (t, e) {
          return { d: 1 / 0, x: null, y: null, l: null };
        }, this.getBounds = function () {
          return { minX: Math.min(t.x1, t.x2), minY: Math.min(t.y1, t.y2), maxX: Math.max(t.x1, t.x2), maxY: Math.max(t.y1, t.y2) };
        };
      }, Straight: function Straight(t) {
        var n, s, o, r, a, l, u;e.Segments.AbstractSegment.apply(this, arguments);this.type = "Straight", this.getLength = function () {
          return n;
        }, this.getGradient = function () {
          return s;
        }, this.getCoordinates = function () {
          return { x1: r, y1: l, x2: a, y2: u };
        }, this.setCoordinates = function (t) {
          r = t.x1, l = t.y1, a = t.x2, u = t.y2, n = Math.sqrt(Math.pow(a - r, 2) + Math.pow(u - l, 2)), s = i.gradient({ x: r, y: l }, { x: a, y: u }), o = -1 / s;
        }, this.setCoordinates({ x1: t.x1, y1: t.y1, x2: t.x2, y2: t.y2 }), this.getBounds = function () {
          return { minX: Math.min(r, a), minY: Math.min(l, u), maxX: Math.max(r, a), maxY: Math.max(l, u) };
        }, this.pointOnPath = function (t, e) {
          if (0 !== t || e) {
            if (1 !== t || e) {
              var s = e ? t > 0 ? t : n + t : t * n;return i.pointOnLine({ x: r, y: l }, { x: a, y: u }, s);
            }return { x: a, y: u };
          }return { x: r, y: l };
        }, this.gradientAtPoint = function (t) {
          return s;
        }, this.pointAlongPathFrom = function (t, e, n) {
          var s = this.pointOnPath(t, n),
              o = e <= 0 ? { x: r, y: l } : { x: a, y: u };return e <= 0 && Math.abs(e) > 1 && (e *= -1), i.pointOnLine(s, o, e);
        };var c = function c(t, e, n) {
          return n >= Math.min(t, e) && n <= Math.max(t, e);
        },
            h = function h(t, e, n) {
          return Math.abs(n - t) < Math.abs(n - e) ? t : e;
        };this.findClosestPointOnPath = function (t, e) {
          var d = { d: 1 / 0, x: null, y: null, l: null, x1: r, x2: a, y1: l, y2: u };if (0 === s) d.y = l, d.x = c(r, a, t) ? t : h(r, a, t);else if (s === 1 / 0 || s === -1 / 0) d.x = r, d.y = c(l, u, e) ? e : h(l, u, e);else {
            var p = l - s * r,
                f = (e - o * t - p) / (s - o),
                g = s * f + p;d.x = c(r, a, f) ? f : h(r, a, f), d.y = c(l, u, g) ? g : h(l, u, g);
          }var m = i.lineLength([d.x, d.y], [r, l]);return d.d = i.lineLength([t, e], [d.x, d.y]), d.l = m / n, d;
        };
      }, Arc: function Arc(t) {
        e.Segments.AbstractSegment.apply(this, arguments);var n = function n(e, _n3) {
          return i.theta([t.cx, t.cy], [e, _n3]);
        },
            s = 2 * Math.PI;this.radius = t.r, this.anticlockwise = t.ac, this.type = "Arc", t.startAngle && t.endAngle ? (this.startAngle = t.startAngle, this.endAngle = t.endAngle, this.x1 = t.cx + this.radius * Math.cos(t.startAngle), this.y1 = t.cy + this.radius * Math.sin(t.startAngle), this.x2 = t.cx + this.radius * Math.cos(t.endAngle), this.y2 = t.cy + this.radius * Math.sin(t.endAngle)) : (this.startAngle = n(t.x1, t.y1), this.endAngle = n(t.x2, t.y2), this.x1 = t.x1, this.y1 = t.y1, this.x2 = t.x2, this.y2 = t.y2), this.endAngle < 0 && (this.endAngle += s), this.startAngle < 0 && (this.startAngle += s);var o = this.endAngle < this.startAngle ? this.endAngle + s : this.endAngle;this.sweep = Math.abs(o - this.startAngle), this.anticlockwise && (this.sweep = s - this.sweep);var r = 2 * Math.PI * this.radius,
            a = this.sweep / s,
            l = r * a;this.getLength = function () {
          return l;
        }, this.getBounds = function () {
          return { minX: t.cx - t.r, maxX: t.cx + t.r, minY: t.cy - t.r, maxY: t.cy + t.r };
        };var u = function u(t) {
          var e = Math.floor(t),
              n = Math.ceil(t);return t - e < 1e-10 ? e : n - t < 1e-10 ? n : t;
        };this.pointOnPath = function (e, n) {
          if (0 === e) return { x: this.x1, y: this.y1, theta: this.startAngle };if (1 === e) return { x: this.x2, y: this.y2, theta: this.endAngle };n && (e /= l);var i = function (t, e) {
            if (t.anticlockwise) {
              var n = t.startAngle < t.endAngle ? t.startAngle + s : t.startAngle;return n - Math.abs(n - t.endAngle) * e;
            }var i = t.endAngle < t.startAngle ? t.endAngle + s : t.endAngle,
                o = Math.abs(i - t.startAngle);return t.startAngle + o * e;
          }(this, e),
              o = t.cx + t.r * Math.cos(i),
              r = t.cy + t.r * Math.sin(i);return { x: u(o), y: u(r), theta: i };
        }, this.gradientAtPoint = function (e, n) {
          var s = this.pointOnPath(e, n),
              o = i.normal([t.cx, t.cy], [s.x, s.y]);return this.anticlockwise || o !== 1 / 0 && o !== -1 / 0 || (o *= -1), o;
        }, this.pointAlongPathFrom = function (e, n, i) {
          var s = this.pointOnPath(e, i),
              o = n / r * 2 * Math.PI,
              a = this.anticlockwise ? -1 : 1,
              l = s.theta + a * o;return { x: t.cx + this.radius * Math.cos(l), y: t.cy + this.radius * Math.sin(l) };
        };
      }, Bezier: function Bezier(n) {
        this.curve = [{ x: n.x1, y: n.y1 }, { x: n.cp1x, y: n.cp1y }, { x: n.cp2x, y: n.cp2y }, { x: n.x2, y: n.y2 }];e.Segments.AbstractSegment.apply(this, arguments);this.bounds = { minX: Math.min(n.x1, n.x2, n.cp1x, n.cp2x), minY: Math.min(n.y1, n.y2, n.cp1y, n.cp2y), maxX: Math.max(n.x1, n.x2, n.cp1x, n.cp2x), maxY: Math.max(n.y1, n.y2, n.cp1y, n.cp2y) }, this.type = "Bezier";var i = function i(e, n, _i4) {
          return _i4 && (n = t.jsBezier.locationAlongCurveFrom(e, n > 0 ? 0 : 1, n)), n;
        };this.pointOnPath = function (e, n) {
          return e = i(this.curve, e, n), t.jsBezier.pointOnCurve(this.curve, e);
        }, this.gradientAtPoint = function (e, n) {
          return e = i(this.curve, e, n), t.jsBezier.gradientAtPoint(this.curve, e);
        }, this.pointAlongPathFrom = function (e, n, s) {
          return e = i(this.curve, e, s), t.jsBezier.pointAlongCurveFrom(this.curve, e, n);
        }, this.getLength = function () {
          return t.jsBezier.getLength(this.curve);
        }, this.getBounds = function () {
          return this.bounds;
        };
      } }, e.SegmentRenderer = { getPath: function getPath(t) {
        return { Straight: function Straight() {
            var e = t.getCoordinates();return "M " + e.x1 + " " + e.y1 + " L " + e.x2 + " " + e.y2;
          }, Bezier: function Bezier() {
            var e = t.params;return "M " + e.x1 + " " + e.y1 + " C " + e.cp1x + " " + e.cp1y + " " + e.cp2x + " " + e.cp2y + " " + e.x2 + " " + e.y2;
          }, Arc: function Arc() {
            var e = t.params,
                n = t.sweep > Math.PI ? 1 : 0,
                i = t.anticlockwise ? 0 : 1;return "M" + t.x1 + " " + t.y1 + " A " + t.radius + " " + e.r + " 0 " + n + "," + i + " " + t.x2 + " " + t.y2;
          } }[t.type]();
      } };var s = function s() {
      this.resetBounds = function () {
        this.bounds = { minX: 1 / 0, minY: 1 / 0, maxX: -1 / 0, maxY: -1 / 0 };
      }, this.resetBounds();
    };e.Connectors.AbstractConnector = function (t) {
      s.apply(this, arguments);var o = [],
          r = 0,
          a = [],
          l = [],
          u = t.stub || 0,
          c = n.isArray(u) ? u[0] : u,
          h = n.isArray(u) ? u[1] : u,
          d = t.gap || 0,
          p = n.isArray(d) ? d[0] : d,
          f = n.isArray(d) ? d[1] : d,
          g = null,
          m = !1,
          v = null,
          b = null,
          y = !1 !== t.editable && null != e.ConnectorEditors && null != e.ConnectorEditors[this.type],
          P = this.setGeometry = function (t, e) {
        m = !e, b = t;
      },
          _ = this.getGeometry = function () {
        return b;
      };this.getPathData = function () {
        for (var t = "", n = 0; n < o.length; n++) {
          t += e.SegmentRenderer.getPath(o[n]), t += " ";
        }return t;
      }, this.hasBeenEdited = function () {
        return m;
      }, this.isEditing = function () {
        return null != this.editor && this.editor.isActive();
      }, this.setEditable = function (t) {
        return y = !(!t || null == e.ConnectorEditors || null == e.ConnectorEditors[this.type] || null != this.overrideSetEditable && !this.overrideSetEditable()) && t;
      }, this.isEditable = function () {
        return y;
      }, this.findSegmentForPoint = function (t, e) {
        for (var n = { d: 1 / 0, s: null, x: null, y: null, l: null }, i = 0; i < o.length; i++) {
          var s = o[i].findClosestPointOnPath(t, e);s.d < n.d && (n.d = s.d, n.l = s.l, n.x = s.x, n.y = s.y, n.s = o[i], n.x1 = s.x1, n.x2 = s.x2, n.y1 = s.y1, n.y2 = s.y2, n.index = i);
        }return n;
      };var x = function x(t, e) {
        e && (t = t > 0 ? t / r : (r + t) / r);for (var n = a.length - 1, i = 1, s = 0; s < a.length; s++) {
          if (a[s][1] >= t) {
            n = s, i = 1 === t ? 1 : 0 === t ? 0 : (t - a[s][0]) / l[s];break;
          }
        }return { segment: o[n], proportion: i, index: n };
      };this.setSegments = function (t) {
        g = [], r = 0;for (var e = 0; e < t.length; e++) {
          g.push(t[e]), r += t[e].getLength();
        }
      }, this.getLength = function () {
        return r;
      };var C = function C(t) {
        this.strokeWidth = t.strokeWidth;var e = i.quadrant(t.sourcePos, t.targetPos),
            n = t.targetPos[0] < t.sourcePos[0],
            s = t.targetPos[1] < t.sourcePos[1],
            o = t.strokeWidth || 1,
            r = t.sourceEndpoint.anchor.getOrientation(t.sourceEndpoint),
            a = t.targetEndpoint.anchor.getOrientation(t.targetEndpoint),
            l = n ? t.targetPos[0] : t.sourcePos[0],
            u = s ? t.targetPos[1] : t.sourcePos[1],
            d = Math.abs(t.targetPos[0] - t.sourcePos[0]),
            g = Math.abs(t.targetPos[1] - t.sourcePos[1]);if (0 === r[0] && 0 === r[1] || 0 === a[0] && 0 === a[1]) {
          var m = d > g ? 0 : 1,
              v = [1, 0][m];a = [], (r = [])[m] = t.sourcePos[m] > t.targetPos[m] ? -1 : 1, a[m] = t.sourcePos[m] > t.targetPos[m] ? 1 : -1, r[v] = 0, a[v] = 0;
        }var b = n ? d + p * r[0] : p * r[0],
            y = s ? g + p * r[1] : p * r[1],
            P = n ? f * a[0] : d + f * a[0],
            _ = s ? f * a[1] : g + f * a[1],
            x = r[0] * a[0] + r[1] * a[1],
            C = { sx: b, sy: y, tx: P, ty: _, lw: o, xSpan: Math.abs(P - b), ySpan: Math.abs(_ - y), mx: (b + P) / 2, my: (y + _) / 2, so: r, to: a, x: l, y: u, w: d, h: g, segment: e, startStubX: b + r[0] * c, startStubY: y + r[1] * c, endStubX: P + a[0] * h, endStubY: _ + a[1] * h, isXGreaterThanStubTimes2: Math.abs(b - P) > c + h, isYGreaterThanStubTimes2: Math.abs(y - _) > c + h, opposite: -1 === x, perpendicular: 0 === x, orthogonal: 1 === x, sourceAxis: 0 === r[0] ? "y" : "x", points: [l, u, d, g, b, y, P, _] };return C.anchorOrientation = C.opposite ? "opposite" : C.orthogonal ? "orthogonal" : "perpendicular", C;
      };this.getSegments = function () {
        return o;
      }, this.updateBounds = function (t) {
        var e = t.getBounds();this.bounds.minX = Math.min(this.bounds.minX, e.minX), this.bounds.maxX = Math.max(this.bounds.maxX, e.maxX), this.bounds.minY = Math.min(this.bounds.minY, e.minY), this.bounds.maxY = Math.max(this.bounds.maxY, e.maxY);
      };return this.pointOnPath = function (t, e) {
        var n = x(t, e);return n.segment && n.segment.pointOnPath(n.proportion, !1) || [0, 0];
      }, this.gradientAtPoint = function (t, e) {
        var n = x(t, e);return n.segment && n.segment.gradientAtPoint(n.proportion, !1) || 0;
      }, this.pointAlongPathFrom = function (t, e, n) {
        var i = x(t, n);return i.segment && i.segment.pointAlongPathFrom(i.proportion, e, !1) || [0, 0];
      }, this.compute = function (t) {
        v = C.call(this, t), r = o.length = a.length = l.length = 0, this._compute(v, t), this.x = v.points[0], this.y = v.points[1], this.w = v.points[2], this.h = v.points[3], this.segment = v.segment, function () {
          for (var t = 0, e = 0; e < o.length; e++) {
            var n = o[e].getLength();l[e] = n / r, a[e] = [t, t += n / r];
          }
        }();
      }, { addSegment: function addSegment(t, n, i) {
          if (i.x1 !== i.x2 || i.y1 !== i.y2) {
            var s = new e.Segments[n](i);o.push(s), r += s.getLength(), t.updateBounds(s);
          }
        }, prepareCompute: C, sourceStub: c, targetStub: h, maxStub: Math.max(c, h), sourceGap: p, targetGap: f, maxGap: Math.max(p, f), setGeometry: P, getGeometry: _ };
    }, n.extend(e.Connectors.AbstractConnector, s), e.Endpoints.AbstractEndpoint = function (t) {
      return s.apply(this, arguments), { compute: this.compute = function (t, e, n, i) {
          var s = this._compute.apply(this, arguments);return this.x = s[0], this.y = s[1], this.w = s[2], this.h = s[3], this.bounds.minX = this.x, this.bounds.minY = this.y, this.bounds.maxX = this.x + this.w, this.bounds.maxY = this.y + this.h, s;
        }, cssClass: t.cssClass };
    }, n.extend(e.Endpoints.AbstractEndpoint, s), e.Endpoints.Dot = function (t) {
      this.type = "Dot";e.Endpoints.AbstractEndpoint.apply(this, arguments);t = t || {}, this.radius = t.radius || 10, this.defaultOffset = .5 * this.radius, this.defaultInnerRadius = this.radius / 3, this._compute = function (t, e, n, i) {
        this.radius = n.radius || this.radius;var s = t[0] - this.radius,
            o = t[1] - this.radius,
            r = 2 * this.radius,
            a = 2 * this.radius;if (n.stroke) {
          var l = n.strokeWidth || 1;s -= l, o -= l, r += 2 * l, a += 2 * l;
        }return [s, o, r, a, this.radius];
      };
    }, n.extend(e.Endpoints.Dot, e.Endpoints.AbstractEndpoint), e.Endpoints.Rectangle = function (t) {
      this.type = "Rectangle";e.Endpoints.AbstractEndpoint.apply(this, arguments);t = t || {}, this.width = t.width || 20, this.height = t.height || 20, this._compute = function (t, e, n, i) {
        var s = n.width || this.width,
            o = n.height || this.height;return [t[0] - s / 2, t[1] - o / 2, s, o];
      };
    }, n.extend(e.Endpoints.Rectangle, e.Endpoints.AbstractEndpoint);var o = function o(t) {
      e.jsPlumbUIComponent.apply(this, arguments), this._jsPlumb.displayElements = [];
    };n.extend(o, e.jsPlumbUIComponent, { getDisplayElements: function getDisplayElements() {
        return this._jsPlumb.displayElements;
      }, appendDisplayElement: function appendDisplayElement(t) {
        this._jsPlumb.displayElements.push(t);
      } }), e.Endpoints.Image = function (i) {
      this.type = "Image", o.apply(this, arguments), e.Endpoints.AbstractEndpoint.apply(this, arguments);var s = i.onload,
          r = i.src || i.url,
          a = i.cssClass ? " " + i.cssClass : "";this._jsPlumb.img = new Image(), this._jsPlumb.ready = !1, this._jsPlumb.initialized = !1, this._jsPlumb.deleted = !1, this._jsPlumb.widthToUse = i.width, this._jsPlumb.heightToUse = i.height, this._jsPlumb.endpoint = i.endpoint, this._jsPlumb.img.onload = function () {
        null != this._jsPlumb && (this._jsPlumb.ready = !0, this._jsPlumb.widthToUse = this._jsPlumb.widthToUse || this._jsPlumb.img.width, this._jsPlumb.heightToUse = this._jsPlumb.heightToUse || this._jsPlumb.img.height, s && s(this));
      }.bind(this), this._jsPlumb.endpoint.setImage = function (t, e) {
        var n = t.constructor === String ? t : t.src;s = e, this._jsPlumb.img.src = n, null != this.canvas && this.canvas.setAttribute("src", this._jsPlumb.img.src);
      }.bind(this), this._jsPlumb.endpoint.setImage(r, s), this._compute = function (t, e, n, i) {
        return this.anchorPoint = t, this._jsPlumb.ready ? [t[0] - this._jsPlumb.widthToUse / 2, t[1] - this._jsPlumb.heightToUse / 2, this._jsPlumb.widthToUse, this._jsPlumb.heightToUse] : [0, 0, 0, 0];
      }, this.canvas = e.createElement("img", { position: "absolute", margin: 0, padding: 0, outline: 0 }, this._jsPlumb.instance.endpointClass + a), this._jsPlumb.widthToUse && this.canvas.setAttribute("width", this._jsPlumb.widthToUse), this._jsPlumb.heightToUse && this.canvas.setAttribute("height", this._jsPlumb.heightToUse), this._jsPlumb.instance.appendElement(this.canvas), this.actuallyPaint = function (t, e, i) {
        if (!this._jsPlumb.deleted) {
          this._jsPlumb.initialized || (this.canvas.setAttribute("src", this._jsPlumb.img.src), this.appendDisplayElement(this.canvas), this._jsPlumb.initialized = !0);var s = this.anchorPoint[0] - this._jsPlumb.widthToUse / 2,
              o = this.anchorPoint[1] - this._jsPlumb.heightToUse / 2;n.sizeElement(this.canvas, s, o, this._jsPlumb.widthToUse, this._jsPlumb.heightToUse);
        }
      }, this.paint = function (e, n) {
        null != this._jsPlumb && (this._jsPlumb.ready ? this.actuallyPaint(e, n) : t.setTimeout(function () {
          this.paint(e, n);
        }.bind(this), 200));
      };
    }, n.extend(e.Endpoints.Image, [o, e.Endpoints.AbstractEndpoint], { cleanup: function cleanup(t) {
        t && (this._jsPlumb.deleted = !0, this.canvas && this.canvas.parentNode.removeChild(this.canvas), this.canvas = null);
      } }), e.Endpoints.Blank = function (t) {
      e.Endpoints.AbstractEndpoint.apply(this, arguments);this.type = "Blank", o.apply(this, arguments), this._compute = function (t, e, n, i) {
        return [t[0], t[1], 10, 0];
      };var i = t.cssClass ? " " + t.cssClass : "";this.canvas = e.createElement("div", { display: "block", width: "1px", height: "1px", background: "transparent", position: "absolute" }, this._jsPlumb.instance.endpointClass + i), this._jsPlumb.instance.appendElement(this.canvas), this.paint = function (t, e) {
        n.sizeElement(this.canvas, this.x, this.y, this.w, this.h);
      };
    }, n.extend(e.Endpoints.Blank, [e.Endpoints.AbstractEndpoint, o], { cleanup: function cleanup() {
        this.canvas && this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
      } }), e.Endpoints.Triangle = function (t) {
      this.type = "Triangle", e.Endpoints.AbstractEndpoint.apply(this, arguments);var n = this;(t = t || {}).width = t.width || 55, t.height = t.height || 55, this.width = t.width, this.height = t.height, this._compute = function (t, e, i, s) {
        var o = i.width || n.width,
            r = i.height || n.height;return [t[0] - o / 2, t[1] - r / 2, o, r];
      };
    };var r = e.Overlays.AbstractOverlay = function (t) {
      this.visible = !0, this.isAppendedAtTopLevel = !0, this.component = t.component, this.loc = null == t.location ? .5 : t.location, this.endpointLoc = null == t.endpointLocation ? [.5, .5] : t.endpointLocation, this.visible = !1 !== t.visible;
    };r.prototype = { cleanup: function cleanup(t) {
        t && (this.component = null, this.canvas = null, this.endpointLoc = null);
      }, reattach: function reattach(t, e) {}, setVisible: function setVisible(t) {
        this.visible = t, this.component.repaint();
      }, isVisible: function isVisible() {
        return this.visible;
      }, hide: function hide() {
        this.setVisible(!1);
      }, show: function show() {
        this.setVisible(!0);
      }, incrementLocation: function incrementLocation(t) {
        this.loc += t, this.component.repaint();
      }, setLocation: function setLocation(t) {
        this.loc = t, this.component.repaint();
      }, getLocation: function getLocation() {
        return this.loc;
      }, updateFrom: function updateFrom() {} }, e.Overlays.Arrow = function (t) {
      this.type = "Arrow", r.apply(this, arguments), this.isAppendedAtTopLevel = !1, t = t || {};var s = this;this.length = t.length || 20, this.width = t.width || 20, this.id = t.id;var o = (t.direction || 1) < 0 ? -1 : 1,
          a = t.paintStyle || { "stroke-width": 1 },
          l = t.foldback || .623;this.computeMaxSize = function () {
        return 1.5 * s.width;
      }, this.elementCreated = function (n, i) {
        if (this.path = n, t.events) for (var s in t.events) {
          e.on(n, s, t.events[s]);
        }
      }, this.draw = function (t, e) {
        var s, r, u, c;if (t.pointAlongPathFrom) {
          if (n.isString(this.loc) || this.loc > 1 || this.loc < 0) {
            var h = parseInt(this.loc, 10),
                d = this.loc < 0 ? 1 : 0;s = t.pointAlongPathFrom(d, h, !1), r = t.pointAlongPathFrom(d, h - o * this.length / 2, !1), u = i.pointOnLine(s, r, this.length);
          } else if (1 === this.loc) {
            if (s = t.pointOnPath(this.loc), r = t.pointAlongPathFrom(this.loc, -this.length), u = i.pointOnLine(s, r, this.length), -1 === o) {
              var p = u;u = s, s = p;
            }
          } else if (0 === this.loc) {
            if (u = t.pointOnPath(this.loc), r = t.pointAlongPathFrom(this.loc, this.length), s = i.pointOnLine(u, r, this.length), -1 === o) {
              var f = u;u = s, s = f;
            }
          } else s = t.pointAlongPathFrom(this.loc, o * this.length / 2), r = t.pointOnPath(this.loc), u = i.pointOnLine(s, r, this.length);var g = { hxy: s, tail: c = i.perpendicularLineTo(s, u, this.width), cxy: i.pointOnLine(s, u, l * this.length) },
              m = a.stroke || e.stroke,
              v = a.fill || e.stroke;return { component: t, d: g, "stroke-width": a.strokeWidth || e.strokeWidth, stroke: m, fill: v, minX: Math.min(s.x, c[0].x, c[1].x), maxX: Math.max(s.x, c[0].x, c[1].x), minY: Math.min(s.y, c[0].y, c[1].y), maxY: Math.max(s.y, c[0].y, c[1].y) };
        }return { component: t, minX: 0, maxX: 0, minY: 0, maxY: 0 };
      };
    }, n.extend(e.Overlays.Arrow, r, { updateFrom: function updateFrom(t) {
        this.length = t.length || this.length, this.width = t.width || this.width, this.direction = null != t.direction ? t.direction : this.direction, this.foldback = t.foldback || this.foldback;
      } }), e.Overlays.PlainArrow = function (t) {
      t = t || {};var n = e.extend(t, { foldback: 1 });e.Overlays.Arrow.call(this, n), this.type = "PlainArrow";
    }, n.extend(e.Overlays.PlainArrow, e.Overlays.Arrow), e.Overlays.Diamond = function (t) {
      var n = (t = t || {}).length || 40,
          i = e.extend(t, { length: n / 2, foldback: 2 });e.Overlays.Arrow.call(this, i), this.type = "Diamond";
    }, n.extend(e.Overlays.Diamond, e.Overlays.Arrow);var a = function a(t, e) {
      return (null == t._jsPlumb.cachedDimensions || e) && (t._jsPlumb.cachedDimensions = t.getDimensions()), t._jsPlumb.cachedDimensions;
    },
        l = function l(t) {
      e.jsPlumbUIComponent.apply(this, arguments), r.apply(this, arguments);var i = this.fire;this.fire = function () {
        i.apply(this, arguments), this.component && this.component.fire.apply(this.component, arguments);
      }, this.detached = !1, this.id = t.id, this._jsPlumb.div = null, this._jsPlumb.initialised = !1, this._jsPlumb.component = t.component, this._jsPlumb.cachedDimensions = null, this._jsPlumb.create = t.create, this._jsPlumb.initiallyInvisible = !1 === t.visible, this.getElement = function () {
        if (null == this._jsPlumb.div) {
          var n = this._jsPlumb.div = e.getElement(this._jsPlumb.create(this._jsPlumb.component));n.style.position = "absolute", n.className = this._jsPlumb.instance.overlayClass + " " + (this.cssClass ? this.cssClass : t.cssClass ? t.cssClass : ""), this._jsPlumb.instance.appendElement(n), this._jsPlumb.instance.getId(n), this.canvas = n;var i = "translate(-50%, -50%)";n.style.webkitTransform = i, n.style.mozTransform = i, n.style.msTransform = i, n.style.oTransform = i, n.style.transform = i, n._jsPlumb = this, !1 === t.visible && (n.style.display = "none");
        }return this._jsPlumb.div;
      }, this.draw = function (t, e, i) {
        var s = a(this);if (null != s && 2 === s.length) {
          var o = { x: 0, y: 0 };if (i) o = { x: i[0], y: i[1] };else if (t.pointOnPath) {
            var r = this.loc,
                l = !1;(n.isString(this.loc) || this.loc < 0 || this.loc > 1) && (r = parseInt(this.loc, 10), l = !0), o = t.pointOnPath(r, l);
          } else {
            var u = this.loc.constructor === Array ? this.loc : this.endpointLoc;o = { x: u[0] * t.w, y: u[1] * t.h };
          }var c = o.x - s[0] / 2,
              h = o.y - s[1] / 2;return { component: t, d: { minx: c, miny: h, td: s, cxy: o }, minX: c, maxX: c + s[0], minY: h, maxY: h + s[1] };
        }return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
      };
    };n.extend(l, [e.jsPlumbUIComponent, r], { getDimensions: function getDimensions() {
        return [1, 1];
      }, setVisible: function setVisible(t) {
        this._jsPlumb.div && (this._jsPlumb.div.style.display = t ? "block" : "none", t && this._jsPlumb.initiallyInvisible && (a(this, !0), this.component.repaint(), this._jsPlumb.initiallyInvisible = !1));
      }, clearCachedDimensions: function clearCachedDimensions() {
        this._jsPlumb.cachedDimensions = null;
      }, cleanup: function cleanup(t) {
        t ? null != this._jsPlumb.div && (this._jsPlumb.div._jsPlumb = null, this._jsPlumb.instance.removeElement(this._jsPlumb.div)) : (this._jsPlumb && this._jsPlumb.div && this._jsPlumb.div.parentNode && this._jsPlumb.div.parentNode.removeChild(this._jsPlumb.div), this.detached = !0);
      }, reattach: function reattach(t, e) {
        null != this._jsPlumb.div && t.getContainer().appendChild(this._jsPlumb.div), this.detached = !1;
      }, computeMaxSize: function computeMaxSize() {
        var t = a(this);return Math.max(t[0], t[1]);
      }, paint: function paint(t, e) {
        this._jsPlumb.initialised || (this.getElement(), t.component.appendDisplayElement(this._jsPlumb.div), this._jsPlumb.initialised = !0, this.detached && this._jsPlumb.div.parentNode.removeChild(this._jsPlumb.div)), this._jsPlumb.div.style.left = t.component.x + t.d.minx + "px", this._jsPlumb.div.style.top = t.component.y + t.d.miny + "px";
      } }), e.Overlays.Custom = function (t) {
      this.type = "Custom", l.apply(this, arguments);
    }, n.extend(e.Overlays.Custom, l), e.Overlays.GuideLines = function () {
      var t = this;t.length = 50, t.strokeWidth = 5, this.type = "GuideLines", r.apply(this, arguments), e.jsPlumbUIComponent.apply(this, arguments), this.draw = function (e, n) {
        var s = e.pointAlongPathFrom(t.loc, t.length / 2),
            o = e.pointOnPath(t.loc),
            r = i.pointOnLine(s, o, t.length),
            a = i.perpendicularLineTo(s, r, 40),
            l = i.perpendicularLineTo(r, s, 20);return { connector: e, head: s, tail: r, headLine: l, tailLine: a, minX: Math.min(s.x, r.x, l[0].x, l[1].x), minY: Math.min(s.y, r.y, l[0].y, l[1].y), maxX: Math.max(s.x, r.x, l[0].x, l[1].x), maxY: Math.max(s.y, r.y, l[0].y, l[1].y) };
      };
    }, e.Overlays.Label = function (t) {
      this.labelStyle = t.labelStyle;this.cssClass = null != this.labelStyle ? this.labelStyle.cssClass : null;var n = e.extend({ create: function create() {
          return e.createElement("div");
        } }, t);if (e.Overlays.Custom.call(this, n), this.type = "Label", this.label = t.label || "", this.labelText = null, this.labelStyle) {
        var i = this.getElement();if (this.labelStyle.font = this.labelStyle.font || "12px sans-serif", i.style.font = this.labelStyle.font, i.style.color = this.labelStyle.color || "black", this.labelStyle.fill && (i.style.background = this.labelStyle.fill), this.labelStyle.borderWidth > 0) {
          var s = this.labelStyle.borderStyle ? this.labelStyle.borderStyle : "black";i.style.border = this.labelStyle.borderWidth + "px solid " + s;
        }this.labelStyle.padding && (i.style.padding = this.labelStyle.padding);
      }
    }, n.extend(e.Overlays.Label, e.Overlays.Custom, { cleanup: function cleanup(t) {
        t && (this.div = null, this.label = null, this.labelText = null, this.cssClass = null, this.labelStyle = null);
      }, getLabel: function getLabel() {
        return this.label;
      }, setLabel: function setLabel(t) {
        this.label = t, this.labelText = null, this.clearCachedDimensions(), this.update(), this.component.repaint();
      }, getDimensions: function getDimensions() {
        return this.update(), l.prototype.getDimensions.apply(this, arguments);
      }, update: function update() {
        if ("function" == typeof this.label) {
          var t = this.label(this);this.getElement().innerHTML = t.replace(/\r\n/g, "<br/>");
        } else null == this.labelText && (this.labelText = this.label, this.getElement().innerHTML = this.labelText.replace(/\r\n/g, "<br/>"));
      }, updateFrom: function updateFrom(t) {
        null != t.label && this.setLabel(t.label);
      } });
  }.call("undefined" != typeof window ? window : k), function () {
    var t = this,
        e = t.jsPlumb;e.extend(t.jsPlumbInstance.prototype, { getEventManager: function getEventManager() {
        return (n = (e = this)._mottle) || (n = e._mottle = new t.Mottle()), n;var e, n;
      }, on: function on(t, e, n) {
        return this.getEventManager().on.apply(this, arguments), this;
      }, off: function off(t, e, n) {
        return this.getEventManager().off.apply(this, arguments), this;
      } });
  }.call("undefined" != typeof window ? window : k), function () {
    var t = this,
        e = t.jsPlumbUtil,
        n = t.jsPlumbInstance,
        i = "stop",
        s = "revert",
        o = "_jsPlumbGroup",
        r = "show",
        a = "hide",
        l = function l(t) {
      var n = {},
          i = {},
          s = {},
          l = this;function u(e, n) {
        for (var i = e.getMembers(), s = 0; s < i.length; s++) {
          t[n ? r : a](i[s], !0);
        }
      }t.bind("connection", function (t) {
        null != t.source[o] && null != t.target[o] && t.source[o] === t.target[o] ? (i[t.connection.id] = t.source[o], s[t.connection.id] = t.source[o]) : (null != t.source[o] && (e.suggest(t.source[o].connections.source, t.connection), i[t.connection.id] = t.source[o]), null != t.target[o] && (e.suggest(t.target[o].connections.target, t.connection), s[t.connection.id] = t.target[o]));
      }), t.bind("internal.connectionDetached", function (t) {
        !function (t) {
          delete t.proxies;var n,
              o = i[t.id];null != o && (n = function n(e) {
            return e.id === t.id;
          }, e.removeWithFunction(o.connections.source, n), e.removeWithFunction(o.connections.target, n), delete i[t.id]), null != (o = s[t.id]) && (n = function n(e) {
            return e.id === t.id;
          }, e.removeWithFunction(o.connections.source, n), e.removeWithFunction(o.connections.target, n), delete s[t.id]);
        }(t.connection);
      }), t.bind("connectionMoved", function (t) {
        var e = (0 === t.index ? i : s)[t.connection.id];if (e) {
          var n = e.connections[0 === t.index ? "source" : "target"],
              o = n.indexOf(t.connection);-1 !== o && n.splice(o, 1);
        }
      }), this.addGroup = function (e) {
        t.addClass(e.getEl(), "jtk-group-expanded"), n[e.id] = e, e.manager = this, d(e), t.fire("group:add", { group: e });
      }, this.addToGroup = function (e, n, i) {
        if (e = this.getGroup(e)) {
          var s = e.getEl();if (n._isJsPlumbGroup) return;var o = n._jsPlumbGroup;if (o !== e) {
            var r = t.getOffset(n, !0),
                a = e.collapsed ? t.getOffset(s, !0) : t.getOffset(e.getDragArea(), !0);null != o && (o.remove(n, i), l.updateConnectionsForGroup(o)), e.add(n, i);var u = function u(t, n) {
              var i = 0 === n ? 1 : 0;t.each(function (t) {
                t.setVisible(!1), t.endpoints[i].element._jsPlumbGroup === e ? (t.endpoints[i].setVisible(!1), l.expandConnection(t, i, e)) : (t.endpoints[n].setVisible(!1), l.collapseConnection(t, n, e));
              });
            };e.collapsed && (u(t.select({ source: n }), 0), u(t.select({ target: n }), 1));var c = t.getId(n);t.dragManager.setParent(n, c, s, t.getId(s), r);var h = { left: r.left - a.left, top: r.top - a.top };t.setPosition(n, h), t.dragManager.revalidateParent(n, c, r), l.updateConnectionsForGroup(e), t.revalidate(c), setTimeout(function () {
              t.fire("group:addMember", { group: e, el: n });
            }, 0);
          }
        }
      }, this.removeFromGroup = function (t, e, n) {
        (t = this.getGroup(t)) && t.remove(e, null, n);
      }, this.getGroup = function (t) {
        var i = t;if (e.isString(t) && null == (i = n[t])) throw new TypeError("No such group [" + t + "]");return i;
      }, this.getGroups = function () {
        var t = [];for (var e in n) {
          t.push(n[e]);
        }return t;
      }, this.removeGroup = function (e, i, s, o) {
        e = this.getGroup(e), this.expandGroup(e, !0), e[i ? "removeAll" : "orphanAll"](s, o), t.remove(e.getEl()), delete n[e.id], delete t._groups[e.id], t.fire("group:remove", { group: e });
      }, this.removeAllGroups = function (t, e, i) {
        for (var s in n) {
          this.removeGroup(n[s], t, e, i);
        }
      };var c = this.collapseConnection = function (e, n, i) {
        var s,
            r = i.getEl(),
            a = t.getId(r),
            l = e.endpoints[n].elementId,
            u = e.endpoints[0 === n ? 1 : 0].element;u[o] && !u[o].shouldProxy() && u[o].collapsed || (e.proxies = e.proxies || [], (s = e.proxies[n] ? e.proxies[n].ep : t.addEndpoint(r, { endpoint: i.getEndpoint(e, n), anchor: i.getAnchor(e, n), parameters: { isProxyEndpoint: !0 } })).setDeleteOnEmpty(!0), e.proxies[n] = { ep: s, originalEp: e.endpoints[n] }, 0 === n ? t.anchorManager.sourceChanged(l, a, e, r) : (t.anchorManager.updateOtherEndpoint(e.endpoints[0].elementId, l, a, e), e.target = r, e.targetId = a), e.proxies[n].originalEp.detachFromConnection(e, null, !0), s.connections = [e], e.endpoints[n] = s, e.setVisible(!0));
      };this.collapseGroup = function (e) {
        if (null != (e = this.getGroup(e)) && !e.collapsed) {
          var n = e.getEl();if (u(e, !1), e.shouldProxy()) {
            var i = function i(t, n) {
              for (var i = 0; i < t.length; i++) {
                var s = t[i];c(s, n, e);
              }
            };i(e.connections.source, 0), i(e.connections.target, 1);
          }e.collapsed = !0, t.removeClass(n, "jtk-group-expanded"), t.addClass(n, "jtk-group-collapsed"), t.revalidate(n), t.fire("group:collapse", { group: e });
        }
      };var h = this.expandConnection = function (e, n, i) {
        if (null != e.proxies && null != e.proxies[n]) {
          var s = t.getId(i.getEl()),
              o = e.proxies[n].originalEp.element,
              r = e.proxies[n].originalEp.elementId;e.endpoints[n] = e.proxies[n].originalEp, 0 === n ? t.anchorManager.sourceChanged(s, r, e, o) : (t.anchorManager.updateOtherEndpoint(e.endpoints[0].elementId, s, r, e), e.target = o, e.targetId = r), e.proxies[n].ep.detachFromConnection(e, null), e.proxies[n].originalEp.addConnection(e), delete e.proxies[n];
        }
      };function d(e) {
        var n = e.getMembers(),
            o = t.getConnections({ source: n }, !0),
            r = t.getConnections({ target: n }, !0),
            a = {};e.connections.source.length = 0, e.connections.target.length = 0;var l = function l(t) {
          for (var n = 0; n < t.length; n++) {
            a[t[n].id] || (a[t[n].id] = !0, t[n].source._jsPlumbGroup === e ? (t[n].target._jsPlumbGroup !== e && e.connections.source.push(t[n]), i[t[n].id] = e) : t[n].target._jsPlumbGroup === e && (e.connections.target.push(t[n]), s[t[n].id] = e));
          }
        };l(o), l(r);
      }this.expandGroup = function (e, n) {
        if (null != (e = this.getGroup(e)) && e.collapsed) {
          var i = e.getEl();if (u(e, !0), e.shouldProxy()) {
            var s = function s(t, n) {
              for (var i = 0; i < t.length; i++) {
                var s = t[i];h(s, n, e);
              }
            };s(e.connections.source, 0), s(e.connections.target, 1);
          }e.collapsed = !1, t.addClass(i, "jtk-group-expanded"), t.removeClass(i, "jtk-group-collapsed"), t.revalidate(i), this.repaintGroup(e), n || t.fire("group:expand", { group: e });
        }
      }, this.repaintGroup = function (e) {
        for (var n = (e = this.getGroup(e)).getMembers(), i = 0; i < n.length; i++) {
          t.revalidate(n[i]);
        }
      }, this.updateConnectionsForGroup = d, this.refreshAllGroups = function () {
        for (var e in n) {
          d(n[e]), t.dragManager.updateOffsets(t.getId(n[e].getEl()));
        }
      };
    },
        u = function u(n, r) {
      var a = this,
          l = r.el;this.getEl = function () {
        return l;
      }, this.id = r.id || e.uuid(), l._isJsPlumbGroup = !0;var u = this.getDragArea = function () {
        var t = n.getSelector(l, "[jtk-group-content]");return t && t.length > 0 ? t[0] : l;
      },
          c = !0 === r.ghost,
          h = c || !0 === r.constrain,
          d = !1 !== r.revert,
          p = !0 === r.orphan,
          f = !0 === r.prune,
          g = !0 === r.dropOverride,
          m = !1 !== r.proxied,
          v = [];if (this.connections = { source: [], target: [], internal: [] }, this.getAnchor = function (t, e) {
        return r.anchor || "Continuous";
      }, this.getEndpoint = function (t, e) {
        return r.endpoint || ["Dot", { radius: 10 }];
      }, this.collapsed = !1, !1 !== r.draggable) {
        var b = { stop: function stop(t) {
            n.fire("groupDragStop", jsPlumb.extend(t, { group: a }));
          }, scope: "_jsPlumbGroupDrag" };r.dragOptions && t.jsPlumb.extend(b, r.dragOptions), n.draggable(r.el, b);
      }!1 !== r.droppable && n.droppable(r.el, { drop: function drop(t) {
          var e = t.drag.el;if (!e._isJsPlumbGroup) {
            var i = e._jsPlumbGroup;if (i !== a) {
              if (null != i && i.overrideDrop(e, a)) return;n.getGroupManager().addToGroup(a, e, !1);
            }
          }
        } });var y = function y(t, e) {
        for (var n = null == t.nodeType ? t : [t], i = 0; i < n.length; i++) {
          e(n[i]);
        }
      };function P(t, e) {
        var i = function (t) {
          return t.offsetParent;
        }(t),
            s = n.getSize(i),
            o = n.getSize(t),
            r = e[0],
            a = r + o[0],
            l = e[1],
            u = l + o[1];return a > 0 && r < s[0] && u > 0 && l < s[1];
      }function _(t) {
        var e = n.getId(t),
            i = n.getOffset(t);t.parentNode.removeChild(t), n.getContainer().appendChild(t), n.setPosition(t, i), delete t._jsPlumbGroup, E(t), n.dragManager.clearParent(t, e);
      }function x(t) {
        if (!P(t.el, t.pos)) {
          var e = t.el._jsPlumbGroup;f ? n.remove(t.el) : _(t.el), e.remove(t.el);
        }
      }function C(t) {
        var e = n.getId(t);n.revalidate(t), n.dragManager.revalidateParent(t, e);
      }function E(t) {
        t._katavorioDrag && ((f || p) && t._katavorioDrag.off(i, x), f || p || !d || (t._katavorioDrag.off(s, C), t._katavorioDrag.setRevert(null)));
      }function j(t) {
        t._katavorioDrag && ((f || p) && t._katavorioDrag.on(i, x), h && t._katavorioDrag.setConstrain(!0), c && t._katavorioDrag.setUseGhostProxy(!0), f || p || !d || (t._katavorioDrag.on(s, C), t._katavorioDrag.setRevert(function (t, e) {
          return !P(t, e);
        })));
      }this.overrideDrop = function (t, e) {
        return g && (d || f || p);
      }, this.add = function (t, e) {
        var i = u();y(t, function (t) {
          if (null != t._jsPlumbGroup) {
            if (t._jsPlumbGroup === a) return;t._jsPlumbGroup.remove(t, !0, e, !1);
          }t._jsPlumbGroup = a, v.push(t), n.isAlreadyDraggable(t) && j(t), t.parentNode !== i && i.appendChild(t), e || n.fire("group:addMember", { group: a, el: t });
        }), n.getGroupManager().updateConnectionsForGroup(a);
      }, this.remove = function (t, i, s, o) {
        y(t, function (t) {
          if (delete t._jsPlumbGroup, e.removeWithFunction(v, function (e) {
            return e === t;
          }), i) try {
            a.getDragArea().removeChild(t);
          } catch (o) {
            jsPlumbUtil.log("Could not remove element from Group " + o);
          }E(t), s || n.fire("group:removeMember", { group: a, el: t });
        }), o || n.getGroupManager().updateConnectionsForGroup(a);
      }, this.removeAll = function (t, e) {
        for (var i = 0, s = v.length; i < s; i++) {
          a.remove(v[0], t, e, !0);
        }v.length = 0, n.getGroupManager().updateConnectionsForGroup(a);
      }, this.orphanAll = function () {
        for (var t = 0; t < v.length; t++) {
          _(v[t]);
        }v.length = 0;
      }, this.getMembers = function () {
        return v;
      }, l[o] = this, n.bind("elementDraggable", function (t) {
        t.el._jsPlumbGroup === this && j(t.el);
      }.bind(this)), this.shouldProxy = function () {
        return m;
      }, n.getGroupManager().addGroup(this);
    };n.prototype.addGroup = function (t) {
      var e = this;if (e._groups = e._groups || {}, null != e._groups[t.id]) throw new TypeError("cannot create Group [" + t.id + "]; a Group with that ID exists");if (null != t.el[o]) throw new TypeError("cannot create Group [" + t.id + "]; the given element is already a Group");var n = new u(e, t);return e._groups[n.id] = n, t.collapsed && this.collapseGroup(n), n;
    }, n.prototype.addToGroup = function (t, e, n) {
      var i = function (e) {
        var i = this.getId(e);this.manage(i, e), this.getGroupManager().addToGroup(t, e, n);
      }.bind(this);if (Array.isArray(e)) for (var s = 0; s < e.length; s++) {
        i(e[s]);
      } else i(e);
    }, n.prototype.removeFromGroup = function (t, e, n) {
      this.getGroupManager().removeFromGroup(t, e, n);
    }, n.prototype.removeGroup = function (t, e, n, i) {
      this.getGroupManager().removeGroup(t, e, n, i);
    }, n.prototype.removeAllGroups = function (t, e, n) {
      this.getGroupManager().removeAllGroups(t, e, n);
    }, n.prototype.getGroup = function (t) {
      return this.getGroupManager().getGroup(t);
    }, n.prototype.getGroups = function () {
      return this.getGroupManager().getGroups();
    }, n.prototype.expandGroup = function (t) {
      this.getGroupManager().expandGroup(t);
    }, n.prototype.collapseGroup = function (t) {
      this.getGroupManager().collapseGroup(t);
    }, n.prototype.repaintGroup = function (t) {
      this.getGroupManager().repaintGroup(t);
    }, n.prototype.toggleGroup = function (t) {
      null != (t = this.getGroupManager().getGroup(t)) && this.getGroupManager()[t.collapsed ? "expandGroup" : "collapseGroup"](t);
    }, n.prototype.getGroupManager = function () {
      var t = this._groupManager;return null == t && (t = this._groupManager = new l(this)), t;
    }, n.prototype.removeGroupManager = function () {
      delete this._groupManager;
    }, n.prototype.getGroupFor = function (t) {
      if (t = this.getElement(t)) return t[o];
    };
  }.call("undefined" != typeof window ? window : k), function () {
    var t = this.jsPlumb,
        e = function e(_e7) {
      this.type = "Flowchart", (_e7 = _e7 || {}).stub = null == _e7.stub ? 30 : _e7.stub;var n,
          i = t.Connectors.AbstractConnector.apply(this, arguments),
          s = null == _e7.midpoint ? .5 : _e7.midpoint,
          o = !0 === _e7.alwaysRespectStubs,
          r = null,
          a = null,
          l = null != _e7.cornerRadius ? _e7.cornerRadius : 0,
          u = (_e7.loopbackRadius, function (t) {
        return t < 0 ? -1 : 0 === t ? 0 : 1;
      }),
          c = function c(t, e, n, i) {
        if (r !== e || a !== n) {
          var s = null == r ? i.sx : r,
              o = null == a ? i.sy : a,
              l = s === e ? "v" : "h",
              c = u(e - s),
              h = u(n - o);r = e, a = n, t.push([s, o, e, n, l, c, h]);
        }
      },
          h = function h(t) {
        return Math.sqrt(Math.pow(t[0] - t[2], 2) + Math.pow(t[1] - t[3], 2));
      },
          d = function d(t) {
        var e = [];return e.push.apply(e, t), e;
      };this._compute = function (t, e) {
        n = [], r = null, a = null, null;var u = function u() {
          return [t.startStubX, t.startStubY, t.endStubX, t.endStubY];
        },
            p = { perpendicular: u, orthogonal: u, opposite: function opposite(e) {
            var n = t,
                i = "x" === e ? 0 : 1;return !o && { x: function x() {
                return 1 === n.so[i] && (n.startStubX > n.endStubX && n.tx > n.startStubX || n.sx > n.endStubX && n.tx > n.sx) || -1 === n.so[i] && (n.startStubX < n.endStubX && n.tx < n.startStubX || n.sx < n.endStubX && n.tx < n.sx);
              }, y: function y() {
                return 1 === n.so[i] && (n.startStubY > n.endStubY && n.ty > n.startStubY || n.sy > n.endStubY && n.ty > n.sy) || -1 === n.so[i] && (n.startStubY < n.endStubY && n.ty < n.startStubY || n.sy < n.endStubY && n.ty < n.sy);
              } }[e]() ? { x: [(t.sx + t.tx) / 2, t.startStubY, (t.sx + t.tx) / 2, t.endStubY], y: [t.startStubX, (t.sy + t.ty) / 2, t.endStubX, (t.sy + t.ty) / 2] }[e] : [t.startStubX, t.startStubY, t.endStubX, t.endStubY];
          } }[t.anchorOrientation](t.sourceAxis),
            f = "x" === t.sourceAxis ? 0 : 1,
            g = "x" === t.sourceAxis ? 1 : 0,
            m = p[f],
            v = p[g],
            b = p[f + 2],
            y = p[g + 2];c(n, p[0], p[1], t);var P = t.startStubX + (t.endStubX - t.startStubX) * s,
            _ = t.startStubY + (t.endStubY - t.startStubY) * s,
            x = { x: [0, 1], y: [1, 0] },
            C = { perpendicular: function perpendicular(e) {
            var n = t,
                i = { x: [[n.startStubX, n.endStubX], null, [n.endStubX, n.startStubX]], y: [[n.startStubY, n.endStubY], null, [n.endStubY, n.startStubY]] },
                s = { x: [[P, n.startStubY], [P, n.endStubY]], y: [[n.startStubX, _], [n.endStubX, _]] },
                o = { x: [[n.endStubX, n.startStubY]], y: [[n.startStubX, n.endStubY]] },
                r = { x: [[n.startStubX, n.endStubY], [n.endStubX, n.endStubY]], y: [[n.endStubX, n.startStubY], [n.endStubX, n.endStubY]] },
                a = { x: [[n.startStubX, _], [n.endStubX, _], [n.endStubX, n.endStubY]], y: [[P, n.startStubY], [P, n.endStubY], [n.endStubX, n.endStubY]] },
                l = { x: [n.startStubY, n.endStubY], y: [n.startStubX, n.endStubX] },
                u = x[e][0],
                c = x[e][1],
                h = n.so[u] + 1,
                d = n.to[c] + 1,
                p = -1 === n.to[c] && l[e][1] < l[e][0] || 1 === n.to[c] && l[e][1] > l[e][0],
                f = i[e][h][0],
                g = i[e][h][1],
                m = { x: [[[1, 2, 3, 4], null, [2, 1, 4, 3]], null, [[4, 3, 2, 1], null, [3, 4, 1, 2]]], y: [[[3, 2, 1, 4], null, [2, 3, 4, 1]], null, [[4, 1, 2, 3], null, [1, 4, 3, 2]]] }[e][h][d];return n.segment === m[3] || n.segment === m[2] && p ? s[e] : n.segment === m[2] && g < f ? o[e] : n.segment === m[2] && g >= f || n.segment === m[1] && !p ? a[e] : n.segment === m[0] || n.segment === m[1] && p ? r[e] : void 0;
          }, orthogonal: function orthogonal(e, n, i, s, o) {
            var r = t,
                a = { x: -1 === r.so[0] ? Math.min(n, s) : Math.max(n, s), y: -1 === r.so[1] ? Math.min(n, s) : Math.max(n, s) }[e];return { x: [[a, i], [a, o], [s, o]], y: [[i, a], [o, a], [o, s]] }[e];
          }, opposite: function opposite(n, s, o, r) {
            var a = t,
                l = { x: "y", y: "x" }[n],
                u = { x: "height", y: "width" }[n],
                c = a["is" + n.toUpperCase() + "GreaterThanStubTimes2"];if (e.sourceEndpoint.elementId === e.targetEndpoint.elementId) {
              var h = o + (1 - e.sourceEndpoint.anchor[l]) * e.sourceInfo[u] + i.maxStub;return { x: [[s, h], [r, h]], y: [[h, s], [h, r]] }[n];
            }return !c || 1 === a.so[f] && s > r || -1 === a.so[f] && s < r ? { x: [[s, _], [r, _]], y: [[P, s], [P, r]] }[n] : 1 === a.so[f] && s < r || -1 === a.so[f] && s > r ? { x: [[P, a.sy], [P, a.ty]], y: [[a.sx, _], [a.tx, _]] }[n] : void 0;
          } }[t.anchorOrientation](t.sourceAxis, m, v, b, y);if (C) for (var E = 0; E < C.length; E++) {
          c(n, C[E][0], C[E][1], t);
        }c(n, p[2], p[3], t), c(n, t.tx, t.ty, t), function (t, e, n) {
          for (var s, o = null, r = 0; r < e.length - 1; r++) {
            if (o = o || d(e[r]), s = d(e[r + 1]), l > 0 && o[4] !== s[4]) {
              var a = Math.min(l, h(o), h(s));o[2] -= o[5] * a, o[3] -= o[6] * a, s[0] += s[5] * a, s[1] += s[6] * a;var u = o[6] === s[5] && 1 === s[5] || o[6] === s[5] && 0 === s[5] && o[5] !== s[6] || o[6] === s[5] && -1 === s[5],
                  c = (s[1] > o[3] ? 1 : -1) == (s[0] > o[2] ? 1 : -1),
                  p = c && u || !c && !u ? s[0] : o[2],
                  f = c && u || !c && !u ? o[3] : s[1];i.addSegment(t, "Straight", { x1: o[0], y1: o[1], x2: o[2], y2: o[3] }), i.addSegment(t, "Arc", { r: a, x1: o[2], y1: o[3], x2: s[0], y2: s[1], cx: p, cy: f, ac: u });
            } else {
              var g = o[2] === o[0] ? 0 : o[2] > o[0] ? n.lw / 2 : -n.lw / 2,
                  m = o[3] === o[1] ? 0 : o[3] > o[1] ? n.lw / 2 : -n.lw / 2;i.addSegment(t, "Straight", { x1: o[0] - g, y1: o[1] - m, x2: o[2] + g, y2: o[3] + m });
            }o = s;
          }null != s && i.addSegment(t, "Straight", { x1: s[0], y1: s[1], x2: s[2], y2: s[3] });
        }(this, n, t);
      };
    };this.jsPlumbUtil.extend(e, t.Connectors.AbstractConnector), t.registerConnectorType(e, "Flowchart");
  }.call("undefined" != typeof window ? window : k), function () {
    var t = this.jsPlumb,
        e = this.jsPlumbUtil;t.Connectors.AbstractBezierConnector = function (e) {
      var n,
          i = !1 !== (e = e || {}).showLoopback,
          s = (e.curviness, e.margin || 5),
          o = (e.proximityLimit, e.orientation && "clockwise" === e.orientation),
          r = e.loopbackRadius || 25,
          a = !1;return this.overrideSetEditable = function () {
        return !a;
      }, this._compute = function (t, e) {
        var l = e.sourcePos,
            u = e.targetPos,
            c = Math.abs(l[0] - u[0]),
            h = Math.abs(l[1] - u[1]);if (i && e.sourceEndpoint.elementId === e.targetEndpoint.elementId) {
          a = !0;var d = e.sourcePos[0],
              p = e.sourcePos[1] - s,
              f = d,
              g = p - r,
              m = f - r,
              v = g - r;c = 2 * r, h = 2 * r, t.points[0] = m, t.points[1] = v, t.points[2] = c, t.points[3] = h, n.addSegment(this, "Arc", { loopback: !0, x1: d - m + 4, y1: p - v, startAngle: 0, endAngle: 2 * Math.PI, r: r, ac: !o, x2: d - m - 4, y2: p - v, cx: f - m, cy: g - v });
        } else a = !1, this._computeBezier(t, e, l, u, c, h);
      }, n = t.Connectors.AbstractConnector.apply(this, arguments);
    }, e.extend(t.Connectors.AbstractBezierConnector, t.Connectors.AbstractConnector);var n = function n(e) {
      e = e || {}, this.type = "Bezier";var n = t.Connectors.AbstractBezierConnector.apply(this, arguments),
          i = e.curviness || 150;this.getCurviness = function () {
        return i;
      }, this._findControlPoint = function (t, e, n, s, o, r, a) {
        var l = [];return r[0] !== a[0] || r[1] === a[1] ? (0 === a[0] ? l.push(n[0] < e[0] ? t[0] + 10 : t[0] - 10) : l.push(t[0] + i * a[0]), 0 === a[1] ? l.push(n[1] < e[1] ? t[1] + 10 : t[1] - 10) : l.push(t[1] + i * r[1])) : (0 === r[0] ? l.push(e[0] < n[0] ? t[0] + 10 : t[0] - 10) : l.push(t[0] - i * r[0]), 0 === r[1] ? l.push(e[1] < n[1] ? t[1] + 10 : t[1] - 10) : l.push(t[1] + i * a[1])), l;
      }, this._computeBezier = function (t, e, i, s, o, r) {
        var a,
            l,
            u = this.getGeometry(),
            c = i[0] < s[0] ? o : 0,
            h = i[1] < s[1] ? r : 0,
            d = i[0] < s[0] ? 0 : o,
            p = i[1] < s[1] ? 0 : r;(this.hasBeenEdited() || this.isEditing()) && null != u && null != u.controlPoints && null != u.controlPoints[0] && null != u.controlPoints[1] ? (a = u.controlPoints[0], l = u.controlPoints[1]) : (a = this._findControlPoint([c, h], i, s, e.sourceEndpoint, e.targetEndpoint, t.so, t.to), l = this._findControlPoint([d, p], s, i, e.targetEndpoint, e.sourceEndpoint, t.to, t.so)), n.setGeometry({ controlPoints: [a, l] }, !0), n.addSegment(this, "Bezier", { x1: c, y1: h, x2: d, y2: p, cp1x: a[0], cp1y: a[1], cp2x: l[0], cp2y: l[1] });
      };
    };e.extend(n, t.Connectors.AbstractBezierConnector), t.registerConnectorType(n, "Bezier");
  }.call("undefined" != typeof window ? window : k), function () {
    var t = this.jsPlumb,
        e = this.jsPlumbUtil,
        n = function n(e) {
      e = e || {}, this.type = "StateMachine";var n,
          i = t.Connectors.AbstractBezierConnector.apply(this, arguments),
          s = e.curviness || 10,
          o = e.margin || 5,
          r = e.proximityLimit || 80;e.orientation && e.orientation;this._computeBezier = function (t, e, a, l, u, c) {
        var h = e.sourcePos[0] < e.targetPos[0] ? 0 : u,
            d = e.sourcePos[1] < e.targetPos[1] ? 0 : c,
            p = e.sourcePos[0] < e.targetPos[0] ? u : 0,
            f = e.sourcePos[1] < e.targetPos[1] ? c : 0;0 === e.sourcePos[2] && (h -= o), 1 === e.sourcePos[2] && (h += o), 0 === e.sourcePos[3] && (d -= o), 1 === e.sourcePos[3] && (d += o), 0 === e.targetPos[2] && (p -= o), 1 === e.targetPos[2] && (p += o), 0 === e.targetPos[3] && (f -= o), 1 === e.targetPos[3] && (f += o);var g,
            m,
            v,
            b,
            y,
            P,
            _,
            x,
            C = (h + p) / 2,
            E = (d + f) / 2,
            j = (P = d, x = f, (y = h) <= (_ = p) && x <= P ? 1 : y <= _ && P <= x ? 2 : _ <= y && x >= P ? 3 : 4),
            S = Math.sqrt(Math.pow(p - h, 2) + Math.pow(f - d, 2)),
            D = i.getGeometry();(this.hasBeenEdited() || this.isEditing()) && null != D ? (g = D.controlPoints[0][0], v = D.controlPoints[0][1], m = D.controlPoints[1][0], b = D.controlPoints[1][1]) : (g = (n = function (t, e, n, i, s, o, r, a, l) {
          return a <= l ? [t, e] : 1 === n ? i[3] <= 0 && s[3] >= 1 ? [t + (i[2] < .5 ? -1 * o : o), e] : i[2] >= 1 && s[2] <= 0 ? [t, e + (i[3] < .5 ? -1 * r : r)] : [t + -1 * o, e + -1 * r] : 2 === n ? i[3] >= 1 && s[3] <= 0 ? [t + (i[2] < .5 ? -1 * o : o), e] : i[2] >= 1 && s[2] <= 0 ? [t, e + (i[3] < .5 ? -1 * r : r)] : [t + o, e + -1 * r] : 3 === n ? i[3] >= 1 && s[3] <= 0 ? [t + (i[2] < .5 ? -1 * o : o), e] : i[2] <= 0 && s[2] >= 1 ? [t, e + (i[3] < .5 ? -1 * r : r)] : [t + -1 * o, e + -1 * r] : 4 === n ? i[3] <= 0 && s[3] >= 1 ? [t + (i[2] < .5 ? -1 * o : o), e] : i[2] <= 0 && s[2] >= 1 ? [t, e + (i[3] < .5 ? -1 * r : r)] : [t + o, e + -1 * r] : void 0;
        }(C, E, j, e.sourcePos, e.targetPos, s, s, S, r))[0], m = n[0], v = n[1], b = n[1], i.setGeometry({ controlPoints: [n, n] }, !0)), i.addSegment(this, "Bezier", { x1: p, y1: f, x2: h, y2: d, cp1x: g, cp1y: v, cp2x: m, cp2y: b });
      };
    };e.extend(n, t.Connectors.AbstractBezierConnector), t.registerConnectorType(n, "StateMachine");
  }.call("undefined" != typeof window ? window : k), function () {
    var t = this.jsPlumb,
        e = this.jsPlumbUtil,
        n = function n(e) {
      this.type = "Straight";var n = t.Connectors.AbstractConnector.apply(this, arguments);this._compute = function (t, e) {
        n.addSegment(this, "Straight", { x1: t.sx, y1: t.sy, x2: t.startStubX, y2: t.startStubY }), n.addSegment(this, "Straight", { x1: t.startStubX, y1: t.startStubY, x2: t.endStubX, y2: t.endStubY }), n.addSegment(this, "Straight", { x1: t.endStubX, y1: t.endStubY, x2: t.tx, y2: t.ty });
      };
    };e.extend(n, t.Connectors.AbstractConnector), t.registerConnectorType(n, "Straight");
  }.call("undefined" != typeof window ? window : k), function () {
    var t = this.jsPlumb,
        e = this.jsPlumbUtil,
        n = { "stroke-linejoin": "stroke-linejoin", "stroke-dashoffset": "stroke-dashoffset", "stroke-linecap": "stroke-linecap" },
        i = "http://www.w3.org/2000/svg",
        s = function s(t, e) {
      for (var n in e) {
        t.setAttribute(n, "" + e[n]);
      }
    },
        o = function o(e, n) {
      return (n = n || {}).version = "1.1", n.xmlns = i, t.createElementNS(i, e, null, null, n);
    },
        r = function r(t) {
      return "position:absolute;left:" + t[0] + "px;top:" + t[1] + "px";
    },
        a = function a(t) {
      for (var e = t.querySelectorAll(" defs,linearGradient,radialGradient"), n = 0; n < e.length; n++) {
        e[n].parentNode.removeChild(e[n]);
      }
    },
        l = function l(t, e, i, s, r) {
      if (e.setAttribute("fill", i.fill ? i.fill : "none"), e.setAttribute("stroke", i.stroke ? i.stroke : "none"), i.gradient ? function (t, e, n, i, s) {
        var r,
            l = "jsplumb_gradient_" + s._jsPlumb.instance.idstamp();a(t), r = n.gradient.offset ? o("radialGradient", { id: l }) : o("linearGradient", { id: l, gradientUnits: "userSpaceOnUse" });var u = o("defs");t.appendChild(u), u.appendChild(r);for (var c = 0; c < n.gradient.stops.length; c++) {
          var h = 1 === s.segment || 2 === s.segment ? c : n.gradient.stops.length - 1 - c,
              d = n.gradient.stops[h][1],
              p = o("stop", { offset: Math.floor(100 * n.gradient.stops[c][0]) + "%", "stop-color": d });r.appendChild(p);
        }var f = n.stroke ? "stroke" : "fill";e.setAttribute(f, "url(#" + l + ")");
      }(t, e, i, 0, r) : (a(t), e.setAttribute("style", "")), i.strokeWidth && e.setAttribute("stroke-width", i.strokeWidth), i.dashstyle && i.strokeWidth && !i["stroke-dasharray"]) {
        var l = -1 === i.dashstyle.indexOf(",") ? " " : ",",
            u = i.dashstyle.split(l),
            c = "";u.forEach(function (t) {
          c += Math.floor(t * i.strokeWidth) + l;
        }), e.setAttribute("stroke-dasharray", c);
      } else i["stroke-dasharray"] && e.setAttribute("stroke-dasharray", i["stroke-dasharray"]);for (var h in n) {
        i[h] && e.setAttribute(n[h], i[h]);
      }
    },
        u = function u(t, e, n) {
      t.childNodes.length > n ? t.insertBefore(e, t.childNodes[n]) : t.appendChild(e);
    };e.svg = { node: o, attr: s, pos: r };var c = function c(n) {
      var i = n.pointerEventsSpec || "all",
          a = {};t.jsPlumbUIComponent.apply(this, n.originalArgs), this.canvas = null, this.path = null, this.svg = null, this.bgCanvas = null;var l = n.cssClass + " " + (n.originalArgs[0].cssClass || ""),
          u = { style: "", width: 0, height: 0, "pointer-events": i, position: "absolute" };this.svg = o("svg", u), n.useDivWrapper ? (this.canvas = t.createElement("div", { position: "absolute" }), e.sizeElement(this.canvas, 0, 0, 1, 1), this.canvas.className = l) : (s(this.svg, { class: l }), this.canvas = this.svg), n._jsPlumb.appendElement(this.canvas, n.originalArgs[0].parent), n.useDivWrapper && this.canvas.appendChild(this.svg);var c = [this.canvas];return this.getDisplayElements = function () {
        return c;
      }, this.appendDisplayElement = function (t) {
        c.push(t);
      }, this.paint = function (t, i, o) {
        if (null != t) {
          var l,
              u = [this.x, this.y],
              c = [this.w, this.h];null != o && (o.xmin < 0 && (u[0] += o.xmin), o.ymin < 0 && (u[1] += o.ymin), c[0] = o.xmax + (o.xmin < 0 ? -o.xmin : 0), c[1] = o.ymax + (o.ymin < 0 ? -o.ymin : 0)), n.useDivWrapper ? (e.sizeElement(this.canvas, u[0], u[1], c[0], c[1]), u[0] = 0, u[1] = 0, l = r([0, 0])) : l = r([u[0], u[1]]), a.paint.apply(this, arguments), s(this.svg, { style: l, width: c[0] || 0, height: c[1] || 0 });
        }
      }, { renderer: a };
    };e.extend(c, t.jsPlumbUIComponent, { cleanup: function cleanup(t) {
        t || null == this.typeId ? (this.canvas && (this.canvas._jsPlumb = null), this.svg && (this.svg._jsPlumb = null), this.bgCanvas && (this.bgCanvas._jsPlumb = null), this.canvas && this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas), this.bgCanvas && this.bgCanvas.parentNode && this.canvas.parentNode.removeChild(this.canvas), this.svg = null, this.canvas = null, this.path = null, this.group = null) : (this.canvas && this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas), this.bgCanvas && this.bgCanvas.parentNode && this.bgCanvas.parentNode.removeChild(this.bgCanvas));
      }, reattach: function reattach(t) {
        var e = t.getContainer();this.canvas && null == this.canvas.parentNode && e.appendChild(this.canvas), this.bgCanvas && null == this.bgCanvas.parentNode && e.appendChild(this.bgCanvas);
      }, setVisible: function setVisible(t) {
        this.canvas && (this.canvas.style.display = t ? "block" : "none");
      } }), t.ConnectorRenderers.svg = function (e) {
      var n = this,
          i = c.apply(this, [{ cssClass: e._jsPlumb.connectorClass + (this.isEditable() ? " " + e._jsPlumb.editableConnectorClass : ""), originalArgs: arguments, pointerEventsSpec: "none", _jsPlumb: e._jsPlumb }]),
          r = this.setEditable;this.setEditable = function (e) {
        var n = r.apply(this, [e]);t[n ? "addClass" : "removeClass"](this.canvas, this._jsPlumb.instance.editableConnectorClass);
      }, i.renderer.paint = function (i, r, a) {
        var c = n.getSegments(),
            h = [0, 0];if (a.xmin < 0 && (h[0] = -a.xmin), a.ymin < 0 && (h[1] = -a.ymin), c.length > 0) {
          var d = { d: n.getPathData(), transform: "translate(" + h[0] + "," + h[1] + ")", "pointer-events": e["pointer-events"] || "visibleStroke" },
              p = null;n.x, n.y, n.w, n.h;if (i.outlineStroke) {
            var f = i.outlineWidth || 1,
                g = i.strokeWidth + 2 * f;delete (p = t.extend({}, i)).gradient, p.stroke = i.outlineStroke, p.strokeWidth = g, null == n.bgPath ? (n.bgPath = o("path", d), t.addClass(n.bgPath, t.connectorOutlineClass), u(n.svg, n.bgPath, 0)) : s(n.bgPath, d), l(n.svg, n.bgPath, p, 0, n);
          }null == n.path ? (n.path = o("path", d), u(n.svg, n.path, i.outlineStroke ? 1 : 0)) : s(n.path, d), l(n.svg, n.path, i, 0, n);
        }
      };
    }, e.extend(t.ConnectorRenderers.svg, c);var h = t.SvgEndpoint = function (e) {
      c.apply(this, [{ cssClass: e._jsPlumb.endpointClass, originalArgs: arguments, pointerEventsSpec: "all", useDivWrapper: !0, _jsPlumb: e._jsPlumb }]).renderer.paint = function (e) {
        var n = t.extend({}, e);n.outlineStroke && (n.stroke = n.outlineStroke), null == this.node ? (this.node = this.makeNode(n), this.svg.appendChild(this.node)) : null != this.updateNode && this.updateNode(this.node), l(this.svg, this.node, n, (this.x, this.y, this.w, this.h), this), r(this.node, (this.x, this.y));
      }.bind(this);
    };e.extend(h, c), t.Endpoints.svg.Dot = function () {
      t.Endpoints.Dot.apply(this, arguments), h.apply(this, arguments), this.makeNode = function (t) {
        return o("circle", { cx: this.w / 2, cy: this.h / 2, r: this.radius });
      }, this.updateNode = function (t) {
        s(t, { cx: this.w / 2, cy: this.h / 2, r: this.radius });
      };
    }, e.extend(t.Endpoints.svg.Dot, [t.Endpoints.Dot, h]), t.Endpoints.svg.Rectangle = function () {
      t.Endpoints.Rectangle.apply(this, arguments), h.apply(this, arguments), this.makeNode = function (t) {
        return o("rect", { width: this.w, height: this.h });
      }, this.updateNode = function (t) {
        s(t, { width: this.w, height: this.h });
      };
    }, e.extend(t.Endpoints.svg.Rectangle, [t.Endpoints.Rectangle, h]), t.Endpoints.svg.Image = t.Endpoints.Image, t.Endpoints.svg.Blank = t.Endpoints.Blank, t.Overlays.svg.Label = t.Overlays.Label, t.Overlays.svg.Custom = t.Overlays.Custom;var d = function d(e, n) {
      e.apply(this, n), t.jsPlumbUIComponent.apply(this, n), this.isAppendedAtTopLevel = !1;this.path = null, this.paint = function (t, e) {
        if (t.component.svg && e) {
          null == this.path && (this.path = o("path", { "pointer-events": "all" }), t.component.svg.appendChild(this.path), this.elementCreated && this.elementCreated(this.path, t.component), this.canvas = t.component.svg);var r = n && 1 === n.length && n[0].cssClass || "",
              a = [0, 0];e.xmin < 0 && (a[0] = -e.xmin), e.ymin < 0 && (a[1] = -e.ymin), s(this.path, { d: i(t.d), class: r, stroke: t.stroke ? t.stroke : null, fill: t.fill ? t.fill : null, transform: "translate(" + a[0] + "," + a[1] + ")" });
        }
      };var i = function i(t) {
        return isNaN(t.cxy.x) || isNaN(t.cxy.y) ? "" : "M" + t.hxy.x + "," + t.hxy.y + " L" + t.tail[0].x + "," + t.tail[0].y + " L" + t.cxy.x + "," + t.cxy.y + " L" + t.tail[1].x + "," + t.tail[1].y + " L" + t.hxy.x + "," + t.hxy.y;
      };this.transfer = function (t) {
        t.canvas && this.path && this.path.parentNode && (this.path.parentNode.removeChild(this.path), t.canvas.appendChild(this.path));
      };
    };e.extend(d, [t.jsPlumbUIComponent, t.Overlays.AbstractOverlay], { cleanup: function cleanup(t) {
        null != this.path && (t ? this._jsPlumb.instance.removeElement(this.path) : this.path.parentNode && this.path.parentNode.removeChild(this.path));
      }, reattach: function reattach(t, e) {
        this.path && e.canvas && e.canvas.appendChild(this.path);
      }, setVisible: function setVisible(t) {
        null != this.path && (this.path.style.display = t ? "block" : "none");
      } }), t.Overlays.svg.Arrow = function () {
      d.apply(this, [t.Overlays.Arrow, arguments]);
    }, e.extend(t.Overlays.svg.Arrow, [t.Overlays.Arrow, d]), t.Overlays.svg.PlainArrow = function () {
      d.apply(this, [t.Overlays.PlainArrow, arguments]);
    }, e.extend(t.Overlays.svg.PlainArrow, [t.Overlays.PlainArrow, d]), t.Overlays.svg.Diamond = function () {
      d.apply(this, [t.Overlays.Diamond, arguments]);
    }, e.extend(t.Overlays.svg.Diamond, [t.Overlays.Diamond, d]), t.Overlays.svg.GuideLines = function () {
      var e,
          n,
          i = null,
          r = this;t.Overlays.GuideLines.apply(this, arguments), this.paint = function (t, l) {
        null == i && (i = o("path"), t.connector.svg.appendChild(i), r.attachListeners(i, t.connector), r.attachListeners(i, r), e = o("path"), t.connector.svg.appendChild(e), r.attachListeners(e, t.connector), r.attachListeners(e, r), n = o("path"), t.connector.svg.appendChild(n), r.attachListeners(n, t.connector), r.attachListeners(n, r));var u = [0, 0];l.xmin < 0 && (u[0] = -l.xmin), l.ymin < 0 && (u[1] = -l.ymin), s(i, { d: a(t.head, t.tail), stroke: "red", fill: null, transform: "translate(" + u[0] + "," + u[1] + ")" }), s(e, { d: a(t.tailLine[0], t.tailLine[1]), stroke: "blue", fill: null, transform: "translate(" + u[0] + "," + u[1] + ")" }), s(n, { d: a(t.headLine[0], t.headLine[1]), stroke: "green", fill: null, transform: "translate(" + u[0] + "," + u[1] + ")" });
      };var a = function a(t, e) {
        return "M " + t.x + "," + t.y + " L" + e.x + "," + e.y;
      };
    }, e.extend(t.Overlays.svg.GuideLines, t.Overlays.GuideLines);
  }.call("undefined" != typeof window ? window : k), function () {
    var t = this.jsPlumb,
        e = this.jsPlumbUtil,
        n = this.Katavorio,
        i = this.Biltong,
        s = function s(e, _s3) {
      var o = "_katavorio_" + (_s3 = _s3 || "main"),
          r = e[o],
          a = e.getEventManager();return r || ((r = new n({ bind: a.on, unbind: a.off, getSize: t.getSize, getConstrainingRectangle: function getConstrainingRectangle(t) {
          return [t.parentNode.scrollWidth, t.parentNode.scrollHeight];
        }, getPosition: function getPosition(t, n) {
          var i = e.getOffset(t, n, t._katavorioDrag ? t.offsetParent : null);return [i.left, i.top];
        }, setPosition: function setPosition(t, e) {
          t.style.left = e[0] + "px", t.style.top = e[1] + "px";
        }, addClass: t.addClass, removeClass: t.removeClass, intersects: i.intersects, indexOf: function indexOf(t, e) {
          return t.indexOf(e);
        }, scope: e.getDefaultScope(), css: { noSelect: e.dragSelectClass, droppable: "jtk-droppable", draggable: "jtk-draggable", drag: "jtk-drag", selected: "jtk-drag-selected", active: "jtk-drag-active", hover: "jtk-drag-hover", ghostProxy: "jtk-ghost-proxy" } })).setZoom(e.getZoom()), e[o] = r, e.bind("zoom", r.setZoom)), r;
    };t.extend(this.jsPlumbInstance.prototype, { animationSupported: !0, getElement: function getElement(t) {
        return null == t ? null : "string" == typeof (t = "string" == typeof t ? t : null != t.length && null == t.enctype ? t[0] : t) ? document.getElementById(t) : t;
      }, removeElement: function removeElement(t) {
        s(this).elementRemoved(t), this.getEventManager().remove(t);
      }, doAnimate: function doAnimate(n, i, s) {
        s = s || {};var o = this.getOffset(n),
            r = function (t, n) {
          var i = function i(_i5) {
            if (null != n[_i5]) {
              if (e.isString(n[_i5])) {
                var s = n[_i5].match(/-=/) ? -1 : 1,
                    o = n[_i5].substring(2);return t[_i5] + s * o;
              }return n[_i5];
            }return t[_i5];
          };return [i("left"), i("top")];
        }(o, i),
            a = r[0] - o.left,
            l = r[1] - o.top,
            u = s.duration || 250,
            c = u / 15,
            h = 15 / u * a,
            d = 15 / u * l,
            p = 0,
            f = setInterval(function () {
          t.setPosition(n, { left: o.left + h * (p + 1), top: o.top + d * (p + 1) }), null != s.step && s.step(p, Math.ceil(c)), ++p >= c && (window.clearInterval(f), null != s.complete && s.complete());
        }, 15);
      }, destroyDraggable: function destroyDraggable(t, e) {
        s(this, e).destroyDraggable(t);
      }, destroyDroppable: function destroyDroppable(t, e) {
        s(this, e).destroyDroppable(t);
      }, initDraggable: function initDraggable(t, e, n) {
        s(this, n).draggable(t, e);
      }, initDroppable: function initDroppable(t, e, n) {
        s(this, n).droppable(t, e);
      }, isAlreadyDraggable: function isAlreadyDraggable(t) {
        return null != t._katavorioDrag;
      }, isDragSupported: function isDragSupported(t, e) {
        return !0;
      }, isDropSupported: function isDropSupported(t, e) {
        return !0;
      }, isElementDraggable: function isElementDraggable(e) {
        return (e = t.getElement(e))._katavorioDrag && e._katavorioDrag.isEnabled();
      }, getDragObject: function getDragObject(t) {
        return t[0].drag.getDragElement();
      }, getDragScope: function getDragScope(t) {
        return t._katavorioDrag && t._katavorioDrag.scopes.join(" ") || "";
      }, getDropEvent: function getDropEvent(t) {
        return t[0].e;
      }, getUIPosition: function getUIPosition(t, e) {
        var n = t[0].el;if (null == n.offsetParent) return null;var i = t[0].finalPos || t[0].pos,
            s = { left: i[0], top: i[1] };if (n._katavorioDrag && n.offsetParent !== this.getContainer()) {
          var o = this.getOffset(n.offsetParent);s.left += o.left, s.top += o.top;
        }return s;
      }, setDragFilter: function setDragFilter(t, e, n) {
        t._katavorioDrag && t._katavorioDrag.setFilter(e, n);
      }, setElementDraggable: function setElementDraggable(e, n) {
        (e = t.getElement(e))._katavorioDrag && e._katavorioDrag.setEnabled(n);
      }, setDragScope: function setDragScope(t, e) {
        t._katavorioDrag && t._katavorioDrag.k.setDragScope(t, e);
      }, setDropScope: function setDropScope(t, e) {
        t._katavorioDrop && t._katavorioDrop.length > 0 && t._katavorioDrop[0].k.setDropScope(t, e);
      }, addToPosse: function addToPosse(e, n) {
        var i = Array.prototype.slice.call(arguments, 1),
            o = s(this);t.each(e, function (e) {
          (e = [t.getElement(e)]).push.apply(e, i), o.addToPosse.apply(o, e);
        });
      }, setPosse: function setPosse(e, n) {
        var i = Array.prototype.slice.call(arguments, 1),
            o = s(this);t.each(e, function (e) {
          (e = [t.getElement(e)]).push.apply(e, i), o.setPosse.apply(o, e);
        });
      }, removeFromPosse: function removeFromPosse(e, n) {
        var i = Array.prototype.slice.call(arguments, 1),
            o = s(this);t.each(e, function (e) {
          (e = [t.getElement(e)]).push.apply(e, i), o.removeFromPosse.apply(o, e);
        });
      }, removeFromAllPosses: function removeFromAllPosses(e) {
        var n = s(this);t.each(e, function (e) {
          n.removeFromAllPosses(t.getElement(e));
        });
      }, setPosseState: function setPosseState(e, n, i) {
        var o = s(this);t.each(e, function (e) {
          o.setPosseState(t.getElement(e), n, i);
        });
      }, dragEvents: { start: "start", stop: "stop", drag: "drag", step: "step", over: "over", out: "out", drop: "drop", complete: "complete", beforeStart: "beforeStart" }, animEvents: { step: "step", complete: "complete" }, stopDrag: function stopDrag(t) {
        t._katavorioDrag && t._katavorioDrag.abort();
      }, addToDragSelection: function addToDragSelection(t) {
        s(this).select(t);
      }, removeFromDragSelection: function removeFromDragSelection(t) {
        s(this).deselect(t);
      }, clearDragSelection: function clearDragSelection() {
        s(this).deselectAll();
      }, trigger: function trigger(t, e, n, i) {
        this.getEventManager().trigger(t, e, n, i);
      }, doReset: function doReset() {
        for (var t in this) {
          0 === t.indexOf("_katavorio_") && this[t].reset();
        }
      } });var o, _r;o = t.init, (_r = function r() {
      /complete|loaded|interactive/.test(document.readyState) && void 0 !== document.body && null != document.body ? o() : setTimeout(_r, 9);
    })();
  }.call("undefined" != typeof window ? window : k);var w = function () {
    function e(e, t, s, i, o) {
      this._plumber = e, this._nodeInstance = t, this._node = t.getNode(), this._previousNode = s, this._config = i, this._configDeltas = o;
    }return e.prototype._renderShape = function (e) {
      switch (e) {case "HEXAGON":
          return "";case "CIRCLE":
          return "<defs><rect id=\"path-circle\" x=\"4\" y=\"3\" width=\"48\" height=\"48\" rx=\"24\"></rect></defs><g id=\"Node/-circle\" stroke-width=\"1\" fill-rule=\"evenodd\"><mask id=\"mask-circle\" fill=\"white\"><use xlink:href=\"#path-circle\"></use></mask><use id=\"Rectangle-circle\" xlink:href=\"#path-circle\"></use><g id=\"Colors-/-Turquoise\" mask=\"url(#mask-circle)\"><g transform=\"translate(4.000000, 4.000000)\" id=\"Rectangle\"><rect x=\"0\" y=\"0\" width=\"48\" height=\"48\"></rect></g></g></g>";case "DIAMOND":
          return "<defs><path d=\"M14,10 L42,10 C44.209139,10 46,11.790861 46,14 L46,42 C46,44.209139 44.209139,46 42,46 L14,46 C11.790861,46 10,44.209139 10,42 L10,14 C10,11.790861 11.790861,10 14,10 Z\" id=\"path-diamond\"></path></defs><g id=\"Node/-diamond\" stroke-width=\"1\" fill-rule=\"evenodd\"><mask id=\"mask-diamond\" fill=\"white\"><use xlink:href=\"#path-diamond\"></use></mask><use id=\"Rectangle-diamond\" transform=\"translate(28.000000, 28.000000) rotate(45.000000) translate(-28.000000, -28.000000)\" xlink:href=\"#path-diamond\"></use></g>";case "SQUARE":default:
          return "<defs><rect id=\"path-square\" x=\"4\" y=\"4\" width=\"48\" height=\"48\" rx=\"4\"></rect></defs><g id=\"Node/-square\" stroke-width=\"1\" fill-rule=\"evenodd\"><mask id=\"mask-square\" fill=\"white\"></mask><use id=\"Rectangle-square\" xlink:href=\"#path-square\"></use></g>";}
    }, e.prototype._getIconHref = function (e) {
      return e.iconCategory && e.iconName ? e.iconCategory + "#" + e.iconName : e.iconPath ? e.iconPath : null;
    }, e.prototype._getNodeClassName = function () {
      var e = this._config.classPrefix + b.nodeClassSuffix,
          t = this._node.className || this._config.defaultNodeClassName || b.defaultNodeClassName,
          s = this._node.isSelected && this._config.classPrefix + b.nodeSelectedSuffix;return e + (t ? "  " + t : "") + (s ? " " + s : "");
    }, e.prototype._renderNodeElement = function () {
      var e = this._nodeInstance.getElement();if (!e) {
        var t = document.createElement("div");return t.className = this._getNodeClassName(), t.style.position = "absolute", t.id = this._nodeInstance.getId(), t.draggable = !0, t;
      }var s = this._configDeltas.get("classPrefix"),
          i = this._configDeltas.get("defaultNodeClassName"),
          o = !this._previousNode || this._node.className !== this._previousNode.className,
          n = !this._previousNode || this._node.isSelected !== this._previousNode.isSelected;return (s || i || o || n) && (e.className = this._getNodeClassName()), e;
    }, e.prototype._renderBackgroundSvg = function (e) {
      var t = this._nodeInstance.getSvgBackgroundElement();return t ? (this._previousNode && this._node.nodeShape === this._previousNode.nodeShape || (t.innerHTML = this._renderShape(this._node.nodeShape)), this._configDeltas.get("classPrefix") && t.setAttribute("class", this._config.classPrefix + b.nodeBackgroundSvgSuffix), t) : ((t = document.createElementNS("http://www.w3.org/2000/svg", "svg")).setAttribute("class", this._config.classPrefix + b.nodeBackgroundSvgSuffix), t.setAttribute("width", "100%"), t.setAttribute("height", "100%"), t.setAttribute("viewBox", "0 0 56 56"), t.innerHTML = this._renderShape(this._node.nodeShape), e.appendChild(t), t);
    }, e.prototype._renderLabelSpan = function (e) {
      var t = this._nodeInstance.getLabelElement();return !t && this._node.label ? ((t = document.createElement("span")).style.position = "absolute", t.style.top = "100%", t.style.left = "50%", t.style.minWidth = "150%", t.style.marginLeft = "-75%", t.className = this._config.classPrefix + b.nodeLabelSuffix, e.appendChild(t), t) : t && !this._node.label ? (e.removeChild(t), null) : t && this._node.label && this._configDeltas.get("classPrefix") ? (t.className = this._config.classPrefix + b.nodeLabelSuffix, t) : t;
    }, e.prototype._renderIconSvg = function (e) {
      var t = this._nodeInstance.getSvgIconElement(),
          s = this._node.iconCategory && this._node.iconName || this._node.iconPath,
          i = this._node.iconClassName,
          o = this._config.classPrefix + b.nodeIconSvgSuffix,
          n = i ? o + " " + i : o;if (!t && s) return (t = document.createElementNS("http://www.w3.org/2000/svg", "svg")).setAttribute("class", n), t.setAttribute("width", "50%"), t.setAttribute("height", "50%"), t.style.position = "absolute", t.style.left = "25%", t.style.top = "25%", e.appendChild(t), t;if (t && !s) return e.removeChild(t), null;if (t && s) {
        var r = this._configDeltas.get("classPrefix"),
            d = !this._previousNode || this._previousNode.iconClassName !== this._node.iconClassName;return (r || d) && t.setAttribute("class", n), t;
      }
    }, e.prototype._renderAnchors = function (e) {
      var t = this,
          s = this._plumber.selectEndpoints({ element: e });if (s.length) for (var i = (this._previousNode && this._previousNode.anchors || []).reduce(function (e, t) {
        return e.set(t.id, t), e;
      }, new Map()), o = 0; o < s.length; o++) {
        var n = s.get(o);if (!n.getUuid()) return;var r = f.getAnchorIdFromUuid(this._node, n.getUuid()),
            d = this._nodeInstance.getAnchorMap().get(r);d && !f.equals(d, i.get(r)) ? n.setAnchor(f.getPlumbAnchor(d)) : d || this._plumber.deleteEndpoint(n);
      }this._nodeInstance.getAnchorMap().forEach(function (s, i) {
        t._plumber.addEndpoint(e, { anchor: f.getPlumbAnchor(s), cssClass: t._config.classPrefix + b.emptyEndpointClassSuffix, uuid: f.getEndpointUuid(t._node, i), endpoint: ["Dot", { radius: 6, cssClass: t._config.classPrefix + b.endpointClassSuffix }], endpointStyle: { fill: "invalid_use_Css", stroke: "invalid_use_css" } }, { isSource: !0, isTarget: !0 });
      });
    }, e.prototype.render = function () {
      var e = this._nodeInstance.getBounds(),
          t = this._renderNodeElement(),
          s = this._renderLabelSpan(t),
          i = this._renderBackgroundSvg(t),
          o = this._renderIconSvg(t),
          n = this._getIconHref(this._node),
          r = this._previousNode && this._getIconHref(this._previousNode);if (this._previousNode && this._node.left === this._previousNode.left || (t.style.left = e.left + "px"), this._previousNode && this._node.top === this._previousNode.top || (t.style.top = e.top + "px"), this._previousNode && this._node.width === this._previousNode.width || (t.style.width = e.width + "px"), this._previousNode && this._node.height === this._previousNode.height || (t.style.height = e.height + "px"), !s || this._previousNode && this._node.label === this._previousNode.label || (s.textContent = this._node.id + ": " + this._node.label), o && (!this._previousNode || n !== r)) {
        var d = o.querySelector("use");d && o.removeChild(d);var a = document.createElementNS("http://www.w3.org/2000/svg", "use");a.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n), o.appendChild(a);
      }this._previousNode && this._node.nodeColor === this._previousNode.nodeColor || (t.style.fill = this._node.nodeColor || "#1789EE"), this._previousNode && j.compareAnchors(this._node.anchors, this._previousNode.anchors) || this._renderAnchors(t), this._nodeInstance.updateRenderedElements(t, s, i, o);
    }, e;
  }(),
      q = function () {
    function e(e) {
      this._plumber = e;
    }return e.prototype.renderNode = function (e, t, s, i) {
      new w(this._plumber, e, t, s, i).render();
    }, e.prototype.unrenderNode = function (e) {
      e.getElement() && (this._plumber.remove(e.getElement()), e.updateRenderedElements(null, null, null, null));
    }, e.prototype.renderConnector = function (e, t, s) {
      var i = e.getPlumbConnection();if (i) {
        var o = e.getPlumbAnchorConfig();i.endpoints.forEach(function (e, t) {
          e.setAnchor(o[t]);
        });var n = e.getConnector();return t && t.strokeWidth === n.strokeWidth || i.setPaintStyle({ stroke: "invalid_use_css", strokeWidth: n.strokeWidth || s.connectorStrokeWidth }), t && t.hoverStrokeWidth === n.hoverStrokeWidth || i.setHoverPaintStyle({ stroke: "invalid_use_css", strokeWidth: n.hoverStrokeWidth || s.connectorHoverStrokeWidth }), void i.repaint();
      }var r = this._plumber.connect({ source: e.getSourceNodeId(), target: e.getTargetNodeId(), anchors: e.getPlumbAnchorConfig(), detachable: !1, cssClass: s.classPrefix + b.connectorClassSuffix, connector: ["Flowchart", { cornerRadius: 12 }], endpoint: ["Dot", { radius: 6, cssClass: s.classPrefix + b.endpointClassSuffix }], paintStyle: { stroke: "invalid_use_css", strokeWidth: e.getConnector().strokeWidth || s.connectorStrokeWidth }, hoverPaintStyle: { strokeWidth: e.getConnector().hoverStrokeWidth || s.connectorHoverStrokeWidth }, endpointStyle: { fill: "invalid_use_Css", stroke: "invalid_use_css" } });r.canvas.id = g.getConnectorId(e.getConnector()), e.updateRenderedConnector(r);
    }, e.prototype.unrenderConnector = function (e) {
      this._plumber.deleteConnection(e.getPlumbConnection()), e.updateRenderedConnector(null);
    }, e;
  }();var x = function () {
    function t(t, i) {
      this._action = i, this._duration = t, this._timeout = null, this._isWaiting = !0;
    }return t.prototype.invoke = function () {
      var t = this;null === this._timeout ? (this._action(), this._timeout = setTimeout(function () {
        t._isWaiting && t._action(), t._timeout = null, t._isWaiting = !1;
      }, this._duration)) : this._isWaiting = !0;
    }, t;
  }();var a = function a(t, i) {
    var o = t.left,
        e = t.left + t.width,
        h = i.left,
        s = i.left + i.width,
        d = o <= h && e >= h || o >= h && o <= s,
        n = t.top,
        r = t.top + t.height,
        a = i.top,
        l = i.top + i.height;return d && (n < a && r > a || n >= a && n <= l);
  },
      e = function () {
    function t(t, i, o, e, h) {
      this._parent = t, this._size = i, this._minSize = o, this._bounds = { left: e, top: h, width: i, height: i }, this._itemChildren = null;
    }return t.prototype.cascadeAdd = function (i, o) {
      if (!this._containsBounds(o)) return [];var e = this._size / 2,
          h = this._minSize;if (e < h) return this._itemChildren = this._itemChildren || new Map(), this._itemChildren.set(i, o), [this];var s = [],
          d = this._bounds,
          n = d.left,
          r = d.top;return a({ left: n, top: r, width: e, height: e }, o) && (this._topLeftChild = this._topLeftChild || new t(this, e, h, n, r), Array.prototype.push.apply(s, this._topLeftChild.cascadeAdd(i, o))), a({ left: n + e, top: r, width: e, height: e }, o) && (this._topRightChild = this._topRightChild || new t(this, e, h, n + e, r), Array.prototype.push.apply(s, this._topRightChild.cascadeAdd(i, o))), a({ left: n, top: r + e, width: e, height: e }, o) && (this._bottomLeftChild = this._bottomLeftChild || new t(this, e, h, n, r + e), Array.prototype.push.apply(s, this._bottomLeftChild.cascadeAdd(i, o))), a({ left: n + e, top: r + e, width: e, height: e }, o) && (this._bottomRightChild = this._bottomRightChild || new t(this, e, h, n + e, r + e), Array.prototype.push.apply(s, this._bottomRightChild.cascadeAdd(i, o))), s;
    }, t.prototype.cascadeGet = function (t) {
      var i = new Set();if (!a(this._bounds, t)) return i;if (this._itemChildren) this._itemChildren.forEach(function (o, e) {
        a(t, o) && i.add(e);
      });else {
        var o = function o(t) {
          i.add(t);
        };this._topLeftChild && this._topLeftChild.cascadeGet(t).forEach(o), this._topRightChild && this._topRightChild.cascadeGet(t).forEach(o), this._bottomLeftChild && this._bottomLeftChild.cascadeGet(t).forEach(o), this._bottomRightChild && this._bottomRightChild.cascadeGet(t).forEach(o);
      }return i;
    }, t.prototype.remove = function (t) {
      this._itemChildren.delete(t), this._itemChildren.size || this._parent._cascadeDelete(this);
    }, t.prototype._cascadeDelete = function (t) {
      var i = t._bounds;i.left === this._bounds.left && i.top === this._bounds.top ? delete this._topLeftChild : i.left > this._bounds.left && i.top === this._bounds.top ? delete this._topRightChild : i.left === this._bounds.left && i.top > this._bounds.top ? delete this._bottomLeftChild : delete this._bottomRightChild, this._topLeftChild || this._topRightChild || this._bottomLeftChild || this._bottomRightChild || this._parent._cascadeDelete(this);
    }, t.prototype._containsBounds = function (t) {
      return a(this._bounds, t);
    }, t;
  }(),
      m = function () {
    function t(t, i, o) {
      this._boundsGetter = o, this._rootQuad = new e(null, t, i, 0, 0), this._itemToQuadMap = new Map();
    }return t.prototype.add = function (t) {
      var i = this._boundsGetter(t),
          o = this._rootQuad.cascadeAdd(t, i);this._itemToQuadMap.set(t, o);
    }, t.prototype.remove = function (t) {
      var i = this._itemToQuadMap.get(t);i && i.length && (i.forEach(function (i) {
        i.remove(t);
      }), this._itemToQuadMap.delete(t));
    }, t.prototype.move = function (t) {
      this.remove(t), this.add(t);
    }, t.prototype.get = function (t, i, o, e) {
      var h = this._rootQuad.cascadeGet({ left: t, top: i, width: o, height: e });return Array.from(h);
    }, t.prototype.has = function (t) {
      return this._itemToQuadMap.has(t);
    }, t.isCollision = a, t;
  }();var t = function () {
    function e() {
      var e = this;this._nodeMap = new Map(), this._renderedNodeIds = new Set(), this._nodeBounds = new Map(), this._dirtyNodes = new Set(), this._connectorMap = new Map(), this._outgoingConnectorMap = new Map(), this._incomingConnectorMap = new Map(), this._nodeQuadMap = new m(1e6, 500, function (t) {
        return e._getNodeConnectiveBounds(t);
      });
    }return e.prototype._getNodeConnectiveBounds = function (e) {
      var t = this;if (this._nodeBounds.has(e)) return this._nodeBounds.get(e);var o = this._nodeMap.get(e),
          n = (this._outgoingConnectorMap.get(e) || []).map(function (e) {
        return t._nodeMap.get(e);
      }),
          d = (this._incomingConnectorMap.get(e) || []).map(function (e) {
        return t._nodeMap.get(e);
      }),
          r = o.getBounds(),
          i = r.left,
          a = r.top,
          s = r.width,
          c = r.height,
          p = i + s,
          u = a + c;n.concat(d).forEach(function (e) {
        var t = e.getBounds(),
            o = t.left + t.width,
            n = t.top + t.height;i = t.left < i ? t.left : i, p = o > p ? o : p, a = t.top < a ? t.top : a, u = n > u ? n : u;
      });var g = { left: i, width: p - i, top: a, height: u - a };return this._nodeBounds.set(e, g), g;
    }, e.prototype.addNodeInstance = function (e) {
      this._nodeMap.set(e.getId(), e), this._dirtyNodes.add(e.getId());
    }, e.prototype.getNodeInstance = function (e) {
      return this._nodeMap.get(e);
    }, e.prototype.isNodeInBounds = function (e, t, o, n, d) {
      var r = e.getBounds();return m.isCollision(r, { left: t, top: o, width: n, height: d });
    }, e.prototype.updateNodeInstance = function (e) {
      this._nodeBounds.delete(e.getId()), this._nodeMap.set(e.getId(), e), this._dirtyNodes.add(e.getId());
    }, e.prototype.removeNodeInstance = function (e) {
      this._nodeBounds.delete(e.getId()), this._nodeMap.delete(e.getId()), this._renderedNodeIds.delete(e.getId()), this._dirtyNodes.add(e.getId());
    }, e.prototype.markDirty = function (e) {
      this._dirtyNodes.add(e.getId());
    }, e.prototype.reflowNodes = function () {
      var e = this;this._dirtyNodes.forEach(function (t) {
        var o = e._nodeMap.get(t),
            n = e._nodeQuadMap.has(t);return o ? n ? (e._nodeBounds.delete(t), e._nodeQuadMap.move(t), void e.getAllNodeConnectorInstances(t).forEach(function (o) {
          o.getSourceNodeId() === t ? (e._nodeBounds.delete(o.getTargetNodeId()), e._nodeQuadMap.move(o.getTargetNodeId())) : (e._nodeBounds.delete(o.getSourceNodeId()), e._nodeQuadMap.move(o.getSourceNodeId()));
        })) : e._nodeQuadMap.add(t) : e._nodeQuadMap.remove(t);
      }), this._dirtyNodes.clear();
    }, e.prototype.markNodeRendered = function (e, t) {
      t ? (this._renderedNodeIds.add(e.getId()), this._nodeMap.set(e.getId(), e)) : this._renderedNodeIds.delete(e.getId());
    }, e.prototype.getRenderedNodeIds = function () {
      return this._renderedNodeIds;
    }, e.prototype.queryNodeIds = function (e, t, o, n, d) {
      var r = this,
          i = this._nodeQuadMap.get(e, t, o, n);if (d) {
        var a = { left: e, top: t, width: o, height: n };i = i.filter(function (e) {
          var t = r.getNodeInstance(e);return m.isCollision(t.getBounds(), a);
        });
      }return i;
    }, e.prototype.queryNodes = function (e, t, o, n, d) {
      var r = this;return this.queryNodeIds(e, t, o, n, d).map(function (e) {
        return r._nodeMap.get(e).getNode();
      });
    }, e.prototype.forEachNodeInstance = function (e) {
      this._nodeMap.forEach(e);
    }, e.prototype.getConnectorInstance = function (e) {
      var t = "string" == typeof e ? e : g.getConnectorId(e);return this._connectorMap.get(t);
    }, e.prototype.addConnectorInstance = function (e) {
      this._connectorMap.set(e.getId(), e);var t = e.getConnector(),
          o = this._outgoingConnectorMap.get(t.sourceNodeId) || [];o.push(t.targetNodeId), this._outgoingConnectorMap.set(t.sourceNodeId, o);var n = this._incomingConnectorMap.get(t.targetNodeId) || [];n.push(t.sourceNodeId), this._incomingConnectorMap.set(t.targetNodeId, n);
    }, e.prototype.removeConnector = function (e) {
      this._connectorMap.delete(e.getId());var t = this._outgoingConnectorMap.get(e.getSourceNodeId()),
          o = this._incomingConnectorMap.get(e.getTargetNodeId());t.splice(t.indexOf(e.getTargetNodeId()), 1), o.splice(o.indexOf(e.getSourceNodeId()), 1);
    }, e.prototype.getAllNodeConnectorInstances = function (e) {
      var t = this,
          o = (this._outgoingConnectorMap.get(e) || []).map(function (o) {
        return t._connectorMap.get(g.getConnectorId({ sourceNodeId: e, targetNodeId: o }));
      }),
          n = (this._incomingConnectorMap.get(e) || []).map(function (o) {
        return t._connectorMap.get(g.getConnectorId({ sourceNodeId: o, targetNodeId: e }));
      });return o.concat(n);
    }, e.prototype.forEachConnectorInstance = function (e) {
      this._connectorMap.forEach(e);
    }, e;
  }();var u = function () {
    function t(t, e, a, r) {
      this._surface = t, this._dataManager = e, this._config = a, this._bindings = r, this._surface.onmousedown = this._handleSurfaceDragStart.bind(this), this._surface.ontouchstart = this._handleSurfaceDragStart.bind(this), this._surface.onmousemove = this._handleSurfaceDragMove.bind(this), this._surface.ontouchmove = this._handleSurfaceDragMove.bind(this), this._surface.onmouseup = this._handleSurfaceDragEnd.bind(this), this._surface.ontouchend = this._handleSurfaceDragEnd.bind(this), this._surface.onclick = this._handleClick.bind(this), this._surface.onmouseover = this._handleMouseOver.bind(this), this._surface.onmouseout = this._handleMouseOut.bind(this), this._surface.ondragstart = this._handleDragStart.bind(this), this._surface.ondragend = this._handleDragEnd.bind(this), this._surface.ondrag = this._handleDragMove.bind(this), this._nodeDragPayload = null, this._surfaceDragPayload = null;
    }return t.prototype.updateConfig = function (t) {
      this._config = t;
    }, t.prototype.getDraggingNode = function () {
      return this._nodeDragPayload && this._nodeDragPayload.nodeInstance;
    }, t.prototype._findEndpoint = function (t) {
      if (t) {
        for (var e = this._config.classPrefix + b.emptyEndpointClassSuffix; t && t !== this._surface && !t.classList.contains(e);) {
          t = t.parentElement;
        }return t && t !== this._surface ? t : null;
      }
    }, t.prototype._findNode = function (t) {
      if (t) {
        for (var e = this._config.classPrefix + b.nodeClassSuffix; t && t !== this._surface && !t.classList.contains(e);) {
          t = t.parentElement;
        }return t && t !== this._surface ? t : null;
      }
    }, t.prototype._findConnector = function (t) {
      if (t) {
        for (var e = this._config.classPrefix + b.connectorClassSuffix; t && t !== this._surface && !t.classList.contains(e);) {
          t = t.parentElement;
        }return t && t !== this._surface ? t : null;
      }
    }, t.prototype._handleMoveEvent = function (t, e, a) {
      var r = t.x,
          s = t.y;0 === t.x && 0 === t.y && (r = this._nodeDragPayload.lastX, s = this._nodeDragPayload.lastY);var n = r - this._nodeDragPayload.startX,
          o = s - this._nodeDragPayload.startY;this._nodeDragPayload.lastX = r, this._nodeDragPayload.lastY = s;var i = this._snapToGrid(e, a, n, o);return { deltaLeft: i.deltaLeft, deltaTop: i.deltaTop };
    }, t.prototype._snapToGrid = function (t, e, a, r) {
      var s = this._config.snapToGrid || b.defaultSnapToGrid;if (s[0] > 1) {
        var n = (t + a) % s[0];a = n < s[0] / 2 ? a - n : a - n + s[0];
      }if (s[1] > 1) {
        var o = (e + r) % s[1];r = o < s[1] / 2 ? r - o : r - o + s[1];
      }return { deltaLeft: a, deltaTop: r };
    }, t.prototype._createGhostClearer = function (t) {
      var e = t.cloneNode(!0);return e.style.position = "absolute", e.style.left = "-10000000px", e.style.top = "-10000000px", e.style.opacity = "0", document.body.appendChild(e), e;
    }, t.prototype._createGhost = function (t) {
      if ("GHOST" === this._config.dragMode) {
        var e = t.cloneNode(!0);e.style.pointerEvents = "none", e.className += " " + this._config.classPrefix + b.nodeDragSuffix;var a = e.querySelector("." + this._config.classPrefix + b.nodeLabelSuffix);return a && e.removeChild(a), this._surface.appendChild(e), e;
      }
    }, t.prototype._handleClick = function (t) {
      if (!this._findEndpoint(t.target)) {
        var e = this._findNode(t.target);e && this._bindings.handleNodeClick(this._dataManager.getNodeInstance(e.id));var a = this._findConnector(t.target);a && this._bindings.handleConnectorClick(this._dataManager.getConnectorInstance(a.id));
      }
    }, t.prototype._handleMouseOver = function (t) {
      var e = this._findEndpoint(t.target);if (e) e.classList.add(this._config.classPrefix + b.endpointHoveredSuffix);else {
        var a = this._findNode(t.target);a && this._bindings.handleNodeEnter(this._dataManager.getNodeInstance(a.id));var r = this._findConnector(t.target);r && this._bindings.handleConnectorEnter(this._dataManager.getConnectorInstance(r.id));
      }
    }, t.prototype._handleMouseOut = function (t) {
      var e = this._findEndpoint(t.target);if (e) e.classList.remove(this._config.classPrefix + b.endpointHoveredSuffix);else {
        var a = this._findNode(t.target);a && this._bindings.handleNodeLeave(this._dataManager.getNodeInstance(a.id));var r = this._findConnector(t.target);r && this._bindings.handleConnectorLeave(this._dataManager.getConnectorInstance(r.id));
      }
    }, t.prototype._handleDragStart = function (t) {
      if (!this._findEndpoint(t.target)) {
        var e = this._findNode(t.target),
            a = e && this._dataManager.getNodeInstance(e.id);if (a && this._bindings.isNodeDragAllowed(a)) {
          var r = a.getBounds(),
              s = this._createGhostClearer(e);t.dataTransfer.setDragImage(s, r.width / 2, r.height / 2), this._nodeDragPayload = { nodeInstance: a, nodeElement: e, ghost: this._createGhost(e), ghostClearer: s, startX: t.x, startY: t.y, startScrollLeft: this._surface.parentElement.scrollLeft, startScrollTop: this._surface.parentElement.scrollTop, lastX: t.x, lastY: t.y }, this._bindings.handleNodeDragStart(a);
        }
      }
    }, t.prototype._handleDragEnd = function (t) {
      var e = this;if (this._isConnectorDragMode && (this._isConnectorDragMode = !1), this._nodeDragPayload) {
        document.body.removeChild(this._nodeDragPayload.ghostClearer), this._nodeDragPayload.ghost && this._surface.removeChild(this._nodeDragPayload.ghost);var a = this._nodeDragPayload.nodeInstance;if ("INSTANCE" === this._config.dragMode) {
          var r = a.getBounds();this._nodeDragPayload.nodeElement.style.left = r.left + "px", this._nodeDragPayload.nodeElement.style.top = r.top + "px";
        }var s = a.getBounds(),
            n = s.left,
            o = s.top,
            i = s.width,
            d = s.height,
            h = this._handleMoveEvent(t, n, o),
            l = h.deltaLeft,
            f = h.deltaTop,
            c = this._dataManager.queryNodeIds(n + l, o + f, i, d, !0).filter(function (t) {
          return t !== a.getId();
        }).map(function (t) {
          return e._dataManager.getNodeInstance(t);
        });this._nodeDragPayload = null, this._bindings.handleNodeDrop(a, n + l, o + f, c && c[0]);
      }
    }, t.prototype._handleDragMove = function (t) {
      if (this._nodeDragPayload) {
        var e = this._nodeDragPayload.nodeInstance,
            a = e.getId(),
            r = e.getBounds(),
            s = r.left,
            n = r.top,
            o = r.width,
            i = r.height,
            d = this._handleMoveEvent(t, s, n),
            h = d.deltaLeft,
            l = d.deltaTop,
            f = this._nodeDragPayload.ghost || this._nodeDragPayload.nodeElement,
            c = this._surface.parentElement;if (h += c.scrollLeft - this._nodeDragPayload.startScrollLeft, l += c.scrollTop - this._nodeDragPayload.startScrollTop, 0 === h && 0 === l) return;s += h, n += l;var u = this._dataManager.queryNodeIds(s, n, o, i, !0).filter(function (t) {
          return t !== a;
        });if (u && u.length && this._config.dragRules.indexOf("PREVENT_COLLISIONS") >= 0) return;f.style.left = s + "px", f.style.top = n + "px", this._bindings.handleNodeDragMove(e, s, n);
      }
    }, t.prototype._keyTogglePresent = function (t, e) {
      return "ALT" === t ? e.altKey : "CTRL" === t ? e.ctrlKey || e.metaKey : "SHIFT" === t && e.shiftKey;
    }, t.prototype._getSurfaceDragMode = function (t) {
      var e = this;if ("BRUSH" === this._config.surfaceDragMode) return "BRUSH";if ("PAN" === this._config.surfaceDragMode) return "PAN";if ("KEY_TOGGLE" === this._config.surfaceDragMode && t instanceof MouseEvent) {
        var a = this._config.surfaceBrushKeyToggle,
            r = this._config.surfacePanKeyToggle,
            s = r && "ANY" === r,
            n = a && "ANY" === a,
            o = Array.isArray(r) && r.every(function (a) {
          return e._keyTogglePresent(a, t);
        }),
            i = Array.isArray(a) && a.every(function (a) {
          return e._keyTogglePresent(a, t);
        });if (o) return "PAN";if (i) return "BRUSH";if (!i && s) return "PAN";if (!o && n) return "BRUSH";
      } else if ("KEY_TOGGLE" === this._config.surfaceDragMode && t instanceof TouchEvent) throw new Error("Touch pan/brush not yet implemented");
    }, t.prototype._getSurfaceEventCoordinates = function (t) {
      return t instanceof TouchEvent && t.touches && t.touches.length ? { x: t.touches[0].clientX, y: t.touches[0].clientY } : t instanceof MouseEvent ? { x: t.clientX, y: t.clientY } : void 0;
    }, t.prototype._getBrushBounds = function (t, e, a, r) {
      var s = this._surface.getBoundingClientRect();return { left: Math.min(t, a) - s.left, top: Math.min(e, r) - s.top, width: Math.abs(t - a), height: Math.abs(e - r) };
    }, t.prototype._renderBrushNode = function (t, e, a, r, s) {
      t || ((t = document.createElement("div")).style.position = "absolute", t.style.pointerEvents = "none", t.className = this._config.classPrefix + b.surfaceBrushSuffix, this._surface.appendChild(t));var n = this._getBrushBounds(e, a, r, s),
          o = n.left,
          i = n.top,
          d = n.width,
          h = n.height;return t.style.left = o + "px", t.style.top = i + "px", t.style.width = d + "px", t.style.height = h + "px", t;
    }, t.prototype._handleSurfaceDragStart = function (t) {
      if (t.target === this._surface) {
        var e = this._getSurfaceDragMode(t);if (e) {
          var a,
              r = this._getSurfaceEventCoordinates(t);if (r) "BRUSH" === e && (a = this._renderBrushNode(null, r.x, r.y, r.x, r.y)), this._surfaceDragPayload = { startX: r.x, startY: r.y, startScrollLeft: this._surface.parentElement.scrollLeft, startScrollTop: this._surface.parentElement.scrollTop, lastX: r.x, lastY: r.y, surfaceDragMode: e, brushNode: a };
        }
      }
    }, t.prototype._handleSurfaceDragMove = function (t) {
      if (this._surfaceDragPayload) {
        var e = this._getSurfaceEventCoordinates(t);if (e) {
          if ("PAN" === this._surfaceDragPayload.surfaceDragMode) {
            var a = e.x,
                r = e.y;0 === a && 0 === r && (a = this._surfaceDragPayload.lastX, r = this._surfaceDragPayload.lastY);var s = a - this._surfaceDragPayload.startX,
                n = r - this._surfaceDragPayload.startY;window.console.log(s);var o = this._surface.parentElement;o.scrollLeft = Math.max(this._surfaceDragPayload.startScrollLeft - s, 0), o.scrollTop = Math.max(this._surfaceDragPayload.startScrollTop - n, 0), this._surfaceDragPayload.lastX = a, this._surfaceDragPayload.lastY = r;
          } else if (this._surfaceDragPayload.brushNode) {
            var i = this._surfaceDragPayload,
                d = i.startX,
                h = i.startY,
                l = i.brushNode;this._surfaceDragPayload.brushNode = this._renderBrushNode(l, d, h, e.x, e.y);
          }t.preventDefault(), t.stopPropagation();
        }
      }
    }, t.prototype._handleSurfaceDragEnd = function (t) {
      var e = this;if (this._surfaceDragPayload) {
        if (this._surfaceDragPayload.brushNode) {
          this._surface.removeChild(this._surfaceDragPayload.brushNode);var a = this._getSurfaceEventCoordinates(t),
              r = this._surfaceDragPayload,
              s = r.startX,
              n = r.startY,
              o = this._getBrushBounds(a.x, a.y, s, n),
              i = o.left,
              d = o.top,
              h = o.height,
              l = o.width,
              f = this._dataManager.queryNodeIds(i, d, l, h, !0) || [];this._bindings.handleNodeBrushSelect(f.map(function (t) {
            return e._dataManager.getNodeInstance(t);
          }));
        }this._surfaceDragPayload = null;
      }
    }, t;
  }();var v = function () {
    function e(e, n) {
      this._nodeEvents = null, this._connectorEvents = null, this._refreshHandler = e, this._highlightHandler = n;
    }return e.prototype.updateConfig = function (e, n) {
      this._nodeEvents = e, this._connectorEvents = n;
    }, e.prototype.handleNodeClick = function (e) {
      this._nodeEvents.onClick && this._nodeEvents.onClick(e.getNode());
    }, e.prototype.handleNodeEnter = function (e) {
      this._highlightHandler(e, !0), this._nodeEvents.onMouseOver && this._nodeEvents.onMouseOver(e.getNode());
    }, e.prototype.handleNodeLeave = function (e) {
      this._highlightHandler(e, !1), this._nodeEvents.onMouseOut && this._nodeEvents.onMouseOut(e.getNode());
    }, e.prototype.handleConnectorClick = function (e) {
      this._connectorEvents.onClick && this._connectorEvents.onClick(e.getConnector());
    }, e.prototype.handleConnectorEnter = function (e) {
      this._highlightHandler(e, !0), this._connectorEvents.onMouseOver && this._connectorEvents.onMouseOver(e.getConnector());
    }, e.prototype.handleConnectorLeave = function (e) {
      this._highlightHandler(e, !1), this._connectorEvents.onMouseOut && this._connectorEvents.onMouseOut(e.getConnector());
    }, e.prototype.handleConnectorAdd = function (e, n, t, o) {
      this._connectorEvents && this._connectorEvents.onConnectorAdd && this._connectorEvents.onConnectorAdd(e, n, t, o);
    }, e.prototype.isNodeDragAllowed = function (e) {
      return !this._nodeEvents || !this._nodeEvents.isDragAllowed || this._nodeEvents.isDragAllowed(e.getNode());
    }, e.prototype.handleNodeDragStart = function (e) {
      this._nodeEvents && this._nodeEvents.onDragStart && this._nodeEvents.onDragStart(e.getNode());
    }, e.prototype.handleNodeDragMove = function (e, n, t) {
      this._nodeEvents && this._nodeEvents.onDragMove && this._nodeEvents.onDragMove(e.getNode(), n, t), this._refreshHandler(e);
    }, e.prototype.handleNodeDrop = function (e, n, t, o) {
      if (this._nodeEvents && this._nodeEvents.onDrop) {
        var s = o && o instanceof d ? o.getNode() : null,
            r = o && o instanceof i ? o.getConnector() : null;this._nodeEvents.onDrop(e.getNode(), n, t, s || r);
      }this._refreshHandler(e);
    }, e.prototype.isNodeDropAllowed = function (e, n, t, o) {
      if (this._nodeEvents && this._nodeEvents.isDropAllowed) {
        var s = o && o instanceof d ? o.getNode() : null,
            r = o && o instanceof i ? o.getConnector() : null;return this._nodeEvents.isDropAllowed(e.getNode(), n, t, s || r);
      }return !0;
    }, e.prototype.handleNodeBrushSelect = function (e) {
      this._nodeEvents && this._nodeEvents.onBrushSelect && this._nodeEvents.onBrushSelect(e.map(function (e) {
        return e.getNode();
      }));
    }, e;
  }();var o = function () {
    function e(e) {
      var n = this;this._root = e, this._config = l.getDefaultConfig(), this._canvas = document.createElement("div"), this._canvas.style.width = "100%", this._canvas.style.height = "100%", this._canvas.style.overflow = "auto", this._windowThottler = new x(300, this._renderWindow.bind(this)), this._canvas.onscroll = function () {
        return n._windowThottler.invoke();
      }, this._surface = document.createElement("div"), this._surface.style.position = "relative", this._surface.style.minWidth = "100%", this._surface.style.minHeight = "100%", this._canvas.appendChild(this._surface), this._root.appendChild(this._canvas), this._plumber = window.jsPlumb.getInstance({ Container: this._surface, Overlays: [["PlainArrow", { location: 1, id: "arrow", length: 14, paintStyle: { fill: "lightgrey" } }]] }), this._plumber.bind("connectionDrag", this._interceptConnectorDrag.bind(this, !0)), this._plumber.bind("connectionDragStop", this._interceptConnectorDrag.bind(this, !1)), this._renderer = new q(this._plumber), this._dataManager = new t(), this._bindings = new v(this._interceptNodeDrag.bind(this), this._interceptHighlight.bind(this)), this._eventProcessor = new u(this._surface, this._dataManager, this._config, this._bindings);
    }return e.prototype.update = function (e, n, t) {
      var a = null,
          r = null,
          o = null,
          i = !1;if (null != e && (a = h.getNodeDeltas(this._dataManager, e)), null != n && (r = h.getConnectorDeltas(this._dataManager, n, a)), null != t && (i = (o = h.getConfigDeltas(this._config, t)) && this._applyConfigDeltas(o)), a || r) {
        a && this._applyNodeDeltas(a), r && this._applyConnectorDeltas(r), this._dataManager.reflowNodes();var s = this._dataManager.queryNodeIds(this._canvas.scrollLeft, this._canvas.scrollTop, this._canvas.clientWidth, this._canvas.clientHeight);this._renderNodeUpdates(a, o, s, i), this._renderConnectorUpdates(r, this._config, s, i), this._updateSurface();
      }
    }, e.prototype.lasso = function (e, n, t, a) {
      return e += this._canvas.scrollLeft, n += this._canvas.scrollTop, this._dataManager.queryNodes(e, n, t, a, !0);
    }, e.prototype._interceptNodeDrag = function (e) {
      "INSTANCE" === this._config.dragMode && this._plumber.revalidate(e.getElement());
    }, e.prototype._interceptConnectorDrag = function (e, n, t) {
      if (this._surface.classList[e ? "add" : "remove"](this._config.classPrefix + b.connectorDraggingSuffix), !e && n && n.sourceId && n.targetId && t) {
        var a = n.sourceId,
            r = n.targetId,
            o = n.endpoints;this._plumber.deleteConnection(n);var i = this._dataManager.getNodeInstance(a).getNode(),
            s = this._dataManager.getNodeInstance(r).getNode();this._bindings.handleConnectorAdd(a, r, f.getAnchorIdFromUuid(i, o[0].getUuid()), f.getAnchorIdFromUuid(s, o[1].getUuid()));
      }
    }, e.prototype._interceptHighlight = function (e, n) {
      if (e instanceof d) for (var t = this._plumber.selectEndpoints({ element: e.getElement() }), a = 0; a < t.length; a++) {
        t.get(a)[n ? "addClass" : "removeClass"](this._config.classPrefix + b.endpointHoveredSuffix);
      }
    }, e.prototype._applyConfigDeltas = function (e) {
      var n = this;if (e.size) {
        this._config = l.clone(this._config);var t = !1;return e.forEach(function (e, a) {
          n._config[a] = e.newValue, t = t || l.isReflowProperty(a);
        }), this._eventProcessor.updateConfig(this._config), this._bindings.updateConfig(this._config.nodeEvents, this._config.connectorEvents), t;
      }
    }, e.prototype._applyNodeDeltas = function (e) {
      var n = this;(e.newEntries || []).forEach(function (e) {
        var t = new d(e);n._dataManager.addNodeInstance(t);
      }), (e.updatedEntries || []).forEach(function (e) {
        var t = n._dataManager.getNodeInstance(e.oldValue.id);t.updateNode(e.newValue), n._dataManager.updateNodeInstance(t);
      }), (e.deletedEntries || []).forEach(function (e) {
        var t = n._dataManager.getNodeInstance(e.id);n._renderer.unrenderNode(t), n._dataManager.removeNodeInstance(t);
      });
    }, e.prototype._applyConnectorDeltas = function (e) {
      var n = this;(e.newEntries || []).forEach(function (e) {
        var t = n._dataManager.getNodeInstance(e.sourceNodeId),
            a = n._dataManager.getNodeInstance(e.targetNodeId);n._dataManager.addConnectorInstance(new i(e, t, a)), n._dataManager.markDirty(t), n._dataManager.markDirty(a);
      });
    }, e.prototype._renderConnectorUpdates = function (e, n, t, a) {
      var r = this,
          o = e.newEntries.length || e.updatedEntries.length || e.deletedEntries.length || a,
          i = this._dataManager.getRenderedNodeIds(),
          s = new Set(),
          d = new Set(t);o && this._plumber.batch(function () {
        e.newEntries.forEach(function (e) {
          var t = e.sourceNodeId,
              a = e.targetNodeId,
              o = r._dataManager.getConnectorInstance(e);(i.has(t) || i.has(a)) && (r._renderer.renderConnector(o, null, n), s.add(o.getId()));
        }), (e.deletedEntries || []).forEach(function (e) {
          var n = r._dataManager.getConnectorInstance(e);r._dataManager.removeConnector(n), r._renderer.unrenderConnector(n);
        }), e.updatedEntries.forEach(function (e) {
          var t = e.newValue,
              a = t.sourceNodeId,
              o = t.targetNodeId,
              d = r._dataManager.getConnectorInstance(e.oldValue);if (s.add(g.getConnectorId(e.newValue)), i.has(a) || i.has(o)) {
            var c = r._dataManager.getNodeInstance(e.newValue.sourceNodeId),
                l = r._dataManager.getNodeInstance(e.newValue.targetNodeId);d.updateConnector(e.newValue, c, l), r._renderer.renderConnector(d, e.oldValue, n);
          } else r._renderer.unrenderConnector(d);
        }), a && d.forEach(function (e) {
          r._dataManager.getAllNodeConnectorInstances(e).forEach(function (e) {
            var t = e.getId();s.has(t) || (s.add(t), r._renderer.renderConnector(e, null, n));
          });
        });
      });
    }, e.prototype._renderNodeUpdates = function (e, n, t, a) {
      var r = this,
          o = new Set(t),
          i = this._dataManager.getRenderedNodeIds(),
          s = [];if ((e.newEntries || []).forEach(function (e) {
        if (o.has(e.id)) {
          var n = r._dataManager.getNodeInstance(e.id);r._renderer.renderNode(n, null, r._config, new Map()), r._dataManager.markNodeRendered(n, !0), o.delete(e.id), s.push(n.getElement());
        }
      }), (e.updatedEntries || []).forEach(function (e) {
        var t = e.newValue.id,
            a = r._dataManager.getNodeInstance(t),
            d = o.has(t),
            c = i.has(t);d && c ? r._renderer.renderNode(a, e.oldValue, r._config, n) : d && !c ? (r._renderer.renderNode(a, null, r._config, n), r._dataManager.markNodeRendered(a, !0), s.push(a.getElement())) : !d && c && (r._renderer.unrenderNode(a), r._dataManager.markNodeRendered(a, !1)), o.delete(a.getId());
      }), o.forEach(function (e) {
        if (!i.has(e) || a) {
          var t = r._dataManager.getNodeInstance(e);r._renderer.renderNode(t, null, r._config, n), i.has(e) || (r._dataManager.markNodeRendered(t, !0), s.push(t.getElement()));
        }
      }), s.length) {
        var d = document.createDocumentFragment();s.forEach(function (e) {
          return d.appendChild(e);
        }), this._surface.append(d);
      }
    }, e.prototype._renderWindow = function () {
      var e = this,
          n = new Set(this._dataManager.queryNodeIds(this._canvas.scrollLeft, this._canvas.scrollTop, this._canvas.clientWidth, this._canvas.clientHeight)),
          t = [];n.forEach(function (n) {
        var a = e._dataManager.getNodeInstance(n);a.getElement() || (e._renderer.renderNode(a, null, e._config, new Map()), e._dataManager.markNodeRendered(a, !0), e._surface.appendChild(a.getElement()), Array.prototype.push.apply(t, e._dataManager.getAllNodeConnectorInstances(n)));
      }), t.length && this._plumber.batch(function () {
        t.forEach(function (n) {
          n.getPlumbConnection() || e._renderer.renderConnector(n, null, e._config);
        });
      }), this._dataManager.getRenderedNodeIds().forEach(function (t) {
        var a = e._eventProcessor.getDraggingNode(),
            r = a && a.getId() === t;if (!n.has(t) && !r) {
          e._dataManager.getAllNodeConnectorInstances(t).forEach(function (n) {
            n.getPlumbConnection() && e._renderer.unrenderConnector(n);
          });var o = e._dataManager.getNodeInstance(t);e._renderer.unrenderNode(o), e._dataManager.markNodeRendered(o, !1);
        }
      });
    }, e.prototype._updateSurface = function () {
      var e = -1 / 0,
          n = -1 / 0;this._dataManager.forEachNodeInstance(function (t) {
        var a = t.getBounds(),
            r = a.left + a.width,
            o = a.top + a.height;e = r > e ? r : e, n = o > n ? o : n;
      }), this._surface.style.width = e + b.canvasPadding + "px", this._surface.style.height = n + b.canvasPadding + "px";
    }, e;
  }();c.CanvasBuilderInstance = o;var s = { createInstance: function createInstance(e) {
      var n;return "string" == typeof e ? e = document.getElementById(e) : n = e, new o(n);
    } };c.default = s;if (( false ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
    module.exports = c;
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return c;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    this["canvasBuilder"] = c;
  }
})();

var canvasBuilder = window.canvasBuilder;
exports.default = canvasBuilder;

/***/ }),
/* 391 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _INITIAL_STATE;

var _root = __webpack_require__(134);

var _Actions = __webpack_require__(396);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INITIAL_STATE = (_INITIAL_STATE = {
  config: {
    classPrefix: "App__slds-canvas-builder",
    connectorEvents: {},
    connectorHoverStrokeWidth: 4,
    connectorStrokeWidth: 2,
    dragMode: "INSTANCE",
    dragRules: [],
    nodeEvents: {
      onDrop: function onDrop(node, x, y, target) {
        _root.store.dispatch({ type: _Actions.UPDATE_NODE, payload: { x: x, y: y, node: node } });
      }
    },
    snapToGrid: [64, 64],
    surfaceBrushKeyToggle: ["CTRL", "SHIFT"],
    surfaceDragMode: "KEY_TOGGLE",
    surfacePanKeyToggle: "ANY"
  },
  connectors: [{
    sourceNodeId: "gary",
    targetNodeId: "josh",
    sourceAnchorId: "top2",
    targetAnchorId: "left",
    strokeWidth: 5,
    hoverStrokeWidth: 8
  }, {
    sourceNodeId: "gary",
    targetNodeId: "1234567"
  }, {
    sourceNodeId: "faraway",
    targetNodeId: "faraway2"
  }]
}, _defineProperty(_INITIAL_STATE, "connectors", [{
  sourceNodeId: "gary",
  targetNodeId: "josh",
  sourceAnchorId: "top2",
  targetAnchorId: "left",
  strokeWidth: 5,
  hoverStrokeWidth: 8
}, {
  sourceNodeId: "gary",
  targetNodeId: "1234567"
}, {
  sourceNodeId: "faraway",
  targetNodeId: "faraway2"
}]), _defineProperty(_INITIAL_STATE, "nodes", [{
  iconClassName: "node-icon1",
  id: "0",
  label: "Start",
  left: 50,
  nodeColor: "#33AAAA",
  top: 10
}, {
  iconClassName: "node-icon1",
  id: "1234567",
  label: "Hello",
  left: 2000,
  nodeColor: "#33AAAA",
  top: 50
}, {
  iconClassName: "node-icon2",
  id: "faraway",
  label: "So Far!",
  left: 2300,
  nodeColor: "orange",
  top: 200
}, {
  iconClassName: "node-icon2",
  id: "faraway2",
  label: "So Far II",
  left: 2300,
  nodeColor: "orange",
  top: 433
}, {
  className: "node-selected",
  height: 100,
  iconClassName: "node-icon1",
  id: "gary",
  isSelected: true,
  label: "Gary's Node!",
  left: 301,
  nodeColor: "green",
  nodeShape: "SQUARE",
  top: 200,
  width: 100,
  anchors: [{
    id: "top",
    location: {
      leftPercent: 0.15,
      topPercent: 0.55
    }
  }, {
    id: "top2",
    location: {
      leftPercent: 1,
      topPercent: 0.24
    }
  }]
}, {
  className: "node-selected",
  iconClassName: "node-icon1",
  id: "josh",
  label: "Josh Node",
  left: 544,
  nodeColor: "orange",
  nodeShape: "DIAMOND",
  startElement: false,
  top: 75,
  anchors: [{
    id: "bottom",
    location: "BOTTOM"
  }, {
    id: "left",
    location: "LEFT"
  }, {
    id: "right",
    location: "TOP"
  }]
}]), _defineProperty(_INITIAL_STATE, "variables", {
  "0": {
    name: "test",
    value: "test value"
  }
}), _INITIAL_STATE);

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments[1];

  switch (action.type) {
    case _Actions.ADD_CONNECTOR:
      return Object.assign({}, state, {
        connectors: [].concat(_toConsumableArray(state.connectors), [action.connector])
      });
    case _Actions.ADD_NODE:
      return Object.assign({}, state, {
        nodes: [].concat(_toConsumableArray(state.nodes), [action.node])
      });
    case _Actions.UPDATE_NODE:
      var _action$payload = action.payload,
          node = _action$payload.node,
          x = _action$payload.x,
          y = _action$payload.y;

      var id = node.id;
      var newNode = state.nodes.filter(function (node) {
        return node.id === id;
      })[0];
      newNode.left = x;
      newNode.top = y;
      return Object.assign({}, state, {
        nodes: state.nodes.map(function (node) {
          return node.id === id ? newNode : node;
        })
      });
    case _Actions.UPDATE_NODE_VALUES:
      var changeId = action.node.id;
      var updateNode = state.nodes.filter(function (node) {
        return node.id === changeId;
      })[0];
      updateNode.label = action.node.label;
      var variableObj = {
        name: action.node.variableName,
        value: action.node.variableValue
      };
      return Object.assign({}, state, {
        variables: Object.assign({}, state.variables, _defineProperty({}, changeId, variableObj)),
        nodes: state.nodes.map(function (node) {
          return node.id === changeId ? updateNode : node;
        })
      });
    default:
      return state;
  }
};

/***/ }),
/* 392 */,
/* 393 */,
/* 394 */,
/* 395 */,
/* 396 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ADD_NODE = exports.ADD_NODE = "ADD_NODE";
var UPDATE_NODE = exports.UPDATE_NODE = "UPDATE_NODE";
var ADD_CONNECTOR = exports.ADD_CONNECTOR = "ADD_CONNECTOR";
var UPDATE_NODE_VALUES = exports.UPDATE_NODE_VALUES = "UPDATE_NODE_VALUES";

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map