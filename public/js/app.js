
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

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
  exports.wrap = wrap;

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
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
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
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
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
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
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
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
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

  define(Gp, toStringTagSymbol, "Generator");

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

  exports.keys = function(object) {
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
  exports.values = values;

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

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),

/***/ "./resources/js/api.js":
/*!*****************************!*\
  !*** ./resources/js/api.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);




function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Api = /*#__PURE__*/function () {
  function Api() {
    _classCallCheck(this, Api);

    this.path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
    this.uri = document.location.origin;
    this.html = null;
  }

  _createClass(Api, [{
    key: "delete",
    value: function _delete(api, id) {
      axios.post(this.uri + this.path + api + id, {
        deleteId: id
      })["catch"](function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }

        console.log(error);
      });
    }
  }, {
    key: "getDAta",
    value: function () {
      var _getDAta = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(api) {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return axios.post(this.uri + this.path + api);

              case 3:
                response = _context.sent;

                if (!(response.status == 200 && response.statusText == "OK")) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", response.data.html);

              case 6:
                _context.next = 12;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                console.error(_context.t0);
                console.log("Duomenys is serveverio nepasiekiami !!!");

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function getDAta(_x) {
        return _getDAta.apply(this, arguments);
      }

      return getDAta;
    }()
  }, {
    key: "getPostData",
    value: function () {
      var _getPostData = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(api, id) {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return axios.post(this.uri + this.path + api, {
                  id: id
                });

              case 3:
                response = _context2.sent;

                if (!(response.status == 200 && response.statusText == "OK")) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", response.data.html);

              case 6:
                _context2.next = 12;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                console.error(_context2.t0);
                console.log("Duomenys is serveverio nepasiekiami !!!");

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 8]]);
      }));

      function getPostData(_x2, _x3) {
        return _getPostData.apply(this, arguments);
      }

      return getPostData;
    }()
  }, {
    key: "saveContent",
    value: function saveContent(api, id, content) {
      axios.post(this.uri + this.path + api, {
        id: id,
        content: content
      })["catch"](function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }

        console.log(error);
      });
    }
  }, {
    key: "formDataApi",
    value: function formDataApi(obj) {
      var formData = new FormData();

      if (obj.api) {
        if (obj.id) {
          formData.append('id', obj.id);
        }

        if (obj.title) {
          formData.append('title', obj.title);
        }

        if (obj.content) {
          formData.append('content', obj.content);
        }

        if (typeof obj.altText === 'string') {
          formData.append('altText', obj.altText);
        }

        if (typeof obj.imageTitle === 'string') {
          formData.append('imageTitle', obj.imageTitle);
        }

        if (obj.image) {
          formData.append('image', obj.image);
        }

        if (obj.tag) {
          formData.append('tag', obj.tag);
        }

        if (obj.slug) {
          formData.append('slug', obj.slug);
        }

        if (obj.category) {
          formData.append('category', obj.category);
        }

        if (obj.catTitle) {
          formData.append('catTitle', obj.catTitle);
        }

        if (obj.catContent) {
          formData.append('catContent', obj.catContent);
        }

        if (obj.page) {
          formData.append('page', obj.page);
        }

        if (obj.cat_parent) {
          formData.append('cat_parent', obj.cat_parent);
        }

        if (obj.various) {
          formData.append('various', obj.various);
        }

        console.log(Object.fromEntries(formData));
        axios.post(this.uri + this.path + obj.api, formData, {}).then(function (response) {})["catch"](function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }

          console.log(error);
        });
      } else {
        throw 'can not find API';
      }
    }
  }]);

  return Api;
}();

/* harmony default export */ __webpack_exports__["default"] = (Api);

/***/ }),

