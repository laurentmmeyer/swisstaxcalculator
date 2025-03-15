function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list2 = str.split(",");
  for (let i2 = 0; i2 < list2.length; i2++) {
    map[list2[i2]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
function normalizeStyle(value) {
  if (isArray$1(value)) {
    const res = {};
    for (let i2 = 0; i2 < value.length; i2++) {
      const item = value[i2];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value)) {
    return value;
  } else if (isObject$2(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*.*?\*\//gs;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray$1(value)) {
    for (let i2 = 0; i2 < value.length; i2++) {
      const normalized = normalizeClass(value[i2]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$2(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
function normalizeProps(props2) {
  if (!props2)
    return null;
  let { class: klass, style } = props2;
  if (klass && !isString(klass)) {
    props2.class = normalizeClass(klass);
  }
  if (style) {
    props2.style = normalizeStyle(style);
  }
  return props2;
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray$1(val) || isObject$2(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject$2(val) && !isArray$1(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend$1 = Object.assign;
const remove = (arr, el) => {
  const i2 = arr.indexOf(el);
  if (i2 > -1) {
    arr.splice(i2, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const isArray$1 = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$2 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject$2(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_2, c2) => c2 ? c2.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i2 = 0; i2 < fns.length; i2++) {
    fns[i2](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const looseToNumber = (val) => {
  const n2 = parseFloat(val);
  return isNaN(n2) ? val : n2;
};
const toNumber = (val) => {
  const n2 = isString(val) ? Number(val) : NaN;
  return isNaN(n2) ? val : n2;
};
let _globalThis$2;
const getGlobalThis = () => {
  return _globalThis$2 || (_globalThis$2 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i2, l2;
      for (i2 = 0, l2 = this.effects.length; i2 < l2; i2++) {
        this.effects[i2].stop();
      }
      for (i2 = 0, l2 = this.cleanups.length; i2 < l2; i2++) {
        this.cleanups[i2]();
      }
      if (this.scopes) {
        for (i2 = 0, l2 = this.scopes.length; i2 < l2; i2++) {
          this.scopes[i2].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this._active = false;
    }
  }
}
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i2 = 0; i2 < deps.length; i2++) {
      deps[i2].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i2 = 0; i2 < deps.length; i2++) {
      const dep = deps[i2];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = /* @__PURE__ */ new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol("");
const MAP_KEY_ITERATE_KEY = Symbol("");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i2 = 0; i2 < deps.length; i2++) {
      deps[i2].delete(effect);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
    }
    trackEffects(dep);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray$1(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0]);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects));
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  const effects = isArray$1(dep) ? dep : [...dep];
  for (const effect of effects) {
    if (effect.computed) {
      triggerEffect(effect);
    }
  }
  for (const effect of effects) {
    if (!effect.computed) {
      triggerEffect(effect);
    }
  }
}
function triggerEffect(effect, debuggerEventExtraInfo) {
  if (effect !== activeEffect || effect.allowRecurse) {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}
function getDepFromReactive(object, key) {
  var _a;
  return (_a = targetMap.get(object)) === null || _a === void 0 ? void 0 : _a.get(key);
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const get$1$1 = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i2 = 0, l2 = this.length; i2 < l2; i2++) {
        track(arr, "get", i2 + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function hasOwnProperty(key) {
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray$1(target);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject$2(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set$1 = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!shallow) {
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray$1(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray$1(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0);
  }
  return result;
}
function has$1(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray$1(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get: get$1$1,
  set: set$1,
  deleteProperty,
  has: has$1,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    return true;
  },
  deleteProperty(target, key) {
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend$1({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
const toShallow = (value) => value;
const getProto = (v2) => Reflect.getPrototypeOf(v2);
function get$2(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has$2(key, isReadonly2 = false) {
  const target = this[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add$1(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get$2(this, key);
    },
    get size() {
      return size(this);
    },
    has: has$2,
    add: add$1,
    set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get$2(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$2,
    add: add$1,
    set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get$2(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$2.call(this, key, true);
    },
    add: createReadonlyMethod(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$2(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$2.call(this, key, true);
    },
    add: createReadonlyMethod(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value[
    "__v_skip"
    /* ReactiveFlags.SKIP */
  ] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$2(target)) {
    return target;
  }
  if (target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ] && !(isReadonly2 && target[
    "__v_isReactive"
    /* ReactiveFlags.IS_REACTIVE */
  ])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ]);
  }
  return !!(value && value[
    "__v_isReactive"
    /* ReactiveFlags.IS_REACTIVE */
  ]);
}
function isReadonly(value) {
  return !!(value && value[
    "__v_isReadonly"
    /* ReactiveFlags.IS_READONLY */
  ]);
}
function isShallow(value) {
  return !!(value && value[
    "__v_isShallow"
    /* ReactiveFlags.IS_SHALLOW */
  ]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw2 = observed && observed[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  return raw2 ? toRaw(raw2) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject$2(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$2(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    {
      trackEffects(ref2.dep || (ref2.dep = createDep()));
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    {
      triggerEffects(dep);
    }
  }
}
function isRef(r2) {
  return !!(r2 && r2.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this);
    }
  }
}
function triggerRef(ref2) {
  triggerRefValue(ref2);
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class ObjectRefImpl {
  constructor(_object, _key, _defaultValue) {
    this._object = _object;
    this._key = _key;
    this._defaultValue = _defaultValue;
    this.__v_isRef = true;
  }
  get value() {
    const val = this._object[this._key];
    return val === void 0 ? this._defaultValue : val;
  }
  set value(newVal) {
    this._object[this._key] = newVal;
  }
  get dep() {
    return getDepFromReactive(toRaw(this._object), this._key);
  }
}
function toRef(object, key, defaultValue) {
  const val = object[key];
  return isRef(val) ? val : new ObjectRefImpl(object, key, defaultValue);
}
var _a$1;
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this[_a$1] = false;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this[
      "__v_isReadonly"
      /* ReactiveFlags.IS_READONLY */
    ] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
_a$1 = "__v_isReadonly";
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = NOOP;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  return cRef;
}
function warn$1(msg, ...args) {
  return;
}
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i2 = 0; i2 < fn.length; i2++) {
    values.push(callWithAsyncErrorHandling(fn[i2], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i2 = 0; i2 < errorCapturedHooks.length; i2++) {
          if (errorCapturedHooks[i2](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    console.error(err);
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }
  return start;
}
function queueJob(job) {
  if (!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i2 = queue.indexOf(job);
  if (i2 > flushIndex) {
    queue.splice(i2, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray$1(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(cb, cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex)) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(seen2, i2 = isFlushing ? flushIndex + 1 : 0) {
  for (; i2 < queue.length; i2++) {
    const cb = queue[i2];
    if (cb && cb.pre) {
      queue.splice(i2, 1);
      i2--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen2) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    activePostFlushCbs.sort((a2, b2) => getId(a2) - getId(b2));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a2, b2) => {
  const diff = getId(a2) - getId(b2);
  if (diff === 0) {
    if (a2.pre && !b2.pre)
      return -1;
    if (b2.pre && !a2.pre)
      return 1;
  }
  return diff;
};
function flushJobs(seen2) {
  isFlushPending = false;
  isFlushing = true;
  queue.sort(comparator);
  const check = NOOP;
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (false)
          ;
        callWithErrorHandling(
          job,
          null,
          14
          /* ErrorCodes.SCHEDULER */
        );
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs();
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs();
    }
  }
}
function emit$2(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props2 = instance.vnode.props || EMPTY_OBJ;
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props2) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number: number3, trim } = props2[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a2) => isString(a2) ? a2.trim() : a2);
    }
    if (number3) {
      args = rawArgs.map(looseToNumber);
    }
  }
  let handlerName;
  let handler = props2[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props2[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props2[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props2[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw2 = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw3) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw3, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend$1(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw2 && !hasExtends) {
    if (isObject$2(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray$1(raw2)) {
    raw2.forEach((key) => normalized[key] = null);
  } else {
    extend$1(normalized, raw2);
  }
  if (isObject$2(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options2, key) {
  if (!options2 || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options2, key[0].toLowerCase() + key.slice(1)) || hasOwn(options2, hyphenate(key)) || hasOwn(options2, key);
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function pushScopeId(id) {
  currentScopeId = id;
}
function popScopeId() {
  currentScopeId = null;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx)
    return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
function markAttrsAccessed() {
}
function renderComponentRoot(instance) {
  const { type: Component, vnode, proxy, withProxy, props: props2, propsOptions: [propsOptions], slots, attrs, emit: emit2, render, renderCache, data, setupState, ctx, inheritAttrs } = instance;
  let result;
  let fallthroughAttrs;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      result = normalizeVNode(render.call(proxyToUse, proxyToUse, renderCache, props2, setupState, data, ctx));
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (false)
        ;
      result = normalizeVNode(render2.length > 1 ? render2(props2, false ? {
        get attrs() {
          markAttrsAccessed();
          return attrs;
        },
        slots,
        emit: emit2
      } : { attrs, slots, emit: emit2 }) : render2(
        props2,
        null
        /* we know it doesn't need it */
      ));
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(
      err,
      instance,
      1
      /* ErrorCodes.RENDER_FUNCTION */
    );
    result = createVNode(Comment$1);
  }
  let root = result;
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
        }
        root = cloneVNode(root, fallthroughAttrs);
      }
    }
  }
  if (vnode.dirs) {
    root = cloneVNode(root);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    root.transition = vnode.transition;
  }
  {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
function filterSingleRoot(children) {
  let singleRoot;
  for (let i2 = 0; i2 < children.length; i2++) {
    const child = children[i2];
    if (isVNode(child)) {
      if (child.type !== Comment$1 || child.children === "v-if") {
        if (singleRoot) {
          return;
        } else {
          singleRoot = child;
        }
      }
    } else {
      return;
    }
  }
  return singleRoot;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props2) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props2)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i2 = 0; i2 < dynamicProps.length; i2++) {
        const key = dynamicProps[i2];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i2 = 0; i2 < nextKeys.length; i2++) {
    const key = nextKeys[i2];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent && parent.subTree === vnode) {
    (vnode = parent.vnode).el = el;
    parent = parent.parent;
  }
}
const isSuspense = (type) => type.__isSuspense;
const SuspenseImpl = {
  name: "Suspense",
  // In order to make Suspense tree-shakable, we need to avoid importing it
  // directly in the renderer. The renderer checks for the __isSuspense flag
  // on a vnode's type and calls the `process` method, passing in renderer
  // internals.
  __isSuspense: true,
  process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, rendererInternals) {
    if (n1 == null) {
      mountSuspense(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, rendererInternals);
    } else {
      patchSuspense(n1, n2, container, anchor, parentComponent, isSVG, slotScopeIds, optimized, rendererInternals);
    }
  },
  hydrate: hydrateSuspense,
  create: createSuspenseBoundary,
  normalize: normalizeSuspenseChildren
};
const Suspense = SuspenseImpl;
function triggerEvent(vnode, name) {
  const eventListener = vnode.props && vnode.props[name];
  if (isFunction(eventListener)) {
    eventListener();
  }
}
function mountSuspense(vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, rendererInternals) {
  const { p: patch, o: { createElement } } = rendererInternals;
  const hiddenContainer = createElement("div");
  const suspense = vnode.suspense = createSuspenseBoundary(vnode, parentSuspense, parentComponent, container, hiddenContainer, anchor, isSVG, slotScopeIds, optimized, rendererInternals);
  patch(null, suspense.pendingBranch = vnode.ssContent, hiddenContainer, null, parentComponent, suspense, isSVG, slotScopeIds);
  if (suspense.deps > 0) {
    triggerEvent(vnode, "onPending");
    triggerEvent(vnode, "onFallback");
    patch(
      null,
      vnode.ssFallback,
      container,
      anchor,
      parentComponent,
      null,
      // fallback tree will not have suspense context
      isSVG,
      slotScopeIds
    );
    setActiveBranch(suspense, vnode.ssFallback);
  } else {
    suspense.resolve();
  }
}
function patchSuspense(n1, n2, container, anchor, parentComponent, isSVG, slotScopeIds, optimized, { p: patch, um: unmount, o: { createElement } }) {
  const suspense = n2.suspense = n1.suspense;
  suspense.vnode = n2;
  n2.el = n1.el;
  const newBranch = n2.ssContent;
  const newFallback = n2.ssFallback;
  const { activeBranch, pendingBranch, isInFallback, isHydrating } = suspense;
  if (pendingBranch) {
    suspense.pendingBranch = newBranch;
    if (isSameVNodeType(newBranch, pendingBranch)) {
      patch(pendingBranch, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, isSVG, slotScopeIds, optimized);
      if (suspense.deps <= 0) {
        suspense.resolve();
      } else if (isInFallback) {
        patch(
          activeBranch,
          newFallback,
          container,
          anchor,
          parentComponent,
          null,
          // fallback tree will not have suspense context
          isSVG,
          slotScopeIds,
          optimized
        );
        setActiveBranch(suspense, newFallback);
      }
    } else {
      suspense.pendingId++;
      if (isHydrating) {
        suspense.isHydrating = false;
        suspense.activeBranch = pendingBranch;
      } else {
        unmount(pendingBranch, parentComponent, suspense);
      }
      suspense.deps = 0;
      suspense.effects.length = 0;
      suspense.hiddenContainer = createElement("div");
      if (isInFallback) {
        patch(null, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, isSVG, slotScopeIds, optimized);
        if (suspense.deps <= 0) {
          suspense.resolve();
        } else {
          patch(
            activeBranch,
            newFallback,
            container,
            anchor,
            parentComponent,
            null,
            // fallback tree will not have suspense context
            isSVG,
            slotScopeIds,
            optimized
          );
          setActiveBranch(suspense, newFallback);
        }
      } else if (activeBranch && isSameVNodeType(newBranch, activeBranch)) {
        patch(activeBranch, newBranch, container, anchor, parentComponent, suspense, isSVG, slotScopeIds, optimized);
        suspense.resolve(true);
      } else {
        patch(null, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, isSVG, slotScopeIds, optimized);
        if (suspense.deps <= 0) {
          suspense.resolve();
        }
      }
    }
  } else {
    if (activeBranch && isSameVNodeType(newBranch, activeBranch)) {
      patch(activeBranch, newBranch, container, anchor, parentComponent, suspense, isSVG, slotScopeIds, optimized);
      setActiveBranch(suspense, newBranch);
    } else {
      triggerEvent(n2, "onPending");
      suspense.pendingBranch = newBranch;
      suspense.pendingId++;
      patch(null, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, isSVG, slotScopeIds, optimized);
      if (suspense.deps <= 0) {
        suspense.resolve();
      } else {
        const { timeout, pendingId } = suspense;
        if (timeout > 0) {
          setTimeout(() => {
            if (suspense.pendingId === pendingId) {
              suspense.fallback(newFallback);
            }
          }, timeout);
        } else if (timeout === 0) {
          suspense.fallback(newFallback);
        }
      }
    }
  }
}
function createSuspenseBoundary(vnode, parent, parentComponent, container, hiddenContainer, anchor, isSVG, slotScopeIds, optimized, rendererInternals, isHydrating = false) {
  const { p: patch, m: move, um: unmount, n: next, o: { parentNode, remove: remove2 } } = rendererInternals;
  const timeout = vnode.props ? toNumber(vnode.props.timeout) : void 0;
  const suspense = {
    vnode,
    parent,
    parentComponent,
    isSVG,
    container,
    hiddenContainer,
    anchor,
    deps: 0,
    pendingId: 0,
    timeout: typeof timeout === "number" ? timeout : -1,
    activeBranch: null,
    pendingBranch: null,
    isInFallback: true,
    isHydrating,
    isUnmounted: false,
    effects: [],
    resolve(resume = false) {
      const { vnode: vnode2, activeBranch, pendingBranch, pendingId, effects, parentComponent: parentComponent2, container: container2 } = suspense;
      if (suspense.isHydrating) {
        suspense.isHydrating = false;
      } else if (!resume) {
        const delayEnter = activeBranch && pendingBranch.transition && pendingBranch.transition.mode === "out-in";
        if (delayEnter) {
          activeBranch.transition.afterLeave = () => {
            if (pendingId === suspense.pendingId) {
              move(
                pendingBranch,
                container2,
                anchor2,
                0
                /* MoveType.ENTER */
              );
            }
          };
        }
        let { anchor: anchor2 } = suspense;
        if (activeBranch) {
          anchor2 = next(activeBranch);
          unmount(activeBranch, parentComponent2, suspense, true);
        }
        if (!delayEnter) {
          move(
            pendingBranch,
            container2,
            anchor2,
            0
            /* MoveType.ENTER */
          );
        }
      }
      setActiveBranch(suspense, pendingBranch);
      suspense.pendingBranch = null;
      suspense.isInFallback = false;
      let parent2 = suspense.parent;
      let hasUnresolvedAncestor = false;
      while (parent2) {
        if (parent2.pendingBranch) {
          parent2.effects.push(...effects);
          hasUnresolvedAncestor = true;
          break;
        }
        parent2 = parent2.parent;
      }
      if (!hasUnresolvedAncestor) {
        queuePostFlushCb(effects);
      }
      suspense.effects = [];
      triggerEvent(vnode2, "onResolve");
    },
    fallback(fallbackVNode) {
      if (!suspense.pendingBranch) {
        return;
      }
      const { vnode: vnode2, activeBranch, parentComponent: parentComponent2, container: container2, isSVG: isSVG2 } = suspense;
      triggerEvent(vnode2, "onFallback");
      const anchor2 = next(activeBranch);
      const mountFallback = () => {
        if (!suspense.isInFallback) {
          return;
        }
        patch(
          null,
          fallbackVNode,
          container2,
          anchor2,
          parentComponent2,
          null,
          // fallback tree will not have suspense context
          isSVG2,
          slotScopeIds,
          optimized
        );
        setActiveBranch(suspense, fallbackVNode);
      };
      const delayEnter = fallbackVNode.transition && fallbackVNode.transition.mode === "out-in";
      if (delayEnter) {
        activeBranch.transition.afterLeave = mountFallback;
      }
      suspense.isInFallback = true;
      unmount(
        activeBranch,
        parentComponent2,
        null,
        // no suspense so unmount hooks fire now
        true
        // shouldRemove
      );
      if (!delayEnter) {
        mountFallback();
      }
    },
    move(container2, anchor2, type) {
      suspense.activeBranch && move(suspense.activeBranch, container2, anchor2, type);
      suspense.container = container2;
    },
    next() {
      return suspense.activeBranch && next(suspense.activeBranch);
    },
    registerDep(instance, setupRenderEffect) {
      const isInPendingSuspense = !!suspense.pendingBranch;
      if (isInPendingSuspense) {
        suspense.deps++;
      }
      const hydratedEl = instance.vnode.el;
      instance.asyncDep.catch((err) => {
        handleError(
          err,
          instance,
          0
          /* ErrorCodes.SETUP_FUNCTION */
        );
      }).then((asyncSetupResult) => {
        if (instance.isUnmounted || suspense.isUnmounted || suspense.pendingId !== instance.suspenseId) {
          return;
        }
        instance.asyncResolved = true;
        const { vnode: vnode2 } = instance;
        handleSetupResult(instance, asyncSetupResult, false);
        if (hydratedEl) {
          vnode2.el = hydratedEl;
        }
        const placeholder = !hydratedEl && instance.subTree.el;
        setupRenderEffect(
          instance,
          vnode2,
          // component may have been moved before resolve.
          // if this is not a hydration, instance.subTree will be the comment
          // placeholder.
          parentNode(hydratedEl || instance.subTree.el),
          // anchor will not be used if this is hydration, so only need to
          // consider the comment placeholder case.
          hydratedEl ? null : next(instance.subTree),
          suspense,
          isSVG,
          optimized
        );
        if (placeholder) {
          remove2(placeholder);
        }
        updateHOCHostEl(instance, vnode2.el);
        if (isInPendingSuspense && --suspense.deps === 0) {
          suspense.resolve();
        }
      });
    },
    unmount(parentSuspense, doRemove) {
      suspense.isUnmounted = true;
      if (suspense.activeBranch) {
        unmount(suspense.activeBranch, parentComponent, parentSuspense, doRemove);
      }
      if (suspense.pendingBranch) {
        unmount(suspense.pendingBranch, parentComponent, parentSuspense, doRemove);
      }
    }
  };
  return suspense;
}
function hydrateSuspense(node, vnode, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, rendererInternals, hydrateNode) {
  const suspense = vnode.suspense = createSuspenseBoundary(
    vnode,
    parentSuspense,
    parentComponent,
    node.parentNode,
    document.createElement("div"),
    null,
    isSVG,
    slotScopeIds,
    optimized,
    rendererInternals,
    true
    /* hydrating */
  );
  const result = hydrateNode(node, suspense.pendingBranch = vnode.ssContent, parentComponent, suspense, slotScopeIds, optimized);
  if (suspense.deps === 0) {
    suspense.resolve();
  }
  return result;
}
function normalizeSuspenseChildren(vnode) {
  const { shapeFlag, children } = vnode;
  const isSlotChildren = shapeFlag & 32;
  vnode.ssContent = normalizeSuspenseSlot(isSlotChildren ? children.default : children);
  vnode.ssFallback = isSlotChildren ? normalizeSuspenseSlot(children.fallback) : createVNode(Comment$1);
}
function normalizeSuspenseSlot(s3) {
  let block;
  if (isFunction(s3)) {
    const trackBlock = isBlockTreeEnabled && s3._c;
    if (trackBlock) {
      s3._d = false;
      openBlock();
    }
    s3 = s3();
    if (trackBlock) {
      s3._d = true;
      block = currentBlock;
      closeBlock();
    }
  }
  if (isArray$1(s3)) {
    const singleChild = filterSingleRoot(s3);
    s3 = singleChild;
  }
  s3 = normalizeVNode(s3);
  if (block && !s3.dynamicChildren) {
    s3.dynamicChildren = block.filter((c2) => c2 !== s3);
  }
  return s3;
}
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray$1(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
function setActiveBranch(suspense, branch) {
  suspense.activeBranch = branch;
  const { vnode, parentComponent } = suspense;
  const el = vnode.el = branch.el;
  if (parentComponent && parentComponent.subTree === vnode) {
    parentComponent.vnode.el = el;
    updateHOCHostEl(parentComponent, el);
  }
}
function provide(key, value) {
  if (!currentInstance)
    ;
  else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else
      ;
  }
}
function watchEffect(effect, options2) {
  return doWatch(effect, null, options2);
}
const INITIAL_WATCHER_VALUE = {};
function watch$1(source, cb, options2) {
  return doWatch(source, cb, options2);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  const instance = getCurrentScope() === (currentInstance === null || currentInstance === void 0 ? void 0 : currentInstance.scope) ? currentInstance : null;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray$1(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s3) => isReactive(s3) || isShallow(s3));
    getter = () => source.map((s3) => {
      if (isRef(s3)) {
        return s3.value;
      } else if (isReactive(s3)) {
        return traverse(s3);
      } else if (isFunction(s3)) {
        return callWithErrorHandling(
          s3,
          instance,
          2
          /* ErrorCodes.WATCH_GETTER */
        );
      } else
        ;
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(
        source,
        instance,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(
        fn,
        instance,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  };
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    onCleanup = NOOP;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, 3, [
        getter(),
        isMultiSource ? [] : void 0,
        onCleanup
      ]);
    }
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else {
      return NOOP;
    }
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v2, i2) => hasChanged(v2, oldValue[i2])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect = new ReactiveEffect(getter, scheduler);
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
  } else {
    effect.run();
  }
  const unwatch = () => {
    effect.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
  if (ssrCleanup)
    ssrCleanup.push(unwatch);
  return unwatch;
}
function instanceWatch(source, value, options2) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options2 = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options2);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i2 = 0; i2 < segments.length && cur; i2++) {
      cur = cur[segments[i2]];
    }
    return cur;
  };
}
function traverse(value, seen2) {
  if (!isObject$2(value) || value[
    "__v_skip"
    /* ReactiveFlags.SKIP */
  ]) {
    return value;
  }
  seen2 = seen2 || /* @__PURE__ */ new Set();
  if (seen2.has(value)) {
    return value;
  }
  seen2.add(value);
  if (isRef(value)) {
    traverse(value.value, seen2);
  } else if (isArray$1(value)) {
    for (let i2 = 0; i2 < value.length; i2++) {
      traverse(value[i2], seen2);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v2) => {
      traverse(v2, seen2);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], seen2);
    }
  }
  return value;
}
function useTransitionState() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
}
const TransitionHookValidator = [Function, Array];
const BaseTransitionImpl = {
  name: `BaseTransition`,
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    // enter
    onBeforeEnter: TransitionHookValidator,
    onEnter: TransitionHookValidator,
    onAfterEnter: TransitionHookValidator,
    onEnterCancelled: TransitionHookValidator,
    // leave
    onBeforeLeave: TransitionHookValidator,
    onLeave: TransitionHookValidator,
    onAfterLeave: TransitionHookValidator,
    onLeaveCancelled: TransitionHookValidator,
    // appear
    onBeforeAppear: TransitionHookValidator,
    onAppear: TransitionHookValidator,
    onAfterAppear: TransitionHookValidator,
    onAppearCancelled: TransitionHookValidator
  },
  setup(props2, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevTransitionKey;
    return () => {
      const children = slots.default && getTransitionRawChildren(slots.default(), true);
      if (!children || !children.length) {
        return;
      }
      let child = children[0];
      if (children.length > 1) {
        for (const c2 of children) {
          if (c2.type !== Comment$1) {
            child = c2;
            break;
          }
        }
      }
      const rawProps = toRaw(props2);
      const { mode } = rawProps;
      if (state.isLeaving) {
        return emptyPlaceholder(child);
      }
      const innerChild = getKeepAliveChild(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      const enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance);
      setTransitionHooks(innerChild, enterHooks);
      const oldChild = instance.subTree;
      const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
      let transitionKeyChanged = false;
      const { getTransitionKey } = innerChild.type;
      if (getTransitionKey) {
        const key = getTransitionKey();
        if (prevTransitionKey === void 0) {
          prevTransitionKey = key;
        } else if (key !== prevTransitionKey) {
          prevTransitionKey = key;
          transitionKeyChanged = true;
        }
      }
      if (oldInnerChild && oldInnerChild.type !== Comment$1 && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
        const leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
        setTransitionHooks(oldInnerChild, leavingHooks);
        if (mode === "out-in") {
          state.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            if (instance.update.active !== false) {
              instance.update();
            }
          };
          return emptyPlaceholder(child);
        } else if (mode === "in-out" && innerChild.type !== Comment$1) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
            el._leaveCb = () => {
              earlyRemove();
              el._leaveCb = void 0;
              delete enterHooks.delayedLeave;
            };
            enterHooks.delayedLeave = delayedLeave;
          };
        }
      }
      return child;
    };
  }
};
const BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
  const { leavingVNodes } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = /* @__PURE__ */ Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props2, state, instance) {
  const { appear, mode, persisted = false, onBeforeEnter, onEnter, onAfterEnter, onEnterCancelled, onBeforeLeave, onLeave, onAfterLeave, onLeaveCancelled, onBeforeAppear, onAppear, onAfterAppear, onAppearCancelled } = props2;
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);
  const callHook2 = (hook, args) => {
    hook && callWithAsyncErrorHandling(hook, instance, 9, args);
  };
  const callAsyncHook = (hook, args) => {
    const done = args[1];
    callHook2(hook, args);
    if (isArray$1(hook)) {
      if (hook.every((hook2) => hook2.length <= 1))
        done();
    } else if (hook.length <= 1) {
      done();
    }
  };
  const hooks = {
    mode,
    persisted,
    beforeEnter(el) {
      let hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el._leaveCb) {
        el._leaveCb(
          true
          /* cancelled */
        );
      }
      const leavingVNode = leavingVNodesCache[key];
      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el._leaveCb) {
        leavingVNode.el._leaveCb();
      }
      callHook2(hook, [el]);
    },
    enter(el) {
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      const done = el._enterCb = (cancelled) => {
        if (called)
          return;
        called = true;
        if (cancelled) {
          callHook2(cancelHook, [el]);
        } else {
          callHook2(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el._enterCb = void 0;
      };
      if (hook) {
        callAsyncHook(hook, [el, done]);
      } else {
        done();
      }
    },
    leave(el, remove2) {
      const key2 = String(vnode.key);
      if (el._enterCb) {
        el._enterCb(
          true
          /* cancelled */
        );
      }
      if (state.isUnmounting) {
        return remove2();
      }
      callHook2(onBeforeLeave, [el]);
      let called = false;
      const done = el._leaveCb = (cancelled) => {
        if (called)
          return;
        called = true;
        remove2();
        if (cancelled) {
          callHook2(onLeaveCancelled, [el]);
        } else {
          callHook2(onAfterLeave, [el]);
        }
        el._leaveCb = void 0;
        if (leavingVNodesCache[key2] === vnode) {
          delete leavingVNodesCache[key2];
        }
      };
      leavingVNodesCache[key2] = vnode;
      if (onLeave) {
        callAsyncHook(onLeave, [el, done]);
      } else {
        done();
      }
    },
    clone(vnode2) {
      return resolveTransitionHooks(vnode2, props2, state, instance);
    }
  };
  return hooks;
}
function emptyPlaceholder(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
}
function getKeepAliveChild(vnode) {
  return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : void 0 : vnode;
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
function getTransitionRawChildren(children, keepComment = false, parentKey) {
  let ret = [];
  let keyedFragmentCount = 0;
  for (let i2 = 0; i2 < children.length; i2++) {
    let child = children[i2];
    const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i2);
    if (child.type === Fragment$1) {
      if (child.patchFlag & 128)
        keyedFragmentCount++;
      ret = ret.concat(getTransitionRawChildren(child.children, keepComment, key));
    } else if (keepComment || child.type !== Comment$1) {
      ret.push(key != null ? cloneVNode(child, { key }) : child);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i2 = 0; i2 < ret.length; i2++) {
      ret[i2].patchFlag = -2;
    }
  }
  return ret;
}
function defineComponent(options2) {
  return isFunction(options2) ? { setup: options2, name: options2.name } : options2;
}
const isAsyncWrapper = (i2) => !!i2.type.__asyncLoader;
function defineAsyncComponent(source) {
  if (isFunction(source)) {
    source = { loader: source };
  }
  const {
    loader,
    loadingComponent,
    errorComponent,
    delay = 200,
    timeout,
    // undefined = never times out
    suspensible = true,
    onError: userOnError
  } = source;
  let pendingRequest = null;
  let resolvedComp;
  let retries = 0;
  const retry = () => {
    retries++;
    pendingRequest = null;
    return load();
  };
  const load = () => {
    let thisRequest;
    return pendingRequest || (thisRequest = pendingRequest = loader().catch((err) => {
      err = err instanceof Error ? err : new Error(String(err));
      if (userOnError) {
        return new Promise((resolve2, reject) => {
          const userRetry = () => resolve2(retry());
          const userFail = () => reject(err);
          userOnError(err, userRetry, userFail, retries + 1);
        });
      } else {
        throw err;
      }
    }).then((comp) => {
      if (thisRequest !== pendingRequest && pendingRequest) {
        return pendingRequest;
      }
      if (comp && (comp.__esModule || comp[Symbol.toStringTag] === "Module")) {
        comp = comp.default;
      }
      resolvedComp = comp;
      return comp;
    }));
  };
  return /* @__PURE__ */ defineComponent({
    name: "AsyncComponentWrapper",
    __asyncLoader: load,
    get __asyncResolved() {
      return resolvedComp;
    },
    setup() {
      const instance = currentInstance;
      if (resolvedComp) {
        return () => createInnerComp(resolvedComp, instance);
      }
      const onError = (err) => {
        pendingRequest = null;
        handleError(
          err,
          instance,
          13,
          !errorComponent
          /* do not throw in dev if user provided error component */
        );
      };
      if (suspensible && instance.suspense || isInSSRComponentSetup) {
        return load().then((comp) => {
          return () => createInnerComp(comp, instance);
        }).catch((err) => {
          onError(err);
          return () => errorComponent ? createVNode(errorComponent, {
            error: err
          }) : null;
        });
      }
      const loaded = ref(false);
      const error2 = ref();
      const delayed = ref(!!delay);
      if (delay) {
        setTimeout(() => {
          delayed.value = false;
        }, delay);
      }
      if (timeout != null) {
        setTimeout(() => {
          if (!loaded.value && !error2.value) {
            const err = new Error(`Async component timed out after ${timeout}ms.`);
            onError(err);
            error2.value = err;
          }
        }, timeout);
      }
      load().then(() => {
        loaded.value = true;
        if (instance.parent && isKeepAlive(instance.parent.vnode)) {
          queueJob(instance.parent.update);
        }
      }).catch((err) => {
        onError(err);
        error2.value = err;
      });
      return () => {
        if (loaded.value && resolvedComp) {
          return createInnerComp(resolvedComp, instance);
        } else if (error2.value && errorComponent) {
          return createVNode(errorComponent, {
            error: error2.value
          });
        } else if (loadingComponent && !delayed.value) {
          return createVNode(loadingComponent);
        }
      };
    }
  });
}
function createInnerComp(comp, parent) {
  const { ref: ref2, props: props2, children, ce: ce2 } = parent.vnode;
  const vnode = createVNode(comp, props2, children);
  vnode.ref = ref2;
  vnode.ce = ce2;
  delete parent.vnode.ce;
  return vnode;
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
const KeepAliveImpl = {
  name: `KeepAlive`,
  // Marker for special handling inside the renderer. We are not using a ===
  // check directly on KeepAlive in the renderer, because importing it directly
  // would prevent it from being tree-shaken.
  __isKeepAlive: true,
  props: {
    include: [String, RegExp, Array],
    exclude: [String, RegExp, Array],
    max: [String, Number]
  },
  setup(props2, { slots }) {
    const instance = getCurrentInstance();
    const sharedContext = instance.ctx;
    if (!sharedContext.renderer) {
      return () => {
        const children = slots.default && slots.default();
        return children && children.length === 1 ? children[0] : children;
      };
    }
    const cache = /* @__PURE__ */ new Map();
    const keys = /* @__PURE__ */ new Set();
    let current = null;
    const parentSuspense = instance.suspense;
    const { renderer: { p: patch, m: move, um: _unmount, o: { createElement } } } = sharedContext;
    const storageContainer = createElement("div");
    sharedContext.activate = (vnode, container, anchor, isSVG, optimized) => {
      const instance2 = vnode.component;
      move(vnode, container, anchor, 0, parentSuspense);
      patch(instance2.vnode, vnode, container, anchor, instance2, parentSuspense, isSVG, vnode.slotScopeIds, optimized);
      queuePostRenderEffect(() => {
        instance2.isDeactivated = false;
        if (instance2.a) {
          invokeArrayFns(instance2.a);
        }
        const vnodeHook = vnode.props && vnode.props.onVnodeMounted;
        if (vnodeHook) {
          invokeVNodeHook(vnodeHook, instance2.parent, vnode);
        }
      }, parentSuspense);
    };
    sharedContext.deactivate = (vnode) => {
      const instance2 = vnode.component;
      move(vnode, storageContainer, null, 1, parentSuspense);
      queuePostRenderEffect(() => {
        if (instance2.da) {
          invokeArrayFns(instance2.da);
        }
        const vnodeHook = vnode.props && vnode.props.onVnodeUnmounted;
        if (vnodeHook) {
          invokeVNodeHook(vnodeHook, instance2.parent, vnode);
        }
        instance2.isDeactivated = true;
      }, parentSuspense);
    };
    function unmount(vnode) {
      resetShapeFlag(vnode);
      _unmount(vnode, instance, parentSuspense, true);
    }
    function pruneCache(filter) {
      cache.forEach((vnode, key) => {
        const name = getComponentName(vnode.type);
        if (name && (!filter || !filter(name))) {
          pruneCacheEntry(key);
        }
      });
    }
    function pruneCacheEntry(key) {
      const cached = cache.get(key);
      if (!current || !isSameVNodeType(cached, current)) {
        unmount(cached);
      } else if (current) {
        resetShapeFlag(current);
      }
      cache.delete(key);
      keys.delete(key);
    }
    watch$1(
      () => [props2.include, props2.exclude],
      ([include, exclude]) => {
        include && pruneCache((name) => matches$1(include, name));
        exclude && pruneCache((name) => !matches$1(exclude, name));
      },
      // prune post-render after `current` has been updated
      { flush: "post", deep: true }
    );
    let pendingCacheKey = null;
    const cacheSubtree = () => {
      if (pendingCacheKey != null) {
        cache.set(pendingCacheKey, getInnerChild(instance.subTree));
      }
    };
    onMounted(cacheSubtree);
    onUpdated(cacheSubtree);
    onBeforeUnmount(() => {
      cache.forEach((cached) => {
        const { subTree, suspense } = instance;
        const vnode = getInnerChild(subTree);
        if (cached.type === vnode.type && cached.key === vnode.key) {
          resetShapeFlag(vnode);
          const da = vnode.component.da;
          da && queuePostRenderEffect(da, suspense);
          return;
        }
        unmount(cached);
      });
    });
    return () => {
      pendingCacheKey = null;
      if (!slots.default) {
        return null;
      }
      const children = slots.default();
      const rawVNode = children[0];
      if (children.length > 1) {
        current = null;
        return children;
      } else if (!isVNode(rawVNode) || !(rawVNode.shapeFlag & 4) && !(rawVNode.shapeFlag & 128)) {
        current = null;
        return rawVNode;
      }
      let vnode = getInnerChild(rawVNode);
      const comp = vnode.type;
      const name = getComponentName(isAsyncWrapper(vnode) ? vnode.type.__asyncResolved || {} : comp);
      const { include, exclude, max: max3 } = props2;
      if (include && (!name || !matches$1(include, name)) || exclude && name && matches$1(exclude, name)) {
        current = vnode;
        return rawVNode;
      }
      const key = vnode.key == null ? comp : vnode.key;
      const cachedVNode = cache.get(key);
      if (vnode.el) {
        vnode = cloneVNode(vnode);
        if (rawVNode.shapeFlag & 128) {
          rawVNode.ssContent = vnode;
        }
      }
      pendingCacheKey = key;
      if (cachedVNode) {
        vnode.el = cachedVNode.el;
        vnode.component = cachedVNode.component;
        if (vnode.transition) {
          setTransitionHooks(vnode, vnode.transition);
        }
        vnode.shapeFlag |= 512;
        keys.delete(key);
        keys.add(key);
      } else {
        keys.add(key);
        if (max3 && keys.size > parseInt(max3, 10)) {
          pruneCacheEntry(keys.values().next().value);
        }
      }
      vnode.shapeFlag |= 256;
      current = vnode;
      return isSuspense(rawVNode.type) ? rawVNode : vnode;
    };
  }
};
const KeepAlive = KeepAliveImpl;
function matches$1(pattern, name) {
  if (isArray$1(pattern)) {
    return pattern.some((p2) => matches$1(p2, name));
  } else if (isString(pattern)) {
    return pattern.split(",").includes(name);
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  return false;
}
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function resetShapeFlag(vnode) {
  vnode.shapeFlag &= ~256;
  vnode.shapeFlag &= ~512;
}
function getInnerChild(vnode) {
  return vnode.shapeFlag & 128 ? vnode.ssContent : vnode;
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
);
const onBeforeMount = createHook(
  "bm"
  /* LifecycleHooks.BEFORE_MOUNT */
);
const onMounted = createHook(
  "m"
  /* LifecycleHooks.MOUNTED */
);
const onBeforeUpdate = createHook(
  "bu"
  /* LifecycleHooks.BEFORE_UPDATE */
);
const onUpdated = createHook(
  "u"
  /* LifecycleHooks.UPDATED */
);
const onBeforeUnmount = createHook(
  "bum"
  /* LifecycleHooks.BEFORE_UNMOUNT */
);
const onUnmounted = createHook(
  "um"
  /* LifecycleHooks.UNMOUNTED */
);
const onServerPrefetch = createHook(
  "sp"
  /* LifecycleHooks.SERVER_PREFETCH */
);
const onRenderTriggered = createHook(
  "rtg"
  /* LifecycleHooks.RENDER_TRIGGERED */
);
const onRenderTracked = createHook(
  "rtc"
  /* LifecycleHooks.RENDER_TRACKED */
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i2 = 0; i2 < bindings.length; i2++) {
    const binding = bindings[i2];
    if (oldBindings) {
      binding.oldValue = oldBindings[i2].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
const NULL_DYNAMIC_COMPONENT = Symbol();
function resolveDynamicComponent(component) {
  if (isString(component)) {
    return resolveAsset(COMPONENTS, component, false) || component;
  } else {
    return component || NULL_DYNAMIC_COMPONENT;
  }
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(
        Component,
        false
        /* do not include inferred name to avoid breaking existing code */
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance[type] || Component[type], name) || // global registration
      resolve(instance.appContext[type], name)
    );
    if (!res && maybeSelfReference) {
      return Component;
    }
    return res;
  }
}
function resolve(registry2, name) {
  return registry2 && (registry2[name] || registry2[camelize(name)] || registry2[capitalize(camelize(name))]);
}
function renderList(source, renderItem, cache, index2) {
  let ret;
  const cached = cache && cache[index2];
  if (isArray$1(source) || isString(source)) {
    ret = new Array(source.length);
    for (let i2 = 0, l2 = source.length; i2 < l2; i2++) {
      ret[i2] = renderItem(source[i2], i2, void 0, cached && cached[i2]);
    }
  } else if (typeof source === "number") {
    ret = new Array(source);
    for (let i2 = 0; i2 < source; i2++) {
      ret[i2] = renderItem(i2 + 1, i2, void 0, cached && cached[i2]);
    }
  } else if (isObject$2(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i2) => renderItem(item, i2, void 0, cached && cached[i2]));
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i2 = 0, l2 = keys.length; i2 < l2; i2++) {
        const key = keys[i2];
        ret[i2] = renderItem(source[key], key, i2, cached && cached[i2]);
      }
    }
  } else {
    ret = [];
  }
  if (cache) {
    cache[index2] = ret;
  }
  return ret;
}
function renderSlot(slots, name, props2 = {}, fallback, noSlotted) {
  if (currentRenderingInstance.isCE || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.isCE) {
    if (name !== "default")
      props2.name = name;
    return createVNode("slot", props2, fallback && fallback());
  }
  let slot = slots[name];
  if (slot && slot._c) {
    slot._d = false;
  }
  openBlock();
  const validSlotContent = slot && ensureValidVNode(slot(props2));
  const rendered = createBlock(
    Fragment$1,
    {
      key: props2.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      validSlotContent && validSlotContent.key || `_${name}`
    },
    validSlotContent || (fallback ? fallback() : []),
    validSlotContent && slots._ === 1 ? 64 : -2
    /* PatchFlags.BAIL */
  );
  if (!noSlotted && rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + "-s"];
  }
  if (slot && slot._c) {
    slot._d = true;
  }
  return rendered;
}
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode(child))
      return true;
    if (child.type === Comment$1)
      return false;
    if (child.type === Fragment$1 && !ensureValidVNode(child.children))
      return false;
    return true;
  }) ? vnodes : null;
}
const getPublicInstance = (i2) => {
  if (!i2)
    return null;
  if (isStatefulComponent(i2))
    return getExposeProxy(i2) || i2.proxy;
  return getPublicInstance(i2.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend$1(/* @__PURE__ */ Object.create(null), {
    $: (i2) => i2,
    $el: (i2) => i2.vnode.el,
    $data: (i2) => i2.data,
    $props: (i2) => i2.props,
    $attrs: (i2) => i2.attrs,
    $slots: (i2) => i2.slots,
    $refs: (i2) => i2.refs,
    $parent: (i2) => getPublicInstance(i2.parent),
    $root: (i2) => getPublicInstance(i2.root),
    $emit: (i2) => i2.emit,
    $options: (i2) => resolveMergedOptions(i2),
    $forceUpdate: (i2) => i2.f || (i2.f = () => queueJob(i2.update)),
    $nextTick: (i2) => i2.n || (i2.n = nextTick.bind(i2.proxy)),
    $watch: (i2) => instanceWatch.bind(i2)
  })
);
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props: props2, accessCache, type, appContext } = instance;
    let normalizedProps;
    if (key[0] !== "$") {
      const n2 = accessCache[key];
      if (n2 !== void 0) {
        switch (n2) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props2[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props2[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else
      ;
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      return false;
    } else {
      {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options2 = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options2.beforeCreate) {
    callHook$1(
      options2.beforeCreate,
      instance,
      "bc"
      /* LifecycleHooks.BEFORE_CREATE */
    );
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components: components2,
    directives,
    filters
  } = options2;
  const checkDuplicateProperties = null;
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          ctx[key] = methodHandler.bind(publicThis);
        }
      }
    }
  }
  if (dataOptions) {
    const data = dataOptions.call(publicThis, publicThis);
    if (!isObject$2(data))
      ;
    else {
      instance.data = reactive(data);
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP;
      const c2 = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c2.value,
        set: (v2) => c2.value = v2
      });
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook$1(
      created,
      instance,
      "c"
      /* LifecycleHooks.CREATED */
    );
  }
  function registerLifecycleHook(register2, hook) {
    if (isArray$1(hook)) {
      hook.forEach((_hook) => register2(_hook.bind(publicThis)));
    } else if (hook) {
      register2(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray$1(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components2)
    instance.components = components2;
  if (directives)
    instance.directives = directives;
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
  if (isArray$1(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$2(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
          /* treat default function as factory */
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      if (unwrapRef) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v2) => injected.value = v2
        });
      } else {
        ctx[key] = injected;
      }
    } else {
      ctx[key] = injected;
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(isArray$1(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw2, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw2)) {
    const handler = ctx[raw2];
    if (isFunction(handler)) {
      watch$1(getter, handler);
    }
  } else if (isFunction(raw2)) {
    watch$1(getter, raw2.bind(publicThis));
  } else if (isObject$2(raw2)) {
    if (isArray$1(raw2)) {
      raw2.forEach((r2) => createWatcher(r2, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw2.handler) ? raw2.handler.bind(publicThis) : ctx[raw2.handler];
      if (isFunction(handler)) {
        watch$1(getter, handler, raw2);
      }
    }
  } else
    ;
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m2) => mergeOptions$1(resolved, m2, optionMergeStrategies, true));
    }
    mergeOptions$1(resolved, base, optionMergeStrategies);
  }
  if (isObject$2(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions$1(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions$1(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m2) => mergeOptions$1(to, m2, strats, true));
  }
  for (const key in from) {
    if (asMixin && key === "expose")
      ;
    else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend$1(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw2) {
  if (isArray$1(raw2)) {
    const res = {};
    for (let i2 = 0; i2 < raw2.length; i2++) {
      res[raw2[i2]] = raw2[i2];
    }
    return res;
  }
  return raw2;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend$1(extend$1(/* @__PURE__ */ Object.create(null), to), from) : from;
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend$1(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props2 = {};
  const attrs = {};
  def(attrs, InternalObjectKey, 1);
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props2, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props2)) {
      props2[key] = void 0;
    }
  }
  if (isStateful) {
    instance.props = isSSR ? props2 : shallowReactive(props2);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props2;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const { props: props2, attrs, vnode: { patchFlag } } = instance;
  const rawCurrentProps = toRaw(props2);
  const [options2] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i2 = 0; i2 < propsToUpdate.length; i2++) {
        let key = propsToUpdate[i2];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options2) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props2[camelizedKey] = resolvePropValue(
              options2,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
              /* isAbsent */
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props2, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options2) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props2[key] = resolvePropValue(
              options2,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
              /* isAbsent */
            );
          }
        } else {
          delete props2[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
}
function setFullProps(instance, rawProps, props2, attrs) {
  const [options2, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options2 && hasOwn(options2, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props2[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props2);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i2 = 0; i2 < needCastKeys.length; i2++) {
      const key = needCastKeys[i2];
      props2[key] = resolvePropValue(options2, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options2, props2, key, value, instance, isAbsent) {
  const opt = options2[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props2);
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[
      0
      /* BooleanFlags.shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* BooleanFlags.shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw2 = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw3) => {
      hasExtends = true;
      const [props2, keys] = normalizePropsOptions(raw3, appContext, true);
      extend$1(normalized, props2);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw2 && !hasExtends) {
    if (isObject$2(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray$1(raw2)) {
    for (let i2 = 0; i2 < raw2.length; i2++) {
      const normalizedKey = camelize(raw2[i2]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw2) {
    for (const key in raw2) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw2[key];
        const prop = normalized[normalizedKey] = isArray$1(opt) || isFunction(opt) ? { type: opt } : Object.assign({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[
            0
            /* BooleanFlags.shouldCast */
          ] = booleanIndex > -1;
          prop[
            1
            /* BooleanFlags.shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject$2(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*(function|class) (\w+)/);
  return match ? match[2] : ctor === null ? "null" : "";
}
function isSameType(a2, b2) {
  return getType(a2) === getType(b2);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray$1(expectedTypes)) {
    return expectedTypes.findIndex((t2) => isSameType(t2, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value) => isArray$1(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot$1 = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (false)
      ;
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key))
      continue;
    const value = rawSlots[key];
    if (isFunction(value)) {
      slots[key] = normalizeSlot$1(key, value, ctx);
    } else if (value != null) {
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const initSlots = (instance, children) => {
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      instance.slots = toRaw(children);
      def(children, "_", type);
    } else {
      normalizeObjectSlots(children, instance.slots = {});
    }
  } else {
    instance.slots = {};
    if (children) {
      normalizeVNodeSlots(instance, children);
    }
  }
  def(instance.slots, InternalObjectKey, 1);
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        extend$1(slots, children);
        if (!optimized && type === 1) {
          delete slots._;
        }
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
        delete slots[key];
      }
    }
  }
};
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate2) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = Object.assign({}, rootComponent);
    }
    if (rootProps != null && !isObject$2(rootProps)) {
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new Set();
    let isMounted = false;
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v2) {
      },
      use(plugin2, ...options2) {
        if (installedPlugins.has(plugin2))
          ;
        else if (plugin2 && isFunction(plugin2.install)) {
          installedPlugins.add(plugin2);
          plugin2.install(app, ...options2);
        } else if (isFunction(plugin2)) {
          installedPlugins.add(plugin2);
          plugin2(app, ...options2);
        } else
          ;
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          }
        }
        return app;
      },
      component(name, component) {
        if (!component) {
          return context.components[name];
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        if (!directive) {
          return context.directives[name];
        }
        context.directives[name] = directive;
        return app;
      },
      mount(rootContainer, isHydrate, isSVG) {
        if (!isMounted) {
          const vnode = createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (isHydrate && hydrate2) {
            hydrate2(vnode, rootContainer);
          } else {
            render(vnode, rootContainer, isSVG);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        }
      },
      unmount() {
        if (isMounted) {
          render(null, app._container);
          delete app._container.__vue_app__;
        }
      },
      provide(key, value) {
        context.provides[key] = value;
        return app;
      }
    };
    return app;
  };
}
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray$1(rawRef)) {
    rawRef.forEach((r2, i2) => setRef(r2, oldRawRef && (isArray$1(oldRawRef) ? oldRawRef[i2] : oldRawRef), parentSuspense, vnode, isUnmount));
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref2 } = rawRef;
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref2) {
    if (isString(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction(ref2)) {
    callWithErrorHandling(ref2, owner, 12, [value, refs]);
  } else {
    const _isString = isString(ref2);
    const _isRef = isRef(ref2);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? hasOwn(setupState, ref2) ? setupState[ref2] : refs[ref2] : ref2.value;
          if (isUnmount) {
            isArray$1(existing) && remove(existing, refValue);
          } else {
            if (!isArray$1(existing)) {
              if (_isString) {
                refs[ref2] = [refValue];
                if (hasOwn(setupState, ref2)) {
                  setupState[ref2] = refs[ref2];
                }
              } else {
                ref2.value = [refValue];
                if (rawRef.k)
                  refs[rawRef.k] = ref2.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref2] = value;
          if (hasOwn(setupState, ref2)) {
            setupState[ref2] = value;
          }
        } else if (_isRef) {
          ref2.value = value;
          if (rawRef.k)
            refs[rawRef.k] = value;
        } else
          ;
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    }
  }
}
let hasMismatch = false;
const isSVGContainer = (container) => /svg/.test(container.namespaceURI) && container.tagName !== "foreignObject";
const isComment = (node) => node.nodeType === 8;
function createHydrationFunctions(rendererInternals) {
  const { mt: mountComponent, p: patch, o: { patchProp: patchProp2, createText, nextSibling, parentNode, remove: remove2, insert, createComment } } = rendererInternals;
  const hydrate2 = (vnode, container) => {
    if (!container.hasChildNodes()) {
      patch(null, vnode, container);
      flushPostFlushCbs();
      container._vnode = vnode;
      return;
    }
    hasMismatch = false;
    hydrateNode(container.firstChild, vnode, null, null, null);
    flushPostFlushCbs();
    container._vnode = vnode;
    if (hasMismatch && true) {
      console.error(`Hydration completed but contains mismatches.`);
    }
  };
  const hydrateNode = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized = false) => {
    const isFragmentStart = isComment(node) && node.data === "[";
    const onMismatch = () => handleMismatch(node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragmentStart);
    const { type, ref: ref2, shapeFlag, patchFlag } = vnode;
    let domType = node.nodeType;
    vnode.el = node;
    if (patchFlag === -2) {
      optimized = false;
      vnode.dynamicChildren = null;
    }
    let nextNode = null;
    switch (type) {
      case Text:
        if (domType !== 3) {
          if (vnode.children === "") {
            insert(vnode.el = createText(""), parentNode(node), node);
            nextNode = node;
          } else {
            nextNode = onMismatch();
          }
        } else {
          if (node.data !== vnode.children) {
            hasMismatch = true;
            node.data = vnode.children;
          }
          nextNode = nextSibling(node);
        }
        break;
      case Comment$1:
        if (domType !== 8 || isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = nextSibling(node);
        }
        break;
      case Static:
        if (isFragmentStart) {
          node = nextSibling(node);
          domType = node.nodeType;
        }
        if (domType === 1 || domType === 3) {
          nextNode = node;
          const needToAdoptContent = !vnode.children.length;
          for (let i2 = 0; i2 < vnode.staticCount; i2++) {
            if (needToAdoptContent)
              vnode.children += nextNode.nodeType === 1 ? nextNode.outerHTML : nextNode.data;
            if (i2 === vnode.staticCount - 1) {
              vnode.anchor = nextNode;
            }
            nextNode = nextSibling(nextNode);
          }
          return isFragmentStart ? nextSibling(nextNode) : nextNode;
        } else {
          onMismatch();
        }
        break;
      case Fragment$1:
        if (!isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = hydrateFragment(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
        }
        break;
      default:
        if (shapeFlag & 1) {
          if (domType !== 1 || vnode.type.toLowerCase() !== node.tagName.toLowerCase()) {
            nextNode = onMismatch();
          } else {
            nextNode = hydrateElement(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
          }
        } else if (shapeFlag & 6) {
          vnode.slotScopeIds = slotScopeIds;
          const container = parentNode(node);
          mountComponent(vnode, container, null, parentComponent, parentSuspense, isSVGContainer(container), optimized);
          nextNode = isFragmentStart ? locateClosingAsyncAnchor(node) : nextSibling(node);
          if (nextNode && isComment(nextNode) && nextNode.data === "teleport end") {
            nextNode = nextSibling(nextNode);
          }
          if (isAsyncWrapper(vnode)) {
            let subTree;
            if (isFragmentStart) {
              subTree = createVNode(Fragment$1);
              subTree.anchor = nextNode ? nextNode.previousSibling : container.lastChild;
            } else {
              subTree = node.nodeType === 3 ? createTextVNode("") : createVNode("div");
            }
            subTree.el = node;
            vnode.component.subTree = subTree;
          }
        } else if (shapeFlag & 64) {
          if (domType !== 8) {
            nextNode = onMismatch();
          } else {
            nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, rendererInternals, hydrateChildren);
          }
        } else if (shapeFlag & 128) {
          nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, isSVGContainer(parentNode(node)), slotScopeIds, optimized, rendererInternals, hydrateNode);
        } else
          ;
    }
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, vnode);
    }
    return nextNode;
  };
  const hydrateElement = (el, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    optimized = optimized || !!vnode.dynamicChildren;
    const { type, props: props2, patchFlag, shapeFlag, dirs } = vnode;
    const forcePatchValue = type === "input" && dirs || type === "option";
    if (forcePatchValue || patchFlag !== -1) {
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      if (props2) {
        if (forcePatchValue || !optimized || patchFlag & (16 | 32)) {
          for (const key in props2) {
            if (forcePatchValue && key.endsWith("value") || isOn(key) && !isReservedProp(key)) {
              patchProp2(el, key, null, props2[key], false, void 0, parentComponent);
            }
          }
        } else if (props2.onClick) {
          patchProp2(el, "onClick", null, props2.onClick, false, void 0, parentComponent);
        }
      }
      let vnodeHooks;
      if (vnodeHooks = props2 && props2.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHooks, parentComponent, vnode);
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
      }
      if ((vnodeHooks = props2 && props2.onVnodeMounted) || dirs) {
        queueEffectWithSuspense(() => {
          vnodeHooks && invokeVNodeHook(vnodeHooks, parentComponent, vnode);
          dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
        }, parentSuspense);
      }
      if (shapeFlag & 16 && // skip if element has innerHTML / textContent
      !(props2 && (props2.innerHTML || props2.textContent))) {
        let next = hydrateChildren(el.firstChild, vnode, el, parentComponent, parentSuspense, slotScopeIds, optimized);
        while (next) {
          hasMismatch = true;
          const cur = next;
          next = next.nextSibling;
          remove2(cur);
        }
      } else if (shapeFlag & 8) {
        if (el.textContent !== vnode.children) {
          hasMismatch = true;
          el.textContent = vnode.children;
        }
      }
    }
    return el.nextSibling;
  };
  const hydrateChildren = (node, parentVNode, container, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    optimized = optimized || !!parentVNode.dynamicChildren;
    const children = parentVNode.children;
    const l2 = children.length;
    for (let i2 = 0; i2 < l2; i2++) {
      const vnode = optimized ? children[i2] : children[i2] = normalizeVNode(children[i2]);
      if (node) {
        node = hydrateNode(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
      } else if (vnode.type === Text && !vnode.children) {
        continue;
      } else {
        hasMismatch = true;
        patch(null, vnode, container, null, parentComponent, parentSuspense, isSVGContainer(container), slotScopeIds);
      }
    }
    return node;
  };
  const hydrateFragment = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    const { slotScopeIds: fragmentSlotScopeIds } = vnode;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    const container = parentNode(node);
    const next = hydrateChildren(nextSibling(node), vnode, container, parentComponent, parentSuspense, slotScopeIds, optimized);
    if (next && isComment(next) && next.data === "]") {
      return nextSibling(vnode.anchor = next);
    } else {
      hasMismatch = true;
      insert(vnode.anchor = createComment(`]`), container, next);
      return next;
    }
  };
  const handleMismatch = (node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragment) => {
    hasMismatch = true;
    vnode.el = null;
    if (isFragment) {
      const end = locateClosingAsyncAnchor(node);
      while (true) {
        const next2 = nextSibling(node);
        if (next2 && next2 !== end) {
          remove2(next2);
        } else {
          break;
        }
      }
    }
    const next = nextSibling(node);
    const container = parentNode(node);
    remove2(node);
    patch(null, vnode, container, next, parentComponent, parentSuspense, isSVGContainer(container), slotScopeIds);
    return next;
  };
  const locateClosingAsyncAnchor = (node) => {
    let match = 0;
    while (node) {
      node = nextSibling(node);
      if (node && isComment(node)) {
        if (node.data === "[")
          match++;
        if (node.data === "]") {
          if (match === 0) {
            return nextSibling(node);
          } else {
            match--;
          }
        }
      }
    }
    return node;
  };
  return [hydrate2, hydrateNode];
}
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options2) {
  return baseCreateRenderer(options2);
}
function createHydrationRenderer(options2) {
  return baseCreateRenderer(options2, createHydrationFunctions);
}
function baseCreateRenderer(options2, createHydrationFns) {
  const target = getGlobalThis();
  target.__VUE__ = true;
  const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, insertStaticContent: hostInsertStaticContent } = options2;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref2, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment$1:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG);
        }
        break;
      case Fragment$1:
        processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        break;
      default:
        if (shapeFlag & 1) {
          processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 6) {
          processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 64) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else if (shapeFlag & 128) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else
          ;
    }
    if (ref2 != null && parentComponent) {
      setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, isSVG) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG, n2.el, n2.anchor);
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    isSVG = isSVG || n2.type === "svg";
    if (n1 == null) {
      mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { type, props: props2, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(vnode.type, isSVG, props2 && props2.is, props2);
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== "foreignObject", slotScopeIds, optimized);
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props2) {
      for (const key in props2) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(el, key, null, props2[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }
      if ("value" in props2) {
        hostPatchProp(el, "value", null, props2.value);
      }
      if (vnodeHook = props2.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props2 && props2.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i2 = 0; i2 < slotScopeIds.length; i2++) {
        hostSetScopeId(el, slotScopeIds[i2]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
    for (let i2 = start; i2 < children.length; i2++) {
      const child = children[i2] = optimized ? cloneIfMounted(children[i2]) : normalizeVNode(children[i2]);
      patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    const areChildrenSVG = isSVG && n2.type !== "foreignObject";
    if (dynamicChildren) {
      patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
    } else if (!optimized) {
      patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, isSVG);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i2 = 0; i2 < propsToUpdate.length; i2++) {
            const key = propsToUpdate[i2];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
    for (let i2 = 0; i2 < newChildren.length; i2++) {
      const oldVNode = oldChildren[i2];
      const newVNode = newChildren[i2];
      const container = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (oldVNode.type === Fragment$1 || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
        oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          fallbackContainer
        )
      );
      patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key))
          continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
        if (
          // #2080 if the stable fragment has a key, it's a <template v-for> that may
          //  get moved around. Make sure all root level vnodes inherit el.
          // #2134 or if it's a component root, it may also get moved around
          // as the component is being moved.
          n2.key != null || parentComponent && n2 === parentComponent.subTree
        ) {
          traverseStaticChildren(
            n1,
            n2,
            true
            /* shallow */
          );
        }
      } else {
        patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
      } else {
        mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      setupComponent(instance);
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment$1);
        processCommentNode(null, placeholder, container, anchor);
      }
      return;
    }
    setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        updateComponentPreRender(instance, n2, optimized);
        return;
      } else {
        instance.next = n2;
        invalidateJob(instance.update);
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props: props2 } = initialVNode;
        const { bm, m: m2, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props2 && props2.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            instance.subTree = renderComponentRoot(instance);
            hydrateNode(el, instance.subTree, instance, parentSuspense, null);
          };
          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then(
              // note: we are moving the render call into an async callback,
              // which means it won't track dependencies - but it's ok because
              // a server-rendered async wrapper is already in resolved state
              // and it will never need to change.
              () => !instance.isUnmounted && hydrateSubTree()
            );
          } else {
            hydrateSubTree();
          }
        } else {
          const subTree = instance.subTree = renderComponentRoot(instance);
          patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
          initialVNode.el = subTree.el;
        }
        if (m2) {
          queuePostRenderEffect(m2, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props2 && props2.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u: u2, parent, vnode } = instance;
        let originNext = next;
        let vnodeHook;
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        const nextTree = renderComponentRoot(instance);
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        patch(
          prevTree,
          nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(prevTree.el),
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          isSVG
        );
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u2) {
          queuePostRenderEffect(u2, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
        }
      }
    };
    const effect = instance.effect = new ReactiveEffect(
      componentUpdateFn,
      () => queueJob(update),
      instance.scope
      // track it in component's effect scope
    );
    const update = instance.update = () => effect.run();
    update.id = instance.uid;
    toggleRecurse(instance, true);
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs();
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i2;
    for (i2 = 0; i2 < commonLength; i2++) {
      const nextChild = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
      patch(c1[i2], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
    if (oldLength > newLength) {
      unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
    } else {
      mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let i2 = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i2 <= e1 && i2 <= e2) {
      const n1 = c1[i2];
      const n2 = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      i2++;
    }
    while (i2 <= e1 && i2 <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i2 > e1) {
      if (i2 <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i2 <= e2) {
          patch(null, c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          i2++;
        }
      }
    } else if (i2 > e2) {
      while (i2 <= e1) {
        unmount(c1[i2], parentComponent, parentSuspense, true);
        i2++;
      }
    } else {
      const s1 = i2;
      const s22 = i2;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i2 = s22; i2 <= e2; i2++) {
        const nextChild = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
        if (nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i2);
        }
      }
      let j2;
      let patched = 0;
      const toBePatched = e2 - s22 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i2 = 0; i2 < toBePatched; i2++)
        newIndexToOldIndexMap[i2] = 0;
      for (i2 = s1; i2 <= e1; i2++) {
        const prevChild = c1[i2];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j2 = s22; j2 <= e2; j2++) {
            if (newIndexToOldIndexMap[j2 - s22] === 0 && isSameVNodeType(prevChild, c2[j2])) {
              newIndex = j2;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s22] = i2 + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j2 = increasingNewIndexSequence.length - 1;
      for (i2 = toBePatched - 1; i2 >= 0; i2--) {
        const nextIndex = s22 + i2;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i2] === 0) {
          patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (moved) {
          if (j2 < 0 || i2 !== increasingNewIndexSequence[j2]) {
            move(
              nextChild,
              container,
              anchor,
              2
              /* MoveType.REORDER */
            );
          } else {
            j2--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment$1) {
      hostInsert(el, container, anchor);
      for (let i2 = 0; i2 < children.length; i2++) {
        move(children[i2], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove3 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove3();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove3, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const { type, props: props2, ref: ref2, children, dynamicChildren, shapeFlag, patchFlag, dirs } = vnode;
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, vnode, true);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props2 && props2.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
      } else if (dynamicChildren && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (type !== Fragment$1 || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
      } else if (type === Fragment$1 && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props2 && props2.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment$1) {
      {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    const { bum, scope, update, subTree, um } = instance;
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (update) {
      update.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i2 = start; i2 < children.length; i2++) {
      unmount(children[i2], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  const render = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, isSVG);
    }
    flushPreFlushCbs();
    flushPostFlushCbs();
    container._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options2
  };
  let hydrate2;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate2, hydrateNode] = createHydrationFns(internals);
  }
  return {
    render,
    hydrate: hydrate2,
    createApp: createAppAPI(render, hydrate2)
  };
}
function toggleRecurse({ effect, update }, allowed) {
  effect.allowRecurse = update.allowRecurse = allowed;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray$1(ch1) && isArray$1(ch2)) {
    for (let i2 = 0; i2 < ch1.length; i2++) {
      const c1 = ch1[i2];
      let c2 = ch2[i2];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i2] = cloneIfMounted(ch2[i2]);
          c2.el = c1.el;
        }
        if (!shallow)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i2, j2, u2, v2, c2;
  const len = arr.length;
  for (i2 = 0; i2 < len; i2++) {
    const arrI = arr[i2];
    if (arrI !== 0) {
      j2 = result[result.length - 1];
      if (arr[j2] < arrI) {
        p2[i2] = j2;
        result.push(i2);
        continue;
      }
      u2 = 0;
      v2 = result.length - 1;
      while (u2 < v2) {
        c2 = u2 + v2 >> 1;
        if (arr[result[c2]] < arrI) {
          u2 = c2 + 1;
        } else {
          v2 = c2;
        }
      }
      if (arrI < arr[result[u2]]) {
        if (u2 > 0) {
          p2[i2] = result[u2 - 1];
        }
        result[u2] = i2;
      }
    }
  }
  u2 = result.length;
  v2 = result[u2 - 1];
  while (u2-- > 0) {
    result[u2] = v2;
    v2 = p2[v2];
  }
  return result;
}
const isTeleport = (type) => type.__isTeleport;
const isTeleportDisabled = (props2) => props2 && (props2.disabled || props2.disabled === "");
const isTargetSVG = (target) => typeof SVGElement !== "undefined" && target instanceof SVGElement;
const resolveTarget = (props2, select2) => {
  const targetSelector = props2 && props2.to;
  if (isString(targetSelector)) {
    if (!select2) {
      return null;
    } else {
      const target = select2(targetSelector);
      return target;
    }
  } else {
    return targetSelector;
  }
};
const TeleportImpl = {
  __isTeleport: true,
  process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals) {
    const { mc: mountChildren, pc: patchChildren, pbc: patchBlockChildren, o: { insert, querySelector, createText, createComment } } = internals;
    const disabled = isTeleportDisabled(n2.props);
    let { shapeFlag, children, dynamicChildren } = n2;
    if (n1 == null) {
      const placeholder = n2.el = createText("");
      const mainAnchor = n2.anchor = createText("");
      insert(placeholder, container, anchor);
      insert(mainAnchor, container, anchor);
      const target = n2.target = resolveTarget(n2.props, querySelector);
      const targetAnchor = n2.targetAnchor = createText("");
      if (target) {
        insert(targetAnchor, target);
        isSVG = isSVG || isTargetSVG(target);
      }
      const mount = (container2, anchor2) => {
        if (shapeFlag & 16) {
          mountChildren(children, container2, anchor2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      };
      if (disabled) {
        mount(container, mainAnchor);
      } else if (target) {
        mount(target, targetAnchor);
      }
    } else {
      n2.el = n1.el;
      const mainAnchor = n2.anchor = n1.anchor;
      const target = n2.target = n1.target;
      const targetAnchor = n2.targetAnchor = n1.targetAnchor;
      const wasDisabled = isTeleportDisabled(n1.props);
      const currentContainer = wasDisabled ? container : target;
      const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
      isSVG = isSVG || isTargetSVG(target);
      if (dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, currentContainer, parentComponent, parentSuspense, isSVG, slotScopeIds);
        traverseStaticChildren(n1, n2, true);
      } else if (!optimized) {
        patchChildren(n1, n2, currentContainer, currentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, false);
      }
      if (disabled) {
        if (!wasDisabled) {
          moveTeleport(
            n2,
            container,
            mainAnchor,
            internals,
            1
            /* TeleportMoveTypes.TOGGLE */
          );
        }
      } else {
        if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
          const nextTarget = n2.target = resolveTarget(n2.props, querySelector);
          if (nextTarget) {
            moveTeleport(
              n2,
              nextTarget,
              null,
              internals,
              0
              /* TeleportMoveTypes.TARGET_CHANGE */
            );
          }
        } else if (wasDisabled) {
          moveTeleport(
            n2,
            target,
            targetAnchor,
            internals,
            1
            /* TeleportMoveTypes.TOGGLE */
          );
        }
      }
    }
    updateCssVars(n2);
  },
  remove(vnode, parentComponent, parentSuspense, optimized, { um: unmount, o: { remove: hostRemove } }, doRemove) {
    const { shapeFlag, children, anchor, targetAnchor, target, props: props2 } = vnode;
    if (target) {
      hostRemove(targetAnchor);
    }
    if (doRemove || !isTeleportDisabled(props2)) {
      hostRemove(anchor);
      if (shapeFlag & 16) {
        for (let i2 = 0; i2 < children.length; i2++) {
          const child = children[i2];
          unmount(child, parentComponent, parentSuspense, true, !!child.dynamicChildren);
        }
      }
    }
  },
  move: moveTeleport,
  hydrate: hydrateTeleport
};
function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m: move }, moveType = 2) {
  if (moveType === 0) {
    insert(vnode.targetAnchor, container, parentAnchor);
  }
  const { el, anchor, shapeFlag, children, props: props2 } = vnode;
  const isReorder = moveType === 2;
  if (isReorder) {
    insert(el, container, parentAnchor);
  }
  if (!isReorder || isTeleportDisabled(props2)) {
    if (shapeFlag & 16) {
      for (let i2 = 0; i2 < children.length; i2++) {
        move(
          children[i2],
          container,
          parentAnchor,
          2
          /* MoveType.REORDER */
        );
      }
    }
  }
  if (isReorder) {
    insert(anchor, container, parentAnchor);
  }
}
function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, { o: { nextSibling, parentNode, querySelector } }, hydrateChildren) {
  const target = vnode.target = resolveTarget(vnode.props, querySelector);
  if (target) {
    const targetNode = target._lpa || target.firstChild;
    if (vnode.shapeFlag & 16) {
      if (isTeleportDisabled(vnode.props)) {
        vnode.anchor = hydrateChildren(nextSibling(node), vnode, parentNode(node), parentComponent, parentSuspense, slotScopeIds, optimized);
        vnode.targetAnchor = targetNode;
      } else {
        vnode.anchor = nextSibling(node);
        let targetAnchor = targetNode;
        while (targetAnchor) {
          targetAnchor = nextSibling(targetAnchor);
          if (targetAnchor && targetAnchor.nodeType === 8 && targetAnchor.data === "teleport anchor") {
            vnode.targetAnchor = targetAnchor;
            target._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
            break;
          }
        }
        hydrateChildren(targetNode, vnode, target, parentComponent, parentSuspense, slotScopeIds, optimized);
      }
    }
    updateCssVars(vnode);
  }
  return vnode.anchor && nextSibling(vnode.anchor);
}
const Teleport = TeleportImpl;
function updateCssVars(vnode) {
  const ctx = vnode.ctx;
  if (ctx && ctx.ut) {
    let node = vnode.children[0].el;
    while (node !== vnode.targetAnchor) {
      if (node.nodeType === 1)
        node.setAttribute("data-v-owner", ctx.uid);
      node = node.nextSibling;
    }
    ctx.ut();
  }
}
const Fragment$1 = Symbol(void 0);
const Text = Symbol(void 0);
const Comment$1 = Symbol(void 0);
const Static = Symbol(void 0);
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value) {
  isBlockTreeEnabled += value;
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props2, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(createBaseVNode(
    type,
    props2,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    true
    /* isBlock */
  ));
}
function createBlock(type, props2, children, patchFlag, dynamicProps) {
  return setupBlock(createVNode(
    type,
    props2,
    children,
    patchFlag,
    dynamicProps,
    true
    /* isBlock: prevent a block from tracking itself */
  ));
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
const InternalObjectKey = `__vInternal`;
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({ ref: ref2, ref_key, ref_for }) => {
  return ref2 != null ? isString(ref2) || isRef(ref2) || isFunction(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
};
function createBaseVNode(type, props2 = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment$1 ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props: props2,
    key: props2 && normalizeKey(props2),
    ref: props2 && normalizeRef(props2),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString(children) ? 8 : 16;
  }
  if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
  !isBlockNode && // has current parent block
  currentBlock && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = _createVNode;
function _createVNode(type, props2 = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    type = Comment$1;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(
      type,
      props2,
      true
      /* mergeRef: true */
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag |= -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props2) {
    props2 = guardReactiveProps(props2);
    let { class: klass, style } = props2;
    if (klass && !isString(klass)) {
      props2.class = normalizeClass(klass);
    }
    if (isObject$2(style)) {
      if (isProxy(style) && !isArray$1(style)) {
        style = extend$1({}, style);
      }
      props2.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$2(type) ? 4 : isFunction(type) ? 2 : 0;
  return createBaseVNode(type, props2, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
}
function guardReactiveProps(props2) {
  if (!props2)
    return null;
  return isProxy(props2) || InternalObjectKey in props2 ? extend$1({}, props2) : props2;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
  const { props: props2, ref: ref2, patchFlag, children } = vnode;
  const mergedProps = extraProps ? mergeProps(props2 || {}, extraProps) : props2;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      mergeRef && ref2 ? isArray$1(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps)
    ) : ref2,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: extraProps && vnode.type !== Fragment$1 ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce
  };
  return cloned;
}
function createTextVNode(text2 = " ", flag = 0) {
  return createVNode(Text, null, text2, flag);
}
function createCommentVNode(text2 = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment$1, null, text2)) : createVNode(Comment$1, null, text2);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment$1);
  } else if (isArray$1(child)) {
    return createVNode(
      Fragment$1,
      null,
      // #3666, avoid reference pollution when reusing vnode
      child.slice()
    );
  } else if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray$1(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i2 = 0; i2 < args.length; i2++) {
    const toMerge = args[i2];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray$1(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit$2.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const { props: props2, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props2, isStateful, isSSR);
  initSlots(instance, children);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  const { setup } = Component;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup, instance, 0, [instance.props, setupContext]);
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e2) => {
          handleError(
            e2,
            instance,
            0
            /* ErrorCodes.SETUP_FUNCTION */
          );
        });
      } else {
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject$2(setupResult)) {
    instance.setupState = proxyRefs(setupResult);
  } else
    ;
  finishComponentSetup(instance, isSSR);
}
let compile$1;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile$1 && !Component.render) {
      const template = Component.template || resolveMergedOptions(instance).template;
      if (template) {
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend$1(extend$1({
          isCustomElement,
          delimiters
        }, compilerOptions), componentCompilerOptions);
        Component.render = compile$1(template, finalCompilerOptions);
      }
    }
    instance.render = Component.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions(instance);
    resetTracking();
    unsetCurrentInstance();
  }
}
function createAttrsProxy(instance) {
  return new Proxy(instance.attrs, {
    get(target, key) {
      track(instance, "get", "$attrs");
      return target[key];
    }
  });
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    instance.exposed = exposed || {};
  };
  let attrs;
  {
    return {
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
      },
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
}
function getComponentName(Component, includeInferred = true) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function isClassComponent(value) {
  return isFunction(value) && "__vccOpts" in value;
}
const computed = (getterOrOptions, debugOptions) => {
  return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
function useAttrs() {
  return getContext$2().attrs;
}
function getContext$2() {
  const i2 = getCurrentInstance();
  return i2.setupContext || (i2.setupContext = createSetupContext(i2));
}
function withAsyncContext(getAwaitable) {
  const ctx = getCurrentInstance();
  let awaitable = getAwaitable();
  unsetCurrentInstance();
  if (isPromise(awaitable)) {
    awaitable = awaitable.catch((e2) => {
      setCurrentInstance(ctx);
      throw e2;
    });
  }
  return [awaitable, () => setCurrentInstance(ctx)];
}
function h$1(type, propsOrChildren, children) {
  const l2 = arguments.length;
  if (l2 === 2) {
    if (isObject$2(propsOrChildren) && !isArray$1(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      }
      return createVNode(type, propsOrChildren);
    } else {
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (l2 > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l2 === 3 && isVNode(children)) {
      children = [children];
    }
    return createVNode(type, propsOrChildren, children);
  }
}
const ssrContextKey = Symbol(``);
const useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    return ctx;
  }
};
const version = "3.2.47";
const svgNS = "http://www.w3.org/2000/svg";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, isSVG, is3, props2) => {
    const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is3 ? { is: is3 } : void 0);
    if (tag === "select" && props2 && props2.multiple != null) {
      el.setAttribute("multiple", props2.multiple);
    }
    return el;
  },
  createText: (text2) => doc.createTextNode(text2),
  createComment: (text2) => doc.createComment(text2),
  setText: (node, text2) => {
    node.nodeValue = text2;
  },
  setElementText: (el, text2) => {
    el.textContent = text2;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor, isSVG, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling))
          break;
      }
    } else {
      templateContainer.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
      const template = templateContainer.content;
      if (isSVG) {
        const wrapper2 = template.firstChild;
        while (wrapper2.firstChild) {
          template.appendChild(wrapper2.firstChild);
        }
        template.removeChild(wrapper2);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      // first
      before ? before.nextSibling : parent.firstChild,
      // last
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
function patchClass(el, value, isSVG) {
  const transitionClasses = el._vtc;
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString(next);
  if (next && !isCssString) {
    if (prev && !isString(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle(style, key, "");
        }
      }
    }
    for (const key in next) {
      setStyle(style, key, next[key]);
    }
  } else {
    const currentDisplay = style.display;
    if (isCssString) {
      if (prev !== next) {
        style.cssText = next;
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
    if ("_vod" in el) {
      style.display = currentDisplay;
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray$1(val)) {
    val.forEach((v2) => setStyle(style, name, v2));
  } else {
    if (val == null)
      val = "";
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i2 = 0; i2 < prefixes.length; i2++) {
    const prefixed = prefixes[i2] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    const isBoolean = isSpecialBooleanAttr(key);
    if (value == null || isBoolean && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean ? "" : value);
    }
  }
}
function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value == null ? "" : value;
    return;
  }
  if (key === "value" && el.tagName !== "PROGRESS" && // custom elements may use _value internally
  !el.tagName.includes("-")) {
    el._value = value;
    const newValue = value == null ? "" : value;
    if (el.value !== newValue || // #4956: always set for OPTION elements because its value falls back to
    // textContent if no value attribute is present. And setting .value for
    // OPTION has no side effect
    el.tagName === "OPTION") {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e2) {
  }
  needRemove && el.removeAttribute(key);
}
function addEventListener(el, event, handler, options2) {
  el.addEventListener(event, handler, options2);
}
function removeEventListener(el, event, handler, options2) {
  el.removeEventListener(event, handler, options2);
}
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el._vei || (el._vei = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options2] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(nextValue, instance);
      addEventListener(el, name, invoker, options2);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options2);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options2;
  if (optionsModifierRE.test(name)) {
    options2 = {};
    let m2;
    while (m2 = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m2[0].length);
      options2[m2[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
  return [event, options2];
}
let cachedNow = 0;
const p$6 = /* @__PURE__ */ Promise.resolve();
const getNow = () => cachedNow || (p$6.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue2, instance) {
  const invoker = (e2) => {
    if (!e2._vts) {
      e2._vts = Date.now();
    } else if (e2._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling(patchStopImmediatePropagation(e2, invoker.value), instance, 5, [e2]);
  };
  invoker.value = initialValue2;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e2, value) {
  if (isArray$1(value)) {
    const originalStop = e2.stopImmediatePropagation;
    e2.stopImmediatePropagation = () => {
      originalStop.call(e2);
      e2._stopped = true;
    };
    return value.map((fn) => (e3) => !e3._stopped && fn && fn(e3));
  } else {
    return value;
  }
}
const nativeOnRE = /^on[a-z]/;
const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && nativeOnRE.test(key) && isFunction(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (nativeOnRE.test(key) && isString(value)) {
    return false;
  }
  return key in el;
}
const TRANSITION = "transition";
const ANIMATION = "animation";
const Transition = (props2, { slots }) => h$1(BaseTransition, resolveTransitionProps(props2), slots);
Transition.displayName = "Transition";
const DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
Transition.props = /* @__PURE__ */ extend$1({}, BaseTransition.props, DOMTransitionPropsValidators);
const callHook = (hook, args = []) => {
  if (isArray$1(hook)) {
    hook.forEach((h2) => h2(...args));
  } else if (hook) {
    hook(...args);
  }
};
const hasExplicitCallback = (hook) => {
  return hook ? isArray$1(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
};
function resolveTransitionProps(rawProps) {
  const baseProps = {};
  for (const key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      baseProps[key] = rawProps[key];
    }
  }
  if (rawProps.css === false) {
    return baseProps;
  }
  const { name = "v", type, duration, enterFromClass = `${name}-enter-from`, enterActiveClass = `${name}-enter-active`, enterToClass = `${name}-enter-to`, appearFromClass = enterFromClass, appearActiveClass = enterActiveClass, appearToClass = enterToClass, leaveFromClass = `${name}-leave-from`, leaveActiveClass = `${name}-leave-active`, leaveToClass = `${name}-leave-to` } = rawProps;
  const durations = normalizeDuration(duration);
  const enterDuration = durations && durations[0];
  const leaveDuration = durations && durations[1];
  const { onBeforeEnter, onEnter, onEnterCancelled, onLeave, onLeaveCancelled, onBeforeAppear = onBeforeEnter, onAppear = onEnter, onAppearCancelled = onEnterCancelled } = baseProps;
  const finishEnter = (el, isAppear, done) => {
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    done && done();
  };
  const finishLeave = (el, done) => {
    el._isLeaving = false;
    removeTransitionClass(el, leaveFromClass);
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done && done();
  };
  const makeEnterHook = (isAppear) => {
    return (el, done) => {
      const hook = isAppear ? onAppear : onEnter;
      const resolve2 = () => finishEnter(el, isAppear, done);
      callHook(hook, [el, resolve2]);
      nextFrame(() => {
        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
        addTransitionClass(el, isAppear ? appearToClass : enterToClass);
        if (!hasExplicitCallback(hook)) {
          whenTransitionEnds(el, type, enterDuration, resolve2);
        }
      });
    };
  };
  return extend$1(baseProps, {
    onBeforeEnter(el) {
      callHook(onBeforeEnter, [el]);
      addTransitionClass(el, enterFromClass);
      addTransitionClass(el, enterActiveClass);
    },
    onBeforeAppear(el) {
      callHook(onBeforeAppear, [el]);
      addTransitionClass(el, appearFromClass);
      addTransitionClass(el, appearActiveClass);
    },
    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),
    onLeave(el, done) {
      el._isLeaving = true;
      const resolve2 = () => finishLeave(el, done);
      addTransitionClass(el, leaveFromClass);
      forceReflow();
      addTransitionClass(el, leaveActiveClass);
      nextFrame(() => {
        if (!el._isLeaving) {
          return;
        }
        removeTransitionClass(el, leaveFromClass);
        addTransitionClass(el, leaveToClass);
        if (!hasExplicitCallback(onLeave)) {
          whenTransitionEnds(el, type, leaveDuration, resolve2);
        }
      });
      callHook(onLeave, [el, resolve2]);
    },
    onEnterCancelled(el) {
      finishEnter(el, false);
      callHook(onEnterCancelled, [el]);
    },
    onAppearCancelled(el) {
      finishEnter(el, true);
      callHook(onAppearCancelled, [el]);
    },
    onLeaveCancelled(el) {
      finishLeave(el);
      callHook(onLeaveCancelled, [el]);
    }
  });
}
function normalizeDuration(duration) {
  if (duration == null) {
    return null;
  } else if (isObject$2(duration)) {
    return [NumberOf(duration.enter), NumberOf(duration.leave)];
  } else {
    const n2 = NumberOf(duration);
    return [n2, n2];
  }
}
function NumberOf(val) {
  const res = toNumber(val);
  return res;
}
function addTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c2) => c2 && el.classList.add(c2));
  (el._vtc || (el._vtc = /* @__PURE__ */ new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c2) => c2 && el.classList.remove(c2));
  const { _vtc } = el;
  if (_vtc) {
    _vtc.delete(cls);
    if (!_vtc.size) {
      el._vtc = void 0;
    }
  }
}
function nextFrame(cb) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}
let endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve2) {
  const id = el._endId = ++endId;
  const resolveIfNotStale = () => {
    if (id === el._endId) {
      resolve2();
    }
  };
  if (explicitTimeout) {
    return setTimeout(resolveIfNotStale, explicitTimeout);
  }
  const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
  if (!type) {
    return resolve2();
  }
  const endEvent = type + "end";
  let ended = 0;
  const end = () => {
    el.removeEventListener(endEvent, onEnd);
    resolveIfNotStale();
  };
  const onEnd = (e2) => {
    if (e2.target === el && ++ended >= propCount) {
      end();
    }
  };
  setTimeout(() => {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
  const styles = window.getComputedStyle(el);
  const getStyleProperties = (key) => (styles[key] || "").split(", ");
  const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
  const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
  const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
  const animationTimeout = getTimeout(animationDelays, animationDurations);
  let type = null;
  let timeout = 0;
  let propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(getStyleProperties(`${TRANSITION}Property`).toString());
  return {
    type,
    timeout,
    propCount,
    hasTransform
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max(...durations.map((d2, i2) => toMs(d2) + toMs(delays[i2])));
}
function toMs(s3) {
  return Number(s3.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow() {
  return document.body.offsetHeight;
}
const rendererOptions = /* @__PURE__ */ extend$1({ patchProp }, nodeOps);
let renderer;
let enabledHydration = false;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
function ensureHydrationRenderer() {
  renderer = enabledHydration ? renderer : createHydrationRenderer(rendererOptions);
  enabledHydration = true;
  return renderer;
}
const createApp = (...args) => {
  const app = ensureRenderer().createApp(...args);
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container)
      return;
    const component = app._component;
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    container.innerHTML = "";
    const proxy = mount(container, false, container instanceof SVGElement);
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app;
};
const createSSRApp = (...args) => {
  const app = ensureHydrationRenderer().createApp(...args);
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (container) {
      return mount(container, true, container instanceof SVGElement);
    }
  };
  return app;
};
function normalizeContainer(container) {
  if (isString(container)) {
    const res = document.querySelector(container);
    return res;
  }
  return container;
}
const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d[\d.]{0,14}\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__") {
    return;
  }
  if (key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    return;
  }
  return value;
}
function destr(value, options2 = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _lval = value.toLowerCase().trim();
  if (_lval === "true") {
    return true;
  }
  if (_lval === "false") {
    return false;
  }
  if (_lval === "null") {
    return null;
  }
  if (_lval === "nan") {
    return Number.NaN;
  }
  if (_lval === "infinity") {
    return Number.POSITIVE_INFINITY;
  }
  if (_lval === "undefined") {
    return void 0;
  }
  if (!JsonSigRx.test(value)) {
    if (options2.strict) {
      throw new SyntaxError("Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error2) {
    if (options2.strict) {
      throw error2;
    }
    return value;
  }
}
const HASH_RE$1 = /#/g;
const AMPERSAND_RE$1 = /&/g;
const EQUAL_RE$1 = /=/g;
const PLUS_RE$1 = /\+/g;
const ENC_CARET_RE$1 = /%5e/gi;
const ENC_BACKTICK_RE$1 = /%60/gi;
const ENC_PIPE_RE$1 = /%7c/gi;
const ENC_SPACE_RE$1 = /%20/gi;
function encode(text2) {
  return encodeURI("" + text2).replace(ENC_PIPE_RE$1, "|");
}
function encodeQueryValue$1(input2) {
  return encode(typeof input2 === "string" ? input2 : JSON.stringify(input2)).replace(PLUS_RE$1, "%2B").replace(ENC_SPACE_RE$1, "+").replace(HASH_RE$1, "%23").replace(AMPERSAND_RE$1, "%26").replace(ENC_BACKTICK_RE$1, "`").replace(ENC_CARET_RE$1, "^");
}
function encodeQueryKey$1(text2) {
  return encodeQueryValue$1(text2).replace(EQUAL_RE$1, "%3D");
}
function decode$1(text2 = "") {
  try {
    return decodeURIComponent("" + text2);
  } catch {
    return "" + text2;
  }
}
function decodeQueryValue(text2) {
  return decode$1(text2.replace(PLUS_RE$1, " "));
}
function parseQuery$1(parametersString = "") {
  const object = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s3 = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s3.length < 2) {
      continue;
    }
    const key = decode$1(s3[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s3[2] || "");
    if (typeof object[key] !== "undefined") {
      if (Array.isArray(object[key])) {
        object[key].push(value);
      } else {
        object[key] = [object[key], value];
      }
    } else {
      object[key] = value;
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey$1(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey$1(key)}=${encodeQueryValue$1(_value)}`).join("&");
  }
  return `${encodeQueryKey$1(key)}=${encodeQueryValue$1(value)}`;
}
function stringifyQuery$1(query) {
  return Object.keys(query).filter((k2) => query[k2] !== void 0).map((k2) => encodeQueryItem(k2, query[k2])).join("&");
}
const PROTOCOL_STRICT_REGEX = /^\w{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^\w{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
const TRAILING_SLASH_RE$1 = /\/$|\/\?/;
function hasTrailingSlash(input2 = "", queryParameters = false) {
  if (!queryParameters) {
    return input2.endsWith("/");
  }
  return TRAILING_SLASH_RE$1.test(input2);
}
function withoutTrailingSlash(input2 = "", queryParameters = false) {
  if (!queryParameters) {
    return (hasTrailingSlash(input2) ? input2.slice(0, -1) : input2) || "/";
  }
  if (!hasTrailingSlash(input2, true)) {
    return input2 || "/";
  }
  const [s0, ...s3] = input2.split("?");
  return (s0.slice(0, -1) || "/") + (s3.length > 0 ? `?${s3.join("?")}` : "");
}
function withTrailingSlash(input2 = "", queryParameters = false) {
  if (!queryParameters) {
    return input2.endsWith("/") ? input2 : input2 + "/";
  }
  if (hasTrailingSlash(input2, true)) {
    return input2 || "/";
  }
  const [s0, ...s3] = input2.split("?");
  return s0 + "/" + (s3.length > 0 ? `?${s3.join("?")}` : "");
}
function hasLeadingSlash(input2 = "") {
  return input2.startsWith("/");
}
function withoutLeadingSlash(input2 = "") {
  return (hasLeadingSlash(input2) ? input2.slice(1) : input2) || "/";
}
function withBase(input2, base) {
  if (isEmptyURL(base) || hasProtocol(input2)) {
    return input2;
  }
  const _base = withoutTrailingSlash(base);
  if (input2.startsWith(_base)) {
    return input2;
  }
  return joinURL(_base, input2);
}
function withoutBase(input2, base) {
  if (isEmptyURL(base)) {
    return input2;
  }
  const _base = withoutTrailingSlash(base);
  if (!input2.startsWith(_base)) {
    return input2;
  }
  const trimmed = input2.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input2, query) {
  const parsed = parseURL$1(input2);
  const mergedQuery = { ...parseQuery$1(parsed.search), ...query };
  parsed.search = stringifyQuery$1(mergedQuery);
  return stringifyParsedURL(parsed);
}
function isEmptyURL(url3) {
  return !url3 || url3 === "/";
}
function isNonEmptyURL(url3) {
  return url3 && url3 !== "/";
}
function joinURL(base, ...input2) {
  let url3 = base || "";
  for (const index2 of input2.filter((url22) => isNonEmptyURL(url22))) {
    url3 = url3 ? withTrailingSlash(url3) + withoutLeadingSlash(index2) : index2;
  }
  return url3;
}
function parseURL$1(input2 = "", defaultProto) {
  if (!hasProtocol(input2, { acceptRelative: true })) {
    return defaultProto ? parseURL$1(defaultProto + input2) : parsePath(input2);
  }
  const [protocol = "", auth, hostAndPath = ""] = (input2.replace(/\\/g, "/").match(/([^/:]+:)?\/\/([^/@]+@)?(.*)/) || []).splice(1);
  const [host = "", path = ""] = (hostAndPath.match(/([^#/?]*)(.*)?/) || []).splice(1);
  const { pathname, search, hash } = parsePath(
    path.replace(/\/(?=[A-Za-z]:)/, "")
  );
  return {
    protocol,
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash
  };
}
function parsePath(input2 = "") {
  const [pathname = "", search = "", hash = ""] = (input2.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const fullpath = parsed.pathname + (parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "") + parsed.hash;
  if (!parsed.protocol) {
    return fullpath;
  }
  return parsed.protocol + "//" + (parsed.auth ? parsed.auth + "@" : "") + parsed.host + fullpath;
}
class FetchError extends Error {
  constructor() {
    super(...arguments);
    this.name = "FetchError";
  }
}
function createFetchError(request, error2, response) {
  let message2 = "";
  if (error2) {
    message2 = error2.message;
  }
  if (request && response) {
    message2 = `${message2} (${response.status} ${response.statusText} (${request.toString()}))`;
  } else if (request) {
    message2 = `${message2} (${request.toString()})`;
  }
  const fetchError = new FetchError(message2);
  Object.defineProperty(fetchError, "request", {
    get() {
      return request;
    }
  });
  Object.defineProperty(fetchError, "response", {
    get() {
      return response;
    }
  });
  Object.defineProperty(fetchError, "data", {
    get() {
      return response && response._data;
    }
  });
  Object.defineProperty(fetchError, "status", {
    get() {
      return response && response.status;
    }
  });
  Object.defineProperty(fetchError, "statusText", {
    get() {
      return response && response.statusText;
    }
  });
  Object.defineProperty(fetchError, "statusCode", {
    get() {
      return response && response.status;
    }
  });
  Object.defineProperty(fetchError, "statusMessage", {
    get() {
      return response && response.statusText;
    }
  });
  return fetchError;
}
const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t2 = typeof value;
  if (t2 === "string" || t2 === "number" || t2 === "boolean" || t2 === null) {
    return true;
  }
  if (t2 !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  //  Gateway Timeout
]);
function createFetch(globalOptions) {
  const { fetch: fetch2, Headers: Headers2 } = globalOptions;
  function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && retryStatusCodes.has(responseCode)) {
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error2 = createFetchError(
      context.request,
      context.error,
      context.response
    );
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error2, $fetchRaw);
    }
    throw error2;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: { ...globalOptions.defaults, ..._options },
      response: void 0,
      error: void 0
    };
    if (context.options.onRequest) {
      await context.options.onRequest(context);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query || context.options.params) {
        context.request = withQuery(context.request, {
          ...context.options.params,
          ...context.options.query
        });
      }
      if (context.options.body && isPayloadMethod(context.options.method) && isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers2(context.options.headers);
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      }
    }
    context.response = await fetch2(
      context.request,
      context.options
    ).catch(async (error2) => {
      context.error = error2;
      if (context.options.onRequestError) {
        await context.options.onRequestError(context);
      }
      return onError(context);
    });
    const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
    if (responseType === "json") {
      const data = await context.response.text();
      const parseFunction = context.options.parseResponse || destr;
      context.response._data = parseFunction(data);
    } else if (responseType === "stream") {
      context.response._data = context.response.body;
    } else {
      context.response._data = await context.response[responseType]();
    }
    if (context.options.onResponse) {
      await context.options.onResponse(context);
    }
    if (context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await context.options.onResponseError(context);
      }
      return onError(context);
    }
    return context.response;
  };
  const $fetch2 = function $fetch22(request, options2) {
    return $fetchRaw(request, options2).then((r2) => r2._data);
  };
  $fetch2.raw = $fetchRaw;
  $fetch2.native = fetch2;
  $fetch2.create = (defaultOptions = {}) => createFetch({
    ...globalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch2;
}
const _globalThis$1 = function() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw new Error("unable to locate global object");
}();
const fetch$1 = _globalThis$1.fetch || (() => Promise.reject(new Error("[ofetch] global.fetch is not supported!")));
const Headers = _globalThis$1.Headers;
const ofetch = createFetch({ fetch: fetch$1, Headers });
const $fetch = ofetch;
const useRuntimeConfig$1 = () => {
  var _a;
  return ((_a = window == null ? void 0 : window.__NUXT__) == null ? void 0 : _a.config) || {};
};
const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const buildAssetsDir = () => appConfig.buildAssetsDir;
const buildAssetsURL = (...path) => joinURL(publicAssetsURL(), buildAssetsDir(), ...path);
const publicAssetsURL = (...path) => {
  const publicBase = appConfig.cdnURL || appConfig.baseURL;
  return path.length ? joinURL(publicBase, ...path) : publicBase;
};
{
  globalThis.__buildAssetsURL = buildAssetsURL;
  globalThis.__publicAssetsURL = publicAssetsURL;
}
function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}
class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options2 = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options2.allowDeprecated) {
      let message2 = dep.message;
      if (!message2) {
        message2 = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message2)) {
        console.warn(message2);
        this._deprecatedMessages.add(message2);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index2 = this._hooks[name].indexOf(function_);
      if (index2 !== -1) {
        this._hooks[name].splice(index2, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index2 = this._before.indexOf(function_);
        if (index2 !== -1) {
          this._before.splice(index2, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index2 = this._after.indexOf(function_);
        if (index2 !== -1) {
          this._after.splice(index2, 1);
        }
      }
    };
  }
}
function createHooks$1() {
  return new Hookable();
}
function createContext$1() {
  let currentInstance2;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance2 && currentInstance2 !== instance) {
      throw new Error("Context conflict");
    }
  };
  return {
    use: () => {
      if (currentInstance2 === void 0) {
        throw new Error("Context is not available");
      }
      return currentInstance2;
    },
    tryUse: () => {
      return currentInstance2;
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance2 = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance2 = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance2 = instance;
      try {
        return callback();
      } finally {
        if (!isSingleton) {
          currentInstance2 = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance2 = instance;
      const onRestore = () => {
        currentInstance2 = instance;
      };
      const onLeave = () => currentInstance2 === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r2 = callback();
        if (!isSingleton) {
          currentInstance2 = void 0;
        }
        return await r2;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace() {
  const contexts = {};
  return {
    get(key) {
      if (!contexts[key]) {
        contexts[key] = createContext$1();
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext$1 = (key) => defaultNamespace.get(key);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error2) => {
      restore();
      throw error2;
    });
  }
  return [awaitable, restore];
}
const nuxtAppCtx = /* @__PURE__ */ getContext$1("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options2) {
  let hydratingCount = 0;
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.4.1";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: reactive({
      data: {},
      state: {},
      _errors: {},
      ...window.__NUXT__ ?? {}
    }),
    static: {
      data: {}
    },
    isHydrating: true,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    _payloadRevivers: {},
    ...options2
  };
  nuxtApp.hooks = createHooks$1();
  nuxtApp.hook = nuxtApp.hooks.hook;
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    window.addEventListener("nuxt.preloadError", (event) => {
      nuxtApp.callHook("app:chunkError", { error: event.payload });
    });
    const unreg = nuxtApp.hook("app:error", (...args) => {
      console.error("[nuxt] error caught during app initialization", ...args);
    });
    nuxtApp.hook("app:mounted", unreg);
  }
  const runtimeConfig = reactive(nuxtApp.payload.config);
  const compatibilityConfig = new Proxy(runtimeConfig, {
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      }
      return target.public[prop];
    },
    set(target, prop, value) {
      if (prop === "public" || prop === "app") {
        return false;
      }
      target[prop] = value;
      target.public[prop] = value;
      return true;
    }
  });
  nuxtApp.provide("config", compatibilityConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 !== "function") {
    return;
  }
  const { provide: provide2 } = await callWithNuxt(nuxtApp, plugin2, [nuxtApp]) || {};
  if (provide2 && typeof provide2 === "object") {
    for (const key in provide2) {
      nuxtApp.provide(key, provide2[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  for (const plugin2 of plugins2) {
    await applyPlugin(nuxtApp, plugin2);
  }
}
function normalizePlugins(_plugins2) {
  const plugins2 = [];
  for (const plugin2 of _plugins2) {
    if (typeof plugin2 !== "function") {
      continue;
    }
    let _plugin = plugin2;
    if (plugin2.length > 1) {
      _plugin = (nuxtApp) => plugin2(nuxtApp, nuxtApp.provide);
    }
    plugins2.push(_plugin);
  }
  plugins2.sort((a2, b2) => {
    var _a, _b;
    return (((_a = a2.meta) == null ? void 0 : _a.order) || orderMap.default) - (((_b = b2.meta) == null ? void 0 : _b.order) || orderMap.default);
  });
  return plugins2;
}
const orderMap = {
  pre: -20,
  default: 0,
  post: 20
};
function defineNuxtPlugin(plugin2, meta) {
  var _a;
  if (typeof plugin2 === "function") {
    return /* @__PURE__ */ defineNuxtPlugin({ setup: plugin2 }, meta);
  }
  const wrapper2 = (nuxtApp) => {
    if (plugin2.hooks) {
      nuxtApp.hooks.addHooks(plugin2.hooks);
    }
    if (plugin2.setup) {
      return plugin2.setup(nuxtApp);
    }
  };
  wrapper2.meta = {
    name: (meta == null ? void 0 : meta.name) || plugin2.name || ((_a = plugin2.setup) == null ? void 0 : _a.name),
    order: (meta == null ? void 0 : meta.order) || plugin2.order || orderMap[plugin2.enforce || "default"] || orderMap.default
  };
  wrapper2[NuxtPluginIndicator] = true;
  return wrapper2;
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    nuxtAppCtx.set(nuxt);
    return fn();
  }
}
function useNuxtApp() {
  const nuxtAppInstance = nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    const vm = getCurrentInstance();
    if (!vm) {
      throw new Error("nuxt instance unavailable");
    }
    return vm.appContext.app.$nuxt;
  }
  return nuxtAppInstance;
}
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const main = "";
const components = {};
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components",
  setup(nuxtApp) {
    for (const name in components) {
      nuxtApp.vueApp.component(name, components[name]);
      nuxtApp.vueApp.component("Lazy" + name, components[name]);
    }
  }
});
function asArray(value) {
  return Array.isArray(value) ? value : [value];
}
const TagsWithInnerContent = ["title", "script", "style", "noscript"];
const HasElementTags = [
  "base",
  "meta",
  "link",
  "style",
  "script",
  "noscript"
];
const ValidHeadTags = [
  "title",
  "titleTemplate",
  "templateParams",
  "base",
  "htmlAttrs",
  "bodyAttrs",
  "meta",
  "link",
  "style",
  "script",
  "noscript"
];
const UniqueTags = ["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs", "templateParams"];
const TagConfigKeys = ["tagPosition", "tagPriority", "tagDuplicateStrategy", "innerHTML", "textContent"];
function defineHeadPlugin(plugin2) {
  return plugin2;
}
function hashCode(s3) {
  let h2 = 9;
  for (let i2 = 0; i2 < s3.length; )
    h2 = Math.imul(h2 ^ s3.charCodeAt(i2++), 9 ** 9);
  return ((h2 ^ h2 >>> 9) + 65536).toString(16).substring(1, 8).toLowerCase();
}
function hashTag(tag) {
  return hashCode(`${tag.tag}:${tag.textContent || tag.innerHTML || ""}:${Object.entries(tag.props).map(([key, value]) => `${key}:${String(value)}`).join(",")}`);
}
function computeHashes(hashes) {
  let h2 = 9;
  for (const s3 of hashes) {
    for (let i2 = 0; i2 < s3.length; )
      h2 = Math.imul(h2 ^ s3.charCodeAt(i2++), 9 ** 9);
  }
  return ((h2 ^ h2 >>> 9) + 65536).toString(16).substring(1, 8).toLowerCase();
}
function tagDedupeKey(tag, fn) {
  const { props: props2, tag: tagName } = tag;
  if (UniqueTags.includes(tagName))
    return tagName;
  if (tagName === "link" && props2.rel === "canonical")
    return "canonical";
  if (props2.charset)
    return "charset";
  const name = ["id"];
  if (tagName === "meta")
    name.push(...["name", "property", "http-equiv"]);
  for (const n2 of name) {
    if (typeof props2[n2] !== "undefined") {
      const val = String(props2[n2]);
      if (fn && !fn(val))
        return false;
      return `${tagName}:${n2}:${val}`;
    }
  }
  return false;
}
const resolveTitleTemplate = (template, title) => {
  if (template == null)
    return title || null;
  if (typeof template === "function")
    return template(title);
  return template;
};
const setAttrs = (ctx, newEntry = false, markSideEffect) => {
  const { tag, $el } = ctx;
  if (!$el)
    return;
  Object.entries(tag.props).forEach(([k2, value]) => {
    value = String(value);
    const attrSdeKey = `attr:${k2}`;
    if (k2 === "class") {
      if (!value)
        return;
      for (const c2 of value.split(" ")) {
        const classSdeKey = `${attrSdeKey}:${c2}`;
        if (markSideEffect)
          markSideEffect(ctx, classSdeKey, () => $el.classList.remove(c2));
        if (!$el.classList.contains(c2))
          $el.classList.add(c2);
      }
      return;
    }
    if (markSideEffect && !k2.startsWith("data-h-"))
      markSideEffect(ctx, attrSdeKey, () => $el.removeAttribute(k2));
    if (newEntry || $el.getAttribute(k2) !== value)
      $el.setAttribute(k2, value);
  });
  if (TagsWithInnerContent.includes(tag.tag)) {
    if (tag.textContent && tag.textContent !== $el.textContent)
      $el.textContent = tag.textContent;
    else if (tag.innerHTML && tag.innerHTML !== $el.innerHTML)
      $el.innerHTML = tag.innerHTML;
  }
};
let prevHash = false;
async function renderDOMHead(head, options2 = {}) {
  var _a, _b;
  const beforeRenderCtx = { shouldRender: true };
  await head.hooks.callHook("dom:beforeRender", beforeRenderCtx);
  if (!beforeRenderCtx.shouldRender)
    return;
  const dom = options2.document || head.resolvedOptions.document || window.document;
  const tagContexts = (await head.resolveTags()).map(setupTagRenderCtx);
  if (head.resolvedOptions.experimentalHashHydration) {
    prevHash = prevHash || head._hash || false;
    if (prevHash) {
      const hash = computeHashes(tagContexts.map((ctx) => ctx.tag._h));
      if (prevHash === hash)
        return;
      prevHash = hash;
    }
  }
  const staleSideEffects = head._popSideEffectQueue();
  head.headEntries().map((entry2) => entry2._sde).forEach((sde) => {
    Object.entries(sde).forEach(([key, fn]) => {
      staleSideEffects[key] = fn;
    });
  });
  const markSideEffect = (ctx, key, fn) => {
    key = `${ctx.renderId}:${key}`;
    if (ctx.entry)
      ctx.entry._sde[key] = fn;
    delete staleSideEffects[key];
  };
  function setupTagRenderCtx(tag) {
    const entry2 = head.headEntries().find((e2) => e2._i === tag._e);
    const renderCtx = {
      renderId: !tag.key && tag._d ? tag._d : hashTag(tag),
      $el: null,
      shouldRender: true,
      tag,
      entry: entry2,
      markSideEffect: (key, fn) => markSideEffect(renderCtx, key, fn)
    };
    return renderCtx;
  }
  const renders = [];
  const pendingRenders = {
    body: [],
    head: []
  };
  const markEl = (ctx) => {
    head._elMap[ctx.renderId] = ctx.$el;
    renders.push(ctx);
    markSideEffect(ctx, "el", () => {
      var _a2;
      (_a2 = ctx.$el) == null ? void 0 : _a2.remove();
      delete head._elMap[ctx.renderId];
    });
  };
  for (const ctx of tagContexts) {
    await head.hooks.callHook("dom:beforeRenderTag", ctx);
    if (!ctx.shouldRender)
      continue;
    const { tag } = ctx;
    if (tag.tag === "title") {
      dom.title = tag.textContent || "";
      renders.push(ctx);
      continue;
    }
    if (tag.tag === "htmlAttrs" || tag.tag === "bodyAttrs") {
      ctx.$el = dom[tag.tag === "htmlAttrs" ? "documentElement" : "body"];
      setAttrs(ctx, false, markSideEffect);
      renders.push(ctx);
      continue;
    }
    ctx.$el = head._elMap[ctx.renderId];
    if (!ctx.$el && tag.key)
      ctx.$el = dom.querySelector(`${((_a = tag.tagPosition) == null ? void 0 : _a.startsWith("body")) ? "body" : "head"} > ${tag.tag}[data-h-${tag._h}]`);
    if (ctx.$el) {
      if (ctx.tag._d)
        setAttrs(ctx);
      markEl(ctx);
      continue;
    }
    pendingRenders[((_b = tag.tagPosition) == null ? void 0 : _b.startsWith("body")) ? "body" : "head"].push(ctx);
  }
  const fragments = {
    bodyClose: void 0,
    bodyOpen: void 0,
    head: void 0
  };
  Object.entries(pendingRenders).forEach(([pos, queue2]) => {
    var _a2;
    if (!queue2.length)
      return;
    const children = (_a2 = dom == null ? void 0 : dom[pos]) == null ? void 0 : _a2.children;
    if (!children)
      return;
    for (const $el of [...children].reverse()) {
      const elTag = $el.tagName.toLowerCase();
      if (!HasElementTags.includes(elTag))
        continue;
      const props2 = $el.getAttributeNames().reduce((props22, name) => ({ ...props22, [name]: $el.getAttribute(name) }), {});
      const tmpTag = { tag: elTag, props: props2 };
      if ($el.innerHTML)
        tmpTag.innerHTML = $el.innerHTML;
      const tmpRenderId = hashTag(tmpTag);
      let matchIdx = queue2.findIndex((ctx) => (ctx == null ? void 0 : ctx.renderId) === tmpRenderId);
      if (matchIdx === -1) {
        const tmpDedupeKey = tagDedupeKey(tmpTag);
        matchIdx = queue2.findIndex((ctx) => (ctx == null ? void 0 : ctx.tag._d) && ctx.tag._d === tmpDedupeKey);
      }
      if (matchIdx !== -1) {
        const ctx = queue2[matchIdx];
        ctx.$el = $el;
        setAttrs(ctx);
        markEl(ctx);
        delete queue2[matchIdx];
      }
    }
    queue2.forEach((ctx) => {
      const pos2 = ctx.tag.tagPosition || "head";
      fragments[pos2] = fragments[pos2] || dom.createDocumentFragment();
      if (!ctx.$el) {
        ctx.$el = dom.createElement(ctx.tag.tag);
        setAttrs(ctx, true);
      }
      fragments[pos2].appendChild(ctx.$el);
      markEl(ctx);
    });
  });
  if (fragments.head)
    dom.head.appendChild(fragments.head);
  if (fragments.bodyOpen)
    dom.body.insertBefore(fragments.bodyOpen, dom.body.firstChild);
  if (fragments.bodyClose)
    dom.body.appendChild(fragments.bodyClose);
  for (const ctx of renders)
    await head.hooks.callHook("dom:renderTag", ctx);
  Object.values(staleSideEffects).forEach((fn) => fn());
}
let domUpdatePromise = null;
async function debouncedRenderDOMHead(head, options2 = {}) {
  function doDomUpdate() {
    domUpdatePromise = null;
    return renderDOMHead(head, options2);
  }
  const delayFn = options2.delayFn || ((fn) => setTimeout(fn, 10));
  return domUpdatePromise = domUpdatePromise || new Promise((resolve2) => delayFn(() => resolve2(doDomUpdate())));
}
const PatchDomOnEntryUpdatesPlugin = (options2) => {
  return defineHeadPlugin({
    hooks: {
      "entries:updated": function(head) {
        if (typeof (options2 == null ? void 0 : options2.document) === "undefined" && typeof window === "undefined")
          return;
        let delayFn = options2 == null ? void 0 : options2.delayFn;
        if (!delayFn && typeof requestAnimationFrame !== "undefined")
          delayFn = requestAnimationFrame;
        debouncedRenderDOMHead(head, { document: (options2 == null ? void 0 : options2.document) || window.document, delayFn });
      }
    }
  });
};
function maybeGetSSRHash(document2) {
  var _a;
  return ((_a = document2 == null ? void 0 : document2.head.querySelector('meta[name="unhead:ssr"]')) == null ? void 0 : _a.getAttribute("content")) || false;
}
const TAG_WEIGHTS = {
  // aliases
  critical: 2,
  high: 9,
  low: 12,
  // tags
  base: -1,
  title: 1,
  meta: 10
};
function tagWeight(tag) {
  if (typeof tag.tagPriority === "number")
    return tag.tagPriority;
  if (tag.tag === "meta") {
    if (tag.props.charset)
      return -2;
    if (tag.props["http-equiv"] === "content-security-policy")
      return 0;
  }
  const key = tag.tagPriority || tag.tag;
  if (key in TAG_WEIGHTS) {
    return TAG_WEIGHTS[key];
  }
  return 10;
}
const SortModifiers = [{ prefix: "before:", offset: -1 }, { prefix: "after:", offset: 1 }];
function SortTagsPlugin() {
  return defineHeadPlugin({
    hooks: {
      "tags:resolve": (ctx) => {
        const tagPositionForKey = (key) => {
          var _a;
          return (_a = ctx.tags.find((tag) => tag._d === key)) == null ? void 0 : _a._p;
        };
        for (const { prefix: prefix2, offset } of SortModifiers) {
          for (const tag of ctx.tags.filter((tag2) => typeof tag2.tagPriority === "string" && tag2.tagPriority.startsWith(prefix2))) {
            const position = tagPositionForKey(
              tag.tagPriority.replace(prefix2, "")
            );
            if (typeof position !== "undefined")
              tag._p = position + offset;
          }
        }
        ctx.tags.sort((a2, b2) => a2._p - b2._p).sort((a2, b2) => tagWeight(a2) - tagWeight(b2));
      }
    }
  });
}
const TitleTemplatePlugin = () => {
  return defineHeadPlugin({
    hooks: {
      "tags:resolve": (ctx) => {
        const { tags } = ctx;
        let titleTemplateIdx = tags.findIndex((i2) => i2.tag === "titleTemplate");
        const titleIdx = tags.findIndex((i2) => i2.tag === "title");
        if (titleIdx !== -1 && titleTemplateIdx !== -1) {
          const newTitle = resolveTitleTemplate(
            tags[titleTemplateIdx].textContent,
            tags[titleIdx].textContent
          );
          if (newTitle !== null) {
            tags[titleIdx].textContent = newTitle || tags[titleIdx].textContent;
          } else {
            delete tags[titleIdx];
          }
        } else if (titleTemplateIdx !== -1) {
          const newTitle = resolveTitleTemplate(
            tags[titleTemplateIdx].textContent
          );
          if (newTitle !== null) {
            tags[titleTemplateIdx].textContent = newTitle;
            tags[titleTemplateIdx].tag = "title";
            titleTemplateIdx = -1;
          }
        }
        if (titleTemplateIdx !== -1) {
          delete tags[titleTemplateIdx];
        }
        ctx.tags = tags.filter(Boolean);
      }
    }
  });
};
const DeprecatedTagAttrPlugin = () => {
  return defineHeadPlugin({
    hooks: {
      "tag:normalise": function({ tag }) {
        if (typeof tag.props.body !== "undefined") {
          tag.tagPosition = "bodyClose";
          delete tag.props.body;
        }
      }
    }
  });
};
const DupeableTags = ["link", "style", "script", "noscript"];
const ProvideTagHashPlugin = () => {
  return defineHeadPlugin({
    hooks: {
      "tag:normalise": ({ tag, resolvedOptions }) => {
        if (resolvedOptions.experimentalHashHydration === true) {
          tag._h = hashTag(tag);
        }
        if (tag.key && DupeableTags.includes(tag.tag)) {
          tag._h = hashCode(tag.key);
          tag.props[`data-h-${tag._h}`] = "";
        }
      }
    }
  });
};
const ValidEventTags = ["script", "link", "bodyAttrs"];
const EventHandlersPlugin = () => {
  const stripEventHandlers = (mode, tag) => {
    const props2 = {};
    const eventHandlers = {};
    Object.entries(tag.props).forEach(([key, value]) => {
      if (key.startsWith("on") && typeof value === "function")
        eventHandlers[key] = value;
      else
        props2[key] = value;
    });
    let delayedSrc;
    if (mode === "dom" && tag.tag === "script" && typeof props2.src === "string" && typeof eventHandlers.onload !== "undefined") {
      delayedSrc = props2.src;
      delete props2.src;
    }
    return { props: props2, eventHandlers, delayedSrc };
  };
  return defineHeadPlugin({
    hooks: {
      "ssr:render": function(ctx) {
        ctx.tags = ctx.tags.map((tag) => {
          if (!ValidEventTags.includes(tag.tag))
            return tag;
          if (!Object.entries(tag.props).find(([key, value]) => key.startsWith("on") && typeof value === "function"))
            return tag;
          tag.props = stripEventHandlers("ssr", tag).props;
          return tag;
        });
      },
      "dom:beforeRenderTag": function(ctx) {
        if (!ValidEventTags.includes(ctx.tag.tag))
          return;
        if (!Object.entries(ctx.tag.props).find(([key, value]) => key.startsWith("on") && typeof value === "function"))
          return;
        const { props: props2, eventHandlers, delayedSrc } = stripEventHandlers("dom", ctx.tag);
        if (!Object.keys(eventHandlers).length)
          return;
        ctx.tag.props = props2;
        ctx.tag._eventHandlers = eventHandlers;
        ctx.tag._delayedSrc = delayedSrc;
      },
      "dom:renderTag": function(ctx) {
        const $el = ctx.$el;
        if (!ctx.tag._eventHandlers || !$el)
          return;
        const $eventListenerTarget = ctx.tag.tag === "bodyAttrs" && typeof window !== "undefined" ? window : $el;
        Object.entries(ctx.tag._eventHandlers).forEach(([k2, value]) => {
          const sdeKey = `${ctx.tag._d || ctx.tag._p}:${k2}`;
          const eventName = k2.slice(2).toLowerCase();
          const eventDedupeKey = `data-h-${eventName}`;
          ctx.markSideEffect(sdeKey, () => {
          });
          if ($el.hasAttribute(eventDedupeKey))
            return;
          const handler = value;
          $el.setAttribute(eventDedupeKey, "");
          $eventListenerTarget.addEventListener(eventName, handler);
          if (ctx.entry) {
            ctx.entry._sde[sdeKey] = () => {
              $eventListenerTarget.removeEventListener(eventName, handler);
              $el.removeAttribute(eventDedupeKey);
            };
          }
        });
        if (ctx.tag._delayedSrc) {
          $el.setAttribute("src", ctx.tag._delayedSrc);
        }
      }
    }
  });
};
const UsesMergeStrategy = ["templateParams", "htmlAttrs", "bodyAttrs"];
const DedupesTagsPlugin = () => {
  return defineHeadPlugin({
    hooks: {
      "tag:normalise": function({ tag }) {
        ["hid", "vmid", "key"].forEach((key) => {
          if (tag.props[key]) {
            tag.key = tag.props[key];
            delete tag.props[key];
          }
        });
        const dedupe2 = tag.key ? `${tag.tag}:${tag.key}` : tagDedupeKey(tag);
        if (dedupe2)
          tag._d = dedupe2;
      },
      "tags:resolve": function(ctx) {
        const deduping = {};
        ctx.tags.forEach((tag) => {
          const dedupeKey = tag._d || tag._p;
          const dupedTag = deduping[dedupeKey];
          if (dupedTag) {
            let strategy = tag == null ? void 0 : tag.tagDuplicateStrategy;
            if (!strategy && UsesMergeStrategy.includes(tag.tag))
              strategy = "merge";
            if (strategy === "merge") {
              const oldProps = dupedTag.props;
              ["class", "style"].forEach((key) => {
                if (tag.props[key] && oldProps[key]) {
                  if (key === "style" && !oldProps[key].endsWith(";"))
                    oldProps[key] += ";";
                  tag.props[key] = `${oldProps[key]} ${tag.props[key]}`;
                }
              });
              deduping[dedupeKey].props = {
                ...oldProps,
                ...tag.props
              };
              return;
            } else if (tag._e === dupedTag._e) {
              dupedTag._duped = dupedTag._duped || [];
              tag._d = `${dupedTag._d}:${dupedTag._duped.length + 1}`;
              dupedTag._duped.push(tag);
              return;
            }
            const propCount = Object.keys(tag.props).length;
            if ((propCount === 0 || propCount === 1 && typeof tag.props["data-h-key"] !== "undefined") && !tag.innerHTML && !tag.textContent) {
              delete deduping[dedupeKey];
              return;
            }
          }
          deduping[dedupeKey] = tag;
        });
        const newTags = [];
        Object.values(deduping).forEach((tag) => {
          const dupes = tag._duped;
          delete tag._duped;
          newTags.push(tag);
          if (dupes)
            newTags.push(...dupes);
        });
        ctx.tags = newTags;
      }
    }
  });
};
function processTemplateParams(s3, config2) {
  function sub(token2) {
    if (["s", "pageTitle"].includes(token2))
      return config2.pageTitle;
    let val;
    if (token2.includes(".")) {
      val = token2.split(".").reduce((acc, key) => acc ? acc[key] || void 0 : void 0, config2);
    } else {
      val = config2[token2];
    }
    return typeof val !== "undefined" ? val || "" : false;
  }
  let decoded = s3;
  try {
    decoded = decodeURI(s3);
  } catch {
  }
  const tokens = (decoded.match(/%(\w+\.+\w+)|%(\w+)/g) || []).sort().reverse();
  tokens.forEach((token2) => {
    const re2 = sub(token2.slice(1));
    if (typeof re2 === "string") {
      s3 = s3.replaceAll(new RegExp(`\\${token2}(\\W|$)`, "g"), `${re2}$1`).trim();
    }
  });
  if (config2.separator) {
    if (s3.endsWith(config2.separator))
      s3 = s3.slice(0, -config2.separator.length).trim();
    if (s3.startsWith(config2.separator))
      s3 = s3.slice(config2.separator.length).trim();
    s3 = s3.replace(new RegExp(`\\${config2.separator}\\s*\\${config2.separator}`, "g"), config2.separator);
  }
  return s3;
}
function TemplateParamsPlugin() {
  return defineHeadPlugin({
    hooks: {
      "tags:resolve": (ctx) => {
        var _a;
        const { tags } = ctx;
        const title = (_a = tags.find((tag) => tag.tag === "title")) == null ? void 0 : _a.textContent;
        const idx = tags.findIndex((tag) => tag.tag === "templateParams");
        const params = idx !== -1 ? tags[idx].props : {};
        params.pageTitle = params.pageTitle || title || "";
        for (const tag of tags) {
          if (["titleTemplate", "title"].includes(tag.tag) && typeof tag.textContent === "string") {
            tag.textContent = processTemplateParams(tag.textContent, params);
          } else if (tag.tag === "meta" && typeof tag.props.content === "string") {
            tag.props.content = processTemplateParams(tag.props.content, params);
          } else if (tag.tag === "link" && typeof tag.props.href === "string") {
            tag.props.href = processTemplateParams(tag.props.href, params);
          } else if (tag.tag === "script" && ["application/json", "application/ld+json"].includes(tag.props.type) && typeof tag.innerHTML === "string") {
            try {
              tag.innerHTML = JSON.stringify(JSON.parse(tag.innerHTML), (key, val) => {
                if (typeof val === "string")
                  return processTemplateParams(val, params);
                return val;
              });
            } catch {
            }
          }
        }
        ctx.tags = tags.filter((tag) => tag.tag !== "templateParams");
      }
    }
  });
}
const IsBrowser$1 = typeof window !== "undefined";
let activeHead;
const setActiveHead = (head) => activeHead = head;
const getActiveHead = () => activeHead;
async function normaliseTag(tagName, input2) {
  const tag = { tag: tagName, props: {} };
  if (tagName === "templateParams") {
    tag.props = input2;
    return tag;
  }
  if (["title", "titleTemplate"].includes(tagName)) {
    tag.textContent = input2 instanceof Promise ? await input2 : input2;
    return tag;
  }
  if (typeof input2 === "string") {
    if (!["script", "noscript", "style"].includes(tagName))
      return false;
    if (tagName === "script" && (/^(https?:)?\/\//.test(input2) || input2.startsWith("/")))
      tag.props.src = input2;
    else
      tag.innerHTML = input2;
    return tag;
  }
  tag.props = await normaliseProps(tagName, { ...input2 });
  if (tag.props.children) {
    tag.props.innerHTML = tag.props.children;
  }
  delete tag.props.children;
  Object.keys(tag.props).filter((k2) => TagConfigKeys.includes(k2)).forEach((k2) => {
    if (!["innerHTML", "textContent"].includes(k2) || TagsWithInnerContent.includes(tag.tag)) {
      tag[k2] = tag.props[k2];
    }
    delete tag.props[k2];
  });
  ["innerHTML", "textContent"].forEach((k2) => {
    if (tag.tag === "script" && typeof tag[k2] === "string" && ["application/ld+json", "application/json"].includes(tag.props.type)) {
      try {
        tag[k2] = JSON.parse(tag[k2]);
      } catch (e2) {
        tag[k2] = "";
      }
    }
    if (typeof tag[k2] === "object")
      tag[k2] = JSON.stringify(tag[k2]);
  });
  if (tag.props.class)
    tag.props.class = normaliseClassProp(tag.props.class);
  if (tag.props.content && Array.isArray(tag.props.content))
    return tag.props.content.map((v2) => ({ ...tag, props: { ...tag.props, content: v2 } }));
  return tag;
}
function normaliseClassProp(v2) {
  if (typeof v2 === "object" && !Array.isArray(v2)) {
    v2 = Object.keys(v2).filter((k2) => v2[k2]);
  }
  return (Array.isArray(v2) ? v2.join(" ") : v2).split(" ").filter((c2) => c2.trim()).filter(Boolean).join(" ");
}
async function normaliseProps(tagName, props2) {
  for (const k2 of Object.keys(props2)) {
    const isDataKey = k2.startsWith("data-");
    if (props2[k2] instanceof Promise) {
      props2[k2] = await props2[k2];
    }
    if (String(props2[k2]) === "true") {
      props2[k2] = isDataKey ? "true" : "";
    } else if (String(props2[k2]) === "false") {
      if (isDataKey) {
        props2[k2] = "false";
      } else {
        delete props2[k2];
      }
    }
  }
  return props2;
}
const TagEntityBits = 10;
async function normaliseEntryTags(e2) {
  const tagPromises = [];
  Object.entries(e2.resolvedInput).filter(([k2, v2]) => typeof v2 !== "undefined" && ValidHeadTags.includes(k2)).forEach(([k2, value]) => {
    const v2 = asArray(value);
    tagPromises.push(...v2.map((props2) => normaliseTag(k2, props2)).flat());
  });
  return (await Promise.all(tagPromises)).flat().filter(Boolean).map((t2, i2) => {
    t2._e = e2._i;
    t2._p = (e2._i << TagEntityBits) + i2;
    return t2;
  });
}
const CorePlugins = () => [
  // dedupe needs to come first
  DedupesTagsPlugin(),
  SortTagsPlugin(),
  TemplateParamsPlugin(),
  TitleTemplatePlugin(),
  ProvideTagHashPlugin(),
  EventHandlersPlugin(),
  DeprecatedTagAttrPlugin()
];
const DOMPlugins = (options2 = {}) => [
  PatchDomOnEntryUpdatesPlugin({ document: options2 == null ? void 0 : options2.document, delayFn: options2 == null ? void 0 : options2.domDelayFn })
];
function createHead$1(options2 = {}) {
  const head = createHeadCore({
    ...options2,
    plugins: [...DOMPlugins(options2), ...(options2 == null ? void 0 : options2.plugins) || []]
  });
  if (options2.experimentalHashHydration && head.resolvedOptions.document)
    head._hash = maybeGetSSRHash(head.resolvedOptions.document);
  setActiveHead(head);
  return head;
}
function createHeadCore(options2 = {}) {
  let entries = [];
  let _sde = {};
  let _eid = 0;
  const hooks = createHooks$1();
  if (options2 == null ? void 0 : options2.hooks)
    hooks.addHooks(options2.hooks);
  options2.plugins = [
    ...CorePlugins(),
    ...(options2 == null ? void 0 : options2.plugins) || []
  ];
  options2.plugins.forEach((p2) => p2.hooks && hooks.addHooks(p2.hooks));
  options2.document = options2.document || (IsBrowser$1 ? document : void 0);
  const updated = () => hooks.callHook("entries:updated", head);
  const head = {
    resolvedOptions: options2,
    headEntries() {
      return entries;
    },
    get hooks() {
      return hooks;
    },
    use(plugin2) {
      if (plugin2.hooks)
        hooks.addHooks(plugin2.hooks);
    },
    push(input2, options22) {
      const activeEntry = {
        _i: _eid++,
        input: input2,
        _sde: {}
      };
      if (options22 == null ? void 0 : options22.mode)
        activeEntry._m = options22 == null ? void 0 : options22.mode;
      if (options22 == null ? void 0 : options22.transform) {
        activeEntry._t = options22 == null ? void 0 : options22.transform;
      }
      entries.push(activeEntry);
      updated();
      return {
        dispose() {
          entries = entries.filter((e2) => {
            if (e2._i !== activeEntry._i)
              return true;
            _sde = { ..._sde, ...e2._sde || {} };
            e2._sde = {};
            updated();
            return false;
          });
        },
        // a patch is the same as creating a new entry, just a nice DX
        patch(input22) {
          entries = entries.map((e2) => {
            if (e2._i === activeEntry._i) {
              activeEntry.input = e2.input = input22;
              updated();
            }
            return e2;
          });
        }
      };
    },
    async resolveTags() {
      const resolveCtx = { tags: [], entries: [...entries] };
      await hooks.callHook("entries:resolve", resolveCtx);
      for (const entry2 of resolveCtx.entries) {
        const transformer = entry2._t || ((i2) => i2);
        entry2.resolvedInput = transformer(entry2.resolvedInput || entry2.input);
        if (entry2.resolvedInput) {
          for (const tag of await normaliseEntryTags(entry2)) {
            const tagCtx = { tag, entry: entry2, resolvedOptions: head.resolvedOptions };
            await hooks.callHook("tag:normalise", tagCtx);
            resolveCtx.tags.push(tagCtx.tag);
          }
        }
      }
      await hooks.callHook("tags:resolve", resolveCtx);
      return resolveCtx.tags;
    },
    _popSideEffectQueue() {
      const sde = { ..._sde };
      _sde = {};
      return sde;
    },
    _elMap: {}
  };
  head.hooks.callHook("init", head);
  return head;
}
function resolveUnref(r2) {
  return typeof r2 === "function" ? r2() : unref(r2);
}
function resolveUnrefHeadInput(ref2, lastKey = "") {
  if (ref2 instanceof Promise)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r2) => resolveUnrefHeadInput(r2, lastKey));
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([k2, v2]) => {
        if (k2 === "titleTemplate" || k2.startsWith("on"))
          return [k2, unref(v2)];
        return [k2, resolveUnrefHeadInput(v2, k2)];
      })
    );
  }
  return root;
}
const Vue3 = version.startsWith("3");
const IsBrowser = typeof window !== "undefined";
const headSymbol = "usehead";
function injectHead() {
  return getCurrentInstance() && inject(headSymbol) || getActiveHead();
}
function vueInstall(head) {
  const plugin2 = {
    install(app) {
      if (Vue3) {
        app.config.globalProperties.$unhead = head;
        app.config.globalProperties.$head = head;
        app.provide(headSymbol, head);
      }
    }
  };
  return plugin2.install;
}
function createHead(options2 = {}) {
  const head = createHead$1({
    ...options2,
    // arbitrary delay the dom update for batch updates
    domDelayFn: (fn) => setTimeout(() => nextTick(() => fn()), 10),
    plugins: [
      VueReactiveUseHeadPlugin(),
      ...(options2 == null ? void 0 : options2.plugins) || []
    ]
  });
  head.install = vueInstall(head);
  return head;
}
const VueReactiveUseHeadPlugin = () => {
  return defineHeadPlugin({
    hooks: {
      "entries:resolve": function(ctx) {
        for (const entry2 of ctx.entries)
          entry2.resolvedInput = resolveUnrefHeadInput(entry2.input);
      }
    }
  });
};
function clientUseHead(input2, options2 = {}) {
  const head = injectHead();
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput(input2);
  });
  const entry2 = head.push(resolvedInput.value, options2);
  watch$1(resolvedInput, (e2) => {
    entry2.patch(e2);
  });
  const vm = getCurrentInstance();
  if (vm) {
    onBeforeUnmount(() => {
      entry2.dispose();
    });
    onDeactivated(() => {
      deactivated.value = true;
    });
    onActivated(() => {
      deactivated.value = false;
    });
  }
  return entry2;
}
function serverUseHead(input2, options2 = {}) {
  const head = injectHead();
  return head.push(input2, options2);
}
function useHead(input2, options2 = {}) {
  var _a;
  const head = injectHead();
  if (head) {
    const isBrowser2 = IsBrowser || !!((_a = head.resolvedOptions) == null ? void 0 : _a.document);
    if (options2.mode === "server" && isBrowser2 || options2.mode === "client" && !isBrowser2)
      return;
    return isBrowser2 ? clientUseHead(input2, options2) : serverUseHead(input2, options2);
  }
}
const appHead = { "meta": [{ "name": "viewport", "content": "width=device-width, initial-scale=1" }, { "charset": "utf-8" }], "link": [{ "rel": "stylesheet", "href": "https://rsms.me/inter/inter.css", "crossorigin": "anonymous" }], "style": [], "script": [], "noscript": [], "htmlAttrs": { "class": "bg-normal-50 font-light text-normal-900", "style": "margin-left: calc(100vw - 100%);" }, "bodyAttrs": { "class": "" } };
const appPageTransition = false;
const appKeepalive = false;
const appRootId = "__nuxt";
const renderJsonPayloads = false;
const unhead_KgADcZ0jPj = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  setup(nuxtApp) {
    const createHead$12 = createHead;
    const head = createHead$12();
    head.push(appHead);
    nuxtApp.vueApp.use(head);
    {
      let pauseDOMUpdates = true;
      const unpauseDom = () => {
        pauseDOMUpdates = false;
        head.hooks.callHook("entries:updated", head);
      };
      head.hooks.hook("dom:beforeRender", (context) => {
        context.shouldRender = !pauseDOMUpdates;
      });
      nuxtApp.hooks.hook("page:start", () => {
        pauseDOMUpdates = true;
      });
      nuxtApp.hooks.hook("page:finish", unpauseDom);
      nuxtApp.hooks.hook("app:suspense:resolve", unpauseDom);
    }
  }
});
/*!
  * vue-router v4.1.6
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
const isBrowser$1 = typeof window !== "undefined";
function isESModule(obj) {
  return obj.__esModule || obj[Symbol.toStringTag] === "Module";
}
const assign = Object.assign;
function applyToParams(fn, params) {
  const newParams = {};
  for (const key in params) {
    const value = params[key];
    newParams[key] = isArray(value) ? value.map(fn) : fn(value);
  }
  return newParams;
}
const noop = () => {
};
const isArray = Array.isArray;
const TRAILING_SLASH_RE = /\/$/;
const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, "");
function parseURL(parseQuery2, location2, currentLocation = "/") {
  let path, query = {}, searchString = "", hash = "";
  const hashPos = location2.indexOf("#");
  let searchPos = location2.indexOf("?");
  if (hashPos < searchPos && hashPos >= 0) {
    searchPos = -1;
  }
  if (searchPos > -1) {
    path = location2.slice(0, searchPos);
    searchString = location2.slice(searchPos + 1, hashPos > -1 ? hashPos : location2.length);
    query = parseQuery2(searchString);
  }
  if (hashPos > -1) {
    path = path || location2.slice(0, hashPos);
    hash = location2.slice(hashPos, location2.length);
  }
  path = resolveRelativePath(path != null ? path : location2, currentLocation);
  return {
    fullPath: path + (searchString && "?") + searchString + hash,
    path,
    query,
    hash
  };
}
function stringifyURL(stringifyQuery2, location2) {
  const query = location2.query ? stringifyQuery2(location2.query) : "";
  return location2.path + (query && "?") + query + (location2.hash || "");
}
function stripBase(pathname, base) {
  if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase()))
    return pathname;
  return pathname.slice(base.length) || "/";
}
function isSameRouteLocation(stringifyQuery2, a2, b2) {
  const aLastIndex = a2.matched.length - 1;
  const bLastIndex = b2.matched.length - 1;
  return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a2.matched[aLastIndex], b2.matched[bLastIndex]) && isSameRouteLocationParams(a2.params, b2.params) && stringifyQuery2(a2.query) === stringifyQuery2(b2.query) && a2.hash === b2.hash;
}
function isSameRouteRecord(a2, b2) {
  return (a2.aliasOf || a2) === (b2.aliasOf || b2);
}
function isSameRouteLocationParams(a2, b2) {
  if (Object.keys(a2).length !== Object.keys(b2).length)
    return false;
  for (const key in a2) {
    if (!isSameRouteLocationParamsValue(a2[key], b2[key]))
      return false;
  }
  return true;
}
function isSameRouteLocationParamsValue(a2, b2) {
  return isArray(a2) ? isEquivalentArray(a2, b2) : isArray(b2) ? isEquivalentArray(b2, a2) : a2 === b2;
}
function isEquivalentArray(a2, b2) {
  return isArray(b2) ? a2.length === b2.length && a2.every((value, i2) => value === b2[i2]) : a2.length === 1 && a2[0] === b2;
}
function resolveRelativePath(to, from) {
  if (to.startsWith("/"))
    return to;
  if (!to)
    return from;
  const fromSegments = from.split("/");
  const toSegments = to.split("/");
  let position = fromSegments.length - 1;
  let toPosition;
  let segment;
  for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
    segment = toSegments[toPosition];
    if (segment === ".")
      continue;
    if (segment === "..") {
      if (position > 1)
        position--;
    } else
      break;
  }
  return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition - (toPosition === toSegments.length ? 1 : 0)).join("/");
}
var NavigationType;
(function(NavigationType2) {
  NavigationType2["pop"] = "pop";
  NavigationType2["push"] = "push";
})(NavigationType || (NavigationType = {}));
var NavigationDirection;
(function(NavigationDirection2) {
  NavigationDirection2["back"] = "back";
  NavigationDirection2["forward"] = "forward";
  NavigationDirection2["unknown"] = "";
})(NavigationDirection || (NavigationDirection = {}));
function normalizeBase(base) {
  if (!base) {
    if (isBrowser$1) {
      const baseEl = document.querySelector("base");
      base = baseEl && baseEl.getAttribute("href") || "/";
      base = base.replace(/^\w+:\/\/[^\/]+/, "");
    } else {
      base = "/";
    }
  }
  if (base[0] !== "/" && base[0] !== "#")
    base = "/" + base;
  return removeTrailingSlash(base);
}
const BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base, location2) {
  return base.replace(BEFORE_HASH_RE, "#") + location2;
}
function getElementPosition(el, offset) {
  const docRect = document.documentElement.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return {
    behavior: offset.behavior,
    left: elRect.left - docRect.left - (offset.left || 0),
    top: elRect.top - docRect.top - (offset.top || 0)
  };
}
const computeScrollPosition = () => ({
  left: window.pageXOffset,
  top: window.pageYOffset
});
function scrollToPosition(position) {
  let scrollToOptions;
  if ("el" in position) {
    const positionEl = position.el;
    const isIdSelector = typeof positionEl === "string" && positionEl.startsWith("#");
    const el = typeof positionEl === "string" ? isIdSelector ? document.getElementById(positionEl.slice(1)) : document.querySelector(positionEl) : positionEl;
    if (!el) {
      return;
    }
    scrollToOptions = getElementPosition(el, position);
  } else {
    scrollToOptions = position;
  }
  if ("scrollBehavior" in document.documentElement.style)
    window.scrollTo(scrollToOptions);
  else {
    window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.pageXOffset, scrollToOptions.top != null ? scrollToOptions.top : window.pageYOffset);
  }
}
function getScrollKey(path, delta) {
  const position = history.state ? history.state.position - delta : -1;
  return position + path;
}
const scrollPositions = /* @__PURE__ */ new Map();
function saveScrollPosition(key, scrollPosition) {
  scrollPositions.set(key, scrollPosition);
}
function getSavedScrollPosition(key) {
  const scroll = scrollPositions.get(key);
  scrollPositions.delete(key);
  return scroll;
}
let createBaseLocation = () => location.protocol + "//" + location.host;
function createCurrentLocation$1(base, location2) {
  const { pathname, search, hash } = location2;
  const hashPos = base.indexOf("#");
  if (hashPos > -1) {
    let slicePos = hash.includes(base.slice(hashPos)) ? base.slice(hashPos).length : 1;
    let pathFromHash = hash.slice(slicePos);
    if (pathFromHash[0] !== "/")
      pathFromHash = "/" + pathFromHash;
    return stripBase(pathFromHash, "");
  }
  const path = stripBase(pathname, base);
  return path + search + hash;
}
function useHistoryListeners(base, historyState, currentLocation, replace) {
  let listeners = [];
  let teardowns = [];
  let pauseState = null;
  const popStateHandler = ({ state }) => {
    const to = createCurrentLocation$1(base, location);
    const from = currentLocation.value;
    const fromState = historyState.value;
    let delta = 0;
    if (state) {
      currentLocation.value = to;
      historyState.value = state;
      if (pauseState && pauseState === from) {
        pauseState = null;
        return;
      }
      delta = fromState ? state.position - fromState.position : 0;
    } else {
      replace(to);
    }
    listeners.forEach((listener) => {
      listener(currentLocation.value, from, {
        delta,
        type: NavigationType.pop,
        direction: delta ? delta > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
      });
    });
  };
  function pauseListeners() {
    pauseState = currentLocation.value;
  }
  function listen(callback) {
    listeners.push(callback);
    const teardown = () => {
      const index2 = listeners.indexOf(callback);
      if (index2 > -1)
        listeners.splice(index2, 1);
    };
    teardowns.push(teardown);
    return teardown;
  }
  function beforeUnloadListener() {
    const { history: history2 } = window;
    if (!history2.state)
      return;
    history2.replaceState(assign({}, history2.state, { scroll: computeScrollPosition() }), "");
  }
  function destroy2() {
    for (const teardown of teardowns)
      teardown();
    teardowns = [];
    window.removeEventListener("popstate", popStateHandler);
    window.removeEventListener("beforeunload", beforeUnloadListener);
  }
  window.addEventListener("popstate", popStateHandler);
  window.addEventListener("beforeunload", beforeUnloadListener);
  return {
    pauseListeners,
    listen,
    destroy: destroy2
  };
}
function buildState(back, current, forward, replaced = false, computeScroll = false) {
  return {
    back,
    current,
    forward,
    replaced,
    position: window.history.length,
    scroll: computeScroll ? computeScrollPosition() : null
  };
}
function useHistoryStateNavigation(base) {
  const { history: history2, location: location2 } = window;
  const currentLocation = {
    value: createCurrentLocation$1(base, location2)
  };
  const historyState = { value: history2.state };
  if (!historyState.value) {
    changeLocation(currentLocation.value, {
      back: null,
      current: currentLocation.value,
      forward: null,
      // the length is off by one, we need to decrease it
      position: history2.length - 1,
      replaced: true,
      // don't add a scroll as the user may have an anchor, and we want
      // scrollBehavior to be triggered without a saved position
      scroll: null
    }, true);
  }
  function changeLocation(to, state, replace2) {
    const hashIndex = base.indexOf("#");
    const url3 = hashIndex > -1 ? (location2.host && document.querySelector("base") ? base : base.slice(hashIndex)) + to : createBaseLocation() + base + to;
    try {
      history2[replace2 ? "replaceState" : "pushState"](state, "", url3);
      historyState.value = state;
    } catch (err) {
      {
        console.error(err);
      }
      location2[replace2 ? "replace" : "assign"](url3);
    }
  }
  function replace(to, data) {
    const state = assign({}, history2.state, buildState(
      historyState.value.back,
      // keep back and forward entries but override current position
      to,
      historyState.value.forward,
      true
    ), data, { position: historyState.value.position });
    changeLocation(to, state, true);
    currentLocation.value = to;
  }
  function push(to, data) {
    const currentState = assign(
      {},
      // use current history state to gracefully handle a wrong call to
      // history.replaceState
      // https://github.com/vuejs/router/issues/366
      historyState.value,
      history2.state,
      {
        forward: to,
        scroll: computeScrollPosition()
      }
    );
    changeLocation(currentState.current, currentState, true);
    const state = assign({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data);
    changeLocation(to, state, false);
    currentLocation.value = to;
  }
  return {
    location: currentLocation,
    state: historyState,
    push,
    replace
  };
}
function createWebHistory(base) {
  base = normalizeBase(base);
  const historyNavigation = useHistoryStateNavigation(base);
  const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
  function go(delta, triggerListeners = true) {
    if (!triggerListeners)
      historyListeners.pauseListeners();
    history.go(delta);
  }
  const routerHistory = assign({
    // it's overridden right after
    location: "",
    base,
    go,
    createHref: createHref.bind(null, base)
  }, historyNavigation, historyListeners);
  Object.defineProperty(routerHistory, "location", {
    enumerable: true,
    get: () => historyNavigation.location.value
  });
  Object.defineProperty(routerHistory, "state", {
    enumerable: true,
    get: () => historyNavigation.state.value
  });
  return routerHistory;
}
function createWebHashHistory(base) {
  base = location.host ? base || location.pathname + location.search : "";
  if (!base.includes("#"))
    base += "#";
  return createWebHistory(base);
}
function isRouteLocation(route) {
  return typeof route === "string" || route && typeof route === "object";
}
function isRouteName(name) {
  return typeof name === "string" || typeof name === "symbol";
}
const START_LOCATION_NORMALIZED = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
const NavigationFailureSymbol = Symbol("");
var NavigationFailureType;
(function(NavigationFailureType2) {
  NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
  NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
  NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
})(NavigationFailureType || (NavigationFailureType = {}));
function createRouterError(type, params) {
  {
    return assign(new Error(), {
      type,
      [NavigationFailureSymbol]: true
    }, params);
  }
}
function isNavigationFailure(error2, type) {
  return error2 instanceof Error && NavigationFailureSymbol in error2 && (type == null || !!(error2.type & type));
}
const BASE_PARAM_PATTERN = "[^/]+?";
const BASE_PATH_PARSER_OPTIONS = {
  sensitive: false,
  strict: false,
  start: true,
  end: true
};
const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
function tokensToParser(segments, extraOptions) {
  const options2 = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
  const score = [];
  let pattern = options2.start ? "^" : "";
  const keys = [];
  for (const segment of segments) {
    const segmentScores = segment.length ? [] : [
      90
      /* PathScore.Root */
    ];
    if (options2.strict && !segment.length)
      pattern += "/";
    for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
      const token2 = segment[tokenIndex];
      let subSegmentScore = 40 + (options2.sensitive ? 0.25 : 0);
      if (token2.type === 0) {
        if (!tokenIndex)
          pattern += "/";
        pattern += token2.value.replace(REGEX_CHARS_RE, "\\$&");
        subSegmentScore += 40;
      } else if (token2.type === 1) {
        const { value, repeatable, optional, regexp } = token2;
        keys.push({
          name: value,
          repeatable,
          optional
        });
        const re3 = regexp ? regexp : BASE_PARAM_PATTERN;
        if (re3 !== BASE_PARAM_PATTERN) {
          subSegmentScore += 10;
          try {
            new RegExp(`(${re3})`);
          } catch (err) {
            throw new Error(`Invalid custom RegExp for param "${value}" (${re3}): ` + err.message);
          }
        }
        let subPattern = repeatable ? `((?:${re3})(?:/(?:${re3}))*)` : `(${re3})`;
        if (!tokenIndex)
          subPattern = // avoid an optional / if there are more segments e.g. /:p?-static
          // or /:p?-:p2
          optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
        if (optional)
          subPattern += "?";
        pattern += subPattern;
        subSegmentScore += 20;
        if (optional)
          subSegmentScore += -8;
        if (repeatable)
          subSegmentScore += -20;
        if (re3 === ".*")
          subSegmentScore += -50;
      }
      segmentScores.push(subSegmentScore);
    }
    score.push(segmentScores);
  }
  if (options2.strict && options2.end) {
    const i2 = score.length - 1;
    score[i2][score[i2].length - 1] += 0.7000000000000001;
  }
  if (!options2.strict)
    pattern += "/?";
  if (options2.end)
    pattern += "$";
  else if (options2.strict)
    pattern += "(?:/|$)";
  const re2 = new RegExp(pattern, options2.sensitive ? "" : "i");
  function parse2(path) {
    const match = path.match(re2);
    const params = {};
    if (!match)
      return null;
    for (let i2 = 1; i2 < match.length; i2++) {
      const value = match[i2] || "";
      const key = keys[i2 - 1];
      params[key.name] = value && key.repeatable ? value.split("/") : value;
    }
    return params;
  }
  function stringify(params) {
    let path = "";
    let avoidDuplicatedSlash = false;
    for (const segment of segments) {
      if (!avoidDuplicatedSlash || !path.endsWith("/"))
        path += "/";
      avoidDuplicatedSlash = false;
      for (const token2 of segment) {
        if (token2.type === 0) {
          path += token2.value;
        } else if (token2.type === 1) {
          const { value, repeatable, optional } = token2;
          const param = value in params ? params[value] : "";
          if (isArray(param) && !repeatable) {
            throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
          }
          const text2 = isArray(param) ? param.join("/") : param;
          if (!text2) {
            if (optional) {
              if (segment.length < 2) {
                if (path.endsWith("/"))
                  path = path.slice(0, -1);
                else
                  avoidDuplicatedSlash = true;
              }
            } else
              throw new Error(`Missing required param "${value}"`);
          }
          path += text2;
        }
      }
    }
    return path || "/";
  }
  return {
    re: re2,
    score,
    keys,
    parse: parse2,
    stringify
  };
}
function compareScoreArray(a2, b2) {
  let i2 = 0;
  while (i2 < a2.length && i2 < b2.length) {
    const diff = b2[i2] - a2[i2];
    if (diff)
      return diff;
    i2++;
  }
  if (a2.length < b2.length) {
    return a2.length === 1 && a2[0] === 40 + 40 ? -1 : 1;
  } else if (a2.length > b2.length) {
    return b2.length === 1 && b2[0] === 40 + 40 ? 1 : -1;
  }
  return 0;
}
function comparePathParserScore(a2, b2) {
  let i2 = 0;
  const aScore = a2.score;
  const bScore = b2.score;
  while (i2 < aScore.length && i2 < bScore.length) {
    const comp = compareScoreArray(aScore[i2], bScore[i2]);
    if (comp)
      return comp;
    i2++;
  }
  if (Math.abs(bScore.length - aScore.length) === 1) {
    if (isLastScoreNegative(aScore))
      return 1;
    if (isLastScoreNegative(bScore))
      return -1;
  }
  return bScore.length - aScore.length;
}
function isLastScoreNegative(score) {
  const last = score[score.length - 1];
  return score.length > 0 && last[last.length - 1] < 0;
}
const ROOT_TOKEN = {
  type: 0,
  value: ""
};
const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
function tokenizePath(path) {
  if (!path)
    return [[]];
  if (path === "/")
    return [[ROOT_TOKEN]];
  if (!path.startsWith("/")) {
    throw new Error(`Invalid path "${path}"`);
  }
  function crash(message2) {
    throw new Error(`ERR (${state})/"${buffer}": ${message2}`);
  }
  let state = 0;
  let previousState = state;
  const tokens = [];
  let segment;
  function finalizeSegment() {
    if (segment)
      tokens.push(segment);
    segment = [];
  }
  let i2 = 0;
  let char;
  let buffer = "";
  let customRe = "";
  function consumeBuffer() {
    if (!buffer)
      return;
    if (state === 0) {
      segment.push({
        type: 0,
        value: buffer
      });
    } else if (state === 1 || state === 2 || state === 3) {
      if (segment.length > 1 && (char === "*" || char === "+"))
        crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
      segment.push({
        type: 1,
        value: buffer,
        regexp: customRe,
        repeatable: char === "*" || char === "+",
        optional: char === "*" || char === "?"
      });
    } else {
      crash("Invalid state to consume buffer");
    }
    buffer = "";
  }
  function addCharToBuffer() {
    buffer += char;
  }
  while (i2 < path.length) {
    char = path[i2++];
    if (char === "\\" && state !== 2) {
      previousState = state;
      state = 4;
      continue;
    }
    switch (state) {
      case 0:
        if (char === "/") {
          if (buffer) {
            consumeBuffer();
          }
          finalizeSegment();
        } else if (char === ":") {
          consumeBuffer();
          state = 1;
        } else {
          addCharToBuffer();
        }
        break;
      case 4:
        addCharToBuffer();
        state = previousState;
        break;
      case 1:
        if (char === "(") {
          state = 2;
        } else if (VALID_PARAM_RE.test(char)) {
          addCharToBuffer();
        } else {
          consumeBuffer();
          state = 0;
          if (char !== "*" && char !== "?" && char !== "+")
            i2--;
        }
        break;
      case 2:
        if (char === ")") {
          if (customRe[customRe.length - 1] == "\\")
            customRe = customRe.slice(0, -1) + char;
          else
            state = 3;
        } else {
          customRe += char;
        }
        break;
      case 3:
        consumeBuffer();
        state = 0;
        if (char !== "*" && char !== "?" && char !== "+")
          i2--;
        customRe = "";
        break;
      default:
        crash("Unknown state");
        break;
    }
  }
  if (state === 2)
    crash(`Unfinished custom RegExp for param "${buffer}"`);
  consumeBuffer();
  finalizeSegment();
  return tokens;
}
function createRouteRecordMatcher(record, parent, options2) {
  const parser = tokensToParser(tokenizePath(record.path), options2);
  const matcher = assign(parser, {
    record,
    parent,
    // these needs to be populated by the parent
    children: [],
    alias: []
  });
  if (parent) {
    if (!matcher.record.aliasOf === !parent.record.aliasOf)
      parent.children.push(matcher);
  }
  return matcher;
}
function createRouterMatcher(routes, globalOptions) {
  const matchers = [];
  const matcherMap = /* @__PURE__ */ new Map();
  globalOptions = mergeOptions({ strict: false, end: true, sensitive: false }, globalOptions);
  function getRecordMatcher(name) {
    return matcherMap.get(name);
  }
  function addRoute(record, parent, originalRecord) {
    const isRootAdd = !originalRecord;
    const mainNormalizedRecord = normalizeRouteRecord(record);
    mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
    const options2 = mergeOptions(globalOptions, record);
    const normalizedRecords = [
      mainNormalizedRecord
    ];
    if ("alias" in record) {
      const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
      for (const alias of aliases) {
        normalizedRecords.push(assign({}, mainNormalizedRecord, {
          // this allows us to hold a copy of the `components` option
          // so that async components cache is hold on the original record
          components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
          path: alias,
          // we might be the child of an alias
          aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
          // the aliases are always of the same kind as the original since they
          // are defined on the same record
        }));
      }
    }
    let matcher;
    let originalMatcher;
    for (const normalizedRecord of normalizedRecords) {
      const { path } = normalizedRecord;
      if (parent && path[0] !== "/") {
        const parentPath = parent.record.path;
        const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
        normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
      }
      matcher = createRouteRecordMatcher(normalizedRecord, parent, options2);
      if (originalRecord) {
        originalRecord.alias.push(matcher);
      } else {
        originalMatcher = originalMatcher || matcher;
        if (originalMatcher !== matcher)
          originalMatcher.alias.push(matcher);
        if (isRootAdd && record.name && !isAliasRecord(matcher))
          removeRoute(record.name);
      }
      if (mainNormalizedRecord.children) {
        const children = mainNormalizedRecord.children;
        for (let i2 = 0; i2 < children.length; i2++) {
          addRoute(children[i2], matcher, originalRecord && originalRecord.children[i2]);
        }
      }
      originalRecord = originalRecord || matcher;
      if (matcher.record.components && Object.keys(matcher.record.components).length || matcher.record.name || matcher.record.redirect) {
        insertMatcher(matcher);
      }
    }
    return originalMatcher ? () => {
      removeRoute(originalMatcher);
    } : noop;
  }
  function removeRoute(matcherRef) {
    if (isRouteName(matcherRef)) {
      const matcher = matcherMap.get(matcherRef);
      if (matcher) {
        matcherMap.delete(matcherRef);
        matchers.splice(matchers.indexOf(matcher), 1);
        matcher.children.forEach(removeRoute);
        matcher.alias.forEach(removeRoute);
      }
    } else {
      const index2 = matchers.indexOf(matcherRef);
      if (index2 > -1) {
        matchers.splice(index2, 1);
        if (matcherRef.record.name)
          matcherMap.delete(matcherRef.record.name);
        matcherRef.children.forEach(removeRoute);
        matcherRef.alias.forEach(removeRoute);
      }
    }
  }
  function getRoutes() {
    return matchers;
  }
  function insertMatcher(matcher) {
    let i2 = 0;
    while (i2 < matchers.length && comparePathParserScore(matcher, matchers[i2]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (matcher.record.path !== matchers[i2].record.path || !isRecordChildOf(matcher, matchers[i2])))
      i2++;
    matchers.splice(i2, 0, matcher);
    if (matcher.record.name && !isAliasRecord(matcher))
      matcherMap.set(matcher.record.name, matcher);
  }
  function resolve2(location2, currentLocation) {
    let matcher;
    let params = {};
    let path;
    let name;
    if ("name" in location2 && location2.name) {
      matcher = matcherMap.get(location2.name);
      if (!matcher)
        throw createRouterError(1, {
          location: location2
        });
      name = matcher.record.name;
      params = assign(
        // paramsFromLocation is a new object
        paramsFromLocation(
          currentLocation.params,
          // only keep params that exist in the resolved location
          // TODO: only keep optional params coming from a parent record
          matcher.keys.filter((k2) => !k2.optional).map((k2) => k2.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        location2.params && paramsFromLocation(location2.params, matcher.keys.map((k2) => k2.name))
      );
      path = matcher.stringify(params);
    } else if ("path" in location2) {
      path = location2.path;
      matcher = matchers.find((m2) => m2.re.test(path));
      if (matcher) {
        params = matcher.parse(path);
        name = matcher.record.name;
      }
    } else {
      matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m2) => m2.re.test(currentLocation.path));
      if (!matcher)
        throw createRouterError(1, {
          location: location2,
          currentLocation
        });
      name = matcher.record.name;
      params = assign({}, currentLocation.params, location2.params);
      path = matcher.stringify(params);
    }
    const matched = [];
    let parentMatcher = matcher;
    while (parentMatcher) {
      matched.unshift(parentMatcher.record);
      parentMatcher = parentMatcher.parent;
    }
    return {
      name,
      path,
      params,
      matched,
      meta: mergeMetaFields(matched)
    };
  }
  routes.forEach((route) => addRoute(route));
  return { addRoute, resolve: resolve2, removeRoute, getRoutes, getRecordMatcher };
}
function paramsFromLocation(params, keys) {
  const newParams = {};
  for (const key of keys) {
    if (key in params)
      newParams[key] = params[key];
  }
  return newParams;
}
function normalizeRouteRecord(record) {
  return {
    path: record.path,
    redirect: record.redirect,
    name: record.name,
    meta: record.meta || {},
    aliasOf: void 0,
    beforeEnter: record.beforeEnter,
    props: normalizeRecordProps(record),
    children: record.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in record ? record.components || null : record.component && { default: record.component }
  };
}
function normalizeRecordProps(record) {
  const propsObject = {};
  const props2 = record.props || false;
  if ("component" in record) {
    propsObject.default = props2;
  } else {
    for (const name in record.components)
      propsObject[name] = typeof props2 === "boolean" ? props2 : props2[name];
  }
  return propsObject;
}
function isAliasRecord(record) {
  while (record) {
    if (record.record.aliasOf)
      return true;
    record = record.parent;
  }
  return false;
}
function mergeMetaFields(matched) {
  return matched.reduce((meta, record) => assign(meta, record.meta), {});
}
function mergeOptions(defaults, partialOptions) {
  const options2 = {};
  for (const key in defaults) {
    options2[key] = key in partialOptions ? partialOptions[key] : defaults[key];
  }
  return options2;
}
function isRecordChildOf(record, parent) {
  return parent.children.some((child) => child === record || isRecordChildOf(record, child));
}
const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_BRACKET_OPEN_RE = /%5B/g;
const ENC_BRACKET_CLOSE_RE = /%5D/g;
const ENC_CARET_RE = /%5E/g;
const ENC_BACKTICK_RE = /%60/g;
const ENC_CURLY_OPEN_RE = /%7B/g;
const ENC_PIPE_RE = /%7C/g;
const ENC_CURLY_CLOSE_RE = /%7D/g;
const ENC_SPACE_RE = /%20/g;
function commonEncode(text2) {
  return encodeURI("" + text2).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
}
function encodeHash(text2) {
  return commonEncode(text2).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryValue(text2) {
  return commonEncode(text2).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryKey(text2) {
  return encodeQueryValue(text2).replace(EQUAL_RE, "%3D");
}
function encodePath(text2) {
  return commonEncode(text2).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
}
function encodeParam(text2) {
  return text2 == null ? "" : encodePath(text2).replace(SLASH_RE, "%2F");
}
function decode(text2) {
  try {
    return decodeURIComponent("" + text2);
  } catch (err) {
  }
  return "" + text2;
}
function parseQuery(search) {
  const query = {};
  if (search === "" || search === "?")
    return query;
  const hasLeadingIM = search[0] === "?";
  const searchParams = (hasLeadingIM ? search.slice(1) : search).split("&");
  for (let i2 = 0; i2 < searchParams.length; ++i2) {
    const searchParam = searchParams[i2].replace(PLUS_RE, " ");
    const eqPos = searchParam.indexOf("=");
    const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
    const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
    if (key in query) {
      let currentValue = query[key];
      if (!isArray(currentValue)) {
        currentValue = query[key] = [currentValue];
      }
      currentValue.push(value);
    } else {
      query[key] = value;
    }
  }
  return query;
}
function stringifyQuery(query) {
  let search = "";
  for (let key in query) {
    const value = query[key];
    key = encodeQueryKey(key);
    if (value == null) {
      if (value !== void 0) {
        search += (search.length ? "&" : "") + key;
      }
      continue;
    }
    const values = isArray(value) ? value.map((v2) => v2 && encodeQueryValue(v2)) : [value && encodeQueryValue(value)];
    values.forEach((value2) => {
      if (value2 !== void 0) {
        search += (search.length ? "&" : "") + key;
        if (value2 != null)
          search += "=" + value2;
      }
    });
  }
  return search;
}
function normalizeQuery(query) {
  const normalizedQuery = {};
  for (const key in query) {
    const value = query[key];
    if (value !== void 0) {
      normalizedQuery[key] = isArray(value) ? value.map((v2) => v2 == null ? null : "" + v2) : value == null ? value : "" + value;
    }
  }
  return normalizedQuery;
}
const matchedRouteKey = Symbol("");
const viewDepthKey = Symbol("");
const routerKey = Symbol("");
const routeLocationKey = Symbol("");
const routerViewLocationKey = Symbol("");
function useCallbacks() {
  let handlers = [];
  function add2(handler) {
    handlers.push(handler);
    return () => {
      const i2 = handlers.indexOf(handler);
      if (i2 > -1)
        handlers.splice(i2, 1);
    };
  }
  function reset2() {
    handlers = [];
  }
  return {
    add: add2,
    list: () => handlers,
    reset: reset2
  };
}
function guardToPromiseFn(guard, to, from, record, name) {
  const enterCallbackArray = record && // name is defined if record is because of the function overload
  (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
  return () => new Promise((resolve2, reject) => {
    const next = (valid) => {
      if (valid === false) {
        reject(createRouterError(4, {
          from,
          to
        }));
      } else if (valid instanceof Error) {
        reject(valid);
      } else if (isRouteLocation(valid)) {
        reject(createRouterError(2, {
          from: to,
          to: valid
        }));
      } else {
        if (enterCallbackArray && // since enterCallbackArray is truthy, both record and name also are
        record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function") {
          enterCallbackArray.push(valid);
        }
        resolve2();
      }
    };
    const guardReturn = guard.call(record && record.instances[name], to, from, next);
    let guardCall = Promise.resolve(guardReturn);
    if (guard.length < 3)
      guardCall = guardCall.then(next);
    guardCall.catch((err) => reject(err));
  });
}
function extractComponentsGuards(matched, guardType, to, from) {
  const guards = [];
  for (const record of matched) {
    for (const name in record.components) {
      let rawComponent = record.components[name];
      if (guardType !== "beforeRouteEnter" && !record.instances[name])
        continue;
      if (isRouteComponent(rawComponent)) {
        const options2 = rawComponent.__vccOpts || rawComponent;
        const guard = options2[guardType];
        guard && guards.push(guardToPromiseFn(guard, to, from, record, name));
      } else {
        let componentPromise = rawComponent();
        guards.push(() => componentPromise.then((resolved) => {
          if (!resolved)
            return Promise.reject(new Error(`Couldn't resolve component "${name}" at "${record.path}"`));
          const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
          record.components[name] = resolvedComponent;
          const options2 = resolvedComponent.__vccOpts || resolvedComponent;
          const guard = options2[guardType];
          return guard && guardToPromiseFn(guard, to, from, record, name)();
        }));
      }
    }
  }
  return guards;
}
function isRouteComponent(component) {
  return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
}
function useLink(props2) {
  const router = inject(routerKey);
  const currentRoute = inject(routeLocationKey);
  const route = computed(() => router.resolve(unref(props2.to)));
  const activeRecordIndex = computed(() => {
    const { matched } = route.value;
    const { length: length3 } = matched;
    const routeMatched = matched[length3 - 1];
    const currentMatched = currentRoute.matched;
    if (!routeMatched || !currentMatched.length)
      return -1;
    const index2 = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
    if (index2 > -1)
      return index2;
    const parentRecordPath = getOriginalPath(matched[length3 - 2]);
    return (
      // we are dealing with nested routes
      length3 > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      getOriginalPath(routeMatched) === parentRecordPath && // avoid comparing the child with its parent
      currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length3 - 2])) : index2
    );
  });
  const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
  const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
  function navigate(e2 = {}) {
    if (guardEvent(e2)) {
      return router[unref(props2.replace) ? "replace" : "push"](
        unref(props2.to)
        // avoid uncaught errors are they are logged anyway
      ).catch(noop);
    }
    return Promise.resolve();
  }
  return {
    route,
    href: computed(() => route.value.href),
    isActive,
    isExactActive,
    navigate
  };
}
const RouterLinkImpl = /* @__PURE__ */ defineComponent({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    replace: Boolean,
    activeClass: String,
    // inactiveClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    }
  },
  useLink,
  setup(props2, { slots }) {
    const link = reactive(useLink(props2));
    const { options: options2 } = inject(routerKey);
    const elClass = computed(() => ({
      [getLinkClass(props2.activeClass, options2.linkActiveClass, "router-link-active")]: link.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [getLinkClass(props2.exactActiveClass, options2.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
    }));
    return () => {
      const children = slots.default && slots.default(link);
      return props2.custom ? children : h$1("a", {
        "aria-current": link.isExactActive ? props2.ariaCurrentValue : null,
        href: link.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: link.navigate,
        class: elClass.value
      }, children);
    };
  }
});
const RouterLink = RouterLinkImpl;
function guardEvent(e2) {
  if (e2.metaKey || e2.altKey || e2.ctrlKey || e2.shiftKey)
    return;
  if (e2.defaultPrevented)
    return;
  if (e2.button !== void 0 && e2.button !== 0)
    return;
  if (e2.currentTarget && e2.currentTarget.getAttribute) {
    const target = e2.currentTarget.getAttribute("target");
    if (/\b_blank\b/i.test(target))
      return;
  }
  if (e2.preventDefault)
    e2.preventDefault();
  return true;
}
function includesParams(outer2, inner2) {
  for (const key in inner2) {
    const innerValue = inner2[key];
    const outerValue = outer2[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue)
        return false;
    } else {
      if (!isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i2) => value !== outerValue[i2]))
        return false;
    }
  }
  return true;
}
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
const RouterViewImpl = /* @__PURE__ */ defineComponent({
  name: "RouterView",
  // #674 we manually inherit them
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  // Better compat for @vue/compat users
  // https://github.com/vuejs/router/issues/1315
  compatConfig: { MODE: 3 },
  setup(props2, { attrs, slots }) {
    const injectedRoute = inject(routerViewLocationKey);
    const routeToDisplay = computed(() => props2.route || injectedRoute.value);
    const injectedDepth = inject(viewDepthKey, 0);
    const depth = computed(() => {
      let initialDepth = unref(injectedDepth);
      const { matched } = routeToDisplay.value;
      let matchedRoute;
      while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) {
        initialDepth++;
      }
      return initialDepth;
    });
    const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth.value]);
    provide(viewDepthKey, computed(() => depth.value + 1));
    provide(matchedRouteKey, matchedRouteRef);
    provide(routerViewLocationKey, routeToDisplay);
    const viewRef = ref();
    watch$1(() => [viewRef.value, matchedRouteRef.value, props2.name], ([instance, to, name], [oldInstance, from, oldName]) => {
      if (to) {
        to.instances[name] = instance;
        if (from && from !== to && instance && instance === oldInstance) {
          if (!to.leaveGuards.size) {
            to.leaveGuards = from.leaveGuards;
          }
          if (!to.updateGuards.size) {
            to.updateGuards = from.updateGuards;
          }
        }
      }
      if (instance && to && // if there is no instance but to and from are the same this might be
      // the first visit
      (!from || !isSameRouteRecord(to, from) || !oldInstance)) {
        (to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
      }
    }, { flush: "post" });
    return () => {
      const route = routeToDisplay.value;
      const currentName = props2.name;
      const matchedRoute = matchedRouteRef.value;
      const ViewComponent = matchedRoute && matchedRoute.components[currentName];
      if (!ViewComponent) {
        return normalizeSlot(slots.default, { Component: ViewComponent, route });
      }
      const routePropsOption = matchedRoute.props[currentName];
      const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
      const onVnodeUnmounted = (vnode) => {
        if (vnode.component.isUnmounted) {
          matchedRoute.instances[currentName] = null;
        }
      };
      const component = h$1(ViewComponent, assign({}, routeProps, attrs, {
        onVnodeUnmounted,
        ref: viewRef
      }));
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        normalizeSlot(slots.default, { Component: component, route }) || component
      );
    };
  }
});
function normalizeSlot(slot, data) {
  if (!slot)
    return null;
  const slotContent = slot(data);
  return slotContent.length === 1 ? slotContent[0] : slotContent;
}
const RouterView = RouterViewImpl;
function createRouter(options2) {
  const matcher = createRouterMatcher(options2.routes, options2);
  const parseQuery$12 = options2.parseQuery || parseQuery;
  const stringifyQuery$12 = options2.stringifyQuery || stringifyQuery;
  const routerHistory = options2.history;
  const beforeGuards = useCallbacks();
  const beforeResolveGuards = useCallbacks();
  const afterGuards = useCallbacks();
  const currentRoute = shallowRef(START_LOCATION_NORMALIZED);
  let pendingLocation = START_LOCATION_NORMALIZED;
  if (isBrowser$1 && options2.scrollBehavior && "scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
  const encodeParams = applyToParams.bind(null, encodeParam);
  const decodeParams = (
    // @ts-expect-error: intentionally avoid the type check
    applyToParams.bind(null, decode)
  );
  function addRoute(parentOrRoute, route) {
    let parent;
    let record;
    if (isRouteName(parentOrRoute)) {
      parent = matcher.getRecordMatcher(parentOrRoute);
      record = route;
    } else {
      record = parentOrRoute;
    }
    return matcher.addRoute(record, parent);
  }
  function removeRoute(name) {
    const recordMatcher = matcher.getRecordMatcher(name);
    if (recordMatcher) {
      matcher.removeRoute(recordMatcher);
    }
  }
  function getRoutes() {
    return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
  }
  function hasRoute(name) {
    return !!matcher.getRecordMatcher(name);
  }
  function resolve2(rawLocation, currentLocation) {
    currentLocation = assign({}, currentLocation || currentRoute.value);
    if (typeof rawLocation === "string") {
      const locationNormalized = parseURL(parseQuery$12, rawLocation, currentLocation.path);
      const matchedRoute2 = matcher.resolve({ path: locationNormalized.path }, currentLocation);
      const href2 = routerHistory.createHref(locationNormalized.fullPath);
      return assign(locationNormalized, matchedRoute2, {
        params: decodeParams(matchedRoute2.params),
        hash: decode(locationNormalized.hash),
        redirectedFrom: void 0,
        href: href2
      });
    }
    let matcherLocation;
    if ("path" in rawLocation) {
      matcherLocation = assign({}, rawLocation, {
        path: parseURL(parseQuery$12, rawLocation.path, currentLocation.path).path
      });
    } else {
      const targetParams = assign({}, rawLocation.params);
      for (const key in targetParams) {
        if (targetParams[key] == null) {
          delete targetParams[key];
        }
      }
      matcherLocation = assign({}, rawLocation, {
        params: encodeParams(rawLocation.params)
      });
      currentLocation.params = encodeParams(currentLocation.params);
    }
    const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
    const hash = rawLocation.hash || "";
    matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
    const fullPath = stringifyURL(stringifyQuery$12, assign({}, rawLocation, {
      hash: encodeHash(hash),
      path: matchedRoute.path
    }));
    const href = routerHistory.createHref(fullPath);
    return assign({
      fullPath,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        stringifyQuery$12 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
      )
    }, matchedRoute, {
      redirectedFrom: void 0,
      href
    });
  }
  function locationAsObject(to) {
    return typeof to === "string" ? parseURL(parseQuery$12, to, currentRoute.value.path) : assign({}, to);
  }
  function checkCanceledNavigation(to, from) {
    if (pendingLocation !== to) {
      return createRouterError(8, {
        from,
        to
      });
    }
  }
  function push(to) {
    return pushWithRedirect(to);
  }
  function replace(to) {
    return push(assign(locationAsObject(to), { replace: true }));
  }
  function handleRedirectRecord(to) {
    const lastMatched = to.matched[to.matched.length - 1];
    if (lastMatched && lastMatched.redirect) {
      const { redirect } = lastMatched;
      let newTargetLocation = typeof redirect === "function" ? redirect(to) : redirect;
      if (typeof newTargetLocation === "string") {
        newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : (
          // force empty params
          { path: newTargetLocation }
        );
        newTargetLocation.params = {};
      }
      return assign({
        query: to.query,
        hash: to.hash,
        // avoid transferring params if the redirect has a path
        params: "path" in newTargetLocation ? {} : to.params
      }, newTargetLocation);
    }
  }
  function pushWithRedirect(to, redirectedFrom) {
    const targetLocation = pendingLocation = resolve2(to);
    const from = currentRoute.value;
    const data = to.state;
    const force = to.force;
    const replace2 = to.replace === true;
    const shouldRedirect = handleRedirectRecord(targetLocation);
    if (shouldRedirect)
      return pushWithRedirect(
        assign(locationAsObject(shouldRedirect), {
          state: typeof shouldRedirect === "object" ? assign({}, data, shouldRedirect.state) : data,
          force,
          replace: replace2
        }),
        // keep original redirectedFrom if it exists
        redirectedFrom || targetLocation
      );
    const toLocation = targetLocation;
    toLocation.redirectedFrom = redirectedFrom;
    let failure;
    if (!force && isSameRouteLocation(stringifyQuery$12, from, targetLocation)) {
      failure = createRouterError(16, { to: toLocation, from });
      handleScroll(
        from,
        from,
        // this is a push, the only way for it to be triggered from a
        // history.listen is with a redirect, which makes it become a push
        true,
        // This cannot be the first navigation because the initial location
        // cannot be manually navigated to
        false
      );
    }
    return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error2) => isNavigationFailure(error2) ? (
      // navigation redirects still mark the router as ready
      isNavigationFailure(
        error2,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? error2 : markAsReady(error2)
    ) : (
      // reject any unknown error
      triggerError(error2, toLocation, from)
    )).then((failure2) => {
      if (failure2) {
        if (isNavigationFailure(
          failure2,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        )) {
          return pushWithRedirect(
            // keep options
            assign({
              // preserve an existing replacement but allow the redirect to override it
              replace: replace2
            }, locationAsObject(failure2.to), {
              state: typeof failure2.to === "object" ? assign({}, data, failure2.to.state) : data,
              force
            }),
            // preserve the original redirectedFrom if any
            redirectedFrom || toLocation
          );
        }
      } else {
        failure2 = finalizeNavigation(toLocation, from, true, replace2, data);
      }
      triggerAfterEach(toLocation, from, failure2);
      return failure2;
    });
  }
  function checkCanceledNavigationAndReject(to, from) {
    const error2 = checkCanceledNavigation(to, from);
    return error2 ? Promise.reject(error2) : Promise.resolve();
  }
  function navigate(to, from) {
    let guards;
    const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
    guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
    for (const record of leavingRecords) {
      record.leaveGuards.forEach((guard) => {
        guards.push(guardToPromiseFn(guard, to, from));
      });
    }
    const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
    guards.push(canceledNavigationCheck);
    return runGuardQueue(guards).then(() => {
      guards = [];
      for (const guard of beforeGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
      for (const record of updatingRecords) {
        record.updateGuards.forEach((guard) => {
          guards.push(guardToPromiseFn(guard, to, from));
        });
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const record of to.matched) {
        if (record.beforeEnter && !from.matched.includes(record)) {
          if (isArray(record.beforeEnter)) {
            for (const beforeEnter of record.beforeEnter)
              guards.push(guardToPromiseFn(beforeEnter, to, from));
          } else {
            guards.push(guardToPromiseFn(record.beforeEnter, to, from));
          }
        }
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      to.matched.forEach((record) => record.enterCallbacks = {});
      guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from);
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const guard of beforeResolveGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).catch((err) => isNavigationFailure(
      err,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? err : Promise.reject(err));
  }
  function triggerAfterEach(to, from, failure) {
    for (const guard of afterGuards.list())
      guard(to, from, failure);
  }
  function finalizeNavigation(toLocation, from, isPush, replace2, data) {
    const error2 = checkCanceledNavigation(toLocation, from);
    if (error2)
      return error2;
    const isFirstNavigation = from === START_LOCATION_NORMALIZED;
    const state = !isBrowser$1 ? {} : history.state;
    if (isPush) {
      if (replace2 || isFirstNavigation)
        routerHistory.replace(toLocation.fullPath, assign({
          scroll: isFirstNavigation && state && state.scroll
        }, data));
      else
        routerHistory.push(toLocation.fullPath, data);
    }
    currentRoute.value = toLocation;
    handleScroll(toLocation, from, isPush, isFirstNavigation);
    markAsReady();
  }
  let removeHistoryListener;
  function setupListeners() {
    if (removeHistoryListener)
      return;
    removeHistoryListener = routerHistory.listen((to, _from, info) => {
      if (!router.listening)
        return;
      const toLocation = resolve2(to);
      const shouldRedirect = handleRedirectRecord(toLocation);
      if (shouldRedirect) {
        pushWithRedirect(assign(shouldRedirect, { replace: true }), toLocation).catch(noop);
        return;
      }
      pendingLocation = toLocation;
      const from = currentRoute.value;
      if (isBrowser$1) {
        saveScrollPosition(getScrollKey(from.fullPath, info.delta), computeScrollPosition());
      }
      navigate(toLocation, from).catch((error2) => {
        if (isNavigationFailure(
          error2,
          4 | 8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        )) {
          return error2;
        }
        if (isNavigationFailure(
          error2,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        )) {
          pushWithRedirect(
            error2.to,
            toLocation
            // avoid an uncaught rejection, let push call triggerError
          ).then((failure) => {
            if (isNavigationFailure(
              failure,
              4 | 16
              /* ErrorTypes.NAVIGATION_DUPLICATED */
            ) && !info.delta && info.type === NavigationType.pop) {
              routerHistory.go(-1, false);
            }
          }).catch(noop);
          return Promise.reject();
        }
        if (info.delta) {
          routerHistory.go(-info.delta, false);
        }
        return triggerError(error2, toLocation, from);
      }).then((failure) => {
        failure = failure || finalizeNavigation(
          // after navigation, all matched components are resolved
          toLocation,
          from,
          false
        );
        if (failure) {
          if (info.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
          // entry while a different route is displayed
          !isNavigationFailure(
            failure,
            8
            /* ErrorTypes.NAVIGATION_CANCELLED */
          )) {
            routerHistory.go(-info.delta, false);
          } else if (info.type === NavigationType.pop && isNavigationFailure(
            failure,
            4 | 16
            /* ErrorTypes.NAVIGATION_DUPLICATED */
          )) {
            routerHistory.go(-1, false);
          }
        }
        triggerAfterEach(toLocation, from, failure);
      }).catch(noop);
    });
  }
  let readyHandlers = useCallbacks();
  let errorHandlers = useCallbacks();
  let ready;
  function triggerError(error2, to, from) {
    markAsReady(error2);
    const list2 = errorHandlers.list();
    if (list2.length) {
      list2.forEach((handler) => handler(error2, to, from));
    } else {
      console.error(error2);
    }
    return Promise.reject(error2);
  }
  function isReady() {
    if (ready && currentRoute.value !== START_LOCATION_NORMALIZED)
      return Promise.resolve();
    return new Promise((resolve3, reject) => {
      readyHandlers.add([resolve3, reject]);
    });
  }
  function markAsReady(err) {
    if (!ready) {
      ready = !err;
      setupListeners();
      readyHandlers.list().forEach(([resolve3, reject]) => err ? reject(err) : resolve3());
      readyHandlers.reset();
    }
    return err;
  }
  function handleScroll(to, from, isPush, isFirstNavigation) {
    const { scrollBehavior } = options2;
    if (!isBrowser$1 || !scrollBehavior)
      return Promise.resolve();
    const scrollPosition = !isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0)) || (isFirstNavigation || !isPush) && history.state && history.state.scroll || null;
    return nextTick().then(() => scrollBehavior(to, from, scrollPosition)).then((position) => position && scrollToPosition(position)).catch((err) => triggerError(err, to, from));
  }
  const go = (delta) => routerHistory.go(delta);
  let started;
  const installedApps = /* @__PURE__ */ new Set();
  const router = {
    currentRoute,
    listening: true,
    addRoute,
    removeRoute,
    hasRoute,
    getRoutes,
    resolve: resolve2,
    options: options2,
    push,
    replace,
    go,
    back: () => go(-1),
    forward: () => go(1),
    beforeEach: beforeGuards.add,
    beforeResolve: beforeResolveGuards.add,
    afterEach: afterGuards.add,
    onError: errorHandlers.add,
    isReady,
    install(app) {
      const router2 = this;
      app.component("RouterLink", RouterLink);
      app.component("RouterView", RouterView);
      app.config.globalProperties.$router = router2;
      Object.defineProperty(app.config.globalProperties, "$route", {
        enumerable: true,
        get: () => unref(currentRoute)
      });
      if (isBrowser$1 && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !started && currentRoute.value === START_LOCATION_NORMALIZED) {
        started = true;
        push(routerHistory.location).catch((err) => {
        });
      }
      const reactiveRoute = {};
      for (const key in START_LOCATION_NORMALIZED) {
        reactiveRoute[key] = computed(() => currentRoute.value[key]);
      }
      app.provide(routerKey, router2);
      app.provide(routeLocationKey, reactive(reactiveRoute));
      app.provide(routerViewLocationKey, currentRoute);
      const unmountApp = app.unmount;
      installedApps.add(app);
      app.unmount = function() {
        installedApps.delete(app);
        if (installedApps.size < 1) {
          pendingLocation = START_LOCATION_NORMALIZED;
          removeHistoryListener && removeHistoryListener();
          removeHistoryListener = null;
          currentRoute.value = START_LOCATION_NORMALIZED;
          started = false;
          ready = false;
        }
        unmountApp();
      };
    }
  };
  return router;
}
function runGuardQueue(guards) {
  return guards.reduce((promise, guard) => promise.then(() => guard()), Promise.resolve());
}
function extractChangingRecords(to, from) {
  const leavingRecords = [];
  const updatingRecords = [];
  const enteringRecords = [];
  const len = Math.max(from.matched.length, to.matched.length);
  for (let i2 = 0; i2 < len; i2++) {
    const recordFrom = from.matched[i2];
    if (recordFrom) {
      if (to.matched.find((record) => isSameRouteRecord(record, recordFrom)))
        updatingRecords.push(recordFrom);
      else
        leavingRecords.push(recordFrom);
    }
    const recordTo = to.matched[i2];
    if (recordTo) {
      if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) {
        enteringRecords.push(recordTo);
      }
    }
  }
  return [leavingRecords, updatingRecords, enteringRecords];
}
function isObject$1(value) {
  return value !== null && typeof value === "object";
}
function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isObject$1(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isObject$1(value) && isObject$1(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p2, c2) => _defu(p2, c2, "", merger), {})
  );
}
const defu = createDefu();
class H3Error extends Error {
  constructor() {
    super(...arguments);
    this.statusCode = 500;
    this.fatal = false;
    this.unhandled = false;
    this.statusMessage = void 0;
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
H3Error.__h3_error__ = true;
function createError$1(input2) {
  if (typeof input2 === "string") {
    return new H3Error(input2);
  }
  if (isError(input2)) {
    return input2;
  }
  const err = new H3Error(
    input2.message ?? input2.statusMessage,
    // @ts-ignore
    input2.cause ? { cause: input2.cause } : void 0
  );
  if ("stack" in input2) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input2.stack;
        }
      });
    } catch {
      try {
        err.stack = input2.stack;
      } catch {
      }
    }
  }
  if (input2.data) {
    err.data = input2.data;
  }
  if (input2.statusCode) {
    err.statusCode = sanitizeStatusCode(input2.statusCode, err.statusCode);
  } else if (input2.status) {
    err.statusCode = sanitizeStatusCode(input2.status, err.statusCode);
  }
  if (input2.statusMessage) {
    err.statusMessage = input2.statusMessage;
  } else if (input2.statusText) {
    err.statusMessage = input2.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input2.fatal !== void 0) {
    err.fatal = input2.fatal;
  }
  if (input2.unhandled !== void 0) {
    err.unhandled = input2.unhandled;
  }
  return err;
}
function isError(input2) {
  var _a;
  return ((_a = input2 == null ? void 0 : input2.constructor) == null ? void 0 : _a.__h3_error__) === true;
}
const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}
typeof setImmediate !== "undefined" ? setImmediate : (fn) => fn();
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init2] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init2 !== void 0 && typeof init2 !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init2);
  }
  const key = "$s" + _key;
  const nuxt = useNuxtApp();
  const state = toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init2) {
    const initialValue2 = init2();
    if (isRef(initialValue2)) {
      nuxt.payload.state[key] = initialValue2;
      return initialValue2;
    }
    state.value = initialValue2;
  }
  return state;
}
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (getCurrentInstance()) {
    return inject("_route", useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
const defineNuxtRouteMiddleware = (middleware) => middleware;
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return true;
  }
  return false;
};
const navigateTo = (to, options2) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : to.path || "/";
  const isExternal = (options2 == null ? void 0 : options2.external) || hasProtocol(toPath, { acceptRelative: true });
  if (isExternal && !(options2 == null ? void 0 : options2.external)) {
    throw new Error("Navigating to external URL is not allowed by default. Use `navigateTo (url, { external: true })`.");
  }
  if (isExternal && parseURL$1(toPath).protocol === "script:") {
    throw new Error("Cannot navigate to an URL with script protocol.");
  }
  const inMiddleware = isProcessingMiddleware();
  if (!isExternal && inMiddleware) {
    return to;
  }
  const router = useRouter();
  if (isExternal) {
    if (options2 == null ? void 0 : options2.replace) {
      location.replace(toPath);
    } else {
      location.href = toPath;
    }
    return Promise.resolve();
  }
  return (options2 == null ? void 0 : options2.replace) ? router.replace(to) : router.push(to);
};
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = useNuxtApp();
    nuxtApp.callHook("app:error", err);
    const error2 = useError();
    error2.value = error2.value || err;
  } catch {
    throw err;
  }
  return err;
};
const clearError = async (options2 = {}) => {
  const nuxtApp = useNuxtApp();
  const error2 = useError();
  nuxtApp.callHook("app:error:cleared", options2);
  if (options2.redirect) {
    await useRouter().replace(options2.redirect);
  }
  error2.value = null;
};
const isNuxtError = (err) => !!(err && typeof err === "object" && "__nuxt_error" in err);
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};
const scriptRel = "modulepreload";
const assetsURL = function(dep, importerUrl) {
  return dep.startsWith(".") ? new URL(dep, importerUrl).href : dep;
};
const seen = {};
const ___vitePreload = function preload(baseModule, deps, importerUrl) {
  if (!deps || deps.length === 0) {
    return baseModule();
  }
  const links = document.getElementsByTagName("link");
  return Promise.all(deps.map((dep) => {
    dep = assetsURL(dep, importerUrl);
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    const isBaseRelative = !!importerUrl;
    if (isBaseRelative) {
      for (let i2 = links.length - 1; i2 >= 0; i2--) {
        const link2 = links[i2];
        if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
          return;
        }
      }
    } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
      return;
    }
    const link = document.createElement("link");
    link.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link.as = "script";
      link.crossOrigin = "";
    }
    link.href = dep;
    document.head.appendChild(link);
    if (isCss) {
      return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(new Error(`Unable to preload CSS for ${dep}`)));
      });
    }
  })).then(() => baseModule());
};
const __vitePreload = (...args) => ___vitePreload(...args).catch((err) => {
  const e2 = new Event("nuxt.preloadError");
  e2.payload = err;
  window.dispatchEvent(e2);
  throw err;
});
const _routes = [
  {
    name: "index",
    path: "/",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => __vitePreload(() => import("./index.806a23d8.js"), true ? [] : void 0, import.meta.url).then((m2) => m2.default || m2)
  }
];
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    let position = savedPosition || void 0;
    if (!position && from && to && to.meta.scrollToTop !== false && _isDifferentRoute(from, to)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
      }
    }
    const hasTransition = (route) => !!(route.meta.pageTransition ?? appPageTransition);
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve2) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await nextTick();
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
        }
        resolve2(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = document.querySelector(selector);
    if (elem) {
      return parseFloat(getComputedStyle(elem).scrollMarginTop);
    }
  } catch {
  }
  return 0;
}
function _isDifferentRoute(a2, b2) {
  const samePageComponent = a2.matched[0] === b2.matched[0];
  if (!samePageComponent) {
    return true;
  }
  if (samePageComponent && JSON.stringify(a2.params) !== JSON.stringify(b2.params)) {
    return true;
  }
  return false;
}
const configRouterOptions = {};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate$1 = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  var _a;
  let __temp, __restore;
  if (!((_a = to.meta) == null ? void 0 : _a.validate)) {
    return;
  }
  const nuxtApp = useNuxtApp();
  const router = useRouter();
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error2 = createError({
    statusCode: 404,
    statusMessage: `Page Not Found: ${to.fullPath}`
  });
  const unsub = router.beforeResolve((final) => {
    unsub();
    if (final === to) {
      const unsub2 = router.afterEach(async () => {
        unsub2();
        await callWithNuxt(nuxtApp, showError, [error2]);
        window.history.pushState({}, "", to.fullPath);
      });
      return false;
    }
  });
});
const globalMiddleware = [
  validate$1
];
const namedMiddleware = {};
function createCurrentLocation(base, location2) {
  const { pathname, search, hash } = location2;
  const hashPos = base.indexOf("#");
  if (hashPos > -1) {
    const slicePos = hash.includes(base.slice(hashPos)) ? base.slice(hashPos).length : 1;
    let pathFromHash = hash.slice(slicePos);
    if (pathFromHash[0] !== "/") {
      pathFromHash = "/" + pathFromHash;
    }
    return withoutBase(pathFromHash, "");
  }
  const path = withoutBase(pathname, base);
  return path + search + hash;
}
const router_jmwsqit4Rs = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a, _b;
    let __temp, __restore;
    let routerBase = useRuntimeConfig().app.baseURL;
    if (routerOptions.hashMode && !routerBase.includes("#")) {
      routerBase += "#";
    }
    const history2 = ((_a = routerOptions.history) == null ? void 0 : _a.call(routerOptions, routerBase)) ?? (routerOptions.hashMode ? createWebHashHistory(routerBase) : createWebHistory(routerBase));
    const routes = ((_b = routerOptions.routes) == null ? void 0 : _b.call(routerOptions, _routes)) ?? _routes;
    const initialURL = createCurrentLocation(routerBase, window.location);
    const router = createRouter({
      ...routerOptions,
      history: history2,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const _route = shallowRef(router.resolve(initialURL));
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      var _a2, _b2, _c, _d;
      if (((_b2 = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default) === ((_d = (_c = from.matched[0]) == null ? void 0 : _c.components) == null ? void 0 : _d.default)) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      route[key] = computed(() => _route.value[key]);
    }
    nuxtApp._route = reactive(route);
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    const error2 = useError();
    try {
      if (false)
        ;
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error22) {
      [__temp, __restore] = executeAsync(() => callWithNuxt(nuxtApp, showError, [error22])), await __temp, __restore();
    }
    const initialLayout = useState("_layout");
    router.beforeEach(async (to, from) => {
      var _a2;
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout.value && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout.value;
      }
      nuxtApp._processingMiddleware = true;
      const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
      for (const component of to.matched) {
        const componentMiddleware = component.meta.middleware;
        if (!componentMiddleware) {
          continue;
        }
        if (Array.isArray(componentMiddleware)) {
          for (const entry2 of componentMiddleware) {
            middlewareEntries.add(entry2);
          }
        } else {
          middlewareEntries.add(componentMiddleware);
        }
      }
      for (const entry2 of middlewareEntries) {
        const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_a2 = namedMiddleware[entry2]) == null ? void 0 : _a2.call(namedMiddleware).then((r2) => r2.default || r2)) : entry2;
        if (!middleware) {
          throw new Error(`Unknown route middleware: '${entry2}'.`);
        }
        const result = await callWithNuxt(nuxtApp, middleware, [to, from]);
        if (!nuxtApp.payload.serverRendered && nuxtApp.isHydrating) {
          if (result === false || result instanceof Error) {
            const error22 = result || createError$1({
              statusCode: 404,
              statusMessage: `Page Not Found: ${initialURL}`
            });
            await callWithNuxt(nuxtApp, showError, [error22]);
            return false;
          }
        }
        if (result || result === false) {
          return result;
        }
      }
    });
    router.onError(() => {
      delete nuxtApp._processingMiddleware;
    });
    router.afterEach(async (to, _from, failure) => {
      delete nuxtApp._processingMiddleware;
      if (!nuxtApp.isHydrating && error2.value) {
        await callWithNuxt(nuxtApp, clearError);
      }
      if (to.matched.length === 0) {
        await callWithNuxt(nuxtApp, showError, [createError$1({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`
        })]);
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        await router.replace({
          ...router.resolve(initialURL),
          name: void 0,
          // #4920, #$4982
          force: true
        });
      } catch (error22) {
        await callWithNuxt(nuxtApp, showError, [error22]);
      }
    });
    return { provide: { router } };
  }
}, 1);
const layouts = {};
const prefetch_client_5tzzN0oIVL = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:prefetch",
  setup(nuxtApp) {
    const router = useRouter();
    nuxtApp.hooks.hook("app:mounted", () => {
      router.beforeEach(async (to) => {
        var _a;
        const layout = (_a = to == null ? void 0 : to.meta) == null ? void 0 : _a.layout;
        if (layout && typeof layouts[layout] === "function") {
          await layouts[layout]();
        }
      });
    });
    nuxtApp.hooks.hook("link:prefetch", (url3) => {
      var _a, _b, _c, _d;
      if (hasProtocol(url3)) {
        return;
      }
      const route = router.resolve(url3);
      if (!route) {
        return;
      }
      const layout = (_a = route == null ? void 0 : route.meta) == null ? void 0 : _a.layout;
      let middleware = Array.isArray((_b = route == null ? void 0 : route.meta) == null ? void 0 : _b.middleware) ? (_c = route == null ? void 0 : route.meta) == null ? void 0 : _c.middleware : [(_d = route == null ? void 0 : route.meta) == null ? void 0 : _d.middleware];
      middleware = middleware.filter((m2) => typeof m2 === "string");
      for (const name of middleware) {
        if (typeof namedMiddleware[name] === "function") {
          namedMiddleware[name]();
        }
      }
      if (layout && typeof layouts[layout] === "function") {
        layouts[layout]();
      }
    });
  }
});
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
const UNDEFINED = -1;
const HOLE = -2;
const NAN = -3;
const POSITIVE_INFINITY = -4;
const NEGATIVE_INFINITY = -5;
const NEGATIVE_ZERO = -6;
function parse(serialized, revivers) {
  return unflatten(JSON.parse(serialized), revivers);
}
function unflatten(parsed, revivers) {
  if (typeof parsed === "number")
    return hydrate2(parsed, true);
  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error("Invalid input");
  }
  const values = (
    /** @type {any[]} */
    parsed
  );
  const hydrated = Array(values.length);
  function hydrate2(index2, standalone = false) {
    if (index2 === UNDEFINED)
      return void 0;
    if (index2 === NAN)
      return NaN;
    if (index2 === POSITIVE_INFINITY)
      return Infinity;
    if (index2 === NEGATIVE_INFINITY)
      return -Infinity;
    if (index2 === NEGATIVE_ZERO)
      return -0;
    if (standalone)
      throw new Error(`Invalid input`);
    if (index2 in hydrated)
      return hydrated[index2];
    const value = values[index2];
    if (!value || typeof value !== "object") {
      hydrated[index2] = value;
    } else if (Array.isArray(value)) {
      if (typeof value[0] === "string") {
        const type = value[0];
        const reviver = revivers == null ? void 0 : revivers[type];
        if (reviver) {
          return hydrated[index2] = reviver(hydrate2(value[1]));
        }
        switch (type) {
          case "Date":
            hydrated[index2] = new Date(value[1]);
            break;
          case "Set":
            const set2 = /* @__PURE__ */ new Set();
            hydrated[index2] = set2;
            for (let i2 = 1; i2 < value.length; i2 += 1) {
              set2.add(hydrate2(value[i2]));
            }
            break;
          case "Map":
            const map = /* @__PURE__ */ new Map();
            hydrated[index2] = map;
            for (let i2 = 1; i2 < value.length; i2 += 2) {
              map.set(hydrate2(value[i2]), hydrate2(value[i2 + 1]));
            }
            break;
          case "RegExp":
            hydrated[index2] = new RegExp(value[1], value[2]);
            break;
          case "Object":
            hydrated[index2] = Object(value[1]);
            break;
          case "BigInt":
            hydrated[index2] = BigInt(value[1]);
            break;
          case "null":
            const obj = /* @__PURE__ */ Object.create(null);
            hydrated[index2] = obj;
            for (let i2 = 1; i2 < value.length; i2 += 2) {
              obj[value[i2]] = hydrate2(value[i2 + 1]);
            }
            break;
          default:
            throw new Error(`Unknown type ${type}`);
        }
      } else {
        const array = new Array(value.length);
        hydrated[index2] = array;
        for (let i2 = 0; i2 < value.length; i2 += 1) {
          const n2 = value[i2];
          if (n2 === HOLE)
            continue;
          array[i2] = hydrate2(n2);
        }
      }
    } else {
      const object = {};
      hydrated[index2] = object;
      for (const key in value) {
        const n2 = value[key];
        object[key] = hydrate2(n2);
      }
    }
    return hydrated[index2];
  }
  return hydrate2(0);
}
function loadPayload(url3, opts = {}) {
  const payloadURL = _getPayloadURL(url3, opts);
  const nuxtApp = useNuxtApp();
  const cache = nuxtApp._payloadCache = nuxtApp._payloadCache || {};
  if (cache[payloadURL]) {
    return cache[payloadURL];
  }
  cache[payloadURL] = _importPayload(payloadURL).then((payload) => {
    if (!payload) {
      delete cache[payloadURL];
      return null;
    }
    return payload;
  });
  return cache[payloadURL];
}
const extension = "js";
function _getPayloadURL(url3, opts = {}) {
  const u2 = new URL(url3, "http://localhost");
  if (u2.search) {
    throw new Error("Payload URL cannot contain search params: " + url3);
  }
  if (u2.host !== "localhost" || hasProtocol(u2.pathname, { acceptRelative: true })) {
    throw new Error("Payload URL must not include hostname: " + url3);
  }
  const hash = opts.hash || (opts.fresh ? Date.now() : "");
  return joinURL(useRuntimeConfig().app.baseURL, u2.pathname, hash ? `_payload.${hash}.${extension}` : `_payload.${extension}`);
}
async function _importPayload(payloadURL) {
  try {
    return renderJsonPayloads ? parsePayload(await fetch(payloadURL).then((res) => res.text())) : await __vitePreload(() => import(
      /* webpackIgnore: true */
      /* @vite-ignore */
      payloadURL
    ), true ? [] : void 0, import.meta.url).then((r2) => r2.default || r2);
  } catch (err) {
    console.warn("[nuxt] Cannot load payload ", payloadURL, err);
  }
  return null;
}
function isPrerendered() {
  const nuxtApp = useNuxtApp();
  return !!nuxtApp.payload.prerenderedAt;
}
function parsePayload(payload) {
  return parse(payload, useNuxtApp()._payloadRevivers);
}
function reloadNuxtApp(options2 = {}) {
  const path = options2.path || window.location.pathname;
  let handledPath = {};
  try {
    handledPath = JSON.parse(sessionStorage.getItem("nuxt:reload") || "{}");
  } catch {
  }
  if (options2.force || (handledPath == null ? void 0 : handledPath.path) !== path || (handledPath == null ? void 0 : handledPath.expires) < Date.now()) {
    try {
      sessionStorage.setItem("nuxt:reload", JSON.stringify({ path, expires: Date.now() + (options2.ttl ?? 1e4) }));
    } catch {
    }
    if (options2.persistState) {
      try {
        sessionStorage.setItem("nuxt:reload:state", JSON.stringify({ state: useNuxtApp().payload.state }));
      } catch {
      }
    }
    if (window.location.pathname !== path) {
      window.location.href = path;
    } else {
      window.location.reload();
    }
  }
}
const explicitKeys = [
  "__key",
  "__init",
  "__shim",
  "__original",
  "__index",
  "__prevKey"
];
function token() {
  return Math.random().toString(36).substring(2, 15);
}
function dedupe(arr1, arr2) {
  const original = arr1 instanceof Set ? arr1 : new Set(arr1);
  if (arr2)
    arr2.forEach((item) => original.add(item));
  return [...original];
}
function has(obj, property) {
  return Object.prototype.hasOwnProperty.call(obj, property);
}
function eq(valA, valB, deep = true, explicit = ["__key"]) {
  if (valA === valB)
    return true;
  if (typeof valB === "object" && typeof valA === "object") {
    if (valA instanceof Map)
      return false;
    if (valA instanceof Set)
      return false;
    if (valA instanceof Date)
      return false;
    if (valA === null || valB === null)
      return false;
    if (Object.keys(valA).length !== Object.keys(valB).length)
      return false;
    for (const k2 of explicit) {
      if ((k2 in valA || k2 in valB) && valA[k2] !== valB[k2])
        return false;
    }
    for (const key in valA) {
      if (!(key in valB))
        return false;
      if (valA[key] !== valB[key] && !deep)
        return false;
      if (deep && !eq(valA[key], valB[key], deep, explicit))
        return false;
    }
    return true;
  }
  return false;
}
function empty(value) {
  const type = typeof value;
  if (type === "number")
    return false;
  if (value === void 0)
    return true;
  if (type === "string") {
    return value === "";
  }
  if (type === "object") {
    if (value === null)
      return true;
    for (const _i in value)
      return false;
    if (value instanceof RegExp)
      return false;
    if (value instanceof Date)
      return false;
    return true;
  }
  return false;
}
function escapeExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function regexForFormat(format) {
  const escaped = `^${escapeExp(format)}$`;
  const formats = {
    MM: "(0[1-9]|1[012])",
    M: "([1-9]|1[012])",
    DD: "([012][0-9]|3[01])",
    D: "([012]?[0-9]|3[01])",
    YYYY: "\\d{4}",
    YY: "\\d{2}"
  };
  const tokens = Object.keys(formats);
  return new RegExp(tokens.reduce((regex, format2) => {
    return regex.replace(format2, formats[format2]);
  }, escaped));
}
function isRecord(o2) {
  return Object.prototype.toString.call(o2) === "[object Object]";
}
function isObject(o2) {
  return isRecord(o2) || Array.isArray(o2);
}
function isPojo(o2) {
  if (isRecord(o2) === false)
    return false;
  if (o2.__FKNode__ || o2.__POJO__ === false)
    return false;
  const ctor = o2.constructor;
  if (ctor === void 0)
    return true;
  const prot = ctor.prototype;
  if (isRecord(prot) === false)
    return false;
  if (prot.hasOwnProperty("isPrototypeOf") === false) {
    return false;
  }
  return true;
}
function extend(original, additional, extendArrays = false, ignoreUndefined = false) {
  if (additional === null)
    return null;
  const merged = {};
  if (typeof additional === "string")
    return additional;
  for (const key in original) {
    if (has(additional, key) && (additional[key] !== void 0 || !ignoreUndefined)) {
      if (extendArrays && Array.isArray(original[key]) && Array.isArray(additional[key])) {
        merged[key] = original[key].concat(additional[key]);
        continue;
      }
      if (additional[key] === void 0) {
        continue;
      }
      if (isPojo(original[key]) && isPojo(additional[key])) {
        merged[key] = extend(original[key], additional[key], extendArrays, ignoreUndefined);
      } else {
        merged[key] = additional[key];
      }
    } else {
      merged[key] = original[key];
    }
  }
  for (const key in additional) {
    if (!has(merged, key) && additional[key] !== void 0) {
      merged[key] = additional[key];
    }
  }
  return merged;
}
function isQuotedString(str) {
  if (str[0] !== '"' && str[0] !== "'")
    return false;
  if (str[0] !== str[str.length - 1])
    return false;
  const quoteType = str[0];
  for (let p2 = 1; p2 < str.length; p2++) {
    if (str[p2] === quoteType && (p2 === 1 || str[p2 - 1] !== "\\") && p2 !== str.length - 1) {
      return false;
    }
  }
  return true;
}
function rmEscapes(str) {
  if (!str.length)
    return "";
  let clean = "";
  let lastChar = "";
  for (let p2 = 0; p2 < str.length; p2++) {
    const char = str.charAt(p2);
    if (char !== "\\" || lastChar === "\\") {
      clean += char;
    }
    lastChar = char;
  }
  return clean;
}
function nodeProps(...sets) {
  return sets.reduce((valid, props2) => {
    const { value, name, modelValue, config: config2, plugins: plugins2, ...validProps } = props2;
    return Object.assign(valid, validProps);
  }, {});
}
function parseArgs(str) {
  const args = [];
  let arg = "";
  let depth = 0;
  let quote = "";
  let lastChar = "";
  for (let p2 = 0; p2 < str.length; p2++) {
    const char = str.charAt(p2);
    if (char === quote && lastChar !== "\\") {
      quote = "";
    } else if ((char === "'" || char === '"') && !quote && lastChar !== "\\") {
      quote = char;
    } else if (char === "(" && !quote) {
      depth++;
    } else if (char === ")" && !quote) {
      depth--;
    }
    if (char === "," && !quote && depth === 0) {
      args.push(arg);
      arg = "";
    } else if (char !== " " || quote) {
      arg += char;
    }
    lastChar = char;
  }
  if (arg) {
    args.push(arg);
  }
  return args;
}
function except(obj, toRemove) {
  const clean = {};
  const exps = toRemove.filter((n2) => n2 instanceof RegExp);
  const keysToRemove = new Set(toRemove);
  for (const key in obj) {
    if (!keysToRemove.has(key) && !exps.some((exp) => exp.test(key))) {
      clean[key] = obj[key];
    }
  }
  return clean;
}
function only(obj, include) {
  const clean = {};
  const exps = include.filter((n2) => n2 instanceof RegExp);
  include.forEach((key) => {
    if (!(key instanceof RegExp)) {
      clean[key] = obj[key];
    }
  });
  Object.keys(obj).forEach((key) => {
    if (exps.some((exp) => exp.test(key))) {
      clean[key] = obj[key];
    }
  });
  return clean;
}
function camel(str) {
  return str.replace(/-([a-z0-9])/gi, (_s, g2) => g2.toUpperCase());
}
function kebab(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, (_s, trail, cap) => trail + "-" + cap.toLowerCase()).replace(" ", "-").toLowerCase();
}
function shallowClone(obj, explicit = explicitKeys) {
  if (obj !== null && typeof obj === "object") {
    let returnObject;
    if (Array.isArray(obj))
      returnObject = [...obj];
    else if (isPojo(obj))
      returnObject = { ...obj };
    if (returnObject) {
      applyExplicit(obj, returnObject, explicit);
      return returnObject;
    }
  }
  return obj;
}
function clone(obj, explicit = explicitKeys) {
  if (obj === null || obj instanceof RegExp || obj instanceof Date || obj instanceof Map || obj instanceof Set || typeof File === "function" && obj instanceof File)
    return obj;
  let returnObject;
  if (Array.isArray(obj)) {
    returnObject = obj.map((value) => {
      if (typeof value === "object")
        return clone(value, explicit);
      return value;
    });
  } else {
    returnObject = Object.keys(obj).reduce((newObj, key) => {
      newObj[key] = typeof obj[key] === "object" ? clone(obj[key], explicit) : obj[key];
      return newObj;
    }, {});
  }
  for (const key of explicit) {
    if (key in obj) {
      Object.defineProperty(returnObject, key, {
        enumerable: false,
        value: obj[key]
      });
    }
  }
  return returnObject;
}
function cloneAny(obj) {
  return typeof obj === "object" ? clone(obj) : obj;
}
function getAt(obj, addr) {
  if (!obj || typeof obj !== "object")
    return null;
  const segments = addr.split(".");
  let o2 = obj;
  for (const i2 in segments) {
    const segment = segments[i2];
    if (has(o2, segment)) {
      o2 = o2[segment];
    }
    if (+i2 === segments.length - 1)
      return o2;
    if (!o2 || typeof o2 !== "object")
      return null;
  }
  return null;
}
function undefine(value) {
  return value !== void 0 && value !== "false" && value !== false ? true : void 0;
}
function init(obj) {
  return !Object.isFrozen(obj) ? Object.defineProperty(obj, "__init", {
    enumerable: false,
    value: true
  }) : obj;
}
function slugify(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, " ").trim().replace(/\s+/g, "-");
}
function applyExplicit(original, obj, explicit) {
  for (const key of explicit) {
    if (key in original) {
      Object.defineProperty(obj, key, {
        enumerable: false,
        value: original[key]
      });
    }
  }
  return obj;
}
function createDispatcher$1() {
  const middleware = [];
  let currentIndex = 0;
  const use2 = (dispatchable) => middleware.push(dispatchable);
  const dispatch = (payload) => {
    const current = middleware[currentIndex];
    if (typeof current === "function") {
      return current(payload, (explicitPayload) => {
        currentIndex++;
        return dispatch(explicitPayload === void 0 ? payload : explicitPayload);
      });
    }
    currentIndex = 0;
    return payload;
  };
  use2.dispatch = dispatch;
  use2.unshift = (dispatchable) => middleware.unshift(dispatchable);
  use2.remove = (dispatchable) => {
    const index2 = middleware.indexOf(dispatchable);
    if (index2 > -1)
      middleware.splice(index2, 1);
  };
  return use2;
}
function createEmitter() {
  const listeners = /* @__PURE__ */ new Map();
  const receipts2 = /* @__PURE__ */ new Map();
  let buffer = void 0;
  const emitter = (node, event) => {
    if (buffer) {
      buffer.set(event.name, [node, event]);
      return;
    }
    if (listeners.has(event.name)) {
      listeners.get(event.name).forEach((wrapper2) => {
        if (event.origin === node || wrapper2.modifiers.includes("deep")) {
          wrapper2.listener(event);
        }
      });
    }
    if (event.bubble) {
      node.bubble(event);
    }
  };
  emitter.on = (eventName, listener) => {
    const [event, ...modifiers] = eventName.split(".");
    const receipt = listener.receipt || token();
    const wrapper2 = {
      modifiers,
      event,
      listener,
      receipt
    };
    listeners.has(event) ? listeners.get(event).push(wrapper2) : listeners.set(event, [wrapper2]);
    receipts2.has(receipt) ? receipts2.get(receipt).push(event) : receipts2.set(receipt, [event]);
    return receipt;
  };
  emitter.off = (receipt) => {
    var _a;
    if (receipts2.has(receipt)) {
      (_a = receipts2.get(receipt)) === null || _a === void 0 ? void 0 : _a.forEach((event) => {
        const eventListeners = listeners.get(event);
        if (Array.isArray(eventListeners)) {
          listeners.set(event, eventListeners.filter((wrapper2) => wrapper2.receipt !== receipt));
        }
      });
      receipts2.delete(receipt);
    }
  };
  emitter.pause = (node) => {
    if (!buffer)
      buffer = /* @__PURE__ */ new Map();
    if (node) {
      node.walk((child) => child._e.pause());
    }
  };
  emitter.play = (node) => {
    if (!buffer)
      return;
    const events = buffer;
    buffer = void 0;
    events.forEach(([node2, event]) => emitter(node2, event));
    if (node) {
      node.walk((child) => child._e.play());
    }
  };
  return emitter;
}
function emit$1(node, context, name, payload, bubble2 = true) {
  context._e(node, {
    payload,
    name,
    bubble: bubble2,
    origin: node
  });
  return node;
}
function bubble(node, _context, event) {
  if (isNode(node.parent)) {
    node.parent._e(node.parent, event);
  }
  return node;
}
function on(_node, context, name, listener) {
  return context._e.on(name, listener);
}
function off(node, context, receipt) {
  context._e.off(receipt);
  return node;
}
const errorHandler = createDispatcher$1();
errorHandler((error2, next) => {
  if (!error2.message)
    error2.message = String(`E${error2.code}`);
  return next(error2);
});
const warningHandler = createDispatcher$1();
warningHandler((warning, next) => {
  if (!warning.message)
    warning.message = String(`W${warning.code}`);
  const result = next(warning);
  if (console && typeof console.warn === "function")
    console.warn(result.message);
  return result;
});
function warn(code, data = {}) {
  warningHandler.dispatch({ code, data });
}
function error(code, data = {}) {
  throw Error(errorHandler.dispatch({ code, data }).message);
}
function createMessage(conf, node) {
  const m2 = {
    blocking: false,
    key: token(),
    meta: {},
    type: "state",
    visible: true,
    ...conf
  };
  if (node && m2.value && m2.meta.localize !== false) {
    m2.value = node.t(m2);
    m2.meta.locale = node.config.locale;
  }
  return m2;
}
const storeTraps = {
  apply: applyMessages,
  set: setMessage,
  remove: removeMessage$1,
  filter: filterMessages,
  reduce: reduceMessages,
  release: releaseBuffer,
  touch: touchMessages
};
function createStore(_buffer = false) {
  const messages2 = {};
  let node;
  let buffer = _buffer;
  let _b = [];
  const _m = /* @__PURE__ */ new Map();
  let _r = void 0;
  const store = new Proxy(messages2, {
    get(...args) {
      const [_target, property] = args;
      if (property === "buffer")
        return buffer;
      if (property === "_b")
        return _b;
      if (property === "_m")
        return _m;
      if (property === "_r")
        return _r;
      if (has(storeTraps, property)) {
        return storeTraps[property].bind(null, messages2, store, node);
      }
      return Reflect.get(...args);
    },
    set(_t, prop, value) {
      if (prop === "_n") {
        node = value;
        if (_r === "__n")
          releaseMissed(node, store);
        return true;
      } else if (prop === "_b") {
        _b = value;
        return true;
      } else if (prop === "buffer") {
        buffer = value;
        return true;
      } else if (prop === "_r") {
        _r = value;
        return true;
      }
      error(101, node);
      return false;
    }
  });
  return store;
}
function setMessage(messageStore, store, node, message2) {
  if (store.buffer) {
    store._b.push([[message2]]);
    return store;
  }
  if (messageStore[message2.key] !== message2) {
    if (typeof message2.value === "string" && message2.meta.localize !== false) {
      const previous = message2.value;
      message2.value = node.t(message2);
      if (message2.value !== previous) {
        message2.meta.locale = node.props.locale;
      }
    }
    const e2 = `message-${has(messageStore, message2.key) ? "updated" : "added"}`;
    messageStore[message2.key] = Object.freeze(node.hook.message.dispatch(message2));
    node.emit(e2, message2);
  }
  return store;
}
function touchMessages(messageStore, store) {
  for (const key in messageStore) {
    const message2 = { ...messageStore[key] };
    store.set(message2);
  }
}
function removeMessage$1(messageStore, store, node, key) {
  if (has(messageStore, key)) {
    const message2 = messageStore[key];
    delete messageStore[key];
    node.emit("message-removed", message2);
  }
  if (store.buffer === true) {
    store._b = store._b.filter((buffered) => {
      buffered[0] = buffered[0].filter((m2) => m2.key !== key);
      return buffered[1] || buffered[0].length;
    });
  }
  return store;
}
function filterMessages(messageStore, store, node, callback, type) {
  for (const key in messageStore) {
    const message2 = messageStore[key];
    if ((!type || message2.type === type) && !callback(message2)) {
      removeMessage$1(messageStore, store, node, key);
    }
  }
}
function reduceMessages(messageStore, _store, _node, reducer, accumulator) {
  for (const key in messageStore) {
    const message2 = messageStore[key];
    accumulator = reducer(accumulator, message2);
  }
  return accumulator;
}
function applyMessages(_messageStore, store, node, messages2, clear2) {
  if (Array.isArray(messages2)) {
    if (store.buffer) {
      store._b.push([messages2, clear2]);
      return;
    }
    const applied = new Set(messages2.map((message2) => {
      store.set(message2);
      return message2.key;
    }));
    if (typeof clear2 === "string") {
      store.filter((message2) => message2.type !== clear2 || applied.has(message2.key));
    } else if (typeof clear2 === "function") {
      store.filter((message2) => !clear2(message2) || applied.has(message2.key));
    }
  } else {
    for (const address in messages2) {
      const child = node.at(address);
      if (child) {
        child.store.apply(messages2[address], clear2);
      } else {
        missed(node, store, address, messages2[address], clear2);
      }
    }
  }
}
function createMessages(node, ...errors2) {
  const sourceKey = `${node.name}-set`;
  const make = (error2) => createMessage({
    key: slugify(error2),
    type: "error",
    value: error2,
    meta: { source: sourceKey, autoClear: true }
  });
  return errors2.filter((m2) => !!m2).map((errorSet) => {
    if (typeof errorSet === "string")
      errorSet = [errorSet];
    if (Array.isArray(errorSet)) {
      return errorSet.map((error2) => make(error2));
    } else {
      const errors3 = {};
      for (const key in errorSet) {
        if (Array.isArray(errorSet[key])) {
          errors3[key] = errorSet[key].map((error2) => make(error2));
        } else {
          errors3[key] = [make(errorSet[key])];
        }
      }
      return errors3;
    }
  });
}
function missed(node, store, address, messages2, clear2) {
  var _a;
  const misses = store._m;
  if (!misses.has(address))
    misses.set(address, []);
  if (!store._r)
    store._r = releaseMissed(node, store);
  (_a = misses.get(address)) === null || _a === void 0 ? void 0 : _a.push([messages2, clear2]);
}
function releaseMissed(node, store) {
  return node.on("child.deep", ({ payload: child }) => {
    store._m.forEach((misses, address) => {
      if (node.at(address) === child) {
        misses.forEach(([messages2, clear2]) => {
          child.store.apply(messages2, clear2);
        });
        store._m.delete(address);
      }
    });
    if (store._m.size === 0 && store._r) {
      node.off(store._r);
      store._r = void 0;
    }
  });
}
function releaseBuffer(_messageStore, store) {
  store.buffer = false;
  store._b.forEach(([messages2, clear2]) => store.apply(messages2, clear2));
  store._b = [];
}
function createLedger() {
  const ledger = {};
  let n2;
  return {
    count: (...args) => createCounter(n2, ledger, ...args),
    init(node) {
      n2 = node;
      node.on("message-added.deep", add(ledger, 1));
      node.on("message-removed.deep", add(ledger, -1));
    },
    merge: (child) => merge(n2, ledger, child),
    settled(counterName) {
      return has(ledger, counterName) ? ledger[counterName].promise : Promise.resolve();
    },
    unmerge: (child) => merge(n2, ledger, child, true),
    value(counterName) {
      return has(ledger, counterName) ? ledger[counterName].count : 0;
    }
  };
}
function createCounter(node, ledger, counterName, condition, increment = 0) {
  condition = parseCondition(condition || counterName);
  if (!has(ledger, counterName)) {
    const counter = {
      condition,
      count: 0,
      name: counterName,
      node,
      promise: Promise.resolve(),
      resolve: () => {
      }
      // eslint-disable-line @typescript-eslint/no-empty-function
    };
    ledger[counterName] = counter;
    increment = node.store.reduce((sum, m2) => sum + counter.condition(m2) * 1, increment);
    node.each((child) => {
      child.ledger.count(counter.name, counter.condition);
      increment += child.ledger.value(counter.name);
    });
  }
  return count(ledger[counterName], increment).promise;
}
function parseCondition(condition) {
  if (typeof condition === "function") {
    return condition;
  }
  return (m2) => m2.type === condition;
}
function count(counter, increment) {
  const initial = counter.count;
  const post = counter.count + increment;
  counter.count = post;
  if (initial === 0 && post !== 0) {
    counter.node.emit(`unsettled:${counter.name}`, counter.count, false);
    counter.promise = new Promise((r2) => counter.resolve = r2);
  } else if (initial !== 0 && post === 0) {
    counter.node.emit(`settled:${counter.name}`, counter.count, false);
    counter.resolve();
  }
  counter.node.emit(`count:${counter.name}`, counter.count, false);
  return counter;
}
function add(ledger, delta) {
  return (e2) => {
    for (const name in ledger) {
      const counter = ledger[name];
      if (counter.condition(e2.payload)) {
        count(counter, delta);
      }
    }
  };
}
function merge(parent, ledger, child, remove2 = false) {
  for (const key in ledger) {
    const condition = ledger[key].condition;
    if (!remove2)
      child.ledger.count(key, condition);
    const increment = child.ledger.value(key) * (remove2 ? -1 : 1);
    if (!parent)
      continue;
    do {
      parent.ledger.count(key, condition, increment);
      parent = parent.parent;
    } while (parent);
  }
}
const registry = /* @__PURE__ */ new Map();
const reflected = /* @__PURE__ */ new Map();
const emit = createEmitter();
const receipts = [];
function register(node) {
  if (node.props.id) {
    registry.set(node.props.id, node);
    reflected.set(node, node.props.id);
    emit(node, {
      payload: node,
      name: node.props.id,
      bubble: false,
      origin: node
    });
  }
}
function deregister(node) {
  if (reflected.has(node)) {
    const id = reflected.get(node);
    reflected.delete(node);
    registry.delete(id);
    emit(node, {
      payload: null,
      name: id,
      bubble: false,
      origin: node
    });
  }
}
function getNode$1(id) {
  return registry.get(id);
}
function watchRegistry(id, callback) {
  receipts.push(emit.on(id, callback));
}
function configChange(node, prop, value) {
  let usingFallback = true;
  !(prop in node.config._t) ? node.emit(`config:${prop}`, value, false) : usingFallback = false;
  if (!(prop in node.props)) {
    node.emit("prop", { prop, value });
    node.emit(`prop:${prop}`, value);
  }
  return usingFallback;
}
function createConfig$1(options2 = {}) {
  const nodes = /* @__PURE__ */ new Set();
  const target = {
    ...options2,
    ...{
      _add: (node) => nodes.add(node),
      _rm: (node) => nodes.delete(node)
    }
  };
  const rootConfig = new Proxy(target, {
    set(t2, prop, value, r2) {
      if (typeof prop === "string") {
        nodes.forEach((node) => configChange(node, prop, value));
      }
      return Reflect.set(t2, prop, value, r2);
    }
  });
  return rootConfig;
}
function submitForm(id) {
  const formElement = document.getElementById(id);
  if (formElement instanceof HTMLFormElement) {
    const event = new Event("submit", { cancelable: true, bubbles: true });
    formElement.dispatchEvent(event);
    return;
  }
  warn(151, id);
}
function clearState(node) {
  const clear2 = (n2) => {
    for (const key in n2.store) {
      const message2 = n2.store[key];
      if (message2.type === "error" || message2.type === "ui" && key === "incomplete") {
        n2.store.remove(key);
      } else if (message2.type === "state") {
        n2.store.set({ ...message2, value: false });
      }
    }
  };
  clear2(node);
  node.walk(clear2);
}
function reset(id, resetTo) {
  const node = typeof id === "string" ? getNode$1(id) : id;
  if (node) {
    const initial = (n2) => cloneAny(n2.props.initial) || (n2.type === "group" ? {} : n2.type === "list" ? [] : void 0);
    node._e.pause(node);
    node.input(cloneAny(resetTo) || initial(node), false);
    node.walk((child) => child.input(initial(child), false));
    const finalInit = initial(node);
    node.input(typeof finalInit === "object" ? cloneAny(resetTo) || init(finalInit) : finalInit, false);
    node._e.play(node);
    clearState(node);
    node.emit("reset", node);
    return node;
  }
  warn(152, id);
  return;
}
const defaultConfig$1 = {
  delimiter: ".",
  delay: 0,
  locale: "en",
  rootClasses: (key) => ({ [`formkit-${kebab(key)}`]: true })
};
const useIndex = Symbol("index");
const valueRemoved = Symbol("removed");
const valueMoved = Symbol("moved");
const valueInserted = Symbol("inserted");
function isList(arg) {
  return arg.type === "list" && Array.isArray(arg._value);
}
function isNode(node) {
  return node && typeof node === "object" && node.__FKNode__ === true;
}
const invalidSetter = (node, _context, property) => {
  error(102, [node, property]);
};
const traps = {
  _c: trap(getContext, invalidSetter, false),
  add: trap(addChild),
  addProps: trap(addProps),
  address: trap(getAddress, invalidSetter, false),
  at: trap(getNode),
  bubble: trap(bubble),
  clearErrors: trap(clearErrors$1),
  calm: trap(calm),
  config: trap(false),
  define: trap(define),
  disturb: trap(disturb),
  destroy: trap(destroy),
  hydrate: trap(hydrate),
  index: trap(getIndex, setIndex, false),
  input: trap(input),
  each: trap(eachChild),
  emit: trap(emit$1),
  find: trap(find),
  on: trap(on),
  off: trap(off),
  parent: trap(false, setParent),
  plugins: trap(false),
  remove: trap(removeChild),
  root: trap(getRoot, invalidSetter, false),
  reset: trap(resetValue),
  resetConfig: trap(resetConfig),
  setErrors: trap(setErrors$1),
  submit: trap(submit),
  t: trap(text$1),
  use: trap(use),
  name: trap(getName, false, false),
  walk: trap(walkTree)
};
function createTraps() {
  return new Map(Object.entries(traps));
}
function trap(getter, setter, curryGetter = true) {
  return {
    get: getter ? (node, context) => curryGetter ? (...args) => getter(node, context, ...args) : getter(node, context) : false,
    set: setter !== void 0 ? setter : invalidSetter.bind(null)
  };
}
function createHooks() {
  const hooks = /* @__PURE__ */ new Map();
  return new Proxy(hooks, {
    get(_2, property) {
      if (!hooks.has(property)) {
        hooks.set(property, createDispatcher$1());
      }
      return hooks.get(property);
    }
  });
}
let nameCount = 0;
let idCount = 0;
function resetCount() {
  nameCount = 0;
  idCount = 0;
}
function createName(options2) {
  var _a, _b;
  if (((_a = options2.parent) === null || _a === void 0 ? void 0 : _a.type) === "list")
    return useIndex;
  return options2.name || `${((_b = options2.props) === null || _b === void 0 ? void 0 : _b.type) || "input"}_${++nameCount}`;
}
function createValue(options2) {
  if (options2.type === "group") {
    return init(options2.value && typeof options2.value === "object" && !Array.isArray(options2.value) ? options2.value : {});
  } else if (options2.type === "list") {
    return init(Array.isArray(options2.value) ? options2.value : []);
  }
  return options2.value;
}
function input(node, context, value, async = true) {
  context._value = validateInput(node, node.hook.input.dispatch(value));
  node.emit("input", context._value);
  if (context.isSettled)
    node.disturb();
  if (async) {
    if (context._tmo)
      clearTimeout(context._tmo);
    context._tmo = setTimeout(commit, node.props.delay, node, context);
  } else {
    commit(node, context);
  }
  return context.settled;
}
function validateInput(node, value) {
  switch (node.type) {
    case "input":
      break;
    case "group":
      if (!value || typeof value !== "object")
        error(107, [node, value]);
      break;
    case "list":
      if (!Array.isArray(value))
        error(108, [node, value]);
      break;
  }
  return value;
}
function commit(node, context, calm2 = true, hydrate2 = true) {
  context._value = context.value = node.hook.commit.dispatch(context._value);
  if (node.type !== "input" && hydrate2)
    node.hydrate();
  node.emit("commit", context.value);
  if (calm2)
    node.calm();
}
function partial(context, { name, value, from }) {
  if (Object.isFrozen(context._value))
    return;
  if (isList(context)) {
    const insert = value === valueRemoved ? [] : value === valueMoved && typeof from === "number" ? context._value.splice(from, 1) : [value];
    context._value.splice(name, value === valueMoved || from === valueInserted ? 0 : 1, ...insert);
    return;
  }
  if (value !== valueRemoved) {
    context._value[name] = value;
  } else {
    delete context._value[name];
  }
}
function hydrate(node, context) {
  const _value = context._value;
  context.children.forEach((child) => {
    if (typeof _value !== "object")
      return;
    if (child.name in _value) {
      const childValue = child.type !== "input" || _value[child.name] && typeof _value[child.name] === "object" ? init(_value[child.name]) : _value[child.name];
      child.input(childValue, false);
    } else {
      if (node.type !== "list" || typeof child.name === "number") {
        partial(context, { name: child.name, value: child.value });
      }
      if (!_value.__init) {
        if (child.type === "group")
          child.input({}, false);
        else if (child.type === "list")
          child.input([], false);
        else
          child.input(void 0, false);
      }
    }
  });
  return node;
}
function disturb(node, context) {
  var _a;
  if (context._d <= 0) {
    context.isSettled = false;
    node.emit("settled", false, false);
    context.settled = new Promise((resolve2) => {
      context._resolve = resolve2;
    });
    if (node.parent)
      (_a = node.parent) === null || _a === void 0 ? void 0 : _a.disturb();
  }
  context._d++;
  return node;
}
function calm(node, context, value) {
  var _a;
  if (value !== void 0 && node.type !== "input") {
    partial(context, value);
    return commit(node, context, true, false);
  }
  if (context._d > 0)
    context._d--;
  if (context._d === 0) {
    context.isSettled = true;
    node.emit("settled", true, false);
    if (node.parent)
      (_a = node.parent) === null || _a === void 0 ? void 0 : _a.calm({ name: node.name, value: context.value });
    if (context._resolve)
      context._resolve(context.value);
  }
}
function destroy(node, context) {
  node.emit("destroying", node);
  node.store.filter(() => false);
  if (node.parent) {
    node.parent.emit("childRemoved", node);
    node.parent.remove(node);
  }
  deregister(node);
  context._value = context.value = void 0;
  node.emit("destroyed", node);
}
function define(node, context, definition) {
  context.type = definition.type;
  context.props.definition = clone(definition);
  context.value = context._value = createValue({
    type: node.type,
    value: context.value
  });
  if (definition.forceTypeProp) {
    if (node.props.type)
      node.props.originalType = node.props.type;
    context.props.type = definition.forceTypeProp;
  }
  if (definition.family) {
    context.props.family = definition.family;
  }
  if (definition.features) {
    definition.features.forEach((feature) => feature(node));
  }
  if (definition.props) {
    node.addProps(definition.props);
  }
  node.emit("defined", definition);
}
function addProps(node, context, props2) {
  var _a;
  if (node.props.attrs) {
    const attrs = { ...node.props.attrs };
    node.props._emit = false;
    for (const attr in attrs) {
      const camelName = camel(attr);
      if (props2.includes(camelName)) {
        node.props[camelName] = attrs[attr];
        delete attrs[attr];
      }
    }
    const initial = cloneAny(context._value);
    node.props.initial = node.type !== "input" ? init(initial) : initial;
    node.props._emit = true;
    node.props.attrs = attrs;
    if (node.props.definition) {
      node.props.definition.props = [
        ...((_a = node.props.definition) === null || _a === void 0 ? void 0 : _a.props) || [],
        ...props2
      ];
    }
  }
  node.emit("added-props", props2);
  return node;
}
function addChild(parent, parentContext, child, listIndex) {
  if (parent.type === "input")
    error(100, parent);
  if (child.parent && child.parent !== parent) {
    child.parent.remove(child);
  }
  if (!parentContext.children.includes(child)) {
    if (listIndex !== void 0 && parent.type === "list") {
      parentContext.children.splice(listIndex, 0, child);
      if (Array.isArray(parent.value) && parent.value.length < parentContext.children.length) {
        parent.disturb().calm({
          name: listIndex,
          value: child.value,
          from: valueInserted
        });
      }
    } else {
      parentContext.children.push(child);
    }
    if (!child.isSettled)
      parent.disturb();
  }
  if (child.parent !== parent) {
    child.parent = parent;
    if (child.parent !== parent) {
      parent.remove(child);
      child.parent.add(child);
      return parent;
    }
  } else {
    child.use(parent.plugins);
  }
  commit(parent, parentContext, false);
  parent.ledger.merge(child);
  parent.emit("child", child);
  return parent;
}
function setParent(child, context, _property, parent) {
  if (isNode(parent)) {
    if (child.parent && child.parent !== parent) {
      child.parent.remove(child);
    }
    context.parent = parent;
    child.resetConfig();
    !parent.children.includes(child) ? parent.add(child) : child.use(parent.plugins);
    return true;
  }
  if (parent === null) {
    context.parent = null;
    return true;
  }
  return false;
}
function removeChild(node, context, child) {
  const childIndex = context.children.indexOf(child);
  if (childIndex !== -1) {
    if (child.isSettled)
      node.disturb();
    context.children.splice(childIndex, 1);
    let preserve = undefine(child.props.preserve);
    let parent = child.parent;
    while (preserve === void 0 && parent) {
      preserve = undefine(parent.props.preserve);
      parent = parent.parent;
    }
    if (!preserve) {
      node.calm({
        name: node.type === "list" ? childIndex : child.name,
        value: valueRemoved
      });
    } else {
      node.calm();
    }
    child.parent = null;
    child.config._rmn = child;
  }
  node.ledger.unmerge(child);
  return node;
}
function eachChild(_node, context, callback) {
  context.children.forEach((child) => callback(child));
}
function walkTree(_node, context, callback, stopIfFalse = false) {
  context.children.forEach((child) => {
    if (callback(child) !== false || !stopIfFalse) {
      child.walk(callback, stopIfFalse);
    }
  });
}
function resetConfig(node, context) {
  const parent = node.parent || void 0;
  context.config = createConfig(node.config._t, parent);
  node.walk((n2) => n2.resetConfig());
}
function use(node, context, plugin2, run2 = true, library = true) {
  if (Array.isArray(plugin2) || plugin2 instanceof Set) {
    plugin2.forEach((p2) => use(node, context, p2));
    return node;
  }
  if (!context.plugins.has(plugin2)) {
    if (library && typeof plugin2.library === "function")
      plugin2.library(node);
    if (run2 && plugin2(node) !== false) {
      context.plugins.add(plugin2);
      node.children.forEach((child) => child.use(plugin2));
    }
  }
  return node;
}
function setIndex(node, _context, _property, setIndex2) {
  if (isNode(node.parent)) {
    const children = node.parent.children;
    const index2 = setIndex2 >= children.length ? children.length - 1 : setIndex2 < 0 ? 0 : setIndex2;
    const oldIndex = children.indexOf(node);
    if (oldIndex === -1)
      return false;
    children.splice(oldIndex, 1);
    children.splice(index2, 0, node);
    node.parent.children = children;
    if (node.parent.type === "list")
      node.parent.disturb().calm({ name: index2, value: valueMoved, from: oldIndex });
    return true;
  }
  return false;
}
function getIndex(node) {
  if (node.parent) {
    const index2 = [...node.parent.children].indexOf(node);
    return index2 === -1 ? node.parent.children.length : index2;
  }
  return -1;
}
function getContext(_node, context) {
  return context;
}
function getName(node, context) {
  var _a;
  if (((_a = node.parent) === null || _a === void 0 ? void 0 : _a.type) === "list")
    return node.index;
  return context.name !== useIndex ? context.name : node.index;
}
function getAddress(node, context) {
  return context.parent ? context.parent.address.concat([node.name]) : [node.name];
}
function getNode(node, _context, locator) {
  const address = typeof locator === "string" ? locator.split(node.config.delimiter) : locator;
  if (!address.length)
    return void 0;
  const first = address[0];
  let pointer = node.parent;
  if (!pointer) {
    if (String(address[0]) === String(node.name))
      address.shift();
    pointer = node;
  }
  if (first === "$parent")
    address.shift();
  while (pointer && address.length) {
    const name = address.shift();
    switch (name) {
      case "$root":
        pointer = node.root;
        break;
      case "$parent":
        pointer = pointer.parent;
        break;
      case "$self":
        pointer = node;
        break;
      default:
        pointer = pointer.children.find((c2) => String(c2.name) === String(name)) || select$2(pointer, name);
    }
  }
  return pointer || void 0;
}
function select$2(node, selector) {
  const matches3 = String(selector).match(/^(find)\((.*)\)$/);
  if (matches3) {
    const [, action, argStr] = matches3;
    const args = argStr.split(",").map((arg) => arg.trim());
    switch (action) {
      case "find":
        return node.find(args[0], args[1]);
      default:
        return void 0;
    }
  }
  return void 0;
}
function find(node, _context, searchTerm, searcher) {
  return bfs(node, searchTerm, searcher);
}
function bfs(tree, searchValue, searchGoal = "name") {
  const search = typeof searchGoal === "string" ? (n2) => n2[searchGoal] == searchValue : searchGoal;
  const stack = [tree];
  while (stack.length) {
    const node = stack.shift();
    if (search(node, searchValue))
      return node;
    stack.push(...node.children);
  }
  return void 0;
}
function getRoot(n2) {
  let node = n2;
  while (node.parent) {
    node = node.parent;
  }
  return node;
}
function createConfig(target = {}, parent) {
  let node = void 0;
  return new Proxy(target, {
    get(...args) {
      const prop = args[1];
      if (prop === "_t")
        return target;
      const localValue = Reflect.get(...args);
      if (localValue !== void 0)
        return localValue;
      if (parent) {
        const parentVal = parent.config[prop];
        if (parentVal !== void 0)
          return parentVal;
      }
      if (target.rootConfig && typeof prop === "string") {
        const rootValue = target.rootConfig[prop];
        if (rootValue !== void 0)
          return rootValue;
      }
      if (prop === "delay" && (node === null || node === void 0 ? void 0 : node.type) === "input")
        return 20;
      return defaultConfig$1[prop];
    },
    set(...args) {
      const prop = args[1];
      const value = args[2];
      if (prop === "_n") {
        node = value;
        if (target.rootConfig)
          target.rootConfig._add(node);
        return true;
      }
      if (prop === "_rmn") {
        if (target.rootConfig)
          target.rootConfig._rm(node);
        node = void 0;
        return true;
      }
      if (!eq(target[prop], value, false)) {
        const didSet = Reflect.set(...args);
        if (node) {
          node.emit(`config:${prop}`, value, false);
          configChange(node, prop, value);
          node.walk((n2) => configChange(n2, prop, value), true);
        }
        return didSet;
      }
      return true;
    }
  });
}
function text$1(node, _context, key, type = "ui") {
  const fragment2 = typeof key === "string" ? { key, value: key, type } : key;
  const value = node.hook.text.dispatch(fragment2);
  node.emit("text", value, false);
  return value.value;
}
function submit(node) {
  const name = node.name;
  do {
    if (node.props.isForm === true)
      break;
    if (!node.parent)
      error(106, name);
    node = node.parent;
  } while (node);
  if (node.props.id) {
    submitForm(node.props.id);
  }
}
function resetValue(node, _context, value) {
  return reset(node, value);
}
function setErrors$1(node, _context, localErrors, childErrors) {
  const sourceKey = `${node.name}-set`;
  const errors2 = node.hook.setErrors.dispatch({ localErrors, childErrors });
  createMessages(node, errors2.localErrors, errors2.childErrors).forEach((errors3) => {
    node.store.apply(errors3, (message2) => message2.meta.source === sourceKey);
  });
  return node;
}
function clearErrors$1(node, context, clearChildErrors = true, sourceKey) {
  setErrors$1(node, context, []);
  if (clearChildErrors) {
    sourceKey = sourceKey || `${node.name}-set`;
    node.walk((child) => {
      child.store.filter((message2) => {
        return !(message2.type === "error" && message2.meta && message2.meta.source === sourceKey);
      });
    });
  }
  return node;
}
function defaultProps(node) {
  if (!has(node.props, "id"))
    node.props.id = `input_${idCount++}`;
  return node;
}
function createProps(initial) {
  const props2 = {
    initial: typeof initial === "object" ? cloneAny(initial) : initial
  };
  let node;
  let isEmitting = true;
  return new Proxy(props2, {
    get(...args) {
      const [_t, prop] = args;
      if (has(props2, prop))
        return Reflect.get(...args);
      if (node && typeof prop === "string" && node.config[prop] !== void 0)
        return node.config[prop];
      return void 0;
    },
    set(target, property, originalValue, receiver) {
      if (property === "_n") {
        node = originalValue;
        return true;
      }
      if (property === "_emit") {
        isEmitting = originalValue;
        return true;
      }
      const { prop, value } = node.hook.prop.dispatch({
        prop: property,
        value: originalValue
      });
      if (!eq(props2[prop], value, false) || typeof value === "object") {
        const didSet = Reflect.set(target, prop, value, receiver);
        if (isEmitting) {
          node.emit("prop", { prop, value });
          if (typeof prop === "string")
            node.emit(`prop:${prop}`, value);
        }
        return didSet;
      }
      return true;
    }
  });
}
function findDefinition(node, plugins2) {
  if (node.props.definition)
    return node.define(node.props.definition);
  for (const plugin2 of plugins2) {
    if (node.props.definition)
      return;
    if (typeof plugin2.library === "function") {
      plugin2.library(node);
    }
  }
}
function createContext(options2) {
  const value = createValue(options2);
  const config2 = createConfig(options2.config || {}, options2.parent);
  return {
    _d: 0,
    _e: createEmitter(),
    _resolve: false,
    _tmo: false,
    _value: value,
    children: dedupe(options2.children || []),
    config: config2,
    hook: createHooks(),
    isCreated: false,
    isSettled: true,
    ledger: createLedger(),
    name: createName(options2),
    parent: options2.parent || null,
    plugins: /* @__PURE__ */ new Set(),
    props: createProps(value),
    settled: Promise.resolve(value),
    store: createStore(true),
    traps: createTraps(),
    type: options2.type || "input",
    value
  };
}
function nodeInit(node, options2) {
  var _a;
  node.ledger.init(node.store._n = node.props._n = node.config._n = node);
  node.props._emit = false;
  if (options2.props)
    Object.assign(node.props, options2.props);
  node.props._emit = true;
  findDefinition(node, /* @__PURE__ */ new Set([
    ...options2.plugins || [],
    ...node.parent ? node.parent.plugins : []
  ]));
  if (options2.plugins) {
    for (const plugin2 of options2.plugins) {
      use(node, node._c, plugin2, true, false);
    }
  }
  defaultProps(node);
  node.each((child) => node.add(child));
  if (node.parent)
    node.parent.add(node, options2.index);
  if (node.type === "input" && node.children.length)
    error(100, node);
  input(node, node._c, node._value, false);
  node.store.release();
  if ((_a = options2.props) === null || _a === void 0 ? void 0 : _a.id)
    register(node);
  node.emit("created", node);
  node.isCreated = true;
  return node;
}
function createNode(options2) {
  const ops = options2 || {};
  const context = createContext(ops);
  const node = new Proxy(context, {
    get(...args) {
      const [, property] = args;
      if (property === "__FKNode__")
        return true;
      const trap2 = context.traps.get(property);
      if (trap2 && trap2.get)
        return trap2.get(node, context);
      return Reflect.get(...args);
    },
    set(...args) {
      const [, property, value] = args;
      const trap2 = context.traps.get(property);
      if (trap2 && trap2.set)
        return trap2.set(node, context, property, value);
      return Reflect.set(...args);
    }
  });
  return nodeInit(node, ops);
}
function isDOM(node) {
  return typeof node !== "string" && has(node, "$el");
}
function isComponent$1(node) {
  return typeof node !== "string" && has(node, "$cmp");
}
function isConditional(node) {
  if (!node || typeof node === "string")
    return false;
  return has(node, "if") && has(node, "then");
}
function isSugar(node) {
  return typeof node !== "string" && "$formkit" in node;
}
function sugar(node) {
  if (typeof node === "string") {
    return {
      $el: "text",
      children: node
    };
  }
  if (isSugar(node)) {
    const { $formkit: type, for: iterator, if: condition, children, bind, ...props2 } = node;
    return Object.assign({
      $cmp: "FormKit",
      props: { ...props2, type }
    }, condition ? { if: condition } : {}, iterator ? { for: iterator } : {}, children ? { children } : {}, bind ? { bind } : {});
  }
  return node;
}
function compile(expr) {
  let provideTokens;
  const requirements = /* @__PURE__ */ new Set();
  const x2 = function expand(operand, tokens) {
    return typeof operand === "function" ? operand(tokens) : operand;
  };
  const operatorRegistry = [
    {
      "&&": (l2, r2, t2) => x2(l2, t2) && x2(r2, t2),
      "||": (l2, r2, t2) => x2(l2, t2) || x2(r2, t2)
    },
    {
      "===": (l2, r2, t2) => !!(x2(l2, t2) === x2(r2, t2)),
      "!==": (l2, r2, t2) => !!(x2(l2, t2) !== x2(r2, t2)),
      "==": (l2, r2, t2) => !!(x2(l2, t2) == x2(r2, t2)),
      "!=": (l2, r2, t2) => !!(x2(l2, t2) != x2(r2, t2)),
      ">=": (l2, r2, t2) => !!(x2(l2, t2) >= x2(r2, t2)),
      "<=": (l2, r2, t2) => !!(x2(l2, t2) <= x2(r2, t2)),
      ">": (l2, r2, t2) => !!(x2(l2, t2) > x2(r2, t2)),
      "<": (l2, r2, t2) => !!(x2(l2, t2) < x2(r2, t2))
    },
    {
      "+": (l2, r2, t2) => x2(l2, t2) + x2(r2, t2),
      "-": (l2, r2, t2) => x2(l2, t2) - x2(r2, t2)
    },
    {
      "*": (l2, r2, t2) => x2(l2, t2) * x2(r2, t2),
      "/": (l2, r2, t2) => x2(l2, t2) / x2(r2, t2),
      "%": (l2, r2, t2) => x2(l2, t2) % x2(r2, t2)
    }
  ];
  const operatorSymbols = operatorRegistry.reduce((s3, g2) => {
    return s3.concat(Object.keys(g2));
  }, []);
  const operatorChars = new Set(operatorSymbols.map((key) => key.charAt(0)));
  function getOp(symbols, char, p2, expression) {
    const candidates = symbols.filter((s3) => s3.startsWith(char));
    if (!candidates.length)
      return false;
    return candidates.find((symbol) => {
      if (expression.length >= p2 + symbol.length) {
        const nextChars = expression.substring(p2, p2 + symbol.length);
        if (nextChars === symbol)
          return symbol;
      }
      return false;
    });
  }
  function getStep(p2, expression, direction = 1) {
    let next = direction ? expression.substring(p2 + 1).trim() : expression.substring(0, p2).trim();
    if (!next.length)
      return -1;
    if (!direction) {
      const reversed = next.split("").reverse();
      const start = reversed.findIndex((char2) => operatorChars.has(char2));
      next = reversed.slice(start).join("");
    }
    const char = next[0];
    return operatorRegistry.findIndex((operators) => {
      const symbols = Object.keys(operators);
      return !!getOp(symbols, char, 0, next);
    });
  }
  function getTail(pos, expression) {
    let tail = "";
    const length3 = expression.length;
    let depth = 0;
    for (let p2 = pos; p2 < length3; p2++) {
      const char = expression.charAt(p2);
      if (char === "(") {
        depth++;
      } else if (char === ")") {
        depth--;
      } else if (depth === 0 && char === " ") {
        continue;
      }
      if (depth === 0 && getOp(operatorSymbols, char, p2, expression)) {
        return [tail, p2 - 1];
      } else {
        tail += char;
      }
    }
    return [tail, expression.length - 1];
  }
  function parseLogicals(expression, step = 0) {
    const operators = operatorRegistry[step];
    const length3 = expression.length;
    const symbols = Object.keys(operators);
    let depth = 0;
    let quote = false;
    let op = null;
    let operand = "";
    let left = null;
    let operation;
    let lastChar = "";
    let char = "";
    let parenthetical = "";
    let parenQuote = "";
    let startP = 0;
    const addTo = (depth2, char2) => {
      depth2 ? parenthetical += char2 : operand += char2;
    };
    for (let p2 = 0; p2 < length3; p2++) {
      lastChar = char;
      char = expression.charAt(p2);
      if ((char === "'" || char === '"') && lastChar !== "\\" && (depth === 0 && !quote || depth && !parenQuote)) {
        if (depth) {
          parenQuote = char;
        } else {
          quote = char;
        }
        addTo(depth, char);
        continue;
      } else if (quote && (char !== quote || lastChar === "\\") || parenQuote && (char !== parenQuote || lastChar === "\\")) {
        addTo(depth, char);
        continue;
      } else if (quote === char) {
        quote = false;
        addTo(depth, char);
        continue;
      } else if (parenQuote === char) {
        parenQuote = false;
        addTo(depth, char);
        continue;
      } else if (char === " ") {
        continue;
      } else if (char === "(") {
        if (depth === 0) {
          startP = p2;
        } else {
          parenthetical += char;
        }
        depth++;
      } else if (char === ")") {
        depth--;
        if (depth === 0) {
          const fn = typeof operand === "string" && operand.startsWith("$") ? operand : void 0;
          const hasTail = fn && expression.charAt(p2 + 1) === ".";
          let tail = "";
          if (hasTail) {
            [tail, p2] = getTail(p2 + 2, expression);
          }
          const lStep = op ? step : getStep(startP, expression, 0);
          const rStep = getStep(p2, expression);
          if (lStep === -1 && rStep === -1) {
            operand = evaluate(parenthetical, -1, fn, tail);
          } else if (op && (lStep >= rStep || rStep === -1) && step === lStep) {
            left = op.bind(null, evaluate(parenthetical, -1, fn, tail));
            op = null;
            operand = "";
          } else if (rStep > lStep && step === rStep) {
            operand = evaluate(parenthetical, -1, fn, tail);
          } else {
            operand += `(${parenthetical})${hasTail ? `.${tail}` : ""}`;
          }
          parenthetical = "";
        } else {
          parenthetical += char;
        }
      } else if (depth === 0 && (operation = getOp(symbols, char, p2, expression))) {
        if (p2 === 0) {
          error(103, [operation, expression]);
        }
        p2 += operation.length - 1;
        if (p2 === expression.length - 1) {
          error(104, [operation, expression]);
        }
        if (!op) {
          if (left) {
            op = operators[operation].bind(null, evaluate(left, step));
            left = null;
          } else {
            op = operators[operation].bind(null, evaluate(operand, step));
            operand = "";
          }
        } else if (operand) {
          left = op.bind(null, evaluate(operand, step));
          op = operators[operation].bind(null, left);
          operand = "";
        }
        continue;
      } else {
        addTo(depth, char);
      }
    }
    if (operand && op) {
      op = op.bind(null, evaluate(operand, step));
    }
    op = !op && left ? left : op;
    if (!op && operand) {
      op = (v2, t2) => {
        return typeof v2 === "function" ? v2(t2) : v2;
      };
      op = op.bind(null, evaluate(operand, step));
    }
    if (!op && !operand) {
      error(105, expression);
    }
    return op;
  }
  function evaluate(operand, step, fnToken, tail) {
    if (fnToken) {
      const fn = evaluate(fnToken, operatorRegistry.length);
      let userFuncReturn;
      let tailCall = tail ? compile(`$${tail}`) : false;
      if (typeof fn === "function") {
        const args = parseArgs(String(operand)).map((arg) => evaluate(arg, -1));
        return (tokens) => {
          const userFunc = fn(tokens);
          if (typeof userFunc !== "function") {
            warn(150, fnToken);
            return userFunc;
          }
          userFuncReturn = userFunc(...args.map((arg) => typeof arg === "function" ? arg(tokens) : arg));
          if (tailCall) {
            tailCall = tailCall.provide((subTokens) => {
              const rootTokens = provideTokens(subTokens);
              const t2 = subTokens.reduce((tokenSet, token2) => {
                const isTail = token2 === tail || (tail === null || tail === void 0 ? void 0 : tail.startsWith(`${token2}(`));
                if (isTail) {
                  const value = getAt(userFuncReturn, token2);
                  tokenSet[token2] = () => value;
                } else {
                  tokenSet[token2] = rootTokens[token2];
                }
                return tokenSet;
              }, {});
              return t2;
            });
          }
          return tailCall ? tailCall() : userFuncReturn;
        };
      }
    } else if (typeof operand === "string") {
      if (operand === "true")
        return true;
      if (operand === "false")
        return false;
      if (operand === "undefined")
        return void 0;
      if (isQuotedString(operand))
        return rmEscapes(operand.substring(1, operand.length - 1));
      if (!isNaN(+operand))
        return Number(operand);
      if (step < operatorRegistry.length - 1) {
        return parseLogicals(operand, step + 1);
      } else {
        if (operand.startsWith("$")) {
          const cleaned = operand.substring(1);
          requirements.add(cleaned);
          return function getToken(tokens) {
            return cleaned in tokens ? tokens[cleaned]() : void 0;
          };
        }
        return operand;
      }
    }
    return operand;
  }
  const compiled = parseLogicals(expr.startsWith("$:") ? expr.substring(2) : expr);
  const reqs = Array.from(requirements);
  function provide2(callback) {
    provideTokens = callback;
    return Object.assign(compiled.bind(null, callback(reqs)), {
      provide: provide2
    });
  }
  return Object.assign(compiled, {
    provide: provide2
  });
}
function createClasses(propertyKey, node, sectionClassList) {
  if (!sectionClassList)
    return {};
  if (typeof sectionClassList === "string") {
    const classKeys = sectionClassList.split(" ");
    return classKeys.reduce((obj, key) => Object.assign(obj, { [key]: true }), {});
  } else if (typeof sectionClassList === "function") {
    return createClasses(propertyKey, node, sectionClassList(node, propertyKey));
  }
  return sectionClassList;
}
function generateClassList(node, property, ...args) {
  const combinedClassList = args.reduce((finalClassList, currentClassList) => {
    if (!currentClassList)
      return handleNegativeClasses(finalClassList);
    const { $reset, ...classList } = currentClassList;
    if ($reset) {
      return handleNegativeClasses(classList);
    }
    return handleNegativeClasses(Object.assign(finalClassList, classList));
  }, {});
  return Object.keys(node.hook.classes.dispatch({ property, classes: combinedClassList }).classes).filter((key) => combinedClassList[key]).join(" ") || null;
}
function handleNegativeClasses(classList) {
  const removalToken = "$remove:";
  let hasNegativeClassValue = false;
  const applicableClasses = Object.keys(classList).filter((className) => {
    if (classList[className] && className.startsWith(removalToken)) {
      hasNegativeClassValue = true;
    }
    return classList[className];
  });
  if (applicableClasses.length > 1 && hasNegativeClassValue) {
    const negativeClasses = applicableClasses.filter((className) => className.startsWith(removalToken));
    negativeClasses.map((negativeClass) => {
      const targetClass = negativeClass.substring(removalToken.length);
      classList[targetClass] = false;
      classList[negativeClass] = false;
    });
  }
  return classList;
}
function setErrors(id, localErrors, childErrors) {
  const node = getNode$1(id);
  if (node) {
    node.setErrors(localErrors, childErrors);
  } else {
    warn(651, id);
  }
}
function clearErrors(id, clearChildren = true) {
  const node = getNode$1(id);
  if (node) {
    node.clearErrors(clearChildren);
  } else {
    warn(652, id);
  }
}
const FORMKIT_VERSION = "0.16.4";
function createLibraryPlugin(...libraries) {
  const library = libraries.reduce((merged, lib) => extend(merged, lib), {});
  const plugin2 = () => {
  };
  plugin2.library = function(node) {
    const type = camel(node.props.type);
    if (has(library, type)) {
      node.define(library[type]);
    }
  };
  return plugin2;
}
function normalizeOptions(options2) {
  let i2 = 1;
  if (Array.isArray(options2)) {
    return options2.map((option2) => {
      if (typeof option2 === "string" || typeof option2 === "number") {
        return {
          label: String(option2),
          value: String(option2)
        };
      }
      if (typeof option2 == "object") {
        if ("value" in option2 && typeof option2.value !== "string") {
          Object.assign(option2, {
            value: `__mask_${i2++}`,
            __original: option2.value
          });
        }
      }
      return option2;
    });
  }
  return Object.keys(options2).map((value) => {
    return {
      label: options2[value],
      value
    };
  });
}
function optionValue(options2, value) {
  if (Array.isArray(options2)) {
    for (const option2 of options2) {
      if (value == option2.value) {
        return "__original" in option2 ? option2.__original : option2.value;
      }
    }
  }
  return value;
}
function shouldSelect(valueA, valueB) {
  if (valueA === null && valueB === void 0 || valueA === void 0 && valueB === null)
    return false;
  if (valueA == valueB)
    return true;
  if (isPojo(valueA) && isPojo(valueB))
    return eq(valueA, valueB);
  return false;
}
function options(node) {
  node.hook.prop((prop, next) => {
    if (prop.prop === "options") {
      if (typeof prop.value === "function") {
        node.props.optionsLoader = prop.value;
        prop.value = [];
      } else {
        prop.value = normalizeOptions(prop.value);
      }
    }
    return next(prop);
  });
}
const outer = createSection("outer", () => ({
  $el: "div",
  attrs: {
    key: "$id",
    "data-family": "$family || undefined",
    "data-type": "$type",
    "data-multiple": '$attrs.multiple || ($type != "select" && $options != undefined) || undefined',
    "data-disabled": "$disabled || undefined",
    "data-complete": "$state.complete || undefined",
    "data-invalid": "$state.valid === false && $state.validationVisible || undefined",
    "data-errors": "$state.errors || undefined",
    "data-submitted": "$state.submitted || undefined",
    "data-prefix-icon": "$_rawPrefixIcon !== undefined || undefined",
    "data-suffix-icon": "$_rawSuffixIcon !== undefined || undefined",
    "data-prefix-icon-click": "$onPrefixIconClick !== undefined || undefined",
    "data-suffix-icon-click": "$onSuffixIconClick !== undefined || undefined"
  }
}), true);
const inner = createSection("inner", "div");
const wrapper = createSection("wrapper", "div");
const label = createSection("label", () => ({
  $el: "label",
  if: "$label",
  attrs: {
    for: "$id"
  }
}));
const messages$1 = createSection("messages", () => ({
  $el: "ul",
  if: "$defaultMessagePlacement && $fns.length($messages)"
}));
const message$1 = createSection("message", () => ({
  $el: "li",
  for: ["message", "$messages"],
  attrs: {
    key: "$message.key",
    id: `$id + '-' + $message.key`,
    "data-message-type": "$message.type"
  }
}));
const prefix = createSection("prefix", null);
const suffix = createSection("suffix", null);
const help = createSection("help", () => ({
  $el: "div",
  if: "$help",
  attrs: {
    id: '$: "help-" + $id'
  }
}));
const fieldset = createSection("fieldset", () => ({
  $el: "fieldset",
  attrs: {
    id: "$id",
    "aria-describedby": {
      if: "$help",
      then: '$: "help-" + $id',
      else: void 0
    }
  }
}));
const decorator = createSection("decorator", () => ({
  $el: "span",
  attrs: {
    "aria-hidden": "true"
  }
}));
const box = createSection("input", () => ({
  $el: "input",
  bind: "$attrs",
  attrs: {
    type: "$type",
    name: "$node.props.altName || $node.name",
    disabled: "$option.attrs.disabled || $disabled",
    onInput: "$handlers.toggleChecked",
    checked: "$fns.eq($_value, $onValue)",
    onBlur: "$handlers.blur",
    value: "$: true",
    id: "$id",
    "aria-describedby": {
      if: "$options.length",
      then: {
        if: "$option.help",
        then: '$: "help-" + $option.attrs.id',
        else: void 0
      },
      else: {
        if: "$help",
        then: '$: "help-" + $id',
        else: void 0
      }
    }
  }
}));
const legend = createSection("legend", () => ({
  $el: "legend",
  if: "$label"
}));
const boxOption = createSection("option", () => ({
  $el: "li",
  for: ["option", "$options"],
  attrs: {
    "data-disabled": "$option.attrs.disabled || $disabled"
  }
}));
const boxOptions = createSection("options", "ul");
const boxWrapper = createSection("wrapper", () => ({
  $el: "label",
  attrs: {
    "data-disabled": {
      if: "$options.length",
      then: void 0,
      else: "$disabled || undefined"
    },
    "data-checked": {
      if: "$options == undefined",
      then: "$fns.eq($_value, $onValue) || undefined",
      else: "$fns.isChecked($option.value) || undefined"
    }
  }
}));
const boxHelp = createSection("optionHelp", () => ({
  $el: "div",
  if: "$option.help",
  attrs: {
    id: '$: "help-" + $option.attrs.id'
  }
}));
const boxLabel = createSection("label", "span");
const buttonInput = createSection("input", () => ({
  $el: "button",
  bind: "$attrs",
  attrs: {
    type: "$type",
    disabled: "$disabled",
    name: "$node.name",
    id: "$id"
  }
}));
const buttonLabel = createSection("default", null);
const fileInput = createSection("input", () => ({
  $el: "input",
  bind: "$attrs",
  attrs: {
    type: "file",
    disabled: "$disabled",
    name: "$node.name",
    onChange: "$handlers.files",
    onBlur: "$handlers.blur",
    id: "$id",
    "aria-describedby": "$describedBy"
  }
}));
const fileItem = createSection("fileItem", () => ({
  $el: "li",
  for: ["file", "$value"]
}));
const fileList = createSection("fileList", () => ({
  $el: "ul",
  if: "$value.length",
  attrs: {
    "data-has-multiple": {
      if: "$value.length > 1",
      then: "true"
    }
  }
}));
const fileName = createSection("fileName", () => ({
  $el: "span",
  attrs: {
    class: "$classes.fileName"
  }
}));
const fileRemove = createSection("fileRemove", () => ({
  $el: "button",
  attrs: {
    onClick: "$handlers.resetFiles"
  }
}));
const noFiles = createSection("noFiles", () => ({
  $el: "span",
  if: "$value.length == 0"
}));
const formInput = createSection("form", () => ({
  $el: "form",
  bind: "$attrs",
  attrs: {
    id: "$id",
    name: "$node.name",
    onSubmit: "$handlers.submit",
    "data-loading": "$state.loading || undefined"
  }
}), true);
const actions = createSection("actions", () => ({
  $el: "div",
  if: "$actions"
}));
const submitInput = createSection("submit", () => ({
  $cmp: "FormKit",
  bind: "$submitAttrs",
  props: {
    type: "submit",
    disabled: "$disabled",
    label: "$submitLabel"
  }
}));
const textInput = createSection("input", () => ({
  $el: "input",
  bind: "$attrs",
  attrs: {
    type: "$type",
    disabled: "$disabled",
    name: "$node.name",
    onInput: "$handlers.DOMInput",
    onBlur: "$handlers.blur",
    value: "$_value",
    id: "$id",
    "aria-describedby": "$describedBy"
  }
}));
const fragment = createSection("wrapper", null, true);
const selectInput$1 = createSection("input", () => ({
  $el: "select",
  bind: "$attrs",
  attrs: {
    id: "$id",
    "data-placeholder": "$fns.showPlaceholder($_value, $placeholder)",
    disabled: "$disabled",
    class: "$classes.input",
    name: "$node.name",
    onChange: "$handlers.onChange",
    onInput: "$handlers.selectInput",
    onBlur: "$handlers.blur",
    "aria-describedby": "$describedBy"
  }
}));
const option = createSection("option", () => ({
  $el: "option",
  for: ["option", "$options"],
  bind: "$option.attrs",
  attrs: {
    class: "$classes.option",
    value: "$option.value",
    selected: "$fns.isSelected($option)"
  }
}));
const optionSlot = () => ({
  $el: null,
  if: "$options.length",
  for: ["option", "$options"],
  children: "$slots.option"
});
const textareaInput = createSection("input", () => ({
  $el: "textarea",
  bind: "$attrs",
  attrs: {
    disabled: "$disabled",
    name: "$node.name",
    onInput: "$handlers.DOMInput",
    onBlur: "$handlers.blur",
    value: "$_value",
    id: "$id",
    "aria-describedby": "$describedBy"
  },
  children: "$initialValue"
}));
const icon = (sectionKey, el) => {
  return createSection(`${sectionKey}Icon`, () => {
    const rawIconProp = `_raw${sectionKey.charAt(0).toUpperCase()}${sectionKey.slice(1)}Icon`;
    return {
      if: `$${sectionKey}Icon && $${rawIconProp}`,
      $el: `${el ? el : "span"}`,
      attrs: {
        class: `$classes.${sectionKey}Icon + " formkit-icon"`,
        innerHTML: `$${rawIconProp}`,
        onClick: `$handlers.iconClick(${sectionKey})`,
        for: {
          if: `${el === "label"}`,
          then: "$id"
        }
      }
    };
  })();
};
function normalizeBoxes(node) {
  return function(prop, next) {
    if (prop.prop === "options" && Array.isArray(prop.value)) {
      prop.value = prop.value.map((option2) => {
        var _a;
        if (!((_a = option2.attrs) === null || _a === void 0 ? void 0 : _a.id)) {
          return extend(option2, {
            attrs: {
              id: `${node.name}-option-${slugify(String(option2.value))}`
            }
          });
        }
        return option2;
      });
      if (node.props.type === "checkbox" && !Array.isArray(node.value)) {
        if (node.isCreated) {
          node.input([], false);
        } else {
          node.on("created", () => {
            if (!Array.isArray(node.value)) {
              node.input([], false);
            }
          });
        }
      }
    }
    return next(prop);
  };
}
function toggleChecked$1(node, e2) {
  const el = e2.target;
  if (el instanceof HTMLInputElement) {
    const value = Array.isArray(node.props.options) ? optionValue(node.props.options, el.value) : el.value;
    if (Array.isArray(node.props.options) && node.props.options.length) {
      if (!Array.isArray(node._value)) {
        node.input([value]);
      } else if (!node._value.some((existingValue) => shouldSelect(value, existingValue))) {
        node.input([...node._value, value]);
      } else {
        node.input(node._value.filter((existingValue) => !shouldSelect(value, existingValue)));
      }
    } else {
      if (el.checked) {
        node.input(node.props.onValue);
      } else {
        node.input(node.props.offValue);
      }
    }
  }
}
function isChecked$1(node, value) {
  var _a, _b;
  (_a = node.context) === null || _a === void 0 ? void 0 : _a.value;
  (_b = node.context) === null || _b === void 0 ? void 0 : _b._value;
  if (Array.isArray(node._value)) {
    return node._value.some((existingValue) => shouldSelect(optionValue(node.props.options, value), existingValue));
  }
  return false;
}
function checkboxes(node) {
  node.on("created", () => {
    var _a, _b;
    if ((_a = node.context) === null || _a === void 0 ? void 0 : _a.handlers) {
      node.context.handlers.toggleChecked = toggleChecked$1.bind(null, node);
    }
    if ((_b = node.context) === null || _b === void 0 ? void 0 : _b.fns) {
      node.context.fns.isChecked = isChecked$1.bind(null, node);
    }
    if (!has(node.props, "onValue"))
      node.props.onValue = true;
    if (!has(node.props, "offValue"))
      node.props.offValue = false;
  });
  node.hook.prop(normalizeBoxes(node));
}
function disables(node) {
  node.on("created", () => {
    node.props.disabled = undefine(node.props.disabled);
  });
  node.hook.prop(({ prop, value }, next) => {
    value = prop === "disabled" ? undefine(value) : value;
    return next({ prop, value });
  });
  node.on("prop:disabled", ({ payload: value }) => {
    node.config.disabled = undefine(value);
  });
  node.on("created", () => {
    node.config.disabled = undefine(node.props.disabled);
  });
}
function localize(key, value) {
  return (node) => {
    node.store.set(createMessage({
      key,
      type: "ui",
      value: value || key,
      meta: {
        localize: true,
        i18nArgs: [node]
      }
    }));
  };
}
const isBrowser = typeof window !== "undefined";
function removeHover(e2) {
  if (e2.target instanceof HTMLElement && e2.target.hasAttribute("data-file-hover")) {
    e2.target.removeAttribute("data-file-hover");
  }
}
function preventStrayDrop(type, e2) {
  if (!(e2.target instanceof HTMLInputElement)) {
    e2.preventDefault();
  } else if (type === "dragover") {
    e2.target.setAttribute("data-file-hover", "true");
  }
  if (type === "drop") {
    removeHover(e2);
  }
}
function files(node) {
  localize("noFiles", "Select file")(node);
  localize("removeAll", "Remove all")(node);
  localize("remove")(node);
  if (isBrowser) {
    if (!window._FormKit_File_Drop) {
      window.addEventListener("dragover", preventStrayDrop.bind(null, "dragover"));
      window.addEventListener("drop", preventStrayDrop.bind(null, "drop"));
      window.addEventListener("dragleave", removeHover);
      window._FormKit_File_Drop = true;
    }
  }
  node.hook.input((value, next) => next(Array.isArray(value) ? value : []));
  node.on("created", () => {
    if (!Array.isArray(node.value))
      node.input([], false);
    if (!node.context)
      return;
    node.context.handlers.resetFiles = (e2) => {
      e2.preventDefault();
      node.input([]);
      if (node.props.id && isBrowser) {
        const el = document.getElementById(node.props.id);
        if (el)
          el.value = "";
      }
    };
    node.context.handlers.files = (e2) => {
      var _a, _b;
      const files2 = [];
      if (e2.target instanceof HTMLInputElement && e2.target.files) {
        for (let i2 = 0; i2 < e2.target.files.length; i2++) {
          let file2;
          if (file2 = e2.target.files.item(i2)) {
            files2.push({ name: file2.name, file: file2 });
          }
        }
        node.input(files2);
      }
      if (node.context)
        node.context.files = files2;
      if (typeof ((_a = node.props.attrs) === null || _a === void 0 ? void 0 : _a.onChange) === "function") {
        (_b = node.props.attrs) === null || _b === void 0 ? void 0 : _b.onChange(e2);
      }
    };
  });
}
async function handleSubmit(node, submitEvent) {
  submitEvent.preventDefault();
  await node.settled;
  const setSubmitted = (n2) => n2.store.set(createMessage({
    key: "submitted",
    value: true,
    visible: false
  }));
  node.walk(setSubmitted);
  setSubmitted(node);
  if (typeof node.props.onSubmitRaw === "function") {
    node.props.onSubmitRaw(submitEvent, node);
  }
  if (node.ledger.value("blocking")) {
    if (typeof node.props.onSubmitInvalid === "function") {
      node.props.onSubmitInvalid(node);
    }
    if (node.props.incompleteMessage !== false) {
      node.store.set(createMessage({
        blocking: false,
        key: `incomplete`,
        meta: {
          localize: node.props.incompleteMessage === void 0,
          i18nArgs: [{ node }],
          showAsMessage: true
        },
        type: "ui",
        value: node.props.incompleteMessage || "Form incomplete."
      }));
    }
  } else {
    if (typeof node.props.onSubmit === "function") {
      const retVal = node.props.onSubmit(node.hook.submit.dispatch(clone(node.value)), node);
      if (retVal instanceof Promise) {
        const autoDisable = node.props.disabled === void 0 && node.props.submitBehavior !== "live";
        if (autoDisable)
          node.props.disabled = true;
        node.store.set(createMessage({
          key: "loading",
          value: true,
          visible: false
        }));
        await retVal;
        if (autoDisable)
          node.props.disabled = false;
        node.store.remove("loading");
      }
    } else {
      if (submitEvent.target instanceof HTMLFormElement) {
        submitEvent.target.submit();
      }
    }
  }
}
function form$1(node) {
  node.props.isForm = true;
  node.on("created", () => {
    var _a;
    if ((_a = node.context) === null || _a === void 0 ? void 0 : _a.handlers) {
      node.context.handlers.submit = handleSubmit.bind(null, node);
    }
    if (!has(node.props, "actions")) {
      node.props.actions = true;
    }
  });
  node.on("settled:blocking", () => node.store.remove("incomplete"));
}
function ignore(node) {
  if (node.props.ignore === void 0) {
    node.props.ignore = true;
    node.parent = null;
  }
}
function initialValue(node) {
  node.on("created", () => {
    if (node.context) {
      node.context.initialValue = node.value || "";
    }
  });
}
function toggleChecked(node, event) {
  if (event.target instanceof HTMLInputElement) {
    node.input(optionValue(node.props.options, event.target.value));
  }
}
function isChecked(node, value) {
  var _a, _b;
  (_a = node.context) === null || _a === void 0 ? void 0 : _a.value;
  (_b = node.context) === null || _b === void 0 ? void 0 : _b._value;
  return shouldSelect(optionValue(node.props.options, value), node._value);
}
function radios(node) {
  node.on("created", () => {
    var _a, _b;
    if (!Array.isArray(node.props.options)) {
      warn(350, node);
    }
    if ((_a = node.context) === null || _a === void 0 ? void 0 : _a.handlers) {
      node.context.handlers.toggleChecked = toggleChecked.bind(null, node);
    }
    if ((_b = node.context) === null || _b === void 0 ? void 0 : _b.fns) {
      node.context.fns.isChecked = isChecked.bind(null, node);
    }
  });
  node.hook.prop(normalizeBoxes(node));
}
function isSelected(node, option2) {
  node.context && node.context.value;
  const optionValue2 = "__original" in option2 ? option2.__original : option2.value;
  function hasNoNullOption() {
    return !node.props.options.some((option3) => ("__original" in option3 ? option3.__original : option3.value) === null);
  }
  return Array.isArray(node._value) ? node._value.some((optionA) => shouldSelect(optionA, optionValue2)) : (node._value === void 0 || node._value === null && hasNoNullOption()) && option2.attrs && option2.attrs["data-is-placeholder"] ? true : shouldSelect(optionValue2, node._value);
}
async function deferChange(node, e2) {
  var _a;
  if (typeof ((_a = node.props.attrs) === null || _a === void 0 ? void 0 : _a.onChange) === "function") {
    await new Promise((r2) => setTimeout(r2, 0));
    await node.settled;
    node.props.attrs.onChange(e2);
  }
}
function selectInput(node, e2) {
  const target = e2.target;
  const value = target.hasAttribute("multiple") ? Array.from(target.selectedOptions).map((o2) => optionValue(node.props.options, o2.value)) : optionValue(node.props.options, target.value);
  node.input(value);
}
function applyPlaceholder(options2, placeholder) {
  if (!options2.some((option2) => option2.attrs && option2.attrs["data-is-placeholder"])) {
    return [
      {
        label: placeholder,
        value: "",
        attrs: {
          hidden: true,
          disabled: true,
          "data-is-placeholder": "true"
        }
      },
      ...options2
    ];
  }
  return options2;
}
function select$1(node) {
  node.on("created", () => {
    var _a, _b, _c;
    const isMultiple = undefine((_a = node.props.attrs) === null || _a === void 0 ? void 0 : _a.multiple);
    if (!isMultiple && node.props.placeholder && Array.isArray(node.props.options)) {
      node.hook.prop(({ prop, value }, next) => {
        if (prop === "options") {
          value = applyPlaceholder(value, node.props.placeholder);
        }
        return next({ prop, value });
      });
      node.props.options = applyPlaceholder(node.props.options, node.props.placeholder);
    }
    if (isMultiple) {
      if (node.value === void 0) {
        node.input([], false);
      }
    } else if (node.context && !node.context.options) {
      node.props.attrs = Object.assign({}, node.props.attrs, {
        value: node._value
      });
      node.on("input", ({ payload }) => {
        node.props.attrs = Object.assign({}, node.props.attrs, {
          value: payload
        });
      });
    }
    if ((_b = node.context) === null || _b === void 0 ? void 0 : _b.handlers) {
      node.context.handlers.selectInput = selectInput.bind(null, node);
      node.context.handlers.onChange = deferChange.bind(null, node);
    }
    if ((_c = node.context) === null || _c === void 0 ? void 0 : _c.fns) {
      node.context.fns.isSelected = isSelected.bind(null, node);
      node.context.fns.showPlaceholder = (value, placeholder) => {
        if (!Array.isArray(node.props.options))
          return false;
        const hasMatchingValue = node.props.options.some((option2) => {
          if (option2.attrs && "data-is-placeholder" in option2.attrs)
            return false;
          const optionValue2 = "__original" in option2 ? option2.__original : option2.value;
          return eq(value, optionValue2);
        });
        return placeholder && !hasMatchingValue ? true : void 0;
      };
    }
  });
  node.hook.input((value, next) => {
    var _a, _b, _c;
    if (!node.props.placeholder && value === void 0 && Array.isArray((_a = node.props) === null || _a === void 0 ? void 0 : _a.options) && node.props.options.length && !undefine((_c = (_b = node.props) === null || _b === void 0 ? void 0 : _b.attrs) === null || _c === void 0 ? void 0 : _c.multiple)) {
      value = "__original" in node.props.options[0] ? node.props.options[0].__original : node.props.options[0].value;
    }
    return next(value);
  });
}
function defaultIcon(sectionKey, defaultIcon2) {
  return (node) => {
    if (node.props[`${sectionKey}Icon`] === void 0) {
      node.props[`${sectionKey}Icon`] = `default:${defaultIcon2}`;
    }
  };
}
function isSchemaObject(schema) {
  return typeof schema === "object" && ("$el" in schema || "$cmp" in schema || "$formkit" in schema);
}
function isSlotCondition(node) {
  if (isConditional(node) && node.if && node.if.startsWith("$slots.") && typeof node.then === "string" && node.then.startsWith("$slots.") && "else" in node) {
    return true;
  }
  return false;
}
function extendSchema(schema, extension2 = {}) {
  if (typeof schema === "string") {
    return isSchemaObject(extension2) || typeof extension2 === "string" ? extension2 : schema;
  } else if (Array.isArray(schema)) {
    return isSchemaObject(extension2) ? extension2 : schema;
  }
  return extend(schema, extension2);
}
function useSchema(inputSection) {
  return outer(wrapper(label("$label"), inner(prefix(), inputSection(), suffix())), help("$help"), messages$1(message$1("$message.value")));
}
function createSection(section, el, root = false) {
  return (...children) => {
    const extendable = (extensions) => {
      const node = !el || typeof el === "string" ? { $el: el } : el();
      if (isDOM(node) || isComponent$1(node)) {
        if (!node.meta) {
          node.meta = { section };
        }
        if (children.length && !node.children) {
          node.children = [
            ...children.map((child) => typeof child === "string" ? child : child(extensions))
          ];
        }
        if (isDOM(node)) {
          node.attrs = {
            class: `$classes.${section}`,
            ...node.attrs || {}
          };
        }
      }
      return {
        if: `$slots.${section}`,
        then: `$slots.${section}`,
        else: section in extensions ? extendSchema(node, extensions[section]) : node
      };
    };
    extendable._s = section;
    return root ? createRoot(extendable) : extendable;
  };
}
function createRoot(rootSection) {
  return (extensions) => {
    return [rootSection(extensions)];
  };
}
function $if(condition, then, otherwise) {
  const extendable = (extensions) => {
    const node = then(extensions);
    if (otherwise || isSchemaObject(node) && "if" in node || isSlotCondition(node)) {
      const conditionalNode = {
        if: condition,
        then: node
      };
      if (otherwise) {
        conditionalNode.else = otherwise(extensions);
      }
      return conditionalNode;
    } else if (isSlotCondition(node)) {
      Object.assign(node.else, { if: condition });
    } else if (isSchemaObject(node)) {
      Object.assign(node, { if: condition });
    }
    return node;
  };
  extendable._s = token();
  return extendable;
}
function $extend(section, extendWith) {
  const extendable = (extensions) => {
    const node = section({});
    if (isSlotCondition(node)) {
      if (Array.isArray(node.else))
        return node;
      node.else = extendSchema(extendSchema(node.else, extendWith), section._s ? extensions[section._s] : {});
      return node;
    }
    return extendSchema(extendSchema(node, extendWith), section._s ? extensions[section._s] : {});
  };
  extendable._s = section._s;
  return extendable;
}
function $root(section) {
  return createRoot(section);
}
const button$1 = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: outer(messages$1(message$1("$message.value")), wrapper(buttonInput(icon("prefix"), prefix(), buttonLabel("$label || $ui.submit.value"), suffix(), icon("suffix"))), help("$help")),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "input",
  /**
   * The family of inputs this one belongs too. For example "text" and "email"
   * are both part of the "text" family. This is primary used for styling.
   */
  family: "button",
  /**
   * An array of extra props to accept for this input.
   */
  props: [],
  /**
   * Additional features that should be added to your input
   */
  features: [localize("submit"), ignore]
};
const checkbox = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: outer(
    $if(
      "$options == undefined",
      /**
       * Single checkbox structure.
       */
      boxWrapper(inner(prefix(), box(), decorator(icon("decorator")), suffix()), $extend(boxLabel("$label"), {
        if: "$label"
      })),
      /**
       * Multi checkbox structure.
       */
      fieldset(legend("$label"), help("$help"), boxOptions(boxOption(boxWrapper(inner(prefix(), $extend(box(), {
        bind: "$option.attrs",
        attrs: {
          id: "$option.attrs.id",
          value: "$option.value",
          checked: "$fns.isChecked($option.value)"
        }
      }), decorator(icon("decorator")), suffix()), $extend(boxLabel("$option.label"), {
        if: "$option.label"
      })), boxHelp("$option.help"))))
    ),
    // Help text only goes under the input when it is a single.
    $if("$options == undefined && $help", help("$help")),
    messages$1(message$1("$message.value"))
  ),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "input",
  /**
   * The family of inputs this one belongs too. For example "text" and "email"
   * are both part of the "text" family. This is primary used for styling.
   */
  family: "box",
  /**
   * An array of extra props to accept for this input.
   */
  props: ["options", "onValue", "offValue", "optionsLoader"],
  /**
   * Additional features that should be added to your input
   */
  features: [
    options,
    checkboxes,
    defaultIcon("decorator", "checkboxDecorator")
  ]
};
const file = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: outer(wrapper(label("$label"), inner(icon("prefix", "label"), prefix(), fileInput(), fileList(fileItem(icon("fileItem"), fileName("$file.name"), $if("$value.length === 1", fileRemove(icon("fileRemove"), "$ui.remove.value")))), $if("$value.length > 1", fileRemove("$ui.removeAll.value")), noFiles(icon("noFiles"), "$ui.noFiles.value"), suffix(), icon("suffix"))), help("$help"), messages$1(message$1("$message.value"))),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "input",
  /**
   * The family of inputs this one belongs too. For example "text" and "email"
   * are both part of the "text" family. This is primary used for styling.
   */
  family: "text",
  /**
   * An array of extra props to accept for this input.
   */
  props: [],
  /**
   * Additional features that should be added to your input
   */
  features: [
    files,
    defaultIcon("fileItem", "fileItem"),
    defaultIcon("fileRemove", "fileRemove"),
    defaultIcon("noFiles", "noFiles")
  ]
};
const form = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: formInput("$slots.default", messages$1(message$1("$message.value")), actions(submitInput())),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "group",
  /**
   * An array of extra props to accept for this input.
   */
  props: [
    "actions",
    "submit",
    "submitLabel",
    "submitAttrs",
    "submitBehavior",
    "incompleteMessage"
  ],
  /**
   * Additional features that should be added to your input
   */
  features: [form$1, disables]
};
const group = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: fragment("$slots.default"),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "group",
  /**
   * An array of extra props to accept for this input.
   */
  props: [],
  /**
   * Additional features that should be added to your input
   */
  features: [disables]
};
const hidden = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: $root(textInput()),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "input",
  /**
   * An array of extra props to accept for this input.
   */
  props: [],
  /**
   * Additional features that should be added to your input
   */
  features: []
};
const list$1 = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: fragment("$slots.default"),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "list",
  /**
   * An array of extra props to accept for this input.
   */
  props: [],
  /**
   * Additional features that should be added to your input
   */
  features: [disables]
};
const radio = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: outer(
    $if(
      "$options == undefined",
      /**
       * Single radio structure.
       */
      boxWrapper(inner(prefix(), box(), decorator(icon("decorator")), suffix()), $if("$label", boxLabel("$label"))),
      /**
       * Multi radio structure.
       */
      fieldset(legend("$label"), help("$help"), boxOptions(boxOption(boxWrapper(inner(prefix(), $extend(box(), {
        bind: "$option.attrs",
        attrs: {
          id: "$option.attrs.id",
          value: "$option.value",
          checked: "$fns.isChecked($option.value)"
        }
      }), decorator(icon("decorator")), suffix()), $if("$option.label", boxLabel("$option.label"))), boxHelp("$option.help"))))
    ),
    // Help text only goes under the input when it is a single.
    $if("$options === undefined && $help", help("$help")),
    messages$1(message$1("$message.value"))
  ),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "input",
  /**
   * The family of inputs this one belongs too. For example "text" and "email"
   * are both part of the "text" family. This is primary used for styling.
   */
  family: "box",
  /**
   * An array of extra props to accept for this input.
   */
  props: ["options", "onValue", "offValue", "optionsLoader"],
  /**
   * Additional features that should be added to your input
   */
  features: [
    disables,
    options,
    radios,
    defaultIcon("decorator", "radioDecorator")
  ]
};
const select = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: outer(wrapper(label("$label"), inner(icon("prefix"), prefix(), selectInput$1($if("$slots.default", () => "$slots.default", $if("$slots.option", optionSlot, option("$option.label")))), $if("$attrs.multiple !== undefined", () => "", icon("select")), suffix(), icon("suffix"))), help("$help"), messages$1(message$1("$message.value"))),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "input",
  /**
   * An array of extra props to accept for this input.
   */
  props: ["options", "placeholder", "optionsLoader"],
  /**
   * Additional features that should be added to your input
   */
  features: [options, select$1, defaultIcon("select", "select")]
};
const textarea = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: outer(wrapper(label("$label"), inner(icon("prefix", "label"), prefix(), textareaInput(), suffix(), icon("suffix"))), help("$help"), messages$1(message$1("$message.value"))),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "input",
  /**
   * An array of extra props to accept for this input.
   */
  props: [],
  /**
   * Additional features that should be added to your input
   */
  features: [initialValue]
};
const text = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: outer(wrapper(label("$label"), inner(icon("prefix", "label"), prefix(), textInput(), suffix(), icon("suffix"))), help("$help"), messages$1(message$1("$message.value"))),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "input",
  /**
   * The family of inputs this one belongs too. For example "text" and "email"
   * are both part of the "text" family. This is primary used for styling.
   */
  family: "text",
  /**
   * An array of extra props to accept for this input.
   */
  props: [],
  /**
   * Additional features that should be added to your input
   */
  features: []
};
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  button: button$1,
  submit: button$1,
  checkbox,
  file,
  form,
  group,
  hidden,
  list: list$1,
  radio,
  select,
  textarea,
  text,
  color: text,
  date: text,
  datetimeLocal: text,
  email: text,
  month: text,
  number: text,
  password: text,
  search: text,
  tel: text,
  time: text,
  url: text,
  week: text,
  range: text
});
const accepted = function accepted2({ value }) {
  return ["yes", "on", "1", 1, true, "true"].includes(value);
};
accepted.skipEmpty = false;
const date_after = function({ value }, compare = false) {
  const timestamp = Date.parse(compare || /* @__PURE__ */ new Date());
  const fieldValue = Date.parse(String(value));
  return isNaN(fieldValue) ? false : fieldValue > timestamp;
};
const alpha = function({ value }, set2 = "default") {
  const sets = {
    default: /^[a-zA-ZÀ-ÖØ-öø-ÿĄąĆćČčĎďĘęĚěŁłŃńŇňŘřŚśŠšŤťŮůŹźŻŽžż]+$/,
    latin: /^[a-zA-Z]+$/
  };
  const selectedSet = has(sets, set2) ? set2 : "default";
  return sets[selectedSet].test(String(value));
};
const alpha_spaces = function({ value }, set2 = "default") {
  const sets = {
    default: /^[a-zA-ZÀ-ÖØ-öø-ÿĄąĆćČčĎďĘęĚěŁłŃńŇňŘřŚśŠšŤťŮůŹźŻŽžż ]+$/,
    latin: /^[a-zA-Z ]+$/
  };
  const selectedSet = has(sets, set2) ? set2 : "default";
  return sets[selectedSet].test(String(value));
};
const alphanumeric = function({ value }, set2 = "default") {
  const sets = {
    default: /^[a-zA-Z0-9À-ÖØ-öø-ÿĄąĆćĘęŁłŃńŚśŹźŻż]+$/,
    latin: /^[a-zA-Z0-9]+$/
  };
  const selectedSet = has(sets, set2) ? set2 : "default";
  return sets[selectedSet].test(String(value));
};
const date_before = function({ value }, compare = false) {
  const timestamp = Date.parse(compare || /* @__PURE__ */ new Date());
  const fieldValue = Date.parse(String(value));
  return isNaN(fieldValue) ? false : fieldValue < timestamp;
};
const between = function between2({ value }, from, to) {
  if (!isNaN(value) && !isNaN(from) && !isNaN(to)) {
    const val = 1 * value;
    from = Number(from);
    to = Number(to);
    const [a2, b2] = from <= to ? [from, to] : [to, from];
    return val >= 1 * a2 && val <= 1 * b2;
  }
  return false;
};
const hasConfirm = /(_confirm(?:ed)?)$/;
const confirm = function confirm2(node, address, comparison = "loose") {
  var _a;
  if (!address) {
    address = hasConfirm.test(node.name) ? node.name.replace(hasConfirm, "") : `${node.name}_confirm`;
  }
  const foreignValue = (_a = node.at(address)) === null || _a === void 0 ? void 0 : _a.value;
  return comparison === "strict" ? node.value === foreignValue : node.value == foreignValue;
};
const date_between = function date_between2({ value }, dateA, dateB) {
  dateA = dateA instanceof Date ? dateA.getTime() : Date.parse(dateA);
  dateB = dateB instanceof Date ? dateB.getTime() : Date.parse(dateB);
  const compareTo = value instanceof Date ? value.getTime() : Date.parse(String(value));
  if (dateA && !dateB) {
    dateB = dateA;
    dateA = Date.now();
  } else if (!dateA || !compareTo) {
    return false;
  }
  return compareTo >= dateA && compareTo <= dateB;
};
const date_format = function date({ value }, format) {
  if (format && typeof format === "string") {
    return regexForFormat(format).test(String(value));
  }
  return !isNaN(Date.parse(String(value)));
};
const email = function email2({ value }) {
  const isEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return isEmail.test(String(value));
};
const ends_with = function ends_with2({ value }, ...stack) {
  if (typeof value === "string" && stack.length) {
    return stack.some((item) => {
      return value.endsWith(item);
    });
  } else if (typeof value === "string" && stack.length === 0) {
    return true;
  }
  return false;
};
const is = function is2({ value }, ...stack) {
  return stack.some((item) => {
    if (typeof item === "object") {
      return eq(item, value);
    }
    return item == value;
  });
};
const length = function length2({ value }, first = 0, second = Infinity) {
  first = parseInt(first);
  second = isNaN(parseInt(second)) ? Infinity : parseInt(second);
  const min3 = first <= second ? first : second;
  const max3 = second >= first ? second : first;
  if (typeof value === "string" || Array.isArray(value)) {
    return value.length >= min3 && value.length <= max3;
  } else if (value && typeof value === "object") {
    const length3 = Object.keys(value).length;
    return length3 >= min3 && length3 <= max3;
  }
  return false;
};
const matches = function matches2({ value }, ...stack) {
  return stack.some((pattern) => {
    if (typeof pattern === "string" && pattern.substr(0, 1) === "/" && pattern.substr(-1) === "/") {
      pattern = new RegExp(pattern.substr(1, pattern.length - 2));
    }
    if (pattern instanceof RegExp) {
      return pattern.test(String(value));
    }
    return pattern === value;
  });
};
const max = function max2({ value }, maximum = 10) {
  if (Array.isArray(value)) {
    return value.length <= maximum;
  }
  return Number(value) <= Number(maximum);
};
const min = function min2({ value }, minimum = 1) {
  if (Array.isArray(value)) {
    return value.length >= minimum;
  }
  return Number(value) >= Number(minimum);
};
const not = function not2({ value }, ...stack) {
  return !stack.some((item) => {
    if (typeof item === "object") {
      return eq(item, value);
    }
    return item === value;
  });
};
const number = function number2({ value }) {
  return !isNaN(value);
};
const required = function required2({ value }, action = "default") {
  return action === "trim" && typeof value === "string" ? !empty(value.trim()) : !empty(value);
};
required.skipEmpty = false;
const starts_with = function starts_with2({ value }, ...stack) {
  if (typeof value === "string" && stack.length) {
    return stack.some((item) => {
      return value.startsWith(item);
    });
  } else if (typeof value === "string" && stack.length === 0) {
    return true;
  }
  return false;
};
const url = function url2({ value }, ...stack) {
  try {
    const protocols = stack.length ? stack : ["http:", "https:"];
    const url3 = new URL(String(value));
    return protocols.includes(url3.protocol);
  } catch {
    return false;
  }
};
const defaultRules = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accepted,
  alpha,
  alpha_spaces,
  alphanumeric,
  between,
  confirm,
  date_after,
  date_before,
  date_between,
  date_format,
  email,
  ends_with,
  is,
  length,
  matches,
  max,
  min,
  not,
  number,
  required,
  starts_with,
  url
}, Symbol.toStringTag, { value: "Module" }));
const revokedObservers = /* @__PURE__ */ new WeakSet();
function createObserver(node, dependencies) {
  const deps = dependencies || Object.assign(/* @__PURE__ */ new Map(), { active: false });
  const receipts2 = /* @__PURE__ */ new Map();
  const addDependency = function(event) {
    var _a;
    if (!deps.active)
      return;
    if (!deps.has(node))
      deps.set(node, /* @__PURE__ */ new Set());
    (_a = deps.get(node)) === null || _a === void 0 ? void 0 : _a.add(event);
  };
  const observeProps = function(props2) {
    return new Proxy(props2, {
      get(...args) {
        typeof args[1] === "string" && addDependency(`prop:${args[1]}`);
        return Reflect.get(...args);
      }
    });
  };
  const observeLedger = function(ledger) {
    return new Proxy(ledger, {
      get(...args) {
        if (args[1] === "value") {
          return (key) => {
            addDependency(`count:${key}`);
            return ledger.value(key);
          };
        }
        return Reflect.get(...args);
      }
    });
  };
  const observe = function(value, property) {
    if (isNode(value)) {
      return createObserver(value, deps);
    }
    if (property === "value")
      addDependency("commit");
    if (property === "props")
      return observeProps(value);
    if (property === "ledger")
      return observeLedger(value);
    return value;
  };
  const { proxy: observed, revoke } = Proxy.revocable(node, {
    get(...args) {
      switch (args[1]) {
        case "_node":
          return node;
        case "deps":
          return deps;
        case "watch":
          return (block, after) => watch(observed, block, after);
        case "observe":
          return () => {
            const old = new Map(deps);
            deps.clear();
            deps.active = true;
            return old;
          };
        case "stopObserve":
          return () => {
            const newDeps = new Map(deps);
            deps.active = false;
            return newDeps;
          };
        case "receipts":
          return receipts2;
        case "kill":
          return () => {
            removeListeners(receipts2);
            revokedObservers.add(args[2]);
            revoke();
            return void 0;
          };
      }
      const value = Reflect.get(...args);
      if (typeof value === "function") {
        return (...subArgs) => {
          const subValue = value(...subArgs);
          return observe(subValue, args[1]);
        };
      }
      return observe(value, args[1]);
    }
  });
  return observed;
}
function applyListeners(node, [toAdd, toRemove], callback) {
  toAdd.forEach((events, depNode) => {
    events.forEach((event) => {
      var _a;
      node.receipts.has(depNode) || node.receipts.set(depNode, {});
      node.receipts.set(depNode, Object.assign((_a = node.receipts.get(depNode)) !== null && _a !== void 0 ? _a : {}, {
        [event]: depNode.on(event, callback)
      }));
    });
  });
  toRemove.forEach((events, depNode) => {
    events.forEach((event) => {
      if (node.receipts.has(depNode)) {
        const nodeReceipts = node.receipts.get(depNode);
        if (nodeReceipts && has(nodeReceipts, event)) {
          depNode.off(nodeReceipts[event]);
          delete nodeReceipts[event];
          node.receipts.set(depNode, nodeReceipts);
        }
      }
    });
  });
}
function removeListeners(receipts2) {
  receipts2.forEach((events, node) => {
    for (const event in events) {
      node.off(events[event]);
    }
  });
}
function watch(node, block, after) {
  const doAfterObservation = (res2) => {
    const newDeps = node.stopObserve();
    applyListeners(node, diffDeps(oldDeps, newDeps), () => watch(node, block, after));
    if (after)
      after(res2);
  };
  const oldDeps = new Map(node.deps);
  node.observe();
  const res = block(node);
  if (res instanceof Promise)
    res.then((val) => doAfterObservation(val));
  else
    doAfterObservation(res);
}
function diffDeps(previous, current) {
  const toAdd = /* @__PURE__ */ new Map();
  const toRemove = /* @__PURE__ */ new Map();
  current.forEach((events, node) => {
    if (!previous.has(node)) {
      toAdd.set(node, events);
    } else {
      const eventsToAdd = /* @__PURE__ */ new Set();
      const previousEvents = previous.get(node);
      events.forEach((event) => !(previousEvents === null || previousEvents === void 0 ? void 0 : previousEvents.has(event)) && eventsToAdd.add(event));
      toAdd.set(node, eventsToAdd);
    }
  });
  previous.forEach((events, node) => {
    if (!current.has(node)) {
      toRemove.set(node, events);
    } else {
      const eventsToRemove = /* @__PURE__ */ new Set();
      const newEvents = current.get(node);
      events.forEach((event) => !(newEvents === null || newEvents === void 0 ? void 0 : newEvents.has(event)) && eventsToRemove.add(event));
      toRemove.set(node, eventsToRemove);
    }
  });
  return [toAdd, toRemove];
}
function isKilled(node) {
  return revokedObservers.has(node);
}
const validatingMessage = createMessage({
  type: "state",
  blocking: true,
  visible: false,
  value: true,
  key: "validating"
});
function createValidationPlugin(baseRules = {}) {
  return function validationPlugin(node) {
    let propRules = cloneAny(node.props.validationRules || {});
    let availableRules = { ...baseRules, ...propRules };
    let observedNode = createObserver(node);
    const state = { input: token(), rerun: null, isPassing: true };
    let validation = cloneAny(node.props.validation);
    node.on("prop:validation", ({ payload }) => reboot(payload, availableRules));
    node.on("prop:validationRules", ({ payload }) => reboot(validation, payload));
    function reboot(newValidation, newRules) {
      var _a;
      if (eq(Object.keys(propRules || {}), Object.keys(newRules || {})) && eq(validation, newValidation))
        return;
      propRules = cloneAny(newRules);
      validation = cloneAny(newValidation);
      availableRules = { ...baseRules, ...propRules };
      removeListeners(observedNode.receipts);
      (_a = node.props.parsedRules) === null || _a === void 0 ? void 0 : _a.forEach((validation2) => {
        var _a2;
        validation2.messageObserver = (_a2 = validation2.messageObserver) === null || _a2 === void 0 ? void 0 : _a2.kill();
      });
      node.store.filter(() => false, "validation");
      node.props.parsedRules = parseRules(newValidation, availableRules);
      observedNode.kill();
      observedNode = createObserver(node);
      validate(observedNode, node.props.parsedRules, state);
    }
    node.props.parsedRules = parseRules(validation, availableRules);
    validate(observedNode, node.props.parsedRules, state);
  };
}
function validate(node, validations, state) {
  if (isKilled(node))
    return;
  state.input = token();
  state.isPassing = true;
  node.store.filter((message2) => !message2.meta.removeImmediately, "validation");
  validations.forEach((validation) => validation.debounce && clearTimeout(validation.timer));
  if (validations.length) {
    node.store.set(validatingMessage);
    run(0, validations, node, state, false, () => {
      node.store.remove(validatingMessage.key);
    });
  }
}
function run(current, validations, node, state, removeImmediately, complete) {
  const validation = validations[current];
  if (!validation)
    return complete();
  const currentRun = state.input;
  validation.state = null;
  function next(async, result) {
    state.isPassing = state.isPassing && !!result;
    validation.queued = false;
    const newDeps = node.stopObserve();
    applyListeners(node, diffDeps(validation.deps, newDeps), () => {
      validation.queued = true;
      if (state.rerun)
        clearTimeout(state.rerun);
      state.rerun = setTimeout(validate, 0, node, validations, state);
    });
    validation.deps = newDeps;
    if (state.input === currentRun) {
      validation.state = result;
      if (result === false) {
        createFailedMessage(node, validation, removeImmediately || async);
      } else {
        removeMessage(node, validation);
      }
      if (validations.length > current + 1) {
        run(current + 1, validations, node, state, removeImmediately || async, complete);
      } else {
        complete();
      }
    }
  }
  if ((!empty(node.value) || !validation.skipEmpty) && (state.isPassing || validation.force)) {
    if (validation.queued) {
      runRule(validation, node, (result) => {
        result instanceof Promise ? result.then((r2) => next(true, r2)) : next(false, result);
      });
    } else {
      run(current + 1, validations, node, state, removeImmediately, complete);
    }
  } else {
    if (empty(node.value) && validation.skipEmpty && state.isPassing) {
      node.observe();
      node.value;
      next(false, state.isPassing);
    } else {
      next(false, null);
    }
  }
}
function runRule(validation, node, after) {
  if (validation.debounce) {
    validation.timer = setTimeout(() => {
      node.observe();
      after(validation.rule(node, ...validation.args));
    }, validation.debounce);
  } else {
    node.observe();
    after(validation.rule(node, ...validation.args));
  }
}
function removeMessage(node, validation) {
  const key = `rule_${validation.name}`;
  if (validation.messageObserver) {
    validation.messageObserver = validation.messageObserver.kill();
  }
  if (has(node.store, key)) {
    node.store.remove(key);
  }
}
function createFailedMessage(node, validation, removeImmediately) {
  if (isKilled(node))
    return;
  if (!validation.messageObserver) {
    validation.messageObserver = createObserver(node._node);
  }
  validation.messageObserver.watch((node2) => {
    const i18nArgs = createI18nArgs(node2, validation);
    return i18nArgs;
  }, (i18nArgs) => {
    const customMessage = createCustomMessage(node, validation, i18nArgs);
    const message2 = createMessage({
      blocking: validation.blocking,
      key: `rule_${validation.name}`,
      meta: {
        /**
         * Use this key instead of the message root key to produce i18n validation
         * messages.
         */
        messageKey: validation.name,
        /**
         * For messages that were created *by or after* a debounced or async
         * validation rule — we make note of it so we can immediately remove them
         * as soon as the next commit happens.
         */
        removeImmediately,
        /**
         * Determines if this message should be passed to localization.
         */
        localize: !customMessage,
        /**
         * The arguments that will be passed to the validation rules
         */
        i18nArgs
      },
      type: "validation",
      value: customMessage || "This field is not valid."
    });
    node.store.set(message2);
  });
}
function createCustomMessage(node, validation, i18nArgs) {
  const customMessage = node.props.validationMessages && has(node.props.validationMessages, validation.name) ? node.props.validationMessages[validation.name] : void 0;
  if (typeof customMessage === "function") {
    return customMessage(...i18nArgs);
  }
  return customMessage;
}
function createI18nArgs(node, validation) {
  return [
    {
      node,
      name: createMessageName(node),
      args: validation.args
    }
  ];
}
function createMessageName(node) {
  if (typeof node.props.validationLabel === "function") {
    return node.props.validationLabel(node);
  }
  return node.props.validationLabel || node.props.label || node.props.name || String(node.name);
}
const hintPattern = "(?:[\\*+?()0-9]+)";
const rulePattern = "[a-zA-Z][a-zA-Z0-9_]+";
const ruleExtractor = new RegExp(`^(${hintPattern}?${rulePattern})(?:\\:(.*)+)?$`, "i");
const hintExtractor = new RegExp(`^(${hintPattern})(${rulePattern})$`, "i");
const debounceExtractor = /([\*+?]+)?(\(\d+\))([\*+?]+)?/;
const hasDebounce = /\(\d+\)/;
const defaultHints = {
  blocking: true,
  debounce: 0,
  force: false,
  skipEmpty: true,
  name: ""
};
function parseRules(validation, rules) {
  if (!validation)
    return [];
  const intents = typeof validation === "string" ? extractRules(validation) : clone(validation);
  return intents.reduce((validations, args) => {
    let rule = args.shift();
    const hints = {};
    if (typeof rule === "string") {
      const [ruleName, parsedHints] = parseHints(rule);
      if (has(rules, ruleName)) {
        rule = rules[ruleName];
        Object.assign(hints, parsedHints);
      }
    }
    if (typeof rule === "function") {
      validations.push({
        rule,
        args,
        timer: 0,
        state: null,
        queued: true,
        deps: /* @__PURE__ */ new Map(),
        ...defaultHints,
        ...fnHints(hints, rule)
      });
    }
    return validations;
  }, []);
}
function extractRules(validation) {
  return validation.split("|").reduce((rules, rule) => {
    const parsedRule = parseRule(rule);
    if (parsedRule) {
      rules.push(parsedRule);
    }
    return rules;
  }, []);
}
function parseRule(rule) {
  const trimmed = rule.trim();
  if (trimmed) {
    const matches3 = trimmed.match(ruleExtractor);
    if (matches3 && typeof matches3[1] === "string") {
      const ruleName = matches3[1].trim();
      const args = matches3[2] && typeof matches3[2] === "string" ? matches3[2].split(",").map((s3) => s3.trim()) : [];
      return [ruleName, ...args];
    }
  }
  return false;
}
function parseHints(ruleName) {
  const matches3 = ruleName.match(hintExtractor);
  if (!matches3) {
    return [ruleName, { name: ruleName }];
  }
  const map = {
    "*": { force: true },
    "+": { skipEmpty: false },
    "?": { blocking: false }
  };
  const [, hints, rule] = matches3;
  const hintGroups = hasDebounce.test(hints) ? hints.match(debounceExtractor) || [] : [, hints];
  return [
    rule,
    [hintGroups[1], hintGroups[2], hintGroups[3]].reduce((hints2, group2) => {
      if (!group2)
        return hints2;
      if (hasDebounce.test(group2)) {
        hints2.debounce = parseInt(group2.substr(1, group2.length - 1));
      } else {
        group2.split("").forEach((hint) => has(map, hint) && Object.assign(hints2, map[hint]));
      }
      return hints2;
    }, { name: rule })
  ];
}
function fnHints(existingHints, rule) {
  if (!existingHints.name) {
    existingHints.name = rule.ruleName || rule.name;
  }
  return ["skipEmpty", "force", "debounce", "blocking"].reduce((hints, hint) => {
    if (has(rule, hint) && !has(hints, hint)) {
      Object.assign(hints, {
        [hint]: rule[hint]
      });
    }
    return hints;
  }, existingHints);
}
function sentence(str) {
  return str[0].toUpperCase() + str.substr(1);
}
function list(items, conjunction = "or") {
  return items.reduce((oxford, item, index2) => {
    oxford += item;
    if (index2 <= items.length - 2 && items.length > 2) {
      oxford += ", ";
    }
    if (index2 === items.length - 2) {
      oxford += `${items.length === 2 ? " " : ""}${conjunction} `;
    }
    return oxford;
  }, "");
}
function date2(date3) {
  const dateTime = typeof date3 === "string" ? new Date(Date.parse(date3)) : date3;
  if (!(dateTime instanceof Date)) {
    return "(unknown)";
  }
  return new Intl.DateTimeFormat(void 0, {
    dateStyle: "medium",
    timeZone: "UTC"
  }).format(dateTime);
}
function order(first, second) {
  return Number(first) >= Number(second) ? [second, first] : [first, second];
}
const ui$w = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Hinzufügen",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Entfernen",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Alles entfernen",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Entschuldigung, nicht alle Felder wurden korrekt ausgefüllt.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Senden",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Keine Datei ausgewählt",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Gehe nach oben",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Gehen Sie nach unten",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Wird geladen...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Mehr laden",
  /**
   * Shown on buttons that navigate state forward
   */
  next: "Weiter",
  /**
   * Shown on buttons that navigate state backward
   */
  prev: "Voriges",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Alle Werte hinzufügen",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Ausgewählte Werte hinzufügen",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Alle Werte entfernen",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Ausgewählte Werte entfernen",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Datum wählen",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Datum ändern",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "Das gewählte Datum ist ungültig."
};
const validation$w = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Bitte ${name} akzeptieren.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} muss nach dem ${date2(args[0])} liegen.`;
    }
    return `${sentence(name)} muss in der Zukunft liegen.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} darf nur Buchstaben enthalten.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} darf nur Buchstaben und Zahlen enthalten.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} dürfen nur Buchstaben und Leerzeichen enthalten.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} muss vor dem ${date2(args[0])} liegen.`;
    }
    return `${sentence(name)} muss in der Vergangenheit liegen.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Dieses Feld wurde falsch konfiguriert und kann nicht übermittelt werden.`;
    }
    return `${sentence(name)} muss zwischen ${args[0]} und ${args[1]} sein.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} stimmt nicht überein.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} ist kein gültiges Datum im Format ${args[0]}.`;
    }
    return "Dieses Feld wurde falsch konfiguriert und kann nicht übermittelt werden.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} muss zwischen ${date2(args[0])} und ${date2(args[1])} liegen.`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "E-Mail Adresse ist ungültig.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} endet nicht mit ${list(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} enthält einen ungültigen Wert.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = first <= second ? first : second;
    const max3 = second >= first ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} muss mindestens ein Zeichen enthalten.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} darf maximal ${max3} Zeichen enthalten.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} sollte ${max3} Zeichen lang sein.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} muss mindestens ${min3} Zeichen enthalten.`;
    }
    return `${sentence(name)} muss zwischen ${min3} und ${max3} Zeichen enthalten.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} enthält einen ungültigen Wert.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Darf maximal ${args[0]} ${name} haben.`;
    }
    return `${sentence(name)} darf maximal ${args[0]} sein.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Keine Dateiformate konfiguriert.";
    }
    return `${sentence(name)} muss vom Typ ${args[0]} sein.`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Mindestens ${args[0]} ${name} erforderlich.`;
    }
    return `${sentence(name)} muss mindestens ${args[0]} sein.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” ist kein gültiger Wert für ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} muss eine Zahl sein.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} ist erforderlich.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} beginnt nicht mit ${list(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Bitte geben Sie eine gültige URL ein.`;
  }
};
var de$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ui: ui$w,
  validation: validation$w
});
const ui$u = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "Add",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Remove",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Remove all",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Sorry, not all fields are filled out correctly.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Submit",
  /**
   * Shown when no files are selected.
   */
  noFiles: "No file chosen",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Move up",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Move down",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Loading...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Load more",
  /**
   * Show on buttons that navigate state forward
   */
  next: "Next",
  /**
   * Show on buttons that navigate state backward
   */
  prev: "Previous",
  /**
   * Shown when adding all values.
   */
  addAllValues: "Add all values",
  /**
   * Shown when adding selected values.
   */
  addSelectedValues: "Add selected values",
  /**
   * Shown when removing all values.
   */
  removeAllValues: "Remove all values",
  /**
   * Shown when removing selected values.
   */
  removeSelectedValues: "Remove selected values",
  /**
   * Shown when there is a date to choose.
   */
  chooseDate: "Choose date",
  /**
   * Shown when there is a date to change.
   */
  changeDate: "Change date",
  /**
   * Shown when the date is invalid.
   */
  invalidDate: "The selected date is invalid."
};
const validation$u = {
  /**
   * The value is not an accepted value.
   * @see {@link https://formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Please accept the ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} must be after ${date2(args[0])}.`;
    }
    return `${sentence(name)} must be in the future.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} can only contain alphabetical characters.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} can only contain letters and numbers.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} can only contain letters and spaces.`;
  },
  /**
   * The date is not before
   * @see {@link https://formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} must be before ${date2(args[0])}.`;
    }
    return `${sentence(name)} must be in the past.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `This field was configured incorrectly and can’t be submitted.`;
    }
    const [a2, b2] = order(args[0], args[1]);
    return `${sentence(name)} must be between ${a2} and ${b2}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} does not match.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} is not a valid date, please use the format ${args[0]}`;
    }
    return "This field was configured incorrectly and can’t be submitted";
  },
  /**
   * Is not within expected date range
   * @see {@link https://formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} must be between ${date2(args[0])} and ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://formkit.com/essentials/validation#email}
   */
  email: "Please enter a valid email address.",
  /**
   * Does not end with the specified value
   * @see {@link https://formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} doesn’t end with ${list(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} is not an allowed value.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} must be at least one character.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} must be less than or equal to ${max3} characters.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} should be ${max3} characters long.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} must be greater than or equal to ${min3} characters.`;
    }
    return `${sentence(name)} must be between ${min3} and ${max3} characters.`;
  },
  /**
   * Value is not a match
   * @see {@link https://formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} is not an allowed value.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Cannot have more than ${args[0]} ${name}.`;
    }
    return `${sentence(name)} must be less than or equal to ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "No file formats allowed.";
    }
    return `${sentence(name)} must be of the type: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Cannot have fewer than ${args[0]} ${name}.`;
    }
    return `Must be at least ${args[0]} ${name} .`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” is not an allowed ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} must be a number.`;
  },
  /**
   * Required field.
   * @see {@link https://formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} is required.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} doesn’t start with ${list(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://formkit.com/essentials/validation#url}
   */
  url() {
    return `Please enter a valid URL.`;
  }
};
var en = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ui: ui$u,
  validation: validation$u
});
function createI18nPlugin(registry2) {
  return function i18nPlugin(node) {
    let localeKey = parseLocale(node.config.locale, registry2);
    let locale = localeKey ? registry2[localeKey] : {};
    node.on("prop:locale", ({ payload: lang }) => {
      localeKey = parseLocale(lang, registry2);
      locale = localeKey ? registry2[localeKey] : {};
      node.store.touch();
    });
    node.on("prop:label", () => node.store.touch());
    node.on("prop:validationLabel", () => node.store.touch());
    node.hook.text((fragment2, next) => {
      var _a, _b;
      const key = ((_a = fragment2.meta) === null || _a === void 0 ? void 0 : _a.messageKey) || fragment2.key;
      if (has(locale, fragment2.type) && has(locale[fragment2.type], key)) {
        const t2 = locale[fragment2.type][key];
        if (typeof t2 === "function") {
          fragment2.value = Array.isArray((_b = fragment2.meta) === null || _b === void 0 ? void 0 : _b.i18nArgs) ? t2(...fragment2.meta.i18nArgs) : t2(fragment2);
        } else {
          fragment2.value = t2;
        }
      }
      return next(fragment2);
    });
  };
}
function parseLocale(locale, availableLocales) {
  if (has(availableLocales, locale)) {
    return locale;
  }
  const [lang] = locale.split("-");
  if (has(availableLocales, lang)) {
    return lang;
  }
  for (const locale2 in availableLocales) {
    return locale2;
  }
  return false;
}
function generateClasses(classes) {
  const classesBySectionKey = {};
  Object.keys(classes).forEach((type) => {
    Object.keys(classes[type]).forEach((sectionKey) => {
      if (!classesBySectionKey[sectionKey]) {
        classesBySectionKey[sectionKey] = {
          [type]: classes[type][sectionKey]
        };
      } else {
        classesBySectionKey[sectionKey][type] = classes[type][sectionKey];
      }
    });
  });
  Object.keys(classesBySectionKey).forEach((sectionKey) => {
    const classesObject = classesBySectionKey[sectionKey];
    classesBySectionKey[sectionKey] = function(node, sectionKey2) {
      return addClassesBySection(node, sectionKey2, classesObject);
    };
  });
  return classesBySectionKey;
}
function addClassesBySection(node, _sectionKey, classesByType) {
  const type = node.props.type;
  const family = node.props.family;
  let classList = "";
  if (classesByType.global) {
    classList += classesByType.global + " ";
  }
  if (classesByType[`family:${family}`]) {
    classList += classesByType[`family:${family}`] + " ";
  }
  if (classesByType[type]) {
    classList += classesByType[type];
  }
  const listParts = classList.split("$reset");
  if (listParts.length > 1) {
    return `$reset ${listParts[listParts.length - 1].trim()}`;
  }
  return listParts[0].trim();
}
let documentStyles = void 0;
let documentThemeLinkTag = null;
let themeDidLoad;
let themeHasLoaded = false;
let themeWasRequested = false;
const themeLoaded = new Promise((res) => {
  themeDidLoad = () => {
    themeHasLoaded = true;
    res();
  };
});
const isClient = typeof window !== "undefined" && typeof fetch !== "undefined";
documentStyles = isClient ? getComputedStyle(document.documentElement) : void 0;
const iconRegistry = {};
const iconRequests = {};
function createThemePlugin(theme, icons, iconLoaderUrl, iconLoader) {
  if (icons) {
    Object.assign(iconRegistry, icons);
  }
  if (isClient && !themeWasRequested && (documentStyles === null || documentStyles === void 0 ? void 0 : documentStyles.getPropertyValue("--formkit-theme"))) {
    themeDidLoad();
    themeWasRequested = true;
  } else if (theme && !themeWasRequested && isClient) {
    loadTheme(theme);
  } else if (!themeWasRequested && isClient) {
    themeDidLoad();
  }
  const themePlugin = function themePlugin2(node) {
    var _a, _b;
    node.addProps(["iconLoader", "iconLoaderUrl"]);
    node.props.iconHandler = createIconHandler(((_a = node.props) === null || _a === void 0 ? void 0 : _a.iconLoader) ? node.props.iconLoader : iconLoader, ((_b = node.props) === null || _b === void 0 ? void 0 : _b.iconLoaderUrl) ? node.props.iconLoaderUrl : iconLoaderUrl);
    loadIconPropIcons(node, node.props.iconHandler);
    node.on("created", () => {
      var _a2;
      if ((_a2 = node === null || node === void 0 ? void 0 : node.context) === null || _a2 === void 0 ? void 0 : _a2.handlers) {
        node.context.handlers.iconClick = (sectionKey) => {
          const clickHandlerProp = `on${sectionKey.charAt(0).toUpperCase()}${sectionKey.slice(1)}IconClick`;
          const handlerFunction = node.props[clickHandlerProp];
          if (handlerFunction && typeof handlerFunction === "function") {
            return (e2) => {
              return handlerFunction(node, e2);
            };
          }
          return void 0;
        };
      }
    });
  };
  themePlugin.iconHandler = createIconHandler(iconLoader, iconLoaderUrl);
  return themePlugin;
}
function loadTheme(theme) {
  if (!theme || !isClient || typeof getComputedStyle !== "function") {
    return;
  }
  themeWasRequested = true;
  documentThemeLinkTag = document.getElementById("formkit-theme");
  if (theme && // if we have a window object
  isClient && // we don't have an existing theme OR the theme being set up is different
  (!(documentStyles === null || documentStyles === void 0 ? void 0 : documentStyles.getPropertyValue("--formkit-theme")) && !documentThemeLinkTag || (documentThemeLinkTag === null || documentThemeLinkTag === void 0 ? void 0 : documentThemeLinkTag.getAttribute("data-theme")) && (documentThemeLinkTag === null || documentThemeLinkTag === void 0 ? void 0 : documentThemeLinkTag.getAttribute("data-theme")) !== theme)) {
    const formkitVersion = FORMKIT_VERSION.startsWith("__") ? "latest" : FORMKIT_VERSION;
    const themeUrl = `https://cdn.jsdelivr.net/npm/@formkit/themes@${formkitVersion}/dist/${theme}/theme.css`;
    const link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.id = "formkit-theme";
    link.setAttribute("data-theme", theme);
    link.onload = () => {
      documentStyles = getComputedStyle(document.documentElement);
      themeDidLoad();
    };
    document.head.appendChild(link);
    link.href = themeUrl;
    if (documentThemeLinkTag) {
      documentThemeLinkTag.remove();
    }
  }
}
function createIconHandler(iconLoader, iconLoaderUrl) {
  return (iconName) => {
    if (typeof iconName === "boolean") {
      return;
    }
    if (iconName.startsWith("<svg")) {
      return iconName;
    }
    if (typeof iconName !== "string")
      return;
    const isDefault = iconName.startsWith("default:");
    iconName = isDefault ? iconName.split(":")[1] : iconName;
    const iconWasAlreadyLoaded = iconName in iconRegistry;
    let loadedIcon = void 0;
    if (iconWasAlreadyLoaded) {
      return iconRegistry[iconName];
    } else if (!iconRequests[iconName]) {
      loadedIcon = getIconFromStylesheet(iconName);
      loadedIcon = isClient && typeof loadedIcon === "undefined" ? Promise.resolve(loadedIcon) : loadedIcon;
      if (loadedIcon instanceof Promise) {
        iconRequests[iconName] = loadedIcon.then((iconValue) => {
          if (!iconValue && typeof iconName === "string" && !isDefault) {
            return loadedIcon = typeof iconLoader === "function" ? iconLoader(iconName) : getRemoteIcon(iconName, iconLoaderUrl);
          }
          return iconValue;
        }).then((finalIcon) => {
          if (typeof iconName === "string") {
            iconRegistry[isDefault ? `default:${iconName}` : iconName] = finalIcon;
          }
          return finalIcon;
        });
      } else if (typeof loadedIcon === "string") {
        iconRegistry[isDefault ? `default:${iconName}` : iconName] = loadedIcon;
        return loadedIcon;
      }
    }
    return iconRequests[iconName];
  };
}
function getIconFromStylesheet(iconName) {
  if (!isClient)
    return;
  if (themeHasLoaded) {
    return loadStylesheetIcon(iconName);
  } else {
    return themeLoaded.then(() => {
      return loadStylesheetIcon(iconName);
    });
  }
}
function loadStylesheetIcon(iconName) {
  const cssVarIcon = documentStyles === null || documentStyles === void 0 ? void 0 : documentStyles.getPropertyValue(`--fk-icon-${iconName}`);
  if (cssVarIcon) {
    const icon2 = atob(cssVarIcon);
    if (icon2.startsWith("<svg")) {
      iconRegistry[iconName] = icon2;
      return icon2;
    }
  }
  return void 0;
}
function getRemoteIcon(iconName, iconLoaderUrl) {
  const formkitVersion = FORMKIT_VERSION.startsWith("__") ? "latest" : FORMKIT_VERSION;
  const fetchUrl = typeof iconLoaderUrl === "function" ? iconLoaderUrl(iconName) : `https://cdn.jsdelivr.net/npm/@formkit/icons@${formkitVersion}/dist/icons/${iconName}.svg`;
  if (!isClient)
    return void 0;
  return fetch(`${fetchUrl}`).then(async (r2) => {
    const icon2 = await r2.text();
    if (icon2.startsWith("<svg")) {
      return icon2;
    }
    return void 0;
  }).catch((e2) => {
    console.error(e2);
    return void 0;
  });
}
function loadIconPropIcons(node, iconHandler) {
  const iconRegex = /^[a-zA-Z-]+(?:-icon|Icon)$/;
  const iconProps = Object.keys(node.props).filter((prop) => {
    return iconRegex.test(prop);
  });
  iconProps.forEach((sectionKey) => {
    return loadPropIcon(node, iconHandler, sectionKey);
  });
}
function loadPropIcon(node, iconHandler, sectionKey) {
  const iconName = node.props[sectionKey];
  const loadedIcon = iconHandler(iconName);
  const rawIconProp = `_raw${sectionKey.charAt(0).toUpperCase()}${sectionKey.slice(1)}`;
  const clickHandlerProp = `on${sectionKey.charAt(0).toUpperCase()}${sectionKey.slice(1)}Click`;
  node.addProps([rawIconProp, clickHandlerProp]);
  node.on(`prop:${sectionKey}`, reloadIcon);
  if (loadedIcon instanceof Promise) {
    return loadedIcon.then((svg) => {
      node.props[rawIconProp] = svg;
    });
  } else {
    node.props[rawIconProp] = loadedIcon;
  }
  return;
}
function reloadIcon(event) {
  var _a;
  const node = event.origin;
  const iconName = event.payload;
  const iconHandler = (_a = node === null || node === void 0 ? void 0 : node.props) === null || _a === void 0 ? void 0 : _a.iconHandler;
  const sectionKey = event.name.split(":")[1];
  const rawIconProp = `_raw${sectionKey.charAt(0).toUpperCase()}${sectionKey.slice(1)}`;
  if (iconHandler && typeof iconHandler === "function") {
    const loadedIcon = iconHandler(iconName);
    if (loadedIcon instanceof Promise) {
      return loadedIcon.then((svg) => {
        node.props[rawIconProp] = svg;
      });
    } else {
      node.props[rawIconProp] = loadedIcon;
    }
  }
}
let registered = false;
const errors = {
  /**
   * FormKit errors:
   */
  100: ({ data: node }) => `Only groups, lists, and forms can have children (${node.name}).`,
  101: ({ data: node }) => `You cannot directly modify the store (${node.name}). See: https://formkit.com/advanced/core#message-store`,
  102: ({ data: [node, property] }) => `You cannot directly assign node.${property} (${node.name})`,
  103: ({ data: [operator] }) => `Schema expressions cannot start with an operator (${operator})`,
  104: ({ data: [operator, expression] }) => `Schema expressions cannot end with an operator (${operator} in "${expression}")`,
  105: ({ data: expression }) => `Invalid schema expression: ${expression}`,
  106: ({ data: name }) => `Cannot submit because (${name}) is not in a form.`,
  107: ({ data: [node, value] }) => `Cannot set ${node.name} to non object value: ${value}`,
  108: ({ data: [node, value] }) => `Cannot set ${node.name} to non array value: ${value}`,
  /**
   * Input specific errors:
   */
  300: ({ data: [node] }) => `Cannot set behavior prop to overscroll (on ${node.name} input) when options prop is a function.`,
  /**
   * FormKit vue errors:
   */
  600: ({ data: node }) => `Unknown input type${typeof node.props.type === "string" ? ' "' + node.props.type + '"' : ""} ("${node.name}")`,
  601: ({ data: node }) => `Input definition${typeof node.props.type === "string" ? ' "' + node.props.type + '"' : ""} is missing a schema or component property (${node.name}).`
};
const warnings = {
  /**
   * Core warnings:
   */
  150: ({ data: fn }) => `Schema function "${fn}()" is not a valid function.`,
  151: ({ data: id }) => `No form element with id: ${id}`,
  152: ({ data: id }) => `No input element with id: ${id}`,
  /**
   * Input specific warnings:
   */
  350: ({ data: node }) => `Invalid options prop for radio input (${node.name}). See https://formkit.com/inputs/radio`,
  /**
   * Vue warnings:
   */
  650: 'Schema "$get()" must use the id of an input to access.',
  651: ({ data: id }) => `Cannot setErrors() on "${id}" because no such id exists.`,
  652: ({ data: id }) => `Cannot clearErrors() on "${id}" because no such id exists.`,
  /**
   * Deprecation warnings:
   */
  800: ({ data: name }) => `${name} is deprecated.`
};
const decodeErrors = (error2, next) => {
  if (error2.code in errors) {
    const err = errors[error2.code];
    error2.message = typeof err === "function" ? err(error2) : err;
  }
  return next(error2);
};
if (!registered)
  errorHandler(decodeErrors);
const decodeWarnings = (warning, next) => {
  if (warning.code in warnings) {
    const warn2 = warnings[warning.code];
    warning.message = typeof warn2 === "function" ? warn2(warning) : warn2;
  }
  return next(warning);
};
if (!registered)
  warningHandler(decodeWarnings);
registered = true;
const memo = {};
let instanceKey;
const instanceScopes = /* @__PURE__ */ new Map();
const raw = "__raw__";
const isClassProp = /[a-zA-Z0-9\-][cC]lass$/;
function getRef(token2, data) {
  const value = ref(null);
  if (token2 === "get") {
    const nodeRefs = {};
    value.value = get$1.bind(null, nodeRefs);
    return value;
  }
  const path = token2.split(".");
  watchEffect(() => {
    value.value = getValue(isRef(data) ? data.value : data, path);
  });
  return value;
}
function getValue(set2, path) {
  if (Array.isArray(set2)) {
    for (const subset of set2) {
      const value = subset !== false && getValue(subset, path);
      if (value !== void 0)
        return value;
    }
    return void 0;
  }
  let foundValue = void 0;
  let obj = set2;
  for (const i2 in path) {
    const key = path[i2];
    if (typeof obj !== "object" || obj === null) {
      foundValue = void 0;
      break;
    }
    const currentValue = obj[key];
    if (Number(i2) === path.length - 1 && currentValue !== void 0) {
      foundValue = typeof currentValue === "function" ? currentValue.bind(obj) : currentValue;
      break;
    }
    obj = currentValue;
  }
  return foundValue;
}
function get$1(nodeRefs, id) {
  if (typeof id !== "string")
    return warn(650);
  if (!(id in nodeRefs))
    nodeRefs[id] = ref(void 0);
  if (nodeRefs[id].value === void 0) {
    nodeRefs[id].value = null;
    const root = getNode$1(id);
    if (root)
      nodeRefs[id].value = root.context;
    watchRegistry(id, ({ payload: node }) => {
      nodeRefs[id].value = isNode(node) ? node.context : node;
    });
  }
  return nodeRefs[id].value;
}
function parseSchema(library, schema) {
  function parseCondition2(library2, node) {
    const condition = provider(compile(node.if), { if: true });
    const children = createElements(library2, node.then);
    const alternate = node.else ? createElements(library2, node.else) : null;
    return [condition, children, alternate];
  }
  function parseConditionAttr(attr, _default) {
    var _a, _b;
    const condition = provider(compile(attr.if));
    let b2 = () => _default;
    let a2 = () => _default;
    if (typeof attr.then === "object") {
      a2 = parseAttrs(attr.then, void 0);
    } else if (typeof attr.then === "string" && ((_a = attr.then) === null || _a === void 0 ? void 0 : _a.startsWith("$"))) {
      a2 = provider(compile(attr.then));
    } else {
      a2 = () => attr.then;
    }
    if (has(attr, "else")) {
      if (typeof attr.else === "object") {
        b2 = parseAttrs(attr.else);
      } else if (typeof attr.else === "string" && ((_b = attr.else) === null || _b === void 0 ? void 0 : _b.startsWith("$"))) {
        b2 = provider(compile(attr.else));
      } else {
        b2 = () => attr.else;
      }
    }
    return () => condition() ? a2() : b2();
  }
  function parseAttrs(unparsedAttrs, bindExp, _default = {}) {
    const explicitAttrs = new Set(Object.keys(unparsedAttrs || {}));
    const boundAttrs = bindExp ? provider(compile(bindExp)) : () => ({});
    const setters = [
      (attrs) => {
        const bound = boundAttrs();
        for (const attr in bound) {
          if (!explicitAttrs.has(attr)) {
            attrs[attr] = bound[attr];
          }
        }
      }
    ];
    if (unparsedAttrs) {
      if (isConditional(unparsedAttrs)) {
        const condition = parseConditionAttr(unparsedAttrs, _default);
        return condition;
      }
      for (let attr in unparsedAttrs) {
        const value = unparsedAttrs[attr];
        let getValue2;
        const isStr = typeof value === "string";
        if (attr.startsWith(raw)) {
          attr = attr.substring(7);
          getValue2 = () => value;
        } else if (isStr && value.startsWith("$") && value.length > 1 && !(value.startsWith("$reset") && isClassProp.test(attr))) {
          getValue2 = provider(compile(value));
        } else if (typeof value === "object" && isConditional(value)) {
          getValue2 = parseConditionAttr(value, void 0);
        } else if (typeof value === "object" && isPojo(value)) {
          getValue2 = parseAttrs(value);
        } else {
          getValue2 = () => value;
        }
        setters.push((attrs) => {
          attrs[attr] = getValue2();
        });
      }
    }
    return () => {
      const attrs = Array.isArray(unparsedAttrs) ? [] : {};
      setters.forEach((setter) => setter(attrs));
      return attrs;
    };
  }
  function parseNode(library2, _node) {
    let element = null;
    let attrs = () => null;
    let condition = false;
    let children = null;
    let alternate = null;
    let iterator = null;
    let resolve2 = false;
    const node = sugar(_node);
    if (isDOM(node)) {
      element = node.$el;
      attrs = node.$el !== "text" ? parseAttrs(node.attrs, node.bind) : () => null;
    } else if (isComponent$1(node)) {
      if (typeof node.$cmp === "string") {
        if (has(library2, node.$cmp)) {
          element = library2[node.$cmp];
        } else {
          element = node.$cmp;
          resolve2 = true;
        }
      } else {
        element = node.$cmp;
      }
      attrs = parseAttrs(node.props, node.bind);
    } else if (isConditional(node)) {
      [condition, children, alternate] = parseCondition2(library2, node);
    }
    if (!isConditional(node) && "if" in node) {
      condition = provider(compile(node.if));
    } else if (!isConditional(node) && element === null) {
      condition = () => true;
    }
    if ("children" in node && node.children) {
      if (typeof node.children === "string") {
        if (node.children.startsWith("$slots.")) {
          element = element === "text" ? "slot" : element;
          children = provider(compile(node.children));
        } else if (node.children.startsWith("$") && node.children.length > 1) {
          const value = provider(compile(node.children));
          children = () => String(value());
        } else {
          children = () => String(node.children);
        }
      } else if (Array.isArray(node.children)) {
        children = createElements(library2, node.children);
      } else {
        const [childCondition, c2, a2] = parseCondition2(library2, node.children);
        children = (iterationData) => childCondition && childCondition() ? c2 && c2(iterationData) : a2 && a2(iterationData);
      }
    }
    if (isComponent$1(node)) {
      if (children) {
        const produceChildren = children;
        children = (iterationData) => {
          return {
            default(slotData2, key) {
              var _a, _b, _c, _d;
              const currentKey = instanceKey;
              if (key)
                instanceKey = key;
              if (slotData2)
                (_a = instanceScopes.get(instanceKey)) === null || _a === void 0 ? void 0 : _a.unshift(slotData2);
              if (iterationData)
                (_b = instanceScopes.get(instanceKey)) === null || _b === void 0 ? void 0 : _b.unshift(iterationData);
              const c2 = produceChildren(iterationData);
              if (slotData2)
                (_c = instanceScopes.get(instanceKey)) === null || _c === void 0 ? void 0 : _c.shift();
              if (iterationData)
                (_d = instanceScopes.get(instanceKey)) === null || _d === void 0 ? void 0 : _d.shift();
              instanceKey = currentKey;
              return c2;
            }
          };
        };
        children.slot = true;
      } else {
        children = () => ({});
      }
    }
    if ("for" in node && node.for) {
      const values = node.for.length === 3 ? node.for[2] : node.for[1];
      const getValues = typeof values === "string" && values.startsWith("$") ? provider(compile(values)) : () => values;
      iterator = [
        getValues,
        node.for[0],
        node.for.length === 3 ? String(node.for[1]) : null
      ];
    }
    return [condition, element, attrs, children, alternate, iterator, resolve2];
  }
  function createSlots(children, iterationData) {
    const slots = children(iterationData);
    const currentKey = instanceKey;
    return Object.keys(slots).reduce((allSlots, slotName) => {
      const slotFn = slots && slots[slotName];
      allSlots[slotName] = (data) => {
        return slotFn && slotFn(data, currentKey) || null;
      };
      return allSlots;
    }, {});
  }
  function createElement(library2, node) {
    const [condition, element, attrs, children, alternate, iterator, resolve2] = parseNode(library2, node);
    let createNodes = (iterationData) => {
      if (condition && element === null && children) {
        return condition() ? children(iterationData) : alternate && alternate(iterationData);
      }
      if (element && (!condition || condition())) {
        if (element === "text" && children) {
          return createTextVNode(String(children()));
        }
        if (element === "slot" && children)
          return children(iterationData);
        const el = resolve2 ? resolveComponent(element) : element;
        const slots = (children === null || children === void 0 ? void 0 : children.slot) ? createSlots(children, iterationData) : null;
        return h$1(el, attrs(), slots || (children ? children(iterationData) : []));
      }
      return typeof alternate === "function" ? alternate(iterationData) : alternate;
    };
    if (iterator) {
      const repeatedNode = createNodes;
      const [getValues, valueName, keyName] = iterator;
      createNodes = () => {
        const _v = getValues();
        const values = !isNaN(_v) ? Array(Number(_v)).fill(0).map((_2, i2) => i2) : _v;
        const fragment2 = [];
        if (typeof values !== "object")
          return null;
        const instanceScope = instanceScopes.get(instanceKey) || [];
        const isArray2 = Array.isArray(values);
        for (const key in values) {
          if (isArray2 && key in Array.prototype)
            continue;
          const iterationData = Object.defineProperty({
            ...instanceScope.reduce((previousIterationData, scopedData) => {
              if (previousIterationData.__idata) {
                return { ...previousIterationData, ...scopedData };
              }
              return scopedData;
            }, {}),
            [valueName]: values[key],
            ...keyName !== null ? { [keyName]: isArray2 ? Number(key) : key } : {}
          }, "__idata", { enumerable: false, value: true });
          instanceScope.unshift(iterationData);
          fragment2.push(repeatedNode.bind(null, iterationData)());
          instanceScope.shift();
        }
        return fragment2;
      };
    }
    return createNodes;
  }
  function createElements(library2, schema2) {
    if (Array.isArray(schema2)) {
      const els = schema2.map(createElement.bind(null, library2));
      return (iterationData) => els.map((element2) => element2(iterationData));
    }
    const element = createElement(library2, schema2);
    return (iterationData) => element(iterationData);
  }
  const providers = [];
  function provider(compiled, hints = {}) {
    const compiledFns = {};
    providers.push((callback, key) => {
      compiledFns[key] = compiled.provide((tokens) => callback(tokens, hints));
    });
    return () => compiledFns[instanceKey]();
  }
  return function createInstance(providerCallback, key) {
    const memoKey = JSON.stringify(schema);
    const [render, compiledProviders] = has(memo, memoKey) ? memo[memoKey] : [createElements(library, schema), providers];
    memo[memoKey] = [render, compiledProviders];
    compiledProviders.forEach((compiledProvider) => {
      compiledProvider(providerCallback, key);
    });
    return () => {
      instanceKey = key;
      return render();
    };
  };
}
function useScope(token2, defaultValue) {
  const scopedData = instanceScopes.get(instanceKey) || [];
  let scopedValue = void 0;
  if (scopedData.length) {
    scopedValue = getValue(scopedData, token2.split("."));
  }
  return scopedValue === void 0 ? defaultValue : scopedValue;
}
function slotData(data, key) {
  return new Proxy(data, {
    get(...args) {
      let data2 = void 0;
      const property = args[1];
      if (typeof property === "string") {
        const prevKey = instanceKey;
        instanceKey = key;
        data2 = useScope(property, void 0);
        instanceKey = prevKey;
      }
      return data2 !== void 0 ? data2 : Reflect.get(...args);
    }
  });
}
function createRenderFn(instanceCreator, data, instanceKey2) {
  return instanceCreator((requirements, hints = {}) => {
    return requirements.reduce((tokens, token2) => {
      if (token2.startsWith("slots.")) {
        const slot = token2.substring(6);
        const hasSlot = () => data.slots && has(data.slots, slot) && typeof data.slots[slot] === "function";
        if (hints.if) {
          tokens[token2] = hasSlot;
        } else if (data.slots) {
          const scopedData = slotData(data, instanceKey2);
          tokens[token2] = () => hasSlot() ? data.slots[slot](scopedData) : null;
        }
      } else {
        const value = getRef(token2, data);
        tokens[token2] = () => useScope(token2, value.value);
      }
      return tokens;
    }, {});
  }, instanceKey2);
}
let i$3 = 0;
const FormKitSchema = /* @__PURE__ */ defineComponent({
  name: "FormKitSchema",
  props: {
    schema: {
      type: [Array, Object],
      required: true
    },
    data: {
      type: Object,
      default: () => ({})
    },
    library: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props2, context) {
    const instance = getCurrentInstance();
    let instanceKey2 = Symbol(String(i$3++));
    instanceScopes.set(instanceKey2, []);
    let provider = parseSchema(props2.library, props2.schema);
    let render;
    let data;
    watch$1(() => props2.schema, (newSchema, oldSchema) => {
      var _a;
      instanceKey2 = Symbol(String(i$3++));
      provider = parseSchema(props2.library, props2.schema);
      render = createRenderFn(provider, data, instanceKey2);
      if (newSchema === oldSchema) {
        ((_a = instance === null || instance === void 0 ? void 0 : instance.proxy) === null || _a === void 0 ? void 0 : _a.$forceUpdate)();
      }
    }, { deep: true });
    watchEffect(() => {
      data = Object.assign(reactive(props2.data), {
        slots: context.slots
      });
      render = createRenderFn(provider, data, instanceKey2);
    });
    return () => render();
  }
});
const nativeProps = {
  config: {
    type: Object,
    default: {}
  },
  classes: {
    type: Object,
    required: false
  },
  delay: {
    type: Number,
    required: false
  },
  errors: {
    type: Array,
    default: []
  },
  inputErrors: {
    type: Object,
    default: () => ({})
  },
  index: {
    type: Number,
    required: false
  },
  id: {
    type: String,
    required: false
  },
  modelValue: {
    required: false
  },
  name: {
    type: String,
    required: false
  },
  parent: {
    type: Object,
    required: false
  },
  plugins: {
    type: Array,
    default: []
  },
  sectionsSchema: {
    type: Object,
    default: {}
  },
  type: {
    type: [String, Object],
    default: "text"
  },
  validation: {
    type: [String, Array],
    required: false
  },
  validationMessages: {
    type: Object,
    required: false
  },
  validationRules: {
    type: Object,
    required: false
  },
  validationLabel: {
    type: [String, Function],
    required: false
  }
};
const props = nativeProps;
const parentSymbol = Symbol("FormKitParent");
const FormKit = /* @__PURE__ */ defineComponent({
  props,
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    input: (_value, _node) => true,
    inputRaw: (_value, _node) => true,
    "update:modelValue": (_value) => true,
    node: (node) => !!node,
    submit: (_data, _node) => true,
    submitRaw: (_event, _node) => true,
    submitInvalid: (_node) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  inheritAttrs: false,
  setup(props2, context) {
    const node = useInput(props2, context);
    if (!node.props.definition)
      error(600, node);
    if (node.props.definition.component) {
      return () => {
        var _a;
        return h$1((_a = node.props.definition) === null || _a === void 0 ? void 0 : _a.component, {
          context: node.context
        }, { ...context.slots });
      };
    }
    const schema = ref([]);
    const generateSchema = () => {
      var _a, _b;
      const schemaDefinition = (_b = (_a = node.props) === null || _a === void 0 ? void 0 : _a.definition) === null || _b === void 0 ? void 0 : _b.schema;
      if (!schemaDefinition)
        error(601, node);
      schema.value = typeof schemaDefinition === "function" ? schemaDefinition({ ...props2.sectionsSchema }) : schemaDefinition;
    };
    generateSchema();
    node.on("schema", generateSchema);
    context.emit("node", node);
    const library = node.props.definition.library;
    context.expose({ node });
    return () => h$1(FormKitSchema, { schema: schema.value, data: node.context, library }, { ...context.slots });
  }
});
function createPlugin(app, options2) {
  app.component(options2.alias || "FormKit", FormKit).component(options2.schemaAlias || "FormKitSchema", FormKitSchema);
  return {
    get: getNode$1,
    setLocale: (locale) => {
      var _a;
      if ((_a = options2.config) === null || _a === void 0 ? void 0 : _a.rootConfig) {
        options2.config.rootConfig.locale = locale;
      }
    },
    clearErrors,
    setErrors,
    submit: submitForm,
    reset
  };
}
const optionsSymbol = Symbol.for("FormKitOptions");
const configSymbol = Symbol.for("FormKitConfig");
const plugin = {
  install(app, _options) {
    const options2 = Object.assign({
      alias: "FormKit",
      schemaAlias: "FormKitSchema"
    }, typeof _options === "function" ? _options() : _options);
    const rootConfig = createConfig$1(options2.config || {});
    options2.config = { rootConfig };
    app.config.globalProperties.$formkit = createPlugin(app, options2);
    app.provide(optionsSymbol, options2);
    app.provide(configSymbol, rootConfig);
  }
};
const invalidGet = Symbol();
function watchVerbose(obj, callback) {
  const watchers = {};
  const applyWatch = (paths) => {
    for (const path of paths) {
      if (path.__str in watchers)
        watchers[path.__str]();
      watchers[path.__str] = watch$1(touch.bind(null, obj, path), dispatcher.bind(null, path), { deep: false });
    }
  };
  const clearWatch = (path) => {
    if (!path.length)
      return;
    for (const key in watchers) {
      if (`${key}`.startsWith(`${path.__str}.`)) {
        watchers[key]();
        delete watchers[key];
      }
    }
  };
  const dispatcher = createDispatcher(obj, callback, applyWatch, clearWatch);
  applyWatch(getPaths(obj));
}
function createDispatcher(obj, callback, applyWatch, clearChildWatches) {
  return (path) => {
    const value = get(obj, path);
    if (value === invalidGet)
      return;
    if (path.__deep)
      clearChildWatches(path);
    if (typeof value === "object")
      applyWatch(getPaths(value, [path], ...path));
    callback(path, value, obj);
  };
}
function touch(obj, path) {
  const value = get(obj, path);
  return value && typeof value === "object" ? Object.keys(value) : value;
}
function get(obj, path) {
  if (isRef(obj)) {
    if (path.length === 0)
      return obj.value;
    obj = obj.value;
  }
  return path.reduce((value, segment) => {
    if (value === invalidGet)
      return value;
    if (value === null || typeof value !== "object") {
      return invalidGet;
    }
    return value[segment];
  }, obj);
}
function getPaths(obj, paths = [], ...parents) {
  if (obj === null)
    return paths;
  if (!parents.length) {
    const path = Object.defineProperty([], "__str", {
      value: ""
    });
    obj = isRef(obj) ? obj.value : obj;
    if (obj && typeof obj === "object") {
      Object.defineProperty(path, "__deep", { value: true });
      paths.push(path);
    } else {
      return [path];
    }
  }
  if (obj === null || typeof obj !== "object")
    return paths;
  for (const key in obj) {
    const path = parents.concat(key);
    Object.defineProperty(path, "__str", { value: path.join(".") });
    const value = obj[key];
    if (isPojo(value) || Array.isArray(value)) {
      paths.push(Object.defineProperty(path, "__deep", { value: true }));
      paths = paths.concat(getPaths(value, [], ...path));
    } else {
      paths.push(path);
    }
  }
  return paths;
}
function useRaw(obj) {
  if (obj === null || typeof obj !== "object")
    return obj;
  if (isReactive(obj)) {
    obj = toRaw(obj);
  } else if (isRef(obj)) {
    obj = isReactive(obj.value) ? useRaw(obj.value) : obj.value;
  }
  return obj;
}
const pseudoProps = [
  "help",
  "label",
  "ignore",
  "disabled",
  "preserve",
  /^preserve(-e|E)rrors/,
  /^[a-z]+(?:-visibility|Visibility|-behavior|Behavior)$/,
  /^[a-zA-Z-]+(?:-class|Class)$/,
  "prefixIcon",
  "suffixIcon",
  /^[a-zA-Z-]+(?:-icon|Icon)$/
];
function classesToNodeProps(node, props2) {
  if (props2.classes) {
    Object.keys(props2.classes).forEach((key) => {
      if (typeof key === "string") {
        node.props[`_${key}Class`] = props2.classes[key];
        if (isObject(props2.classes[key]) && key === "inner")
          Object.values(props2.classes[key]);
      }
    });
  }
}
function onlyListeners(props2) {
  if (!props2)
    return {};
  const knownListeners = ["Submit", "SubmitRaw", "SubmitInvalid"].reduce((listeners, listener) => {
    const name = `on${listener}`;
    if (name in props2) {
      if (typeof props2[name] === "function") {
        listeners[name] = props2[name];
      }
    }
    return listeners;
  }, {});
  return knownListeners;
}
function useInput(props2, context, options2 = {}) {
  var _a;
  const config2 = Object.assign({}, inject(optionsSymbol) || {}, options2);
  const instance = getCurrentInstance();
  const listeners = onlyListeners(instance === null || instance === void 0 ? void 0 : instance.vnode.props);
  const isVModeled = "modelValue" in ((_a = instance === null || instance === void 0 ? void 0 : instance.vnode.props) !== null && _a !== void 0 ? _a : {});
  const value = props2.modelValue !== void 0 ? props2.modelValue : cloneAny(context.attrs.value);
  function createInitialProps() {
    const initialProps2 = {
      ...nodeProps(props2),
      ...listeners
    };
    const attrs = except(nodeProps(context.attrs), pseudoProps);
    if (!attrs.key)
      attrs.key = token();
    initialProps2.attrs = attrs;
    const propValues = only(nodeProps(context.attrs), pseudoProps);
    for (const propName in propValues) {
      initialProps2[camel(propName)] = propValues[propName];
    }
    const classesProps = { props: {} };
    classesToNodeProps(classesProps, props2);
    Object.assign(initialProps2, classesProps.props);
    if (typeof initialProps2.type !== "string") {
      initialProps2.definition = initialProps2.type;
      delete initialProps2.type;
    }
    return initialProps2;
  }
  const initialProps = createInitialProps();
  const parent = initialProps.ignore ? null : props2.parent || inject(parentSymbol, null);
  const node = createNode(extend(config2 || {}, {
    name: props2.name || void 0,
    value,
    parent,
    plugins: (config2.plugins || []).concat(props2.plugins),
    config: props2.config,
    props: initialProps,
    index: props2.index
  }, false, true));
  if (!node.props.definition)
    error(600, node);
  const lateBoundProps = ref(new Set(node.props.definition.props || []));
  node.on("added-props", ({ payload: lateProps }) => {
    if (Array.isArray(lateProps))
      lateProps.forEach((newProp) => lateBoundProps.value.add(newProp));
  });
  const pseudoPropNames = computed(() => pseudoProps.concat([...lateBoundProps.value]).reduce((names, prop) => {
    if (typeof prop === "string") {
      names.push(camel(prop));
      names.push(kebab(prop));
    } else {
      names.push(prop);
    }
    return names;
  }, []));
  watchEffect(() => classesToNodeProps(node, props2));
  const passThrough = nodeProps(props2);
  for (const prop in passThrough) {
    watch$1(() => props2[prop], () => {
      if (props2[prop] !== void 0) {
        node.props[prop] = props2[prop];
      }
    });
  }
  const attributeWatchers = /* @__PURE__ */ new Set();
  const possibleProps = nodeProps(context.attrs);
  watchEffect(() => {
    watchAttributes(only(possibleProps, pseudoPropNames.value));
  });
  function watchAttributes(attrProps) {
    attributeWatchers.forEach((stop) => {
      stop();
      attributeWatchers.delete(stop);
    });
    for (const prop in attrProps) {
      const camelName = camel(prop);
      attributeWatchers.add(watch$1(() => context.attrs[prop], () => {
        node.props[camelName] = context.attrs[prop];
      }));
    }
  }
  watchEffect(() => {
    const attrs = except(nodeProps(context.attrs), pseudoPropNames.value);
    if ("multiple" in attrs)
      attrs.multiple = undefine(attrs.multiple);
    node.props.attrs = Object.assign({}, node.props.attrs || {}, attrs);
  });
  watchEffect(() => {
    const messages2 = props2.errors.map((error2) => createMessage({
      key: slugify(error2),
      type: "error",
      value: error2,
      meta: { source: "prop" }
    }));
    node.store.apply(messages2, (message2) => message2.type === "error" && message2.meta.source === "prop");
  });
  if (node.type !== "input") {
    const sourceKey = `${node.name}-prop`;
    watchEffect(() => {
      const keys = Object.keys(props2.inputErrors);
      if (!keys.length)
        node.clearErrors(true, sourceKey);
      const messages2 = keys.reduce((messages3, key) => {
        let value2 = props2.inputErrors[key];
        if (typeof value2 === "string")
          value2 = [value2];
        if (Array.isArray(value2)) {
          messages3[key] = value2.map((error2) => createMessage({
            key: error2,
            type: "error",
            value: error2,
            meta: { source: sourceKey }
          }));
        }
        return messages3;
      }, {});
      node.store.apply(messages2, (message2) => message2.type === "error" && message2.meta.source === sourceKey);
    });
  }
  watchEffect(() => Object.assign(node.config, props2.config));
  if (node.type !== "input") {
    provide(parentSymbol, node);
  }
  let inputTimeout;
  const mutex = /* @__PURE__ */ new WeakSet();
  node.on("modelUpdated", () => {
    var _a2, _b;
    context.emit("inputRaw", (_a2 = node.context) === null || _a2 === void 0 ? void 0 : _a2.value, node);
    clearTimeout(inputTimeout);
    inputTimeout = setTimeout(context.emit, 20, "input", (_b = node.context) === null || _b === void 0 ? void 0 : _b.value, node);
    if (isVModeled && node.context) {
      const newValue = useRaw(node.context.value);
      if (isObject(newValue) && useRaw(props2.modelValue) !== newValue) {
        mutex.add(newValue);
      }
      context.emit("update:modelValue", newValue);
    }
  });
  if (isVModeled) {
    watchVerbose(toRef(props2, "modelValue"), (path, value2) => {
      var _a2;
      const rawValue = useRaw(value2);
      if (isObject(rawValue) && mutex.has(rawValue)) {
        return mutex.delete(rawValue);
      }
      if (!path.length)
        node.input(value2, false);
      else
        (_a2 = node.at(path)) === null || _a2 === void 0 ? void 0 : _a2.input(value2, false);
    });
    if (node.value !== value) {
      node.emit("modelUpdated");
    }
  }
  onBeforeUnmount(() => node.destroy());
  return node;
}
let totalCreated = 1;
function isComponent(obj) {
  return typeof obj === "function" && obj.length === 2 || typeof obj === "object" && !Array.isArray(obj) && !("$el" in obj) && !("$cmp" in obj) && !("if" in obj);
}
function createInput(schemaOrComponent, definitionOptions = {}) {
  const definition = {
    type: "input",
    ...definitionOptions
  };
  let schema;
  if (isComponent(schemaOrComponent)) {
    const cmpName = `SchemaComponent${totalCreated++}`;
    schema = createSection("input", () => ({
      $cmp: cmpName,
      props: {
        context: "$node.context"
      }
    }));
    definition.library = { [cmpName]: markRaw(schemaOrComponent) };
  } else if (typeof schemaOrComponent === "function") {
    schema = schemaOrComponent;
  } else {
    schema = createSection("input", () => cloneAny(schemaOrComponent));
  }
  definition.schema = useSchema(schema || "Schema undefined");
  return definition;
}
const messages = createSection("messages", () => ({
  $el: "ul",
  if: "$fns.length($messages)"
}), true);
const message = createSection("message", () => ({
  $el: "li",
  for: ["message", "$messages"],
  attrs: {
    key: "$message.key",
    id: `$id + '-' + $message.key`,
    "data-message-type": "$message.type"
  }
}));
messages(message("$message.value"));
const vueBindings = function vueBindings2(node) {
  node.ledger.count("blocking", (m2) => m2.blocking);
  const isValid = ref(!node.ledger.value("blocking"));
  node.ledger.count("errors", (m2) => m2.type === "error");
  const hasErrors = ref(!!node.ledger.value("errors"));
  let hasTicked = false;
  nextTick(() => {
    hasTicked = true;
  });
  const availableMessages = reactive(node.store.reduce((store, message2) => {
    if (message2.visible) {
      store[message2.key] = message2;
    }
    return store;
  }, {}));
  const validationVisibility = ref(node.props.validationVisibility || "blur");
  node.on("prop:validationVisibility", ({ payload }) => {
    validationVisibility.value = payload;
  });
  const hasShownErrors = ref(validationVisibility.value === "live");
  const validationVisible = computed(() => {
    if (context.state.submitted)
      return true;
    if (!hasShownErrors.value && !context.state.settled) {
      return false;
    }
    switch (validationVisibility.value) {
      case "live":
        return true;
      case "blur":
        return context.state.blurred;
      case "dirty":
        return context.state.dirty;
      default:
        return false;
    }
  });
  const isComplete = computed(() => {
    return hasValidation.value ? isValid.value && !hasErrors.value : context.state.dirty && !empty(context.value);
  });
  const hasValidation = ref(Array.isArray(node.props.parsedRules) && node.props.parsedRules.length > 0);
  node.on("prop:parsedRules", ({ payload: rules }) => {
    hasValidation.value = Array.isArray(rules) && rules.length > 0;
  });
  const messages2 = computed(() => {
    const visibleMessages = {};
    for (const key in availableMessages) {
      const message2 = availableMessages[key];
      if (message2.type !== "validation" || validationVisible.value) {
        visibleMessages[key] = message2;
      }
    }
    return visibleMessages;
  });
  const ui = reactive(node.store.reduce((messages3, message2) => {
    if (message2.type === "ui" && message2.visible)
      messages3[message2.key] = message2;
    return messages3;
  }, {}));
  const cachedClasses = reactive({});
  const classes = new Proxy(cachedClasses, {
    get(...args) {
      const [target, property] = args;
      let className = Reflect.get(...args);
      if (!className && typeof property === "string") {
        if (!has(target, property) && !property.startsWith("__v")) {
          const observedNode = createObserver(node);
          observedNode.watch((node2) => {
            const rootClasses = typeof node2.config.rootClasses === "function" ? node2.config.rootClasses(property, node2) : {};
            const globalConfigClasses = node2.config.classes ? createClasses(property, node2, node2.config.classes[property]) : {};
            const classesPropClasses = createClasses(property, node2, node2.props[`_${property}Class`]);
            const sectionPropClasses = createClasses(property, node2, node2.props[`${property}Class`]);
            className = generateClassList(node2, property, rootClasses, globalConfigClasses, classesPropClasses, sectionPropClasses);
            target[property] = className !== null && className !== void 0 ? className : "";
          });
        }
      }
      return className;
    }
  });
  const describedBy = computed(() => {
    const describers = [];
    if (context.help) {
      describers.push(`help-${node.props.id}`);
    }
    for (const key in messages2.value) {
      describers.push(`${node.props.id}-${key}`);
    }
    return describers.length ? describers.join(" ") : void 0;
  });
  const value = ref(node.value);
  const _value = ref(node.value);
  const context = reactive({
    _value,
    attrs: node.props.attrs,
    disabled: node.props.disabled,
    describedBy,
    fns: {
      length: (obj) => Object.keys(obj).length,
      number: (value2) => Number(value2),
      string: (value2) => String(value2),
      json: (value2) => JSON.stringify(value2),
      eq
    },
    handlers: {
      blur: (e2) => {
        node.store.set(createMessage({ key: "blurred", visible: false, value: true }));
        if (typeof node.props.attrs.onBlur === "function") {
          node.props.attrs.onBlur(e2);
        }
      },
      touch: () => {
        var _a;
        const doCompare = context.dirtyBehavior === "compare";
        if (((_a = node.store.dirty) === null || _a === void 0 ? void 0 : _a.value) && !doCompare)
          return;
        const isDirty = !eq(node.props._init, node._value);
        if (!isDirty && !doCompare)
          return;
        node.store.set(createMessage({ key: "dirty", visible: false, value: isDirty }));
      },
      DOMInput: (e2) => {
        node.input(e2.target.value);
        node.emit("dom-input-event", e2);
      }
    },
    help: node.props.help,
    id: node.props.id,
    label: node.props.label,
    messages: messages2,
    node: markRaw(node),
    options: node.props.options,
    defaultMessagePlacement: true,
    state: {
      blurred: false,
      complete: isComplete,
      dirty: false,
      submitted: false,
      settled: node.isSettled,
      valid: isValid,
      errors: hasErrors,
      rules: hasValidation,
      validationVisible
    },
    type: node.props.type,
    family: node.props.family,
    ui,
    value,
    classes
  });
  node.on("created", () => {
    if (!eq(context.value, node.value)) {
      _value.value = node.value;
      value.value = node.value;
      triggerRef(value);
      triggerRef(_value);
    }
    (async () => {
      await node.settled;
      node.props._init = cloneAny(node.value);
    })();
  });
  node.on("settled", ({ payload: isSettled }) => {
    context.state.settled = isSettled;
  });
  function observeProps(observe) {
    observe.forEach((prop) => {
      prop = camel(prop);
      if (!has(context, prop) && has(node.props, prop)) {
        context[prop] = node.props[prop];
      }
      node.on(`prop:${prop}`, ({ payload }) => {
        context[prop] = payload;
      });
    });
  }
  const rootProps = () => {
    const props2 = [
      "help",
      "label",
      "disabled",
      "options",
      "type",
      "attrs",
      "preserve",
      "preserveErrors",
      "id",
      "dirtyBehavior"
    ];
    const iconPattern = /^[a-zA-Z-]+(?:-icon|Icon)$/;
    const matchingProps = Object.keys(node.props).filter((prop) => {
      return iconPattern.test(prop);
    });
    return props2.concat(matchingProps);
  };
  observeProps(rootProps());
  function definedAs(definition) {
    if (definition.props)
      observeProps(definition.props);
  }
  node.props.definition && definedAs(node.props.definition);
  node.on("added-props", ({ payload }) => observeProps(payload));
  node.on("input", ({ payload }) => {
    if (node.type !== "input" && !isRef(payload) && !isReactive(payload)) {
      _value.value = shallowClone(payload);
    } else {
      _value.value = payload;
      triggerRef(_value);
    }
  });
  node.on("commit", ({ payload }) => {
    if (node.type !== "input" && !isRef(payload) && !isReactive(payload)) {
      value.value = _value.value = shallowClone(payload);
    } else {
      value.value = _value.value = payload;
      triggerRef(value);
    }
    node.emit("modelUpdated");
    if ((!context.state.dirty || context.dirtyBehavior === "compare") && node.isCreated && hasTicked) {
      context.handlers.touch();
    }
    if (isComplete && node.type === "input" && hasErrors.value && !undefine(node.props.preserveErrors)) {
      node.store.filter((message2) => {
        var _a;
        return !(message2.type === "error" && ((_a = message2.meta) === null || _a === void 0 ? void 0 : _a.autoClear) === true);
      });
    }
  });
  const updateState = async (message2) => {
    if (message2.type === "ui" && message2.visible && !message2.meta.showAsMessage) {
      ui[message2.key] = message2;
    } else if (message2.visible) {
      availableMessages[message2.key] = message2;
    } else if (message2.type === "state") {
      context.state[message2.key] = !!message2.value;
    }
  };
  node.on("message-added", (e2) => updateState(e2.payload));
  node.on("message-updated", (e2) => updateState(e2.payload));
  node.on("message-removed", ({ payload: message2 }) => {
    delete ui[message2.key];
    delete availableMessages[message2.key];
    delete context.state[message2.key];
  });
  node.on("settled:blocking", () => {
    isValid.value = true;
  });
  node.on("unsettled:blocking", () => {
    isValid.value = false;
  });
  node.on("settled:errors", () => {
    hasErrors.value = false;
  });
  node.on("unsettled:errors", () => {
    hasErrors.value = true;
  });
  watch$1(validationVisible, (value2) => {
    if (value2) {
      hasShownErrors.value = true;
    }
  });
  node.context = context;
  node.emit("context", node, false);
};
const defaultConfig = (options2 = {}) => {
  const { rules = {}, locales = {}, inputs: inputs$1 = {}, messages: messages2 = {}, locale = void 0, theme = void 0, iconLoaderUrl = void 0, iconLoader = void 0, icons = {}, ...nodeOptions } = options2;
  const validation = createValidationPlugin({
    ...defaultRules,
    ...rules || {}
  });
  const i18n = createI18nPlugin(extend({ en, ...locales || {} }, messages2));
  const library = createLibraryPlugin(index, inputs$1);
  const themePlugin = createThemePlugin(theme, icons, iconLoaderUrl, iconLoader);
  return extend({
    plugins: [library, themePlugin, vueBindings, i18n, validation],
    ...!locale ? {} : { config: { locale } }
  }, nodeOptions || {}, true);
};
const button = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: outer(
    messages$1(message$1("$message.value")),
    wrapper(
      buttonInput(
        icon("prefix"),
        prefix(),
        buttonLabel("$label || $ui.submit.value"),
        suffix(),
        icon("suffix")
      )
    ),
    help("$help")
  ),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "input",
  /**
   * The family of inputs this one belongs too. For example "text" and "email"
   * are both part of the "text" family. This is primary used for styling.
   */
  family: "button",
  /**
   * An array of extra props to accept for this input.
   */
  props: [],
  /**
   * Forces node.props.type to be this explicit value.
   */
  forceTypeProp: "button",
  /**
   * Additional features that should be added to your input
   */
  features: [localize("submit"), ignore]
};
const numberSuffix = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: outer(
    wrapper(
      label("$label"),
      inner(
        icon("prefix", "label"),
        prefix(),
        textInput(),
        () => ({
          $el: "div",
          attrs: {
            class: "$classes.suffix"
          },
          children: ["$suffix"]
        }),
        icon("suffix")
      )
    ),
    help("$help"),
    messages$1(message$1("$message.value"))
  ),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "input",
  /**
   * The family of inputs this one belongs too. For example "text" and "email"
   * are both part of the "text" family. This is primary used for styling.
   */
  family: "text",
  /**
   * An array of extra props to accept for this input.
   */
  props: ["suffix"],
  /**
   * Forces node.props.type to be this explicit value.
   */
  forceTypeProp: "number",
  /**
   * Additional features that should be added to your input
   */
  features: []
};
const textSuffix = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: outer(
    wrapper(
      label("$label"),
      inner(
        icon("prefix", "label"),
        prefix(),
        textInput(),
        () => ({
          $el: "div",
          attrs: {
            class: "$classes.suffix"
          },
          children: ["$suffix"]
        }),
        icon("suffix")
      )
    ),
    help("$help"),
    messages$1(message$1("$message.value"))
  ),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "input",
  /**
   * The family of inputs this one belongs too. For example "text" and "email"
   * are both part of the "text" family. This is primary used for styling.
   */
  family: "text",
  /**
   * An array of extra props to accept for this input.
   */
  props: ["suffix"],
  /**
   * Forces node.props.type to be this explicit value.
   */
  forceTypeProp: "text",
  /**
   * Additional features that should be added to your input
   */
  features: []
};
function u$4(r2, n2, ...a2) {
  if (r2 in n2) {
    let e2 = n2[r2];
    return typeof e2 == "function" ? e2(...a2) : e2;
  }
  let t2 = new Error(`Tried to handle "${r2}" but there is no handler defined. Only defined handlers are: ${Object.keys(n2).map((e2) => `"${e2}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(t2, u$4), t2;
}
var N$4 = ((o2) => (o2[o2.None = 0] = "None", o2[o2.RenderStrategy = 1] = "RenderStrategy", o2[o2.Static = 2] = "Static", o2))(N$4 || {}), S$3 = ((e2) => (e2[e2.Unmount = 0] = "Unmount", e2[e2.Hidden = 1] = "Hidden", e2))(S$3 || {});
function H$3({ visible: r2 = true, features: t2 = 0, ourProps: e2, theirProps: o2, ...i2 }) {
  var a2;
  let n2 = j$4(o2, e2), l2 = Object.assign(i2, { props: n2 });
  if (r2 || t2 & 2 && n2.static)
    return y$2(l2);
  if (t2 & 1) {
    let d2 = (a2 = n2.unmount) == null || a2 ? 0 : 1;
    return u$4(d2, { [0]() {
      return null;
    }, [1]() {
      return y$2({ ...i2, props: { ...n2, hidden: true, style: { display: "none" } } });
    } });
  }
  return y$2(l2);
}
function y$2({ props: r2, attrs: t2, slots: e2, slot: o2, name: i2 }) {
  var m2, h2;
  let { as: n2, ...l2 } = T$2(r2, ["unmount", "static"]), a2 = (m2 = e2.default) == null ? void 0 : m2.call(e2, o2), d2 = {};
  if (o2) {
    let u2 = false, c2 = [];
    for (let [p2, f2] of Object.entries(o2))
      typeof f2 == "boolean" && (u2 = true), f2 === true && c2.push(p2);
    u2 && (d2["data-headlessui-state"] = c2.join(" "));
  }
  if (n2 === "template") {
    if (a2 = b$2(a2 != null ? a2 : []), Object.keys(l2).length > 0 || Object.keys(t2).length > 0) {
      let [u2, ...c2] = a2 != null ? a2 : [];
      if (!v$2(u2) || c2.length > 0)
        throw new Error(['Passing props on "template"!', "", `The current component <${i2} /> is rendering a "template".`, "However we need to passthrough the following props:", Object.keys(l2).concat(Object.keys(t2)).map((s3) => s3.trim()).filter((s3, g2, R2) => R2.indexOf(s3) === g2).sort((s3, g2) => s3.localeCompare(g2)).map((s3) => `  - ${s3}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".', "Render a single element as the child so that we can forward the props onto that element."].map((s3) => `  - ${s3}`).join(`
`)].join(`
`));
      let p2 = j$4((h2 = u2.props) != null ? h2 : {}, l2), f2 = cloneVNode(u2, p2);
      for (let s3 in p2)
        s3.startsWith("on") && (f2.props || (f2.props = {}), f2.props[s3] = p2[s3]);
      return f2;
    }
    return Array.isArray(a2) && a2.length === 1 ? a2[0] : a2;
  }
  return h$1(n2, Object.assign({}, l2, d2), { default: () => a2 });
}
function b$2(r2) {
  return r2.flatMap((t2) => t2.type === Fragment$1 ? b$2(t2.children) : [t2]);
}
function j$4(...r2) {
  if (r2.length === 0)
    return {};
  if (r2.length === 1)
    return r2[0];
  let t2 = {}, e2 = {};
  for (let i2 of r2)
    for (let n2 in i2)
      n2.startsWith("on") && typeof i2[n2] == "function" ? (e2[n2] != null || (e2[n2] = []), e2[n2].push(i2[n2])) : t2[n2] = i2[n2];
  if (t2.disabled || t2["aria-disabled"])
    return Object.assign(t2, Object.fromEntries(Object.keys(e2).map((i2) => [i2, void 0])));
  for (let i2 in e2)
    Object.assign(t2, { [i2](n2, ...l2) {
      let a2 = e2[i2];
      for (let d2 of a2) {
        if (n2 instanceof Event && n2.defaultPrevented)
          return;
        d2(n2, ...l2);
      }
    } });
  return t2;
}
function K$1(r2) {
  let t2 = Object.assign({}, r2);
  for (let e2 in t2)
    t2[e2] === void 0 && delete t2[e2];
  return t2;
}
function T$2(r2, t2 = []) {
  let e2 = Object.assign({}, r2);
  for (let o2 of t2)
    o2 in e2 && delete e2[o2];
  return e2;
}
function v$2(r2) {
  return r2 == null ? false : typeof r2.type == "string" || typeof r2.type == "object" || typeof r2.type == "function";
}
let e$2 = 0;
function n$4() {
  return ++e$2;
}
function t$4() {
  return n$4();
}
var o$1 = ((r2) => (r2.Space = " ", r2.Enter = "Enter", r2.Escape = "Escape", r2.Backspace = "Backspace", r2.Delete = "Delete", r2.ArrowLeft = "ArrowLeft", r2.ArrowUp = "ArrowUp", r2.ArrowRight = "ArrowRight", r2.ArrowDown = "ArrowDown", r2.Home = "Home", r2.End = "End", r2.PageUp = "PageUp", r2.PageDown = "PageDown", r2.Tab = "Tab", r2))(o$1 || {});
function f$2(r2) {
  throw new Error("Unexpected object: " + r2);
}
var a$4 = ((e2) => (e2[e2.First = 0] = "First", e2[e2.Previous = 1] = "Previous", e2[e2.Next = 2] = "Next", e2[e2.Last = 3] = "Last", e2[e2.Specific = 4] = "Specific", e2[e2.Nothing = 5] = "Nothing", e2))(a$4 || {});
function x$2(r2, n2) {
  let t2 = n2.resolveItems();
  if (t2.length <= 0)
    return null;
  let l2 = n2.resolveActiveIndex(), s3 = l2 != null ? l2 : -1, d2 = (() => {
    switch (r2.focus) {
      case 0:
        return t2.findIndex((e2) => !n2.resolveDisabled(e2));
      case 1: {
        let e2 = t2.slice().reverse().findIndex((i2, c2, u2) => s3 !== -1 && u2.length - c2 - 1 >= s3 ? false : !n2.resolveDisabled(i2));
        return e2 === -1 ? e2 : t2.length - 1 - e2;
      }
      case 2:
        return t2.findIndex((e2, i2) => i2 <= s3 ? false : !n2.resolveDisabled(e2));
      case 3: {
        let e2 = t2.slice().reverse().findIndex((i2) => !n2.resolveDisabled(i2));
        return e2 === -1 ? e2 : t2.length - 1 - e2;
      }
      case 4:
        return t2.findIndex((e2) => n2.resolveId(e2) === r2.id);
      case 5:
        return null;
      default:
        f$2(r2);
    }
  })();
  return d2 === -1 ? l2 : d2;
}
function o(n2) {
  var l2;
  return n2 == null || n2.value == null ? null : (l2 = n2.value.$el) != null ? l2 : n2.value;
}
let n$3 = Symbol("Context");
var l$2 = ((e2) => (e2[e2.Open = 1] = "Open", e2[e2.Closed = 2] = "Closed", e2[e2.Closing = 4] = "Closing", e2[e2.Opening = 8] = "Opening", e2))(l$2 || {});
function C() {
  return p$5() !== null;
}
function p$5() {
  return inject(n$3, null);
}
function c$4(o2) {
  provide(n$3, o2);
}
function r$2(t2, e2) {
  if (t2)
    return t2;
  let n2 = e2 != null ? e2 : "button";
  if (typeof n2 == "string" && n2.toLowerCase() === "button")
    return "button";
}
function b$1(t2, e2) {
  let n2 = ref(r$2(t2.value.type, t2.value.as));
  return onMounted(() => {
    n2.value = r$2(t2.value.type, t2.value.as);
  }), watchEffect(() => {
    var o$12;
    n2.value || o(e2) && o(e2) instanceof HTMLButtonElement && !((o$12 = o(e2)) != null && o$12.hasAttribute("type")) && (n2.value = "button");
  }), n2;
}
var i$2 = Object.defineProperty;
var d$6 = (t2, e2, r2) => e2 in t2 ? i$2(t2, e2, { enumerable: true, configurable: true, writable: true, value: r2 }) : t2[e2] = r2;
var n$2 = (t2, e2, r2) => (d$6(t2, typeof e2 != "symbol" ? e2 + "" : e2, r2), r2);
let s$1 = class s {
  constructor() {
    n$2(this, "current", this.detect());
    n$2(this, "currentId", 0);
  }
  set(e2) {
    this.current !== e2 && (this.currentId = 0, this.current = e2);
  }
  reset() {
    this.set(this.detect());
  }
  nextId() {
    return ++this.currentId;
  }
  get isServer() {
    return this.current === "server";
  }
  get isClient() {
    return this.current === "client";
  }
  detect() {
    return typeof window == "undefined" || typeof document == "undefined" ? "server" : "client";
  }
};
let c$3 = new s$1();
function m$3(r2) {
  if (c$3.isServer)
    return null;
  if (r2 instanceof Node)
    return r2.ownerDocument;
  if (r2 != null && r2.hasOwnProperty("value")) {
    let n2 = o(r2);
    if (n2)
      return n2.ownerDocument;
  }
  return document;
}
function p$4({ container: e2, accept: t2, walk: d2, enabled: o2 }) {
  watchEffect(() => {
    let r2 = e2.value;
    if (!r2 || o2 !== void 0 && !o2.value)
      return;
    let l2 = m$3(e2);
    if (!l2)
      return;
    let c2 = Object.assign((f2) => t2(f2), { acceptNode: t2 }), n2 = l2.createTreeWalker(r2, NodeFilter.SHOW_ELEMENT, c2, false);
    for (; n2.nextNode(); )
      d2(n2.currentNode);
  });
}
let c$2 = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e2) => `${e2}:not([tabindex='-1'])`).join(",");
var N$3 = ((n2) => (n2[n2.First = 1] = "First", n2[n2.Previous = 2] = "Previous", n2[n2.Next = 4] = "Next", n2[n2.Last = 8] = "Last", n2[n2.WrapAround = 16] = "WrapAround", n2[n2.NoScroll = 32] = "NoScroll", n2))(N$3 || {}), T$1 = ((o2) => (o2[o2.Error = 0] = "Error", o2[o2.Overflow = 1] = "Overflow", o2[o2.Success = 2] = "Success", o2[o2.Underflow = 3] = "Underflow", o2))(T$1 || {}), F$1 = ((t2) => (t2[t2.Previous = -1] = "Previous", t2[t2.Next = 1] = "Next", t2))(F$1 || {});
function E$3(e2 = document.body) {
  return e2 == null ? [] : Array.from(e2.querySelectorAll(c$2)).sort((r2, t2) => Math.sign((r2.tabIndex || Number.MAX_SAFE_INTEGER) - (t2.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var h = ((t2) => (t2[t2.Strict = 0] = "Strict", t2[t2.Loose = 1] = "Loose", t2))(h || {});
function w$1(e2, r2 = 0) {
  var t2;
  return e2 === ((t2 = m$3(e2)) == null ? void 0 : t2.body) ? false : u$4(r2, { [0]() {
    return e2.matches(c$2);
  }, [1]() {
    let l2 = e2;
    for (; l2 !== null; ) {
      if (l2.matches(c$2))
        return true;
      l2 = l2.parentElement;
    }
    return false;
  } });
}
function _(e2) {
  let r2 = m$3(e2);
  nextTick(() => {
    r2 && !w$1(r2.activeElement, 0) && S$2(e2);
  });
}
var y$1 = ((t2) => (t2[t2.Keyboard = 0] = "Keyboard", t2[t2.Mouse = 1] = "Mouse", t2))(y$1 || {});
typeof window != "undefined" && typeof document != "undefined" && (document.addEventListener("keydown", (e2) => {
  e2.metaKey || e2.altKey || e2.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, true), document.addEventListener("click", (e2) => {
  e2.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e2.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, true));
function S$2(e2) {
  e2 == null || e2.focus({ preventScroll: true });
}
let H$2 = ["textarea", "input"].join(",");
function I$1(e2) {
  var r2, t2;
  return (t2 = (r2 = e2 == null ? void 0 : e2.matches) == null ? void 0 : r2.call(e2, H$2)) != null ? t2 : false;
}
function O(e2, r2 = (t2) => t2) {
  return e2.slice().sort((t2, l2) => {
    let o2 = r2(t2), i2 = r2(l2);
    if (o2 === null || i2 === null)
      return 0;
    let n2 = o2.compareDocumentPosition(i2);
    return n2 & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : n2 & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function v$1(e2, r2) {
  return P$2(E$3(), r2, { relativeTo: e2 });
}
function P$2(e2, r2, { sorted: t2 = true, relativeTo: l2 = null, skipElements: o2 = [] } = {}) {
  var m2;
  let i2 = (m2 = Array.isArray(e2) ? e2.length > 0 ? e2[0].ownerDocument : document : e2 == null ? void 0 : e2.ownerDocument) != null ? m2 : document, n2 = Array.isArray(e2) ? t2 ? O(e2) : e2 : E$3(e2);
  o2.length > 0 && n2.length > 1 && (n2 = n2.filter((s3) => !o2.includes(s3))), l2 = l2 != null ? l2 : i2.activeElement;
  let x2 = (() => {
    if (r2 & 5)
      return 1;
    if (r2 & 10)
      return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), p2 = (() => {
    if (r2 & 1)
      return 0;
    if (r2 & 2)
      return Math.max(0, n2.indexOf(l2)) - 1;
    if (r2 & 4)
      return Math.max(0, n2.indexOf(l2)) + 1;
    if (r2 & 8)
      return n2.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), L2 = r2 & 32 ? { preventScroll: true } : {}, a2 = 0, d2 = n2.length, u2;
  do {
    if (a2 >= d2 || a2 + d2 <= 0)
      return 0;
    let s3 = p2 + a2;
    if (r2 & 16)
      s3 = (s3 + d2) % d2;
    else {
      if (s3 < 0)
        return 3;
      if (s3 >= d2)
        return 1;
    }
    u2 = n2[s3], u2 == null || u2.focus(L2), a2 += x2;
  } while (u2 !== i2.activeElement);
  return r2 & 6 && I$1(u2) && u2.select(), 2;
}
function u$3(e2, t2, n2) {
  c$3.isServer || watchEffect((o2) => {
    document.addEventListener(e2, t2, n2), o2(() => document.removeEventListener(e2, t2, n2));
  });
}
function y(f2, m2, i2 = computed(() => true)) {
  function a2(e2, u2) {
    if (!i2.value || e2.defaultPrevented)
      return;
    let n2 = u2(e2);
    if (n2 === null || !n2.getRootNode().contains(n2))
      return;
    let c2 = function o2(t2) {
      return typeof t2 == "function" ? o2(t2()) : Array.isArray(t2) || t2 instanceof Set ? t2 : [t2];
    }(f2);
    for (let o$12 of c2) {
      if (o$12 === null)
        continue;
      let t2 = o$12 instanceof HTMLElement ? o$12 : o(o$12);
      if (t2 != null && t2.contains(n2) || e2.composed && e2.composedPath().includes(t2))
        return;
    }
    return !w$1(n2, h.Loose) && n2.tabIndex !== -1 && e2.preventDefault(), m2(e2, n2);
  }
  let r2 = ref(null);
  u$3("mousedown", (e2) => {
    var u2, n2;
    i2.value && (r2.value = ((n2 = (u2 = e2.composedPath) == null ? void 0 : u2.call(e2)) == null ? void 0 : n2[0]) || e2.target);
  }, true), u$3("click", (e2) => {
    r2.value && (a2(e2, () => r2.value), r2.value = null);
  }, true), u$3("blur", (e2) => a2(e2, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), true);
}
var a$3 = ((e2) => (e2[e2.None = 1] = "None", e2[e2.Focusable = 2] = "Focusable", e2[e2.Hidden = 4] = "Hidden", e2))(a$3 || {});
let f$1 = defineComponent({ name: "Hidden", props: { as: { type: [Object, String], default: "div" }, features: { type: Number, default: 1 } }, setup(r2, { slots: t2, attrs: d2 }) {
  return () => {
    let { features: e2, ...o2 } = r2, n2 = { "aria-hidden": (e2 & 2) === 2 ? true : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(e2 & 4) === 4 && (e2 & 2) !== 2 && { display: "none" } } };
    return H$3({ ourProps: n2, theirProps: o2, slot: {}, attrs: d2, slots: t2, name: "Hidden" });
  };
} });
function e$1(n2 = {}, r2 = null, t2 = []) {
  for (let [i2, o2] of Object.entries(n2))
    f(t2, s2(r2, i2), o2);
  return t2;
}
function s2(n2, r2) {
  return n2 ? n2 + "[" + r2 + "]" : r2;
}
function f(n2, r2, t2) {
  if (Array.isArray(t2))
    for (let [i2, o2] of t2.entries())
      f(n2, s2(r2, i2.toString()), o2);
  else
    t2 instanceof Date ? n2.push([r2, t2.toISOString()]) : typeof t2 == "boolean" ? n2.push([r2, t2 ? "1" : "0"]) : typeof t2 == "string" ? n2.push([r2, t2]) : typeof t2 == "number" ? n2.push([r2, `${t2}`]) : t2 == null ? n2.push([r2, ""]) : e$1(t2, r2, n2);
}
function p$3(n2) {
  var t2;
  let r2 = (t2 = n2 == null ? void 0 : n2.form) != null ? t2 : n2.closest("form");
  if (r2) {
    for (let i2 of r2.elements)
      if (i2.tagName === "INPUT" && i2.type === "submit" || i2.tagName === "BUTTON" && i2.type === "submit" || i2.nodeName === "INPUT" && i2.type === "image") {
        i2.click();
        return;
      }
  }
}
function d$5(u2, e2, r2) {
  let i2 = ref(r2 == null ? void 0 : r2.value), f2 = computed(() => u2.value !== void 0);
  return [computed(() => f2.value ? u2.value : i2.value), function(t2) {
    return f2.value || (i2.value = t2), e2 == null ? void 0 : e2(t2);
  }];
}
function r$1(e2) {
  return [e2.screenX, e2.screenY];
}
function u$2() {
  let e2 = ref([-1, -1]);
  return { wasMoved(n2) {
    let t2 = r$1(n2);
    return e2.value[0] === t2[0] && e2.value[1] === t2[1] ? false : (e2.value = t2, true);
  }, update(n2) {
    e2.value = r$1(n2);
  } };
}
function t$3() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function i$1() {
  return /Android/gi.test(window.navigator.userAgent);
}
function n$1() {
  return t$3() || i$1();
}
function be(o2, O2) {
  return o2 === O2;
}
var ve$1 = ((s3) => (s3[s3.Open = 0] = "Open", s3[s3.Closed = 1] = "Closed", s3))(ve$1 || {}), ce$4 = ((s3) => (s3[s3.Single = 0] = "Single", s3[s3.Multi = 1] = "Multi", s3))(ce$4 || {}), me$1 = ((s3) => (s3[s3.Pointer = 0] = "Pointer", s3[s3.Other = 1] = "Other", s3))(me$1 || {});
let G = Symbol("ComboboxContext");
function N$2(o2) {
  let O2 = inject(G, null);
  if (O2 === null) {
    let s3 = new Error(`<${o2} /> is missing a parent <Combobox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(s3, N$2), s3;
  }
  return O2;
}
let Ne = defineComponent({ name: "Combobox", emits: { "update:modelValue": (o2) => true }, props: { as: { type: [Object, String], default: "template" }, disabled: { type: [Boolean], default: false }, by: { type: [String, Function], default: () => be }, modelValue: { type: [Object, String, Number, Boolean], default: void 0 }, defaultValue: { type: [Object, String, Number, Boolean], default: void 0 }, form: { type: String, optional: true }, name: { type: String, optional: true }, nullable: { type: Boolean, default: false }, multiple: { type: [Boolean], default: false } }, inheritAttrs: false, setup(o$12, { slots: O$1, attrs: s3, emit: P2 }) {
  let e2 = ref(1), t2 = ref(null), f2 = ref(null), I2 = ref(null), d2 = ref(null), c2 = ref({ static: false, hold: false }), x2 = ref([]), S2 = ref(null), y$12 = ref(1), h2 = ref(false);
  function E2(n2 = (r2) => r2) {
    let r2 = S2.value !== null ? x2.value[S2.value] : null, p2 = O(n2(x2.value.slice()), (v2) => o(v2.dataRef.domRef)), a2 = r2 ? p2.indexOf(r2) : null;
    return a2 === -1 && (a2 = null), { options: p2, activeOptionIndex: a2 };
  }
  let l2 = computed(() => o$12.multiple ? 1 : 0), i2 = computed(() => o$12.nullable), [b2, w2] = d$5(computed(() => o$12.modelValue === void 0 ? u$4(l2.value, { [1]: [], [0]: void 0 }) : o$12.modelValue), (n2) => P2("update:modelValue", n2), computed(() => o$12.defaultValue)), u2 = { comboboxState: e2, value: b2, mode: l2, compare(n2, r2) {
    if (typeof o$12.by == "string") {
      let p2 = o$12.by;
      return (n2 == null ? void 0 : n2[p2]) === (r2 == null ? void 0 : r2[p2]);
    }
    return o$12.by(n2, r2);
  }, defaultValue: computed(() => o$12.defaultValue), nullable: i2, inputRef: f2, labelRef: t2, buttonRef: I2, optionsRef: d2, disabled: computed(() => o$12.disabled), options: x2, change(n2) {
    w2(n2);
  }, activeOptionIndex: computed(() => {
    if (h2.value && S2.value === null && x2.value.length > 0) {
      let n2 = x2.value.findIndex((r2) => !r2.dataRef.disabled);
      if (n2 !== -1)
        return n2;
    }
    return S2.value;
  }), activationTrigger: y$12, optionsPropsRef: c2, closeCombobox() {
    h2.value = false, !o$12.disabled && e2.value !== 1 && (e2.value = 1, S2.value = null);
  }, openCombobox() {
    if (h2.value = true, o$12.disabled || e2.value === 0)
      return;
    let n2 = x2.value.findIndex((r2) => {
      let p2 = toRaw(r2.dataRef.value);
      return u$4(l2.value, { [0]: () => u2.compare(toRaw(u2.value.value), toRaw(p2)), [1]: () => toRaw(u2.value.value).some((v2) => u2.compare(toRaw(v2), toRaw(p2))) });
    });
    n2 !== -1 && (S2.value = n2), e2.value = 0;
  }, goToOption(n2, r2, p2) {
    if (h2.value = false, o$12.disabled || d2.value && !c2.value.static && e2.value === 1)
      return;
    let a2 = E2();
    if (a2.activeOptionIndex === null) {
      let g2 = a2.options.findIndex((A2) => !A2.dataRef.disabled);
      g2 !== -1 && (a2.activeOptionIndex = g2);
    }
    let v2 = x$2(n2 === a$4.Specific ? { focus: a$4.Specific, id: r2 } : { focus: n2 }, { resolveItems: () => a2.options, resolveActiveIndex: () => a2.activeOptionIndex, resolveId: (g2) => g2.id, resolveDisabled: (g2) => g2.dataRef.disabled });
    S2.value = v2, y$12.value = p2 != null ? p2 : 1, x2.value = a2.options;
  }, selectOption(n2) {
    let r2 = x2.value.find((a2) => a2.id === n2);
    if (!r2)
      return;
    let { dataRef: p2 } = r2;
    w2(u$4(l2.value, { [0]: () => p2.value, [1]: () => {
      let a2 = toRaw(u2.value.value).slice(), v2 = toRaw(p2.value), g2 = a2.findIndex((A2) => u2.compare(v2, toRaw(A2)));
      return g2 === -1 ? a2.push(v2) : a2.splice(g2, 1), a2;
    } }));
  }, selectActiveOption() {
    if (u2.activeOptionIndex.value === null)
      return;
    let { dataRef: n2, id: r2 } = x2.value[u2.activeOptionIndex.value];
    w2(u$4(l2.value, { [0]: () => n2.value, [1]: () => {
      let p2 = toRaw(u2.value.value).slice(), a2 = toRaw(n2.value), v2 = p2.findIndex((g2) => u2.compare(a2, toRaw(g2)));
      return v2 === -1 ? p2.push(a2) : p2.splice(v2, 1), p2;
    } })), u2.goToOption(a$4.Specific, r2);
  }, registerOption(n2, r2) {
    let p2 = { id: n2, dataRef: r2 }, a2 = E2((v2) => [...v2, p2]);
    if (S2.value === null) {
      let v2 = r2.value.value;
      u$4(l2.value, { [0]: () => u2.compare(toRaw(u2.value.value), toRaw(v2)), [1]: () => toRaw(u2.value.value).some((A2) => u2.compare(toRaw(A2), toRaw(v2))) }) && (a2.activeOptionIndex = a2.options.indexOf(p2));
    }
    x2.value = a2.options, S2.value = a2.activeOptionIndex, y$12.value = 1;
  }, unregisterOption(n2) {
    var p2;
    u2.activeOptionIndex.value !== null && ((p2 = u2.options.value[u2.activeOptionIndex.value]) == null ? void 0 : p2.id) === n2 && (h2.value = true);
    let r2 = E2((a2) => {
      let v2 = a2.findIndex((g2) => g2.id === n2);
      return v2 !== -1 && a2.splice(v2, 1), a2;
    });
    x2.value = r2.options, S2.value = r2.activeOptionIndex, y$12.value = 1;
  } };
  y([f2, I2, d2], () => u2.closeCombobox(), computed(() => e2.value === 0)), provide(G, u2), c$4(computed(() => u$4(e2.value, { [0]: l$2.Open, [1]: l$2.Closed })));
  let L2 = computed(() => u2.activeOptionIndex.value === null ? null : x2.value[u2.activeOptionIndex.value].dataRef.value), D = computed(() => {
    var n2;
    return (n2 = o(f2)) == null ? void 0 : n2.closest("form");
  });
  return onMounted(() => {
    watch$1([D], () => {
      if (!D.value || o$12.defaultValue === void 0)
        return;
      function n2() {
        u2.change(o$12.defaultValue);
      }
      return D.value.addEventListener("reset", n2), () => {
        var r2;
        (r2 = D.value) == null || r2.removeEventListener("reset", n2);
      };
    }, { immediate: true });
  }), () => {
    let { name: n2, disabled: r2, form: p2, ...a2 } = o$12, v2 = { open: e2.value === 0, disabled: r2, activeIndex: u2.activeOptionIndex.value, activeOption: L2.value, value: b2.value };
    return h$1(Fragment$1, [...n2 != null && b2.value != null ? e$1({ [n2]: b2.value }).map(([g2, A2]) => h$1(f$1, K$1({ features: a$3.Hidden, key: g2, as: "input", type: "hidden", hidden: true, readOnly: true, form: p2, name: g2, value: A2 }))) : [], H$3({ theirProps: { ...s3, ...T$2(a2, ["modelValue", "defaultValue", "nullable", "multiple", "onUpdate:modelValue", "by"]) }, ourProps: {}, slot: v2, slots: O$1, attrs: s3, name: "Combobox" })]);
  };
} });
defineComponent({ name: "ComboboxLabel", props: { as: { type: [Object, String], default: "label" }, id: { type: String, default: () => `headlessui-combobox-label-${t$4()}` } }, setup(o$12, { attrs: O2, slots: s3 }) {
  let P2 = N$2("ComboboxLabel");
  function e2() {
    var t2;
    (t2 = o(P2.inputRef)) == null || t2.focus({ preventScroll: true });
  }
  return () => {
    let t2 = { open: P2.comboboxState.value === 0, disabled: P2.disabled.value }, { id: f2, ...I2 } = o$12, d2 = { id: f2, ref: P2.labelRef, onClick: e2 };
    return H$3({ ourProps: d2, theirProps: I2, slot: t2, attrs: O2, slots: s3, name: "ComboboxLabel" });
  };
} });
let Ke = defineComponent({ name: "ComboboxButton", props: { as: { type: [Object, String], default: "button" }, id: { type: String, default: () => `headlessui-combobox-button-${t$4()}` } }, setup(o$2, { attrs: O2, slots: s3, expose: P2 }) {
  let e2 = N$2("ComboboxButton");
  P2({ el: e2.buttonRef, $el: e2.buttonRef });
  function t2(d2) {
    e2.disabled.value || (e2.comboboxState.value === 0 ? e2.closeCombobox() : (d2.preventDefault(), e2.openCombobox()), nextTick(() => {
      var c2;
      return (c2 = o(e2.inputRef)) == null ? void 0 : c2.focus({ preventScroll: true });
    }));
  }
  function f2(d2) {
    switch (d2.key) {
      case o$1.ArrowDown:
        d2.preventDefault(), d2.stopPropagation(), e2.comboboxState.value === 1 && e2.openCombobox(), nextTick(() => {
          var c2;
          return (c2 = e2.inputRef.value) == null ? void 0 : c2.focus({ preventScroll: true });
        });
        return;
      case o$1.ArrowUp:
        d2.preventDefault(), d2.stopPropagation(), e2.comboboxState.value === 1 && (e2.openCombobox(), nextTick(() => {
          e2.value.value || e2.goToOption(a$4.Last);
        })), nextTick(() => {
          var c2;
          return (c2 = e2.inputRef.value) == null ? void 0 : c2.focus({ preventScroll: true });
        });
        return;
      case o$1.Escape:
        if (e2.comboboxState.value !== 0)
          return;
        d2.preventDefault(), e2.optionsRef.value && !e2.optionsPropsRef.value.static && d2.stopPropagation(), e2.closeCombobox(), nextTick(() => {
          var c2;
          return (c2 = e2.inputRef.value) == null ? void 0 : c2.focus({ preventScroll: true });
        });
        return;
    }
  }
  let I2 = b$1(computed(() => ({ as: o$2.as, type: O2.type })), e2.buttonRef);
  return () => {
    var y2, h2;
    let d2 = { open: e2.comboboxState.value === 0, disabled: e2.disabled.value, value: e2.value.value }, { id: c2, ...x2 } = o$2, S2 = { ref: e2.buttonRef, id: c2, type: I2.value, tabindex: "-1", "aria-haspopup": "listbox", "aria-controls": (y2 = o(e2.optionsRef)) == null ? void 0 : y2.id, "aria-expanded": e2.disabled.value ? void 0 : e2.comboboxState.value === 0, "aria-labelledby": e2.labelRef.value ? [(h2 = o(e2.labelRef)) == null ? void 0 : h2.id, c2].join(" ") : void 0, disabled: e2.disabled.value === true ? true : void 0, onKeydown: f2, onClick: t2 };
    return H$3({ ourProps: S2, theirProps: x2, slot: d2, attrs: O2, slots: s3, name: "ComboboxButton" });
  };
} }), $e = defineComponent({ name: "ComboboxInput", props: { as: { type: [Object, String], default: "input" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, displayValue: { type: Function }, defaultValue: { type: String, default: void 0 }, id: { type: String, default: () => `headlessui-combobox-input-${t$4()}` } }, emits: { change: (o2) => true }, setup(o$2, { emit: O2, attrs: s3, slots: P2, expose: e2 }) {
  let t2 = N$2("ComboboxInput"), f2 = { value: false };
  e2({ el: t2.inputRef, $el: t2.inputRef });
  let I2 = computed(() => {
    var i2;
    let l2 = t2.value.value;
    return o(t2.inputRef) ? typeof o$2.displayValue != "undefined" && l2 !== void 0 ? (i2 = o$2.displayValue(l2)) != null ? i2 : "" : typeof l2 == "string" ? l2 : "" : "";
  });
  onMounted(() => {
    watch$1([I2, t2.comboboxState], ([l2, i2], [b2, w2]) => {
      if (f2.value)
        return;
      let u2 = o(t2.inputRef);
      u2 && (w2 === 0 && i2 === 1 || l2 !== b2) && (u2.value = l2);
    }, { immediate: true }), watch$1([t2.comboboxState], ([l2], [i2]) => {
      if (l2 === 0 && i2 === 1) {
        let b2 = o(t2.inputRef);
        if (!b2)
          return;
        let w2 = b2.value, { selectionStart: u2, selectionEnd: L2, selectionDirection: D } = b2;
        b2.value = "", b2.value = w2, D !== null ? b2.setSelectionRange(u2, L2, D) : b2.setSelectionRange(u2, L2);
      }
    });
  });
  let d2 = ref(false);
  function c2() {
    d2.value = true;
  }
  function x2() {
    setTimeout(() => {
      d2.value = false;
    });
  }
  function S2(l2) {
    switch (f2.value = true, l2.key) {
      case o$1.Backspace:
      case o$1.Delete:
        if (t2.mode.value !== 0 || !t2.nullable.value)
          return;
        let i2 = l2.currentTarget;
        requestAnimationFrame(() => {
          if (i2.value === "") {
            t2.change(null);
            let b2 = o(t2.optionsRef);
            b2 && (b2.scrollTop = 0), t2.goToOption(a$4.Nothing);
          }
        });
        break;
      case o$1.Enter:
        if (f2.value = false, t2.comboboxState.value !== 0 || d2.value)
          return;
        if (l2.preventDefault(), l2.stopPropagation(), t2.activeOptionIndex.value === null) {
          t2.closeCombobox();
          return;
        }
        t2.selectActiveOption(), t2.mode.value === 0 && t2.closeCombobox();
        break;
      case o$1.ArrowDown:
        return f2.value = false, l2.preventDefault(), l2.stopPropagation(), u$4(t2.comboboxState.value, { [0]: () => t2.goToOption(a$4.Next), [1]: () => t2.openCombobox() });
      case o$1.ArrowUp:
        return f2.value = false, l2.preventDefault(), l2.stopPropagation(), u$4(t2.comboboxState.value, { [0]: () => t2.goToOption(a$4.Previous), [1]: () => {
          t2.openCombobox(), nextTick(() => {
            t2.value.value || t2.goToOption(a$4.Last);
          });
        } });
      case o$1.Home:
        if (l2.shiftKey)
          break;
        return f2.value = false, l2.preventDefault(), l2.stopPropagation(), t2.goToOption(a$4.First);
      case o$1.PageUp:
        return f2.value = false, l2.preventDefault(), l2.stopPropagation(), t2.goToOption(a$4.First);
      case o$1.End:
        if (l2.shiftKey)
          break;
        return f2.value = false, l2.preventDefault(), l2.stopPropagation(), t2.goToOption(a$4.Last);
      case o$1.PageDown:
        return f2.value = false, l2.preventDefault(), l2.stopPropagation(), t2.goToOption(a$4.Last);
      case o$1.Escape:
        if (f2.value = false, t2.comboboxState.value !== 0)
          return;
        l2.preventDefault(), t2.optionsRef.value && !t2.optionsPropsRef.value.static && l2.stopPropagation(), t2.closeCombobox();
        break;
      case o$1.Tab:
        if (f2.value = false, t2.comboboxState.value !== 0)
          return;
        t2.mode.value === 0 && t2.selectActiveOption(), t2.closeCombobox();
        break;
    }
  }
  function y2(l2) {
    t2.openCombobox(), O2("change", l2);
  }
  function h2() {
    f2.value = false;
  }
  let E2 = computed(() => {
    var l2, i2, b2, w2;
    return (w2 = (b2 = (i2 = o$2.defaultValue) != null ? i2 : t2.defaultValue.value !== void 0 ? (l2 = o$2.displayValue) == null ? void 0 : l2.call(o$2, t2.defaultValue.value) : null) != null ? b2 : t2.defaultValue.value) != null ? w2 : "";
  });
  return () => {
    var D, n2, r2, p2, a2, v2;
    let l2 = { open: t2.comboboxState.value === 0 }, { id: i2, displayValue: b2, onChange: w2, ...u2 } = o$2, L2 = { "aria-controls": (D = t2.optionsRef.value) == null ? void 0 : D.id, "aria-expanded": t2.disabled.value ? void 0 : t2.comboboxState.value === 0, "aria-activedescendant": t2.activeOptionIndex.value === null || (n2 = t2.options.value[t2.activeOptionIndex.value]) == null ? void 0 : n2.id, "aria-labelledby": (a2 = (r2 = o(t2.labelRef)) == null ? void 0 : r2.id) != null ? a2 : (p2 = o(t2.buttonRef)) == null ? void 0 : p2.id, "aria-autocomplete": "list", id: i2, onCompositionstart: c2, onCompositionend: x2, onKeydown: S2, onInput: y2, onBlur: h2, role: "combobox", type: (v2 = s3.type) != null ? v2 : "text", tabIndex: 0, ref: t2.inputRef, defaultValue: E2.value, disabled: t2.disabled.value === true ? true : void 0 };
    return H$3({ ourProps: L2, theirProps: u2, slot: l2, attrs: s3, slots: P2, features: N$4.RenderStrategy | N$4.Static, name: "ComboboxInput" });
  };
} }), Ue = defineComponent({ name: "ComboboxOptions", props: { as: { type: [Object, String], default: "ul" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, hold: { type: [Boolean], default: false } }, setup(o$12, { attrs: O2, slots: s3, expose: P2 }) {
  let e2 = N$2("ComboboxOptions"), t2 = `headlessui-combobox-options-${t$4()}`;
  P2({ el: e2.optionsRef, $el: e2.optionsRef }), watchEffect(() => {
    e2.optionsPropsRef.value.static = o$12.static;
  }), watchEffect(() => {
    e2.optionsPropsRef.value.hold = o$12.hold;
  });
  let f2 = p$5(), I2 = computed(() => f2 !== null ? (f2.value & l$2.Open) === l$2.Open : e2.comboboxState.value === 0);
  return p$4({ container: computed(() => o(e2.optionsRef)), enabled: computed(() => e2.comboboxState.value === 0), accept(d2) {
    return d2.getAttribute("role") === "option" ? NodeFilter.FILTER_REJECT : d2.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
  }, walk(d2) {
    d2.setAttribute("role", "none");
  } }), () => {
    var S2, y2, h2;
    let d2 = { open: e2.comboboxState.value === 0 }, c2 = { "aria-labelledby": (h2 = (S2 = o(e2.labelRef)) == null ? void 0 : S2.id) != null ? h2 : (y2 = o(e2.buttonRef)) == null ? void 0 : y2.id, id: t2, ref: e2.optionsRef, role: "listbox", "aria-multiselectable": e2.mode.value === 1 ? true : void 0 }, x2 = T$2(o$12, ["hold"]);
    return H$3({ ourProps: c2, theirProps: x2, slot: d2, attrs: O2, slots: s3, features: N$4.RenderStrategy | N$4.Static, visible: I2.value, name: "ComboboxOptions" });
  };
} }), _e = defineComponent({ name: "ComboboxOption", props: { as: { type: [Object, String], default: "li" }, value: { type: [Object, String, Number, Boolean] }, disabled: { type: Boolean, default: false } }, setup(o$12, { slots: O2, attrs: s3, expose: P2 }) {
  let e2 = N$2("ComboboxOption"), t2 = `headlessui-combobox-option-${t$4()}`, f2 = ref(null);
  P2({ el: f2, $el: f2 });
  let I2 = computed(() => e2.activeOptionIndex.value !== null ? e2.options.value[e2.activeOptionIndex.value].id === t2 : false), d2 = computed(() => u$4(e2.mode.value, { [0]: () => e2.compare(toRaw(e2.value.value), toRaw(o$12.value)), [1]: () => toRaw(e2.value.value).some((i2) => e2.compare(toRaw(i2), toRaw(o$12.value))) })), c2 = computed(() => ({ disabled: o$12.disabled, value: o$12.value, domRef: f2 }));
  onMounted(() => e2.registerOption(t2, c2)), onUnmounted(() => e2.unregisterOption(t2)), watchEffect(() => {
    e2.comboboxState.value === 0 && I2.value && e2.activationTrigger.value !== 0 && nextTick(() => {
      var i2, b2;
      return (b2 = (i2 = o(f2)) == null ? void 0 : i2.scrollIntoView) == null ? void 0 : b2.call(i2, { block: "nearest" });
    });
  });
  function x2(i2) {
    if (o$12.disabled)
      return i2.preventDefault();
    e2.selectOption(t2), e2.mode.value === 0 && e2.closeCombobox(), n$1() || requestAnimationFrame(() => {
      var b2;
      return (b2 = o(e2.inputRef)) == null ? void 0 : b2.focus();
    });
  }
  function S2() {
    if (o$12.disabled)
      return e2.goToOption(a$4.Nothing);
    e2.goToOption(a$4.Specific, t2);
  }
  let y2 = u$2();
  function h2(i2) {
    y2.update(i2);
  }
  function E2(i2) {
    y2.wasMoved(i2) && (o$12.disabled || I2.value || e2.goToOption(a$4.Specific, t2, 0));
  }
  function l2(i2) {
    y2.wasMoved(i2) && (o$12.disabled || I2.value && (e2.optionsPropsRef.value.hold || e2.goToOption(a$4.Nothing)));
  }
  return () => {
    let { disabled: i2 } = o$12, b2 = { active: I2.value, selected: d2.value, disabled: i2 }, w2 = { id: t2, ref: f2, role: "option", tabIndex: i2 === true ? void 0 : -1, "aria-disabled": i2 === true ? true : void 0, "aria-selected": d2.value, disabled: void 0, onClick: x2, onFocus: S2, onPointerenter: h2, onMouseenter: h2, onPointermove: E2, onMousemove: E2, onPointerleave: l2, onMouseleave: l2 };
    return H$3({ ourProps: w2, theirProps: o$12, slot: b2, attrs: s3, slots: O2, name: "ComboboxOption" });
  };
} });
const _hoisted_1 = { class: "relative" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "autocomplete",
  props: {
    context: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props2 = __props;
    const options2 = computed(() => props2.context.options ?? []);
    const selectedOption = ref(
      options2.value.find((option2) => option2.value === props2.context._value)
    );
    watch$1(selectedOption, (value) => {
      props2.context.node.input(value == null ? void 0 : value.value);
    });
    watch$1(options2, (value) => {
      selectedOption.value = value.find((option2) => option2.value === props2.context._value);
    });
    const query = ref("");
    const filteredOptions = computed(() => {
      if (query.value.length < Number(props2.context.filterMinLength ?? 0))
        return [];
      return query.value === "" ? options2.value : options2.value.filter((item) => {
        return item.label.toLowerCase().includes(query.value.toLowerCase());
      });
    });
    return (_ctx, _cache) => {
      const _component_HeadlessComboboxInput = $e;
      const _component_HeadlessComboboxButton = Ke;
      const _component_HeadlessComboboxOption = _e;
      const _component_HeadlessComboboxOptions = Ue;
      const _component_HeadlessCombobox = Ne;
      return openBlock(), createBlock(_component_HeadlessCombobox, {
        modelValue: unref(selectedOption),
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(selectedOption) ? selectedOption.value = $event : null),
        as: "div",
        by: "value",
        nullable: true
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1, [
            createVNode(_component_HeadlessComboboxInput, {
              class: "w-full rounded-md border border-normal-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm formkit-disabled:bg-normal-200 formkit-disabled:text-normal-500",
              "display-value": (option2) => option2 == null ? void 0 : option2.label,
              placeholder: props2.context.attrs.placeholder,
              onChange: _cache[0] || (_cache[0] = ($event) => query.value = $event.target.value)
            }, null, 8, ["display-value", "placeholder"]),
            createVNode(_component_HeadlessComboboxButton, { class: "absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none" }),
            unref(filteredOptions).length > 0 ? (openBlock(), createBlock(_component_HeadlessComboboxOptions, {
              key: 0,
              class: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment$1, null, renderList(unref(filteredOptions), (option2) => {
                  return openBlock(), createBlock(_component_HeadlessComboboxOption, {
                    key: option2.value,
                    value: option2,
                    as: "template"
                  }, {
                    default: withCtx(({ active, selected }) => [
                      createBaseVNode("li", {
                        class: normalizeClass([
                          "relative cursor-default select-none py-2 pl-3 pr-9",
                          active ? "bg-primary-600 text-white" : "text-normal-900"
                        ])
                      }, [
                        createBaseVNode("span", {
                          class: normalizeClass(["block truncate", selected && "font-semibold"])
                        }, toDisplayString(option2.label), 3),
                        selected ? (openBlock(), createElementBlock("span", {
                          key: 0,
                          class: normalizeClass([
                            "absolute inset-y-0 right-0 flex items-center pr-4",
                            active ? "text-white" : "text-primary-600"
                          ])
                        }, null, 2)) : createCommentVNode("", true)
                      ], 2)
                    ]),
                    _: 2
                  }, 1032, ["value"]);
                }), 128))
              ]),
              _: 1
            })) : createCommentVNode("", true)
          ])
        ]),
        _: 1
      }, 8, ["modelValue"]);
    };
  }
});
let a$2 = Symbol("LabelContext");
function d$4() {
  let t2 = inject(a$2, null);
  if (t2 === null) {
    let n2 = new Error("You used a <Label /> component, but it is not inside a parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(n2, d$4), n2;
  }
  return t2;
}
function K({ slot: t2 = {}, name: n2 = "Label", props: i2 = {} } = {}) {
  let e2 = ref([]);
  function l2(r2) {
    return e2.value.push(r2), () => {
      let o2 = e2.value.indexOf(r2);
      o2 !== -1 && e2.value.splice(o2, 1);
    };
  }
  return provide(a$2, { register: l2, slot: t2, name: n2, props: i2 }), computed(() => e2.value.length > 0 ? e2.value.join(" ") : void 0);
}
let T = defineComponent({ name: "Label", props: { as: { type: [Object, String], default: "label" }, passive: { type: [Boolean], default: false }, id: { type: String, default: () => `headlessui-label-${t$4()}` } }, setup(t2, { slots: n2, attrs: i2 }) {
  let e2 = d$4();
  return onMounted(() => onUnmounted(e2.register(t2.id))), () => {
    let { name: l2 = "Label", slot: r2 = {}, props: o2 = {} } = e2, { id: p2, passive: c2, ...u2 } = t2, s3 = { ...Object.entries(o2).reduce((f2, [b2, g2]) => Object.assign(f2, { [b2]: unref(g2) }), {}), id: p2 };
    return c2 && (delete s3.onClick, delete s3.htmlFor, delete u2.onClick), H$3({ ourProps: s3, theirProps: u2, slot: r2, attrs: i2, slots: n2, name: l2 });
  };
} });
let p$2 = Symbol("DescriptionContext");
function b() {
  let t2 = inject(p$2, null);
  if (t2 === null)
    throw new Error("Missing parent");
  return t2;
}
function M({ slot: t2 = ref({}), name: i2 = "Description", props: o2 = {} } = {}) {
  let e2 = ref([]);
  function s3(n2) {
    return e2.value.push(n2), () => {
      let r2 = e2.value.indexOf(n2);
      r2 !== -1 && e2.value.splice(r2, 1);
    };
  }
  return provide(p$2, { register: s3, slot: t2, name: i2, props: o2 }), computed(() => e2.value.length > 0 ? e2.value.join(" ") : void 0);
}
defineComponent({ name: "Description", props: { as: { type: [Object, String], default: "p" }, id: { type: String, default: () => `headlessui-description-${t$4()}` } }, setup(t2, { attrs: i2, slots: o2 }) {
  let e2 = b();
  return onMounted(() => onUnmounted(e2.register(t2.id))), () => {
    let { name: s3 = "Description", slot: n2 = ref({}), props: r2 = {} } = e2, { id: d2, ...l2 } = t2, c2 = { ...Object.entries(r2).reduce((f2, [a2, g2]) => Object.assign(f2, { [a2]: unref(g2) }), {}), id: d2 };
    return H$3({ ourProps: c2, theirProps: l2, slot: n2.value, attrs: i2, slots: o2, name: s3 });
  };
} });
function re(t2, c2) {
  return t2 === c2;
}
let j$3 = Symbol("RadioGroupContext");
function H$1(t2) {
  let c2 = inject(j$3, null);
  if (c2 === null) {
    let u2 = new Error(`<${t2} /> is missing a parent <RadioGroup /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(u2, H$1), u2;
  }
  return c2;
}
let ke = defineComponent({ name: "RadioGroup", emits: { "update:modelValue": (t2) => true }, props: { as: { type: [Object, String], default: "div" }, disabled: { type: [Boolean], default: false }, by: { type: [String, Function], default: () => re }, modelValue: { type: [Object, String, Number, Boolean], default: void 0 }, defaultValue: { type: [Object, String, Number, Boolean], default: void 0 }, form: { type: String, optional: true }, name: { type: String, optional: true }, id: { type: String, default: () => `headlessui-radiogroup-${t$4()}` } }, inheritAttrs: false, setup(t2, { emit: c2, attrs: u2, slots: E2, expose: d2 }) {
  let s3 = ref(null), i2 = ref([]), R2 = K({ name: "RadioGroupLabel" }), w2 = M({ name: "RadioGroupDescription" });
  d2({ el: s3, $el: s3 });
  let [f2, S2] = d$5(computed(() => t2.modelValue), (e2) => c2("update:modelValue", e2), computed(() => t2.defaultValue)), p2 = { options: i2, value: f2, disabled: computed(() => t2.disabled), firstOption: computed(() => i2.value.find((e2) => !e2.propsRef.disabled)), containsCheckedOption: computed(() => i2.value.some((e2) => p2.compare(toRaw(e2.propsRef.value), toRaw(t2.modelValue)))), compare(e2, a2) {
    if (typeof t2.by == "string") {
      let n2 = t2.by;
      return (e2 == null ? void 0 : e2[n2]) === (a2 == null ? void 0 : a2[n2]);
    }
    return t2.by(e2, a2);
  }, change(e2) {
    var n2;
    if (t2.disabled || p2.compare(toRaw(f2.value), toRaw(e2)))
      return false;
    let a2 = (n2 = i2.value.find((l2) => p2.compare(toRaw(l2.propsRef.value), toRaw(e2)))) == null ? void 0 : n2.propsRef;
    return a2 != null && a2.disabled ? false : (S2(e2), true);
  }, registerOption(e2) {
    i2.value.push(e2), i2.value = O(i2.value, (a2) => a2.element);
  }, unregisterOption(e2) {
    let a2 = i2.value.findIndex((n2) => n2.id === e2);
    a2 !== -1 && i2.value.splice(a2, 1);
  } };
  provide(j$3, p2), p$4({ container: computed(() => o(s3)), accept(e2) {
    return e2.getAttribute("role") === "radio" ? NodeFilter.FILTER_REJECT : e2.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
  }, walk(e2) {
    e2.setAttribute("role", "none");
  } });
  function m2(e2) {
    if (!s3.value || !s3.value.contains(e2.target))
      return;
    let a2 = i2.value.filter((n2) => n2.propsRef.disabled === false).map((n2) => n2.element);
    switch (e2.key) {
      case o$1.Enter:
        p$3(e2.currentTarget);
        break;
      case o$1.ArrowLeft:
      case o$1.ArrowUp:
        if (e2.preventDefault(), e2.stopPropagation(), P$2(a2, N$3.Previous | N$3.WrapAround) === T$1.Success) {
          let l2 = i2.value.find((r2) => {
            var b2;
            return r2.element === ((b2 = m$3(s3)) == null ? void 0 : b2.activeElement);
          });
          l2 && p2.change(l2.propsRef.value);
        }
        break;
      case o$1.ArrowRight:
      case o$1.ArrowDown:
        if (e2.preventDefault(), e2.stopPropagation(), P$2(a2, N$3.Next | N$3.WrapAround) === T$1.Success) {
          let l2 = i2.value.find((r2) => {
            var b2;
            return r2.element === ((b2 = m$3(r2.element)) == null ? void 0 : b2.activeElement);
          });
          l2 && p2.change(l2.propsRef.value);
        }
        break;
      case o$1.Space:
        {
          e2.preventDefault(), e2.stopPropagation();
          let n2 = i2.value.find((l2) => {
            var r2;
            return l2.element === ((r2 = m$3(l2.element)) == null ? void 0 : r2.activeElement);
          });
          n2 && p2.change(n2.propsRef.value);
        }
        break;
    }
  }
  let v2 = computed(() => {
    var e2;
    return (e2 = o(s3)) == null ? void 0 : e2.closest("form");
  });
  return onMounted(() => {
    watch$1([v2], () => {
      if (!v2.value || t2.defaultValue === void 0)
        return;
      function e2() {
        p2.change(t2.defaultValue);
      }
      return v2.value.addEventListener("reset", e2), () => {
        var a2;
        (a2 = v2.value) == null || a2.removeEventListener("reset", e2);
      };
    }, { immediate: true });
  }), () => {
    let { disabled: e2, name: a2, id: n2, form: l2, ...r2 } = t2, b2 = { ref: s3, id: n2, role: "radiogroup", "aria-labelledby": R2.value, "aria-describedby": w2.value, onKeydown: m2 };
    return h$1(Fragment$1, [...a2 != null && f2.value != null ? e$1({ [a2]: f2.value }).map(([T2, G2]) => h$1(f$1, K$1({ features: a$3.Hidden, key: T2, as: "input", type: "hidden", hidden: true, readOnly: true, form: l2, name: T2, value: G2 }))) : [], H$3({ ourProps: b2, theirProps: { ...u2, ...T$2(r2, ["modelValue", "defaultValue", "by"]) }, slot: {}, attrs: u2, slots: E2, name: "RadioGroup" })]);
  };
} });
var ie = ((u2) => (u2[u2.Empty = 1] = "Empty", u2[u2.Active = 2] = "Active", u2))(ie || {});
let Ee = defineComponent({ name: "RadioGroupOption", props: { as: { type: [Object, String], default: "div" }, value: { type: [Object, String, Number, Boolean] }, disabled: { type: Boolean, default: false }, id: { type: String, default: () => `headlessui-radiogroup-option-${t$4()}` } }, setup(t2, { attrs: c2, slots: u2, expose: E2 }) {
  let d2 = H$1("RadioGroupOption"), s3 = K({ name: "RadioGroupLabel" }), i2 = M({ name: "RadioGroupDescription" }), R2 = ref(null), w2 = computed(() => ({ value: t2.value, disabled: t2.disabled })), f2 = ref(1);
  E2({ el: R2, $el: R2 });
  let S2 = computed(() => o(R2));
  onMounted(() => d2.registerOption({ id: t2.id, element: S2, propsRef: w2 })), onUnmounted(() => d2.unregisterOption(t2.id));
  let p2 = computed(() => {
    var r2;
    return ((r2 = d2.firstOption.value) == null ? void 0 : r2.id) === t2.id;
  }), m2 = computed(() => d2.disabled.value || t2.disabled), v2 = computed(() => d2.compare(toRaw(d2.value.value), toRaw(t2.value))), e2 = computed(() => m2.value ? -1 : v2.value || !d2.containsCheckedOption.value && p2.value ? 0 : -1);
  function a2() {
    var r2;
    d2.change(t2.value) && (f2.value |= 2, (r2 = o(R2)) == null || r2.focus());
  }
  function n2() {
    f2.value |= 2;
  }
  function l2() {
    f2.value &= -3;
  }
  return () => {
    let { id: r2, value: b2, disabled: T2, ...G2 } = t2, N2 = { checked: v2.value, disabled: m2.value, active: Boolean(f2.value & 2) }, K2 = { id: r2, ref: R2, role: "radio", "aria-checked": v2.value ? "true" : "false", "aria-labelledby": s3.value, "aria-describedby": i2.value, "aria-disabled": m2.value ? true : void 0, tabIndex: e2.value, onClick: m2.value ? void 0 : a2, onFocus: m2.value ? void 0 : n2, onBlur: m2.value ? void 0 : l2 };
    return H$3({ ourProps: K2, theirProps: G2, slot: N2, attrs: c2, slots: u2, name: "RadioGroupOption" });
  };
} }), we = T;
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "buttonSelect",
  props: {
    context: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props2 = __props;
    const borderStyle = props2.context.attrs["selected-style"] === "border";
    const orientation = props2.context.attrs.orientation ?? "grid";
    const labelClass = props2.context.attrs["option-label-classes"] ?? void 0;
    let divClasses = "grid grid-cols-4 gap-3 sm:grid-cols-6";
    switch (orientation) {
      case "col":
        divClasses = "flex flex-col gap-3";
        break;
      case "row":
        divClasses = "flex flex-wrap gap-3";
        break;
    }
    const commonClasses = "cursor-pointer focus:outline-none border rounded-md flex items-center justify-center py-3 px-2 text-sm formkit-disabled:bg-normal-200 formkit-disabled:text-normal-500 flex-1";
    let classes = (checked, active) => [
      commonClasses,
      active ? "ring-2 ring-offset-2 ring-primary-500" : "",
      checked ? "bg-primary-100 border-primary-500 text-primary-800" : "bg-white border-normal-300 hover:bg-normal-50"
    ];
    const stepOnClick = props2.context.attrs["step-next"] === true;
    const clickHandler = stepOnClick ? () => {
      setTimeout(() => {
        var _a, _b;
        (_b = (_a = props2.context.node.parent) == null ? void 0 : _a.context) == null ? void 0 : _b.handlers.incrementStep(
          1,
          props2.context.node.parent.context
        )();
      }, 0);
    } : () => {
    };
    if (borderStyle) {
      classes = (checked, active) => [
        commonClasses,
        checked ? "border-transparent" : "border-normal-300",
        active ? "border-primary-500 ring-2 ring-primary-500" : "",
        "relative bg-white border rounded-md focus:outline-none"
      ];
    }
    return (_ctx, _cache) => {
      const _component_HeadlessRadioGroupLabel = we;
      const _component_HeadlessRadioGroupOption = Ee;
      const _component_HeadlessRadioGroup = ke;
      return openBlock(), createBlock(_component_HeadlessRadioGroup, {
        "default-value": props2.context._value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = async (value) => {
          await props2.context.node.input(value, true);
          unref(clickHandler)();
        })
      }, {
        default: withCtx(() => [
          createBaseVNode("div", {
            class: normalizeClass(unref(divClasses))
          }, [
            (openBlock(true), createElementBlock(Fragment$1, null, renderList(props2.context.options, (child) => {
              return openBlock(), createBlock(_component_HeadlessRadioGroupOption, {
                key: child.value,
                as: "template",
                value: child.value
              }, {
                default: withCtx(({ checked, active }) => [
                  createBaseVNode("div", {
                    class: normalizeClass(unref(classes)(checked, active))
                  }, [
                    createVNode(_component_HeadlessRadioGroupLabel, {
                      as: "span",
                      class: normalizeClass(unref(labelClass) ?? "whitespace-nowrap")
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(child.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["class"]),
                    borderStyle ? (openBlock(), createElementBlock("span", {
                      key: 0,
                      class: normalizeClass([
                        active ? "border" : "border-2",
                        checked ? "border-primary-500" : "border-transparent",
                        "pointer-events-none absolute -inset-px rounded-md"
                      ]),
                      "aria-hidden": "true"
                    }, null, 2)) : createCommentVNode("", true)
                  ], 2)
                ]),
                _: 2
              }, 1032, ["value"]);
            }), 128))
          ], 2)
        ]),
        _: 1
      }, 8, ["default-value"]);
    };
  }
});
const welcome_vue_vue_type_style_index_0_scoped_a75d3b4d_lang = "";
const _export_sfc = (sfc, props2) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props2) {
    target[key] = val;
  }
  return target;
};
const Fragment = /* @__PURE__ */ defineComponent({
  name: "FragmentWrapper",
  setup(_props, { slots }) {
    return () => {
      var _a;
      return (_a = slots.default) == null ? void 0 : _a.call(slots);
    };
  }
});
const _wrapIf = (component, props2, slots) => {
  return { default: () => props2 ? h$1(component, props2 === true ? {} : props2, slots) : h$1(Fragment, {}, slots) };
};
function w(e2, n2, t2) {
  c$3.isServer || watchEffect((o2) => {
    window.addEventListener(e2, n2, t2), o2(() => window.removeEventListener(e2, n2, t2));
  });
}
var d$3 = ((r2) => (r2[r2.Forwards = 0] = "Forwards", r2[r2.Backwards = 1] = "Backwards", r2))(d$3 || {});
function n() {
  let o2 = ref(0);
  return w("keydown", (e2) => {
    e2.key === "Tab" && (o2.value = e2.shiftKey ? 1 : 0);
  }), o2;
}
function E$2(n2, e2, o2, r2) {
  c$3.isServer || watchEffect((t2) => {
    n2 = n2 != null ? n2 : window, n2.addEventListener(e2, o2, r2), t2(() => n2.removeEventListener(e2, o2, r2));
  });
}
function t$2(e2) {
  typeof queueMicrotask == "function" ? queueMicrotask(e2) : Promise.resolve().then(e2).catch((o2) => setTimeout(() => {
    throw o2;
  }));
}
function t$1(n2) {
  function e2() {
    document.readyState !== "loading" && (n2(), document.removeEventListener("DOMContentLoaded", e2));
  }
  typeof window != "undefined" && typeof document != "undefined" && (document.addEventListener("DOMContentLoaded", e2), e2());
}
function B$1(e2) {
  if (!e2)
    return /* @__PURE__ */ new Set();
  if (typeof e2 == "function")
    return new Set(e2());
  let t2 = /* @__PURE__ */ new Set();
  for (let l2 of e2.value) {
    let o$12 = o(l2);
    o$12 instanceof HTMLElement && t2.add(o$12);
  }
  return t2;
}
var A$1 = ((n2) => (n2[n2.None = 1] = "None", n2[n2.InitialFocus = 2] = "InitialFocus", n2[n2.TabLock = 4] = "TabLock", n2[n2.FocusLock = 8] = "FocusLock", n2[n2.RestoreFocus = 16] = "RestoreFocus", n2[n2.All = 30] = "All", n2))(A$1 || {});
let ce$3 = Object.assign(defineComponent({ name: "FocusTrap", props: { as: { type: [Object, String], default: "div" }, initialFocus: { type: Object, default: null }, features: { type: Number, default: 30 }, containers: { type: [Object, Function], default: ref(/* @__PURE__ */ new Set()) } }, inheritAttrs: false, setup(e2, { attrs: t2, slots: l2, expose: o$12 }) {
  let r2 = ref(null);
  o$12({ el: r2, $el: r2 });
  let i2 = computed(() => m$3(r2)), n$12 = ref(false);
  onMounted(() => n$12.value = true), onUnmounted(() => n$12.value = false), z({ ownerDocument: i2 }, computed(() => n$12.value && Boolean(e2.features & 16)));
  let m2 = J({ ownerDocument: i2, container: r2, initialFocus: computed(() => e2.initialFocus) }, computed(() => n$12.value && Boolean(e2.features & 2)));
  Q$1({ ownerDocument: i2, container: r2, containers: e2.containers, previousActiveElement: m2 }, computed(() => n$12.value && Boolean(e2.features & 8)));
  let c2 = n();
  function u2(a2) {
    let d2 = o(r2);
    if (!d2)
      return;
    ((g2) => g2())(() => {
      u$4(c2.value, { [d$3.Forwards]: () => {
        P$2(d2, N$3.First, { skipElements: [a2.relatedTarget] });
      }, [d$3.Backwards]: () => {
        P$2(d2, N$3.Last, { skipElements: [a2.relatedTarget] });
      } });
    });
  }
  let s3 = ref(false);
  function H2(a2) {
    a2.key === "Tab" && (s3.value = true, requestAnimationFrame(() => {
      s3.value = false;
    }));
  }
  function M2(a2) {
    if (!n$12.value)
      return;
    let d2 = B$1(e2.containers);
    o(r2) instanceof HTMLElement && d2.add(o(r2));
    let E2 = a2.relatedTarget;
    E2 instanceof HTMLElement && E2.dataset.headlessuiFocusGuard !== "true" && (N$1(d2, E2) || (s3.value ? P$2(o(r2), u$4(c2.value, { [d$3.Forwards]: () => N$3.Next, [d$3.Backwards]: () => N$3.Previous }) | N$3.WrapAround, { relativeTo: a2.target }) : a2.target instanceof HTMLElement && S$2(a2.target)));
  }
  return () => {
    let a2 = {}, d2 = { ref: r2, onKeydown: H2, onFocusout: M2 }, { features: E2, initialFocus: g2, containers: X2, ...O2 } = e2;
    return h$1(Fragment$1, [Boolean(E2 & 4) && h$1(f$1, { as: "button", type: "button", "data-headlessui-focus-guard": true, onFocus: u2, features: a$3.Focusable }), H$3({ ourProps: d2, theirProps: { ...t2, ...O2 }, slot: a2, attrs: t2, slots: l2, name: "FocusTrap" }), Boolean(E2 & 4) && h$1(f$1, { as: "button", type: "button", "data-headlessui-focus-guard": true, onFocus: u2, features: a$3.Focusable })]);
  };
} }), { features: A$1 }), L$3 = [];
t$1(() => {
  function e2(t2) {
    t2.target instanceof HTMLElement && t2.target !== document.body && L$3[0] !== t2.target && (L$3.unshift(t2.target), L$3 = L$3.filter((l2) => l2 != null && l2.isConnected), L$3.splice(10));
  }
  window.addEventListener("click", e2, { capture: true }), window.addEventListener("mousedown", e2, { capture: true }), window.addEventListener("focus", e2, { capture: true }), document.body.addEventListener("click", e2, { capture: true }), document.body.addEventListener("mousedown", e2, { capture: true }), document.body.addEventListener("focus", e2, { capture: true });
});
function x$1(e2) {
  let t2 = ref(L$3.slice());
  return watch$1([e2], ([l2], [o2]) => {
    o2 === true && l2 === false ? t$2(() => {
      t2.value.splice(0);
    }) : o2 === false && l2 === true && (t2.value = L$3.slice());
  }, { flush: "post" }), () => {
    var l2;
    return (l2 = t2.value.find((o2) => o2 != null && o2.isConnected)) != null ? l2 : null;
  };
}
function z({ ownerDocument: e2 }, t2) {
  let l2 = x$1(t2);
  onMounted(() => {
    watchEffect(() => {
      var o2, r2;
      t2.value || ((o2 = e2.value) == null ? void 0 : o2.activeElement) === ((r2 = e2.value) == null ? void 0 : r2.body) && S$2(l2());
    }, { flush: "post" });
  }), onUnmounted(() => {
    S$2(l2());
  });
}
function J({ ownerDocument: e2, container: t2, initialFocus: l2 }, o$12) {
  let r2 = ref(null), i2 = ref(false);
  return onMounted(() => i2.value = true), onUnmounted(() => i2.value = false), onMounted(() => {
    watch$1([t2, l2, o$12], (n2, m2) => {
      if (n2.every((u2, s3) => (m2 == null ? void 0 : m2[s3]) === u2) || !o$12.value)
        return;
      let c2 = o(t2);
      c2 && t$2(() => {
        var H2, M2;
        if (!i2.value)
          return;
        let u2 = o(l2), s3 = (H2 = e2.value) == null ? void 0 : H2.activeElement;
        if (u2) {
          if (u2 === s3) {
            r2.value = s3;
            return;
          }
        } else if (c2.contains(s3)) {
          r2.value = s3;
          return;
        }
        u2 ? S$2(u2) : P$2(c2, N$3.First | N$3.NoScroll) === T$1.Error && console.warn("There are no focusable elements inside the <FocusTrap />"), r2.value = (M2 = e2.value) == null ? void 0 : M2.activeElement;
      });
    }, { immediate: true, flush: "post" });
  }), r2;
}
function Q$1({ ownerDocument: e2, container: t2, containers: l2, previousActiveElement: o$12 }, r2) {
  var i2;
  E$2((i2 = e2.value) == null ? void 0 : i2.defaultView, "focus", (n2) => {
    if (!r2.value)
      return;
    let m2 = B$1(l2);
    o(t2) instanceof HTMLElement && m2.add(o(t2));
    let c2 = o$12.value;
    if (!c2)
      return;
    let u2 = n2.target;
    u2 && u2 instanceof HTMLElement ? N$1(m2, u2) ? (o$12.value = u2, S$2(u2)) : (n2.preventDefault(), n2.stopPropagation(), S$2(c2)) : S$2(o$12.value);
  }, true);
}
function N$1(e2, t2) {
  for (let l2 of e2)
    if (l2.contains(t2))
      return true;
  return false;
}
let i = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
function E$1(d2, f2 = ref(true)) {
  watchEffect((o$12) => {
    var a2;
    if (!f2.value)
      return;
    let e2 = o(d2);
    if (!e2)
      return;
    o$12(function() {
      var u2;
      if (!e2)
        return;
      let r2 = (u2 = t.get(e2)) != null ? u2 : 1;
      if (r2 === 1 ? t.delete(e2) : t.set(e2, r2 - 1), r2 !== 1)
        return;
      let n2 = i.get(e2);
      n2 && (n2["aria-hidden"] === null ? e2.removeAttribute("aria-hidden") : e2.setAttribute("aria-hidden", n2["aria-hidden"]), e2.inert = n2.inert, i.delete(e2));
    });
    let l2 = (a2 = t.get(e2)) != null ? a2 : 0;
    t.set(e2, l2 + 1), l2 === 0 && (i.set(e2, { "aria-hidden": e2.getAttribute("aria-hidden"), inert: e2.inert }), e2.setAttribute("aria-hidden", "true"), e2.inert = true);
  });
}
let e = Symbol("ForcePortalRootContext");
function u$1() {
  return inject(e, false);
}
let P$1 = defineComponent({ name: "ForcePortalRoot", props: { as: { type: [Object, String], default: "template" }, force: { type: Boolean, default: false } }, setup(o2, { slots: t2, attrs: r2 }) {
  return provide(e, o2.force), () => {
    let { force: f2, ...n2 } = o2;
    return H$3({ theirProps: n2, ourProps: {}, slot: {}, slots: t2, attrs: r2, name: "ForcePortalRoot" });
  };
} });
function c$1(t2) {
  let r2 = m$3(t2);
  if (!r2) {
    if (t2 === null)
      return null;
    throw new Error(`[Headless UI]: Cannot find ownerDocument for contextElement: ${t2}`);
  }
  let o2 = r2.getElementById("headlessui-portal-root");
  if (o2)
    return o2;
  let e2 = r2.createElement("div");
  return e2.setAttribute("id", "headlessui-portal-root"), r2.body.appendChild(e2);
}
let R$1 = defineComponent({ name: "Portal", props: { as: { type: [Object, String], default: "div" } }, setup(t2, { slots: r2, attrs: o2 }) {
  let e2 = ref(null), p2 = computed(() => m$3(e2)), n2 = u$1(), u2 = inject(g$3, null), l2 = ref(n2 === true || u2 == null ? c$1(e2.value) : u2.resolveTarget());
  return watchEffect(() => {
    n2 || u2 != null && (l2.value = u2.resolveTarget());
  }), onUnmounted(() => {
    var i2, m2;
    let a2 = (i2 = p2.value) == null ? void 0 : i2.getElementById("headlessui-portal-root");
    a2 && l2.value === a2 && l2.value.children.length <= 0 && ((m2 = l2.value.parentElement) == null || m2.removeChild(l2.value));
  }), () => {
    if (l2.value === null)
      return null;
    let a2 = { ref: e2, "data-headlessui-portal": "" };
    return h$1(Teleport, { to: l2.value }, H$3({ ourProps: a2, theirProps: t2, slot: {}, attrs: o2, slots: r2, name: "Portal" }));
  };
} }), g$3 = Symbol("PortalGroupContext"), L$2 = defineComponent({ name: "PortalGroup", props: { as: { type: [Object, String], default: "template" }, target: { type: Object, default: null } }, setup(t2, { attrs: r2, slots: o2 }) {
  let e2 = reactive({ resolveTarget() {
    return t2.target;
  } });
  return provide(g$3, e2), () => {
    let { target: p2, ...n2 } = t2;
    return H$3({ theirProps: n2, ourProps: {}, slot: {}, attrs: r2, slots: o2, name: "PortalGroup" });
  };
} });
let u = Symbol("StackContext");
var p$1 = ((e2) => (e2[e2.Add = 0] = "Add", e2[e2.Remove = 1] = "Remove", e2))(p$1 || {});
function v() {
  return inject(u, () => {
  });
}
function S$1({ type: o2, enabled: r2, element: e2, onUpdate: i2 }) {
  let a2 = v();
  function t2(...n2) {
    i2 == null || i2(...n2), a2(...n2);
  }
  onMounted(() => {
    watch$1(r2, (n2, d2) => {
      n2 ? t2(0, o2, e2) : d2 === true && t2(1, o2, e2);
    }, { immediate: true, flush: "sync" });
  }), onUnmounted(() => {
    r2.value && t2(1, o2, e2);
  }), provide(u, t2);
}
function m$2(t2) {
  let e2 = shallowRef(t2.getSnapshot());
  return onUnmounted(t2.subscribe(() => {
    e2.value = t2.getSnapshot();
  })), e2;
}
function r() {
  let n2 = [], s3 = { addEventListener(e2, t2, i2, a2) {
    return e2.addEventListener(t2, i2, a2), s3.add(() => e2.removeEventListener(t2, i2, a2));
  }, requestAnimationFrame(...e2) {
    let t2 = requestAnimationFrame(...e2);
    s3.add(() => cancelAnimationFrame(t2));
  }, nextFrame(...e2) {
    s3.requestAnimationFrame(() => {
      s3.requestAnimationFrame(...e2);
    });
  }, setTimeout(...e2) {
    let t2 = setTimeout(...e2);
    s3.add(() => clearTimeout(t2));
  }, style(e2, t2, i2) {
    let a2 = e2.style.getPropertyValue(t2);
    return Object.assign(e2.style, { [t2]: i2 }), this.add(() => {
      Object.assign(e2.style, { [t2]: a2 });
    });
  }, group(e2) {
    let t2 = r();
    return e2(t2), this.add(() => t2.dispose());
  }, add(e2) {
    return n2.push(e2), () => {
      let t2 = n2.indexOf(e2);
      if (t2 >= 0)
        for (let i2 of n2.splice(t2, 1))
          i2();
    };
  }, dispose() {
    for (let e2 of n2.splice(0))
      e2();
  } };
  return s3;
}
function a$1(o2, r2) {
  let t2 = o2(), n2 = /* @__PURE__ */ new Set();
  return { getSnapshot() {
    return t2;
  }, subscribe(e2) {
    return n2.add(e2), () => n2.delete(e2);
  }, dispatch(e2, ...s3) {
    let i2 = r2[e2].call(t2, ...s3);
    i2 && (t2 = i2, n2.forEach((c2) => c2()));
  } };
}
function c() {
  let o2;
  return { before({ doc: e2 }) {
    var l2;
    let n2 = e2.documentElement;
    o2 = ((l2 = e2.defaultView) != null ? l2 : window).innerWidth - n2.clientWidth;
  }, after({ doc: e2, d: n2 }) {
    let t2 = e2.documentElement, l2 = t2.clientWidth - t2.offsetWidth, r2 = o2 - l2;
    n2.style(t2, "paddingRight", `${r2}px`);
  } };
}
function p() {
  if (!t$3())
    return {};
  let o2;
  return { before() {
    o2 = window.pageYOffset;
  }, after({ doc: r2, d: l2, meta: s3 }) {
    function i2(e2) {
      return s3.containers.flatMap((t2) => t2()).some((t2) => t2.contains(e2));
    }
    l2.style(r2.body, "marginTop", `-${o2}px`), window.scrollTo(0, 0);
    let n2 = null;
    l2.addEventListener(r2, "click", (e2) => {
      if (e2.target instanceof HTMLElement)
        try {
          let t2 = e2.target.closest("a");
          if (!t2)
            return;
          let { hash: c2 } = new URL(t2.href), a2 = r2.querySelector(c2);
          a2 && !i2(a2) && (n2 = a2);
        } catch {
        }
    }, true), l2.addEventListener(r2, "touchmove", (e2) => {
      e2.target instanceof HTMLElement && !i2(e2.target) && e2.preventDefault();
    }, { passive: false }), l2.add(() => {
      window.scrollTo(0, window.pageYOffset + o2), n2 && n2.isConnected && (n2.scrollIntoView({ block: "nearest" }), n2 = null);
    });
  } };
}
function l$1() {
  return { before({ doc: e2, d: o2 }) {
    o2.style(e2.documentElement, "overflow", "hidden");
  } };
}
function m$1(e2) {
  let n2 = {};
  for (let t2 of e2)
    Object.assign(n2, t2(n2));
  return n2;
}
let a = a$1(() => /* @__PURE__ */ new Map(), { PUSH(e2, n2) {
  var o2;
  let t2 = (o2 = this.get(e2)) != null ? o2 : { doc: e2, count: 0, d: r(), meta: /* @__PURE__ */ new Set() };
  return t2.count++, t2.meta.add(n2), this.set(e2, t2), this;
}, POP(e2, n2) {
  let t2 = this.get(e2);
  return t2 && (t2.count--, t2.meta.delete(n2)), this;
}, SCROLL_PREVENT({ doc: e2, d: n2, meta: t2 }) {
  let o2 = { doc: e2, d: n2, meta: m$1(t2) }, c$12 = [p(), c(), l$1()];
  c$12.forEach(({ before: r2 }) => r2 == null ? void 0 : r2(o2)), c$12.forEach(({ after: r2 }) => r2 == null ? void 0 : r2(o2));
}, SCROLL_ALLOW({ d: e2 }) {
  e2.dispose();
}, TEARDOWN({ doc: e2 }) {
  this.delete(e2);
} });
a.subscribe(() => {
  let e2 = a.getSnapshot(), n2 = /* @__PURE__ */ new Map();
  for (let [t2] of e2)
    n2.set(t2, t2.documentElement.style.overflow);
  for (let t2 of e2.values()) {
    let o2 = n2.get(t2.doc) === "hidden", c2 = t2.count !== 0;
    (c2 && !o2 || !c2 && o2) && a.dispatch(t2.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", t2), t2.count === 0 && a.dispatch("TEARDOWN", t2);
  }
});
function d$2(t2, a$12, n2) {
  let i2 = m$2(a), l2 = computed(() => {
    let e2 = t2.value ? i2.value.get(t2.value) : void 0;
    return e2 ? e2.count > 0 : false;
  });
  return watch$1([t2, a$12], ([e2, m2], [r2], o2) => {
    if (!e2 || !m2)
      return;
    a.dispatch("PUSH", e2, n2);
    let f2 = false;
    o2(() => {
      f2 || (a.dispatch("POP", r2 != null ? r2 : e2, n2), f2 = true);
    });
  }, { immediate: true }), l2;
}
var ye = ((l2) => (l2[l2.Open = 0] = "Open", l2[l2.Closed = 1] = "Closed", l2))(ye || {});
let I = Symbol("DialogContext");
function E(r2) {
  let n2 = inject(I, null);
  if (n2 === null) {
    let l2 = new Error(`<${r2} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(l2, E), l2;
  }
  return n2;
}
let H = "DC8F892D-2EBD-447C-A4C8-A03058436FF4";
defineComponent({ name: "Dialog", inheritAttrs: false, props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, open: { type: [Boolean, String], default: H }, initialFocus: { type: Object, default: null }, id: { type: String, default: () => `headlessui-dialog-${t$4()}` } }, emits: { close: (r2) => true }, setup(r2, { emit: n2, attrs: l2, slots: p2, expose: i2 }) {
  var N2;
  let a2 = ref(false);
  onMounted(() => {
    a2.value = true;
  });
  let f2 = ref(0), d2 = p$5(), m2 = computed(() => r2.open === H && d2 !== null ? (d2.value & l$2.Open) === l$2.Open : r2.open), v2 = ref(null), R2 = ref(null), O2 = computed(() => m$3(v2));
  if (i2({ el: v2, $el: v2 }), !(r2.open !== H || d2 !== null))
    throw new Error("You forgot to provide an `open` prop to the `Dialog`.");
  if (typeof m2.value != "boolean")
    throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${m2.value === H ? void 0 : r2.open}`);
  let c2 = computed(() => a2.value && m2.value ? 0 : 1), k2 = computed(() => c2.value === 0), w2 = computed(() => f2.value > 1), $2 = inject(I, null) !== null, G2 = computed(() => w2.value ? "parent" : "leaf"), j2 = computed(() => d2 !== null ? (d2.value & l$2.Closing) === l$2.Closing : false), V = computed(() => $2 || j2.value ? false : k2.value), J2 = computed(() => {
    var e2, t2, u2;
    return (u2 = Array.from((t2 = (e2 = O2.value) == null ? void 0 : e2.querySelectorAll("body > *")) != null ? t2 : []).find((s3) => s3.id === "headlessui-portal-root" ? false : s3.contains(o(R2)) && s3 instanceof HTMLElement)) != null ? u2 : null;
  });
  E$1(J2, V);
  let Q2 = computed(() => w2.value ? true : k2.value), W2 = computed(() => {
    var e2, t2, u2;
    return (u2 = Array.from((t2 = (e2 = O2.value) == null ? void 0 : e2.querySelectorAll("[data-headlessui-portal]")) != null ? t2 : []).find((s3) => s3.contains(o(R2)) && s3 instanceof HTMLElement)) != null ? u2 : null;
  });
  E$1(W2, Q2), S$1({ type: "Dialog", enabled: computed(() => c2.value === 0), element: v2, onUpdate: (e2, t2) => {
    if (t2 === "Dialog")
      return u$4(e2, { [p$1.Add]: () => f2.value += 1, [p$1.Remove]: () => f2.value -= 1 });
  } });
  let X2 = M({ name: "DialogDescription", slot: computed(() => ({ open: m2.value })) }), M$1 = ref(null), y$12 = { titleId: M$1, panelRef: ref(null), dialogState: c2, setTitleId(e2) {
    M$1.value !== e2 && (M$1.value = e2);
  }, close() {
    n2("close", false);
  } };
  provide(I, y$12);
  function x2() {
    var t2, u2, s3;
    return [...Array.from((u2 = (t2 = O2.value) == null ? void 0 : t2.querySelectorAll("html > *, body > *, [data-headlessui-portal]")) != null ? u2 : []).filter((g2) => !(g2 === document.body || g2 === document.head || !(g2 instanceof HTMLElement) || g2.contains(o(R2)) || y$12.panelRef.value && g2.contains(y$12.panelRef.value))), (s3 = y$12.panelRef.value) != null ? s3 : v2.value];
  }
  let Z2 = computed(() => !(!k2.value || w2.value));
  y(() => x2(), (e2, t2) => {
    y$12.close(), nextTick(() => t2 == null ? void 0 : t2.focus());
  }, Z2);
  let ee = computed(() => !(w2.value || c2.value !== 0));
  E$2((N2 = O2.value) == null ? void 0 : N2.defaultView, "keydown", (e2) => {
    ee.value && (e2.defaultPrevented || e2.key === o$1.Escape && (e2.preventDefault(), e2.stopPropagation(), y$12.close()));
  });
  let te2 = computed(() => !(j2.value || c2.value !== 0 || $2));
  return d$2(O2, te2, (e2) => {
    var t2;
    return { containers: [...(t2 = e2.containers) != null ? t2 : [], x2] };
  }), watchEffect((e2) => {
    if (c2.value !== 0)
      return;
    let t2 = o(v2);
    if (!t2)
      return;
    let u2 = new ResizeObserver((s3) => {
      for (let g2 of s3) {
        let h2 = g2.target.getBoundingClientRect();
        h2.x === 0 && h2.y === 0 && h2.width === 0 && h2.height === 0 && y$12.close();
      }
    });
    u2.observe(t2), e2(() => u2.disconnect());
  }), () => {
    let { id: e2, open: t2, initialFocus: u2, ...s3 } = r2, g2 = { ...l2, ref: v2, id: e2, role: "dialog", "aria-modal": c2.value === 0 ? true : void 0, "aria-labelledby": M$1.value, "aria-describedby": X2.value }, h2 = { open: c2.value === 0 };
    return h$1(P$1, { force: true }, () => [h$1(R$1, () => h$1(L$2, { target: v2.value }, () => h$1(P$1, { force: false }, () => h$1(ce$3, { initialFocus: u2, containers: x2, features: k2.value ? u$4(G2.value, { parent: ce$3.features.RestoreFocus, leaf: ce$3.features.All & ~ce$3.features.FocusLock }) : ce$3.features.None }, () => H$3({ ourProps: g2, theirProps: s3, slot: h2, attrs: l2, slots: p2, visible: c2.value === 0, features: N$4.RenderStrategy | N$4.Static, name: "Dialog" }))))), h$1(f$1, { features: a$3.Hidden, ref: R2 })]);
  };
} });
defineComponent({ name: "DialogOverlay", props: { as: { type: [Object, String], default: "div" }, id: { type: String, default: () => `headlessui-dialog-overlay-${t$4()}` } }, setup(r2, { attrs: n2, slots: l2 }) {
  let p2 = E("DialogOverlay");
  function i2(a2) {
    a2.target === a2.currentTarget && (a2.preventDefault(), a2.stopPropagation(), p2.close());
  }
  return () => {
    let { id: a2, ...f2 } = r2;
    return H$3({ ourProps: { id: a2, "aria-hidden": true, onClick: i2 }, theirProps: f2, slot: { open: p2.dialogState.value === 0 }, attrs: n2, slots: l2, name: "DialogOverlay" });
  };
} });
defineComponent({ name: "DialogBackdrop", props: { as: { type: [Object, String], default: "div" }, id: { type: String, default: () => `headlessui-dialog-backdrop-${t$4()}` } }, inheritAttrs: false, setup(r2, { attrs: n2, slots: l2, expose: p2 }) {
  let i2 = E("DialogBackdrop"), a2 = ref(null);
  return p2({ el: a2, $el: a2 }), onMounted(() => {
    if (i2.panelRef.value === null)
      throw new Error("A <DialogBackdrop /> component is being used, but a <DialogPanel /> component is missing.");
  }), () => {
    let { id: f2, ...d2 } = r2, m2 = { id: f2, ref: a2, "aria-hidden": true };
    return h$1(P$1, { force: true }, () => h$1(R$1, () => H$3({ ourProps: m2, theirProps: { ...n2, ...d2 }, slot: { open: i2.dialogState.value === 0 }, attrs: n2, slots: l2, name: "DialogBackdrop" })));
  };
} });
defineComponent({ name: "DialogPanel", props: { as: { type: [Object, String], default: "div" }, id: { type: String, default: () => `headlessui-dialog-panel-${t$4()}` } }, setup(r2, { attrs: n2, slots: l2, expose: p2 }) {
  let i2 = E("DialogPanel");
  p2({ el: i2.panelRef, $el: i2.panelRef });
  function a2(f2) {
    f2.stopPropagation();
  }
  return () => {
    let { id: f2, ...d2 } = r2, m2 = { id: f2, ref: i2.panelRef, onClick: a2 };
    return H$3({ ourProps: m2, theirProps: d2, slot: { open: i2.dialogState.value === 0 }, attrs: n2, slots: l2, name: "DialogPanel" });
  };
} });
defineComponent({ name: "DialogTitle", props: { as: { type: [Object, String], default: "h2" }, id: { type: String, default: () => `headlessui-dialog-title-${t$4()}` } }, setup(r2, { attrs: n2, slots: l2 }) {
  let p2 = E("DialogTitle");
  return onMounted(() => {
    p2.setTitleId(r2.id), onUnmounted(() => p2.setTitleId(null));
  }), () => {
    let { id: i2, ...a2 } = r2;
    return H$3({ ourProps: { id: i2 }, theirProps: a2, slot: { open: p2.dialogState.value === 0 }, attrs: n2, slots: l2, name: "DialogTitle" });
  };
} });
var j$2 = ((o2) => (o2[o2.Open = 0] = "Open", o2[o2.Closed = 1] = "Closed", o2))(j$2 || {});
let x = Symbol("DisclosureContext");
function g$2(t2) {
  let r2 = inject(x, null);
  if (r2 === null) {
    let o2 = new Error(`<${t2} /> is missing a parent <Disclosure /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(o2, g$2), o2;
  }
  return r2;
}
let B = Symbol("DisclosurePanelContext");
function $() {
  return inject(B, null);
}
defineComponent({ name: "Disclosure", props: { as: { type: [Object, String], default: "template" }, defaultOpen: { type: [Boolean], default: false } }, setup(t2, { slots: r2, attrs: o$12 }) {
  let u2 = ref(t2.defaultOpen ? 0 : 1), e2 = ref(null), i2 = ref(null), s3 = { buttonId: ref(null), panelId: ref(null), disclosureState: u2, panel: e2, button: i2, toggleDisclosure() {
    u2.value = u$4(u2.value, { [0]: 1, [1]: 0 });
  }, closeDisclosure() {
    u2.value !== 1 && (u2.value = 1);
  }, close(l2) {
    s3.closeDisclosure();
    let a2 = (() => l2 ? l2 instanceof HTMLElement ? l2 : l2.value instanceof HTMLElement ? o(l2) : o(s3.button) : o(s3.button))();
    a2 == null || a2.focus();
  } };
  return provide(x, s3), c$4(computed(() => u$4(u2.value, { [0]: l$2.Open, [1]: l$2.Closed }))), () => {
    let { defaultOpen: l2, ...a2 } = t2, c2 = { open: u2.value === 0, close: s3.close };
    return H$3({ theirProps: a2, ourProps: {}, slot: c2, slots: r2, attrs: o$12, name: "Disclosure" });
  };
} });
defineComponent({ name: "DisclosureButton", props: { as: { type: [Object, String], default: "button" }, disabled: { type: [Boolean], default: false }, id: { type: String, default: () => `headlessui-disclosure-button-${t$4()}` } }, setup(t2, { attrs: r2, slots: o$2, expose: u2 }) {
  let e2 = g$2("DisclosureButton");
  onMounted(() => {
    e2.buttonId.value = t2.id;
  }), onUnmounted(() => {
    e2.buttonId.value = null;
  });
  let i2 = $(), s3 = computed(() => i2 === null ? false : i2.value === e2.panelId.value), l2 = ref(null);
  u2({ el: l2, $el: l2 }), s3.value || watchEffect(() => {
    e2.button.value = l2.value;
  });
  let a2 = b$1(computed(() => ({ as: t2.as, type: r2.type })), l2);
  function c2() {
    var n2;
    t2.disabled || (s3.value ? (e2.toggleDisclosure(), (n2 = o(e2.button)) == null || n2.focus()) : e2.toggleDisclosure());
  }
  function D(n2) {
    var S2;
    if (!t2.disabled)
      if (s3.value)
        switch (n2.key) {
          case o$1.Space:
          case o$1.Enter:
            n2.preventDefault(), n2.stopPropagation(), e2.toggleDisclosure(), (S2 = o(e2.button)) == null || S2.focus();
            break;
        }
      else
        switch (n2.key) {
          case o$1.Space:
          case o$1.Enter:
            n2.preventDefault(), n2.stopPropagation(), e2.toggleDisclosure();
            break;
        }
  }
  function T2(n2) {
    switch (n2.key) {
      case o$1.Space:
        n2.preventDefault();
        break;
    }
  }
  return () => {
    let n2 = { open: e2.disclosureState.value === 0 }, { id: S2, ...k2 } = t2, K2 = s3.value ? { ref: l2, type: a2.value, onClick: c2, onKeydown: D } : { id: S2, ref: l2, type: a2.value, "aria-expanded": t2.disabled ? void 0 : e2.disclosureState.value === 0, "aria-controls": o(e2.panel) ? e2.panelId.value : void 0, disabled: t2.disabled ? true : void 0, onClick: c2, onKeydown: D, onKeyup: T2 };
    return H$3({ ourProps: K2, theirProps: k2, slot: n2, attrs: r2, slots: o$2, name: "DisclosureButton" });
  };
} });
defineComponent({ name: "DisclosurePanel", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, id: { type: String, default: () => `headlessui-disclosure-panel-${t$4()}` } }, setup(t2, { attrs: r2, slots: o2, expose: u2 }) {
  let e2 = g$2("DisclosurePanel");
  onMounted(() => {
    e2.panelId.value = t2.id;
  }), onUnmounted(() => {
    e2.panelId.value = null;
  }), u2({ el: e2.panel, $el: e2.panel }), provide(B, e2.panelId);
  let i2 = p$5(), s3 = computed(() => i2 !== null ? (i2.value & l$2.Open) === l$2.Open : e2.disclosureState.value === 0);
  return () => {
    let l2 = { open: e2.disclosureState.value === 0, close: e2.close }, { id: a2, ...c2 } = t2, D = { id: a2, ref: e2.panel };
    return H$3({ ourProps: D, theirProps: c2, slot: l2, attrs: r2, slots: o2, features: N$4.RenderStrategy | N$4.Static, visible: s3.value, name: "DisclosurePanel" });
  };
} });
function de$1(t2, b2) {
  return t2 === b2;
}
var fe = ((u2) => (u2[u2.Open = 0] = "Open", u2[u2.Closed = 1] = "Closed", u2))(fe || {}), pe$1 = ((u2) => (u2[u2.Single = 0] = "Single", u2[u2.Multi = 1] = "Multi", u2))(pe$1 || {}), ce$2 = ((u2) => (u2[u2.Pointer = 0] = "Pointer", u2[u2.Other = 1] = "Other", u2))(ce$2 || {});
function ve(t2) {
  requestAnimationFrame(() => requestAnimationFrame(t2));
}
let U$1 = Symbol("ListboxContext");
function j$1(t2) {
  let b2 = inject(U$1, null);
  if (b2 === null) {
    let u2 = new Error(`<${t2} /> is missing a parent <Listbox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(u2, j$1), u2;
  }
  return b2;
}
defineComponent({ name: "Listbox", emits: { "update:modelValue": (t2) => true }, props: { as: { type: [Object, String], default: "template" }, disabled: { type: [Boolean], default: false }, by: { type: [String, Function], default: () => de$1 }, horizontal: { type: [Boolean], default: false }, modelValue: { type: [Object, String, Number, Boolean], default: void 0 }, defaultValue: { type: [Object, String, Number, Boolean], default: void 0 }, form: { type: String, optional: true }, name: { type: String, optional: true }, multiple: { type: [Boolean], default: false } }, inheritAttrs: false, setup(t2, { slots: b2, attrs: u2, emit: L2 }) {
  let e2 = ref(1), d2 = ref(null), m2 = ref(null), x2 = ref(null), f2 = ref([]), o$12 = ref(""), i2 = ref(null), w2 = ref(1);
  function R2(a2 = (l2) => l2) {
    let l2 = i2.value !== null ? f2.value[i2.value] : null, r2 = O(a2(f2.value.slice()), (S2) => o(S2.dataRef.domRef)), s3 = l2 ? r2.indexOf(l2) : null;
    return s3 === -1 && (s3 = null), { options: r2, activeOptionIndex: s3 };
  }
  let h$2 = computed(() => t2.multiple ? 1 : 0), [y$12, M2] = d$5(computed(() => t2.modelValue === void 0 ? u$4(h$2.value, { [1]: [], [0]: void 0 }) : t2.modelValue), (a2) => L2("update:modelValue", a2), computed(() => t2.defaultValue)), n2 = { listboxState: e2, value: y$12, mode: h$2, compare(a2, l2) {
    if (typeof t2.by == "string") {
      let r2 = t2.by;
      return (a2 == null ? void 0 : a2[r2]) === (l2 == null ? void 0 : l2[r2]);
    }
    return t2.by(a2, l2);
  }, orientation: computed(() => t2.horizontal ? "horizontal" : "vertical"), labelRef: d2, buttonRef: m2, optionsRef: x2, disabled: computed(() => t2.disabled), options: f2, searchQuery: o$12, activeOptionIndex: i2, activationTrigger: w2, closeListbox() {
    t2.disabled || e2.value !== 1 && (e2.value = 1, i2.value = null);
  }, openListbox() {
    t2.disabled || e2.value !== 0 && (e2.value = 0);
  }, goToOption(a2, l2, r2) {
    if (t2.disabled || e2.value === 1)
      return;
    let s3 = R2(), S2 = x$2(a2 === a$4.Specific ? { focus: a$4.Specific, id: l2 } : { focus: a2 }, { resolveItems: () => s3.options, resolveActiveIndex: () => s3.activeOptionIndex, resolveId: (k2) => k2.id, resolveDisabled: (k2) => k2.dataRef.disabled });
    o$12.value = "", i2.value = S2, w2.value = r2 != null ? r2 : 1, f2.value = s3.options;
  }, search(a2) {
    if (t2.disabled || e2.value === 1)
      return;
    let r2 = o$12.value !== "" ? 0 : 1;
    o$12.value += a2.toLowerCase();
    let S2 = (i2.value !== null ? f2.value.slice(i2.value + r2).concat(f2.value.slice(0, i2.value + r2)) : f2.value).find((V) => V.dataRef.textValue.startsWith(o$12.value) && !V.dataRef.disabled), k2 = S2 ? f2.value.indexOf(S2) : -1;
    k2 === -1 || k2 === i2.value || (i2.value = k2, w2.value = 1);
  }, clearSearch() {
    t2.disabled || e2.value !== 1 && o$12.value !== "" && (o$12.value = "");
  }, registerOption(a2, l2) {
    let r2 = R2((s3) => [...s3, { id: a2, dataRef: l2 }]);
    f2.value = r2.options, i2.value = r2.activeOptionIndex;
  }, unregisterOption(a2) {
    let l2 = R2((r2) => {
      let s3 = r2.findIndex((S2) => S2.id === a2);
      return s3 !== -1 && r2.splice(s3, 1), r2;
    });
    f2.value = l2.options, i2.value = l2.activeOptionIndex, w2.value = 1;
  }, select(a2) {
    t2.disabled || M2(u$4(h$2.value, { [0]: () => a2, [1]: () => {
      let l2 = toRaw(n2.value.value).slice(), r2 = toRaw(a2), s3 = l2.findIndex((S2) => n2.compare(r2, toRaw(S2)));
      return s3 === -1 ? l2.push(r2) : l2.splice(s3, 1), l2;
    } }));
  } };
  y([m2, x2], (a2, l2) => {
    var r2;
    n2.closeListbox(), w$1(l2, h.Loose) || (a2.preventDefault(), (r2 = o(m2)) == null || r2.focus());
  }, computed(() => e2.value === 0)), provide(U$1, n2), c$4(computed(() => u$4(e2.value, { [0]: l$2.Open, [1]: l$2.Closed })));
  let p2 = computed(() => {
    var a2;
    return (a2 = o(m2)) == null ? void 0 : a2.closest("form");
  });
  return onMounted(() => {
    watch$1([p2], () => {
      if (!p2.value || t2.defaultValue === void 0)
        return;
      function a2() {
        n2.select(t2.defaultValue);
      }
      return p2.value.addEventListener("reset", a2), () => {
        var l2;
        (l2 = p2.value) == null || l2.removeEventListener("reset", a2);
      };
    }, { immediate: true });
  }), () => {
    let { name: a2, modelValue: l2, disabled: r2, form: s3, ...S2 } = t2, k2 = { open: e2.value === 0, disabled: r2, value: y$12.value };
    return h$1(Fragment$1, [...a2 != null && y$12.value != null ? e$1({ [a2]: y$12.value }).map(([V, $2]) => h$1(f$1, K$1({ features: a$3.Hidden, key: V, as: "input", type: "hidden", hidden: true, readOnly: true, form: s3, name: V, value: $2 }))) : [], H$3({ ourProps: {}, theirProps: { ...u2, ...T$2(S2, ["defaultValue", "onUpdate:modelValue", "horizontal", "multiple", "by"]) }, slot: k2, slots: b2, attrs: u2, name: "Listbox" })]);
  };
} });
defineComponent({ name: "ListboxLabel", props: { as: { type: [Object, String], default: "label" }, id: { type: String, default: () => `headlessui-listbox-label-${t$4()}` } }, setup(t2, { attrs: b2, slots: u2 }) {
  let L2 = j$1("ListboxLabel");
  function e2() {
    var d2;
    (d2 = o(L2.buttonRef)) == null || d2.focus({ preventScroll: true });
  }
  return () => {
    let d2 = { open: L2.listboxState.value === 0, disabled: L2.disabled.value }, { id: m2, ...x2 } = t2, f2 = { id: m2, ref: L2.labelRef, onClick: e2 };
    return H$3({ ourProps: f2, theirProps: x2, slot: d2, attrs: b2, slots: u2, name: "ListboxLabel" });
  };
} });
defineComponent({ name: "ListboxButton", props: { as: { type: [Object, String], default: "button" }, id: { type: String, default: () => `headlessui-listbox-button-${t$4()}` } }, setup(t2, { attrs: b2, slots: u2, expose: L2 }) {
  let e2 = j$1("ListboxButton");
  L2({ el: e2.buttonRef, $el: e2.buttonRef });
  function d2(o$2) {
    switch (o$2.key) {
      case o$1.Space:
      case o$1.Enter:
      case o$1.ArrowDown:
        o$2.preventDefault(), e2.openListbox(), nextTick(() => {
          var i2;
          (i2 = o(e2.optionsRef)) == null || i2.focus({ preventScroll: true }), e2.value.value || e2.goToOption(a$4.First);
        });
        break;
      case o$1.ArrowUp:
        o$2.preventDefault(), e2.openListbox(), nextTick(() => {
          var i2;
          (i2 = o(e2.optionsRef)) == null || i2.focus({ preventScroll: true }), e2.value.value || e2.goToOption(a$4.Last);
        });
        break;
    }
  }
  function m2(o2) {
    switch (o2.key) {
      case o$1.Space:
        o2.preventDefault();
        break;
    }
  }
  function x2(o$12) {
    e2.disabled.value || (e2.listboxState.value === 0 ? (e2.closeListbox(), nextTick(() => {
      var i2;
      return (i2 = o(e2.buttonRef)) == null ? void 0 : i2.focus({ preventScroll: true });
    })) : (o$12.preventDefault(), e2.openListbox(), ve(() => {
      var i2;
      return (i2 = o(e2.optionsRef)) == null ? void 0 : i2.focus({ preventScroll: true });
    })));
  }
  let f2 = b$1(computed(() => ({ as: t2.as, type: b2.type })), e2.buttonRef);
  return () => {
    var h2, y2;
    let o$12 = { open: e2.listboxState.value === 0, disabled: e2.disabled.value, value: e2.value.value }, { id: i2, ...w2 } = t2, R2 = { ref: e2.buttonRef, id: i2, type: f2.value, "aria-haspopup": "listbox", "aria-controls": (h2 = o(e2.optionsRef)) == null ? void 0 : h2.id, "aria-expanded": e2.disabled.value ? void 0 : e2.listboxState.value === 0, "aria-labelledby": e2.labelRef.value ? [(y2 = o(e2.labelRef)) == null ? void 0 : y2.id, i2].join(" ") : void 0, disabled: e2.disabled.value === true ? true : void 0, onKeydown: d2, onKeyup: m2, onClick: x2 };
    return H$3({ ourProps: R2, theirProps: w2, slot: o$12, attrs: b2, slots: u2, name: "ListboxButton" });
  };
} });
defineComponent({ name: "ListboxOptions", props: { as: { type: [Object, String], default: "ul" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, id: { type: String, default: () => `headlessui-listbox-options-${t$4()}` } }, setup(t2, { attrs: b2, slots: u2, expose: L2 }) {
  let e2 = j$1("ListboxOptions"), d2 = ref(null);
  L2({ el: e2.optionsRef, $el: e2.optionsRef });
  function m2(o$2) {
    switch (d2.value && clearTimeout(d2.value), o$2.key) {
      case o$1.Space:
        if (e2.searchQuery.value !== "")
          return o$2.preventDefault(), o$2.stopPropagation(), e2.search(o$2.key);
      case o$1.Enter:
        if (o$2.preventDefault(), o$2.stopPropagation(), e2.activeOptionIndex.value !== null) {
          let i2 = e2.options.value[e2.activeOptionIndex.value];
          e2.select(i2.dataRef.value);
        }
        e2.mode.value === 0 && (e2.closeListbox(), nextTick(() => {
          var i2;
          return (i2 = o(e2.buttonRef)) == null ? void 0 : i2.focus({ preventScroll: true });
        }));
        break;
      case u$4(e2.orientation.value, { vertical: o$1.ArrowDown, horizontal: o$1.ArrowRight }):
        return o$2.preventDefault(), o$2.stopPropagation(), e2.goToOption(a$4.Next);
      case u$4(e2.orientation.value, { vertical: o$1.ArrowUp, horizontal: o$1.ArrowLeft }):
        return o$2.preventDefault(), o$2.stopPropagation(), e2.goToOption(a$4.Previous);
      case o$1.Home:
      case o$1.PageUp:
        return o$2.preventDefault(), o$2.stopPropagation(), e2.goToOption(a$4.First);
      case o$1.End:
      case o$1.PageDown:
        return o$2.preventDefault(), o$2.stopPropagation(), e2.goToOption(a$4.Last);
      case o$1.Escape:
        o$2.preventDefault(), o$2.stopPropagation(), e2.closeListbox(), nextTick(() => {
          var i2;
          return (i2 = o(e2.buttonRef)) == null ? void 0 : i2.focus({ preventScroll: true });
        });
        break;
      case o$1.Tab:
        o$2.preventDefault(), o$2.stopPropagation();
        break;
      default:
        o$2.key.length === 1 && (e2.search(o$2.key), d2.value = setTimeout(() => e2.clearSearch(), 350));
        break;
    }
  }
  let x2 = p$5(), f2 = computed(() => x2 !== null ? (x2.value & l$2.Open) === l$2.Open : e2.listboxState.value === 0);
  return () => {
    var h2, y2, M2, n2;
    let o$12 = { open: e2.listboxState.value === 0 }, { id: i2, ...w2 } = t2, R2 = { "aria-activedescendant": e2.activeOptionIndex.value === null || (h2 = e2.options.value[e2.activeOptionIndex.value]) == null ? void 0 : h2.id, "aria-multiselectable": e2.mode.value === 1 ? true : void 0, "aria-labelledby": (n2 = (y2 = o(e2.labelRef)) == null ? void 0 : y2.id) != null ? n2 : (M2 = o(e2.buttonRef)) == null ? void 0 : M2.id, "aria-orientation": e2.orientation.value, id: i2, onKeydown: m2, role: "listbox", tabIndex: 0, ref: e2.optionsRef };
    return H$3({ ourProps: R2, theirProps: w2, slot: o$12, attrs: b2, slots: u2, features: N$4.RenderStrategy | N$4.Static, visible: f2.value, name: "ListboxOptions" });
  };
} });
defineComponent({ name: "ListboxOption", props: { as: { type: [Object, String], default: "li" }, value: { type: [Object, String, Number, Boolean] }, disabled: { type: Boolean, default: false }, id: { type: String, default: () => `headlessui-listbox.option-${t$4()}` } }, setup(t2, { slots: b2, attrs: u2, expose: L2 }) {
  let e2 = j$1("ListboxOption"), d2 = ref(null);
  L2({ el: d2, $el: d2 });
  let m2 = computed(() => e2.activeOptionIndex.value !== null ? e2.options.value[e2.activeOptionIndex.value].id === t2.id : false), x2 = computed(() => u$4(e2.mode.value, { [0]: () => e2.compare(toRaw(e2.value.value), toRaw(t2.value)), [1]: () => toRaw(e2.value.value).some((n2) => e2.compare(toRaw(n2), toRaw(t2.value))) })), f2 = computed(() => u$4(e2.mode.value, { [1]: () => {
    var p2;
    let n2 = toRaw(e2.value.value);
    return ((p2 = e2.options.value.find((a2) => n2.some((l2) => e2.compare(toRaw(l2), toRaw(a2.dataRef.value))))) == null ? void 0 : p2.id) === t2.id;
  }, [0]: () => x2.value })), o$12 = computed(() => ({ disabled: t2.disabled, value: t2.value, textValue: "", domRef: d2 }));
  onMounted(() => {
    var p2, a2;
    let n2 = (a2 = (p2 = o(d2)) == null ? void 0 : p2.textContent) == null ? void 0 : a2.toLowerCase().trim();
    n2 !== void 0 && (o$12.value.textValue = n2);
  }), onMounted(() => e2.registerOption(t2.id, o$12)), onUnmounted(() => e2.unregisterOption(t2.id)), onMounted(() => {
    watch$1([e2.listboxState, x2], () => {
      e2.listboxState.value === 0 && x2.value && u$4(e2.mode.value, { [1]: () => {
        f2.value && e2.goToOption(a$4.Specific, t2.id);
      }, [0]: () => {
        e2.goToOption(a$4.Specific, t2.id);
      } });
    }, { immediate: true });
  }), watchEffect(() => {
    e2.listboxState.value === 0 && m2.value && e2.activationTrigger.value !== 0 && nextTick(() => {
      var n2, p2;
      return (p2 = (n2 = o(d2)) == null ? void 0 : n2.scrollIntoView) == null ? void 0 : p2.call(n2, { block: "nearest" });
    });
  });
  function i2(n2) {
    if (t2.disabled)
      return n2.preventDefault();
    e2.select(t2.value), e2.mode.value === 0 && (e2.closeListbox(), nextTick(() => {
      var p2;
      return (p2 = o(e2.buttonRef)) == null ? void 0 : p2.focus({ preventScroll: true });
    }));
  }
  function w2() {
    if (t2.disabled)
      return e2.goToOption(a$4.Nothing);
    e2.goToOption(a$4.Specific, t2.id);
  }
  let R2 = u$2();
  function h2(n2) {
    R2.update(n2);
  }
  function y2(n2) {
    R2.wasMoved(n2) && (t2.disabled || m2.value || e2.goToOption(a$4.Specific, t2.id, 0));
  }
  function M2(n2) {
    R2.wasMoved(n2) && (t2.disabled || m2.value && e2.goToOption(a$4.Nothing));
  }
  return () => {
    let { disabled: n2 } = t2, p2 = { active: m2.value, selected: x2.value, disabled: n2 }, { id: a2, value: l2, disabled: r2, ...s3 } = t2, S2 = { id: a2, ref: d2, role: "option", tabIndex: n2 === true ? void 0 : -1, "aria-disabled": n2 === true ? true : void 0, "aria-selected": x2.value, disabled: void 0, onClick: i2, onFocus: w2, onPointerenter: h2, onMouseenter: h2, onPointermove: y2, onMousemove: y2, onPointerleave: M2, onMouseleave: M2 };
    return H$3({ ourProps: S2, theirProps: s3, slot: p2, attrs: u2, slots: b2, name: "ListboxOption" });
  };
} });
var X = ((l2) => (l2[l2.Open = 0] = "Open", l2[l2.Closed = 1] = "Closed", l2))(X || {}), Y = ((l2) => (l2[l2.Pointer = 0] = "Pointer", l2[l2.Other = 1] = "Other", l2))(Y || {});
function Z(a2) {
  requestAnimationFrame(() => requestAnimationFrame(a2));
}
let A = Symbol("MenuContext");
function P(a2) {
  let b2 = inject(A, null);
  if (b2 === null) {
    let l2 = new Error(`<${a2} /> is missing a parent <Menu /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(l2, P), l2;
  }
  return b2;
}
defineComponent({ name: "Menu", props: { as: { type: [Object, String], default: "template" } }, setup(a2, { slots: b2, attrs: l2 }) {
  let g2 = ref(1), e2 = ref(null), m2 = ref(null), s3 = ref([]), p2 = ref(""), d2 = ref(null), o$12 = ref(1);
  function t2(u2 = (r2) => r2) {
    let r2 = d2.value !== null ? s3.value[d2.value] : null, n2 = O(u2(s3.value.slice()), (I2) => o(I2.dataRef.domRef)), i2 = r2 ? n2.indexOf(r2) : null;
    return i2 === -1 && (i2 = null), { items: n2, activeItemIndex: i2 };
  }
  let v2 = { menuState: g2, buttonRef: e2, itemsRef: m2, items: s3, searchQuery: p2, activeItemIndex: d2, activationTrigger: o$12, closeMenu: () => {
    g2.value = 1, d2.value = null;
  }, openMenu: () => g2.value = 0, goToItem(u2, r2, n2) {
    let i2 = t2(), I2 = x$2(u2 === a$4.Specific ? { focus: a$4.Specific, id: r2 } : { focus: u2 }, { resolveItems: () => i2.items, resolveActiveIndex: () => i2.activeItemIndex, resolveId: (M2) => M2.id, resolveDisabled: (M2) => M2.dataRef.disabled });
    p2.value = "", d2.value = I2, o$12.value = n2 != null ? n2 : 1, s3.value = i2.items;
  }, search(u2) {
    let n2 = p2.value !== "" ? 0 : 1;
    p2.value += u2.toLowerCase();
    let I2 = (d2.value !== null ? s3.value.slice(d2.value + n2).concat(s3.value.slice(0, d2.value + n2)) : s3.value).find((O2) => O2.dataRef.textValue.startsWith(p2.value) && !O2.dataRef.disabled), M2 = I2 ? s3.value.indexOf(I2) : -1;
    M2 === -1 || M2 === d2.value || (d2.value = M2, o$12.value = 1);
  }, clearSearch() {
    p2.value = "";
  }, registerItem(u2, r2) {
    let n2 = t2((i2) => [...i2, { id: u2, dataRef: r2 }]);
    s3.value = n2.items, d2.value = n2.activeItemIndex, o$12.value = 1;
  }, unregisterItem(u2) {
    let r2 = t2((n2) => {
      let i2 = n2.findIndex((I2) => I2.id === u2);
      return i2 !== -1 && n2.splice(i2, 1), n2;
    });
    s3.value = r2.items, d2.value = r2.activeItemIndex, o$12.value = 1;
  } };
  return y([e2, m2], (u2, r2) => {
    var n2;
    v2.closeMenu(), w$1(r2, h.Loose) || (u2.preventDefault(), (n2 = o(e2)) == null || n2.focus());
  }, computed(() => g2.value === 0)), provide(A, v2), c$4(computed(() => u$4(g2.value, { [0]: l$2.Open, [1]: l$2.Closed }))), () => {
    let u2 = { open: g2.value === 0, close: v2.closeMenu };
    return H$3({ ourProps: {}, theirProps: a2, slot: u2, slots: b2, attrs: l2, name: "Menu" });
  };
} });
defineComponent({ name: "MenuButton", props: { disabled: { type: Boolean, default: false }, as: { type: [Object, String], default: "button" }, id: { type: String, default: () => `headlessui-menu-button-${t$4()}` } }, setup(a2, { attrs: b2, slots: l2, expose: g2 }) {
  let e2 = P("MenuButton");
  g2({ el: e2.buttonRef, $el: e2.buttonRef });
  function m2(o$2) {
    switch (o$2.key) {
      case o$1.Space:
      case o$1.Enter:
      case o$1.ArrowDown:
        o$2.preventDefault(), o$2.stopPropagation(), e2.openMenu(), nextTick(() => {
          var t2;
          (t2 = o(e2.itemsRef)) == null || t2.focus({ preventScroll: true }), e2.goToItem(a$4.First);
        });
        break;
      case o$1.ArrowUp:
        o$2.preventDefault(), o$2.stopPropagation(), e2.openMenu(), nextTick(() => {
          var t2;
          (t2 = o(e2.itemsRef)) == null || t2.focus({ preventScroll: true }), e2.goToItem(a$4.Last);
        });
        break;
    }
  }
  function s3(o2) {
    switch (o2.key) {
      case o$1.Space:
        o2.preventDefault();
        break;
    }
  }
  function p2(o$12) {
    a2.disabled || (e2.menuState.value === 0 ? (e2.closeMenu(), nextTick(() => {
      var t2;
      return (t2 = o(e2.buttonRef)) == null ? void 0 : t2.focus({ preventScroll: true });
    })) : (o$12.preventDefault(), e2.openMenu(), Z(() => {
      var t2;
      return (t2 = o(e2.itemsRef)) == null ? void 0 : t2.focus({ preventScroll: true });
    })));
  }
  let d2 = b$1(computed(() => ({ as: a2.as, type: b2.type })), e2.buttonRef);
  return () => {
    var r2;
    let o$12 = { open: e2.menuState.value === 0 }, { id: t2, ...v2 } = a2, u2 = { ref: e2.buttonRef, id: t2, type: d2.value, "aria-haspopup": "menu", "aria-controls": (r2 = o(e2.itemsRef)) == null ? void 0 : r2.id, "aria-expanded": a2.disabled ? void 0 : e2.menuState.value === 0, onKeydown: m2, onKeyup: s3, onClick: p2 };
    return H$3({ ourProps: u2, theirProps: v2, slot: o$12, attrs: b2, slots: l2, name: "MenuButton" });
  };
} });
defineComponent({ name: "MenuItems", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, id: { type: String, default: () => `headlessui-menu-items-${t$4()}` } }, setup(a2, { attrs: b2, slots: l2, expose: g2 }) {
  let e2 = P("MenuItems"), m2 = ref(null);
  g2({ el: e2.itemsRef, $el: e2.itemsRef }), p$4({ container: computed(() => o(e2.itemsRef)), enabled: computed(() => e2.menuState.value === 0), accept(t2) {
    return t2.getAttribute("role") === "menuitem" ? NodeFilter.FILTER_REJECT : t2.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
  }, walk(t2) {
    t2.setAttribute("role", "none");
  } });
  function s3(t2) {
    var v2;
    switch (m2.value && clearTimeout(m2.value), t2.key) {
      case o$1.Space:
        if (e2.searchQuery.value !== "")
          return t2.preventDefault(), t2.stopPropagation(), e2.search(t2.key);
      case o$1.Enter:
        if (t2.preventDefault(), t2.stopPropagation(), e2.activeItemIndex.value !== null) {
          let r2 = e2.items.value[e2.activeItemIndex.value];
          (v2 = o(r2.dataRef.domRef)) == null || v2.click();
        }
        e2.closeMenu(), _(o(e2.buttonRef));
        break;
      case o$1.ArrowDown:
        return t2.preventDefault(), t2.stopPropagation(), e2.goToItem(a$4.Next);
      case o$1.ArrowUp:
        return t2.preventDefault(), t2.stopPropagation(), e2.goToItem(a$4.Previous);
      case o$1.Home:
      case o$1.PageUp:
        return t2.preventDefault(), t2.stopPropagation(), e2.goToItem(a$4.First);
      case o$1.End:
      case o$1.PageDown:
        return t2.preventDefault(), t2.stopPropagation(), e2.goToItem(a$4.Last);
      case o$1.Escape:
        t2.preventDefault(), t2.stopPropagation(), e2.closeMenu(), nextTick(() => {
          var u2;
          return (u2 = o(e2.buttonRef)) == null ? void 0 : u2.focus({ preventScroll: true });
        });
        break;
      case o$1.Tab:
        t2.preventDefault(), t2.stopPropagation(), e2.closeMenu(), nextTick(() => v$1(o(e2.buttonRef), t2.shiftKey ? N$3.Previous : N$3.Next));
        break;
      default:
        t2.key.length === 1 && (e2.search(t2.key), m2.value = setTimeout(() => e2.clearSearch(), 350));
        break;
    }
  }
  function p2(t2) {
    switch (t2.key) {
      case o$1.Space:
        t2.preventDefault();
        break;
    }
  }
  let d2 = p$5(), o$2 = computed(() => d2 !== null ? (d2.value & l$2.Open) === l$2.Open : e2.menuState.value === 0);
  return () => {
    var n2, i2;
    let t2 = { open: e2.menuState.value === 0 }, { id: v2, ...u2 } = a2, r2 = { "aria-activedescendant": e2.activeItemIndex.value === null || (n2 = e2.items.value[e2.activeItemIndex.value]) == null ? void 0 : n2.id, "aria-labelledby": (i2 = o(e2.buttonRef)) == null ? void 0 : i2.id, id: v2, onKeydown: s3, onKeyup: p2, role: "menu", tabIndex: 0, ref: e2.itemsRef };
    return H$3({ ourProps: r2, theirProps: u2, slot: t2, attrs: b2, slots: l2, features: N$4.RenderStrategy | N$4.Static, visible: o$2.value, name: "MenuItems" });
  };
} });
defineComponent({ name: "MenuItem", inheritAttrs: false, props: { as: { type: [Object, String], default: "template" }, disabled: { type: Boolean, default: false }, id: { type: String, default: () => `headlessui-menu-item-${t$4()}` } }, setup(a2, { slots: b2, attrs: l2, expose: g2 }) {
  let e2 = P("MenuItem"), m2 = ref(null);
  g2({ el: m2, $el: m2 });
  let s3 = computed(() => e2.activeItemIndex.value !== null ? e2.items.value[e2.activeItemIndex.value].id === a2.id : false), p2 = computed(() => ({ disabled: a2.disabled, textValue: "", domRef: m2 }));
  onMounted(() => {
    var i2, I2;
    let n2 = (I2 = (i2 = o(m2)) == null ? void 0 : i2.textContent) == null ? void 0 : I2.toLowerCase().trim();
    n2 !== void 0 && (p2.value.textValue = n2);
  }), onMounted(() => e2.registerItem(a2.id, p2)), onUnmounted(() => e2.unregisterItem(a2.id)), watchEffect(() => {
    e2.menuState.value === 0 && s3.value && e2.activationTrigger.value !== 0 && nextTick(() => {
      var n2, i2;
      return (i2 = (n2 = o(m2)) == null ? void 0 : n2.scrollIntoView) == null ? void 0 : i2.call(n2, { block: "nearest" });
    });
  });
  function d2(n2) {
    if (a2.disabled)
      return n2.preventDefault();
    e2.closeMenu(), _(o(e2.buttonRef));
  }
  function o$12() {
    if (a2.disabled)
      return e2.goToItem(a$4.Nothing);
    e2.goToItem(a$4.Specific, a2.id);
  }
  let t2 = u$2();
  function v2(n2) {
    t2.update(n2);
  }
  function u2(n2) {
    t2.wasMoved(n2) && (a2.disabled || s3.value || e2.goToItem(a$4.Specific, a2.id, 0));
  }
  function r2(n2) {
    t2.wasMoved(n2) && (a2.disabled || s3.value && e2.goToItem(a$4.Nothing));
  }
  return () => {
    let { disabled: n2 } = a2, i2 = { active: s3.value, disabled: n2, close: e2.closeMenu }, { id: I2, ...M2 } = a2;
    return H$3({ ourProps: { id: I2, ref: m2, role: "menuitem", tabIndex: n2 === true ? void 0 : -1, "aria-disabled": n2 === true ? true : void 0, disabled: void 0, onClick: d2, onFocus: o$12, onPointerenter: v2, onMouseenter: v2, onPointermove: u2, onMousemove: u2, onPointerleave: r2, onMouseleave: r2 }, theirProps: { ...l2, ...M2 }, slot: i2, attrs: l2, slots: b2, name: "MenuItem" });
  };
} });
var ce$1 = ((p2) => (p2[p2.Open = 0] = "Open", p2[p2.Closed = 1] = "Closed", p2))(ce$1 || {});
let te$1 = Symbol("PopoverContext");
function W$1(c2) {
  let m2 = inject(te$1, null);
  if (m2 === null) {
    let p2 = new Error(`<${c2} /> is missing a parent <${Pe.name} /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(p2, W$1), p2;
  }
  return m2;
}
let oe = Symbol("PopoverGroupContext");
function ne() {
  return inject(oe, null);
}
let le$1 = Symbol("PopoverPanelContext");
function de() {
  return inject(le$1, null);
}
let Pe = defineComponent({ name: "Popover", props: { as: { type: [Object, String], default: "div" } }, setup(c2, { slots: m2, attrs: p2, expose: y$12 }) {
  var n2;
  let o$12 = ref(null);
  y$12({ el: o$12, $el: o$12 });
  let e2 = ref(1), f2 = ref(null), d2 = ref(null), I2 = ref(null), s3 = ref(null), b2 = computed(() => m$3(o$12)), P2 = computed(() => {
    var h2, D;
    if (!o(f2) || !o(s3))
      return false;
    for (let w2 of document.querySelectorAll("body > *"))
      if (Number(w2 == null ? void 0 : w2.contains(o(f2))) ^ Number(w2 == null ? void 0 : w2.contains(o(s3))))
        return true;
    let t2 = E$3(), r2 = t2.indexOf(o(f2)), u2 = (r2 + t2.length - 1) % t2.length, v2 = (r2 + 1) % t2.length, S2 = t2[u2], $2 = t2[v2];
    return !((h2 = o(s3)) != null && h2.contains(S2)) && !((D = o(s3)) != null && D.contains($2));
  }), a2 = { popoverState: e2, buttonId: ref(null), panelId: ref(null), panel: s3, button: f2, isPortalled: P2, beforePanelSentinel: d2, afterPanelSentinel: I2, togglePopover() {
    e2.value = u$4(e2.value, { [0]: 1, [1]: 0 });
  }, closePopover() {
    e2.value !== 1 && (e2.value = 1);
  }, close(t2) {
    a2.closePopover();
    let r2 = (() => t2 ? t2 instanceof HTMLElement ? t2 : t2.value instanceof HTMLElement ? o(t2) : o(a2.button) : o(a2.button))();
    r2 == null || r2.focus();
  } };
  provide(te$1, a2), c$4(computed(() => u$4(e2.value, { [0]: l$2.Open, [1]: l$2.Closed })));
  let F2 = { buttonId: a2.buttonId, panelId: a2.panelId, close() {
    a2.closePopover();
  } }, g2 = ne(), E2 = g2 == null ? void 0 : g2.registerPopover;
  function i2() {
    var t2, r2, u2, v2;
    return (v2 = g2 == null ? void 0 : g2.isFocusWithinPopoverGroup()) != null ? v2 : ((t2 = b2.value) == null ? void 0 : t2.activeElement) && (((r2 = o(f2)) == null ? void 0 : r2.contains(b2.value.activeElement)) || ((u2 = o(s3)) == null ? void 0 : u2.contains(b2.value.activeElement)));
  }
  return watchEffect(() => E2 == null ? void 0 : E2(F2)), E$2((n2 = b2.value) == null ? void 0 : n2.defaultView, "focus", (t2) => {
    var r2, u2;
    e2.value === 0 && (i2() || f2 && s3 && t2.target !== window && ((r2 = o(a2.beforePanelSentinel)) != null && r2.contains(t2.target) || (u2 = o(a2.afterPanelSentinel)) != null && u2.contains(t2.target) || a2.closePopover()));
  }, true), y([f2, s3], (t2, r2) => {
    var u2;
    a2.closePopover(), w$1(r2, h.Loose) || (t2.preventDefault(), (u2 = o(f2)) == null || u2.focus());
  }, computed(() => e2.value === 0)), () => {
    let t2 = { open: e2.value === 0, close: a2.close };
    return H$3({ theirProps: c2, ourProps: { ref: o$12 }, slot: t2, slots: m2, attrs: p2, name: "Popover" });
  };
} });
defineComponent({ name: "PopoverButton", props: { as: { type: [Object, String], default: "button" }, disabled: { type: [Boolean], default: false }, id: { type: String, default: () => `headlessui-popover-button-${t$4()}` } }, inheritAttrs: false, setup(c2, { attrs: m2, slots: p2, expose: y2 }) {
  let o$2 = W$1("PopoverButton"), e2 = computed(() => m$3(o$2.button));
  y2({ el: o$2.button, $el: o$2.button }), onMounted(() => {
    o$2.buttonId.value = c2.id;
  }), onUnmounted(() => {
    o$2.buttonId.value = null;
  });
  let f2 = ne(), d2 = f2 == null ? void 0 : f2.closeOthers, I2 = de(), s3 = computed(() => I2 === null ? false : I2.value === o$2.panelId.value), b2 = ref(null), P2 = `headlessui-focus-sentinel-${t$4()}`;
  s3.value || watchEffect(() => {
    o$2.button.value = b2.value;
  });
  let a2 = b$1(computed(() => ({ as: c2.as, type: m2.type })), b2);
  function F2(n2) {
    var t2, r2, u2, v2, S2;
    if (s3.value) {
      if (o$2.popoverState.value === 1)
        return;
      switch (n2.key) {
        case o$1.Space:
        case o$1.Enter:
          n2.preventDefault(), (r2 = (t2 = n2.target).click) == null || r2.call(t2), o$2.closePopover(), (u2 = o(o$2.button)) == null || u2.focus();
          break;
      }
    } else
      switch (n2.key) {
        case o$1.Space:
        case o$1.Enter:
          n2.preventDefault(), n2.stopPropagation(), o$2.popoverState.value === 1 && (d2 == null || d2(o$2.buttonId.value)), o$2.togglePopover();
          break;
        case o$1.Escape:
          if (o$2.popoverState.value !== 0)
            return d2 == null ? void 0 : d2(o$2.buttonId.value);
          if (!o(o$2.button) || (v2 = e2.value) != null && v2.activeElement && !((S2 = o(o$2.button)) != null && S2.contains(e2.value.activeElement)))
            return;
          n2.preventDefault(), n2.stopPropagation(), o$2.closePopover();
          break;
      }
  }
  function g2(n2) {
    s3.value || n2.key === o$1.Space && n2.preventDefault();
  }
  function E2(n2) {
    var t2, r2;
    c2.disabled || (s3.value ? (o$2.closePopover(), (t2 = o(o$2.button)) == null || t2.focus()) : (n2.preventDefault(), n2.stopPropagation(), o$2.popoverState.value === 1 && (d2 == null || d2(o$2.buttonId.value)), o$2.togglePopover(), (r2 = o(o$2.button)) == null || r2.focus()));
  }
  function i2(n2) {
    n2.preventDefault(), n2.stopPropagation();
  }
  return () => {
    let n$12 = o$2.popoverState.value === 0, t2 = { open: n$12 }, { id: r2, ...u2 } = c2, v2 = s3.value ? { ref: b2, type: a2.value, onKeydown: F2, onClick: E2 } : { ref: b2, id: r2, type: a2.value, "aria-expanded": c2.disabled ? void 0 : o$2.popoverState.value === 0, "aria-controls": o(o$2.panel) ? o$2.panelId.value : void 0, disabled: c2.disabled ? true : void 0, onKeydown: F2, onKeyup: g2, onClick: E2, onMousedown: i2 }, S2 = n();
    function $2() {
      let h2 = o(o$2.panel);
      if (!h2)
        return;
      function D() {
        u$4(S2.value, { [d$3.Forwards]: () => P$2(h2, N$3.First), [d$3.Backwards]: () => P$2(h2, N$3.Last) }) === T$1.Error && P$2(E$3().filter((re2) => re2.dataset.headlessuiFocusGuard !== "true"), u$4(S2.value, { [d$3.Forwards]: N$3.Next, [d$3.Backwards]: N$3.Previous }), { relativeTo: o(o$2.button) });
      }
      D();
    }
    return h$1(Fragment$1, [H$3({ ourProps: v2, theirProps: { ...m2, ...u2 }, slot: t2, attrs: m2, slots: p2, name: "PopoverButton" }), n$12 && !s3.value && o$2.isPortalled.value && h$1(f$1, { id: P2, features: a$3.Focusable, "data-headlessui-focus-guard": true, as: "button", type: "button", onFocus: $2 })]);
  };
} });
defineComponent({ name: "PopoverOverlay", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true } }, setup(c2, { attrs: m2, slots: p2 }) {
  let y2 = W$1("PopoverOverlay"), o2 = `headlessui-popover-overlay-${t$4()}`, e2 = p$5(), f2 = computed(() => e2 !== null ? (e2.value & l$2.Open) === l$2.Open : y2.popoverState.value === 0);
  function d2() {
    y2.closePopover();
  }
  return () => {
    let I2 = { open: y2.popoverState.value === 0 };
    return H$3({ ourProps: { id: o2, "aria-hidden": true, onClick: d2 }, theirProps: c2, slot: I2, attrs: m2, slots: p2, features: N$4.RenderStrategy | N$4.Static, visible: f2.value, name: "PopoverOverlay" });
  };
} });
defineComponent({ name: "PopoverPanel", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, focus: { type: Boolean, default: false }, id: { type: String, default: () => `headlessui-popover-panel-${t$4()}` } }, inheritAttrs: false, setup(c2, { attrs: m2, slots: p2, expose: y2 }) {
  let { focus: o$2 } = c2, e2 = W$1("PopoverPanel"), f2 = computed(() => m$3(e2.panel)), d2 = `headlessui-focus-sentinel-before-${t$4()}`, I2 = `headlessui-focus-sentinel-after-${t$4()}`;
  y2({ el: e2.panel, $el: e2.panel }), onMounted(() => {
    e2.panelId.value = c2.id;
  }), onUnmounted(() => {
    e2.panelId.value = null;
  }), provide(le$1, e2.panelId), watchEffect(() => {
    var n2, t2;
    if (!o$2 || e2.popoverState.value !== 0 || !e2.panel)
      return;
    let i2 = (n2 = f2.value) == null ? void 0 : n2.activeElement;
    (t2 = o(e2.panel)) != null && t2.contains(i2) || P$2(o(e2.panel), N$3.First);
  });
  let s3 = p$5(), b2 = computed(() => s3 !== null ? (s3.value & l$2.Open) === l$2.Open : e2.popoverState.value === 0);
  function P2(i2) {
    var n2, t2;
    switch (i2.key) {
      case o$1.Escape:
        if (e2.popoverState.value !== 0 || !o(e2.panel) || f2.value && !((n2 = o(e2.panel)) != null && n2.contains(f2.value.activeElement)))
          return;
        i2.preventDefault(), i2.stopPropagation(), e2.closePopover(), (t2 = o(e2.button)) == null || t2.focus();
        break;
    }
  }
  function a2(i2) {
    var t2, r2, u2, v2, S2;
    let n2 = i2.relatedTarget;
    n2 && o(e2.panel) && ((t2 = o(e2.panel)) != null && t2.contains(n2) || (e2.closePopover(), ((u2 = (r2 = o(e2.beforePanelSentinel)) == null ? void 0 : r2.contains) != null && u2.call(r2, n2) || (S2 = (v2 = o(e2.afterPanelSentinel)) == null ? void 0 : v2.contains) != null && S2.call(v2, n2)) && n2.focus({ preventScroll: true })));
  }
  let F2 = n();
  function g2() {
    let i2 = o(e2.panel);
    if (!i2)
      return;
    function n2() {
      u$4(F2.value, { [d$3.Forwards]: () => {
        var r2;
        P$2(i2, N$3.First) === T$1.Error && ((r2 = o(e2.afterPanelSentinel)) == null || r2.focus());
      }, [d$3.Backwards]: () => {
        var t2;
        (t2 = o(e2.button)) == null || t2.focus({ preventScroll: true });
      } });
    }
    n2();
  }
  function E2() {
    let i2 = o(e2.panel);
    if (!i2)
      return;
    function n2() {
      u$4(F2.value, { [d$3.Forwards]: () => {
        let t2 = o(e2.button), r2 = o(e2.panel);
        if (!t2)
          return;
        let u2 = E$3(), v2 = u2.indexOf(t2), S2 = u2.slice(0, v2 + 1), h2 = [...u2.slice(v2 + 1), ...S2];
        for (let D of h2.slice())
          if (D.dataset.headlessuiFocusGuard === "true" || r2 != null && r2.contains(D)) {
            let w2 = h2.indexOf(D);
            w2 !== -1 && h2.splice(w2, 1);
          }
        P$2(h2, N$3.First, { sorted: false });
      }, [d$3.Backwards]: () => {
        var r2;
        P$2(i2, N$3.Previous) === T$1.Error && ((r2 = o(e2.button)) == null || r2.focus());
      } });
    }
    n2();
  }
  return () => {
    let i2 = { open: e2.popoverState.value === 0, close: e2.close }, { id: n2, focus: t2, ...r2 } = c2, u2 = { ref: e2.panel, id: n2, onKeydown: P2, onFocusout: o$2 && e2.popoverState.value === 0 ? a2 : void 0, tabIndex: -1 };
    return H$3({ ourProps: u2, theirProps: { ...m2, ...r2 }, attrs: m2, slot: i2, slots: { ...p2, default: (...v2) => {
      var S2;
      return [h$1(Fragment$1, [b2.value && e2.isPortalled.value && h$1(f$1, { id: d2, ref: e2.beforePanelSentinel, features: a$3.Focusable, "data-headlessui-focus-guard": true, as: "button", type: "button", onFocus: g2 }), (S2 = p2.default) == null ? void 0 : S2.call(p2, ...v2), b2.value && e2.isPortalled.value && h$1(f$1, { id: I2, ref: e2.afterPanelSentinel, features: a$3.Focusable, "data-headlessui-focus-guard": true, as: "button", type: "button", onFocus: E2 })])];
    } }, features: N$4.RenderStrategy | N$4.Static, visible: b2.value, name: "PopoverPanel" });
  };
} });
defineComponent({ name: "PopoverGroup", props: { as: { type: [Object, String], default: "div" } }, setup(c2, { attrs: m2, slots: p2, expose: y2 }) {
  let o$12 = ref(null), e2 = shallowRef([]), f2 = computed(() => m$3(o$12));
  y2({ el: o$12, $el: o$12 });
  function d2(P2) {
    let a2 = e2.value.indexOf(P2);
    a2 !== -1 && e2.value.splice(a2, 1);
  }
  function I2(P2) {
    return e2.value.push(P2), () => {
      d2(P2);
    };
  }
  function s3() {
    var F2;
    let P2 = f2.value;
    if (!P2)
      return false;
    let a2 = P2.activeElement;
    return (F2 = o(o$12)) != null && F2.contains(a2) ? true : e2.value.some((g2) => {
      var E2, i2;
      return ((E2 = P2.getElementById(g2.buttonId.value)) == null ? void 0 : E2.contains(a2)) || ((i2 = P2.getElementById(g2.panelId.value)) == null ? void 0 : i2.contains(a2));
    });
  }
  function b2(P2) {
    for (let a2 of e2.value)
      a2.buttonId.value !== P2 && a2.close();
  }
  return provide(oe, { registerPopover: I2, unregisterPopover: d2, isFocusWithinPopoverGroup: s3, closeOthers: b2 }), () => H$3({ ourProps: { ref: o$12 }, theirProps: c2, slot: {}, attrs: m2, slots: p2, name: "PopoverGroup" });
} });
let S = Symbol("GroupContext");
defineComponent({ name: "SwitchGroup", props: { as: { type: [Object, String], default: "template" } }, setup(l2, { slots: p2, attrs: a2 }) {
  let o2 = ref(null), f2 = K({ name: "SwitchLabel", props: { htmlFor: computed(() => {
    var r2;
    return (r2 = o2.value) == null ? void 0 : r2.id;
  }), onClick(r2) {
    o2.value && (r2.currentTarget.tagName === "LABEL" && r2.preventDefault(), o2.value.click(), o2.value.focus({ preventScroll: true }));
  } } }), t2 = M({ name: "SwitchDescription" });
  return provide(S, { switchRef: o2, labelledby: f2, describedby: t2 }), () => H$3({ theirProps: l2, ourProps: {}, slot: {}, slots: p2, attrs: a2, name: "SwitchGroup" });
} });
defineComponent({ name: "Switch", emits: { "update:modelValue": (l2) => true }, props: { as: { type: [Object, String], default: "button" }, modelValue: { type: Boolean, default: void 0 }, defaultChecked: { type: Boolean, optional: true }, form: { type: String, optional: true }, name: { type: String, optional: true }, value: { type: String, optional: true }, id: { type: String, default: () => `headlessui-switch-${t$4()}` } }, inheritAttrs: false, setup(l2, { emit: p2, attrs: a2, slots: o$2, expose: f2 }) {
  let t2 = inject(S, null), [i2, r2] = d$5(computed(() => l2.modelValue), (e2) => p2("update:modelValue", e2), computed(() => l2.defaultChecked));
  function s3() {
    r2(!i2.value);
  }
  let w2 = ref(null), u2 = t2 === null ? w2 : t2.switchRef, g2 = b$1(computed(() => ({ as: l2.as, type: a2.type })), u2);
  f2({ el: u2, $el: u2 });
  function k2(e2) {
    e2.preventDefault(), s3();
  }
  function C2(e2) {
    e2.key === o$1.Space ? (e2.preventDefault(), s3()) : e2.key === o$1.Enter && p$3(e2.currentTarget);
  }
  function E2(e2) {
    e2.preventDefault();
  }
  let c2 = computed(() => {
    var e2, n2;
    return (n2 = (e2 = o(u2)) == null ? void 0 : e2.closest) == null ? void 0 : n2.call(e2, "form");
  });
  return onMounted(() => {
    watch$1([c2], () => {
      if (!c2.value || l2.defaultChecked === void 0)
        return;
      function e2() {
        r2(l2.defaultChecked);
      }
      return c2.value.addEventListener("reset", e2), () => {
        var n2;
        (n2 = c2.value) == null || n2.removeEventListener("reset", e2);
      };
    }, { immediate: true });
  }), () => {
    let { id: e2, name: n2, value: L2, form: D, ...R2 } = l2, K2 = { checked: i2.value }, x2 = { id: e2, ref: u2, role: "switch", type: g2.value, tabIndex: 0, "aria-checked": i2.value, "aria-labelledby": t2 == null ? void 0 : t2.labelledby.value, "aria-describedby": t2 == null ? void 0 : t2.describedby.value, onClick: k2, onKeyup: C2, onKeypress: E2 };
    return h$1(Fragment$1, [n2 != null && i2.value != null ? h$1(f$1, K$1({ features: a$3.Hidden, as: "input", type: "checkbox", hidden: true, readOnly: true, checked: i2.value, form: D, name: n2, value: L2 })) : null, H$3({ ourProps: x2, theirProps: { ...a2, ...T$2(R2, ["modelValue", "defaultChecked"]) }, slot: K2, attrs: a2, slots: o$2, name: "Switch" })]);
  };
} });
let d$1 = defineComponent({ props: { onFocus: { type: Function, required: true } }, setup(t2) {
  let n2 = ref(true);
  return () => n2.value ? h$1(f$1, { as: "button", type: "button", features: a$3.Focusable, onFocus(o2) {
    o2.preventDefault();
    let e2, a2 = 50;
    function r2() {
      var u2;
      if (a2-- <= 0) {
        e2 && cancelAnimationFrame(e2);
        return;
      }
      if ((u2 = t2.onFocus) != null && u2.call(t2)) {
        n2.value = false, cancelAnimationFrame(e2);
        return;
      }
      e2 = requestAnimationFrame(r2);
    }
    e2 = requestAnimationFrame(r2);
  } }) : null;
} });
var te = ((i2) => (i2[i2.Forwards = 0] = "Forwards", i2[i2.Backwards = 1] = "Backwards", i2))(te || {}), le = ((s3) => (s3[s3.Less = -1] = "Less", s3[s3.Equal = 0] = "Equal", s3[s3.Greater = 1] = "Greater", s3))(le || {});
let U = Symbol("TabsContext");
function k(a2) {
  let v2 = inject(U, null);
  if (v2 === null) {
    let i2 = new Error(`<${a2} /> is missing a parent <TabGroup /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(i2, k), i2;
  }
  return v2;
}
let j = Symbol("TabsSSRContext");
defineComponent({ name: "TabGroup", emits: { change: (a2) => true }, props: { as: { type: [Object, String], default: "template" }, selectedIndex: { type: [Number], default: null }, defaultIndex: { type: [Number], default: 0 }, vertical: { type: [Boolean], default: false }, manual: { type: [Boolean], default: false } }, inheritAttrs: false, setup(a2, { slots: v2, attrs: i2, emit: s3 }) {
  var h2;
  let l2 = ref((h2 = a2.selectedIndex) != null ? h2 : a2.defaultIndex), n2 = ref([]), o$12 = ref([]), T2 = computed(() => a2.selectedIndex !== null), b2 = computed(() => T2.value ? a2.selectedIndex : l2.value);
  function m2(t2) {
    var S2;
    let e2 = O(r2.tabs.value, o), u2 = O(r2.panels.value, o), f2 = e2.filter((p2) => {
      var E2;
      return !((E2 = o(p2)) != null && E2.hasAttribute("disabled"));
    });
    if (t2 < 0 || t2 > e2.length - 1) {
      let p2 = u$4(l2.value === null ? 0 : Math.sign(t2 - l2.value), { [-1]: () => 1, [0]: () => u$4(Math.sign(t2), { [-1]: () => 0, [0]: () => 0, [1]: () => 1 }), [1]: () => 0 });
      l2.value = u$4(p2, { [0]: () => e2.indexOf(f2[0]), [1]: () => e2.indexOf(f2[f2.length - 1]) }), r2.tabs.value = e2, r2.panels.value = u2;
    } else {
      let p2 = e2.slice(0, t2), G2 = [...e2.slice(t2), ...p2].find((W2) => f2.includes(W2));
      if (!G2)
        return;
      let B2 = (S2 = e2.indexOf(G2)) != null ? S2 : r2.selectedIndex.value;
      B2 === -1 && (B2 = r2.selectedIndex.value), l2.value = B2, r2.tabs.value = e2, r2.panels.value = u2;
    }
  }
  let r2 = { selectedIndex: computed(() => {
    var t2, e2;
    return (e2 = (t2 = l2.value) != null ? t2 : a2.defaultIndex) != null ? e2 : null;
  }), orientation: computed(() => a2.vertical ? "vertical" : "horizontal"), activation: computed(() => a2.manual ? "manual" : "auto"), tabs: n2, panels: o$12, setSelectedIndex(t2) {
    b2.value !== t2 && s3("change", t2), T2.value || m2(t2);
  }, registerTab(t2) {
    var f2;
    if (n2.value.includes(t2))
      return;
    let e2 = n2.value[l2.value];
    n2.value.push(t2), n2.value = O(n2.value, o);
    let u2 = (f2 = n2.value.indexOf(e2)) != null ? f2 : l2.value;
    u2 !== -1 && (l2.value = u2);
  }, unregisterTab(t2) {
    let e2 = n2.value.indexOf(t2);
    e2 !== -1 && n2.value.splice(e2, 1);
  }, registerPanel(t2) {
    o$12.value.includes(t2) || (o$12.value.push(t2), o$12.value = O(o$12.value, o));
  }, unregisterPanel(t2) {
    let e2 = o$12.value.indexOf(t2);
    e2 !== -1 && o$12.value.splice(e2, 1);
  } };
  provide(U, r2);
  let R2 = ref({ tabs: [], panels: [] }), y2 = ref(false);
  onMounted(() => {
    y2.value = true;
  }), provide(j, computed(() => y2.value ? null : R2.value));
  let w2 = computed(() => a2.selectedIndex);
  return onMounted(() => {
    watch$1([w2], () => {
      var t2;
      return m2((t2 = a2.selectedIndex) != null ? t2 : a2.defaultIndex);
    }, { immediate: true });
  }), watchEffect(() => {
    if (!T2.value || b2.value == null || r2.tabs.value.length <= 0)
      return;
    let t2 = O(r2.tabs.value, o);
    t2.some((u2, f2) => o(r2.tabs.value[f2]) !== o(u2)) && r2.setSelectedIndex(t2.findIndex((u2) => o(u2) === o(r2.tabs.value[b2.value])));
  }), () => {
    let t2 = { selectedIndex: l2.value };
    return h$1(Fragment$1, [n2.value.length <= 0 && h$1(d$1, { onFocus: () => {
      for (let e2 of n2.value) {
        let u2 = o(e2);
        if ((u2 == null ? void 0 : u2.tabIndex) === 0)
          return u2.focus(), true;
      }
      return false;
    } }), H$3({ theirProps: { ...i2, ...T$2(a2, ["selectedIndex", "defaultIndex", "manual", "vertical", "onChange"]) }, ourProps: {}, slot: t2, slots: v2, attrs: i2, name: "TabGroup" })]);
  };
} });
defineComponent({ name: "TabList", props: { as: { type: [Object, String], default: "div" } }, setup(a2, { attrs: v2, slots: i2 }) {
  let s3 = k("TabList");
  return () => {
    let l2 = { selectedIndex: s3.selectedIndex.value }, n2 = { role: "tablist", "aria-orientation": s3.orientation.value };
    return H$3({ ourProps: n2, theirProps: a2, slot: l2, attrs: v2, slots: i2, name: "TabList" });
  };
} });
defineComponent({ name: "Tab", props: { as: { type: [Object, String], default: "button" }, disabled: { type: [Boolean], default: false }, id: { type: String, default: () => `headlessui-tabs-tab-${t$4()}` } }, setup(a2, { attrs: v2, slots: i2, expose: s3 }) {
  let l2 = k("Tab"), n2 = ref(null);
  s3({ el: n2, $el: n2 }), onMounted(() => l2.registerTab(n2)), onUnmounted(() => l2.unregisterTab(n2));
  let o$2 = inject(j), T2 = computed(() => {
    if (o$2.value) {
      let e2 = o$2.value.tabs.indexOf(a2.id);
      return e2 === -1 ? o$2.value.tabs.push(a2.id) - 1 : e2;
    }
    return -1;
  }), b2 = computed(() => {
    let e2 = l2.tabs.value.indexOf(n2);
    return e2 === -1 ? T2.value : e2;
  }), m2 = computed(() => b2.value === l2.selectedIndex.value);
  function r2(e2) {
    var f2;
    let u2 = e2();
    if (u2 === T$1.Success && l2.activation.value === "auto") {
      let S2 = (f2 = m$3(n2)) == null ? void 0 : f2.activeElement, p2 = l2.tabs.value.findIndex((E2) => o(E2) === S2);
      p2 !== -1 && l2.setSelectedIndex(p2);
    }
    return u2;
  }
  function R2(e2) {
    let u2 = l2.tabs.value.map((S2) => o(S2)).filter(Boolean);
    if (e2.key === o$1.Space || e2.key === o$1.Enter) {
      e2.preventDefault(), e2.stopPropagation(), l2.setSelectedIndex(b2.value);
      return;
    }
    switch (e2.key) {
      case o$1.Home:
      case o$1.PageUp:
        return e2.preventDefault(), e2.stopPropagation(), r2(() => P$2(u2, N$3.First));
      case o$1.End:
      case o$1.PageDown:
        return e2.preventDefault(), e2.stopPropagation(), r2(() => P$2(u2, N$3.Last));
    }
    if (r2(() => u$4(l2.orientation.value, { vertical() {
      return e2.key === o$1.ArrowUp ? P$2(u2, N$3.Previous | N$3.WrapAround) : e2.key === o$1.ArrowDown ? P$2(u2, N$3.Next | N$3.WrapAround) : T$1.Error;
    }, horizontal() {
      return e2.key === o$1.ArrowLeft ? P$2(u2, N$3.Previous | N$3.WrapAround) : e2.key === o$1.ArrowRight ? P$2(u2, N$3.Next | N$3.WrapAround) : T$1.Error;
    } })) === T$1.Success)
      return e2.preventDefault();
  }
  let y2 = ref(false);
  function w2() {
    var e2;
    y2.value || (y2.value = true, !a2.disabled && ((e2 = o(n2)) == null || e2.focus(), l2.setSelectedIndex(b2.value), t$2(() => {
      y2.value = false;
    })));
  }
  function h2(e2) {
    e2.preventDefault();
  }
  let t2 = b$1(computed(() => ({ as: a2.as, type: v2.type })), n2);
  return () => {
    var p2;
    let e2 = { selected: m2.value }, { id: u2, ...f2 } = a2, S2 = { ref: n2, onKeydown: R2, onMousedown: h2, onClick: w2, id: u2, role: "tab", type: t2.value, "aria-controls": (p2 = o(l2.panels.value[b2.value])) == null ? void 0 : p2.id, "aria-selected": m2.value, tabIndex: m2.value ? 0 : -1, disabled: a2.disabled ? true : void 0 };
    return H$3({ ourProps: S2, theirProps: f2, slot: e2, attrs: v2, slots: i2, name: "Tab" });
  };
} });
defineComponent({ name: "TabPanels", props: { as: { type: [Object, String], default: "div" } }, setup(a2, { slots: v2, attrs: i2 }) {
  let s3 = k("TabPanels");
  return () => {
    let l2 = { selectedIndex: s3.selectedIndex.value };
    return H$3({ theirProps: a2, ourProps: {}, slot: l2, attrs: i2, slots: v2, name: "TabPanels" });
  };
} });
defineComponent({ name: "TabPanel", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, id: { type: String, default: () => `headlessui-tabs-panel-${t$4()}` }, tabIndex: { type: Number, default: 0 } }, setup(a2, { attrs: v2, slots: i2, expose: s3 }) {
  let l2 = k("TabPanel"), n2 = ref(null);
  s3({ el: n2, $el: n2 }), onMounted(() => l2.registerPanel(n2)), onUnmounted(() => l2.unregisterPanel(n2));
  let o$12 = inject(j), T2 = computed(() => {
    if (o$12.value) {
      let r2 = o$12.value.panels.indexOf(a2.id);
      return r2 === -1 ? o$12.value.panels.push(a2.id) - 1 : r2;
    }
    return -1;
  }), b2 = computed(() => {
    let r2 = l2.panels.value.indexOf(n2);
    return r2 === -1 ? T2.value : r2;
  }), m2 = computed(() => b2.value === l2.selectedIndex.value);
  return () => {
    var t2;
    let r2 = { selected: m2.value }, { id: R2, tabIndex: y2, ...w2 } = a2, h2 = { ref: n2, id: R2, role: "tabpanel", "aria-labelledby": (t2 = o(l2.tabs.value[b2.value])) == null ? void 0 : t2.id, tabIndex: m2.value ? y2 : -1 };
    return !m2.value && a2.unmount && !a2.static ? h$1(f$1, { as: "span", ...h2 }) : H$3({ ourProps: h2, theirProps: w2, slot: r2, attrs: v2, slots: i2, features: N$4.Static | N$4.RenderStrategy, visible: m2.value, name: "TabPanel" });
  };
} });
function l(r2) {
  let e2 = { called: false };
  return (...t2) => {
    if (!e2.called)
      return e2.called = true, r2(...t2);
  };
}
function m(e2, ...t2) {
  e2 && t2.length > 0 && e2.classList.add(...t2);
}
function d(e2, ...t2) {
  e2 && t2.length > 0 && e2.classList.remove(...t2);
}
var g$1 = ((i2) => (i2.Finished = "finished", i2.Cancelled = "cancelled", i2))(g$1 || {});
function F(e2, t2) {
  let i2 = r();
  if (!e2)
    return i2.dispose;
  let { transitionDuration: n2, transitionDelay: a2 } = getComputedStyle(e2), [l2, s3] = [n2, a2].map((o2) => {
    let [u2 = 0] = o2.split(",").filter(Boolean).map((r2) => r2.includes("ms") ? parseFloat(r2) : parseFloat(r2) * 1e3).sort((r2, c2) => c2 - r2);
    return u2;
  });
  return l2 !== 0 ? i2.setTimeout(() => t2("finished"), l2 + s3) : t2("finished"), i2.add(() => t2("cancelled")), i2.dispose;
}
function L$1(e2, t2, i2, n2, a2, l$12) {
  let s3 = r(), o2 = l$12 !== void 0 ? l(l$12) : () => {
  };
  return d(e2, ...a2), m(e2, ...t2, ...i2), s3.nextFrame(() => {
    d(e2, ...i2), m(e2, ...n2), s3.add(F(e2, (u2) => (d(e2, ...n2, ...t2), m(e2, ...a2), o2(u2))));
  }), s3.add(() => d(e2, ...t2, ...i2, ...n2, ...a2)), s3.add(() => o2("cancelled")), s3.dispose;
}
function g(e2 = "") {
  return e2.split(" ").filter((t2) => t2.trim().length > 1);
}
let R = Symbol("TransitionContext");
var pe = ((a2) => (a2.Visible = "visible", a2.Hidden = "hidden", a2))(pe || {});
function me() {
  return inject(R, null) !== null;
}
function Te() {
  let e2 = inject(R, null);
  if (e2 === null)
    throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  return e2;
}
function ge() {
  let e2 = inject(N, null);
  if (e2 === null)
    throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  return e2;
}
let N = Symbol("NestingContext");
function L(e2) {
  return "children" in e2 ? L(e2.children) : e2.value.filter(({ state: t2 }) => t2 === "visible").length > 0;
}
function Q(e2) {
  let t2 = ref([]), a2 = ref(false);
  onMounted(() => a2.value = true), onUnmounted(() => a2.value = false);
  function s3(n2, r2 = S$3.Hidden) {
    let l2 = t2.value.findIndex(({ id: f2 }) => f2 === n2);
    l2 !== -1 && (u$4(r2, { [S$3.Unmount]() {
      t2.value.splice(l2, 1);
    }, [S$3.Hidden]() {
      t2.value[l2].state = "hidden";
    } }), !L(t2) && a2.value && (e2 == null || e2()));
  }
  function h2(n2) {
    let r2 = t2.value.find(({ id: l2 }) => l2 === n2);
    return r2 ? r2.state !== "visible" && (r2.state = "visible") : t2.value.push({ id: n2, state: "visible" }), () => s3(n2, S$3.Unmount);
  }
  return { children: t2, register: h2, unregister: s3 };
}
let W = N$4.RenderStrategy, he = defineComponent({ props: { as: { type: [Object, String], default: "div" }, show: { type: [Boolean], default: null }, unmount: { type: [Boolean], default: true }, appear: { type: [Boolean], default: false }, enter: { type: [String], default: "" }, enterFrom: { type: [String], default: "" }, enterTo: { type: [String], default: "" }, entered: { type: [String], default: "" }, leave: { type: [String], default: "" }, leaveFrom: { type: [String], default: "" }, leaveTo: { type: [String], default: "" } }, emits: { beforeEnter: () => true, afterEnter: () => true, beforeLeave: () => true, afterLeave: () => true }, setup(e2, { emit: t2, attrs: a2, slots: s3, expose: h2 }) {
  let n2 = ref(0);
  function r2() {
    n2.value |= l$2.Opening, t2("beforeEnter");
  }
  function l2() {
    n2.value &= ~l$2.Opening, t2("afterEnter");
  }
  function f2() {
    n2.value |= l$2.Closing, t2("beforeLeave");
  }
  function S2() {
    n2.value &= ~l$2.Closing, t2("afterLeave");
  }
  if (!me() && C())
    return () => h$1(Se, { ...e2, onBeforeEnter: r2, onAfterEnter: l2, onBeforeLeave: f2, onAfterLeave: S2 }, s3);
  let d2 = ref(null), b2 = computed(() => e2.unmount ? S$3.Unmount : S$3.Hidden);
  h2({ el: d2, $el: d2 });
  let { show: v2, appear: A2 } = Te(), { register: D, unregister: H2 } = ge(), i2 = ref(v2.value ? "visible" : "hidden"), I2 = { value: true }, c2 = t$4(), y2 = { value: false }, P2 = Q(() => {
    !y2.value && i2.value !== "hidden" && (i2.value = "hidden", H2(c2), S2());
  });
  onMounted(() => {
    let o2 = D(c2);
    onUnmounted(o2);
  }), watchEffect(() => {
    if (b2.value === S$3.Hidden && c2) {
      if (v2.value && i2.value !== "visible") {
        i2.value = "visible";
        return;
      }
      u$4(i2.value, { ["hidden"]: () => H2(c2), ["visible"]: () => D(c2) });
    }
  });
  let j2 = g(e2.enter), M2 = g(e2.enterFrom), X2 = g(e2.enterTo), _2 = g(e2.entered), Y2 = g(e2.leave), Z2 = g(e2.leaveFrom), ee = g(e2.leaveTo);
  onMounted(() => {
    watchEffect(() => {
      if (i2.value === "visible") {
        let o$12 = o(d2);
        if (o$12 instanceof Comment && o$12.data === "")
          throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
      }
    });
  });
  function te2(o$12) {
    let E2 = I2.value && !A2.value, p2 = o(d2);
    !p2 || !(p2 instanceof HTMLElement) || E2 || (y2.value = true, v2.value && r2(), v2.value || f2(), o$12(v2.value ? L$1(p2, j2, M2, X2, _2, (V) => {
      y2.value = false, V === g$1.Finished && l2();
    }) : L$1(p2, Y2, Z2, ee, _2, (V) => {
      y2.value = false, V === g$1.Finished && (L(P2) || (i2.value = "hidden", H2(c2), S2()));
    })));
  }
  return onMounted(() => {
    watch$1([v2], (o2, E2, p2) => {
      te2(p2), I2.value = false;
    }, { immediate: true });
  }), provide(N, P2), c$4(computed(() => u$4(i2.value, { ["visible"]: l$2.Open, ["hidden"]: l$2.Closed }) | n2.value)), () => {
    let { appear: o2, show: E2, enter: p2, enterFrom: V, enterTo: Ce, entered: be2, leave: ye2, leaveFrom: Ee2, leaveTo: Ve, ...U2 } = e2, ne2 = { ref: d2 }, re2 = { ...U2, ...A2.value && v2.value && c$3.isServer ? { class: normalizeClass([a2.class, U2.class, ...j2, ...M2]) } : {} };
    return H$3({ theirProps: re2, ourProps: ne2, slot: {}, slots: s3, attrs: a2, features: W, visible: i2.value === "visible", name: "TransitionChild" });
  };
} }), ce = he, Se = defineComponent({ inheritAttrs: false, props: { as: { type: [Object, String], default: "div" }, show: { type: [Boolean], default: null }, unmount: { type: [Boolean], default: true }, appear: { type: [Boolean], default: false }, enter: { type: [String], default: "" }, enterFrom: { type: [String], default: "" }, enterTo: { type: [String], default: "" }, entered: { type: [String], default: "" }, leave: { type: [String], default: "" }, leaveFrom: { type: [String], default: "" }, leaveTo: { type: [String], default: "" } }, emits: { beforeEnter: () => true, afterEnter: () => true, beforeLeave: () => true, afterLeave: () => true }, setup(e2, { emit: t2, attrs: a2, slots: s3 }) {
  let h2 = p$5(), n2 = computed(() => e2.show === null && h2 !== null ? (h2.value & l$2.Open) === l$2.Open : e2.show);
  watchEffect(() => {
    if (![true, false].includes(n2.value))
      throw new Error('A <Transition /> is used but it is missing a `:show="true | false"` prop.');
  });
  let r2 = ref(n2.value ? "visible" : "hidden"), l2 = Q(() => {
    r2.value = "hidden";
  }), f2 = ref(true), S2 = { show: n2, appear: computed(() => e2.appear || !f2.value) };
  return onMounted(() => {
    watchEffect(() => {
      f2.value = false, n2.value ? r2.value = "visible" : L(l2) || (r2.value = "hidden");
    });
  }), provide(N, l2), provide(R, S2), () => {
    let d2 = T$2(e2, ["show", "appear", "unmount", "onBeforeEnter", "onBeforeLeave", "onAfterEnter", "onAfterLeave"]), b2 = { unmount: e2.unmount };
    return H$3({ ourProps: { ...b2, as: "template" }, theirProps: {}, slot: {}, slots: { ...s3, default: () => [h$1(ce, { onBeforeEnter: () => t2("beforeEnter"), onAfterEnter: () => t2("afterEnter"), onBeforeLeave: () => t2("beforeLeave"), onAfterLeave: () => t2("afterLeave"), ...a2, ...b2, ...d2 }, s3.default)] }, attrs: {}, features: W, visible: r2.value === "visible", name: "Transition" });
  };
} });
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r2) => {
    var _a;
    return ((_a = route.params[r2.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey = (routeProps, override) => {
  const matchedRoute = routeProps.route.matched.find((m2) => {
    var _a;
    return ((_a = m2.components) == null ? void 0 : _a.default) === routeProps.Component.type;
  });
  const source = override ?? (matchedRoute == null ? void 0 : matchedRoute.meta.key) ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props2, children) => {
  return { default: () => props2 ? h$1(KeepAlive, props2 === true ? {} : props2, children) : children };
};
const __nuxt_component_0 = /* @__PURE__ */ defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props2, { attrs }) {
    const nuxtApp = useNuxtApp();
    return () => {
      return h$1(RouterView, { name: props2.name, route: props2.route, ...attrs }, {
        default: (routeProps) => {
          if (!routeProps.Component) {
            return;
          }
          const key = generateRouteKey(routeProps, props2.pageKey);
          const done = nuxtApp.deferHydration();
          const hasTransition = !!(props2.transition ?? routeProps.route.meta.pageTransition ?? appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props2.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          return _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              props2.keepalive ?? routeProps.route.meta.keepalive ?? appKeepalive,
              h$1(Suspense, {
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).finally(done));
                }
              }, { default: () => h$1(RouteProvider, { key, routeProps, pageKey: key, hasTransition }) })
            )
          ).default();
        }
      });
    };
  }
});
function _toArray(val) {
  return Array.isArray(val) ? val : val ? [val] : [];
}
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: _toArray(prop.onAfterLeave)
  }));
  return defu(..._props);
}
const RouteProvider = /* @__PURE__ */ defineComponent({
  name: "RouteProvider",
  // TODO: Type props
  // eslint-disable-next-line vue/require-prop-types
  props: ["routeProps", "pageKey", "hasTransition"],
  setup(props2) {
    const previousKey = props2.pageKey;
    const previousRoute = props2.routeProps.route;
    const route = {};
    for (const key in props2.routeProps.route) {
      route[key] = computed(() => previousKey === props2.pageKey ? props2.routeProps.route[key] : previousRoute[key]);
    }
    provide("_route", reactive(route));
    return () => {
      return h$1(props2.routeProps.Component);
    };
  }
});
const autocomplete = createInput(_sfc_main$3, {
  props: ["asNumber", "options", "filterMinLength"]
});
const buttonSelect = createInput(_sfc_main$2, {
  props: ["asNumber", "options"]
});
const asNumberPlugin = (node) => {
  var _a, _b, _c, _d, _e2;
  if (((_a = node.context) == null ? void 0 : _a.asNumber) || ((_b = node.context) == null ? void 0 : _b.attrs.asNumber) || ((_c = node.context) == null ? void 0 : _c.attrs["as-number"]) || ((_d = node.context) == null ? void 0 : _d.type) === "number" && !((_e2 = node.context) == null ? void 0 : _e2.asNumber)) {
    node.hook.input((value, next) => {
      if (value !== void 0) {
        return next(value || value === 0 ? Number(value) : null);
      } else
        return next(value);
    });
  }
};
const config = {
  locales: { de: de$2, en },
  props: {
    incompleteMessage: false,
    validationVisibility: "submit"
  },
  inputs: {
    button,
    buttonSelect,
    autocomplete,
    number: text,
    numberSuffix,
    textSuffix
  },
  plugins: [asNumberPlugin],
  config: {
    classes: generateClasses({
      global: {
        fieldset: "max-w-md border border-normal-400 rounded px-2 pb-1",
        help: "mt-2 text-sm text-normal-500",
        inner: "formkit-disabled:cursor-not-allowed formkit-disabled:pointer-events-none",
        input: "formkit-disabled:bg-normal-200 formkit-disabled:text-normal-500",
        label: "text-sm text-normal-600",
        legend: "font-bold text-sm",
        loaderIcon: "inline-flex items-center w-4 text-normal-600 animate-spin",
        message: "text-danger-500 mb-1 text-xs",
        messages: "list-none p-0 mt-1 mb-0",
        outer: "",
        prefixIcon: "w-10 flex self-stretch grow-0 shrink-0 rounded-tl rounded-bl border-r border-normal-400 bg-white bg-gradient-to-b from-transparent to-normal-200 [&>svg]:w-full [&>svg]:max-w-[1em] [&>svg]:max-h-[1em] [&>svg]:m-auto",
        suffixIcon: "w-7 pr-3 flex self-stretch grow-0 shrink-0 [&>svg]:w-full [&>svg]:max-w-[1em] [&>svg]:max-h-[1em] [&>svg]:m-auto"
      },
      "family:button": {
        input: "formkit-button-style"
      },
      "family:text": {
        inner: "w-full flex items-center bg-white border border-normal-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500 formkit-disabled:bg-normal-200",
        input: "formkit-input-style",
        suffix: "mr-3 text-normal-500 text-xs sm:text-sm"
      },
      range: {
        label: "mb-2",
        inner: "$reset flex items-center",
        input: "$reset flex-grow h-2 bg-normal-200 accent-primary-600 rounded-lg appearance-none cursor-pointer outline-none"
      },
      select: {
        inner: "w-full border border-normal-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500",
        input: 'block w-full px-3 border-none sm:text-sm placeholder-normal-400 data-[placeholder="true"]:text-normal-400'
      },
      checkbox: {
        wrapper: "flex items-center gap-2",
        input: "rounded border-normal-300 text-primary-600 focus:ring-primary-500"
      },
      "family:toggle": {
        inner: "relative cursor-pointer",
        input: "sr-only peer",
        toggle: "w-11 h-6 bg-normal-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-normal-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-normal-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-normal-600 peer-checked:bg-primary-600"
      },
      scrollSelect: {
        inner: "w-full border border-normal-300 bg-white rounded-md",
        input: " sm:text-sm"
      }
    })
  }
};
const formkitPlugin_pZqjah0RUG = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:rendered", () => {
    resetCount();
  });
  nuxtApp.vueApp.use(plugin, defaultConfig(config));
});
const chunk_reload_client_UciE0i6zes = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:chunk-reload",
  setup(nuxtApp) {
    const router = useRouter();
    const config2 = /* @__PURE__ */ useRuntimeConfig();
    const chunkErrors = /* @__PURE__ */ new Set();
    router.beforeEach(() => {
      chunkErrors.clear();
    });
    nuxtApp.hook("app:chunkError", ({ error: error2 }) => {
      chunkErrors.add(error2);
    });
    router.onError((error2, to) => {
      if (chunkErrors.has(error2)) {
        const isHash = "href" in to && to.href.startsWith("#");
        const path = isHash ? config2.app.baseURL + to.href : joinURL(config2.app.baseURL, to.fullPath);
        reloadNuxtApp({ path, persistState: true });
      }
    });
  }
});
const payload_client_yVLowv6hDl = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:payload",
  setup(nuxtApp) {
    if (!isPrerendered()) {
      return;
    }
    nuxtApp.hooks.hook("link:prefetch", async (url3) => {
      if (!parseURL$1(url3).protocol) {
        await loadPayload(url3);
      }
    });
    useRouter().beforeResolve(async (to, from) => {
      if (to.path === from.path) {
        return;
      }
      const payload = await loadPayload(to.path);
      if (!payload) {
        return;
      }
      Object.assign(nuxtApp.static.data, payload.data);
    });
  }
});
const _plugins = [
  components_plugin_KR1HBZs4kY,
  unhead_KgADcZ0jPj,
  router_jmwsqit4Rs,
  prefetch_client_5tzzN0oIVL,
  formkitPlugin_pZqjah0RUG,
  chunk_reload_client_UciE0i6zes,
  payload_client_yVLowv6hDl
];
const _sfc_main$1 = {};
function _sfc_render(_ctx, _cache) {
  const _component_NuxtPage = __nuxt_component_0;
  return openBlock(), createBlock(_component_NuxtPage);
}
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render]]);
const _sfc_main = {
  __name: "nuxt-root",
  setup(__props) {
    const ErrorComponent = /* @__PURE__ */ defineAsyncComponent(() => __vitePreload(() => import("./error-component.46d58ccf.js"), true ? [] : void 0, import.meta.url).then((r2) => r2.default || r2));
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    const onResolve = nuxtApp.deferHydration();
    const SingleRenderer = false;
    provide("_route", useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error2 = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      if (isNuxtError(err) && (err.fatal || err.unhandled)) {
        callWithNuxt(nuxtApp, showError, [err]);
        return false;
      }
    });
    const { islandContext } = false;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Suspense, { onResolve: unref(onResolve) }, {
        default: withCtx(() => [
          unref(error2) ? (openBlock(), createBlock(unref(ErrorComponent), {
            key: 0,
            error: unref(error2)
          }, null, 8, ["error"])) : unref(islandContext) ? (openBlock(), createBlock(unref(IslandRenderer), {
            key: 1,
            context: unref(islandContext)
          }, null, 8, ["context"])) : unref(SingleRenderer) ? (openBlock(), createBlock(resolveDynamicComponent(unref(SingleRenderer)), { key: 2 })) : (openBlock(), createBlock(unref(AppComponent), { key: 3 }))
        ]),
        _: 1
      }, 8, ["onResolve"]);
    };
  }
};
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
let entry;
const plugins = normalizePlugins(_plugins);
{
  entry = async function initApp() {
    var _a, _b;
    const isSSR = Boolean(
      ((_a = window.__NUXT__) == null ? void 0 : _a.serverRendered) || ((_b = document.getElementById("__NUXT_DATA__")) == null ? void 0 : _b.dataset.ssr) === "true"
    );
    const vueApp = isSSR ? createSSRApp(_sfc_main) : createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp });
    try {
      await applyPlugins(nuxt, plugins);
    } catch (err) {
      await nuxt.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    try {
      await nuxt.hooks.callHook("app:created", vueApp);
      await nuxt.hooks.callHook("app:beforeMount", vueApp);
      vueApp.mount("#" + appRootId);
      await nuxt.hooks.callHook("app:mounted", vueApp);
      await nextTick();
    } catch (err) {
      await nuxt.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
  };
  entry().catch((error2) => {
    console.error("Error while mounting app:", error2);
  });
}
export {
  hasProtocol as A,
  onMounted as B,
  onBeforeUnmount as C,
  h$1 as D,
  parseURL$1 as E,
  Fragment$1 as F,
  parseQuery$1 as G,
  withTrailingSlash as H,
  withoutTrailingSlash as I,
  navigateTo as J,
  _export_sfc as K,
  useHead as L,
  pushScopeId as M,
  popScopeId as N,
  __vitePreload as _,
  defineComponent as a,
  useAttrs as b,
  createBlock as c,
  defineAsyncComponent as d,
  computed as e,
  createElementBlock as f,
  guardReactiveProps as g,
  createBaseVNode as h,
  renderSlot as i,
  createVNode as j,
  renderList as k,
  resolveComponent as l,
  mergeProps as m,
  normalizeProps as n,
  openBlock as o,
  withAsyncContext as p,
  isRef as q,
  ref as r,
  createCommentVNode as s,
  createTextVNode as t,
  unref as u,
  toDisplayString as v,
  withCtx as w,
  normalizeStyle as x,
  useNuxtApp as y,
  useRouter as z
};
