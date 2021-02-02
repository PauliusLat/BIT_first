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

/***/ "./resources/js/albumEdit.js":
/*!***********************************!*\
  !*** ./resources/js/albumEdit.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api */ "./resources/js/api.js");




function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var AlbumEdit = /*#__PURE__*/function () {
  function AlbumEdit(target) {
    _classCallCheck(this, AlbumEdit);

    this.target = target;
    this.DOM = null;
    this.axios = new _api__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.array;
    this.add;
    this.init();
  }

  _createClass(AlbumEdit, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var DOM, array;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                DOM = document.querySelector(this.target);

                if (DOM) {
                  array = _toConsumableArray(document.querySelectorAll(".imgePosition"));
                  this.array = array;
                  this.save();
                  this["delete"]();
                }

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "save",
    value: function save() {
      var _this = this;

      this.add = document.querySelector(".saveAlbum");
      var albumID = this.add.getAttribute('data');
      var title = document.querySelector(".albumTitle");
      var api = 'gallery-update-admin&id=';
      var id;
      var obj;
      this.add.addEventListener("click", function () {
        id = _this.check();

        if (!id) {
          id = _this.add.id;
        }

        obj = {
          api: api + albumID,
          title: title.value,
          profileImgID: id
        };

        _this.axios.formDataApi(obj);
      });
    }
  }, {
    key: "check",
    value: function check() {
      var remove = document.querySelectorAll(".removeBtn");
      var select = document.querySelectorAll(".checkbox");
      var id = [];

      for (var i = 0; i < remove.length; i++) {
        if (select[i].checked) {
          id.push(remove[i].id);
        }
      }

      if (id.length > 1) {
        alert("Galima pasirinkite tik 1 albumo paveiksleli !!!");
      } else {
        return id[0];
      }
    }
  }, {
    key: "delete",
    value: function _delete() {
      var _this2 = this;

      var check = true;
      var response;

      var _loop = function _loop(i) {
        var remove = _this2.array[i].children[1].children[0];

        var newRemove = /*#__PURE__*/function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
            var api, id;
            return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (!check) {
                      _context2.next = 13;
                      break;
                    }

                    if (!(_this2.add.id != remove.id)) {
                      _context2.next = 12;
                      break;
                    }

                    api = 'album-image-destroy&id=';
                    id = remove.id;

                    _this2.array[i].remove();

                    _this2.array.splice(i, 1);

                    _context2.next = 8;
                    return _this2.axios["delete"](api, id);

                  case 8:
                    response = _context2.sent;

                    if (response) {
                      _this2["delete"]();

                      check = false;
                    }

                    _context2.next = 13;
                    break;

                  case 12:
                    alert("Albumo paveikslelio trinti negalima !!!");

                  case 13:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          return function newRemove() {
            return _ref.apply(this, arguments);
          };
        }();

        remove.addEventListener("click", newRemove);
      };

      for (var i = 0; i < this.array.length; i++) {
        _loop(i);
      }
    }
  }]);

  return AlbumEdit;
}();

/* harmony default export */ __webpack_exports__["default"] = (AlbumEdit);

/***/ }),

/***/ "./resources/js/albumList.js":
/*!***********************************!*\
  !*** ./resources/js/albumList.js ***!
  \***********************************/
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



var AlbumList = /*#__PURE__*/function () {
  function AlbumList(target) {
    _classCallCheck(this, AlbumList);

    this.target = target;
    this.axios = new _api__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.array = _toConsumableArray(document.querySelectorAll(".deleteAlbum"));
    this["delete"]();
  }

  _createClass(AlbumList, [{
    key: "delete",
    value: function _delete() {
      var _this = this;

      var DOM = document.getElementById(this.target);

      if (DOM) {
        (function () {
          var check = true;

          var _loop = function _loop(i) {
            var remove = _this.array[i].parentElement.parentElement.parentElement;

            var newRemove = function newRemove(e) {
              if (check) {
                e.stopPropagation();
                var api = 'album-destroy&id=';
                var id = _this.array[i].id;
                remove.remove();

                _this.array.splice(i, 1);

                var response = _this.axios["delete"](api, id);

                if (response) {
                  _this["delete"]();

                  check = false;
                }
              }
            };

            remove.addEventListener("click", newRemove);
            document.getElementsByTagName("form")[i].addEventListener("click", function (e) {
              e.stopPropagation();
            });
          };

          for (var i = 0; i < _this.array.length; i++) {
            _loop(i);
          }
        })();
      }
    }
  }]);

  return AlbumList;
}();