/***/ "./resources/js/calendar.js":
/*!**********************************!*\
  !*** ./resources/js/calendar.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/** @format */


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Calendar = /*#__PURE__*/function () {
  function Calendar(target) {
    _classCallCheck(this, Calendar);

    this.target = target;
    this.DOM = null;
    this.date = new Date();
    this.y = this.date.getFullYear(), this.m = this.date.getMonth(), this.d = this.date.getDay();
    this.lastDayM = new Date(this.y, this.m + 1, 0).getDate();
    var days = this.lastDayM;
    this.curentM = new Date(this.y, this.m + 1, 0).getMonth();
    this.curentDay = new Date(this.y, this.curentM, 1).getDay();
    var startDay = this.curentDay;
    this.path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
    this.uri = document.location.origin;
    this.init(days, startDay);
  }

  _createClass(Calendar, [{
    key: "init",
    value: function init(lastDayM, startDay) {
      var _this = this;

      var DOM = document.querySelector(this.target);

      if (DOM) {
        var a = 1;
        var lastMth = document.getElementById("calendar-month-last");
        var nextMth = document.getElementById("calendar-month-next");
        lastMth.addEventListener("click", function () {
          a = a - 1;

          _this.month(a);
        });
        nextMth.addEventListener("click", function () {
          a = a + 1;

          _this.month(a);
        });
        this.render(lastDayM, startDay);
      }
    }
  }, {
    key: "render",
    value: function render(lastDayM, curentDay, dataDate) {
      var _this2 = this;

      var today = this.date;

      if (curentDay == 0) {
        curentDay = 7;
      }

      var calendarDays = document.getElementById("dates");
      var exisitClassMonth = document.querySelector(".cview__month-current").textContent;

      if (exisitClassMonth == 1) {
        var nowM = new Date(this.y, this.date.getMonth());
        var nowY = nowM.toString().slice(11, -47);
        nowM = nowM.toString().slice(4, -55);
        nowM = this.translate(nowM);
        document.getElementById("calendar-month").innerHTML = nowY + ' ' + nowM;
      }

      var check = document.querySelectorAll(".cview--spacer");
      var check1 = document.querySelectorAll(".cview--date");

      if (check.length == 0 && check1.length == 0) {
        for (var i = 0; i < curentDay - 1; i++) {
          var spacer = document.createElement("div");
          spacer.className = "cview--spacer";
          calendarDays.appendChild(spacer);
        }

        for (var d = 1; d <= lastDayM; d++) {
          var _date = new Date(this.y, this.m, d);

          var day = document.createElement("div");
          day.className = "cview--date";
          day.textContent = d;
          day.setAttribute("data-date", _date);

          if (d == today.getDate() && this.y == today.getFullYear() && this.m == today.getMonth()) {
            day.classList.add("today");
          }

          calendarDays.appendChild(day);
        }
      } else {
        Array.from(document.querySelectorAll('.cview--spacer')).forEach(function (el) {
          return el.remove();
        });
        Array.from(document.querySelectorAll('.cview--date')).forEach(function (el) {
          return el.remove();
        });

        for (var x = 0; x < curentDay - 1; x++) {
          var _spacer = document.createElement("div");

          _spacer.className = "cview--spacer";
          calendarDays.appendChild(_spacer);
        }

        for (var _d = 1; _d <= lastDayM; _d++) {
          dataDate.setDate(_d);

          var _day = document.createElement("div");

          _day.className = "cview--date";
          _day.textContent = _d;

          _day.setAttribute("data-date", dataDate);

          calendarDays.appendChild(_day);
        }

        var aadToday = new Date(this.y, this.m, this.date.getDate());
        var isToday = document.querySelectorAll(".cview--date");

        for (var _i = 0; _i < isToday.length; _i++) {
          if (isToday[_i].dataset.date == aadToday) {
            isToday[_i].classList.add("today");
          }
        }
      }

      var event = document.querySelectorAll(".cview--date");

      var _loop = function _loop(_i2) {
        event[_i2].addEventListener("click", function (e) {
          var day = event[_i2].innerText;
          var action = event[_i2].dataset.date;
          var curentM = action.toString().slice(4, -55);

          var month = _this2.translate(curentM);

          _this2.event(action, month, day);
        });
      };

      for (var _i2 = 0; _i2 < event.length; _i2++) {
        _loop(_i2);
      }

      this.getData();
    }
  }, {
    key: "month",
    value: function month(a) {
      var curentMth = document.getElementById("calendar-month");
      var dataDate = new Date(this.y, this.m + a - 1);
      var y = this.date.getFullYear(),
          m = this.date.getMonth();
      var curentM = new Date(y, this.date.getMonth() + a, 0);
      var curentY = curentM.toString().slice(11, -47);
      curentM = curentM.toString().slice(4, -55);
      var curM = this.translate(curentM);
      curentMth.innerHTML = curentY + ' ' + curM;
      var lastDayM = new Date(y, m + a, 0).getDate();
      var newM = new Date(y, m + a, 0).getMonth();
      var startDay = new Date(curentY, newM, 1).getDay();
      return this.render(lastDayM, startDay, dataDate);
    }
  }, {
    key: "translate",
    value: function translate(curentM) {
      switch (curentM) {
        case 'Jan':
          return curentM = 'Sausis';
          break;

        case 'Feb':
          return curentM = 'Vasaris';
          break;

        case 'Mar':
          return curentM = 'Kovas';
          break;

        case 'Apr':
          return curentM = 'Balandis';
          break;

        case 'May':
          return curentM = 'Gegužė';
          break;

        case 'Jun':
          return curentM = 'Birželis';
          break;

        case 'Jul':
          return curentM = 'Liepa';
          break;

        case 'Aug':
          return curentM = 'Rugpjūtis';
          break;

        case 'Sep':
          return curentM = 'Rugsėjis';
          break;

        case 'Oct':
          return curentM = 'Spalis';
          break;

        case 'Nov':
          return curentM = 'Lapkritis';
          break;

        case 'Dec':
          return curentM = 'Gruodis';
          break;
      }
    }
  }, {
    key: "event",
    value: function event(action, month, day) {
      var _this3 = this;

      this.path;
      this.uri;
      var table = document.querySelector(".eventContainer");
      var HTML = "<div class=\"popup\">\n                <div class=\"content\">\n                  <div class=\"event\">     \n                    <span class=\"closebtn\">&#9932;</span>      \n                    <div class=\"eventTitle\">\n                       <h1>Ivesti nauja \u012Fvyki</h1>\n                    </div>\n                    <div class=\"subscribe\">\n                        <input class=\"newEvent\" type=\"text\" id=\"sendText\" placeholder=\"Naujas \u012Fvykis\">\n                        <input type=\"time\" id=\"appt\" name=\"appt\" value=\"00:00\">\n                      <div class=\"eventBtn\">\n                        Si\u0173sti\n                      </div>\n                    </div>\n                  </div>\n                    <div class=\"eventH2\">\n                        \u012Evykiai - ".concat(month, " ").concat(day, "\n                    </div>\n                    <div id=\"daysEvens\" class=\"eventBox\">\n                    </div>\n                </div>\n              </div>");
      table.innerHTML = HTML;
      this.renderEvents(action);
      var close = document.querySelector(".closebtn");
      var send = document.querySelector(".eventBtn");
      HTML = "";
      close.addEventListener("click", function (e) {
        table.innerHTML = HTML;
      });
      send.addEventListener("click", function (e) {
        var sendE = document.getElementById('sendText').value;
        var time = document.getElementById('appt').value;

        if (sendE.length != 0) {
          axios.post(_this3.uri + _this3.path + "calendar-store-admin", {
            date: action,
            event: sendE,
            time: time
          })["catch"](function (err) {
            console.log(err instanceof TypeError);
          });
          setTimeout(function () {
            _this3.getData(action);
          }, 400);
          setTimeout(function () {
            _this3.renderEvents(action);
          }, 500);
        }

        document.getElementById("sendText").value = "";
      });
    }
  }, {
    key: "renderEvents",
    value: function renderEvents(action) {
      axios.post(this.uri + this.path + 'calendar-create-admin', {}).then(function (response) {
        if (response.status == 200 && response.statusText == 'OK') {
          (function () {
            var call = new Calendar();
            var data = response.data.allData;
            var allEvens = document.getElementById('daysEvens');
            var HTML = "";
            var keys = [];
            var keys1 = [];
            var value = "";
            var value1 = [];
            var newValue = "";

            for (var key in data) {
              keys.push(key);
            }

            for (var i = 0; i < keys.length; i++) {
              value = data[keys[i]];

              if (action == value.event_date) {
                value1[i] = value;
              }
            }

            value1.sort(function (a, b) {
              return a.event_time < b.event_time ? -1 : a.event_time > b.event_time ? 1 : 0;
            });

            for (var key1 in value1) {
              keys1.push(key1);
            }

            if (keys1.length != 0) {
              for (var j = 0; j < keys1.length; j++) {
                newValue = value1[keys1[j]];

                if (action == newValue.event_date) {
                  HTML += "<div class=\"oneEventBtn\">\n                                    <div class=\"oneEvent\">\n                                        ".concat(newValue.event_time, "   ").concat(newValue.event_description, "\n                                    </div>\n                                    <div class=\"myEventBtn\" id=\"").concat(newValue.ID, "\" data-date=\"").concat(action, "\">\n                                        Trinti\n                                    </div>\n                                </div>");
                }

                allEvens.innerHTML = HTML;
              }
            } else {
              HTML = "";
              allEvens.innerHTML = HTML;
            }

            var deleteBtn = document.querySelectorAll(".myEventBtn");

            var _loop2 = function _loop2(_j) {
              deleteBtn[_j].addEventListener("click", function (e) {
                var action = deleteBtn[_j].dataset.date;
                var id = deleteBtn[_j].id;
                call.deleteEvent(id, action);
              });
            };

            for (var _j = 0; _j < deleteBtn.length; _j++) {
              _loop2(_j);
            }

            ;
          })();
        }
      })["catch"](function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }

        console.log(error);
      });
    }
  }, {
    key: "deleteEvent",
    value: function deleteEvent(id, action) {
      var _this4 = this;

      axios.post(this.uri + this.path + "calendar-delete-admin&id=" + id, {
        eventID: id
      }).then(function (response) {
        if (response.status == 200 && response.statusText == 'OK') {
          var data = response.data.allData;
          var dayEvents = document.querySelectorAll(".daysEvent");
          var keys = [];

          for (var key in data) {
            keys.push(key);
          }

          var counter = 0;

          for (var i = 0; i < dayEvents.length; i++) {
            for (var j = 0; j < keys.length; j++) {
              if (data[keys[j]].event_date == action) {
                counter++;
              }

              if (counter < 1 && action == dayEvents[i].dataset.date) {
                dayEvents[i].classList.remove("daysEvent");
              }
            }
          }
        }
      })["catch"](function (err) {
        console.log(err instanceof TypeError);
      });
      return setTimeout(function () {
        _this4.renderEvents(action);
      }, 500);
    }
  }, {
    key: "getData",
    value: function getData() {
      axios.post(this.uri + this.path + 'calendar-create-admin', {}).then(function (response) {
        if (response.status == 200 && response.statusText == 'OK') {
          var data = response.data.allData;
          var dayEvents = document.querySelectorAll(".cview--date");
          var keys = [];

          for (var key in data) {
            keys.push(key);
          }

          for (var i = 0; i < dayEvents.length; i++) {
            for (var j = 0; j < keys.length; j++) {
              if (data[keys[j]].event_date == dayEvents[i].dataset.date && "cview--date today" != dayEvents[i].className) {
                dayEvents[i].classList.add("daysEvent");
              }
            }
          }
        }
      })["catch"](function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }

        console.log(error);
      });
    }
  }]);

  return Calendar;
}();

