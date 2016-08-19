(function() {
this.Library = this.Library || {};
this.LibraryNamed = this.LibraryNamed || {};
var babelHelpers = {};
babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers.slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

babelHelpers;
'use strict';

/**
 * A collection of core utility functions.
 * @const
 */

(function () {
	var core = function () {
		function core() {
			babelHelpers.classCallCheck(this, core);
		}

		/**
   * When defining a class Foo with an abstract method bar(), you can do:
   * Foo.prototype.bar = core.abstractMethod
   *
   * Now if a subclass of Foo fails to override bar(), an error will be thrown
   * when bar() is invoked.
   *
   * @type {!Function}
   * @throws {Error} when invoked to indicate the method should be overridden.
   */
		core.abstractMethod = function abstractMethod() {
			throw Error('Unimplemented abstract method');
		};

		/**
   * Loops constructor super classes collecting its properties values. If
   * property is not available on the super class `undefined` will be
   * collected as value for the class hierarchy position.
   * @param {!function()} constructor Class constructor.
   * @param {string} propertyName Property name to be collected.
   * @return {Array.<*>} Array of collected values.
   * TODO(*): Rethink superclass loop.
   */


		core.collectSuperClassesProperty = function collectSuperClassesProperty(constructor, propertyName) {
			var propertyValues = [constructor[propertyName]];
			while (constructor.__proto__ && !constructor.__proto__.isPrototypeOf(Function)) {
				constructor = constructor.__proto__;
				propertyValues.push(constructor[propertyName]);
			}
			return propertyValues;
		};

		/**
   * Gets the name of the given function. If the current browser doesn't
   * support the `name` property, this will calculate it from the function's
   * content string.
   * @param {!function()} fn
   * @return {string}
   */


		core.getFunctionName = function getFunctionName(fn) {
			if (!fn.name) {
				var str = fn.toString();
				fn.name = str.substring(9, str.indexOf('('));
			}
			return fn.name;
		};

		/**
   * Gets an unique id. If `opt_object` argument is passed, the object is
   * mutated with an unique id. Consecutive calls with the same object
   * reference won't mutate the object again, instead the current object uid
   * returns. See {@link core.UID_PROPERTY}.
   * @param {Object=} opt_object Optional object to be mutated with the uid. If
   *     not specified this method only returns the uid.
   * @param {boolean=} opt_noInheritance Optional flag indicating if this
   *     object's uid property can be inherited from parents or not.
   * @throws {Error} when invoked to indicate the method should be overridden.
   */


		core.getUid = function getUid(opt_object, opt_noInheritance) {
			if (opt_object) {
				var id = opt_object[core.UID_PROPERTY];
				if (opt_noInheritance && !opt_object.hasOwnProperty(core.UID_PROPERTY)) {
					id = null;
				}
				return id || (opt_object[core.UID_PROPERTY] = core.uniqueIdCounter_++);
			}
			return core.uniqueIdCounter_++;
		};

		/**
   * The identity function. Returns its first argument.
   * @param {*=} opt_returnValue The single value that will be returned.
   * @return {?} The first argument.
   */


		core.identityFunction = function identityFunction(opt_returnValue) {
			return opt_returnValue;
		};

		/**
   * Returns true if the specified value is a boolean.
   * @param {?} val Variable to test.
   * @return {boolean} Whether variable is boolean.
   */


		core.isBoolean = function isBoolean(val) {
			return typeof val === 'boolean';
		};

		/**
   * Returns true if the specified value is not undefined.
   * @param {?} val Variable to test.
   * @return {boolean} Whether variable is defined.
   */


		core.isDef = function isDef(val) {
			return val !== undefined;
		};

		/**
   * Returns true if value is not undefined or null.
   * @param {*} val
   * @return {Boolean}
   */


		core.isDefAndNotNull = function isDefAndNotNull(val) {
			return core.isDef(val) && !core.isNull(val);
		};

		/**
   * Returns true if value is a document.
   * @param {*} val
   * @return {Boolean}
   */


		core.isDocument = function isDocument(val) {
			return val && (typeof val === 'undefined' ? 'undefined' : babelHelpers.typeof(val)) === 'object' && val.nodeType === 9;
		};

		/**
   * Returns true if value is a dom element.
   * @param {*} val
   * @return {Boolean}
   */


		core.isElement = function isElement(val) {
			return val && (typeof val === 'undefined' ? 'undefined' : babelHelpers.typeof(val)) === 'object' && val.nodeType === 1;
		};

		/**
   * Returns true if the specified value is a function.
   * @param {?} val Variable to test.
   * @return {boolean} Whether variable is a function.
   */


		core.isFunction = function isFunction(val) {
			return typeof val === 'function';
		};

		/**
   * Returns true if value is null.
   * @param {*} val
   * @return {Boolean}
   */


		core.isNull = function isNull(val) {
			return val === null;
		};

		/**
   * Returns true if the specified value is a number.
   * @param {?} val Variable to test.
   * @return {boolean} Whether variable is a number.
   */


		core.isNumber = function isNumber(val) {
			return typeof val === 'number';
		};

		/**
   * Returns true if value is a window.
   * @param {*} val
   * @return {Boolean}
   */


		core.isWindow = function isWindow(val) {
			return val !== null && val === val.window;
		};

		/**
   * Returns true if the specified value is an object. This includes arrays
   * and functions.
   * @param {?} val Variable to test.
   * @return {boolean} Whether variable is an object.
   */


		core.isObject = function isObject(val) {
			var type = typeof val === 'undefined' ? 'undefined' : babelHelpers.typeof(val);
			return type === 'object' && val !== null || type === 'function';
		};

		/**
   * Returns true if value is a Promise.
   * @param {*} val
   * @return {Boolean}
   */


		core.isPromise = function isPromise(val) {
			return val && (typeof val === 'undefined' ? 'undefined' : babelHelpers.typeof(val)) === 'object' && typeof val.then === 'function';
		};

		/**
   * Returns true if value is a string.
   * @param {*} val
   * @return {Boolean}
   */


		core.isString = function isString(val) {
			return typeof val === 'string';
		};

		/**
   * Merges the values of a static property a class with the values of that
   * property for all its super classes, and stores it as a new static
   * property of that class. If the static property already existed, it won't
   * be recalculated.
   * @param {!function()} constructor Class constructor.
   * @param {string} propertyName Property name to be collected.
   * @param {function(*, *):*=} opt_mergeFn Function that receives an array filled
   *   with the values of the property for the current class and all its super classes.
   *   Should return the merged value to be stored on the current class.
   * @return {boolean} Returns true if merge happens, false otherwise.
   */


		core.mergeSuperClassesProperty = function mergeSuperClassesProperty(constructor, propertyName, opt_mergeFn) {
			var mergedName = propertyName + '_MERGED';
			if (constructor.hasOwnProperty(mergedName)) {
				return false;
			}

			var merged = core.collectSuperClassesProperty(constructor, propertyName);
			if (opt_mergeFn) {
				merged = opt_mergeFn(merged);
			}
			constructor[mergedName] = merged;
			return true;
		};

		/**
   * Null function used for default values of callbacks, etc.
   * @return {void} Nothing.
   */


		core.nullFunction = function nullFunction() {};

		return core;
	}();

	/**
  * Unique id property prefix.
  * @type {String}
  * @protected
  */


	core.UID_PROPERTY = 'core_' + (Math.random() * 1e9 >>> 0);

	/**
  * Counter for unique id.
  * @type {Number}
  * @private
  */
	core.uniqueIdCounter_ = 1;

	this.Library.core = core;
}).call(this);
'use strict';

(function () {
	var core = this.Library.core;

	var array = function () {
		function array() {
			babelHelpers.classCallCheck(this, array);
		}

		/**
   * Checks if the given arrays have the same content.
   * @param {!Array<*>} arr1
   * @param {!Array<*>} arr2
   * @return {boolean}
   */
		array.equal = function equal(arr1, arr2) {
			if (arr1.length !== arr2.length) {
				return false;
			}
			for (var i = 0; i < arr1.length; i++) {
				if (arr1[i] !== arr2[i]) {
					return false;
				}
			}
			return true;
		};

		/**
   * Returns the first value in the given array that isn't undefined.
   * @param {!Array} arr
   * @return {*}
   */


		array.firstDefinedValue = function firstDefinedValue(arr) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i] !== undefined) {
					return arr[i];
				}
			}
		};

		/**
   * Transforms the input nested array to become flat.
   * @param {Array.<*|Array.<*>>} arr Nested array to flatten.
   * @param {Array.<*>} opt_output Optional output array.
   * @return {Array.<*>} Flat array.
   */


		array.flatten = function flatten(arr, opt_output) {
			var output = opt_output || [];
			for (var i = 0; i < arr.length; i++) {
				if (Array.isArray(arr[i])) {
					array.flatten(arr[i], output);
				} else {
					output.push(arr[i]);
				}
			}
			return output;
		};

		/**
   * Removes the first occurrence of a particular value from an array.
   * @param {Array.<T>} arr Array from which to remove value.
   * @param {T} obj Object to remove.
   * @return {boolean} True if an element was removed.
   * @template T
   */


		array.remove = function remove(arr, obj) {
			var i = arr.indexOf(obj);
			var rv;
			if (rv = i >= 0) {
				array.removeAt(arr, i);
			}
			return rv;
		};

		/**
   * Removes from an array the element at index i
   * @param {Array} arr Array or array like object from which to remove value.
   * @param {number} i The index to remove.
   * @return {boolean} True if an element was removed.
   */


		array.removeAt = function removeAt(arr, i) {
			return Array.prototype.splice.call(arr, i, 1).length === 1;
		};

		/**
   * Slices the given array, just like Array.prototype.slice, but this
   * is faster and working on all array-like objects (like arguments).
   * @param {!Object} arr Array-like object to slice.
   * @param {number} start The index that should start the slice.
   * @param {number=} opt_end The index where the slice should end, not
   *   included in the final array. If not given, all elements after the
   *   start index will be included.
   * @return {!Array}
   */


		array.slice = function slice(arr, start, opt_end) {
			var sliced = [];
			var end = core.isDef(opt_end) ? opt_end : arr.length;
			for (var i = start; i < end; i++) {
				sliced.push(arr[i]);
			}
			return sliced;
		};

		return array;
	}();

	this.Library.array = array;
}).call(this);
/*!
 * Polyfill from Google's Closure Library.
 * Copyright 2013 The Closure Library Authors. All Rights Reserved.
 */

'use strict';

(function () {
	var async = {};

	/**
  * Throw an item without interrupting the current execution context.  For
  * example, if processing a group of items in a loop, sometimes it is useful
  * to report an error while still allowing the rest of the batch to be
  * processed.
  * @param {*} exception
  */
	async.throwException = function (exception) {
		// Each throw needs to be in its own context.
		async.nextTick(function () {
			throw exception;
		});
	};

	/**
  * Fires the provided callback just before the current callstack unwinds, or as
  * soon as possible after the current JS execution context.
  * @param {function(this:THIS)} callback
  * @param {THIS=} opt_context Object to use as the "this value" when calling
  *     the provided function.
  * @template THIS
  */
	async.run = function (callback, opt_context) {
		if (!async.run.workQueueScheduled_) {
			// Nothing is currently scheduled, schedule it now.
			async.nextTick(async.run.processWorkQueue);
			async.run.workQueueScheduled_ = true;
		}

		async.run.workQueue_.push(new async.run.WorkItem_(callback, opt_context));
	};

	/** @private {boolean} */
	async.run.workQueueScheduled_ = false;

	/** @private {!Array.<!async.run.WorkItem_>} */
	async.run.workQueue_ = [];

	/**
  * Run any pending async.run work items. This function is not intended
  * for general use, but for use by entry point handlers to run items ahead of
  * async.nextTick.
  */
	async.run.processWorkQueue = function () {
		// NOTE: additional work queue items may be pushed while processing.
		while (async.run.workQueue_.length) {
			// Don't let the work queue grow indefinitely.
			var workItems = async.run.workQueue_;
			async.run.workQueue_ = [];
			for (var i = 0; i < workItems.length; i++) {
				var workItem = workItems[i];
				try {
					workItem.fn.call(workItem.scope);
				} catch (e) {
					async.throwException(e);
				}
			}
		}

		// There are no more work items, reset the work queue.
		async.run.workQueueScheduled_ = false;
	};

	/**
  * @constructor
  * @final
  * @struct
  * @private
  *
  * @param {function()} fn
  * @param {Object|null|undefined} scope
  */
	async.run.WorkItem_ = function (fn, scope) {
		/** @const */
		this.fn = fn;
		/** @const */
		this.scope = scope;
	};

	/**
  * Fires the provided callbacks as soon as possible after the current JS
  * execution context. setTimeout(…, 0) always takes at least 5ms for legacy
  * reasons.
  * @param {function(this:SCOPE)} callback Callback function to fire as soon as
  *     possible.
  * @param {SCOPE=} opt_context Object in whose scope to call the listener.
  * @template SCOPE
  */
	async.nextTick = function (callback, opt_context) {
		var cb = callback;
		if (opt_context) {
			cb = callback.bind(opt_context);
		}
		cb = async.nextTick.wrapCallback_(cb);
		// Introduced and currently only supported by IE10.
		// Verify if variable is defined on the current runtime (i.e., node, browser).
		// Can't use typeof enclosed in a function (such as core.isFunction) or an
		// exception will be thrown when the function is called on an environment
		// where the variable is undefined.
		if (typeof setImmediate === 'function') {
			setImmediate(cb);
			return;
		}
		// Look for and cache the custom fallback version of setImmediate.
		if (!async.nextTick.setImmediate_) {
			async.nextTick.setImmediate_ = async.nextTick.getSetImmediateEmulator_();
		}
		async.nextTick.setImmediate_(cb);
	};

	/**
  * Cache for the setImmediate implementation.
  * @type {function(function())}
  * @private
  */
	async.nextTick.setImmediate_ = null;

	/**
  * Determines the best possible implementation to run a function as soon as
  * the JS event loop is idle.
  * @return {function(function())} The "setImmediate" implementation.
  * @private
  */
	async.nextTick.getSetImmediateEmulator_ = function () {
		// Create a private message channel and use it to postMessage empty messages
		// to ourselves.
		var Channel;

		// Verify if variable is defined on the current runtime (i.e., node, browser).
		// Can't use typeof enclosed in a function (such as core.isFunction) or an
		// exception will be thrown when the function is called on an environment
		// where the variable is undefined.
		if (typeof MessageChannel === 'function') {
			Channel = MessageChannel;
		}

		// If MessageChannel is not available and we are in a browser, implement
		// an iframe based polyfill in browsers that have postMessage and
		// document.addEventListener. The latter excludes IE8 because it has a
		// synchronous postMessage implementation.
		if (typeof Channel === 'undefined' && typeof window !== 'undefined' && window.postMessage && window.addEventListener) {
			/** @constructor */
			Channel = function Channel() {
				// Make an empty, invisible iframe.
				var iframe = document.createElement('iframe');
				iframe.style.display = 'none';
				iframe.src = '';
				document.documentElement.appendChild(iframe);
				var win = iframe.contentWindow;
				var doc = win.document;
				doc.open();
				doc.write('');
				doc.close();
				var message = 'callImmediate' + Math.random();
				var origin = win.location.protocol + '//' + win.location.host;
				var onmessage = function (e) {
					// Validate origin and message to make sure that this message was
					// intended for us.
					if (e.origin !== origin && e.data !== message) {
						return;
					}
					this.port1.onmessage();
				}.bind(this);
				win.addEventListener('message', onmessage, false);
				this.port1 = {};
				this.port2 = {
					postMessage: function postMessage() {
						win.postMessage(message, origin);
					}
				};
			};
		}
		if (typeof Channel !== 'undefined') {
			var channel = new Channel();
			// Use a fifo linked list to call callbacks in the right order.
			var head = {};
			var tail = head;
			channel.port1.onmessage = function () {
				head = head.next;
				var cb = head.cb;
				head.cb = null;
				cb();
			};
			return function (cb) {
				tail.next = {
					cb: cb
				};
				tail = tail.next;
				channel.port2.postMessage(0);
			};
		}
		// Implementation for IE6-8: Script elements fire an asynchronous
		// onreadystatechange event when inserted into the DOM.
		if (typeof document !== 'undefined' && 'onreadystatechange' in document.createElement('script')) {
			return function (cb) {
				var script = document.createElement('script');
				script.onreadystatechange = function () {
					// Clean up and call the callback.
					script.onreadystatechange = null;
					script.parentNode.removeChild(script);
					script = null;
					cb();
					cb = null;
				};
				document.documentElement.appendChild(script);
			};
		}
		// Fall back to setTimeout with 0. In browsers this creates a delay of 5ms
		// or more.
		return function (cb) {
			setTimeout(cb, 0);
		};
	};

	/**
  * Helper function that is overrided to protect callbacks with entry point
  * monitor if the application monitors entry points.
  * @param {function()} callback Callback function to fire as soon as possible.
  * @return {function()} The wrapped callback.
  * @private
  */
	async.nextTick.wrapCallback_ = function (opt_returnValue) {
		return opt_returnValue;
	};

	this.Library.async = async;
}).call(this);
'use strict';

/**
 * Disposable utility. When inherited provides the `dispose` function to its
 * subclass, which is responsible for disposing of any object references
 * when an instance won't be used anymore. Subclasses should override
 * `disposeInternal` to implement any specific disposing logic.
 * @constructor
 */

(function () {
	var Disposable = function () {
		function Disposable() {
			babelHelpers.classCallCheck(this, Disposable);

			/**
    * Flag indicating if this instance has already been disposed.
    * @type {boolean}
    * @protected
    */
			this.disposed_ = false;
		}

		/**
   * Disposes of this instance's object references. Calls `disposeInternal`.
   */


		Disposable.prototype.dispose = function dispose() {
			if (!this.disposed_) {
				this.disposeInternal();
				this.disposed_ = true;
			}
		};

		/**
   * Subclasses should override this method to implement any specific
   * disposing logic (like clearing references and calling `dispose` on other
   * disposables).
   */


		Disposable.prototype.disposeInternal = function disposeInternal() {};

		/**
   * Checks if this instance has already been disposed.
   * @return {boolean}
   */


		Disposable.prototype.isDisposed = function isDisposed() {
			return this.disposed_;
		};

		return Disposable;
	}();

	this.Library.Disposable = Disposable;
}).call(this);
'use strict';

(function () {
	var object = function () {
		function object() {
			babelHelpers.classCallCheck(this, object);
		}

		/**
   * Copies all the members of a source object to a target object.
   * @param {Object} target Target object.
   * @param {...Object} var_args The objects from which values will be copied.
   * @return {Object} Returns the target object reference.
   */
		object.mixin = function mixin(target) {
			var key, source;
			for (var i = 1; i < arguments.length; i++) {
				source = arguments[i];
				for (key in source) {
					target[key] = source[key];
				}
			}
			return target;
		};

		/**
   * Returns an object based on its fully qualified external name.
   * @param {string} name The fully qualified name.
   * @param {object=} opt_obj The object within which to look; default is
   *     <code>window</code>.
   * @return {?} The value (object or primitive) or, if not found, undefined.
   */


		object.getObjectByName = function getObjectByName(name, opt_obj) {
			var scope = opt_obj || window;
			var parts = name.split('.');
			return parts.reduce(function (part, key) {
				return part[key];
			}, scope);
		};

		/**
   * Returns a new object with the same keys as the given one, but with
   * their values set to the return values of the specified function.
   * @param {!Object} obj
   * @param {!function(string, *)} fn
   * @return {!Object}
   */


		object.map = function map(obj, fn) {
			var mappedObj = {};
			var keys = Object.keys(obj);
			for (var i = 0; i < keys.length; i++) {
				mappedObj[keys[i]] = fn(keys[i], obj[keys[i]]);
			}
			return mappedObj;
		};

		/**
   * Checks if the two given objects are equal. This is done via a shallow
   * check, including only the keys directly contained by the 2 objects.
   * @return {boolean}
   */


		object.shallowEqual = function shallowEqual(obj1, obj2) {
			if (obj1 === obj2) {
				return true;
			}

			var keys1 = Object.keys(obj1);
			var keys2 = Object.keys(obj2);
			if (keys1.length !== keys2.length) {
				return false;
			}

			for (var i = 0; i < keys1.length; i++) {
				if (obj1[keys1[i]] !== obj2[keys1[i]]) {
					return false;
				}
			}
			return true;
		};

		return object;
	}();

	this.Library.object = object;
}).call(this);
'use strict';

(function () {
	var string = function () {
		function string() {
			babelHelpers.classCallCheck(this, string);
		}

		/**
   * Removes the breaking spaces from the left and right of the string and
   * collapses the sequences of breaking spaces in the middle into single spaces.
   * The original and the result strings render the same way in HTML.
   * @param {string} str A string in which to collapse spaces.
   * @return {string} Copy of the string with normalized breaking spaces.
   */
		string.collapseBreakingSpaces = function collapseBreakingSpaces(str) {
			return str.replace(/[\t\r\n ]+/g, ' ').replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, '');
		};

		/**
  * Escapes characters in the string that are not safe to use in a RegExp.
  * @param {*} str The string to escape. If not a string, it will be casted
  *     to one.
  * @return {string} A RegExp safe, escaped copy of {@code s}.
  */


		string.escapeRegex = function escapeRegex(str) {
			return String(str).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1').replace(/\x08/g, '\\x08');
		};

		/**
  * Returns a string with at least 64-bits of randomness.
  * @return {string} A random string, e.g. sn1s7vb4gcic.
  */


		string.getRandomString = function getRandomString() {
			var x = 2147483648;
			return Math.floor(Math.random() * x).toString(36) + Math.abs(Math.floor(Math.random() * x) ^ Date.now()).toString(36);
		};

		/**
   * Calculates the hashcode for a string. The hashcode value is computed by
   * the sum algorithm: s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]. A nice
   * property of using 31 prime is that the multiplication can be replaced by
   * a shift and a subtraction for better performance: 31*i == (i<<5)-i.
   * Modern VMs do this sort of optimization automatically.
   * @param {String} val Target string.
   * @return {Number} Returns the string hashcode.
   */


		string.hashCode = function hashCode(val) {
			var hash = 0;
			for (var i = 0, len = val.length; i < len; i++) {
				hash = 31 * hash + val.charCodeAt(i);
				hash %= 0x100000000;
			}
			return hash;
		};

		/**
   * Replaces interval into the string with specified value, e.g.
   * `replaceInterval("abcde", 1, 4, "")` returns "ae".
   * @param {string} str The input string.
   * @param {Number} start Start interval position to be replaced.
   * @param {Number} end End interval position to be replaced.
   * @param {string} value The value that replaces the specified interval.
   * @return {string}
   */


		string.replaceInterval = function replaceInterval(str, start, end, value) {
			return str.substring(0, start) + value + str.substring(end);
		};

		return string;
	}();

	this.Library.string = string;
}).call(this);
'use strict';

(function () {
  var core = this.Library.core;
  var array = this.Library.array;
  var async = this.Library.async;
  var Disposable = this.Library.Disposable;
  var object = this.Library.object;
  var string = this.Library.string;
  this.Library.metal = core;
  this.LibraryNamed.metal = this.LibraryNamed.metal || {};
  this.LibraryNamed.metal.core = core;
  this.LibraryNamed.metal.array = array;
  this.LibraryNamed.metal.async = async;
  this.LibraryNamed.metal.Disposable = Disposable;
  this.LibraryNamed.metal.object = object;
  this.LibraryNamed.metal.string = string;
}).call(this);
'use strict';

/**
  * Debounces function execution.
  * @param {!function()} fn
  * @param {number} delay
  * @return {!function()}
  */

(function () {
	function debounce(fn, delay) {
		return function debounced() {
			var args = arguments;
			cancelDebounce(debounced);
			debounced.id = setTimeout(function () {
				fn.apply(null, args);
			}, delay);
		};
	}

	/**
  * Cancels the scheduled debounced function.
  */
	function cancelDebounce(debounced) {
		clearTimeout(debounced.id);
	}

	this.Library.debounce = debounce;
	this.LibraryNamed.debounce = this.LibraryNamed.debounce || {};
	this.LibraryNamed.debounce.cancelDebounce = cancelDebounce;
	this.LibraryNamed.debounce.debounce = debounce;
}).call(this);
'use strict';

(function () {
	var METAL_DATA = '__metal_data__';

	var domData = function () {
		function domData() {
			babelHelpers.classCallCheck(this, domData);
		}

		/**
   * Gets Metal.js's data for the given element.
   * @param {!Element} element
   * @return {!Object}
   */
		domData.get = function get(element) {
			if (!element[METAL_DATA]) {
				element[METAL_DATA] = {
					delegating: {},
					listeners: {}
				};
			}
			return element[METAL_DATA];
		};

		return domData;
	}();

	this.Library.domData = domData;
}).call(this);
'use strict';

(function () {
	var Disposable = this.LibraryNamed.metal.Disposable;

	/**
  * EventHandle utility. Holds information about an event subscription, and
  * allows removing them easily.
  * EventHandle is a Disposable, but it's important to note that the
  * EventEmitter that created it is not the one responsible for disposing it.
  * That responsibility is for the code that holds a reference to it.
  * @param {!EventEmitter} emitter Emitter the event was subscribed to.
  * @param {string} event The name of the event that was subscribed to.
  * @param {!Function} listener The listener subscribed to the event.
  * @constructor
  * @extends {Disposable}
  */

	var EventHandle = function (_Disposable) {
		babelHelpers.inherits(EventHandle, _Disposable);

		function EventHandle(emitter, event, listener) {
			babelHelpers.classCallCheck(this, EventHandle);

			/**
    * The EventEmitter instance that the event was subscribed to.
    * @type {EventEmitter}
    * @protected
    */
			var _this = babelHelpers.possibleConstructorReturn(this, _Disposable.call(this));

			_this.emitter_ = emitter;

			/**
    * The name of the event that was subscribed to.
    * @type {string}
    * @protected
    */
			_this.event_ = event;

			/**
    * The listener subscribed to the event.
    * @type {Function}
    * @protected
    */
			_this.listener_ = listener;
			return _this;
		}

		/**
   * Disposes of this instance's object references.
   * @override
   */


		EventHandle.prototype.disposeInternal = function disposeInternal() {
			this.removeListener();
			this.emitter_ = null;
			this.listener_ = null;
		};

		/**
   * Removes the listener subscription from the emitter.
   */


		EventHandle.prototype.removeListener = function removeListener() {
			if (!this.emitter_.isDisposed()) {
				this.emitter_.removeListener(this.event_, this.listener_);
			}
		};

		return EventHandle;
	}(Disposable);

	this.Library.EventHandle = EventHandle;
}).call(this);
'use strict';

(function () {
	var core = this.LibraryNamed.metal.core;
	var array = this.LibraryNamed.metal.array;
	var Disposable = this.LibraryNamed.metal.Disposable;
	var EventHandle = this.Library.EventHandle;

	/**
  * EventEmitter utility.
  * @constructor
  * @extends {Disposable}
  */

	var EventEmitter = function (_Disposable) {
		babelHelpers.inherits(EventEmitter, _Disposable);

		function EventEmitter() {
			babelHelpers.classCallCheck(this, EventEmitter);

			/**
    * Holds event listeners scoped by event type.
    * @type {!Object<string, !Array<!function()>>}
    * @protected
    */
			var _this = babelHelpers.possibleConstructorReturn(this, _Disposable.call(this));

			_this.events_ = [];

			/**
    * The maximum number of listeners allowed for each event type. If the number
    * becomes higher than the max, a warning will be issued.
    * @type {number}
    * @protected
    */
			_this.maxListeners_ = 10;

			/**
    * Configuration option which determines if an event facade should be sent
    * as a param of listeners when emitting events. If set to true, the facade
    * will be passed as the first argument of the listener.
    * @type {boolean}
    * @protected
    */
			_this.shouldUseFacade_ = false;
			return _this;
		}

		/**
   * Adds a listener to the end of the listeners array for the specified events.
   * @param {!(Array|string)} events
   * @param {!Function} listener
   * @param {boolean} opt_default Flag indicating if this listener is a default
   *   action for this event. Default actions are run last, and only if no previous
   *   listener call `preventDefault()` on the received event facade.
   * @return {!EventHandle} Can be used to remove the listener.
   */


		EventEmitter.prototype.addListener = function addListener(events, listener, opt_default) {
			this.validateListener_(listener);

			events = this.normalizeEvents_(events);
			for (var i = 0; i < events.length; i++) {
				this.addSingleListener_(events[i], listener, opt_default);
			}

			return new EventHandle(this, events, listener);
		};

		/**
   * Adds a listener to the end of the listeners array for a single event.
   * @param {string} event
   * @param {!Function} listener
   * @param {boolean} opt_default Flag indicating if this listener is a default
   *   action for this event. Default actions are run last, and only if no previous
   *   listener call `preventDefault()` on the received event facade.
   * @return {!EventHandle} Can be used to remove the listener.
   * @param {Function=} opt_origin The original function that was added as a
   *   listener, if there is any.
   * @protected
   */


		EventEmitter.prototype.addSingleListener_ = function addSingleListener_(event, listener, opt_default, opt_origin) {
			this.emit('newListener', event, listener);

			if (!this.events_[event]) {
				this.events_[event] = [];
			}
			this.events_[event].push({
				default: opt_default,
				fn: listener,
				origin: opt_origin
			});

			var listeners = this.events_[event];
			if (listeners.length > this.maxListeners_ && !listeners.warned) {
				console.warn('Possible EventEmitter memory leak detected. %d listeners added ' + 'for event %s. Use emitter.setMaxListeners() to increase limit.', listeners.length, event);
				listeners.warned = true;
			}
		};

		/**
   * Disposes of this instance's object references.
   * @override
   */


		EventEmitter.prototype.disposeInternal = function disposeInternal() {
			this.events_ = [];
		};

		/**
   * Execute each of the listeners in order with the supplied arguments.
   * @param {string} event
   * @param {*} opt_args [arg1], [arg2], [...]
   * @return {boolean} Returns true if event had listeners, false otherwise.
   */


		EventEmitter.prototype.emit = function emit(event) {
			var args = array.slice(arguments, 1);
			var listeners = (this.events_[event] || []).concat();

			var facade;
			if (this.getShouldUseFacade()) {
				facade = {
					preventDefault: function preventDefault() {
						facade.preventedDefault = true;
					},
					target: this,
					type: event
				};
				args.push(facade);
			}

			var defaultListeners = [];
			for (var i = 0; i < listeners.length; i++) {
				if (listeners[i].default) {
					defaultListeners.push(listeners[i]);
				} else {
					listeners[i].fn.apply(this, args);
				}
			}
			if (!facade || !facade.preventedDefault) {
				for (var j = 0; j < defaultListeners.length; j++) {
					defaultListeners[j].fn.apply(this, args);
				}
			}

			if (event !== '*') {
				this.emit.apply(this, ['*', event].concat(args));
			}

			return listeners.length > 0;
		};

		/**
   * Gets the configuration option which determines if an event facade should
   * be sent as a param of listeners when emitting events. If set to true, the
   * facade will be passed as the first argument of the listener.
   * @return {boolean}
   */


		EventEmitter.prototype.getShouldUseFacade = function getShouldUseFacade() {
			return this.shouldUseFacade_;
		};

		/**
   * Returns an array of listeners for the specified event.
   * @param {string} event
   * @return {Array} Array of listeners.
   */


		EventEmitter.prototype.listeners = function listeners(event) {
			return (this.events_[event] || []).map(function (listener) {
				return listener.fn;
			});
		};

		/**
   * Adds a listener that will be invoked a fixed number of times for the
   * events. After each event is triggered the specified amount of times, the
   * listener is removed for it.
   * @param {!(Array|string)} events
   * @param {number} amount The amount of times this event should be listened
   * to.
   * @param {!Function} listener
   * @return {!EventHandle} Can be used to remove the listener.
   */


		EventEmitter.prototype.many = function many(events, amount, listener) {
			events = this.normalizeEvents_(events);
			for (var i = 0; i < events.length; i++) {
				this.many_(events[i], amount, listener);
			}

			return new EventHandle(this, events, listener);
		};

		/**
   * Adds a listener that will be invoked a fixed number of times for a single
   * event. After the event is triggered the specified amount of times, the
   * listener is removed.
   * @param {string} event
   * @param {number} amount The amount of times this event should be listened
   * to.
   * @param {!Function} listener
   * @protected
   */


		EventEmitter.prototype.many_ = function many_(event, amount, listener) {
			var self = this;

			if (amount <= 0) {
				return;
			}

			function handlerInternal() {
				if (--amount === 0) {
					self.removeListener(event, handlerInternal);
				}
				listener.apply(self, arguments);
			}

			self.addSingleListener_(event, handlerInternal, false, listener);
		};

		/**
   * Checks if a listener object matches the given listener function. To match,
   * it needs to either point to that listener or have it as its origin.
   * @param {!Object} listenerObj
   * @param {!Function} listener
   * @return {boolean}
   * @protected
   */


		EventEmitter.prototype.matchesListener_ = function matchesListener_(listenerObj, listener) {
			return listenerObj.fn === listener || listenerObj.origin && listenerObj.origin === listener;
		};

		/**
   * Converts the parameter to an array if only one event is given.
   * @param  {!(Array|string)} events
   * @return {!Array}
   * @protected
   */


		EventEmitter.prototype.normalizeEvents_ = function normalizeEvents_(events) {
			return core.isString(events) ? [events] : events;
		};

		/**
   * Removes a listener for the specified events.
   * Caution: changes array indices in the listener array behind the listener.
   * @param {!(Array|string)} events
   * @param {!Function} listener
   * @return {!Object} Returns emitter, so calls can be chained.
   */


		EventEmitter.prototype.off = function off(events, listener) {
			this.validateListener_(listener);

			events = this.normalizeEvents_(events);
			for (var i = 0; i < events.length; i++) {
				var listenerObjs = this.events_[events[i]] || [];
				this.removeMatchingListenerObjs_(listenerObjs, listener);
			}

			return this;
		};

		/**
   * Adds a listener to the end of the listeners array for the specified events.
   * @param {!(Array|string)} events
   * @param {!Function} listener
   * @return {!EventHandle} Can be used to remove the listener.
   */


		EventEmitter.prototype.on = function on() {
			return this.addListener.apply(this, arguments);
		};

		/**
   * Adds a one time listener for the events. This listener is invoked only the
   * next time each event is fired, after which it is removed.
   * @param {!(Array|string)} events
   * @param {!Function} listener
   * @return {!EventHandle} Can be used to remove the listener.
   */


		EventEmitter.prototype.once = function once(events, listener) {
			return this.many(events, 1, listener);
		};

		/**
   * Removes all listeners, or those of the specified events. It's not a good
   * idea to remove listeners that were added elsewhere in the code,
   * especially when it's on an emitter that you didn't create.
   * @param {(Array|string)=} opt_events
   * @return {!Object} Returns emitter, so calls can be chained.
   */


		EventEmitter.prototype.removeAllListeners = function removeAllListeners(opt_events) {
			if (opt_events) {
				var events = this.normalizeEvents_(opt_events);
				for (var i = 0; i < events.length; i++) {
					this.events_[events[i]] = null;
				}
			} else {
				this.events_ = {};
			}
			return this;
		};

		/**
   * Removes all listener objects from the given array that match the given
   * listener function.
   * @param {!Array.<Object>} listenerObjs
   * @param {!Function} listener
   * @protected
   */


		EventEmitter.prototype.removeMatchingListenerObjs_ = function removeMatchingListenerObjs_(listenerObjs, listener) {
			for (var i = listenerObjs.length - 1; i >= 0; i--) {
				if (this.matchesListener_(listenerObjs[i], listener)) {
					listenerObjs.splice(i, 1);
				}
			}
		};

		/**
   * Removes a listener for the specified events.
   * Caution: changes array indices in the listener array behind the listener.
   * @param {!(Array|string)} events
   * @param {!Function} listener
   * @return {!Object} Returns emitter, so calls can be chained.
   */


		EventEmitter.prototype.removeListener = function removeListener() {
			return this.off.apply(this, arguments);
		};

		/**
   * By default EventEmitters will print a warning if more than 10 listeners
   * are added for a particular event. This is a useful default which helps
   * finding memory leaks. Obviously not all Emitters should be limited to 10.
   * This function allows that to be increased. Set to zero for unlimited.
   * @param {number} max The maximum number of listeners.
   * @return {!Object} Returns emitter, so calls can be chained.
   */


		EventEmitter.prototype.setMaxListeners = function setMaxListeners(max) {
			this.maxListeners_ = max;
			return this;
		};

		/**
   * Sets the configuration option which determines if an event facade should
   * be sent as a param of listeners when emitting events. If set to true, the
   * facade will be passed as the first argument of the listener.
   * @param {boolean} shouldUseFacade
   * @return {!Object} Returns emitter, so calls can be chained.
   */


		EventEmitter.prototype.setShouldUseFacade = function setShouldUseFacade(shouldUseFacade) {
			this.shouldUseFacade_ = shouldUseFacade;
			return this;
		};

		/**
   * Checks if the given listener is valid, throwing an exception when it's not.
   * @param  {*} listener
   * @protected
   */


		EventEmitter.prototype.validateListener_ = function validateListener_(listener) {
			if (!core.isFunction(listener)) {
				throw new TypeError('Listener must be a function');
			}
		};

		return EventEmitter;
	}(Disposable);

	this.Library.EventEmitter = EventEmitter;
}).call(this);
'use strict';

(function () {
	var array = this.LibraryNamed.metal.array;
	var Disposable = this.LibraryNamed.metal.Disposable;

	/**
  * EventEmitterProxy utility. It's responsible for linking two EventEmitter
  * instances together, emitting events from the first emitter through the
  * second one. That means that listening to a supported event on the target
  * emitter will mean listening to it on the origin emitter as well.
  * @param {EventEmitter} originEmitter Events originated on this emitter
  *   will be fired for the target emitter's listeners as well.
  * @param {EventEmitter} targetEmitter Event listeners attached to this emitter
  *   will also be triggered when the event is fired by the origin emitter.
  * @param {Object} opt_blacklist Optional blacklist of events that should not be
  *   proxied.
  * @constructor
  * @extends {Disposable}
  */

	var EventEmitterProxy = function (_Disposable) {
		babelHelpers.inherits(EventEmitterProxy, _Disposable);

		function EventEmitterProxy(originEmitter, targetEmitter, opt_blacklist, opt_whitelist) {
			babelHelpers.classCallCheck(this, EventEmitterProxy);

			/**
    * Map of events that should not be proxied.
    * @type {Object}
    * @protected
    */
			var _this = babelHelpers.possibleConstructorReturn(this, _Disposable.call(this));

			_this.blacklist_ = opt_blacklist || {};

			/**
    * The origin emitter. This emitter's events will be proxied through the
    * target emitter.
    * @type {EventEmitter}
    * @protected
    */
			_this.originEmitter_ = originEmitter;

			/**
    * A list of events that are pending to be listened by an actual origin
    * emitter. Events are stored here when the origin doesn't exist, so they
    * can be set on a new origin when one is set.
    * @type {!Array}
    * @protected
    */
			_this.pendingEvents_ = [];

			/**
    * Holds a map of events from the origin emitter that are already being proxied.
    * @type {Object<string, !EventHandle>}
    * @protected
    */
			_this.proxiedEvents_ = {};

			/**
    * The target emitter. This emitter will emit all events that come from
    * the origin emitter.
    * @type {EventEmitter}
    * @protected
    */
			_this.targetEmitter_ = targetEmitter;

			/**
    * Map of events that should be proxied. If whitelist is set blacklist is ignored.
    * @type {Object}
    * @protected
    */
			_this.whitelist_ = opt_whitelist;

			_this.startProxy_();
			return _this;
		}

		/**
   * Adds the given listener for the given event.
   * @param {string} event
   * @param {!function()} listener
   * @return {!EventHandle} The listened event's handle.
   * @protected
   */


		EventEmitterProxy.prototype.addListener_ = function addListener_(event, listener) {
			return this.originEmitter_.on(event, listener);
		};

		/**
   * Adds the proxy listener for the given event.
   * @param {string} event
   * @return {!EventHandle} The listened event's handle.
   * @protected
   */


		EventEmitterProxy.prototype.addListenerForEvent_ = function addListenerForEvent_(event) {
			return this.addListener_(event, this.emitOnTarget_.bind(this, event));
		};

		/**
   * @inheritDoc
   */


		EventEmitterProxy.prototype.disposeInternal = function disposeInternal() {
			this.removeListeners_();
			this.proxiedEvents_ = null;
			this.originEmitter_ = null;
			this.targetEmitter_ = null;
		};

		/**
   * Emits the specified event type on the target emitter.
   * @param {string} eventType
   * @protected
   */


		EventEmitterProxy.prototype.emitOnTarget_ = function emitOnTarget_(eventType) {
			var args = [eventType].concat(array.slice(arguments, 1));
			this.targetEmitter_.emit.apply(this.targetEmitter_, args);
		};

		/**
   * Proxies the given event from the origin to the target emitter.
   * @param {string} event
   */


		EventEmitterProxy.prototype.proxyEvent = function proxyEvent(event) {
			if (this.shouldProxyEvent_(event)) {
				this.tryToAddListener_(event);
			}
		};

		/**
   * Removes the proxy listener for all events.
   * @protected
   */


		EventEmitterProxy.prototype.removeListeners_ = function removeListeners_() {
			var events = Object.keys(this.proxiedEvents_);
			for (var i = 0; i < events.length; i++) {
				this.proxiedEvents_[events[i]].removeListener();
			}
			this.proxiedEvents_ = {};
			this.pendingEvents_ = [];
		};

		/**
   * Changes the origin emitter. This automatically detaches any events that
   * were already being proxied from the previous emitter, and starts proxying
   * them on the new emitter instead.
   * @param {!EventEmitter} originEmitter
   */


		EventEmitterProxy.prototype.setOriginEmitter = function setOriginEmitter(originEmitter) {
			var _this2 = this;

			var events = this.originEmitter_ ? Object.keys(this.proxiedEvents_) : this.pendingEvents_;
			this.removeListeners_();
			this.originEmitter_ = originEmitter;
			events.forEach(function (event) {
				return _this2.proxyEvent(event);
			});
		};

		/**
   * Checks if the given event should be proxied.
   * @param {string} event
   * @return {boolean}
   * @protected
   */


		EventEmitterProxy.prototype.shouldProxyEvent_ = function shouldProxyEvent_(event) {
			if (this.whitelist_ && !this.whitelist_[event]) {
				return false;
			}
			if (this.blacklist_[event]) {
				return false;
			}
			return !this.proxiedEvents_[event];
		};

		/**
   * Starts proxying all events from the origin to the target emitter.
   * @protected
   */


		EventEmitterProxy.prototype.startProxy_ = function startProxy_() {
			this.targetEmitter_.on('newListener', this.proxyEvent.bind(this));
		};

		/**
   * Adds a listener to the origin emitter, if it exists. Otherwise, stores
   * the pending listener so it can be used on a future origin emitter.
   * @param {string} event
   * @protected
   */


		EventEmitterProxy.prototype.tryToAddListener_ = function tryToAddListener_(event) {
			if (this.originEmitter_) {
				this.proxiedEvents_[event] = this.addListenerForEvent_(event);
			} else {
				this.pendingEvents_.push(event);
			}
		};

		return EventEmitterProxy;
	}(Disposable);

	this.Library.EventEmitterProxy = EventEmitterProxy;
}).call(this);
'use strict';

(function () {
	var Disposable = this.LibraryNamed.metal.Disposable;

	/**
  * EventHandler utility. It's useful for easily removing a group of
  * listeners from different EventEmitter instances.
  * @constructor
  * @extends {Disposable}
  */

	var EventHandler = function (_Disposable) {
		babelHelpers.inherits(EventHandler, _Disposable);

		function EventHandler() {
			babelHelpers.classCallCheck(this, EventHandler);

			/**
    * An array that holds the added event handles, so the listeners can be
    * removed later.
    * @type {Array.<EventHandle>}
    * @protected
    */
			var _this = babelHelpers.possibleConstructorReturn(this, _Disposable.call(this));

			_this.eventHandles_ = [];
			return _this;
		}

		/**
   * Adds event handles to be removed later through the `removeAllListeners`
   * method.
   * @param {...(!EventHandle)} var_args
   */


		EventHandler.prototype.add = function add() {
			for (var i = 0; i < arguments.length; i++) {
				this.eventHandles_.push(arguments[i]);
			}
		};

		/**
   * Disposes of this instance's object references.
   * @override
   */


		EventHandler.prototype.disposeInternal = function disposeInternal() {
			this.eventHandles_ = null;
		};

		/**
   * Removes all listeners that have been added through the `add` method.
   */


		EventHandler.prototype.removeAllListeners = function removeAllListeners() {
			for (var i = 0; i < this.eventHandles_.length; i++) {
				this.eventHandles_[i].removeListener();
			}

			this.eventHandles_ = [];
		};

		return EventHandler;
	}(Disposable);

	this.Library.EventHandler = EventHandler;
}).call(this);
'use strict';

(function () {
  var EventEmitter = this.Library.EventEmitter;
  var EventEmitterProxy = this.Library.EventEmitterProxy;
  var EventHandle = this.Library.EventHandle;
  var EventHandler = this.Library.EventHandler;
  this.Library.events = EventEmitter;
  this.LibraryNamed.events = this.LibraryNamed.events || {};
  this.LibraryNamed.events.EventEmitter = EventEmitter;
  this.LibraryNamed.events.EventEmitterProxy = EventEmitterProxy;
  this.LibraryNamed.events.EventHandle = EventHandle;
  this.LibraryNamed.events.EventHandler = EventHandler;
}).call(this);
'use strict';

(function () {
	var array = this.LibraryNamed.metal.array;
	var core = this.LibraryNamed.metal.core;
	var domData = this.Library.domData;
	var EventHandle = this.LibraryNamed.events.EventHandle;

	/**
  * This is a special EventHandle, that is responsible for dom delegated events
  * (only the ones that receive a target element, not a selector string).
  * @extends {EventHandle}
  */

	var DomDelegatedEventHandle = function (_EventHandle) {
		babelHelpers.inherits(DomDelegatedEventHandle, _EventHandle);

		/**
   * The constructor for `DomDelegatedEventHandle`.
   * @param {!Event} emitter Element the event was subscribed to.
   * @param {string} event The name of the event that was subscribed to.
   * @param {!Function} listener The listener subscribed to the event.
   * @param {string=} opt_selector An optional selector used when delegating
   *     the event.
   * @constructor
   */
		function DomDelegatedEventHandle(emitter, event, listener, opt_selector) {
			babelHelpers.classCallCheck(this, DomDelegatedEventHandle);

			var _this = babelHelpers.possibleConstructorReturn(this, _EventHandle.call(this, emitter, event, listener));

			_this.selector_ = opt_selector;
			return _this;
		}

		/**
   * @inheritDoc
   */


		DomDelegatedEventHandle.prototype.removeListener = function removeListener() {
			var data = domData.get(this.emitter_);
			var selector = this.selector_;
			var arr = core.isString(selector) ? data.delegating[this.event_].selectors : data.listeners;
			var key = core.isString(selector) ? selector : this.event_;

			array.remove(arr[key] || [], this.listener_);
			if (arr[key] && arr[key].length === 0) {
				delete arr[key];
			}
		};

		return DomDelegatedEventHandle;
	}(EventHandle);

	this.Library.DomDelegatedEventHandle = DomDelegatedEventHandle;
}).call(this);
'use strict';

(function () {
	var EventHandle = this.LibraryNamed.events.EventHandle;

	/**
  * This is a special EventHandle, that is responsible for dom events, instead
  * of EventEmitter events.
  * @extends {EventHandle}
  */

	var DomEventHandle = function (_EventHandle) {
		babelHelpers.inherits(DomEventHandle, _EventHandle);

		/**
   * The constructor for `DomEventHandle`.
   * @param {!EventEmitter} emitter Emitter the event was subscribed to.
   * @param {string} event The name of the event that was subscribed to.
   * @param {!Function} listener The listener subscribed to the event.
   * @param {boolean} opt_capture Flag indicating if listener should be triggered
   *   during capture phase, instead of during the bubbling phase. Defaults to false.
   * @constructor
   */
		function DomEventHandle(emitter, event, listener, opt_capture) {
			babelHelpers.classCallCheck(this, DomEventHandle);

			var _this = babelHelpers.possibleConstructorReturn(this, _EventHandle.call(this, emitter, event, listener));

			_this.capture_ = opt_capture;
			return _this;
		}

		/**
   * @inheritDoc
   */


		DomEventHandle.prototype.removeListener = function removeListener() {
			this.emitter_.removeEventListener(this.event_, this.listener_, this.capture_);
		};

		return DomEventHandle;
	}(EventHandle);

	this.Library.DomEventHandle = DomEventHandle;
}).call(this);
'use strict';

(function () {
	var core = this.LibraryNamed.metal.core;
	var object = this.LibraryNamed.metal.object;
	var domData = this.Library.domData;
	var DomDelegatedEventHandle = this.Library.DomDelegatedEventHandle;
	var DomEventHandle = this.Library.DomEventHandle;


	var NEXT_TARGET = '__metal_next_target__';
	var USE_CAPTURE = {
		blur: true,
		error: true,
		focus: true,
		invalid: true,
		load: true,
		scroll: true
	};

	var dom = function () {
		function dom() {
			babelHelpers.classCallCheck(this, dom);
		}

		/**
   * Adds the requested CSS classes to an element.
   * @param {!Element} element The element to add CSS classes to.
   * @param {string} classes CSS classes to add.
   */
		dom.addClasses = function addClasses(element, classes) {
			if (!core.isObject(element) || !core.isString(classes)) {
				return;
			}

			if ('classList' in element) {
				dom.addClassesWithNative_(element, classes);
			} else {
				dom.addClassesWithoutNative_(element, classes);
			}
		};

		/**
   * Adds the requested CSS classes to an element using classList.
   * @param {!Element} element The element to add CSS classes to.
   * @param {string} classes CSS classes to add.
   * @protected
   */


		dom.addClassesWithNative_ = function addClassesWithNative_(element, classes) {
			classes.split(' ').forEach(function (className) {
				if (className) {
					element.classList.add(className);
				}
			});
		};

		/**
   * Adds the requested CSS classes to an element without using classList.
   * @param {!Element} element The element to add CSS classes to.
   * @param {string} classes CSS classes to add.
   * @protected
   */


		dom.addClassesWithoutNative_ = function addClassesWithoutNative_(element, classes) {
			var elementClassName = ' ' + element.className + ' ';
			var classesToAppend = '';

			classes = classes.split(' ');

			for (var i = 0; i < classes.length; i++) {
				var className = classes[i];

				if (elementClassName.indexOf(' ' + className + ' ') === -1) {
					classesToAppend += ' ' + className;
				}
			}

			if (classesToAppend) {
				element.className = element.className + classesToAppend;
			}
		};

		/**
   * Adds an event listener to the given element, to be triggered via delegate.
   * @param {!Element} element
   * @param {string} eventName
   * @param {!function()} listener
   * @protected
   */


		dom.addElementListener_ = function addElementListener_(element, eventName, listener) {
			var data = domData.get(element);
			dom.addToArr_(data.listeners, eventName, listener);
		};

		/**
   * Adds an event listener to the given element, to be triggered via delegate
   * selectors.
   * @param {!Element} element
   * @param {string} eventName
   * @param {string} selector
   * @param {!function()} listener
   * @protected
   */


		dom.addSelectorListener_ = function addSelectorListener_(element, eventName, selector, listener) {
			var data = domData.get(element);
			dom.addToArr_(data.delegating[eventName].selectors, selector, listener);
		};

		/**
   * Adds a value to an array inside an object, creating it first if it doesn't
   * yet exist.
   * @param {!Array} arr
   * @param {string} key
   * @param {*} value
   * @protected
   */


		dom.addToArr_ = function addToArr_(arr, key, value) {
			if (!arr[key]) {
				arr[key] = [];
			}
			arr[key].push(value);
		};

		/**
   * Attaches a delegate listener, unless there's already one attached.
   * @param {!Element} element
   * @param {string} eventName
   * @protected
   */


		dom.attachDelegateEvent_ = function attachDelegateEvent_(element, eventName) {
			var data = domData.get(element);
			if (!data.delegating[eventName]) {
				data.delegating[eventName] = {
					handle: dom.on(element, eventName, dom.handleDelegateEvent_, !!USE_CAPTURE[eventName]),
					selectors: {}
				};
			}
		};

		/**
   * Gets the closest element up the tree from the given element (including
   * itself) that matches the specified selector, or null if none match.
   * @param {Element} element
   * @param {string} selector
   * @return {Element}
   */


		dom.closest = function closest(element, selector) {
			while (element && !dom.match(element, selector)) {
				element = element.parentNode;
			}
			return element;
		};

		/**
   * Appends a child node with text or other nodes to a parent node. If
   * child is a HTML string it will be automatically converted to a document
   * fragment before appending it to the parent.
   * @param {!Element} parent The node to append nodes to.
   * @param {!(Element|NodeList|string)} child The thing to append to the parent.
   * @return {!Element} The appended child.
   */


		dom.append = function append(parent, child) {
			if (core.isString(child)) {
				child = dom.buildFragment(child);
			}
			if (child instanceof NodeList) {
				var childArr = Array.prototype.slice.call(child);
				for (var i = 0; i < childArr.length; i++) {
					parent.appendChild(childArr[i]);
				}
			} else {
				parent.appendChild(child);
			}
			return child;
		};

		/**
   * Helper for converting a HTML string into a document fragment.
   * @param {string} htmlString The HTML string to convert.
   * @return {!Element} The resulting document fragment.
   */


		dom.buildFragment = function buildFragment(htmlString) {
			var tempDiv = document.createElement('div');
			tempDiv.innerHTML = '<br>' + htmlString;
			tempDiv.removeChild(tempDiv.firstChild);

			var fragment = document.createDocumentFragment();
			while (tempDiv.firstChild) {
				fragment.appendChild(tempDiv.firstChild);
			}
			return fragment;
		};

		/**
   * Checks if the first element contains the second one.
   * @param {!Element} element1
   * @param {!Element} element2
   * @return {boolean}
   */


		dom.contains = function contains(element1, element2) {
			if (core.isDocument(element1)) {
				// document.contains is not defined on IE9, so call it on documentElement instead.
				return element1.documentElement.contains(element2);
			} else {
				return element1.contains(element2);
			}
		};

		/**
   * Listens to the specified event on the given DOM element, but only calls the
   * given callback listener when it's triggered by elements that match the
   * given selector or target element.
   * @param {!Element} element The DOM element the event should be listened on.
   * @param {string} eventName The name of the event to listen to.
   * @param {!Element|string} selectorOrTarget Either an element or css selector
   *     that should match the event for the listener to be triggered.
   * @param {!function(!Object)} callback Function to be called when the event
   *     is triggered. It will receive the normalized event object.
   * @param {boolean=} opt_default Optional flag indicating if this is a default
   *     listener. That means that it would only be executed after all non
   *     default listeners, and only if the event isn't prevented via
   *     `preventDefault`.
   * @return {!EventHandle} Can be used to remove the listener.
   */


		dom.delegate = function delegate(element, eventName, selectorOrTarget, callback, opt_default) {
			var customConfig = dom.customEvents[eventName];
			if (customConfig && customConfig.delegate) {
				eventName = customConfig.originalEvent;
				callback = customConfig.handler.bind(customConfig, callback);
			}

			if (opt_default) {
				// Wrap callback so we don't set property directly on it.
				callback = callback.bind();
				callback.defaultListener_ = true;
			}

			dom.attachDelegateEvent_(element, eventName);
			if (core.isString(selectorOrTarget)) {
				dom.addSelectorListener_(element, eventName, selectorOrTarget, callback);
			} else {
				dom.addElementListener_(selectorOrTarget, eventName, callback);
			}

			return new DomDelegatedEventHandle(core.isString(selectorOrTarget) ? element : selectorOrTarget, eventName, callback, core.isString(selectorOrTarget) ? selectorOrTarget : null);
		};

		/**
   * Inserts node in document as last element.
   * @param {Element} node Element to remove children from.
   */


		dom.enterDocument = function enterDocument(node) {
			node && dom.append(document.body, node);
		};

		/**
   * Removes node from document.
   * @param {Element} node Element to remove children from.
   */


		dom.exitDocument = function exitDocument(node) {
			if (node && node.parentNode) {
				node.parentNode.removeChild(node);
			}
		};

		/**
   * This is called when an event is triggered by a delegate listener. All
   * matching listeners of this event type from `target` to `currentTarget` will
   * be triggered.
   * @param {!Event} event The event payload.
   * @return {boolean} False if at least one of the triggered callbacks returns
   *     false, or true otherwise.
   * @protected
   */


		dom.handleDelegateEvent_ = function handleDelegateEvent_(event) {
			dom.normalizeDelegateEvent_(event);
			var currElement = core.isDef(event[NEXT_TARGET]) ? event[NEXT_TARGET] : event.target;
			var ret = true;
			var container = event.currentTarget;
			var limit = event.currentTarget.parentNode;
			var defFns = [];

			while (currElement && currElement !== limit && !event.stopped) {
				event.delegateTarget = currElement;
				ret &= dom.triggerMatchedListeners_(container, currElement, event, defFns);
				currElement = currElement.parentNode;
			}

			for (var i = 0; i < defFns.length && !event.defaultPrevented; i++) {
				event.delegateTarget = defFns[i].element;
				ret &= defFns[i].fn(event);
			}

			event.delegateTarget = null;
			event[NEXT_TARGET] = limit;
			return ret;
		};

		/**
   * Checks if the given element has the requested css class.
   * @param {!Element} element
   * @param {string} className
   * @return {boolean}
   */


		dom.hasClass = function hasClass(element, className) {
			if ('classList' in element) {
				return dom.hasClassWithNative_(element, className);
			} else {
				return dom.hasClassWithoutNative_(element, className);
			}
		};

		/**
   * Checks if the given element has the requested css class using classList.
   * @param {!Element} element
   * @param {string} className
   * @return {boolean}
   * @protected
   */


		dom.hasClassWithNative_ = function hasClassWithNative_(element, className) {
			return element.classList.contains(className);
		};

		/**
   * Checks if the given element has the requested css class without using classList.
   * @param {!Element} element
   * @param {string} className
   * @return {boolean}
   * @protected
   */


		dom.hasClassWithoutNative_ = function hasClassWithoutNative_(element, className) {
			return (' ' + element.className + ' ').indexOf(' ' + className + ' ') >= 0;
		};

		/**
   * Checks if the given element is empty or not.
   * @param {!Element} element
   * @return {boolean}
   */


		dom.isEmpty = function isEmpty(element) {
			return element.childNodes.length === 0;
		};

		/**
   * Check if an element matches a given selector.
   * @param {Element} element
   * @param {string} selector
   * @return {boolean}
   */


		dom.match = function match(element, selector) {
			if (!element || element.nodeType !== 1) {
				return false;
			}

			var p = Element.prototype;
			var m = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector;
			if (m) {
				return m.call(element, selector);
			}

			return dom.matchFallback_(element, selector);
		};

		/**
   * Check if an element matches a given selector, using an internal implementation
   * instead of calling existing javascript functions.
   * @param {Element} element
   * @param {string} selector
   * @return {boolean}
   * @protected
   */


		dom.matchFallback_ = function matchFallback_(element, selector) {
			var nodes = document.querySelectorAll(selector, element.parentNode);
			for (var i = 0; i < nodes.length; ++i) {
				if (nodes[i] === element) {
					return true;
				}
			}
			return false;
		};

		/**
   * Returns the next sibling of the given element that matches the specified
   * selector, or null if there is none.
   * @param {!Element} element
   * @param {?string} selector
   */


		dom.next = function next(element, selector) {
			do {
				element = element.nextSibling;
				if (element && dom.match(element, selector)) {
					return element;
				}
			} while (element);
			return null;
		};

		/**
   * Normalizes the event payload for delegate listeners.
   * @param {!Event} event
   */


		dom.normalizeDelegateEvent_ = function normalizeDelegateEvent_(event) {
			event.stopPropagation = dom.stopPropagation_;
			event.stopImmediatePropagation = dom.stopImmediatePropagation_;
		};

		/**
   * Listens to the specified event on the given DOM element. This function normalizes
   * DOM event payloads and functions so they'll work the same way on all supported
   * browsers.
   * @param {!Element|string} element The DOM element to listen to the event on, or
   *   a selector that should be delegated on the entire document.
   * @param {string} eventName The name of the event to listen to.
   * @param {!function(!Object)} callback Function to be called when the event is
   *   triggered. It will receive the normalized event object.
   * @param {boolean} opt_capture Flag indicating if listener should be triggered
   *   during capture phase, instead of during the bubbling phase. Defaults to false.
   * @return {!DomEventHandle} Can be used to remove the listener.
   */


		dom.on = function on(element, eventName, callback, opt_capture) {
			if (core.isString(element)) {
				return dom.delegate(document, eventName, element, callback);
			}
			var customConfig = dom.customEvents[eventName];
			if (customConfig && customConfig.event) {
				eventName = customConfig.originalEvent;
				callback = customConfig.handler.bind(customConfig, callback);
			}
			element.addEventListener(eventName, callback, opt_capture);
			return new DomEventHandle(element, eventName, callback, opt_capture);
		};

		/**
   * Listens to the specified event on the given DOM element once. This
   * function normalizes DOM event payloads and functions so they'll work the
   * same way on all supported browsers.
   * @param {!Element} element The DOM element to listen to the event on.
   * @param {string} eventName The name of the event to listen to.
   * @param {!function(!Object)} callback Function to be called when the event
   *   is triggered. It will receive the normalized event object.
   * @return {!DomEventHandle} Can be used to remove the listener.
   */


		dom.once = function once(element, eventName, callback) {
			var domEventHandle = this.on(element, eventName, function () {
				domEventHandle.removeListener();
				return callback.apply(this, arguments);
			});
			return domEventHandle;
		};

		/**
   * Gets the first parent from the given element that matches the specified
   * selector, or null if none match.
   * @param {!Element} element
   * @param {string} selector
   * @return {Element}
   */


		dom.parent = function parent(element, selector) {
			return dom.closest(element.parentNode, selector);
		};

		/**
   * Registers a custom event.
   * @param {string} eventName The name of the custom event.
   * @param {!Object} customConfig An object with information about how the event
   *   should be handled.
   */


		dom.registerCustomEvent = function registerCustomEvent(eventName, customConfig) {
			dom.customEvents[eventName] = customConfig;
		};

		/**
   * Removes all the child nodes on a DOM node.
   * @param {Element} node Element to remove children from.
   */


		dom.removeChildren = function removeChildren(node) {
			var child;
			while (child = node.firstChild) {
				node.removeChild(child);
			}
		};

		/**
   * Removes the requested CSS classes from an element.
   * @param {!Element} element The element to remove CSS classes from.
   * @param {string} classes CSS classes to remove.
   */


		dom.removeClasses = function removeClasses(element, classes) {
			if (!core.isObject(element) || !core.isString(classes)) {
				return;
			}

			if ('classList' in element) {
				dom.removeClassesWithNative_(element, classes);
			} else {
				dom.removeClassesWithoutNative_(element, classes);
			}
		};

		/**
   * Removes the requested CSS classes from an element using classList.
   * @param {!Element} element The element to remove CSS classes from.
   * @param {string} classes CSS classes to remove.
   * @protected
   */


		dom.removeClassesWithNative_ = function removeClassesWithNative_(element, classes) {
			classes.split(' ').forEach(function (className) {
				if (className) {
					element.classList.remove(className);
				}
			});
		};

		/**
   * Removes the requested CSS classes from an element without using classList.
   * @param {!Element} element The element to remove CSS classes from.
   * @param {string} classes CSS classes to remove.
   * @protected
   */


		dom.removeClassesWithoutNative_ = function removeClassesWithoutNative_(element, classes) {
			var elementClassName = ' ' + element.className + ' ';

			classes = classes.split(' ');

			for (var i = 0; i < classes.length; i++) {
				elementClassName = elementClassName.replace(' ' + classes[i] + ' ', ' ');
			}

			element.className = elementClassName.trim();
		};

		/**
   * Replaces the first element with the second.
   * @param {Element} element1
   * @param {Element} element2
   */


		dom.replace = function replace(element1, element2) {
			if (element1 && element2 && element1 !== element2 && element1.parentNode) {
				element1.parentNode.insertBefore(element2, element1);
				element1.parentNode.removeChild(element1);
			}
		};

		/**
   * The function that replaces `stopImmediatePropagation_` for events.
   * @protected
   */


		dom.stopImmediatePropagation_ = function stopImmediatePropagation_() {
			this.stopped = true;
			this.stoppedImmediate = true;
			Event.prototype.stopImmediatePropagation.call(this);
		};

		/**
   * The function that replaces `stopPropagation` for events.
   * @protected
   */


		dom.stopPropagation_ = function stopPropagation_() {
			this.stopped = true;
			Event.prototype.stopPropagation.call(this);
		};

		/**
   * Checks if the given element supports the given event type.
   * @param {!Element|string} element The DOM element or element tag name to check.
   * @param {string} eventName The name of the event to check.
   * @return {boolean}
   */


		dom.supportsEvent = function supportsEvent(element, eventName) {
			if (dom.customEvents[eventName]) {
				return true;
			}

			if (core.isString(element)) {
				if (!elementsByTag[element]) {
					elementsByTag[element] = document.createElement(element);
				}
				element = elementsByTag[element];
			}
			return 'on' + eventName in element;
		};

		/**
   * Converts the given argument to a DOM element. Strings are assumed to
   * be selectors, and so a matched element will be returned. If the arg
   * is already a DOM element it will be the return value.
   * @param {string|Element|Document} selectorOrElement
   * @return {Element} The converted element, or null if none was found.
   */


		dom.toElement = function toElement(selectorOrElement) {
			if (core.isElement(selectorOrElement) || core.isDocument(selectorOrElement)) {
				return selectorOrElement;
			} else if (core.isString(selectorOrElement)) {
				if (selectorOrElement[0] === '#' && selectorOrElement.indexOf(' ') === -1) {
					return document.getElementById(selectorOrElement.substr(1));
				} else {
					return document.querySelector(selectorOrElement);
				}
			} else {
				return null;
			}
		};

		/**
   * Adds or removes one or more classes from an element. If any of the classes
   * is present, it will be removed from the element, or added otherwise.
   * @param {!Element} element The element which classes will be toggled.
   * @param {string} classes The classes which have to added or removed from the element.
   */


		dom.toggleClasses = function toggleClasses(element, classes) {
			if (!core.isObject(element) || !core.isString(classes)) {
				return;
			}

			if ('classList' in element) {
				dom.toggleClassesWithNative_(element, classes);
			} else {
				dom.toggleClassesWithoutNative_(element, classes);
			}
		};

		/**
   * Adds or removes one or more classes from an element using classList.
   * If any of the classes is present, it will be removed from the element,
   * or added otherwise.
   * @param {!Element} element The element which classes will be toggled.
   * @param {string} classes The classes which have to added or removed from the element.
   */


		dom.toggleClassesWithNative_ = function toggleClassesWithNative_(element, classes) {
			classes.split(' ').forEach(function (className) {
				element.classList.toggle(className);
			});
		};

		/**
   * Adds or removes one or more classes from an element without using classList.
   * If any of the classes is present, it will be removed from the element,
   * or added otherwise.
   * @param {!Element} element The element which classes will be toggled.
   * @param {string} classes The classes which have to added or removed from the element.
   */


		dom.toggleClassesWithoutNative_ = function toggleClassesWithoutNative_(element, classes) {
			var elementClassName = ' ' + element.className + ' ';

			classes = classes.split(' ');

			for (var i = 0; i < classes.length; i++) {
				var className = ' ' + classes[i] + ' ';
				var classIndex = elementClassName.indexOf(className);

				if (classIndex === -1) {
					elementClassName = elementClassName + classes[i] + ' ';
				} else {
					elementClassName = elementClassName.substring(0, classIndex) + ' ' + elementClassName.substring(classIndex + className.length);
				}
			}

			element.className = elementClassName.trim();
		};

		/**
   * Triggers the specified event on the given element.
   * NOTE: This should mostly be used for testing, not on real code.
   * @param {!Element} element The node that should trigger the event.
   * @param {string} eventName The name of the event to be triggred.
   * @param {Object=} opt_eventObj An object with data that should be on the
   *   triggered event's payload.
   */


		dom.triggerEvent = function triggerEvent(element, eventName, opt_eventObj) {
			var eventObj = document.createEvent('HTMLEvents');
			eventObj.initEvent(eventName, true, true);
			object.mixin(eventObj, opt_eventObj);
			element.dispatchEvent(eventObj);
		};

		/**
   * Triggers the given listeners array.
   * @param {Array<!function()} listeners
   * @param {!Event} event
   * @param {!Element} element
   * @param {!Array} defaultFns Array to collect default listeners in, instead
   *     of running them.
   * @return {boolean} False if at least one of the triggered callbacks returns
   *     false, or true otherwise.
   * @protected
   */


		dom.triggerListeners_ = function triggerListeners_(listeners, event, element, defaultFns) {
			var ret = true;
			listeners = listeners || [];
			for (var i = 0; i < listeners.length && !event.stoppedImmediate; i++) {
				if (listeners[i].defaultListener_) {
					defaultFns.push({
						element: element,
						fn: listeners[i]
					});
				} else {
					ret &= listeners[i](event);
				}
			}
			return ret;
		};

		/**
   * Triggers all listeners for the given event type that are stored in the
   * specified element.
   * @param {!Element} container
   * @param {!Element} element
   * @param {!Event} event
   * @param {!Array} defaultFns Array to collect default listeners in, instead
   *     of running them.
   * @return {boolean} False if at least one of the triggered callbacks returns
   *     false, or true otherwise.
   * @protected
   */


		dom.triggerMatchedListeners_ = function triggerMatchedListeners_(container, element, event, defaultFns) {
			var data = domData.get(element);
			var listeners = data.listeners[event.type];
			var ret = dom.triggerListeners_(listeners, event, element, defaultFns);

			var selectorsMap = domData.get(container).delegating[event.type].selectors;
			var selectors = Object.keys(selectorsMap);
			for (var i = 0; i < selectors.length && !event.stoppedImmediate; i++) {
				if (dom.match(element, selectors[i])) {
					listeners = selectorsMap[selectors[i]];
					ret &= dom.triggerListeners_(listeners, event, element, defaultFns);
				}
			}

			return ret;
		};

		return dom;
	}();

	var elementsByTag = {};
	dom.customEvents = {};

	this.Library.dom = dom;
}).call(this);
'use strict';

(function () {
	var dom = this.Library.dom;
	var EventEmitterProxy = this.LibraryNamed.events.EventEmitterProxy;

	/**
  * DomEventEmitterProxy utility. It extends `EventEmitterProxy` to also accept
  * dom elements as origin emitters.
  * @extends {EventEmitterProxy}
  */

	var DomEventEmitterProxy = function (_EventEmitterProxy) {
		babelHelpers.inherits(DomEventEmitterProxy, _EventEmitterProxy);

		function DomEventEmitterProxy() {
			babelHelpers.classCallCheck(this, DomEventEmitterProxy);
			return babelHelpers.possibleConstructorReturn(this, _EventEmitterProxy.apply(this, arguments));
		}

		/**
   * Adds the given listener for the given event.
   * @param {string} event.
   * @param {!function()} listener
   * @return {!EventHandle} The listened event's handle.
   * @protected
   * @override
   */
		DomEventEmitterProxy.prototype.addListener_ = function addListener_(event, listener) {
			if (this.originEmitter_.addEventListener) {
				if (this.isDelegateEvent_(event)) {
					var index = event.indexOf(':', 9);
					var eventName = event.substring(9, index);
					var selector = event.substring(index + 1);
					return dom.delegate(this.originEmitter_, eventName, selector, listener);
				} else {
					return dom.on(this.originEmitter_, event, listener);
				}
			} else {
				return _EventEmitterProxy.prototype.addListener_.call(this, event, listener);
			}
		};

		/**
   * Checks if the given event is of the delegate type.
   * @param {string} event
   * @return {boolean}
   * @protected
   */


		DomEventEmitterProxy.prototype.isDelegateEvent_ = function isDelegateEvent_(event) {
			return event.substr(0, 9) === 'delegate:';
		};

		/**
   * Checks if the given event is supported by the origin element.
   * @param {string} event
   * @protected
   */


		DomEventEmitterProxy.prototype.isSupportedDomEvent_ = function isSupportedDomEvent_(event) {
			if (!this.originEmitter_ || !this.originEmitter_.addEventListener) {
				return true;
			}
			return this.isDelegateEvent_(event) && event.indexOf(':', 9) !== -1 || dom.supportsEvent(this.originEmitter_, event);
		};

		/**
   * Checks if the given event should be proxied.
   * @param {string} event
   * @return {boolean}
   * @protected
   * @override
   */


		DomEventEmitterProxy.prototype.shouldProxyEvent_ = function shouldProxyEvent_(event) {
			return _EventEmitterProxy.prototype.shouldProxyEvent_.call(this, event) && this.isSupportedDomEvent_(event);
		};

		return DomEventEmitterProxy;
	}(EventEmitterProxy);

	this.Library.DomEventEmitterProxy = DomEventEmitterProxy;
}).call(this);
'use strict';

(function () {
	var dom = this.Library.dom;
	var string = this.LibraryNamed.metal.string;

	/**
  * Class with static methods responsible for doing browser feature checks.
  */

	var features = function () {
		function features() {
			babelHelpers.classCallCheck(this, features);
		}

		/**
   * Some browsers still supports prefixed animation events. This method can
   * be used to retrieve the current browser event name for both, animation
   * and transition.
   * @return {object}
   */
		features.checkAnimationEventName = function checkAnimationEventName() {
			if (features.animationEventName_ === undefined) {
				features.animationEventName_ = {
					animation: features.checkAnimationEventName_('animation'),
					transition: features.checkAnimationEventName_('transition')
				};
			}
			return features.animationEventName_;
		};

		/**
   * @protected
   * @param {string} type Type to test: animation, transition.
   * @return {string} Browser event name.
   */


		features.checkAnimationEventName_ = function checkAnimationEventName_(type) {
			var prefixes = ['Webkit', 'MS', 'O', ''];
			var typeTitleCase = string.replaceInterval(type, 0, 1, type.substring(0, 1).toUpperCase());
			var suffixes = [typeTitleCase + 'End', typeTitleCase + 'End', typeTitleCase + 'End', type + 'end'];
			for (var i = 0; i < prefixes.length; i++) {
				if (features.animationElement_.style[prefixes[i] + typeTitleCase] !== undefined) {
					return prefixes[i].toLowerCase() + suffixes[i];
				}
			}
			return type + 'end';
		};

		/**
   * Some browsers (like IE9) change the order of element attributes, when html
   * is rendered. This method can be used to check if this behavior happens on
   * the current browser.
   * @return {boolean}
   */


		features.checkAttrOrderChange = function checkAttrOrderChange() {
			if (features.attrOrderChange_ === undefined) {
				var originalContent = '<div data-component="" data-ref=""></div>';
				var element = document.createElement('div');
				dom.append(element, originalContent);
				features.attrOrderChange_ = originalContent !== element.innerHTML;
			}
			return features.attrOrderChange_;
		};

		return features;
	}();

	features.animationElement_ = document.createElement('div');
	features.animationEventName_ = undefined;
	features.attrOrderChange_ = undefined;

	this.Library.features = features;
}).call(this);
'use strict';

(function () {
	var async = this.LibraryNamed.metal.async;
	var dom = this.Library.dom;

	/**
  * Utility functions for running javascript code in the global scope.
  */

	var globalEval = function () {
		function globalEval() {
			babelHelpers.classCallCheck(this, globalEval);
		}

		/**
   * Evaluates the given string in the global scope.
   * @param {string} text
   * @param {function()=} opt_appendFn Optional function to append the node
   *   into document.
   * @return {Element} script
   */
		globalEval.run = function run(text, opt_appendFn) {
			var script = document.createElement('script');
			script.text = text;
			if (opt_appendFn) {
				opt_appendFn(script);
			} else {
				document.head.appendChild(script);
			}
			dom.exitDocument(script);
			return script;
		};

		/**
   * Evaluates the given javascript file in the global scope.
   * @param {string} src The file's path.
   * @param {function()=} opt_callback Optional function to be called
   *   when the script has been run.
   * @param {function()=} opt_appendFn Optional function to append the node
   *   into document.
   * @return {Element} script
   */


		globalEval.runFile = function runFile(src, opt_callback, opt_appendFn) {
			var script = document.createElement('script');
			script.src = src;

			var callback = function callback() {
				dom.exitDocument(script);
				opt_callback && opt_callback();
			};
			dom.once(script, 'load', callback);
			dom.once(script, 'error', callback);

			if (opt_appendFn) {
				opt_appendFn(script);
			} else {
				document.head.appendChild(script);
			}

			return script;
		};

		/**
   * Evaluates the code referenced by the given script element.
   * @param {!Element} script
   * @param {function()=} opt_callback Optional function to be called
   *   when the script has been run.
   * @param {function()=} opt_appendFn Optional function to append the node
   *   into document.
   * @return {Element} script
   */


		globalEval.runScript = function runScript(script, opt_callback, opt_appendFn) {
			var callback = function callback() {
				opt_callback && opt_callback();
			};
			if (script.type && script.type !== 'text/javascript') {
				async.nextTick(callback);
				return;
			}
			dom.exitDocument(script);
			if (script.src) {
				return globalEval.runFile(script.src, opt_callback, opt_appendFn);
			} else {
				async.nextTick(callback);
				return globalEval.run(script.text, opt_appendFn);
			}
		};

		/**
   * Evaluates any script tags present in the given element.
   * @params {!Element} element
   * @param {function()=} opt_callback Optional function to be called
   *   when the script has been run.
   * @param {function()=} opt_appendFn Optional function to append the node
   *   into document.
   */


		globalEval.runScriptsInElement = function runScriptsInElement(element, opt_callback, opt_appendFn) {
			var scripts = element.querySelectorAll('script');
			if (scripts.length) {
				globalEval.runScriptsInOrder(scripts, 0, opt_callback, opt_appendFn);
			} else if (opt_callback) {
				async.nextTick(opt_callback);
			}
		};

		/**
   * Runs the given scripts elements in the order that they appear.
   * @param {!NodeList} scripts
   * @param {number} index
   * @param {function()=} opt_callback Optional function to be called
   *   when the script has been run.
   * @param {function()=} opt_appendFn Optional function to append the node
   *   into document.
   */


		globalEval.runScriptsInOrder = function runScriptsInOrder(scripts, index, opt_callback, opt_appendFn) {
			globalEval.runScript(scripts.item(index), function () {
				if (index < scripts.length - 1) {
					globalEval.runScriptsInOrder(scripts, index + 1, opt_callback, opt_appendFn);
				} else if (opt_callback) {
					async.nextTick(opt_callback);
				}
			}, opt_appendFn);
		};

		return globalEval;
	}();

	this.Library.globalEval = globalEval;
}).call(this);
'use strict';

(function () {
	var async = this.LibraryNamed.metal.async;
	var dom = this.Library.dom;

	/**
  * Utility functions for running styles.
  */

	var globalEvalStyles = function () {
		function globalEvalStyles() {
			babelHelpers.classCallCheck(this, globalEvalStyles);
		}

		/**
   * Evaluates the given style.
   * @param {string} text
   * @param {function()=} opt_appendFn Optional function to append the node
   *   into document.
   * @return {Element} style
   */
		globalEvalStyles.run = function run(text, opt_appendFn) {
			var style = document.createElement('style');
			style.innerHTML = text;
			if (opt_appendFn) {
				opt_appendFn(style);
			} else {
				document.head.appendChild(style);
			}
			return style;
		};

		/**
   * Evaluates the given style file.
   * @param {string} href The file's path.
   * @param {function()=} opt_callback Optional function to be called
   *   when the styles has been run.
   * @param {function()=} opt_appendFn Optional function to append the node
   *   into document.
   * @return {Element} style
   */


		globalEvalStyles.runFile = function runFile(href, opt_callback, opt_appendFn) {
			var link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = href;
			globalEvalStyles.runStyle(link, opt_callback, opt_appendFn);
			return link;
		};

		/**
   * Evaluates the code referenced by the given style/link element.
   * @param {!Element} style
   * @param {function()=} opt_callback Optional function to be called
   *   when the script has been run.
   * @param {function()=} opt_appendFn Optional function to append the node
   *   into document.
   *  @return {Element} style
   */


		globalEvalStyles.runStyle = function runStyle(style, opt_callback, opt_appendFn) {
			var callback = function callback() {
				opt_callback && opt_callback();
			};
			if (style.rel && style.rel !== 'stylesheet') {
				async.nextTick(callback);
				return;
			}

			if (style.tagName === 'STYLE') {
				async.nextTick(callback);
			} else {
				dom.once(style, 'load', callback);
				dom.once(style, 'error', callback);
			}

			if (opt_appendFn) {
				opt_appendFn(style);
			} else {
				document.head.appendChild(style);
			}

			return style;
		};

		/**
   * Evaluates any style present in the given element.
   * @params {!Element} element
   * @param {function()=} opt_callback Optional function to be called when the
   *   style has been run.
   * @param {function()=} opt_appendFn Optional function to append the node
   *   into document.
   */


		globalEvalStyles.runStylesInElement = function runStylesInElement(element, opt_callback, opt_appendFn) {
			var styles = element.querySelectorAll('style,link');
			if (styles.length === 0 && opt_callback) {
				async.nextTick(opt_callback);
				return;
			}

			var loadCount = 0;
			var callback = function callback() {
				if (opt_callback && ++loadCount === styles.length) {
					async.nextTick(opt_callback);
				}
			};
			for (var i = 0; i < styles.length; i++) {
				globalEvalStyles.runStyle(styles[i], callback, opt_appendFn);
			}
		};

		return globalEvalStyles;
	}();

	this.Library.globalEvalStyles = globalEvalStyles;
}).call(this);
'use strict';

(function () {
	var dom = this.Library.dom;
	var features = this.Library.features;


	var mouseEventMap = {
		mouseenter: 'mouseover',
		mouseleave: 'mouseout',
		pointerenter: 'pointerover',
		pointerleave: 'pointerout'
	};
	Object.keys(mouseEventMap).forEach(function (eventName) {
		dom.registerCustomEvent(eventName, {
			delegate: true,
			handler: function handler(callback, event) {
				var related = event.relatedTarget;
				var target = event.delegateTarget;
				if (!related || related !== target && !target.contains(related)) {
					event.customType = eventName;
					return callback(event);
				}
			},
			originalEvent: mouseEventMap[eventName]
		});
	});

	var animationEventMap = {
		animation: 'animationend',
		transition: 'transitionend'
	};
	Object.keys(animationEventMap).forEach(function (eventType) {
		var eventName = animationEventMap[eventType];
		dom.registerCustomEvent(eventName, {
			event: true,
			delegate: true,
			handler: function handler(callback, event) {
				event.customType = eventName;
				return callback(event);
			},
			originalEvent: features.checkAnimationEventName()[eventType]
		});
	});
}).call(this);
'use strict';

(function () {
  var dom = this.Library.dom;
  var domData = this.Library.domData;
  var DomEventEmitterProxy = this.Library.DomEventEmitterProxy;
  var DomEventHandle = this.Library.DomEventHandle;
  var features = this.Library.features;
  var globalEval = this.Library.globalEval;
  var globalEvalStyles = this.Library.globalEvalStyles;
  this.Library.dom = dom;
  this.LibraryNamed.dom = this.LibraryNamed.dom || {};
  this.LibraryNamed.dom.dom = dom;
  this.LibraryNamed.dom.domData = domData;
  this.LibraryNamed.dom.DomEventEmitterProxy = DomEventEmitterProxy;
  this.LibraryNamed.dom.DomEventHandle = DomEventHandle;
  this.LibraryNamed.dom.features = features;
  this.LibraryNamed.dom.globalEval = globalEval;
  this.LibraryNamed.dom.globalEvalStyles = globalEvalStyles;
}).call(this);
/*!
 * Promises polyfill from Google's Closure Library.
 *
 *      Copyright 2013 The Closure Library Authors. All Rights Reserved.
 *
 * NOTE(eduardo): Promise support is not ready on all supported browsers,
 * therefore core.js is temporarily using Google's promises as polyfill. It
 * supports cancellable promises and has clean and fast implementation.
 */

'use strict';

(function () {
  var core = this.LibraryNamed.metal.core;
  var async = this.LibraryNamed.metal.async;

  /**
   * Provides a more strict interface for Thenables in terms of
   * http://promisesaplus.com for interop with {@see CancellablePromise}.
   *
   * @interface
   * @extends {IThenable.<TYPE>}
   * @template TYPE
   */

  var Thenable = function Thenable() {};

  /**
   * Adds callbacks that will operate on the result of the Thenable, returning a
   * new child Promise.
   *
   * If the Thenable is fulfilled, the {@code onFulfilled} callback will be
   * invoked with the fulfillment value as argument, and the child Promise will
   * be fulfilled with the return value of the callback. If the callback throws
   * an exception, the child Promise will be rejected with the thrown value
   * instead.
   *
   * If the Thenable is rejected, the {@code onRejected} callback will be invoked
   * with the rejection reason as argument, and the child Promise will be rejected
   * with the return value of the callback or thrown value.
   *
   * @param {?(function(this:THIS, TYPE):
   *             (RESULT|IThenable.<RESULT>|Thenable))=} opt_onFulfilled A
   *     function that will be invoked with the fulfillment value if the Promise
   *     is fullfilled.
   * @param {?(function(*): *)=} opt_onRejected A function that will be invoked
   *     with the rejection reason if the Promise is rejected.
   * @param {THIS=} opt_context An optional context object that will be the
   *     execution context for the callbacks. By default, functions are executed
   *     with the default this.
   * @return {!CancellablePromise.<RESULT>} A new Promise that will receive the
   *     result of the fulfillment or rejection callback.
   * @template RESULT,THIS
   */
  Thenable.prototype.then = function () {};

  /**
   * An expando property to indicate that an object implements
   * {@code Thenable}.
   *
   * {@see addImplementation}.
   *
   * @const
   */
  Thenable.IMPLEMENTED_BY_PROP = '$goog_Thenable';

  /**
   * Marks a given class (constructor) as an implementation of Thenable, so
   * that we can query that fact at runtime. The class must have already
   * implemented the interface.
   * Exports a 'then' method on the constructor prototype, so that the objects
   * also implement the extern {@see Thenable} interface for interop with
   * other Promise implementations.
   * @param {function(new:Thenable,...[?])} ctor The class constructor. The
   *     corresponding class must have already implemented the interface.
   */
  Thenable.addImplementation = function (ctor) {
    ctor.prototype.then = ctor.prototype.then;
    ctor.prototype.$goog_Thenable = true;
  };

  /**
   * @param {*} object
   * @return {boolean} Whether a given instance implements {@code Thenable}.
   *     The class/superclass of the instance must call {@code addImplementation}.
   */
  Thenable.isImplementedBy = function (object) {
    if (!object) {
      return false;
    }
    try {
      return !!object.$goog_Thenable;
    } catch (e) {
      // Property access seems to be forbidden.
      return false;
    }
  };

  /**
   * Like bind(), except that a 'this object' is not required. Useful when the
   * target function is already bound.
   *
   * Usage:
   * var g = partial(f, arg1, arg2);
   * g(arg3, arg4);
   *
   * @param {Function} fn A function to partially apply.
   * @param {...*} var_args Additional arguments that are partially applied to fn.
   * @return {!Function} A partially-applied form of the function bind() was
   *     invoked as a method of.
   */
  var partial = function partial(fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
      // Clone the array (with slice()) and append additional arguments
      // to the existing arguments.
      var newArgs = args.slice();
      newArgs.push.apply(newArgs, arguments);
      return fn.apply(this, newArgs);
    };
  };

  /**
   * Promises provide a result that may be resolved asynchronously. A Promise may
   * be resolved by being fulfilled or rejected with a value, which will be known
   * as the fulfillment value or the rejection reason. Whether fulfilled or
   * rejected, the Promise result is immutable once it is set.
   *
   * Promises may represent results of any type, including undefined. Rejection
   * reasons are typically Errors, but may also be of any type. Closure Promises
   * allow for optional type annotations that enforce that fulfillment values are
   * of the appropriate types at compile time.
   *
   * The result of a Promise is accessible by calling {@code then} and registering
   * {@code onFulfilled} and {@code onRejected} callbacks. Once the Promise
   * resolves, the relevant callbacks are invoked with the fulfillment value or
   * rejection reason as argument. Callbacks are always invoked in the order they
   * were registered, even when additional {@code then} calls are made from inside
   * another callback. A callback is always run asynchronously sometime after the
   * scope containing the registering {@code then} invocation has returned.
   *
   * If a Promise is resolved with another Promise, the first Promise will block
   * until the second is resolved, and then assumes the same result as the second
   * Promise. This allows Promises to depend on the results of other Promises,
   * linking together multiple asynchronous operations.
   *
   * This implementation is compatible with the Promises/A+ specification and
   * passes that specification's conformance test suite. A Closure Promise may be
   * resolved with a Promise instance (or sufficiently compatible Promise-like
   * object) created by other Promise implementations. From the specification,
   * Promise-like objects are known as "Thenables".
   *
   * @see http://promisesaplus.com/
   *
   * @param {function(
   *             this:RESOLVER_CONTEXT,
   *             function((TYPE|IThenable.<TYPE>|Thenable)),
   *             function(*)): void} resolver
   *     Initialization function that is invoked immediately with {@code resolve}
   *     and {@code reject} functions as arguments. The Promise is resolved or
   *     rejected with the first argument passed to either function.
   * @param {RESOLVER_CONTEXT=} opt_context An optional context for executing the
   *     resolver function. If unspecified, the resolver function will be executed
   *     in the default scope.
   * @constructor
   * @struct
   * @final
   * @implements {Thenable.<TYPE>}
   * @template TYPE,RESOLVER_CONTEXT
   */
  var CancellablePromise = function CancellablePromise(resolver, opt_context) {
    /**
     * The internal state of this Promise. Either PENDING, FULFILLED, REJECTED, or
     * BLOCKED.
     * @private {CancellablePromise.State_}
     */
    this.state_ = CancellablePromise.State_.PENDING;

    /**
     * The resolved result of the Promise. Immutable once set with either a
     * fulfillment value or rejection reason.
     * @private {*}
     */
    this.result_ = undefined;

    /**
     * For Promises created by calling {@code then()}, the originating parent.
     * @private {CancellablePromise}
     */
    this.parent_ = null;

    /**
     * The list of {@code onFulfilled} and {@code onRejected} callbacks added to
     * this Promise by calls to {@code then()}.
     * @private {Array.<CancellablePromise.CallbackEntry_>}
     */
    this.callbackEntries_ = null;

    /**
     * Whether the Promise is in the queue of Promises to execute.
     * @private {boolean}
     */
    this.executing_ = false;

    if (CancellablePromise.UNHANDLED_REJECTION_DELAY > 0) {
      /**
       * A timeout ID used when the {@code UNHANDLED_REJECTION_DELAY} is greater
       * than 0 milliseconds. The ID is set when the Promise is rejected, and
       * cleared only if an {@code onRejected} callback is invoked for the
       * Promise (or one of its descendants) before the delay is exceeded.
       *
       * If the rejection is not handled before the timeout completes, the
       * rejection reason is passed to the unhandled rejection handler.
       * @private {number}
       */
      this.unhandledRejectionId_ = 0;
    } else if (CancellablePromise.UNHANDLED_REJECTION_DELAY === 0) {
      /**
       * When the {@code UNHANDLED_REJECTION_DELAY} is set to 0 milliseconds, a
       * boolean that is set if the Promise is rejected, and reset to false if an
       * {@code onRejected} callback is invoked for the Promise (or one of its
       * descendants). If the rejection is not handled before the next timestep,
       * the rejection reason is passed to the unhandled rejection handler.
       * @private {boolean}
       */
      this.hadUnhandledRejection_ = false;
    }

    try {
      var self = this;
      resolver.call(opt_context, function (value) {
        self.resolve_(CancellablePromise.State_.FULFILLED, value);
      }, function (reason) {
        self.resolve_(CancellablePromise.State_.REJECTED, reason);
      });
    } catch (e) {
      this.resolve_(CancellablePromise.State_.REJECTED, e);
    }
  };

  /**
   * The delay in milliseconds before a rejected Promise's reason is passed to
   * the rejection handler. By default, the rejection handler rethrows the
   * rejection reason so that it appears in the developer console or
   * {@code window.onerror} handler.
   * Rejections are rethrown as quickly as possible by default. A negative value
   * disables rejection handling entirely.
   * @type {number}
   */
  CancellablePromise.UNHANDLED_REJECTION_DELAY = 0;

  /**
   * The possible internal states for a Promise. These states are not directly
   * observable to external callers.
   * @enum {number}
   * @private
   */
  CancellablePromise.State_ = {
    /** The Promise is waiting for resolution. */
    PENDING: 0,

    /** The Promise is blocked waiting for the result of another Thenable. */
    BLOCKED: 1,

    /** The Promise has been resolved with a fulfillment value. */
    FULFILLED: 2,

    /** The Promise has been resolved with a rejection reason. */
    REJECTED: 3
  };

  /**
   * Typedef for entries in the callback chain. Each call to {@code then},
   * {@code thenCatch}, or {@code thenAlways} creates an entry containing the
   * functions that may be invoked once the Promise is resolved.
   *
   * @typedef {{
   *   child: CancellablePromise,
   *   onFulfilled: function(*),
   *   onRejected: function(*)
   * }}
   * @private
   */
  CancellablePromise.CallbackEntry_ = null;

  /**
   * @param {(TYPE|Thenable.<TYPE>|Thenable)=} opt_value
   * @return {!CancellablePromise.<TYPE>} A new Promise that is immediately resolved
   *     with the given value.
   * @template TYPE
   */
  CancellablePromise.resolve = function (opt_value) {
    return new CancellablePromise(function (resolve) {
      resolve(opt_value);
    });
  };

  /**
   * @param {*=} opt_reason
   * @return {!CancellablePromise} A new Promise that is immediately rejected with the
   *     given reason.
   */
  CancellablePromise.reject = function (opt_reason) {
    return new CancellablePromise(function (resolve, reject) {
      reject(opt_reason);
    });
  };

  /**
   * @param {!Array.<!(Thenable.<TYPE>|Thenable)>} promises
   * @return {!CancellablePromise.<TYPE>} A Promise that receives the result of the
   *     first Promise (or Promise-like) input to complete.
   * @template TYPE
   */
  CancellablePromise.race = function (promises) {
    return new CancellablePromise(function (resolve, reject) {
      if (!promises.length) {
        resolve(undefined);
      }
      for (var i = 0, promise; promise = promises[i]; i++) {
        promise.then(resolve, reject);
      }
    });
  };

  /**
   * @param {!Array.<!(Thenable.<TYPE>|Thenable)>} promises
   * @return {!CancellablePromise.<!Array.<TYPE>>} A Promise that receives a list of
   *     every fulfilled value once every input Promise (or Promise-like) is
   *     successfully fulfilled, or is rejected by the first rejection result.
   * @template TYPE
   */
  CancellablePromise.all = function (promises) {
    return new CancellablePromise(function (resolve, reject) {
      var toFulfill = promises.length;
      var values = [];

      if (!toFulfill) {
        resolve(values);
        return;
      }

      var onFulfill = function onFulfill(index, value) {
        toFulfill--;
        values[index] = value;
        if (toFulfill === 0) {
          resolve(values);
        }
      };

      var onReject = function onReject(reason) {
        reject(reason);
      };

      for (var i = 0, promise; promise = promises[i]; i++) {
        promise.then(partial(onFulfill, i), onReject);
      }
    });
  };

  /**
   * @param {!Array.<!(Thenable.<TYPE>|Thenable)>} promises
   * @return {!CancellablePromise.<TYPE>} A Promise that receives the value of
   *     the first input to be fulfilled, or is rejected with a list of every
   *     rejection reason if all inputs are rejected.
   * @template TYPE
   */
  CancellablePromise.firstFulfilled = function (promises) {
    return new CancellablePromise(function (resolve, reject) {
      var toReject = promises.length;
      var reasons = [];

      if (!toReject) {
        resolve(undefined);
        return;
      }

      var onFulfill = function onFulfill(value) {
        resolve(value);
      };

      var onReject = function onReject(index, reason) {
        toReject--;
        reasons[index] = reason;
        if (toReject === 0) {
          reject(reasons);
        }
      };

      for (var i = 0, promise; promise = promises[i]; i++) {
        promise.then(onFulfill, partial(onReject, i));
      }
    });
  };

  /**
   * Adds callbacks that will operate on the result of the Promise, returning a
   * new child Promise.
   *
   * If the Promise is fulfilled, the {@code onFulfilled} callback will be invoked
   * with the fulfillment value as argument, and the child Promise will be
   * fulfilled with the return value of the callback. If the callback throws an
   * exception, the child Promise will be rejected with the thrown value instead.
   *
   * If the Promise is rejected, the {@code onRejected} callback will be invoked
   * with the rejection reason as argument, and the child Promise will be rejected
   * with the return value (or thrown value) of the callback.
   *
   * @override
   */
  CancellablePromise.prototype.then = function (opt_onFulfilled, opt_onRejected, opt_context) {
    return this.addChildPromise_(core.isFunction(opt_onFulfilled) ? opt_onFulfilled : null, core.isFunction(opt_onRejected) ? opt_onRejected : null, opt_context);
  };
  Thenable.addImplementation(CancellablePromise);

  /**
   * Adds a callback that will be invoked whether the Promise is fulfilled or
   * rejected. The callback receives no argument, and no new child Promise is
   * created. This is useful for ensuring that cleanup takes place after certain
   * asynchronous operations. Callbacks added with {@code thenAlways} will be
   * executed in the same order with other calls to {@code then},
   * {@code thenAlways}, or {@code thenCatch}.
   *
   * Since it does not produce a new child Promise, cancellation propagation is
   * not prevented by adding callbacks with {@code thenAlways}. A Promise that has
   * a cleanup handler added with {@code thenAlways} will be canceled if all of
   * its children created by {@code then} (or {@code thenCatch}) are canceled.
   *
   * @param {function(this:THIS): void} onResolved A function that will be invoked
   *     when the Promise is resolved.
   * @param {THIS=} opt_context An optional context object that will be the
   *     execution context for the callbacks. By default, functions are executed
   *     in the global scope.
   * @return {!CancellablePromise.<TYPE>} This Promise, for chaining additional calls.
   * @template THIS
   */
  CancellablePromise.prototype.thenAlways = function (onResolved, opt_context) {
    var callback = function callback() {
      try {
        // Ensure that no arguments are passed to onResolved.
        onResolved.call(opt_context);
      } catch (err) {
        CancellablePromise.handleRejection_.call(null, err);
      }
    };

    this.addCallbackEntry_({
      child: null,
      onRejected: callback,
      onFulfilled: callback
    });
    return this;
  };

  /**
   * Adds a callback that will be invoked only if the Promise is rejected. This
   * is equivalent to {@code then(null, onRejected)}.
   *
   * @param {!function(this:THIS, *): *} onRejected A function that will be
   *     invoked with the rejection reason if the Promise is rejected.
   * @param {THIS=} opt_context An optional context object that will be the
   *     execution context for the callbacks. By default, functions are executed
   *     in the global scope.
   * @return {!CancellablePromise} A new Promise that will receive the result of the
   *     callback.
   * @template THIS
   */
  CancellablePromise.prototype.thenCatch = function (onRejected, opt_context) {
    return this.addChildPromise_(null, onRejected, opt_context);
  };

  /**
   * Alias of {@link CancellablePromise.prototype.thenCatch}
   */
  CancellablePromise.prototype.catch = CancellablePromise.prototype.thenCatch;

  /**
   * Cancels the Promise if it is still pending by rejecting it with a cancel
   * Error. No action is performed if the Promise is already resolved.
   *
   * All child Promises of the canceled Promise will be rejected with the same
   * cancel error, as with normal Promise rejection. If the Promise to be canceled
   * is the only child of a pending Promise, the parent Promise will also be
   * canceled. Cancellation may propagate upward through multiple generations.
   *
   * @param {string=} opt_message An optional debugging message for describing the
   *     cancellation reason.
   */
  CancellablePromise.prototype.cancel = function (opt_message) {
    if (this.state_ === CancellablePromise.State_.PENDING) {
      async.run(function () {
        var err = new CancellablePromise.CancellationError(opt_message);
        err.IS_CANCELLATION_ERROR = true;
        this.cancelInternal_(err);
      }, this);
    }
  };

  /**
   * Cancels this Promise with the given error.
   *
   * @param {!Error} err The cancellation error.
   * @private
   */
  CancellablePromise.prototype.cancelInternal_ = function (err) {
    if (this.state_ === CancellablePromise.State_.PENDING) {
      if (this.parent_) {
        // Cancel the Promise and remove it from the parent's child list.
        this.parent_.cancelChild_(this, err);
      } else {
        this.resolve_(CancellablePromise.State_.REJECTED, err);
      }
    }
  };

  /**
   * Cancels a child Promise from the list of callback entries. If the Promise has
   * not already been resolved, reject it with a cancel error. If there are no
   * other children in the list of callback entries, propagate the cancellation
   * by canceling this Promise as well.
   *
   * @param {!CancellablePromise} childPromise The Promise to cancel.
   * @param {!Error} err The cancel error to use for rejecting the Promise.
   * @private
   */
  CancellablePromise.prototype.cancelChild_ = function (childPromise, err) {
    if (!this.callbackEntries_) {
      return;
    }
    var childCount = 0;
    var childIndex = -1;

    // Find the callback entry for the childPromise, and count whether there are
    // additional child Promises.
    for (var i = 0, entry; entry = this.callbackEntries_[i]; i++) {
      var child = entry.child;
      if (child) {
        childCount++;
        if (child === childPromise) {
          childIndex = i;
        }
        if (childIndex >= 0 && childCount > 1) {
          break;
        }
      }
    }

    // If the child Promise was the only child, cancel this Promise as well.
    // Otherwise, reject only the child Promise with the cancel error.
    if (childIndex >= 0) {
      if (this.state_ === CancellablePromise.State_.PENDING && childCount === 1) {
        this.cancelInternal_(err);
      } else {
        var callbackEntry = this.callbackEntries_.splice(childIndex, 1)[0];
        this.executeCallback_(callbackEntry, CancellablePromise.State_.REJECTED, err);
      }
    }
  };

  /**
   * Adds a callback entry to the current Promise, and schedules callback
   * execution if the Promise has already been resolved.
   *
   * @param {CancellablePromise.CallbackEntry_} callbackEntry Record containing
   *     {@code onFulfilled} and {@code onRejected} callbacks to execute after
   *     the Promise is resolved.
   * @private
   */
  CancellablePromise.prototype.addCallbackEntry_ = function (callbackEntry) {
    if ((!this.callbackEntries_ || !this.callbackEntries_.length) && (this.state_ === CancellablePromise.State_.FULFILLED || this.state_ === CancellablePromise.State_.REJECTED)) {
      this.scheduleCallbacks_();
    }
    if (!this.callbackEntries_) {
      this.callbackEntries_ = [];
    }
    this.callbackEntries_.push(callbackEntry);
  };

  /**
   * Creates a child Promise and adds it to the callback entry list. The result of
   * the child Promise is determined by the state of the parent Promise and the
   * result of the {@code onFulfilled} or {@code onRejected} callbacks as
   * specified in the Promise resolution procedure.
   *
   * @see http://promisesaplus.com/#the__method
   *
   * @param {?function(this:THIS, TYPE):
   *          (RESULT|CancellablePromise.<RESULT>|Thenable)} onFulfilled A callback that
   *     will be invoked if the Promise is fullfilled, or null.
   * @param {?function(this:THIS, *): *} onRejected A callback that will be
   *     invoked if the Promise is rejected, or null.
   * @param {THIS=} opt_context An optional execution context for the callbacks.
   *     in the default calling context.
   * @return {!CancellablePromise} The child Promise.
   * @template RESULT,THIS
   * @private
   */
  CancellablePromise.prototype.addChildPromise_ = function (onFulfilled, onRejected, opt_context) {

    var callbackEntry = {
      child: null,
      onFulfilled: null,
      onRejected: null
    };

    callbackEntry.child = new CancellablePromise(function (resolve, reject) {
      // Invoke onFulfilled, or resolve with the parent's value if absent.
      callbackEntry.onFulfilled = onFulfilled ? function (value) {
        try {
          var result = onFulfilled.call(opt_context, value);
          resolve(result);
        } catch (err) {
          reject(err);
        }
      } : resolve;

      // Invoke onRejected, or reject with the parent's reason if absent.
      callbackEntry.onRejected = onRejected ? function (reason) {
        try {
          var result = onRejected.call(opt_context, reason);
          if (!core.isDef(result) && reason.IS_CANCELLATION_ERROR) {
            // Propagate cancellation to children if no other result is returned.
            reject(reason);
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(err);
        }
      } : reject;
    });

    callbackEntry.child.parent_ = this;
    this.addCallbackEntry_(
    /** @type {CancellablePromise.CallbackEntry_} */callbackEntry);
    return callbackEntry.child;
  };

  /**
   * Unblocks the Promise and fulfills it with the given value.
   *
   * @param {TYPE} value
   * @private
   */
  CancellablePromise.prototype.unblockAndFulfill_ = function (value) {
    if (this.state_ !== CancellablePromise.State_.BLOCKED) {
      throw new Error('CancellablePromise is not blocked.');
    }
    this.state_ = CancellablePromise.State_.PENDING;
    this.resolve_(CancellablePromise.State_.FULFILLED, value);
  };

  /**
   * Unblocks the Promise and rejects it with the given rejection reason.
   *
   * @param {*} reason
   * @private
   */
  CancellablePromise.prototype.unblockAndReject_ = function (reason) {
    if (this.state_ !== CancellablePromise.State_.BLOCKED) {
      throw new Error('CancellablePromise is not blocked.');
    }
    this.state_ = CancellablePromise.State_.PENDING;
    this.resolve_(CancellablePromise.State_.REJECTED, reason);
  };

  /**
   * Attempts to resolve a Promise with a given resolution state and value. This
   * is a no-op if the given Promise has already been resolved.
   *
   * If the given result is a Thenable (such as another Promise), the Promise will
   * be resolved with the same state and result as the Thenable once it is itself
   * resolved.
   *
   * If the given result is not a Thenable, the Promise will be fulfilled or
   * rejected with that result based on the given state.
   *
   * @see http://promisesaplus.com/#the_promise_resolution_procedure
   *
   * @param {CancellablePromise.State_} state
   * @param {*} x The result to apply to the Promise.
   * @private
   */
  CancellablePromise.prototype.resolve_ = function (state, x) {
    if (this.state_ !== CancellablePromise.State_.PENDING) {
      return;
    }

    if (this === x) {
      state = CancellablePromise.State_.REJECTED;
      x = new TypeError('CancellablePromise cannot resolve to itself');
    } else if (Thenable.isImplementedBy(x)) {
      x = /** @type {!Thenable} */x;
      this.state_ = CancellablePromise.State_.BLOCKED;
      x.then(this.unblockAndFulfill_, this.unblockAndReject_, this);
      return;
    } else if (core.isObject(x)) {
      try {
        var then = x.then;
        if (core.isFunction(then)) {
          this.tryThen_(x, then);
          return;
        }
      } catch (e) {
        state = CancellablePromise.State_.REJECTED;
        x = e;
      }
    }

    this.result_ = x;
    this.state_ = state;
    this.scheduleCallbacks_();

    if (state === CancellablePromise.State_.REJECTED && !x.IS_CANCELLATION_ERROR) {
      CancellablePromise.addUnhandledRejection_(this, x);
    }
  };

  /**
   * Attempts to call the {@code then} method on an object in the hopes that it is
   * a Promise-compatible instance. This allows interoperation between different
   * Promise implementations, however a non-compliant object may cause a Promise
   * to hang indefinitely. If the {@code then} method throws an exception, the
   * dependent Promise will be rejected with the thrown value.
   *
   * @see http://promisesaplus.com/#point-70
   *
   * @param {Thenable} thenable An object with a {@code then} method that may be
   *     compatible with the Promise/A+ specification.
   * @param {!Function} then The {@code then} method of the Thenable object.
   * @private
   */
  CancellablePromise.prototype.tryThen_ = function (thenable, then) {
    this.state_ = CancellablePromise.State_.BLOCKED;
    var promise = this;
    var called = false;

    var resolve = function resolve(value) {
      if (!called) {
        called = true;
        promise.unblockAndFulfill_(value);
      }
    };

    var reject = function reject(reason) {
      if (!called) {
        called = true;
        promise.unblockAndReject_(reason);
      }
    };

    try {
      then.call(thenable, resolve, reject);
    } catch (e) {
      reject(e);
    }
  };

  /**
   * Executes the pending callbacks of a resolved Promise after a timeout.
   *
   * Section 2.2.4 of the Promises/A+ specification requires that Promise
   * callbacks must only be invoked from a call stack that only contains Promise
   * implementation code, which we accomplish by invoking callback execution after
   * a timeout. If {@code startExecution_} is called multiple times for the same
   * Promise, the callback chain will be evaluated only once. Additional callbacks
   * may be added during the evaluation phase, and will be executed in the same
   * event loop.
   *
   * All Promises added to the waiting list during the same browser event loop
   * will be executed in one batch to avoid using a separate timeout per Promise.
   *
   * @private
   */
  CancellablePromise.prototype.scheduleCallbacks_ = function () {
    if (!this.executing_) {
      this.executing_ = true;
      async.run(this.executeCallbacks_, this);
    }
  };

  /**
   * Executes all pending callbacks for this Promise.
   *
   * @private
   */
  CancellablePromise.prototype.executeCallbacks_ = function () {
    while (this.callbackEntries_ && this.callbackEntries_.length) {
      var entries = this.callbackEntries_;
      this.callbackEntries_ = [];

      for (var i = 0; i < entries.length; i++) {
        this.executeCallback_(entries[i], this.state_, this.result_);
      }
    }
    this.executing_ = false;
  };

  /**
   * Executes a pending callback for this Promise. Invokes an {@code onFulfilled}
   * or {@code onRejected} callback based on the resolved state of the Promise.
   *
   * @param {!CancellablePromise.CallbackEntry_} callbackEntry An entry containing the
   *     onFulfilled and/or onRejected callbacks for this step.
   * @param {CancellablePromise.State_} state The resolution status of the Promise,
   *     either FULFILLED or REJECTED.
   * @param {*} result The resolved result of the Promise.
   * @private
   */
  CancellablePromise.prototype.executeCallback_ = function (callbackEntry, state, result) {
    if (state === CancellablePromise.State_.FULFILLED) {
      callbackEntry.onFulfilled(result);
    } else {
      this.removeUnhandledRejection_();
      callbackEntry.onRejected(result);
    }
  };

  /**
   * Marks this rejected Promise as having being handled. Also marks any parent
   * Promises in the rejected state as handled. The rejection handler will no
   * longer be invoked for this Promise (if it has not been called already).
   *
   * @private
   */
  CancellablePromise.prototype.removeUnhandledRejection_ = function () {
    var p;
    if (CancellablePromise.UNHANDLED_REJECTION_DELAY > 0) {
      for (p = this; p && p.unhandledRejectionId_; p = p.parent_) {
        clearTimeout(p.unhandledRejectionId_);
        p.unhandledRejectionId_ = 0;
      }
    } else if (CancellablePromise.UNHANDLED_REJECTION_DELAY === 0) {
      for (p = this; p && p.hadUnhandledRejection_; p = p.parent_) {
        p.hadUnhandledRejection_ = false;
      }
    }
  };

  /**
   * Marks this rejected Promise as unhandled. If no {@code onRejected} callback
   * is called for this Promise before the {@code UNHANDLED_REJECTION_DELAY}
   * expires, the reason will be passed to the unhandled rejection handler. The
   * handler typically rethrows the rejection reason so that it becomes visible in
   * the developer console.
   *
   * @param {!CancellablePromise} promise The rejected Promise.
   * @param {*} reason The Promise rejection reason.
   * @private
   */
  CancellablePromise.addUnhandledRejection_ = function (promise, reason) {
    if (CancellablePromise.UNHANDLED_REJECTION_DELAY > 0) {
      promise.unhandledRejectionId_ = setTimeout(function () {
        CancellablePromise.handleRejection_.call(null, reason);
      }, CancellablePromise.UNHANDLED_REJECTION_DELAY);
    } else if (CancellablePromise.UNHANDLED_REJECTION_DELAY === 0) {
      promise.hadUnhandledRejection_ = true;
      async.run(function () {
        if (promise.hadUnhandledRejection_) {
          CancellablePromise.handleRejection_.call(null, reason);
        }
      });
    }
  };

  /**
   * A method that is invoked with the rejection reasons for Promises that are
   * rejected but have no {@code onRejected} callbacks registered yet.
   * @type {function(*)}
   * @private
   */
  CancellablePromise.handleRejection_ = async.throwException;

  /**
   * Sets a handler that will be called with reasons from unhandled rejected
   * Promises. If the rejected Promise (or one of its descendants) has an
   * {@code onRejected} callback registered, the rejection will be considered
   * handled, and the rejection handler will not be called.
   *
   * By default, unhandled rejections are rethrown so that the error may be
   * captured by the developer console or a {@code window.onerror} handler.
   *
   * @param {function(*)} handler A function that will be called with reasons from
   *     rejected Promises. Defaults to {@code async.throwException}.
   */
  CancellablePromise.setUnhandledRejectionHandler = function (handler) {
    CancellablePromise.handleRejection_ = handler;
  };

  /**
   * Error used as a rejection reason for canceled Promises.
   *
   * @param {string=} opt_message
   * @constructor
   * @extends {Error}
   * @final
   */
  CancellablePromise.CancellationError = function (_Error) {
    babelHelpers.inherits(_class, _Error);

    function _class(opt_message) {
      babelHelpers.classCallCheck(this, _class);

      var _this = babelHelpers.possibleConstructorReturn(this, _Error.call(this, opt_message));

      if (opt_message) {
        _this.message = opt_message;
      }
      return _this;
    }

    return _class;
  }(Error);

  /** @override */
  CancellablePromise.CancellationError.prototype.name = 'cancel';

  this.LibraryNamed.Promise = this.LibraryNamed.Promise || {};
  this.LibraryNamed.Promise.CancellablePromise = CancellablePromise;
  this.Library.Promise = CancellablePromise;
}).call(this);
"use strict";

(function () {
	var globals = {
		document: document,
		window: window
	};

	this.Library.globals = globals;
}).call(this);
'use strict';

/**
 * Parses the given uri string into an object.
 * @param {*=} opt_uri Optional string URI to parse
 */

(function () {
	function parseFromAnchor(opt_uri) {
		var link = document.createElement('a');
		link.href = opt_uri;
		return {
			hash: link.hash,
			hostname: link.hostname,
			password: link.password,
			pathname: link.pathname[0] === '/' ? link.pathname : '/' + link.pathname,
			port: link.port,
			protocol: link.protocol,
			search: link.search,
			username: link.username
		};
	}

	this.Library.parseFromAnchor = parseFromAnchor;
}).call(this);
'use strict';

(function () {
	var core = this.LibraryNamed.metal.core;
	var parseFromAnchor = this.Library.parseFromAnchor;

	/**
  * Parses the given uri string into an object. The URL function will be used
  * when present, otherwise we'll fall back to the anchor node element.
  * @param {*=} opt_uri Optional string URI to parse
  */

	function parse(opt_uri) {
		if (core.isFunction(URL) && URL.length) {
			return new URL(opt_uri);
		} else {
			return parseFromAnchor(opt_uri);
		}
	}

	this.Library.parse = parse;
}).call(this);
'use strict';

(function () {
	var Disposable = this.LibraryNamed.metal.Disposable;

	/**
  * A cached reference to the create function.
  */

	var create = Object.create;

	/**
  * Case insensitive string Multimap implementation. Allows multiple values for
  * the same key name.
  * @extends {Disposable}
  */

	var MultiMap = function (_Disposable) {
		babelHelpers.inherits(MultiMap, _Disposable);

		function MultiMap() {
			babelHelpers.classCallCheck(this, MultiMap);

			var _this = babelHelpers.possibleConstructorReturn(this, _Disposable.call(this));

			_this.keys = create(null);
			_this.values = create(null);
			return _this;
		}

		/**
   * Adds value to a key name.
   * @param {string} name
   * @param {*} value
   * @chainable
   */


		MultiMap.prototype.add = function add(name, value) {
			this.keys[name.toLowerCase()] = name;
			this.values[name.toLowerCase()] = this.values[name.toLowerCase()] || [];
			this.values[name.toLowerCase()].push(value);
			return this;
		};

		/**
   * Clears map names and values.
   * @chainable
   */


		MultiMap.prototype.clear = function clear() {
			this.keys = create(null);
			this.values = create(null);
			return this;
		};

		/**
   * Checks if map contains a value to the key name.
   * @param {string} name
   * @return {boolean}
   * @chainable
   */


		MultiMap.prototype.contains = function contains(name) {
			return name.toLowerCase() in this.values;
		};

		/**
   * @inheritDoc
   */


		MultiMap.prototype.disposeInternal = function disposeInternal() {
			this.values = null;
		};

		/**
   * Gets the first added value from a key name.
   * @param {string} name
   * @return {*}
   * @chainable
   */


		MultiMap.prototype.get = function get(name) {
			var values = this.values[name.toLowerCase()];
			if (values) {
				return values[0];
			}
		};

		/**
   * Gets all values from a key name.
   * @param {string} name
   * @return {Array.<*>}
   */


		MultiMap.prototype.getAll = function getAll(name) {
			return this.values[name.toLowerCase()];
		};

		/**
   * Returns true if the map is empty, false otherwise.
   * @return {boolean}
   */


		MultiMap.prototype.isEmpty = function isEmpty() {
			return this.size() === 0;
		};

		/**
   * Gets array of key names.
   * @return {Array.<string>}
   */


		MultiMap.prototype.names = function names() {
			var _this2 = this;

			return Object.keys(this.values).map(function (key) {
				return _this2.keys[key];
			});
		};

		/**
   * Removes all values from a key name.
   * @param {string} name
   * @chainable
   */


		MultiMap.prototype.remove = function remove(name) {
			delete this.keys[name.toLowerCase()];
			delete this.values[name.toLowerCase()];
			return this;
		};

		/**
   * Sets the value of a key name. Relevant to replace the current values with
   * a new one.
   * @param {string} name
   * @param {*} value
   * @chainable
   */


		MultiMap.prototype.set = function set(name, value) {
			this.keys[name.toLowerCase()] = name;
			this.values[name.toLowerCase()] = [value];
			return this;
		};

		/**
   * Gets the size of the map key names.
   * @return {number}
   */


		MultiMap.prototype.size = function size() {
			return this.names().length;
		};

		/**
   * Returns the parsed values as a string.
   * @return {string}
   */


		MultiMap.prototype.toString = function toString() {
			return JSON.stringify(this.values);
		};

		return MultiMap;
	}(Disposable);

	this.Library.MultiMap = MultiMap;
}).call(this);
'use strict';

(function () {
	var core = this.LibraryNamed.metal.core;
	var string = this.LibraryNamed.metal.string;
	var parse = this.Library.parse;
	var MultiMap = this.Library.MultiMap;


	var parseFn_ = parse;

	var Uri = function () {

		/**
   * This class contains setters and getters for the parts of the URI.
   * The following figure displays an example URIs and their component parts.
   *
   *                                  path
   *	                             ┌───┴────┐
   *	  abc://example.com:123/path/data?key=value#fragid1
   *	  └┬┘   └────┬────┘ └┬┘           └───┬───┘ └──┬──┘
   * protocol  hostname  port            search    hash
   *          └──────┬───────┘
   *                host
   *
   * @param {*=} opt_uri Optional string URI to parse
   * @constructor
   */
		function Uri() {
			var opt_uri = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
			babelHelpers.classCallCheck(this, Uri);

			this.url = Uri.parse(this.maybeAddProtocolAndHostname_(opt_uri));
		}

		/**
   * Adds parameters to uri from a <code>MultiMap</code> as source.
   * @param {MultiMap} multimap The <code>MultiMap</code> containing the
   *   parameters.
   * @protected
   * @chainable
   */


		Uri.prototype.addParametersFromMultiMap = function addParametersFromMultiMap(multimap) {
			var _this = this;

			multimap.names().forEach(function (name) {
				multimap.getAll(name).forEach(function (value) {
					_this.addParameterValue(name, value);
				});
			});
			return this;
		};

		/**
   * Adds the value of the named query parameters.
   * @param {string} key The parameter to set.
   * @param {*} value The new value. Will be explicitly casted to String.
   * @chainable
   */


		Uri.prototype.addParameterValue = function addParameterValue(name, value) {
			this.ensureQueryInitialized_();
			if (core.isDef(value)) {
				value = String(value);
			}
			this.query.add(name, value);
			return this;
		};

		/**
   * Adds the values of the named query parameter.
   * @param {string} key The parameter to set.
   * @param {*} value The new value.
   * @chainable
   */


		Uri.prototype.addParameterValues = function addParameterValues(name, values) {
			var _this2 = this;

			values.forEach(function (value) {
				return _this2.addParameterValue(name, value);
			});
			return this;
		};

		/**
   * Ensures query internal map is initialized and synced with initial value
   * extracted from URI search part.
   * @protected
   */


		Uri.prototype.ensureQueryInitialized_ = function ensureQueryInitialized_() {
			var _this3 = this;

			if (this.query) {
				return;
			}
			this.query = new MultiMap();
			var search = this.url.search;
			if (search) {
				search.substring(1).split('&').forEach(function (param) {
					var _param$split = param.split('=');

					var _param$split2 = babelHelpers.slicedToArray(_param$split, 2);

					var key = _param$split2[0];
					var value = _param$split2[1];

					if (core.isDef(value)) {
						value = Uri.urlDecode(value);
					}
					_this3.addParameterValue(key, value);
				});
			}
		};

		/**
   * Gets the hash part of uri.
   * @return {string}
   */


		Uri.prototype.getHash = function getHash() {
			return this.url.hash || '';
		};

		/**
   * Gets the host part of uri. E.g. <code>[hostname]:[port]</code>.
   * @return {string}
   */


		Uri.prototype.getHost = function getHost() {
			var host = this.getHostname();
			if (host) {
				var port = this.getPort();
				if (port && port !== '80') {
					host += ':' + port;
				}
			}
			return host;
		};

		/**
   * Gets the hostname part of uri without protocol and port.
   * @return {string}
   */


		Uri.prototype.getHostname = function getHostname() {
			var hostname = this.url.hostname;
			if (hostname === Uri.HOSTNAME_PLACEHOLDER) {
				return '';
			}
			return hostname;
		};

		/**
   * Gets the origin part of uri. E.g. <code>http://[hostname]:[port]</code>.
   * @return {string}
   */


		Uri.prototype.getOrigin = function getOrigin() {
			var host = this.getHost();
			if (host) {
				return this.getProtocol() + '//' + host;
			}
			return '';
		};

		/**
   * Returns the first value for a given parameter or undefined if the given
   * parameter name does not appear in the query string.
   * @param {string} paramName Unescaped parameter name.
   * @return {string|undefined} The first value for a given parameter or
   *   undefined if the given parameter name does not appear in the query
   *   string.
   */


		Uri.prototype.getParameterValue = function getParameterValue(name) {
			this.ensureQueryInitialized_();
			return this.query.get(name);
		};

		/**
   * Returns the value<b>s</b> for a given parameter as a list of decoded
   * query parameter values.
   * @param {string} name The parameter to get values for.
   * @return {!Array<?>} The values for a given parameter as a list of decoded
   *   query parameter values.
   */


		Uri.prototype.getParameterValues = function getParameterValues(name) {
			this.ensureQueryInitialized_();
			return this.query.getAll(name);
		};

		/**
   * Returns the name<b>s</b> of the parameters.
   * @return {!Array<string>} The names for the parameters as a list of
   *   strings.
   */


		Uri.prototype.getParameterNames = function getParameterNames() {
			this.ensureQueryInitialized_();
			return this.query.names();
		};

		/**
   * Gets the function currently being used to parse URIs.
   * @return {!function()}
   */


		Uri.getParseFn = function getParseFn() {
			return parseFn_;
		};

		/**
   * Gets the pathname part of uri.
   * @return {string}
   */


		Uri.prototype.getPathname = function getPathname() {
			return this.url.pathname;
		};

		/**
   * Gets the port number part of uri as string.
   * @return {string}
   */


		Uri.prototype.getPort = function getPort() {
			return this.url.port;
		};

		/**
   * Gets the protocol part of uri. E.g. <code>http:</code>.
   * @return {string}
   */


		Uri.prototype.getProtocol = function getProtocol() {
			return this.url.protocol;
		};

		/**
   * Gets the search part of uri. Search value is retrieved from query
   * parameters.
   * @return {string}
   */


		Uri.prototype.getSearch = function getSearch() {
			var _this4 = this;

			var search = '';
			var querystring = '';
			this.getParameterNames().forEach(function (name) {
				_this4.getParameterValues(name).forEach(function (value) {
					querystring += name;
					if (core.isDef(value)) {
						querystring += '=' + encodeURIComponent(value);
					}
					querystring += '&';
				});
			});
			querystring = querystring.slice(0, -1);
			if (querystring) {
				search += '?' + querystring;
			}
			return search;
		};

		/**
   * Checks if uri contains the parameter.
   * @param {string} name
   * @return {boolean}
   */


		Uri.prototype.hasParameter = function hasParameter(name) {
			this.ensureQueryInitialized_();
			return this.query.contains(name);
		};

		/**
   * Makes this URL unique by adding a random param to it. Useful for avoiding
   * cache.
   */


		Uri.prototype.makeUnique = function makeUnique() {
			this.setParameterValue(Uri.RANDOM_PARAM, string.getRandomString());
			return this;
		};

		/**
   * Maybe adds protocol and a hostname placeholder on a parial URI if needed.
   * Relevent for compatibility with <code>URL</code> native object.
   * @param {string=} opt_uri
   * @return {string} URI with protocol and hostname placeholder.
   */


		Uri.prototype.maybeAddProtocolAndHostname_ = function maybeAddProtocolAndHostname_(opt_uri) {
			var url = opt_uri;
			if (opt_uri.indexOf('://') === -1 && opt_uri.indexOf('javascript:') !== 0) {
				// jshint ignore:line

				url = Uri.DEFAULT_PROTOCOL;
				if (opt_uri[0] !== '/' || opt_uri[1] !== '/') {
					url += '//';
				}

				switch (opt_uri.charAt(0)) {
					case '.':
					case '?':
					case '#':
						url += Uri.HOSTNAME_PLACEHOLDER;
						url += '/';
						url += opt_uri;
						break;
					case '':
					case '/':
						if (opt_uri[1] !== '/') {
							url += Uri.HOSTNAME_PLACEHOLDER;
						}
						url += opt_uri;
						break;
					default:
						url += opt_uri;
				}
			}
			return url;
		};

		/**
   * Normalizes the parsed object to be in the expected standard.
   * @param {!Object}
   */


		Uri.normalizeObject = function normalizeObject(parsed) {
			var length = parsed.pathname ? parsed.pathname.length : 0;
			if (length > 1 && parsed.pathname[length - 1] === '/') {
				parsed.pathname = parsed.pathname.substr(0, length - 1);
			}
			return parsed;
		};

		/**
   * Parses the given uri string into an object.
   * @param {*=} opt_uri Optional string URI to parse
   */


		Uri.parse = function parse(opt_uri) {
			return Uri.normalizeObject(parseFn_(opt_uri));
		};

		/**
   * Removes the named query parameter.
   * @param {string} name The parameter to remove.
   * @chainable
   */


		Uri.prototype.removeParameter = function removeParameter(name) {
			this.ensureQueryInitialized_();
			this.query.remove(name);
			return this;
		};

		/**
   * Removes uniqueness parameter of the uri.
   * @chainable
   */


		Uri.prototype.removeUnique = function removeUnique() {
			this.removeParameter(Uri.RANDOM_PARAM);
			return this;
		};

		/**
   * Sets the hash.
   * @param {string} hash
   * @chainable
   */


		Uri.prototype.setHash = function setHash(hash) {
			this.url.hash = hash;
			return this;
		};

		/**
   * Sets the hostname.
   * @param {string} hostname
   * @chainable
   */


		Uri.prototype.setHostname = function setHostname(hostname) {
			this.url.hostname = hostname;
			return this;
		};

		/**
   * Sets the value of the named query parameters, clearing previous values
   * for that key.
   * @param {string} key The parameter to set.
   * @param {*} value The new value.
   * @chainable
   */


		Uri.prototype.setParameterValue = function setParameterValue(name, value) {
			this.removeParameter(name);
			this.addParameterValue(name, value);
			return this;
		};

		/**
   * Sets the values of the named query parameters, clearing previous values
   * for that key.
   * @param {string} key The parameter to set.
   * @param {*} value The new value.
   * @chainable
   */


		Uri.prototype.setParameterValues = function setParameterValues(name, values) {
			var _this5 = this;

			this.removeParameter(name);
			values.forEach(function (value) {
				return _this5.addParameterValue(name, value);
			});
			return this;
		};

		/**
   * Sets the pathname.
   * @param {string} pathname
   * @chainable
   */


		Uri.prototype.setPathname = function setPathname(pathname) {
			this.url.pathname = pathname;
			return this;
		};

		/**
   * Sets the port number.
   * @param {*} port Port number.
   * @chainable
   */


		Uri.prototype.setPort = function setPort(port) {
			this.url.port = port;
			return this;
		};

		/**
   * Sets the function that will be used for parsing the original string uri
   * into an object.
   * @param {!function()} parseFn
   */


		Uri.setParseFn = function setParseFn(parseFn) {
			parseFn_ = parseFn;
		};

		/**
   * Sets the protocol. If missing <code>http:</code> is used as default.
   * @param {string} protocol
   * @chainable
   */


		Uri.prototype.setProtocol = function setProtocol(protocol) {
			this.url.protocol = protocol;
			if (this.url.protocol[this.url.protocol.length - 1] !== ':') {
				this.url.protocol += ':';
			}
			return this;
		};

		/**
   * @return {string} The string form of the url.
   * @override
   */


		Uri.prototype.toString = function toString() {
			var href = '';
			var host = this.getHost();
			if (host) {
				href += this.getProtocol() + '//';
			}
			href += host + this.getPathname() + this.getSearch() + this.getHash();
			return href;
		};

		/**
   * Joins the given paths.
   * @param {string} basePath
   * @param {...string} ...paths Any number of paths to be joined with the base url.
   * @static
   */


		Uri.joinPaths = function joinPaths(basePath) {
			for (var _len = arguments.length, paths = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				paths[_key - 1] = arguments[_key];
			}

			if (basePath.charAt(basePath.length - 1) === '/') {
				basePath = basePath.substring(0, basePath.length - 1);
			}
			paths = paths.map(function (path) {
				return path.charAt(0) === '/' ? path.substring(1) : path;
			});
			return [basePath].concat(paths).join('/').replace(/\/$/, '');
		};

		/**
   * URL-decodes the string. We need to specially handle '+'s because
   * the javascript library doesn't convert them to spaces.
   * @param {string} str The string to url decode.
   * @return {string} The decoded {@code str}.
   */


		Uri.urlDecode = function urlDecode(str) {
			return decodeURIComponent(str.replace(/\+/g, ' '));
		};

		return Uri;
	}();

	/**
  * Default protocol value.
  * @type {string}
  * @default http:
  * @static
  */


	Uri.DEFAULT_PROTOCOL = 'http:';

	/**
  * Hostname placeholder. Relevant to internal usage only.
  * @type {string}
  * @static
  */
	Uri.HOSTNAME_PLACEHOLDER = 'hostname' + Date.now();

	/**
  * Name used by the param generated by `makeUnique`.
  * @type {string}
  * @static
  */
	Uri.RANDOM_PARAM = 'zx';

	this.Library.Uri = Uri;
}).call(this);
'use strict';

(function () {
	var globals = this.Library.globals;
	var Uri = this.Library.Uri;

	/**
  * A collection of static utility functions.
  * @const
  */

	var utils = function () {
		function utils() {
			babelHelpers.classCallCheck(this, utils);
		}

		/**
   * Copies attributes form source node to target node.
   * @return {void}
   * @static
   */
		utils.copyNodeAttributes = function copyNodeAttributes(source, target) {
			Array.prototype.slice.call(source.attributes).forEach(function (attribute) {
				return target.setAttribute(attribute.name, attribute.value);
			});
		};

		/**
   * Gets the current browser path including hashbang.
   * @return {!string}
   * @static
   */


		utils.getCurrentBrowserPath = function getCurrentBrowserPath() {
			return this.getCurrentBrowserPathWithoutHash() + globals.window.location.hash;
		};

		/**
   * Gets the current browser path excluding hashbang.
   * @return {!string}
   * @static
   */


		utils.getCurrentBrowserPathWithoutHash = function getCurrentBrowserPathWithoutHash() {
			return globals.window.location.pathname + globals.window.location.search;
		};

		/**
   * Extracts the path part of an url.
   * @return {!string}
   * @static
   */


		utils.getUrlPath = function getUrlPath(url) {
			var uri = new Uri(url);
			return uri.getPathname() + uri.getSearch() + uri.getHash();
		};

		/**
   * Extracts the path part of an url without hashbang.
   * @return {!string}
   * @static
   */


		utils.getUrlPathWithoutHash = function getUrlPathWithoutHash(url) {
			var uri = new Uri(url);
			return uri.getPathname() + uri.getSearch();
		};

		/**
   * Checks if url is in the same browser current url excluding the hashbang.
   * @param  {!string} url
   * @return {boolean}
   * @static
   */


		utils.isCurrentBrowserPath = function isCurrentBrowserPath(url) {
			if (url) {
				return utils.getUrlPathWithoutHash(url) === this.getCurrentBrowserPathWithoutHash();
			}
			return false;
		};

		/**
   * Returns true if HTML5 History api is supported.
   * @return {boolean}
   * @static
   */


		utils.isHtml5HistorySupported = function isHtml5HistorySupported() {
			return !!(globals.window.history && globals.window.history.pushState);
		};

		/**
   * Removes all attributes form node.
   * @return {void}
   * @static
   */


		utils.clearNodeAttributes = function clearNodeAttributes(node) {
			Array.prototype.slice.call(node.attributes).forEach(function (attribute) {
				return node.removeAttribute(attribute.name);
			});
		};

		return utils;
	}();

	this.Library.utils = utils;
}).call(this);
'use strict';

(function () {
	var core = this.LibraryNamed.metal.core;

	var Route = function () {

		/**
   * Route class.
   * @param {!string|RegExp|Function} path
   * @param {!Function} handler
   * @constructor
   */
		function Route(path, handler) {
			babelHelpers.classCallCheck(this, Route);

			if (!core.isDefAndNotNull(path)) {
				throw new Error('Route path not specified.');
			}
			if (!core.isFunction(handler)) {
				throw new Error('Route handler is not a function.');
			}

			/**
    * Defines the handler which will execute once a URL in the application
    * matches the path.
    * @type {!Function}
    * @protected
    */
			this.handler = handler;

			/**
    * Defines the path which will trigger the route handler.
    * @type {!string|RegExp|Function}
    * @protected
    */
			this.path = path;
		}

		/**
   * Gets the route handler.
   * @return {!Function}
   */


		Route.prototype.getHandler = function getHandler() {
			return this.handler;
		};

		/**
   * Gets the route path.
   * @return {!string|RegExp|Function}
   */


		Route.prototype.getPath = function getPath() {
			return this.path;
		};

		/**
   * Matches if the router can handle the tested path.
   * @param {!string} value Path to test and may contains the querystring
   *     part.
   * @return {Boolean} Returns true if matches any route.
   */


		Route.prototype.matchesPath = function matchesPath(value) {
			var path = this.path;

			if (core.isString(path)) {
				return value === path;
			}
			if (core.isFunction(path)) {
				return path(value);
			}
			if (path instanceof RegExp) {
				return value.search(path) > -1;
			}

			return false;
		};

		return Route;
	}();

	this.Library.Route = Route;
}).call(this);
'use strict';

(function () {
	var Disposable = this.LibraryNamed.metal.Disposable;

	var Cacheable = function (_Disposable) {
		babelHelpers.inherits(Cacheable, _Disposable);

		/**
   * Abstract class for defining cacheable behavior.
   * @constructor
   */
		function Cacheable() {
			babelHelpers.classCallCheck(this, Cacheable);

			/**
    * Holds the cached data.
    * @type {!Object}
    * @default null
    * @protected
    */
			var _this = babelHelpers.possibleConstructorReturn(this, _Disposable.call(this));

			_this.cache = null;

			/**
    * Holds whether class is cacheable.
    * @type {boolean}
    * @default false
    * @protected
    */
			_this.cacheable = false;
			return _this;
		}

		/**
   * Adds content to the cache.
   * @param {string} content Content to be cached.
   * @chainable
   */


		Cacheable.prototype.addCache = function addCache(content) {
			if (this.cacheable) {
				this.cache = content;
			}
			return this;
		};

		/**
   * Clears the cache.
   * @chainable
   */


		Cacheable.prototype.clearCache = function clearCache() {
			this.cache = null;
			return this;
		};

		/**
   * Disposes of this instance's object references.
   * @override
   */


		Cacheable.prototype.disposeInternal = function disposeInternal() {
			this.clearCache();
		};

		/**
   * Gets the cached content.
   * @return {Object} Cached content.
   * @protected
   */


		Cacheable.prototype.getCache = function getCache() {
			return this.cache;
		};

		/**
   * Whether the class is cacheable.
   * @return {boolean} Returns true when class is cacheable, false otherwise.
   */


		Cacheable.prototype.isCacheable = function isCacheable() {
			return this.cacheable;
		};

		/**
   * Sets whether the class is cacheable.
   * @param {boolean} cacheable
   */


		Cacheable.prototype.setCacheable = function setCacheable(cacheable) {
			if (!cacheable) {
				this.clearCache();
			}
			this.cacheable = cacheable;
		};

		return Cacheable;
	}(Disposable);

	this.Library.Cacheable = Cacheable;
}).call(this);
'use strict';

(function () {
	var core = this.LibraryNamed.metal.core;
	var globalEval = this.LibraryNamed.dom.globalEval;
	var Cacheable = this.Library.Cacheable;
	var CancellablePromise = this.Library.Promise;

	var Screen = function (_Cacheable) {
		babelHelpers.inherits(Screen, _Cacheable);

		/**
   * Screen class is a special type of route handler that provides helper
   * utilities that adds lifecycle and methods to provide content to each
   * registered surface.
   * @constructor
   * @extends {Cacheable}
   */
		function Screen() {
			babelHelpers.classCallCheck(this, Screen);

			/**
    * Holds the screen id.
    * @type {string}
    * @protected
    */
			var _this = babelHelpers.possibleConstructorReturn(this, _Cacheable.call(this));

			_this.id = _this.makeId_(core.getUid());

			/**
    * Holds the screen title. Relevant when the page title should be
    * upadated when screen is rendered.
    * @type {?string=}
    * @default null
    * @protected
    */
			_this.title = null;
			return _this;
		}

		/**
   * Fires when the screen is active. Allows a screen to perform any setup
   * that requires its DOM to be visible. Lifecycle.
   */


		Screen.prototype.activate = function activate() {
			console.log('Screen [' + this + '] activate');
		};

		/**
   * Gives the Screen a chance to cancel the navigation and stop itself from
   * being deactivated. Can be used, for example, if the screen has unsaved
   * state. Lifecycle. Clean-up should not be preformed here, since the
   * navigation may still be cancelled. Do clean-up in deactivate.
   * @return {boolean=} If returns true, the current screen is locked and the
   *     next nagivation interrupted.
   */


		Screen.prototype.beforeDeactivate = function beforeDeactivate() {
			console.log('Screen [' + this + '] beforeDeactivate');
		};

		/**
   * Gives the Screen a chance format the path before history update.
   * @path {!string} path Navigation path.
   * @return {!string} Navigation path to use on history.
   */


		Screen.prototype.beforeUpdateHistoryPath = function beforeUpdateHistoryPath(path) {
			return path;
		};

		/**
   * Gives the Screen a chance format the state before history update.
   * @path {!object} state History state.
   * @return {!object} History state to use on history.
   */


		Screen.prototype.beforeUpdateHistoryState = function beforeUpdateHistoryState(state) {
			return state;
		};

		/**
   * Allows a screen to do any cleanup necessary after it has been
   * deactivated, for example cancelling outstanding requests or stopping
   * timers. Lifecycle.
   */


		Screen.prototype.deactivate = function deactivate() {
			console.log('Screen [' + this + '] deactivate');
		};

		/**
   * Dispose a screen, either after it is deactivated (in the case of a
   * non-cacheable view) or when the App is itself disposed for whatever
   * reason. Lifecycle.
   */


		Screen.prototype.disposeInternal = function disposeInternal() {
			_Cacheable.prototype.disposeInternal.call(this);
			console.log('Screen [' + this + '] dispose');
		};

		/**
   * Allows a screen to evaluate scripts before the element is made visible.
   * Lifecycle.
   * @param {!object} surfaces Map of surfaces to flip keyed by surface id.
   * @return {?CancellablePromise=} This can return a promise, which will
   *     pause the navigation until it is resolved.
   */


		Screen.prototype.evaluateScripts = function evaluateScripts(surfaces) {
			Object.keys(surfaces).forEach(function (sId) {
				if (surfaces[sId].activeChild) {
					globalEval.runScriptsInElement(surfaces[sId].activeChild);
				}
			});
			return CancellablePromise.resolve();
		};

		/**
   * Allows a screen to evaluate styles before the element is made visible.
   * Lifecycle.
   * @param {!object} surfaces Map of surfaces to flip keyed by surface id.
   * @return {?CancellablePromise=} This can return a promise, which will
   *     pause the navigation until it is resolved.
   */


		Screen.prototype.evaluateStyles = function evaluateStyles() {
			return CancellablePromise.resolve();
		};

		/**
   * Allows a screen to perform any setup immediately before the element is
   * made visible. Lifecycle.
   * @param {!object} surfaces Map of surfaces to flip keyed by surface id.
   * @return {?CancellablePromise=} This can return a promise, which will pause the
   *     navigation until it is resolved.
   */


		Screen.prototype.flip = function flip(surfaces) {
			var _this2 = this;

			console.log('Screen [' + this + '] flip');

			var transitions = [];

			Object.keys(surfaces).forEach(function (sId) {
				var surface = surfaces[sId];
				var deferred = surface.show(_this2.id);
				transitions.push(deferred);
			});

			return CancellablePromise.all(transitions);
		};

		/**
   * Gets the screen id.
   * @return {string}
   */


		Screen.prototype.getId = function getId() {
			return this.id;
		};

		/**
   * Returns the content for the given surface, or null if the surface isn't
   * used by this screen. This will be called when a screen is initially
   * constructed or, if a screen is non-cacheable, when navigated.
   * @param {!string} surfaceId The id of the surface DOM element.
   * @return {?string|Element=} This can return a string or node representing
   *     the content of the surface. If returns falsy values surface default
   *     content is restored.
   */


		Screen.prototype.getSurfaceContent = function getSurfaceContent() {
			console.log('Screen [' + this + '] getSurfaceContent');
		};

		/**
   * Gets the screen title.
   * @return {?string=}
   */


		Screen.prototype.getTitle = function getTitle() {
			return this.title;
		};

		/**
   * Returns all contents for the surfaces. This will pass the loaded content
   * to <code>Screen.load</code> with all information you
   * need to fulfill the surfaces. Lifecycle.
   * @param {!string=} path The requested path.
   * @return {!CancellablePromise} This can return a string representing the
   *     contents of the surfaces or a promise, which will pause the navigation
   *     until it is resolved. This is useful for loading async content.
   */


		Screen.prototype.load = function load() {
			console.log('Screen [' + this + '] load');
			return CancellablePromise.resolve();
		};

		/**
   * Makes the id for the screen.
   * @param {!string} id The screen id the content belongs too.
   * @return {string}
   * @private
   */


		Screen.prototype.makeId_ = function makeId_(id) {
			return 'screen_' + id;
		};

		/**
   * Sets the screen id.
   * @param {!string} id
   */


		Screen.prototype.setId = function setId(id) {
			this.id = id;
		};

		/**
   * Sets the screen title.
   * @param {?string=} title
   */


		Screen.prototype.setTitle = function setTitle(title) {
			this.title = title;
		};

		/**
   * @return {string}
   */


		Screen.prototype.toString = function toString() {
			return this.id;
		};

		return Screen;
	}(Cacheable);

	/**
  * @param {*} object
  * @return {boolean} Whether a given instance implements
  * <code>Screen</code>.
  */


	Screen.isImplementedBy = function (object) {
		return object instanceof Screen;
	};

	this.Library.Screen = Screen;
}).call(this);
'use strict';

(function () {
	var globals = this.Library.globals;
	var core = this.LibraryNamed.metal.core;
	var Disposable = this.LibraryNamed.metal.Disposable;
	var dom = this.Library.dom;
	var CancellablePromise = this.Library.Promise;

	var Surface = function (_Disposable) {
		babelHelpers.inherits(Surface, _Disposable);

		/**
   * Surface class representing the references to elements on the page that
   * can potentially be updated by <code>App</code>.
   * @param {string} id
   * @constructor
   */
		function Surface(id) {
			babelHelpers.classCallCheck(this, Surface);

			var _this = babelHelpers.possibleConstructorReturn(this, _Disposable.call(this));

			if (!id) {
				throw new Error('Surface element id not specified. A surface element requires a valid id.');
			}

			/**
    * Holds the active child element.
    * @type {Element}
    * @default null
    * @protected
    */
			_this.activeChild = null;

			/**
    * Holds the default child element.
    * @type {Element}
    * @default null
    * @protected
    */
			_this.defaultChild = null;

			/**
    * Holds the element with the specified surface id, if not found creates a
    * new element with the specified id.
    * @type {Element}
    * @default null
    * @protected
    */
			_this.element = null;

			/**
    * Holds the surface id.
    * @type {String}
    * @default null
    * @protected
    */
			_this.id = id;

			/**
    * Holds the default transitionFn for the surfaces.
    * @param {?Element=} from The visible surface element.
    * @param {?Element=} to The surface element to be flipped.
    * @default null
    */
			_this.transitionFn = null;

			_this.defaultChild = _this.getChild(Surface.DEFAULT);
			_this.maybeWrapContentAsDefault_();
			_this.activeChild = _this.defaultChild;
			return _this;
		}

		/**
   * Adds screen content to a surface. If content hasn't been passed, see if
   * an element exists in the DOM that matches the id. By convention, the
   * element should already be nested in the right element and should have an
   * id that is a concatentation of the surface id + '-' + the screen id.
   * @param {!string} screenId The screen id the content belongs too.
   * @param {?string|Element=} opt_content The string content or element to
   *     add be added as surface content.
   * @return {Element}
   */


		Surface.prototype.addContent = function addContent(screenId, opt_content) {
			var child = this.defaultChild;

			if (core.isDefAndNotNull(opt_content)) {
				child = this.getChild(screenId);
				if (child) {
					dom.removeChildren(child);
				} else {
					child = this.createChild(screenId);
					this.transition(child, null);
				}
				dom.append(child, opt_content);
			}

			var element = this.getElement();

			if (element && child) {
				dom.append(element, child);
			}

			return child;
		};

		/**
   * Creates child node for the surface.
   * @param {!string} screenId The screen id.
   * @return {Element}
   */


		Surface.prototype.createChild = function createChild(screenId) {
			var child = globals.document.createElement('div');
			child.setAttribute('id', this.makeId_(screenId));
			return child;
		};

		/**
   * Gets child node of the surface.
   * @param {!string} screenId The screen id.
   * @return {?Element}
   */


		Surface.prototype.getChild = function getChild(screenId) {
			return globals.document.getElementById(this.makeId_(screenId));
		};

		/**
   * Gets the surface element from element, and sets it to the el property of
   * the current instance.
   * <code>this.element</code> will be used.
   * @return {?Element} The current surface element.
   */


		Surface.prototype.getElement = function getElement() {
			if (this.element) {
				return this.element;
			}
			this.element = globals.document.getElementById(this.id);
			return this.element;
		};

		/**
   * Gets the surface id.
   * @return {String}
   */


		Surface.prototype.getId = function getId() {
			return this.id;
		};

		/**
   * Gets the surface transition function.
   * See <code>Surface.defaultTransition</code>.
   * @return {?Function=} The transition function.
   */


		Surface.prototype.getTransitionFn = function getTransitionFn() {
			return this.transitionFn;
		};

		/**
   * Makes the id for the element that holds content for a screen.
   * @param {!string} screenId The screen id the content belongs too.
   * @return {String}
   * @private
   */


		Surface.prototype.makeId_ = function makeId_(screenId) {
			return this.id + '-' + screenId;
		};

		/**
   * If default child is missing, wraps surface content as default child. If
   * surface have static content, make sure to place a
   * <code>surfaceId-default</code> element inside surface, only contents
   * inside the default child will be replaced by navigation.
   */


		Surface.prototype.maybeWrapContentAsDefault_ = function maybeWrapContentAsDefault_() {
			var element = this.getElement();
			if (element && !this.defaultChild) {
				var fragment = globals.document.createDocumentFragment();
				while (element.firstChild) {
					fragment.appendChild(element.firstChild);
				}
				this.defaultChild = this.addContent(Surface.DEFAULT, fragment);
				this.transition(null, this.defaultChild);
			}
		};

		/**
   * Sets the surface id.
   * @param {!string} id
   */


		Surface.prototype.setId = function setId(id) {
			this.id = id;
		};

		/**
   * Sets the surface transition function.
   * See <code>Surface.defaultTransition</code>.
   * @param {?Function=} transitionFn The transition function.
   */


		Surface.prototype.setTransitionFn = function setTransitionFn(transitionFn) {
			this.transitionFn = transitionFn;
		};

		/**
   * Shows screen content from a surface.
   * @param {String} screenId The screen id to show.
   * @return {CancellablePromise} Pauses the navigation until it is resolved.
   */


		Surface.prototype.show = function show(screenId) {
			var from = this.activeChild;
			var to = this.getChild(screenId);
			if (!to) {
				to = this.defaultChild;
			}
			this.activeChild = to;
			return this.transition(from, to).thenAlways(function () {
				if (from && from !== to) {
					dom.exitDocument(from);
				}
			});
		};

		/**
   * Removes screen content from a surface.
   * @param {!string} screenId The screen id to remove.
   */


		Surface.prototype.remove = function remove(screenId) {
			var child = this.getChild(screenId);
			if (child) {
				dom.exitDocument(child);
			}
		};

		/**
   * @return {String}
   */


		Surface.prototype.toString = function toString() {
			return this.id;
		};

		/**
   * Invokes the transition function specified on <code>transition</code> attribute.
   * @param {?Element=} from
   * @param {?Element=} to
   * @return {?CancellablePromise=} This can return a promise, which will pause the
   *     navigation until it is resolved.
   */


		Surface.prototype.transition = function transition(from, to) {
			var transitionFn = this.transitionFn || Surface.defaultTransition;
			return CancellablePromise.resolve(transitionFn.call(this, from, to));
		};

		return Surface;
	}(Disposable);

	/**
    * Holds the default surface name. Elements on the page must contain a child
    * element containing the default content, this element must be as following:
    *
    * Example:
    * <code>
    *   <div id="mysurface">
    *     <div id="mysurface-default">Default surface content.</div>
    *   </div>
    * </code>
    *
    * The default content is relevant for the initial page content. When a
    * screen doesn't provide content for the surface the default content is
    * restored into the page.
    *
    * @type {!String}
    * @default default
    * @static
    */


	Surface.DEFAULT = 'default';

	/**
  * Holds the default transition for all surfaces. Each surface could have its
  * own transition.
  *
  * Example:
  *
  * <code>
  * surface.setTransitionFn(function(from, to) {
  *   if (from) {
  *     from.style.display = 'none';
  *     from.classList.remove('flipped');
  *   }
  *   if (to) {
  *     to.style.display = 'block';
  *     to.classList.add('flipped');
  *   }
  *   return null;
  * });
  * </code>
  *
  * @param {?Element=} from The visible surface element.
  * @param {?Element=} to The surface element to be flipped.
  * @static
  */
	Surface.defaultTransition = function (from, to) {
		if (from) {
			from.style.display = 'none';
			from.classList.remove('flipped');
		}
		if (to) {
			to.style.display = 'block';
			to.classList.add('flipped');
		}
	};

	this.Library.Surface = Surface;
}).call(this);
'use strict';

(function () {
	var array = this.LibraryNamed.metal.array;
	var async = this.LibraryNamed.metal.async;
	var core = this.LibraryNamed.metal.core;
	var debounce = this.Library.debounce;
	var dom = this.Library.dom;
	var CancellablePromise = this.Library.Promise;
	var EventEmitter = this.LibraryNamed.events.EventEmitter;
	var EventHandler = this.LibraryNamed.events.EventHandler;
	var utils = this.Library.utils;
	var globals = this.Library.globals;
	var Route = this.Library.Route;
	var Screen = this.Library.Screen;
	var Surface = this.Library.Surface;
	var Uri = this.Library.Uri;

	var App = function (_EventEmitter) {
		babelHelpers.inherits(App, _EventEmitter);

		/**
   * App class that handle routes and screens lifecycle.
   * @constructor
   * @extends {EventEmitter}
   */
		function App() {
			babelHelpers.classCallCheck(this, App);

			/**
    * Holds the active screen.
    * @type {?Screen}
    * @protected
    */
			var _this = babelHelpers.possibleConstructorReturn(this, _EventEmitter.call(this));

			_this.activeScreen = null;

			/**
    * Holds the active path containing the query parameters.
    * @type {?string}
    * @protected
    */
			_this.activePath = null;

			/**
    * Allows prevent navigate from dom prevented event.
    * @type {boolean}
    * @default true
    * @protected
    */
			_this.allowPreventNavigate = true;

			/**
    * Holds link base path.
    * @type {!string}
    * @default ''
    * @protected
    */
			_this.basePath = '';

			/**
    * Captures scroll position from scroll event.
    * @type {!boolean}
    * @default true
    * @protected
    */
			_this.captureScrollPositionFromScrollEvent = true;

			/**
    * Holds the default page title.
    * @type {string}
    * @default null
    * @protected
    */
			_this.defaultTitle = globals.document.title;

			/**
    * Holds the form selector to define forms that are routed.
    * @type {!string}
    * @default form[enctype="multipart/form-data"]:not([data-senna-off])
    * @protected
    */
			_this.formSelector = 'form[enctype="multipart/form-data"]:not([data-senna-off])';

			/**
    * Holds the link selector to define links that are routed.
    * @type {!string}
    * @default a:not([data-senna-off])
    * @protected
    */
			_this.linkSelector = 'a:not([data-senna-off])';

			/**
    * Holds the loading css class.
    * @type {!string}
    * @default senna-loading
    * @protected
    */
			_this.loadingCssClass = 'senna-loading';

			/**
    * Using the History API to manage your URLs is awesome and, as it happens,
    * a crucial feature of good web apps. One of its downsides, however, is
    * that scroll positions are stored and then, more importantly, restored
    * whenever you traverse the history. This often means unsightly jumps as
    * the scroll position changes automatically, and especially so if your app
    * does transitions, or changes the contents of the page in any way.
    * Ultimately this leads to an horrible user experience. The good news is,
    * however, that there’s a potential fix: history.scrollRestoration.
    * https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
    * @type {boolean}
    * @protected
    */
			_this.nativeScrollRestorationSupported = 'scrollRestoration' in globals.window.history;

			/**
    * Holds a deferred with the current navigation.
    * @type {?CancellablePromise}
    * @default null
    * @protected
    */
			_this.pendingNavigate = null;

			/**
    * Holds the window horizontal scroll position when the navigation using
    * back or forward happens to be restored after the surfaces are updated.
    * @type {!Number}
    * @default 0
    * @protected
    */
			_this.popstateScrollLeft = 0;

			/**
    * Holds the window vertical scroll position when the navigation using
    * back or forward happens to be restored after the surfaces are updated.
    * @type {!Number}
    * @default 0
    * @protected
    */
			_this.popstateScrollTop = 0;

			/**
    * Holds the redirect path containing the query parameters.
    * @type {?string}
    * @protected
    */
			_this.redirectPath = null;

			/**
    * Holds the screen routes configuration.
    * @type {?Array}
    * @default []
    * @protected
    */
			_this.routes = [];

			/**
    * Maps the screen instances by the url containing the parameters.
    * @type {?Object}
    * @default {}
    * @protected
    */
			_this.screens = {};

			/**
    * When set to true the first erroneous popstate fired on page load will be
    * ignored, only if <code>globals.window.history.state</code> is also
    * <code>null</code>.
    * @type {boolean}
    * @default false
    * @protected
    */
			_this.skipLoadPopstate = false;

			/**
    * Maps that index the surfaces instances by the surface id.
    * @type {?Object}
    * @default {}
    * @protected
    */
			_this.surfaces = {};

			/**
    * When set to true, moves the scroll position after popstate, or to the
    * top of the viewport for new navigation. If false, the browser will
    * take care of scroll restoration.
    * @type {!boolean}
    * @default true
    * @protected
    */
			_this.updateScrollPosition = true;

			_this.appEventHandlers_ = new EventHandler();

			_this.appEventHandlers_.add(dom.on(globals.window, 'scroll', debounce(_this.onScroll_.bind(_this), 100)), dom.on(globals.window, 'load', _this.onLoad_.bind(_this)), dom.on(globals.window, 'popstate', _this.onPopstate_.bind(_this)));

			_this.on('startNavigate', _this.onStartNavigate_);
			_this.on('beforeNavigate', _this.onBeforeNavigate_);
			_this.on('beforeNavigate', _this.onBeforeNavigateDefault_, true);

			_this.setLinkSelector(_this.linkSelector);
			_this.setFormSelector(_this.formSelector);
			return _this;
		}

		/**
   * Adds one or more screens to the application.
   *
   * Example:
   *
   * <code>
   *   app.addRoutes({ path: '/foo', handler: FooScreen });
   *   or
   *   app.addRoutes([{ path: '/foo', handler: function(route) { return new FooScreen(); } }]);
   * </code>
   *
   * @param {Object} or {Array} routes Single object or an array of object.
   *     Each object should contain <code>path</code> and <code>screen</code>.
   *     The <code>path</code> should be a string or a regex that maps the
   *     navigation route to a screen class definition (not an instance), e.g:
   *         <code>{ path: "/home:param1", handler: MyScreen }</code>
   *         <code>{ path: /foo.+/, handler: MyScreen }</code>
   * @chainable
   */


		App.prototype.addRoutes = function addRoutes(routes) {
			var _this2 = this;

			if (!Array.isArray(routes)) {
				routes = [routes];
			}
			routes.forEach(function (route) {
				if (!(route instanceof Route)) {
					route = new Route(route.path, route.handler);
				}
				_this2.routes.push(route);
			});
			return this;
		};

		/**
   * Adds one or more surfaces to the application.
   * @param {Surface|String|Array.<Surface|String>} surfaces
   *     Surface element id or surface instance. You can also pass an Array
   *     whichcontains surface instances or id. In case of ID, these should be
   *     the id of surface element.
   * @chainable
   */


		App.prototype.addSurfaces = function addSurfaces(surfaces) {
			var _this3 = this;

			if (!Array.isArray(surfaces)) {
				surfaces = [surfaces];
			}
			surfaces.forEach(function (surface) {
				if (core.isString(surface)) {
					surface = new Surface(surface);
				}
				_this3.surfaces[surface.getId()] = surface;
			});
			return this;
		};

		/**
   * Returns if can navigate to path.
   * @param {!string} url
   * @return {boolean}
   */


		App.prototype.canNavigate = function canNavigate(url) {
			var path = utils.getUrlPath(url);
			var uri = new Uri(url);

			if (!this.isLinkSameOrigin_(uri.getHostname())) {
				console.log('Offsite link clicked');
				return false;
			}
			if (!this.isSameBasePath_(path)) {
				console.log('Link clicked outside app\'s base path');
				return false;
			}
			if (!this.findRoute(path)) {
				console.log('No route for ' + path);
				return false;
			}

			return true;
		};

		/**
   * Clear screens cache.
   * @chainable
   */


		App.prototype.clearScreensCache = function clearScreensCache() {
			var _this4 = this;

			Object.keys(this.screens).forEach(function (path) {
				if (path === _this4.activePath) {
					_this4.activeScreen.clearCache();
				} else {
					_this4.removeScreen(path);
				}
			});
		};

		/**
   * Retrieves or create a screen instance to a path.
   * @param {!string} path Path containing the querystring part.
   * @return {Screen}
   */


		App.prototype.createScreenInstance = function createScreenInstance(path, route) {
			if (!this.pendingNavigate && path === this.activePath) {
				console.log('Already at destination, refresh navigation');
				return this.activeScreen;
			}
			/* jshint newcap: false */
			var screen = this.screens[path];
			if (!screen) {
				var handler = route.getHandler();
				if (handler === Screen || Screen.isImplementedBy(handler.prototype)) {
					screen = new handler();
				} else {
					screen = handler(route) || new Screen();
				}
				console.log('Create screen for [' + path + '] [' + screen + ']');
			}
			return screen;
		};

		/**
   * @inheritDoc
   */


		App.prototype.disposeInternal = function disposeInternal() {
			if (this.activeScreen) {
				this.removeScreen(this.activePath);
			}
			this.clearScreensCache();
			this.formEventHandler_.removeListener();
			this.linkEventHandler_.removeListener();
			this.appEventHandlers_.removeAllListeners();
			_EventEmitter.prototype.disposeInternal.call(this);
		};

		/**
   * Dispatches to the first route handler that matches the current path, if
   * any.
   * @return {CancellablePromise} Returns a pending request cancellable promise.
   */


		App.prototype.dispatch = function dispatch() {
			return this.navigate(utils.getCurrentBrowserPath(), true);
		};

		/**
   * Starts navigation to a path.
   * @param {!string} path Path containing the querystring part.
   * @param {boolean=} opt_replaceHistory Replaces browser history.
   * @return {CancellablePromise} Returns a pending request cancellable promise.
   */


		App.prototype.doNavigate_ = function doNavigate_(path, opt_replaceHistory) {
			var _this5 = this;

			if (this.activeScreen && this.activeScreen.beforeDeactivate()) {
				this.pendingNavigate = CancellablePromise.reject(new CancellablePromise.CancellationError('Cancelled by active screen'));
				return this.pendingNavigate;
			}

			var route = this.findRoute(path);
			if (!route) {
				this.pendingNavigate = CancellablePromise.reject(new CancellablePromise.CancellationError('No route for ' + path));
				return this.pendingNavigate;
			}

			console.log('Navigate to [' + path + ']');

			this.stopPendingNavigate_();

			var nextScreen = this.createScreenInstance(path, route);

			return nextScreen.load(path).then(function () {
				if (_this5.activeScreen) {
					_this5.activeScreen.deactivate();
				}
				_this5.prepareNavigateHistory_(path, nextScreen, opt_replaceHistory);
				_this5.prepareNavigateSurfaces_(nextScreen, _this5.surfaces);
			}).then(function () {
				return nextScreen.evaluateStyles(_this5.surfaces);
			}).then(function () {
				return nextScreen.flip(_this5.surfaces);
			}).then(function () {
				return nextScreen.evaluateScripts(_this5.surfaces);
			}).then(function () {
				return _this5.syncScrollPositionSyncThenAsync_();
			}).then(function () {
				return _this5.finalizeNavigate_(path, nextScreen);
			}).catch(function (reason) {
				_this5.handleNavigateError_(path, nextScreen, reason);
				throw reason;
			});
		};

		/**
   * Finalizes a screen navigation.
   * @param {!string} path Path containing the querystring part.
   * @param {!Screen} nextScreen
   * @protected
   */


		App.prototype.finalizeNavigate_ = function finalizeNavigate_(path, nextScreen) {
			nextScreen.activate();

			if (this.activeScreen && !this.activeScreen.isCacheable()) {
				if (this.activeScreen !== nextScreen) {
					this.removeScreen(this.activePath);
				}
			}

			this.activePath = path;
			this.activeScreen = nextScreen;
			this.screens[path] = nextScreen;
			this.pendingNavigate = null;
			globals.capturedFormElement = null;
			console.log('Navigation done');
		};

		/**
   * Finds a route for the test path. Returns true if matches has a route,
   * otherwise returns null.
   * @param {!string} path Path containing the querystring part.
   * @return {?Object} Route handler if match any or <code>null</code> if the
   *     path is the same as the current url and the path contains a fragment.
   */


		App.prototype.findRoute = function findRoute(path) {
			// Prevents navigation if it's a hash change on the same url.
			if (path.lastIndexOf('#') > -1 && utils.isCurrentBrowserPath(path)) {
				return null;
			}

			path = utils.getUrlPathWithoutHash(path);

			// Makes sure that the path substring will be in the expected format
			// (that is, will end with a "/").
			path = utils.getUrlPathWithoutHash(path.substr(this.basePath.length));

			for (var i = 0; i < this.routes.length; i++) {
				var route = this.routes[i];
				if (route.matchesPath(path)) {
					return route;
				}
			}

			return null;
		};

		/**
   * Gets allow prevent navigate.
   * @return {boolean}
   */


		App.prototype.getAllowPreventNavigate = function getAllowPreventNavigate() {
			return this.allowPreventNavigate;
		};

		/**
   * Gets link base path.
   * @return {!string}
   */


		App.prototype.getBasePath = function getBasePath() {
			return this.basePath;
		};

		/**
   * Gets the default page title.
   * @return {string} defaultTitle
   */


		App.prototype.getDefaultTitle = function getDefaultTitle() {
			return this.defaultTitle;
		};

		/**
   * Gets the form selector.
   * @return {!string}
   */


		App.prototype.getFormSelector = function getFormSelector() {
			return this.formSelector;
		};

		/**
   * Gets the link selector.
   * @return {!string}
   */


		App.prototype.getLinkSelector = function getLinkSelector() {
			return this.linkSelector;
		};

		/**
   * Gets the loading css class.
   * @return {!string}
   */


		App.prototype.getLoadingCssClass = function getLoadingCssClass() {
			return this.loadingCssClass;
		};

		/**
   * Gets the update scroll position value.
   * @return {boolean}
   */


		App.prototype.getUpdateScrollPosition = function getUpdateScrollPosition() {
			return this.updateScrollPosition;
		};

		/**
   * Handle navigation error.
   * @param {!string} path Path containing the querystring part.
   * @param {!Screen} nextScreen
   * @param {!Error} error
   * @protected
   */


		App.prototype.handleNavigateError_ = function handleNavigateError_(path, nextScreen, err) {
			console.log('Navigation error for [' + nextScreen + '] (' + err + ')');
			if (!utils.isCurrentBrowserPath(path)) {
				this.removeScreen(path);
			}
		};

		/**
   * Checks if app has routes.
   * @return {boolean}
   */


		App.prototype.hasRoutes = function hasRoutes() {
			return this.routes.length > 0;
		};

		/**
   * Tests if hostname is an offsite link.
   * @param {!string} hostname Link hostname to compare with
   *     <code>globals.window.location.hostname</code>.
   * @return {boolean}
   * @protected
   */


		App.prototype.isLinkSameOrigin_ = function isLinkSameOrigin_(hostname) {
			return hostname === globals.window.location.hostname;
		};

		/**
   * Tests if link element has the same app's base path.
   * @param {!string} path Link path containing the querystring part.
   * @return {boolean}
   * @protected
   */


		App.prototype.isSameBasePath_ = function isSameBasePath_(path) {
			return path.indexOf(this.basePath) === 0;
		};

		/**
   * Lock the document scroll in order to avoid the browser native back and
   * forward navigation to change the scroll position. In the end of
   * navigation lifecycle scroll is repositioned.
   * @protected
   */


		App.prototype.lockHistoryScrollPosition_ = function lockHistoryScrollPosition_() {
			var state = globals.window.history.state;
			if (!state) {
				return;
			}
			// Browsers are inconsistent when re-positioning the scroll history on
			// popstate. At some browsers, history scroll happens before popstate, then
			// lock the scroll on the last known position as soon as possible after the
			// current JS execution context and capture the current value. Some others,
			// history scroll happens after popstate, in this case, we bind an once
			// scroll event to lock the las known position. Lastly, the previous two
			// behaviors can happen even on the same browser, hence the race will decide
			// the winner.
			var winner = false;
			var switchScrollPositionRace = function switchScrollPositionRace() {
				globals.document.removeEventListener('scroll', switchScrollPositionRace, false);
				if (!winner) {
					globals.window.scrollTo(state.scrollLeft, state.scrollTop);
					winner = true;
				}
			};
			async.nextTick(switchScrollPositionRace);
			globals.document.addEventListener('scroll', switchScrollPositionRace, false);
		};

		/**
   * If supported by the browser, disables native scroll restoration and
   * stores current value.
   */


		App.prototype.maybeDisableNativeScrollRestoration = function maybeDisableNativeScrollRestoration() {
			if (this.nativeScrollRestorationSupported) {
				this.nativeScrollRestoration_ = globals.window.history.scrollRestoration;
				globals.window.history.scrollRestoration = 'manual';
			}
		};

		/**
   * Maybe navigate to a path.
   * @param {string} href Information about the link's href.
   * @param {Event} event Dom event that initiated the navigation.
   */


		App.prototype.maybeNavigate_ = function maybeNavigate_(href, event) {
			if (!this.canNavigate(href)) {
				return;
			}

			globals.capturedFormElement = event.capturedFormElement;

			var navigateFailed = false;
			try {
				this.navigate(utils.getUrlPath(href));
			} catch (err) {
				// Do not prevent link navigation in case some synchronous error occurs
				navigateFailed = true;
			}

			if (!navigateFailed) {
				event.preventDefault();
			}
		};

		/**
   * Maybe reposition scroll to hashed anchor.
   */


		App.prototype.maybeRepositionScrollToHashedAnchor = function maybeRepositionScrollToHashedAnchor() {
			var hash = globals.window.location.hash;
			if (hash) {
				var anchorElement = globals.document.getElementById(hash.substring(1));
				if (anchorElement) {
					globals.window.scrollTo(anchorElement.offsetLeft, anchorElement.offsetTop);
				}
			}
		};

		/**
   * If supported by the browser, restores native scroll restoration to the
   * value captured by `maybeDisableNativeScrollRestoration`.
   */


		App.prototype.maybeRestoreNativeScrollRestoration = function maybeRestoreNativeScrollRestoration() {
			if (this.nativeScrollRestorationSupported && this.nativeScrollRestoration_) {
				globals.window.history.scrollRestoration = this.nativeScrollRestoration_;
			}
		};

		/**
   * Navigates to the specified path if there is a route handler that matches.
   * @param {!string} path Path to navigate containing the base path.
   * @param {boolean=} opt_replaceHistory Replaces browser history.
   * @return {CancellablePromise} Returns a pending request cancellable promise.
   */


		App.prototype.navigate = function navigate(path, opt_replaceHistory) {
			if (!utils.isHtml5HistorySupported()) {
				throw new Error('HTML5 History is not supported. Senna will not intercept navigation.');
			}

			// When reloading the same path do replaceState instead of pushState to
			// avoid polluting history with states with the same path.
			if (path === this.activePath) {
				opt_replaceHistory = true;
			}

			this.emit('beforeNavigate', {
				path: path,
				replaceHistory: !!opt_replaceHistory
			});

			return this.pendingNavigate;
		};

		/**
   * Befores navigation to a path.
   * @param {!Event} event Event facade containing <code>path</code> and
   *     <code>replaceHistory</code>.
   * @protected
   */


		App.prototype.onBeforeNavigate_ = function onBeforeNavigate_(event) {
			if (globals.capturedFormElement) {
				event.form = globals.capturedFormElement;
			}
		};

		/**
   * Befores navigation to a path. Runs after external listeners.
   * @param {!Event} event Event facade containing <code>path</code> and
   *     <code>replaceHistory</code>.
   * @protected
   */


		App.prototype.onBeforeNavigateDefault_ = function onBeforeNavigateDefault_(event) {
			if (this.pendingNavigate) {
				if (this.pendingNavigate.path === event.path) {
					console.log('Waiting...');
					return;
				}
			}

			this.emit('startNavigate', {
				form: event.form,
				path: event.path,
				replaceHistory: event.replaceHistory
			});
		};

		/**
   * Intercepts document clicks and test link elements in order to decide
   * whether Surface app can navigate.
   * @param {!Event} event Event facade
   * @protected
   */


		App.prototype.onDocClickDelegate_ = function onDocClickDelegate_(event) {
			if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.button) {
				console.log('Navigate aborted, invalid mouse button or modifier key pressed.');
				return;
			}
			this.maybeNavigate_(event.delegateTarget.href, event);
		};

		/**
   * Intercepts document form submits and test action path in order to decide
   * whether Surface app can navigate.
   * @param {!Event} event Event facade
   * @protected
   */


		App.prototype.onDocSubmitDelegate_ = function onDocSubmitDelegate_(event) {
			var form = event.delegateTarget;
			if (form.method === 'get') {
				console.log('GET method not supported');
				return;
			}
			event.capturedFormElement = form;
			this.maybeNavigate_(form.action, event);
		};

		/**
   * Listens to the window's load event in order to avoid issues with some browsers
   * that trigger popstate calls on the first load. For more information see
   * http://stackoverflow.com/questions/6421769/popstate-on-pages-load-in-chrome.
   * @protected
   */


		App.prototype.onLoad_ = function onLoad_() {
			var _this6 = this;

			this.skipLoadPopstate = true;
			setTimeout(function () {
				// The timeout ensures that popstate events will be unblocked right
				// after the load event occured, but not in the same event-loop cycle.
				_this6.skipLoadPopstate = false;
			}, 0);
			// Try to reposition scroll to the hashed anchor when page loads.
			this.maybeRepositionScrollToHashedAnchor();
		};

		/**
   * Handles browser history changes and fires app's navigation if the state
   * belows to us. If we detect a popstate and the state is <code>null</code>,
   * assume it is navigating to an external page or to a page we don't have
   * route, then <code>globals.window.location.reload()</code> is invoked in order to
   * reload the content to the current url.
   * @param {!Event} event Event facade
   * @protected
   */


		App.prototype.onPopstate_ = function onPopstate_(event) {
			if (this.skipLoadPopstate) {
				return;
			}

			var state = event.state;

			if (!state) {
				if (globals.window.location.hash) {
					// If senna is on an redirect path and a hash popstate happens
					// to a different url, reload the browser. This behavior doesn't
					// require senna to route hashed links and is closer to native
					// browser behavior.
					if (this.redirectPath && !utils.isCurrentBrowserPath(this.redirectPath)) {
						this.reloadPage();
					}
					// Always try to reposition scroll to the hashed anchor when
					// hash popstate happens.
					this.maybeRepositionScrollToHashedAnchor();
				} else {
					this.reloadPage();
				}
				return;
			}

			if (state.senna) {
				console.log('History navigation to [' + state.path + ']');
				this.popstateScrollTop = state.scrollTop;
				this.popstateScrollLeft = state.scrollLeft;
				if (!this.nativeScrollRestorationSupported) {
					this.lockHistoryScrollPosition_();
				}
				this.navigate(state.path, true);
			}
		};

		/**
   * Listens document scroll changes in order to capture the possible lock
   * scroll position for history scrolling.
   * @protected
   */


		App.prototype.onScroll_ = function onScroll_() {
			if (this.captureScrollPositionFromScrollEvent) {
				this.saveHistoryCurrentPageScrollPosition_();
			}
		};

		/**
   * Starts navigation to a path.
   * @param {!Event} event Event facade containing <code>path</code> and
   *     <code>replaceHistory</code>.
   * @protected
   */


		App.prototype.onStartNavigate_ = function onStartNavigate_(event) {
			var _this7 = this;

			this.maybeDisableNativeScrollRestoration();
			this.captureScrollPositionFromScrollEvent = false;
			dom.addClasses(globals.document.documentElement, this.loadingCssClass);

			var endNavigatePayload = {
				form: event.form,
				path: event.path
			};

			this.pendingNavigate = this.doNavigate_(event.path, event.replaceHistory).catch(function (reason) {
				endNavigatePayload.error = reason;
				throw reason;
			}).thenAlways(function () {
				if (!_this7.pendingNavigate) {
					dom.removeClasses(globals.document.documentElement, _this7.loadingCssClass);
					_this7.maybeRestoreNativeScrollRestoration();
					_this7.captureScrollPositionFromScrollEvent = true;
				}
				_this7.emit('endNavigate', endNavigatePayload);
			});

			this.pendingNavigate.path = event.path;
		};

		/**
   * Prefetches the specified path if there is a route handler that matches.
   * @param {!string} path Path to navigate containing the base path.
   * @return {CancellablePromise} Returns a pending request cancellable promise.
   */


		App.prototype.prefetch = function prefetch(path) {
			var _this8 = this;

			var route = this.findRoute(path);
			if (!route) {
				return CancellablePromise.reject(new CancellablePromise.CancellationError('No route for ' + path));
			}

			console.log('Prefetching [' + path + ']');

			var nextScreen = this.createScreenInstance(path, route);

			return nextScreen.load(path).then(function () {
				return _this8.screens[path] = nextScreen;
			}).catch(function (reason) {
				_this8.handleNavigateError_(path, nextScreen, reason);
				throw reason;
			});
		};

		/**
   * Prepares screen flip. Updates history state and surfaces content.
   * @param {!string} path Path containing the querystring part.
   * @param {!Screen} nextScreen
   * @param {boolean=} opt_replaceHistory Replaces browser history.
   */


		App.prototype.prepareNavigateHistory_ = function prepareNavigateHistory_(path, nextScreen, opt_replaceHistory) {
			var title = nextScreen.getTitle();
			if (!core.isString(title)) {
				title = this.getDefaultTitle();
			}
			var redirectPath = nextScreen.beforeUpdateHistoryPath(path);
			var historyState = {
				form: core.isDefAndNotNull(globals.capturedFormElement),
				redirectPath: redirectPath,
				path: path,
				senna: true,
				scrollTop: 0,
				scrollLeft: 0
			};
			if (opt_replaceHistory) {
				historyState.scrollTop = this.popstateScrollTop;
				historyState.scrollLeft = this.popstateScrollLeft;
			}
			this.updateHistory_(title, redirectPath, nextScreen.beforeUpdateHistoryState(historyState), opt_replaceHistory);
			this.redirectPath = redirectPath;
		};

		/**
   * Prepares screen flip. Updates history state and surfaces content.
   * @param {!Screen} nextScreen
   * @param {!object} surfaces Map of surfaces to flip keyed by surface id.
   */


		App.prototype.prepareNavigateSurfaces_ = function prepareNavigateSurfaces_(nextScreen, surfaces) {
			Object.keys(surfaces).forEach(function (id) {
				var surfaceContent = nextScreen.getSurfaceContent(id);
				surfaces[id].addContent(nextScreen.getId(), surfaceContent);
				console.log('Screen [' + nextScreen.getId() + '] add content to surface ' + '[' + surfaces[id] + '] [' + (core.isDefAndNotNull(surfaceContent) ? '...' : 'empty') + ']');
			});
		};

		/**
   * Reloads the page by performing `window.location.reload()`.
   */


		App.prototype.reloadPage = function reloadPage() {
			globals.window.location.reload();
		};

		/**
   * Removes route instance from app routes.
   * @param {Route} route
   * @return {boolean} True if an element was removed.
   */


		App.prototype.removeRoute = function removeRoute(route) {
			return array.remove(this.routes, route);
		};

		/**
   * Removes a screen.
   * @param {!string} path Path containing the querystring part.
   */


		App.prototype.removeScreen = function removeScreen(path) {
			var _this9 = this;

			var screen = this.screens[path];
			if (screen) {
				Object.keys(this.surfaces).forEach(function (surfaceId) {
					return _this9.surfaces[surfaceId].remove(screen.getId());
				});
				screen.dispose();
				delete this.screens[path];
			}
		};

		/**
   * Saves scroll position from page offset into history state.
   */


		App.prototype.saveHistoryCurrentPageScrollPosition_ = function saveHistoryCurrentPageScrollPosition_() {
			var state = globals.window.history.state;
			if (state && state.senna) {
				state.scrollTop = globals.window.pageYOffset;
				state.scrollLeft = globals.window.pageXOffset;
				globals.window.history.replaceState(state, null, null);
			}
		};

		/**
   * Sets allow prevent navigate.
   * @param {boolean} allowPreventNavigate
   */


		App.prototype.setAllowPreventNavigate = function setAllowPreventNavigate(allowPreventNavigate) {
			this.allowPreventNavigate = allowPreventNavigate;
		};

		/**
   * Sets link base path.
   * @param {!string} path
   */


		App.prototype.setBasePath = function setBasePath(basePath) {
			this.basePath = basePath;
		};

		/**
   * Sets the default page title.
   * @param {string} defaultTitle
   */


		App.prototype.setDefaultTitle = function setDefaultTitle(defaultTitle) {
			this.defaultTitle = defaultTitle;
		};

		/**
   * Sets the form selector.
   * @param {!string} formSelector
   */


		App.prototype.setFormSelector = function setFormSelector(formSelector) {
			this.formSelector = formSelector;
			if (this.formEventHandler_) {
				this.formEventHandler_.removeListener();
			}
			this.formEventHandler_ = dom.delegate(document, 'submit', this.formSelector, this.onDocSubmitDelegate_.bind(this), this.allowPreventNavigate);
		};

		/**
   * Sets the link selector.
   * @param {!string} linkSelector
   */


		App.prototype.setLinkSelector = function setLinkSelector(linkSelector) {
			this.linkSelector = linkSelector;
			if (this.linkEventHandler_) {
				this.linkEventHandler_.removeListener();
			}
			this.linkEventHandler_ = dom.delegate(document, 'click', this.linkSelector, this.onDocClickDelegate_.bind(this), this.allowPreventNavigate);
		};

		/**
   * Sets the loading css class.
   * @param {!string} loadingCssClass
   */


		App.prototype.setLoadingCssClass = function setLoadingCssClass(loadingCssClass) {
			this.loadingCssClass = loadingCssClass;
		};

		/**
   * Sets the update scroll position value.
   * @param {boolean} updateScrollPosition
   */


		App.prototype.setUpdateScrollPosition = function setUpdateScrollPosition(updateScrollPosition) {
			this.updateScrollPosition = updateScrollPosition;
		};

		/**
   * Cancels pending navigate with <code>Cancel pending navigation</code> error.
   * @protected
   */


		App.prototype.stopPendingNavigate_ = function stopPendingNavigate_() {
			if (this.pendingNavigate) {
				this.pendingNavigate.cancel('Cancel pending navigation');
				this.pendingNavigate = null;
			}
		};

		/**
   * Sync document scroll position twice, the first one synchronous and then
   * one inside <code>async.nextTick</code>. Relevant to browsers that fires
   * scroll restoration asynchronously after popstate.
   * @protected
   * @return {?CancellablePromise=}
   */


		App.prototype.syncScrollPositionSyncThenAsync_ = function syncScrollPositionSyncThenAsync_() {
			var _this10 = this;

			var state = globals.window.history.state;
			if (!state) {
				return;
			}

			var scrollTop = state.scrollTop;
			var scrollLeft = state.scrollLeft;

			var sync = function sync() {
				if (_this10.updateScrollPosition) {
					globals.window.scrollTo(scrollLeft, scrollTop);
				}
			};

			return new CancellablePromise(function (resolve) {
				return sync() & async.nextTick(function () {
					return sync() & resolve();
				});
			});
		};

		/**
   * Updates or replace browser history.
   * @param {?string} title Document title.
   * @param {!string} path Path containing the querystring part.
   * @param {!object} state
   * @param {boolean=} opt_replaceHistory Replaces browser history.
   * @protected
   */


		App.prototype.updateHistory_ = function updateHistory_(title, path, state, opt_replaceHistory) {
			if (opt_replaceHistory) {
				globals.window.history.replaceState(state, title, path);
			} else {
				globals.window.history.pushState(state, title, path);
			}
			globals.document.title = title;
		};

		return App;
	}(EventEmitter);

	this.Library.App = App;
}).call(this);
'use strict';

(function () {
	var core = this.LibraryNamed.metal.core;
	var Uri = this.Library.Uri;
	var Promise = this.LibraryNamed.Promise.CancellablePromise;

	var Ajax = function () {
		function Ajax() {
			babelHelpers.classCallCheck(this, Ajax);
		}

		/**
   * XmlHttpRequest's getAllResponseHeaders() method returns a string of
   * response headers according to the format described on the spec:
   * {@link http://www.w3.org/TR/XMLHttpRequest/#the-getallresponseheaders-method}.
   * This method parses that string into a user-friendly name/value pair
   * object.
   * @param {string} allHeaders All headers as string.
   * @return {!Array.<Object<string, string>>}
   */
		Ajax.parseResponseHeaders = function parseResponseHeaders(allHeaders) {
			var headers = [];
			if (!allHeaders) {
				return headers;
			}
			var pairs = allHeaders.split('\r\n');
			for (var i = 0; i < pairs.length; i++) {
				var index = pairs[i].indexOf(': ');
				if (index > 0) {
					var name = pairs[i].substring(0, index);
					var value = pairs[i].substring(index + 2);
					headers.push({
						name: name,
						value: value
					});
				}
			}
			return headers;
		};

		/**
   * Requests the url using XMLHttpRequest.
   * @param {!string} url
   * @param {!string} method
   * @param {?string} body
   * @param {MultiMap=} opt_headers
   * @param {MultiMap=} opt_params
   * @param {number=} opt_timeout
   * @param {boolean=} opt_sync
   * @param {boolean=} opt_withCredentials
   * @return {Promise} Deferred ajax request.
   * @protected
   */


		Ajax.request = function request(url, method, body, opt_headers, opt_params, opt_timeout, opt_sync, opt_withCredentials) {
			var request = new XMLHttpRequest();

			var promise = new Promise(function (resolve, reject) {
				request.onload = function () {
					if (request.aborted) {
						request.onerror();
						return;
					}
					resolve(request);
				};
				request.onerror = function () {
					var error = new Error('Request error');
					error.request = request;
					reject(error);
				};
			}).thenCatch(function (reason) {
				request.abort();
				throw reason;
			}).thenAlways(function () {
				clearTimeout(timeout);
			});

			if (opt_params) {
				url = new Uri(url).addParametersFromMultiMap(opt_params).toString();
			}

			request.open(method, url, !opt_sync);

			if (opt_withCredentials) {
				request.withCredentials = true;
			}

			if (opt_headers) {
				opt_headers.names().forEach(function (name) {
					request.setRequestHeader(name, opt_headers.getAll(name).join(', '));
				});
			}

			request.send(core.isDef(body) ? body : null);

			if (core.isDefAndNotNull(opt_timeout)) {
				var timeout = setTimeout(function () {
					promise.cancel('Request timeout');
				}, opt_timeout);
			}

			return promise;
		};

		return Ajax;
	}();

	this.Library.Ajax = Ajax;
}).call(this);
'use strict';

/**
 * Holds value error messages.
 * @const
 */

(function () {
  var errors = function errors() {
    babelHelpers.classCallCheck(this, errors);
  };

  /**
   * Invalid status error message.
   * @type {string}
   * @static
   */


  errors.INVALID_STATUS = 'Invalid status code';

  /**
   * Request error message.
   * @type {string}
   * @static
   */
  errors.REQUEST_ERROR = 'Request error';

  /**
   * Request timeout error message.
   * @type {string}
   * @static
   */
  errors.REQUEST_TIMEOUT = 'Request timeout';

  this.Library.errors = errors;
}).call(this);
'use strict';

/**
 * Metal.js browser user agent detection. It's extremely recommended the usage
 * of feature checking over browser user agent sniffing. Unfortunately, in some
 * situations feature checking can be slow or even impossible, therefore use
 * this utility with caution.
 * @see <a href="http://www.useragentstring.com/">User agent strings</a>.
 */

(function () {
	var UA = function () {
		function UA() {
			babelHelpers.classCallCheck(this, UA);
		}

		/**
   * Gets the native userAgent string from navigator if it exists. If
   * navigator or navigator.userAgent string is missing, returns an empty
   * string.
   * @return {string}
   * @private
   * @static
   */
		UA.getNativeUserAgent = function getNativeUserAgent() {
			var navigator = UA.globals.window.navigator;
			if (navigator) {
				var userAgent = navigator.userAgent;
				if (userAgent) {
					return userAgent;
				}
			}
			return '';
		};

		/**
   * Whether the user agent contains the given string, ignoring case.
   * @param {string} str
   * @return {boolean}
   * @private
   * @static
  */


		UA.matchUserAgent = function matchUserAgent(str) {
			return UA.userAgent.indexOf(str) !== -1;
		};

		/**
   * Tests the user agent.
   * @param {string} userAgent The user agent string.
   * @static
   */


		UA.testUserAgent = function testUserAgent(userAgent) {
			/**
    * Holds the user agent value extracted from browser native user agent.
    * @type {string}
    * @static
    */
			UA.userAgent = userAgent;

			/**
    * Whether the user's browser is Opera.
    * @type {boolean}
    * @static
    */
			UA.isOpera = UA.matchUserAgent('Opera') || UA.matchUserAgent('OPR');

			/**
    * Whether the user's browser is IE.
    * @type {boolean}
    * @static
    */
			UA.isIe = UA.matchUserAgent('Trident') || UA.matchUserAgent('MSIE');

			/**
    * Whether the user's browser is Edge.
    * @type {boolean}
    * @static
    */
			UA.isEdge = UA.matchUserAgent('Edge');

			/**
    * Whether the user's browser is IE or Edge.
    * @type {boolean}
    * @static
    */
			UA.isIeOrEdge = UA.isIe || UA.isEdge;

			/**
    * Whether the user's browser is Chrome.
    * @type {boolean}
    * @static
    */
			UA.isChrome = (UA.matchUserAgent('Chrome') || UA.matchUserAgent('CriOS')) && !UA.isOpera && !UA.isEdge;

			/**
    * Whether the user's browser is Safari.
    * @type {boolean}
    * @static
    */
			UA.isSafari = UA.matchUserAgent('Safari') && !(UA.isChrome || UA.isOpera || UA.isEdge);

			/**
    * Whether the user's browser is Firefox.
    * @type {boolean}
    * @static
    */
			UA.isFirefox = UA.matchUserAgent('Firefox');
		};

		return UA;
	}();

	/**
  * Exposes global references.
  * @type {object}
  * @static
  */


	UA.globals = {
		window: window
	};

	UA.testUserAgent(UA.getNativeUserAgent());

	this.Library.UA = UA;
}).call(this);
'use strict';

(function () {
	var core = this.LibraryNamed.metal.core;
	var Ajax = this.Library.Ajax;
	var MultiMap = this.Library.MultiMap;
	var CancellablePromise = this.Library.Promise;
	var errors = this.Library.errors;
	var utils = this.Library.utils;
	var globals = this.Library.globals;
	var Screen = this.Library.Screen;
	var Uri = this.Library.Uri;
	var UA = this.Library.UA;

	var RequestScreen = function (_Screen) {
		babelHelpers.inherits(RequestScreen, _Screen);

		/**
   * Request screen abstract class to perform io operations on descendant
   * screens.
   * @constructor
   * @extends {Screen}
   */
		function RequestScreen() {
			babelHelpers.classCallCheck(this, RequestScreen);

			/**
    * @inheritDoc
    * @default true
    */
			var _this = babelHelpers.possibleConstructorReturn(this, _Screen.call(this));

			_this.cacheable = true;

			/**
    * Holds default http headers to set on request.
    * @type {?Object=}
    * @default {
    *   'X-PJAX': 'true',
    *   'X-Requested-With': 'XMLHttpRequest'
    * }
    * @protected
    */
			_this.httpHeaders = {
				'X-PJAX': 'true',
				'X-Requested-With': 'XMLHttpRequest'
			};

			/**
    * Holds default http method to perform the request.
    * @type {!string}
    * @default RequestScreen.GET
    * @protected
    */
			_this.httpMethod = RequestScreen.GET;

			/**
    * Holds the XHR object responsible for the request.
    * @type {XMLHttpRequest}
    * @default null
    * @protected
    */
			_this.request = null;

			/**
    * Holds the request timeout in milliseconds.
    * @type {!number}
    * @default 30000
    * @protected
    */
			_this.timeout = 30000;
			return _this;
		}

		/**
   * Asserts that response status code is valid.
   * @param {number} status
   * @protected
   */


		RequestScreen.prototype.assertValidResponseStatusCode = function assertValidResponseStatusCode(status) {
			if (!this.isValidResponseStatusCode(status)) {
				var error = new Error(errors.INVALID_STATUS);
				error.invalidStatus = true;
				throw error;
			}
		};

		/**
   * @inheritDoc
   */


		RequestScreen.prototype.beforeUpdateHistoryPath = function beforeUpdateHistoryPath(path) {
			var redirectPath = this.getRequestPath();
			if (redirectPath && redirectPath !== path) {
				return redirectPath;
			}
			return path;
		};

		/**
   * @inheritDoc
   */


		RequestScreen.prototype.beforeUpdateHistoryState = function beforeUpdateHistoryState(state) {
			// If state is ours and navigate to post-without-redirect-get set
			// history state to null, that way Senna will reload the page on
			// popstate since it cannot predict post data.
			if (state.senna && state.form && state.redirectPath === state.path) {
				return null;
			}
			return state;
		};

		/**
   * Formats load path before invoking ajax call.
   * @param {string} path
   * @return {string} Formatted path;
   * @protected
   */


		RequestScreen.prototype.formatLoadPath = function formatLoadPath(path) {
			var uri = new Uri(path);

			uri.setHostname(globals.window.location.hostname);
			uri.setProtocol(globals.window.location.protocol);

			if (globals.window.location.port) {
				uri.setPort(globals.window.location.port);
			}

			if (UA.isIeOrEdge && this.httpMethod === RequestScreen.GET) {
				return uri.makeUnique().toString();
			}

			return uri.toString();
		};

		/**
   * Gets the http headers.
   * @return {?Object=}
   */


		RequestScreen.prototype.getHttpHeaders = function getHttpHeaders() {
			return this.httpHeaders;
		};

		/**
   * Gets the http method.
   * @return {!string}
   */


		RequestScreen.prototype.getHttpMethod = function getHttpMethod() {
			return this.httpMethod;
		};

		/**
   * Gets request path.
   * @return {string=}
   */


		RequestScreen.prototype.getRequestPath = function getRequestPath() {
			var request = this.getRequest();
			if (request) {
				var requestPath = request.requestPath;
				var responseUrl = this.maybeExtractResponseUrlFromRequest(request);
				if (responseUrl) {
					requestPath = responseUrl;
				}
				if (UA.isIeOrEdge && this.httpMethod === RequestScreen.GET) {
					requestPath = new Uri(requestPath).removeUnique().toString();
				}
				return utils.getUrlPath(requestPath);
			}
			return null;
		};

		/**
   * Gets the request object.
   * @return {?Object}
   */


		RequestScreen.prototype.getRequest = function getRequest() {
			return this.request;
		};

		/**
   * Gets the request timeout.
   * @return {!number}
   */


		RequestScreen.prototype.getTimeout = function getTimeout() {
			return this.timeout;
		};

		/**
   * Checks if response succeeded. Any status code 2xx or 3xx is considered
   * valid.
   * @param {number} statusCode
   */


		RequestScreen.prototype.isValidResponseStatusCode = function isValidResponseStatusCode(statusCode) {
			return statusCode >= 200 && statusCode <= 399;
		};

		/**
   * @inheritDoc
   */


		RequestScreen.prototype.load = function load(path) {
			var _this2 = this;

			var cache = this.getCache();
			if (core.isDefAndNotNull(cache)) {
				return CancellablePromise.resolve(cache);
			}

			var body = null;
			var httpMethod = this.httpMethod;

			var headers = new MultiMap();
			Object.keys(this.httpHeaders).forEach(function (header) {
				return headers.add(header, _this2.httpHeaders[header]);
			});

			if (globals.capturedFormElement) {
				body = new FormData(globals.capturedFormElement);
				httpMethod = RequestScreen.POST;
				if (UA.isIeOrEdge) {
					headers.add('If-None-Match', '"0"');
				}
			}

			var requestPath = this.formatLoadPath(path);
			return Ajax.request(requestPath, httpMethod, body, headers, null, this.timeout).then(function (xhr) {
				_this2.setRequest(xhr);
				_this2.assertValidResponseStatusCode(xhr.status);
				if (httpMethod === RequestScreen.GET && _this2.isCacheable()) {
					_this2.addCache(xhr.responseText);
				}
				xhr.requestPath = requestPath;
				return xhr.responseText;
			}).catch(function (reason) {
				switch (reason.message) {
					case errors.REQUEST_TIMEOUT:
						reason.timeout = true;
						break;
					case errors.REQUEST_ERROR:
						reason.requestError = true;
						break;
				}
				throw reason;
			});
		};

		/**
   * The following method tries to extract the response url value by checking
   * the custom response header 'X-Request-URL' if proper value is not present
   * in XMLHttpRequest. The value of responseURL will be the final URL
   * obtained after any redirects. Internet Explorer, Edge and Safari <= 7
   * does not yet support the feature. For more information see:
   * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseURL
   * https://xhr.spec.whatwg.org/#the-responseurl-attribute
   * @param {XMLHttpRequest} request
   * @return {?string} Response url best match.
   */


		RequestScreen.prototype.maybeExtractResponseUrlFromRequest = function maybeExtractResponseUrlFromRequest(request) {
			var responseUrl = request.responseURL;
			if (responseUrl) {
				return responseUrl;
			}
			return request.getResponseHeader(RequestScreen.X_REQUEST_URL_HEADER);
		};

		/**
   * Sets the http headers.
   * @param {?Object=} httpHeaders
   */


		RequestScreen.prototype.setHttpHeaders = function setHttpHeaders(httpHeaders) {
			this.httpHeaders = httpHeaders;
		};

		/**
   * Sets the http method.
   * @param {!string} httpMethod
   */


		RequestScreen.prototype.setHttpMethod = function setHttpMethod(httpMethod) {
			this.httpMethod = httpMethod.toLowerCase();
		};

		/**
   * Sets the request object.
   * @param {?Object} request
   */


		RequestScreen.prototype.setRequest = function setRequest(request) {
			this.request = request;
		};

		/**
   * Sets the request timeout in milliseconds.
   * @param {!number} timeout
   */


		RequestScreen.prototype.setTimeout = function setTimeout(timeout) {
			this.timeout = timeout;
		};

		return RequestScreen;
	}(Screen);

	/**
  * Holds value for method get.
  * @type {string}
  * @default 'get'
  * @static
  */


	RequestScreen.GET = 'get';

	/**
  * Holds value for method post.
  * @type {string}
  * @default 'post'
  * @static
  */
	RequestScreen.POST = 'post';

	/**
  * Fallback http header to retrieve response request url.
  * @type {string}
  * @default 'X-Request-URL'
  * @static
  */
	RequestScreen.X_REQUEST_URL_HEADER = 'X-Request-URL';

	this.Library.RequestScreen = RequestScreen;
}).call(this);
'use strict';

(function () {
	var core = this.LibraryNamed.metal.core;
	var dom = this.LibraryNamed.dom.dom;
	var globalEval = this.LibraryNamed.dom.globalEval;
	var globalEvalStyles = this.LibraryNamed.dom.globalEvalStyles;
	var CancellablePromise = this.Library.Promise;
	var globals = this.Library.globals;
	var RequestScreen = this.Library.RequestScreen;
	var Surface = this.Library.Surface;
	var UA = this.Library.UA;
	var Uri = this.Library.Uri;
	var utils = this.Library.utils;

	var HtmlScreen = function (_RequestScreen) {
		babelHelpers.inherits(HtmlScreen, _RequestScreen);

		/**
   * Screen class that perform a request and extracts surface contents from
   * the response content.
   * @constructor
   * @extends {RequestScreen}
   */
		function HtmlScreen() {
			babelHelpers.classCallCheck(this, HtmlScreen);

			/**
    * Holds the title selector. Relevant to extract the <code><title></code>
    * element from request fragments to use as the screen title.
    * @type {!string}
    * @default title
    * @protected
    */
			var _this = babelHelpers.possibleConstructorReturn(this, _RequestScreen.call(this));

			_this.titleSelector = 'title';
			return _this;
		}

		/**
   * @inheritDoc
   */


		HtmlScreen.prototype.activate = function activate() {
			_RequestScreen.prototype.activate.call(this);
			this.releaseVirtualDocument();
			this.pendingStyles = null;
		};

		/**
   * Allocates virtual document for content. After allocated virtual document
   * can be accessed by <code>this.virtualDocument</code>.
   * @param {!string} htmlString
   */


		HtmlScreen.prototype.allocateVirtualDocumentForContent = function allocateVirtualDocumentForContent(htmlString) {
			if (!this.virtualDocument) {
				this.virtualDocument = globals.document.createElement('html');
			}

			this.copyNodeAttributesFromContent_(htmlString, this.virtualDocument);

			this.virtualDocument.innerHTML = htmlString;
		};

		/**
   * Customizes logic to append styles into document. Relevant to when
   * tracking a style by id make sure to re-positions the new style in the
   * same dom order.
   * @param {Element} newStyle
   */


		HtmlScreen.prototype.appendStyleIntoDocument_ = function appendStyleIntoDocument_(newStyle) {
			var isTemporaryStyle = dom.match(newStyle, HtmlScreen.selectors.stylesTemporary);
			if (isTemporaryStyle) {
				this.pendingStyles.push(newStyle);
			}
			if (newStyle.id) {
				var styleInDoc = globals.document.getElementById(newStyle.id);
				if (styleInDoc) {
					styleInDoc.parentNode.insertBefore(newStyle, styleInDoc.nextSibling);
					return;
				}
			}
			globals.document.head.appendChild(newStyle);
		};

		/**
   * If body is used as surface forces the requested documents to have same id
   * of the initial page.
   */


		HtmlScreen.prototype.assertSameBodyIdInVirtualDocument = function assertSameBodyIdInVirtualDocument() {
			var bodySurface = this.virtualDocument.querySelector('body');
			if (!globals.document.body.id) {
				globals.document.body.id = 'senna_surface_' + core.getUid();
			}
			if (bodySurface) {
				bodySurface.id = globals.document.body.id;
			}
		};

		/**
   * Copies attributes from the <html> tag of content to the given node.
   */


		HtmlScreen.prototype.copyNodeAttributesFromContent_ = function copyNodeAttributesFromContent_(content, node) {
			content = content.replace(/[<]\s*html/ig, '<senna');
			content = content.replace(/\/html\s*\>/ig, '/senna>');
			node.innerHTML = content;
			var placeholder = node.querySelector('senna');
			if (placeholder) {
				utils.clearNodeAttributes(node);
				utils.copyNodeAttributes(placeholder, node);
			}
		};

		/**
   * @Override
   */


		HtmlScreen.prototype.disposeInternal = function disposeInternal() {
			this.disposePendingStyles();
			_RequestScreen.prototype.disposeInternal.call(this);
		};

		/**
   * Disposes pending styles if screen get disposed prior to its loading.
   */


		HtmlScreen.prototype.disposePendingStyles = function disposePendingStyles() {
			if (this.pendingStyles) {
				this.pendingStyles.forEach(function (style) {
					return dom.exitDocument(style);
				});
			}
		};

		/**
   * @Override
   */


		HtmlScreen.prototype.evaluateScripts = function evaluateScripts(surfaces) {
			var _this2 = this;

			var evaluateTrackedScripts = this.evaluateTrackedResources_(globalEval.runScriptsInElement, HtmlScreen.selectors.scripts, HtmlScreen.selectors.scriptsTemporary, HtmlScreen.selectors.scriptsPermanent);

			return evaluateTrackedScripts.then(function () {
				return _RequestScreen.prototype.evaluateScripts.call(_this2, surfaces);
			});
		};

		/**
   * @Override
   */


		HtmlScreen.prototype.evaluateStyles = function evaluateStyles(surfaces) {
			var _this3 = this;

			this.pendingStyles = [];
			var evaluateTrackedStyles = this.evaluateTrackedResources_(globalEvalStyles.runStylesInElement, HtmlScreen.selectors.styles, HtmlScreen.selectors.stylesTemporary, HtmlScreen.selectors.stylesPermanent, this.appendStyleIntoDocument_.bind(this));

			return evaluateTrackedStyles.then(function () {
				return _RequestScreen.prototype.evaluateStyles.call(_this3, surfaces);
			});
		};

		/**
   * Evaluates tracked resources inside incoming fragment and remove existing
   * temporary resources.
   * @param {?function()} appendFn Function to append the node into document.
   * @param {!string} selector Selector used to find resources to track.
   * @param {!string} selectorTemporary Selector used to find temporary
   *     resources to track.
   * @param {!string} selectorPermanent Selector used to find permanent
   *     resources to track.
   * @param {!function} opt_appendResourceFn Optional function used to
   *     evaluate fragment containing resources.
   * @return {CancellablePromise} Deferred that waits resources evaluation to
   *     complete.
   * @private
   */


		HtmlScreen.prototype.evaluateTrackedResources_ = function evaluateTrackedResources_(evaluatorFn, selector, selectorTemporary, selectorPermanent, opt_appendResourceFn) {
			var _this4 = this;

			var tracked = this.virtualQuerySelectorAll_(selector);
			var temporariesInDoc = this.querySelectorAll_(selectorTemporary);
			var permanentsInDoc = this.querySelectorAll_(selectorPermanent);

			// Adds permanent resources in document to cache.
			permanentsInDoc.forEach(function (resource) {
				var resourceKey = _this4.getResourceKey_(resource);
				if (resourceKey) {
					HtmlScreen.permanentResourcesInDoc[resourceKey] = true;
				}
			});

			var frag = dom.buildFragment();
			tracked.forEach(function (resource) {
				var resourceKey = _this4.getResourceKey_(resource);
				// Do not load permanent resources if already in document.
				if (!HtmlScreen.permanentResourcesInDoc[resourceKey]) {
					frag.appendChild(resource);
				}
				// If resource has key and is permanent add to cache.
				if (resourceKey && dom.match(resource, selectorPermanent)) {
					HtmlScreen.permanentResourcesInDoc[resourceKey] = true;
				}
			});

			return new CancellablePromise(function (resolve) {
				evaluatorFn(frag, function () {
					temporariesInDoc.forEach(function (resource) {
						return dom.exitDocument(resource);
					});
					resolve();
				}, opt_appendResourceFn);
			});
		};

		/**
   * @Override
   */


		HtmlScreen.prototype.flip = function flip(surfaces) {
			var _this5 = this;

			return _RequestScreen.prototype.flip.call(this, surfaces).then(function () {
				utils.clearNodeAttributes(document.documentElement);
				utils.copyNodeAttributes(_this5.virtualDocument, document.documentElement);
			});
		};

		/**
   * Extracts a key to identify the resource based on its attributes.
   * @param {Element} resource
   * @return {string} Extracted key based on resource attributes in order of
   *     preference: id, href, src.
   */


		HtmlScreen.prototype.getResourceKey_ = function getResourceKey_(resource) {
			return resource.id || resource.href || resource.src || '';
		};

		/**
   * @inheritDoc
   */


		HtmlScreen.prototype.getSurfaceContent = function getSurfaceContent(surfaceId) {
			var surface = this.virtualDocument.querySelector('#' + surfaceId);
			if (surface) {
				var defaultChild = surface.querySelector('#' + surfaceId + '-' + Surface.DEFAULT);
				if (defaultChild) {
					return defaultChild.innerHTML;
				}
				return surface.innerHTML; // If default content not found, use surface content
			}
		};

		/**
   * Gets the title selector.
   * @return {!string}
   */


		HtmlScreen.prototype.getTitleSelector = function getTitleSelector() {
			return this.titleSelector;
		};

		/**
   * @inheritDoc
   */


		HtmlScreen.prototype.load = function load(path) {
			var _this6 = this;

			return _RequestScreen.prototype.load.call(this, path).then(function (content) {
				_this6.allocateVirtualDocumentForContent(content);
				_this6.resolveTitleFromVirtualDocument();
				_this6.assertSameBodyIdInVirtualDocument();
				if (UA.isIe) {
					_this6.makeTemporaryStylesHrefsUnique_();
				}
				return content;
			});
		};

		/**
   * Queries temporary styles from virtual document, and makes them unique.
   * This is necessary for caching and load event firing issues specific to
   * IE11. https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7940171/
   */


		HtmlScreen.prototype.makeTemporaryStylesHrefsUnique_ = function makeTemporaryStylesHrefsUnique_() {
			var _this7 = this;

			var temporariesInDoc = this.virtualQuerySelectorAll_(HtmlScreen.selectors.stylesTemporary);
			temporariesInDoc.forEach(function (style) {
				return _this7.replaceStyleAndMakeUnique_(style);
			});
		};

		/**
   * Creates a new element from given, copies attributes, mutates href to be
   * unique to prevent caching and more than one load/error event from firing.
   */


		HtmlScreen.prototype.replaceStyleAndMakeUnique_ = function replaceStyleAndMakeUnique_(style) {
			if (style.href) {
				var newStyle = globals.document.createElement(style.tagName);
				style.href = new Uri(style.href).makeUnique().toString();
				utils.copyNodeAttributes(style, newStyle);
				style.parentNode.replaceChild(newStyle, style);
				style.disabled = true;
			}
		};

		/**
   * Queries elements from virtual document and returns an array of elements.
   * @param {!string} selector
   * @return {array.<Element>}
   */


		HtmlScreen.prototype.virtualQuerySelectorAll_ = function virtualQuerySelectorAll_(selector) {
			return Array.prototype.slice.call(this.virtualDocument.querySelectorAll(selector));
		};

		/**
   * Queries elements from document and returns an array of elements.
   * @param {!string} selector
   * @return {array.<Element>}
   */


		HtmlScreen.prototype.querySelectorAll_ = function querySelectorAll_(selector) {
			return Array.prototype.slice.call(globals.document.querySelectorAll(selector));
		};

		/**
   * Releases virtual document allocated for content.
   */


		HtmlScreen.prototype.releaseVirtualDocument = function releaseVirtualDocument() {
			this.virtualDocument = null;
		};

		/**
   * Resolves title from allocated virtual document.
   */


		HtmlScreen.prototype.resolveTitleFromVirtualDocument = function resolveTitleFromVirtualDocument() {
			var title = this.virtualDocument.querySelector(this.titleSelector);
			if (title) {
				this.setTitle(title.innerHTML.trim());
			}
		};

		/**
   * Sets the title selector.
   * @param {!string} titleSelector
   */


		HtmlScreen.prototype.setTitleSelector = function setTitleSelector(titleSelector) {
			this.titleSelector = titleSelector;
		};

		return HtmlScreen;
	}(RequestScreen);

	/**
  * Helper selectors for tracking resources.
  * @type {object}
  * @protected
  * @static
  */


	HtmlScreen.selectors = {
		scripts: 'script[data-senna-track]',
		scriptsPermanent: 'script[data-senna-track="permanent"]',
		scriptsTemporary: 'script[data-senna-track="temporary"]',
		styles: 'style[data-senna-track],link[data-senna-track]',
		stylesPermanent: 'style[data-senna-track="permanent"],link[data-senna-track="permanent"]',
		stylesTemporary: 'style[data-senna-track="temporary"],link[data-senna-track="temporary"]'
	};

	/**
  * Caches permanent resource keys.
  * @type {object}
  * @protected
  * @static
  */
	HtmlScreen.permanentResourcesInDoc = {};

	this.Library.HtmlScreen = HtmlScreen;
}).call(this);
'use strict';

(function () {
  var App = this.Library.App;
  var HtmlScreen = this.Library.HtmlScreen;
  var RequestScreen = this.Library.RequestScreen;
  var Route = this.Library.Route;
  var Screen = this.Library.Screen;
  this.Library.senna = App;
  this.LibraryNamed.senna = this.LibraryNamed.senna || {};
  this.LibraryNamed.senna.App = App;
  this.LibraryNamed.senna.HtmlScreen = HtmlScreen;
  this.LibraryNamed.senna.Route = Route;
  this.LibraryNamed.senna.RequestScreen = RequestScreen;
  this.LibraryNamed.senna.Screen = Screen;
}).call(this);
'use strict';

(function () {
	var EventEmitter = this.LibraryNamed.events.EventEmitter;
	var EventHandler = this.LibraryNamed.events.EventHandler;

	/**
  * Base class that component renderers should extend from. It defines the
  * required methods all renderers should have.
  */

	var ComponentRenderer = function (_EventEmitter) {
		babelHelpers.inherits(ComponentRenderer, _EventEmitter);

		/**
   * Constructor function for `ComponentRenderer`.
   * @param {!Component} component The component that this renderer is
   *     responsible for.
   */
		function ComponentRenderer(component) {
			babelHelpers.classCallCheck(this, ComponentRenderer);

			var _this = babelHelpers.possibleConstructorReturn(this, _EventEmitter.call(this));

			_this.component_ = component;

			_this.componentRendererEvents_ = new EventHandler();
			_this.componentRendererEvents_.add(_this.component_.once('render', _this.render.bind(_this)));
			_this.on('rendered', _this.handleRendered_);

			if (_this.component_.constructor.SYNC_UPDATES_MERGED) {
				_this.componentRendererEvents_.add(_this.component_.on('stateKeyChanged', _this.handleComponentRendererStateKeyChanged_.bind(_this)));
			} else {
				_this.componentRendererEvents_.add(_this.component_.on('stateChanged', _this.handleComponentRendererStateChanged_.bind(_this)));
			}
			return _this;
		}

		/**
   * @inheritDoc
   */


		ComponentRenderer.prototype.disposeInternal = function disposeInternal() {
			this.componentRendererEvents_.removeAllListeners();
			this.componentRendererEvents_ = null;
		};

		/**
   * Handles a `stateChanged` event from this renderer's component. Calls the
   * `update` function if the component has already been rendered for the first
   * time.
   * @param {!Object<string, Object>} changes Object containing the names
   *     of all changed state keys, each mapped to an object with its new
   *     (newVal) and previous (prevVal) values.
   * @protected
   */


		ComponentRenderer.prototype.handleComponentRendererStateChanged_ = function handleComponentRendererStateChanged_(changes) {
			if (this.shouldRerender_(changes)) {
				this.update(changes);
			}
		};

		/**
   * Handles a `stateKeyChanged` event from this renderer's component. This is
   * similar to `handleComponentRendererStateChanged_`, but only called for
   * components that have requested updates to happen synchronously.
   * @param {!{key: string, newVal: *, prevVal: *}} data
   * @protected
   */


		ComponentRenderer.prototype.handleComponentRendererStateKeyChanged_ = function handleComponentRendererStateKeyChanged_(data) {
			var changes = {
				changes: babelHelpers.defineProperty({}, data.key, data)
			};
			if (this.shouldRerender_(changes)) {
				this.update(changes);
			}
		};

		/**
   * Handles the "rendered" event.
   * @protected
   */


		ComponentRenderer.prototype.handleRendered_ = function handleRendered_() {
			this.isRendered_ = true;
		};

		/**
   * Checks if any other state property besides "element" has changed.
   * @param {!Object} changes
   * @return {boolean}
   * @protected
   */


		ComponentRenderer.prototype.hasChangedBesidesElement_ = function hasChangedBesidesElement_(changes) {
			var count = Object.keys(changes).length;
			if (changes.hasOwnProperty('element')) {
				count--;
			}
			return count > 0;
		};

		/**
   * Renders the component's whole content (including its main element).
   */


		ComponentRenderer.prototype.render = function render() {
			if (!this.component_.element) {
				this.component_.element = document.createElement('div');
			}
			this.emit('rendered', !this.isRendered_);
		};

		/**
   * Checks if the given changes object should cause a rerender.
   * @param {!Object} changes
   * @return {boolean}
   * @protected
   */


		ComponentRenderer.prototype.shouldRerender_ = function shouldRerender_(changes) {
			return this.isRendered_ && !this.skipUpdates_ && this.hasChangedBesidesElement_(changes.changes);
		};

		/**
   * Skips updates until `stopSkipUpdates` is called.
   */


		ComponentRenderer.prototype.startSkipUpdates = function startSkipUpdates() {
			this.skipUpdates_ = true;
		};

		/**
   * Stops skipping updates.
   */


		ComponentRenderer.prototype.stopSkipUpdates = function stopSkipUpdates() {
			this.skipUpdates_ = false;
		};

		/**
   * Updates the component's element html. This is automatically called when
   * the value of at least one of the component's state keys has changed.
   * @param {Object.<string, Object>} changes Object containing the names
   *     of all changed state keys, each mapped to an object with its new
   *     (newVal) and previous (prevVal) values.
   */


		ComponentRenderer.prototype.update = function update() {};

		return ComponentRenderer;
	}(EventEmitter);

	this.Library.ComponentRenderer = ComponentRenderer;
}).call(this);
'use strict';

(function () {
	var array = this.LibraryNamed.metal.array;
	var async = this.LibraryNamed.metal.async;
	var core = this.LibraryNamed.metal.core;
	var object = this.LibraryNamed.metal.object;
	var EventEmitter = this.LibraryNamed.events.EventEmitter;

	/**
  * State adds support for having object properties that can be watched for
  * changes, as well as configured with validators, setters and other options.
  * See the `addToState` method for a complete list of available configuration
  * options for each state key.
  * @constructor
  * @extends {EventEmitter}
  */

	var State = function (_EventEmitter) {
		babelHelpers.inherits(State, _EventEmitter);

		function State(opt_config) {
			babelHelpers.classCallCheck(this, State);

			/**
    * Object with information about the batch event that is currently
    * scheduled, or null if none is.
    * @type {Object}
    * @protected
    */
			var _this = babelHelpers.possibleConstructorReturn(this, _EventEmitter.call(this));

			_this.scheduledBatchData_ = null;

			/**
    * Object that contains information about all this instance's state keys.
    * @type {!Object<string, !Object>}
    * @protected
    */
			_this.stateInfo_ = {};

			_this.setShouldUseFacade(true);
			_this.mergeInvalidKeys_();
			_this.addToStateFromStaticHint_(opt_config);
			return _this;
		}

		/**
   * Adds the given key to the state.
   * @param {string} name The name of the new state key.
   * @param {Object.<string, *>=} config The configuration object for the new
   *     key. See `addToState` for supported settings.
   * @param {*} initialValue The initial value of the new key.
   */


		State.prototype.addKeyToState = function addKeyToState(name, config, initialValue) {
			this.buildKeyInfo_(name, config, initialValue);
			Object.defineProperty(this, name, this.buildKeyPropertyDef_(name));
		};

		/**
   * Adds the given key(s) to the state, together with its(their) configs.
   * Config objects support the given settings:
   *     setter - Function for normalizing state key values. It receives the new
   *     value that was set, and returns the value that should be stored.
   *
   *     validator - Function that validates state key values. When it returns
   *     false, the new value is ignored. When it returns an instance of Error,
   *     it will emit the error to the console.
   *
   *     value - The default value for the state key. Note that setting this to
   *     an object will cause all class instances to use the same reference to
   *     the object. To have each instance use a different reference for objects,
   *     use the `valueFn` option instead.
   *
   *     valueFn - A function that returns the default value for a state key.
   *
   *     writeOnce - Ignores writes to the state key after it's been first
   *     written to. That is, allows writes only when setting the value for the
   *     first time.
   * @param {!Object.<string, !Object>|string} configsOrName An object that maps
   *     configuration options for keys to be added to the state or the name of
   *     a single key to be added.
   * @param {Object.<string, *>=} opt_initialValuesOrConfig An object that maps
   *     state keys to their initial values. These values have higher precedence
   *     than the default values specified in the configurations. If a single
   *     key name was passed as the first param instead though, then this should
   *     be the configuration object for that key.
   * @param {boolean|Object|*=} opt_contextOrInitialValue If the first
   *     param passed to this method was a config object, this should be the
   *     context where the added state keys will be defined (defaults to `this`),
   *     or false if they shouldn't be defined at all. If the first param was a
   *     single key name though, this should be its initial value.
   */


		State.prototype.addToState = function addToState(configsOrName, opt_initialValuesOrConfig, opt_contextOrInitialValue) {
			if (core.isString(configsOrName)) {
				return this.addKeyToState(configsOrName, opt_initialValuesOrConfig, opt_contextOrInitialValue);
			}

			var initialValues = opt_initialValuesOrConfig || {};
			var names = Object.keys(configsOrName);

			var props = {};
			for (var i = 0; i < names.length; i++) {
				var name = names[i];
				this.buildKeyInfo_(name, configsOrName[name], initialValues[name]);
				props[name] = this.buildKeyPropertyDef_(name);
			}

			if (opt_contextOrInitialValue !== false) {
				Object.defineProperties(opt_contextOrInitialValue || this, props);
			}
		};

		/**
   * Adds state keys from super classes static hint `MyClass.STATE = {};`.
   * @param {Object.<string, !Object>=} opt_config An object that maps all the
   *     configurations for state keys.
   * @protected
   */


		State.prototype.addToStateFromStaticHint_ = function addToStateFromStaticHint_(opt_config) {
			var ctor = this.constructor;
			var defineContext = false;
			if (State.mergeStateStatic(ctor)) {
				defineContext = ctor.prototype;
			}
			this.addToState(ctor.STATE_MERGED, opt_config, defineContext);
		};

		/**
   * Checks that the given name is a valid state key name. If it's not, an error
   * will be thrown.
   * @param {string} name The name to be validated.
   * @throws {Error}
   * @protected
   */


		State.prototype.assertValidStateKeyName_ = function assertValidStateKeyName_(name) {
			if (this.constructor.INVALID_KEYS_MERGED[name]) {
				throw new Error('It\'s not allowed to create a state key with the name "' + name + '".');
			}
		};

		/**
   * Builds the info object for the specified state key.
   * @param {string} name The name of the key.
   * @param {Object} config The config object for the key.
   * @param {*} initialValue The initial value of the key.
   * @protected
   */


		State.prototype.buildKeyInfo_ = function buildKeyInfo_(name, config, initialValue) {
			this.assertValidStateKeyName_(name);

			this.stateInfo_[name] = {
				config: config || {},
				initialValue: initialValue,
				state: State.KeyStates.UNINITIALIZED
			};
		};

		/**
   * Builds the property definition object for the specified state key.
   * @param {string} name The name of the key.
   * @return {!Object}
   * @protected
   */


		State.prototype.buildKeyPropertyDef_ = function buildKeyPropertyDef_(name) {
			return {
				configurable: true,
				enumerable: true,
				get: function get() {
					return this.getStateKeyValue_(name);
				},
				set: function set(val) {
					this.setStateKeyValue_(name, val);
				}
			};
		};

		/**
   * Calls the requested function, running the appropriate code for when it's
   * passed as an actual function object or just the function's name.
   * @param {!Function|string} fn Function, or name of the function to run.
   * @param {!Array} An optional array of parameters to be passed to the
   *   function that will be called.
   * @return {*} The return value of the called function.
   * @protected
   */


		State.prototype.callFunction_ = function callFunction_(fn, args) {
			if (core.isString(fn)) {
				return this[fn].apply(this, args);
			} else if (core.isFunction(fn)) {
				return fn.apply(this, args);
			}
		};

		/**
   * Calls the state key's setter, if there is one.
   * @param {string} name The name of the key.
   * @param {*} value The value to be set.
   * @param {*} currentValue The current value.
   * @return {*} The final value to be set.
   * @protected
   */


		State.prototype.callSetter_ = function callSetter_(name, value, currentValue) {
			var info = this.stateInfo_[name];
			var config = info.config;
			if (config.setter) {
				value = this.callFunction_(config.setter, [value, currentValue]);
			}
			return value;
		};

		/**
   * Calls the state key's validator, if there is one. Emits console
   * warning if validator returns a string.
   * @param {string} name The name of the key.
   * @param {*} value The value to be validated.
   * @return {boolean} Flag indicating if value is valid or not.
   * @protected
   */


		State.prototype.callValidator_ = function callValidator_(name, value) {
			var info = this.stateInfo_[name];
			var config = info.config;
			if (config.validator) {
				var validatorReturn = this.callFunction_(config.validator, [value, name, this]);

				if (validatorReturn instanceof Error) {
					console.error('Warning: ' + validatorReturn);
				}
				return validatorReturn;
			}
			return true;
		};

		/**
   * Checks if the it's allowed to write on the requested state key.
   * @param {string} name The name of the key.
   * @return {boolean}
   */


		State.prototype.canSetState = function canSetState(name) {
			var info = this.stateInfo_[name];
			return !info.config.writeOnce || !info.written;
		};

		/**
   * @inheritDoc
   */


		State.prototype.disposeInternal = function disposeInternal() {
			_EventEmitter.prototype.disposeInternal.call(this);
			this.stateInfo_ = null;
			this.scheduledBatchData_ = null;
		};

		/**
   * Emits the state change batch event.
   * @protected
   */


		State.prototype.emitBatchEvent_ = function emitBatchEvent_() {
			if (!this.isDisposed()) {
				var data = this.scheduledBatchData_;
				this.scheduledBatchData_ = null;
				this.emit('stateChanged', data);
			}
		};

		/**
   * Returns the value of the requested state key.
   * Note: this can and should be accomplished by accessing the value as a
   * regular property. This should only be used in cases where a function is
   * actually needed.
   * @param {string} name
   * @return {*}
   */


		State.prototype.get = function get(name) {
			return this[name];
		};

		/**
   * Returns an object that maps state keys to their values.
   * @param {Array<string>=} opt_names A list of names of the keys that should
   *   be returned. If none is given, the whole state will be returned.
   * @return {Object.<string, *>}
   */


		State.prototype.getState = function getState(opt_names) {
			var state = {};
			var names = opt_names || this.getStateKeys();

			for (var i = 0; i < names.length; i++) {
				state[names[i]] = this[names[i]];
			}

			return state;
		};

		/**
   * Gets the config object for the requested state key.
   * @param {string} name The key's name.
   * @return {Object}
   * @protected
   */


		State.prototype.getStateKeyConfig = function getStateKeyConfig(name) {
			return (this.stateInfo_[name] || {}).config;
		};

		/**
   * Returns an array with all state keys.
   * @return {Array.<string>}
   */


		State.prototype.getStateKeys = function getStateKeys() {
			return Object.keys(this.stateInfo_);
		};

		/**
   * Gets the value of the specified state key. This is passed as that key's
   * getter to the `Object.defineProperty` call inside the `addKeyToState` method.
   * @param {string} name The name of the key.
   * @return {*}
   * @protected
   */


		State.prototype.getStateKeyValue_ = function getStateKeyValue_(name) {
			this.initStateKey_(name);
			return this.stateInfo_[name].value;
		};

		/**
   * Checks if the value of the state key with the given name has already been
   * set. Note that this doesn't run the key's getter.
   * @param {string} name The name of the key.
   * @return {boolean}
   */


		State.prototype.hasBeenSet = function hasBeenSet(name) {
			var info = this.stateInfo_[name];
			return info.state === State.KeyStates.INITIALIZED || info.initialValue;
		};

		/**
   * Checks if the given key is present in this instance's state.
   * @param {string} key
   * @return {boolean}
   */


		State.prototype.hasStateKey = function hasStateKey(key) {
			return !!this.stateInfo_[key];
		};

		/**
   * Informs of changes to a state key's value through an event. Won't trigger
   * the event if the value hasn't changed or if it's being initialized.
   * @param {string} name The name of the key.
   * @param {*} prevVal The previous value of the key.
   * @protected
   */


		State.prototype.informChange_ = function informChange_(name, prevVal) {
			if (this.shouldInformChange_(name, prevVal)) {
				var data = {
					key: name,
					newVal: this[name],
					prevVal: prevVal
				};
				this.emit(name + 'Changed', data);
				this.emit('stateKeyChanged', data);
				this.scheduleBatchEvent_(data);
			}
		};

		/**
   * Initializes the specified state key, giving it a first value.
   * @param {string} name The name of the key.
   * @protected
   */


		State.prototype.initStateKey_ = function initStateKey_(name) {
			var info = this.stateInfo_[name];
			if (info.state !== State.KeyStates.UNINITIALIZED) {
				return;
			}

			info.state = State.KeyStates.INITIALIZING;
			this.setInitialValue_(name);
			if (!info.written) {
				info.state = State.KeyStates.INITIALIZING_DEFAULT;
				this.setDefaultValue_(name);
			}
			info.state = State.KeyStates.INITIALIZED;
		};

		/**
   * Merges an array of values for the STATE property into a single object.
   * @param {!Array} values The values to be merged.
   * @return {!Object} The merged value.
   * @static
   * @protected
   */


		State.mergeState_ = function mergeState_(values) {
			return object.mixin.apply(null, [{}].concat(values.reverse()));
		};

		/**
   * Merges the STATE static variable for the given constructor function.
   * @param  {!Function} ctor Constructor function.
   * @return {boolean} Returns true if merge happens, false otherwise.
   * @static
   */


		State.mergeStateStatic = function mergeStateStatic(ctor) {
			return core.mergeSuperClassesProperty(ctor, 'STATE', State.mergeState_);
		};

		/**
   * Merges the values of the `INVALID_KEYS` static for the whole hierarchy of
   * the current instance.
   * @protected
   */


		State.prototype.mergeInvalidKeys_ = function mergeInvalidKeys_() {
			core.mergeSuperClassesProperty(this.constructor, 'INVALID_KEYS', function (values) {
				return array.flatten(values).reduce(function (merged, val) {
					if (val) {
						merged[val] = true;
					}
					return merged;
				}, {});
			});
		};

		/**
   * Removes the requested state key.
   * @param {string} name The name of the key.
   */


		State.prototype.removeStateKey = function removeStateKey(name) {
			this.stateInfo_[name] = null;
			delete this[name];
		};

		/**
   * Schedules a state change batch event to be emitted asynchronously.
   * @param {!Object} changeData Information about a state key's update.
   * @protected
   */


		State.prototype.scheduleBatchEvent_ = function scheduleBatchEvent_(changeData) {
			if (!this.scheduledBatchData_) {
				async.nextTick(this.emitBatchEvent_, this);
				this.scheduledBatchData_ = {
					changes: {}
				};
			}

			var name = changeData.key;
			var changes = this.scheduledBatchData_.changes;
			if (changes[name]) {
				changes[name].newVal = changeData.newVal;
			} else {
				changes[name] = changeData;
			}
		};

		/**
   * Sets the value of the requested state key.
   * Note: this can and should be accomplished by setting the state key as a
   * regular property. This should only be used in cases where a function is
   * actually needed.
   * @param {string} name
   * @param {*} value
   * @return {*}
   */


		State.prototype.set = function set(name, value) {
			if (this.hasStateKey(name)) {
				this[name] = value;
			}
		};

		/**
   * Sets the default value of the requested state key.
   * @param {string} name The name of the key.
   * @return {*}
   * @protected
   */


		State.prototype.setDefaultValue_ = function setDefaultValue_(name) {
			var config = this.stateInfo_[name].config;

			if (config.value !== undefined) {
				this[name] = config.value;
			} else {
				this[name] = this.callFunction_(config.valueFn);
			}
		};

		/**
   * Sets the initial value of the requested state key.
   * @param {string} name The name of the key.
   * @return {*}
   * @protected
   */


		State.prototype.setInitialValue_ = function setInitialValue_(name) {
			var info = this.stateInfo_[name];
			if (info.initialValue !== undefined) {
				this[name] = info.initialValue;
				info.initialValue = undefined;
			}
		};

		/**
   * Sets the value of all the specified state keys.
   * @param {!Object.<string,*>} values A map of state keys to the values they
   *   should be set to.
   * @param {function()=} opt_callback An optional function that will be run
   *   after the next batched update is triggered.
   */


		State.prototype.setState = function setState(values, opt_callback) {
			var _this2 = this;

			Object.keys(values).forEach(function (name) {
				return _this2.set(name, values[name]);
			});
			if (opt_callback && this.scheduledBatchData_) {
				this.once('stateChanged', opt_callback);
			}
		};

		/**
   * Sets the value of the specified state key. This is passed as that key's
   * setter to the `Object.defineProperty` call inside the `addKeyToState`
   * method.
   * @param {string} name The name of the key.
   * @param {*} value The new value of the key.
   * @protected
   */


		State.prototype.setStateKeyValue_ = function setStateKeyValue_(name, value) {
			if (!this.canSetState(name) || !this.validateKeyValue_(name, value)) {
				return;
			}

			var info = this.stateInfo_[name];
			if (info.initialValue === undefined && info.state === State.KeyStates.UNINITIALIZED) {
				info.state = State.KeyStates.INITIALIZED;
			}

			var prevVal = this[name];
			info.value = this.callSetter_(name, value, prevVal);
			info.written = true;
			this.informChange_(name, prevVal);
		};

		/**
   * Checks if we should inform about a state update. Updates are ignored during
   * state initialization. Otherwise, updates to primitive values are only
   * informed when the new value is different from the previous one. Updates to
   * objects (which includes functions and arrays) are always informed outside
   * initialization though, since we can't be sure if all of the internal data
   * has stayed the same.
   * @param {string} name The name of the key.
   * @param {*} prevVal The previous value of the key.
   * @return {boolean}
   * @protected
   */


		State.prototype.shouldInformChange_ = function shouldInformChange_(name, prevVal) {
			var info = this.stateInfo_[name];
			return info.state === State.KeyStates.INITIALIZED && (core.isObject(prevVal) || prevVal !== this[name]);
		};

		/**
   * Validates the state key's value, which includes calling the validator
   * defined in the key's configuration object, if there is one.
   * @param {string} name The name of the key.
   * @param {*} value The value to be validated.
   * @return {boolean} Flag indicating if value is valid or not.
   * @protected
   */


		State.prototype.validateKeyValue_ = function validateKeyValue_(name, value) {
			var info = this.stateInfo_[name];

			return info.state === State.KeyStates.INITIALIZING_DEFAULT || this.callValidator_(name, value);
		};

		return State;
	}(EventEmitter);

	/**
  * A list with state key names that will automatically be rejected as invalid.
  * Subclasses can define their own invalid keys by setting this static on their
  * constructors, which will be merged together and handled automatically.
  * @type {!Array<string>}
  */


	State.INVALID_KEYS = ['state', 'stateKey'];

	/**
  * Constants that represent the states that an a state key can be in.
  * @type {!Object}
  */
	State.KeyStates = {
		UNINITIALIZED: 0,
		INITIALIZING: 1,
		INITIALIZING_DEFAULT: 2,
		INITIALIZED: 3
	};

	this.Library.State = State;
}).call(this);
'use strict';

(function () {
	var array = this.LibraryNamed.metal.array;
	var core = this.LibraryNamed.metal.core;
	var object = this.LibraryNamed.metal.object;
	var dom = this.LibraryNamed.dom.dom;
	var DomEventEmitterProxy = this.LibraryNamed.dom.DomEventEmitterProxy;
	var ComponentRenderer = this.Library.ComponentRenderer;
	var EventHandler = this.LibraryNamed.events.EventHandler;
	var State = this.Library.State;

	/**
  * Component collects common behaviors to be followed by UI components, such
  * as Lifecycle, CSS classes management, events encapsulation and support for
  * different types of rendering.
  * Rendering logic can be done by either:
  *     - Listening to the `render` event inside the `created` lifecycle function
  *       and adding the rendering logic to the listener.
  *     - Using an existing implementation of `ComponentRenderer` like `Soy`,
  *       and following its patterns.
  *     - Building your own implementation of a `ComponentRenderer`.
  * Specifying the renderer that will be used can be done by setting the RENDERER
  * static variable to the renderer's constructor function.
  *
  * Example:
  *
  * <code>
  * class CustomComponent extends Component {
  *   constructor(config) {
  *     super(config);
  *   }
  *
  *   created() {
  *   }
  *
  *   rendered() {
  *   }
  *
  *   attached() {
  *   }
  *
  *   detached() {
  *   }
  * }
  *
  * CustomComponent.RENDERER = MyRenderer;
  *
  * CustomComponent.STATE = {
  *   title: { value: 'Title' },
  *   fontSize: { value: '10px' }
  * };
  * </code>
  *
  * @extends {State}
  */

	var Component = function (_State) {
		babelHelpers.inherits(Component, _State);

		/**
   * Constructor function for `Component`.
   * @param {Object=} opt_config An object with the initial values for this
   *     component's state.
   * @param {boolean|string|Element=} opt_parentElement The element where the
   *     component should be rendered. Can be given as a selector or an element.
   *     If `false` is passed, the component won't be rendered automatically
   *     after created.
   * @constructor
   */
		function Component(opt_config, opt_parentElement) {
			babelHelpers.classCallCheck(this, Component);

			/**
    * All listeners that were attached until the `DomEventEmitterProxy` instance
    * was created.
    * @type {!Object<string, bool>}
    * @protected
    */
			var _this = babelHelpers.possibleConstructorReturn(this, _State.call(this, opt_config));

			_this.attachedListeners_ = {};

			/**
    * Gets all nested components.
    * @type {!Array<!Component>}
    */
			_this.components = {};

			/**
    * Instance of `DomEventEmitterProxy` which proxies events from the component's
    * element to the component itself.
    * @type {DomEventEmitterProxy}
    * @protected
    */
			_this.elementEventProxy_ = null;

			/**
    * The `EventHandler` instance for events attached from the `events` state key.
    * @type {!EventHandler}
    * @protected
    */
			_this.eventsStateKeyHandler_ = new EventHandler();

			/**
    * Whether the element is in document.
    * @type {boolean}
    */
			_this.inDocument = false;

			/**
    * The initial config option passed to this constructor.
    * @type {!Object}
    * @protected
    */
			_this.initialConfig_ = opt_config || {};

			/**
    * Whether the element was rendered.
    * @type {boolean}
    */
			_this.wasRendered = false;

			/**
    * The component's element will be appended to the element this variable is
    * set to, unless the user specifies another parent when calling `render` or
    * `attach`.
    * @type {!Element}
    */
			_this.DEFAULT_ELEMENT_PARENT = document.body;

			core.mergeSuperClassesProperty(_this.constructor, 'ELEMENT_CLASSES', _this.mergeElementClasses_);
			core.mergeSuperClassesProperty(_this.constructor, 'SYNC_UPDATES', array.firstDefinedValue);

			_this.renderer_ = _this.createRenderer();
			_this.renderer_.on('rendered', _this.rendered.bind(_this));

			_this.on('stateChanged', _this.handleStateChanged_);
			_this.newListenerHandle_ = _this.on('newListener', _this.handleNewListener_);
			_this.on('eventsChanged', _this.onEventsChanged_);
			_this.addListenersFromObj_(_this.events);

			_this.created();
			if (opt_parentElement !== false) {
				_this.render_(opt_parentElement);
			}
			_this.on('elementChanged', _this.onElementChanged_);
			return _this;
		}

		/**
   * Adds the necessary classes to the component's element.
   */


		Component.prototype.addElementClasses = function addElementClasses() {
			var classesToAdd = this.constructor.ELEMENT_CLASSES_MERGED;
			if (this.elementClasses) {
				classesToAdd = classesToAdd + ' ' + this.elementClasses;
			}
			dom.addClasses(this.element, classesToAdd);
		};

		/**
   * Adds the listeners specified in the given object.
   * @param {Object} events
   * @protected
   */


		Component.prototype.addListenersFromObj_ = function addListenersFromObj_(events) {
			var eventNames = Object.keys(events || {});
			for (var i = 0; i < eventNames.length; i++) {
				var info = this.extractListenerInfo_(events[eventNames[i]]);
				if (info.fn) {
					var handler;
					if (info.selector) {
						handler = this.delegate(eventNames[i], info.selector, info.fn);
					} else {
						handler = this.on(eventNames[i], info.fn);
					}
					this.eventsStateKeyHandler_.add(handler);
				}
			}
		};

		/**
   * Invokes the attached Lifecycle. When attached, the component element is
   * appended to the DOM and any other action to be performed must be
   * implemented in this method, such as, binding DOM events. A component can
   * be re-attached multiple times.
   * @param {(string|Element)=} opt_parentElement Optional parent element
   *     to render the component.
   * @param {(string|Element)=} opt_siblingElement Optional sibling element
   *     to render the component before it. Relevant when the component needs
   *     to be rendered before an existing element in the DOM.
   * @protected
   * @chainable
   */


		Component.prototype.attach = function attach(opt_parentElement, opt_siblingElement) {
			if (!this.inDocument) {
				this.renderElement_(opt_parentElement, opt_siblingElement);
				this.inDocument = true;
				this.emit('attached', {
					parent: opt_parentElement,
					sibling: opt_siblingElement
				});
				this.attached();
			}
			return this;
		};

		/**
   * Lifecycle. When attached, the component element is appended to the DOM
   * and any other action to be performed must be implemented in this method,
   * such as, binding DOM events. A component can be re-attached multiple
   * times, therefore the undo behavior for any action performed in this phase
   * must be implemented on the detach phase.
   */


		Component.prototype.attached = function attached() {};

		/**
   * Adds the given sub component, replacing any existing one with the same ref.
   * @param {string} ref
   * @param {!Component} component
   */


		Component.prototype.addSubComponent = function addSubComponent(ref, component) {
			this.components[ref] = component;
		};

		/**
   * Lifecycle. This is called when the component has just been created, before
   * it's rendered.
   */


		Component.prototype.created = function created() {};

		/**
   * Creates the renderer for this component. Sub classes can override this to
   * return a custom renderer as needed.
   * @return {!ComponentRenderer}
   */


		Component.prototype.createRenderer = function createRenderer() {
			core.mergeSuperClassesProperty(this.constructor, 'RENDERER', array.firstDefinedValue);
			return new this.constructor.RENDERER_MERGED(this);
		};

		/**
   * Listens to a delegate event on the component's element.
   * @param {string} eventName The name of the event to listen to.
   * @param {string} selector The selector that matches the child elements that
   *   the event should be triggered for.
   * @param {!function(!Object)} callback Function to be called when the event is
   *   triggered. It will receive the normalized event object.
   * @return {!EventHandle} Can be used to remove the listener.
   */


		Component.prototype.delegate = function delegate(eventName, selector, callback) {
			return this.on('delegate:' + eventName + ':' + selector, callback);
		};

		/**
   * Invokes the detached Lifecycle. When detached, the component element is
   * removed from the DOM and any other action to be performed must be
   * implemented in this method, such as, unbinding DOM events. A component
   * can be detached multiple times.
   * @chainable
   */


		Component.prototype.detach = function detach() {
			if (this.inDocument) {
				if (this.element && this.element.parentNode) {
					this.element.parentNode.removeChild(this.element);
				}
				this.inDocument = false;
				this.detached();
			}
			this.emit('detached');
			return this;
		};

		/**
   * Lifecycle. When detached, the component element is removed from the DOM
   * and any other action to be performed must be implemented in this method,
   * such as, unbinding DOM events. A component can be detached multiple
   * times, therefore the undo behavior for any action performed in this phase
   * must be implemented on the attach phase.
   */


		Component.prototype.detached = function detached() {};

		/**
   * Lifecycle. Called when the component is disposed. Should be overridden by
   * sub classes to dispose of any internal data or events.
   */


		Component.prototype.disposed = function disposed() {};

		/**
   * @inheritDoc
   */


		Component.prototype.disposeInternal = function disposeInternal() {
			this.disposed();

			this.detach();

			if (this.elementEventProxy_) {
				this.elementEventProxy_.dispose();
				this.elementEventProxy_ = null;
			}

			this.disposeSubComponents(Object.keys(this.components));
			this.components = null;

			this.renderer_.dispose();
			this.renderer_ = null;

			_State.prototype.disposeInternal.call(this);
		};

		/**
   * Calls `dispose` on all subcomponents.
   * @param {!Array<string>} keys
   */


		Component.prototype.disposeSubComponents = function disposeSubComponents(keys) {
			for (var i = 0; i < keys.length; i++) {
				var component = this.components[keys[i]];
				if (component && !component.isDisposed()) {
					component.element = null;
					component.dispose();
					delete this.components[keys[i]];
				}
			}
		};

		/**
   * Extracts listener info from the given value.
   * @param {function()|string|{selector:string,fn:function()|string}} value
   * @return {!{selector:string,fn:function()}}
   * @protected
   */


		Component.prototype.extractListenerInfo_ = function extractListenerInfo_(value) {
			var info = {
				fn: value
			};
			if (core.isObject(value) && !core.isFunction(value)) {
				info.selector = value.selector;
				info.fn = value.fn;
			}
			if (core.isString(info.fn)) {
				info.fn = this.getListenerFn(info.fn);
			}
			return info;
		};

		/**
   * Gets the configuration object that was passed to this component's constructor.
   * @return {!Object}
   */


		Component.prototype.getInitialConfig = function getInitialConfig() {
			return this.initialConfig_;
		};

		/**
   * Gets the listener function from its name. If the name is prefixed with a
   * component id, the function will be called on that specified component. Otherwise
   * it will be called on this component instead.
   * @param {string} fnName
   * @return {function()}
   */


		Component.prototype.getListenerFn = function getListenerFn(fnName) {
			if (core.isFunction(this[fnName])) {
				return this[fnName].bind(this);
			} else {
				console.error('No function named "' + fnName + '" was found in the ' + 'component "' + core.getFunctionName(this.constructor) + '". Make ' + 'sure that you specify valid function names when adding inline listeners.');
			}
		};

		/**
   * Calls the synchronization function for the state key.
   * @param {string} key
   * @param {Object.<string, Object>=} opt_change Object containing newVal and
   *     prevVal keys.
   * @protected
   */


		Component.prototype.fireStateKeyChange_ = function fireStateKeyChange_(key, opt_change) {
			var fn = this['sync' + key.charAt(0).toUpperCase() + key.slice(1)];
			if (core.isFunction(fn)) {
				if (!opt_change) {
					opt_change = {
						newVal: this[key],
						prevVal: undefined
					};
				}
				fn.call(this, opt_change.newVal, opt_change.prevVal);
			}
		};

		/**
   * Gets the `ComponentRenderer` instance being used.
   * @return {!ComponentRenderer}
   */


		Component.prototype.getRenderer = function getRenderer() {
			return this.renderer_;
		};

		/**
   * Handles state batch changes. Calls any existing `sync` functions that
   * match the changed state keys.
   * @param {Event} event
   * @protected
   */


		Component.prototype.handleStateChanged_ = function handleStateChanged_(event) {
			this.syncStateFromChanges_(event.changes);
			this.emit('stateSynced', event);
		};

		/**
   * Handles the `newListener` event. Just flags that this event type has been
   * attached, so we can start proxying it when `DomEventEmitterProxy` is created.
   * @param {string} event
   * @protected
   */


		Component.prototype.handleNewListener_ = function handleNewListener_(event) {
			this.attachedListeners_[event] = true;
		};

		/**
   * Checks if the given function is a component constructor.
   * @param {!function()} fn Any function
   * @return {boolean}
   */


		Component.isComponentCtor = function isComponentCtor(fn) {
			return fn.prototype && fn.prototype[Component.COMPONENT_FLAG];
		};

		/**
   * Merges an array of values for the ELEMENT_CLASSES property into a single object.
   * @param {!Array.<string>} values The values to be merged.
   * @return {!string} The merged value.
   * @protected
   */


		Component.prototype.mergeElementClasses_ = function mergeElementClasses_(values) {
			var marked = {};
			return values.filter(function (val) {
				if (!val || marked[val]) {
					return false;
				} else {
					marked[val] = true;
					return true;
				}
			}).join(' ');
		};

		/**
   * Fired when the `element` state value is changed.
   * @param {!Object} event
   * @protected
   */


		Component.prototype.onElementChanged_ = function onElementChanged_(event) {
			if (event.prevVal === event.newVal) {
				// The `elementChanged` event will be fired whenever the element is set,
				// even if its value hasn't actually changed, since that's how State
				// handles objects. We need to check manually here.
				return;
			}

			this.setUpProxy_();
			this.elementEventProxy_.setOriginEmitter(event.newVal);
			if (event.newVal) {
				this.addElementClasses();
				this.syncVisible(this.visible);
			}
		};

		/**
   * Fired when the `events` state value is changed.
   * @param {!Object} event
   * @protected
   */


		Component.prototype.onEventsChanged_ = function onEventsChanged_(event) {
			this.eventsStateKeyHandler_.removeAllListeners();
			this.addListenersFromObj_(event.newVal);
		};

		/**
   * Creates and renders a component for the given constructor function. This
   * will always make sure that the constructor runs without rendering the
   * component, having the `render` step happen only after it has finished.
   * @param {!function()} Ctor The component's constructor function.
   * @param {Object|Element=} opt_configOrElement Optional config data or parent
   *     for the component.
   * @param {Element=} opt_element Optional parent for the component.
   * @return {!Component} The rendered component's instance.
   */


		Component.render = function render(Ctor, opt_configOrElement, opt_element) {
			var config = opt_configOrElement;
			var element = opt_element;
			if (core.isElement(opt_configOrElement)) {
				config = null;
				element = opt_configOrElement;
			}
			var instance = new Ctor(config, false);
			instance.render_(element);
			return instance;
		};

		/**
   * Lifecycle. Renders the component into the DOM.
   *
   * Render Lifecycle:
   *   render event - The "render" event is emitted. Renderers act on this step.
   *   state synchronization - All synchronization methods are called.
   *   attach - Attach Lifecycle is called.
   *
   * @param {(string|Element|boolean)=} opt_parentElement Optional parent element
   *     to render the component. If set to `false`, the element won't be
   *     attached to any element after rendering. In this case, `attach` should
   *     be called manually later to actually attach it to the dom.
   * @param {boolean=} opt_skipRender Optional flag indicating that the actual
   *     rendering should be skipped. Only the other render lifecycle logic will
   *     be run, like syncing state and attaching the element. Should only
   *     be set if the component has already been rendered, like sub components.
   * @protected
   */


		Component.prototype.render_ = function render_(opt_parentElement, opt_skipRender) {
			if (!opt_skipRender) {
				this.emit('render');
			}
			this.setUpProxy_();
			this.syncState_();
			this.attach(opt_parentElement);
			this.wasRendered = true;
		};

		/**
   * Renders this component as a subcomponent, meaning that no actual rendering is
   * needed since it was already rendered by the parent component. This just handles
   * other logics from the rendering lifecycle, like calling sync methods for the
   * state.
   */


		Component.prototype.renderAsSubComponent = function renderAsSubComponent() {
			this.render_(null, true);
		};

		/**
   * Renders the component element into the DOM.
   * @param {(string|Element)=} opt_parentElement Optional parent element
   *     to render the component.
   * @param {(string|Element)=} opt_siblingElement Optional sibling element
   *     to render the component before it. Relevant when the component needs
   *     to be rendered before an existing element in the DOM, e.g.
   *     `component.attach(null, existingElement)`.
   * @protected
   */


		Component.prototype.renderElement_ = function renderElement_(opt_parentElement, opt_siblingElement) {
			var element = this.element;
			if (element && (opt_siblingElement || !element.parentNode)) {
				var parent = dom.toElement(opt_parentElement) || this.DEFAULT_ELEMENT_PARENT;
				parent.insertBefore(element, dom.toElement(opt_siblingElement));
			}
		};

		/**
   * Setter logic for element state key.
   * @param {string|Element} newVal
   * @param {Element} currentVal
   * @return {Element}
   * @protected
   */


		Component.prototype.setterElementFn_ = function setterElementFn_(newVal, currentVal) {
			var element = newVal;
			if (element) {
				element = dom.toElement(newVal) || currentVal;
			}
			return element;
		};

		/**
   * Creates the `DomEventEmitterProxy` instance and has it start proxying any
   * listeners that have already been listened to.
   * @protected
   */


		Component.prototype.setUpProxy_ = function setUpProxy_() {
			if (this.elementEventProxy_) {
				return;
			}

			var proxy = new DomEventEmitterProxy(this.element, this);
			this.elementEventProxy_ = proxy;

			object.map(this.attachedListeners_, proxy.proxyEvent.bind(proxy));
			this.attachedListeners_ = null;

			this.newListenerHandle_.removeListener();
			this.newListenerHandle_ = null;
		};

		/**
   * Fires state synchronization functions.
   * @protected
   */


		Component.prototype.syncState_ = function syncState_() {
			var keys = this.getStateKeys();
			for (var i = 0; i < keys.length; i++) {
				this.fireStateKeyChange_(keys[i]);
			}
		};

		/**
   * Fires synchronization changes for state keys.
   * @param {Object.<string, Object>} changes Object containing the state key
   *     name as key and an object with newVal and prevVal as value.
   * @protected
   */


		Component.prototype.syncStateFromChanges_ = function syncStateFromChanges_(changes) {
			for (var key in changes) {
				this.fireStateKeyChange_(key, changes[key]);
			}
		};

		/**
   * State synchronization logic for the `elementClasses` state key.
   * @param {string} newVal
   * @param {string} prevVal
   */


		Component.prototype.syncElementClasses = function syncElementClasses(newVal, prevVal) {
			if (this.element && prevVal) {
				dom.removeClasses(this.element, prevVal);
			}
			this.addElementClasses();
		};

		/**
   * State synchronization logic for `visible` state key.
   * Updates the element's display value according to its visibility.
   * @param {boolean} newVal
   */


		Component.prototype.syncVisible = function syncVisible(newVal) {
			if (this.element) {
				this.element.style.display = newVal ? '' : 'none';
			}
		};

		/**
   * Lifecycle. Called whenever the component has just been rendered.
   * @param {boolean} firstRender Flag indicating if this was the component's
   *     first render.
   */


		Component.prototype.rendered = function rendered() {};

		/**
   * Validator logic for elementClasses state key.
   * @param {string} val
   * @return {boolean} True if val is a valid element classes.
   * @protected
   */


		Component.prototype.validatorElementClassesFn_ = function validatorElementClassesFn_(val) {
			return core.isString(val);
		};

		/**
   * Validator logic for element state key.
   * @param {?string|Element} val
   * @return {boolean} True if val is a valid element.
   * @protected
   */


		Component.prototype.validatorElementFn_ = function validatorElementFn_(val) {
			return core.isElement(val) || core.isString(val) || !core.isDefAndNotNull(val);
		};

		/**
   * Validator logic for the `events` state key.
   * @param {Object} val
   * @return {boolean}
   * @protected
   */


		Component.prototype.validatorEventsFn_ = function validatorEventsFn_(val) {
			return !core.isDefAndNotNull(val) || core.isObject(val);
		};

		return Component;
	}(State);

	/**
  * Component state definition.
  * @type {Object}
  * @static
  */


	Component.STATE = {
		/**
   * Component element bounding box.
   * @type {Element}
   * @writeOnce
   */
		element: {
			setter: 'setterElementFn_',
			validator: 'validatorElementFn_'
		},

		/**
   * CSS classes to be applied to the element.
   * @type {string}
   */
		elementClasses: {
			validator: 'validatorElementClassesFn_'
		},

		/**
   * Listeners that should be attached to this component. Should be provided as an object,
   * where the keys are event names and the values are the listener functions (or function
   * names).
   * @type {Object<string, (function()|string|{selector: string, fn: function()|string})>}
   */
		events: {
			validator: 'validatorEventsFn_',
			value: null
		},

		/**
   * Indicates if the component is visible or not.
   * @type {boolean}
   */
		visible: {
			validator: core.isBoolean,
			value: true
		}
	};

	Component.COMPONENT_FLAG = '__metal_component__';

	/**
  * CSS classes to be applied to the element.
  * @type {string}
  * @protected
  * @static
  */
	Component.ELEMENT_CLASSES = '';

	/**
  * The `ComponentRenderer` that should be used. Components need to set this
  * to a subclass of `ComponentRenderer` that has the rendering logic, like
  * `SoyRenderer`.
  * @type {!ComponentRenderer}
  * @static
  */
	Component.RENDERER = ComponentRenderer;

	/**
  * Flag indicating if component updates will happen synchronously. Updates are
  * done asynchronously by default, which allows changes to be batched and
  * applied together.
  * @type {boolean}
  */
	Component.SYNC_UPDATES = false;

	/**
  * A list with state key names that will automatically be rejected as invalid.
  * @type {!Array<string>}
  */
	Component.INVALID_KEYS = ['components', 'wasRendered'];

	/**
  * Sets a prototype flag to easily determine if a given constructor is for
  * a component or not.
  */
	Component.prototype[Component.COMPONENT_FLAG] = true;

	this.Library.Component = Component;
}).call(this);
'use strict';

(function () {
	var core = this.LibraryNamed.metal.core;

	/**
  * The component registry is used to register components, so they can
  * be accessible by name.
  * @type {Object}
  */

	var ComponentRegistry = function () {
		function ComponentRegistry() {
			babelHelpers.classCallCheck(this, ComponentRegistry);
		}

		/**
   * Gets the constructor function for the given component name, or
   * undefined if it hasn't been registered yet.
   * @param {string} name The component's name.
   * @return {?function}
   * @static
   */
		ComponentRegistry.getConstructor = function getConstructor(name) {
			var constructorFn = ComponentRegistry.components_[name];
			if (!constructorFn) {
				console.error('There\'s no constructor registered for the component ' + 'named ' + name + '. Components need to be registered via ' + 'ComponentRegistry.register.');
			}
			return constructorFn;
		};

		/**
   * Registers a component, so it can be found by its name.
   * @param {!Function} constructorFn The component's constructor function.
   * @param {string=} opt_name Name of the registered component. If none is given
   *   the name defined by the NAME static variable will be used instead. If that
   *   isn't set as well, the name of the constructor function will be used.
   * @static
   */


		ComponentRegistry.register = function register(constructorFn, opt_name) {
			var name = opt_name;
			if (!name) {
				if (constructorFn.hasOwnProperty('NAME')) {
					name = constructorFn.NAME;
				} else {
					name = core.getFunctionName(constructorFn);
				}
			}
			constructorFn.NAME = name;
			ComponentRegistry.components_[name] = constructorFn;
		};

		return ComponentRegistry;
	}();

	/**
  * Holds all registered components, indexed by their names.
  * @type {!Object<string, function()>}
  * @protected
  * @static
  */


	ComponentRegistry.components_ = {};

	this.Library.ComponentRegistry = ComponentRegistry;
}).call(this);
'use strict';

(function () {
  var Component = this.Library.Component;
  var ComponentRegistry = this.Library.ComponentRegistry;
  var ComponentRenderer = this.Library.ComponentRenderer;
  this.Library.component = Component;
  this.LibraryNamed.component = this.LibraryNamed.component || {};
  this.LibraryNamed.component.Component = Component;
  this.LibraryNamed.component.ComponentRegistry = ComponentRegistry;
  this.LibraryNamed.component.ComponentRenderer = ComponentRenderer;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */

  /**
   * @license
   * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS-IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  (function (global, factory) {
    factory(global.IncrementalDOM = global.IncrementalDOM || {});
  })(window, function (exports) {
    'use strict';

    /**
     * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS-IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /**
     * A cached reference to the hasOwnProperty function.
     */

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    /**
     * A constructor function that will create blank objects.
     * @constructor
     */
    function Blank() {}

    Blank.prototype = Object.create(null);

    /**
     * Used to prevent property collisions between our "map" and its prototype.
     * @param {!Object<string, *>} map The map to check.
     * @param {string} property The property to check.
     * @return {boolean} Whether map has property.
     */
    var has = function has(map, property) {
      return hasOwnProperty.call(map, property);
    };

    /**
     * Creates an map object without a prototype.
     * @return {!Object}
     */
    var createMap = function createMap() {
      return new Blank();
    };

    /**
     * The property name where we store Incremental DOM data.
     */
    var DATA_PROP = '__incrementalDOMData';

    /**
     * Keeps track of information needed to perform diffs for a given DOM node.
     * @param {!string} nodeName
     * @param {?string=} key
     * @constructor
     */
    function NodeData(nodeName, key) {
      /**
       * The attributes and their values.
       * @const {!Object<string, *>}
       */
      this.attrs = createMap();

      /**
       * An array of attribute name/value pairs, used for quickly diffing the
       * incomming attributes to see if the DOM node's attributes need to be
       * updated.
       * @const {Array<*>}
       */
      this.attrsArr = [];

      /**
       * The incoming attributes for this Node, before they are updated.
       * @const {!Object<string, *>}
       */
      this.newAttrs = createMap();

      /**
       * Whether or not the statics have been applied for the node yet.
       * {boolean}
       */
      this.staticsApplied = false;

      /**
       * The key used to identify this node, used to preserve DOM nodes when they
       * move within their parent.
       * @const
       */
      this.key = key;

      /**
       * Keeps track of children within this node by their key.
       * {!Object<string, !Element>}
       */
      this.keyMap = createMap();

      /**
       * Whether or not the keyMap is currently valid.
       * @type {boolean}
       */
      this.keyMapValid = true;

      /**
       * Whether or the associated node is, or contains, a focused Element.
       * @type {boolean}
       */
      this.focused = false;

      /**
       * The node name for this node.
       * @const {string}
       */
      this.nodeName = nodeName;

      /**
       * @type {?string}
       */
      this.text = null;
    }

    /**
     * Initializes a NodeData object for a Node.
     *
     * @param {Node} node The node to initialize data for.
     * @param {string} nodeName The node name of node.
     * @param {?string=} key The key that identifies the node.
     * @return {!NodeData} The newly initialized data object
     */
    var initData = function initData(node, nodeName, key) {
      var data = new NodeData(nodeName, key);
      node[DATA_PROP] = data;
      return data;
    };

    /**
     * Retrieves the NodeData object for a Node, creating it if necessary.
     *
     * @param {?Node} node The Node to retrieve the data for.
     * @return {!NodeData} The NodeData for this Node.
     */
    var getData = function getData(node) {
      importNode(node);
      return node[DATA_PROP];
    };

    /**
     * Imports node and its subtree, initializing caches.
     *
     * @param {?Node} node The Node to import.
     */
    var importNode = function importNode(node) {
      if (node[DATA_PROP]) {
        return;
      }

      var nodeName = node.nodeName.toLowerCase();
      var isElement = node instanceof Element;
      var key = isElement ? node.getAttribute('key') : null;
      var data = initData(node, nodeName, key);

      if (key) {
        getData(node.parentNode).keyMap[key] = node;
      }

      if (isElement) {
        var attributes = node.attributes;
        var attrs = data.attrs;
        var newAttrs = data.newAttrs;
        var attrsArr = data.attrsArr;

        for (var i = 0; i < attributes.length; i += 1) {
          var attr = attributes[i];
          var name = attr.name;
          var value = attr.value;

          attrs[name] = value;
          newAttrs[name] = undefined;
          attrsArr.push(name);
          attrsArr.push(value);
        }
      }

      for (var child = node.firstChild; child; child = child.nextSibling) {
        importNode(child);
      }
    };

    /**
     * Gets the namespace to create an element (of a given tag) in.
     * @param {string} tag The tag to get the namespace for.
     * @param {?Node} parent
     * @return {?string} The namespace to create the tag in.
     */
    var getNamespaceForTag = function getNamespaceForTag(tag, parent) {
      if (tag === 'svg') {
        return 'http://www.w3.org/2000/svg';
      }

      if (getData(parent).nodeName === 'foreignObject') {
        return null;
      }

      return parent.namespaceURI;
    };

    /**
     * Creates an Element.
     * @param {Document} doc The document with which to create the Element.
     * @param {?Node} parent
     * @param {string} tag The tag for the Element.
     * @param {?string=} key A key to identify the Element.
     * @return {!Element}
     */
    var createElement = function createElement(doc, parent, tag, key) {
      var namespace = getNamespaceForTag(tag, parent);
      var el = undefined;

      if (namespace) {
        el = doc.createElementNS(namespace, tag);
      } else {
        el = doc.createElement(tag);
      }

      initData(el, tag, key);

      return el;
    };

    /**
     * Creates a Text Node.
     * @param {Document} doc The document with which to create the Element.
     * @return {!Text}
     */
    var createText = function createText(doc) {
      var node = doc.createTextNode('');
      initData(node, '#text', null);
      return node;
    };

    /**
     * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS-IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /** @const */
    var notifications = {
      /**
       * Called after patch has compleated with any Nodes that have been created
       * and added to the DOM.
       * @type {?function(Array<!Node>)}
       */
      nodesCreated: null,

      /**
       * Called after patch has compleated with any Nodes that have been removed
       * from the DOM.
       * Note it's an applications responsibility to handle any childNodes.
       * @type {?function(Array<!Node>)}
       */
      nodesDeleted: null
    };

    /**
     * Keeps track of the state of a patch.
     * @constructor
     */
    function Context() {
      /**
       * @type {(Array<!Node>|undefined)}
       */
      this.created = notifications.nodesCreated && [];

      /**
       * @type {(Array<!Node>|undefined)}
       */
      this.deleted = notifications.nodesDeleted && [];
    }

    /**
     * @param {!Node} node
     */
    Context.prototype.markCreated = function (node) {
      if (this.created) {
        this.created.push(node);
      }
    };

    /**
     * @param {!Node} node
     */
    Context.prototype.markDeleted = function (node) {
      if (this.deleted) {
        this.deleted.push(node);
      }
    };

    /**
     * Notifies about nodes that were created during the patch opearation.
     */
    Context.prototype.notifyChanges = function () {
      if (this.created && this.created.length > 0) {
        notifications.nodesCreated(this.created);
      }

      if (this.deleted && this.deleted.length > 0) {
        notifications.nodesDeleted(this.deleted);
      }
    };

    /**
     * Copyright 2016 The Incremental DOM Authors. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS-IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /**
     * @param {!Node} node
     * @return {boolean} True if the node the root of a document, false otherwise.
     */
    var isDocumentRoot = function isDocumentRoot(node) {
      // For ShadowRoots, check if they are a DocumentFragment instead of if they
      // are a ShadowRoot so that this can work in 'use strict' if ShadowRoots are
      // not supported.
      return node instanceof Document || node instanceof DocumentFragment;
    };

    /**
     * @param {!Node} node The node to start at, inclusive.
     * @param {?Node} root The root ancestor to get until, exclusive.
     * @return {!Array<!Node>} The ancestry of DOM nodes.
     */
    var getAncestry = function getAncestry(node, root) {
      var ancestry = [];
      var cur = node;

      while (cur !== root) {
        ancestry.push(cur);
        cur = cur.parentNode;
      }

      return ancestry;
    };

    /**
     * @param {!Node} node
     * @return {!Node} The root node of the DOM tree that contains node.
     */
    var getRoot = function getRoot(node) {
      var cur = node;
      var prev = cur;

      while (cur) {
        prev = cur;
        cur = cur.parentNode;
      }

      return prev;
    };

    /**
     * @param {!Node} node The node to get the activeElement for.
     * @return {?Element} The activeElement in the Document or ShadowRoot
     *     corresponding to node, if present.
     */
    var getActiveElement = function getActiveElement(node) {
      var root = getRoot(node);
      return isDocumentRoot(root) ? root.activeElement : null;
    };

    /**
     * Gets the path of nodes that contain the focused node in the same document as
     * a reference node, up until the root.
     * @param {!Node} node The reference node to get the activeElement for.
     * @param {?Node} root The root to get the focused path until.
     * @return {!Array<Node>}
     */
    var getFocusedPath = function getFocusedPath(node, root) {
      var activeElement = getActiveElement(node);

      if (!activeElement || !node.contains(activeElement)) {
        return [];
      }

      return getAncestry(activeElement, root);
    };

    /**
     * Like insertBefore, but instead instead of moving the desired node, instead
     * moves all the other nodes after.
     * @param {?Node} parentNode
     * @param {!Node} node
     * @param {?Node} referenceNode
     */
    var moveBefore = function moveBefore(parentNode, node, referenceNode) {
      var insertReferenceNode = node.nextSibling;
      var cur = referenceNode;

      while (cur !== node) {
        var next = cur.nextSibling;
        parentNode.insertBefore(cur, insertReferenceNode);
        cur = next;
      }
    };

    /** @type {?Context} */
    var context = null;

    /** @type {?Node} */
    var currentNode = null;

    /** @type {?Node} */
    var currentParent = null;

    /** @type {?Document} */
    var doc = null;

    /**
     * @param {!Array<Node>} focusPath The nodes to mark.
     * @param {boolean} focused Whether or not they are focused.
     */
    var markFocused = function markFocused(focusPath, focused) {
      for (var i = 0; i < focusPath.length; i += 1) {
        getData(focusPath[i]).focused = focused;
      }
    };

    /**
     * Returns a patcher function that sets up and restores a patch context,
     * running the run function with the provided data.
     * @param {function((!Element|!DocumentFragment),!function(T),T=): ?Node} run
     * @return {function((!Element|!DocumentFragment),!function(T),T=): ?Node}
     * @template T
     */
    var patchFactory = function patchFactory(run) {
      /**
       * TODO(moz): These annotations won't be necessary once we switch to Closure
       * Compiler's new type inference. Remove these once the switch is done.
       *
       * @param {(!Element|!DocumentFragment)} node
       * @param {!function(T)} fn
       * @param {T=} data
       * @return {?Node} node
       * @template T
       */
      var f = function f(node, fn, data) {
        var prevContext = context;
        var prevDoc = doc;
        var prevCurrentNode = currentNode;
        var prevCurrentParent = currentParent;
        var previousInAttributes = false;
        var previousInSkip = false;

        context = new Context();
        doc = node.ownerDocument;
        currentParent = node.parentNode;

        if ('production' !== 'production') {}

        var focusPath = getFocusedPath(node, currentParent);
        markFocused(focusPath, true);
        var retVal = run(node, fn, data);
        markFocused(focusPath, false);

        if ('production' !== 'production') {}

        context.notifyChanges();

        context = prevContext;
        doc = prevDoc;
        currentNode = prevCurrentNode;
        currentParent = prevCurrentParent;

        return retVal;
      };
      return f;
    };

    /**
     * Patches the document starting at node with the provided function. This
     * function may be called during an existing patch operation.
     * @param {!Element|!DocumentFragment} node The Element or Document
     *     to patch.
     * @param {!function(T)} fn A function containing elementOpen/elementClose/etc.
     *     calls that describe the DOM.
     * @param {T=} data An argument passed to fn to represent DOM state.
     * @return {!Node} The patched node.
     * @template T
     */
    var patchInner = patchFactory(function (node, fn, data) {
      currentNode = node;

      enterNode();
      fn(data);
      exitNode();

      if ('production' !== 'production') {}

      return node;
    });

    /**
     * Patches an Element with the the provided function. Exactly one top level
     * element call should be made corresponding to `node`.
     * @param {!Element} node The Element where the patch should start.
     * @param {!function(T)} fn A function containing elementOpen/elementClose/etc.
     *     calls that describe the DOM. This should have at most one top level
     *     element call.
     * @param {T=} data An argument passed to fn to represent DOM state.
     * @return {?Node} The node if it was updated, its replacedment or null if it
     *     was removed.
     * @template T
     */
    var patchOuter = patchFactory(function (node, fn, data) {
      var startNode = /** @type {!Element} */{ nextSibling: node };
      var expectedNextNode = null;
      var expectedPrevNode = null;

      if ('production' !== 'production') {}

      currentNode = startNode;
      fn(data);

      if ('production' !== 'production') {}

      if (node !== currentNode) {
        removeChild(currentParent, node, getData(currentParent).keyMap);
      }

      return startNode === currentNode ? null : currentNode;
    });

    /**
     * Checks whether or not the current node matches the specified nodeName and
     * key.
     *
     * @param {!Node} matchNode A node to match the data to.
     * @param {?string} nodeName The nodeName for this node.
     * @param {?string=} key An optional key that identifies a node.
     * @return {boolean} True if the node matches, false otherwise.
     */
    var matches = function matches(matchNode, nodeName, key) {
      var data = getData(matchNode);

      // Key check is done using double equals as we want to treat a null key the
      // same as undefined. This should be okay as the only values allowed are
      // strings, null and undefined so the == semantics are not too weird.
      return nodeName === data.nodeName && key == data.key;
    };

    /**
     * Aligns the virtual Element definition with the actual DOM, moving the
     * corresponding DOM node to the correct location or creating it if necessary.
     * @param {string} nodeName For an Element, this should be a valid tag string.
     *     For a Text, this should be #text.
     * @param {?string=} key The key used to identify this element.
     */
    var alignWithDOM = function alignWithDOM(nodeName, key) {
      if (currentNode && matches(currentNode, nodeName, key)) {
        return;
      }

      var parentData = getData(currentParent);
      var currentNodeData = currentNode && getData(currentNode);
      var keyMap = parentData.keyMap;
      var node = undefined;

      // Check to see if the node has moved within the parent.
      if (key) {
        var keyNode = keyMap[key];
        if (keyNode) {
          if (matches(keyNode, nodeName, key)) {
            node = keyNode;
          } else if (keyNode === currentNode) {
            context.markDeleted(keyNode);
          } else {
            removeChild(currentParent, keyNode, keyMap);
          }
        }
      }

      // Create the node if it doesn't exist.
      if (!node) {
        if (nodeName === '#text') {
          node = createText(doc);
        } else {
          node = createElement(doc, currentParent, nodeName, key);
        }

        if (key) {
          keyMap[key] = node;
        }

        context.markCreated(node);
      }

      // Re-order the node into the right position, preserving focus if either
      // node or currentNode are focused by making sure that they are not detached
      // from the DOM.
      if (getData(node).focused) {
        // Move everything else before the node.
        moveBefore(currentParent, node, currentNode);
      } else if (currentNodeData && currentNodeData.key && !currentNodeData.focused) {
        // Remove the currentNode, which can always be added back since we hold a
        // reference through the keyMap. This prevents a large number of moves when
        // a keyed item is removed or moved backwards in the DOM.
        currentParent.replaceChild(node, currentNode);
        parentData.keyMapValid = false;
      } else {
        currentParent.insertBefore(node, currentNode);
      }

      currentNode = node;
    };

    /**
     * @param {?Node} node
     * @param {?Node} child
     * @param {?Object<string, !Element>} keyMap
     */
    var removeChild = function removeChild(node, child, keyMap) {
      node.removeChild(child);
      context.markDeleted( /** @type {!Node}*/child);

      var key = getData(child).key;
      if (key) {
        delete keyMap[key];
      }
    };

    /**
     * Clears out any unvisited Nodes, as the corresponding virtual element
     * functions were never called for them.
     */
    var clearUnvisitedDOM = function clearUnvisitedDOM() {
      var node = currentParent;
      var data = getData(node);
      var keyMap = data.keyMap;
      var keyMapValid = data.keyMapValid;
      var child = node.lastChild;
      var key = undefined;

      if (child === currentNode && keyMapValid) {
        return;
      }

      while (child !== currentNode) {
        removeChild(node, child, keyMap);
        child = node.lastChild;
      }

      // Clean the keyMap, removing any unusued keys.
      if (!keyMapValid) {
        for (key in keyMap) {
          child = keyMap[key];
          if (child.parentNode !== node) {
            context.markDeleted(child);
            delete keyMap[key];
          }
        }

        data.keyMapValid = true;
      }
    };

    /**
     * Changes to the first child of the current node.
     */
    var enterNode = function enterNode() {
      currentParent = currentNode;
      currentNode = null;
    };

    /**
     * @return {?Node} The next Node to be patched.
     */
    var getNextNode = function getNextNode() {
      if (currentNode) {
        return currentNode.nextSibling;
      } else {
        return currentParent.firstChild;
      }
    };

    /**
     * Changes to the next sibling of the current node.
     */
    var nextNode = function nextNode() {
      currentNode = getNextNode();
    };

    /**
     * Changes to the parent of the current node, removing any unvisited children.
     */
    var exitNode = function exitNode() {
      clearUnvisitedDOM();

      currentNode = currentParent;
      currentParent = currentParent.parentNode;
    };

    /**
     * Makes sure that the current node is an Element with a matching tagName and
     * key.
     *
     * @param {string} tag The element's tag.
     * @param {?string=} key The key used to identify this element. This can be an
     *     empty string, but performance may be better if a unique value is used
     *     when iterating over an array of items.
     * @return {!Element} The corresponding Element.
     */
    var coreElementOpen = function coreElementOpen(tag, key) {
      nextNode();
      alignWithDOM(tag, key);
      enterNode();
      return (/** @type {!Element} */currentParent
      );
    };

    /**
     * Closes the currently open Element, removing any unvisited children if
     * necessary.
     *
     * @return {!Element} The corresponding Element.
     */
    var coreElementClose = function coreElementClose() {
      if ('production' !== 'production') {}

      exitNode();
      return (/** @type {!Element} */currentNode
      );
    };

    /**
     * Makes sure the current node is a Text node and creates a Text node if it is
     * not.
     *
     * @return {!Text} The corresponding Text Node.
     */
    var coreText = function coreText() {
      nextNode();
      alignWithDOM('#text', null);
      return (/** @type {!Text} */currentNode
      );
    };

    /**
     * Gets the current Element being patched.
     * @return {!Element}
     */
    var currentElement = function currentElement() {
      if ('production' !== 'production') {}
      return (/** @type {!Element} */currentParent
      );
    };

    /**
     * @return {Node} The Node that will be evaluated for the next instruction.
     */
    var currentPointer = function currentPointer() {
      if ('production' !== 'production') {}
      return getNextNode();
    };

    /**
     * Skips the children in a subtree, allowing an Element to be closed without
     * clearing out the children.
     */
    var skip = function skip() {
      if ('production' !== 'production') {}
      currentNode = currentParent.lastChild;
    };

    /**
     * Skips the next Node to be patched, moving the pointer forward to the next
     * sibling of the current pointer.
     */
    var skipNode = nextNode;

    /**
     * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS-IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /** @const */
    var symbols = {
      default: '__default'
    };

    /**
     * @param {string} name
     * @return {string|undefined} The namespace to use for the attribute.
     */
    var getNamespace = function getNamespace(name) {
      if (name.lastIndexOf('xml:', 0) === 0) {
        return 'http://www.w3.org/XML/1998/namespace';
      }

      if (name.lastIndexOf('xlink:', 0) === 0) {
        return 'http://www.w3.org/1999/xlink';
      }
    };

    /**
     * Applies an attribute or property to a given Element. If the value is null
     * or undefined, it is removed from the Element. Otherwise, the value is set
     * as an attribute.
     * @param {!Element} el
     * @param {string} name The attribute's name.
     * @param {?(boolean|number|string)=} value The attribute's value.
     */
    var applyAttr = function applyAttr(el, name, value) {
      if (value == null) {
        el.removeAttribute(name);
      } else {
        var attrNS = getNamespace(name);
        if (attrNS) {
          el.setAttributeNS(attrNS, name, value);
        } else {
          el.setAttribute(name, value);
        }
      }
    };

    /**
     * Applies a property to a given Element.
     * @param {!Element} el
     * @param {string} name The property's name.
     * @param {*} value The property's value.
     */
    var applyProp = function applyProp(el, name, value) {
      el[name] = value;
    };

    /**
     * Applies a value to a style declaration. Supports CSS custom properties by
     * setting properties containing a dash using CSSStyleDeclaration.setProperty.
     * @param {CSSStyleDeclaration} style
     * @param {!string} prop
     * @param {*} value
     */
    var setStyleValue = function setStyleValue(style, prop, value) {
      if (prop.indexOf('-') >= 0) {
        style.setProperty(prop, /** @type {string} */value);
      } else {
        style[prop] = value;
      }
    };

    /**
     * Applies a style to an Element. No vendor prefix expansion is done for
     * property names/values.
     * @param {!Element} el
     * @param {string} name The attribute's name.
     * @param {*} style The style to set. Either a string of css or an object
     *     containing property-value pairs.
     */
    var applyStyle = function applyStyle(el, name, style) {
      if (typeof style === 'string') {
        el.style.cssText = style;
      } else {
        el.style.cssText = '';
        var elStyle = el.style;
        var obj = /** @type {!Object<string,string>} */style;

        for (var prop in obj) {
          if (has(obj, prop)) {
            setStyleValue(elStyle, prop, obj[prop]);
          }
        }
      }
    };

    /**
     * Updates a single attribute on an Element.
     * @param {!Element} el
     * @param {string} name The attribute's name.
     * @param {*} value The attribute's value. If the value is an object or
     *     function it is set on the Element, otherwise, it is set as an HTML
     *     attribute.
     */
    var applyAttributeTyped = function applyAttributeTyped(el, name, value) {
      var type = typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value);

      if (type === 'object' || type === 'function') {
        applyProp(el, name, value);
      } else {
        applyAttr(el, name, /** @type {?(boolean|number|string)} */value);
      }
    };

    /**
     * Calls the appropriate attribute mutator for this attribute.
     * @param {!Element} el
     * @param {string} name The attribute's name.
     * @param {*} value The attribute's value.
     */
    var updateAttribute = function updateAttribute(el, name, value) {
      var data = getData(el);
      var attrs = data.attrs;

      if (attrs[name] === value) {
        return;
      }

      var mutator = attributes[name] || attributes[symbols.default];
      mutator(el, name, value);

      attrs[name] = value;
    };

    /**
     * A publicly mutable object to provide custom mutators for attributes.
     * @const {!Object<string, function(!Element, string, *)>}
     */
    var attributes = createMap();

    // Special generic mutator that's called for any attribute that does not
    // have a specific mutator.
    attributes[symbols.default] = applyAttributeTyped;

    attributes['style'] = applyStyle;

    /**
     * The offset in the virtual element declaration where the attributes are
     * specified.
     * @const
     */
    var ATTRIBUTES_OFFSET = 3;

    /**
     * Builds an array of arguments for use with elementOpenStart, attr and
     * elementOpenEnd.
     * @const {Array<*>}
     */
    var argsBuilder = [];

    /**
     * @param {string} tag The element's tag.
     * @param {?string=} key The key used to identify this element. This can be an
     *     empty string, but performance may be better if a unique value is used
     *     when iterating over an array of items.
     * @param {?Array<*>=} statics An array of attribute name/value pairs of the
     *     static attributes for the Element. These will only be set once when the
     *     Element is created.
     * @param {...*} var_args, Attribute name/value pairs of the dynamic attributes
     *     for the Element.
     * @return {!Element} The corresponding Element.
     */
    var elementOpen = function elementOpen(tag, key, statics, var_args) {
      if ('production' !== 'production') {}

      var node = coreElementOpen(tag, key);
      var data = getData(node);

      if (!data.staticsApplied) {
        if (statics) {
          for (var _i = 0; _i < statics.length; _i += 2) {
            var name = /** @type {string} */statics[_i];
            var value = statics[_i + 1];
            updateAttribute(node, name, value);
          }
        }
        // Down the road, we may want to keep track of the statics array to use it
        // as an additional signal about whether a node matches or not. For now,
        // just use a marker so that we do not reapply statics.
        data.staticsApplied = true;
      }

      /*
       * Checks to see if one or more attributes have changed for a given Element.
       * When no attributes have changed, this is much faster than checking each
       * individual argument. When attributes have changed, the overhead of this is
       * minimal.
       */
      var attrsArr = data.attrsArr;
      var newAttrs = data.newAttrs;
      var isNew = !attrsArr.length;
      var i = ATTRIBUTES_OFFSET;
      var j = 0;

      for (; i < arguments.length; i += 2, j += 2) {
        var _attr = arguments[i];
        if (isNew) {
          attrsArr[j] = _attr;
          newAttrs[_attr] = undefined;
        } else if (attrsArr[j] !== _attr) {
          break;
        }

        var value = arguments[i + 1];
        if (isNew || attrsArr[j + 1] !== value) {
          attrsArr[j + 1] = value;
          updateAttribute(node, _attr, value);
        }
      }

      if (i < arguments.length || j < attrsArr.length) {
        for (; i < arguments.length; i += 1, j += 1) {
          attrsArr[j] = arguments[i];
        }

        if (j < attrsArr.length) {
          attrsArr.length = j;
        }

        /*
         * Actually perform the attribute update.
         */
        for (i = 0; i < attrsArr.length; i += 2) {
          var name = /** @type {string} */attrsArr[i];
          var value = attrsArr[i + 1];
          newAttrs[name] = value;
        }

        for (var _attr2 in newAttrs) {
          updateAttribute(node, _attr2, newAttrs[_attr2]);
          newAttrs[_attr2] = undefined;
        }
      }

      return node;
    };

    /**
     * Declares a virtual Element at the current location in the document. This
     * corresponds to an opening tag and a elementClose tag is required. This is
     * like elementOpen, but the attributes are defined using the attr function
     * rather than being passed as arguments. Must be folllowed by 0 or more calls
     * to attr, then a call to elementOpenEnd.
     * @param {string} tag The element's tag.
     * @param {?string=} key The key used to identify this element. This can be an
     *     empty string, but performance may be better if a unique value is used
     *     when iterating over an array of items.
     * @param {?Array<*>=} statics An array of attribute name/value pairs of the
     *     static attributes for the Element. These will only be set once when the
     *     Element is created.
     */
    var elementOpenStart = function elementOpenStart(tag, key, statics) {
      if ('production' !== 'production') {}

      argsBuilder[0] = tag;
      argsBuilder[1] = key;
      argsBuilder[2] = statics;
    };

    /***
     * Defines a virtual attribute at this point of the DOM. This is only valid
     * when called between elementOpenStart and elementOpenEnd.
     *
     * @param {string} name
     * @param {*} value
     */
    var attr = function attr(name, value) {
      if ('production' !== 'production') {}

      argsBuilder.push(name);
      argsBuilder.push(value);
    };

    /**
     * Closes an open tag started with elementOpenStart.
     * @return {!Element} The corresponding Element.
     */
    var elementOpenEnd = function elementOpenEnd() {
      if ('production' !== 'production') {}

      var node = elementOpen.apply(null, argsBuilder);
      argsBuilder.length = 0;
      return node;
    };

    /**
     * Closes an open virtual Element.
     *
     * @param {string} tag The element's tag.
     * @return {!Element} The corresponding Element.
     */
    var elementClose = function elementClose(tag) {
      if ('production' !== 'production') {}

      var node = coreElementClose();

      if ('production' !== 'production') {}

      return node;
    };

    /**
     * Declares a virtual Element at the current location in the document that has
     * no children.
     * @param {string} tag The element's tag.
     * @param {?string=} key The key used to identify this element. This can be an
     *     empty string, but performance may be better if a unique value is used
     *     when iterating over an array of items.
     * @param {?Array<*>=} statics An array of attribute name/value pairs of the
     *     static attributes for the Element. These will only be set once when the
     *     Element is created.
     * @param {...*} var_args Attribute name/value pairs of the dynamic attributes
     *     for the Element.
     * @return {!Element} The corresponding Element.
     */
    var elementVoid = function elementVoid(tag, key, statics, var_args) {
      elementOpen.apply(null, arguments);
      return elementClose(tag);
    };

    /**
     * Declares a virtual Text at this point in the document.
     *
     * @param {string|number|boolean} value The value of the Text.
     * @param {...(function((string|number|boolean)):string)} var_args
     *     Functions to format the value which are called only when the value has
     *     changed.
     * @return {!Text} The corresponding text node.
     */
    var text = function text(value, var_args) {
      if ('production' !== 'production') {}

      var node = coreText();
      var data = getData(node);

      if (data.text !== value) {
        data.text = /** @type {string} */value;

        var formatted = value;
        for (var i = 1; i < arguments.length; i += 1) {
          /*
           * Call the formatter function directly to prevent leaking arguments.
           * https://github.com/google/incremental-dom/pull/204#issuecomment-178223574
           */
          var fn = arguments[i];
          formatted = fn(formatted);
        }

        node.data = formatted;
      }

      return node;
    };

    exports.patch = patchInner;
    exports.patchInner = patchInner;
    exports.patchOuter = patchOuter;
    exports.currentElement = currentElement;
    exports.currentPointer = currentPointer;
    exports.skip = skip;
    exports.skipNode = skipNode;
    exports.elementVoid = elementVoid;
    exports.elementOpenStart = elementOpenStart;
    exports.elementOpenEnd = elementOpenEnd;
    exports.elementOpen = elementOpen;
    exports.elementClose = elementClose;
    exports.text = text;
    exports.attr = attr;
    exports.symbols = symbols;
    exports.attributes = attributes;
    exports.applyAttr = applyAttr;
    exports.applyProp = applyProp;
    exports.notifications = notifications;
    exports.importNode = importNode;
  });

  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
	var array = this.LibraryNamed.metal.array;
	var object = this.LibraryNamed.metal.object;

	/**
  * Class responsible for intercepting incremental dom functions through AOP.
  */

	var IncrementalDomAop = function () {
		function IncrementalDomAop() {
			babelHelpers.classCallCheck(this, IncrementalDomAop);
		}

		/**
   * Gets the original functions that are intercepted by `IncrementalDomAop`.
   * @return {!Object}
   */
		IncrementalDomAop.getOriginalFns = function getOriginalFns() {
			return fnStack[0];
		};

		/**
   * Starts intercepting calls to incremental dom, replacing them with the given
   * functions. Note that `elementVoid`, `elementOpenStart`, `elementOpenEnd`
   * and `attr` are the only ones that can't be intercepted, since they'll
   * automatically be converted into equivalent calls to `elementOpen` and
   * `elementClose`.
   * @param {!Object} fns Functions to be called instead of the original ones
   *     from incremental DOM. Should be given as a map from the function name
   *     to the function that should intercept it. All interceptors will receive
   *     the original function as the first argument, the actual arguments from
   *     from the original call following it.
   */


		IncrementalDomAop.startInterception = function startInterception(fns) {
			var originals = IncrementalDomAop.getOriginalFns();
			fns = object.map(fns, function (name, value) {
				return value.bind(null, originals[name]);
			});
			fnStack.push(object.mixin({}, originals, fns, {
				attr: fnAttr,
				elementOpenEnd: fnOpenEnd,
				elementOpenStart: fnOpenStart,
				elementVoid: fnVoid
			}));
		};

		/**
   * Restores the original `elementOpen` function from incremental dom to the
   * implementation it used before the last call to `startInterception`.
   */


		IncrementalDomAop.stopInterception = function stopInterception() {
			if (fnStack.length > 1) {
				fnStack.pop();
			}
		};

		return IncrementalDomAop;
	}();

	var fnStack = [{
		attr: IncrementalDOM.attr,
		attributes: IncrementalDOM.attributes[IncrementalDOM.symbols.default],
		elementClose: IncrementalDOM.elementClose,
		elementOpen: IncrementalDOM.elementOpen,
		elementOpenEnd: IncrementalDOM.elementOpenEnd,
		elementOpenStart: IncrementalDOM.elementOpenStart,
		elementVoid: IncrementalDOM.elementVoid,
		text: IncrementalDOM.text
	}];

	var collectedArgs = [];

	function fnAttr(name, value) {
		collectedArgs.push(name, value);
	}

	function fnOpenStart(tag, key, statics) {
		collectedArgs = [tag, key, statics];
	}

	function fnOpenEnd() {
		return getFn('elementOpen').apply(null, collectedArgs);
	}

	function fnVoid(tag) {
		getFn('elementOpen').apply(null, arguments);
		return getFn('elementClose')(tag);
	}

	function getFn(name) {
		return fnStack[fnStack.length - 1][name];
	}

	function handleCall(name) {
		return getFn(name).apply(null, array.slice(arguments, 1));
	}

	IncrementalDOM.attr = handleCall.bind(null, 'attr');
	IncrementalDOM.elementClose = handleCall.bind(null, 'elementClose');
	IncrementalDOM.elementOpen = handleCall.bind(null, 'elementOpen');
	IncrementalDOM.elementOpenEnd = handleCall.bind(null, 'elementOpenEnd');
	IncrementalDOM.elementOpenStart = handleCall.bind(null, 'elementOpenStart');
	IncrementalDOM.elementVoid = handleCall.bind(null, 'elementVoid');
	IncrementalDOM.text = handleCall.bind(null, 'text');

	IncrementalDOM.attributes[IncrementalDOM.symbols.default] = handleCall.bind(null, 'attributes');

	this.Library.IncrementalDomAop = IncrementalDomAop;
}).call(this);
'use strict';

(function () {
	var core = this.Library.metal;

	/**
  * Utility functions used to handle incremental dom calls.
  */

	var IncrementalDomUtils = function () {
		function IncrementalDomUtils() {
			babelHelpers.classCallCheck(this, IncrementalDomUtils);
		}

		/**
   * Builds the component config object from its incremental dom call's
   * arguments.
   * @param {!Array} args
   * @return {!Object}
   */
		IncrementalDomUtils.buildConfigFromCall = function buildConfigFromCall(args) {
			var config = {};
			if (args[1]) {
				config.key = args[1];
			}
			var attrsArr = (args[2] || []).concat(args.slice(3));
			for (var i = 0; i < attrsArr.length; i += 2) {
				config[attrsArr[i]] = attrsArr[i + 1];
			}
			return config;
		};

		/**
   * Builds an incremental dom call array from the given tag and config object.
   * @param {string} tag
   * @param {!Object} config
   * @return {!Array}
   */


		IncrementalDomUtils.buildCallFromConfig = function buildCallFromConfig(tag, config) {
			var call = [tag, config.key, []];
			var keys = Object.keys(config);
			for (var i = 0; i < keys.length; i++) {
				if (keys[i] !== 'children') {
					call.push(keys[i], config[keys[i]]);
				}
			}
			return call;
		};

		/**
   * Checks if the given tag represents a metal component.
   * @param {string} tag
   * @param {boolean}
   */


		IncrementalDomUtils.isComponentTag = function isComponentTag(tag) {
			return !core.isString(tag) || tag[0] === tag[0].toUpperCase();
		};

		return IncrementalDomUtils;
	}();

	this.Library.IncrementalDomUtils = IncrementalDomUtils;
}).call(this);
'use strict';

(function () {
	var core = this.Library.metal;
	var IncrementalDomAop = this.Library.IncrementalDomAop;
	var IncrementalDomUtils = this.Library.IncrementalDomUtils;

	/**
  * Provides helpers for capturing children elements from incremental dom calls,
  * as well as actually rendering those captured children via incremental dom
  * later.
  */

	var IncrementalDomChildren = function () {
		function IncrementalDomChildren() {
			babelHelpers.classCallCheck(this, IncrementalDomChildren);
		}

		/**
   * Captures all child elements from incremental dom calls.
   * @param {!IncrementalDomRenderer} renderer The renderer that is capturing
   *   children.
   * @param {!function} callback Function to be called when children have all
   *     been captured.
  	 */
		IncrementalDomChildren.capture = function capture(renderer, callback) {
			renderer_ = renderer;
			callback_ = callback;
			tree_ = {
				config: {
					children: []
				}
			};
			currentParent_ = tree_;
			isCapturing_ = true;
			IncrementalDomAop.startInterception({
				elementClose: handleInterceptedCloseCall_,
				elementOpen: handleInterceptedOpenCall_,
				text: handleInterceptedTextCall_
			});
		};

		/**
   * Renders a children tree through incremental dom.
   * @param {!{args: Array, !children: Array, isText: ?boolean}}
   * @param {function()=} opt_skipNode Optional function that is called for
   *     each node to be rendered. If it returns true, the node will be skipped.
   * @protected
   */


		IncrementalDomChildren.render = function render(tree, opt_skipNode) {
			if (isCapturing_) {
				// If capturing, just add the node directly to the captured tree.
				addChildToTree(tree);
				return;
			}

			if (opt_skipNode && opt_skipNode(tree)) {
				return;
			}

			if (core.isDef(tree.text)) {
				var args = tree.args ? tree.args : [];
				args[0] = tree.text;
				IncrementalDOM.text.apply(null, args);
			} else {
				var _args = IncrementalDomUtils.buildCallFromConfig(tree.tag, tree.config);
				IncrementalDOM.elementOpen.apply(null, _args);
				if (tree.config.children) {
					for (var i = 0; i < tree.config.children.length; i++) {
						IncrementalDomChildren.render(tree.config.children[i], opt_skipNode);
					}
				}
				IncrementalDOM.elementClose(tree.tag);
			}
		};

		return IncrementalDomChildren;
	}();

	var callback_;
	var currentParent_;
	var isCapturing_ = false;
	var renderer_;
	var tree_;

	/**
  * Adds a child element to the tree.
  * @param {!Array} args The arguments passed to the incremental dom call.
  * @param {boolean=} opt_isText Optional flag indicating if the child is a
  *     text element.
  * @protected
  */
	function addChildCallToTree_(args, opt_isText) {
		var child = babelHelpers.defineProperty({
			parent: currentParent_
		}, IncrementalDomChildren.CHILD_OWNER, renderer_);

		if (opt_isText) {
			child.text = args[0];
			if (args.length > 1) {
				child.args = args;
			}
		} else {
			child.tag = args[0];
			child.config = IncrementalDomUtils.buildConfigFromCall(args);
			if (IncrementalDomUtils.isComponentTag(child.tag)) {
				child.config.ref = core.isDefAndNotNull(child.config.ref) ? child.config.ref : renderer_.buildRef(args[0]);
			}
			child.config.children = [];
		}

		addChildToTree(child);
		return child;
	}

	function addChildToTree(child) {
		currentParent_.config.children.push(child);
	}

	/**
  * Handles an intercepted call to the `elementClose` function from incremental
  * dom.
  * @protected
  */
	function handleInterceptedCloseCall_() {
		if (currentParent_ === tree_) {
			IncrementalDomAop.stopInterception();
			isCapturing_ = false;
			callback_(tree_);
			callback_ = null;
			currentParent_ = null;
			renderer_ = null;
			tree_ = null;
		} else {
			currentParent_ = currentParent_.parent;
		}
	}

	/**
  * Handles an intercepted call to the `elementOpen` function from incremental
  * dom.
  * @param {!function()} originalFn The original function before interception.
  * @protected
  */
	function handleInterceptedOpenCall_(originalFn) {
		for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			args[_key - 1] = arguments[_key];
		}

		currentParent_ = addChildCallToTree_(args);
	}

	/**
  * Handles an intercepted call to the `text` function from incremental dom.
  * @param {!function()} originalFn The original function before interception.
  * @protected
  */
	function handleInterceptedTextCall_(originalFn) {
		for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
			args[_key2 - 1] = arguments[_key2];
		}

		addChildCallToTree_(args, true);
	}

	/**
  * Property identifying a specific object as a Metal.js child node, and
  * pointing to the renderer instance that created it.
  * @type {string}
  * @static
  */
	IncrementalDomChildren.CHILD_OWNER = '__metalChildOwner';

	this.Library.IncrementalDomChildren = IncrementalDomChildren;
}).call(this);
'use strict';

(function () {
	var comps_ = [];

	var IncrementalDomUnusedComponents = function () {
		function IncrementalDomUnusedComponents() {
			babelHelpers.classCallCheck(this, IncrementalDomUnusedComponents);
		}

		/**
   * Disposes all sub components that were not rerendered since the last
   * time this function was scheduled.
   */
		IncrementalDomUnusedComponents.disposeUnused = function disposeUnused() {
			for (var i = 0; i < comps_.length; i++) {
				if (!comps_[i].isDisposed()) {
					var renderer = comps_[i].getRenderer();
					if (!renderer.getParent()) {
						// Don't let disposing cause the element to be removed, since it may
						// be currently being reused by another component.
						comps_[i].element = null;

						var ref = comps_[i].config.ref;
						var owner = renderer.getOwner();
						if (owner.components[ref] === comps_[i]) {
							owner.disposeSubComponents([ref]);
						} else {
							comps_[i].dispose();
						}
					}
				}
			}
			comps_ = [];
		};

		/**
   * Schedules the given components to be checked and disposed if not used
   * anymore, when `IncrementalDomUnusedComponents.disposeUnused` is called.
   * @param {!Array<!Component} comps
   */


		IncrementalDomUnusedComponents.schedule = function schedule(comps) {
			for (var i = 0; i < comps.length; i++) {
				comps[i].getRenderer().parent_ = null;
				comps_.push(comps[i]);
			}
		};

		return IncrementalDomUnusedComponents;
	}();

	this.Library.IncrementalDomUnusedComponents = IncrementalDomUnusedComponents;
}).call(this);
'use strict';

(function () {
	var core = this.LibraryNamed.metal.core;
	var object = this.LibraryNamed.metal.object;
	var dom = this.Library.dom;
	var Component = this.LibraryNamed.component.Component;
	var ComponentRegistry = this.LibraryNamed.component.ComponentRegistry;
	var ComponentRenderer = this.LibraryNamed.component.ComponentRenderer;
	var IncrementalDomAop = this.Library.IncrementalDomAop;
	var IncrementalDomChildren = this.Library.IncrementalDomChildren;
	var IncrementalDomUnusedComponents = this.Library.IncrementalDomUnusedComponents;
	var IncrementalDomUtils = this.Library.IncrementalDomUtils;

	/**
  * Class responsible for rendering components via incremental dom.
  */

	var IncrementalDomRenderer = function (_ComponentRenderer) {
		babelHelpers.inherits(IncrementalDomRenderer, _ComponentRenderer);

		/**
   * @inheritDoc
   */
		function IncrementalDomRenderer(comp) {
			babelHelpers.classCallCheck(this, IncrementalDomRenderer);

			var _this = babelHelpers.possibleConstructorReturn(this, _ComponentRenderer.call(this, comp));

			comp.context = {};
			_this.setConfig_(comp, comp.getInitialConfig());
			_this.changes_ = {};
			comp.on('attached', _this.handleAttached_.bind(_this));

			if (!_this.component_.constructor.SYNC_UPDATES_MERGED) {
				// If the component is being updated synchronously we'll just reuse the
				// `handleComponentRendererStateKeyChanged_` function from
				// `ComponentRenderer`.
				comp.on('stateKeyChanged', _this.handleStateKeyChanged_.bind(_this));
			}

			// Binds functions that will be used many times, to avoid creating new
			// functions each time.
			_this.handleInterceptedAttributesCall_ = _this.handleInterceptedAttributesCall_.bind(_this);
			_this.handleInterceptedOpenCall_ = _this.handleInterceptedOpenCall_.bind(_this);
			_this.handleChildrenCaptured_ = _this.handleChildrenCaptured_.bind(_this);
			_this.handleChildRender_ = _this.handleChildRender_.bind(_this);
			_this.renderInsidePatchDontSkip_ = _this.renderInsidePatchDontSkip_.bind(_this);
			return _this;
		}

		/**
   * Attaches inline listeners found on the first component render, since those
   * may come from existing elements on the page that already have
   * data-on[eventname] attributes set to its final value. This won't trigger
   * `handleInterceptedAttributesCall_`, so we need manual work to guarantee
   * that projects using progressive enhancement like this will still work.
   * @param {!Element} node
   * @param {!Array} args
   * @protected
   */


		IncrementalDomRenderer.prototype.attachDecoratedListeners_ = function attachDecoratedListeners_(node, args) {
			if (!this.component_.wasRendered) {
				var attrs = (args[2] || []).concat(args.slice(3));
				for (var i = 0; i < attrs.length; i += 2) {
					var eventName = this.getEventFromListenerAttr_(attrs[i]);
					if (eventName && !node[eventName + '__handle__']) {
						this.attachEvent_(node, attrs[i], eventName, attrs[i + 1]);
					}
				}
			}
		};

		/**
   * Listens to the specified event, attached via incremental dom calls.
   * @param {!Element} element
   * @param {string} key
   * @param {string} eventName
   * @param {function()|string} fn
   * @protected
   */


		IncrementalDomRenderer.prototype.attachEvent_ = function attachEvent_(element, key, eventName, fn) {
			var handleKey = eventName + '__handle__';
			if (element[handleKey]) {
				element[handleKey].removeListener();
				element[handleKey] = null;
			}

			element[key] = fn;
			if (fn) {
				if (core.isString(fn)) {
					if (key[0] === 'd') {
						// Allow data-on[eventkey] listeners to stay in the dom, as they
						// won't cause conflicts.
						element.setAttribute(key, fn);
					}
					fn = this.component_.getListenerFn(fn);
				}
				element[handleKey] = dom.delegate(document, eventName, element, fn);
			} else {
				element.removeAttribute(key);
			}
		};

		/**
   * Builds the "children" config property to be passed to the current
   * component.
   * @param {!Array<!Object>} children
   * @return {!Array<!Object>}
   * @protected
   */


		IncrementalDomRenderer.prototype.buildChildren_ = function buildChildren_(children) {
			return children.length === 0 ? emptyChildren_ : children;
		};

		/**
   * Builds the key for the next component that is found.
   * @param {string} tag The component's tag.
   * @return {string}
   */


		IncrementalDomRenderer.prototype.buildRef = function buildRef(tag) {
			var ctor = core.isString(tag) ? ComponentRegistry.getConstructor(tag) : tag;
			var prefix = this.currentPrefix_ + core.getUid(ctor, true);
			var count = this.generatedRefCount_[prefix] || 0;
			this.generatedRefCount_[prefix] = count + 1;
			return prefix + 'sub' + count;
		};

		/**
   * Gets the component being currently rendered via `IncrementalDomRenderer`.
   * @return {Component}
   */


		IncrementalDomRenderer.getComponentBeingRendered = function getComponentBeingRendered() {
			return renderingComponents_[renderingComponents_.length - 1];
		};

		/**
   * Gets the sub component referenced by the given tag and config data,
   * creating it if it doesn't yet exist.
   * @param {string|!Function} tagOrCtor The tag name.
   * @param {!Object} config The config object for the sub component.
   * @return {!Component} The sub component.
   * @protected
   */


		IncrementalDomRenderer.prototype.getSubComponent_ = function getSubComponent_(tagOrCtor, config) {
			var ConstructorFn = tagOrCtor;
			if (core.isString(ConstructorFn)) {
				ConstructorFn = ComponentRegistry.getConstructor(tagOrCtor);
			}

			var comp = this.component_.components[config.ref];
			if (comp && comp.constructor !== ConstructorFn) {
				comp = null;
			}

			if (!comp) {
				comp = new ConstructorFn(config, false);
				this.component_.addSubComponent(config.ref, comp);
			}

			if (comp.wasRendered) {
				this.setConfig_(comp, config);
				comp.getRenderer().startSkipUpdates();
				comp.setState(config);
				comp.getRenderer().stopSkipUpdates();
			}
			return comp;
		};

		/**
   * Guarantees that the component's element has a parent. That's necessary
   * when calling incremental dom's `patchOuter` for now, as otherwise it will
   * throw an error if the element needs to be replaced.
   * @return {Element} The parent, in case it was added.
   * @protected
   */


		IncrementalDomRenderer.prototype.guaranteeParent_ = function guaranteeParent_() {
			var element = this.component_.element;
			if (!element || !element.parentNode) {
				var parent = document.createElement('div');
				if (element) {
					dom.append(parent, element);
				}
				return parent;
			}
		};

		/**
   * Removes the most recent component from the queue of rendering components.
   */


		IncrementalDomRenderer.finishedRenderingComponent = function finishedRenderingComponent() {
			renderingComponents_.pop();
			if (renderingComponents_.length === 0) {
				IncrementalDomUnusedComponents.disposeUnused();
			}
		};

		/**
   * Handles the `attached` listener. Stores attach data.
   * @param {!Object} data
   * @protected
   */


		IncrementalDomRenderer.prototype.handleAttached_ = function handleAttached_(data) {
			this.attachData_ = data;
		};

		/**
   * Handles an intercepted call to the attributes default handler from
   * incremental dom.
   * @param {!function()} originalFn The original function before interception.
   * @param {!Element} element
   * @param {string} name
   * @param {*} value
   * @protected
   */


		IncrementalDomRenderer.prototype.handleInterceptedAttributesCall_ = function handleInterceptedAttributesCall_(originalFn, element, name, value) {
			var eventName = this.getEventFromListenerAttr_(name);
			if (eventName) {
				this.attachEvent_(element, name, eventName, value);
				return;
			}

			if (name === 'checked') {
				// This is a temporary fix to account for incremental dom setting
				// "checked" as an attribute only, which can cause bugs since that won't
				// necessarily check/uncheck the element it's set on. See
				// https://github.com/google/incremental-dom/issues/198 for more details.
				value = core.isDefAndNotNull(value) && value !== false;
			}

			if (name === 'value' && element.value !== value) {
				// This is a temporary fix to account for incremental dom setting
				// "value" as an attribute only, which can cause bugs since that won't
				// necessarily update the input's content it's set on. See
				// https://github.com/google/incremental-dom/issues/239 for more details.
				// We only do this if the new value is different though, as otherwise the
				// browser will automatically move the typing cursor to the end of the
				// field.
				element[name] = value;
			}

			if (core.isBoolean(value)) {
				// Incremental dom sets boolean values as string data attributes, which
				// is counter intuitive. This changes the behavior to use the actual
				// boolean value.
				element[name] = value;
				if (value) {
					element.setAttribute(name, '');
				} else {
					element.removeAttribute(name);
				}
			} else {
				originalFn(element, name, value);
			}
		};

		/**
   * Handles the event of children having finished being captured.
   * @param {!Object} The captured children in tree format.
   * @protected
   */


		IncrementalDomRenderer.prototype.handleChildrenCaptured_ = function handleChildrenCaptured_(tree) {
			var _componentToRender_ = this.componentToRender_;
			var config = _componentToRender_.config;
			var tag = _componentToRender_.tag;

			config.children = this.buildChildren_(tree.config.children);
			this.componentToRender_ = null;
			this.currentPrefix_ = this.prevPrefix_;
			this.prevPrefix_ = null;
			this.renderFromTag_(tag, config);
		};

		/**
   * Handles a child being rendered via `IncrementalDomChildren.render`. Skips
   * component nodes so that they can be rendered the correct way without
   * having to recapture both them and their children via incremental dom.
   * @param {!Object} node
   * @return {boolean}
   * @protected
   */


		IncrementalDomRenderer.prototype.handleChildRender_ = function handleChildRender_(node) {
			if (node.tag && IncrementalDomUtils.isComponentTag(node.tag)) {
				node.config.children = this.buildChildren_(node.config.children);
				this.renderFromTag_(node.tag, node.config);
				return true;
			}
		};

		/**
   * Handles the `stateKeyChanged` event. Overrides original method from
   * `ComponentRenderer` to guarantee that `IncrementalDomRenderer`'s logic
   * will run first.
   * @param {!Object} data
   * @override
   * @protected
   */


		IncrementalDomRenderer.prototype.handleComponentRendererStateKeyChanged_ = function handleComponentRendererStateKeyChanged_(data) {
			this.handleStateKeyChanged_(data);
			_ComponentRenderer.prototype.handleComponentRendererStateKeyChanged_.call(this, data);
		};

		/**
   * Handles an intercepted call to the `elementOpen` function from incremental
   * dom.
   * @param {!function()} originalFn The original function before interception.
   * @param {string} tag
   * @protected
   */


		IncrementalDomRenderer.prototype.handleInterceptedOpenCall_ = function handleInterceptedOpenCall_(originalFn, tag) {
			if (IncrementalDomUtils.isComponentTag(tag)) {
				return this.handleSubComponentCall_.apply(this, arguments);
			} else {
				return this.handleRegularCall_.apply(this, arguments);
			}
		};

		/**
   * Handles an intercepted call to the `elementOpen` function from incremental
   * dom, done for a regular element. Adds any inline listeners found and makes
   * sure that component root elements are always reused.
   * @param {!function()} originalFn The original function before interception.
   * @protected
   */


		IncrementalDomRenderer.prototype.handleRegularCall_ = function handleRegularCall_(originalFn) {
			var currComp = IncrementalDomRenderer.getComponentBeingRendered();
			var currRenderer = currComp.getRenderer();

			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			if (!currRenderer.rootElementReached_ && currComp.config.key) {
				args[1] = currComp.config.key;
			}

			var node = originalFn.apply(null, args);
			this.attachDecoratedListeners_(node, args);
			this.updateElementIfNotReached_(node);
			return node;
		};

		/**
   * Handles the `stateKeyChanged` event. Stores state properties that have
   * changed since the last render.
   * @param {!Object} data
   * @protected
   */


		IncrementalDomRenderer.prototype.handleStateKeyChanged_ = function handleStateKeyChanged_(data) {
			this.changes_[data.key] = data;
		};

		/**
   * Handles an intercepted call to the `elementOpen` function from incremental
   * dom, done for a sub component element. Creates and updates the appropriate
   * sub component.
   * @param {!function()} originalFn The original function before interception.
   * @protected
   */


		IncrementalDomRenderer.prototype.handleSubComponentCall_ = function handleSubComponentCall_(originalFn) {
			for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
				args[_key2 - 1] = arguments[_key2];
			}

			var config = IncrementalDomUtils.buildConfigFromCall(args);
			config.ref = core.isDefAndNotNull(config.ref) ? config.ref : this.buildRef(args[0]);
			this.componentToRender_ = {
				config: config,
				tag: args[0]
			};

			this.prevPrefix_ = this.currentPrefix_;
			this.currentPrefix_ = config.ref;
			this.generatedRefCount_[this.currentPrefix_] = 0;
			IncrementalDomChildren.capture(this, this.handleChildrenCaptured_);
		};

		/**
   * Intercepts incremental dom calls from this component.
   * @protected
   */


		IncrementalDomRenderer.prototype.intercept_ = function intercept_() {
			IncrementalDomAop.startInterception({
				attributes: this.handleInterceptedAttributesCall_,
				elementOpen: this.handleInterceptedOpenCall_
			});
		};

		/**
   * Checks if the given object is an incremental dom node.
   * @param {!Object} node
   * @return {boolean}
   */


		IncrementalDomRenderer.isIncDomNode = function isIncDomNode(node) {
			return !!node[IncrementalDomChildren.CHILD_OWNER];
		};

		/**
   * Returns the event name if the given attribute is a listener (of the form
   * "on<EventName>"), or null if it isn't.
   * @param {string} attr
   * @return {?string}
   * @protected
   */


		IncrementalDomRenderer.prototype.getEventFromListenerAttr_ = function getEventFromListenerAttr_(attr) {
			var matches = IncrementalDomRenderer.LISTENER_REGEX.exec(attr);
			var eventName = matches ? matches[1] ? matches[1] : matches[2] : null;
			return eventName ? eventName.toLowerCase() : null;
		};

		/**
   * Gets the component that is this component's parent (that is, the one that
   * actually rendered it), or null if there's no parent.
   * @return {Component}
   */


		IncrementalDomRenderer.prototype.getParent = function getParent() {
			return this.parent_;
		};

		/**
   * Gets the component that is this component's owner (that is, the one that
   * passed its config properties and holds its ref), or null if there's none.
   * @return {Component}
   */


		IncrementalDomRenderer.prototype.getOwner = function getOwner() {
			return this.owner_;
		};

		/**
   * Creates and renders the given function, which can either be a simple
   * incremental dom function or a component constructor.
   * @param {!function()} fnOrCtor Either be a simple incremental dom function
   or a component constructor.
   * @param {Object|Element=} opt_dataOrElement Optional config data for the
   *     function or parent for the rendered content.
   * @param {Element=} opt_element Optional parent for the rendered content.
   * @return {!Component} The rendered component's instance.
   */


		IncrementalDomRenderer.render = function render(fnOrCtor, opt_dataOrElement, opt_parent) {
			if (!Component.isComponentCtor(fnOrCtor)) {
				var fn = fnOrCtor;

				var TempComponent = function (_Component) {
					babelHelpers.inherits(TempComponent, _Component);

					function TempComponent() {
						babelHelpers.classCallCheck(this, TempComponent);
						return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
					}

					TempComponent.prototype.created = function created() {
						if (IncrementalDomRenderer.getComponentBeingRendered()) {
							this.getRenderer().updateContext_(this);
						}
					};

					TempComponent.prototype.render = function render() {
						fn(this.config);
					};

					return TempComponent;
				}(Component);

				TempComponent.RENDERER = IncrementalDomRenderer;
				fnOrCtor = TempComponent;
			}
			return Component.render(fnOrCtor, opt_dataOrElement, opt_parent);
		};

		/**
   * Renders the renderer's component for the first time, patching its element
   * through the incremental dom function calls done by `renderIncDom`.
   */


		IncrementalDomRenderer.prototype.render = function render() {
			this.patch();
		};

		/**
   * Renders the given child node via its owner renderer.
   * @param {!Object} child
   */


		IncrementalDomRenderer.renderChild = function renderChild(child) {
			child[IncrementalDomChildren.CHILD_OWNER].renderChild(child);
		};

		/**
   * Renders the given child node.
   * @param {!Object} child
   */


		IncrementalDomRenderer.prototype.renderChild = function renderChild(child) {
			this.intercept_();
			IncrementalDomChildren.render(child, this.handleChildRender_);
			IncrementalDomAop.stopInterception();
		};

		/**
   * Renders the contents for the given tag.
   * @param {!function()|string} tag
   * @param {!Object} config
   * @protected
   */


		IncrementalDomRenderer.prototype.renderFromTag_ = function renderFromTag_(tag, config) {
			if (core.isString(tag) || tag.prototype.getRenderer) {
				var comp = this.renderSubComponent_(tag, config);
				this.updateElementIfNotReached_(comp.element);
				return comp.element;
			} else {
				return tag(config);
			}
		};

		/**
   * Calls functions from `IncrementalDOM` to build the component element's
   * content. Can be overriden by subclasses (for integration with template
   * engines for example).
   */


		IncrementalDomRenderer.prototype.renderIncDom = function renderIncDom() {
			if (this.component_.render) {
				this.component_.render();
			} else {
				IncrementalDOM.elementVoid('div');
			}
		};

		/**
   * Runs the incremental dom functions for rendering this component, but
   * doesn't call `patch` yet. Rather, this will be the function that should be
   * called by `patch`.
   */


		IncrementalDomRenderer.prototype.renderInsidePatch = function renderInsidePatch() {
			if (this.component_.wasRendered && !this.shouldUpdate(this.changes_) && IncrementalDOM.currentPointer() === this.component_.element) {
				if (this.component_.element) {
					IncrementalDOM.skipNode();
				}
				return;
			}
			this.renderInsidePatchDontSkip_();
		};

		/**
   * The same as `renderInsidePatch`, but without the check that may skip the
   * render action.
   * @protected
   */


		IncrementalDomRenderer.prototype.renderInsidePatchDontSkip_ = function renderInsidePatchDontSkip_() {
			IncrementalDomRenderer.startedRenderingComponent(this.component_);
			this.changes_ = {};
			this.rootElementReached_ = false;
			IncrementalDomUnusedComponents.schedule(this.childComponents_ || []);
			this.childComponents_ = [];
			this.generatedRefCount_ = {};
			this.listenersToAttach_ = [];
			this.currentPrefix_ = '';
			this.intercept_();
			this.renderIncDom();
			IncrementalDomAop.stopInterception();
			if (!this.rootElementReached_) {
				this.component_.element = null;
			} else {
				this.component_.addElementClasses();
			}
			this.emit('rendered', !this.isRendered_);
			IncrementalDomRenderer.finishedRenderingComponent();
		};

		/**
   * This updates the sub component that is represented by the given data.
   * The sub component is created, added to its parent and rendered. If it
   * had already been rendered before though, it will only have its state
   * updated instead.
   * @param {string|!function()} tagOrCtor The tag name or constructor function.
   * @param {!Object} config The config object for the sub component.
   * @return {!Component} The updated sub component.
   * @protected
   */


		IncrementalDomRenderer.prototype.renderSubComponent_ = function renderSubComponent_(tagOrCtor, config) {
			var comp = this.getSubComponent_(tagOrCtor, config);
			this.updateContext_(comp);
			var renderer = comp.getRenderer();
			if (renderer instanceof IncrementalDomRenderer) {
				var parentComp = IncrementalDomRenderer.getComponentBeingRendered();
				parentComp.getRenderer().childComponents_.push(comp);
				renderer.parent_ = parentComp;
				renderer.owner_ = this.component_;
				renderer.renderInsidePatch();
			} else {
				console.warn('IncrementalDomRenderer doesn\'t support rendering sub components ' + 'that don\'t use IncrementalDomRenderer as well, like:', comp);
			}
			if (!comp.wasRendered) {
				comp.renderAsSubComponent();
			}
			return comp;
		};

		/**
   * Sets the component's config object with its new value.
   * @param {!Component} comp The component to set the config for.
   * @param {!Object} config
   * @protected
   */


		IncrementalDomRenderer.prototype.setConfig_ = function setConfig_(comp, config) {
			var prevConfig = comp.config;
			comp.config = config;
			if (core.isFunction(comp.configChanged)) {
				comp.configChanged(config, prevConfig || {});
			}
			comp.emit('configChanged', {
				prevVal: prevConfig,
				newVal: config
			});
		};

		/**
   * Checks if the component should be updated with the current state changes.
   * Can be overridden by subclasses or implemented by components to provide
   * customized behavior (only updating when a state property used by the
   * template changes, for example).
   * @param {!Object} changes
   * @return {boolean}
   */


		IncrementalDomRenderer.prototype.shouldUpdate = function shouldUpdate(changes) {
			if (this.component_.shouldUpdate) {
				return this.component_.shouldUpdate(changes);
			}
			return true;
		};

		/**
   * Stores the component that has just started being rendered.
   * @param {!Component} comp
   */


		IncrementalDomRenderer.startedRenderingComponent = function startedRenderingComponent(comp) {
			renderingComponents_.push(comp);
		};

		/**
   * Patches the component's element with the incremental dom function calls
   * done by `renderIncDom`.
   */


		IncrementalDomRenderer.prototype.patch = function patch() {
			if (!this.component_.element && this.parent_) {
				// If the component has no content but was rendered from another component,
				// we'll need to patch this parent to make sure that any new content will
				// be added in the right place.
				this.parent_.getRenderer().patch();
				return;
			}

			var tempParent = this.guaranteeParent_();
			if (tempParent) {
				IncrementalDOM.patch(tempParent, this.renderInsidePatchDontSkip_);
				dom.exitDocument(this.component_.element);
				if (this.component_.element && this.component_.inDocument) {
					this.component_.renderElement_(this.attachData_.parent, this.attachData_.sibling);
				}
			} else {
				var element = this.component_.element;
				IncrementalDOM.patchOuter(element, this.renderInsidePatchDontSkip_);
				if (!this.component_.element) {
					dom.exitDocument(element);
				}
			}
		};

		/**
   * Updates the renderer's component when state changes, patching its element
   * through the incremental dom function calls done by `renderIncDom`. Makes
   * sure that it won't cause a rerender if the only change was for the
   * "element" property.
   */


		IncrementalDomRenderer.prototype.update = function update() {
			if (this.hasChangedBesidesElement_(this.changes_) && this.shouldUpdate(this.changes_)) {
				this.patch();
			}
		};

		/**
   * Updates this renderer's component's element with the given values, unless
   * it has already been reached by an earlier call.
   * @param {!Element} node
   * @protected
   */


		IncrementalDomRenderer.prototype.updateElementIfNotReached_ = function updateElementIfNotReached_(node) {
			var currComp = IncrementalDomRenderer.getComponentBeingRendered();
			var currRenderer = currComp.getRenderer();
			if (!currRenderer.rootElementReached_) {
				currRenderer.rootElementReached_ = true;
				if (currComp.element !== node) {
					currComp.element = node;
				}
			}
		};

		/**
   * Updates the given component's context according to the data from the
   * component that is currently being rendered.
   * @param {!Component} comp
   * @protected
   */


		IncrementalDomRenderer.prototype.updateContext_ = function updateContext_(comp) {
			var context = comp.context;
			var parent = IncrementalDomRenderer.getComponentBeingRendered();
			var childContext = parent.getChildContext ? parent.getChildContext() : {};
			object.mixin(context, parent.context, childContext);
			comp.context = context;
		};

		return IncrementalDomRenderer;
	}(ComponentRenderer);

	var renderingComponents_ = [];
	var emptyChildren_ = [];

	IncrementalDomRenderer.LISTENER_REGEX = /^(?:on([A-Z]\w+))|(?:data-on(\w+))$/;

	this.Library.IncrementalDomRenderer = IncrementalDomRenderer;
}).call(this);
'use strict';

(function () {
	var core = this.LibraryNamed.metal.core;
	var object = this.LibraryNamed.metal.object;
	var App = this.LibraryNamed.senna.App;
	var RequestScreen = this.LibraryNamed.senna.RequestScreen;
	var Route = this.LibraryNamed.senna.Route;
	var CancellablePromise = this.Library.Promise;
	var Component = this.LibraryNamed.component.Component;
	var ComponentRegistry = this.LibraryNamed.component.ComponentRegistry;
	var IncrementalDomRenderer = this.Library.IncrementalDomRenderer;

	/**
  * Router class responsible for routing links to components.
  */

	var Router = function (_Component) {
		babelHelpers.inherits(Router, _Component);

		function Router() {
			babelHelpers.classCallCheck(this, Router);
			return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
		}

		/**
   * Renders the router placeholder.
   */
		Router.prototype.render = function render() {
			IncrementalDOM.elementVoid('link', null, [], 'rel', 'metal-route');
		};

		/**
   * Creates a new `Router` instance without rendering its placeholder element.
   * @param {string} path
   * @param {!Function} component
   * @param {Object|function()} initialState
   * @return {!Router}
   */


		Router.route = function route(path, component, initialState, includeCurrentUrl) {
			return new Router({
				path: path,
				component: component,
				initialState: initialState,
				includeCurrentUrl: includeCurrentUrl
			}, false);
		};

		/**
   * Singleton to initializes and retrieve Senna.js application.
   * @return {App}
   * @static
   */


		Router.router = function router() {
			if (!Router.routerInstance) {
				Router.routerInstance = new App();
			}
			return Router.routerInstance;
		};

		/**
   * Checks if instance of router is being routed to the same active
   * component.
   * @param {Router} router
   * @return {Boolean}
   */


		Router.isRoutingToSameActiveComponent = function isRoutingToSameActiveComponent(router) {
			return Router.activeComponent instanceof router.resolveComponentConstructor();
		};

		/**
   * @inheritDoc
   */


		Router.prototype.created = function created() {
			var _this2 = this;

			this.route = new Route(this.path, function () {
				return new Router.defaultScreen(_this2);
			});
			this.route.router = this;
			Router.router().addRoutes(this.route);
		};

		/**
   * @inheritDoc
   */


		Router.prototype.disposeInternal = function disposeInternal() {
			Router.router().removeRoute(this.route);
			_Component.prototype.disposeInternal.call(this);
		};

		/**
   * Creates component instance.
   * @param {Object=} opt_config
   * @param {Element=} opt_container
   * @return {Component}
   */


		Router.prototype.createComponent = function createComponent(opt_config, opt_container) {
			return new (this.resolveComponentConstructor())(opt_config, opt_container);
		};

		/**
   * Resolves component constructor from class name or reference.
   * @return {Component}
   */


		Router.prototype.resolveComponentConstructor = function resolveComponentConstructor() {
			var componentConstructor = this.component;
			if (core.isString(componentConstructor)) {
				componentConstructor = ComponentRegistry.getConstructor(componentConstructor);
			}
			return componentConstructor;
		};

		return Router;
	}(Component);

	Router.RENDERER = IncrementalDomRenderer;

	/**
  * Router state definition.
  * @type {!Object}
  * @static
  */
	Router.STATE = {
		/**
   * If set to true navigation will cache component state deferred results.
   * @type {boolean}
   * @default true
   */
		cacheable: {
			validator: core.isBoolean,
			value: true
		},

		/**
   * Metal component to render when path is accessed.
   * @type {Component}
   */
		component: {},

		/**
   * Defines the node that the component will be rendered at.
   * @type {!string|Element}
   * @protected
   */
		container: {},

		/**
   * Flag indicating if the current url should be included in the component's
   * state.
   */
		includeCurrentUrl: {
			value: false
		},

		/**
   * Holds the load initial state value, function or deferred function that
   * resolves the component configurations.
   * @type {?Object|function(?string=)=}
   */
		initialState: {
			setter: function setter(val) {
				return val ? core.isFunction(val) ? val : function () {
					return val;
				} : null;
			}
		},

		/**
   * Defines the path which will trigger the route handler responsible for
   * rendering the metal component.
   * @type {!string|RegExp|Function}
   * @protected
   */
		path: {},

		/**
   * If set to true active component will be used when routing to same
   * component type.
   * @type {boolean}
   * @default true
   */
		reuseActiveComponent: {
			validator: core.isBoolean,
			value: true
		}
	};

	/**
  * Holds the active component.
  * @type {Component}
  * @static
  */
	Router.activeComponent = null;

	/**
  * Holds the active render state.
  * @type {*}
  * @static
  */
	Router.activeState = null;

	var ComponentScreen = function (_RequestScreen) {
		babelHelpers.inherits(ComponentScreen, _RequestScreen);

		/**
   * @inheritDoc
   */
		function ComponentScreen(router) {
			babelHelpers.classCallCheck(this, ComponentScreen);

			var _this3 = babelHelpers.possibleConstructorReturn(this, _RequestScreen.call(this));

			if (!router) {
				throw new Error('Router not specified for component screen.');
			}

			/**
    * Router responsible for the screen.
    * @type {Router}
    */
			_this3.router = router;
			return _this3;
		}

		/**
   * @inheritDoc
   */


		ComponentScreen.prototype.evaluateScripts = function evaluateScripts() {};

		/**
   * @inheritDoc
   */


		ComponentScreen.prototype.evaluateStyles = function evaluateStyles() {};

		/**
   * @inheritDoc
   */


		ComponentScreen.prototype.flip = function flip() {
			var router = this.router;
			var redirectRouter = this.maybeFindRedirectRouter();
			if (redirectRouter) {
				router = redirectRouter;
			}

			Router.activeState = this.maybeParseLastLoadedStateAsJson();
			if (router.includeCurrentUrl) {
				Router.activeState = object.mixin({}, Router.activeState, {
					currentUrl: router.path
				});
			}

			if (this.router.reuseActiveComponent && Router.isRoutingToSameActiveComponent(router)) {
				Router.activeComponent.setState(Router.activeState);
			} else {
				if (Router.activeComponent) {
					Router.activeComponent.dispose();
				}
				Router.activeComponent = router.createComponent(Router.activeState, router.container);
			}
		};

		/**
   * @inheritDoc
   */


		ComponentScreen.prototype.load = function load(path) {
			var _this4 = this;

			this.setCacheable(this.router.cacheable);
			var deferred = CancellablePromise.resolve();
			if (core.isNull(this.router.initialState)) {
				deferred = deferred.then(function () {
					return _RequestScreen.prototype.load.call(_this4, path);
				});
			} else {
				deferred = deferred.then(function () {
					return _this4.router.initialState(path);
				});
			}
			return deferred.then(function (loadedState) {
				_this4.router.lastPath = path;
				_this4.router.lastLoadedState = loadedState;
				return loadedState;
			});
		};

		/**
   * Some responses made by superclass performs a 302 redirect which will be
   * reflected into the browser history path. When redirected, make sure to
   * render the best component match to new path. If not found any, it will
   * use current router component.
   * @return {Router}
   */


		ComponentScreen.prototype.maybeFindRedirectRouter = function maybeFindRedirectRouter() {
			var redirectPath = this.beforeUpdateHistoryPath(this.router.lastPath);
			if (redirectPath !== this.router.lastPath) {
				var redirectRoute = Router.router().findRoute(redirectPath);
				if (redirectRoute) {
					return redirectRoute.router;
				}
			}
			return null;
		};

		/**
   * Maybe parses last state as Json, if not able to parse an object is
   * returned.
   * @return {object}
   */


		ComponentScreen.prototype.maybeParseLastLoadedStateAsJson = function maybeParseLastLoadedStateAsJson() {
			var state = this.router.lastLoadedState;
			try {
				return JSON.parse(state);
			} catch (err) {
				return core.isDefAndNotNull(state) ? state : {};
			}
		};

		return ComponentScreen;
	}(RequestScreen);

	/**
  * Default screen used for handling components.
  * @type {ComponentScreen}
  */


	Router.defaultScreen = ComponentScreen;

	this.Library.Router = Router;
}).call(this);
'use strict';

(function () {
	var Router = this.Library.Router;


	new Router({
		container: '#content',
		component: 'LoginForm',
		path: /\/home/,
		reuseActiveComponent: false
	}, false);

	new Router({
		container: '#content',
		component: 'LoginForm',
		path: /\//,
		reuseActiveComponent: false
	}, false);

	Router.router().dispatch();
}).call(this);
'use strict';

(function () {
	var authUrl = 'http://auth.hackadaylibrary.wedeploy.me';

	var auth = WeDeploy.auth(authUrl);

	var googleProvider = new auth.provider.Google();
	googleProvider.setProviderScope('email');
	googleProvider.setRedirectUri('/home');

	window.loginWithGoogle = function () {
		auth.signInWithRedirect(googleProvider);
	};

	auth.onSignIn(function () {
		// User logged
	});
}).call(this);
'use strict';

(function () {

  (function () {
    this.CLOSURE_NO_DEPS = true;
    this.goog = this.goog || {};

    // Copyright 2006 The Closure Library Authors. All Rights Reserved.
    //
    // Licensed under the Apache License, Version 2.0 (the "License");
    // you may not use this file except in compliance with the License.
    // You may obtain a copy of the License at
    //
    //      http://www.apache.org/licenses/LICENSE-2.0
    //
    // Unless required by applicable law or agreed to in writing, software
    // distributed under the License is distributed on an "AS-IS" BASIS,
    // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    // See the License for the specific language governing permissions and
    // limitations under the License.

    /**
     * @fileoverview Bootstrap for the Google JS Library (Closure).
     *
     * In uncompiled mode base.js will write out Closure's deps file, unless the
     * global <code>CLOSURE_NO_DEPS</code> is set to true.  This allows projects to
     * include their own deps file(s) from different locations.
     *
     * @author arv@google.com (Erik Arvidsson)
     *
     * @provideGoog
     */

    /**
     * @define {boolean} Overridden to true by the compiler when
     *     --process_closure_primitives is specified.
     */
    var COMPILED = false;

    /**
     * Base namespace for the Closure library.  Checks to see goog is already
     * defined in the current scope before assigning to prevent clobbering if
     * base.js is loaded more than once.
     *
     * @const
     */
    var goog = this.goog || {};

    /**
     * Reference to the global context.  In most cases this will be 'window'.
     */
    goog.global = this;

    /**
     * A hook for overriding the define values in uncompiled mode.
     *
     * In uncompiled mode, {@code CLOSURE_UNCOMPILED_DEFINES} may be defined before
     * loading base.js.  If a key is defined in {@code CLOSURE_UNCOMPILED_DEFINES},
     * {@code goog.define} will use the value instead of the default value.  This
     * allows flags to be overwritten without compilation (this is normally
     * accomplished with the compiler's "define" flag).
     *
     * Example:
     * <pre>
     *   var CLOSURE_UNCOMPILED_DEFINES = {'goog.DEBUG': false};
     * </pre>
     *
     * @type {Object<string, (string|number|boolean)>|undefined}
     */
    goog.global.CLOSURE_UNCOMPILED_DEFINES;

    /**
     * A hook for overriding the define values in uncompiled or compiled mode,
     * like CLOSURE_UNCOMPILED_DEFINES but effective in compiled code.  In
     * uncompiled code CLOSURE_UNCOMPILED_DEFINES takes precedence.
     *
     * Also unlike CLOSURE_UNCOMPILED_DEFINES the values must be number, boolean or
     * string literals or the compiler will emit an error.
     *
     * While any @define value may be set, only those set with goog.define will be
     * effective for uncompiled code.
     *
     * Example:
     * <pre>
     *   var CLOSURE_DEFINES = {'goog.DEBUG': false} ;
     * </pre>
     *
     * @type {Object<string, (string|number|boolean)>|undefined}
     */
    goog.global.CLOSURE_DEFINES;

    /**
     * Returns true if the specified value is not undefined.
     * WARNING: Do not use this to test if an object has a property. Use the in
     * operator instead.
     *
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is defined.
     */
    goog.isDef = function (val) {
      // void 0 always evaluates to undefined and hence we do not need to depend on
      // the definition of the global variable named 'undefined'.
      return val !== void 0;
    };

    /**
     * Builds an object structure for the provided namespace path, ensuring that
     * names that already exist are not overwritten. For example:
     * "a.b.c" -> a = {};a.b={};a.b.c={};
     * Used by goog.provide and goog.exportSymbol.
     * @param {string} name name of the object that this file defines.
     * @param {*=} opt_object the object to expose at the end of the path.
     * @param {Object=} opt_objectToExportTo The object to add the path to; default
     *     is |goog.global|.
     * @private
     */
    goog.exportPath_ = function (name, opt_object, opt_objectToExportTo) {
      var parts = name.split('.');
      var cur = opt_objectToExportTo || goog.global;

      // Internet Explorer exhibits strange behavior when throwing errors from
      // methods externed in this manner.  See the testExportSymbolExceptions in
      // base_test.html for an example.
      if (!(parts[0] in cur) && cur.execScript) {
        cur.execScript('var ' + parts[0]);
      }

      // Certain browsers cannot parse code in the form for((a in b); c;);
      // This pattern is produced by the JSCompiler when it collapses the
      // statement above into the conditional loop below. To prevent this from
      // happening, use a for-loop and reserve the init logic as below.

      // Parentheses added to eliminate strict JS warning in Firefox.
      for (var part; parts.length && (part = parts.shift());) {
        if (!parts.length && goog.isDef(opt_object)) {
          // last part and we have an object; use it
          cur[part] = opt_object;
        } else if (cur[part]) {
          cur = cur[part];
        } else {
          cur = cur[part] = {};
        }
      }
    };

    /**
     * Defines a named value. In uncompiled mode, the value is retrieved from
     * CLOSURE_DEFINES or CLOSURE_UNCOMPILED_DEFINES if the object is defined and
     * has the property specified, and otherwise used the defined defaultValue.
     * When compiled the default can be overridden using the compiler
     * options or the value set in the CLOSURE_DEFINES object.
     *
     * @param {string} name The distinguished name to provide.
     * @param {string|number|boolean} defaultValue
     */
    goog.define = function (name, defaultValue) {
      var value = defaultValue;
      if (!COMPILED) {
        if (goog.global.CLOSURE_UNCOMPILED_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_UNCOMPILED_DEFINES, name)) {
          value = goog.global.CLOSURE_UNCOMPILED_DEFINES[name];
        } else if (goog.global.CLOSURE_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES, name)) {
          value = goog.global.CLOSURE_DEFINES[name];
        }
      }
      goog.exportPath_(name, value);
    };

    /**
     * @define {boolean} DEBUG is provided as a convenience so that debugging code
     * that should not be included in a production js_binary can be easily stripped
     * by specifying --define goog.DEBUG=false to the JSCompiler. For example, most
     * toString() methods should be declared inside an "if (goog.DEBUG)" conditional
     * because they are generally used for debugging purposes and it is difficult
     * for the JSCompiler to statically determine whether they are used.
     */
    goog.define('goog.DEBUG', true);

    /**
     * @define {string} LOCALE defines the locale being used for compilation. It is
     * used to select locale specific data to be compiled in js binary. BUILD rule
     * can specify this value by "--define goog.LOCALE=<locale_name>" as JSCompiler
     * option.
     *
     * Take into account that the locale code format is important. You should use
     * the canonical Unicode format with hyphen as a delimiter. Language must be
     * lowercase, Language Script - Capitalized, Region - UPPERCASE.
     * There are few examples: pt-BR, en, en-US, sr-Latin-BO, zh-Hans-CN.
     *
     * See more info about locale codes here:
     * http://www.unicode.org/reports/tr35/#Unicode_Language_and_Locale_Identifiers
     *
     * For language codes you should use values defined by ISO 693-1. See it here
     * http://www.w3.org/WAI/ER/IG/ert/iso639.htm. There is only one exception from
     * this rule: the Hebrew language. For legacy reasons the old code (iw) should
     * be used instead of the new code (he), see http://wiki/Main/IIISynonyms.
     */
    goog.define('goog.LOCALE', 'en'); // default to en


    /**
     * @define {boolean} Whether this code is running on trusted sites.
     *
     * On untrusted sites, several native functions can be defined or overridden by
     * external libraries like Prototype, Datejs, and JQuery and setting this flag
     * to false forces closure to use its own implementations when possible.
     *
     * If your JavaScript can be loaded by a third party site and you are wary about
     * relying on non-standard implementations, specify
     * "--define goog.TRUSTED_SITE=false" to the JSCompiler.
     */
    goog.define('goog.TRUSTED_SITE', true);

    /**
     * @define {boolean} Whether a project is expected to be running in strict mode.
     *
     * This define can be used to trigger alternate implementations compatible with
     * running in EcmaScript Strict mode or warn about unavailable functionality.
     * @see https://goo.gl/g5EoHI
     *
     */
    goog.define('goog.STRICT_MODE_COMPATIBLE', false);

    /**
     * @define {boolean} Whether code that calls {@link goog.setTestOnly} should
     *     be disallowed in the compilation unit.
     */
    goog.define('goog.DISALLOW_TEST_ONLY_CODE', COMPILED && !goog.DEBUG);

    /**
     * @define {boolean} Whether to use a Chrome app CSP-compliant method for
     *     loading scripts via goog.require. @see appendScriptSrcNode_.
     */
    goog.define('goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING', false);

    /**
     * Defines a namespace in Closure.
     *
     * A namespace may only be defined once in a codebase. It may be defined using
     * goog.provide() or goog.module().
     *
     * The presence of one or more goog.provide() calls in a file indicates
     * that the file defines the given objects/namespaces.
     * Provided symbols must not be null or undefined.
     *
     * In addition, goog.provide() creates the object stubs for a namespace
     * (for example, goog.provide("goog.foo.bar") will create the object
     * goog.foo.bar if it does not already exist).
     *
     * Build tools also scan for provide/require/module statements
     * to discern dependencies, build dependency files (see deps.js), etc.
     *
     * @see goog.require
     * @see goog.module
     * @param {string} name Namespace provided by this file in the form
     *     "goog.package.part".
     */
    goog.provide = function (name) {
      if (!COMPILED) {
        // Ensure that the same namespace isn't provided twice.
        // A goog.module/goog.provide maps a goog.require to a specific file
        if (goog.isProvided_(name)) {
          throw Error('Namespace "' + name + '" already declared.');
        }
      }

      goog.constructNamespace_(name);
    };

    /**
     * @param {string} name Namespace provided by this file in the form
     *     "goog.package.part".
     * @param {Object=} opt_obj The object to embed in the namespace.
     * @private
     */
    goog.constructNamespace_ = function (name, opt_obj) {
      if (!COMPILED) {
        delete goog.implicitNamespaces_[name];

        var namespace = name;
        while (namespace = namespace.substring(0, namespace.lastIndexOf('.'))) {
          if (goog.getObjectByName(namespace)) {
            break;
          }
          goog.implicitNamespaces_[namespace] = true;
        }
      }

      goog.exportPath_(name, opt_obj);
    };

    /**
     * Module identifier validation regexp.
     * Note: This is a conservative check, it is very possible to be more lenient,
     *   the primary exclusion here is "/" and "\" and a leading ".", these
     *   restrictions are intended to leave the door open for using goog.require
     *   with relative file paths rather than module identifiers.
     * @private
     */
    goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;

    /**
     * Defines a module in Closure.
     *
     * Marks that this file must be loaded as a module and claims the namespace.
     *
     * A namespace may only be defined once in a codebase. It may be defined using
     * goog.provide() or goog.module().
     *
     * goog.module() has three requirements:
     * - goog.module may not be used in the same file as goog.provide.
     * - goog.module must be the first statement in the file.
     * - only one goog.module is allowed per file.
     *
     * When a goog.module annotated file is loaded, it is enclosed in
     * a strict function closure. This means that:
     * - any variables declared in a goog.module file are private to the file
     * (not global), though the compiler is expected to inline the module.
     * - The code must obey all the rules of "strict" JavaScript.
     * - the file will be marked as "use strict"
     *
     * NOTE: unlike goog.provide, goog.module does not declare any symbols by
     * itself. If declared symbols are desired, use
     * goog.module.declareLegacyNamespace().
     *
     *
     * See the public goog.module proposal: http://goo.gl/Va1hin
     *
     * @param {string} name Namespace provided by this file in the form
     *     "goog.package.part", is expected but not required.
     */
    goog.module = function (name) {
      if (!goog.isString(name) || !name || name.search(goog.VALID_MODULE_RE_) == -1) {
        throw Error('Invalid module identifier');
      }
      if (!goog.isInModuleLoader_()) {
        throw Error('Module ' + name + ' has been loaded incorrectly.');
      }
      if (goog.moduleLoaderState_.moduleName) {
        throw Error('goog.module may only be called once per module.');
      }

      // Store the module name for the loader.
      goog.moduleLoaderState_.moduleName = name;
      if (!COMPILED) {
        // Ensure that the same namespace isn't provided twice.
        // A goog.module/goog.provide maps a goog.require to a specific file
        if (goog.isProvided_(name)) {
          throw Error('Namespace "' + name + '" already declared.');
        }
        delete goog.implicitNamespaces_[name];
      }
    };

    /**
     * @param {string} name The module identifier.
     * @return {?} The module exports for an already loaded module or null.
     *
     * Note: This is not an alternative to goog.require, it does not
     * indicate a hard dependency, instead it is used to indicate
     * an optional dependency or to access the exports of a module
     * that has already been loaded.
     * @suppress {missingProvide}
     */
    goog.module.get = function (name) {
      return goog.module.getInternal_(name);
    };

    /**
     * @param {string} name The module identifier.
     * @return {?} The module exports for an already loaded module or null.
     * @private
     */
    goog.module.getInternal_ = function (name) {
      if (!COMPILED) {
        if (goog.isProvided_(name)) {
          // goog.require only return a value with-in goog.module files.
          return name in goog.loadedModules_ ? goog.loadedModules_[name] : goog.getObjectByName(name);
        } else {
          return null;
        }
      }
    };

    /**
     * @private {?{moduleName: (string|undefined), declareLegacyNamespace:boolean}}
     */
    goog.moduleLoaderState_ = null;

    /**
     * @private
     * @return {boolean} Whether a goog.module is currently being initialized.
     */
    goog.isInModuleLoader_ = function () {
      return goog.moduleLoaderState_ != null;
    };

    /**
     * Provide the module's exports as a globally accessible object under the
     * module's declared name.  This is intended to ease migration to goog.module
     * for files that have existing usages.
     * @suppress {missingProvide}
     */
    goog.module.declareLegacyNamespace = function () {
      if (!COMPILED && !goog.isInModuleLoader_()) {
        throw new Error('goog.module.declareLegacyNamespace must be called from ' + 'within a goog.module');
      }
      if (!COMPILED && !goog.moduleLoaderState_.moduleName) {
        throw Error('goog.module must be called prior to ' + 'goog.module.declareLegacyNamespace.');
      }
      goog.moduleLoaderState_.declareLegacyNamespace = true;
    };

    /**
     * Marks that the current file should only be used for testing, and never for
     * live code in production.
     *
     * In the case of unit tests, the message may optionally be an exact namespace
     * for the test (e.g. 'goog.stringTest'). The linter will then ignore the extra
     * provide (if not explicitly defined in the code).
     *
     * @param {string=} opt_message Optional message to add to the error that's
     *     raised when used in production code.
     */
    goog.setTestOnly = function (opt_message) {
      if (goog.DISALLOW_TEST_ONLY_CODE) {
        opt_message = opt_message || '';
        throw Error('Importing test-only code into non-debug environment' + (opt_message ? ': ' + opt_message : '.'));
      }
    };

    if (!COMPILED) {
      /**
       * Check if the given name has been goog.provided. This will return false for
       * names that are available only as implicit namespaces.
       * @param {string} name name of the object to look for.
       * @return {boolean} Whether the name has been provided.
       * @private
       */
      goog.isProvided_ = function (name) {
        return name in goog.loadedModules_ || !goog.implicitNamespaces_[name] && goog.isDefAndNotNull(goog.getObjectByName(name));
      };

      /**
       * Namespaces implicitly defined by goog.provide. For example,
       * goog.provide('goog.events.Event') implicitly declares that 'goog' and
       * 'goog.events' must be namespaces.
       *
       * @type {!Object<string, (boolean|undefined)>}
       * @private
       */
      goog.implicitNamespaces_ = { 'goog.module': true };

      // NOTE: We add goog.module as an implicit namespace as goog.module is defined
      // here and because the existing module package has not been moved yet out of
      // the goog.module namespace. This satisifies both the debug loader and
      // ahead-of-time dependency management.
    }

    /**
     * Returns an object based on its fully qualified external name.  The object
     * is not found if null or undefined.  If you are using a compilation pass that
     * renames property names beware that using this function will not find renamed
     * properties.
     *
     * @param {string} name The fully qualified name.
     * @param {Object=} opt_obj The object within which to look; default is
     *     |goog.global|.
     * @return {?} The value (object or primitive) or, if not found, null.
     */
    goog.getObjectByName = function (name, opt_obj) {
      var parts = name.split('.');
      var cur = opt_obj || goog.global;
      for (var part; part = parts.shift();) {
        if (goog.isDefAndNotNull(cur[part])) {
          cur = cur[part];
        } else {
          return null;
        }
      }
      return cur;
    };

    /**
     * Globalizes a whole namespace, such as goog or goog.lang.
     *
     * @param {!Object} obj The namespace to globalize.
     * @param {Object=} opt_global The object to add the properties to.
     * @deprecated Properties may be explicitly exported to the global scope, but
     *     this should no longer be done in bulk.
     */
    goog.globalize = function (obj, opt_global) {
      var global = opt_global || goog.global;
      for (var x in obj) {
        global[x] = obj[x];
      }
    };

    /**
     * Adds a dependency from a file to the files it requires.
     * @param {string} relPath The path to the js file.
     * @param {!Array<string>} provides An array of strings with
     *     the names of the objects this file provides.
     * @param {!Array<string>} requires An array of strings with
     *     the names of the objects this file requires.
     * @param {boolean|!Object<string>=} opt_loadFlags Parameters indicating
     *     how the file must be loaded.  The boolean 'true' is equivalent
     *     to {'module': 'goog'} for backwards-compatibility.  Valid properties
     *     and values include {'module': 'goog'} and {'lang': 'es6'}.
     */
    goog.addDependency = function (relPath, provides, requires, opt_loadFlags) {
      if (goog.DEPENDENCIES_ENABLED) {
        var provide, require;
        var path = relPath.replace(/\\/g, '/');
        var deps = goog.dependencies_;
        if (!opt_loadFlags || typeof opt_loadFlags === 'boolean') {
          opt_loadFlags = opt_loadFlags ? { 'module': 'goog' } : {};
        }
        for (var i = 0; provide = provides[i]; i++) {
          deps.nameToPath[provide] = path;
          deps.pathIsModule[path] = opt_loadFlags['module'] == 'goog';
        }
        for (var j = 0; require = requires[j]; j++) {
          if (!(path in deps.requires)) {
            deps.requires[path] = {};
          }
          deps.requires[path][require] = true;
        }
      }
    };

    // NOTE(nnaze): The debug DOM loader was included in base.js as an original way
    // to do "debug-mode" development.  The dependency system can sometimes be
    // confusing, as can the debug DOM loader's asynchronous nature.
    //
    // With the DOM loader, a call to goog.require() is not blocking -- the script
    // will not load until some point after the current script.  If a namespace is
    // needed at runtime, it needs to be defined in a previous script, or loaded via
    // require() with its registered dependencies.
    //
    // User-defined namespaces may need their own deps file. For a reference on
    // creating a deps file, see:
    // Externally: https://developers.google.com/closure/library/docs/depswriter
    //
    // Because of legacy clients, the DOM loader can't be easily removed from
    // base.js.  Work is being done to make it disableable or replaceable for
    // different environments (DOM-less JavaScript interpreters like Rhino or V8,
    // for example). See bootstrap/ for more information.


    /**
     * @define {boolean} Whether to enable the debug loader.
     *
     * If enabled, a call to goog.require() will attempt to load the namespace by
     * appending a script tag to the DOM (if the namespace has been registered).
     *
     * If disabled, goog.require() will simply assert that the namespace has been
     * provided (and depend on the fact that some outside tool correctly ordered
     * the script).
     */
    goog.define('goog.ENABLE_DEBUG_LOADER', true);

    /**
     * @param {string} msg
     * @private
     */
    goog.logToConsole_ = function (msg) {
      if (goog.global.console) {
        goog.global.console['error'](msg);
      }
    };

    /**
     * Implements a system for the dynamic resolution of dependencies that works in
     * parallel with the BUILD system. Note that all calls to goog.require will be
     * stripped by the JSCompiler when the --process_closure_primitives option is
     * used.
     * @see goog.provide
     * @param {string} name Namespace to include (as was given in goog.provide()) in
     *     the form "goog.package.part".
     * @return {?} If called within a goog.module file, the associated namespace or
     *     module otherwise null.
     */
    goog.require = function (name) {
      // If the object already exists we do not need do do anything.
      if (!COMPILED) {
        if (goog.ENABLE_DEBUG_LOADER && goog.IS_OLD_IE_) {
          goog.maybeProcessDeferredDep_(name);
        }

        if (goog.isProvided_(name)) {
          if (goog.isInModuleLoader_()) {
            return goog.module.getInternal_(name);
          } else {
            return null;
          }
        }

        if (goog.ENABLE_DEBUG_LOADER) {
          var path = goog.getPathFromDeps_(name);
          if (path) {
            goog.writeScripts_(path);
            return null;
          }
        }

        var errorMessage = 'goog.require could not find: ' + name;
        goog.logToConsole_(errorMessage);

        throw Error(errorMessage);
      }
    };

    /**
     * Path for included scripts.
     * @type {string}
     */
    goog.basePath = '';

    /**
     * A hook for overriding the base path.
     * @type {string|undefined}
     */
    goog.global.CLOSURE_BASE_PATH;

    /**
     * Whether to write out Closure's deps file. By default, the deps are written.
     * @type {boolean|undefined}
     */
    goog.global.CLOSURE_NO_DEPS;

    /**
     * A function to import a single script. This is meant to be overridden when
     * Closure is being run in non-HTML contexts, such as web workers. It's defined
     * in the global scope so that it can be set before base.js is loaded, which
     * allows deps.js to be imported properly.
     *
     * The function is passed the script source, which is a relative URI. It should
     * return true if the script was imported, false otherwise.
     * @type {(function(string): boolean)|undefined}
     */
    goog.global.CLOSURE_IMPORT_SCRIPT;

    /**
     * Null function used for default values of callbacks, etc.
     * @return {void} Nothing.
     */
    goog.nullFunction = function () {};

    /**
     * When defining a class Foo with an abstract method bar(), you can do:
     * Foo.prototype.bar = goog.abstractMethod
     *
     * Now if a subclass of Foo fails to override bar(), an error will be thrown
     * when bar() is invoked.
     *
     * Note: This does not take the name of the function to override as an argument
     * because that would make it more difficult to obfuscate our JavaScript code.
     *
     * @type {!Function}
     * @throws {Error} when invoked to indicate the method should be overridden.
     */
    goog.abstractMethod = function () {
      throw Error('unimplemented abstract method');
    };

    /**
     * Adds a {@code getInstance} static method that always returns the same
     * instance object.
     * @param {!Function} ctor The constructor for the class to add the static
     *     method to.
     */
    goog.addSingletonGetter = function (ctor) {
      ctor.getInstance = function () {
        if (ctor.instance_) {
          return ctor.instance_;
        }
        if (goog.DEBUG) {
          // NOTE: JSCompiler can't optimize away Array#push.
          goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = ctor;
        }
        return ctor.instance_ = new ctor();
      };
    };

    /**
     * All singleton classes that have been instantiated, for testing. Don't read
     * it directly, use the {@code goog.testing.singleton} module. The compiler
     * removes this variable if unused.
     * @type {!Array<!Function>}
     * @private
     */
    goog.instantiatedSingletons_ = [];

    /**
     * @define {boolean} Whether to load goog.modules using {@code eval} when using
     * the debug loader.  This provides a better debugging experience as the
     * source is unmodified and can be edited using Chrome Workspaces or similar.
     * However in some environments the use of {@code eval} is banned
     * so we provide an alternative.
     */
    goog.define('goog.LOAD_MODULE_USING_EVAL', true);

    /**
     * @define {boolean} Whether the exports of goog.modules should be sealed when
     * possible.
     */
    goog.define('goog.SEAL_MODULE_EXPORTS', goog.DEBUG);

    /**
     * The registry of initialized modules:
     * the module identifier to module exports map.
     * @private @const {!Object<string, ?>}
     */
    goog.loadedModules_ = {};

    /**
     * True if goog.dependencies_ is available.
     * @const {boolean}
     */
    goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER;

    if (goog.DEPENDENCIES_ENABLED) {
      /**
       * This object is used to keep track of dependencies and other data that is
       * used for loading scripts.
       * @private
       * @type {{
       *   pathIsModule: !Object<string, boolean>,
       *   nameToPath: !Object<string, string>,
       *   requires: !Object<string, !Object<string, boolean>>,
       *   visited: !Object<string, boolean>,
       *   written: !Object<string, boolean>,
       *   deferred: !Object<string, string>
       * }}
       */
      goog.dependencies_ = {
        pathIsModule: {}, // 1 to 1

        nameToPath: {}, // 1 to 1

        requires: {}, // 1 to many

        // Used when resolving dependencies to prevent us from visiting file twice.
        visited: {},

        written: {}, // Used to keep track of script files we have written.

        deferred: {} // Used to track deferred module evaluations in old IEs
      };

      /**
       * Tries to detect whether is in the context of an HTML document.
       * @return {boolean} True if it looks like HTML document.
       * @private
       */
      goog.inHtmlDocument_ = function () {
        /** @type {Document} */
        var doc = goog.global.document;
        return doc != null && 'write' in doc; // XULDocument misses write.
      };

      /**
       * Tries to detect the base path of base.js script that bootstraps Closure.
       * @private
       */
      goog.findBasePath_ = function () {
        if (goog.isDef(goog.global.CLOSURE_BASE_PATH)) {
          goog.basePath = goog.global.CLOSURE_BASE_PATH;
          return;
        } else if (!goog.inHtmlDocument_()) {
          return;
        }
        /** @type {Document} */
        var doc = goog.global.document;
        var scripts = doc.getElementsByTagName('SCRIPT');
        // Search backwards since the current script is in almost all cases the one
        // that has base.js.
        for (var i = scripts.length - 1; i >= 0; --i) {
          var script = /** @type {!HTMLScriptElement} */scripts[i];
          var src = script.src;
          var qmark = src.lastIndexOf('?');
          var l = qmark == -1 ? src.length : qmark;
          if (src.substr(l - 7, 7) == 'base.js') {
            goog.basePath = src.substr(0, l - 7);
            return;
          }
        }
      };

      /**
       * Imports a script if, and only if, that script hasn't already been imported.
       * (Must be called at execution time)
       * @param {string} src Script source.
       * @param {string=} opt_sourceText The optionally source text to evaluate
       * @private
       */
      goog.importScript_ = function (src, opt_sourceText) {
        var importScript = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
        if (importScript(src, opt_sourceText)) {
          goog.dependencies_.written[src] = true;
        }
      };

      /** @const @private {boolean} */
      goog.IS_OLD_IE_ = !!(!goog.global.atob && goog.global.document && goog.global.document.all);

      /**
       * Given a URL initiate retrieval and execution of the module.
       * @param {string} src Script source URL.
       * @private
       */
      goog.importModule_ = function (src) {
        // In an attempt to keep browsers from timing out loading scripts using
        // synchronous XHRs, put each load in its own script block.
        var bootstrap = 'goog.retrieveAndExecModule_("' + src + '");';

        if (goog.importScript_('', bootstrap)) {
          goog.dependencies_.written[src] = true;
        }
      };

      /** @private {!Array<string>} */
      goog.queuedModules_ = [];

      /**
       * Return an appropriate module text. Suitable to insert into
       * a script tag (that is unescaped).
       * @param {string} srcUrl
       * @param {string} scriptText
       * @return {string}
       * @private
       */
      goog.wrapModule_ = function (srcUrl, scriptText) {
        if (!goog.LOAD_MODULE_USING_EVAL || !goog.isDef(goog.global.JSON)) {
          return '' + 'goog.loadModule(function(exports) {' + '"use strict";' + scriptText + '\n' + // terminate any trailing single line comment.
          ';return exports' + '});' + '\n//# sourceURL=' + srcUrl + '\n';
        } else {
          return '' + 'goog.loadModule(' + goog.global.JSON.stringify(scriptText + '\n//# sourceURL=' + srcUrl + '\n') + ');';
        }
      };

      // On IE9 and earlier, it is necessary to handle
      // deferred module loads. In later browsers, the
      // code to be evaluated is simply inserted as a script
      // block in the correct order. To eval deferred
      // code at the right time, we piggy back on goog.require to call
      // goog.maybeProcessDeferredDep_.
      //
      // The goog.requires are used both to bootstrap
      // the loading process (when no deps are available) and
      // declare that they should be available.
      //
      // Here we eval the sources, if all the deps are available
      // either already eval'd or goog.require'd.  This will
      // be the case when all the dependencies have already
      // been loaded, and the dependent module is loaded.
      //
      // But this alone isn't sufficient because it is also
      // necessary to handle the case where there is no root
      // that is not deferred.  For that there we register for an event
      // and trigger goog.loadQueuedModules_ handle any remaining deferred
      // evaluations.

      /**
       * Handle any remaining deferred goog.module evals.
       * @private
       */
      goog.loadQueuedModules_ = function () {
        var count = goog.queuedModules_.length;
        if (count > 0) {
          var queue = goog.queuedModules_;
          goog.queuedModules_ = [];
          for (var i = 0; i < count; i++) {
            var path = queue[i];
            goog.maybeProcessDeferredPath_(path);
          }
        }
      };

      /**
       * Eval the named module if its dependencies are
       * available.
       * @param {string} name The module to load.
       * @private
       */
      goog.maybeProcessDeferredDep_ = function (name) {
        if (goog.isDeferredModule_(name) && goog.allDepsAreAvailable_(name)) {
          var path = goog.getPathFromDeps_(name);
          goog.maybeProcessDeferredPath_(goog.basePath + path);
        }
      };

      /**
       * @param {string} name The module to check.
       * @return {boolean} Whether the name represents a
       *     module whose evaluation has been deferred.
       * @private
       */
      goog.isDeferredModule_ = function (name) {
        var path = goog.getPathFromDeps_(name);
        if (path && goog.dependencies_.pathIsModule[path]) {
          var abspath = goog.basePath + path;
          return abspath in goog.dependencies_.deferred;
        }
        return false;
      };

      /**
       * @param {string} name The module to check.
       * @return {boolean} Whether the name represents a
       *     module whose declared dependencies have all been loaded
       *     (eval'd or a deferred module load)
       * @private
       */
      goog.allDepsAreAvailable_ = function (name) {
        var path = goog.getPathFromDeps_(name);
        if (path && path in goog.dependencies_.requires) {
          for (var requireName in goog.dependencies_.requires[path]) {
            if (!goog.isProvided_(requireName) && !goog.isDeferredModule_(requireName)) {
              return false;
            }
          }
        }
        return true;
      };

      /**
       * @param {string} abspath
       * @private
       */
      goog.maybeProcessDeferredPath_ = function (abspath) {
        if (abspath in goog.dependencies_.deferred) {
          var src = goog.dependencies_.deferred[abspath];
          delete goog.dependencies_.deferred[abspath];
          goog.globalEval(src);
        }
      };

      /**
       * Load a goog.module from the provided URL.  This is not a general purpose
       * code loader and does not support late loading code, that is it should only
       * be used during page load. This method exists to support unit tests and
       * "debug" loaders that would otherwise have inserted script tags. Under the
       * hood this needs to use a synchronous XHR and is not recommeneded for
       * production code.
       *
       * The module's goog.requires must have already been satisified; an exception
       * will be thrown if this is not the case. This assumption is that no
       * "deps.js" file exists, so there is no way to discover and locate the
       * module-to-be-loaded's dependencies and no attempt is made to do so.
       *
       * There should only be one attempt to load a module.  If
       * "goog.loadModuleFromUrl" is called for an already loaded module, an
       * exception will be throw.
       *
       * @param {string} url The URL from which to attempt to load the goog.module.
       */
      goog.loadModuleFromUrl = function (url) {
        // Because this executes synchronously, we don't need to do any additional
        // bookkeeping. When "goog.loadModule" the namespace will be marked as
        // having been provided which is sufficient.
        goog.retrieveAndExecModule_(url);
      };

      /**
       * @param {function(?):?|string} moduleDef The module definition.
       */
      goog.loadModule = function (moduleDef) {
        // NOTE: we allow function definitions to be either in the from
        // of a string to eval (which keeps the original source intact) or
        // in a eval forbidden environment (CSP) we allow a function definition
        // which in its body must call {@code goog.module}, and return the exports
        // of the module.
        var previousState = goog.moduleLoaderState_;
        try {
          goog.moduleLoaderState_ = {
            moduleName: undefined,
            declareLegacyNamespace: false
          };
          var exports;
          if (goog.isFunction(moduleDef)) {
            exports = moduleDef.call(goog.global, {});
          } else if (goog.isString(moduleDef)) {
            exports = goog.loadModuleFromSource_.call(goog.global, moduleDef);
          } else {
            throw Error('Invalid module definition');
          }

          var moduleName = goog.moduleLoaderState_.moduleName;
          if (!goog.isString(moduleName) || !moduleName) {
            throw Error('Invalid module name \"' + moduleName + '\"');
          }

          // Don't seal legacy namespaces as they may be uses as a parent of
          // another namespace
          if (goog.moduleLoaderState_.declareLegacyNamespace) {
            goog.constructNamespace_(moduleName, exports);
          } else if (goog.SEAL_MODULE_EXPORTS && Object.seal) {
            Object.seal(exports);
          }

          goog.loadedModules_[moduleName] = exports;
        } finally {
          goog.moduleLoaderState_ = previousState;
        }
      };

      /**
       * @private @const {function(string):?}
       *
       * The new type inference warns because this function has no formal
       * parameters, but its jsdoc says that it takes one argument.
       * (The argument is used via arguments[0], but NTI does not detect this.)
       * @suppress {newCheckTypes}
       */
      goog.loadModuleFromSource_ = function () {
        // NOTE: we avoid declaring parameters or local variables here to avoid
        // masking globals or leaking values into the module definition.
        'use strict';

        var exports = {};
        eval(arguments[0]);
        return exports;
      };

      /**
       * Writes a new script pointing to {@code src} directly into the DOM.
       *
       * NOTE: This method is not CSP-compliant. @see goog.appendScriptSrcNode_ for
       * the fallback mechanism.
       *
       * @param {string} src The script URL.
       * @private
       */
      goog.writeScriptSrcNode_ = function (src) {
        goog.global.document.write('<script type="text/javascript" src="' + src + '"></' + 'script>');
      };

      /**
       * Appends a new script node to the DOM using a CSP-compliant mechanism. This
       * method exists as a fallback for document.write (which is not allowed in a
       * strict CSP context, e.g., Chrome apps).
       *
       * NOTE: This method is not analogous to using document.write to insert a
       * <script> tag; specifically, the user agent will execute a script added by
       * document.write immediately after the current script block finishes
       * executing, whereas the DOM-appended script node will not be executed until
       * the entire document is parsed and executed. That is to say, this script is
       * added to the end of the script execution queue.
       *
       * The page must not attempt to call goog.required entities until after the
       * document has loaded, e.g., in or after the window.onload callback.
       *
       * @param {string} src The script URL.
       * @private
       */
      goog.appendScriptSrcNode_ = function (src) {
        /** @type {Document} */
        var doc = goog.global.document;
        var scriptEl =
        /** @type {HTMLScriptElement} */doc.createElement('script');
        scriptEl.type = 'text/javascript';
        scriptEl.src = src;
        scriptEl.defer = false;
        scriptEl.async = false;
        doc.head.appendChild(scriptEl);
      };

      /**
       * The default implementation of the import function. Writes a script tag to
       * import the script.
       *
       * @param {string} src The script url.
       * @param {string=} opt_sourceText The optionally source text to evaluate
       * @return {boolean} True if the script was imported, false otherwise.
       * @private
       */
      goog.writeScriptTag_ = function (src, opt_sourceText) {
        if (goog.inHtmlDocument_()) {
          /** @type {!HTMLDocument} */
          var doc = goog.global.document;

          // If the user tries to require a new symbol after document load,
          // something has gone terribly wrong. Doing a document.write would
          // wipe out the page. This does not apply to the CSP-compliant method
          // of writing script tags.
          if (!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING && doc.readyState == 'complete') {
            // Certain test frameworks load base.js multiple times, which tries
            // to write deps.js each time. If that happens, just fail silently.
            // These frameworks wipe the page between each load of base.js, so this
            // is OK.
            var isDeps = /\bdeps.js$/.test(src);
            if (isDeps) {
              return false;
            } else {
              throw Error('Cannot write "' + src + '" after document load');
            }
          }

          var isOldIE = goog.IS_OLD_IE_;

          if (opt_sourceText === undefined) {
            if (!isOldIE) {
              if (goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING) {
                goog.appendScriptSrcNode_(src);
              } else {
                goog.writeScriptSrcNode_(src);
              }
            } else {
              var state = " onreadystatechange='goog.onScriptLoad_(this, " + ++goog.lastNonModuleScriptIndex_ + ")' ";
              doc.write('<script type="text/javascript" src="' + src + '"' + state + '></' + 'script>');
            }
          } else {
            doc.write('<script type="text/javascript">' + opt_sourceText + '</' + 'script>');
          }
          return true;
        } else {
          return false;
        }
      };

      /** @private {number} */
      goog.lastNonModuleScriptIndex_ = 0;

      /**
       * A readystatechange handler for legacy IE
       * @param {!HTMLScriptElement} script
       * @param {number} scriptIndex
       * @return {boolean}
       * @private
       */
      goog.onScriptLoad_ = function (script, scriptIndex) {
        // for now load the modules when we reach the last script,
        // later allow more inter-mingling.
        if (script.readyState == 'complete' && goog.lastNonModuleScriptIndex_ == scriptIndex) {
          goog.loadQueuedModules_();
        }
        return true;
      };

      /**
       * Resolves dependencies based on the dependencies added using addDependency
       * and calls importScript_ in the correct order.
       * @param {string} pathToLoad The path from which to start discovering
       *     dependencies.
       * @private
       */
      goog.writeScripts_ = function (pathToLoad) {
        /** @type {!Array<string>} The scripts we need to write this time. */
        var scripts = [];
        var seenScript = {};
        var deps = goog.dependencies_;

        /** @param {string} path */
        function visitNode(path) {
          if (path in deps.written) {
            return;
          }

          // We have already visited this one. We can get here if we have cyclic
          // dependencies.
          if (path in deps.visited) {
            return;
          }

          deps.visited[path] = true;

          if (path in deps.requires) {
            for (var requireName in deps.requires[path]) {
              // If the required name is defined, we assume that it was already
              // bootstrapped by other means.
              if (!goog.isProvided_(requireName)) {
                if (requireName in deps.nameToPath) {
                  visitNode(deps.nameToPath[requireName]);
                } else {
                  throw Error('Undefined nameToPath for ' + requireName);
                }
              }
            }
          }

          if (!(path in seenScript)) {
            seenScript[path] = true;
            scripts.push(path);
          }
        }

        visitNode(pathToLoad);

        // record that we are going to load all these scripts.
        for (var i = 0; i < scripts.length; i++) {
          var path = scripts[i];
          goog.dependencies_.written[path] = true;
        }

        // If a module is loaded synchronously then we need to
        // clear the current inModuleLoader value, and restore it when we are
        // done loading the current "requires".
        var moduleState = goog.moduleLoaderState_;
        goog.moduleLoaderState_ = null;

        for (var i = 0; i < scripts.length; i++) {
          var path = scripts[i];
          if (path) {
            if (!deps.pathIsModule[path]) {
              goog.importScript_(goog.basePath + path);
            } else {
              goog.importModule_(goog.basePath + path);
            }
          } else {
            goog.moduleLoaderState_ = moduleState;
            throw Error('Undefined script input');
          }
        }

        // restore the current "module loading state"
        goog.moduleLoaderState_ = moduleState;
      };

      /**
       * Looks at the dependency rules and tries to determine the script file that
       * fulfills a particular rule.
       * @param {string} rule In the form goog.namespace.Class or project.script.
       * @return {?string} Url corresponding to the rule, or null.
       * @private
       */
      goog.getPathFromDeps_ = function (rule) {
        if (rule in goog.dependencies_.nameToPath) {
          return goog.dependencies_.nameToPath[rule];
        } else {
          return null;
        }
      };

      goog.findBasePath_();

      // Allow projects to manage the deps files themselves.
      if (!goog.global.CLOSURE_NO_DEPS) {
        goog.importScript_(goog.basePath + 'deps.js');
      }
    }

    /**
     * Normalize a file path by removing redundant ".." and extraneous "." file
     * path components.
     * @param {string} path
     * @return {string}
     * @private
     */
    goog.normalizePath_ = function (path) {
      var components = path.split('/');
      var i = 0;
      while (i < components.length) {
        if (components[i] == '.') {
          components.splice(i, 1);
        } else if (i && components[i] == '..' && components[i - 1] && components[i - 1] != '..') {
          components.splice(--i, 2);
        } else {
          i++;
        }
      }
      return components.join('/');
    };

    /**
     * Loads file by synchronous XHR. Should not be used in production environments.
     * @param {string} src Source URL.
     * @return {string} File contents.
     * @private
     */
    goog.loadFileSync_ = function (src) {
      if (goog.global.CLOSURE_LOAD_FILE_SYNC) {
        return goog.global.CLOSURE_LOAD_FILE_SYNC(src);
      } else {
        /** @type {XMLHttpRequest} */
        var xhr = new goog.global['XMLHttpRequest']();
        xhr.open('get', src, false);
        xhr.send();
        return xhr.responseText;
      }
    };

    /**
     * Retrieve and execute a module.
     * @param {string} src Script source URL.
     * @private
     */
    goog.retrieveAndExecModule_ = function (src) {
      if (!COMPILED) {
        // The full but non-canonicalized URL for later use.
        var originalPath = src;
        // Canonicalize the path, removing any /./ or /../ since Chrome's debugging
        // console doesn't auto-canonicalize XHR loads as it does <script> srcs.
        src = goog.normalizePath_(src);

        var importScript = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;

        var scriptText = goog.loadFileSync_(src);

        if (scriptText != null) {
          var execModuleScript = goog.wrapModule_(src, scriptText);
          var isOldIE = goog.IS_OLD_IE_;
          if (isOldIE) {
            goog.dependencies_.deferred[originalPath] = execModuleScript;
            goog.queuedModules_.push(originalPath);
          } else {
            importScript(src, execModuleScript);
          }
        } else {
          throw new Error('load of ' + src + 'failed');
        }
      }
    };

    //==============================================================================
    // Language Enhancements
    //==============================================================================


    /**
     * This is a "fixed" version of the typeof operator.  It differs from the typeof
     * operator in such a way that null returns 'null' and arrays return 'array'.
     * @param {?} value The value to get the type of.
     * @return {string} The name of the type.
     */
    goog.typeOf = function (value) {
      var s = typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value);
      if (s == 'object') {
        if (value) {
          // Check these first, so we can avoid calling Object.prototype.toString if
          // possible.
          //
          // IE improperly marshals typeof across execution contexts, but a
          // cross-context object will still return false for "instanceof Object".
          if (value instanceof Array) {
            return 'array';
          } else if (value instanceof Object) {
            return s;
          }

          // HACK: In order to use an Object prototype method on the arbitrary
          //   value, the compiler requires the value be cast to type Object,
          //   even though the ECMA spec explicitly allows it.
          var className = Object.prototype.toString.call(
          /** @type {!Object} */value);
          // In Firefox 3.6, attempting to access iframe window objects' length
          // property throws an NS_ERROR_FAILURE, so we need to special-case it
          // here.
          if (className == '[object Window]') {
            return 'object';
          }

          // We cannot always use constructor == Array or instanceof Array because
          // different frames have different Array objects. In IE6, if the iframe
          // where the array was created is destroyed, the array loses its
          // prototype. Then dereferencing val.splice here throws an exception, so
          // we can't use goog.isFunction. Calling typeof directly returns 'unknown'
          // so that will work. In this case, this function will return false and
          // most array functions will still work because the array is still
          // array-like (supports length and []) even though it has lost its
          // prototype.
          // Mark Miller noticed that Object.prototype.toString
          // allows access to the unforgeable [[Class]] property.
          //  15.2.4.2 Object.prototype.toString ( )
          //  When the toString method is called, the following steps are taken:
          //      1. Get the [[Class]] property of this object.
          //      2. Compute a string value by concatenating the three strings
          //         "[object ", Result(1), and "]".
          //      3. Return Result(2).
          // and this behavior survives the destruction of the execution context.
          if (className == '[object Array]' ||
          // In IE all non value types are wrapped as objects across window
          // boundaries (not iframe though) so we have to do object detection
          // for this edge case.
          typeof value.length == 'number' && typeof value.splice != 'undefined' && typeof value.propertyIsEnumerable != 'undefined' && !value.propertyIsEnumerable('splice')) {
            return 'array';
          }
          // HACK: There is still an array case that fails.
          //     function ArrayImpostor() {}
          //     ArrayImpostor.prototype = [];
          //     var impostor = new ArrayImpostor;
          // this can be fixed by getting rid of the fast path
          // (value instanceof Array) and solely relying on
          // (value && Object.prototype.toString.vall(value) === '[object Array]')
          // but that would require many more function calls and is not warranted
          // unless closure code is receiving objects from untrusted sources.

          // IE in cross-window calls does not correctly marshal the function type
          // (it appears just as an object) so we cannot use just typeof val ==
          // 'function'. However, if the object has a call property, it is a
          // function.
          if (className == '[object Function]' || typeof value.call != 'undefined' && typeof value.propertyIsEnumerable != 'undefined' && !value.propertyIsEnumerable('call')) {
            return 'function';
          }
        } else {
          return 'null';
        }
      } else if (s == 'function' && typeof value.call == 'undefined') {
        // In Safari typeof nodeList returns 'function', and on Firefox typeof
        // behaves similarly for HTML{Applet,Embed,Object}, Elements and RegExps. We
        // would like to return object for those and we can detect an invalid
        // function by making sure that the function object has a call method.
        return 'object';
      }
      return s;
    };

    /**
     * Returns true if the specified value is null.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is null.
     */
    goog.isNull = function (val) {
      return val === null;
    };

    /**
     * Returns true if the specified value is defined and not null.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is defined and not null.
     */
    goog.isDefAndNotNull = function (val) {
      // Note that undefined == null.
      return val != null;
    };

    /**
     * Returns true if the specified value is an array.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is an array.
     */
    goog.isArray = function (val) {
      return goog.typeOf(val) == 'array';
    };

    /**
     * Returns true if the object looks like an array. To qualify as array like
     * the value needs to be either a NodeList or an object with a Number length
     * property. As a special case, a function value is not array like, because its
     * length property is fixed to correspond to the number of expected arguments.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is an array.
     */
    goog.isArrayLike = function (val) {
      var type = goog.typeOf(val);
      // We do not use goog.isObject here in order to exclude function values.
      return type == 'array' || type == 'object' && typeof val.length == 'number';
    };

    /**
     * Returns true if the object looks like a Date. To qualify as Date-like the
     * value needs to be an object and have a getFullYear() function.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is a like a Date.
     */
    goog.isDateLike = function (val) {
      return goog.isObject(val) && typeof val.getFullYear == 'function';
    };

    /**
     * Returns true if the specified value is a string.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is a string.
     */
    goog.isString = function (val) {
      return typeof val == 'string';
    };

    /**
     * Returns true if the specified value is a boolean.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is boolean.
     */
    goog.isBoolean = function (val) {
      return typeof val == 'boolean';
    };

    /**
     * Returns true if the specified value is a number.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is a number.
     */
    goog.isNumber = function (val) {
      return typeof val == 'number';
    };

    /**
     * Returns true if the specified value is a function.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is a function.
     */
    goog.isFunction = function (val) {
      return goog.typeOf(val) == 'function';
    };

    /**
     * Returns true if the specified value is an object.  This includes arrays and
     * functions.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is an object.
     */
    goog.isObject = function (val) {
      var type = typeof val === 'undefined' ? 'undefined' : babelHelpers.typeof(val);
      return type == 'object' && val != null || type == 'function';
      // return Object(val) === val also works, but is slower, especially if val is
      // not an object.
    };

    /**
     * Gets a unique ID for an object. This mutates the object so that further calls
     * with the same object as a parameter returns the same value. The unique ID is
     * guaranteed to be unique across the current session amongst objects that are
     * passed into {@code getUid}. There is no guarantee that the ID is unique or
     * consistent across sessions. It is unsafe to generate unique ID for function
     * prototypes.
     *
     * @param {Object} obj The object to get the unique ID for.
     * @return {number} The unique ID for the object.
     */
    goog.getUid = function (obj) {
      // TODO(arv): Make the type stricter, do not accept null.

      // In Opera window.hasOwnProperty exists but always returns false so we avoid
      // using it. As a consequence the unique ID generated for BaseClass.prototype
      // and SubClass.prototype will be the same.
      return obj[goog.UID_PROPERTY_] || (obj[goog.UID_PROPERTY_] = ++goog.uidCounter_);
    };

    /**
     * Whether the given object is already assigned a unique ID.
     *
     * This does not modify the object.
     *
     * @param {!Object} obj The object to check.
     * @return {boolean} Whether there is an assigned unique id for the object.
     */
    goog.hasUid = function (obj) {
      return !!obj[goog.UID_PROPERTY_];
    };

    /**
     * Removes the unique ID from an object. This is useful if the object was
     * previously mutated using {@code goog.getUid} in which case the mutation is
     * undone.
     * @param {Object} obj The object to remove the unique ID field from.
     */
    goog.removeUid = function (obj) {
      // TODO(arv): Make the type stricter, do not accept null.

      // In IE, DOM nodes are not instances of Object and throw an exception if we
      // try to delete.  Instead we try to use removeAttribute.
      if (obj !== null && 'removeAttribute' in obj) {
        obj.removeAttribute(goog.UID_PROPERTY_);
      }
      /** @preserveTry */
      try {
        delete obj[goog.UID_PROPERTY_];
      } catch (ex) {}
    };

    /**
     * Name for unique ID property. Initialized in a way to help avoid collisions
     * with other closure JavaScript on the same page.
     * @type {string}
     * @private
     */
    goog.UID_PROPERTY_ = 'closure_uid_' + (Math.random() * 1e9 >>> 0);

    /**
     * Counter for UID.
     * @type {number}
     * @private
     */
    goog.uidCounter_ = 0;

    /**
     * Adds a hash code field to an object. The hash code is unique for the
     * given object.
     * @param {Object} obj The object to get the hash code for.
     * @return {number} The hash code for the object.
     * @deprecated Use goog.getUid instead.
     */
    goog.getHashCode = goog.getUid;

    /**
     * Removes the hash code field from an object.
     * @param {Object} obj The object to remove the field from.
     * @deprecated Use goog.removeUid instead.
     */
    goog.removeHashCode = goog.removeUid;

    /**
     * Clones a value. The input may be an Object, Array, or basic type. Objects and
     * arrays will be cloned recursively.
     *
     * WARNINGS:
     * <code>goog.cloneObject</code> does not detect reference loops. Objects that
     * refer to themselves will cause infinite recursion.
     *
     * <code>goog.cloneObject</code> is unaware of unique identifiers, and copies
     * UIDs created by <code>getUid</code> into cloned results.
     *
     * @param {*} obj The value to clone.
     * @return {*} A clone of the input value.
     * @deprecated goog.cloneObject is unsafe. Prefer the goog.object methods.
     */
    goog.cloneObject = function (obj) {
      var type = goog.typeOf(obj);
      if (type == 'object' || type == 'array') {
        if (obj.clone) {
          return obj.clone();
        }
        var clone = type == 'array' ? [] : {};
        for (var key in obj) {
          clone[key] = goog.cloneObject(obj[key]);
        }
        return clone;
      }

      return obj;
    };

    /**
     * A native implementation of goog.bind.
     * @param {Function} fn A function to partially apply.
     * @param {Object|undefined} selfObj Specifies the object which this should
     *     point to when the function is run.
     * @param {...*} var_args Additional arguments that are partially applied to the
     *     function.
     * @return {!Function} A partially-applied form of the function bind() was
     *     invoked as a method of.
     * @private
     * @suppress {deprecated} The compiler thinks that Function.prototype.bind is
     *     deprecated because some people have declared a pure-JS version.
     *     Only the pure-JS version is truly deprecated.
     */
    goog.bindNative_ = function (fn, selfObj, var_args) {
      return (/** @type {!Function} */fn.call.apply(fn.bind, arguments)
      );
    };

    /**
     * A pure-JS implementation of goog.bind.
     * @param {Function} fn A function to partially apply.
     * @param {Object|undefined} selfObj Specifies the object which this should
     *     point to when the function is run.
     * @param {...*} var_args Additional arguments that are partially applied to the
     *     function.
     * @return {!Function} A partially-applied form of the function bind() was
     *     invoked as a method of.
     * @private
     */
    goog.bindJs_ = function (fn, selfObj, var_args) {
      if (!fn) {
        throw new Error();
      }

      if (arguments.length > 2) {
        var boundArgs = Array.prototype.slice.call(arguments, 2);
        return function () {
          // Prepend the bound arguments to the current arguments.
          var newArgs = Array.prototype.slice.call(arguments);
          Array.prototype.unshift.apply(newArgs, boundArgs);
          return fn.apply(selfObj, newArgs);
        };
      } else {
        return function () {
          return fn.apply(selfObj, arguments);
        };
      }
    };

    /**
     * Partially applies this function to a particular 'this object' and zero or
     * more arguments. The result is a new function with some arguments of the first
     * function pre-filled and the value of this 'pre-specified'.
     *
     * Remaining arguments specified at call-time are appended to the pre-specified
     * ones.
     *
     * Also see: {@link #partial}.
     *
     * Usage:
     * <pre>var barMethBound = goog.bind(myFunction, myObj, 'arg1', 'arg2');
     * barMethBound('arg3', 'arg4');</pre>
     *
     * @param {?function(this:T, ...)} fn A function to partially apply.
     * @param {T} selfObj Specifies the object which this should point to when the
     *     function is run.
     * @param {...*} var_args Additional arguments that are partially applied to the
     *     function.
     * @return {!Function} A partially-applied form of the function goog.bind() was
     *     invoked as a method of.
     * @template T
     * @suppress {deprecated} See above.
     */
    goog.bind = function (fn, selfObj, var_args) {
      // TODO(nicksantos): narrow the type signature.
      if (Function.prototype.bind &&
      // NOTE(nicksantos): Somebody pulled base.js into the default Chrome
      // extension environment. This means that for Chrome extensions, they get
      // the implementation of Function.prototype.bind that calls goog.bind
      // instead of the native one. Even worse, we don't want to introduce a
      // circular dependency between goog.bind and Function.prototype.bind, so
      // we have to hack this to make sure it works correctly.
      Function.prototype.bind.toString().indexOf('native code') != -1) {
        goog.bind = goog.bindNative_;
      } else {
        goog.bind = goog.bindJs_;
      }
      return goog.bind.apply(null, arguments);
    };

    /**
     * Like goog.bind(), except that a 'this object' is not required. Useful when
     * the target function is already bound.
     *
     * Usage:
     * var g = goog.partial(f, arg1, arg2);
     * g(arg3, arg4);
     *
     * @param {Function} fn A function to partially apply.
     * @param {...*} var_args Additional arguments that are partially applied to fn.
     * @return {!Function} A partially-applied form of the function goog.partial()
     *     was invoked as a method of.
     */
    goog.partial = function (fn, var_args) {
      var args = Array.prototype.slice.call(arguments, 1);
      return function () {
        // Clone the array (with slice()) and append additional arguments
        // to the existing arguments.
        var newArgs = args.slice();
        newArgs.push.apply(newArgs, arguments);
        return fn.apply(this, newArgs);
      };
    };

    /**
     * Copies all the members of a source object to a target object. This method
     * does not work on all browsers for all objects that contain keys such as
     * toString or hasOwnProperty. Use goog.object.extend for this purpose.
     * @param {Object} target Target.
     * @param {Object} source Source.
     */
    goog.mixin = function (target, source) {
      for (var x in source) {
        target[x] = source[x];
      }

      // For IE7 or lower, the for-in-loop does not contain any properties that are
      // not enumerable on the prototype object (for example, isPrototypeOf from
      // Object.prototype) but also it will not include 'replace' on objects that
      // extend String and change 'replace' (not that it is common for anyone to
      // extend anything except Object).
    };

    /**
     * @return {number} An integer value representing the number of milliseconds
     *     between midnight, January 1, 1970 and the current time.
     */
    goog.now = goog.TRUSTED_SITE && Date.now || function () {
      // Unary plus operator converts its operand to a number which in
      // the case of
      // a date is done by calling getTime().
      return +new Date();
    };

    /**
     * Evals JavaScript in the global scope.  In IE this uses execScript, other
     * browsers use goog.global.eval. If goog.global.eval does not evaluate in the
     * global scope (for example, in Safari), appends a script tag instead.
     * Throws an exception if neither execScript or eval is defined.
     * @param {string} script JavaScript string.
     */
    goog.globalEval = function (script) {
      if (goog.global.execScript) {
        goog.global.execScript(script, 'JavaScript');
      } else if (goog.global.eval) {
        // Test to see if eval works
        if (goog.evalWorksForGlobals_ == null) {
          goog.global.eval('var _evalTest_ = 1;');
          if (typeof goog.global['_evalTest_'] != 'undefined') {
            try {
              delete goog.global['_evalTest_'];
            } catch (ignore) {
              // Microsoft edge fails the deletion above in strict mode.
            }
            goog.evalWorksForGlobals_ = true;
          } else {
            goog.evalWorksForGlobals_ = false;
          }
        }

        if (goog.evalWorksForGlobals_) {
          goog.global.eval(script);
        } else {
          /** @type {Document} */
          var doc = goog.global.document;
          var scriptElt =
          /** @type {!HTMLScriptElement} */doc.createElement('SCRIPT');
          scriptElt.type = 'text/javascript';
          scriptElt.defer = false;
          // Note(user): can't use .innerHTML since "t('<test>')" will fail and
          // .text doesn't work in Safari 2.  Therefore we append a text node.
          scriptElt.appendChild(doc.createTextNode(script));
          doc.body.appendChild(scriptElt);
          doc.body.removeChild(scriptElt);
        }
      } else {
        throw Error('goog.globalEval not available');
      }
    };

    /**
     * Indicates whether or not we can call 'eval' directly to eval code in the
     * global scope. Set to a Boolean by the first call to goog.globalEval (which
     * empirically tests whether eval works for globals). @see goog.globalEval
     * @type {?boolean}
     * @private
     */
    goog.evalWorksForGlobals_ = null;

    /**
     * Optional map of CSS class names to obfuscated names used with
     * goog.getCssName().
     * @private {!Object<string, string>|undefined}
     * @see goog.setCssNameMapping
     */
    goog.cssNameMapping_;

    /**
     * Optional obfuscation style for CSS class names. Should be set to either
     * 'BY_WHOLE' or 'BY_PART' if defined.
     * @type {string|undefined}
     * @private
     * @see goog.setCssNameMapping
     */
    goog.cssNameMappingStyle_;

    /**
     * Handles strings that are intended to be used as CSS class names.
     *
     * This function works in tandem with @see goog.setCssNameMapping.
     *
     * Without any mapping set, the arguments are simple joined with a hyphen and
     * passed through unaltered.
     *
     * When there is a mapping, there are two possible styles in which these
     * mappings are used. In the BY_PART style, each part (i.e. in between hyphens)
     * of the passed in css name is rewritten according to the map. In the BY_WHOLE
     * style, the full css name is looked up in the map directly. If a rewrite is
     * not specified by the map, the compiler will output a warning.
     *
     * When the mapping is passed to the compiler, it will replace calls to
     * goog.getCssName with the strings from the mapping, e.g.
     *     var x = goog.getCssName('foo');
     *     var y = goog.getCssName(this.baseClass, 'active');
     *  becomes:
     *     var x = 'foo';
     *     var y = this.baseClass + '-active';
     *
     * If one argument is passed it will be processed, if two are passed only the
     * modifier will be processed, as it is assumed the first argument was generated
     * as a result of calling goog.getCssName.
     *
     * @param {string} className The class name.
     * @param {string=} opt_modifier A modifier to be appended to the class name.
     * @return {string} The class name or the concatenation of the class name and
     *     the modifier.
     */
    goog.getCssName = function (className, opt_modifier) {
      var getMapping = function getMapping(cssName) {
        return goog.cssNameMapping_[cssName] || cssName;
      };

      var renameByParts = function renameByParts(cssName) {
        // Remap all the parts individually.
        var parts = cssName.split('-');
        var mapped = [];
        for (var i = 0; i < parts.length; i++) {
          mapped.push(getMapping(parts[i]));
        }
        return mapped.join('-');
      };

      var rename;
      if (goog.cssNameMapping_) {
        rename = goog.cssNameMappingStyle_ == 'BY_WHOLE' ? getMapping : renameByParts;
      } else {
        rename = function rename(a) {
          return a;
        };
      }

      if (opt_modifier) {
        return className + '-' + rename(opt_modifier);
      } else {
        return rename(className);
      }
    };

    /**
     * Sets the map to check when returning a value from goog.getCssName(). Example:
     * <pre>
     * goog.setCssNameMapping({
     *   "goog": "a",
     *   "disabled": "b",
     * });
     *
     * var x = goog.getCssName('goog');
     * // The following evaluates to: "a a-b".
     * goog.getCssName('goog') + ' ' + goog.getCssName(x, 'disabled')
     * </pre>
     * When declared as a map of string literals to string literals, the JSCompiler
     * will replace all calls to goog.getCssName() using the supplied map if the
     * --process_closure_primitives flag is set.
     *
     * @param {!Object} mapping A map of strings to strings where keys are possible
     *     arguments to goog.getCssName() and values are the corresponding values
     *     that should be returned.
     * @param {string=} opt_style The style of css name mapping. There are two valid
     *     options: 'BY_PART', and 'BY_WHOLE'.
     * @see goog.getCssName for a description.
     */
    goog.setCssNameMapping = function (mapping, opt_style) {
      goog.cssNameMapping_ = mapping;
      goog.cssNameMappingStyle_ = opt_style;
    };

    /**
     * To use CSS renaming in compiled mode, one of the input files should have a
     * call to goog.setCssNameMapping() with an object literal that the JSCompiler
     * can extract and use to replace all calls to goog.getCssName(). In uncompiled
     * mode, JavaScript code should be loaded before this base.js file that declares
     * a global variable, CLOSURE_CSS_NAME_MAPPING, which is used below. This is
     * to ensure that the mapping is loaded before any calls to goog.getCssName()
     * are made in uncompiled mode.
     *
     * A hook for overriding the CSS name mapping.
     * @type {!Object<string, string>|undefined}
     */
    goog.global.CLOSURE_CSS_NAME_MAPPING;

    if (!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING) {
      // This does not call goog.setCssNameMapping() because the JSCompiler
      // requires that goog.setCssNameMapping() be called with an object literal.
      goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING;
    }

    /**
     * Gets a localized message.
     *
     * This function is a compiler primitive. If you give the compiler a localized
     * message bundle, it will replace the string at compile-time with a localized
     * version, and expand goog.getMsg call to a concatenated string.
     *
     * Messages must be initialized in the form:
     * <code>
     * var MSG_NAME = goog.getMsg('Hello {$placeholder}', {'placeholder': 'world'});
     * </code>
     *
     * @param {string} str Translatable string, places holders in the form {$foo}.
     * @param {Object<string, string>=} opt_values Maps place holder name to value.
     * @return {string} message with placeholders filled.
     */
    goog.getMsg = function (str, opt_values) {
      if (opt_values) {
        str = str.replace(/\{\$([^}]+)}/g, function (match, key) {
          return opt_values != null && key in opt_values ? opt_values[key] : match;
        });
      }
      return str;
    };

    /**
     * Gets a localized message. If the message does not have a translation, gives a
     * fallback message.
     *
     * This is useful when introducing a new message that has not yet been
     * translated into all languages.
     *
     * This function is a compiler primitive. Must be used in the form:
     * <code>var x = goog.getMsgWithFallback(MSG_A, MSG_B);</code>
     * where MSG_A and MSG_B were initialized with goog.getMsg.
     *
     * @param {string} a The preferred message.
     * @param {string} b The fallback message.
     * @return {string} The best translated message.
     */
    goog.getMsgWithFallback = function (a, b) {
      return a;
    };

    /**
     * Exposes an unobfuscated global namespace path for the given object.
     * Note that fields of the exported object *will* be obfuscated, unless they are
     * exported in turn via this function or goog.exportProperty.
     *
     * Also handy for making public items that are defined in anonymous closures.
     *
     * ex. goog.exportSymbol('public.path.Foo', Foo);
     *
     * ex. goog.exportSymbol('public.path.Foo.staticFunction', Foo.staticFunction);
     *     public.path.Foo.staticFunction();
     *
     * ex. goog.exportSymbol('public.path.Foo.prototype.myMethod',
     *                       Foo.prototype.myMethod);
     *     new public.path.Foo().myMethod();
     *
     * @param {string} publicPath Unobfuscated name to export.
     * @param {*} object Object the name should point to.
     * @param {Object=} opt_objectToExportTo The object to add the path to; default
     *     is goog.global.
     */
    goog.exportSymbol = function (publicPath, object, opt_objectToExportTo) {
      goog.exportPath_(publicPath, object, opt_objectToExportTo);
    };

    /**
     * Exports a property unobfuscated into the object's namespace.
     * ex. goog.exportProperty(Foo, 'staticFunction', Foo.staticFunction);
     * ex. goog.exportProperty(Foo.prototype, 'myMethod', Foo.prototype.myMethod);
     * @param {Object} object Object whose static property is being exported.
     * @param {string} publicName Unobfuscated name to export.
     * @param {*} symbol Object the name should point to.
     */
    goog.exportProperty = function (object, publicName, symbol) {
      object[publicName] = symbol;
    };

    /**
     * Inherit the prototype methods from one constructor into another.
     *
     * Usage:
     * <pre>
     * function ParentClass(a, b) { }
     * ParentClass.prototype.foo = function(a) { };
     *
     * function ChildClass(a, b, c) {
     *   ChildClass.base(this, 'constructor', a, b);
     * }
     * goog.inherits(ChildClass, ParentClass);
     *
     * var child = new ChildClass('a', 'b', 'see');
     * child.foo(); // This works.
     * </pre>
     *
     * @param {!Function} childCtor Child class.
     * @param {!Function} parentCtor Parent class.
     */
    goog.inherits = function (childCtor, parentCtor) {
      /** @constructor */
      function tempCtor() {}
      tempCtor.prototype = parentCtor.prototype;
      childCtor.superClass_ = parentCtor.prototype;
      childCtor.prototype = new tempCtor();
      /** @override */
      childCtor.prototype.constructor = childCtor;

      /**
       * Calls superclass constructor/method.
       *
       * This function is only available if you use goog.inherits to
       * express inheritance relationships between classes.
       *
       * NOTE: This is a replacement for goog.base and for superClass_
       * property defined in childCtor.
       *
       * @param {!Object} me Should always be "this".
       * @param {string} methodName The method name to call. Calling
       *     superclass constructor can be done with the special string
       *     'constructor'.
       * @param {...*} var_args The arguments to pass to superclass
       *     method/constructor.
       * @return {*} The return value of the superclass method/constructor.
       */
      childCtor.base = function (me, methodName, var_args) {
        // Copying using loop to avoid deop due to passing arguments object to
        // function. This is faster in many JS engines as of late 2014.
        var args = new Array(arguments.length - 2);
        for (var i = 2; i < arguments.length; i++) {
          args[i - 2] = arguments[i];
        }
        return parentCtor.prototype[methodName].apply(me, args);
      };
    };

    /**
     * Call up to the superclass.
     *
     * If this is called from a constructor, then this calls the superclass
     * constructor with arguments 1-N.
     *
     * If this is called from a prototype method, then you must pass the name of the
     * method as the second argument to this function. If you do not, you will get a
     * runtime error. This calls the superclass' method with arguments 2-N.
     *
     * This function only works if you use goog.inherits to express inheritance
     * relationships between your classes.
     *
     * This function is a compiler primitive. At compile-time, the compiler will do
     * macro expansion to remove a lot of the extra overhead that this function
     * introduces. The compiler will also enforce a lot of the assumptions that this
     * function makes, and treat it as a compiler error if you break them.
     *
     * @param {!Object} me Should always be "this".
     * @param {*=} opt_methodName The method name if calling a super method.
     * @param {...*} var_args The rest of the arguments.
     * @return {*} The return value of the superclass method.
     * @suppress {es5Strict} This method can not be used in strict mode, but
     *     all Closure Library consumers must depend on this file.
     */
    goog.base = function (me, opt_methodName, var_args) {
      var caller = arguments.callee.caller;

      if (goog.STRICT_MODE_COMPATIBLE || goog.DEBUG && !caller) {
        throw Error('arguments.caller not defined.  goog.base() cannot be used ' + 'with strict mode code. See ' + 'http://www.ecma-international.org/ecma-262/5.1/#sec-C');
      }

      if (caller.superClass_) {
        // Copying using loop to avoid deop due to passing arguments object to
        // function. This is faster in many JS engines as of late 2014.
        var ctorArgs = new Array(arguments.length - 1);
        for (var i = 1; i < arguments.length; i++) {
          ctorArgs[i - 1] = arguments[i];
        }
        // This is a constructor. Call the superclass constructor.
        return caller.superClass_.constructor.apply(me, ctorArgs);
      }

      // Copying using loop to avoid deop due to passing arguments object to
      // function. This is faster in many JS engines as of late 2014.
      var args = new Array(arguments.length - 2);
      for (var i = 2; i < arguments.length; i++) {
        args[i - 2] = arguments[i];
      }
      var foundCaller = false;
      for (var ctor = me.constructor; ctor; ctor = ctor.superClass_ && ctor.superClass_.constructor) {
        if (ctor.prototype[opt_methodName] === caller) {
          foundCaller = true;
        } else if (foundCaller) {
          return ctor.prototype[opt_methodName].apply(me, args);
        }
      }

      // If we did not find the caller in the prototype chain, then one of two
      // things happened:
      // 1) The caller is an instance method.
      // 2) This method was not called by the right caller.
      if (me[opt_methodName] === caller) {
        return me.constructor.prototype[opt_methodName].apply(me, args);
      } else {
        throw Error('goog.base called from a method of one name ' + 'to a method of a different name');
      }
    };

    /**
     * Allow for aliasing within scope functions.  This function exists for
     * uncompiled code - in compiled code the calls will be inlined and the aliases
     * applied.  In uncompiled code the function is simply run since the aliases as
     * written are valid JavaScript.
     *
     *
     * @param {function()} fn Function to call.  This function can contain aliases
     *     to namespaces (e.g. "var dom = goog.dom") or classes
     *     (e.g. "var Timer = goog.Timer").
     */
    goog.scope = function (fn) {
      fn.call(goog.global);
    };

    /*
     * To support uncompiled, strict mode bundles that use eval to divide source
     * like so:
     *    eval('someSource;//# sourceUrl sourcefile.js');
     * We need to export the globally defined symbols "goog" and "COMPILED".
     * Exporting "goog" breaks the compiler optimizations, so we required that
     * be defined externally.
     * NOTE: We don't use goog.exportSymbol here because we don't want to trigger
     * extern generation when that compiler option is enabled.
     */
    if (!COMPILED) {
      goog.global['COMPILED'] = COMPILED;
    }

    goog.string = {};

    /**
     * Does simple python-style string substitution.
     * subs("foo%s hot%s", "bar", "dog") becomes "foobar hotdog".
     * @param {string} str The string containing the pattern.
     * @param {...*} var_args The items to substitute into the pattern.
     * @return {string} A copy of {@code str} in which each occurrence of
     *     {@code %s} has been replaced an argument from {@code var_args}.
     */
    goog.string.subs = function (str, var_args) {
      var splitParts = str.split('%s');
      var returnString = '';

      var subsArguments = Array.prototype.slice.call(arguments, 1);
      while (subsArguments.length &&
      // Replace up to the last split part. We are inserting in the
      // positions between split parts.
      splitParts.length > 1) {
        returnString += splitParts.shift() + subsArguments.shift();
      }

      return returnString + splitParts.join('%s'); // Join unused '%s'
    };

    /**
     * Regular expression that matches an ampersand, for use in escaping.
     * @const {!RegExp}
     * @private
     */
    goog.string.AMP_RE_ = /&/g;

    /**
     * Regular expression that matches a less than sign, for use in escaping.
     * @const {!RegExp}
     * @private
     */
    goog.string.LT_RE_ = /</g;

    /**
     * Regular expression that matches a greater than sign, for use in escaping.
     * @const {!RegExp}
     * @private
     */
    goog.string.GT_RE_ = />/g;

    /**
     * Regular expression that matches a double quote, for use in escaping.
     * @const {!RegExp}
     * @private
     */
    goog.string.QUOT_RE_ = /"/g;

    /**
     * Regular expression that matches a single quote, for use in escaping.
     * @const {!RegExp}
     * @private
     */
    goog.string.SINGLE_QUOTE_RE_ = /'/g;

    /**
     * Regular expression that matches null character, for use in escaping.
     * @const {!RegExp}
     * @private
     */
    goog.string.NULL_RE_ = /\x00/g;

    /**
     * Regular expression that matches a lowercase letter "e", for use in escaping.
     * @const {!RegExp}
     * @private
     */
    goog.string.E_RE_ = /e/g;

    /**
     * Regular expression that matches any character that needs to be escaped.
     * @const {!RegExp}
     * @private
     */
    goog.string.ALL_RE_ = goog.string.DETECT_DOUBLE_ESCAPING ? /[\x00&<>"'e]/ : /[\x00&<>"']/;

    /**
     * Escapes double quote '"' and single quote '\'' characters in addition to
     * '&', '<', and '>' so that a string can be included in an HTML tag attribute
     * value within double or single quotes.
     *
     * It should be noted that > doesn't need to be escaped for the HTML or XML to
     * be valid, but it has been decided to escape it for consistency with other
     * implementations.
     *
     * With goog.string.DETECT_DOUBLE_ESCAPING, this function escapes also the
     * lowercase letter "e".
     *
     * NOTE(user):
     * HtmlEscape is often called during the generation of large blocks of HTML.
     * Using statics for the regular expressions and strings is an optimization
     * that can more than half the amount of time IE spends in this function for
     * large apps, since strings and regexes both contribute to GC allocations.
     *
     * Testing for the presence of a character before escaping increases the number
     * of function calls, but actually provides a speed increase for the average
     * case -- since the average case often doesn't require the escaping of all 4
     * characters and indexOf() is much cheaper than replace().
     * The worst case does suffer slightly from the additional calls, therefore the
     * opt_isLikelyToContainHtmlChars option has been included for situations
     * where all 4 HTML entities are very likely to be present and need escaping.
     *
     * Some benchmarks (times tended to fluctuate +-0.05ms):
     *                                     FireFox                     IE6
     * (no chars / average (mix of cases) / all 4 chars)
     * no checks                     0.13 / 0.22 / 0.22         0.23 / 0.53 / 0.80
     * indexOf                       0.08 / 0.17 / 0.26         0.22 / 0.54 / 0.84
     * indexOf + re test             0.07 / 0.17 / 0.28         0.19 / 0.50 / 0.85
     *
     * An additional advantage of checking if replace actually needs to be called
     * is a reduction in the number of object allocations, so as the size of the
     * application grows the difference between the various methods would increase.
     *
     * @param {string} str string to be escaped.
     * @param {boolean=} opt_isLikelyToContainHtmlChars Don't perform a check to see
     *     if the character needs replacing - use this option if you expect each of
     *     the characters to appear often. Leave false if you expect few html
     *     characters to occur in your strings, such as if you are escaping HTML.
     * @return {string} An escaped copy of {@code str}.
     */
    goog.string.htmlEscape = function (str, opt_isLikelyToContainHtmlChars) {

      if (opt_isLikelyToContainHtmlChars) {
        str = str.replace(goog.string.AMP_RE_, '&amp;').replace(goog.string.LT_RE_, '&lt;').replace(goog.string.GT_RE_, '&gt;').replace(goog.string.QUOT_RE_, '&quot;').replace(goog.string.SINGLE_QUOTE_RE_, '&#39;').replace(goog.string.NULL_RE_, '&#0;');
        if (goog.string.DETECT_DOUBLE_ESCAPING) {
          str = str.replace(goog.string.E_RE_, '&#101;');
        }
        return str;
      } else {
        // quick test helps in the case when there are no chars to replace, in
        // worst case this makes barely a difference to the time taken
        if (!goog.string.ALL_RE_.test(str)) return str;

        // str.indexOf is faster than regex.test in this case
        if (str.indexOf('&') != -1) {
          str = str.replace(goog.string.AMP_RE_, '&amp;');
        }
        if (str.indexOf('<') != -1) {
          str = str.replace(goog.string.LT_RE_, '&lt;');
        }
        if (str.indexOf('>') != -1) {
          str = str.replace(goog.string.GT_RE_, '&gt;');
        }
        if (str.indexOf('"') != -1) {
          str = str.replace(goog.string.QUOT_RE_, '&quot;');
        }
        if (str.indexOf('\'') != -1) {
          str = str.replace(goog.string.SINGLE_QUOTE_RE_, '&#39;');
        }
        if (str.indexOf('\x00') != -1) {
          str = str.replace(goog.string.NULL_RE_, '&#0;');
        }
        if (goog.string.DETECT_DOUBLE_ESCAPING && str.indexOf('e') != -1) {
          str = str.replace(goog.string.E_RE_, '&#101;');
        }
        return str;
      }
    };

    goog.debug = {};

    /**
     * Returns the type of a value. If a constructor is passed, and a suitable
     * string cannot be found, 'unknown type name' will be returned.
     *
     * <p>Forked rather than moved from {@link goog.asserts.getType_}
     * to avoid adding a dependency to goog.asserts.
     * @param {*} value A constructor, object, or primitive.
     * @return {string} The best display name for the value, or 'unknown type name'.
     */
    goog.debug.runtimeType = function (value) {
      if (value instanceof Function) {
        return value.displayName || value.name || 'unknown type name';
      } else if (value instanceof Object) {
        return value.constructor.displayName || value.constructor.name || Object.prototype.toString.call(value);
      } else {
        return value === null ? 'null' : typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value);
      }
    };

    // Copyright 2009 The Closure Library Authors. All Rights Reserved.
    //
    // Licensed under the Apache License, Version 2.0 (the "License");
    // you may not use this file except in compliance with the License.
    // You may obtain a copy of the License at
    //
    //      http://www.apache.org/licenses/LICENSE-2.0
    //
    // Unless required by applicable law or agreed to in writing, software
    // distributed under the License is distributed on an "AS-IS" BASIS,
    // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    // See the License for the specific language governing permissions and
    // limitations under the License.

    /**
     * @fileoverview Provides a base class for custom Error objects such that the
     * stack is correctly maintained.
     *
     * You should never need to throw goog.debug.Error(msg) directly, Error(msg) is
     * sufficient.
     *
     */

    /**
     * Base class for custom error objects.
     * @param {*=} opt_msg The message associated with the error.
     * @constructor
     * @extends {Error}
     */
    goog.debug.Error = function (opt_msg) {

      // Attempt to ensure there is a stack trace.
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, goog.debug.Error);
      } else {
        var stack = new Error().stack;
        if (stack) {
          this.stack = stack;
        }
      }

      if (opt_msg) {
        this.message = String(opt_msg);
      }

      /**
       * Whether to report this error to the server. Setting this to false will
       * cause the error reporter to not report the error back to the server,
       * which can be useful if the client knows that the error has already been
       * logged on the server.
       * @type {boolean}
       */
      this.reportErrorToServer = true;
    };
    goog.inherits(goog.debug.Error, Error);

    /** @override */
    goog.debug.Error.prototype.name = 'CustomError';

    /**
     * @fileoverview Definition of goog.dom.NodeType.
     */

    goog.dom = {};

    /**
     * Constants for the nodeType attribute in the Node interface.
     *
     * These constants match those specified in the Node interface. These are
     * usually present on the Node object in recent browsers, but not in older
     * browsers (specifically, early IEs) and thus are given here.
     *
     * In some browsers (early IEs), these are not defined on the Node object,
     * so they are provided here.
     *
     * See http://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-1950641247
     * @enum {number}
     */
    goog.dom.NodeType = {
      ELEMENT: 1,
      ATTRIBUTE: 2,
      TEXT: 3,
      CDATA_SECTION: 4,
      ENTITY_REFERENCE: 5,
      ENTITY: 6,
      PROCESSING_INSTRUCTION: 7,
      COMMENT: 8,
      DOCUMENT: 9,
      DOCUMENT_TYPE: 10,
      DOCUMENT_FRAGMENT: 11,
      NOTATION: 12
    };

    // Copyright 2007 The Closure Library Authors. All Rights Reserved.
    //
    // Licensed under the Apache License, Version 2.0 (the "License");
    // you may not use this file except in compliance with the License.
    // You may obtain a copy of the License at
    //
    //      http://www.apache.org/licenses/LICENSE-2.0
    //
    // Unless required by applicable law or agreed to in writing, software
    // distributed under the License is distributed on an "AS-IS" BASIS,
    // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    // See the License for the specific language governing permissions and
    // limitations under the License.

    /**
     * @fileoverview Utility functions for supporting Bidi issues.
     */

    /**
     * Namespace for bidi supporting functions.
     */
    goog.provide('goog.i18n.bidi');
    goog.provide('goog.i18n.bidi.Dir');
    goog.provide('goog.i18n.bidi.DirectionalString');
    goog.provide('goog.i18n.bidi.Format');

    /**
     * @define {boolean} FORCE_RTL forces the {@link goog.i18n.bidi.IS_RTL} constant
     * to say that the current locale is a RTL locale.  This should only be used
     * if you want to override the default behavior for deciding whether the
     * current locale is RTL or not.
     *
     * {@see goog.i18n.bidi.IS_RTL}
     */
    goog.define('goog.i18n.bidi.FORCE_RTL', false);

    /**
     * Constant that defines whether or not the current locale is a RTL locale.
     * If {@link goog.i18n.bidi.FORCE_RTL} is not true, this constant will default
     * to check that {@link goog.LOCALE} is one of a few major RTL locales.
     *
     * <p>This is designed to be a maximally efficient compile-time constant. For
     * example, for the default goog.LOCALE, compiling
     * "if (goog.i18n.bidi.IS_RTL) alert('rtl') else {}" should produce no code. It
     * is this design consideration that limits the implementation to only
     * supporting a few major RTL locales, as opposed to the broader repertoire of
     * something like goog.i18n.bidi.isRtlLanguage.
     *
     * <p>Since this constant refers to the directionality of the locale, it is up
     * to the caller to determine if this constant should also be used for the
     * direction of the UI.
     *
     * {@see goog.LOCALE}
     *
     * @type {boolean}
     *
     * TODO(user): write a test that checks that this is a compile-time constant.
     */
    goog.i18n.bidi.IS_RTL = goog.i18n.bidi.FORCE_RTL || (goog.LOCALE.substring(0, 2).toLowerCase() == 'ar' || goog.LOCALE.substring(0, 2).toLowerCase() == 'fa' || goog.LOCALE.substring(0, 2).toLowerCase() == 'he' || goog.LOCALE.substring(0, 2).toLowerCase() == 'iw' || goog.LOCALE.substring(0, 2).toLowerCase() == 'ps' || goog.LOCALE.substring(0, 2).toLowerCase() == 'sd' || goog.LOCALE.substring(0, 2).toLowerCase() == 'ug' || goog.LOCALE.substring(0, 2).toLowerCase() == 'ur' || goog.LOCALE.substring(0, 2).toLowerCase() == 'yi') && (goog.LOCALE.length == 2 || goog.LOCALE.substring(2, 3) == '-' || goog.LOCALE.substring(2, 3) == '_') || goog.LOCALE.length >= 3 && goog.LOCALE.substring(0, 3).toLowerCase() == 'ckb' && (goog.LOCALE.length == 3 || goog.LOCALE.substring(3, 4) == '-' || goog.LOCALE.substring(3, 4) == '_');

    /**
     * Unicode formatting characters and directionality string constants.
     * @enum {string}
     */
    goog.i18n.bidi.Format = {
      /** Unicode "Left-To-Right Embedding" (LRE) character. */
      LRE: '‪',
      /** Unicode "Right-To-Left Embedding" (RLE) character. */
      RLE: '‫',
      /** Unicode "Pop Directional Formatting" (PDF) character. */
      PDF: '‬',
      /** Unicode "Left-To-Right Mark" (LRM) character. */
      LRM: '‎',
      /** Unicode "Right-To-Left Mark" (RLM) character. */
      RLM: '‏'
    };

    /**
     * Directionality enum.
     * @enum {number}
     */
    goog.i18n.bidi.Dir = {
      /**
       * Left-to-right.
       */
      LTR: 1,

      /**
       * Right-to-left.
       */
      RTL: -1,

      /**
       * Neither left-to-right nor right-to-left.
       */
      NEUTRAL: 0
    };

    /**
     * 'right' string constant.
     * @type {string}
     */
    goog.i18n.bidi.RIGHT = 'right';

    /**
     * 'left' string constant.
     * @type {string}
     */
    goog.i18n.bidi.LEFT = 'left';

    /**
     * 'left' if locale is RTL, 'right' if not.
     * @type {string}
     */
    goog.i18n.bidi.I18N_RIGHT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.LEFT : goog.i18n.bidi.RIGHT;

    /**
     * 'right' if locale is RTL, 'left' if not.
     * @type {string}
     */
    goog.i18n.bidi.I18N_LEFT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT;

    /**
     * Convert a directionality given in various formats to a goog.i18n.bidi.Dir
     * constant. Useful for interaction with different standards of directionality
     * representation.
     *
     * @param {goog.i18n.bidi.Dir|number|boolean|null} givenDir Directionality given
     *     in one of the following formats:
     *     1. A goog.i18n.bidi.Dir constant.
     *     2. A number (positive = LTR, negative = RTL, 0 = neutral).
     *     3. A boolean (true = RTL, false = LTR).
     *     4. A null for unknown directionality.
     * @param {boolean=} opt_noNeutral Whether a givenDir of zero or
     *     goog.i18n.bidi.Dir.NEUTRAL should be treated as null, i.e. unknown, in
     *     order to preserve legacy behavior.
     * @return {?goog.i18n.bidi.Dir} A goog.i18n.bidi.Dir constant matching the
     *     given directionality. If given null, returns null (i.e. unknown).
     */
    goog.i18n.bidi.toDir = function (givenDir, opt_noNeutral) {
      if (typeof givenDir == 'number') {
        // This includes the non-null goog.i18n.bidi.Dir case.
        return givenDir > 0 ? goog.i18n.bidi.Dir.LTR : givenDir < 0 ? goog.i18n.bidi.Dir.RTL : opt_noNeutral ? null : goog.i18n.bidi.Dir.NEUTRAL;
      } else if (givenDir == null) {
        return null;
      } else {
        // Must be typeof givenDir == 'boolean'.
        return givenDir ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR;
      }
    };

    /**
     * A practical pattern to identify strong LTR characters. This pattern is not
     * theoretically correct according to the Unicode standard. It is simplified for
     * performance and small code size.
     * @type {string}
     * @private
     */
    goog.i18n.bidi.ltrChars_ = 'A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿' + '‎Ⰰ-﬜︀-﹯﻽-￿';

    /**
     * A practical pattern to identify strong RTL character. This pattern is not
     * theoretically correct according to the Unicode standard. It is simplified
     * for performance and small code size.
     * @type {string}
     * @private
     */
    goog.i18n.bidi.rtlChars_ = '֑-ۯۺ-߿‏יִ-﷿ﹰ-ﻼ';

    /**
     * Simplified regular expression for an HTML tag (opening or closing) or an HTML
     * escape. We might want to skip over such expressions when estimating the text
     * directionality.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.htmlSkipReg_ = /<[^>]*>|&[^;]+;/g;

    /**
     * Returns the input text with spaces instead of HTML tags or HTML escapes, if
     * opt_isStripNeeded is true. Else returns the input as is.
     * Useful for text directionality estimation.
     * Note: the function should not be used in other contexts; it is not 100%
     * correct, but rather a good-enough implementation for directionality
     * estimation purposes.
     * @param {string} str The given string.
     * @param {boolean=} opt_isStripNeeded Whether to perform the stripping.
     *     Default: false (to retain consistency with calling functions).
     * @return {string} The given string cleaned of HTML tags / escapes.
     * @private
     */
    goog.i18n.bidi.stripHtmlIfNeeded_ = function (str, opt_isStripNeeded) {
      return opt_isStripNeeded ? str.replace(goog.i18n.bidi.htmlSkipReg_, '') : str;
    };

    /**
     * Regular expression to check for RTL characters.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.rtlCharReg_ = new RegExp('[' + goog.i18n.bidi.rtlChars_ + ']');

    /**
     * Regular expression to check for LTR characters.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.ltrCharReg_ = new RegExp('[' + goog.i18n.bidi.ltrChars_ + ']');

    /**
     * Test whether the given string has any RTL characters in it.
     * @param {string} str The given string that need to be tested.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether the string contains RTL characters.
     */
    goog.i18n.bidi.hasAnyRtl = function (str, opt_isHtml) {
      return goog.i18n.bidi.rtlCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(str, opt_isHtml));
    };

    /**
     * Test whether the given string has any RTL characters in it.
     * @param {string} str The given string that need to be tested.
     * @return {boolean} Whether the string contains RTL characters.
     * @deprecated Use hasAnyRtl.
     */
    goog.i18n.bidi.hasRtlChar = goog.i18n.bidi.hasAnyRtl;

    /**
     * Test whether the given string has any LTR characters in it.
     * @param {string} str The given string that need to be tested.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether the string contains LTR characters.
     */
    goog.i18n.bidi.hasAnyLtr = function (str, opt_isHtml) {
      return goog.i18n.bidi.ltrCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(str, opt_isHtml));
    };

    /**
     * Regular expression pattern to check if the first character in the string
     * is LTR.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.ltrRe_ = new RegExp('^[' + goog.i18n.bidi.ltrChars_ + ']');

    /**
     * Regular expression pattern to check if the first character in the string
     * is RTL.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.rtlRe_ = new RegExp('^[' + goog.i18n.bidi.rtlChars_ + ']');

    /**
     * Check if the first character in the string is RTL or not.
     * @param {string} str The given string that need to be tested.
     * @return {boolean} Whether the first character in str is an RTL char.
     */
    goog.i18n.bidi.isRtlChar = function (str) {
      return goog.i18n.bidi.rtlRe_.test(str);
    };

    /**
     * Check if the first character in the string is LTR or not.
     * @param {string} str The given string that need to be tested.
     * @return {boolean} Whether the first character in str is an LTR char.
     */
    goog.i18n.bidi.isLtrChar = function (str) {
      return goog.i18n.bidi.ltrRe_.test(str);
    };

    /**
     * Check if the first character in the string is neutral or not.
     * @param {string} str The given string that need to be tested.
     * @return {boolean} Whether the first character in str is a neutral char.
     */
    goog.i18n.bidi.isNeutralChar = function (str) {
      return !goog.i18n.bidi.isLtrChar(str) && !goog.i18n.bidi.isRtlChar(str);
    };

    /**
     * Regular expressions to check if a piece of text is of LTR directionality
     * on first character with strong directionality.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.ltrDirCheckRe_ = new RegExp('^[^' + goog.i18n.bidi.rtlChars_ + ']*[' + goog.i18n.bidi.ltrChars_ + ']');

    /**
     * Regular expressions to check if a piece of text is of RTL directionality
     * on first character with strong directionality.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.rtlDirCheckRe_ = new RegExp('^[^' + goog.i18n.bidi.ltrChars_ + ']*[' + goog.i18n.bidi.rtlChars_ + ']');

    /**
     * Check whether the first strongly directional character (if any) is RTL.
     * @param {string} str String being checked.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether RTL directionality is detected using the first
     *     strongly-directional character method.
     */
    goog.i18n.bidi.startsWithRtl = function (str, opt_isHtml) {
      return goog.i18n.bidi.rtlDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(str, opt_isHtml));
    };

    /**
     * Check whether the first strongly directional character (if any) is RTL.
     * @param {string} str String being checked.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether RTL directionality is detected using the first
     *     strongly-directional character method.
     * @deprecated Use startsWithRtl.
     */
    goog.i18n.bidi.isRtlText = goog.i18n.bidi.startsWithRtl;

    /**
     * Check whether the first strongly directional character (if any) is LTR.
     * @param {string} str String being checked.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether LTR directionality is detected using the first
     *     strongly-directional character method.
     */
    goog.i18n.bidi.startsWithLtr = function (str, opt_isHtml) {
      return goog.i18n.bidi.ltrDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(str, opt_isHtml));
    };

    /**
     * Check whether the first strongly directional character (if any) is LTR.
     * @param {string} str String being checked.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether LTR directionality is detected using the first
     *     strongly-directional character method.
     * @deprecated Use startsWithLtr.
     */
    goog.i18n.bidi.isLtrText = goog.i18n.bidi.startsWithLtr;

    /**
     * Regular expression to check if a string looks like something that must
     * always be LTR even in RTL text, e.g. a URL. When estimating the
     * directionality of text containing these, we treat these as weakly LTR,
     * like numbers.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.isRequiredLtrRe_ = /^http:\/\/.*/;

    /**
     * Check whether the input string either contains no strongly directional
     * characters or looks like a url.
     * @param {string} str String being checked.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether neutral directionality is detected.
     */
    goog.i18n.bidi.isNeutralText = function (str, opt_isHtml) {
      str = goog.i18n.bidi.stripHtmlIfNeeded_(str, opt_isHtml);
      return goog.i18n.bidi.isRequiredLtrRe_.test(str) || !goog.i18n.bidi.hasAnyLtr(str) && !goog.i18n.bidi.hasAnyRtl(str);
    };

    /**
     * Regular expressions to check if the last strongly-directional character in a
     * piece of text is LTR.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.ltrExitDirCheckRe_ = new RegExp('[' + goog.i18n.bidi.ltrChars_ + '][^' + goog.i18n.bidi.rtlChars_ + ']*$');

    /**
     * Regular expressions to check if the last strongly-directional character in a
     * piece of text is RTL.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.rtlExitDirCheckRe_ = new RegExp('[' + goog.i18n.bidi.rtlChars_ + '][^' + goog.i18n.bidi.ltrChars_ + ']*$');

    /**
     * Check if the exit directionality a piece of text is LTR, i.e. if the last
     * strongly-directional character in the string is LTR.
     * @param {string} str String being checked.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether LTR exit directionality was detected.
     */
    goog.i18n.bidi.endsWithLtr = function (str, opt_isHtml) {
      return goog.i18n.bidi.ltrExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(str, opt_isHtml));
    };

    /**
     * Check if the exit directionality a piece of text is LTR, i.e. if the last
     * strongly-directional character in the string is LTR.
     * @param {string} str String being checked.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether LTR exit directionality was detected.
     * @deprecated Use endsWithLtr.
     */
    goog.i18n.bidi.isLtrExitText = goog.i18n.bidi.endsWithLtr;

    /**
     * Check if the exit directionality a piece of text is RTL, i.e. if the last
     * strongly-directional character in the string is RTL.
     * @param {string} str String being checked.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether RTL exit directionality was detected.
     */
    goog.i18n.bidi.endsWithRtl = function (str, opt_isHtml) {
      return goog.i18n.bidi.rtlExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(str, opt_isHtml));
    };

    /**
     * Check if the exit directionality a piece of text is RTL, i.e. if the last
     * strongly-directional character in the string is RTL.
     * @param {string} str String being checked.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether RTL exit directionality was detected.
     * @deprecated Use endsWithRtl.
     */
    goog.i18n.bidi.isRtlExitText = goog.i18n.bidi.endsWithRtl;

    /**
     * A regular expression for matching right-to-left language codes.
     * See {@link #isRtlLanguage} for the design.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.rtlLocalesRe_ = new RegExp('^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|' + '.*[-_](Arab|Hebr|Thaa|Nkoo|Tfng))' + '(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)', 'i');

    /**
     * Check if a BCP 47 / III language code indicates an RTL language, i.e. either:
     * - a language code explicitly specifying one of the right-to-left scripts,
     *   e.g. "az-Arab", or<p>
     * - a language code specifying one of the languages normally written in a
     *   right-to-left script, e.g. "fa" (Farsi), except ones explicitly specifying
     *   Latin or Cyrillic script (which are the usual LTR alternatives).<p>
     * The list of right-to-left scripts appears in the 100-199 range in
     * http://www.unicode.org/iso15924/iso15924-num.html, of which Arabic and
     * Hebrew are by far the most widely used. We also recognize Thaana, N'Ko, and
     * Tifinagh, which also have significant modern usage. The rest (Syriac,
     * Samaritan, Mandaic, etc.) seem to have extremely limited or no modern usage
     * and are not recognized to save on code size.
     * The languages usually written in a right-to-left script are taken as those
     * with Suppress-Script: Hebr|Arab|Thaa|Nkoo|Tfng  in
     * http://www.iana.org/assignments/language-subtag-registry,
     * as well as Central (or Sorani) Kurdish (ckb), Sindhi (sd) and Uyghur (ug).
     * Other subtags of the language code, e.g. regions like EG (Egypt), are
     * ignored.
     * @param {string} lang BCP 47 (a.k.a III) language code.
     * @return {boolean} Whether the language code is an RTL language.
     */
    goog.i18n.bidi.isRtlLanguage = function (lang) {
      return goog.i18n.bidi.rtlLocalesRe_.test(lang);
    };

    /**
     * Regular expression for bracket guard replacement in text.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.bracketGuardTextRe_ = /(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(<.*?>+)/g;

    /**
     * Apply bracket guard using LRM and RLM. This is to address the problem of
     * messy bracket display frequently happens in RTL layout.
     * This function works for plain text, not for HTML. In HTML, the opening
     * bracket might be in a different context than the closing bracket (such as
     * an attribute value).
     * @param {string} s The string that need to be processed.
     * @param {boolean=} opt_isRtlContext specifies default direction (usually
     *     direction of the UI).
     * @return {string} The processed string, with all bracket guarded.
     */
    goog.i18n.bidi.guardBracketInText = function (s, opt_isRtlContext) {
      var useRtl = opt_isRtlContext === undefined ? goog.i18n.bidi.hasAnyRtl(s) : opt_isRtlContext;
      var mark = useRtl ? goog.i18n.bidi.Format.RLM : goog.i18n.bidi.Format.LRM;
      return s.replace(goog.i18n.bidi.bracketGuardTextRe_, mark + '$&' + mark);
    };

    /**
     * Enforce the html snippet in RTL directionality regardless overall context.
     * If the html piece was enclosed by tag, dir will be applied to existing
     * tag, otherwise a span tag will be added as wrapper. For this reason, if
     * html snippet start with with tag, this tag must enclose the whole piece. If
     * the tag already has a dir specified, this new one will override existing
     * one in behavior (tested on FF and IE).
     * @param {string} html The string that need to be processed.
     * @return {string} The processed string, with directionality enforced to RTL.
     */
    goog.i18n.bidi.enforceRtlInHtml = function (html) {
      if (html.charAt(0) == '<') {
        return html.replace(/<\w+/, '$& dir=rtl');
      }
      // '\n' is important for FF so that it won't incorrectly merge span groups
      return '\n<span dir=rtl>' + html + '</span>';
    };

    /**
     * Enforce RTL on both end of the given text piece using unicode BiDi formatting
     * characters RLE and PDF.
     * @param {string} text The piece of text that need to be wrapped.
     * @return {string} The wrapped string after process.
     */
    goog.i18n.bidi.enforceRtlInText = function (text) {
      return goog.i18n.bidi.Format.RLE + text + goog.i18n.bidi.Format.PDF;
    };

    /**
     * Enforce the html snippet in RTL directionality regardless overall context.
     * If the html piece was enclosed by tag, dir will be applied to existing
     * tag, otherwise a span tag will be added as wrapper. For this reason, if
     * html snippet start with with tag, this tag must enclose the whole piece. If
     * the tag already has a dir specified, this new one will override existing
     * one in behavior (tested on FF and IE).
     * @param {string} html The string that need to be processed.
     * @return {string} The processed string, with directionality enforced to RTL.
     */
    goog.i18n.bidi.enforceLtrInHtml = function (html) {
      if (html.charAt(0) == '<') {
        return html.replace(/<\w+/, '$& dir=ltr');
      }
      // '\n' is important for FF so that it won't incorrectly merge span groups
      return '\n<span dir=ltr>' + html + '</span>';
    };

    /**
     * Enforce LTR on both end of the given text piece using unicode BiDi formatting
     * characters LRE and PDF.
     * @param {string} text The piece of text that need to be wrapped.
     * @return {string} The wrapped string after process.
     */
    goog.i18n.bidi.enforceLtrInText = function (text) {
      return goog.i18n.bidi.Format.LRE + text + goog.i18n.bidi.Format.PDF;
    };

    /**
     * Regular expression to find dimensions such as "padding: .3 0.4ex 5px 6;"
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.dimensionsRe_ = /:\s*([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)/g;

    /**
     * Regular expression for left.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.leftRe_ = /left/gi;

    /**
     * Regular expression for right.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.rightRe_ = /right/gi;

    /**
     * Placeholder regular expression for swapping.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.tempRe_ = /%%%%/g;

    /**
     * Swap location parameters and 'left'/'right' in CSS specification. The
     * processed string will be suited for RTL layout. Though this function can
     * cover most cases, there are always exceptions. It is suggested to put
     * those exceptions in separate group of CSS string.
     * @param {string} cssStr CSS spefication string.
     * @return {string} Processed CSS specification string.
     */
    goog.i18n.bidi.mirrorCSS = function (cssStr) {
      return cssStr.
      // reverse dimensions
      replace(goog.i18n.bidi.dimensionsRe_, ':$1 $4 $3 $2').replace(goog.i18n.bidi.leftRe_, '%%%%'). // swap left and right
      replace(goog.i18n.bidi.rightRe_, goog.i18n.bidi.LEFT).replace(goog.i18n.bidi.tempRe_, goog.i18n.bidi.RIGHT);
    };

    /**
     * Regular expression for hebrew double quote substitution, finding quote
     * directly after hebrew characters.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.doubleQuoteSubstituteRe_ = /([\u0591-\u05f2])"/g;

    /**
     * Regular expression for hebrew single quote substitution, finding quote
     * directly after hebrew characters.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.singleQuoteSubstituteRe_ = /([\u0591-\u05f2])'/g;

    /**
     * Replace the double and single quote directly after a Hebrew character with
     * GERESH and GERSHAYIM. In such case, most likely that's user intention.
     * @param {string} str String that need to be processed.
     * @return {string} Processed string with double/single quote replaced.
     */
    goog.i18n.bidi.normalizeHebrewQuote = function (str) {
      return str.replace(goog.i18n.bidi.doubleQuoteSubstituteRe_, '$1״').replace(goog.i18n.bidi.singleQuoteSubstituteRe_, '$1׳');
    };

    /**
     * Regular expression to split a string into "words" for directionality
     * estimation based on relative word counts.
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.wordSeparatorRe_ = /\s+/;

    /**
     * Regular expression to check if a string contains any numerals. Used to
     * differentiate between completely neutral strings and those containing
     * numbers, which are weakly LTR.
     *
     * Native Arabic digits (\u0660 - \u0669) are not included because although they
     * do flow left-to-right inside a number, this is the case even if the  overall
     * directionality is RTL, and a mathematical expression using these digits is
     * supposed to flow right-to-left overall, including unary plus and minus
     * appearing to the right of a number, and this does depend on the overall
     * directionality being RTL. The digits used in Farsi (\u06F0 - \u06F9), on the
     * other hand, are included, since Farsi math (including unary plus and minus)
     * does flow left-to-right.
     *
     * @type {RegExp}
     * @private
     */
    goog.i18n.bidi.hasNumeralsRe_ = /[\d\u06f0-\u06f9]/;

    /**
     * This constant controls threshold of RTL directionality.
     * @type {number}
     * @private
     */
    goog.i18n.bidi.rtlDetectionThreshold_ = 0.40;

    /**
     * Estimates the directionality of a string based on relative word counts.
     * If the number of RTL words is above a certain percentage of the total number
     * of strongly directional words, returns RTL.
     * Otherwise, if any words are strongly or weakly LTR, returns LTR.
     * Otherwise, returns UNKNOWN, which is used to mean "neutral".
     * Numbers are counted as weakly LTR.
     * @param {string} str The string to be checked.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {goog.i18n.bidi.Dir} Estimated overall directionality of {@code str}.
     */
    goog.i18n.bidi.estimateDirection = function (str, opt_isHtml) {
      var rtlCount = 0;
      var totalCount = 0;
      var hasWeaklyLtr = false;
      var tokens = goog.i18n.bidi.stripHtmlIfNeeded_(str, opt_isHtml).split(goog.i18n.bidi.wordSeparatorRe_);
      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        if (goog.i18n.bidi.startsWithRtl(token)) {
          rtlCount++;
          totalCount++;
        } else if (goog.i18n.bidi.isRequiredLtrRe_.test(token)) {
          hasWeaklyLtr = true;
        } else if (goog.i18n.bidi.hasAnyLtr(token)) {
          totalCount++;
        } else if (goog.i18n.bidi.hasNumeralsRe_.test(token)) {
          hasWeaklyLtr = true;
        }
      }

      return totalCount == 0 ? hasWeaklyLtr ? goog.i18n.bidi.Dir.LTR : goog.i18n.bidi.Dir.NEUTRAL : rtlCount / totalCount > goog.i18n.bidi.rtlDetectionThreshold_ ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR;
    };

    /**
     * Check the directionality of a piece of text, return true if the piece of
     * text should be laid out in RTL direction.
     * @param {string} str The piece of text that need to be detected.
     * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
     *     Default: false.
     * @return {boolean} Whether this piece of text should be laid out in RTL.
     */
    goog.i18n.bidi.detectRtlDirectionality = function (str, opt_isHtml) {
      return goog.i18n.bidi.estimateDirection(str, opt_isHtml) == goog.i18n.bidi.Dir.RTL;
    };

    /**
     * Sets text input element's directionality and text alignment based on a
     * given directionality. Does nothing if the given directionality is unknown or
     * neutral.
     * @param {Element} element Input field element to set directionality to.
     * @param {goog.i18n.bidi.Dir|number|boolean|null} dir Desired directionality,
     *     given in one of the following formats:
     *     1. A goog.i18n.bidi.Dir constant.
     *     2. A number (positive = LRT, negative = RTL, 0 = neutral).
     *     3. A boolean (true = RTL, false = LTR).
     *     4. A null for unknown directionality.
     */
    goog.i18n.bidi.setElementDirAndAlign = function (element, dir) {
      if (element) {
        dir = goog.i18n.bidi.toDir(dir);
        if (dir) {
          element.style.textAlign = dir == goog.i18n.bidi.Dir.RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT;
          element.dir = dir == goog.i18n.bidi.Dir.RTL ? 'rtl' : 'ltr';
        }
      }
    };

    /**
     * Sets element dir based on estimated directionality of the given text.
     * @param {!Element} element
     * @param {string} text
     */
    goog.i18n.bidi.setElementDirByTextDirectionality = function (element, text) {
      switch (goog.i18n.bidi.estimateDirection(text)) {
        case goog.i18n.bidi.Dir.LTR:
          element.dir = 'ltr';
          break;
        case goog.i18n.bidi.Dir.RTL:
          element.dir = 'rtl';
          break;
        default:
          // Default for no direction, inherit from document.
          element.removeAttribute('dir');
      }
    };

    /**
     * Strings that have an (optional) known direction.
     *
     * Implementations of this interface are string-like objects that carry an
     * attached direction, if known.
     * @interface
     */
    goog.i18n.bidi.DirectionalString = function () {};

    /**
     * Interface marker of the DirectionalString interface.
     *
     * This property can be used to determine at runtime whether or not an object
     * implements this interface.  All implementations of this interface set this
     * property to {@code true}.
     * @type {boolean}
     */
    goog.i18n.bidi.DirectionalString.prototype.implementsGoogI18nBidiDirectionalString;

    /**
     * Retrieves this object's known direction (if any).
     * @return {?goog.i18n.bidi.Dir} The known direction. Null if unknown.
     */
    goog.i18n.bidi.DirectionalString.prototype.getDirection;

    /* jshint ignore:start */

    // Copyright 2008 The Closure Library Authors. All Rights Reserved.
    //
    // Licensed under the Apache License, Version 2.0 (the "License");
    // you may not use this file except in compliance with the License.
    // You may obtain a copy of the License at
    //
    //      http://www.apache.org/licenses/LICENSE-2.0
    //
    // Unless required by applicable law or agreed to in writing, software
    // distributed under the License is distributed on an "AS-IS" BASIS,
    // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    // See the License for the specific language governing permissions and
    // limitations under the License.

    /**
     * @fileoverview Utilities to check the preconditions, postconditions and
     * invariants runtime.
     *
     * Methods in this package should be given special treatment by the compiler
     * for type-inference. For example, <code>goog.asserts.assert(foo)</code>
     * will restrict <code>foo</code> to a truthy value.
     *
     * The compiler has an option to disable asserts. So code like:
     * <code>
     * var x = goog.asserts.assert(foo()); goog.asserts.assert(bar());
     * </code>
     * will be transformed into:
     * <code>
     * var x = foo();
     * </code>
     * The compiler will leave in foo() (because its return value is used),
     * but it will remove bar() because it assumes it does not have side-effects.
     *
     * @author agrieve@google.com (Andrew Grieve)
     */

    goog.provide('goog.asserts');

    /**
     * @define {boolean} Whether to strip out asserts or to leave them in.
     */
    goog.define('goog.asserts.ENABLE_ASSERTS', goog.DEBUG);

    /**
     * Error object for failed assertions.
     * @param {string} messagePattern The pattern that was used to form message.
     * @param {!Array<*>} messageArgs The items to substitute into the pattern.
     * @constructor
     * @extends {goog.debug.Error}
     * @final
     */
    goog.asserts.AssertionError = function (messagePattern, messageArgs) {
      messageArgs.unshift(messagePattern);
      goog.debug.Error.call(this, goog.string.subs.apply(null, messageArgs));
      // Remove the messagePattern afterwards to avoid permanently modifying the
      // passed in array.
      messageArgs.shift();

      /**
       * The message pattern used to format the error message. Error handlers can
       * use this to uniquely identify the assertion.
       * @type {string}
       */
      this.messagePattern = messagePattern;
    };
    goog.inherits(goog.asserts.AssertionError, goog.debug.Error);

    /** @override */
    goog.asserts.AssertionError.prototype.name = 'AssertionError';

    /**
     * The default error handler.
     * @param {!goog.asserts.AssertionError} e The exception to be handled.
     */
    goog.asserts.DEFAULT_ERROR_HANDLER = function (e) {
      throw e;
    };

    /**
     * The handler responsible for throwing or logging assertion errors.
     * @private {function(!goog.asserts.AssertionError)}
     */
    goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER;

    /**
     * Throws an exception with the given message and "Assertion failed" prefixed
     * onto it.
     * @param {string} defaultMessage The message to use if givenMessage is empty.
     * @param {Array<*>} defaultArgs The substitution arguments for defaultMessage.
     * @param {string|undefined} givenMessage Message supplied by the caller.
     * @param {Array<*>} givenArgs The substitution arguments for givenMessage.
     * @throws {goog.asserts.AssertionError} When the value is not a number.
     * @private
     */
    goog.asserts.doAssertFailure_ = function (defaultMessage, defaultArgs, givenMessage, givenArgs) {
      var message = 'Assertion failed';
      if (givenMessage) {
        message += ': ' + givenMessage;
        var args = givenArgs;
      } else if (defaultMessage) {
        message += ': ' + defaultMessage;
        args = defaultArgs;
      }
      // The '' + works around an Opera 10 bug in the unit tests. Without it,
      // a stack trace is added to var message above. With this, a stack trace is
      // not added until this line (it causes the extra garbage to be added after
      // the assertion message instead of in the middle of it).
      var e = new goog.asserts.AssertionError('' + message, args || []);
      goog.asserts.errorHandler_(e);
    };

    /**
     * Sets a custom error handler that can be used to customize the behavior of
     * assertion failures, for example by turning all assertion failures into log
     * messages.
     * @param {function(!goog.asserts.AssertionError)} errorHandler
     */
    goog.asserts.setErrorHandler = function (errorHandler) {
      if (goog.asserts.ENABLE_ASSERTS) {
        goog.asserts.errorHandler_ = errorHandler;
      }
    };

    /**
     * Checks if the condition evaluates to true if goog.asserts.ENABLE_ASSERTS is
     * true.
     * @template T
     * @param {T} condition The condition to check.
     * @param {string=} opt_message Error message in case of failure.
     * @param {...*} var_args The items to substitute into the failure message.
     * @return {T} The value of the condition.
     * @throws {goog.asserts.AssertionError} When the condition evaluates to false.
     */
    goog.asserts.assert = function (condition, opt_message, var_args) {
      if (goog.asserts.ENABLE_ASSERTS && !condition) {
        goog.asserts.doAssertFailure_('', null, opt_message, Array.prototype.slice.call(arguments, 2));
      }
      return condition;
    };

    /**
     * Fails if goog.asserts.ENABLE_ASSERTS is true. This function is useful in case
     * when we want to add a check in the unreachable area like switch-case
     * statement:
     *
     * <pre>
     *  switch(type) {
     *    case FOO: doSomething(); break;
     *    case BAR: doSomethingElse(); break;
     *    default: goog.assert.fail('Unrecognized type: ' + type);
     *      // We have only 2 types - "default:" section is unreachable code.
     *  }
     * </pre>
     *
     * @param {string=} opt_message Error message in case of failure.
     * @param {...*} var_args The items to substitute into the failure message.
     * @throws {goog.asserts.AssertionError} Failure.
     */
    goog.asserts.fail = function (opt_message, var_args) {
      if (goog.asserts.ENABLE_ASSERTS) {
        goog.asserts.errorHandler_(new goog.asserts.AssertionError('Failure' + (opt_message ? ': ' + opt_message : ''), Array.prototype.slice.call(arguments, 1)));
      }
    };

    /**
     * Checks if the value is a number if goog.asserts.ENABLE_ASSERTS is true.
     * @param {*} value The value to check.
     * @param {string=} opt_message Error message in case of failure.
     * @param {...*} var_args The items to substitute into the failure message.
     * @return {number} The value, guaranteed to be a number when asserts enabled.
     * @throws {goog.asserts.AssertionError} When the value is not a number.
     */
    goog.asserts.assertNumber = function (value, opt_message, var_args) {
      if (goog.asserts.ENABLE_ASSERTS && !goog.isNumber(value)) {
        goog.asserts.doAssertFailure_('Expected number but got %s: %s.', [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
      }
      return (/** @type {number} */value
      );
    };

    /**
     * Checks if the value is a string if goog.asserts.ENABLE_ASSERTS is true.
     * @param {*} value The value to check.
     * @param {string=} opt_message Error message in case of failure.
     * @param {...*} var_args The items to substitute into the failure message.
     * @return {string} The value, guaranteed to be a string when asserts enabled.
     * @throws {goog.asserts.AssertionError} When the value is not a string.
     */
    goog.asserts.assertString = function (value, opt_message, var_args) {
      if (goog.asserts.ENABLE_ASSERTS && !goog.isString(value)) {
        goog.asserts.doAssertFailure_('Expected string but got %s: %s.', [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
      }
      return (/** @type {string} */value
      );
    };

    /**
     * Checks if the value is a function if goog.asserts.ENABLE_ASSERTS is true.
     * @param {*} value The value to check.
     * @param {string=} opt_message Error message in case of failure.
     * @param {...*} var_args The items to substitute into the failure message.
     * @return {!Function} The value, guaranteed to be a function when asserts
     *     enabled.
     * @throws {goog.asserts.AssertionError} When the value is not a function.
     */
    goog.asserts.assertFunction = function (value, opt_message, var_args) {
      if (goog.asserts.ENABLE_ASSERTS && !goog.isFunction(value)) {
        goog.asserts.doAssertFailure_('Expected function but got %s: %s.', [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
      }
      return (/** @type {!Function} */value
      );
    };

    /**
     * Checks if the value is an Object if goog.asserts.ENABLE_ASSERTS is true.
     * @param {*} value The value to check.
     * @param {string=} opt_message Error message in case of failure.
     * @param {...*} var_args The items to substitute into the failure message.
     * @return {!Object} The value, guaranteed to be a non-null object.
     * @throws {goog.asserts.AssertionError} When the value is not an object.
     */
    goog.asserts.assertObject = function (value, opt_message, var_args) {
      if (goog.asserts.ENABLE_ASSERTS && !goog.isObject(value)) {
        goog.asserts.doAssertFailure_('Expected object but got %s: %s.', [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
      }
      return (/** @type {!Object} */value
      );
    };

    /**
     * Checks if the value is an Array if goog.asserts.ENABLE_ASSERTS is true.
     * @param {*} value The value to check.
     * @param {string=} opt_message Error message in case of failure.
     * @param {...*} var_args The items to substitute into the failure message.
     * @return {!Array<?>} The value, guaranteed to be a non-null array.
     * @throws {goog.asserts.AssertionError} When the value is not an array.
     */
    goog.asserts.assertArray = function (value, opt_message, var_args) {
      if (goog.asserts.ENABLE_ASSERTS && !goog.isArray(value)) {
        goog.asserts.doAssertFailure_('Expected array but got %s: %s.', [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
      }
      return (/** @type {!Array<?>} */value
      );
    };

    /**
     * Checks if the value is a boolean if goog.asserts.ENABLE_ASSERTS is true.
     * @param {*} value The value to check.
     * @param {string=} opt_message Error message in case of failure.
     * @param {...*} var_args The items to substitute into the failure message.
     * @return {boolean} The value, guaranteed to be a boolean when asserts are
     *     enabled.
     * @throws {goog.asserts.AssertionError} When the value is not a boolean.
     */
    goog.asserts.assertBoolean = function (value, opt_message, var_args) {
      if (goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(value)) {
        goog.asserts.doAssertFailure_('Expected boolean but got %s: %s.', [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
      }
      return (/** @type {boolean} */value
      );
    };

    /**
     * Checks if the value is a DOM Element if goog.asserts.ENABLE_ASSERTS is true.
     * @param {*} value The value to check.
     * @param {string=} opt_message Error message in case of failure.
     * @param {...*} var_args The items to substitute into the failure message.
     * @return {!Element} The value, likely to be a DOM Element when asserts are
     *     enabled.
     * @throws {goog.asserts.AssertionError} When the value is not an Element.
     */
    goog.asserts.assertElement = function (value, opt_message, var_args) {
      if (goog.asserts.ENABLE_ASSERTS && (!goog.isObject(value) || value.nodeType != goog.dom.NodeType.ELEMENT)) {
        goog.asserts.doAssertFailure_('Expected Element but got %s: %s.', [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
      }
      return (/** @type {!Element} */value
      );
    };

    /**
     * Checks if the value is an instance of the user-defined type if
     * goog.asserts.ENABLE_ASSERTS is true.
     *
     * The compiler may tighten the type returned by this function.
     *
     * @param {?} value The value to check.
     * @param {function(new: T, ...)} type A user-defined constructor.
     * @param {string=} opt_message Error message in case of failure.
     * @param {...*} var_args The items to substitute into the failure message.
     * @throws {goog.asserts.AssertionError} When the value is not an instance of
     *     type.
     * @return {T}
     * @template T
     */
    goog.asserts.assertInstanceof = function (value, type, opt_message, var_args) {
      if (goog.asserts.ENABLE_ASSERTS && !(value instanceof type)) {
        goog.asserts.doAssertFailure_('Expected instanceof %s but got %s.', [goog.asserts.getType_(type), goog.asserts.getType_(value)], opt_message, Array.prototype.slice.call(arguments, 3));
      }
      return value;
    };

    /**
     * Checks that no enumerable keys are present in Object.prototype. Such keys
     * would break most code that use {@code for (var ... in ...)} loops.
     */
    goog.asserts.assertObjectPrototypeIsIntact = function () {
      for (var key in Object.prototype) {
        goog.asserts.fail(key + ' should not be enumerable in Object.prototype.');
      }
    };

    /**
     * Returns the type of a value. If a constructor is passed, and a suitable
     * string cannot be found, 'unknown type name' will be returned.
     * @param {*} value A constructor, object, or primitive.
     * @return {string} The best display name for the value, or 'unknown type name'.
     * @private
     */
    goog.asserts.getType_ = function (value) {
      if (value instanceof Function) {
        return value.displayName || value.name || 'unknown type name';
      } else if (value instanceof Object) {
        return value.constructor.displayName || value.constructor.name || Object.prototype.toString.call(value);
      } else {
        return value === null ? 'null' : typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value);
      }
    };

    /**
     * @fileoverview Utility for fast string concatenation.
     */

    /**
     * Utility class to facilitate string concatenation.
     *
     * @param {*=} opt_a1 Optional first initial item to append.
     * @param {...*} var_args Other initial items to
     *     append, e.g., new goog.string.StringBuffer('foo', 'bar').
     * @constructor
     */
    goog.string.StringBuffer = function (opt_a1, var_args) {
      if (opt_a1 != null) {
        this.append.apply(this, arguments);
      }
    };

    /**
     * Internal buffer for the string to be concatenated.
     * @type {string}
     * @private
     */
    goog.string.StringBuffer.prototype.buffer_ = '';

    /**
     * Sets the contents of the string buffer object, replacing what's currently
     * there.
     *
     * @param {*} s String to set.
     */
    goog.string.StringBuffer.prototype.set = function (s) {
      this.buffer_ = '' + s;
    };

    /**
     * Appends one or more items to the buffer.
     *
     * Calling this with null, undefined, or empty arguments is an error.
     *
     * @param {*} a1 Required first string.
     * @param {*=} opt_a2 Optional second string.
     * @param {...?} var_args Other items to append,
     *     e.g., sb.append('foo', 'bar', 'baz').
     * @return {!goog.string.StringBuffer} This same StringBuffer object.
     * @suppress {duplicate}
     */
    goog.string.StringBuffer.prototype.append = function (a1, opt_a2, var_args) {
      // Use a1 directly to avoid arguments instantiation for single-arg case.
      this.buffer_ += String(a1);
      if (opt_a2 != null) {
        // second argument is undefined (null == undefined)
        for (var i = 1; i < arguments.length; i++) {
          this.buffer_ += arguments[i];
        }
      }
      return this;
    };

    /**
     * Clears the internal buffer.
     */
    goog.string.StringBuffer.prototype.clear = function () {
      this.buffer_ = '';
    };

    /**
     * @return {number} the length of the current contents of the buffer.
     */
    goog.string.StringBuffer.prototype.getLength = function () {
      return this.buffer_.length;
    };

    /**
     * @return {string} The concatenated string.
     * @override
     */
    goog.string.StringBuffer.prototype.toString = function () {
      return this.buffer_;
    };

    // Copyright 2012 The Closure Library Authors. All Rights Reserved.
    //
    // Licensed under the Apache License, Version 2.0 (the "License");
    // you may not use this file except in compliance with the License.
    // You may obtain a copy of the License at
    //
    //      http://www.apache.org/licenses/LICENSE-2.0
    //
    // Unless required by applicable law or agreed to in writing, software
    // distributed under the License is distributed on an "AS-IS" BASIS,
    // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    // See the License for the specific language governing permissions and
    // limitations under the License.

    /**
     * @fileoverview Soy data primitives.
     *
     * The goal is to encompass data types used by Soy, especially to mark content
     * as known to be "safe".
     *
     * @author gboyer@google.com (Garrett Boyer)
     */

    goog.soy = {};
    goog.soy.data = {};

    /**
     * A type of textual content.
     *
     * This is an enum of type Object so that these values are unforgeable.
     *
     * @enum {!Object}
     */
    goog.soy.data.SanitizedContentKind = {

      /**
       * A snippet of HTML that does not start or end inside a tag, comment, entity,
       * or DOCTYPE; and that does not contain any executable code
       * (JS, {@code <object>}s, etc.) from a different trust domain.
       */
      HTML: goog.DEBUG ? { sanitizedContentKindHtml: true } : {},

      /**
       * Executable Javascript code or expression, safe for insertion in a
       * script-tag or event handler context, known to be free of any
       * attacker-controlled scripts. This can either be side-effect-free
       * Javascript (such as JSON) or Javascript that's entirely under Google's
       * control.
       */
      JS: goog.DEBUG ? { sanitizedContentJsChars: true } : {},

      /** A properly encoded portion of a URI. */
      URI: goog.DEBUG ? { sanitizedContentUri: true } : {},

      /** A resource URI not under attacker control. */
      TRUSTED_RESOURCE_URI: goog.DEBUG ? { sanitizedContentTrustedResourceUri: true } : {},

      /**
       * Repeated attribute names and values. For example,
       * {@code dir="ltr" foo="bar" onclick="trustedFunction()" checked}.
       */
      ATTRIBUTES: goog.DEBUG ? { sanitizedContentHtmlAttribute: true } : {},

      // TODO: Consider separating rules, declarations, and values into
      // separate types, but for simplicity, we'll treat explicitly blessed
      // SanitizedContent as allowed in all of these contexts.
      /**
       * A CSS3 declaration, property, value or group of semicolon separated
       * declarations.
       */
      CSS: goog.DEBUG ? { sanitizedContentCss: true } : {},

      /**
       * Unsanitized plain-text content.
       *
       * This is effectively the "null" entry of this enum, and is sometimes used
       * to explicitly mark content that should never be used unescaped. Since any
       * string is safe to use as text, being of ContentKind.TEXT makes no
       * guarantees about its safety in any other context such as HTML.
       */
      TEXT: goog.DEBUG ? { sanitizedContentKindText: true } : {}
    };

    /**
     * A string-like object that carries a content-type and a content direction.
     *
     * IMPORTANT! Do not create these directly, nor instantiate the subclasses.
     * Instead, use a trusted, centrally reviewed library as endorsed by your team
     * to generate these objects. Otherwise, you risk accidentally creating
     * SanitizedContent that is attacker-controlled and gets evaluated unescaped in
     * templates.
     *
     * @constructor
     */
    goog.soy.data.SanitizedContent = function () {
      throw Error('Do not instantiate directly');
    };

    /**
     * The context in which this content is safe from XSS attacks.
     * @type {goog.soy.data.SanitizedContentKind}
     */
    goog.soy.data.SanitizedContent.prototype.contentKind;

    /**
     * The content's direction; null if unknown and thus to be estimated when
     * necessary.
     * @type {?goog.i18n.bidi.Dir}
     */
    goog.soy.data.SanitizedContent.prototype.contentDir = null;

    /**
     * The already-safe content.
     * @protected {string}
     */
    goog.soy.data.SanitizedContent.prototype.content;

    /**
     * Gets the already-safe content.
     * @return {string}
     */
    goog.soy.data.SanitizedContent.prototype.getContent = function () {
      return this.content;
    };

    /** @override */
    goog.soy.data.SanitizedContent.prototype.toString = function () {
      return this.content;
    };

    /**
     * An intermediary base class to allow the type system to sepcify text templates
     * without referencing the soydata package.
     * @extends {goog.soy.data.SanitizedContent}
     * @constructor
     */
    goog.soy.data.UnsanitizedText = function () {
      // TODO(gboyer): Delete this class after moving soydata to Closure.
      goog.soy.data.UnsanitizedText.base(this, 'constructor');
    };
    goog.inherits(goog.soy.data.UnsanitizedText, goog.soy.data.SanitizedContent);

    /*
     * Copyright 2008 Google Inc.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *     http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /**
     * @fileoverview
     * Utility functions and classes for Soy.
     *
     * <p>
     * The top portion of this file contains utilities for Soy users:<ul>
     *   <li> soy.StringBuilder: Compatible with the 'stringbuilder' code style.
     * </ul>
     *
     * <p>
     * The bottom portion of this file contains utilities that should only be called
     * by Soy-generated JS code. Please do not use these functions directly from
     * your hand-writen code. Their names all start with '$$'.
     *
     */

    // -----------------------------------------------------------------------------
    // StringBuilder (compatible with the 'stringbuilder' code style).

    (function () {
      var soy = {};
      soy.asserts = {};
      soy.esc = {};
      var soydata = {};

      /**
       * Utility class to facilitate much faster string concatenation in IE,
       * using Array.join() rather than the '+' operator. For other browsers
       * we simply use the '+' operator.
       *
       * @param {Object} var_args Initial items to append,
       *     e.g., new soy.StringBuilder('foo', 'bar').
       * @constructor
       */
      soy.StringBuilder = goog.string.StringBuffer;

      // -----------------------------------------------------------------------------
      // soydata: Defines typed strings, e.g. an HTML string {@code "a<b>c"} is
      // semantically distinct from the plain text string {@code "a<b>c"} and smart
      // templates can take that distinction into account.

      /**
       * A type of textual content.
       *
       * This is an enum of type Object so that these values are unforgeable.
       *
       * @enum {!Object}
       */
      soydata.SanitizedContentKind = goog.soy.data.SanitizedContentKind;

      /**
       * Checks whether a given value is of a given content kind.
       *
       * @param {*} value The value to be examined.
       * @param {soydata.SanitizedContentKind} contentKind The desired content
       *     kind.
       * @return {boolean} Whether the given value is of the given kind.
       * @private
       */
      soydata.isContentKind = function (value, contentKind) {
        // TODO(user): This function should really include the assert on
        // value.constructor that is currently sprinkled at most of the call sites.
        // Unfortunately, that would require a (debug-mode-only) switch statement.
        // TODO(user): Perhaps we should get rid of the contentKind property
        // altogether and only at the constructor.
        return value != null && value.contentKind === contentKind;
      };

      /**
       * Content of type {@link soydata.SanitizedContentKind.URI}.
       *
       * The content is a URI chunk that the caller knows is safe to emit in a
       * template. The content direction is LTR.
       *
       * @constructor
       * @extends {goog.soy.data.SanitizedContent}
       */
      soydata.SanitizedUri = function () {
        goog.soy.data.SanitizedContent.call(this); // Throws an exception.
      };
      goog.inherits(soydata.SanitizedUri, goog.soy.data.SanitizedContent);

      /** @override */
      soydata.SanitizedUri.prototype.contentKind = soydata.SanitizedContentKind.URI;

      /** @override */
      soydata.SanitizedUri.prototype.contentDir = goog.i18n.bidi.Dir.LTR;

      /**
       * Unsanitized plain text string.
       *
       * While all strings are effectively safe to use as a plain text, there are no
       * guarantees about safety in any other context such as HTML. This is
       * sometimes used to mark that should never be used unescaped.
       *
       * @param {*} content Plain text with no guarantees.
       * @param {?goog.i18n.bidi.Dir=} opt_contentDir The content direction; null if
       *     unknown and thus to be estimated when necessary. Default: null.
       * @constructor
       * @extends {goog.soy.data.UnsanitizedText}
       */
      soydata.UnsanitizedText = function (content, opt_contentDir) {
        /** @override */
        this.content = String(content);
        this.contentDir = opt_contentDir != null ? opt_contentDir : null;
      };
      goog.inherits(soydata.UnsanitizedText, goog.soy.data.UnsanitizedText);

      /** @override */
      soydata.UnsanitizedText.prototype.contentKind = soydata.SanitizedContentKind.TEXT;

      /**
       * Empty string, used as a type in Soy templates.
       * @enum {string}
       * @private
       */
      soydata.$$EMPTY_STRING_ = {
        VALUE: ''
      };

      /**
       * Creates a factory for SanitizedContent types.
       *
       * This is a hack so that the soydata.VERY_UNSAFE.ordainSanitized* can
       * instantiate Sanitized* classes, without making the Sanitized* constructors
       * publicly usable. Requiring all construction to use the VERY_UNSAFE names
       * helps callers and their reviewers easily tell that creating SanitizedContent
       * is not always safe and calls for careful review.
       *
       * @param {function(new: T)} ctor A constructor.
       * @return {!function(*, ?goog.i18n.bidi.Dir=): T} A factory that takes
       *     content and an optional content direction and returns a new instance. If
       *     the content direction is undefined, ctor.prototype.contentDir is used.
       * @template T
       * @private
       */
      soydata.$$makeSanitizedContentFactory_ = function (ctor) {
        /**
         * @param {string} content
         * @constructor
         * @extends {goog.soy.data.SanitizedContent}
         */
        function InstantiableCtor(content) {
          /** @override */
          this.content = content;
        }
        InstantiableCtor.prototype = ctor.prototype;
        /**
         * Creates a ctor-type SanitizedContent instance.
         *
         * @param {*} content The content to put in the instance.
         * @param {?goog.i18n.bidi.Dir=} opt_contentDir The content direction. If
         *     undefined, ctor.prototype.contentDir is used.
         * @return {!goog.soy.data.SanitizedContent} The new instance. It is actually
         *     of type T above (ctor's type, a descendant of SanitizedContent), but
         *     there is no way to express that here.
         */
        function sanitizedContentFactory(content, opt_contentDir) {
          var result = new InstantiableCtor(String(content));
          if (opt_contentDir !== undefined) {
            result.contentDir = opt_contentDir;
          }
          return result;
        }
        return sanitizedContentFactory;
      };

      /**
       * Creates a factory for SanitizedContent types that should always have their
       * default directionality.
       *
       * This is a hack so that the soydata.VERY_UNSAFE.ordainSanitized* can
       * instantiate Sanitized* classes, without making the Sanitized* constructors
       * publicly usable. Requiring all construction to use the VERY_UNSAFE names
       * helps callers and their reviewers easily tell that creating SanitizedContent
       * is not always safe and calls for careful review.
       *
       * @param {function(new: T, string)} ctor A constructor.
       * @return {!function(*): T} A factory that takes content and returns a new
       *     instance (with default directionality, i.e. ctor.prototype.contentDir).
       * @template T
       * @private
       */
      soydata.$$makeSanitizedContentFactoryWithDefaultDirOnly_ = function (ctor) {
        /**
         * @param {string} content
         * @constructor
         * @extends {goog.soy.data.SanitizedContent}
         */
        function InstantiableCtor(content) {
          /** @override */
          this.content = content;
        }
        InstantiableCtor.prototype = ctor.prototype;
        /**
         * Creates a ctor-type SanitizedContent instance.
         *
         * @param {*} content The content to put in the instance.
         * @return {!goog.soy.data.SanitizedContent} The new instance. It is actually
         *     of type T above (ctor's type, a descendant of SanitizedContent), but
         *     there is no way to express that here.
         */
        function sanitizedContentFactory(content) {
          var result = new InstantiableCtor(String(content));
          return result;
        }
        return sanitizedContentFactory;
      };

      // -----------------------------------------------------------------------------
      // Sanitized content ordainers. Please use these with extreme caution (with the
      // exception of markUnsanitizedText). A good recommendation is to limit usage
      // of these to just a handful of files in your source tree where usages can be
      // carefully audited.


      /**
       * Protects a string from being used in an noAutoescaped context.
       *
       * This is useful for content where there is significant risk of accidental
       * unescaped usage in a Soy template. A great case is for user-controlled
       * data that has historically been a source of vulernabilities.
       *
       * @param {*} content Text to protect.
       * @param {?goog.i18n.bidi.Dir=} opt_contentDir The content direction; null if
       *     unknown and thus to be estimated when necessary. Default: null.
       * @return {!soydata.UnsanitizedText} A wrapper that is rejected by the
       *     Soy noAutoescape print directive.
       */
      soydata.markUnsanitizedText = function (content, opt_contentDir) {
        return new soydata.UnsanitizedText(content, opt_contentDir);
      };

      soydata.VERY_UNSAFE = {};

      /**
      * Takes a leap of faith that the provided content is "safe" to use as a URI
      * in a Soy template.
      *
      * This creates a Soy SanitizedContent object which indicates to Soy there is
      * no need to escape it when printed as a URI (e.g. in an href or src
      * attribute), such as if it's already been encoded or  if it's a Javascript:
      * URI.
      *
      * @param {*} content A chunk of URI that the caller knows is safe to
      *     emit in a template.
      * @return {!soydata.SanitizedUri} Sanitized content wrapper that indicates to
      *     Soy not to escape or filter when printed in URI context.
      */
      soydata.VERY_UNSAFE.ordainSanitizedUri = soydata.$$makeSanitizedContentFactoryWithDefaultDirOnly_(soydata.SanitizedUri);

      // -----------------------------------------------------------------------------
      // Below are private utilities to be used by Soy-generated code only.

      /**
       * Builds an augmented map. The returned map will contain mappings from both
       * the base map and the additional map. If the same key appears in both, then
       * the value from the additional map will be visible, while the value from the
       * base map will be hidden. The base map will be used, but not modified.
       *
       * @param {!Object} baseMap The original map to augment.
       * @param {!Object} additionalMap A map containing the additional mappings.
       * @return {!Object} An augmented map containing both the original and
       *     additional mappings.
       */
      soy.$$augmentMap = function (baseMap, additionalMap) {

        // Create a new map whose '__proto__' field is set to baseMap.
        /** @constructor */
        function TempCtor() {}
        TempCtor.prototype = baseMap;
        var augmentedMap = new TempCtor();

        // Add the additional mappings to the new map.
        for (var key in additionalMap) {
          augmentedMap[key] = additionalMap[key];
        }

        return augmentedMap;
      };

      /**
       * Checks that the given map key is a string.
       * @param {*} key Key to check.
       * @return {string} The given key.
       */
      soy.$$checkMapKey = function (key) {
        // TODO: Support map literal with nonstring key.
        if (typeof key != 'string') {
          throw Error('Map literal\'s key expression must evaluate to string' + ' (encountered type "' + (typeof key === 'undefined' ? 'undefined' : babelHelpers.typeof(key)) + '").');
        }
        return key;
      };

      /**
       * Gets the keys in a map as an array. There are no guarantees on the order.
       * @param {Object} map The map to get the keys of.
       * @return {!Array<string>} The array of keys in the given map.
       */
      soy.$$getMapKeys = function (map) {
        var mapKeys = [];
        for (var key in map) {
          mapKeys.push(key);
        }
        return mapKeys;
      };

      /**
       * Returns the argument if it is not null.
       *
       * @param {T} val The value to check
       * @return {T} val if is isn't null
       * @template T
       */
      soy.$$checkNotNull = function (val) {
        if (val == null) {
          throw Error('unexpected null value');
        }
        return val;
      };

      /**
       * Gets a consistent unique id for the given delegate template name. Two calls
       * to this function will return the same id if and only if the input names are
       * the same.
       *
       * <p> Important: This function must always be called with a string constant.
       *
       * <p> If Closure Compiler is not being used, then this is just this identity
       * function. If Closure Compiler is being used, then each call to this function
       * will be replaced with a short string constant, which will be consistent per
       * input name.
       *
       * @param {string} delTemplateName The delegate template name for which to get a
       *     consistent unique id.
       * @return {string} A unique id that is consistent per input name.
       *
       * @consistentIdGenerator
       */
      soy.$$getDelTemplateId = function (delTemplateName) {
        return delTemplateName;
      };

      /**
       * Map from registered delegate template key to the priority of the
       * implementation.
       * @type {Object}
       * @private
       */
      soy.$$DELEGATE_REGISTRY_PRIORITIES_ = {};

      /**
       * Map from registered delegate template key to the implementation function.
       * @type {Object}
       * @private
       */
      soy.$$DELEGATE_REGISTRY_FUNCTIONS_ = {};

      /**
       * Registers a delegate implementation. If the same delegate template key (id
       * and variant) has been registered previously, then priority values are
       * compared and only the higher priority implementation is stored (if
       * priorities are equal, an error is thrown).
       *
       * @param {string} delTemplateId The delegate template id.
       * @param {string} delTemplateVariant The delegate template variant (can be
       *     empty string).
       * @param {number} delPriority The implementation's priority value.
       * @param {Function} delFn The implementation function.
       */
      soy.$$registerDelegateFn = function (delTemplateId, delTemplateVariant, delPriority, delFn) {

        var mapKey = 'key_' + delTemplateId + ':' + delTemplateVariant;
        var currPriority = soy.$$DELEGATE_REGISTRY_PRIORITIES_[mapKey];
        if (currPriority === undefined || delPriority > currPriority) {
          // Registering new or higher-priority function: replace registry entry.
          soy.$$DELEGATE_REGISTRY_PRIORITIES_[mapKey] = delPriority;
          soy.$$DELEGATE_REGISTRY_FUNCTIONS_[mapKey] = delFn;
        } else if (delPriority == currPriority) {
          // Registering same-priority function: error.
          throw Error('Encountered two active delegates with the same priority ("' + delTemplateId + ':' + delTemplateVariant + '").');
        } else {
          // Registering lower-priority function: do nothing.
        }
      };

      /**
       * Retrieves the (highest-priority) implementation that has been registered for
       * a given delegate template key (id and variant). If no implementation has
       * been registered for the key, then the fallback is the same id with empty
       * variant. If the fallback is also not registered, and allowsEmptyDefault is
       * true, then returns an implementation that is equivalent to an empty template
       * (i.e. rendered output would be empty string).
       *
       * @param {string} delTemplateId The delegate template id.
       * @param {string} delTemplateVariant The delegate template variant (can be
       *     empty string).
       * @param {boolean} allowsEmptyDefault Whether to default to the empty template
       *     function if there's no active implementation.
       * @return {Function} The retrieved implementation function.
       */
      soy.$$getDelegateFn = function (delTemplateId, delTemplateVariant, allowsEmptyDefault) {

        var delFn = soy.$$DELEGATE_REGISTRY_FUNCTIONS_['key_' + delTemplateId + ':' + delTemplateVariant];
        if (!delFn && delTemplateVariant != '') {
          // Fallback to empty variant.
          delFn = soy.$$DELEGATE_REGISTRY_FUNCTIONS_['key_' + delTemplateId + ':'];
        }

        if (delFn) {
          return delFn;
        } else if (allowsEmptyDefault) {
          return soy.$$EMPTY_TEMPLATE_FN_;
        } else {
          throw Error('Found no active impl for delegate call to "' + delTemplateId + ':' + delTemplateVariant + '" (and not allowemptydefault="true").');
        }
      };

      /**
       * Private helper soy.$$getDelegateFn(). This is the empty template function
       * that is returned whenever there's no delegate implementation found.
       *
       * @param {Object<string, *>=} opt_data
       * @param {soy.StringBuilder=} opt_sb
       * @param {Object<string, *>=} opt_ijData
       * @return {string}
       * @private
       */
      soy.$$EMPTY_TEMPLATE_FN_ = function (opt_data, opt_sb, opt_ijData) {
        return '';
      };

      // -----------------------------------------------------------------------------
      // Basic directives/functions.


      /**
       * Truncates a string to a given max length (if it's currently longer),
       * optionally adding ellipsis at the end.
       *
       * @param {*} str The string to truncate. Can be other types, but the value will
       *     be coerced to a string.
       * @param {number} maxLen The maximum length of the string after truncation
       *     (including ellipsis, if applicable).
       * @param {boolean} doAddEllipsis Whether to add ellipsis if the string needs
       *     truncation.
       * @return {string} The string after truncation.
       */
      soy.$$truncate = function (str, maxLen, doAddEllipsis) {

        str = String(str);
        if (str.length <= maxLen) {
          return str; // no need to truncate
        }

        // If doAddEllipsis, either reduce maxLen to compensate, or else if maxLen is
        // too small, just turn off doAddEllipsis.
        if (doAddEllipsis) {
          if (maxLen > 3) {
            maxLen -= 3;
          } else {
            doAddEllipsis = false;
          }
        }

        // Make sure truncating at maxLen doesn't cut up a unicode surrogate pair.
        if (soy.$$isHighSurrogate_(str.charAt(maxLen - 1)) && soy.$$isLowSurrogate_(str.charAt(maxLen))) {
          maxLen -= 1;
        }

        // Truncate.
        str = str.substring(0, maxLen);

        // Add ellipsis.
        if (doAddEllipsis) {
          str += '...';
        }

        return str;
      };

      /**
       * Private helper for $$truncate() to check whether a char is a high surrogate.
       * @param {string} ch The char to check.
       * @return {boolean} Whether the given char is a unicode high surrogate.
       * @private
       */
      soy.$$isHighSurrogate_ = function (ch) {
        return 0xD800 <= ch && ch <= 0xDBFF;
      };

      /**
       * Private helper for $$truncate() to check whether a char is a low surrogate.
       * @param {string} ch The char to check.
       * @return {boolean} Whether the given char is a unicode low surrogate.
       * @private
       */
      soy.$$isLowSurrogate_ = function (ch) {
        return 0xDC00 <= ch && ch <= 0xDFFF;
      };

      // -----------------------------------------------------------------------------
      // Assertion methods used by runtime.

      /**
       * Checks if the type assertion is true if goog.asserts.ENABLE_ASSERTS is
       * true. Report errors on runtime types if goog.DEBUG is true.
       * @template T
       * @param {T} typeCheck An condition for type checks.
       * @param {string} paramName The Soy name of the parameter.
       * @param {?Object} param The resolved JS object for the parameter.
       * @param {!string} jsDocTypeStr JSDoc type str to cast the value to if the
       *     type test succeeds
       * @param {...*} var_args The items to substitute into the failure message.
       * @return {T} The value of the condition.
       * @throws {goog.asserts.AssertionError} When the condition evaluates to false.
       */
      soy.asserts.assertType = function (typeCheck, paramName, param, jsDocTypeStr, var_args) {
        var msg = 'expected param ' + paramName + ' of type ' + jsDocTypeStr + (goog.DEBUG ? ', but got ' + goog.debug.runtimeType(param) : '') + '.';
        return goog.asserts.assert(typeCheck, msg, var_args);
      };

      // -----------------------------------------------------------------------------
      // Generated code.


      // START GENERATED CODE FOR ESCAPERS.

      /**
       * @type {function (*) : string}
       */
      soy.esc.$$escapeHtmlHelper = function (v) {
        return goog.string.htmlEscape(String(v));
      };

      /**
       * Allows only data-protocol image URI's.
       *
       * @param {*} value The value to process. May not be a string, but the value
       *     will be coerced to a string.
       * @return {!soydata.SanitizedUri} An escaped version of value.
       */
      soy.$$filterImageDataUri = function (value) {
        // NOTE: Even if it's a SanitizedUri, we will still filter it.
        return soydata.VERY_UNSAFE.ordainSanitizedUri(soy.esc.$$filterImageDataUriHelper(value));
      };

      /**
       * A pattern that vets values produced by the named directives.
       * @private {!RegExp}
       */
      soy.esc.$$FILTER_FOR_FILTER_IMAGE_DATA_URI_ = /^data:image\/(?:bmp|gif|jpe?g|png|tiff|webp);base64,[a-z0-9+\/]+=*$/i;

      /**
       * A helper for the Soy directive |filterImageDataUri
       * @param {*} value Can be of any type but will be coerced to a string.
       * @return {string} The escaped text.
       */
      soy.esc.$$filterImageDataUriHelper = function (value) {
        var str = String(value);
        if (!soy.esc.$$FILTER_FOR_FILTER_IMAGE_DATA_URI_.test(str)) {
          goog.asserts.fail('Bad value `%s` for |filterImageDataUri', [str]);
          return 'data:image/gif;base64,zSoyz';
        }
        return str;
      };

      // END GENERATED CODE

      goog.loadModule(function () {
        goog.module('soy');
        return soy;
      });

      goog.loadModule(function () {
        goog.module('soydata');
        return soydata;
      });

      goog.loadModule(function () {
        goog.module('soy.asserts');
        return soy;
      });
    })();

    /* jshint ignore:end */

    goog.loadModule(function () {
      goog.module('incrementaldom');
      return IncrementalDOM;
    });
  }).call(window);
}).call(this);
"use strict";

(function () {
	/* jshint ignore:start */

	/*
  * HTML5 Parser By Sam Blowes
  *
  * Designed for HTML5 documents
  *
  * Original code by John Resig (ejohn.org)
  * http://ejohn.org/blog/pure-javascript-html-parser/
  * Original code by Erik Arvidsson, Mozilla Public License
  * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
  *
  * ----------------------------------------------------------------------------
  * License
  * ----------------------------------------------------------------------------
  *
  * This code is triple licensed using Apache Software License 2.0,
  * Mozilla Public License or GNU Public License
  *
  * ////////////////////////////////////////////////////////////////////////////
  *
  * Licensed under the Apache License, Version 2.0 (the "License"); you may not
  * use this file except in compliance with the License.  You may obtain a copy
  * of the License at http://www.apache.org/licenses/LICENSE-2.0
  *
  * ////////////////////////////////////////////////////////////////////////////
  *
  * The contents of this file are subject to the Mozilla Public License
  * Version 1.1 (the "License"); you may not use this file except in
  * compliance with the License. You may obtain a copy of the License at
  * http://www.mozilla.org/MPL/
  *
  * Software distributed under the License is distributed on an "AS IS"
  * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
  * License for the specific language governing rights and limitations
  * under the License.
  *
  * The Original Code is Simple HTML Parser.
  *
  * The Initial Developer of the Original Code is Erik Arvidsson.
  * Portions created by Erik Arvidssson are Copyright (C) 2004. All Rights
  * Reserved.
  *
  * ////////////////////////////////////////////////////////////////////////////
  *
  * This program is free software; you can redistribute it and/or
  * modify it under the terms of the GNU General Public License
  * as published by the Free Software Foundation; either version 2
  * of the License, or (at your option) any later version.
  *
  * This program is distributed in the hope that it will be useful,
  * but WITHOUT ANY WARRANTY; without even the implied warranty of
  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  * GNU General Public License for more details.
  *
  * You should have received a copy of the GNU General Public License
  * along with this program; if not, write to the Free Software
  * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
  * @license
  */

	/*
  *
  * ----------------------------------------------------------------------------
  * Usage
  * ----------------------------------------------------------------------------
  *
  * // Use like so:
  * HTMLParser(htmlString, {
  *     start: function(tag, attrs, unary) {},
  *     end: function(tag) {},
  *     chars: function(text) {},
  *     comment: function(text) {}
  * });
  *
  * // or to get an XML string:
  * HTMLtoXML(htmlString);
  *
  * // or to get an XML DOM Document
  * HTMLtoDOM(htmlString);
  *
  * // or to inject into an existing document/DOM node
  * HTMLtoDOM(htmlString, document);
  * HTMLtoDOM(htmlString, document.body);
  *
  */

	(function () {
		// Regular Expressions for parsing tags and attributes
		var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
		    endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/,
		    attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

		// Empty Elements - HTML 5
		var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");

		// Block Elements - HTML 5
		var block = makeMap("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");

		// Inline Elements - HTML 5
		var inline = makeMap("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");

		// Elements that you can, intentionally, leave open
		// (and which close themselves)
		var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

		// Attributes that have their values filled in disabled="disabled"
		var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");

		// Special Elements (can contain anything)
		var special = makeMap("script,style");

		var HTMLParser = window.HTMLParser = function (html, handler) {
			var index,
			    chars,
			    match,
			    stack = [],
			    last = html;
			stack.last = function () {
				return this[this.length - 1];
			};

			while (html) {
				chars = true;

				// Make sure we're not in a script or style element
				if (!stack.last() || !special[stack.last()]) {

					// Comment
					if (html.indexOf("<!--") == 0) {
						index = html.indexOf("-->");

						if (index >= 0) {
							if (handler.comment) handler.comment(html.substring(4, index));
							html = html.substring(index + 3);
							chars = false;
						}

						// end tag
					} else if (html.indexOf("</") == 0) {
						match = html.match(endTag);

						if (match) {
							html = html.substring(match[0].length);
							match[0].replace(endTag, parseEndTag);
							chars = false;
						}

						// start tag
					} else if (html.indexOf("<") == 0) {
						match = html.match(startTag);

						if (match) {
							html = html.substring(match[0].length);
							match[0].replace(startTag, parseStartTag);
							chars = false;
						}
					}

					if (chars) {
						index = html.indexOf("<");

						var text = index < 0 ? html : html.substring(0, index);
						html = index < 0 ? "" : html.substring(index);

						if (handler.chars) handler.chars(text);
					}
				} else {
					html = html.replace(new RegExp("([\\s\\S]*?)<\/" + stack.last() + "[^>]*>"), function (all, text) {
						text = text.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2");
						if (handler.chars) handler.chars(text);

						return "";
					});

					parseEndTag("", stack.last());
				}

				if (html == last) throw "Parse Error: " + html;
				last = html;
			}

			// Clean up any remaining tags
			parseEndTag();

			function parseStartTag(tag, tagName, rest, unary) {
				tagName = tagName.toLowerCase();

				if (block[tagName]) {
					while (stack.last() && inline[stack.last()]) {
						parseEndTag("", stack.last());
					}
				}

				if (closeSelf[tagName] && stack.last() == tagName) {
					parseEndTag("", tagName);
				}

				unary = empty[tagName] || !!unary;

				if (!unary) stack.push(tagName);

				if (handler.start) {
					var attrs = [];

					rest.replace(attr, function (match, name) {
						var value = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : fillAttrs[name] ? name : "";

						attrs.push({
							name: name,
							value: value,
							escaped: value.replace(/(^|[^\\])"/g, '$1\\\"') //"
						});
					});

					if (handler.start) handler.start(tagName, attrs, unary);
				}
			}

			function parseEndTag(tag, tagName) {
				// If no tag name is provided, clean shop
				if (!tagName) var pos = 0;

				// Find the closest opened tag of the same type
				else for (var pos = stack.length - 1; pos >= 0; pos--) {
						if (stack[pos] == tagName) break;
					}if (pos >= 0) {
					// Close all the open elements, up the stack
					for (var i = stack.length - 1; i >= pos; i--) {
						if (handler.end) handler.end(stack[i]);
					} // Remove the open elements from the stack
					stack.length = pos;
				}
			}
		};

		function makeMap(str) {
			var obj = {},
			    items = str.split(",");
			for (var i = 0; i < items.length; i++) {
				obj[items[i]] = true;
			}return obj;
		}
	}).call(this);

	/* jshint ignore:end */
}).call(this);
'use strict';

// Copyright 2006 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Unescapes an HTML string using a DOM to resolve non-XML, non-numeric
 * entities. This function is XSS-safe and whitespace-preserving.
 * @private
 * @param {string} str The string to unescape.
 * @return {string} The unescaped {@code str} string.
 */

(function () {
  function unescape(str) {
    /** @type {!Object<string, string>} */
    var seen = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"' };
    var div = document.createElement('div');

    // Match as many valid entity characters as possible. If the actual entity
    // happens to be shorter, it will still work as innerHTML will return the
    // trailing characters unchanged. Since the entity characters do not include
    // open angle bracket, there is no chance of XSS from the innerHTML use.
    // Since no whitespace is passed to innerHTML, whitespace is preserved.
    return str.replace(HTML_ENTITY_PATTERN_, function (s, entity) {
      // Check for cached entity.
      var value = seen[s];
      if (value) {
        return value;
      }
      // Check for numeric entity.
      if (entity.charAt(0) === '#') {
        // Prefix with 0 so that hex entities (e.g. &#x10) parse as hex numbers.
        var n = Number('0' + entity.substr(1));
        if (!isNaN(n)) {
          value = String.fromCharCode(n);
        }
      }
      // Fall back to innerHTML otherwise.
      if (!value) {
        // Append a non-entity character to avoid a bug in Webkit that parses
        // an invalid entity at the end of innerHTML text as the empty string.
        div.innerHTML = s + ' ';
        // Then remove the trailing character from the result.
        value = div.firstChild.nodeValue.slice(0, -1);
      }
      // Cache and return.
      seen[s] = value;
      return value;
    });
  }

  this.Library.unescape = unescape;

  /**
   * Regular expression that matches an HTML entity.
   * @type {!RegExp}
   */

  var HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
}).call(this);
'use strict';

(function () {
	var unescape = this.Library.unescape;


	var parser_;

	var HTML2IncDom = function () {
		function HTML2IncDom() {
			babelHelpers.classCallCheck(this, HTML2IncDom);
		}

		/**
   * Should convert the given html string to a function with calls to
   * incremental dom methods.
   * @param {string} html
   * @return {!function()} Function with incremental dom calls for building
   *     the given html string.
   */
		HTML2IncDom.buildFn = function buildFn(html) {
			return function () {
				return HTML2IncDom.run(html);
			};
		};

		/**
   * Gets the html parser being currently used.
   * @return {!function()}
   */


		HTML2IncDom.getParser = function getParser() {
			return parser_ || window.HTMLParser;
		};

		/**
   * Should convert the given html string to calls to incremental dom methods.
   * @param {string} html
   */


		HTML2IncDom.run = function run(html) {
			HTML2IncDom.getParser()(html, {
				start: function start(tag, attrs, unary) {
					var fn = unary ? IncrementalDOM.elementVoid : IncrementalDOM.elementOpen;
					var args = [tag, null, []];
					for (var i = 0; i < attrs.length; i++) {
						args.push(attrs[i].name, attrs[i].value);
					}
					fn.apply(null, args);
				},

				end: function end(tag) {
					IncrementalDOM.elementClose(tag);
				},

				chars: function chars(text) {
					IncrementalDOM.text(text, unescape);
				}
			});
		};

		/**
   * Changes the function that will be used to parse html strings. By default
   * this will use the `HTMLParser` function from
   * https://github.com/blowsie/Pure-JavaScript-HTML5-Parser. This will accept
   * any function that follows that same api, basically accepting the html
   * string and an object with `start`, `end` and `chars` functions to be called
   * during the parsing.
   * @param {!function(string, !Object} newParser
   */


		HTML2IncDom.setParser = function setParser(newParser) {
			parser_ = newParser;
		};

		return HTML2IncDom;
	}();

	this.Library.HTML2IncDom = HTML2IncDom;
}).call(this);
'use strict';

(function () {
  var HTML2IncDom = this.Library.HTML2IncDom;
  this.Library.withParser = HTML2IncDom;
}).call(this);
'use strict';

(function () {
	var SoyAop = {
		/**
   * The functions that should be called instead of a template call. The last
   * function in the array is the one that is intercepting at the moment. If the
   * array is empty, the original function will be called instead.
   * @type {!Array<function()>}
   * @protected
   */
		interceptFns_: [],

		/**
   * Gets the original function of the given template function. If no original exists,
   * returns the given function itself.
   * @param {!function()} fn
   * @return {!function()}
   */
		getOriginalFn: function getOriginalFn(fn) {
			return fn.originalFn ? fn.originalFn : fn;
		},

		/**
   * Handles a template call, calling the current interception function if one
   * is set, or otherwise just calling the original function instead.
   * @param {!function()} originalFn The original template function that was
   *     intercepted.
   * @param {Object} opt_data Template data object.
   * @param {*} opt_ignored
   * @param {Object} opt_ijData Template injected data object.
   * @return {*} The return value of the function that is called to handle this
   *     interception.
   */
		handleTemplateCall_: function handleTemplateCall_(originalFn, opt_data, opt_ignored, opt_ijData) {
			var interceptFn = SoyAop.interceptFns_[SoyAop.interceptFns_.length - 1];
			if (interceptFn) {
				return interceptFn.call(null, originalFn, opt_data, opt_ignored, opt_ijData);
			} else {
				return originalFn.call(null, opt_data, opt_ignored, opt_ijData);
			}
		},

		/**
   * Registers a template function that should be intercepted.
   * @param {!Object} templates The original templates object containing the
   *     function to be intercepted.
   * @param {string} name The name of the template function to intercept.
   */
		registerForInterception: function registerForInterception(templates, name) {
			var originalFn = templates[name];
			if (!originalFn.originalFn) {
				templates[name] = SoyAop.handleTemplateCall_.bind(null, originalFn);
				templates[name].originalFn = originalFn;
			}
		},

		/**
   * Starts intercepting all template calls, replacing them with a call to the
   * given function instead.
   * @param {!function()} fn
   */
		startInterception: function startInterception(fn) {
			SoyAop.interceptFns_.push(fn);
		},

		/**
   * Stops intercepting template calls.
   */
		stopAllInterceptions: function stopAllInterceptions() {
			SoyAop.interceptFns_ = [];
		},

		/**
   * Stops intercepting template calls with the last registered function.
   */
		stopInterception: function stopInterception() {
			SoyAop.interceptFns_.pop();
		}
	};

	this.Library.SoyAop = SoyAop;
}).call(this);
'use strict';

(function () {
	var core = this.LibraryNamed.metal.core;
	var object = this.LibraryNamed.metal.object;
	var ComponentRegistry = this.LibraryNamed.component.ComponentRegistry;
	var HTML2IncDom = this.Library.withParser;
	var IncrementalDomRenderer = this.Library.IncrementalDomRenderer;
	var SoyAop = this.Library.SoyAop;

	// The injected data that will be passed to soy templates.

	var ijData = {};

	var Soy = function (_IncrementalDomRender) {
		babelHelpers.inherits(Soy, _IncrementalDomRender);

		/**
   * @inheritDoc
   */
		function Soy(comp) {
			babelHelpers.classCallCheck(this, Soy);

			var _this = babelHelpers.possibleConstructorReturn(this, _IncrementalDomRender.call(this, comp));

			_this.addMissingStateKeys_();
			return _this;
		}
		/**
   * Adds the template params to the component's state, if they don't exist yet.
   * @protected
   */


		Soy.prototype.addMissingStateKeys_ = function addMissingStateKeys_() {
			var elementTemplate = this.component_.constructor.TEMPLATE;
			if (!core.isFunction(elementTemplate)) {
				return;
			}

			elementTemplate = SoyAop.getOriginalFn(elementTemplate);
			this.soyParamTypes_ = elementTemplate.types || {};

			var keys = elementTemplate.params || [];
			var component = this.component_;
			for (var i = 0; i < keys.length; i++) {
				if (!component.getStateKeyConfig(keys[i]) && !component[keys[i]]) {
					component.addToState(keys[i], {}, component.getInitialConfig()[keys[i]]);
				}
			}
		};

		/**
   * Copies the component's state to an object so it can be passed as it's
   * template call's data. The copying needs to be done because, if the component
   * itself is passed directly, some problems occur when soy tries to merge it
   * with other data, due to property getters and setters. This is safer.
   * @param {!Array<string>} params The params used by this template.
   * @return {!Object}
   * @protected
   */


		Soy.prototype.buildTemplateData_ = function buildTemplateData_(params) {
			var _this2 = this;

			var component = this.component_;
			var data = object.mixin({}, component.config);
			component.getStateKeys().forEach(function (key) {
				// Get all state values except "element", since it helps performance
				// and the element shouldn't be referenced inside a soy template anyway.
				if (key === 'element') {
					return;
				}

				var value = component[key];
				if (_this2.isHtmlParam_(key)) {
					value = Soy.toIncDom(value);
				}
				data[key] = value;
			});
			for (var i = 0; i < params.length; i++) {
				if (!data[params[i]] && core.isFunction(component[params[i]])) {
					data[params[i]] = component[params[i]].bind(component);
				}
			}
			return data;
		};

		/**
   * Returns the requested template function. This function will be wrapped in
   * another though, just to defer the requirement of the template's module
   * being ready until the function is actually called.
   * @param {string} namespace The soy template's namespace.
   * @param {string} templateName The name of the template function.
   * @return {!function()}
   */


		Soy.getTemplate = function getTemplate(namespace, templateName) {
			return function (opt_data, opt_ignored, opt_ijData) {
				if (!goog.loadedModules_[namespace]) {
					throw new Error('No template with namespace "' + namespace + '" has been loaded yet.');
				}
				return goog.loadedModules_[namespace][templateName](opt_data, opt_ignored, opt_ijData);
			};
		};

		/**
   * Handles an intercepted soy template call. If the call is for a component's
   * main template, then it will be replaced with a call that incremental dom
   * can use for both handling an instance of that component and rendering it.
   * @param {!function()} originalFn The original template function that was
   *     intercepted.
   * @param {Object} data The data the template was called with.
   * @protected
   */


		Soy.handleInterceptedCall_ = function handleInterceptedCall_(originalFn) {
			var opt_data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

			var args = [originalFn.componentCtor, null, []];
			for (var key in opt_data) {
				args.push(key, opt_data[key]);
			}
			IncrementalDOM.elementVoid.apply(null, args);
		};

		/**
   * Checks if the given param type is html.
   * @param {string} name
   * @protected
   */


		Soy.prototype.isHtmlParam_ = function isHtmlParam_(name) {
			if (this.component_.getStateKeyConfig(name).isHtml) {
				return true;
			}
			var type = this.soyParamTypes_[name] || '';
			return type.split('|').indexOf('html') !== -1;
		};

		/**
   * Registers the given templates to be used by `Soy` for the specified
   * component constructor.
   * @param {!Function} componentCtor The constructor of the component that
   *     should use the given templates.
   * @param {!Object} templates Object containing soy template functions.
   * @param {string=} mainTemplate The name of the main template that should be
   *     used to render the component. Defaults to "render".
   */


		Soy.register = function register(componentCtor, templates) {
			var mainTemplate = arguments.length <= 2 || arguments[2] === undefined ? 'render' : arguments[2];

			componentCtor.RENDERER = Soy;
			componentCtor.TEMPLATE = SoyAop.getOriginalFn(templates[mainTemplate]);
			componentCtor.TEMPLATE.componentCtor = componentCtor;
			SoyAop.registerForInterception(templates, mainTemplate);
			ComponentRegistry.register(componentCtor);
		};

		/**
   * Overrides the default method from `IncrementalDomRenderer` so the component's
   * soy template can be used for rendering.
   * @param {!Object} data Data passed to the component when rendering it.
   * @override
   */


		Soy.prototype.renderIncDom = function renderIncDom() {
			var elementTemplate = this.component_.constructor.TEMPLATE;
			if (core.isFunction(elementTemplate) && !this.component_.render) {
				elementTemplate = SoyAop.getOriginalFn(elementTemplate);
				SoyAop.startInterception(Soy.handleInterceptedCall_);
				elementTemplate(this.buildTemplateData_(elementTemplate.params || []), null, ijData);
				SoyAop.stopInterception();
			} else {
				_IncrementalDomRender.prototype.renderIncDom.call(this);
			}
		};

		/**
   * Sets the injected data object that should be passed to templates.
   * @param {Object} data
   */


		Soy.setInjectedData = function setInjectedData(data) {
			ijData = data || {};
		};

		/**
   * Overrides the original `IncrementalDomRenderer` method so that only
   * state keys used by the main template can cause updates.
   * @param {!Object} changes
   * @return {boolean}
   */


		Soy.prototype.shouldUpdate = function shouldUpdate(changes) {
			var should = _IncrementalDomRender.prototype.shouldUpdate.call(this, changes);
			if (!should || this.component_.shouldUpdate) {
				return should;
			}

			var fn = this.component_.constructor.TEMPLATE;
			var params = fn ? SoyAop.getOriginalFn(fn).params : [];
			for (var i = 0; i < params.length; i++) {
				if (changes[params[i]]) {
					return true;
				}
			}
			return false;
		};

		/**
   * Converts the given incremental dom function into an html string.
   * @param {!function()} incDomFn
   * @return {string}
   */


		Soy.toHtmlString = function toHtmlString(incDomFn) {
			var element = document.createElement('div');
			IncrementalDOM.patch(element, incDomFn);
			return element.innerHTML;
		};

		/**
   * Converts the given html string into an incremental dom function.
   * @param {string|{contentKind: string, content: string}} value
   * @return {!function()}
   */


		Soy.toIncDom = function toIncDom(value) {
			if (core.isObject(value) && core.isString(value.content) && value.contentKind === 'HTML') {
				value = value.content;
			}
			if (core.isString(value)) {
				value = HTML2IncDom.buildFn(value);
			}
			return value;
		};

		return Soy;
	}(IncrementalDomRenderer);

	this.Library.Soy = Soy;
	this.LibraryNamed.Soy = this.LibraryNamed.Soy || {};
	this.LibraryNamed.Soy.Soy = Soy;
	this.LibraryNamed.Soy.SoyAop = SoyAop;
}).call(this);
'use strict';

(function () {
  /* jshint ignore:start */
  var Component = this.Library.component;
  var Soy = this.Library.Soy;

  var templates;
  goog.loadModule(function (exports) {

    // This file was automatically generated from LoginForm.soy.
    // Please don't edit this file by hand.

    /**
     * @fileoverview Templates in namespace LoginForm.
     * @public
     */

    goog.module('LoginForm.incrementaldom');

    /** @suppress {extraRequire} */
    var soy = goog.require('soy');
    /** @suppress {extraRequire} */
    var soydata = goog.require('soydata');
    /** @suppress {extraRequire} */
    goog.require('goog.i18n.bidi');
    /** @suppress {extraRequire} */
    goog.require('goog.asserts');
    var IncrementalDom = goog.require('incrementaldom');
    var ie_open = IncrementalDom.elementOpen;
    var ie_close = IncrementalDom.elementClose;
    var ie_void = IncrementalDom.elementVoid;
    var ie_open_start = IncrementalDom.elementOpenStart;
    var ie_open_end = IncrementalDom.elementOpenEnd;
    var itext = IncrementalDom.text;
    var iattr = IncrementalDom.attr;

    var $templateAlias1 = Soy.getTemplate('Page.incrementaldom', 'render');

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $render(opt_data, opt_ignored, opt_ijData) {
      ie_open('div', null, null, 'class', 'loginform');
      ie_open('div', null, null, 'class', 'form-group social');
      ie_open('button', null, null, 'class', 'btn btn-social btn-google', 'type', 'button', 'data-onclick', 'loginWithGoogle');
      ie_open('span', null, null, 'class', 'brand');
      ie_void('span', null, null, 'class', 'icon icon-google');
      ie_close('span');
      ie_open('span', null, null, 'class', 'btn-label');
      itext('Login with Google');
      ie_close('span');
      ie_close('button');
      ie_close('div');
      ie_close('div');
    }
    exports.render = $render;
    if (goog.DEBUG) {
      $render.soyTemplateName = 'LoginForm.render';
    }

    /**
     * @param {Object<string, *>=} opt_data
     * @param {(null|undefined)=} opt_ignored
     * @param {Object<string, *>=} opt_ijData
     * @return {void}
     * @suppress {checkTypes}
     */
    function $layout(opt_data, opt_ignored, opt_ijData) {
      var param5 = function param5() {
        $render(opt_data, null, opt_ijData);
      };
      $templateAlias1(soy.$$augmentMap(opt_data, { content: param5 }), null, opt_ijData);
    }
    exports.layout = $layout;
    if (goog.DEBUG) {
      $layout.soyTemplateName = 'LoginForm.layout';
    }

    exports.render.params = [];
    exports.render.types = {};
    exports.layout.params = ["element"];
    exports.layout.types = { "element": "any" };
    templates = exports;
    return exports;
  });

  var LoginForm = function (_Component) {
    babelHelpers.inherits(LoginForm, _Component);

    function LoginForm() {
      babelHelpers.classCallCheck(this, LoginForm);
      return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    return LoginForm;
  }(Component);

  Soy.register(LoginForm, templates);
  this.LibraryNamed.LoginForm = this.LibraryNamed.LoginForm || {};
  this.LibraryNamed.LoginForm.LoginForm = LoginForm;
  this.LibraryNamed.LoginForm.templates = templates;
  this.Library.LoginForm = templates;
  /* jshint ignore:end */
}).call(this);
'use strict';

(function () {
	var Component = this.Library.component;
	var Soy = this.Library.Soy;
	var templates = this.Library.LoginForm;

	var LoginForm = function (_Component) {
		babelHelpers.inherits(LoginForm, _Component);

		function LoginForm() {
			babelHelpers.classCallCheck(this, LoginForm);
			return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
		}

		LoginForm.prototype.loginWithGoogle = function loginWithGoogle() {
			window.loginWithGoogle();
		};

		return LoginForm;
	}(Component);

	Soy.register(LoginForm, templates);

	this.Library.LoginForm = LoginForm;
}).call(this);
'use strict';

(function () {
    /* jshint ignore:start */
    var Component = this.Library.component;
    var Soy = this.Library.Soy;

    var templates;
    goog.loadModule(function (exports) {

        // This file was automatically generated from Page.soy.
        // Please don't edit this file by hand.

        /**
         * @fileoverview Templates in namespace Page.
         * @public
         */

        goog.module('Page.incrementaldom');

        /** @suppress {extraRequire} */
        var soy = goog.require('soy');
        /** @suppress {extraRequire} */
        var soydata = goog.require('soydata');
        /** @suppress {extraRequire} */
        goog.require('goog.i18n.bidi');
        /** @suppress {extraRequire} */
        goog.require('goog.asserts');
        var IncrementalDom = goog.require('incrementaldom');
        var ie_open = IncrementalDom.elementOpen;
        var ie_close = IncrementalDom.elementClose;
        var ie_void = IncrementalDom.elementVoid;
        var ie_open_start = IncrementalDom.elementOpenStart;
        var ie_open_end = IncrementalDom.elementOpenEnd;
        var itext = IncrementalDom.text;
        var iattr = IncrementalDom.attr;

        /**
         * @param {Object<string, *>=} opt_data
         * @param {(null|undefined)=} opt_ignored
         * @param {Object<string, *>=} opt_ijData
         * @return {void}
         * @suppress {checkTypes}
         */
        function $render(opt_data, opt_ignored, opt_ijData) {
            ie_open('!DOCTYPE', null, null, 'html', '');
            ie_open('html', null, null, 'lang', 'en');
            ie_open('head');
            ie_open('meta', null, null, 'charset', 'utf-8');
            ie_close('meta');
            ie_open('title');
            itext('Library');
            ie_close('title');
            ie_open('meta', null, null, 'name', 'viewport', 'content', 'width=device-width, initial-scale=1');
            ie_close('meta');
            ie_open('link', null, null, 'rel', 'shortcut icon', 'href', '/favicon.ico');
            ie_close('link');
            ie_open('!--', null, null, 'Fonts', '', '--', '');
            ie_open('link', null, null, 'rel', 'stylesheet', 'href', 'http://fonts.googleapis.com/css?family=Open+Sans:700,600,400,300|Roboto+Mono');
            ie_close('link');
            ie_open('link', null, null, 'rel', 'stylesheet', 'href', '/build/vendor/westyle/build/fonts/galano/font-galano.css');
            ie_close('link');
            ie_open('link', null, null, 'rel', 'stylesheet', 'href', '/build/vendor/westyle/build/fonts/icon-12.css');
            ie_close('link');
            ie_open('link', null, null, 'rel', 'stylesheet', 'href', '/build/vendor/westyle/build/fonts/icon-16.css');
            ie_close('link');
            ie_open('!--', null, null, 'Styles', '', '--', '');
            ie_open('link', null, null, 'rel', 'stylesheet', 'href', '/build/vendor/senna/senna.css');
            ie_close('link');
            ie_open('link', null, null, 'rel', 'stylesheet', 'href', '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.2.0/styles/tomorrow-night-eighties.min.css');
            ie_close('link');
            ie_open('link', null, null, 'rel', 'stylesheet', 'href', '/build/vendor/westyle/build/bootstrap.css');
            ie_close('link');
            ie_void('script', null, null, 'src', '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.2.0/highlight.min.js');
            ie_void('script', null, null, 'src', 'https://cdn.socket.io/socket.io-1.3.0.js');
            ie_void('script', null, null, 'src', 'http://cdn.wedeploy.com/api/latest/wedeploy.js');
            ie_void('script', null, null, 'src', '/build/globals/library.js');
            ie_close('head');
            ie_open('body');
            ie_void('div', null, null, 'class', 'senna-loading-bar');
            ie_open('div', null, null, 'id', 'content');
            itext((goog.asserts.assert(opt_data.content != null), opt_data.content));
            ie_close('div');
            ie_close('body');
            ie_close('html');
        }
        exports.render = $render;
        if (goog.DEBUG) {
            $render.soyTemplateName = 'Page.render';
        }

        exports.render.params = ["content"];
        exports.render.types = { "content": "any" };
        templates = exports;
        return exports;
    });

    var Page = function (_Component) {
        babelHelpers.inherits(Page, _Component);

        function Page() {
            babelHelpers.classCallCheck(this, Page);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        return Page;
    }(Component);

    Soy.register(Page, templates);
    this.LibraryNamed.Page = this.LibraryNamed.Page || {};
    this.LibraryNamed.Page.Page = Page;
    this.LibraryNamed.Page.templates = templates;
    this.Library.Page = templates;
    /* jshint ignore:end */
}).call(this);
}).call(this);
//# sourceMappingURL=library.js.map
