"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // extension/taxlib.js
  var INVALID_AMOUNT_MESSAGE = "Amount is invalid.";
  var INVALID_SCALE_MESSAGE = "Scale is invalid.";
  var UNEQUAL_CURRENCIES_MESSAGE = "Objects must have the same currency.";
  var NON_DECIMAL_CURRENCY_MESSAGE = "Currency is not decimal.";
  function assert(condition, message) {
    if (!condition) {
      throw new Error("[Dinero.js] ".concat(message));
    }
  }
  function createDinero(_ref) {
    var calculator2 = _ref.calculator, onCreate2 = _ref.onCreate, _ref$formatter = _ref.formatter, formatter = _ref$formatter === void 0 ? {
      toNumber: Number,
      toString: String
    } : _ref$formatter;
    return function dinero2(_ref2) {
      var amount = _ref2.amount, _ref2$currency = _ref2.currency, code = _ref2$currency.code, base = _ref2$currency.base, exponent = _ref2$currency.exponent, _ref2$scale = _ref2.scale, scale = _ref2$scale === void 0 ? exponent : _ref2$scale;
      var currency = {
        code,
        base,
        exponent
      };
      onCreate2 === null || onCreate2 === void 0 ? void 0 : onCreate2({
        amount,
        currency,
        scale
      });
      return {
        calculator: calculator2,
        formatter,
        create: dinero2,
        toJSON: function toJSON() {
          return {
            amount,
            currency,
            scale
          };
        }
      };
    };
  }
  var ComparisonOperator;
  (function(ComparisonOperator2) {
    ComparisonOperator2[ComparisonOperator2["LT"] = -1] = "LT";
    ComparisonOperator2[ComparisonOperator2["EQ"] = 0] = "EQ";
    ComparisonOperator2[ComparisonOperator2["GT"] = 1] = "GT";
  })(ComparisonOperator || (ComparisonOperator = {}));
  function equal(calculator2) {
    return function(subject, comparator) {
      return calculator2.compare(subject, comparator) === ComparisonOperator.EQ;
    };
  }
  function lessThan(calculator2) {
    return function(subject, comparator) {
      return calculator2.compare(subject, comparator) === ComparisonOperator.LT;
    };
  }
  function absolute(calculator2) {
    var equalFn = equal(calculator2);
    var lessThanFn = lessThan(calculator2);
    var zero2 = calculator2.zero();
    return function(input) {
      if (equalFn(input, zero2)) {
        return zero2;
      }
      if (lessThanFn(input, zero2)) {
        var minusOne = calculator2.decrement(zero2);
        return calculator2.multiply(minusOne, input);
      }
      return input;
    };
  }
  function isArray(maybeArray) {
    return Array.isArray(maybeArray);
  }
  function computeBase(calculator2) {
    return function(base) {
      if (isArray(base)) {
        return base.reduce(function(acc, curr) {
          return calculator2.multiply(acc, curr);
        });
      }
      return base;
    };
  }
  function countTrailingZeros(calculator2) {
    var equalFn = equal(calculator2);
    return function(input, base) {
      var zero2 = calculator2.zero();
      if (equalFn(zero2, input)) {
        return calculator2.zero();
      }
      var i = zero2;
      var temp = input;
      while (equalFn(calculator2.modulo(temp, base), zero2)) {
        temp = calculator2.integerDivide(temp, base);
        i = calculator2.increment(i);
      }
      return i;
    };
  }
  function greaterThan(calculator2) {
    return function(subject, comparator) {
      return calculator2.compare(subject, comparator) === ComparisonOperator.GT;
    };
  }
  function greaterThanOrEqual(calculator2) {
    return function(subject, comparator) {
      return greaterThan(calculator2)(subject, comparator) || equal(calculator2)(subject, comparator);
    };
  }
  function isScaledAmount(amount) {
    return amount === null || amount === void 0 ? void 0 : amount.hasOwnProperty("amount");
  }
  function getAmountAndScale(value, zero2) {
    if (isScaledAmount(value)) {
      var _value$scale;
      return {
        amount: value.amount,
        scale: (_value$scale = value === null || value === void 0 ? void 0 : value.scale) !== null && _value$scale !== void 0 ? _value$scale : zero2
      };
    }
    return {
      amount: value,
      scale: zero2
    };
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray(o, minLen);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
      return Array.from(iter);
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr))
      return _arrayLikeToArray(arr);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  function getDivisors(calculator2) {
    var multiply5 = calculator2.multiply;
    return function(bases) {
      return bases.reduce(function(divisors, _, i) {
        var divisor = bases.slice(i).reduce(function(acc, curr) {
          return multiply5(acc, curr);
        });
        return [].concat(_toConsumableArray(divisors), [divisor]);
      }, []);
    };
  }
  function isEven(calculator2) {
    var equalFn = equal(calculator2);
    var zero2 = calculator2.zero();
    var two = calculator2.increment(calculator2.increment(zero2));
    return function(input) {
      return equalFn(calculator2.modulo(input, two), zero2);
    };
  }
  function isHalf(calculator2) {
    var equalFn = equal(calculator2);
    var absoluteFn = absolute(calculator2);
    return function(input, total) {
      var remainder = absoluteFn(calculator2.modulo(input, total));
      var difference = calculator2.subtract(total, remainder);
      return equalFn(difference, remainder);
    };
  }
  function lessThanOrEqual(calculator2) {
    return function(subject, comparator) {
      return lessThan(calculator2)(subject, comparator) || equal(calculator2)(subject, comparator);
    };
  }
  function maximum(calculator2) {
    var lessThanFn = lessThan(calculator2);
    return function(values) {
      return values.reduce(function(acc, curr) {
        return lessThanFn(acc, curr) ? curr : acc;
      });
    };
  }
  function minimum(calculator2) {
    var greaterThanFn = greaterThan(calculator2);
    return function(values) {
      return values.reduce(function(acc, curr) {
        return greaterThanFn(acc, curr) ? curr : acc;
      });
    };
  }
  function _toArray(arr) {
    return _arrayWithHoles(arr) || _iterableToArray2(arr) || _unsupportedIterableToArray2(arr) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray2(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray2(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray2(o, minLen);
  }
  function _arrayLikeToArray2(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  function _iterableToArray2(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
      return Array.from(iter);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function haveSameCurrency(dineroObjects) {
    var _dineroObjects = _toArray(dineroObjects), firstDinero = _dineroObjects[0], otherDineros = _dineroObjects.slice(1);
    var computeBaseFn = computeBase(firstDinero.calculator);
    var _firstDinero$toJSON = firstDinero.toJSON(), comparator = _firstDinero$toJSON.currency;
    var equalFn = equal(firstDinero.calculator);
    var comparatorBase = computeBaseFn(comparator.base);
    return otherDineros.every(function(d) {
      var _d$toJSON = d.toJSON(), subject = _d$toJSON.currency;
      var subjectBase = computeBaseFn(subject.base);
      return subject.code === comparator.code && equalFn(subjectBase, comparatorBase) && equalFn(subject.exponent, comparator.exponent);
    });
  }
  var down = function down2(amount, factor, calculator2) {
    var greaterThanFn = greaterThan(calculator2);
    var equalFn = equal(calculator2);
    var zero2 = calculator2.zero();
    var isPositive = greaterThanFn(amount, zero2);
    var quotient = calculator2.integerDivide(amount, factor);
    var remainder = calculator2.modulo(amount, factor);
    var isInteger = equalFn(remainder, zero2);
    if (isPositive || isInteger) {
      return quotient;
    }
    return calculator2.decrement(quotient);
  };
  var halfEven = function halfEven2(amount, factor, calculator2) {
    var isEvenFn = isEven(calculator2);
    var isHalfFn = isHalf(calculator2);
    var rounded = halfUp(amount, factor, calculator2);
    if (!isHalfFn(amount, factor)) {
      return rounded;
    }
    return isEvenFn(rounded) ? rounded : calculator2.decrement(rounded);
  };
  var halfUp = function halfUp2(amount, factor, calculator2) {
    var greaterThanFn = greaterThan(calculator2);
    var isHalfFn = isHalf(calculator2);
    var absoluteFn = absolute(calculator2);
    var zero2 = calculator2.zero();
    var remainder = absoluteFn(calculator2.modulo(amount, factor));
    var difference = calculator2.subtract(factor, remainder);
    var isLessThanHalf = greaterThanFn(difference, remainder);
    var isPositive = greaterThanFn(amount, zero2);
    if (isHalfFn(amount, factor) || isPositive && !isLessThanHalf || !isPositive && isLessThanHalf) {
      return up(amount, factor, calculator2);
    }
    return down(amount, factor, calculator2);
  };
  var up = function up2(amount, factor, calculator2) {
    var greaterThanFn = greaterThan(calculator2);
    var equalFn = equal(calculator2);
    var zero2 = calculator2.zero();
    var isPositive = greaterThanFn(amount, zero2);
    var quotient = calculator2.integerDivide(amount, factor);
    var remainder = calculator2.modulo(amount, factor);
    var isInteger = equalFn(remainder, zero2);
    if (!isInteger && isPositive) {
      return calculator2.increment(quotient);
    }
    return quotient;
  };
  function _slicedToArray(arr, i) {
    return _arrayWithHoles2(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray3(arr, i) || _nonIterableRest2();
  }
  function _nonIterableRest2() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray3(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray3(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray3(o, minLen);
  }
  function _arrayLikeToArray3(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null)
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
          break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null)
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  function _arrayWithHoles2(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function transformScale(calculator2) {
    var greaterThanFn = greaterThan(calculator2);
    var computeBaseFn = computeBase(calculator2);
    return function transformScaleFn() {
      for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
        _ref[_key] = arguments[_key];
      }
      var dineroObject = _ref[0], newScale = _ref[1], _ref$ = _ref[2], divide = _ref$ === void 0 ? down : _ref$;
      var _dineroObject$toJSON = dineroObject.toJSON(), amount = _dineroObject$toJSON.amount, currency = _dineroObject$toJSON.currency, scale = _dineroObject$toJSON.scale;
      var isLarger = greaterThanFn(newScale, scale);
      var operation = isLarger ? calculator2.multiply : divide;
      var _ref2 = isLarger ? [newScale, scale] : [scale, newScale], _ref3 = _slicedToArray(_ref2, 2), a = _ref3[0], b = _ref3[1];
      var base = computeBaseFn(currency.base);
      var factor = calculator2.power(base, calculator2.subtract(a, b));
      return dineroObject.create({
        amount: operation(amount, factor, calculator2),
        currency,
        scale: newScale
      });
    };
  }
  function normalizeScale(calculator2) {
    var maximumFn = maximum(calculator2);
    var convertScaleFn = transformScale(calculator2);
    var equalFn = equal(calculator2);
    return function _normalizeScale() {
      for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
        _ref[_key] = arguments[_key];
      }
      var dineroObjects = _ref[0];
      var highestScale = dineroObjects.reduce(function(highest, current) {
        var _current$toJSON = current.toJSON(), scale = _current$toJSON.scale;
        return maximumFn([highest, scale]);
      }, calculator2.zero());
      return dineroObjects.map(function(d) {
        var _d$toJSON = d.toJSON(), scale = _d$toJSON.scale;
        return !equalFn(scale, highestScale) ? convertScaleFn(d, highestScale) : d;
      });
    };
  }
  function _slicedToArray2(arr, i) {
    return _arrayWithHoles3(arr) || _iterableToArrayLimit2(arr, i) || _unsupportedIterableToArray4(arr, i) || _nonIterableRest3();
  }
  function _nonIterableRest3() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray4(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray4(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray4(o, minLen);
  }
  function _arrayLikeToArray4(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  function _iterableToArrayLimit2(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null)
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
          break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null)
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  function _arrayWithHoles3(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function unsafeAdd(calculator2) {
    return function add4() {
      for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
        _ref[_key] = arguments[_key];
      }
      var augend = _ref[0], addend = _ref[1];
      var _augend$toJSON = augend.toJSON(), augendAmount = _augend$toJSON.amount, currency = _augend$toJSON.currency, scale = _augend$toJSON.scale;
      var _addend$toJSON = addend.toJSON(), addendAmount = _addend$toJSON.amount;
      var amount = calculator2.add(augendAmount, addendAmount);
      return augend.create({
        amount,
        currency,
        scale
      });
    };
  }
  function safeAdd(calculator2) {
    var normalizeFn = normalizeScale(calculator2);
    var addFn = unsafeAdd(calculator2);
    return function add4() {
      for (var _len2 = arguments.length, _ref2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        _ref2[_key2] = arguments[_key2];
      }
      var augend = _ref2[0], addend = _ref2[1];
      var condition = haveSameCurrency([augend, addend]);
      assert(condition, UNEQUAL_CURRENCIES_MESSAGE);
      var _normalizeFn = normalizeFn([augend, addend]), _normalizeFn2 = _slicedToArray2(_normalizeFn, 2), newAugend = _normalizeFn2[0], newAddend = _normalizeFn2[1];
      return addFn(newAugend, newAddend);
    };
  }
  function _slicedToArray3(arr, i) {
    return _arrayWithHoles4(arr) || _iterableToArrayLimit3(arr, i) || _unsupportedIterableToArray5(arr, i) || _nonIterableRest4();
  }
  function _nonIterableRest4() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray5(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray5(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray5(o, minLen);
  }
  function _arrayLikeToArray5(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  function _iterableToArrayLimit3(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null)
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
          break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null)
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  function _arrayWithHoles4(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function unsafeGreaterThan(calculator2) {
    var greaterThanFn = greaterThan(calculator2);
    return function greaterThan3() {
      for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
        _ref[_key] = arguments[_key];
      }
      var dineroObject = _ref[0], comparator = _ref[1];
      var dineroObjects = [dineroObject, comparator];
      var _dineroObjects$map = dineroObjects.map(function(d) {
        var _d$toJSON = d.toJSON(), amount = _d$toJSON.amount;
        return amount;
      }), _dineroObjects$map2 = _slicedToArray3(_dineroObjects$map, 2), subjectAmount = _dineroObjects$map2[0], comparatorAmount = _dineroObjects$map2[1];
      return greaterThanFn(subjectAmount, comparatorAmount);
    };
  }
  function safeGreaterThan(calculator2) {
    var normalizeFn = normalizeScale(calculator2);
    var greaterThanFn = unsafeGreaterThan(calculator2);
    return function greaterThan3() {
      for (var _len2 = arguments.length, _ref2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        _ref2[_key2] = arguments[_key2];
      }
      var dineroObject = _ref2[0], comparator = _ref2[1];
      var condition = haveSameCurrency([dineroObject, comparator]);
      assert(condition, UNEQUAL_CURRENCIES_MESSAGE);
      var _normalizeFn = normalizeFn([dineroObject, comparator]), _normalizeFn2 = _slicedToArray3(_normalizeFn, 2), subjectAmount = _normalizeFn2[0], comparatorAmount = _normalizeFn2[1];
      return greaterThanFn(subjectAmount, comparatorAmount);
    };
  }
  function _slicedToArray4(arr, i) {
    return _arrayWithHoles5(arr) || _iterableToArrayLimit4(arr, i) || _unsupportedIterableToArray6(arr, i) || _nonIterableRest5();
  }
  function _nonIterableRest5() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray6(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray6(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray6(o, minLen);
  }
  function _arrayLikeToArray6(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  function _iterableToArrayLimit4(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null)
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
          break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null)
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  function _arrayWithHoles5(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function unsafeGreaterThanOrEqual(calculator2) {
    var greaterThanOrEqualFn = greaterThanOrEqual(calculator2);
    return function greaterThanOrEqual3() {
      for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
        _ref[_key] = arguments[_key];
      }
      var dineroObject = _ref[0], comparator = _ref[1];
      var dineroObjects = [dineroObject, comparator];
      var _dineroObjects$map = dineroObjects.map(function(d) {
        var _d$toJSON = d.toJSON(), amount = _d$toJSON.amount;
        return amount;
      }), _dineroObjects$map2 = _slicedToArray4(_dineroObjects$map, 2), subjectAmount = _dineroObjects$map2[0], comparatorAmount = _dineroObjects$map2[1];
      return greaterThanOrEqualFn(subjectAmount, comparatorAmount);
    };
  }
  function safeGreaterThanOrEqual(calculator2) {
    var normalizeFn = normalizeScale(calculator2);
    var greaterThanOrEqualFn = unsafeGreaterThanOrEqual(calculator2);
    return function greaterThanOrEqual3() {
      for (var _len2 = arguments.length, _ref2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        _ref2[_key2] = arguments[_key2];
      }
      var dineroObject = _ref2[0], comparator = _ref2[1];
      var condition = haveSameCurrency([dineroObject, comparator]);
      assert(condition, UNEQUAL_CURRENCIES_MESSAGE);
      var _normalizeFn = normalizeFn([dineroObject, comparator]), _normalizeFn2 = _slicedToArray4(_normalizeFn, 2), subjectAmount = _normalizeFn2[0], comparatorAmount = _normalizeFn2[1];
      return greaterThanOrEqualFn(subjectAmount, comparatorAmount);
    };
  }
  function isZero(calculator2) {
    var equalFn = equal(calculator2);
    return function _isZero() {
      for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
        _ref[_key] = arguments[_key];
      }
      var dineroObject = _ref[0];
      var _dineroObject$toJSON = dineroObject.toJSON(), amount = _dineroObject$toJSON.amount;
      return equalFn(amount, calculator2.zero());
    };
  }
  function _slicedToArray5(arr, i) {
    return _arrayWithHoles6(arr) || _iterableToArrayLimit5(arr, i) || _unsupportedIterableToArray7(arr, i) || _nonIterableRest6();
  }
  function _nonIterableRest6() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray7(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray7(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray7(o, minLen);
  }
  function _arrayLikeToArray7(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  function _iterableToArrayLimit5(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null)
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
          break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null)
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  function _arrayWithHoles6(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function unsafeLessThanOrEqual(calculator2) {
    var lessThanOrEqualFn = lessThanOrEqual(calculator2);
    return function lessThanOrEqual3() {
      for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
        _ref[_key] = arguments[_key];
      }
      var dineroObject = _ref[0], comparator = _ref[1];
      var dineroObjects = [dineroObject, comparator];
      var _dineroObjects$map = dineroObjects.map(function(d) {
        var _d$toJSON = d.toJSON(), amount = _d$toJSON.amount;
        return amount;
      }), _dineroObjects$map2 = _slicedToArray5(_dineroObjects$map, 2), subjectAmount = _dineroObjects$map2[0], comparatorAmount = _dineroObjects$map2[1];
      return lessThanOrEqualFn(subjectAmount, comparatorAmount);
    };
  }
  function safeLessThanOrEqual(calculator2) {
    var normalizeFn = normalizeScale(calculator2);
    var lessThanOrEqualFn = unsafeLessThanOrEqual(calculator2);
    return function lessThanOrEqual3() {
      for (var _len2 = arguments.length, _ref2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        _ref2[_key2] = arguments[_key2];
      }
      var dineroObject = _ref2[0], comparator = _ref2[1];
      var condition = haveSameCurrency([dineroObject, comparator]);
      assert(condition, UNEQUAL_CURRENCIES_MESSAGE);
      var _normalizeFn = normalizeFn([dineroObject, comparator]), _normalizeFn2 = _slicedToArray5(_normalizeFn, 2), subjectAmount = _normalizeFn2[0], comparatorAmount = _normalizeFn2[1];
      return lessThanOrEqualFn(subjectAmount, comparatorAmount);
    };
  }
  function _slicedToArray6(arr, i) {
    return _arrayWithHoles7(arr) || _iterableToArrayLimit6(arr, i) || _unsupportedIterableToArray8(arr, i) || _nonIterableRest7();
  }
  function _nonIterableRest7() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray8(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray8(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray8(o, minLen);
  }
  function _arrayLikeToArray8(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  function _iterableToArrayLimit6(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null)
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
          break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null)
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  function _arrayWithHoles7(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function unsafeMaximum(calculator2) {
    var maxFn = maximum(calculator2);
    return function maximum3() {
      for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
        _ref[_key] = arguments[_key];
      }
      var dineroObjects = _ref[0];
      var _dineroObjects = _slicedToArray6(dineroObjects, 1), firstDinero = _dineroObjects[0];
      var _firstDinero$toJSON = firstDinero.toJSON(), currency = _firstDinero$toJSON.currency, scale = _firstDinero$toJSON.scale;
      var amount = maxFn(dineroObjects.map(function(subject) {
        var _subject$toJSON = subject.toJSON(), subjectAmount = _subject$toJSON.amount;
        return subjectAmount;
      }));
      return firstDinero.create({
        amount,
        currency,
        scale
      });
    };
  }
  function safeMaximum(calculator2) {
    var normalizeFn = normalizeScale(calculator2);
    var maxFn = unsafeMaximum(calculator2);
    return function maximum3() {
      for (var _len2 = arguments.length, _ref2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        _ref2[_key2] = arguments[_key2];
      }
      var dineroObjects = _ref2[0];
      var condition = haveSameCurrency(dineroObjects);
      assert(condition, UNEQUAL_CURRENCIES_MESSAGE);
      var normalizedDineroObjects = normalizeFn(dineroObjects);
      return maxFn(normalizedDineroObjects);
    };
  }
  function _slicedToArray7(arr, i) {
    return _arrayWithHoles8(arr) || _iterableToArrayLimit7(arr, i) || _unsupportedIterableToArray9(arr, i) || _nonIterableRest8();
  }
  function _nonIterableRest8() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray9(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray9(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray9(o, minLen);
  }
  function _arrayLikeToArray9(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  function _iterableToArrayLimit7(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null)
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
          break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null)
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  function _arrayWithHoles8(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function unsafeMinimum(calculator2) {
    var minFn = minimum(calculator2);
    return function minimum3() {
      for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
        _ref[_key] = arguments[_key];
      }
      var dineroObjects = _ref[0];
      var _dineroObjects = _slicedToArray7(dineroObjects, 1), firstDinero = _dineroObjects[0];
      var _firstDinero$toJSON = firstDinero.toJSON(), currency = _firstDinero$toJSON.currency, scale = _firstDinero$toJSON.scale;
      var amount = minFn(dineroObjects.map(function(subject) {
        var _subject$toJSON = subject.toJSON(), subjectAmount = _subject$toJSON.amount;
        return subjectAmount;
      }));
      return firstDinero.create({
        amount,
        currency,
        scale
      });
    };
  }
  function safeMinimum(calculator2) {
    var normalizeFn = normalizeScale(calculator2);
    var minFn = unsafeMinimum(calculator2);
    return function maximum3() {
      for (var _len2 = arguments.length, _ref2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        _ref2[_key2] = arguments[_key2];
      }
      var dineroObjects = _ref2[0];
      var condition = haveSameCurrency(dineroObjects);
      assert(condition, UNEQUAL_CURRENCIES_MESSAGE);
      var normalizedDineroObjects = normalizeFn(dineroObjects);
      return minFn(normalizedDineroObjects);
    };
  }
  function multiply(calculator2) {
    var convertScaleFn = transformScale(calculator2);
    var zero2 = calculator2.zero();
    return function multiplyFn() {
      for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
        _ref[_key] = arguments[_key];
      }
      var multiplicand = _ref[0], multiplier = _ref[1];
      var _multiplicand$toJSON = multiplicand.toJSON(), amount = _multiplicand$toJSON.amount, currency = _multiplicand$toJSON.currency, scale = _multiplicand$toJSON.scale;
      var _getAmountAndScale = getAmountAndScale(multiplier, zero2), multiplierAmount = _getAmountAndScale.amount, multiplierScale = _getAmountAndScale.scale;
      var newScale = calculator2.add(scale, multiplierScale);
      return convertScaleFn(multiplicand.create({
        amount: calculator2.multiply(amount, multiplierAmount),
        currency,
        scale: newScale
      }), newScale);
    };
  }
  function _slicedToArray8(arr, i) {
    return _arrayWithHoles9(arr) || _iterableToArrayLimit8(arr, i) || _unsupportedIterableToArray10(arr, i) || _nonIterableRest9();
  }
  function _nonIterableRest9() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray10(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray10(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray10(o, minLen);
  }
  function _arrayLikeToArray10(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  function _iterableToArrayLimit8(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null)
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
          break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null)
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  function _arrayWithHoles9(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function unsafeSubtract(calculator2) {
    return function subtract4() {
      for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
        _ref[_key] = arguments[_key];
      }
      var minuend = _ref[0], subtrahend = _ref[1];
      var _minuend$toJSON = minuend.toJSON(), minuendAmount = _minuend$toJSON.amount, currency = _minuend$toJSON.currency, scale = _minuend$toJSON.scale;
      var _subtrahend$toJSON = subtrahend.toJSON(), subtrahendAmount = _subtrahend$toJSON.amount;
      var amount = calculator2.subtract(minuendAmount, subtrahendAmount);
      return minuend.create({
        amount,
        currency,
        scale
      });
    };
  }
  function safeSubtract(calculator2) {
    var normalizeFn = normalizeScale(calculator2);
    var subtractFn = unsafeSubtract(calculator2);
    return function subtract4() {
      for (var _len2 = arguments.length, _ref2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        _ref2[_key2] = arguments[_key2];
      }
      var minuend = _ref2[0], subtrahend = _ref2[1];
      var condition = haveSameCurrency([minuend, subtrahend]);
      assert(condition, UNEQUAL_CURRENCIES_MESSAGE);
      var _normalizeFn = normalizeFn([minuend, subtrahend]), _normalizeFn2 = _slicedToArray8(_normalizeFn, 2), newMinuend = _normalizeFn2[0], newSubtrahend = _normalizeFn2[1];
      return subtractFn(newMinuend, newSubtrahend);
    };
  }
  function _toConsumableArray2(arr) {
    return _arrayWithoutHoles2(arr) || _iterableToArray3(arr) || _unsupportedIterableToArray11(arr) || _nonIterableSpread2();
  }
  function _nonIterableSpread2() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray11(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray11(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray11(o, minLen);
  }
  function _iterableToArray3(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
      return Array.from(iter);
  }
  function _arrayWithoutHoles2(arr) {
    if (Array.isArray(arr))
      return _arrayLikeToArray11(arr);
  }
  function _arrayLikeToArray11(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  function toUnits(calculator2) {
    var getDivisorsFn = getDivisors(calculator2);
    return function toUnitsFn() {
      for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
        _ref[_key] = arguments[_key];
      }
      var dineroObject = _ref[0], transformer = _ref[1];
      var _dineroObject$toJSON = dineroObject.toJSON(), amount = _dineroObject$toJSON.amount, currency = _dineroObject$toJSON.currency, scale = _dineroObject$toJSON.scale;
      var power3 = calculator2.power, integerDivide3 = calculator2.integerDivide, modulo3 = calculator2.modulo;
      var bases = isArray(currency.base) ? currency.base : [currency.base];
      var divisors = getDivisorsFn(bases.map(function(base) {
        return power3(base, scale);
      }));
      var value = divisors.reduce(function(amounts, divisor, index) {
        var amountLeft = amounts[index];
        var quotient = integerDivide3(amountLeft, divisor);
        var remainder = modulo3(amountLeft, divisor);
        return [].concat(_toConsumableArray2(amounts.filter(function(_, i) {
          return i !== index;
        })), [quotient, remainder]);
      }, [amount]);
      if (!transformer) {
        return value;
      }
      return transformer({
        value,
        currency
      });
    };
  }
  function toDecimal(calculator2) {
    var toUnitsFn = toUnits(calculator2);
    var computeBaseFn = computeBase(calculator2);
    var equalFn = equal(calculator2);
    return function toDecimalFn() {
      for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
        _ref[_key] = arguments[_key];
      }
      var dineroObject = _ref[0], transformer = _ref[1];
      var _dineroObject$toJSON = dineroObject.toJSON(), currency = _dineroObject$toJSON.currency, scale = _dineroObject$toJSON.scale;
      var base = computeBaseFn(currency.base);
      var zero2 = calculator2.zero();
      var ten = new Array(10).fill(null).reduce(calculator2.increment, zero2);
      var isMultiBase = isArray(currency.base);
      var isBaseTen = equalFn(calculator2.modulo(base, ten), zero2);
      var isDecimal = !isMultiBase && isBaseTen;
      assert(isDecimal, NON_DECIMAL_CURRENCY_MESSAGE);
      var units = toUnitsFn(dineroObject);
      var getDecimalFn = getDecimal(calculator2, dineroObject.formatter);
      var value = getDecimalFn(units, scale);
      if (!transformer) {
        return value;
      }
      return transformer({
        value,
        currency
      });
    };
  }
  function getDecimal(calculator2, formatter) {
    var absoluteFn = absolute(calculator2);
    var equalFn = equal(calculator2);
    var lessThanFn = lessThan(calculator2);
    var zero2 = calculator2.zero();
    return function(units, scale) {
      var whole = formatter.toString(units[0]);
      var fractional = formatter.toString(absoluteFn(units[1]));
      var scaleNumber = formatter.toNumber(scale);
      var decimal = "".concat(whole, ".").concat(fractional.padStart(scaleNumber, "0"));
      var leadsWithZero = equalFn(units[0], zero2);
      var isNegative = lessThanFn(units[1], zero2);
      return leadsWithZero && isNegative ? "-".concat(decimal) : decimal;
    };
  }
  function toSnapshot(dineroObject) {
    return dineroObject.toJSON();
  }
  function trimScale(calculator2) {
    var countTrailingZerosFn = countTrailingZeros(calculator2);
    var equalFn = equal(calculator2);
    var maximumFn = maximum(calculator2);
    var transformScaleFn = transformScale(calculator2);
    var computeBaseFn = computeBase(calculator2);
    return function trimScaleFn() {
      for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
        _ref[_key] = arguments[_key];
      }
      var dineroObject = _ref[0];
      var _dineroObject$toJSON = dineroObject.toJSON(), amount = _dineroObject$toJSON.amount, currency = _dineroObject$toJSON.currency, scale = _dineroObject$toJSON.scale;
      var base = computeBaseFn(currency.base);
      var trailingZerosLength = countTrailingZerosFn(amount, base);
      var difference = calculator2.subtract(scale, trailingZerosLength);
      var newScale = maximumFn([difference, currency.exponent]);
      if (equalFn(newScale, scale)) {
        return dineroObject;
      }
      return transformScaleFn(dineroObject, newScale);
    };
  }
  function add() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var augend = _ref[0], addend = _ref[1];
    var calculator2 = augend.calculator;
    var addFn = safeAdd(calculator2);
    return addFn(augend, addend);
  }
  function greaterThan2() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0], comparator = _ref[1];
    var calculator2 = dineroObject.calculator;
    var greaterThanFn = safeGreaterThan(calculator2);
    return greaterThanFn(dineroObject, comparator);
  }
  function greaterThanOrEqual2() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0], comparator = _ref[1];
    var calculator2 = dineroObject.calculator;
    var greaterThanOrEqualFn = safeGreaterThanOrEqual(calculator2);
    return greaterThanOrEqualFn(dineroObject, comparator);
  }
  function isZero2() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0];
    var calculator2 = dineroObject.calculator;
    var isZeroFn = isZero(calculator2);
    return isZeroFn(dineroObject);
  }
  function lessThanOrEqual2() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0], comparator = _ref[1];
    var calculator2 = dineroObject.calculator;
    var lessThanOrEqualFn = safeLessThanOrEqual(calculator2);
    return lessThanOrEqualFn(dineroObject, comparator);
  }
  function maximum2() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObjects = _ref[0];
    var calculator2 = dineroObjects[0].calculator;
    var maximumFn = safeMaximum(calculator2);
    return maximumFn(dineroObjects);
  }
  function minimum2() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObjects = _ref[0];
    var calculator2 = dineroObjects[0].calculator;
    var minimumFn = safeMinimum(calculator2);
    return minimumFn(dineroObjects);
  }
  function multiply2() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var multiplicand = _ref[0], multiplier = _ref[1];
    var calculator2 = multiplicand.calculator;
    var multiplyFn = multiply(calculator2);
    return multiplyFn(multiplicand, multiplier);
  }
  function subtract() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var minuend = _ref[0], subtrahend = _ref[1];
    var calculator2 = minuend.calculator;
    var subtractFn = safeSubtract(calculator2);
    return subtractFn(minuend, subtrahend);
  }
  function toDecimal2() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0], transformer = _ref[1];
    var calculator2 = dineroObject.calculator;
    var toDecimalFn = toDecimal(calculator2);
    return toDecimalFn(dineroObject, transformer);
  }
  var toSnapshot2 = toSnapshot;
  function transformScale2() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0], newScale = _ref[1], divide = _ref[2];
    var calculator2 = dineroObject.calculator;
    var transformScaleFn = transformScale(calculator2);
    return transformScaleFn(dineroObject, newScale, divide);
  }
  function trimScale2() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0];
    var calculator2 = dineroObject.calculator;
    var trimScaleFn = trimScale(calculator2);
    return trimScaleFn(dineroObject);
  }
  var add2 = function add3(augend, addend) {
    return augend + addend;
  };
  var compare = function compare2(a, b) {
    if (a < b) {
      return ComparisonOperator.LT;
    }
    if (a > b) {
      return ComparisonOperator.GT;
    }
    return ComparisonOperator.EQ;
  };
  var decrement = function decrement2(value) {
    return value - 1;
  };
  var increment = function increment2(value) {
    return value + 1;
  };
  var integerDivide = function integerDivide2(dividend, divisor) {
    return Math.trunc(dividend / divisor);
  };
  var modulo = function modulo2(dividend, divisor) {
    return dividend % divisor;
  };
  var multiply3 = function multiply4(multiplicand, multiplier) {
    return multiplicand * multiplier;
  };
  var power = function power2(base, exponent) {
    return Math.pow(base, exponent);
  };
  var subtract2 = function subtract3(minuend, subtrahend) {
    return minuend - subtrahend;
  };
  function zero() {
    return 0;
  }
  var calculator = {
    add: add2,
    compare,
    decrement,
    increment,
    integerDivide,
    modulo,
    multiply: multiply3,
    power,
    subtract: subtract2,
    zero
  };
  var dinero = createDinero({
    calculator,
    onCreate: function onCreate(_ref) {
      var amount = _ref.amount, scale = _ref.scale;
      assert(Number.isInteger(amount), INVALID_AMOUNT_MESSAGE);
      assert(Number.isInteger(scale), INVALID_SCALE_MESSAGE);
    }
  });
  var CHF = {
    code: "CHF",
    base: 10,
    exponent: 2
  };
  var dineroAddMany = (...addends) => addends.reduce(add);
  var dineroSubtractMany = (...addends) => addends.reduce(subtract);
  var transformNumber = ({ value }) => {
    return Number(value);
  };
  var dineroRound = (input, scale = 0) => transformScale2(input, scale, halfEven);
  var dineroRound100Down = (input) => transformScale2(transformScale2(input, -2, down), 0, down);
  var dineroRoundMin0 = (input, scale = 0) => transformScale2(dineroMax(input, dineroChf(0)), scale, halfEven);
  var dineroChf = (amount, scale) => {
    const scaleResult = scale ?? CHF.exponent;
    const factor = 10 ** scaleResult;
    const amountResult = Math.round(amount * factor);
    return dinero({ amount: amountResult, currency: CHF, scale: scaleResult });
  };
  var dineroScaledPercent = (value, precision) => {
    const factor = 10 ** precision;
    const amount = Math.round(value * factor);
    return { amount, scale: precision + 2 };
  };
  var dineroScaledFactor = (value, precision) => {
    const factor = 10 ** precision;
    const amount = Math.round(value * factor);
    return { amount, scale: precision };
  };
  var multiplyDineroPercent = (input, percent, precision) => {
    return trimScale2(multiply2(input, dineroScaledPercent(percent, precision)));
  };
  var multiplyDineroFactor = (input, factor, precision) => {
    return trimScale2(multiply2(input, dineroScaledFactor(factor, precision)));
  };
  var dineroToNumber = (input) => toDecimal2(input, transformNumber);
  var dineroMin = (...dineros) => {
    return minimum2(dineros);
  };
  var dineroMax = (...dineros) => {
    return maximum2(dineros);
  };
  var sortArray = (array, selector, order = "asc") => {
    const sortedArray = [...array];
    sortedArray.sort((a, b) => {
      if (selector(a) < selector(b))
        return order === "asc" ? -1 : 1;
      if (selector(a) > selector(b))
        return order === "asc" ? 1 : -1;
      return 0;
    });
    return sortedArray;
  };
  var maxSalaryNbuAlv = 148200;
  var taxDeductionsPerson = {
    insurancePremiums: {
      label: { de: "Versicherungspr\xE4mien und Zinsen von Sparkapitalien" },
      hint: {
        de: "Versicherungspr\xE4mien und Zinsen von Sparkapitalien, abz\xFCglich individuelle Pr\xE4mienverbilligung. Annahme: 4'560 CHF pro Erwachsenen (380 CHF monatlich)"
      },
      default: 4560
    },
    pillar3a: {
      label: { de: "Beitr\xE4ge an S\xE4ule 3a" }
    },
    mealCosts: {
      label: { de: "Verpflegungskosten" },
      default: 1600,
      suggestion: 3200,
      dependsOnWorkloadFactor: true
    },
    travelExpenses: {
      label: { de: "Fahrkosten" },
      default: 1e3
    },
    otherProfessionalExpenses: {
      label: { de: "Berufsauslagen" },
      defaultFlatRate: true
    },
    professionalExpensesSideline: {
      label: { de: "Berufsauslagen Nebenerwerb" }
    },
    otherDeductions: {
      label: { de: "\xDCbrige Abz\xFCge" }
    }
  };
  var taxDeductionsGeneral = {
    insurancePremiumsKids: {
      label: { de: "Versicherungspr\xE4mien Kinder" },
      withChildrenOnly: true,
      defaultPerChild: 1200
    },
    childcareCosts: {
      label: { de: "Kinder Drittbetreuungskosten" },
      withChildrenOnly: true
    },
    // rentExpenses: {
    //   label: { de: 'Mietausgaben' },
    //   hint: {
    //     de: 'Nur relevant für die Kantone ZG und VD.'
    //   }
    // },
    debtInterest: {
      label: { de: "Schuldzinsen" }
    },
    maintenanceCostsRealEstate: {
      label: { de: "Unterhaltskosten f\xFCr Liegenschaften" }
    },
    otherDeductions: {
      label: { de: "\xDCbrige Abz\xFCge" }
    }
  };
  var taxDeductionDefinitions = [
    {
      id: "HauptErw_EK",
      name: taxDeductionsPerson.otherProfessionalExpenses.label.de,
      rule: () => true,
      input: (_, grossDeductions) => grossDeductions.filter((grossDeduction) => grossDeduction.netIncome > 0).map((grossDeduction, index) => ({
        target: `P${index + 1}`,
        amount: grossDeduction.netIncome,
        min: grossDeduction.person.deductions?.otherProfessionalExpenses
      }))
    },
    {
      id: "Fahrkosten_EK",
      rule: (taxInput) => taxInput.persons.some((p) => (p.deductions?.travelExpenses ?? 0) > 0),
      input: (_, grossDeductions) => grossDeductions.filter((grossDeduction) => grossDeduction.netIncome > 0).map((grossDeduction, index) => ({
        target: `P${index + 1}`,
        amount: grossDeduction.person.deductions?.travelExpenses
      }))
    },
    {
      id: "NebenErw_EK",
      rule: (taxInput) => taxInput.persons.some((p) => (p.deductions?.professionalExpensesSideline ?? 0) > 0),
      input: (_, grossDeductions) => grossDeductions.filter((gd) => (gd.person.deductions?.professionalExpensesSideline ?? 0) > 0).map((grossDeduction, index) => ({
        target: `P${index + 1}`,
        amount: 0,
        // Einkommen Nebenerwerb kann aktuell nicht erfasst werden
        min: grossDeduction.person.deductions?.professionalExpensesSideline
      }))
    },
    {
      id: "S3a_EK",
      name: taxDeductionsPerson.pillar3a.label.de,
      rule: () => true,
      input: (taxInput, _) => taxInput.persons.map((person, index) => ({
        target: `P${index + 1}`,
        amount: person.deductions?.pillar3a
      }))
    },
    {
      id: "KKSparLedigMitBVGS3a_EK",
      rule: (taxInput) => taxInput.relationship === "s",
      input: (taxInput) => [
        {
          amount: taxInput.persons[0].deductions?.insurancePremiums ?? 4560
        }
      ]
    },
    {
      id: "KKSparzVerhMitBVGS3a_EK",
      rule: (taxInput) => ["m", "rp"].includes(taxInput.relationship),
      input: (taxInput) => [
        {
          amount: taxInput.persons.reduce(
            (sum, person) => sum + (person.deductions?.insurancePremiums ?? 4560),
            0
          )
        }
      ]
    },
    {
      id: "KKSparProKind_EK",
      rule: (taxInput) => taxInput.children > 0,
      input: (taxInput) => Array.from(Array(taxInput.children).keys()).map((_, index) => ({
        target: `K${index + 1}`,
        amount: taxInput.deductions?.insurancePremiumsKids !== void 0 ? (taxInput.deductions?.insurancePremiumsKids ?? 0) / taxInput.children : 1400
      }))
    },
    {
      id: "SozVerheiratet_EK",
      rule: (taxInput) => ["m", "rp"].includes(taxInput.relationship),
      input: () => [{}]
    },
    {
      id: "ZweitVerdiener_EK",
      rule: (taxInput) => ["m", "rp"].includes(taxInput.relationship),
      input: (taxInput) => sortArray(taxInput.persons, (p) => p.income).filter((_, index) => index === 0).map((p) => ({ amount: p.income }))
    },
    {
      id: "SozLedig_EK",
      rule: (taxInput) => taxInput.relationship === "s",
      input: (_, grossDeductions) => [{ amount: grossDeductions[0].netIncome }]
    },
    {
      id: "SozAlleinerzieher_EK",
      rule: (taxInput) => taxInput.relationship === "s" && taxInput.children > 0,
      input: (_, grossDeductions) => [{ amount: grossDeductions[0].netIncome }]
    },
    {
      id: "SozKindAlleinerzieher_EK",
      rule: (taxInput) => taxInput.relationship === "s" && taxInput.children > 0,
      input: (_, grossDeductions) => [{ amount: grossDeductions[0].netIncome }]
    },
    {
      id: "SozKind_EK",
      rule: (taxInput) => taxInput.children > 0,
      input: (taxInput) => [{ multiplier: taxInput.children }]
    },
    {
      id: "EigenBetr_EK",
      rule: (taxInput) => taxInput.children > 0,
      input: () => [{}]
    },
    {
      id: "SozKind_VM",
      rule: (taxInput) => taxInput.children > 0,
      input: (taxInput) => [{ multiplier: taxInput.children }]
    },
    {
      id: "FremdBetr_EK",
      rule: (taxInput) => taxInput.children > 0,
      input: (taxInput) => Array.from(Array(taxInput.children).keys()).map((_, index) => ({
        target: `K${index + 1}`,
        amount: (taxInput.deductions?.childcareCosts ?? 0) / taxInput.children
      }))
    },
    {
      id: "SozLedigMitOhneKinder_VM",
      rule: (taxInput) => ["s", "c"].includes(taxInput.relationship),
      input: () => [{}]
    },
    {
      id: "SozVerheiratet_VM",
      rule: (taxInput) => ["m", "rp"].includes(taxInput.relationship),
      input: () => [{}]
    },
    {
      id: "SozLedigOhneKinder_VM",
      rule: (taxInput) => ["s", "c"].includes(taxInput.relationship) && taxInput.children === 0,
      input: () => [{}]
    },
    {
      id: "SozAlleinerzieher_VM",
      rule: (taxInput) => ["s", "c"].includes(taxInput.relationship) && taxInput.children > 0,
      input: () => [{}]
    },
    {
      id: "Custom_Meal_EK",
      applyAlways: true,
      name: taxDeductionsPerson.mealCosts.label.de,
      rule: (taxInput, taxType) => taxType === "EINKOMMENSSTEUER" && taxInput.persons.some((p) => p.deductions?.mealCosts !== void 0),
      input: (_, grossDeductions) => grossDeductions.filter((grossDeduction) => grossDeduction.netIncome > 0).map((grossDeduction, index) => ({
        target: `P${index + 1}`,
        amount: grossDeduction.person.deductions?.mealCosts
      }))
    },
    {
      id: "Custom_OtherDeductions_Person_EK",
      applyAlways: true,
      name: taxDeductionsPerson.otherDeductions.label.de,
      rule: (taxInput, taxType) => taxType === "EINKOMMENSSTEUER" && taxInput.persons.some((p) => p.deductions?.otherDeductions !== void 0),
      input: (taxInput, _) => taxInput.persons.map((person, index) => ({
        target: `P${index + 1}`,
        amount: person.deductions?.otherDeductions
      }))
    },
    {
      id: "Custom_OtherDeductions_General_EK",
      applyAlways: true,
      name: taxDeductionsGeneral.otherDeductions.label.de,
      rule: (taxInput, taxType) => taxType === "EINKOMMENSSTEUER" && taxInput.deductions?.otherDeductions !== void 0,
      input: (taxInput, _) => [
        {
          amount: taxInput.deductions?.otherDeductions
        }
      ]
    },
    {
      id: "Custom_DeptInterest_EK",
      applyAlways: true,
      name: taxDeductionsGeneral.debtInterest.label.de,
      rule: (taxInput, taxType) => taxType === "EINKOMMENSSTEUER" && taxInput.deductions?.debtInterest !== void 0,
      input: (taxInput, _) => [
        {
          amount: Math.min(taxInput.deductions?.debtInterest ?? 0, 5e4)
          // Abkürzung. Normalerweise müssten noch Zinserträge dazugerechnet werden.
        }
      ]
    },
    {
      id: "Custom_MaintenanceCostsRealEstate_EK",
      applyAlways: true,
      name: taxDeductionsGeneral.maintenanceCostsRealEstate.label.de,
      rule: (taxInput, taxType) => taxType === "EINKOMMENSSTEUER" && taxInput.deductions?.maintenanceCostsRealEstate !== void 0,
      input: (taxInput, _) => [
        {
          amount: taxInput.deductions?.maintenanceCostsRealEstate
        }
      ]
    }
  ];
  var calculateGrossNetDetails = (taxInput) => {
    return taxInput.persons.map((person) => {
      if (person.incomeType !== "gross") {
        return {
          netIncome: person.income,
          grossIncome: person.income,
          person,
          ahvIvEo: 0,
          alv: 0,
          nbu: 0,
          pk: 0
        };
      }
      const maxSalaryNbuAlvDinero = dineroChf(maxSalaryNbuAlv);
      const grossIncome = dineroChf(person.income);
      const ahvIvEoDeduction = dineroRound(multiplyDineroPercent(grossIncome, 5.3, 1));
      const alvDeduction = dineroRound(
        multiplyDineroPercent(dineroMin(grossIncome, maxSalaryNbuAlvDinero), 1.1, 1)
      );
      const nbuDeduction = dineroRound(
        multiplyDineroPercent(dineroMin(grossIncome, maxSalaryNbuAlvDinero), 0.4, 1)
      );
      const pkDeduction = dineroChf(person.pkDeduction ?? 0);
      const deducion = {
        person,
        grossIncome: person.income,
        ahvIvEo: dineroToNumber(ahvIvEoDeduction),
        alv: dineroToNumber(alvDeduction),
        nbu: dineroToNumber(nbuDeduction),
        pk: dineroToNumber(pkDeduction),
        netIncome: dineroToNumber(
          dineroSubtractMany(grossIncome, ahvIvEoDeduction, alvDeduction, nbuDeduction, pkDeduction)
        )
      };
      return deducion;
    });
  };
  var calculateDeductionByDefinition = (deductionDefinition, taxInput, taxType, grossDeductions, deductionTableCanton, deductionTableBund) => {
    if (!deductionDefinition.rule(taxInput, taxType))
      return [];
    const deductionCanton = deductionTableCanton?.itemsById.get(deductionDefinition.id);
    const deductionBund = deductionTableBund?.itemsById.get(deductionDefinition.id);
    const deductions = [];
    if (deductionCanton || deductionBund || deductionDefinition.applyAlways) {
      deductionDefinition.input(taxInput, grossDeductions).forEach((deductionInput) => {
        const amountOverride = deductionDefinition.applyAlways ? deductionInput.amount ?? 0 : 0;
        const amountCanton = deductionCanton ? calculateDeductionByFormat(deductionCanton, deductionInput.amount) : dineroChf(amountOverride);
        const amountBund = deductionBund ? calculateDeductionByFormat(deductionBund, deductionInput.amount) : dineroChf(amountOverride);
        const deduction = {
          id: deductionDefinition.id,
          name: deductionDefinition.name ?? deductionCanton?.name.de ?? deductionBund?.name.de ?? "Unbekannter Abzug",
          target: deductionInput.target ?? "",
          amountCanton: getAmount(amountCanton, deductionInput),
          amountBund: getAmount(amountBund, deductionInput)
        };
        if (greaterThan2(deduction.amountCanton, dineroChf(0)) || greaterThan2(deduction.amountBund, dineroChf(0))) {
          deductions.push(deduction);
        }
      });
    }
    return deductions;
  };
  var getAmount = (amount, deductionInput) => {
    if (deductionInput.multiplier !== void 0) {
      amount = multiplyDineroFactor(amount, deductionInput.multiplier, 1);
    }
    if (deductionInput.min !== void 0) {
      amount = dineroMax(amount, dineroChf(deductionInput.min));
    }
    return amount;
  };
  var calculateDeductionByFormat = (deduction, amount = 0) => {
    const amountDinero = dineroChf(amount);
    switch (deduction.format) {
      case "MAXIMUM":
        return dineroMin(amountDinero, dineroChf(deduction.maximum));
      case "PERCENT":
        return dineroRound(multiplyDineroPercent(amountDinero, deduction.percent, 5));
      case "PERCENT,MINIMUM,MAXIMUM":
        return dineroMin(
          dineroMax(
            dineroRound(multiplyDineroPercent(amountDinero, deduction.percent, 5)),
            dineroChf(deduction.minimum)
          ),
          dineroChf(deduction.maximum)
        );
      case "STANDARDIZED":
        return dineroChf(deduction.amount);
      default:
        return dineroChf(0);
    }
  };
  var readFile = async (filePath) => {
    if (typeof window === "undefined") {
      const { readFile: readFile2 } = await import("fs/promises");
      return readFile2(filePath, "utf-8");
    }
    if (chrome.runtime) {
      const inExtensionFilePath = chrome.runtime.getURL("/options/" + filePath.replace("./", ""));
      const response = await fetch(inExtensionFilePath);
      if (!response.ok) {
        throw new Error(`Failed to fetch file at ${filePath}`);
      }
      return response.text();
    } else {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`Failed to fetch file at ${filePath}`);
      }
      return response.text();
    }
  };
  var dataParsedRelativePath = "data/parsed/";
  var dataParsedBasePath = `./${dataParsedRelativePath}`;
  var taxDeductionsByYearAndCanton = /* @__PURE__ */ new Map();
  var loadDeductionsIfRequired = async (cantonId, year) => {
    if (taxDeductionsByYearAndCanton.get(year)?.has(cantonId))
      return;
    const filePath = `${dataParsedBasePath}${year}/deductions/${cantonId}.json`;
    const fileContents = await readFile(filePath);
    const deductionsRaw = JSON.parse(fileContents);
    let taxDeductionsByCanton = taxDeductionsByYearAndCanton.get(year);
    if (!taxDeductionsByCanton) {
      taxDeductionsByCanton = /* @__PURE__ */ new Map();
      taxDeductionsByYearAndCanton.set(year, taxDeductionsByCanton);
    }
    deductionsRaw.forEach((deductionRaw) => {
      if (!taxDeductionsByCanton)
        throw new Error("taxDeductionsByCanton is undefined");
      let deductionsByTaxType = taxDeductionsByCanton.get(cantonId);
      if (!deductionsByTaxType) {
        deductionsByTaxType = /* @__PURE__ */ new Map();
        taxDeductionsByCanton.set(cantonId, deductionsByTaxType);
      }
      const deductions = deductionsByTaxType.get(deductionRaw.type);
      if (!deductions) {
        deductionsByTaxType.set(deductionRaw.type, {
          ...deductionRaw,
          itemsById: new Map(deductionRaw.items.map((item) => [item.id, item]))
        });
      }
    });
  };
  var getTaxDecutionTable = async (cantonId, year, taxType) => {
    await loadDeductionsIfRequired(cantonId, year);
    const deductionTable = taxDeductionsByYearAndCanton.get(year)?.get(cantonId)?.get(taxType);
    if (!deductionTable)
      throw new Error(`Deduction table not found for canton ${cantonId}, tax type ${taxType}`);
    return deductionTable;
  };
  var taxFactorsByYearCantonAndCity = /* @__PURE__ */ new Map();
  var loadFactorsIfRequired = async (cantonId, year) => {
    let factorsByCantonAndCity = taxFactorsByYearCantonAndCity.get(year);
    let factorsByCity = factorsByCantonAndCity?.get(cantonId);
    if (factorsByCity)
      return;
    const filePath = `${dataParsedBasePath}${year}/factors/${cantonId}.json`;
    const fileContents = await readFile(filePath);
    const factors = JSON.parse(fileContents);
    if (!factorsByCantonAndCity) {
      factorsByCantonAndCity = /* @__PURE__ */ new Map();
      taxFactorsByYearCantonAndCity.set(year, factorsByCantonAndCity);
    }
    factorsByCity = /* @__PURE__ */ new Map();
    factors.forEach((factor) => {
      if (!factorsByCity)
        throw new Error("factorsByCity is undefined");
      const factorExisting = factorsByCity.get(factor.Location.BfsID);
      if (!factorExisting) {
        factorsByCity.set(factor.Location.BfsID, factor);
      }
    });
    factorsByCantonAndCity.set(cantonId, factorsByCity);
  };
  var getTaxFactors = async (taxInput) => {
    await loadFactorsIfRequired(taxInput.cantonId, taxInput.year);
    const factor = taxFactorsByYearCantonAndCity.get(taxInput.year)?.get(taxInput.cantonId)?.get(taxInput.locationId);
    if (!factor)
      throw new Error(
        `Factor not found for canton: ${taxInput.cantonId}, year: ${taxInput.year}, city: ${taxInput.locationId}`
      );
    return factor;
  };
  var getChurchIncomeFactor = (confession, factors) => {
    switch (confession) {
      case "christ":
        return factors.IncomeRateChrist;
      case "roman":
        return factors.IncomeRateRoman;
      case "protestant":
        return factors.IncomeRateProtestant;
      default:
        return 0;
    }
  };
  var getChurchFortuneFactor = (confession, factors) => {
    switch (confession) {
      case "christ":
        return factors.FortuneRateChrist;
      case "roman":
        return factors.FortuneRateRoman;
      case "protestant":
        return factors.FortuneRateProtestant;
      default:
        return 0;
    }
  };
  var calculateTaxesCantonAndCity = async (taxInput, taxesIncomeBase, taxesIncomeBaseChurch, taxesFortuneBase) => {
    const factor = await getTaxFactors(taxInput);
    const taxesIncomeCanton = dineroRound(
      multiplyDineroPercent(taxesIncomeBase, factor.IncomeRateCanton, 5)
    );
    const taxesIncomeCity = dineroRound(
      multiplyDineroPercent(taxesIncomeBase, factor.IncomeRateCity, 5)
    );
    const taxesIncomeChurch = dineroRound(
      dineroAddMany(
        ...taxInput.persons.map(
          (person) => multiplyDineroPercent(
            taxesIncomeBaseChurch,
            getChurchIncomeFactor(person.confession, factor) / taxInput.persons.length,
            2
          )
        )
      )
    );
    const taxesFortuneCanton = dineroRound(
      multiplyDineroPercent(taxesFortuneBase, factor.FortuneRateCanton, 5)
    );
    const taxesFortuneCity = dineroRound(
      multiplyDineroPercent(taxesFortuneBase, factor.FortuneRateCity, 5)
    );
    const taxesFortuneChurch = dineroRound(
      dineroAddMany(
        ...taxInput.persons.map(
          (person) => multiplyDineroPercent(
            taxesFortuneBase,
            getChurchFortuneFactor(person.confession, factor) / taxInput.persons.length,
            5
          )
        )
      )
    );
    return {
      taxesIncomeCanton,
      taxesIncomeCity,
      taxesIncomeChurch,
      taxesFortuneCanton,
      taxesFortuneCity,
      taxesFortuneChurch
    };
  };
  var validateTaxInput = (taxInput) => {
    const personsCount = taxInput.persons.length;
    if (personsCount < 1 || personsCount > 2) {
      throw new Error("Invalid number of persons");
    }
    if (personsCount === 1 && ["m", "rp"].includes(taxInput.relationship)) {
      throw new Error("Invalid relationship for single person");
    }
    if (personsCount === 2 && ["s", "c"].includes(taxInput.relationship)) {
      throw new Error("Invalid relationship for two persons");
    }
  };
  var personnelTaxes = {
    26: { amount: 24, marriedBoth: true },
    // Zürich
    4: { amount: 0, marriedBoth: true },
    // Bern
    12: { amount: 50, marriedBoth: true },
    // Luzern
    22: { amount: 70, marriedBoth: true },
    // Uri
    19: { amount: 0, marriedBoth: true },
    // Schwyz
    15: { amount: 0, marriedBoth: true },
    // Obwalden
    14: { amount: 50, marriedBoth: false },
    // Nidwalden
    9: { amount: 0, marriedBoth: true },
    // Glarus
    25: { amount: 0, marriedBoth: true },
    // Zug
    7: { amount: 0, marriedBoth: true },
    // Freiburg
    18: { amount: 30, marriedBoth: true },
    // Solothurn
    6: { amount: 0, marriedBoth: true },
    // Basel-Stadt
    5: { amount: 0, marriedBoth: true },
    // Basel-Landschaft
    17: { amount: 60, marriedBoth: false },
    // Schaffhausen
    3: { amount: 0, marriedBoth: true },
    // Appenzell Ausserrhoden
    2: { amount: 0, marriedBoth: true },
    // Appenzell Innerrhoden
    16: { amount: 0, marriedBoth: true },
    // St. Gallen
    10: { amount: 0, marriedBoth: true },
    // Graubünden
    1: { amount: 0, marriedBoth: true },
    // Aargau
    20: { amount: 0, marriedBoth: true },
    // Thurgau
    21: { amount: 40, marriedBoth: true },
    // Tessin
    23: { amount: 0, marriedBoth: true },
    // Waadt
    24: { amount: 24, marriedBoth: false },
    // Wallis
    13: { amount: 0, marriedBoth: true },
    // Neuenburg
    8: { amount: 25, marriedBoth: false },
    // Genf
    11: { amount: 0, marriedBoth: true }
    // Jura
  };
  var personnelTaxesByCanton = /* @__PURE__ */ new Map();
  var taxesLoaded = false;
  var loadPersonnelTaxesIfRequired = () => {
    if (taxesLoaded)
      return;
    Object.entries(personnelTaxes).forEach(([cantonId, personnelTax]) => {
      personnelTaxesByCanton.set(parseInt(cantonId), personnelTax);
    });
    taxesLoaded = true;
  };
  var getPersonnelTax = (cantonId) => {
    loadPersonnelTaxesIfRequired();
    const personnelTaxes2 = personnelTaxesByCanton.get(cantonId);
    if (!personnelTaxes2)
      throw new Error(`Personnel taxes not found for canton ${cantonId}`);
    return personnelTaxes2;
  };
  var calculateTaxesPersonnel = (taxInput) => {
    const taxes = getPersonnelTax(taxInput.cantonId);
    const amount = dineroChf(taxes.amount);
    return dineroRound(
      multiplyDineroFactor(amount, taxes.marriedBoth ? taxInput.persons.length : 1, 0)
    );
  };
  var taxTarifsByYearAndCanton = /* @__PURE__ */ new Map();
  var loadTarifsIfRequired = async (cantonId, year) => {
    if (taxTarifsByYearAndCanton.get(year)?.has(cantonId))
      return;
    const filePath = `${dataParsedBasePath}${year}/tarifs/${cantonId}.json`;
    const fileContents = await readFile(filePath);
    const tarifs = JSON.parse(fileContents);
    let taxTarifsByCanton = taxTarifsByYearAndCanton.get(year);
    if (!taxTarifsByCanton) {
      taxTarifsByCanton = /* @__PURE__ */ new Map();
      taxTarifsByYearAndCanton.set(year, taxTarifsByCanton);
    }
    tarifs.forEach((tarifRaw) => {
      if (!taxTarifsByCanton)
        throw new Error("taxTarifsByCanton is undefined");
      let tarifsByTaxType = taxTarifsByCanton.get(cantonId);
      if (!tarifsByTaxType) {
        tarifsByTaxType = /* @__PURE__ */ new Map();
        taxTarifsByCanton.set(cantonId, tarifsByTaxType);
      }
      let tarifs2 = tarifsByTaxType.get(tarifRaw.taxType);
      if (!tarifs2) {
        tarifs2 = [];
        tarifsByTaxType.set(tarifRaw.taxType, tarifs2);
      }
      tarifs2.push(tarifRaw);
    });
  };
  var getTaxTarifTable = async (cantonId, year, taxType, tarifGroup) => {
    await loadTarifsIfRequired(cantonId, year);
    const tarifTables = taxTarifsByYearAndCanton.get(year)?.get(cantonId)?.get(taxType);
    if (!tarifTables)
      throw new Error(`No tarifs found for cantonId: ${cantonId}, tarifType: ${taxType}`);
    const tarifTable = tarifTables.find(
      (tarif) => tarif.group === "ALLE" || tarif.group.includes(tarifGroup)
    );
    if (!tarifTable)
      throw new Error(
        `Tarif not found for cantonId: ${cantonId}, tarifType: ${taxType}, tarifGroup: ${tarifGroup}`
      );
    return tarifTable;
  };
  var getTaxTarifGroup = (relationship, children) => {
    if (["m", "rp"].includes(relationship))
      return "VERHEIRATET";
    if (children > 0)
      return "LEDIG_MIT_KINDER";
    if (relationship === "s")
      return "LEDIG_ALLEINE";
    if (relationship === "c")
      return "LEDIG_KONKUBINAT";
    throw new Error("Invalid relationship");
  };
  var isGroupEligableForSplitting = (group) => {
    if (["VERHEIRATET", "LEDIG_MIT_KINDER"].includes(group))
      return true;
    return false;
  };
  var calculateTaxesAmount = (amount, tarif) => {
    let tableType = tarif.tableType;
    if (tarif.tableType === "ZUERICH" && tarif.table.find((t) => t.taxes > 0))
      tableType = "BUND";
    let taxes = dineroChf(0);
    switch (tableType) {
      case "FLATTAX":
        taxes = calculateTaxesByTypeFlattax(amount, tarif);
        break;
      case "ZUERICH":
        taxes = calculateTaxesByTypeZurich(amount, tarif);
        break;
      case "BUND":
        taxes = calculateTaxesByTypeBund(amount, tarif);
        break;
      case "FREIBURG":
        taxes = calculateTaxesByTypeFreiburg(amount, tarif);
        break;
      case "FORMEL":
        taxes = dineroChf(0);
        break;
      default:
        throw new Error(`Unknown table type ${tarif.tableType}`);
    }
    return taxes;
  };
  var calculateTaxesByTypeZurich = (amount, tarif) => {
    let taxes = dineroChf(0);
    let remainingIncome = dinero(toSnapshot2(amount));
    for (let i = 0; i < tarif.table.length; i++) {
      const tarifItem = tarif.table[i];
      const tarifAmount = dineroChf(tarifItem.amount);
      const usableIncome = greaterThanOrEqual2(remainingIncome, tarifAmount) ? tarifAmount : remainingIncome;
      taxes = add(taxes, multiplyDineroPercent(usableIncome, tarifItem.percent, 5));
      remainingIncome = subtract(remainingIncome, usableIncome);
      if (isZero2(remainingIncome)) {
        return taxes;
      }
    }
    return taxes;
  };
  var calculateTaxesByTypeFreiburg = (amount, tarif) => {
    let lastTarifItem;
    for (let i = 0; i < tarif.table.length; i++) {
      const tarifItem = tarif.table[i];
      const tarifAmount = dinero({ amount: tarifItem.amount, currency: CHF, scale: 0 });
      if (greaterThanOrEqual2(tarifAmount, amount)) {
        if (!lastTarifItem || lastTarifItem.amount === 0)
          return dineroChf(0);
        const lastTarifAmount = dineroChf(lastTarifItem.amount);
        const lastPercent = lastTarifItem ? lastTarifItem.percent : 0;
        const percentDiff = tarifItem.percent - lastPercent;
        const partCount = dineroToNumber(subtract(tarifAmount, lastTarifAmount));
        const partPercentage = percentDiff / partCount;
        const partDiff = dineroToNumber(subtract(amount, lastTarifAmount));
        const finalPercentage = partDiff * partPercentage + lastPercent;
        return multiplyDineroPercent(amount, finalPercentage, 5);
      }
      lastTarifItem = tarifItem;
    }
    throw new Error(
      `No Tarif found for income ${toDecimal2(amount)}, ${tarif.taxType}, ${tarif.tableType}`
    );
  };
  var calculateTaxesByTypeBund = (amount, tarif) => {
    let lastTarif;
    for (let i = 0; i < tarif.table.length; i++) {
      const tarifItem = tarif.table[i];
      const tarifAmount2 = dineroChf(tarifItem.amount);
      if (lessThanOrEqual2(tarifAmount2, amount)) {
        lastTarif = tarifItem;
      } else {
        break;
      }
    }
    if (!lastTarif)
      throw new Error(
        `No Tarif found for income ${toDecimal2(amount)}, ${tarif.taxType}, ${tarif.tableType}`
      );
    const tarifTaxes = dineroChf(lastTarif.taxes);
    const tarifAmount = dineroChf(lastTarif.amount);
    return add(
      tarifTaxes,
      multiplyDineroPercent(subtract(amount, tarifAmount), lastTarif.percent, 5)
    );
  };
  var calculateTaxesByTypeFlattax = (amount, tarif) => {
    return multiplyDineroPercent(amount, tarif.table[0].percent, 5);
  };
  var calculateTaxesForTarif = async (cantonId, year, tarifGroup, tarifType, taxableIncome) => {
    const tarifIncome = await getTaxTarifTable(cantonId, year, tarifType, tarifGroup);
    if (tarifIncome.splitting > 0 && isGroupEligableForSplitting(tarifGroup)) {
      taxableIncome = multiplyDineroFactor(taxableIncome, 1 / tarifIncome.splitting, 5);
    }
    const taxableIncomeRounded = dineroRound100Down(taxableIncome);
    const taxes = calculateTaxesAmount(taxableIncomeRounded, tarifIncome);
    if (tarifIncome.splitting > 0 && isGroupEligableForSplitting(tarifGroup)) {
      return multiplyDineroFactor(taxes, tarifIncome.splitting, 5);
    }
    return taxes;
  };
  var calculateTaxesIncomeAndFortune = async (taxInput) => {
    validateTaxInput(taxInput);
    const {
      taxableIncomeBund,
      taxableIncomeCanton,
      taxableFortuneCanton,
      grossNetDetails,
      deductionsFortune,
      deductionsIncome
    } = await calculateTaxableAmount(taxInput);
    const { taxesIncomeBund } = await calculateTaxesBund(taxInput, taxableIncomeBund, true);
    const { taxesIncomeBase, taxesFortuneBase } = await calculateTaxesBase(
      taxInput,
      taxableIncomeCanton,
      taxableFortuneCanton
    );
    const {
      taxesIncomeCanton,
      taxesIncomeCity,
      taxesIncomeChurch,
      taxesFortuneCanton,
      taxesFortuneCity,
      taxesFortuneChurch
    } = await calculateTaxesCantonAndCity(
      taxInput,
      taxesIncomeBase,
      taxesIncomeBase,
      taxesFortuneBase
    );
    const taxesPersonnel = calculateTaxesPersonnel(taxInput);
    const taxesTotal = dineroAddMany(
      taxesIncomeCanton,
      taxesIncomeCity,
      taxesIncomeChurch,
      taxesFortuneCanton,
      taxesFortuneCity,
      taxesFortuneChurch,
      taxesIncomeBund,
      taxesPersonnel
    );
    const result = {
      input: taxInput,
      taxesIncomeCanton: dineroToNumber(taxesIncomeCanton),
      taxesIncomeCity: dineroToNumber(taxesIncomeCity),
      taxesIncomeChurch: dineroToNumber(taxesIncomeChurch),
      taxesFortuneCanton: dineroToNumber(taxesFortuneCanton),
      taxesFortuneCity: dineroToNumber(taxesFortuneCity),
      taxesFortuneChurch: dineroToNumber(taxesFortuneChurch),
      taxesIncomeBund: dineroToNumber(taxesIncomeBund),
      taxesPersonnel: dineroToNumber(taxesPersonnel),
      taxesTotal: dineroToNumber(taxesTotal),
      details: {
        netIncomeCanton: grossNetDetails.reduce((acc, item) => acc + item.netIncome, 0),
        netIncomeBund: grossNetDetails.reduce((acc, item) => acc + item.netIncome, 0),
        grossNetDetails,
        deductionsIncome,
        deductionsFortune,
        taxableFortuneCanton: dineroToNumber(taxableFortuneCanton),
        taxableIncomeCanton: dineroToNumber(taxableIncomeCanton),
        taxableIncomeBund: dineroToNumber(taxableIncomeBund)
      }
    };
    return result;
  };
  var calculateTaxableAmount = async (taxInput) => {
    const deductionsIncomeCanton = await getTaxDecutionTable(
      taxInput.cantonId,
      taxInput.year,
      "EINKOMMENSSTEUER"
    );
    const deductionsFortuneCanton = await getTaxDecutionTable(
      taxInput.cantonId,
      taxInput.year,
      "VERMOEGENSSTEUER"
    );
    const deductionsIncomeBund = await getTaxDecutionTable(0, taxInput.year, "EINKOMMENSSTEUER");
    const grossNetDetails = calculateGrossNetDetails(taxInput);
    const deductionsIncome = [];
    const deductionsFortune = [];
    if (!taxInput.persons.find((p) => p.incomeType === "taxable")) {
      taxDeductionDefinitions.forEach((definition) => {
        const deductionResultIncome = calculateDeductionByDefinition(
          definition,
          taxInput,
          "EINKOMMENSSTEUER",
          grossNetDetails,
          deductionsIncomeCanton,
          deductionsIncomeBund
        );
        deductionsIncome.push(...deductionResultIncome);
        const deductionResultFortune = calculateDeductionByDefinition(
          definition,
          taxInput,
          "VERMOEGENSSTEUER",
          grossNetDetails,
          deductionsFortuneCanton
        );
        deductionsFortune.push(...deductionResultFortune);
      });
    }
    const taxableFortuneCanton = dineroRoundMin0(
      subtract(
        dineroChf(taxInput.fortune),
        deductionsFortune.reduce((acc, item) => add(acc, item.amountCanton), dineroChf(0))
      )
    );
    const taxableIncomeCanton = dineroRoundMin0(
      subtract(
        grossNetDetails.reduce(
          (acc, item) => dineroAddMany(acc, dineroChf(item.netIncome)),
          dineroChf(0)
        ),
        deductionsIncome.reduce((acc, item) => dineroAddMany(acc, item.amountCanton), dineroChf(0))
      )
    );
    const taxableIncomeBund = dineroRoundMin0(
      subtract(
        grossNetDetails.reduce(
          (acc, item) => dineroAddMany(acc, dineroChf(item.netIncome)),
          dineroChf(0)
        ),
        deductionsIncome.reduce((acc, item) => dineroAddMany(acc, item.amountBund), dineroChf(0))
      )
    );
    return {
      grossNetDetails,
      deductionsIncome: deductionsIncome.map(
        (item) => ({
          id: item.id,
          amountCanton: dineroToNumber(item.amountCanton),
          amountBund: dineroToNumber(item.amountBund),
          name: item.name,
          target: item.target
        })
      ),
      deductionsFortune: deductionsFortune.map(
        (item) => ({
          id: item.id,
          amountCanton: dineroToNumber(item.amountCanton),
          amountBund: dineroToNumber(item.amountBund),
          name: item.name,
          target: item.target
        })
      ),
      taxableFortuneCanton,
      taxableIncomeCanton,
      taxableIncomeBund
    };
  };
  var calculateTaxesBase = async (taxInput, taxableIncomeCanton, taxableFortuneCanton) => {
    const tarifGroup = getTaxTarifGroup(taxInput.relationship, taxInput.children);
    const taxesIncomeBase = await calculateTaxesForTarif(
      taxInput.cantonId,
      taxInput.year,
      tarifGroup,
      "EINKOMMENSSTEUER",
      taxableIncomeCanton
    );
    const taxesFortuneBase = await calculateTaxesForTarif(
      taxInput.cantonId,
      taxInput.year,
      tarifGroup,
      "VERMOEGENSSTEUER",
      taxableFortuneCanton
    );
    return { taxesIncomeBase, taxesFortuneBase };
  };
  var calculateTaxesBund = async (taxInput, taxableIncomeBund, includeChildrenDeduction) => {
    const tarifGroup = getTaxTarifGroup(taxInput.relationship, taxInput.children);
    let taxesIncomeBund = dineroRound(
      await calculateTaxesForTarif(
        0,
        taxInput.year,
        tarifGroup,
        "EINKOMMENSSTEUER",
        taxableIncomeBund
      )
    );
    if (includeChildrenDeduction) {
      taxesIncomeBund = subtract(taxesIncomeBund, dineroChf(251 * taxInput.children));
    }
    return { taxesIncomeBund };
  };
  var getPensionCreditDefinition = (cantonId) => {
    const definition = pensionCreditTaxDefinitions[cantonId];
    if (!definition)
      throw new Error(`No pension credit definition found for canton ${cantonId}`);
    return definition;
  };
  var pensionCreditTaxDefinitions = {
    0: { type: "IncomeTaxFactor", cantonId: 0, incomeTaxFactor: 0.2 },
    // Bund
    26: { type: "RentIncomeFactor", cantonId: 26, rentIncomeFactor: 0.05, minTaxFactor: 0.02 },
    // Zürich
    4: { type: "Tarif", cantonId: 4, amountFree: 5200 },
    // Bern
    12: { type: "IncomeTaxFactor", cantonId: 12, incomeTaxFactor: 1 / 3, minTaxFactor: 5e-3 },
    // Luzern
    22: { type: "Flattax", cantonId: 22, taxFactorChurch: 5e-3 },
    // Uri
    19: { type: "RentIncomeFactor", cantonId: 19, rentIncomeFactor: 0.04, maxTaxFactor: 0.025 },
    // Schwyz
    15: { type: "IncomeTaxFactor", cantonId: 15, incomeTaxFactor: 0.4 },
    // Obwalden
    14: { type: "IncomeTaxFactor", cantonId: 14, incomeTaxFactor: 0.4, minTaxFactor: 8e-3 },
    // Nidwalden
    9: { type: "Flattax", cantonId: 9 },
    // Glarus
    25: { type: "IncomeTaxFactor", cantonId: 25, minTaxFactor: 0.01 },
    // Zug - Eigner Tarif auch noch beachten
    7: { type: "Tarif", cantonId: 7, deductionMarried: 5e3, amountFree: 5e3 },
    // Freiburg
    18: { type: "IncomeTaxFactor", cantonId: 18, incomeTaxFactor: 0.25 },
    // Solothurn
    6: { type: "Tarif", cantonId: 6 },
    // Basel-Stadt
    5: { type: "Tarif", cantonId: 5, maxTaxFactor: 0.045 },
    // Basel-Landschaft
    17: { type: "IncomeTaxFactor", cantonId: 17, incomeTaxFactor: 0.2 },
    // Schaffhausen
    3: { type: "Tarif", cantonId: 3 },
    // Appenzell Ausserrhoden
    2: { type: "IncomeTaxFactor", cantonId: 2, incomeTaxFactor: 0.25, minTaxFactor: 5e-3 },
    // Appenzell Innerrhoden
    16: { type: "Flattax", cantonId: 16 },
    // St. Gallen
    10: {
      type: "RentIncomeFactorOwn",
      cantonId: 10,
      rentIncomeFactor: 1 / 15,
      minTaxFactor: 0.015,
      maxTaxFactor: 0.02
    },
    // Graubünden
    1: { type: "IncomeTaxFactor", cantonId: 1, incomeTaxFactor: 0.3, minTaxFactor: 0.01 },
    // Aargau
    20: { type: "Flattax", cantonId: 20 },
    // Thurgau
    21: { type: "RentIncomeFactor", cantonId: 21, rentIncomeFactor: 0.068, minTaxFactor: 0.02 },
    // Tessin
    23: { type: "IncomeTaxFactor", cantonId: 23, incomeTaxFactor: 0.33 },
    // Waadt
    24: { type: "RentIncomeFactor", cantonId: 24, rentIncomeFactor: 0.068, minTaxFactor: 0.02 },
    // Wallis
    13: { type: "IncomeTaxFactor", cantonId: 13, incomeTaxFactor: 0.25, minTaxFactor: 0.025 },
    // Neuenburg
    8: { type: "IncomeTaxFactor", cantonId: 8, incomeTaxFactor: 0.2 },
    // Genf
    11: { type: "Tarif", cantonId: 11 }
    // Jura
  };
  var calculatePensionCapitalTaxes = async (taxInput) => {
    const definitionCanton = getPensionCreditDefinition(taxInput.cantonId);
    const definitionBund = getPensionCreditDefinition(0);
    const taxesBund = dineroRound(
      await calculateTaxesPensionCapitalByDefinition(taxInput, definitionBund)
    );
    const taxesBaseCanton = await calculateTaxesPensionCapitalByDefinition(
      taxInput,
      definitionCanton
    );
    const taxesBaseChurch = calculateTaxesBaseChurchByDefinition(
      taxInput,
      definitionCanton,
      taxesBaseCanton
    );
    const { taxesIncomeCanton, taxesIncomeCity, taxesIncomeChurch } = await calculateTaxesCantonAndCity(taxInput, taxesBaseCanton, taxesBaseChurch, dineroChf(0));
    const taxesTotal = dineroAddMany(
      taxesBund,
      taxesIncomeCanton,
      taxesIncomeCity,
      taxesIncomeChurch
    );
    const result = {
      input: taxInput,
      taxesIncomeCanton: dineroToNumber(taxesIncomeCanton),
      taxesIncomeCity: dineroToNumber(taxesIncomeCity),
      taxesIncomeChurch: dineroToNumber(taxesIncomeChurch),
      taxesFortuneCanton: 0,
      taxesFortuneCity: 0,
      taxesFortuneChurch: 0,
      taxesIncomeBund: dineroToNumber(taxesBund),
      taxesPersonnel: 0,
      taxesTotal: dineroToNumber(taxesTotal),
      details: {
        netIncomeBund: taxInput.fortune,
        netIncomeCanton: taxInput.fortune,
        deductionsIncome: [],
        deductionsFortune: [],
        taxableFortuneCanton: 0,
        taxableIncomeCanton: taxInput.fortune,
        taxableIncomeBund: taxInput.fortune
      }
    };
    return result;
  };
  var calculateTaxesBaseChurchByDefinition = (taxInput, definition, taxesBaseCanton) => {
    const capital = dineroChf(taxInput.fortune);
    if (definition.taxFactorChurch) {
      return multiplyDineroFactor(capital, definition.taxFactorChurch, 7);
    }
    return taxesBaseCanton;
  };
  var calculateTaxesPensionCapitalByDefinition = async (taxInput, definition) => {
    const taxes = await calculateTaxesPensionCapitalByType(taxInput, definition);
    return calculateMinMaxTaxes(taxInput, taxes, definition);
  };
  var calculateTaxesPensionCapitalByType = async (taxInput, definition) => {
    const tarifGroup = getTaxTarifGroup(taxInput.relationship, taxInput.children);
    const capital = dineroChf(taxInput.fortune);
    switch (definition.type) {
      case "IncomeTaxFactor":
        if (!definition.incomeTaxFactor)
          throw new Error("IncomeTaxFactor must be defined");
        return await calculatePensionCapitalIncomeTaxes({
          tarifGroup,
          cantonId: definition.cantonId,
          year: taxInput.year,
          capital,
          incomeTaxFactor: definition.incomeTaxFactor
        });
      case "RentIncomeFactor":
        if (!definition.rentIncomeFactor)
          throw new Error("RentIncomeFactor must be defined");
        return await calculatePensionCapitalRentIncomeTaxes({
          tarifGroup,
          tarifType: "EINKOMMENSSTEUER",
          cantonId: definition.cantonId,
          year: taxInput.year,
          capital,
          rentIncomeFactor: definition.rentIncomeFactor
        });
      case "RentIncomeFactorOwn":
        if (!definition.rentIncomeFactor)
          throw new Error("RentIncomeFactor must be defined");
        return await calculatePensionCapitalRentIncomeTaxes({
          tarifGroup,
          tarifType: "VORSORGESTEUER",
          cantonId: definition.cantonId,
          year: taxInput.year,
          capital,
          rentIncomeFactor: definition.rentIncomeFactor
        });
      case "Flattax":
      case "Tarif":
        return await calculatePensionCapitalTarifOrFlatTaxes({
          tarifGroup,
          cantonId: definition.cantonId,
          year: taxInput.year,
          capital
        });
    }
  };
  var calculateMinMaxTaxes = (taxInput, taxes, definition) => {
    if (definition.minTaxFactor) {
      taxes = dineroMax(
        taxes,
        multiplyDineroFactor(dineroChf(taxInput.fortune), definition.minTaxFactor, 7)
      );
    }
    if (definition.maxTaxFactor) {
      taxes = dineroMin(
        taxes,
        multiplyDineroFactor(dineroChf(taxInput.fortune), definition.maxTaxFactor, 7)
      );
    }
    return taxes;
  };
  var calculatePensionCapitalRentIncomeTaxes = async ({
    tarifGroup,
    tarifType,
    cantonId,
    year,
    capital,
    rentIncomeFactor
  }) => {
    const capitalReduced = dineroRound100Down(multiplyDineroFactor(capital, rentIncomeFactor, 7));
    if (isZero2(capitalReduced)) {
      return dineroChf(0);
    }
    const taxesReduced = await calculateTaxesForTarif(
      cantonId,
      year,
      tarifGroup,
      tarifType,
      capitalReduced
    );
    const percentFactor = dineroToNumber(taxesReduced) / dineroToNumber(capitalReduced);
    const taxes = multiplyDineroFactor(capital, percentFactor, 7);
    return taxes;
  };
  var calculatePensionCapitalIncomeTaxes = async ({
    tarifGroup,
    cantonId,
    year,
    capital,
    incomeTaxFactor
  }) => {
    const taxesIncomeBase = await calculateTaxesForTarif(
      cantonId,
      year,
      tarifGroup,
      "EINKOMMENSSTEUER",
      capital
    );
    const taxesIncome = multiplyDineroFactor(taxesIncomeBase, incomeTaxFactor, 7);
    return taxesIncome;
  };
  var calculatePensionCapitalTarifOrFlatTaxes = async ({
    tarifGroup,
    cantonId,
    year,
    capital
  }) => {
    const taxes = await calculateTaxesForTarif(cantonId, year, tarifGroup, "VORSORGESTEUER", capital);
    return taxes;
  };
  var locationsByYearAndCity = /* @__PURE__ */ new Map();
  var locationsByYear = /* @__PURE__ */ new Map();
  var loadLocationsIfRequired = async (year) => {
    if (locationsByYearAndCity.has(year))
      return;
    const filePath = `${dataParsedBasePath}${year}/locations.json`;
    const fileContents = await readFile(filePath);
    const locations = JSON.parse(fileContents);
    const locationsByCity = /* @__PURE__ */ new Map();
    locationsByYearAndCity.set(year, locationsByCity);
    locations.forEach((location) => {
      locationsByCity.set(location.BfsID, location);
    });
    locationsByYear.set(year, locations);
  };
  var getTaxLocations = async (year) => {
    await loadLocationsIfRequired(year);
    return locationsByYear.get(year);
  };
  var bfsIdsForPostalCode = async (postalCode, year) => {
    await loadLocationsIfRequired(year);
    const locations = locationsByYear.get(year);
    if (locations) {
      const matchingBfsIds = [];
      for (const location of locations) {
        const matchingZipCode = location.ZipCodes?.find(
          (zipCode) => zipCode.postalCode === postalCode
        );
        if (matchingZipCode) {
          matchingBfsIds.push(location.BfsID);
        }
      }
      return matchingBfsIds.length > 0 ? matchingBfsIds : null;
    }
    return null;
  };
  var calculateTaxes = async (taxInput) => {
    switch (taxInput.calculationType) {
      case "incomeAndWealth":
        return await calculateTaxesIncomeAndFortune(taxInput);
      case "capital":
        return await calculatePensionCapitalTaxes(taxInput);
    }
    throw new Error("Tax type not supported");
  };
  var getBfsIdsForPostalCode = async (postalCode, year) => {
    return await bfsIdsForPostalCode(postalCode, year);
  };
  var getTaxesLocationForYear = getTaxLocations;

  // extension/contentScript.js
  function formatCHF(amount) {
    const formatter = new Intl.NumberFormat("de-CH", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    return `${formatter.format(amount)} CHF`;
  }
  console.log("SwissTaxCalculator", "module loaded");
  (async () => {
    console.log("SwissTaxCalculator", "init");
    await new Promise((resolve) => setTimeout(resolve, 3e3));
    console.log("SwissTaxCalculator", "will start");
    try {
      const placeElement = document.querySelector('[itemtype="https://schema.org/Place"]');
      if (!placeElement) {
        console.warn("Place element not found.");
        return;
      }
      const placeText = placeElement.textContent || "";
      const postalCodeMatch = placeText.match(/,*\s*(\d{4})/);
      if (!postalCodeMatch) {
        console.warn("Postal code not found in the place element.");
        return;
      }
      const postalCode = postalCodeMatch[1];
      console.log("Found postal code:", postalCode);
      const calculationResult = await calculateTaxesAsync(postalCode);
      console.log("Calculation result:", calculationResult);
      const priceElement = document.querySelector('[data-cy="price"]');
      if (!priceElement) {
        console.warn("Price element not found.");
        return;
      }
      const resultElement = document.createElement("div");
      resultElement.textContent = `Taxes per year: ${formatCHF(calculationResult.new)} (diff: ${formatCHF(calculationResult.new - calculationResult.old)} - per month (${formatCHF((calculationResult.new - calculationResult.old) / 12)}))`;
      resultElement.style.marginTop = "10px";
      resultElement.style.fontWeight = "bold";
      console.log("SwissTaxCalculator", "before injection");
      priceElement.insertAdjacentElement("afterend", resultElement);
      console.log("SwissTaxCalculator", "after injection");
    } catch (error) {
      console.error("Error in content script:", error);
    }
  })();
  async function calculateTaxesAsync(postalCode) {
    console.log("SwissTaxCalculator", "calculate", postalCode);
    const bfsIds = await getBfsIdsForPostalCode(postalCode, 2025);
    const bfsId = bfsIds[0];
    const locations = await getTaxesLocationForYear(2025);
    const cantonId = locations?.find((x) => x.BfsID === bfsId)?.CantonID;
    const taxInput = await new Promise((resolve, reject) => {
      chrome.storage.sync.get("taxInput", (data) => {
        if (data && data.taxInput) {
          console.log("SwissTaxCalculator", "from saved data");
          resolve(data.taxInput);
        } else {
          console.log("SwissTaxCalculator", "no saved data");
          resolve({
            calculationType: "incomeAndWealth",
            children: 0,
            fortune: 25e4,
            locationId: bfsId,
            relationship: "s",
            year: 2022,
            persons: [
              {
                age: 30,
                confession: "roman",
                income: 1e5,
                incomeType: "gross",
                pkDeduction: 5e3
              }
            ],
            cantonId
          });
        }
      });
    });
    const oldTaxes = await calculateTaxes(taxInput);
    const newTaxes = await calculateTaxes({ ...taxInput, locationId: bfsId, cantonId });
    return { new: newTaxes.taxesTotal, old: oldTaxes.taxesTotal };
  }
})();