/* harmony default export */ __webpack_exports__["default"] = (Calendar);

/***/ }),

/***/ "./resources/js/category.js":
/*!**********************************!*\
  !*** ./resources/js/category.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _profile_image__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./profile_image */ "./resources/js/profile_image.js");


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


var path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
var uri = document.location.origin;
var catStrt = document.getElementById("catStart");
var readImage = new _profile_image__WEBPACK_IMPORTED_MODULE_0__["default"]();

function startCat() {
  if (catStrt) {
    window.addEventListener("load", init, false);
  }
}

function init() {
  axios.post(uri + path + "category_create", {}).then(function (response) {
    var test = document.querySelector(".innercat");

    if (response.status == 200 && response.statusText == "OK") {
      var HTML = response.data.html;
      test.innerHTML = HTML;
      readImage.image();
      var submit = document.getElementById("create");
      submit.addEventListener("click", function () {
        var name = document.getElementById("category-name").value;
        var slug = document.getElementById("category-slug").value;
        var description = document.getElementById("category-description").value;
        var parent = document.getElementById('cat');
        var select;

        if (parent.options[parent.selectedIndex] != undefined) {
          select = parent.options[parent.selectedIndex].value;
        } else {
          select = 0;
        }

        var selectedPage;

        if (document.querySelector('[name="catPage"]:checked')) {
          selectedPage = 1;
        } else {
          selectedPage = 0;
        }

        catStore(name, select, slug, description, selectedPage);
      });
      var editBtn = catStrt.querySelectorAll(".category-edit");

      var _loop = function _loop(i) {
        var ID = editBtn[i].value;
        var taxonomy = editBtn[i].id;
        editBtn[i].addEventListener("click", function () {
          catEdit(ID, taxonomy);
        }, false);
      };

      for (var i = 0; i < editBtn.length; i++) {
        _loop(i);
      }

      var deleteBtn = document.querySelectorAll(".category-delete");

      var _loop2 = function _loop2(_i) {
        var ID = deleteBtn[_i].value;
        var taxonomy = deleteBtn[_i].id;

        deleteBtn[_i].addEventListener("click", function () {
          catDelete(ID, taxonomy);
        }, false);
      };

      for (var _i = 0; _i < deleteBtn.length; _i++) {
        _loop2(_i);
      }
    }
  })["catch"](function (error) {
    if (error.response) {} else if (error.request) {} else {
      console.log("Error", error.message);
    }

    console.log(error);
  });
  1;
}

function catStore(name, select, slug, description, selectedPage) {
  console.log(_typeof(selectedPage));
  var obj = {
    api: "category_store",
    title: name,
    slug: slug,
    page: selectedPage,
    content: description,
    cat_parent: select
  };

  if (obj) {
    readImage.sendImageData(obj);
  }

  setTimeout(init, 500);
  document.getElementById("category-name").value = "";
}

function catEdit(editID, taxonomy) {
  console.log(name);
  axios.post(uri + path + "category_edit&id=" + editID, {
    editID: editID,
    taxonomy_type: taxonomy
  }).then(function (response) {
    var test = document.querySelector(".innercat");

    if (response.status == 200 && response.statusText == "OK") {
      var HTML = response.data.html;
      test.innerHTML = HTML;
    }

    var updateBtn = document.getElementById("catUpdate");
    updateBtn.addEventListener("click", function () {
      var updateId = updateBtn.value;
      catUpdate(updateId);
    });
  })["catch"](function (err) {
    console.log(err instanceof TypeError);
  });
}

function catUpdate(updateId) {
  var name = document.getElementById("category_name").value;
  var slug = document.getElementById("category_slug").value;
  var description = document.getElementById("category_description").value;
  console.log(name);
  console.log(slug);
  console.log(description);
  axios.post(uri + path + "category_update", {
    updateId: updateId,
    cat_name: name,
    cat_slug: slug,
    cat_description: description
  }).then(function (response) {
    if (response.status == 200 && response.statusText == "OK") {
      // console.log(response);
      init(); // setTimeout(call.init(), 500);
    }
  })["catch"](function (err) {
    console.log(err instanceof TypeError);
  });
}

function catDelete(ID, taxonomy) {
  // console.log(ID)
  axios.post(uri + path + "category_destroy", {
    deleteID: ID,
    taxonomy_type: taxonomy
  }).then(function (response) {
    if (response.status == 200 && response.statusText == "OK") {
      console.log(response);
      init(); // setTimeout(init(), 500);
      // console.log(11111);
    }
  })["catch"](function (err) {
    console.log(err instanceof TypeError);
  });
}

/* harmony default export */ __webpack_exports__["default"] = (startCat());

/***/ }),

/***/ "./resources/js/editPost.js":
/*!**********************************!*\
  !*** ./resources/js/editPost.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./resources/js/api.js");
/* harmony import */ var _profile_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./profile_image */ "./resources/js/profile_image.js");


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var EditPost = /*#__PURE__*/function () {
  function EditPost(target) {
    _classCallCheck(this, EditPost);

    this.target = target;
    this.api = new _api__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.init();
  }

  _createClass(EditPost, [{
    key: "init",
    value: function init() {
      var DOM = document.querySelector(this.target);

      if (DOM) {
        var id = document.querySelector('.save').id;
        var image = document.getElementById('image');
        var imageDiv = document.querySelector('.imageDiv');
        var imgBlock = document.querySelector('.galleryContainer');
        var save = document.querySelector('.save');
        var title = document.querySelector('.title');
        var content = document.querySelectorAll("[contenteditable]");
        var api = "news-update";
        var readImage = new _profile_image__WEBPACK_IMPORTED_MODULE_1__["default"]();
        window.location.hash;
        imageDiv.addEventListener("click", function () {
          image.remove();
          imgBlock.classList.remove("hiden");
          readImage.image();
        });
        save.addEventListener("click", function () {
          var obj = {
            api: api,
            title: title.value,
            content: content[0].innerHTML,
            imageTitle: "",
            altText: "",
            id: id
          };
          readImage.sendImageData(obj);
        });
      }
    }
  }]);

  return EditPost;
}();

/* harmony default export */ __webpack_exports__["default"] = (EditPost);

/***/ }),

/***/ "./resources/js/idea.js":
/*!******************************!*\
  !*** ./resources/js/idea.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./resources/js/api.js");



var path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
var uri = document.location.origin;
var ideaStrt = document.getElementById("startIdeaAdmin");

function startIdea() {
  if (ideaStrt) {
    window.addEventListener("load", renderColons, false);
  }
}
/*----------------------- edit content axios----------------------------*/


function editText(editId) {
  var txt = document.getElementById(editId).value;

  if (txt != undefined && txt != null && txt.length >= 0 && txt != "" && txt != NaN) {
    var text = txt.split(/\s+/);
    var api = "idea-edit-admin";
    var sendData = new _api__WEBPACK_IMPORTED_MODULE_0__["default"]();
    sendData.saveContent(api, editId, text);
    setTimeout(renderColons, 500);
  }
}
/*----------------------- save content axios----------------------------*/


function solutionText(sId, i) {
  var txt1 = document.getElementById(i).value;

  if (txt1 != undefined && txt1 != null && txt1.length >= 0 && txt1 != "" && txt1 != NaN) {
    var text1 = txt1.split(/\s+/);
    var api = 'idea-create-admin';
    var sendData = new _api__WEBPACK_IMPORTED_MODULE_0__["default"]();
    sendData.saveContent(api, sId, text1);
    setTimeout(renderColons, 500);
  }
}
/*----------------------- delete content axios----------------------------*/


