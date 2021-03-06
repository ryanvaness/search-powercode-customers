/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _underscore = __webpack_require__(2);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _axios = __webpack_require__(4);

	var _axios2 = _interopRequireDefault(_axios);

	var _sweetalert = __webpack_require__(30);

	var _sweetalert2 = _interopRequireDefault(_sweetalert);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(function (window) {
	    'use strict';

	    var document = window.document; // localize the document

	    // Get all customers from all Powercode instances
	    document.getElementById('searchForm').onsubmit = function handleSubmission(e) {
	        (0, _axios2.default)({
	            method: 'post',
	            url: 'apiCall.php',
	            data: new FormData(e.target),
	            headers: { 'X-Requested-With': 'XMLHttpRequest' },
	            responseType: 'json'
	        }).then(function (response) {
	            // If api call was successful
	            (0, _underscore2.default)('customers').html();
	            var customerHTML = '';
	            response.data.forEach(function eachPowercode(pc) {
	                // Loop through each Powercode instance
	                if (pc.statusCode !== 0) {
	                    (0, _sweetalert2.default)('Error', pc.message, 'error');
	                    return;
	                }
	                customerHTML += generatePowercodeHTML(pc);
	            });

	            (0, _underscore2.default)('customers').get().innerHTML = customerHTML.replace(/(^|\n)\s*/g, '');
	            (0, _underscore2.default)(document.getElementsByClassName('filter-table')).filterTable();
	        }).catch(function caughtError(e) {
	            console.error('ERROR', e);
	        });
	        return false;
	    };

	    // Attach all event listeners by delegation
	    document.body.addEventListener('click', function delegateClick(e) {
	        var _theTarget = (0, _underscore2.default)(e.target);

	        if (_theTarget.hasClass('filter') || _theTarget.hasClass('glyphicon-filter')) {
	            // show/hide filter
	            var _panelBody = _theTarget.closestClass('panel-heading').next();
	            if (_panelBody.isVisible()) {
	                _panelBody.hide();
	            } else {
	                _panelBody.show();
	                _panelBody.findOne('#customer-table-filter').get().focus();
	            }
	        }
	    });

	    // Generates html for this Powercode instance
	    var generatePowercodeHTML = function generatePowercodeHTML(pc) {
	        var customerHTML = '\n            <div class="pcInstance panel panel-primary">\n                <div class="panel-heading">\n                    <h3 class="panel-title">Customers from ' + pc.name + '</h3>\n                    <div class="pull-right">\n                        <span class="clickable filter" data-toggle="tooltip" title="Toggle table filter" data-container="body">\n                            <i class="glyphicon glyphicon-filter"></i>\n                        </span>\n                    </div>\n                </div>\n                <div class="panel-body">\n                    <input type="text" class="filter-table form-control" id="customer-table-filter" data-action="filter" placeholder="Filter Customers" />\n                </div>\n                <table class="table table-hover">\n                    <thead>\n                        <tr>\n                            <th>ID</th>\n                            <th>Name</th>\n                            <th>Address 1</th>\n                            <th>City</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n        ';
	        if (pc.customers.length) {
	            customerHTML += pc.customers.map(function eachCustomer(customer) {
	                return generateCustomerHTML(customer, pc.url);
	            }).join('');
	        }
	        var hideNoEntries = pc.customers.length ? 'hidden' : '';
	        customerHTML += '\n                    <tr class="search-sf ' + hideNoEntries + '"><td class="text-muted" colspan="4">No entries found.</td></tr>\n                </tbody>\n            </table>\n        ';
	        customerHTML += '\n            </div>\n         ';

	        return customerHTML;
	    };

	    // Generates html for each customer
	    var generateCustomerHTML = function generateCustomerHTML(customer, url) {
	        return '\n            <tr>\n                <td>' + customer.CustomerID + '</td>\n                <td><a href="' + url + '/index.php?q&page=/customers/_view.php&customerid=' + customer.CustomerID + '" target="_blank">' + customer.CompanyName + '</a></td>\n                <td>' + customer.Address1 + '</td>\n                <td>' + customer.City + '</td>\n            </tr>\n        ';
	    };
	})(window);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utilities = __webpack_require__(3);

	var __ = function __(selector) {
	    this.element = typeof selector === "string" ? document.getElementById(selector) : selector;
	};

	__.prototype = {
	    get: function get() {
	        return this.element;
	    },

	    addClass: function addClass(className) {
	        if (this.element.length > 1) {
	            Array.from(this.element).map(function (elem) {
	                elem.classList.add(className);
	            });
	            return;
	        }
	        this.element.classList.add(className);
	    },

	    removeClass: function removeClass(className) {
	        if (Array.isArray(this.element)) {
	            Array.from(this.element).map(function (elem) {
	                if (_(elem).hasClass(className)) {
	                    elem.classList.remove(className);
	                }
	            });
	            return;
	        }

	        if (this.element.classList.contains(className)) {
	            this.element.classList.remove(className);
	        }
	    },

	    closestClass: function closestClass(elemClass) {
	        var elem = this.element;
	        while (elem.parentNode) {
	            elem = elem.parentNode;
	            if (elem.classList.contains(elemClass)) {
	                break;
	            }
	        }
	        return new __(elem);
	    },

	    findAll: function findAll(selector) {
	        return new __(this.element.querySelectorAll(selector));
	    },

	    findOne: function findOne(selector) {
	        return new __(this.element.querySelector(selector));
	    },

	    remove: function remove() {
	        this.element.parentNode.removeChild(this.get());
	    },

	    replace: function replace(child) {
	        this.element.parentNode.replaceChild(child, this.element);
	    },

	    show: function show() {
	        if (this.element.length > 1) {
	            Array.from(this.element).map(function (elem) {
	                elem.style.display = '';
	                if (!_(elem).isVisible()) {
	                    elem.style.display = "block";
	                }
	            });
	            return;
	        }

	        this.element.style.display = "";
	        if (!this.isVisible()) {
	            this.element.style.display = "block";
	        }
	    },

	    hide: function hide() {
	        if (this.element.length > 1) {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this.get()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var elem = _step.value;

	                    elem.style.display = 'none';
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            return;
	        }
	        this.element.style.display = 'none';
	    },

	    isVisible: function isVisible() {
	        return this.element.offsetWidth > 0 && this.element.offsetHeight > 0;
	    },

	    hasClass: function hasClass(elemClass) {
	        return this.element.classList.contains(elemClass);
	    },

	    ready: function ready(handler) {
	        function domReady() {
	            document.removeEventListener("DOMContentLoaded", domReady, false);
	            handler();
	        }

	        document.addEventListener("DOMContentLoaded", domReady, false);
	        return this;
	    },

	    html: function html() {
	        var htmlString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	        this.element.innerHTML = htmlString;
	    },

	    next: function next() {
	        if (this.element && this.element.nodeType) {
	            var elem = this.element.nextSibling;
	            while (elem && elem.nodeType != 1) {
	                elem = elem.nextSibling;
	            }
	            return new __(elem);
	        }
	        return null;
	    },

	    prev: function prev() {
	        if (this.element && this.element.nodeType) {
	            var elem = this.element.previousSibling;
	            while (elem && elem.nodeType != 1) {
	                elem = elem.previousSibling;
	            }
	            return new __(elem);
	        }
	        return null;
	    },

	    filterTable: function filterTable() {
	        var handleKeyUp = (0, _utilities.debounce)(function handleKeyUp() {
	            var fragTBody = document.createDocumentFragment(),
	                _this = _(this),
	                filterFor = _this.get().value.toLowerCase(),
	                _tBody = _this.closestClass('panel-body').next().findOne('tbody'),
	                rows = _tBody.get().querySelectorAll('tr');

	            Array.from(rows).map(function putRowsInFrag(row) {
	                fragTBody.appendChild(row);
	            });

	            var rowsFound = Array.from(fragTBody.querySelectorAll('tr')).filter(function filterRows(row) {
	                _(row).addClass('hidden');
	                if (!filterFor.length) {
	                    return true;
	                }
	                return row.innerText.toLowerCase().indexOf(filterFor) > -1 && !_(row).hasClass('search-sf');
	            });

	            if (rowsFound.length) {
	                _(rowsFound).removeClass('hidden');
	            } else {
	                _(fragTBody.querySelector('.search-sf')).removeClass('hidden');
	            }
	            var newTBody = document.createElement('tbody');
	            newTBody.appendChild(fragTBody);

	            _tBody.replace(newTBody);
	        }, 250);
	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;

	        try {
	            for (var _iterator2 = this.get()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                var elem = _step2.value;

	                elem.addEventListener('keyup', handleKeyUp);
	            }
	        } catch (err) {
	            _didIteratorError2 = true;
	            _iteratorError2 = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                    _iterator2.return();
	                }
	            } finally {
	                if (_didIteratorError2) {
	                    throw _iteratorError2;
	                }
	            }
	        }
	    }

	};
	var _ = function _(select) {
	    return new __(select);
	};
	exports.default = _;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	// Returns a function, that, as long as it continues to be invoked, will not
	// be triggered. The function will be called after it stops being called for
	// N milliseconds. If `immediate` is passed, trigger the function on the
	// leading edge, instead of the trailing.
	var debounce = exports.debounce = function debounceHandler(func, wait, immediate) {
	    var timeout;
	    return function () {
	        var context = this,
	            args = arguments;
	        var later = function later() {
	            timeout = null;
	            if (!immediate) func.apply(context, args);
	        };
	        var callNow = immediate && !timeout;
	        clearTimeout(timeout);
	        timeout = setTimeout(later, wait);
	        if (callNow) func.apply(context, args);
	    };
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(5);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(6);
	var bind = __webpack_require__(7);
	var Axios = __webpack_require__(8);
	var defaults = __webpack_require__(9);

	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  var context = new Axios(defaultConfig);
	  var instance = bind(Axios.prototype.request, context);

	  // Copy axios.prototype to instance
	  utils.extend(instance, Axios.prototype, context);

	  // Copy context to instance
	  utils.extend(instance, context);

	  return instance;
	}

	// Create the default instance to be exported
	var axios = createInstance(defaults);

	// Expose Axios class to allow class inheritance
	axios.Axios = Axios;

	// Factory for creating new instances
	axios.create = function create(instanceConfig) {
	  return createInstance(utils.merge(defaults, instanceConfig));
	};

	// Expose Cancel & CancelToken
	axios.Cancel = __webpack_require__(27);
	axios.CancelToken = __webpack_require__(28);
	axios.isCancel = __webpack_require__(24);

	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(29);

	module.exports = axios;

	// Allow use of default import syntax in TypeScript
	module.exports.default = axios;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bind = __webpack_require__(7);

	/*global toString:true*/

	// utils is a library of generic helper functions non-specific to axios

	var toString = Object.prototype.toString;

	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}

	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}

	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}

	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}

	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}

	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}

	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}

	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}

	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}

	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}

	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}

	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}

	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}

	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}

	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}

	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  typeof document.createElement -> undefined
	 */
	function isStandardBrowserEnv() {
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined' &&
	    typeof document.createElement === 'function'
	  );
	}

	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }

	  // Force an array if not already something iterable
	  if (typeof obj !== 'object' && !isArray(obj)) {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }

	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}

	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
	      result[key] = merge(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }

	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}

	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 * @return {Object} The resulting value of object a
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}

	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  extend: extend,
	  trim: trim
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defaults = __webpack_require__(9);
	var utils = __webpack_require__(6);
	var InterceptorManager = __webpack_require__(21);
	var dispatchRequest = __webpack_require__(22);
	var isAbsoluteURL = __webpack_require__(25);
	var combineURLs = __webpack_require__(26);

	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} instanceConfig The default config for the instance
	 */
	function Axios(instanceConfig) {
	  this.defaults = instanceConfig;
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}

	/**
	 * Dispatch a request
	 *
	 * @param {Object} config The config specific for this request (merged with this.defaults)
	 */
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }

	  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

	  // Support baseURL config
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }

	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);

	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });

	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });

	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }

	  return promise;
	};

	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});

	module.exports = Axios;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var utils = __webpack_require__(6);
	var normalizeHeaderName = __webpack_require__(11);

	var PROTECTION_PREFIX = /^\)\]\}',?\n/;
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};

	function setContentTypeIfUnset(headers, value) {
	  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}

	function getDefaultAdapter() {
	  var adapter;
	  if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = __webpack_require__(12);
	  } else if (typeof process !== 'undefined') {
	    // For node use HTTP adapter
	    adapter = __webpack_require__(12);
	  }
	  return adapter;
	}

	var defaults = {
	  adapter: getDefaultAdapter(),

	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Content-Type');
	    if (utils.isFormData(data) ||
	      utils.isArrayBuffer(data) ||
	      utils.isStream(data) ||
	      utils.isFile(data) ||
	      utils.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils.isObject(data)) {
	      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
	      return JSON.stringify(data);
	    }
	    return data;
	  }],

	  transformResponse: [function transformResponse(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      data = data.replace(PROTECTION_PREFIX, '');
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],

	  timeout: 0,

	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',

	  maxContentLength: -1,

	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};

	defaults.headers = {
	  common: {
	    'Accept': 'application/json, text/plain, */*'
	  }
	};

	utils.forEach(['delete', 'get', 'head'], function forEachMehtodNoData(method) {
	  defaults.headers[method] = {};
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
	});

	module.exports = defaults;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ },
