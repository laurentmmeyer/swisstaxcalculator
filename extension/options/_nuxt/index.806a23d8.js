import { a as defineComponent, b as useAttrs, r as ref, e as computed, o as openBlock, f as createElementBlock, h as createBaseVNode, i as renderSlot, m as mergeProps, u as unref, j as createVNode, w as withCtx, F as Fragment, k as renderList, l as resolveComponent, c as createBlock, _ as __vitePreload, p as withAsyncContext, q as isRef, s as createCommentVNode, t as createTextVNode, v as toDisplayString, x as normalizeStyle } from "./entry.1215c3a5.js";
const _hoisted_1$2 = ["disabled"];
const _hoisted_2$1 = { class: "flex items-center gap-2" };
const __default__ = {
  inheritAttrs: false
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...__default__,
  __name: "button",
  props: {
    variant: { type: String, default: "primary" },
    size: { type: String, default: "md" },
    loading: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const attrsSource = useAttrs();
    const isLoading = ref(false);
    const clickWithLoading = async (e) => {
      isLoading.value = true;
      if (attrsSource == null ? void 0 : attrsSource.onClick) {
        await attrsSource.onClick(e);
      }
      isLoading.value = false;
    };
    const attrs = { ...attrsSource, onClick: clickWithLoading };
    const classes = computed(() => {
      let button = "inline-flex justify-center items-center border font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-normal-200 disabled:text-normal-500 ";
      switch (props.variant) {
        case "primary":
          button += "border-transparent bg-primary-600 text-white shadow-sm hover:bg-primary-700";
          break;
        case "secondary":
          button += "border-transparent bg-primary-100 text-primary-700 hover:bg-primary-200";
          break;
        case "tertiary":
          button += "border-normal-300 bg-white text-normal-700 shadow-sm hover:bg-normal-50";
          break;
        case "danger":
          button += "border-transparent bg-danger-600 text-white shadow-sm hover:bg-danger-700";
          break;
      }
      let icon = "";
      switch (props.size) {
        case "xs":
          button += " rounded text-xs px-2.5 py-1.5";
          icon += " -ml-0.5 mr-2 h-4 w-4";
          break;
        case "sm":
          button += " rounded-md text-sm px-3 py-2";
          icon += " -ml-0.5 mr-2 h-4 w-4";
          break;
        case "md":
          button += " rounded-md text-sm px-4 py-2";
          icon += " -ml-1 mr-2 h-5 w-5";
          break;
        case "lg":
          button += " rounded-md text-base px-4 py-2";
          icon += " -ml-1 mr-3 h-5 w-5";
          break;
        case "xl":
          button += " rounded-md text-base px-6 py-3";
          icon += " -ml-1 mr-3 h-5 w-5";
          break;
      }
      return { button, icon };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", mergeProps(attrs, {
        class: unref(classes).button,
        disabled: unref(isLoading) || __props.loading || !!attrs.disabled
      }), [
        createBaseVNode("div", _hoisted_2$1, [
          renderSlot(_ctx.$slots, "default")
        ])
      ], 16, _hoisted_1$2);
    };
  }
});
const _hoisted_1$1 = { class: "grid grid-cols-1 gap-4" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "taxDeductions",
  props: {
    deductions: null,
    childrenCount: null
  },
  setup(__props) {
    const props = __props;
    const deductionKeys = computed(
      () => Object.keys(props.deductions).filter(
        (deduction) => props.deductions[deduction].withChildrenOnly !== true || (props.childrenCount ?? 0) > 0
      )
    );
    const getDefaultValue = (deduction) => {
      const deductionConfig = props.deductions[deduction];
      if (deductionConfig.defaultFlatRate) {
        return void 0;
      }
      if (deductionConfig.default !== void 0)
        return deductionConfig.default;
      if (deductionConfig.defaultPerChild !== void 0 && props.childrenCount !== void 0) {
        return deductionConfig.defaultPerChild * props.childrenCount;
      }
      return void 0;
    };
    const getPlaceholder = (deduction) => {
      const deductionConfig = props.deductions[deduction];
      if (deductionConfig.defaultFlatRate) {
        return "pauschal";
      }
      if (deductionConfig.default !== void 0)
        return deductionConfig.default;
      if (deductionConfig.defaultPerChild !== void 0 && props.childrenCount !== void 0) {
        return deductionConfig.defaultPerChild * props.childrenCount;
      }
      return 0;
    };
    return (_ctx, _cache) => {
      const _component_FormKit = resolveComponent("FormKit");
      return openBlock(), createElementBlock("div", null, [
        createVNode(_component_FormKit, {
          type: "group",
          name: "deductions"
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_1$1, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(deductionKeys), (deduction) => {
                return openBlock(), createBlock(_component_FormKit, {
                  key: deduction,
                  id: deduction,
                  name: deduction,
                  label: props.deductions[deduction].label.de,
                  "wrapper-class": "flex items-center",
                  "label-class": "flex-1 mr-4",
                  "inner-class": "flex-1",
                  type: "numberSuffix",
                  suffix: "CHF",
                  value: getDefaultValue(deduction),
                  placeholder: getPlaceholder(deduction),
                  validation: "min:0",
                  min: 0
                }, null, 8, ["id", "name", "label", "value", "placeholder"]);
              }), 128))
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
});
const round = (input, maxFractionDigits = 0) => {
  if (maxFractionDigits === 0)
    return Math.round(input);
  const factor = Math.pow(10, maxFractionDigits);
  if (maxFractionDigits > 0)
    return Math.round((input + Number.EPSILON) * factor) / factor;
  return Math.round((input + Number.EPSILON) / factor) * factor;
};
const displayCurrency = (input, maxFractionDigits = 0) => {
  return round(input, maxFractionDigits).toLocaleString("de-CH");
};
const displayCurrencyShort = (input, maxFractionDigits = 0) => {
  return `${displayCurrency(input, maxFractionDigits)} CHF`;
};
var tsSimpleNameof = {};
var nameof$1 = {};
Object.defineProperty(nameof$1, "__esModule", { value: true });
nameof$1.nameof = void 0;
function cleanseAssertionOperators(parsedName) {
  return parsedName.replace(/[?!]/g, "");
}
function nameof(nameFunction, options) {
  var fnStr = nameFunction.toString();
  if (fnStr.startsWith("class ") && !fnStr.startsWith("class =>")) {
    return cleanseAssertionOperators(fnStr.substring("class ".length, fnStr.indexOf(" {")));
  }
  if (fnStr.includes("=>")) {
    return cleanseAssertionOperators(fnStr.substring(fnStr.indexOf(".") + 1));
  }
  var matchRegex = /function\s*\(\w+\)\s*\{[\r\n\s]*return\s+\w+\.((\w+\.)*(\w+))/i;
  var es5Match = fnStr.match(matchRegex);
  if (es5Match) {
    return options && options.lastProp ? es5Match[3] : es5Match[1];
  }
  if (fnStr.startsWith("function ")) {
    return cleanseAssertionOperators(fnStr.substring("function ".length, fnStr.indexOf("(")));
  }
  throw new Error("ts-simple-nameof: Invalid function.");
}
nameof$1.nameof = nameof;
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.nameof = void 0;
  var nameof_1 = nameof$1;
  Object.defineProperty(exports, "nameof", { enumerable: true, get: function() {
    return nameof_1.nameof;
  } });
})(tsSimpleNameof);
const maxSalaryNbuAlv = 148200;
const taxDeductionsPerson = {
  insurancePremiums: {
    label: { de: "Versicherungsprämien und Zinsen von Sparkapitalien" },
    hint: {
      de: "Versicherungsprämien und Zinsen von Sparkapitalien, abzüglich individuelle Prämienverbilligung. Annahme: 4'560 CHF pro Erwachsenen (380 CHF monatlich)"
    },
    default: 4560
  },
  pillar3a: {
    label: { de: "Beiträge an Säule 3a" }
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
    label: { de: "Übrige Abzüge" }
  }
};
const taxDeductionsGeneral = {
  insurancePremiumsKids: {
    label: { de: "Versicherungsprämien Kinder" },
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
    label: { de: "Unterhaltskosten für Liegenschaften" }
  },
  otherDeductions: {
    label: { de: "Übrige Abzüge" }
  }
};
const dataParsedRelativePath = "data/parsed/";
const dataParsedBasePath = `./${dataParsedRelativePath}`;
const taxCalculationTypes = [
  { value: "incomeAndWealth", label: { de: "Einkommens- und Vermögensstauer" } },
  { value: "capital", label: { de: "Vorsorge Kapitalsteuer" } }
];
const taxRelationships = [
  { value: "s", label: { de: "Alleinstehend" } },
  { value: "m", label: { de: "Verheiratet" } },
  { value: "rp", label: { de: "Eingetragene Partnerschaft" } },
  { value: "c", label: { de: "Konkubinat" } }
];
const taxConfessions = [
  { value: "christ", label: { de: "Christkatholisch" } },
  { value: "roman", label: { de: "Römisch-katholisch" } },
  { value: "protestant", label: { de: "Reformiert" } },
  { value: "other", label: { de: "Andere / Keine" } }
];
const taxIncomeTypes = [
  { value: "gross", label: { de: "Brutto" } },
  { value: "net", label: { de: "Netto" } },
  { value: "taxable", label: { de: "Steuerpflichtig" } }
];
const taxInputData = {
  calculationTypes: taxCalculationTypes,
  years: [2022, 2024],
  relationships: taxRelationships,
  confessions: taxConfessions,
  incomeTypes: taxIncomeTypes,
  deductionsGeneral: taxDeductionsGeneral,
  deductionsPerson: taxDeductionsPerson
};
const childrenOptions = [
  { value: 0, label: "Keine" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" }
];
const readFile = async (filePath) => {
  if (typeof window === "undefined") {
    const { readFile: readFile2 } = await __vitePreload(() => import("./__vite-browser-external.d06ac358.js"), true ? [] : void 0, import.meta.url);
    return readFile2(filePath, "utf-8");
  } else {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch file at ${filePath}`);
    }
    return response.text();
  }
};
const locationsByYearAndCity = /* @__PURE__ */ new Map();
const locationsByYear = /* @__PURE__ */ new Map();
const loadLocationsIfRequired = async (year) => {
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
const getTaxLocations = async (year) => {
  await loadLocationsIfRequired(year);
  return locationsByYear.get(year);
};
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
function greaterThan$1(calculator2) {
  return function(subject, comparator) {
    return calculator2.compare(subject, comparator) === ComparisonOperator.GT;
  };
}
function greaterThanOrEqual$1(calculator2) {
  return function(subject, comparator) {
    return greaterThan$1(calculator2)(subject, comparator) || equal(calculator2)(subject, comparator);
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
function _toConsumableArray$1(arr) {
  return _arrayWithoutHoles$1(arr) || _iterableToArray$2(arr) || _unsupportedIterableToArray$a(arr) || _nonIterableSpread$1();
}
function _nonIterableSpread$1() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$a(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$a(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$a(o, minLen);
}
function _iterableToArray$2(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles$1(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray$a(arr);
}
function _arrayLikeToArray$a(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function getDivisors(calculator2) {
  var multiply3 = calculator2.multiply;
  return function(bases) {
    return bases.reduce(function(divisors, _, i) {
      var divisor = bases.slice(i).reduce(function(acc, curr) {
        return multiply3(acc, curr);
      });
      return [].concat(_toConsumableArray$1(divisors), [divisor]);
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
function lessThanOrEqual$1(calculator2) {
  return function(subject, comparator) {
    return lessThan(calculator2)(subject, comparator) || equal(calculator2)(subject, comparator);
  };
}
function maximum$1(calculator2) {
  var lessThanFn = lessThan(calculator2);
  return function(values) {
    return values.reduce(function(acc, curr) {
      return lessThanFn(acc, curr) ? curr : acc;
    });
  };
}
function minimum$1(calculator2) {
  var greaterThanFn = greaterThan$1(calculator2);
  return function(values) {
    return values.reduce(function(acc, curr) {
      return greaterThanFn(acc, curr) ? curr : acc;
    });
  };
}
function _toArray(arr) {
  return _arrayWithHoles$8(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$9(arr) || _nonIterableRest$8();
}
function _nonIterableRest$8() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$9(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$9(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$9(o, minLen);
}
function _arrayLikeToArray$9(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _iterableToArray$1(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithHoles$8(arr) {
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
  var greaterThanFn = greaterThan$1(calculator2);
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
  var greaterThanFn = greaterThan$1(calculator2);
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
  var greaterThanFn = greaterThan$1(calculator2);
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
function _slicedToArray$7(arr, i) {
  return _arrayWithHoles$7(arr) || _iterableToArrayLimit$7(arr, i) || _unsupportedIterableToArray$8(arr, i) || _nonIterableRest$7();
}
function _nonIterableRest$7() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$8(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$8(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$8(o, minLen);
}
function _arrayLikeToArray$8(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _iterableToArrayLimit$7(arr, i) {
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
function _arrayWithHoles$7(arr) {
  if (Array.isArray(arr))
    return arr;
}
function transformScale$1(calculator2) {
  var greaterThanFn = greaterThan$1(calculator2);
  var computeBaseFn = computeBase(calculator2);
  return function transformScaleFn() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0], newScale = _ref[1], _ref$ = _ref[2], divide = _ref$ === void 0 ? down : _ref$;
    var _dineroObject$toJSON = dineroObject.toJSON(), amount = _dineroObject$toJSON.amount, currency = _dineroObject$toJSON.currency, scale = _dineroObject$toJSON.scale;
    var isLarger = greaterThanFn(newScale, scale);
    var operation = isLarger ? calculator2.multiply : divide;
    var _ref2 = isLarger ? [newScale, scale] : [scale, newScale], _ref3 = _slicedToArray$7(_ref2, 2), a = _ref3[0], b = _ref3[1];
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
  var maximumFn = maximum$1(calculator2);
  var convertScaleFn = transformScale$1(calculator2);
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
function _slicedToArray$6(arr, i) {
  return _arrayWithHoles$6(arr) || _iterableToArrayLimit$6(arr, i) || _unsupportedIterableToArray$7(arr, i) || _nonIterableRest$6();
}
function _nonIterableRest$6() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$7(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$7(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$7(o, minLen);
}
function _arrayLikeToArray$7(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _iterableToArrayLimit$6(arr, i) {
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
function _arrayWithHoles$6(arr) {
  if (Array.isArray(arr))
    return arr;
}
function unsafeAdd(calculator2) {
  return function add3() {
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
  return function add3() {
    for (var _len2 = arguments.length, _ref2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      _ref2[_key2] = arguments[_key2];
    }
    var augend = _ref2[0], addend = _ref2[1];
    var condition = haveSameCurrency([augend, addend]);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);
    var _normalizeFn = normalizeFn([augend, addend]), _normalizeFn2 = _slicedToArray$6(_normalizeFn, 2), newAugend = _normalizeFn2[0], newAddend = _normalizeFn2[1];
    return addFn(newAugend, newAddend);
  };
}
function _slicedToArray$5(arr, i) {
  return _arrayWithHoles$5(arr) || _iterableToArrayLimit$5(arr, i) || _unsupportedIterableToArray$6(arr, i) || _nonIterableRest$5();
}
function _nonIterableRest$5() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$6(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$6(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$6(o, minLen);
}
function _arrayLikeToArray$6(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _iterableToArrayLimit$5(arr, i) {
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
function _arrayWithHoles$5(arr) {
  if (Array.isArray(arr))
    return arr;
}
function unsafeGreaterThan(calculator2) {
  var greaterThanFn = greaterThan$1(calculator2);
  return function greaterThan2() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0], comparator = _ref[1];
    var dineroObjects = [dineroObject, comparator];
    var _dineroObjects$map = dineroObjects.map(function(d) {
      var _d$toJSON = d.toJSON(), amount = _d$toJSON.amount;
      return amount;
    }), _dineroObjects$map2 = _slicedToArray$5(_dineroObjects$map, 2), subjectAmount = _dineroObjects$map2[0], comparatorAmount = _dineroObjects$map2[1];
    return greaterThanFn(subjectAmount, comparatorAmount);
  };
}
function safeGreaterThan(calculator2) {
  var normalizeFn = normalizeScale(calculator2);
  var greaterThanFn = unsafeGreaterThan(calculator2);
  return function greaterThan2() {
    for (var _len2 = arguments.length, _ref2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      _ref2[_key2] = arguments[_key2];
    }
    var dineroObject = _ref2[0], comparator = _ref2[1];
    var condition = haveSameCurrency([dineroObject, comparator]);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);
    var _normalizeFn = normalizeFn([dineroObject, comparator]), _normalizeFn2 = _slicedToArray$5(_normalizeFn, 2), subjectAmount = _normalizeFn2[0], comparatorAmount = _normalizeFn2[1];
    return greaterThanFn(subjectAmount, comparatorAmount);
  };
}
function _slicedToArray$4(arr, i) {
  return _arrayWithHoles$4(arr) || _iterableToArrayLimit$4(arr, i) || _unsupportedIterableToArray$5(arr, i) || _nonIterableRest$4();
}
function _nonIterableRest$4() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$5(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$5(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$5(o, minLen);
}
function _arrayLikeToArray$5(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _iterableToArrayLimit$4(arr, i) {
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
function _arrayWithHoles$4(arr) {
  if (Array.isArray(arr))
    return arr;
}
function unsafeGreaterThanOrEqual(calculator2) {
  var greaterThanOrEqualFn = greaterThanOrEqual$1(calculator2);
  return function greaterThanOrEqual2() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0], comparator = _ref[1];
    var dineroObjects = [dineroObject, comparator];
    var _dineroObjects$map = dineroObjects.map(function(d) {
      var _d$toJSON = d.toJSON(), amount = _d$toJSON.amount;
      return amount;
    }), _dineroObjects$map2 = _slicedToArray$4(_dineroObjects$map, 2), subjectAmount = _dineroObjects$map2[0], comparatorAmount = _dineroObjects$map2[1];
    return greaterThanOrEqualFn(subjectAmount, comparatorAmount);
  };
}
function safeGreaterThanOrEqual(calculator2) {
  var normalizeFn = normalizeScale(calculator2);
  var greaterThanOrEqualFn = unsafeGreaterThanOrEqual(calculator2);
  return function greaterThanOrEqual2() {
    for (var _len2 = arguments.length, _ref2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      _ref2[_key2] = arguments[_key2];
    }
    var dineroObject = _ref2[0], comparator = _ref2[1];
    var condition = haveSameCurrency([dineroObject, comparator]);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);
    var _normalizeFn = normalizeFn([dineroObject, comparator]), _normalizeFn2 = _slicedToArray$4(_normalizeFn, 2), subjectAmount = _normalizeFn2[0], comparatorAmount = _normalizeFn2[1];
    return greaterThanOrEqualFn(subjectAmount, comparatorAmount);
  };
}
function isZero$1(calculator2) {
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
function _slicedToArray$3(arr, i) {
  return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i) || _unsupportedIterableToArray$4(arr, i) || _nonIterableRest$3();
}
function _nonIterableRest$3() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$4(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$4(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$4(o, minLen);
}
function _arrayLikeToArray$4(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _iterableToArrayLimit$3(arr, i) {
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
function _arrayWithHoles$3(arr) {
  if (Array.isArray(arr))
    return arr;
}
function unsafeLessThanOrEqual(calculator2) {
  var lessThanOrEqualFn = lessThanOrEqual$1(calculator2);
  return function lessThanOrEqual2() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0], comparator = _ref[1];
    var dineroObjects = [dineroObject, comparator];
    var _dineroObjects$map = dineroObjects.map(function(d) {
      var _d$toJSON = d.toJSON(), amount = _d$toJSON.amount;
      return amount;
    }), _dineroObjects$map2 = _slicedToArray$3(_dineroObjects$map, 2), subjectAmount = _dineroObjects$map2[0], comparatorAmount = _dineroObjects$map2[1];
    return lessThanOrEqualFn(subjectAmount, comparatorAmount);
  };
}
function safeLessThanOrEqual(calculator2) {
  var normalizeFn = normalizeScale(calculator2);
  var lessThanOrEqualFn = unsafeLessThanOrEqual(calculator2);
  return function lessThanOrEqual2() {
    for (var _len2 = arguments.length, _ref2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      _ref2[_key2] = arguments[_key2];
    }
    var dineroObject = _ref2[0], comparator = _ref2[1];
    var condition = haveSameCurrency([dineroObject, comparator]);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);
    var _normalizeFn = normalizeFn([dineroObject, comparator]), _normalizeFn2 = _slicedToArray$3(_normalizeFn, 2), subjectAmount = _normalizeFn2[0], comparatorAmount = _normalizeFn2[1];
    return lessThanOrEqualFn(subjectAmount, comparatorAmount);
  };
}
function _slicedToArray$2(arr, i) {
  return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest$2();
}
function _nonIterableRest$2() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$3(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$3(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$3(o, minLen);
}
function _arrayLikeToArray$3(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _iterableToArrayLimit$2(arr, i) {
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
function _arrayWithHoles$2(arr) {
  if (Array.isArray(arr))
    return arr;
}
function unsafeMaximum(calculator2) {
  var maxFn = maximum$1(calculator2);
  return function maximum2() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObjects = _ref[0];
    var _dineroObjects = _slicedToArray$2(dineroObjects, 1), firstDinero = _dineroObjects[0];
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
  return function maximum2() {
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
function _slicedToArray$1(arr, i) {
  return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$1();
}
function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$2(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$2(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$2(o, minLen);
}
function _arrayLikeToArray$2(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _iterableToArrayLimit$1(arr, i) {
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
function _arrayWithHoles$1(arr) {
  if (Array.isArray(arr))
    return arr;
}
function unsafeMinimum(calculator2) {
  var minFn = minimum$1(calculator2);
  return function minimum2() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObjects = _ref[0];
    var _dineroObjects = _slicedToArray$1(dineroObjects, 1), firstDinero = _dineroObjects[0];
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
  return function maximum2() {
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
function multiply$2(calculator2) {
  var convertScaleFn = transformScale$1(calculator2);
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
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$1(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$1(o, minLen);
}
function _arrayLikeToArray$1(arr, len) {
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
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function unsafeSubtract(calculator2) {
  return function subtract3() {
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
  return function subtract3() {
    for (var _len2 = arguments.length, _ref2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      _ref2[_key2] = arguments[_key2];
    }
    var minuend = _ref2[0], subtrahend = _ref2[1];
    var condition = haveSameCurrency([minuend, subtrahend]);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);
    var _normalizeFn = normalizeFn([minuend, subtrahend]), _normalizeFn2 = _slicedToArray(_normalizeFn, 2), newMinuend = _normalizeFn2[0], newSubtrahend = _normalizeFn2[1];
    return subtractFn(newMinuend, newSubtrahend);
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
      return [].concat(_toConsumableArray(amounts.filter(function(_, i) {
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
function toDecimal$1(calculator2) {
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
function toSnapshot$1(dineroObject) {
  return dineroObject.toJSON();
}
function trimScale$1(calculator2) {
  var countTrailingZerosFn = countTrailingZeros(calculator2);
  var equalFn = equal(calculator2);
  var maximumFn = maximum$1(calculator2);
  var transformScaleFn = transformScale$1(calculator2);
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
function add$1() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var augend = _ref[0], addend = _ref[1];
  var calculator2 = augend.calculator;
  var addFn = safeAdd(calculator2);
  return addFn(augend, addend);
}
function greaterThan() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var dineroObject = _ref[0], comparator = _ref[1];
  var calculator2 = dineroObject.calculator;
  var greaterThanFn = safeGreaterThan(calculator2);
  return greaterThanFn(dineroObject, comparator);
}
function greaterThanOrEqual() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var dineroObject = _ref[0], comparator = _ref[1];
  var calculator2 = dineroObject.calculator;
  var greaterThanOrEqualFn = safeGreaterThanOrEqual(calculator2);
  return greaterThanOrEqualFn(dineroObject, comparator);
}
function isZero() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var dineroObject = _ref[0];
  var calculator2 = dineroObject.calculator;
  var isZeroFn = isZero$1(calculator2);
  return isZeroFn(dineroObject);
}
function lessThanOrEqual() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var dineroObject = _ref[0], comparator = _ref[1];
  var calculator2 = dineroObject.calculator;
  var lessThanOrEqualFn = safeLessThanOrEqual(calculator2);
  return lessThanOrEqualFn(dineroObject, comparator);
}
function maximum() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var dineroObjects = _ref[0];
  var calculator2 = dineroObjects[0].calculator;
  var maximumFn = safeMaximum(calculator2);
  return maximumFn(dineroObjects);
}
function minimum() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var dineroObjects = _ref[0];
  var calculator2 = dineroObjects[0].calculator;
  var minimumFn = safeMinimum(calculator2);
  return minimumFn(dineroObjects);
}
function multiply$1() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var multiplicand = _ref[0], multiplier = _ref[1];
  var calculator2 = multiplicand.calculator;
  var multiplyFn = multiply$2(calculator2);
  return multiplyFn(multiplicand, multiplier);
}
function subtract$1() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var minuend = _ref[0], subtrahend = _ref[1];
  var calculator2 = minuend.calculator;
  var subtractFn = safeSubtract(calculator2);
  return subtractFn(minuend, subtrahend);
}
function toDecimal() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var dineroObject = _ref[0], transformer = _ref[1];
  var calculator2 = dineroObject.calculator;
  var toDecimalFn = toDecimal$1(calculator2);
  return toDecimalFn(dineroObject, transformer);
}
var toSnapshot = toSnapshot$1;
function transformScale() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var dineroObject = _ref[0], newScale = _ref[1], divide = _ref[2];
  var calculator2 = dineroObject.calculator;
  var transformScaleFn = transformScale$1(calculator2);
  return transformScaleFn(dineroObject, newScale, divide);
}
function trimScale() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var dineroObject = _ref[0];
  var calculator2 = dineroObject.calculator;
  var trimScaleFn = trimScale$1(calculator2);
  return trimScaleFn(dineroObject);
}
var add = function add2(augend, addend) {
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
var multiply = function multiply2(multiplicand, multiplier) {
  return multiplicand * multiplier;
};
var power = function power2(base, exponent) {
  return Math.pow(base, exponent);
};
var subtract = function subtract2(minuend, subtrahend) {
  return minuend - subtrahend;
};
function zero() {
  return 0;
}
var calculator = {
  add,
  compare,
  decrement,
  increment,
  integerDivide,
  modulo,
  multiply,
  power,
  subtract,
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
const dineroAddMany = (...addends) => addends.reduce(add$1);
const dineroSubtractMany = (...addends) => addends.reduce(subtract$1);
const transformNumber = ({ value }) => {
  return Number(value);
};
const dineroRound = (input, scale = 0) => transformScale(input, scale, halfEven);
const dineroRound100Down = (input) => transformScale(transformScale(input, -2, down), 0, down);
const dineroRoundMin0 = (input, scale = 0) => transformScale(dineroMax(input, dineroChf(0)), scale, halfEven);
const dineroChf = (amount, scale) => {
  const scaleResult = scale ?? CHF.exponent;
  const factor = 10 ** scaleResult;
  const amountResult = Math.round(amount * factor);
  return dinero({ amount: amountResult, currency: CHF, scale: scaleResult });
};
const dineroScaledPercent = (value, precision) => {
  const factor = 10 ** precision;
  const amount = Math.round(value * factor);
  return { amount, scale: precision + 2 };
};
const dineroScaledFactor = (value, precision) => {
  const factor = 10 ** precision;
  const amount = Math.round(value * factor);
  return { amount, scale: precision };
};
const multiplyDineroPercent = (input, percent, precision) => {
  return trimScale(multiply$1(input, dineroScaledPercent(percent, precision)));
};
const multiplyDineroFactor = (input, factor, precision) => {
  return trimScale(multiply$1(input, dineroScaledFactor(factor, precision)));
};
const dineroToNumber = (input) => toDecimal(input, transformNumber);
const dineroMin = (...dineros) => {
  return minimum(dineros);
};
const dineroMax = (...dineros) => {
  return maximum(dineros);
};
const sortArray = (array, selector, order = "asc") => {
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
const taxDeductionDefinitions = [
  {
    id: "HauptErw_EK",
    name: taxDeductionsPerson.otherProfessionalExpenses.label.de,
    rule: () => true,
    input: (_, grossDeductions) => grossDeductions.filter((grossDeduction) => grossDeduction.netIncome > 0).map((grossDeduction, index) => {
      var _a;
      return {
        target: `P${index + 1}`,
        amount: grossDeduction.netIncome,
        min: (_a = grossDeduction.person.deductions) == null ? void 0 : _a.otherProfessionalExpenses
      };
    })
  },
  {
    id: "Fahrkosten_EK",
    rule: (taxInput) => taxInput.persons.some((p) => {
      var _a;
      return (((_a = p.deductions) == null ? void 0 : _a.travelExpenses) ?? 0) > 0;
    }),
    input: (_, grossDeductions) => grossDeductions.filter((grossDeduction) => grossDeduction.netIncome > 0).map((grossDeduction, index) => {
      var _a;
      return {
        target: `P${index + 1}`,
        amount: (_a = grossDeduction.person.deductions) == null ? void 0 : _a.travelExpenses
      };
    })
  },
  {
    id: "NebenErw_EK",
    rule: (taxInput) => taxInput.persons.some((p) => {
      var _a;
      return (((_a = p.deductions) == null ? void 0 : _a.professionalExpensesSideline) ?? 0) > 0;
    }),
    input: (_, grossDeductions) => grossDeductions.filter((gd) => {
      var _a;
      return (((_a = gd.person.deductions) == null ? void 0 : _a.professionalExpensesSideline) ?? 0) > 0;
    }).map((grossDeduction, index) => {
      var _a;
      return {
        target: `P${index + 1}`,
        amount: 0,
        // Einkommen Nebenerwerb kann aktuell nicht erfasst werden
        min: (_a = grossDeduction.person.deductions) == null ? void 0 : _a.professionalExpensesSideline
      };
    })
  },
  {
    id: "S3a_EK",
    name: taxDeductionsPerson.pillar3a.label.de,
    rule: () => true,
    input: (taxInput, _) => taxInput.persons.map((person, index) => {
      var _a;
      return {
        target: `P${index + 1}`,
        amount: (_a = person.deductions) == null ? void 0 : _a.pillar3a
      };
    })
  },
  {
    id: "KKSparLedigMitBVGS3a_EK",
    rule: (taxInput) => taxInput.relationship === "s",
    input: (taxInput) => {
      var _a;
      return [
        {
          amount: ((_a = taxInput.persons[0].deductions) == null ? void 0 : _a.insurancePremiums) ?? 4560
        }
      ];
    }
  },
  {
    id: "KKSparzVerhMitBVGS3a_EK",
    rule: (taxInput) => ["m", "rp"].includes(taxInput.relationship),
    input: (taxInput) => [
      {
        amount: taxInput.persons.reduce(
          (sum, person) => {
            var _a;
            return sum + (((_a = person.deductions) == null ? void 0 : _a.insurancePremiums) ?? 4560);
          },
          0
        )
      }
    ]
  },
  {
    id: "KKSparProKind_EK",
    rule: (taxInput) => taxInput.children > 0,
    input: (taxInput) => Array.from(Array(taxInput.children).keys()).map((_, index) => {
      var _a, _b;
      return {
        target: `K${index + 1}`,
        amount: ((_a = taxInput.deductions) == null ? void 0 : _a.insurancePremiumsKids) !== void 0 ? (((_b = taxInput.deductions) == null ? void 0 : _b.insurancePremiumsKids) ?? 0) / taxInput.children : 1400
      };
    })
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
    input: (taxInput) => Array.from(Array(taxInput.children).keys()).map((_, index) => {
      var _a;
      return {
        target: `K${index + 1}`,
        amount: (((_a = taxInput.deductions) == null ? void 0 : _a.childcareCosts) ?? 0) / taxInput.children
      };
    })
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
    rule: (taxInput, taxType) => taxType === "EINKOMMENSSTEUER" && taxInput.persons.some((p) => {
      var _a;
      return ((_a = p.deductions) == null ? void 0 : _a.mealCosts) !== void 0;
    }),
    input: (_, grossDeductions) => grossDeductions.filter((grossDeduction) => grossDeduction.netIncome > 0).map((grossDeduction, index) => {
      var _a;
      return {
        target: `P${index + 1}`,
        amount: (_a = grossDeduction.person.deductions) == null ? void 0 : _a.mealCosts
      };
    })
  },
  {
    id: "Custom_OtherDeductions_Person_EK",
    applyAlways: true,
    name: taxDeductionsPerson.otherDeductions.label.de,
    rule: (taxInput, taxType) => taxType === "EINKOMMENSSTEUER" && taxInput.persons.some((p) => {
      var _a;
      return ((_a = p.deductions) == null ? void 0 : _a.otherDeductions) !== void 0;
    }),
    input: (taxInput, _) => taxInput.persons.map((person, index) => {
      var _a;
      return {
        target: `P${index + 1}`,
        amount: (_a = person.deductions) == null ? void 0 : _a.otherDeductions
      };
    })
  },
  {
    id: "Custom_OtherDeductions_General_EK",
    applyAlways: true,
    name: taxDeductionsGeneral.otherDeductions.label.de,
    rule: (taxInput, taxType) => {
      var _a;
      return taxType === "EINKOMMENSSTEUER" && ((_a = taxInput.deductions) == null ? void 0 : _a.otherDeductions) !== void 0;
    },
    input: (taxInput, _) => {
      var _a;
      return [
        {
          amount: (_a = taxInput.deductions) == null ? void 0 : _a.otherDeductions
        }
      ];
    }
  },
  {
    id: "Custom_DeptInterest_EK",
    applyAlways: true,
    name: taxDeductionsGeneral.debtInterest.label.de,
    rule: (taxInput, taxType) => {
      var _a;
      return taxType === "EINKOMMENSSTEUER" && ((_a = taxInput.deductions) == null ? void 0 : _a.debtInterest) !== void 0;
    },
    input: (taxInput, _) => {
      var _a;
      return [
        {
          amount: Math.min(((_a = taxInput.deductions) == null ? void 0 : _a.debtInterest) ?? 0, 5e4)
          // Abkürzung. Normalerweise müssten noch Zinserträge dazugerechnet werden.
        }
      ];
    }
  },
  {
    id: "Custom_MaintenanceCostsRealEstate_EK",
    applyAlways: true,
    name: taxDeductionsGeneral.maintenanceCostsRealEstate.label.de,
    rule: (taxInput, taxType) => {
      var _a;
      return taxType === "EINKOMMENSSTEUER" && ((_a = taxInput.deductions) == null ? void 0 : _a.maintenanceCostsRealEstate) !== void 0;
    },
    input: (taxInput, _) => {
      var _a;
      return [
        {
          amount: (_a = taxInput.deductions) == null ? void 0 : _a.maintenanceCostsRealEstate
        }
      ];
    }
  }
];
const calculateGrossNetDetails = (taxInput) => {
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
const calculateDeductionByDefinition = (deductionDefinition, taxInput, taxType, grossDeductions, deductionTableCanton, deductionTableBund) => {
  if (!deductionDefinition.rule(taxInput, taxType))
    return [];
  const deductionCanton = deductionTableCanton == null ? void 0 : deductionTableCanton.itemsById.get(deductionDefinition.id);
  const deductionBund = deductionTableBund == null ? void 0 : deductionTableBund.itemsById.get(deductionDefinition.id);
  const deductions = [];
  if (deductionCanton || deductionBund || deductionDefinition.applyAlways) {
    deductionDefinition.input(taxInput, grossDeductions).forEach((deductionInput) => {
      const amountOverride = deductionDefinition.applyAlways ? deductionInput.amount ?? 0 : 0;
      const amountCanton = deductionCanton ? calculateDeductionByFormat(deductionCanton, deductionInput.amount) : dineroChf(amountOverride);
      const amountBund = deductionBund ? calculateDeductionByFormat(deductionBund, deductionInput.amount) : dineroChf(amountOverride);
      const deduction = {
        id: deductionDefinition.id,
        name: deductionDefinition.name ?? (deductionCanton == null ? void 0 : deductionCanton.name.de) ?? (deductionBund == null ? void 0 : deductionBund.name.de) ?? "Unbekannter Abzug",
        target: deductionInput.target ?? "",
        amountCanton: getAmount(amountCanton, deductionInput),
        amountBund: getAmount(amountBund, deductionInput)
      };
      if (greaterThan(deduction.amountCanton, dineroChf(0)) || greaterThan(deduction.amountBund, dineroChf(0))) {
        deductions.push(deduction);
      }
    });
  }
  return deductions;
};
const getAmount = (amount, deductionInput) => {
  if (deductionInput.multiplier !== void 0) {
    amount = multiplyDineroFactor(amount, deductionInput.multiplier, 1);
  }
  if (deductionInput.min !== void 0) {
    amount = dineroMax(amount, dineroChf(deductionInput.min));
  }
  return amount;
};
const calculateDeductionByFormat = (deduction, amount = 0) => {
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
const taxDeductionsByYearAndCanton = /* @__PURE__ */ new Map();
const loadDeductionsIfRequired = async (cantonId, year) => {
  var _a;
  if ((_a = taxDeductionsByYearAndCanton.get(year)) == null ? void 0 : _a.has(cantonId))
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
const getTaxDecutionTable = async (cantonId, year, taxType) => {
  var _a, _b;
  await loadDeductionsIfRequired(cantonId, year);
  const deductionTable = (_b = (_a = taxDeductionsByYearAndCanton.get(year)) == null ? void 0 : _a.get(cantonId)) == null ? void 0 : _b.get(taxType);
  if (!deductionTable)
    throw new Error(`Deduction table not found for canton ${cantonId}, tax type ${taxType}`);
  return deductionTable;
};
const taxFactorsByYearCantonAndCity = /* @__PURE__ */ new Map();
const loadFactorsIfRequired = async (cantonId, year) => {
  let factorsByCantonAndCity = taxFactorsByYearCantonAndCity.get(year);
  let factorsByCity = factorsByCantonAndCity == null ? void 0 : factorsByCantonAndCity.get(cantonId);
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
const getTaxFactors = async (taxInput) => {
  var _a, _b;
  await loadFactorsIfRequired(taxInput.cantonId, taxInput.year);
  const factor = (_b = (_a = taxFactorsByYearCantonAndCity.get(taxInput.year)) == null ? void 0 : _a.get(taxInput.cantonId)) == null ? void 0 : _b.get(taxInput.locationId);
  if (!factor)
    throw new Error(
      `Factor not found for canton: ${taxInput.cantonId}, year: ${taxInput.year}, city: ${taxInput.locationId}`
    );
  return factor;
};
const getChurchIncomeFactor = (confession, factors) => {
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
const getChurchFortuneFactor = (confession, factors) => {
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
const calculateTaxesCantonAndCity = async (taxInput, taxesIncomeBase, taxesIncomeBaseChurch, taxesFortuneBase) => {
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
const validateTaxInput = (taxInput) => {
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
const personnelTaxes = {
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
const personnelTaxesByCanton = /* @__PURE__ */ new Map();
let taxesLoaded = false;
const loadPersonnelTaxesIfRequired = () => {
  if (taxesLoaded)
    return;
  Object.entries(personnelTaxes).forEach(([cantonId, personnelTax]) => {
    personnelTaxesByCanton.set(parseInt(cantonId), personnelTax);
  });
  taxesLoaded = true;
};
const getPersonnelTax = (cantonId) => {
  loadPersonnelTaxesIfRequired();
  const personnelTaxes2 = personnelTaxesByCanton.get(cantonId);
  if (!personnelTaxes2)
    throw new Error(`Personnel taxes not found for canton ${cantonId}`);
  return personnelTaxes2;
};
const calculateTaxesPersonnel = (taxInput) => {
  const taxes = getPersonnelTax(taxInput.cantonId);
  const amount = dineroChf(taxes.amount);
  return dineroRound(
    multiplyDineroFactor(amount, taxes.marriedBoth ? taxInput.persons.length : 1, 0)
  );
};
const taxTarifsByYearAndCanton = /* @__PURE__ */ new Map();
const loadTarifsIfRequired = async (cantonId, year) => {
  var _a;
  if ((_a = taxTarifsByYearAndCanton.get(year)) == null ? void 0 : _a.has(cantonId))
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
const getTaxTarifTable = async (cantonId, year, taxType, tarifGroup) => {
  var _a, _b;
  await loadTarifsIfRequired(cantonId, year);
  const tarifTables = (_b = (_a = taxTarifsByYearAndCanton.get(year)) == null ? void 0 : _a.get(cantonId)) == null ? void 0 : _b.get(taxType);
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
const getTaxTarifGroup = (relationship, children) => {
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
const isGroupEligableForSplitting = (group) => {
  if (["VERHEIRATET", "LEDIG_MIT_KINDER"].includes(group))
    return true;
  return false;
};
const calculateTaxesAmount = (amount, tarif) => {
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
const calculateTaxesByTypeZurich = (amount, tarif) => {
  let taxes = dineroChf(0);
  let remainingIncome = dinero(toSnapshot(amount));
  for (let i = 0; i < tarif.table.length; i++) {
    const tarifItem = tarif.table[i];
    const tarifAmount = dineroChf(tarifItem.amount);
    const usableIncome = greaterThanOrEqual(remainingIncome, tarifAmount) ? tarifAmount : remainingIncome;
    taxes = add$1(taxes, multiplyDineroPercent(usableIncome, tarifItem.percent, 5));
    remainingIncome = subtract$1(remainingIncome, usableIncome);
    if (isZero(remainingIncome)) {
      return taxes;
    }
  }
  return taxes;
};
const calculateTaxesByTypeFreiburg = (amount, tarif) => {
  let lastTarifItem;
  for (let i = 0; i < tarif.table.length; i++) {
    const tarifItem = tarif.table[i];
    const tarifAmount = dinero({ amount: tarifItem.amount, currency: CHF, scale: 0 });
    if (greaterThanOrEqual(tarifAmount, amount)) {
      if (!lastTarifItem || lastTarifItem.amount === 0)
        return dineroChf(0);
      const lastTarifAmount = dineroChf(lastTarifItem.amount);
      const lastPercent = lastTarifItem ? lastTarifItem.percent : 0;
      const percentDiff = tarifItem.percent - lastPercent;
      const partCount = dineroToNumber(subtract$1(tarifAmount, lastTarifAmount));
      const partPercentage = percentDiff / partCount;
      const partDiff = dineroToNumber(subtract$1(amount, lastTarifAmount));
      const finalPercentage = partDiff * partPercentage + lastPercent;
      return multiplyDineroPercent(amount, finalPercentage, 5);
    }
    lastTarifItem = tarifItem;
  }
  throw new Error(
    `No Tarif found for income ${toDecimal(amount)}, ${tarif.taxType}, ${tarif.tableType}`
  );
};
const calculateTaxesByTypeBund = (amount, tarif) => {
  let lastTarif;
  for (let i = 0; i < tarif.table.length; i++) {
    const tarifItem = tarif.table[i];
    const tarifAmount2 = dineroChf(tarifItem.amount);
    if (lessThanOrEqual(tarifAmount2, amount)) {
      lastTarif = tarifItem;
    } else {
      break;
    }
  }
  if (!lastTarif)
    throw new Error(
      `No Tarif found for income ${toDecimal(amount)}, ${tarif.taxType}, ${tarif.tableType}`
    );
  const tarifTaxes = dineroChf(lastTarif.taxes);
  const tarifAmount = dineroChf(lastTarif.amount);
  return add$1(
    tarifTaxes,
    multiplyDineroPercent(subtract$1(amount, tarifAmount), lastTarif.percent, 5)
  );
};
const calculateTaxesByTypeFlattax = (amount, tarif) => {
  return multiplyDineroPercent(amount, tarif.table[0].percent, 5);
};
const calculateTaxesForTarif = async (cantonId, year, tarifGroup, tarifType, taxableIncome) => {
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
const calculateTaxesIncomeAndFortune = async (taxInput) => {
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
const calculateTaxableAmount = async (taxInput) => {
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
    subtract$1(
      dineroChf(taxInput.fortune),
      deductionsFortune.reduce((acc, item) => add$1(acc, item.amountCanton), dineroChf(0))
    )
  );
  const taxableIncomeCanton = dineroRoundMin0(
    subtract$1(
      grossNetDetails.reduce(
        (acc, item) => dineroAddMany(acc, dineroChf(item.netIncome)),
        dineroChf(0)
      ),
      deductionsIncome.reduce((acc, item) => dineroAddMany(acc, item.amountCanton), dineroChf(0))
    )
  );
  const taxableIncomeBund = dineroRoundMin0(
    subtract$1(
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
const calculateTaxesBase = async (taxInput, taxableIncomeCanton, taxableFortuneCanton) => {
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
const calculateTaxesBund = async (taxInput, taxableIncomeBund, includeChildrenDeduction) => {
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
    taxesIncomeBund = subtract$1(taxesIncomeBund, dineroChf(251 * taxInput.children));
  }
  return { taxesIncomeBund };
};
const getPensionCreditDefinition = (cantonId) => {
  const definition = pensionCreditTaxDefinitions[cantonId];
  if (!definition)
    throw new Error(`No pension credit definition found for canton ${cantonId}`);
  return definition;
};
const pensionCreditTaxDefinitions = {
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
const calculatePensionCapitalTaxes = async (taxInput) => {
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
const calculateTaxesBaseChurchByDefinition = (taxInput, definition, taxesBaseCanton) => {
  const capital = dineroChf(taxInput.fortune);
  if (definition.taxFactorChurch) {
    return multiplyDineroFactor(capital, definition.taxFactorChurch, 7);
  }
  return taxesBaseCanton;
};
const calculateTaxesPensionCapitalByDefinition = async (taxInput, definition) => {
  const taxes = await calculateTaxesPensionCapitalByType(taxInput, definition);
  return calculateMinMaxTaxes(taxInput, taxes, definition);
};
const calculateTaxesPensionCapitalByType = async (taxInput, definition) => {
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
const calculateMinMaxTaxes = (taxInput, taxes, definition) => {
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
const calculatePensionCapitalRentIncomeTaxes = async ({
  tarifGroup,
  tarifType,
  cantonId,
  year,
  capital,
  rentIncomeFactor
}) => {
  const capitalReduced = dineroRound100Down(multiplyDineroFactor(capital, rentIncomeFactor, 7));
  if (isZero(capitalReduced)) {
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
const calculatePensionCapitalIncomeTaxes = async ({
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
const calculatePensionCapitalTarifOrFlatTaxes = async ({
  tarifGroup,
  cantonId,
  year,
  capital
}) => {
  const taxes = await calculateTaxesForTarif(cantonId, year, tarifGroup, "VORSORGESTEUER", capital);
  return taxes;
};
const calculateTaxes = async (taxInput) => {
  switch (taxInput.calculationType) {
    case "incomeAndWealth":
      return await calculateTaxesIncomeAndFortune(taxInput);
    case "capital":
      return await calculatePensionCapitalTaxes(taxInput);
  }
  throw new Error("Tax type not supported");
};
const _hoisted_1 = { class: "w-full max-w-5xl mx-auto px-3 sm:px-8" };
const _hoisted_2 = { class: "mb-40" };
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("h1", { class: "text-2xl mt-9 mb-4" }, "Steuerrechner", -1);
const _hoisted_4 = { class: "flex flex-wrap justify-between gap-9" };
const _hoisted_5 = { class: "max-w-sm" };
const _hoisted_6 = { class: "grid grid-cols-2 gap-4" };
const _hoisted_7 = {
  key: 0,
  class: "col-start-1 col-span-2 p-1 text-sm font-medium text-normal-600 bg-normal-200 -mb-3"
};
const _hoisted_8 = /* @__PURE__ */ createBaseVNode("div", { class: "col-start-1 col-span-2 text-sm font-medium text-normal-600 mt-1" }, " Abzüge ", -1);
const _hoisted_9 = {
  key: 0,
  class: "col-start-1 col-span-2 p-1 text-sm font-medium text-normal-600 bg-normal-200 -mb-3"
};
const _hoisted_10 = /* @__PURE__ */ createBaseVNode("div", { class: "col-start-1 col-span-2 text-sm font-medium text-normal-600 mt-1" }, " Weitere Abzüge ", -1);
const _hoisted_11 = {
  key: 0,
  class: "max-w-sm"
};
const _hoisted_12 = /* @__PURE__ */ createBaseVNode("h3", { class: "text-lg leading-7" }, "Resultat Steuerberechnung", -1);
const _hoisted_13 = { class: "grid grid-cols-2 text-sm mt-4" };
const _hoisted_14 = /* @__PURE__ */ createBaseVNode("div", { class: "font-medium" }, "Kantonssteuer", -1);
const _hoisted_15 = { class: "font-medium font-numerictab text-right" };
const _hoisted_16 = /* @__PURE__ */ createBaseVNode("div", { class: "" }, "Einkommenssteuer", -1);
const _hoisted_17 = { class: "font-numerictab text-sm text-right" };
const _hoisted_18 = /* @__PURE__ */ createBaseVNode("div", { class: "" }, "Vermögenssteuer", -1);
const _hoisted_19 = { class: "font-numerictab text-right" };
const _hoisted_20 = { class: "col-span-2 mt-2 bg-normal-200 h-1.5" };
const _hoisted_21 = /* @__PURE__ */ createBaseVNode("div", { class: "col-span-2 mt-4" }, null, -1);
const _hoisted_22 = /* @__PURE__ */ createBaseVNode("div", { class: "font-medium" }, "Gemeindesteuer", -1);
const _hoisted_23 = { class: "font-medium font-numerictab text-right" };
const _hoisted_24 = /* @__PURE__ */ createBaseVNode("div", { class: "" }, "Einkommenssteuer", -1);
const _hoisted_25 = { class: "font-numerictab text-sm text-right" };
const _hoisted_26 = /* @__PURE__ */ createBaseVNode("div", { class: "" }, "Vermögenssteuer", -1);
const _hoisted_27 = { class: "font-numerictab text-right" };
const _hoisted_28 = { class: "col-span-2 mt-2 bg-normal-200 h-1.5" };
const _hoisted_29 = /* @__PURE__ */ createBaseVNode("div", { class: "col-span-2 mt-4" }, null, -1);
const _hoisted_30 = /* @__PURE__ */ createBaseVNode("div", { class: "font-medium" }, "Kirchensteuer", -1);
const _hoisted_31 = { class: "font-medium font-numerictab text-right" };
const _hoisted_32 = /* @__PURE__ */ createBaseVNode("div", { class: "" }, "Einkommenssteuer", -1);
const _hoisted_33 = { class: "font-numerictab text-sm text-right" };
const _hoisted_34 = /* @__PURE__ */ createBaseVNode("div", { class: "" }, "Vermögenssteuer", -1);
const _hoisted_35 = { class: "font-numerictab text-right" };
const _hoisted_36 = { class: "col-span-2 mt-2 bg-normal-200 h-1.5" };
const _hoisted_37 = /* @__PURE__ */ createBaseVNode("div", { class: "col-span-2 mt-4" }, null, -1);
const _hoisted_38 = /* @__PURE__ */ createBaseVNode("div", { class: "font-medium" }, "Personalsteuer", -1);
const _hoisted_39 = { class: "font-medium font-numerictab text-right" };
const _hoisted_40 = /* @__PURE__ */ createBaseVNode("div", { class: "col-span-2 mt-2 bg-normal-200 h-1.5" }, [
  /* @__PURE__ */ createBaseVNode("div", {
    class: "h-1.5 bg-primary-600",
    style: {
      width: `${0 * 100}%`
    }
  })
], -1);
const _hoisted_41 = /* @__PURE__ */ createBaseVNode("div", { class: "col-span-2 mt-4" }, null, -1);
const _hoisted_42 = /* @__PURE__ */ createBaseVNode("div", { class: "font-medium" }, "Direkte Bundessteuer", -1);
const _hoisted_43 = { class: "font-medium font-numerictab text-right" };
const _hoisted_44 = { class: "col-span-2 mt-2 bg-normal-200 h-1.5" };
const _hoisted_45 = /* @__PURE__ */ createBaseVNode("div", { class: "col-span-2 mt-4 border-t mb-4" }, null, -1);
const _hoisted_46 = /* @__PURE__ */ createBaseVNode("div", { class: "" }, "Total Einkommenssteuer", -1);
const _hoisted_47 = { class: "font-numerictab text-sm text-right" };
const _hoisted_48 = /* @__PURE__ */ createBaseVNode("div", { class: "" }, "Total Vermögenssteuer", -1);
const _hoisted_49 = { class: "font-numerictab text-right" };
const _hoisted_50 = /* @__PURE__ */ createBaseVNode("div", { class: "font-medium" }, "Total Steuern", -1);
const _hoisted_51 = { class: "font-medium font-numerictab text-right" };
const _hoisted_52 = { key: 1 };
const _hoisted_53 = { class: "max-w-2xl text-sm" };
const _hoisted_54 = /* @__PURE__ */ createBaseVNode("h3", { class: "text-lg leading-7" }, "Details Steuerberechnung", -1);
const _hoisted_55 = {
  key: 0,
  class: "w-full font-numerictab border-spacing-y-2 border-separate"
};
const _hoisted_56 = { class: "bg-normal-200" };
const _hoisted_57 = /* @__PURE__ */ createBaseVNode("th", { class: "w-auto text-left" }, "Brutto- / Nettoeinkommen", -1);
const _hoisted_58 = /* @__PURE__ */ createBaseVNode("th", { class: "w-32 text-right" }, "P1", -1);
const _hoisted_59 = { class: "w-32 text-right" };
const _hoisted_60 = { key: 0 };
const _hoisted_61 = { class: "text-right" };
const _hoisted_62 = { class: "text-right" };
const _hoisted_63 = { key: 0 };
const _hoisted_64 = { class: "w-full mt-9 border-spacing-y-2 border-separate" };
const _hoisted_65 = /* @__PURE__ */ createBaseVNode("thead", null, [
  /* @__PURE__ */ createBaseVNode("tr", { class: "bg-normal-200" }, [
    /* @__PURE__ */ createBaseVNode("th", { class: "w-auto text-left" }, "Einkommen"),
    /* @__PURE__ */ createBaseVNode("th", { class: "w-32 text-right" }, "Kanton"),
    /* @__PURE__ */ createBaseVNode("th", { class: "w-32 text-right" }, "Bund")
  ])
], -1);
const _hoisted_66 = { class: "" };
const _hoisted_67 = { class: "" };
const _hoisted_68 = { class: "text-right font-numerictab" };
const _hoisted_69 = { class: "text-right font-numerictab" };
const _hoisted_70 = { class: "w-full mt-9 border-spacing-y-2 border-separate" };
const _hoisted_71 = /* @__PURE__ */ createBaseVNode("thead", null, [
  /* @__PURE__ */ createBaseVNode("tr", { class: "bg-normal-200" }, [
    /* @__PURE__ */ createBaseVNode("th", { class: "w-auto text-left" }, "Vermögen"),
    /* @__PURE__ */ createBaseVNode("th", { class: "w-32 text-right" }, "Kanton"),
    /* @__PURE__ */ createBaseVNode("th", { class: "w-32" })
  ])
], -1);
const _hoisted_72 = { class: "" };
const _hoisted_73 = { class: "" };
const _hoisted_74 = { class: "text-right font-numerictab" };
const _hoisted_75 = /* @__PURE__ */ createBaseVNode("td", null, null, -1);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  async setup(__props) {
    let __temp, __restore;
    const defaultInput = {
      calculationType: "incomeAndWealth",
      children: 0,
      fortune: 25e4,
      locationId: 66,
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
      ]
    };
    const getOptionsDe = (list) => {
      return list.map((item) => ({ value: item.value, label: item.label.de }));
    };
    const taxLocationsResult = ([__temp, __restore] = withAsyncContext(() => getTaxLocations(2024)), __temp = await __temp, __restore(), __temp);
    const taxLocations = computed(
      () => taxLocationsResult.map((item) => ({
        value: item.BfsID,
        label: `${item.BfsName} (${item.Canton})`
      })) ?? []
    );
    const civilStatus = ref();
    const children = ref();
    const showSecondPerson = computed(() => civilStatus.value === "m" || civilStatus.value === "rp");
    const personItems = computed(() => showSecondPerson.value ? [1, 2] : [1]);
    const taxes = ref();
    const detailsGrossNet = computed(() => {
      if (!taxes.value || !taxes.value.details.grossNetDetails)
        return [];
      const details = [];
      const grossP1 = taxes.value.details.grossNetDetails[0];
      const grossP2 = taxes.value.details.grossNetDetails.length > 1 ? taxes.value.details.grossNetDetails[1] : void 0;
      details.push({ label: "Bruttoeinkommen", p1: grossP1.grossIncome, p2: grossP2 == null ? void 0 : grossP2.grossIncome });
      details.push({ label: "AHV-, IV-, EO-Beiträge	", p1: grossP1.ahvIvEo, p2: grossP2 == null ? void 0 : grossP2.ahvIvEo });
      details.push({ label: "ALV-Beiträge	", p1: grossP1.alv, p2: grossP2 == null ? void 0 : grossP2.alv });
      details.push({ label: "NBU-Beiträge	", p1: grossP1.nbu, p2: grossP2 == null ? void 0 : grossP2.nbu });
      details.push({ label: "Pensionskassenbeiträge", p1: grossP1.pk, p2: grossP2 == null ? void 0 : grossP2.pk });
      details.push({ label: "Nettoeinkommen", p1: grossP1.netIncome, p2: grossP2 == null ? void 0 : grossP2.netIncome });
      return details;
    });
    const detailsDeductionsIncome = computed(() => {
      if (!taxes.value)
        return [];
      const details = [];
      const deductionsIncome = taxes.value.details.deductionsIncome;
      details.push({
        label: "Nettoeinkommen Haupterwerb",
        canton: taxes.value.details.netIncomeCanton,
        bund: taxes.value.details.netIncomeBund
      });
      deductionsIncome.forEach((deduction) => {
        details.push({
          label: deduction.name + (showSecondPerson.value && deduction.target ? ` ${deduction.target}` : ""),
          canton: deduction.amountCanton,
          bund: deduction.amountBund
        });
      });
      details.push({
        label: "Steuerbares Einkommen",
        canton: taxes.value.details.taxableIncomeCanton,
        bund: taxes.value.details.taxableIncomeBund
      });
      return details;
    });
    const detailsDeductionsFortune = computed(() => {
      if (!taxes.value)
        return [];
      const details = [];
      const deductionsFortune = taxes.value.details.deductionsFortune;
      details.push({
        label: "Reinvermögen",
        canton: taxes.value.input.fortune,
        bund: 0
      });
      deductionsFortune.forEach((deduction) => {
        details.push({
          label: deduction.name + (showSecondPerson.value ? deduction.target : ""),
          canton: deduction.amountCanton,
          bund: deduction.amountBund
        });
      });
      details.push({
        label: "Steuerbares Vermögen",
        canton: taxes.value.details.taxableFortuneCanton,
        bund: 0
      });
      return details;
    });
    const submit = async (value, node) => {
      var _a;
      node == null ? void 0 : node.setErrors([]);
      const taxInput = {
        ...value,
        cantonId: (_a = taxLocationsResult == null ? void 0 : taxLocationsResult.find((x) => x.BfsID === value.locationId)) == null ? void 0 : _a.CantonID
      };
      try {
        const result = await calculateTaxes(taxInput);
        taxes.value = result;
      } catch (error) {
        node == null ? void 0 : node.setErrors(["Es ist ein unerwarteter Fehler aufgetreten.", error.message]);
        taxes.value = void 0;
      }
    };
    return (_ctx, _cache) => {
      const _component_FormKit = resolveComponent("FormKit");
      const _component_TaxDeductions = _sfc_main$1;
      const _component_GlobalButton = _sfc_main$2;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _hoisted_3,
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("div", _hoisted_5, [
              createVNode(_component_FormKit, {
                value: defaultInput,
                type: "form",
                actions: false,
                onSubmit: submit
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_6, [
                    createVNode(_component_FormKit, {
                      type: "buttonSelect",
                      name: unref(tsSimpleNameof.nameof)((x) => x.calculationType),
                      label: "Steuerart",
                      options: getOptionsDe(unref(taxInputData).calculationTypes),
                      orientation: "row",
                      "option-label-classes": "text-xs",
                      "outer-class": "col-span-2"
                    }, null, 8, ["name", "options"]),
                    createVNode(_component_FormKit, {
                      type: "select",
                      name: unref(tsSimpleNameof.nameof)((x) => x.year),
                      options: unref(taxInputData).years,
                      label: "Steuerjahr"
                    }, null, 8, ["name", "options"]),
                    createVNode(_component_FormKit, {
                      type: "autocomplete",
                      name: unref(tsSimpleNameof.nameof)((x) => x.locationId),
                      label: "Steuergemeinde",
                      options: unref(taxLocations),
                      "outer-class": "col-span-2",
                      "filter-min-length": 2
                    }, null, 8, ["name", "options"]),
                    createVNode(_component_FormKit, {
                      modelValue: unref(civilStatus),
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(civilStatus) ? civilStatus.value = $event : null),
                      name: unref(tsSimpleNameof.nameof)((x) => x.relationship),
                      type: "buttonSelect",
                      label: "Zivilstand",
                      options: getOptionsDe(unref(taxInputData).relationships),
                      "outer-class": "col-span-2",
                      orientation: "row",
                      "option-label-classes": "text-xs"
                    }, null, 8, ["modelValue", "name", "options"]),
                    createVNode(_component_FormKit, {
                      modelValue: unref(children),
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(children) ? children.value = $event : null),
                      label: "Anzahl Kinder",
                      name: unref(tsSimpleNameof.nameof)((x) => x.children),
                      type: "select",
                      validation: "required",
                      "as-number": true,
                      options: unref(childrenOptions),
                      "step-next": true
                    }, null, 8, ["modelValue", "name", "options"]),
                    createVNode(_component_FormKit, {
                      type: "list",
                      name: unref(tsSimpleNameof.nameof)((x) => x.persons)
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(personItems), (person) => {
                          return openBlock(), createBlock(_component_FormKit, {
                            key: person,
                            type: "group"
                          }, {
                            default: withCtx(() => [
                              unref(showSecondPerson) ? (openBlock(), createElementBlock("div", _hoisted_7, " Person " + toDisplayString(person), 1)) : createCommentVNode("", true),
                              (openBlock(), createBlock(_component_FormKit, {
                                key: person,
                                type: "hidden",
                                name: unref(tsSimpleNameof.nameof)((x) => x.incomeType),
                                value: "gross"
                              }, null, 8, ["name"])),
                              (openBlock(), createBlock(_component_FormKit, {
                                key: person,
                                type: "numberSuffix",
                                suffix: "Jahre",
                                name: unref(tsSimpleNameof.nameof)((x) => x.age),
                                step: 1,
                                min: 18,
                                max: 150,
                                label: "Alter",
                                "outer-class": "col-start-1"
                              }, null, 8, ["name"])),
                              (openBlock(), createBlock(_component_FormKit, {
                                key: person,
                                type: "buttonSelect",
                                name: unref(tsSimpleNameof.nameof)((x) => x.confession),
                                "validation-label": "Konfession",
                                options: getOptionsDe(unref(taxInputData).confessions),
                                "outer-class": "col-span-2",
                                orientation: "row",
                                "option-label-classes": "text-xs"
                              }, null, 8, ["name", "options"])),
                              (openBlock(), createBlock(_component_FormKit, {
                                key: person,
                                type: "numberSuffix",
                                suffix: "CHF",
                                name: unref(tsSimpleNameof.nameof)((x) => x.income),
                                step: 1,
                                min: 0,
                                value: 0,
                                label: "Brutto Einkommen"
                              }, null, 8, ["name"])),
                              (openBlock(), createBlock(_component_FormKit, {
                                key: person,
                                type: "numberSuffix",
                                suffix: "CHF",
                                name: unref(tsSimpleNameof.nameof)((x) => x.pkDeduction),
                                step: 1,
                                min: 0,
                                max: 1e4,
                                value: 0,
                                label: "PK-Beitrag Arbeitnehmer"
                              }, null, 8, ["name"])),
                              _hoisted_8,
                              (openBlock(), createBlock(_component_TaxDeductions, {
                                key: person,
                                class: "col-span-2",
                                deductions: unref(taxInputData).deductionsPerson,
                                "children-count": unref(children)
                              }, null, 8, ["deductions", "children-count"]))
                            ]),
                            _: 2
                          }, 1024);
                        }), 128))
                      ]),
                      _: 1
                    }, 8, ["name"]),
                    unref(showSecondPerson) ? (openBlock(), createElementBlock("div", _hoisted_9, " Gemeinsam ")) : createCommentVNode("", true),
                    _hoisted_10,
                    createVNode(_component_TaxDeductions, {
                      class: "col-span-2",
                      deductions: unref(taxInputData).deductionsGeneral,
                      "children-count": unref(children)
                    }, null, 8, ["deductions", "children-count"]),
                    createVNode(_component_FormKit, {
                      type: "numberSuffix",
                      suffix: "CHF",
                      name: unref(tsSimpleNameof.nameof)((x) => x.fortune),
                      "outer-class": "col-start-1",
                      step: 1,
                      min: 0,
                      label: "Reinvermögen"
                    }, null, 8, ["name"]),
                    createVNode(_component_GlobalButton, {
                      type: "submit",
                      class: "col-start-1"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Berechnen")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ]),
            unref(taxes) ? (openBlock(), createElementBlock("div", _hoisted_11, [
              _hoisted_12,
              createBaseVNode("div", _hoisted_13, [
                _hoisted_14,
                createBaseVNode("div", _hoisted_15, toDisplayString(("displayCurrencyShort" in _ctx ? _ctx.displayCurrencyShort : unref(displayCurrencyShort))(unref(taxes).taxesIncomeCanton + unref(taxes).taxesFortuneCanton)), 1),
                _hoisted_16,
                createBaseVNode("div", _hoisted_17, toDisplayString(("displayCurrencyShort" in _ctx ? _ctx.displayCurrencyShort : unref(displayCurrencyShort))(unref(taxes).taxesIncomeCanton)), 1),
                _hoisted_18,
                createBaseVNode("div", _hoisted_19, toDisplayString(("displayCurrencyShort" in _ctx ? _ctx.displayCurrencyShort : unref(displayCurrencyShort))(unref(taxes).taxesFortuneCanton)), 1),
                createBaseVNode("div", _hoisted_20, [
                  createBaseVNode("div", {
                    class: "h-1.5 bg-primary-600",
                    style: normalizeStyle({
                      width: `${(unref(taxes).taxesIncomeCanton + unref(taxes).taxesFortuneCanton) / unref(taxes).taxesTotal * 100}%`
                    })
                  }, null, 4)
                ]),
                _hoisted_21,
                _hoisted_22,
                createBaseVNode("div", _hoisted_23, toDisplayString(("displayCurrencyShort" in _ctx ? _ctx.displayCurrencyShort : unref(displayCurrencyShort))(unref(taxes).taxesIncomeCity + unref(taxes).taxesFortuneCity)), 1),
                _hoisted_24,
                createBaseVNode("div", _hoisted_25, toDisplayString(("displayCurrencyShort" in _ctx ? _ctx.displayCurrencyShort : unref(displayCurrencyShort))(unref(taxes).taxesIncomeCity)), 1),
                _hoisted_26,
                createBaseVNode("div", _hoisted_27, toDisplayString(("displayCurrencyShort" in _ctx ? _ctx.displayCurrencyShort : unref(displayCurrencyShort))(unref(taxes).taxesFortuneCity)), 1),
                createBaseVNode("div", _hoisted_28, [
                  createBaseVNode("div", {
                    class: "h-1.5 bg-primary-600",
                    style: normalizeStyle({
                      width: `${(unref(taxes).taxesIncomeCity + unref(taxes).taxesFortuneCity) / unref(taxes).taxesTotal * 100}%`
                    })
                  }, null, 4)
                ]),
                _hoisted_29,
                _hoisted_30,
                createBaseVNode("div", _hoisted_31, toDisplayString(("displayCurrencyShort" in _ctx ? _ctx.displayCurrencyShort : unref(displayCurrencyShort))(unref(taxes).taxesIncomeChurch + unref(taxes).taxesFortuneChurch)), 1),
                _hoisted_32,
                createBaseVNode("div", _hoisted_33, toDisplayString(("displayCurrencyShort" in _ctx ? _ctx.displayCurrencyShort : unref(displayCurrencyShort))(unref(taxes).taxesIncomeChurch)), 1),
                _hoisted_34,
                createBaseVNode("div", _hoisted_35, toDisplayString(("displayCurrencyShort" in _ctx ? _ctx.displayCurrencyShort : unref(displayCurrencyShort))(unref(taxes).taxesFortuneChurch)), 1),
                createBaseVNode("div", _hoisted_36, [
                  createBaseVNode("div", {
                    class: "h-1.5 bg-primary-600",
                    style: normalizeStyle({
                      width: `${(unref(taxes).taxesIncomeChurch + unref(taxes).taxesFortuneChurch) / unref(taxes).taxesTotal * 100}%`
                    })
                  }, null, 4)
                ]),
                _hoisted_37,
                _hoisted_38,
                createBaseVNode("div", _hoisted_39, toDisplayString(("displayCurrencyShort" in _ctx ? _ctx.displayCurrencyShort : unref(displayCurrencyShort))(unref(taxes).taxesPersonnel)), 1),
                _hoisted_40,
                _hoisted_41,
                _hoisted_42,
                createBaseVNode("div", _hoisted_43, toDisplayString(("displayCurrencyShort" in _ctx ? _ctx.displayCurrencyShort : unref(displayCurrencyShort))(unref(taxes).taxesIncomeBund)), 1),
                createBaseVNode("div", _hoisted_44, [
                  createBaseVNode("div", {
                    class: "h-1.5 bg-primary-600",
                    style: normalizeStyle({
                      width: `${unref(taxes).taxesIncomeBund / unref(taxes).taxesTotal * 100}%`
                    })
                  }, null, 4)
                ]),
                _hoisted_45,
                _hoisted_46,
                createBaseVNode("div", _hoisted_47, toDisplayString(("displayCurrencyShort" in _ctx ? _ctx.displayCurrencyShort : unref(displayCurrencyShort))(
                  unref(taxes).taxesIncomeCity + unref(taxes).taxesIncomeCanton + unref(taxes).taxesIncomeChurch + unref(taxes).taxesIncomeBund
                )), 1),
                _hoisted_48,
                createBaseVNode("div", _hoisted_49, toDisplayString(("displayCurrencyShort" in _ctx ? _ctx.displayCurrencyShort : unref(displayCurrencyShort))(
                  unref(taxes).taxesFortuneCity + unref(taxes).taxesFortuneCanton + unref(taxes).taxesFortuneChurch
                )), 1),
                _hoisted_50,
                createBaseVNode("div", _hoisted_51, toDisplayString(("displayCurrencyShort" in _ctx ? _ctx.displayCurrencyShort : unref(displayCurrencyShort))(unref(taxes).taxesTotal)), 1)
              ])
            ])) : createCommentVNode("", true),
            unref(taxes) ? (openBlock(), createElementBlock("div", _hoisted_52, [
              createBaseVNode("div", _hoisted_53, [
                _hoisted_54,
                unref(detailsGrossNet).length > 0 ? (openBlock(), createElementBlock("table", _hoisted_55, [
                  createBaseVNode("tr", _hoisted_56, [
                    _hoisted_57,
                    _hoisted_58,
                    createBaseVNode("th", _hoisted_59, [
                      unref(showSecondPerson) ? (openBlock(), createElementBlock("span", _hoisted_60, "P2")) : createCommentVNode("", true)
                    ])
                  ]),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(detailsGrossNet), (item, index) => {
                    return openBlock(), createElementBlock("tr", {
                      key: index,
                      class: "last:font-medium"
                    }, [
                      createBaseVNode("td", null, toDisplayString(item.label), 1),
                      createBaseVNode("td", _hoisted_61, toDisplayString(("displayCurrency" in _ctx ? _ctx.displayCurrency : unref(displayCurrency))(item.p1)), 1),
                      createBaseVNode("td", _hoisted_62, [
                        unref(showSecondPerson) ? (openBlock(), createElementBlock("span", _hoisted_63, toDisplayString(("displayCurrency" in _ctx ? _ctx.displayCurrency : unref(displayCurrency))(item.p2 ?? 0)), 1)) : createCommentVNode("", true)
                      ])
                    ]);
                  }), 128))
                ])) : createCommentVNode("", true),
                createBaseVNode("table", _hoisted_64, [
                  _hoisted_65,
                  createBaseVNode("tbody", _hoisted_66, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(detailsDeductionsIncome), (item, index) => {
                      return openBlock(), createElementBlock("tr", {
                        key: index,
                        class: "last:font-medium"
                      }, [
                        createBaseVNode("td", _hoisted_67, toDisplayString(item.label), 1),
                        createBaseVNode("td", _hoisted_68, toDisplayString(("displayCurrency" in _ctx ? _ctx.displayCurrency : unref(displayCurrency))(item.canton)), 1),
                        createBaseVNode("td", _hoisted_69, toDisplayString(("displayCurrency" in _ctx ? _ctx.displayCurrency : unref(displayCurrency))(item.bund)), 1)
                      ]);
                    }), 128))
                  ])
                ]),
                createBaseVNode("table", _hoisted_70, [
                  _hoisted_71,
                  createBaseVNode("tbody", _hoisted_72, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(detailsDeductionsFortune), (item, index) => {
                      return openBlock(), createElementBlock("tr", {
                        key: index,
                        class: "last:font-medium"
                      }, [
                        createBaseVNode("td", _hoisted_73, toDisplayString(item.label), 1),
                        createBaseVNode("td", _hoisted_74, toDisplayString(("displayCurrency" in _ctx ? _ctx.displayCurrency : unref(displayCurrency))(item.canton)), 1),
                        _hoisted_75
                      ]);
                    }), 128))
                  ])
                ])
              ])
            ])) : createCommentVNode("", true)
          ])
        ])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