function deleteIdea(delId) {
  var api = "idea-delete-admin&id=";
  var sendData = new _api__WEBPACK_IMPORTED_MODULE_0__["default"]();
  sendData["delete"](api, delId);
  setTimeout(renderColons, 500);
} //  /*------------------------------render data  axios-----------------------------------------*/


function renderColons(e) {
  axios.get(uri + path + "idea-render-admin", {}).then(function (response) {
    if (response.status == 200 && response.statusText == "OK") {
      var data = response.data.allData;
      var keys = [];

      for (var key in data) {
        keys.push(key);
      }

      var rende = document.getElementById("box");
      var HTMLString = "";
      var counter = 0;

      for (var i = keys.length - 1; i >= 0; i--) {
        counter++;
        var value = data[keys[i]];
        HTMLString += "<div class=\"box\"> \n\n                    <div class=\"text\"><div class=\"data\" >".concat(value.post_date, "</div>                 \n                    </div>\n                    <div class=\"ideaContent\">\n                    <div class=\"ideaTextEdit\">\n                        <textarea class=\"ideaText\" maxlength=\"200\" name=\"idea\" id=\"").concat(value.ID, "\" data-attribute_name=\"\">\n                                ").concat(value.idea_content, "\n                        </textarea>  \n                        <button  class=\"ideaBtn delIdea\" id=\"").concat(value.ID, "\">\n                            Trinti\n                        </button> \n                        <button class=\"ideaBtn edit editButtonIdea\" id=\"").concat(value.ID, "\">\n                            Saugoti\n                        </button>\n                    </div>\n                    <div class=\"ideaSoliution\">\n                        <textarea class=\"ideaTextSoliution\" maxlength=\"200\" name=\"idea\" id=\"").concat(counter, "\" > \n                            ").concat(value.idea_solution, "                     \n                        </textarea>\n                        <button  class=\"ideaBtn addButtonIdea\" id=\"").concat(value.ID, "\">\n                            Sprendimas\n                        </button> \n                    </div> \n                    <span class=\"textCount\" id=\"count\"></span>\n                    </div>  \n                        <div class=\"like\" data-custom-id=\"").concat(value.ID, "\">\n                            <span class=\"like__number\">Like: ").concat(value.idea_like, "</span>             \n                        </div>            \n                    </div>\n                </div>");
      }

      rende.innerHTML = HTMLString;
      var editBtn = document.querySelectorAll(".editButtonIdea");
      var postBtn = document.querySelectorAll(".addButtonIdea");
      var deletetBtn = document.querySelectorAll(".delIdea");

      var _loop = function _loop(_i) {
        var sId = postBtn[_i].id;

        postBtn[_i].addEventListener("click", function () {
          solutionText(sId, _i + 1);
        }, false);
      };

      for (var _i = 0; _i < postBtn.length; _i++) {
        _loop(_i);
      }

      var _loop2 = function _loop2(_i2) {
        var editId = editBtn[_i2].id;

        editBtn[_i2].addEventListener("click", function () {
          editText(editId);
        }, false);
      };

      for (var _i2 = 0; _i2 < editBtn.length; _i2++) {
        _loop2(_i2);
      }

      var _loop3 = function _loop3(_i3) {
        var delId = deletetBtn[_i3].id;

        deletetBtn[_i3].addEventListener("click", function () {
          deleteIdea(delId);
        }, false);
      };

      for (var _i3 = 0; _i3 < deletetBtn.length; _i3++) {
        _loop3(_i3);
      }
    }

    return response;
  })["catch"](function (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }

    console.log(error);
  });
}

/* harmony default export */ __webpack_exports__["default"] = (startIdea());

/***/ }),

/***/ "./resources/js/main.js":
/*!******************************!*\
  !*** ./resources/js/main.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _idea_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./idea.js */ "./resources/js/idea.js");
/* harmony import */ var _category_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./category.js */ "./resources/js/category.js");
/* harmony import */ var _tag_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tag.js */ "./resources/js/tag.js");
/* harmony import */ var _page_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./page.js */ "./resources/js/page.js");
/* harmony import */ var _menu_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./menu.js */ "./resources/js/menu.js");
/* harmony import */ var _calendar_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./calendar.js */ "./resources/js/calendar.js");
/* harmony import */ var _news__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./news */ "./resources/js/news.js");
/* harmony import */ var _profile_image__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./profile_image */ "./resources/js/profile_image.js");
/* harmony import */ var _newsList__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./newsList */ "./resources/js/newsList.js");
/* harmony import */ var _editPost__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./editPost */ "./resources/js/editPost.js");
/** @format */
 // import startGallery from './gallery.js';







 // import TextEditor from './text-editor.js'




 // new TextEditor('.news-container')

new _calendar_js__WEBPACK_IMPORTED_MODULE_5__["default"]('.calendar');
new _news__WEBPACK_IMPORTED_MODULE_6__["default"]('startNewsAdmin');
new _newsList__WEBPACK_IMPORTED_MODULE_8__["default"]('startNweaList');
new _editPost__WEBPACK_IMPORTED_MODULE_9__["default"]('.editStart');
new _tag_js__WEBPACK_IMPORTED_MODULE_2__["default"]('tagStart');
new _menu_js__WEBPACK_IMPORTED_MODULE_4__["default"]('menuStart');

/***/ }),