/* harmony default export */ __webpack_exports__["default"] = (AlbumList);

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

    this.path = WPURLS.apiUrl;
    this.html = null;
    this.isRespose = false;
  }

  _createClass(Api, [{
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(api, id) {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return axios.post(this.path + api + id, {
                  deleteId: id
                });

              case 3:
                response = _context.sent;

                if (!(response.status == 200 && response.statusText == "OK")) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", response);

              case 6:
                _context.next = 12;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                console.error(_context.t0);
                console.log("Data from the server is not available !!!");

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function _delete(_x, _x2) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: "getDAta",
    value: function () {
      var _getDAta = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(api) {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return axios.post(this.path + api);

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
                console.log("Data from the server is not available !!!");

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 8]]);
      }));

      function getDAta(_x3) {
        return _getDAta.apply(this, arguments);
      }

      return getDAta;
    }()
  }, {
    key: "saveContent",
    value: function saveContent(api, id, content) {
      axios.post(this.path + api, {
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
        console.log("Data from the server is not available !!!");
      });
    }
  }, {
    key: "formDataApi",
    value: function formDataApi(obj) {
      var formData = new FormData();

      if (obj.api) {
        for (var key in obj) {
          formData.append(key, obj[key]);
        } // console.log(Object.fromEntries(formData))


        axios.post(this.path + obj.api, formData, {}).then(function (response) {})["catch"](function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            s;
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
            console.log("Data from the server is not available !!!");
          }

          console.log(error);
        });

        while (!isResponse) {
          // waiting for response
          console.log('Laukiam response');
        }
      } else {
        throw 'can not find API';
      }
    }
  }, {
    key: "getPostData",
    value: function () {
      var _getPostData = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(obj) {
        var formData, key, response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!obj.api) {
                  _context3.next = 19;
                  break;
                }

                _context3.prev = 1;
                formData = new FormData();

                for (key in obj) {
                  formData.append(key, obj[key]);
                } // console.log(Object.fromEntries(formData))


                _context3.next = 6;
                return axios.post(this.path + obj.api, formData, {});

              case 6:
                response = _context3.sent;

                if (!(response.status == 200 && response.statusText == "OK")) {
                  _context3.next = 11;
                  break;
                }

                _context3.next = 10;
                return response.data.html;

              case 10:
                return _context3.abrupt("return", _context3.sent);

              case 11:
                _context3.next = 17;
                break;

              case 13:
                _context3.prev = 13;
                _context3.t0 = _context3["catch"](1);
                console.error(_context3.t0);
                console.log("Data from the server is not available !!!");

              case 17:
                _context3.next = 20;
                break;

              case 19:
                throw 'can not find API';

              case 20:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 13]]);
      }));

      function getPostData(_x4) {
        return _getPostData.apply(this, arguments);
      }

      return getPostData;
    }()
  }, {
    key: "getResponseData",
    value: function () {
      var _getResponseData = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(obj) {
        var formData, key, response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!obj.api) {
                  _context4.next = 19;
                  break;
                }

                _context4.prev = 1;
                formData = new FormData();

                for (key in obj) {
                  formData.append(key, obj[key]);
                } // console.log(Object.fromEntries(formData))


                _context4.next = 6;
                return axios.post(this.path + obj.api, formData, {});

              case 6:
                response = _context4.sent;

                if (!(response.status == 200 && response.statusText == "OK")) {
                  _context4.next = 11;
                  break;
                }

                _context4.next = 10;
                return response;

              case 10:
                return _context4.abrupt("return", _context4.sent);

              case 11:
                _context4.next = 17;
                break;

              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4["catch"](1);
                console.error(_context4.t0);
                console.log("Data from the server is not available !!!");

              case 17:
                _context4.next = 20;
                break;

              case 19:
                throw 'can not find API';

              case 20:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 13]]);
      }));

      function getResponseData(_x5) {
        return _getResponseData.apply(this, arguments);
      }

      return getResponseData;
    }()
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
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./resources/js/api.js");
/** @format */


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Calendar = /*#__PURE__*/function () {
  function Calendar(target) {
    _classCallCheck(this, Calendar);

    this.target = target;
    this.axios = new _api__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.DOM = null;
    this.date = new Date();
    this.y = this.date.getFullYear(), this.m = this.date.getMonth(), this.d = this.date.getDay();
    this.lastDayM = new Date(this.y, this.m + 1, 0).getDate();
    var days = this.lastDayM;
    this.curentM = new Date(this.y, this.m + 1, 0).getMonth();
    this.curentDay = new Date(this.y, this.curentM, 1).getDay();
    var startDay = this.curentDay;
    this.path = WPURLS.apiUrl;
    this.months = ['Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Gegužė', 'Birželis', 'Liepa', 'Rugpjūtis', 'Rugsėjis', 'Spalis', 'Lapkritis', 'Gruodis'];
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
        this.m;
        var nowM = this.m;
        var nowY = this.y;
        nowM = this.months[nowM];
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
          var _date = new Date(this.y, this.m, d); // console.log(_date);


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
      var month = document.querySelector(".cview__month-current");

      var _loop = function _loop(_i2) {
        event[_i2].addEventListener("click", function (e) {
          var day = event[_i2].innerText;
          var action = event[_i2].dataset.date;
          var m = month.innerText;

          _this2.event(action, m, day);
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
      var curentY = new Date(y, this.date.getMonth() + a, 0).getFullYear();
      var curM = this.months[new Date(y, this.date.getMonth() + a, 0).getMonth()];
      curentMth.innerHTML = curentY + ' ' + curM;
      var lastDayM = new Date(y, m + a, 0).getDate();
      var newM = new Date(y, m + a, 0).getMonth();
      var startDay = new Date(curentY, newM, 1).getDay();
      return this.render(lastDayM, startDay, dataDate);
    }
  }, {
    key: "event",
    value: function event(action, month, day) {
      var _this3 = this;

      this.path;
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
          var api = "calendar-store-admin";
          var obj = {
            api: api,
            date: action,
            event: sendE,
            time: time
          };

          _this3.axios.formDataApi(obj);

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
      axios.post(this.path + 'calendar-create-admin', {}).then(function (response) {
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

      axios.post(this.path + "calendar-delete-admin&id=" + id, {
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
      axios.post(this.path + 'calendar-create-admin', {}).then(function (response) {
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
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _pagination__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pagination */ "./resources/js/pagination.js");
/* harmony import */ var _profile_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./profile_image */ "./resources/js/profile_image.js");




function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var Category = /*#__PURE__*/function (_Pagination) {
  _inherits(Category, _Pagination);

  var _super = _createSuper(Category);

  function Category(target) {
    var _this;

    _classCallCheck(this, Category);

    _this = _super.call(this);
    _this.api = "category_create";
    _this.pages = 5;
    _this.target = target;
    _this.watch = document.querySelector(".innercat");
    _this.changes;
    _this.readImage = new _profile_image__WEBPACK_IMPORTED_MODULE_2__["default"]();

    _this.init();

    return _this;
  }

  _createClass(Category, [{
    key: "init",
    value: function init() {
      var DOM = document.getElementById(this.target);

      if (DOM) {
        var hash = location.hash.split('#')[1];

        if (hash) {
          this.hashChange(hash);
        } else {
          this.hashChange();
        }

        this.paging();
      }
    }
  }, {
    key: "addAction",
    value: function addAction() {
      this.readImage.image();
      this.create();
      this["delete"]();
      this.edit();
    }
  }, {
    key: "create",
    value: function create() {
      var _this2 = this;

      var name = document.getElementById("category-name");
      var slug = document.getElementById("category-slug");
      var description = document.getElementById("category-description");
      var selectedPage;

      if (document.querySelector('[name="catPage"]:checked')) {
        selectedPage = 1;
      } else {
        selectedPage = 0;
      }

      var submit = document.getElementById("create");
      var api = 'category_store';
      var response;
      submit.addEventListener("click", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var parent, select, obj, changes;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                parent = document.getElementById('cat');

                if (parent.options[parent.selectedIndex] != undefined) {
                  select = parent.options[parent.selectedIndex];
                } else {
                  select = 0;
                }

                obj = {
                  api: api,
                  title: name.value,
                  slug: slug.value,
                  page: selectedPage,
                  content: description.value,
                  cat_parent: select.value
                };

                if (!obj) {
                  _context.next = 7;
                  break;
                }

                _context.next = 6;
                return _this2.readImage.sendImageData(obj);

              case 6:
                response = _context.sent;

              case 7:
                changes = _this2.changes;
                window.removeEventListener('hashchange', changes);
                name.value = "";
                slug.value = "";
                description.value = "";
                window.removeEventListener('hashchange', changes);

                if (!response) {
                  _context.next = 17;
                  break;
                }

                return _context.abrupt("return", _this2.init());

              case 17:
                throw console.error("Api do not return response !!!");

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));
    }
  }, {
    key: "delete",
    value: function _delete() {
      var _this3 = this;

      var api = "category_destroy";
      var deleteBtn = document.querySelectorAll(".category-delete");
      var response;

      if (deleteBtn) {
        var _loop = function _loop(i) {
          var ID = deleteBtn[i].value;
          var taxonomy = deleteBtn[i].id;
          deleteBtn[i].addEventListener("click", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
            var obj, changes;
            return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    obj = {
                      api: api,
                      deleteID: ID,
                      taxonomy_type: taxonomy
                    };
                    _context2.next = 3;
                    return _this3.axios.getResponseData(obj);

                  case 3:
                    response = _context2.sent;
                    changes = _this3.changes;
                    window.removeEventListener('hashchange', changes);

                    if (!response) {
                      _context2.next = 10;
                      break;
                    }

                    return _context2.abrupt("return", _this3.init());

                  case 10:
                    throw console.error("Api do not return response !!!");

                  case 11:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          })));
        };

        for (var i = 0; i < deleteBtn.length; i++) {
          _loop(i);
        }
      }
    }
  }, {
    key: "edit",
    value: function edit() {
      var _this4 = this;

      var editBtn = document.querySelectorAll(".category-edit");

      var _loop2 = function _loop2(i) {
        var editID = editBtn[i].value;
        var taxonomy = editBtn[i].id;
        editBtn[i].addEventListener("click", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4() {
          var api, obj, HTML, name, slug, description, parent, select, updateBtn;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  api = "category_edit";
                  obj = {
                    api: api,
                    editID: editID,
                    taxonomy_type: taxonomy
                  };
                  _context4.next = 4;
                  return _this4.axios.getPostData(obj);

                case 4:
                  HTML = _context4.sent;
                  _this4.watch.innerHTML = HTML;

                  _this4.readImage.image();

                  name = document.getElementById("category_name");
                  slug = document.getElementById("category_slug");
                  description = document.getElementById("category_description");
                  parent = document.getElementById('cat');
                  updateBtn = document.getElementById("catUpdate");
                  updateBtn.addEventListener("click", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
                    var api, response, obj, changes;
                    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            api = "category_update";

                            if (parent.options[parent.selectedIndex] != undefined) {
                              select = parent.options[parent.options.selectedIndex].value;
                            } else {
                              select = 0;
                            }

                            obj = {
                              api: api,
                              updateId: updateBtn.value,
                              cat_parent: select,
                              cat_name: name.value,
                              cat_slug: slug.value,
                              cat_description: description.value
                            };

                            if (!obj) {
                              _context3.next = 8;
                              break;
                            }

                            _context3.next = 6;
                            return _this4.readImage.sendImageData(obj);

                          case 6:
                            response = _context3.sent;
                            console.log(response);

                          case 8:
                            changes = _this4.changes;
                            window.removeEventListener('hashchange', changes);
                            description.value = "";
                            slug.value = "";
                            name.value = "";

                            if (!response) {
                              _context3.next = 17;
                              break;
                            }

                            return _context3.abrupt("return", _this4.init());

                          case 17:
                            throw console.error("Api do not return response !!!");

                          case 18:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  })));

                case 13:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        })));
      };

      for (var i = 0; i < editBtn.length; i++) {
        _loop2(i);
      }
    }
  }]);

  return Category;
}(_pagination__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Category);

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
      var response;

      if (DOM) {
        var getCheckedValues = function getCheckedValues() {
          return Array.from(document.querySelectorAll('input[type="checkbox"]')).filter(function (checkbox) {
            return checkbox.checked;
          }).map(function (checkbox) {
            return checkbox.value;
          });
        };

        var id = document.querySelector('.newsBtnSend').id;
        var image = document.getElementById('image');
        var imageDiv = document.querySelector('.imageDiv');
        var imgBlock = document.querySelector('.galleryContainer');
        var save = document.querySelector('.newsBtnSend');
        var title = document.querySelector('.postTitle');
        var content = document.querySelectorAll("[contenteditable]");
        var getImage = document.querySelector('.getImage');
        var altText = document.getElementById('alt');
        var pavTtitle = document.getElementById('pavTtitle');
        var newsCat = document.querySelector('.newsCat');
        var catUp = document.querySelector('.catUp');
        var catDown = document.querySelector('.catDown');
        var api = "news-update";
        var readImage = new _profile_image__WEBPACK_IMPORTED_MODULE_1__["default"]();

        var read = function read() {
          image.remove();
          imgBlock.classList.remove("hiden");
        };

        catDown.addEventListener("click", function () {
          newsCat.classList.remove("hiden");
          catUp.classList.remove("hiden");
          catDown.classList.add("hiden");
        });
        catUp.addEventListener("click", function () {
          newsCat.classList.add("hiden");
          catUp.classList.add("hiden");
          catDown.classList.remove("hiden");
        });

        var data = function data() {
          var obj = {
            api: api,
            title: title.value,
            content: content[0].innerHTML,
            imageTitle: pavTtitle.value,
            altText: altText.value,
            id: id,
            category: getCheckedValues()
          };
          response = readImage.sendImageData(obj);
        };

        if (getImage) {
          imageDiv.addEventListener("click", read);
          save.addEventListener("click", data);
          readImage.image();
        } else {
          imgBlock.classList.remove("hiden");
          readImage.image();
          save.addEventListener("click", data);
        }
      }

      if (response) {
        window.location.reload();
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



var path = WPURLS.apiUrl;
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
  axios.get(path + "idea-render-admin", {}).then(function (response) {
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
/* harmony import */ var _menu_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./menu.js */ "./resources/js/menu.js");
/* harmony import */ var _page_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./page.js */ "./resources/js/page.js");
/* harmony import */ var _calendar_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./calendar.js */ "./resources/js/calendar.js");
/* harmony import */ var _news__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./news */ "./resources/js/news.js");
/* harmony import */ var _profile_image__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./profile_image */ "./resources/js/profile_image.js");
/* harmony import */ var _newsList__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./newsList */ "./resources/js/newsList.js");
/* harmony import */ var _editPost__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./editPost */ "./resources/js/editPost.js");
/* harmony import */ var _albumEdit_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./albumEdit.js */ "./resources/js/albumEdit.js");
/* harmony import */ var _albumList__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./albumList */ "./resources/js/albumList.js");
/* harmony import */ var _pagination__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./pagination */ "./resources/js/pagination.js");
/** @format */
