/* 10 */
/***/ function(module, exports) {

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

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(6);

	module.exports = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var utils = __webpack_require__(6);
	var settle = __webpack_require__(13);
	var buildURL = __webpack_require__(16);
	var parseHeaders = __webpack_require__(17);
	var isURLSameOrigin = __webpack_require__(18);
	var createError = __webpack_require__(14);
	var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(19);

	module.exports = function xhrAdapter(config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config.data;
	    var requestHeaders = config.headers;

	    if (utils.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // Let the browser set it
	    }

	    var request = new XMLHttpRequest();
	    var loadEvent = 'onreadystatechange';
	    var xDomain = false;

	    // For IE 8/9 CORS support
	    // Only supports POST and GET calls and doesn't returns the response headers.
	    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
	    if (process.env.NODE_ENV !== 'test' &&
	        typeof window !== 'undefined' &&
	        window.XDomainRequest && !('withCredentials' in request) &&
	        !isURLSameOrigin(config.url)) {
	      request = new window.XDomainRequest();
	      loadEvent = 'onload';
	      xDomain = true;
	      request.onprogress = function handleProgress() {};
	      request.ontimeout = function handleTimeout() {};
	    }

	    // HTTP basic authentication
	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password || '';
	      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	    }

	    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

	    // Set the request timeout in MS
	    request.timeout = config.timeout;

	    // Listen for ready state
	    request[loadEvent] = function handleLoad() {
	      if (!request || (request.readyState !== 4 && !xDomain)) {
	        return;
	      }

	      // The request errored out and we didn't get a response, this will be
	      // handled by onerror instead
	      // With one exception: request that using file: protocol, most browsers
	      // will return status as 0 even though it's a successful request
	      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
	        return;
	      }

	      // Prepare the response
	      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
	      var response = {
	        data: responseData,
	        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
	        status: request.status === 1223 ? 204 : request.status,
	        statusText: request.status === 1223 ? 'No Content' : request.statusText,
	        headers: responseHeaders,
	        config: config,
	        request: request
	      };

	      settle(resolve, reject, response);

	      // Clean up request
	      request = null;
	    };

	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(createError('Network Error', config));

	      // Clean up request
	      request = null;
	    };

	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));

	      // Clean up request
	      request = null;
	    };

	    // Add xsrf header
	    // This is only done if running in a standard browser environment.
	    // Specifically not if we're in a web worker, or react-native.
	    if (utils.isStandardBrowserEnv()) {
	      var cookies = __webpack_require__(20);

	      // Add xsrf header
	      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
	          cookies.read(config.xsrfCookieName) :
	          undefined;

	      if (xsrfValue) {
	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
	      }
	    }

	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // Remove Content-Type if data is undefined
	          delete requestHeaders[key];
	        } else {
	          // Otherwise add header to the request
	          request.setRequestHeader(key, val);
	        }
	      });
	    }

	    // Add withCredentials to request if needed
	    if (config.withCredentials) {
	      request.withCredentials = true;
	    }

	    // Add responseType to request if needed
	    if (config.responseType) {
	      try {
	        request.responseType = config.responseType;
	      } catch (e) {
	        if (request.responseType !== 'json') {
	          throw e;
	        }
	      }
	    }

	    // Handle progress if needed
	    if (typeof config.onDownloadProgress === 'function') {
	      request.addEventListener('progress', config.onDownloadProgress);
	    }

	    // Not all browsers support upload events
	    if (typeof config.onUploadProgress === 'function' && request.upload) {
	      request.upload.addEventListener('progress', config.onUploadProgress);
	    }

	    if (config.cancelToken) {
	      // Handle cancellation
	      config.cancelToken.promise.then(function onCanceled(cancel) {
	        if (!request) {
	          return;
	        }

	        request.abort();
	        reject(cancel);
	        // Clean up request
	        request = null;
	      });
	    }

	    if (requestData === undefined) {
	      requestData = null;
	    }

	    // Send the request
	    request.send(requestData);
	  });
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createError = __webpack_require__(14);

	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	module.exports = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  // Note: status is not exposed by XDomainRequest
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError(
	      'Request failed with status code ' + response.status,
	      response.config,
	      null,
	      response
	    ));
	  }
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var enhanceError = __webpack_require__(15);

	/**
	 * Create an Error with the specified message, config, error code, and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 @ @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	module.exports = function createError(message, config, code, response) {
	  var error = new Error(message);
	  return enhanceError(error, config, code, response);
	};


/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 @ @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */
	module.exports = function enhanceError(error, config, code, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }
	  error.response = response;
	  return error;
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(6);

	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}

	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }

	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];

	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }

	      if (utils.isArray(val)) {
	        key = key + '[]';
	      }

	      if (!utils.isArray(val)) {
	        val = [val];
	      }

	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });

	    serializedParams = parts.join('&');
	  }

	  if (serializedParams) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }

	  return url;
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(6);

	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;

	  if (!headers) { return parsed; }

	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));

	    if (key) {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	    }
	  });

	  return parsed;
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(6);

	module.exports = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	  (function standardBrowserEnv() {
	    var msie = /(msie|trident)/i.test(navigator.userAgent);
	    var urlParsingNode = document.createElement('a');
	    var originURL;

	    /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	    function resolveURL(url) {
	      var href = url;

	      if (msie) {
	        // IE needs attribute set twice to normalize properties
	        urlParsingNode.setAttribute('href', href);
	        href = urlParsingNode.href;
	      }

	      urlParsingNode.setAttribute('href', href);

	      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	      return {
	        href: urlParsingNode.href,
	        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	        host: urlParsingNode.host,
	        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	        hostname: urlParsingNode.hostname,
	        port: urlParsingNode.port,
	        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	                  urlParsingNode.pathname :
	                  '/' + urlParsingNode.pathname
	      };
	    }

	    originURL = resolveURL(window.location.href);

	    /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	    return function isURLSameOrigin(requestURL) {
	      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	      return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	    };
	  })() :

	  // Non standard browser envs (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return function isURLSameOrigin() {
	      return true;
	    };
	  })()
	);