/***/ "./resources/js/menu.js":
/*!******************************!*\
  !*** ./resources/js/menu.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./resources/js/api.js");


function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Menu = /*#__PURE__*/function () {
  function Menu(target) {
    _classCallCheck(this, Menu);

    this.target = target;
    this.read = true;
    this.init();
    this.index = 0;
  }

  _createClass(Menu, [{
    key: "init",
    value: function init() {
      var _this = this;

      var DOM = document.getElementById(this.target);

      if (DOM) {
        // })
        var getDragAfterElement = function getDragAfterElement(container, y) {
          var draggableElements = _toConsumableArray(container.querySelectorAll('.draggable:not(.dragging)'));

          return draggableElements.reduce(function (closest, child) {
            var box = child.getBoundingClientRect();
            var offset = y - box.top - box.height / 2;

            if (offset < 0 && offset > closest.offset) {
              return {
                offset: offset,
                element: child
              };
            } else {
              return closest;
            }
          }, {
            offset: Number.NEGATIVE_INFINITY
          }).element;
        };

        var draggables = document.querySelectorAll('.draggable');
        var container = document.querySelector('.cont');
        var add = document.querySelector(".addNew");
        this.save();
        this["delete"](draggables);

        var newBlock = function newBlock() {
          _this.addNew();

          add.removeEventListener("click", newBlock);
        };

        add.addEventListener("click", newBlock);
        draggables.forEach(function (draggable) {
          draggable.addEventListener('dragstart', function () {
            draggable.classList.add('dragging');
          });
          draggable.addEventListener('dragend', function () {
            draggable.classList.remove('dragging');
          });
        }); // containers.forEach(container => {

        container.addEventListener('dragover', function (e) {
          e.preventDefault();
          var afterElement = getDragAfterElement(container, e.clientY);
          var draggable = document.querySelector('.dragging');

          if (afterElement == null) {
            container.appendChild(draggable);
          } else {
            container.insertBefore(draggable, afterElement);
          }
        });
      }
    }
  }, {
    key: "addNew",
    value: function addNew() {
      var lastElemet = document.querySelector(".cont");
      var HTML = "<div class=\"menuName\">\n          <label for=\"\">\n\n          </label>\n          <input name=\"menu\" class=\"menuText\" placeholder=\"Pavadinimas\" type=\"text\">\n      </div>\n\n      <div class=\"menuSelect\">\n          <label for=\"standard-select\">\n\n          </label>\n\n          <select class=\"select-css\" id=\"standard-select\">\n              <option value=\"1\">Pasirinkti puslapi</option>\n              <option value=\"2\">2</option>\n              <option value=\"3\">3</option>\n              <option value=\"4\">4</option>\n              <option value=\"5\">5</option>\n          </select>\n      </div>\n      <div class=\"menuLinkAdd\">\n          <label for=\"link\">\n\n          </label>\n          <input class=\"menuLink\" placeholder=\"Prideti nuoroda\" type=\"text\">\n      </div>\n\n      <div class=\"manuDelete\">\n          <svg height=\"35\" version=\"1.1\" viewBox=\"0 0 295 295\" width=\"40\">\n              <title />\n              <desc />\n              <defs />\n              <g fill=\"none\" fill-rule=\"evenodd\" id=\"Page-1\" stroke=\"none\" stroke-width=\"1\">\n                  <g fill-rule=\"nonzero\" id=\"close\">\n                      <path d=\"M147.421,0 C66.133,0 0,66.133 0,147.421 C0,228.709 66.133,294.842 147.421,294.842 C185.708,294.842 221.988,280.233 249.58,253.706 C251.969,251.41 252.044,247.611 249.747,245.223 C247.452,242.835 243.654,242.759 241.264,245.056 C215.919,269.423 182.592,282.842 147.422,282.842 C72.75,282.843 12,222.093 12,147.421 C12,72.749 72.75,12 147.421,12 C222.092,12 282.842,72.75 282.842,147.421 C282.842,164.263 279.79,180.694 273.771,196.256 C272.576,199.347 274.112,202.821 277.203,204.017 C280.295,205.21 283.768,203.676 284.964,200.585 C291.519,183.636 294.843,165.749 294.843,147.42 C294.843,66.133 228.71,0 147.421,0 Z\" fill=\"#000000\" id=\"Shape\" />\n                      <path d=\"M167.619,160.134 C165.249,157.815 161.451,157.857 159.134,160.224 C156.816,162.592 156.857,166.391 159.224,168.709 L206.46,214.945 C207.628,216.088 209.143,216.657 210.657,216.657 C212.214,216.657 213.77,216.054 214.945,214.854 C217.263,212.486 217.222,208.687 214.855,206.369 L167.619,160.134 Z\" fill=\"#FB4A5E\" id=\"Shape\" />\n                      <path d=\"M125.178,133.663 C126.349,134.834 127.885,135.42 129.421,135.42 C130.957,135.42 132.492,134.834 133.664,133.663 C136.007,131.32 136.007,127.521 133.664,125.178 L88.428,79.942 C86.085,77.599 82.285,77.599 79.943,79.942 C77.6,82.285 77.6,86.084 79.943,88.427 L125.178,133.663 Z\" fill=\"#FB4A5E\" id=\"Shape\" />\n                      <path d=\"M214.9,79.942 C212.557,77.599 208.757,77.599 206.415,79.942 L79.942,206.415 C77.599,208.758 77.599,212.557 79.942,214.9 C81.113,216.071 82.649,216.657 84.185,216.657 C85.721,216.657 87.256,216.071 88.428,214.9 L214.9,88.428 C217.243,86.084 217.243,82.286 214.9,79.942 Z\" fill=\"#FB4A5E\" id=\"Shape\" />\n                  </g>\n              </g>\n          </svg>\n      </div>\n      <div class=\"menuDrag\">\n          <svg data-name=\"Layer 1\" id=\"Layer_1\" height=\"35\" width=\"40\" viewBox=\"0 0 32 32\">\n              <defs>\n                  <style>\n                      .cls-1 {\n                          fill: #515151;\n                      }\n                  </style>\n              </defs>\n              <title />\n              <path class=\"cls-1\" d=\"M16,9a3,3,0,1,0-3-3A3,3,0,0,0,16,9Zm0-4.46A1.46,1.46,0,1,1,14.54,6,1.46,1.46,0,0,1,16,4.54Z\" />\n              <path class=\"cls-1\" d=\"M16,19a3,3,0,1,0-3-3A3,3,0,0,0,16,19Zm0-4.46A1.46,1.46,0,1,1,14.54,16,1.46,1.46,0,0,1,16,14.54Z\" />\n              <path class=\"cls-1\" d=\"M16,29a3,3,0,1,0-3-3A3,3,0,0,0,16,29Zm0-4.46A1.46,1.46,0,1,1,14.54,26,1.46,1.46,0,0,1,16,24.54Z\" />\n          </svg>\n      </div>";
      var node = document.createElement("div");
      node.classList.add("draggable");
      node.setAttribute('id', "addDrag");
      node.setAttribute('draggable', true);
      node.innerHTML = HTML;
      lastElemet.appendChild(node);
      this.init();
    }
  }, {
    key: "delete",
    value: function _delete(draggables) {
      var deleted = document.querySelectorAll(".manuDelete");

      var _loop = function _loop(i) {
        deleted[i].addEventListener("click", function () {
          draggables[i].remove();
        });
      };

      for (var i = 0; i < draggables.length; i++) {
        _loop(i);
      }
    }
  }, {
    key: "save",
    value: function save() {
      var _this2 = this;

      var store = document.querySelector(".save");
      var api = "menu-store";

      if (this.read) {
        var data = function data() {
          var menuText = document.getElementsByName("menu");
          var menuLink = document.querySelectorAll(".menuLink");
          var selectBox = document.getElementsByTagName("select");
          var text = [];
          var link = [];
          var values = [];
          ;

          for (_this2.index = 0; _this2.index < selectBox.length; _this2.index++) {
            var options = selectBox[_this2.index].getElementsByTagName('option');

            for (var i = options.length; i--;) {
              if (options[i].selected) values.push(options[i].value); // if (options[i].selected) text = (options[i].innerText)
            }

            text.push(menuText[_this2.index].value);
            link.push(menuLink[_this2.index].value);
          }

          var axios = new _api__WEBPACK_IMPORTED_MODULE_0__["default"]();
          var obj = {
            category: values,
            various: link,
            content: text,
            api: api
          };
          axios.formDataApi(obj);
        };

        store.addEventListener("click", data);
      }

      this.read = false;
    }
  }]);

  return Menu;
}();

/* harmony default export */ __webpack_exports__["default"] = (Menu);

/***/ }),

