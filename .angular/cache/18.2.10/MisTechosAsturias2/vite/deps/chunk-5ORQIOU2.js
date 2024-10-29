import {
  assign,
  clear,
  getUid,
  isEmpty2 as isEmpty
} from "./chunk-MN23FWKY.js";

// node_modules/ol/Disposable.js
var Disposable = (
  /** @class */
  function() {
    function Disposable2() {
      this.disposed = false;
    }
    Disposable2.prototype.dispose = function() {
      if (!this.disposed) {
        this.disposed = true;
        this.disposeInternal();
      }
    };
    Disposable2.prototype.disposeInternal = function() {
    };
    return Disposable2;
  }()
);
var Disposable_default = Disposable;

// node_modules/ol/array.js
function binarySearch(haystack, needle, opt_comparator) {
  var mid, cmp;
  var comparator = opt_comparator || numberSafeCompareFunction;
  var low = 0;
  var high = haystack.length;
  var found = false;
  while (low < high) {
    mid = low + (high - low >> 1);
    cmp = +comparator(haystack[mid], needle);
    if (cmp < 0) {
      low = mid + 1;
    } else {
      high = mid;
      found = !cmp;
    }
  }
  return found ? low : ~low;
}
function numberSafeCompareFunction(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
}
function includes(arr, obj) {
  return arr.indexOf(obj) >= 0;
}
function linearFindNearest(arr, target, direction) {
  var n = arr.length;
  if (arr[0] <= target) {
    return 0;
  } else if (target <= arr[n - 1]) {
    return n - 1;
  } else {
    var i = void 0;
    if (direction > 0) {
      for (i = 1; i < n; ++i) {
        if (arr[i] < target) {
          return i - 1;
        }
      }
    } else if (direction < 0) {
      for (i = 1; i < n; ++i) {
        if (arr[i] <= target) {
          return i;
        }
      }
    } else {
      for (i = 1; i < n; ++i) {
        if (arr[i] == target) {
          return i;
        } else if (arr[i] < target) {
          if (arr[i - 1] - target < target - arr[i]) {
            return i - 1;
          } else {
            return i;
          }
        }
      }
    }
    return n - 1;
  }
}
function reverseSubArray(arr, begin, end) {
  while (begin < end) {
    var tmp = arr[begin];
    arr[begin] = arr[end];
    arr[end] = tmp;
    ++begin;
    --end;
  }
}
function extend(arr, data) {
  var extension = Array.isArray(data) ? data : [data];
  var length = extension.length;
  for (var i = 0; i < length; i++) {
    arr[arr.length] = extension[i];
  }
}
function equals(arr1, arr2) {
  var len1 = arr1.length;
  if (len1 !== arr2.length) {
    return false;
  }
  for (var i = 0; i < len1; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}
function isSorted(arr, opt_func, opt_strict) {
  var compare = opt_func || numberSafeCompareFunction;
  return arr.every(function(currentVal, index) {
    if (index === 0) {
      return true;
    }
    var res = compare(arr[index - 1], currentVal);
    return !(res > 0 || opt_strict && res === 0);
  });
}

// node_modules/ol/functions.js
function TRUE() {
  return true;
}
function FALSE() {
  return false;
}
function VOID() {
}
function memoizeOne(fn) {
  var called = false;
  var lastResult;
  var lastArgs;
  var lastThis;
  return function() {
    var nextArgs = Array.prototype.slice.call(arguments);
    if (!called || this !== lastThis || !equals(nextArgs, lastArgs)) {
      called = true;
      lastThis = this;
      lastArgs = nextArgs;
      lastResult = fn.apply(this, arguments);
    }
    return lastResult;
  };
}

// node_modules/ol/events/Event.js
var BaseEvent = (
  /** @class */
  function() {
    function BaseEvent2(type) {
      this.propagationStopped;
      this.type = type;
      this.target = null;
    }
    BaseEvent2.prototype.preventDefault = function() {
      this.propagationStopped = true;
    };
    BaseEvent2.prototype.stopPropagation = function() {
      this.propagationStopped = true;
    };
    return BaseEvent2;
  }()
);
function stopPropagation(evt) {
  evt.stopPropagation();
}
var Event_default = BaseEvent;

// node_modules/ol/ObjectEventType.js
var ObjectEventType_default = {
  /**
   * Triggered when a property is changed.
   * @event module:ol/Object.ObjectEvent#propertychange
   * @api
   */
  PROPERTYCHANGE: "propertychange"
};

// node_modules/ol/events/EventType.js
var EventType_default = {
  /**
   * Generic change event. Triggered when the revision counter is increased.
   * @event module:ol/events/Event~BaseEvent#change
   * @api
   */
  CHANGE: "change",
  /**
   * Generic error event. Triggered when an error occurs.
   * @event module:ol/events/Event~BaseEvent#error
   * @api
   */
  ERROR: "error",
  BLUR: "blur",
  CLEAR: "clear",
  CONTEXTMENU: "contextmenu",
  CLICK: "click",
  DBLCLICK: "dblclick",
  DRAGENTER: "dragenter",
  DRAGOVER: "dragover",
  DROP: "drop",
  FOCUS: "focus",
  KEYDOWN: "keydown",
  KEYPRESS: "keypress",
  LOAD: "load",
  RESIZE: "resize",
  TOUCHMOVE: "touchmove",
  WHEEL: "wheel"
};

// node_modules/ol/events.js
function listen(target, type, listener, opt_this, opt_once) {
  if (opt_this && opt_this !== target) {
    listener = listener.bind(opt_this);
  }
  if (opt_once) {
    var originalListener_1 = listener;
    listener = function() {
      target.removeEventListener(type, listener);
      originalListener_1.apply(this, arguments);
    };
  }
  var eventsKey = {
    target,
    type,
    listener
  };
  target.addEventListener(type, listener);
  return eventsKey;
}
function listenOnce(target, type, listener, opt_this) {
  return listen(target, type, listener, opt_this, true);
}
function unlistenByKey(key) {
  if (key && key.target) {
    key.target.removeEventListener(key.type, key.listener);
    clear(key);
  }
}

// node_modules/ol/events/Target.js
var __extends = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var Target = (
  /** @class */
  function(_super) {
    __extends(Target2, _super);
    function Target2(opt_target) {
      var _this = _super.call(this) || this;
      _this.eventTarget_ = opt_target;
      _this.pendingRemovals_ = null;
      _this.dispatching_ = null;
      _this.listeners_ = null;
      return _this;
    }
    Target2.prototype.addEventListener = function(type, listener) {
      if (!type || !listener) {
        return;
      }
      var listeners = this.listeners_ || (this.listeners_ = {});
      var listenersForType = listeners[type] || (listeners[type] = []);
      if (listenersForType.indexOf(listener) === -1) {
        listenersForType.push(listener);
      }
    };
    Target2.prototype.dispatchEvent = function(event) {
      var evt = typeof event === "string" ? new Event_default(event) : event;
      var type = evt.type;
      if (!evt.target) {
        evt.target = this.eventTarget_ || this;
      }
      var listeners = this.listeners_ && this.listeners_[type];
      var propagate;
      if (listeners) {
        var dispatching = this.dispatching_ || (this.dispatching_ = {});
        var pendingRemovals = this.pendingRemovals_ || (this.pendingRemovals_ = {});
        if (!(type in dispatching)) {
          dispatching[type] = 0;
          pendingRemovals[type] = 0;
        }
        ++dispatching[type];
        for (var i = 0, ii = listeners.length; i < ii; ++i) {
          if ("handleEvent" in listeners[i]) {
            propagate = /** @type {import("../events.js").ListenerObject} */
            listeners[i].handleEvent(evt);
          } else {
            propagate = /** @type {import("../events.js").ListenerFunction} */
            listeners[i].call(this, evt);
          }
          if (propagate === false || evt.propagationStopped) {
            propagate = false;
            break;
          }
        }
        --dispatching[type];
        if (dispatching[type] === 0) {
          var pr = pendingRemovals[type];
          delete pendingRemovals[type];
          while (pr--) {
            this.removeEventListener(type, VOID);
          }
          delete dispatching[type];
        }
        return propagate;
      }
    };
    Target2.prototype.disposeInternal = function() {
      this.listeners_ && clear(this.listeners_);
    };
    Target2.prototype.getListeners = function(type) {
      return this.listeners_ && this.listeners_[type] || void 0;
    };
    Target2.prototype.hasListener = function(opt_type) {
      if (!this.listeners_) {
        return false;
      }
      return opt_type ? opt_type in this.listeners_ : Object.keys(this.listeners_).length > 0;
    };
    Target2.prototype.removeEventListener = function(type, listener) {
      var listeners = this.listeners_ && this.listeners_[type];
      if (listeners) {
        var index = listeners.indexOf(listener);
        if (index !== -1) {
          if (this.pendingRemovals_ && type in this.pendingRemovals_) {
            listeners[index] = VOID;
            ++this.pendingRemovals_[type];
          } else {
            listeners.splice(index, 1);
            if (listeners.length === 0) {
              delete this.listeners_[type];
            }
          }
        }
      }
    };
    return Target2;
  }(Disposable_default)
);
var Target_default = Target;

// node_modules/ol/Observable.js
var __extends2 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var Observable = (
  /** @class */
  function(_super) {
    __extends2(Observable2, _super);
    function Observable2() {
      var _this = _super.call(this) || this;
      _this.revision_ = 0;
      return _this;
    }
    Observable2.prototype.changed = function() {
      ++this.revision_;
      this.dispatchEvent(EventType_default.CHANGE);
    };
    Observable2.prototype.getRevision = function() {
      return this.revision_;
    };
    Observable2.prototype.on = function(type, listener) {
      if (Array.isArray(type)) {
        var len = type.length;
        var keys = new Array(len);
        for (var i = 0; i < len; ++i) {
          keys[i] = listen(this, type[i], listener);
        }
        return keys;
      } else {
        return listen(
          this,
          /** @type {string} */
          type,
          listener
        );
      }
    };
    Observable2.prototype.once = function(type, listener) {
      var key;
      if (Array.isArray(type)) {
        var len = type.length;
        key = new Array(len);
        for (var i = 0; i < len; ++i) {
          key[i] = listenOnce(this, type[i], listener);
        }
      } else {
        key = listenOnce(
          this,
          /** @type {string} */
          type,
          listener
        );
      }
      listener.ol_key = key;
      return key;
    };
    Observable2.prototype.un = function(type, listener) {
      var key = (
        /** @type {Object} */
        listener.ol_key
      );
      if (key) {
        unByKey(key);
      } else if (Array.isArray(type)) {
        for (var i = 0, ii = type.length; i < ii; ++i) {
          this.removeEventListener(type[i], listener);
        }
      } else {
        this.removeEventListener(type, listener);
      }
    };
    return Observable2;
  }(Target_default)
);
function unByKey(key) {
  if (Array.isArray(key)) {
    for (var i = 0, ii = key.length; i < ii; ++i) {
      unlistenByKey(key[i]);
    }
  } else {
    unlistenByKey(
      /** @type {import("./events.js").EventsKey} */
      key
    );
  }
}
var Observable_default = Observable;

// node_modules/ol/Object.js
var __extends3 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var ObjectEvent = (
  /** @class */
  function(_super) {
    __extends3(ObjectEvent2, _super);
    function ObjectEvent2(type, key, oldValue) {
      var _this = _super.call(this, type) || this;
      _this.key = key;
      _this.oldValue = oldValue;
      return _this;
    }
    return ObjectEvent2;
  }(Event_default)
);
var BaseObject = (
  /** @class */
  function(_super) {
    __extends3(BaseObject2, _super);
    function BaseObject2(opt_values) {
      var _this = _super.call(this) || this;
      getUid(_this);
      _this.values_ = null;
      if (opt_values !== void 0) {
        _this.setProperties(opt_values);
      }
      return _this;
    }
    BaseObject2.prototype.get = function(key) {
      var value;
      if (this.values_ && this.values_.hasOwnProperty(key)) {
        value = this.values_[key];
      }
      return value;
    };
    BaseObject2.prototype.getKeys = function() {
      return this.values_ && Object.keys(this.values_) || [];
    };
    BaseObject2.prototype.getProperties = function() {
      return this.values_ && assign({}, this.values_) || {};
    };
    BaseObject2.prototype.hasProperties = function() {
      return !!this.values_;
    };
    BaseObject2.prototype.notify = function(key, oldValue) {
      var eventType;
      eventType = getChangeEventType(key);
      this.dispatchEvent(new ObjectEvent(eventType, key, oldValue));
      eventType = ObjectEventType_default.PROPERTYCHANGE;
      this.dispatchEvent(new ObjectEvent(eventType, key, oldValue));
    };
    BaseObject2.prototype.set = function(key, value, opt_silent) {
      var values = this.values_ || (this.values_ = {});
      if (opt_silent) {
        values[key] = value;
      } else {
        var oldValue = values[key];
        values[key] = value;
        if (oldValue !== value) {
          this.notify(key, oldValue);
        }
      }
    };
    BaseObject2.prototype.setProperties = function(values, opt_silent) {
      for (var key in values) {
        this.set(key, values[key], opt_silent);
      }
    };
    BaseObject2.prototype.applyProperties = function(source) {
      if (!source.values_) {
        return;
      }
      assign(this.values_ || (this.values_ = {}), source.values_);
    };
    BaseObject2.prototype.unset = function(key, opt_silent) {
      if (this.values_ && key in this.values_) {
        var oldValue = this.values_[key];
        delete this.values_[key];
        if (isEmpty(this.values_)) {
          this.values_ = null;
        }
        if (!opt_silent) {
          this.notify(key, oldValue);
        }
      }
    };
    return BaseObject2;
  }(Observable_default)
);
var changeEventTypeCache = {};
function getChangeEventType(key) {
  return changeEventTypeCache.hasOwnProperty(key) ? changeEventTypeCache[key] : changeEventTypeCache[key] = "change:" + key;
}
var Object_default = BaseObject;

export {
  Disposable_default,
  binarySearch,
  numberSafeCompareFunction,
  includes,
  linearFindNearest,
  reverseSubArray,
  extend,
  equals,
  isSorted,
  TRUE,
  FALSE,
  VOID,
  memoizeOne,
  stopPropagation,
  Event_default,
  ObjectEventType_default,
  Target_default,
  EventType_default,
  listen,
  listenOnce,
  unlistenByKey,
  Observable_default,
  getChangeEventType,
  Object_default
};
//# sourceMappingURL=chunk-5ORQIOU2.js.map
