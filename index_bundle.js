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

	var _axios = __webpack_require__(3);

	var _axios2 = _interopRequireDefault(_axios);

	var _sweetalert = __webpack_require__(29);

	var _sweetalert2 = _interopRequireDefault(_sweetalert);

	__webpack_require__(30);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(function (window) {
	    var document = window.document;

	    document.getElementById('searchForm').onsubmit = function handleSubmission(e) {
	        (0, _axios2.default)({
	            method: 'post',
	            url: 'apiCall.php',
	            data: new FormData(e.target),
	            headers: { 'X-Requested-With': 'XMLHttpRequest' },
	            responseType: 'json'
	        }).then(function (response) {
	            (0, _underscore2.default)('customers').html();
	            var customerHTML = '';
	            response.data.forEach(function eachPowercode(pc) {
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

	        if (_theTarget.hasClass('removeEndpoint')) {
	            // remove endpoint
	            _theTarget.closestClass('endpoint').remove();
	        } else if (_theTarget.get().id === 'addEndpoint') {
	            // add endpoint
	            var allNodes = document.getElementsByClassName('endpoint'),
	                lastNode = allNodes[allNodes.length - 1],
	                num = nextNumber(),
	                newNode = document.createElement('div');

	            newNode.className = 'endpoint form-group';
	            newNode.innerHTML = '\n                <input title="API Key" type="text" class="apiKey form-control" name="endpoint[' + num + '][apiKey]" placeholder="API Key"/>\n                <input title="URL Endpoint" type="text" class="apiUrl form-control" name="endpoint[' + num + '][url]" placeholder="URL Endpoint"/>\n                <button type="button" class="btn btn-danger removeEndpoint">Remove Endpoint</button>\n            ';
	            lastNode.parentNode.insertBefore(newNode, lastNode.nextSibling);
	        } else if (_theTarget.hasClass('filter') || _theTarget.hasClass('glyphicon-filter')) {
	            // show/hide filter
	            var _panelBody = _theTarget.closestClass('panel-heading').next();
	            if (_panelBody.isVisible()) {
	                _panelBody.hide();
	            } else {
	                _panelBody.show();
	            }
	        }
	    });

	    var numberGenerator = function numberGenerator(startingNumber) {
	        return function () {
	            return startingNumber++;
	        };
	    };

	    var generatePowercodeHTML = function generatePowercodeHTML(pc) {
	        var customerHTML = '\n            <div class="pcInstance panel panel-primary">\n                <div class="panel-heading">\n                    <h3 class="panel-title">Customers from ' + pc.url + '</h3>\n                    <div class="pull-right">\n                        <span class="clickable filter" data-toggle="tooltip" title="Toggle table filter" data-container="body">\n                            <i class="glyphicon glyphicon-filter"></i>\n                        </span>\n                    </div>\n                </div>\n                <div class="panel-body">\n                    <input type="text" class="filter-table form-control" id="customer-table-filter" data-action="filter" placeholder="Filter Customers" />\n                </div>\n        ';
	        if (pc.customers.length) {
	            customerHTML += '\n                <table class="table table-hover">\n                    <thead>\n                        <tr>\n                            <th>ID</th>\n                            <th>Name</th>\n                            <th>Address 1</th>\n                            <th>City</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n            ';
	            customerHTML += pc.customers.map(function eachCustomer(customer) {
	                return generateCustomerHTML(customer, pc.url);
	            }).join('');
	            customerHTML += '\n                    </tbody>\n                </table>\n            ';
	        } else {
	            customerHTML += '\n                <div class="noneFound">\n                    <em>None Found</em>\n                </div>\n            ';
	        }
	        customerHTML += '\n            </div>\n         ';

	        return customerHTML;
	    };

	    var generateCustomerHTML = function generateCustomerHTML(customer, url) {
	        return '\n            <tr>\n                <td>' + customer.CustomerID + '</td>\n                <td><a href="' + url + '/index.php?q&page=/customers/_view.php&customerid=' + customer.CustomerID + '" target="_blank">' + customer.CompanyName + '</a></td>\n                <td>' + customer.Address1 + '</td>\n                <td>' + customer.City + '</td>\n            </tr>\n        ';
	    };

	    var nextNumber = numberGenerator(1);
	})(window);

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var __ = function __(selector) {
	    this.element = typeof selector === "string" ? document.getElementById(selector) : selector;
	};

	__.prototype = {
	    get: function get() {
	        return this.element;
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

	    find: function find(selector) {
	        return new __(this.element.querySelectorAll(selector));
	    },

	    remove: function remove() {
	        this.element.parentNode.removeChild(this.get());
	    },

	    show: function show() {
	        if (this.element.length > 1) {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this.get()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var elem = _step.value;

	                    elem.style.display = '';
	                    if (!_(elem).isVisible()) {
	                        this.element.style.display = "block";
	                    }
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

	        this.element.style.display = "";
	        if (!this.isVisible()) {
	            this.element.style.display = "block";
	        }
	    },

	    hide: function hide() {
	        if (this.element.length > 1) {
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = this.get()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var elem = _step2.value;

	                    elem.style.display = 'none';
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
	        var _iteratorNormalCompletion3 = true;
	        var _didIteratorError3 = false;
	        var _iteratorError3 = undefined;

	        try {
	            for (var _iterator3 = this.get()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                var elem = _step3.value;

	                elem.addEventListener('keyup', function handleKeyUp() {
	                    var _this = _(this),
	                        search = _this.get().value.toLowerCase(),
	                        _target = _this.closestClass('panel-body').next(),
	                        _rows = _target.find('tbody tr');

	                    if (search === '') {
	                        _rows.show();
	                    } else {
	                        var _iteratorNormalCompletion4 = true;
	                        var _didIteratorError4 = false;
	                        var _iteratorError4 = undefined;

	                        try {
	                            for (var _iterator4 = _rows.get()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                                var row = _step4.value;

	                                row.innerText.toLowerCase().indexOf(search) === -1 ? _(row).hide() : _(row).show();
	                            }
	                        } catch (err) {
	                            _didIteratorError4 = true;
	                            _iteratorError4 = err;
	                        } finally {
	                            try {
	                                if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                                    _iterator4.return();
	                                }
	                            } finally {
	                                if (_didIteratorError4) {
	                                    throw _iteratorError4;
	                                }
	                            }
	                        }
	                    }
	                });
	            }
	        } catch (err) {
	            _didIteratorError3 = true;
	            _iteratorError3 = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                    _iterator3.return();
	                }
	            } finally {
	                if (_didIteratorError3) {
	                    throw _iteratorError3;
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
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(5);
	var bind = __webpack_require__(6);
	var Axios = __webpack_require__(7);
	var defaults = __webpack_require__(8);

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
	axios.Cancel = __webpack_require__(26);
	axios.CancelToken = __webpack_require__(27);
	axios.isCancel = __webpack_require__(23);

	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(28);

	module.exports = axios;

	// Allow use of default import syntax in TypeScript
	module.exports.default = axios;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bind = __webpack_require__(6);

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
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defaults = __webpack_require__(8);
	var utils = __webpack_require__(5);
	var InterceptorManager = __webpack_require__(20);
	var dispatchRequest = __webpack_require__(21);
	var isAbsoluteURL = __webpack_require__(24);
	var combineURLs = __webpack_require__(25);

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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var utils = __webpack_require__(5);
	var normalizeHeaderName = __webpack_require__(10);

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
	    adapter = __webpack_require__(11);
	  } else if (typeof process !== 'undefined') {
	    // For node use HTTP adapter
	    adapter = __webpack_require__(11);
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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ },
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(5);

	module.exports = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var utils = __webpack_require__(5);
	var settle = __webpack_require__(12);
	var buildURL = __webpack_require__(15);
	var parseHeaders = __webpack_require__(16);
	var isURLSameOrigin = __webpack_require__(17);
	var createError = __webpack_require__(13);
	var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(18);

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
	      var cookies = __webpack_require__(19);

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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createError = __webpack_require__(13);

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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var enhanceError = __webpack_require__(14);

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
/* 14 */
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(5);

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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(5);

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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(5);

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
/* 18 */
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(5);

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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(5);

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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(5);
	var transformData = __webpack_require__(22);
	var isCancel = __webpack_require__(23);
	var defaults = __webpack_require__(8);

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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(5);

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
/* 23 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};


/***/ },
/* 24 */
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
/* 25 */
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
/* 26 */
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Cancel = __webpack_require__(26);

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
/* 28 */
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
/* 29 */
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


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(31);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// Prepare cssTransformation
	var transform;

	var options = {}
	options.transform = transform
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, options);
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./node_modules/css-loader/index.js!./node_modules/postcss-loader/lib/index.js!./node_modules/sass-loader/lib/loader.js!./styles.scss", function() {
				var newContent = require("!!./node_modules/css-loader/index.js!./node_modules/postcss-loader/lib/index.js!./node_modules/sass-loader/lib/loader.js!./styles.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)(undefined);
	// imports


	// module
	exports.push([module.id, "body.swal2-shown {\n  overflow-y: hidden; }\n\nbody.swal2-iosfix {\n  position: fixed;\n  left: 0;\n  right: 0; }\n\n.swal2-container {\n  display: flex;\n  align-items: center;\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  padding: 10px;\n  background-color: transparent;\n  z-index: 1060; }\n  .swal2-container.swal2-fade {\n    transition: background-color .1s; }\n  .swal2-container.swal2-shown {\n    background-color: rgba(0, 0, 0, 0.4); }\n\n.swal2-modal {\n  background-color: #fff;\n  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\n  border-radius: 5px;\n  box-sizing: border-box;\n  text-align: center;\n  margin: auto;\n  overflow-x: hidden;\n  overflow-y: auto;\n  display: none;\n  position: relative;\n  max-width: 100%; }\n  .swal2-modal:focus {\n    outline: none; }\n  .swal2-modal.swal2-loading {\n    overflow-y: hidden; }\n  .swal2-modal .swal2-title {\n    color: #595959;\n    font-size: 30px;\n    text-align: center;\n    font-weight: 600;\n    text-transform: none;\n    position: relative;\n    margin: 0 0 .4em;\n    padding: 0;\n    display: block;\n    word-wrap: break-word; }\n  .swal2-modal .swal2-buttonswrapper {\n    margin-top: 15px; }\n    .swal2-modal .swal2-buttonswrapper:not(.swal2-loading) .swal2-styled[disabled] {\n      opacity: .4;\n      cursor: no-drop; }\n    .swal2-modal .swal2-buttonswrapper.swal2-loading .swal2-styled.swal2-confirm {\n      box-sizing: border-box;\n      border: 4px solid transparent;\n      border-color: transparent;\n      width: 40px;\n      height: 40px;\n      padding: 0;\n      margin: 7.5px;\n      vertical-align: top;\n      background-color: transparent !important;\n      color: transparent;\n      cursor: default;\n      border-radius: 100%;\n      animation: rotate-loading 1.5s linear 0s infinite normal;\n      user-select: none; }\n    .swal2-modal .swal2-buttonswrapper.swal2-loading .swal2-styled.swal2-cancel {\n      margin-left: 30px;\n      margin-right: 30px; }\n    .swal2-modal .swal2-buttonswrapper.swal2-loading :not(.swal2-styled).swal2-confirm::after {\n      display: inline-block;\n      content: '';\n      margin-left: 5px 0 15px;\n      vertical-align: -1px;\n      height: 15px;\n      width: 15px;\n      border: 3px solid #999999;\n      box-shadow: 1px 1px 1px #fff;\n      border-right-color: transparent;\n      border-radius: 50%;\n      animation: rotate-loading 1.5s linear 0s infinite normal; }\n  .swal2-modal .swal2-styled {\n    border: 0;\n    border-radius: 3px;\n    box-shadow: none;\n    color: #fff;\n    cursor: pointer;\n    font-size: 17px;\n    font-weight: 500;\n    margin: 15px 5px 0;\n    padding: 10px 32px; }\n  .swal2-modal .swal2-image {\n    margin: 20px auto;\n    max-width: 100%; }\n  .swal2-modal .swal2-close {\n    background: transparent;\n    border: 0;\n    margin: 0;\n    padding: 0;\n    width: 38px;\n    height: 40px;\n    font-size: 36px;\n    line-height: 40px;\n    font-family: serif;\n    position: absolute;\n    top: 5px;\n    right: 8px;\n    cursor: pointer;\n    color: #cccccc;\n    transition: color .1s ease; }\n    .swal2-modal .swal2-close:hover {\n      color: #d55; }\n  .swal2-modal > .swal2-input,\n  .swal2-modal > .swal2-file,\n  .swal2-modal > .swal2-textarea,\n  .swal2-modal > .swal2-select,\n  .swal2-modal > .swal2-radio,\n  .swal2-modal > .swal2-checkbox {\n    display: none; }\n  .swal2-modal .swal2-content {\n    font-size: 18px;\n    text-align: center;\n    font-weight: 300;\n    position: relative;\n    float: none;\n    margin: 0;\n    padding: 0;\n    line-height: normal;\n    color: #545454;\n    word-wrap: break-word; }\n  .swal2-modal .swal2-input,\n  .swal2-modal .swal2-file,\n  .swal2-modal .swal2-textarea,\n  .swal2-modal .swal2-select,\n  .swal2-modal .swal2-radio,\n  .swal2-modal .swal2-checkbox {\n    margin: 20px auto; }\n  .swal2-modal .swal2-input,\n  .swal2-modal .swal2-file,\n  .swal2-modal .swal2-textarea {\n    width: 100%;\n    box-sizing: border-box;\n    font-size: 18px;\n    border-radius: 3px;\n    border: 1px solid #d9d9d9;\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06);\n    transition: border-color box-shadow .3s; }\n    .swal2-modal .swal2-input.swal2-inputerror,\n    .swal2-modal .swal2-file.swal2-inputerror,\n    .swal2-modal .swal2-textarea.swal2-inputerror {\n      border-color: #f27474 !important;\n      box-shadow: 0 0 2px #f27474 !important; }\n    .swal2-modal .swal2-input:focus,\n    .swal2-modal .swal2-file:focus,\n    .swal2-modal .swal2-textarea:focus {\n      outline: none;\n      border: 1px solid #b4dbed;\n      box-shadow: 0 0 3px #c4e6f5; }\n      .swal2-modal .swal2-input:focus::placeholder,\n      .swal2-modal .swal2-file:focus::placeholder,\n      .swal2-modal .swal2-textarea:focus::placeholder {\n        transition: opacity .3s .03s ease;\n        opacity: .8; }\n    .swal2-modal .swal2-input::placeholder,\n    .swal2-modal .swal2-file::placeholder,\n    .swal2-modal .swal2-textarea::placeholder {\n      color: #e6e6e6; }\n  .swal2-modal .swal2-range input {\n    float: left;\n    width: 80%; }\n  .swal2-modal .swal2-range output {\n    float: right;\n    width: 20%;\n    font-size: 20px;\n    font-weight: 600;\n    text-align: center; }\n  .swal2-modal .swal2-range input,\n  .swal2-modal .swal2-range output {\n    height: 43px;\n    line-height: 43px;\n    vertical-align: middle;\n    margin: 20px auto;\n    padding: 0; }\n  .swal2-modal .swal2-input {\n    height: 43px;\n    padding: 0 12px; }\n    .swal2-modal .swal2-input[type='number'] {\n      max-width: 150px; }\n  .swal2-modal .swal2-file {\n    font-size: 20px; }\n  .swal2-modal .swal2-textarea {\n    height: 108px;\n    padding: 12px; }\n  .swal2-modal .swal2-select {\n    color: #545454;\n    font-size: inherit;\n    padding: 5px 10px;\n    min-width: 40%;\n    max-width: 100%; }\n  .swal2-modal .swal2-radio {\n    border: 0; }\n    .swal2-modal .swal2-radio label:not(:first-child) {\n      margin-left: 20px; }\n    .swal2-modal .swal2-radio input,\n    .swal2-modal .swal2-radio span {\n      vertical-align: middle; }\n    .swal2-modal .swal2-radio input {\n      margin: 0 3px 0 0; }\n  .swal2-modal .swal2-checkbox {\n    color: #545454; }\n    .swal2-modal .swal2-checkbox input,\n    .swal2-modal .swal2-checkbox span {\n      vertical-align: middle; }\n  .swal2-modal .swal2-validationerror {\n    background-color: #f0f0f0;\n    margin: 0 -20px;\n    overflow: hidden;\n    padding: 10px;\n    color: gray;\n    font-size: 16px;\n    font-weight: 300;\n    display: none; }\n    .swal2-modal .swal2-validationerror::before {\n      content: '!';\n      display: inline-block;\n      width: 24px;\n      height: 24px;\n      border-radius: 50%;\n      background-color: #ea7d7d;\n      color: #fff;\n      line-height: 24px;\n      text-align: center;\n      margin-right: 10px; }\n\n@supports (-ms-accelerator: true) {\n  .swal2-range input {\n    width: 100% !important; }\n  .swal2-range output {\n    display: none; } }\n\n@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n  .swal2-range input {\n    width: 100% !important; }\n  .swal2-range output {\n    display: none; } }\n\n.swal2-icon {\n  width: 80px;\n  height: 80px;\n  border: 4px solid transparent;\n  border-radius: 50%;\n  margin: 20px auto 30px;\n  padding: 0;\n  position: relative;\n  box-sizing: content-box;\n  cursor: default;\n  user-select: none; }\n  .swal2-icon.swal2-error {\n    border-color: #f27474; }\n    .swal2-icon.swal2-error .swal2-x-mark {\n      position: relative;\n      display: block; }\n    .swal2-icon.swal2-error [class^='swal2-x-mark-line'] {\n      position: absolute;\n      height: 5px;\n      width: 47px;\n      background-color: #f27474;\n      display: block;\n      top: 37px;\n      border-radius: 2px; }\n      .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='left'] {\n        transform: rotate(45deg);\n        left: 17px; }\n      .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='right'] {\n        transform: rotate(-45deg);\n        right: 16px; }\n  .swal2-icon.swal2-warning {\n    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\n    color: #f8bb86;\n    border-color: #facea8;\n    font-size: 60px;\n    line-height: 80px;\n    text-align: center; }\n  .swal2-icon.swal2-info {\n    font-family: 'Open Sans', sans-serif;\n    color: #3fc3ee;\n    border-color: #9de0f6;\n    font-size: 60px;\n    line-height: 80px;\n    text-align: center; }\n  .swal2-icon.swal2-question {\n    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\n    color: #87adbd;\n    border-color: #c9dae1;\n    font-size: 60px;\n    line-height: 80px;\n    text-align: center; }\n  .swal2-icon.swal2-success {\n    border-color: #a5dc86; }\n    .swal2-icon.swal2-success [class^='swal2-success-circular-line'] {\n      border-radius: 50%;\n      position: absolute;\n      width: 60px;\n      height: 120px;\n      transform: rotate(45deg); }\n      .swal2-icon.swal2-success [class^='swal2-success-circular-line'][class$='left'] {\n        border-radius: 120px 0 0 120px;\n        top: -7px;\n        left: -33px;\n        transform: rotate(-45deg);\n        transform-origin: 60px 60px; }\n      .swal2-icon.swal2-success [class^='swal2-success-circular-line'][class$='right'] {\n        border-radius: 0 120px 120px 0;\n        top: -11px;\n        left: 30px;\n        transform: rotate(-45deg);\n        transform-origin: 0 60px; }\n    .swal2-icon.swal2-success .swal2-success-ring {\n      width: 80px;\n      height: 80px;\n      border: 4px solid rgba(165, 220, 134, 0.2);\n      border-radius: 50%;\n      box-sizing: content-box;\n      position: absolute;\n      left: -4px;\n      top: -4px;\n      z-index: 2; }\n    .swal2-icon.swal2-success .swal2-success-fix {\n      width: 7px;\n      height: 90px;\n      position: absolute;\n      left: 28px;\n      top: 8px;\n      z-index: 1;\n      transform: rotate(-45deg); }\n    .swal2-icon.swal2-success [class^='swal2-success-line'] {\n      height: 5px;\n      background-color: #a5dc86;\n      display: block;\n      border-radius: 2px;\n      position: absolute;\n      z-index: 2; }\n      .swal2-icon.swal2-success [class^='swal2-success-line'][class$='tip'] {\n        width: 25px;\n        left: 14px;\n        top: 46px;\n        transform: rotate(45deg); }\n      .swal2-icon.swal2-success [class^='swal2-success-line'][class$='long'] {\n        width: 47px;\n        right: 8px;\n        top: 38px;\n        transform: rotate(-45deg); }\n\n.swal2-progresssteps {\n  font-weight: 600;\n  margin: 0 0 20px;\n  padding: 0; }\n  .swal2-progresssteps li {\n    display: inline-block;\n    position: relative; }\n  .swal2-progresssteps .swal2-progresscircle {\n    background: #3085d6;\n    border-radius: 2em;\n    color: #fff;\n    height: 2em;\n    line-height: 2em;\n    text-align: center;\n    width: 2em;\n    z-index: 20; }\n    .swal2-progresssteps .swal2-progresscircle:first-child {\n      margin-left: 0; }\n    .swal2-progresssteps .swal2-progresscircle:last-child {\n      margin-right: 0; }\n    .swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep {\n      background: #3085d6; }\n      .swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep ~ .swal2-progresscircle {\n        background: #add8e6; }\n      .swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep ~ .swal2-progressline {\n        background: #add8e6; }\n  .swal2-progresssteps .swal2-progressline {\n    background: #3085d6;\n    height: .4em;\n    margin: 0 -1px;\n    z-index: 10; }\n\n[class^='swal2'] {\n  -webkit-tap-highlight-color: transparent; }\n\n@keyframes showSweetAlert {\n  0% {\n    transform: scale(0.7); }\n  45% {\n    transform: scale(1.05); }\n  80% {\n    transform: scale(0.95); }\n  100% {\n    transform: scale(1); } }\n\n@keyframes hideSweetAlert {\n  0% {\n    transform: scale(1);\n    opacity: 1; }\n  100% {\n    transform: scale(0.5);\n    opacity: 0; } }\n\n.swal2-show {\n  animation: showSweetAlert 0.3s; }\n  .swal2-show.swal2-noanimation {\n    animation: none; }\n\n.swal2-hide {\n  animation: hideSweetAlert 0.15s forwards; }\n  .swal2-hide.swal2-noanimation {\n    animation: none; }\n\n@keyframes animate-success-tip {\n  0% {\n    width: 0;\n    left: 1px;\n    top: 19px; }\n  54% {\n    width: 0;\n    left: 1px;\n    top: 19px; }\n  70% {\n    width: 50px;\n    left: -8px;\n    top: 37px; }\n  84% {\n    width: 17px;\n    left: 21px;\n    top: 48px; }\n  100% {\n    width: 25px;\n    left: 14px;\n    top: 45px; } }\n\n@keyframes animate-success-long {\n  0% {\n    width: 0;\n    right: 46px;\n    top: 54px; }\n  65% {\n    width: 0;\n    right: 46px;\n    top: 54px; }\n  84% {\n    width: 55px;\n    right: 0;\n    top: 35px; }\n  100% {\n    width: 47px;\n    right: 8px;\n    top: 38px; } }\n\n@keyframes rotatePlaceholder {\n  0% {\n    transform: rotate(-45deg); }\n  5% {\n    transform: rotate(-45deg); }\n  12% {\n    transform: rotate(-405deg); }\n  100% {\n    transform: rotate(-405deg); } }\n\n.swal2-animate-success-line-tip {\n  animation: animate-success-tip 0.75s; }\n\n.swal2-animate-success-line-long {\n  animation: animate-success-long 0.75s; }\n\n.swal2-success.swal2-animate-success-icon .swal2-success-circular-line-right {\n  animation: rotatePlaceholder 4.25s ease-in; }\n\n@keyframes animate-error-icon {\n  0% {\n    transform: rotateX(100deg);\n    opacity: 0; }\n  100% {\n    transform: rotateX(0deg);\n    opacity: 1; } }\n\n.swal2-animate-error-icon {\n  animation: animate-error-icon 0.5s; }\n\n@keyframes animate-x-mark {\n  0% {\n    transform: scale(0.4);\n    margin-top: 26px;\n    opacity: 0; }\n  50% {\n    transform: scale(0.4);\n    margin-top: 26px;\n    opacity: 0; }\n  80% {\n    transform: scale(1.15);\n    margin-top: -6px; }\n  100% {\n    transform: scale(1);\n    margin-top: 0;\n    opacity: 1; } }\n\n.swal2-animate-x-mark {\n  animation: animate-x-mark 0.5s; }\n\n@keyframes rotate-loading {\n  0% {\n    transform: rotate(0deg); }\n  100% {\n    transform: rotate(360deg); } }\n\n.stylish-input-group .input-group-addon {\n  background: white !important; }\n\n.stylish-input-group .form-control {\n  border-right: 0;\n  box-shadow: 0 0 0;\n  border-color: #ccc; }\n\n.stylish-input-group button {\n  border: 0;\n  background: transparent; }\n\n.clickable {\n  cursor: pointer; }\n\n.panel-heading div {\n  margin-top: -18px;\n  font-size: 15px; }\n  .panel-heading div span {\n    margin-left: 5px; }\n\n.panel-body {\n  display: none; }\n\n.row {\n  margin-top: 20px; }\n", ""]);

	// exports


/***/ },
/* 32 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function(useSourceMap) {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			return this.map(function (item) {
				var content = cssWithMappingToString(item, useSourceMap);
				if(item[2]) {
					return "@media " + item[2] + "{" + content + "}";
				} else {
					return content;
				}
			}).join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

	function cssWithMappingToString(item, useSourceMap) {
		var content = item[1] || '';
		var cssMapping = item[3];
		if (!cssMapping) {
			return content;
		}

		if (useSourceMap && typeof btoa === 'function') {
			var sourceMapping = toComment(cssMapping);
			var sourceURLs = cssMapping.sources.map(function (source) {
				return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
			});

			return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
		}

		return [content].join('\n');
	}

	// Adapted from convert-source-map (MIT)
	function toComment(sourceMap) {
		// eslint-disable-next-line no-undef
		var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
		var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

		return '/*# ' + data + ' */';
	}


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/

	var stylesInDom = {};

	var	memoize = function (fn) {
		var memo;

		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	};

	var isOldIE = memoize(function () {
		// Test for IE <= 9 as proposed by Browserhacks
		// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
		// Tests for existence of standard globals is to allow style-loader
		// to operate correctly into non-standard environments
		// @see https://github.com/webpack-contrib/style-loader/issues/177
		return window && document && document.all && !window.atob;
	});

	var getElement = (function (fn) {
		var memo = {};

		return function(selector) {
			if (typeof memo[selector] === "undefined") {
				memo[selector] = fn.call(this, selector);
			}

			return memo[selector]
		};
	})(function (target) {
		return document.querySelector(target)
	});

	var singleton = null;
	var	singletonCounter = 0;
	var	stylesInsertedAtTop = [];

	var	fixUrls = __webpack_require__(34);

	module.exports = function(list, options) {
		if (false) {
			if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};

		options.attrs = typeof options.attrs === "object" ? options.attrs : {};

		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (!options.singleton) options.singleton = isOldIE();

		// By default, add <style> tags to the <head> element
		if (!options.insertInto) options.insertInto = "head";

		// By default, add <style> tags to the bottom of the target
		if (!options.insertAt) options.insertAt = "bottom";

		var styles = listToStyles(list, options);

		addStylesToDom(styles, options);

		return function update (newList) {
			var mayRemove = [];

			for (var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];

				domStyle.refs--;
				mayRemove.push(domStyle);
			}

			if(newList) {
				var newStyles = listToStyles(newList, options);
				addStylesToDom(newStyles, options);
			}

			for (var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];

				if(domStyle.refs === 0) {
					for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

					delete stylesInDom[domStyle.id];
				}
			}
		};
	};

	function addStylesToDom (styles, options) {
		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			if(domStyle) {
				domStyle.refs++;

				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}

				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];

				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}

				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles (list, options) {
		var styles = [];
		var newStyles = {};

		for (var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = options.base ? item[0] + options.base : item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};

			if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
			else newStyles[id].parts.push(part);
		}

		return styles;
	}

	function insertStyleElement (options, style) {
		var target = getElement(options.insertInto)

		if (!target) {
			throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
		}

		var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

		if (options.insertAt === "top") {
			if (!lastStyleElementInsertedAtTop) {
				target.insertBefore(style, target.firstChild);
			} else if (lastStyleElementInsertedAtTop.nextSibling) {
				target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				target.appendChild(style);
			}
			stylesInsertedAtTop.push(style);
		} else if (options.insertAt === "bottom") {
			target.appendChild(style);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement (style) {
		if (style.parentNode === null) return false;
		style.parentNode.removeChild(style);

		var idx = stylesInsertedAtTop.indexOf(style);
		if(idx >= 0) {
			stylesInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement (options) {
		var style = document.createElement("style");

		options.attrs.type = "text/css";

		addAttrs(style, options.attrs);
		insertStyleElement(options, style);

		return style;
	}

	function createLinkElement (options) {
		var link = document.createElement("link");

		options.attrs.type = "text/css";
		options.attrs.rel = "stylesheet";

		addAttrs(link, options.attrs);
		insertStyleElement(options, link);

		return link;
	}

	function addAttrs (el, attrs) {
		Object.keys(attrs).forEach(function (key) {
			el.setAttribute(key, attrs[key]);
		});
	}

	function addStyle (obj, options) {
		var style, update, remove, result;

		// If a transform function was defined, run it on the css
		if (options.transform && obj.css) {
		    result = options.transform(obj.css);

		    if (result) {
		    	// If transform returns a value, use that instead of the original css.
		    	// This allows running runtime transformations on the css.
		    	obj.css = result;
		    } else {
		    	// If the transform function returns a falsy value, don't add this css.
		    	// This allows conditional loading of css
		    	return function() {
		    		// noop
		    	};
		    }
		}

		if (options.singleton) {
			var styleIndex = singletonCounter++;

			style = singleton || (singleton = createStyleElement(options));

			update = applyToSingletonTag.bind(null, style, styleIndex, false);
			remove = applyToSingletonTag.bind(null, style, styleIndex, true);

		} else if (
			obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function"
		) {
			style = createLinkElement(options);
			update = updateLink.bind(null, style, options);
			remove = function () {
				removeStyleElement(style);

				if(style.href) URL.revokeObjectURL(style.href);
			};
		} else {
			style = createStyleElement(options);
			update = applyToTag.bind(null, style);
			remove = function () {
				removeStyleElement(style);
			};
		}

		update(obj);

		return function updateStyle (newObj) {
			if (newObj) {
				if (
					newObj.css === obj.css &&
					newObj.media === obj.media &&
					newObj.sourceMap === obj.sourceMap
				) {
					return;
				}

				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;

			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag (style, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (style.styleSheet) {
			style.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = style.childNodes;

			if (childNodes[index]) style.removeChild(childNodes[index]);

			if (childNodes.length) {
				style.insertBefore(cssNode, childNodes[index]);
			} else {
				style.appendChild(cssNode);
			}
		}
	}

	function applyToTag (style, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			style.setAttribute("media", media)
		}

		if(style.styleSheet) {
			style.styleSheet.cssText = css;
		} else {
			while(style.firstChild) {
				style.removeChild(style.firstChild);
			}

			style.appendChild(document.createTextNode(css));
		}
	}

	function updateLink (link, options, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		/*
			If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
			and there is no publicPath defined then lets turn convertToAbsoluteUrls
			on by default.  Otherwise default to the convertToAbsoluteUrls option
			directly
		*/
		var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

		if (options.convertToAbsoluteUrls || autoFixUrls) {
			css = fixUrls(css);
		}

		if (sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = link.href;

		link.href = URL.createObjectURL(blob);

		if(oldSrc) URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 34 */
/***/ function(module, exports) {

	
	/**
	 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
	 * embed the css on the page. This breaks all relative urls because now they are relative to a
	 * bundle instead of the current page.
	 *
	 * One solution is to only use full urls, but that may be impossible.
	 *
	 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
	 *
	 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
	 *
	 */

	module.exports = function (css) {
	  // get current location
	  var location = typeof window !== "undefined" && window.location;

	  if (!location) {
	    throw new Error("fixUrls requires window.location");
	  }

		// blank or null?
		if (!css || typeof css !== "string") {
		  return css;
	  }

	  var baseUrl = location.protocol + "//" + location.host;
	  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

		// convert each url(...)
		/*
		This regular expression is just a way to recursively match brackets within
		a string.

		 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
		   (  = Start a capturing group
		     (?:  = Start a non-capturing group
		         [^)(]  = Match anything that isn't a parentheses
		         |  = OR
		         \(  = Match a start parentheses
		             (?:  = Start another non-capturing groups
		                 [^)(]+  = Match anything that isn't a parentheses
		                 |  = OR
		                 \(  = Match a start parentheses
		                     [^)(]*  = Match anything that isn't a parentheses
		                 \)  = Match a end parentheses
		             )  = End Group
	              *\) = Match anything and then a close parens
	          )  = Close non-capturing group
	          *  = Match anything
	       )  = Close capturing group
		 \)  = Match a close parens

		 /gi  = Get all matches, not the first.  Be case insensitive.
		 */
		var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
			// strip quotes (if they exist)
			var unquotedOrigUrl = origUrl
				.trim()
				.replace(/^"(.*)"$/, function(o, $1){ return $1; })
				.replace(/^'(.*)'$/, function(o, $1){ return $1; });

			// already a full url? no change
			if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			  return fullMatch;
			}

			// convert the url to a full url
			var newUrl;

			if (unquotedOrigUrl.indexOf("//") === 0) {
			  	//TODO: should we add protocol?
				newUrl = unquotedOrigUrl;
			} else if (unquotedOrigUrl.indexOf("/") === 0) {
				// path should be relative to the base url
				newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
			} else {
				// path should be relative to current directory
				newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
			}

			// send back the fixed url(...)
			return "url(" + JSON.stringify(newUrl) + ")";
		});

		// send back the fixed css
		return fixedCss;
	};


/***/ }
/******/ ]);