/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	function E() {
	  this.message = 'String contains an invalid character';
	}
	E.prototype = new Error;
	E.prototype.code = 5;
	E.prototype.name = 'InvalidCharacterError';

	function btoa(input) {
	  var str = String(input);
	  var output = '';
	  for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars;
	    // if the next str index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    str.charAt(idx | 0) || (map = '=', idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	  ) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new E();
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}

	module.exports = btoa;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(6);

	module.exports = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs support document.cookie
	  (function standardBrowserEnv() {
	    return {
	      write: function write(name, value, expires, path, domain, secure) {
	        var cookie = [];
	        cookie.push(name + '=' + encodeURIComponent(value));

	        if (utils.isNumber(expires)) {
	          cookie.push('expires=' + new Date(expires).toGMTString());
	        }

	        if (utils.isString(path)) {
	          cookie.push('path=' + path);
	        }

	        if (utils.isString(domain)) {
	          cookie.push('domain=' + domain);
	        }

	        if (secure === true) {
	          cookie.push('secure');
	        }

	        document.cookie = cookie.join('; ');
	      },

	      read: function read(name) {
	        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	        return (match ? decodeURIComponent(match[3]) : null);
	      },

	      remove: function remove(name) {
	        this.write(name, '', Date.now() - 86400000);
	      }
	    };
	  })() :

	  // Non standard browser env (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return {
	      write: function write() {},
	      read: function read() { return null; },
	      remove: function remove() {}
	    };
	  })()
	);


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(6);

	function InterceptorManager() {
	  this.handlers = [];
	}

	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};

	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};

	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};

	module.exports = InterceptorManager;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(6);
	var transformData = __webpack_require__(23);
	var isCancel = __webpack_require__(24);
	var defaults = __webpack_require__(9);

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	function throwIfCancellationRequested(config) {
	  if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	  }
	}

	/**
	 * Dispatch a request to the server using the configured adapter.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  throwIfCancellationRequested(config);

	  // Ensure headers exist
	  config.headers = config.headers || {};

	  // Transform request data
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );

	  // Flatten headers
	  config.headers = utils.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers || {}
	  );

	  utils.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );

	  var adapter = config.adapter || defaults.adapter;

	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config);

	    // Transform response data
	    response.data = transformData(
	      response.data,
	      response.headers,
	      config.transformResponse
	    );

	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config);

	      // Transform response data
	      if (reason && reason.response) {
	        reason.response.data = transformData(
	          reason.response.data,
	          reason.response.headers,
	          config.transformResponse
	        );
	      }
	    }

	    return Promise.reject(reason);
	  });
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(6);

	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });

	  return data;
	};


/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};


/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	module.exports = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};


/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	module.exports = function combineURLs(baseURL, relativeURL) {
	  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
	};


/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * A `Cancel` is an object that is thrown when an operation is canceled.
	 *
	 * @class
	 * @param {string=} message The message.
	 */
	function Cancel(message) {
	  this.message = message;
	}

	Cancel.prototype.toString = function toString() {
	  return 'Cancel' + (this.message ? ': ' + this.message : '');
	};

	Cancel.prototype.__CANCEL__ = true;

	module.exports = Cancel;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Cancel = __webpack_require__(27);

	/**
	 * A `CancelToken` is an object that can be used to request cancellation of an operation.
	 *
	 * @class
	 * @param {Function} executor The executor function.
	 */
	function CancelToken(executor) {
	  if (typeof executor !== 'function') {
	    throw new TypeError('executor must be a function.');
	  }

	  var resolvePromise;
	  this.promise = new Promise(function promiseExecutor(resolve) {
	    resolvePromise = resolve;
	  });

	  var token = this;
	  executor(function cancel(message) {
	    if (token.reason) {
	      // Cancellation has already been requested
	      return;
	    }

	    token.reason = new Cancel(message);
	    resolvePromise(token.reason);
	  });
	}

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	CancelToken.prototype.throwIfRequested = function throwIfRequested() {
	  if (this.reason) {
	    throw this.reason;
	  }
	};

	/**
	 * Returns an object that contains a new `CancelToken` and a function that, when called,
	 * cancels the `CancelToken`.
	 */
	CancelToken.source = function source() {
	  var cancel;
	  var token = new CancelToken(function executor(c) {
	    cancel = c;
	  });
	  return {
	    token: token,
	    cancel: cancel
	  };
	};

	module.exports = CancelToken;