new _calendar_js__WEBPACK_IMPORTED_MODULE_5__["default"]('.calendar');
new _news__WEBPACK_IMPORTED_MODULE_6__["default"]('startNewsAdmin');
new _newsList__WEBPACK_IMPORTED_MODULE_8__["default"]('startNweaList');
new _editPost__WEBPACK_IMPORTED_MODULE_9__["default"]('.editStart');
new _tag_js__WEBPACK_IMPORTED_MODULE_2__["default"]('tagStart');
new _category_js__WEBPACK_IMPORTED_MODULE_1__["default"]('catStart');
new _menu_js__WEBPACK_IMPORTED_MODULE_3__["default"]('.adminMenuStart');
new _albumList__WEBPACK_IMPORTED_MODULE_11__["default"]('startAlbumLis');
new _albumEdit_js__WEBPACK_IMPORTED_MODULE_10__["default"]('.containerAlbumEdit');
new _page_js__WEBPACK_IMPORTED_MODULE_4__["default"]('pageStart');

/***/ }),

/***/ "./resources/js/menu.js":
/*!******************************!*\
  !*** ./resources/js/menu.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api */ "./resources/js/api.js");




function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Menu = /*#__PURE__*/function () {
  function Menu(target) {
    _classCallCheck(this, Menu);

    this.target = target;
    this.parent;
    this.child;
    this.parentString;
    this.currentElemet;
    this.axios = new _api__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.init();
  }

  _createClass(Menu, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var DOM, menuDB, api, HTML, a, b;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                DOM = document.querySelector(this.target);

                if (!DOM) {
                  _context.next = 22;
                  break;
                }

                menuDB = document.getElementById('menuStart2');

                if (menuDB) {
                  _context.next = 17;
                  break;
                }

                api = "menu_create";
                _context.next = 7;
                return this.axios.getDAta(api);

              case 7:
                HTML = _context.sent;
                DOM.innerHTML = HTML;
                a = document.querySelector('.parent');
                this.parent = document.createRange().createContextualFragment(a.outerHTML).querySelector(".parent");
                b = document.createRange().createContextualFragment(a.outerHTML).querySelector(".parent");
                b.classList.remove("parent");
                b.classList.add("submenu");
                b.childNodes[7].remove();
                this.child = b;
                this.currentElemet = document.createRange().createContextualFragment(a.outerHTML).querySelector(".addSubmenu");

              case 17:
                this.cloning();
                this.drag();
                this["delete"]();
                this.store();
                this.addAction();

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "addAction",
    value: function addAction() {
      var _this = this;

      var sub = document.querySelectorAll(".addSubmenu");

      var _loop = function _loop(i) {
        sub[i].addEventListener("click", function () {
          var el = sub[i].parentNode;

          _this.createNewElemet(el);
        });
      };

      for (var i = 0; i < sub.length; i++) {
        _loop(i);
      }
    }
  }, {
    key: "drag",
    value: function drag() {
      var _this2 = this;

      var draggables = document.querySelectorAll('.draggable');
      var container = document.querySelector('.cont');
      var controlRect = container.getBoundingClientRect().left;
      var start;
      var position;
      var rect;
      var element;
      var addPlusButton;
      var addSub = false;
      draggables.forEach(function (draggable) {
        draggable.addEventListener('dragstart', function (e) {
          draggable.classList.add('dragging');
          rect = draggable.getBoundingClientRect();
          start = e.clientX - rect.left;

          var dargEl = _toConsumableArray(draggable.childNodes);

          addSub = dargEl.find(function (n) {
            return n.classList == "addSubmenu";
          });
        });
        draggable.addEventListener('dragend', function () {
          draggable.classList.remove('dragging');

          if (controlRect + 80 <= rect.left + position && addSub) {
            draggable.classList.remove("parent");
            draggable.classList.add("submenu");

            for (var j = 0; j < draggable.childNodes.length; j++) {
              if (draggable.childNodes[j].classList == "addSubmenu") {
                if (element) {
                  element.removeEventListener("click", addPlusButton);
                }

                draggable.childNodes[j].remove();
              }
            }
          } else if (controlRect + 80 >= rect.left + position) {
            draggable.classList.remove("submenu");
            draggable.classList.add("parent");

            for (var i = 0; i < draggable.childNodes.length; i++) {
              if (draggable.childNodes[i].classList == "menuLinkAdd" && draggable.childNodes.length == 12) {
                var clon = _this2.currentElemet.cloneNode(true);

                draggable.childNodes[i].insertAdjacentElement('afterend', clon);
                element = draggable.childNodes[6];

                addPlusButton = function addPlusButton() {
                  _this2.createNewElemet(draggable);
                };

                element.addEventListener("click", addPlusButton);
              }
            }
          }
        });
      });
      container.addEventListener('dragover', function (e) {
        e.preventDefault();
        var afterElement = getDragAfterElement(container, e.clientY);
        var draggable = document.querySelector('.dragging');
        position = e.clientX - controlRect - start;

        if (afterElement == null) {
          container.appendChild(draggable);
        } else {
          container.insertBefore(draggable, afterElement);
        }
      });

      function getDragAfterElement(container, y) {
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
      }
    }
  }, {
    key: "cloning",
    value: function cloning() {
      var _this3 = this;

      var element = this.parent;

      if (element) {
        var addParent = document.querySelector(".addNew");
        var container = document.querySelector(".cont");

        var parent = function parent() {
          var clon = element.cloneNode(true);
          var myObj = new Object();
          myObj.html = clon;

          var el = _toConsumableArray(myObj.html.children);

          var addSub = el.find(function (n) {
            return n.classList == "addSubmenu";
          });
          myObj.html.children[3].addEventListener("click", function () {
            if (addSub) {
              var curentEl = myObj.html;

              _this3.createNewElemet(curentEl);
            }
          });
          container.insertAdjacentElement('beforeend', clon);

          _this3["delete"]();

          _this3.drag();
        };

        addParent.addEventListener("click", parent);
      }
    }
  }, {
    key: "createNewElemet",
    value: function createNewElemet(el) {
      var subCat = this.child;
      var clon = subCat.cloneNode(true);
      el.insertAdjacentElement('afterend', clon);
      this.drag();
      this["delete"]();
    }
  }, {
    key: "getID",
    value: function getID() {
      return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    }
  }, {
    key: "delete",
    value: function _delete() {
      var _this4 = this;

      var id;
      var remove = document.querySelectorAll(".manuDelete");

      var _loop2 = function _loop2(i) {
        id = _this4.getID();
        remove[i].setAttribute("id", id);
        var removeDiv = document.getElementById(id);
        removeDiv.addEventListener("click", function () {
          var currentDiv = remove[i].parentNode;
          currentDiv.remove();
        });
      };

      for (var i = 0; i < remove.length; i++) {
        _loop2(i);
      }
    }
  }, {
    key: "store",
    value: function store() {
      var _this5 = this;

      var save = document.querySelector(".save");
      var obj;
      save.addEventListener("click", function () {
        var menuid = document.querySelector(".main").id;
        var api = "menu_store";
        var elements = document.querySelectorAll(".draggable");
        var parent = document.querySelectorAll(".parent");
        var child = document.querySelectorAll(".submenu");
        var select = document.querySelectorAll(".mainSelect");
        var text = document.querySelectorAll(".menuText");
        var link = document.querySelectorAll(".menuLink");

        if (!elements || elements[0].className != "draggable parent") {
          alert("Neteisingai suformuotas meniu");
        } else {
          var opts = _toConsumableArray(select).map(function (el) {
            return el.options;
          });

          var a = [],
              b = [],
              c = [],
              d = [],
              e = [];
          parent.forEach(function (element) {
            return element.setAttribute("data", true);
          });
          child.forEach(function (element) {
            return element.setAttribute("data", false);
          });
          var menuCreate = true;

          for (var i = 0; i < opts.length; i++) {
            if (text[i].value) {
              a.push(opts[i][opts[i].selectedIndex].text);
              b.push(text[i].value);
              c.push(link[i].value);
              d.push(elements[i].getAttribute('data'));
              e.push(opts[i][opts[i].selectedIndex].id);
              obj = {
                id: menuid,
                api: api,
                all: d,
                select: a,
                text: b,
                textLink: e,
                link: c
              };
            } else {
              alert("Neįvestas meniu punkto pavadinimas");
              menuCreate = false;
            }
          }

          _this5.axios.formDataApi(obj); // if( menuCreate == true){
          //   console.log(obj);
          //   this.axios.formDataApi(obj);
          //   setTimeout(location.reload(), 300);
          // }

        }
      });
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
        var getCheckedValues = function getCheckedValues() {
          return Array.from(document.querySelectorAll('input[type="checkbox"]')).filter(function (checkbox) {
            return checkbox.checked;
          }).map(function (checkbox) {
            return checkbox.value;
          });
        };

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
        var catDown = document.querySelector(".catDown");
        var catUp = document.querySelector(".catUp");
        var tag = document.getElementById("newsTagInput");
        var newsCat = document.querySelector(".newsCat");
        console.log(newsCat);
        catDown.addEventListener("click", function () {
          catUp.classList.remove("hiden");
          catDown.classList.add("hiden");
          newsCat.classList.remove("hiden");
        });
        catUp.addEventListener("click", function () {
          catUp.classList.add("hiden");
          catDown.classList.remove("hiden");
          newsCat.classList.add("hiden");
        });
        var response;
        button.addEventListener("click", function () {
          var obj = {
            title: newsPostTitle.value,
            tag: tag.value,
            api: 'news-store',
            content: editables[0].innerHTML,
            category: getCheckedValues(),
            alt: altText.value,
            imageTitle: newsImageTitle.value
          };

          if (obj.title) {
            response = readImage.sendImageData(obj);

            if (response) {
              window.location.reload();
            }
          } else {
            alert("Neįvestas pavadinimas!!!");
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
      var _init = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        var _this = this;

        var DOM;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                DOM = document.getElementById(this.target);

                if (!DOM) {
                  _context3.next = 3;
                  break;
                }

                return _context3.delegateYield( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
                  var deleteApi, listApi, HTML, deleteNews, response, _loop, i;

                  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          deleteApi = 'news-destroy&id=';
                          listApi = "news-list";
                          _context2.next = 4;
                          return _this.api.getDAta(listApi);

                        case 4:
                          HTML = _context2.sent;
                          DOM.innerHTML = HTML;
                          deleteNews = document.querySelectorAll(".deleteNews");

                          _loop = function _loop(i) {
                            var deleteId = deleteNews[i].id;
                            deleteNews[i].addEventListener("click", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
                              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
                                while (1) {
                                  switch (_context.prev = _context.next) {
                                    case 0:
                                      _context.next = 2;
                                      return _this.api["delete"](deleteApi, deleteId);

                                    case 2:
                                      response = _context.sent;

                                      if (response) {
                                        window.location.reload();
                                      }

                                    case 4:
                                    case "end":
                                      return _context.stop();
                                  }
                                }
                              }, _callee);
                            })));
                          };

                          for (i = 0; i < deleteNews.length; i++) {
                            _loop(i);
                          }

                        case 9:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                })(), "t0", 3);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
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
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _pagination__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pagination */ "./resources/js/pagination.js");