/***/ "./resources/js/news.js":
/*!******************************!*\
  !*** ./resources/js/news.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _profile_image__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./profile_image */ "./resources/js/profile_image.js");


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var News = /*#__PURE__*/function () {
  function News(target) {
    _classCallCheck(this, News);

    this.target = target;
    this.getData();
  }

  _createClass(News, [{
    key: "getData",
    value: function getData() {
      var DOM = document.getElementById(this.target);

      if (DOM) {
        var parentElement = document.querySelector(".news-add");
        var editor = document.getElementById("editor");
        var title = document.createElement("input");
        title.setAttribute('placeholder', 'Pavadinimas');
        title.className = "titleInput";
        parentElement.insertBefore(title, editor);
        var readImage = new _profile_image__WEBPACK_IMPORTED_MODULE_0__["default"]();
        readImage.image();
        var newsPostTitle = document.querySelector(".titleInput");
        var editables = document.querySelectorAll("[contenteditable]");
        var button = document.getElementById("submit");
        var newsImageTitle = document.getElementById("newsName");
        var altText = document.getElementById("newsAlt");
        var category = document.getElementById("catNews");
        var tag = document.getElementById("tagNews");
        var newsCat = document.querySelector(".newsCat");
        var newsCatBtn = document.getElementById("create");
        category.addEventListener("click", function () {
          newsCat.style.display = "";
          var selectCat = document.getElementById("cat");
          selectCat.setAttribute("multiple", "multiple");
        });
        tag.addEventListener("click", function () {
          console.log(1111111111);
        });
        newsCatBtn.addEventListener("click", function () {
          newsCat.style.display = "none";
        });
        var select = document.getElementById('cat');
        var showAll = document.querySelector(".showAllSelected");
        var cat = [];
        var filteredAry = [];
        var tempCat = [];

        select.onchange = function () {
          var options = select.getElementsByTagName('option'),
              values;
          var text;

          for (var i = options.length; i--;) {
            if (options[i].selected) values = options[i].value;
            if (options[i].selected) text = options[i].innerText;
          }

          var showCat = document.createElement("div");
          var span = document.createElement("span");
          span.className = "closeCat";
          span.setAttribute("id", values);
          showCat.className = "selectedCat";
          span.innerHTML = "X";
          showCat.innerHTML = text.replace(/\s+/g, "");
          showAll.appendChild(span);
          showAll.appendChild(showCat);
          cat.push(values);
          var closeCat = document.querySelectorAll(".closeCat");
          var selectedCat = document.querySelectorAll(".selectedCat");
          closeCat[closeCat.length - 1].addEventListener("click", function () {
            tempCat.push(closeCat[closeCat.length - 1].id);
            filteredAry = cat.filter(function (e) {
              return e !== closeCat[closeCat.length - 1].id;
            });
            cat = filteredAry;
            closeCat[closeCat.length - 1].remove();
            selectedCat[closeCat.length - 1].remove();
          });
        };

        button.addEventListener("click", function () {
          var obj = {
            api: 'news-store',
            content: editables[0].innerHTML,
            alt: altText.value,
            imageTitle: newsImageTitle.value,
            title: newsPostTitle.value,
            catTitle: document.getElementById("category-name").value,
            catContent: document.getElementById("category-description").value,
            category: cat
          };

          if (obj.title) {
            readImage.sendImageData(obj);
          } else {
            alert("Not written the title !!!");
          }
        });
      }
    }
  }]);

  return News;
}();

/* harmony default export */ __webpack_exports__["default"] = (News);

/***/ }),

/***/ "./resources/js/newsList.js":
/*!**********************************!*\
  !*** ./resources/js/newsList.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api */ "./resources/js/api.js");




function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var NewsList = /*#__PURE__*/function () {
  function NewsList(target) {
    _classCallCheck(this, NewsList);

    this.target = target;
    this.api = new _api__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.init();
  }

  _createClass(NewsList, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var _this = this;

        var DOM;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                DOM = document.getElementById(this.target);

                if (!DOM) {
                  _context2.next = 3;
                  break;
                }

                return _context2.delegateYield( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
                  var deleteApi, listApi, HTML, deleteNews, editNews, _loop, i;

                  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          deleteApi = 'news-destroy&id=';
                          listApi = "news-list";
                          _context.next = 4;
                          return _this.api.getDAta(listApi);

                        case 4:
                          HTML = _context.sent;
                          DOM.innerHTML = HTML;
                          deleteNews = document.querySelectorAll(".deleteNews");
                          editNews = document.querySelectorAll(".edit");

                          _loop = function _loop(i) {
                            var deleteId = deleteNews[i].id;
                            deleteNews[i].addEventListener("click", function () {
                              _this.api["delete"](deleteApi, deleteId);

                              setTimeout(location.reload(), 500);
                            });
                          };

                          for (i = 0; i < deleteNews.length; i++) {
                            _loop(i);
                          }

                        case 10:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                })(), "t0", 3);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }]);

  return NewsList;
}();

/* harmony default export */ __webpack_exports__["default"] = (NewsList);

/***/ }),

/***/ "./resources/js/page.js":
/*!******************************!*\
  !*** ./resources/js/page.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


var path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
var uri = document.location.origin;
var pageStrt = document.getElementById("pageStart"); // console.log(pageStrt);

function startPage() {
  if (pageStrt) {
    window.addEventListener("load", init, false);
  }
}

function init() {
  axios.post(uri + path + "page_create", {}).then(function (response) {
    var test = document.querySelector(".innerpage");

    if (response.status == 200 && response.statusText == "OK") {
      var HTML = response.data.html;
      test.innerHTML = HTML;
      var submit = document.getElementById("create");
      submit.addEventListener("click", function () {
        var title = document.getElementById("page_title").value; // const name = document.getElementById("page_name").value;
        //   const description = document.getElementById("page-description").value;

        var post = document.getElementById('post'); // console.log(post);

        var select = post.options[post.selectedIndex].value;
        var pageState = document.getElementById('pageState');
        var selectpageState = pageState.options[pageState.selectedIndex].value; // console.log(select);  

        pageStore(title, select, name, selectpageState);
      });
      var editBtn = pageStrt.querySelectorAll(".page-edit");

      var _loop = function _loop(i) {
        var ID = editBtn[i].value; //   console.log(ID);
        //   let page = editBtn[i].id;

        editBtn[i].addEventListener("click", function () {
          pageEdit(ID);
        }, false);
      };

      for (var i = 0; i < editBtn.length; i++) {
        _loop(i);
      }

      var deleteBtn = document.querySelectorAll(".page-delete");

      var _loop2 = function _loop2(_i) {
        var ID = deleteBtn[_i].value;

        deleteBtn[_i].addEventListener("click", function () {
          pageDelete(ID);
        }, false);
      };

      for (var _i = 0; _i < deleteBtn.length; _i++) {
        _loop2(_i);
      }
    }
  })["catch"](function (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }

    console.log(error);
  });
  ;
}

function pageStore(title, select, name, selectpageState) {
  axios.post(uri + path + "page_store", {
    page_title: title,
    page_name: name,
    post_type: select,
    page_state: selectpageState
  }).then(function (response) {
    console.log(response);
    init();
  })["catch"](function (err) {
    console.log(err instanceof TypeError);
  });
  document.getElementById("page_title").value = "";
}

function pageEdit(ID) {
  axios.post(uri + path + "page_edit&id=" + ID, {
    editID: ID
  }).then(function (response) {
    var test = document.querySelector(".innerpage");

    if (response.status == 200 && response.statusText == "OK") {
      var HTML = response.data.html;
      test.innerHTML = HTML;
    }

    var updateBtn = document.getElementById("pageUpdate");
    updateBtn.addEventListener("click", function () {
      var updateId = updateBtn.value;
      pageUpdate(updateId);
    });
  })["catch"](function (err) {
    console.log(err instanceof TypeError);
  });
}

function pageUpdate(updateId) {
  var title = document.getElementById("page_title").value;
  console.log(title);
  var name = document.getElementById("page_name").value;
  console.log(name);
  axios.post(uri + path + "page_update&id=" + updateId, {
    updateId: updateId,
    page_title: title,
    page_name: name //   page_description: description

  }).then(function (response) {
    if (response.status == 200 && response.statusText == "OK") {
      // console.log(response);
      init();
    }
  })["catch"](function (err) {
    console.log(err instanceof TypeError);
  });
}

function pageDelete(ID) {
  axios.post(uri + path + "page_destroy&id=" + ID, {
    deleteID: ID
  }).then(function (response) {
    if (response.status == 200 && response.statusText == "OK") {
      console.log(response);
      init();
    }
  })["catch"](function (err) {
    console.log(err instanceof TypeError);
  });
}

/* harmony default export */ __webpack_exports__["default"] = (startPage());

/***/ }),