/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * sweetalert2 v6.6.5
	 * Released under the MIT License.
	 */
	(function (global, factory) {
		 true ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global.Sweetalert2 = factory());
	}(this, (function () { 'use strict';

	var defaultParams = {
	  title: '',
	  titleText: '',
	  text: '',
	  html: '',
	  type: null,
	  customClass: '',
	  target: 'body',
	  animation: true,
	  allowOutsideClick: true,
	  allowEscapeKey: true,
	  allowEnterKey: true,
	  showConfirmButton: true,
	  showCancelButton: false,
	  preConfirm: null,
	  confirmButtonText: 'OK',
	  confirmButtonColor: '#3085d6',
	  confirmButtonClass: null,
	  cancelButtonText: 'Cancel',
	  cancelButtonColor: '#aaa',
	  cancelButtonClass: null,
	  buttonsStyling: true,
	  reverseButtons: false,
	  focusCancel: false,
	  showCloseButton: false,
	  showLoaderOnConfirm: false,
	  imageUrl: null,
	  imageWidth: null,
	  imageHeight: null,
	  imageClass: null,
	  timer: null,
	  width: 500,
	  padding: 20,
	  background: '#fff',
	  input: null,
	  inputPlaceholder: '',
	  inputValue: '',
	  inputOptions: {},
	  inputAutoTrim: true,
	  inputClass: null,
	  inputAttributes: {},
	  inputValidator: null,
	  progressSteps: [],
	  currentProgressStep: null,
	  progressStepsDistance: '40px',
	  onOpen: null,
	  onClose: null,
	  useRejections: true
	};

	var swalPrefix = 'swal2-';

	var prefix = function prefix(items) {
	  var result = {};
	  for (var i in items) {
	    result[items[i]] = swalPrefix + items[i];
	  }
	  return result;
	};

	var swalClasses = prefix(['container', 'shown', 'iosfix', 'modal', 'overlay', 'fade', 'show', 'hide', 'noanimation', 'close', 'title', 'content', 'buttonswrapper', 'confirm', 'cancel', 'icon', 'image', 'input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea', 'inputerror', 'validationerror', 'progresssteps', 'activeprogressstep', 'progresscircle', 'progressline', 'loading', 'styled']);

	var iconTypes = prefix(['success', 'warning', 'info', 'question', 'error']);

	/*
	 * Set hover, active and focus-states for buttons (source: http://www.sitepoint.com/javascript-generate-lighter-darker-color)
	 */
	var colorLuminance = function colorLuminance(hex, lum) {
	  // Validate hex string
	  hex = String(hex).replace(/[^0-9a-f]/gi, '');
	  if (hex.length < 6) {
	    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	  }
	  lum = lum || 0;

	  // Convert to decimal and change luminosity
	  var rgb = '#';
	  for (var i = 0; i < 3; i++) {
	    var c = parseInt(hex.substr(i * 2, 2), 16);
	    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
	    rgb += ('00' + c).substr(c.length);
	  }

	  return rgb;
	};

	var uniqueArray = function uniqueArray(arr) {
	  var result = [];
	  for (var i in arr) {
	    if (result.indexOf(arr[i]) === -1) {
	      result.push(arr[i]);
	    }
	  }
	  return result;
	};

	/* global MouseEvent */

	// Remember state in cases where opening and handling a modal will fiddle with it.
	var states = {
	  previousWindowKeyDown: null,
	  previousActiveElement: null,
	  previousBodyPadding: null

	  /*
	   * Add modal + overlay to DOM
	   */
	};var init = function init(params) {
	  if (typeof document === 'undefined') {
	    console.error('SweetAlert2 requires document to initialize');
	    return;
	  }

	  var container = document.createElement('div');
	  container.className = swalClasses.container;
	  container.innerHTML = sweetHTML;

	  var targetElement = document.querySelector(params.target);
	  if (!targetElement) {
	    console.warn('SweetAlert2: Can\'t find the target "' + params.target + '"');
	    targetElement = document.body;
	  }
	  targetElement.appendChild(container);

	  var modal = getModal();
	  var input = getChildByClass(modal, swalClasses.input);
	  var file = getChildByClass(modal, swalClasses.file);
	  var range = modal.querySelector('.' + swalClasses.range + ' input');
	  var rangeOutput = modal.querySelector('.' + swalClasses.range + ' output');
	  var select = getChildByClass(modal, swalClasses.select);
	  var checkbox = modal.querySelector('.' + swalClasses.checkbox + ' input');
	  var textarea = getChildByClass(modal, swalClasses.textarea);

	  input.oninput = function () {
	    sweetAlert.resetValidationError();
	  };

	  input.onkeydown = function (event) {
	    setTimeout(function () {
	      if (event.keyCode === 13 && params.allowEnterKey) {
	        event.stopPropagation();
	        sweetAlert.clickConfirm();
	      }
	    }, 0);
	  };

	  file.onchange = function () {
	    sweetAlert.resetValidationError();
	  };

	  range.oninput = function () {
	    sweetAlert.resetValidationError();
	    rangeOutput.value = range.value;
	  };

	  range.onchange = function () {
	    sweetAlert.resetValidationError();
	    range.previousSibling.value = range.value;
	  };

	  select.onchange = function () {
	    sweetAlert.resetValidationError();
	  };

	  checkbox.onchange = function () {
	    sweetAlert.resetValidationError();
	  };

	  textarea.oninput = function () {
	    sweetAlert.resetValidationError();
	  };

	  return modal;
	};

	/*
	 * Manipulate DOM
	 */

	var sweetHTML = ('\n <div role="dialog" aria-labelledby="' + swalClasses.title + '" aria-describedby="' + swalClasses.content + '" class="' + swalClasses.modal + '" tabindex="-1">\n   <ul class="' + swalClasses.progresssteps + '"></ul>\n   <div class="' + swalClasses.icon + ' ' + iconTypes.error + '">\n     <span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span>\n   </div>\n   <div class="' + swalClasses.icon + ' ' + iconTypes.question + '">?</div>\n   <div class="' + swalClasses.icon + ' ' + iconTypes.warning + '">!</div>\n   <div class="' + swalClasses.icon + ' ' + iconTypes.info + '">i</div>\n   <div class="' + swalClasses.icon + ' ' + iconTypes.success + '">\n     <div class="swal2-success-circular-line-left"></div>\n     <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n     <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n     <div class="swal2-success-circular-line-right"></div>\n   </div>\n   <img class="' + swalClasses.image + '">\n   <h2 class="' + swalClasses.title + '" id="' + swalClasses.title + '"></h2>\n   <div id="' + swalClasses.content + '" class="' + swalClasses.content + '"></div>\n   <input class="' + swalClasses.input + '">\n   <input type="file" class="' + swalClasses.file + '">\n   <div class="' + swalClasses.range + '">\n     <output></output>\n     <input type="range">\n   </div>\n   <select class="' + swalClasses.select + '"></select>\n   <div class="' + swalClasses.radio + '"></div>\n   <label for="' + swalClasses.checkbox + '" class="' + swalClasses.checkbox + '">\n     <input type="checkbox">\n   </label>\n   <textarea class="' + swalClasses.textarea + '"></textarea>\n   <div class="' + swalClasses.validationerror + '"></div>\n   <div class="' + swalClasses.buttonswrapper + '">\n     <button type="button" class="' + swalClasses.confirm + '">OK</button>\n     <button type="button" class="' + swalClasses.cancel + '">Cancel</button>\n   </div>\n   <button type="button" class="' + swalClasses.close + '" aria-label="Close this dialog">&times;</button>\n </div>\n').replace(/(^|\n)\s*/g, '');

	var getContainer = function getContainer() {
	  return document.body.querySelector('.' + swalClasses.container);
	};

	var getModal = function getModal() {
	  return getContainer() ? getContainer().querySelector('.' + swalClasses.modal) : null;
	};

	var getIcons = function getIcons() {
	  var modal = getModal();
	  return modal.querySelectorAll('.' + swalClasses.icon);
	};

	var elementByClass = function elementByClass(className) {
	  return getContainer() ? getContainer().querySelector('.' + className) : null;
	};

	var getTitle = function getTitle() {
	  return elementByClass(swalClasses.title);
	};

	var getContent = function getContent() {
	  return elementByClass(swalClasses.content);
	};

	var getImage = function getImage() {
	  return elementByClass(swalClasses.image);
	};

	var getButtonsWrapper = function getButtonsWrapper() {
	  return elementByClass(swalClasses.buttonswrapper);
	};

	var getProgressSteps = function getProgressSteps() {
	  return elementByClass(swalClasses.progresssteps);
	};

	var getValidationError = function getValidationError() {
	  return elementByClass(swalClasses.validationerror);
	};

	var getConfirmButton = function getConfirmButton() {
	  return elementByClass(swalClasses.confirm);
	};

	var getCancelButton = function getCancelButton() {
	  return elementByClass(swalClasses.cancel);
	};

	var getCloseButton = function getCloseButton() {
	  return elementByClass(swalClasses.close);
	};

	var getFocusableElements = function getFocusableElements(focusCancel) {
	  var buttons = [getConfirmButton(), getCancelButton()];
	  if (focusCancel) {
	    buttons.reverse();
	  }
	  var focusableElements = buttons.concat(Array.prototype.slice.call(getModal().querySelectorAll('button, input:not([type=hidden]), textarea, select, a, *[tabindex]:not([tabindex="-1"])')));
	  return uniqueArray(focusableElements);
	};

	var hasClass = function hasClass(elem, className) {
	  if (elem.classList) {
	    return elem.classList.contains(className);
	  }
	  return false;
	};

	var focusInput = function focusInput(input) {
	  input.focus

	  // place cursor at end of text in text input
	  ();if (input.type !== 'file') {
	    // http://stackoverflow.com/a/2345915/1331425
	    var val = input.value;
	    input.value = '';
	    input.value = val;
	  }
	};

	var addClass = function addClass(elem, className) {
	  if (!elem || !className) {
	    return;
	  }
	  var classes = className.split(/\s+/).filter(Boolean);
	  classes.forEach(function (className) {
	    elem.classList.add(className);
	  });
	};

	var removeClass = function removeClass(elem, className) {
	  if (!elem || !className) {
	    return;
	  }
	  var classes = className.split(/\s+/).filter(Boolean);
	  classes.forEach(function (className) {
	    elem.classList.remove(className);
	  });
	};

	var getChildByClass = function getChildByClass(elem, className) {
	  for (var i = 0; i < elem.childNodes.length; i++) {
	    if (hasClass(elem.childNodes[i], className)) {
	      return elem.childNodes[i];
	    }
	  }
	};

	var show = function show(elem, display) {
	  if (!display) {
	    display = 'block';
	  }
	  elem.style.opacity = '';
	  elem.style.display = display;
	};

	var hide = function hide(elem) {
	  elem.style.opacity = '';
	  elem.style.display = 'none';
	};

	var empty = function empty(elem) {
	  while (elem.firstChild) {
	    elem.removeChild(elem.firstChild);
	  }
	};

	// borrowed from jqeury $(elem).is(':visible') implementation
	var isVisible = function isVisible(elem) {
	  return elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length;
	};

	var removeStyleProperty = function removeStyleProperty(elem, property) {
	  if (elem.style.removeProperty) {
	    elem.style.removeProperty(property);
	  } else {
	    elem.style.removeAttribute(property);
	  }
	};

	var fireClick = function fireClick(node) {
	  if (!isVisible(node)) {
	    return false;
	  }

	  // Taken from http://www.nonobtrusive.com/2011/11/29/programatically-fire-crossbrowser-click-event-with-javascript/
	  // Then fixed for today's Chrome browser.
	  if (typeof MouseEvent === 'function') {
	    // Up-to-date approach
	    var mevt = new MouseEvent('click', {
	      view: window,
	      bubbles: false,
	      cancelable: true
	    });
	    node.dispatchEvent(mevt);
	  } else if (document.createEvent) {
	    // Fallback
	    var evt = document.createEvent('MouseEvents');
	    evt.initEvent('click', false, false);
	    node.dispatchEvent(evt);
	  } else if (document.createEventObject) {
	    node.fireEvent('onclick');
	  } else if (typeof node.onclick === 'function') {
	    node.onclick();
	  }
	};

	var animationEndEvent = function () {
	  var testEl = document.createElement('div');
	  var transEndEventNames = {
	    'WebkitAnimation': 'webkitAnimationEnd',
	    'OAnimation': 'oAnimationEnd oanimationend',
	    'msAnimation': 'MSAnimationEnd',
	    'animation': 'animationend'
	  };
	  for (var i in transEndEventNames) {
	    if (transEndEventNames.hasOwnProperty(i) && testEl.style[i] !== undefined) {
	      return transEndEventNames[i];
	    }
	  }

	  return false;
	}

	// Reset previous window keydown handler and focued element
	();var resetPrevState = function resetPrevState() {
	  window.onkeydown = states.previousWindowKeyDown;
	  if (states.previousActiveElement && states.previousActiveElement.focus) {
	    var x = window.scrollX;
	    var y = window.scrollY;
	    states.previousActiveElement.focus();
	    if (x && y) {
	      // IE has no scrollX/scrollY support
	      window.scrollTo(x, y);
	    }
	  }
	};

	// Measure width of scrollbar
	// https://github.com/twbs/bootstrap/blob/master/js/modal.js#L279-L286
	var measureScrollbar = function measureScrollbar() {
	  var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
	  if (supportsTouch) {
	    return 0;
	  }
	  var scrollDiv = document.createElement('div');
	  scrollDiv.style.width = '50px';
	  scrollDiv.style.height = '50px';
	  scrollDiv.style.overflow = 'scroll';
	  document.body.appendChild(scrollDiv);
	  var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	  document.body.removeChild(scrollDiv);
	  return scrollbarWidth;
	};

	// JavaScript Debounce Function
	// Simplivied version of https://davidwalsh.name/javascript-debounce-function
	var debounce = function debounce(func, wait) {
	  var timeout = void 0;
	  return function () {
	    var later = function later() {
	      timeout = null;
	      func();
	    };
	    clearTimeout(timeout);
	    timeout = setTimeout(later, wait);
	  };
	};

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	  return typeof obj;
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};





















	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

	var modalParams = _extends({}, defaultParams);
	var queue = [];
	var swal2Observer = void 0;

	/*
	 * Set type, text and actions on modal
	 */
	var setParameters = function setParameters(params) {
	  var modal = getModal() || init(params);

	  for (var param in params) {
	    if (!defaultParams.hasOwnProperty(param) && param !== 'extraParams') {
	      console.warn('SweetAlert2: Unknown parameter "' + param + '"');
	    }
	  }

	  // Set modal width
	  modal.style.width = typeof params.width === 'number' ? params.width + 'px' : params.width;

	  modal.style.padding = params.padding + 'px';
	  modal.style.background = params.background;
	  var successIconParts = modal.querySelectorAll('[class^=swal2-success-circular-line], .swal2-success-fix');
	  for (var i = 0; i < successIconParts.length; i++) {
	    successIconParts[i].style.background = params.background;
	  }

	  var title = getTitle();
	  var content = getContent();
	  var buttonsWrapper = getButtonsWrapper();
	  var confirmButton = getConfirmButton();
	  var cancelButton = getCancelButton();
	  var closeButton = getCloseButton

	  // Title
	  ();if (params.titleText) {
	    title.innerText = params.titleText;
	  } else {
	    title.innerHTML = params.title.split('\n').join('<br>');
	  }

	  // Content
	  if (params.text || params.html) {
	    if (_typeof(params.html) === 'object') {
	      content.innerHTML = '';
	      if (0 in params.html) {
	        for (var _i = 0; _i in params.html; _i++) {
	          content.appendChild(params.html[_i].cloneNode(true));
	        }
	      } else {
	        content.appendChild(params.html.cloneNode(true));
	      }
	    } else if (params.html) {
	      content.innerHTML = params.html;
	    } else if (params.text) {
	      content.textContent = params.text;
	    }
	    show(content);
	  } else {
	    hide(content);
	  }

	  // Close button
	  if (params.showCloseButton) {
	    show(closeButton);
	  } else {
	    hide(closeButton);
	  }

	  // Custom Class
	  modal.className = swalClasses.modal;
	  if (params.customClass) {
	    addClass(modal, params.customClass);
	  }

	  // Progress steps
	  var progressStepsContainer = getProgressSteps();
	  var currentProgressStep = parseInt(params.currentProgressStep === null ? sweetAlert.getQueueStep() : params.currentProgressStep, 10);
	  if (params.progressSteps.length) {
	    show(progressStepsContainer);
	    empty(progressStepsContainer);
	    if (currentProgressStep >= params.progressSteps.length) {
	      console.warn('SweetAlert2: Invalid currentProgressStep parameter, it should be less than progressSteps.length ' + '(currentProgressStep like JS arrays starts from 0)');
	    }
	    params.progressSteps.forEach(function (step, index) {
	      var circle = document.createElement('li');
	      addClass(circle, swalClasses.progresscircle);
	      circle.innerHTML = step;
	      if (index === currentProgressStep) {
	        addClass(circle, swalClasses.activeprogressstep);
	      }
	      progressStepsContainer.appendChild(circle);
	      if (index !== params.progressSteps.length - 1) {
	        var line = document.createElement('li');
	        addClass(line, swalClasses.progressline);
	        line.style.width = params.progressStepsDistance;
	        progressStepsContainer.appendChild(line);
	      }
	    });
	  } else {
	    hide(progressStepsContainer);
	  }

	  // Icon
	  var icons = getIcons();
	  for (var _i2 = 0; _i2 < icons.length; _i2++) {
	    hide(icons[_i2]);
	  }
	  if (params.type) {
	    var validType = false;
	    for (var iconType in iconTypes) {
	      if (params.type === iconType) {
	        validType = true;
	        break;
	      }
	    }
	    if (!validType) {
	      console.error('SweetAlert2: Unknown alert type: ' + params.type);
	      return false;
	    }
	    var icon = modal.querySelector('.' + swalClasses.icon + '.' + iconTypes[params.type]);
	    show(icon

	    // Animate icon
	    );if (params.animation) {
	      switch (params.type) {
	        case 'success':
	          addClass(icon, 'swal2-animate-success-icon');
	          addClass(icon.querySelector('.swal2-success-line-tip'), 'swal2-animate-success-line-tip');
	          addClass(icon.querySelector('.swal2-success-line-long'), 'swal2-animate-success-line-long');
	          break;
	        case 'error':
	          addClass(icon, 'swal2-animate-error-icon');
	          addClass(icon.querySelector('.swal2-x-mark'), 'swal2-animate-x-mark');
	          break;
	        default:
	          break;
	      }
	    }
	  }

	  // Custom image
	  var image = getImage();
	  if (params.imageUrl) {
	    image.setAttribute('src', params.imageUrl);
	    show(image);

	    if (params.imageWidth) {
	      image.setAttribute('width', params.imageWidth);
	    } else {
	      image.removeAttribute('width');
	    }

	    if (params.imageHeight) {
	      image.setAttribute('height', params.imageHeight);
	    } else {
	      image.removeAttribute('height');
	    }

	    image.className = swalClasses.image;
	    if (params.imageClass) {
	      addClass(image, params.imageClass);
	    }
	  } else {
	    hide(image);
	  }

	  // Cancel button
	  if (params.showCancelButton) {
	    cancelButton.style.display = 'inline-block';
	  } else {
	    hide(cancelButton);
	  }

	  // Confirm button
	  if (params.showConfirmButton) {
	    removeStyleProperty(confirmButton, 'display');
	  } else {
	    hide(confirmButton);
	  }

	  // Buttons wrapper
	  if (!params.showConfirmButton && !params.showCancelButton) {
	    hide(buttonsWrapper);
	  } else {
	    show(buttonsWrapper);
	  }

	  // Edit text on cancel and confirm buttons
	  confirmButton.innerHTML = params.confirmButtonText;
	  cancelButton.innerHTML = params.cancelButtonText;

	  // Set buttons to selected background colors
	  if (params.buttonsStyling) {
	    confirmButton.style.backgroundColor = params.confirmButtonColor;
	    cancelButton.style.backgroundColor = params.cancelButtonColor;
	  }

	  // Add buttons custom classes
	  confirmButton.className = swalClasses.confirm;
	  addClass(confirmButton, params.confirmButtonClass);
	  cancelButton.className = swalClasses.cancel;
	  addClass(cancelButton, params.cancelButtonClass

	  // Buttons styling
	  );if (params.buttonsStyling) {
	    addClass(confirmButton, swalClasses.styled);
	    addClass(cancelButton, swalClasses.styled);
	  } else {
	    removeClass(confirmButton, swalClasses.styled);
	    removeClass(cancelButton, swalClasses.styled);

	    confirmButton.style.backgroundColor = confirmButton.style.borderLeftColor = confirmButton.style.borderRightColor = '';
	    cancelButton.style.backgroundColor = cancelButton.style.borderLeftColor = cancelButton.style.borderRightColor = '';
	  }

	  // CSS animation
	  if (params.animation === true) {
	    removeClass(modal, swalClasses.noanimation);
	  } else {
	    addClass(modal, swalClasses.noanimation);
	  }
	};

	/*
	 * Animations
	 */
	var openModal = function openModal(animation, onComplete) {
	  var container = getContainer();
	  var modal = getModal();

	  if (animation) {
	    addClass(modal, swalClasses.show);
	    addClass(container, swalClasses.fade);
	    removeClass(modal, swalClasses.hide);
	  } else {
	    removeClass(modal, swalClasses.fade);
	  }
	  show(modal

	  // scrolling is 'hidden' until animation is done, after that 'auto'
	  );container.style.overflowY = 'hidden';
	  if (animationEndEvent && !hasClass(modal, swalClasses.noanimation)) {
	    modal.addEventListener(animationEndEvent, function swalCloseEventFinished() {
	      modal.removeEventListener(animationEndEvent, swalCloseEventFinished);
	      container.style.overflowY = 'auto';
	    });
	  } else {
	    container.style.overflowY = 'auto';
	  }

	  addClass(document.documentElement, swalClasses.shown);
	  addClass(document.body, swalClasses.shown);
	  addClass(container, swalClasses.shown);
	  fixScrollbar();
	  iOSfix();
	  states.previousActiveElement = document.activeElement;
	  if (onComplete !== null && typeof onComplete === 'function') {
	    setTimeout(function () {
	      onComplete(modal);
	    });
	  }
	};

	var fixScrollbar = function fixScrollbar() {
	  // for queues, do not do this more than once
	  if (states.previousBodyPadding !== null) {
	    return;
	  }
	  // if the body has overflow
	  if (document.body.scrollHeight > window.innerHeight) {
	    // add padding so the content doesn't shift after removal of scrollbar
	    states.previousBodyPadding = document.body.style.paddingRight;
	    document.body.style.paddingRight = measureScrollbar() + 'px';
	  }
	};

	var undoScrollbar = function undoScrollbar() {
	  if (states.previousBodyPadding !== null) {
	    document.body.style.paddingRight = states.previousBodyPadding;
	    states.previousBodyPadding = null;
	  }
	};

	// Fix iOS scrolling http://stackoverflow.com/q/39626302/1331425
	var iOSfix = function iOSfix() {
	  var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
	  if (iOS && !hasClass(document.body, swalClasses.iosfix)) {
	    var offset = document.body.scrollTop;
	    document.body.style.top = offset * -1 + 'px';
	    addClass(document.body, swalClasses.iosfix);
	  }
	};

	var undoIOSfix = function undoIOSfix() {
	  if (hasClass(document.body, swalClasses.iosfix)) {
	    var offset = parseInt(document.body.style.top, 10);
	    removeClass(document.body, swalClasses.iosfix);
	    document.body.style.top = '';
	    document.body.scrollTop = offset * -1;
	  }
	};

	// SweetAlert entry point
	var sweetAlert = function sweetAlert() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  if (args[0] === undefined) {
	    console.error('SweetAlert2 expects at least 1 attribute!');
	    return false;
	  }

	  var params = _extends({}, modalParams);

	  switch (_typeof(args[0])) {
	    case 'string':
	      params.title = args[0];
	      params.html = args[1];
	      params.type = args[2];

	      break;

	    case 'object':
	      _extends(params, args[0]);
	      params.extraParams = args[0].extraParams;

	      if (params.input === 'email' && params.inputValidator === null) {
	        params.inputValidator = function (email) {
	          return new Promise(function (resolve, reject) {
	            var emailRegex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
	            if (emailRegex.test(email)) {
	              resolve();
	            } else {
	              reject('Invalid email address');
	            }
	          });
	        };
	      }

	      if (params.input === 'url' && params.inputValidator === null) {
	        params.inputValidator = function (url) {
	          return new Promise(function (resolve, reject) {
	            // taken from https://stackoverflow.com/a/3809435/1331425
	            var urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/;
	            if (urlRegex.test(url)) {
	              resolve();
	            } else {
	              reject('Invalid URL');
	            }
	          });
	        };
	      }
	      break;

	    default:
	      console.error('SweetAlert2: Unexpected type of argument! Expected "string" or "object", got ' + _typeof(args[0]));
	      return false;
	  }

	  setParameters(params);

	  var container = getContainer();
	  var modal = getModal();

	  return new Promise(function (resolve, reject) {
	    // Close on timer
	    if (params.timer) {
	      modal.timeout = setTimeout(function () {
	        sweetAlert.closeModal(params.onClose);
	        if (params.useRejections) {
	          reject('timer');
	        } else {
	          resolve({ dismiss: 'timer' });
	        }
	      }, params.timer);
	    }

	    // Get input element by specified type or, if type isn't specified, by params.input
	    var getInput = function getInput(inputType) {
	      inputType = inputType || params.input;
	      if (!inputType) {
	        return null;
	      }
	      switch (inputType) {
	        case 'select':
	        case 'textarea':
	        case 'file':
	          return getChildByClass(modal, swalClasses[inputType]);
	        case 'checkbox':
	          return modal.querySelector('.' + swalClasses.checkbox + ' input');
	        case 'radio':
	          return modal.querySelector('.' + swalClasses.radio + ' input:checked') || modal.querySelector('.' + swalClasses.radio + ' input:first-child');
	        case 'range':
	          return modal.querySelector('.' + swalClasses.range + ' input');
	        default:
	          return getChildByClass(modal, swalClasses.input);
	      }
	    };

	    // Get the value of the modal input
	    var getInputValue = function getInputValue() {
	      var input = getInput();
	      if (!input) {
	        return null;
	      }
	      switch (params.input) {
	        case 'checkbox':
	          return input.checked ? 1 : 0;
	        case 'radio':
	          return input.checked ? input.value : null;
	        case 'file':
	          return input.files.length ? input.files[0] : null;
	        default:
	          return params.inputAutoTrim ? input.value.trim() : input.value;
	      }
	    };

	    // input autofocus
	    if (params.input) {
	      setTimeout(function () {
	        var input = getInput();
	        if (input) {
	          focusInput(input);
	        }
	      }, 0);
	    }

	    var confirm = function confirm(value) {
	      if (params.showLoaderOnConfirm) {
	        sweetAlert.showLoading();
	      }

	      if (params.preConfirm) {
	        params.preConfirm(value, params.extraParams).then(function (preConfirmValue) {
	          sweetAlert.closeModal(params.onClose);
	          resolve(preConfirmValue || value);
	        }, function (error) {
	          sweetAlert.hideLoading();
	          if (error) {
	            sweetAlert.showValidationError(error);
	          }
	        });
	      } else {
	        sweetAlert.closeModal(params.onClose);
	        if (params.useRejections) {
	          resolve(value);
	        } else {
	          resolve({ value: value });
	        }
	      }
	    };

	    // Mouse interactions
	    var onButtonEvent = function onButtonEvent(event) {
	      var e = event || window.event;
	      var target = e.target || e.srcElement;
	      var confirmButton = getConfirmButton();
	      var cancelButton = getCancelButton();
	      var targetedConfirm = confirmButton && (confirmButton === target || confirmButton.contains(target));
	      var targetedCancel = cancelButton && (cancelButton === target || cancelButton.contains(target));

	      switch (e.type) {
	        case 'mouseover':
	        case 'mouseup':
	          if (params.buttonsStyling) {
	            if (targetedConfirm) {
	              confirmButton.style.backgroundColor = colorLuminance(params.confirmButtonColor, -0.1);
	            } else if (targetedCancel) {
	              cancelButton.style.backgroundColor = colorLuminance(params.cancelButtonColor, -0.1);
	            }
	          }
	          break;
	        case 'mouseout':
	          if (params.buttonsStyling) {
	            if (targetedConfirm) {
	              confirmButton.style.backgroundColor = params.confirmButtonColor;
	            } else if (targetedCancel) {
	              cancelButton.style.backgroundColor = params.cancelButtonColor;
	            }
	          }
	          break;
	        case 'mousedown':
	          if (params.buttonsStyling) {
	            if (targetedConfirm) {
	              confirmButton.style.backgroundColor = colorLuminance(params.confirmButtonColor, -0.2);
	            } else if (targetedCancel) {
	              cancelButton.style.backgroundColor = colorLuminance(params.cancelButtonColor, -0.2);
	            }
	          }
	          break;
	        case 'click':
	          // Clicked 'confirm'
	          if (targetedConfirm && sweetAlert.isVisible()) {
	            sweetAlert.disableButtons();
	            if (params.input) {
	              var inputValue = getInputValue();

	              if (params.inputValidator) {
	                sweetAlert.disableInput();
	                params.inputValidator(inputValue, params.extraParams).then(function () {
	                  sweetAlert.enableButtons();
	                  sweetAlert.enableInput();
	                  confirm(inputValue);
	                }, function (error) {
	                  sweetAlert.enableButtons();
	                  sweetAlert.enableInput();
	                  if (error) {
	                    sweetAlert.showValidationError(error);
	                  }
	                });
	              } else {
	                confirm(inputValue);
	              }
	            } else {
	              confirm(true);
	            }

	            // Clicked 'cancel'
	          } else if (targetedCancel && sweetAlert.isVisible()) {
	            sweetAlert.disableButtons();
	            sweetAlert.closeModal(params.onClose);
	            if (params.useRejections) {
	              reject('cancel');
	            } else {
	              resolve({ dismiss: 'cancel' });
	            }
	          }
	          break;
	        default:
	      }
	    };

	    var buttons = modal.querySelectorAll('button');
	    for (var i = 0; i < buttons.length; i++) {
	      buttons[i].onclick = onButtonEvent;
	      buttons[i].onmouseover = onButtonEvent;
	      buttons[i].onmouseout = onButtonEvent;
	      buttons[i].onmousedown = onButtonEvent;
	    }

	    // Closing modal by close button
	    getCloseButton().onclick = function () {
	      sweetAlert.closeModal(params.onClose);
	      if (params.useRejections) {
	        reject('close');
	      } else {
	        resolve({ dismiss: 'close' });
	      }
	    };

	    // Closing modal by overlay click
	    container.onclick = function (e) {
	      if (e.target !== container) {
	        return;
	      }
	      if (params.allowOutsideClick) {
	        sweetAlert.closeModal(params.onClose);
	        if (params.useRejections) {
	          reject('overlay');
	        } else {
	          resolve({ dismiss: 'overlay' });
	        }
	      }
	    };

	    var buttonsWrapper = getButtonsWrapper();
	    var confirmButton = getConfirmButton();
	    var cancelButton = getCancelButton

	    // Reverse buttons (Confirm on the right side)
	    ();if (params.reverseButtons) {
	      confirmButton.parentNode.insertBefore(cancelButton, confirmButton);
	    } else {
	      confirmButton.parentNode.insertBefore(confirmButton, cancelButton);
	    }

	    // Focus handling
	    var setFocus = function setFocus(index, increment) {
	      var focusableElements = getFocusableElements(params.focusCancel
	      // search for visible elements and select the next possible match
	      );for (var _i3 = 0; _i3 < focusableElements.length; _i3++) {
	        index = index + increment;

	        // rollover to first item
	        if (index === focusableElements.length) {
	          index = 0;

	          // go to last item
	        } else if (index === -1) {
	          index = focusableElements.length - 1;
	        }

	        // determine if element is visible
	        var el = focusableElements[index];
	        if (isVisible(el)) {
	          return el.focus();
	        }
	      }
	    };

	    var handleKeyDown = function handleKeyDown(event) {
	      var e = event || window.event;
	      var keyCode = e.keyCode || e.which;

	      if ([9, 13, 32, 27, 37, 38, 39, 40].indexOf(keyCode) === -1) {
	        // Don't do work on keys we don't care about.
	        return;
	      }

	      var targetElement = e.target || e.srcElement;

	      var focusableElements = getFocusableElements(params.focusCancel);
	      var btnIndex = -1; // Find the button - note, this is a nodelist, not an array.
	      for (var _i4 = 0; _i4 < focusableElements.length; _i4++) {
	        if (targetElement === focusableElements[_i4]) {
	          btnIndex = _i4;
	          break;
	        }
	      }

	      // TAB
	      if (keyCode === 9) {
	        if (!e.shiftKey) {
	          // Cycle to the next button
	          setFocus(btnIndex, 1);
	        } else {
	          // Cycle to the prev button
	          setFocus(btnIndex, -1);
	        }
	        e.stopPropagation();
	        e.preventDefault

	        // ARROWS - switch focus between buttons
	        ();
	      } else if (keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40) {
	        // focus Cancel button if Confirm button is currently focused
	        if (document.activeElement === confirmButton && isVisible(cancelButton)) {
	          cancelButton.focus
	          // and vice versa
	          ();
	        } else if (document.activeElement === cancelButton && isVisible(confirmButton)) {
	          confirmButton.focus();
	        }

	        // ENTER/SPACE
	      } else if (keyCode === 13 || keyCode === 32) {
	        if (btnIndex === -1 && params.allowEnterKey) {
	          // ENTER/SPACE clicked outside of a button.
	          if (params.focusCancel) {
	            fireClick(cancelButton, e);
	          } else {
	            fireClick(confirmButton, e);
	          }
	          e.stopPropagation();
	          e.preventDefault();
	        }

	        // ESC
	      } else if (keyCode === 27 && params.allowEscapeKey === true) {
	        sweetAlert.closeModal(params.onClose);
	        if (params.useRejections) {
	          reject('esc');
	        } else {
	          resolve({ dismiss: 'esc' });
	        }
	      }
	    };

	    if (!window.onkeydown || window.onkeydown.toString() !== handleKeyDown.toString()) {
	      states.previousWindowKeyDown = window.onkeydown;
	      window.onkeydown = handleKeyDown;
	    }

	    // Loading state
	    if (params.buttonsStyling) {
	      confirmButton.style.borderLeftColor = params.confirmButtonColor;
	      confirmButton.style.borderRightColor = params.confirmButtonColor;
	    }

	    /**
	     * Show spinner instead of Confirm button and disable Cancel button
	     */
	    sweetAlert.hideLoading = sweetAlert.disableLoading = function () {
	      if (!params.showConfirmButton) {
	        hide(confirmButton);
	        if (!params.showCancelButton) {
	          hide(getButtonsWrapper());
	        }
	      }
	      removeClass(buttonsWrapper, swalClasses.loading);
	      removeClass(modal, swalClasses.loading);
	      confirmButton.disabled = false;
	      cancelButton.disabled = false;
	    };

	    sweetAlert.getTitle = function () {
	      return getTitle();
	    };
	    sweetAlert.getContent = function () {
	      return getContent();
	    };
	    sweetAlert.getInput = function () {
	      return getInput();
	    };
	    sweetAlert.getImage = function () {
	      return getImage();
	    };
	    sweetAlert.getButtonsWrapper = function () {
	      return getButtonsWrapper();
	    };
	    sweetAlert.getConfirmButton = function () {
	      return getConfirmButton();
	    };
	    sweetAlert.getCancelButton = function () {
	      return getCancelButton();
	    };

	    sweetAlert.enableButtons = function () {
	      confirmButton.disabled = false;
	      cancelButton.disabled = false;
	    };

	    sweetAlert.disableButtons = function () {
	      confirmButton.disabled = true;
	      cancelButton.disabled = true;
	    };

	    sweetAlert.enableConfirmButton = function () {
	      confirmButton.disabled = false;
	    };

	    sweetAlert.disableConfirmButton = function () {
	      confirmButton.disabled = true;
	    };

	    sweetAlert.enableInput = function () {
	      var input = getInput();
	      if (!input) {
	        return false;
	      }
	      if (input.type === 'radio') {
	        var radiosContainer = input.parentNode.parentNode;
	        var radios = radiosContainer.querySelectorAll('input');
	        for (var _i5 = 0; _i5 < radios.length; _i5++) {
	          radios[_i5].disabled = false;
	        }
	      } else {
	        input.disabled = false;
	      }
	    };

	    sweetAlert.disableInput = function () {
	      var input = getInput();
	      if (!input) {
	        return false;
	      }
	      if (input && input.type === 'radio') {
	        var radiosContainer = input.parentNode.parentNode;
	        var radios = radiosContainer.querySelectorAll('input');
	        for (var _i6 = 0; _i6 < radios.length; _i6++) {
	          radios[_i6].disabled = true;
	        }
	      } else {
	        input.disabled = true;
	      }
	    };

	    // Set modal min-height to disable scrolling inside the modal
	    sweetAlert.recalculateHeight = debounce(function () {
	      var modal = getModal();
	      if (!modal) {
	        return;
	      }
	      var prevState = modal.style.display;
	      modal.style.minHeight = '';
	      show(modal);
	      modal.style.minHeight = modal.scrollHeight + 1 + 'px';
	      modal.style.display = prevState;
	    }, 50

	    // Show block with validation error
	    );sweetAlert.showValidationError = function (error) {
	      var validationError = getValidationError();
	      validationError.innerHTML = error;
	      show(validationError);

	      var input = getInput();
	      if (input) {
	        focusInput(input);
	        addClass(input, swalClasses.inputerror);
	      }
	    };

	    // Hide block with validation error
	    sweetAlert.resetValidationError = function () {
	      var validationError = getValidationError();
	      hide(validationError);
	      sweetAlert.recalculateHeight();

	      var input = getInput();
	      if (input) {
	        removeClass(input, swalClasses.inputerror);
	      }
	    };

	    sweetAlert.getProgressSteps = function () {
	      return params.progressSteps;
	    };

	    sweetAlert.setProgressSteps = function (progressSteps) {
	      params.progressSteps = progressSteps;
	      setParameters(params);
	    };

	    sweetAlert.showProgressSteps = function () {
	      show(getProgressSteps());
	    };

	    sweetAlert.hideProgressSteps = function () {
	      hide(getProgressSteps());
	    };

	    sweetAlert.enableButtons();
	    sweetAlert.hideLoading();
	    sweetAlert.resetValidationError

	    // inputs
	    ();var inputTypes = ['input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea'];
	    var input = void 0;
	    for (var _i7 = 0; _i7 < inputTypes.length; _i7++) {
	      var inputClass = swalClasses[inputTypes[_i7]];
	      var inputContainer = getChildByClass(modal, inputClass);
	      input = getInput(inputTypes[_i7]

	      // set attributes
	      );if (input) {
	        for (var j in input.attributes) {
	          if (input.attributes.hasOwnProperty(j)) {
	            var attrName = input.attributes[j].name;
	            if (attrName !== 'type' && attrName !== 'value') {
	              input.removeAttribute(attrName);
	            }
	          }
	        }
	        for (var attr in params.inputAttributes) {
	          input.setAttribute(attr, params.inputAttributes[attr]);
	        }
	      }

	      // set class
	      inputContainer.className = inputClass;
	      if (params.inputClass) {
	        addClass(inputContainer, params.inputClass);
	      }

	      hide(inputContainer);
	    }

	    var populateInputOptions = void 0;
	    switch (params.input) {
	      case 'text':
	      case 'email':
	      case 'password':
	      case 'number':
	      case 'tel':
	      case 'url':
	        input = getChildByClass(modal, swalClasses.input);
	        input.value = params.inputValue;
	        input.placeholder = params.inputPlaceholder;
	        input.type = params.input;
	        show(input);
	        break;
	      case 'file':
	        input = getChildByClass(modal, swalClasses.file);
	        input.placeholder = params.inputPlaceholder;
	        input.type = params.input;
	        show(input);
	        break;
	      case 'range':
	        var range = getChildByClass(modal, swalClasses.range);
	        var rangeInput = range.querySelector('input');
	        var rangeOutput = range.querySelector('output');
	        rangeInput.value = params.inputValue;
	        rangeInput.type = params.input;
	        rangeOutput.value = params.inputValue;
	        show(range);
	        break;
	      case 'select':
	        var select = getChildByClass(modal, swalClasses.select);
	        select.innerHTML = '';
	        if (params.inputPlaceholder) {
	          var placeholder = document.createElement('option');
	          placeholder.innerHTML = params.inputPlaceholder;
	          placeholder.value = '';
	          placeholder.disabled = true;
	          placeholder.selected = true;
	          select.appendChild(placeholder);
	        }
	        populateInputOptions = function populateInputOptions(inputOptions) {
	          for (var optionValue in inputOptions) {
	            var option = document.createElement('option');
	            option.value = optionValue;
	            option.innerHTML = inputOptions[optionValue];
	            if (params.inputValue === optionValue) {
	              option.selected = true;
	            }
	            select.appendChild(option);
	          }
	          show(select);
	          select.focus();
	        };
	        break;
	      case 'radio':
	        var radio = getChildByClass(modal, swalClasses.radio);
	        radio.innerHTML = '';
	        populateInputOptions = function populateInputOptions(inputOptions) {
	          for (var radioValue in inputOptions) {
	            var radioInput = document.createElement('input');
	            var radioLabel = document.createElement('label');
	            var radioLabelSpan = document.createElement('span');
	            radioInput.type = 'radio';
	            radioInput.name = swalClasses.radio;
	            radioInput.value = radioValue;
	            if (params.inputValue === radioValue) {
	              radioInput.checked = true;
	            }
	            radioLabelSpan.innerHTML = inputOptions[radioValue];
	            radioLabel.appendChild(radioInput);
	            radioLabel.appendChild(radioLabelSpan);
	            radioLabel.for = radioInput.id;
	            radio.appendChild(radioLabel);
	          }
	          show(radio);
	          var radios = radio.querySelectorAll('input');
	          if (radios.length) {
	            radios[0].focus();
	          }
	        };
	        break;
	      case 'checkbox':
	        var checkbox = getChildByClass(modal, swalClasses.checkbox);
	        var checkboxInput = getInput('checkbox');
	        checkboxInput.type = 'checkbox';
	        checkboxInput.value = 1;
	        checkboxInput.id = swalClasses.checkbox;
	        checkboxInput.checked = Boolean(params.inputValue);
	        var label = checkbox.getElementsByTagName('span');
	        if (label.length) {
	          checkbox.removeChild(label[0]);
	        }
	        label = document.createElement('span');
	        label.innerHTML = params.inputPlaceholder;
	        checkbox.appendChild(label);
	        show(checkbox);
	        break;
	      case 'textarea':
	        var textarea = getChildByClass(modal, swalClasses.textarea);
	        textarea.value = params.inputValue;
	        textarea.placeholder = params.inputPlaceholder;
	        show(textarea);
	        break;
	      case null:
	        break;
	      default:
	        console.error('SweetAlert2: Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "' + params.input + '"');
	        break;
	    }

	    if (params.input === 'select' || params.input === 'radio') {
	      if (params.inputOptions instanceof Promise) {
	        sweetAlert.showLoading();
	        params.inputOptions.then(function (inputOptions) {
	          sweetAlert.hideLoading();
	          populateInputOptions(inputOptions);
	        });
	      } else if (_typeof(params.inputOptions) === 'object') {
	        populateInputOptions(params.inputOptions);
	      } else {
	        console.error('SweetAlert2: Unexpected type of inputOptions! Expected object or Promise, got ' + _typeof(params.inputOptions));
	      }
	    }

	    openModal(params.animation, params.onOpen

	    // Focus the first element (input or button)
	    );if (params.allowEnterKey) {
	      setFocus(-1, 1);
	    } else {
	      if (document.activeElement) {
	        document.activeElement.blur();
	      }
	    }

	    // fix scroll
	    getContainer().scrollTop = 0;

	    // Observe changes inside the modal and adjust height
	    if (typeof MutationObserver !== 'undefined' && !swal2Observer) {
	      swal2Observer = new MutationObserver(sweetAlert.recalculateHeight);
	      swal2Observer.observe(modal, { childList: true, characterData: true, subtree: true });
	    }
	  });
	};

	/*
	 * Global function to determine if swal2 modal is shown
	 */
	sweetAlert.isVisible = function () {
	  return !!getModal();
	};

	/*
	 * Global function for chaining sweetAlert modals
	 */
	sweetAlert.queue = function (steps) {
	  queue = steps;
	  var resetQueue = function resetQueue() {
	    queue = [];
	    document.body.removeAttribute('data-swal2-queue-step');
	  };
	  var queueResult = [];
	  return new Promise(function (resolve, reject) {
	    (function step(i, callback) {
	      if (i < queue.length) {
	        document.body.setAttribute('data-swal2-queue-step', i);

	        sweetAlert(queue[i]).then(function (result) {
	          queueResult.push(result);
	          step(i + 1, callback);
	        }, function (dismiss) {
	          resetQueue();
	          reject(dismiss);
	        });
	      } else {
	        resetQueue();
	        resolve(queueResult);
	      }
	    })(0);
	  });
	};

	/*
	 * Global function for getting the index of current modal in queue
	 */
	sweetAlert.getQueueStep = function () {
	  return document.body.getAttribute('data-swal2-queue-step'

	  /*
	   * Global function for inserting a modal to the queue
	   */
	  );
	};sweetAlert.insertQueueStep = function (step, index) {
	  if (index && index < queue.length) {
	    return queue.splice(index, 0, step);
	  }
	  return queue.push(step);
	};

	/*
	 * Global function for deleting a modal from the queue
	 */
	sweetAlert.deleteQueueStep = function (index) {
	  if (typeof queue[index] !== 'undefined') {
	    queue.splice(index, 1);
	  }
	};

	/*
	 * Global function to close sweetAlert
	 */
	sweetAlert.close = sweetAlert.closeModal = function (onComplete) {
	  var container = getContainer();
	  var modal = getModal();
	  if (!modal) {
	    return;
	  }
	  removeClass(modal, swalClasses.show);
	  addClass(modal, swalClasses.hide);
	  clearTimeout(modal.timeout);

	  resetPrevState();

	  var removeModalAndResetState = function removeModalAndResetState() {
	    if (container.parentNode) {
	      container.parentNode.removeChild(container);
	    }
	    removeClass(document.documentElement, swalClasses.shown);
	    removeClass(document.body, swalClasses.shown);
	    undoScrollbar();
	    undoIOSfix();
	  };

	  // If animation is supported, animate
	  if (animationEndEvent && !hasClass(modal, swalClasses.noanimation)) {
	    modal.addEventListener(animationEndEvent, function swalCloseEventFinished() {
	      modal.removeEventListener(animationEndEvent, swalCloseEventFinished);
	      if (hasClass(modal, swalClasses.hide)) {
	        removeModalAndResetState();
	      }
	    });
	  } else {
	    // Otherwise, remove immediately
	    removeModalAndResetState();
	  }
	  if (onComplete !== null && typeof onComplete === 'function') {
	    setTimeout(function () {
	      onComplete(modal);
	    });
	  }
	};

	/*
	 * Global function to click 'Confirm' button
	 */
	sweetAlert.clickConfirm = function () {
	  return getConfirmButton().click

	  /*
	   * Global function to click 'Cancel' button
	   */
	  ();
	};sweetAlert.clickCancel = function () {
	  return getCancelButton().click

	  /**
	   * Show spinner instead of Confirm button and disable Cancel button
	   */
	  ();
	};sweetAlert.showLoading = sweetAlert.enableLoading = function () {
	  var modal = getModal();
	  if (!modal) {
	    sweetAlert('');
	  }
	  var buttonsWrapper = getButtonsWrapper();
	  var confirmButton = getConfirmButton();
	  var cancelButton = getCancelButton();

	  show(buttonsWrapper);
	  show(confirmButton, 'inline-block');
	  addClass(buttonsWrapper, swalClasses.loading);
	  addClass(modal, swalClasses.loading);
	  confirmButton.disabled = true;
	  cancelButton.disabled = true;
	};

	/**
	 * Set default params for each popup
	 * @param {Object} userParams
	 */
	sweetAlert.setDefaults = function (userParams) {
	  if (!userParams || (typeof userParams === 'undefined' ? 'undefined' : _typeof(userParams)) !== 'object') {
	    return console.error('SweetAlert2: the argument for setDefaults() is required and has to be a object');
	  }

	  for (var param in userParams) {
	    if (!defaultParams.hasOwnProperty(param) && param !== 'extraParams') {
	      console.warn('SweetAlert2: Unknown parameter "' + param + '"');
	      delete userParams[param];
	    }
	  }

	  _extends(modalParams, userParams);
	};

	/**
	 * Reset default params for each popup
	 */
	sweetAlert.resetDefaults = function () {
	  modalParams = _extends({}, defaultParams);
	};

	sweetAlert.noop = function () {};

	sweetAlert.version = '6.6.5';

	sweetAlert.default = sweetAlert;

	return sweetAlert;

	})));
	if (window.Sweetalert2) window.sweetAlert = window.swal = window.Sweetalert2;


/***/ }
/******/ ]);