function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var Page = /*#__PURE__*/function (_Pagination) {
  _inherits(Page, _Pagination);

  var _super = _createSuper(Page);

  function Page(target) {
    var _this;

    _classCallCheck(this, Page);

    _this = _super.call(this);
    _this.api = "page_create";
    _this.target = target;
    _this.pages = 5;
    _this.changes;
    _this.watch = document.querySelector(".pageCreateList");

    _this.init();

    return _this;
  }

  _createClass(Page, [{
    key: "init",
    value: function init() {
      var DOM = document.getElementById(this.target);

      if (DOM) {
        var hash = location.hash.split('#')[1];

        if (hash) {
          this.hashChange(hash);
        } else {
          this.hashChange();
        }

        this.paging();
      }
    }
  }, {
    key: "addAction",
    value: function addAction() {
      this["delete"]();
      this.create();
      this.edit();
    }
  }, {
    key: "create",
    value: function create() {
      var _this2 = this;

      var title = document.getElementById("page_title");
      var api = "page_store";
      var submit = document.getElementById("create");
      submit.addEventListener("click", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var post, select, stateArray, checkboxes, i, obj, response, changes;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                post = document.getElementById('post');
                select = post.options[post.selectedIndex];
                stateArray = [];
                checkboxes = document.querySelectorAll('input[type=checkbox]:checked');

                for (i = 0; i < checkboxes.length; i++) {
                  stateArray.push(checkboxes[i].value);
                }

                obj = {
                  api: api,
                  page_title: title.value,
                  post_type: select.value,
                  page_state: stateArray
                };
                _context.next = 8;
                return _this2.axios.getResponseData(obj);

              case 8:
                response = _context.sent;
                changes = _this2.changes;
                window.removeEventListener('hashchange', changes);
                title.value = "";

                if (!response) {
                  _context.next = 16;
                  break;
                }

                return _context.abrupt("return", _this2.init());

              case 16:
                throw console.error("Api do not return response !!!");

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));
    }
  }, {
    key: "delete",
    value: function _delete() {
      var _this3 = this;

      var deleteApi = "page_destroy&id=";
      var deleteBtn = document.querySelectorAll(".page-delete");

      if (deleteBtn) {
        var _loop = function _loop(i) {
          var deleteId = deleteBtn[i].value;
          deleteBtn[i].addEventListener("click", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
            var response, changes;
            return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return _this3.axios["delete"](deleteApi, deleteId);

                  case 2:
                    response = _context2.sent;
                    changes = _this3.changes;
                    window.removeEventListener('hashchange', changes);

                    if (!response) {
                      _context2.next = 9;
                      break;
                    }

                    return _context2.abrupt("return", _this3.init());

                  case 9:
                    throw console.error("Api do not return response !!!");

                  case 10:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          })));
        };

        for (var i = 0; i < deleteBtn.length; i++) {
          _loop(i);
        }
      }
    }
  }, {
    key: "edit",
    value: function edit() {
      var _this4 = this;

      var editBtn = document.querySelectorAll(".page-edit");

      var _loop2 = function _loop2(i) {
        var ID = editBtn[i].value;
        editBtn[i].addEventListener("click", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4() {
          var api, obj, HTML, editInsert, close, title, name, updateBtn;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  api = "page_edit&id=";
                  obj = {
                    api: api + ID,
                    editID: ID
                  };
                  _context4.next = 4;
                  return _this4.axios.getPostData(obj);

                case 4:
                  HTML = _context4.sent;
                  editInsert = document.querySelector('.pageEdit');
                  editInsert.innerHTML = HTML;
                  editInsert.style.display = 'inline-block';
                  close = document.querySelector('.close');
                  close.addEventListener('click', function () {
                    return editInsert.style.display = 'none';
                  });
                  title = document.getElementById("page_title_edit");
                  name = document.getElementById("page_name_edit");
                  updateBtn = document.getElementById("pageUpdate");
                  updateBtn.addEventListener("click", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
                    var stateArray, checkboxes, _i, post, select, api, obj, response, changes;

                    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            stateArray = [];
                            checkboxes = document.querySelectorAll('input[type=checkbox]:checked');

                            for (_i = 0; _i < checkboxes.length; _i++) {
                              stateArray.push(checkboxes[_i].value);
                            }

                            post = document.getElementById('post_edit');
                            select = post.options[post.selectedIndex];
                            console.log(select);
                            api = "page_update&id=";
                            obj = {
                              api: api + ID,
                              page_title: title.value,
                              page_name: name.value,
                              post_type: select.value,
                              page_state: stateArray
                            };
                            _context3.next = 10;
                            return _this4.axios.getResponseData(obj);

                          case 10:
                            response = _context3.sent;
                            changes = _this4.changes;
                            window.removeEventListener('hashchange', changes);
                            close.removeEventListener('click', function () {
                              return editInsert.style.display = 'none';
                            });
                            editInsert.style.display = 'none';
                            name.value = "";

                            if (!response) {
                              _context3.next = 20;
                              break;
                            }

                            return _context3.abrupt("return", _this4.init());

                          case 20:
                            throw console.error("Api do not return response !!!");

                          case 21:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  })));

                case 14:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }))); // });
      };

      for (var i = 0; i < editBtn.length; i++) {
        _loop2(i);
      }
    }
  }]);

  return Page;
}(_pagination__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Page);