/***/ "./resources/js/profile_image.js":
/*!***************************************!*\
  !*** ./resources/js/profile_image.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./resources/js/api.js");


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Profile_image = /*#__PURE__*/function () {
  function Profile_image() {
    _classCallCheck(this, Profile_image);

    this.file = null;
  }

  _createClass(Profile_image, [{
    key: "image",
    value: function image() {
      var _this = this;

      if (window.File && window.FileList && window.FileReader) {
        var filesInput = document.getElementById("files");
        filesInput.addEventListener("change", function (event) {
          var file = filesInput.files[0];
          var currentDiv = document.getElementById("message");

          if (file.size < 1048576 || file.length != 0 && file != undefined && file != null) {
            if (file.type.match('image')) {
              var picReader = new FileReader();
              picReader.addEventListener("load", function (event) {
                var picFile = event.target;
                var output = document.getElementById("result");
                var div = document.createElement("div");
                div.className = "galleryDiv";
                var removeUploade = document.querySelector(".wrapper");
                removeUploade.style.display = "none";
                div.innerHTML = "<img class=\"uploadeImageGallery\" height=\"200px\" width=\"200px\" src=\"".concat(picFile.result, "\" alt=\" \"/>");
                output.insertBefore(div, currentDiv);
                var changeImage = document.querySelector(".galleryDiv");

                if (changeImage) {
                  changeImage.addEventListener("click", function () {
                    removeUploade.style.display = "";
                    changeImage.remove();
                    filesInput.value = '';
                  });
                }
              });
              picReader.readAsDataURL(file);
              _this.file = file;
            } else {
              alert("Tai nera paveikslelio tipo formatas");
            }
          } else {
            alert("Paveikslelio dydis virsija 1MB, rekomneduojamas dydis yra iki 200kb");
          }
        });
      } else {
        console.log("Your browser does not support File API");
      }
    }
  }, {
    key: "sendImageData",
    value: function sendImageData(obj) {
      var image = this.file;

      if (image) {
        obj.image = image;
      }

      var sendData = new _api__WEBPACK_IMPORTED_MODULE_0__["default"]();
      sendData.formDataApi(obj);
    }
  }]);

  return Profile_image;
}();

/* harmony default export */ __webpack_exports__["default"] = (Profile_image);

/***/ }),

/***/ "./resources/js/tag.js":
/*!*****************************!*\
  !*** ./resources/js/tag.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Tag = /*#__PURE__*/function () {
  function Tag(target) {
    _classCallCheck(this, Tag);

    this.path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
    this.uri = document.location.origin;
    this.pageSelected;
    this.hash = location.hash;
    this.hasharr;
    this.hasarr2;
    this.target = target;
    this.startTag();
  }

  _createClass(Tag, [{
    key: "startTag",
    value: function startTag() {
      var DOM = document.getElementById(this.target);

      if (DOM) {
        this.init();
      }
    }
  }, {
    key: "init",
    value: function init() {
      var _this = this;

      var pageNo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      if (_typeof(pageNo) == 'object' && this.hash.length !== 0) {
        console.log(pageNo);
        this.hasharr = this.hash.split('#');
        this.hasarr2 = this.hasharr[1].split('%');
        this.hash = hasarr2[0]; // window.addEventListener( "load",
        // () =>{
        // this.hasharr = this.hash.split('#')
        // this.hasarr2 = this.hasharr[1].split('%')
        // this.hash = this.hasarr2[0]
        // this.hash = location.hash
        // this.init();
      } else if (typeof pageNo === 'string' && this.hash.length !== 0) {
        this.hasharr = this.hash.split('#');
        this.hasarr2 = this.hasharr[1].split('%');
        this.hash = this.hasarr2[0];
      } else {
        this.hash = null;
      }

      axios.post(this.uri + this.path + "tag_create", {
        pages: parseInt(pageNo),
        pageSelected: this.pageSelected,
        hash: this.hash
      }).then(function (response) {
        var test = document.querySelector(".test");

        if (response.status == 200 && response.statusText == "OK") {
          var HTML = response.data.html;
          test.innerHTML = HTML;

          if (pageNo > 0 && typeof pageNo === 'string') {
            var addColor = document.querySelector('.nr-' + pageNo);
            addColor.classList.add("active");
          }

          var submit = document.getElementById("create");
          submit.addEventListener("click", function () {
            var name = document.getElementById("tag-name").value;
            var slug = document.getElementById("tag-slug").value;
            var description = document.getElementById("tag-description").value;

            _this.tagStore(name, slug, description);
          });
          var editBtn = document.querySelectorAll(".tag-edit");

          var _loop = function _loop(i) {
            var ID = editBtn[i].value;
            var taxonomy = editBtn[i].id;
            editBtn[i].addEventListener("click", function () {
              _this.tagEdit(ID, taxonomy);
            }, false);
          };

          for (var i = 0; i < editBtn.length; i++) {
            _loop(i);
          }

          var deleteBtn = document.querySelectorAll(".tag-delete");

          var _loop2 = function _loop2(_i) {
            var ID = deleteBtn[_i].value;
            var taxonomy = deleteBtn[_i].id;

            deleteBtn[_i].addEventListener("click", function () {
              _this.tagDelete(ID, taxonomy);
            }, false);
          };

          for (var _i = 0; _i < deleteBtn.length; _i++) {
            _loop2(_i);
          }

          var pageBtn = document.getElementById("selectpage");
          var select = document.getElementById("items");
          pageBtn.addEventListener("click", function () {
            var pageSelected;

            if (select.options[select.selectedIndex] != undefined) {
              pageSelected = select.options[select.selectedIndex].value;
            } else {
              pageSelected = 0;
            }

            _this.pageSelected = pageSelected;

            _this.init(1);
          });
          var page = document.querySelectorAll(".paging");

          var _loop3 = function _loop3(_i2) {
            var pageNo = page[_i2].id;

            page[_i2].addEventListener("click", function () {
              console.log(pageNo);
              location.hash = '#' + pageNo;
              _this.hash = location.hash;

              _this.init(pageNo);
            }, false);
          };

          for (var _i2 = 0; _i2 < page.length; _i2++) {
            _loop3(_i2);
          }
        }
      })["catch"](function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }

        console.log(error);
      });
    }
  }, {
    key: "tagStore",
    value: function tagStore(name, slug, description) {
      var _this2 = this;

      axios.post(this.uri + this.path + "tag_store", {
        tag_name: name,
        tag_slug: slug,
        tag_description: description
      }).then(function (response) {
        console.log(response);

        _this2.init();
      })["catch"](function (err) {
        console.log(err instanceof TypeError);
      });
      document.getElementById("tag-name").value = "";
    }
  }, {
    key: "tagEdit",
    value: function tagEdit(editID, taxonomy) {
      var _this3 = this;

      axios.post(this.uri + this.path + "tag_edit", {
        editID: editID,
        taxonomy_type: taxonomy
      }).then(function (response) {
        var test = document.querySelector(".test");

        if (response.status == 200 && response.statusText == "OK") {
          var HTML = response.data.html;
          test.innerHTML = HTML;
        }

        var updateBtn = document.getElementById("tagUpdate");
        updateBtn.addEventListener("click", function () {
          var updateId = updateBtn.value;

          _this3.tagUpdate(updateId);
        });
      })["catch"](function (err) {
        console.log(err instanceof TypeError);
      });
    }
  }, {
    key: "tagUpdate",
    value: function tagUpdate(updateId) {
      var _this4 = this;

      var name = document.getElementById("tag_name").value;
      var slug = document.getElementById("tag_slug").value;
      var description = document.getElementById("tag_description").value;
      axios.post(this.uri + this.path + "tag_update", {
        updateId: updateId,
        tag_name: name,
        tag_slug: slug,
        tag_description: description
      }).then(function (response) {
        if (response.status == 200 && response.statusText == "OK") {
          console.log(response);

          _this4.init(); // setTimeout(call.init(), 500);

        }
      })["catch"](function (err) {
        console.log(err instanceof TypeError);
      });
    }
  }, {
    key: "tagDelete",
    value: function tagDelete(ID, taxonomy) {
      var _this5 = this;

      axios.post(this.uri + this.path + "tag_destroy", {
        deleteID: ID,
        taxonomy_type: taxonomy
      }).then(function (response) {
        if (response.status == 200 && response.statusText == "OK") {
          console.log(response);

          _this5.init(); // setTimeout(init(), 500);

        }
      })["catch"](function (err) {
        console.log(err instanceof TypeError);
      });
    }
  }]);

  return Tag;
}();