/***/ }),

/***/ "./resources/js/pagination.js":
/*!************************************!*\
  !*** ./resources/js/pagination.js ***!
  \************************************/
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

// extend this class and implement   addAction();


var Pagination = /*#__PURE__*/function () {
  function Pagination() {
    _classCallCheck(this, Pagination);

    this.axios = new _api__WEBPACK_IMPORTED_MODULE_1__["default"]();
  }

  _createClass(Pagination, [{
    key: "paging",
    value: function paging() {
      var page = document.querySelectorAll(".paging");

      if (page.length) {
        var _loop = function _loop(i) {
          var nextPage = function nextPage() {
            page[i].addEventListener('click', nextPage);
            var id = parseInt(page[i].id);
            location.hash = id;
            page[i].removeEventListener("click", nextPage);
          };

          page[i].addEventListener('click', nextPage);
        };

        for (var i = 0; i < page.length; i++) {
          _loop(i);
        }
      }
    }
  }, {
    key: "hashChange",
    value: function () {
      var _hashChange = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var _this = this;

        var hash,
            HTML,
            page,
            _hash,
            pages,
            obj,
            _pages,
            _obj,
            _hash2,
            _obj2,
            _page,
            addColor,
            changes,
            option,
            selected,
            _args2 = arguments;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                hash = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : null;
                HTML = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : null;

                if (!(HTML && hash)) {
                  _context2.next = 10;
                  break;
                }

                console.log(11111);
                this.watch.innerHTML = HTML;
                page = document.querySelectorAll(".paging");
                _hash = location.hash.split('#')[1];

                if (_hash > page.length - 4) {
                  _hash = 1;
                  location.hash = _hash;
                }

                _context2.next = 38;
                break;

              case 10:
                if (!(hash && HTML == null)) {
                  _context2.next = 19;
                  break;
                }

                console.log(2222222);
                pages = this.pages;
                obj = {
                  api: this.api,
                  pageSelected: pages,
                  hash: hash
                };
                _context2.next = 16;
                return this.axios.getPostData(obj);

              case 16:
                this.watch.innerHTML = _context2.sent;
                _context2.next = 38;
                break;

              case 19:
                if (!(hash == undefined || hash == null || hash < 0 || hash == "" || hash == NaN || hash == Infinity)) {
                  _context2.next = 30;
                  break;
                }

                console.log(33333);
                hash = 1;
                location.hash = hash;
                _pages = this.pages;
                _obj = {
                  api: this.api,
                  pageSelected: _pages,
                  hash: hash
                };
                _context2.next = 27;
                return this.axios.getPostData(_obj);

              case 27:
                this.watch.innerHTML = _context2.sent;
                _context2.next = 38;
                break;

              case 30:
                _hash2 = location.hash.split('#')[1];
                location.hash = _hash2;
                _obj2 = {
                  api: this.api,
                  pageSelected: this.pages,
                  hash: _hash2
                };
                _context2.next = 35;
                return this.axios.getPostData(_obj2);

              case 35:
                this.watch.innerHTML = _context2.sent;
                _page = document.querySelectorAll(".paging");

                if (_hash2 > _page.length - 4) {
                  _hash2 = 1;
                  location.hash = _hash2;
                }

              case 38:
                this.paging();
                HTML = "";
                addColor = document.querySelector('.nr-' + location.hash.split('#')[1]);

                if (addColor) {
                  addColor.classList.add("active");
                }

                changes = /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
                    var _pages2, _obj3;

                    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            hash = location.hash.split('#')[1];

                            if (!(hash != undefined && hash != null && hash > 0 && hash != "" && hash != NaN && hash != Infinity)) {
                              _context.next = 9;
                              break;
                            }

                            _pages2 = _this.pages;
                            _obj3 = {
                              api: _this.api,
                              pageSelected: _pages2,
                              hash: hash
                            };
                            _context.next = 6;
                            return _this.axios.getPostData(_obj3);

                          case 6:
                            HTML = _context.sent;
                            window.removeEventListener('hashchange', changes);

                            _this.hashChange(hash, HTML);

                          case 9:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function changes() {
                    return _ref.apply(this, arguments);
                  };
                }();

                window.addEventListener('hashchange', changes);
                this.changes = changes;
                option = document.getElementById("items");
                option.value = this.pages;

                selected = function selected() {
                  _this.pages = option.value;
                  location.hash = 1;
                  window.removeEventListener('hashchange', changes);
                  changes();
                  option.removeEventListener('change', selected);
                };

                option.addEventListener('change', selected); // child class implements button listeners or etc html functions 

                this.addAction();

              case 50:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function hashChange() {
        return _hashChange.apply(this, arguments);
      }

      return hashChange;
    }()
  }]);

  return Pagination;
}();