/* harmony default export */ __webpack_exports__["default"] = (Tag); // const path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
// const this.uri = document.location.origin;
// const tagStrt = document.getElementById("tagStart");
// function startTag() {
//   if (tagStrt) {
//     window.addEventListener("load", init, false);
//   }
// }
// let pageSelected;
// let hash = location.hash
// let hasharr
// let hasarr2
// function init(pageNo = 1, hash = 1){
// if (typeof pageNo == 'object' &&  hash.length !== 0){
//   hasharr = hash.split('#')
//   hasarr2 = hasharr[1].split('%')
//   hash = hasarr2[0]
//   window.addEventListener( "load",
//   () =>{
//     // hasharr = hash.split('#')
//     // hasarr2 = hasharr[1].split('%')
//     // hash = hasarr2[0]
//     hash = location.hash
//     init(hash);
//   },
//   false);
// }else if(typeof pageNo === 'string' && hash.length !== 0){
//   hasharr = hash.split('#')
//   hasarr2 = hasharr[1].split('%')
//   hash = hasarr2[0]
// }else{
//   hash = null
// }
//   axios
//     .post(uri + path + "tag_create",{
//       pages: parseInt(pageNo),
//       pageSelected: pageSelected,
//       hash: hash
//     })
//     .then((response)=> {
//       const test = document.querySelector(".test");
//       if (response.status == 200 && response.statusText == "OK") {
//         const HTML = response.data.html;
//         test.innerHTML = HTML;
//         if(pageNo >0 && typeof pageNo === 'string' ){
//           let addColor = document.querySelector('.nr-'+pageNo);
//           addColor.classList.add("active");
//         }
//         const submit = document.getElementById("create");
//         submit.addEventListener("click", () => {
//           const name = document.getElementById("tag-name").value;
//           const slug = document.getElementById("tag-slug").value;
//           const description = document.getElementById("tag-description").value;
//           tagStore(name, slug, description);
//         });
//         const editBtn = tagStrt.querySelectorAll(".tag-edit");
//         for (let i = 0; i < editBtn.length; i++) {
//           let ID = editBtn[i].value;
//           let taxonomy = editBtn[i].id;
//           editBtn[i].addEventListener(
//             "click",
//             () =>{
//               tagEdit(ID, taxonomy);
//             },
//             false
//           );
//         }
//         const deleteBtn = document.querySelectorAll(".tag-delete");
//         for (let i = 0; i < deleteBtn.length; i++) {
//           let ID = deleteBtn[i].value;
//           let taxonomy = deleteBtn[i].id;
//           deleteBtn[i].addEventListener(
//             "click",
//             ()=> {
//               tagDelete(ID, taxonomy);
//             },
//             false
//           );
//         }
//         const pageBtn = document.getElementById("selectpage");
//         const select = document.getElementById("items");
//         if (pageSelected != undefined) {
//           select.value = pageSelected
//         }
//         pageBtn.addEventListener(
//           "click",
//           ()=> {
//             pageSelected = select.options[select.selectedIndex].value;
//             select.value = pageSelected
//             init(1);
//           },
//           false
//         );
//         const page = document.querySelectorAll(".paging");
//         for (let i = 0; i < page.length; i++){
//           let pageNo = page[i].id;
//           page[i].addEventListener(
//             "click",
//             ()=> {
//               location.hash = '#' + pageNo
//               hash = location.hash
//               init(pageNo);
//             },
//             false
//           );
//         }
//       }
//     })
//     .catch(function(error) {
//       if (error.response) {
//         console.log(error.response.data);
//         console.log(error.response.status);
//         console.log(error.response.headers);
//       } else if (error.request) {
//         console.log(error.request);
//       } else {
//         console.log("Error", error.message);
//       }
//       console.log(error);
//     });
//   ;
// }
// function tagStore(name, slug, description) {
//   axios
//     .post(uri + path + "tag_store", {
//       tag_name: name,
//       tag_slug: slug,
//       tag_description: description
//     })
//     .then((response) => {
//       console.log(response);
//       init();
//     })
//     .catch((err) => {
//       console.log(err instanceof TypeError);
//     });
//   document.getElementById("tag-name").value = "";
// }
// function tagEdit(editID, taxonomy) {
//   axios
//     .post(uri + path + "tag_edit", {
//       editID: editID,
//       taxonomy_type: taxonomy,
//     })
//     .then((response)=> {
//       const test = document.querySelector(".test");
//       if (response.status == 200 && response.statusText == "OK") {
//         const HTML = response.data.html;
//         test.innerHTML = HTML;
//       }
//       const updateBtn = document.getElementById("tagUpdate");
//       updateBtn.addEventListener("click", () => {
//         const updateId = updateBtn.value;
//         tagUpdate(updateId);
//       });
//     })
//     .catch((err) => {
//       console.log(err instanceof TypeError);
//     });
// }
// function tagUpdate(updateId) {
//   const name = document.getElementById("tag_name").value;
//   const slug = document.getElementById("tag_slug").value;
//   const description = document.getElementById("tag_description").value;
//   axios
//     .post(uri + path + "tag_update", {
//       updateId: updateId,
//       tag_name: name,
//       tag_slug: slug,
//       tag_description: description
//     })
//     .then((response)=> {
//       if (response.status == 200 && response.statusText == "OK") {
//         console.log(response);
//         init();
//         // setTimeout(call.init(), 500);
//       }
//     })
//     .catch((err) => {
//       console.log(err instanceof TypeError);
//     });
// }
// function tagDelete(ID, taxonomy) {
//   axios
//     .post(uri + path + "tag_destroy", {
//       deleteID: ID,
//       taxonomy_type: taxonomy,
//     })
//     .then((response)=> {
//       if (response.status == 200 && response.statusText == "OK") {
//         console.log(response);
//         init();
//         // setTimeout(init(), 500);
//       }
//     })
//     .catch((err) => {
//       console.log(err instanceof TypeError);
//     });
// }
// export default startTag();
// async init(pageNo) {
//   let api = "tag_create";
//   let axios = new Api();
//   let response = awayt axios.getDAta(api);
//     console.log(response);
// const test = document.querySelector(".test");
// const HTML = response.data.html;
// console.log(HTML);
// test.innerHTML = HTML;
// const submit = document.getElementById("create");
// submit.addEventListener("click", () => {
//   const name = document.getElementById("tag-name").value;
//   const slug = document.getElementById("tag-slug").value;
//   const description = document.getElementById("tag-description").value;
//   tagStore(name, slug, description);
// });

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!**************************************************************!*\
  !*** multi ./resources/js/main.js ./resources/sass/app.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! D:\xampp\htdocs\wordpress\wp-content\plugins\BIT_first\resources\js\main.js */"./resources/js/main.js");
module.exports = __webpack_require__(/*! D:\xampp\htdocs\wordpress\wp-content\plugins\BIT_first\resources\sass\app.scss */"./resources/sass/app.scss");


/***/ })

/******/ });