/* harmony default export */ __webpack_exports__["default"] = (Pagination);

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
        filesInput.addEventListener("change", function () {
          var file = filesInput.files[0];
          var currentDiv = document.getElementById("message");

          if (file.size <= 1048576 && file.length != 0 && file != undefined && file != null) {
            if (file.type.match('image')) {
              var picReader = new FileReader();
              picReader.addEventListener("load", function (event) {
                var picFile = event.target;
                var output = document.getElementById("result");
                var div = document.createElement("div");
                div.className = "galleryDiv";
                var removeUploade = document.querySelector(".wrapper");
                removeUploade.style.display = "none";
                div.innerHTML = "<img class=\"uploadeImageGallery\" src=\"".concat(picFile.result, "\" alt=\" \"/>");
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
      return sendData.getResponseData(obj);
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
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _pagination__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pagination */ "./resources/js/pagination.js");
/** @format */




function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var Tag = /*#__PURE__*/function (_Pagination) {
  _inherits(Tag, _Pagination);

  var _super = _createSuper(Tag);

  function Tag(target) {
    var _this;

    _classCallCheck(this, Tag);

    _this = _super.call(this);
    _this.api = 'tag_create';
    _this.pages = 5;
    _this.target = target;
    _this.changes;
    _this.watch = document.querySelector(".tagCreateList");

    _this.init();

    return _this;
  }

  _createClass(Tag, [{
    key: "init",
    value: function init() {
      var DOM = document.getElementById(this.target);

      if (DOM) {
        var hash = location.hash.split('#')[1];

        if (hash) {
          this.hashChange(hash);
        } else {
          this.hashChange();
        }

        this.paging();
      }
    }
  }, {
    key: "addAction",
    value: function addAction() {
      this.create();
      this["delete"]();
      this.edit();
    }
  }, {
    key: "create",
    value: function create() {
      var _this2 = this;

      var name = document.getElementById("tag-name");
      var slug = document.getElementById("tag-slug");
      var description = document.getElementById("tag-description");
      var storeTag = document.getElementById("create");
      storeTag.addEventListener("click", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var obj, response, changes;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                obj = {
                  api: 'tag_store',
                  tag_name: name.value,
                  tag_slug: slug.value,
                  tag_description: description.value
                };
                _context.next = 3;
                return _this2.axios.getResponseData(obj);

              case 3:
                response = _context.sent;
                changes = _this2.changes;
                window.removeEventListener('hashchange', changes);
                name.value = "";
                slug.value = "";
                description.value = "";

                if (!response) {
                  _context.next = 13;
                  break;
                }

                return _context.abrupt("return", _this2.init());

              case 13:
                throw console.error("Api do not return response !!!");

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));
    }
  }, {
    key: "delete",
    value: function _delete() {
      var _this3 = this;

      var api = "tag_destroy";
      var deleteBtn = document.querySelectorAll(".tag-delete");

      if (deleteBtn) {
        var _loop = function _loop(i) {
          var ID = deleteBtn[i].value;
          var taxonomy = deleteBtn[i].id;
          deleteBtn[i].addEventListener("click", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
            var obj, response, changes;
            return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    obj = {
                      api: api,
                      deleteID: ID,
                      taxonomy_type: taxonomy
                    };
                    _context2.next = 3;
                    return _this3.axios.getResponseData(obj);

                  case 3:
                    response = _context2.sent;
                    changes = _this3.changes;
                    window.removeEventListener('hashchange', changes);

                    if (!response) {
                      _context2.next = 10;
                      break;
                    }

                    return _context2.abrupt("return", _this3.init());

                  case 10:
                    throw console.error("Api do not return response !!!");

                  case 11:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          })));
        };

        for (var i = 0; i < deleteBtn.length; i++) {
          _loop(i);
        }
      }
    }
  }, {
    key: "edit",
    value: function edit() {
      var _this4 = this;

      var editBtn = document.querySelectorAll(".tag-edit");

      var _loop2 = function _loop2(i) {
        var ID = editBtn[i].value;
        var taxonomy = editBtn[i].id;
        editBtn[i].addEventListener("click", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4() {
          var api, obj, response, HTML, editInsert, close, name, slug, description, updateBtn;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  api = "tag_edit";
                  obj = {
                    api: api,
                    editID: ID,
                    taxonomy_type: taxonomy
                  };
                  _context4.next = 4;
                  return _this4.axios.getPostData(obj);

                case 4:
                  HTML = _context4.sent;
                  editInsert = document.querySelector('.tagEdit');
                  editInsert.innerHTML = HTML;
                  editInsert.style.display = 'inline-block';
                  close = document.querySelector('.close');
                  close.addEventListener('click', function () {
                    return editInsert.style.display = 'none';
                  });
                  name = document.getElementById("tag_name");
                  slug = document.getElementById("tag_slug");
                  description = document.getElementById("tag_description");
                  updateBtn = document.getElementById("tagUpdate");
                  updateBtn.addEventListener("click", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
                    var api, obj, response, changes;
                    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            api = "tag_update";
                            obj = {
                              api: api,
                              updateId: updateBtn.value,
                              tag_name: name.value,
                              tag_slug: slug.value,
                              tag_description: description.value
                            };
                            _context3.next = 4;
                            return _this4.axios.getResponseData(obj);

                          case 4:
                            response = _context3.sent;
                            changes = _this4.changes;
                            window.removeEventListener('hashchange', changes);
                            description.value = "";
                            slug.value = "";
                            name.value = "";
                            close.removeEventListener('click', function () {
                              return editInsert.style.display = 'none';
                            });
                            editInsert.style.display = 'none';

                            if (!response) {
                              _context3.next = 16;
                              break;
                            }

                            return _context3.abrupt("return", _this4.init());

                          case 16:
                            throw console.error("Api do not return response !!!");

                          case 17:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  })));

                case 15:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        })));
      };

      for (var i = 0; i < editBtn.length; i++) {
        _loop2(i);
      }
    }
  }]);

  return Tag;
}(_pagination__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Tag);

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

__webpack_require__(/*! /Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/resources/js/main.js */"./resources/js/main.js");
module.exports = __webpack_require__(/*! /Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/resources/sass/app.scss */"./resources/sass/app.scss");


/***/ })

/******/ });